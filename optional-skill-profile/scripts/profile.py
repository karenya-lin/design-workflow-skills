"""Local preferences only. No connector, shell execution, or permission grants."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import re
import sys
import tempfile
from contextlib import contextmanager
from datetime import datetime, timezone

TEXT = {'context_label', 'company_label', 'client_label', 'language', 'timezone',
        'output_directory', 'google_account', 'date_window'}
BOOL = {'setup_seen', 'calendar_enabled', 'gmail_enabled', 'jira_enabled',
        'session_history_enabled', 'exclude_private_events'}
LIST = {'calendar_ids', 'included_projects', 'excluded_projects'}
DEFAULTS = {key: False for key in BOOL}
DEFAULTS['exclude_private_events'] = True
SECRET = re.compile(r'-----BEGIN .*PRIVATE KEY|ya29\.|gh[pousr]_|sk-[A-Za-z0-9]{16}|'
                    r'(?i:bearer\s+|password\s*[:=]|access_token\s*[:=])')


def validate(patch):
    if not isinstance(patch, dict):
        raise ValueError('Preferences must be an object')
    for key, value in patch.items():
        if key not in TEXT | BOOL | LIST | {'preview_port'}:
            raise ValueError('Unknown preference field')
        if value is None:
            continue
        if key in TEXT:
            if not isinstance(value, str) or len(value) > 512 or any(ord(c) < 32 for c in value):
                raise ValueError('Invalid text preference')
            if SECRET.search(value):
                raise ValueError('Credential-like value rejected')
            if key == 'google_account' and not re.fullmatch(r'[^\s@]+@[^\s@]+\.[^\s@]+', value):
                raise ValueError('Invalid account email')
        elif key in BOOL:
            if type(value) is not bool:
                raise ValueError('Expected boolean')
        elif key in LIST:
            if (not isinstance(value, list) or len(value) > 100
                    or any(not isinstance(v, str) or len(v) > 512
                           or any(ord(c) < 32 for c in v) or SECRET.search(v) for v in value)):
                raise ValueError('Invalid list preference')
        elif type(value) is not int or not 1024 <= value <= 65535:
            raise ValueError('Port must be an integer from 1024 to 65535')


def profile_path(workspace, profile='default', root=None):
    if not re.fullmatch(r'[a-z0-9][a-z0-9-]{0,47}', profile):
        raise ValueError('Invalid profile name')
    project = Path(workspace).resolve(strict=True)
    if not project.is_dir():
        raise ValueError('Workspace must be a directory')
    if root is None:
        base = os.environ.get('LOCALAPPDATA') if os.name == 'nt' else os.environ.get('XDG_CONFIG_HOME')
        root = Path(base) / 'workflow-skill-profiles' if base else Path.home() / '.config/workflow-skill-profiles'
    root = Path(root).resolve()
    # Never put runtime account/preferences into the user's project tree.
    if root == project or project in root.parents:
        raise ValueError('Profile directory must be outside the workspace')
    identity = os.path.normcase(str(project)).encode('utf-8')
    return root / hashlib.sha256(identity).hexdigest() / (profile + '.local.json')


def read(path):
    if path.is_symlink():
        raise ValueError('Profile symlinks are not accepted')
    if not path.exists():
        return {'schema_version': 1, 'revision': 0, 'preferences': dict(DEFAULTS)}
    if path.stat().st_size > 131072:
        raise ValueError('Oversized profile')
    doc = json.loads(path.read_text(encoding='utf-8'))
    if (not isinstance(doc, dict) or doc.get('schema_version') != 1
            or type(doc.get('revision')) is not int or doc['revision'] < 1):
        raise ValueError('Unsupported profile schema or revision')
    validate(doc.get('preferences'))
    return doc


@contextmanager
def lock(path):
    path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    lockfile = path.with_suffix('.lock')
    try:
        fd = os.open(lockfile, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    except FileExistsError as exc:
        raise ValueError('Profile busy; re-read later. Do not remove another session lock.') from exc
    os.close(fd)
    try:
        yield
    finally:
        lockfile.unlink()


def save(path, patch, expected_revision):
    validate(patch)
    with lock(path):
        current = read(path)
        if current['revision'] != expected_revision:
            raise ValueError('Revision conflict; re-read before modifying')
        prefs = dict(current['preferences'])
        for key, value in patch.items():
            if value is None:
                prefs.pop(key, None)
            else:
                prefs[key] = value
        for key, value in DEFAULTS.items():
            prefs.setdefault(key, value)
        doc = {'schema_version': 1, 'revision': expected_revision + 1,
               'updated_at': datetime.now(timezone.utc).isoformat(), 'preferences': prefs}
        fd, tmp = tempfile.mkstemp(dir=path.parent, prefix='.profile-', suffix='.tmp')
        try:
            with os.fdopen(fd, 'w', encoding='utf-8') as stream:
                json.dump(doc, stream, ensure_ascii=False, indent=2)
                stream.write('\n')
                stream.flush()
                os.fsync(stream.fileno())
            os.replace(tmp, path)
        finally:
            if os.path.exists(tmp):
                os.unlink(tmp)
        return read(path)


def reset(path, expected_revision):
    # Keep a revisioned empty tombstone to avoid stale-writer ABA after reset.
    current = read(path)
    patch = {key: None for key in current['preferences']}
    return save(path, patch, expected_revision)


def summary(doc, full=False):
    result = json.loads(json.dumps(doc))
    prefs = result['preferences']
    if not full:
        email = prefs.get('google_account')
        if email:
            local, domain = email.split('@', 1)
            prefs['google_account'] = local[:1] + '***@' + domain
        if 'calendar_ids' in prefs:
            prefs['calendar_ids'] = ['[selected calendar]' for _ in prefs['calendar_ids']]
    result['authorization'] = 'Preferences only; verify live identity. Writes require task approval.'
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--workspace', required=True)
    parser.add_argument('--profile', default='default')
    subs = parser.add_subparsers(dest='action', required=True)
    subs.add_parser('show').add_argument('--full', action='store_true')
    for action in ('save', 'reset'):
        subs.add_parser(action).add_argument('--expected-revision', type=int, required=True)
    args = parser.parse_args()
    try:
        path = profile_path(args.workspace, args.profile)
        if args.action == 'show':
            doc = read(path)
        elif args.action == 'save':
            payload = sys.stdin.read(131073)
            if len(payload) > 131072:
                raise ValueError('Oversized input')
            doc = save(path, json.loads(payload), args.expected_revision)
        else:
            doc = reset(path, args.expected_revision)
        print(json.dumps({'path': str(path), **summary(doc, getattr(args, 'full', False))},
                         ensure_ascii=False, indent=2))
        return 0
    except (ValueError, OSError) as exc:
        # Error values must not echo private input or credentials.
        print('Profile operation failed: ' + type(exc).__name__ + '. Check schema, path, lock and revision.', file=sys.stderr)
        return 1


if __name__ == '__main__':
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8')
    if hasattr(sys.stdin, 'reconfigure'):
        sys.stdin.reconfigure(encoding='utf-8')
    sys.exit(main())
