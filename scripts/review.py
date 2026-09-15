"""Plan selected checks and AI skill steps; execute approved commands sequentially."""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import time

ID = re.compile(r'[a-z0-9][a-z0-9-]{0,63}')
SKILL_ID = re.compile(r'[a-z0-9][a-z0-9:_-]{0,127}')
SKILLS = {p.parent.name for p in Path(__file__).resolve().parents[1].glob('*/SKILL.md')}
SHELLS = {'cmd', 'cmd.exe', 'powershell', 'powershell.exe', 'pwsh', 'pwsh.exe',
          'sh', 'bash', 'zsh', 'wscript', 'cscript'}


def load(path):
    raw = Path(path).read_bytes()
    if len(raw) > 131072:
        raise ValueError('Config too large')
    doc = json.loads(raw)
    validate(doc)
    return doc, hashlib.sha256(raw).hexdigest()


def validate(doc):
    required = {'version', 'phases', 'checks'}
    if (not isinstance(doc, dict) or not required <= set(doc)
            or set(doc) - required - {'external_skills'} or type(doc['version']) is not int
            or doc['version'] != 1):
        raise ValueError('Expected version, phases and checks')
    external = doc.get('external_skills', [])
    if (not isinstance(external, list) or len(external) > 100
            or any(not isinstance(s, str) or not SKILL_ID.fullmatch(s) for s in external)
            or len(set(external)) != len(external) or set(external) & SKILLS):
        raise ValueError('Invalid external skill declarations')
    if not isinstance(doc['checks'], dict) or not isinstance(doc['phases'], dict):
        raise ValueError('Expected mapping')
    for name, check in doc['checks'].items():
        if not ID.fullmatch(name) or not isinstance(check, dict) or set(check) != {'argv', 'timeout_seconds'}:
            raise ValueError('Invalid check')
        argv = check['argv']
        if (not isinstance(argv, list) or not argv or len(argv) > 100
                or any(not isinstance(a, str) or not a or len(a) > 2048
                       or any(ord(c) < 32 for c in a) for a in argv)):
            raise ValueError('Invalid argv')
        # No shell wrappers/batch files. This is NOT a sandbox: approved binaries
        # and their scripts still have the caller's OS permissions.
        exe = Path(argv[0]).name.lower()
        if exe in SHELLS or exe.endswith(('.cmd', '.bat', '.ps1', '.sh')):
            raise ValueError('Use a direct executable and script arguments, not a shell wrapper')
        timeout = check['timeout_seconds']
        if type(timeout) is not int or not 1 <= timeout <= 3600:
            raise ValueError('Invalid timeout')
    for name, phase in doc['phases'].items():
        if not ID.fullmatch(name) or not isinstance(phase, dict) or set(phase) != {'checks', 'skills'}:
            raise ValueError('Invalid phase')
        if any(not isinstance(phase[k], list) or any(not isinstance(v, str) for v in phase[k])
               for k in ('checks', 'skills')):
            raise ValueError('Invalid phase lists')
        if any(c not in doc['checks'] for c in phase['checks']):
            raise ValueError('Unknown check dependency')
        if any(s not in SKILLS and s not in external for s in phase['skills']):
            raise ValueError('Unknown skill')


def select(doc, phase=None, checks=None, all_checks=False):
    skills = []
    if phase:
        phases = [phase] if isinstance(phase, str) else phase
        if any(p not in doc['phases'] for p in phases):
            raise ValueError('Unknown phase')
        ids = [c for p in phases for c in doc['phases'][p]['checks']]
        skills = [s for p in phases for s in doc['phases'][p]['skills']]
    elif checks:
        ids = checks
    elif all_checks:
        ids = list(doc['checks'])
        skills = [s for p in doc['phases'].values() for s in p['skills']]
    else:
        raise ValueError('Choose phase, check or all')
    if any(c not in doc['checks'] for c in ids):
        raise ValueError('Unknown check')
    return list(dict.fromkeys(ids)), list(dict.fromkeys(skills))


def execute(doc, ids, workspace):
    results = []
    stopped = False
    for name in ids:
        if stopped:
            results.append({'check': name, 'status': 'NOT_RUN'})
            continue
        check = doc['checks'][name]
        started = time.monotonic()
        try:
            run = subprocess.run(check['argv'], cwd=workspace, shell=False,
                                 stdin=subprocess.DEVNULL, stdout=subprocess.DEVNULL,
                                 stderr=subprocess.DEVNULL, timeout=check['timeout_seconds'])
            status = 'PASS' if run.returncode == 0 else 'FAIL'
            result = {'check': name, 'status': status, 'exit_code': run.returncode}
        except subprocess.TimeoutExpired:
            result = {'check': name, 'status': 'TIMEOUT'}
        except OSError:
            result = {'check': name, 'status': 'ERROR'}
        result['seconds'] = round(time.monotonic() - started, 3)
        results.append(result)
        stopped = result['status'] != 'PASS'
    return results


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--config', required=True)
    parser.add_argument('--workspace', required=True)
    choose = parser.add_mutually_exclusive_group(required=True)
    choose.add_argument('--phase', action='append', help='Repeat for ordered phases; duplicate IDs run once')
    choose.add_argument('--check', action='append')
    choose.add_argument('--all', action='store_true')
    parser.add_argument('--execute', action='store_true')
    parser.add_argument('--approve-config', help='SHA256 shown in a reviewed plan')
    args = parser.parse_args()
    try:
        workspace = Path(args.workspace).resolve(strict=True)
        if not workspace.is_dir():
            raise ValueError('Workspace must be a directory')
        doc, digest = load(args.config)
        ids, skills = select(doc, args.phase, args.check, args.all)
        plan = {'config_sha256': digest, 'workspace': str(workspace),
                'checks': {c: doc['checks'][c] for c in ids},
                'skill_plan': [{'skill': s, 'origin': 'bundled' if s in SKILLS else 'external',
                                'status': 'NOT_RUN', 'availability': 'NOT_CHECKED'} for s in skills],
                'ordering': 'Commands run first. AI skills are a separate ordered plan, not interleaved.'}
        if not args.execute:
            plan['mode'] = 'PLAN_ONLY'
            print(json.dumps(plan, ensure_ascii=False, indent=2))
            return 0
        if args.approve_config != digest:
            raise ValueError('Execute requires the exact reviewed config SHA256')
        results = execute(doc, ids, workspace)
        print(json.dumps({'mode': 'EXECUTED_CHECKS_ONLY', 'config_sha256': digest,
                          'results': results, 'skill_plan': plan['skill_plan'],
                          'whole_review': 'NOT_VERIFIED'}, ensure_ascii=False, indent=2))
        return 1 if any(r['status'] != 'PASS' for r in results) else 0
    except (ValueError, OSError):
        print('Invalid selection/config/workspace or missing matching approval hash.', file=sys.stderr)
        return 2


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    sys.exit(main())
