import importlib.util
import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/review.py'
spec = importlib.util.spec_from_file_location('review', SCRIPT)
review = importlib.util.module_from_spec(spec)
spec.loader.exec_module(review)


class RunnerTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.config = self.root / 'config.json'
        self.doc = {'version': 1, 'phases': {'verify': {'checks': ['ok', 'bad', 'later'],
                                                       'skills': ['uiux-checks']}}, 'checks': {
            'ok': {'argv': [sys.executable, '-c', 'pass'], 'timeout_seconds': 5},
            'bad': {'argv': [sys.executable, '-c', 'raise SystemExit(1)'], 'timeout_seconds': 5},
            'later': {'argv': [sys.executable, '-c', "open('should-not-exist', 'w').close()"], 'timeout_seconds': 5}}}
        self.write()

    def write(self):
        self.config.write_text(json.dumps(self.doc), encoding='utf-8')

    def cli(self, *args):
        return subprocess.run([sys.executable, str(SCRIPT), '--config', str(self.config),
                               '--workspace', str(self.root), *args], capture_output=True, text=True)

    def test_plan_has_no_side_effect(self):
        result = self.cli('--all')
        self.assertEqual(result.returncode, 0)
        self.assertEqual(json.loads(result.stdout)['mode'], 'PLAN_ONLY')
        self.assertFalse((self.root / 'should-not-exist').exists())

    def test_phase_and_individual_selection(self):
        ids, skills = review.select(self.doc, phase='verify')
        self.assertEqual(ids, ['ok', 'bad', 'later'])
        self.assertEqual(skills, ['uiux-checks'])
        self.assertEqual(review.select(self.doc, checks=['ok', 'ok'])[0], ['ok'])

    def test_success_and_literal_arguments_do_not_invoke_shell(self):
        literal = '; echo untouched && $(whoami)'
        self.doc['checks']['ok']['argv'] = [sys.executable, '-c',
            'import sys; assert sys.argv[1] == ' + repr(literal), literal]
        self.write()
        _, digest = review.load(self.config)
        result = self.cli('--check', 'ok', '--execute', '--approve-config', digest)
        self.assertEqual(result.returncode, 0)
        out = json.loads(result.stdout)
        self.assertEqual(out['results'][0]['status'], 'PASS')
        self.assertEqual(out['whole_review'], 'NOT_VERIFIED')

    def test_missing_approval_does_not_execute(self):
        result = self.cli('--all', '--execute')
        self.assertEqual(result.returncode, 2)
        self.assertFalse((self.root / 'should-not-exist').exists())

    def test_changed_config_invalidates_approval(self):
        _, digest = review.load(self.config)
        self.doc['checks']['ok']['timeout_seconds'] = 6
        self.write()
        self.assertEqual(self.cli('--all', '--execute', '--approve-config', digest).returncode, 2)

    def test_failure_stops_following_commands(self):
        _, digest = review.load(self.config)
        result = self.cli('--phase', 'verify', '--execute', '--approve-config', digest)
        self.assertEqual(result.returncode, 1)
        out = json.loads(result.stdout)
        self.assertEqual([r['status'] for r in out['results']], ['PASS', 'FAIL', 'NOT_RUN'])
        self.assertEqual(out['skill_plan'][0]['status'], 'NOT_RUN')
        self.assertFalse((self.root / 'should-not-exist').exists())

    def test_unknown_dependency_and_shell_rejected(self):
        self.doc['checks']['ok']['argv'] = ['cmd.exe', '/c', 'echo test']
        self.write()
        with self.assertRaises(ValueError):
            review.load(self.config)
        self.doc['checks']['ok']['argv'] = [sys.executable, '-c', 'pass']
        self.doc['phases']['verify']['checks'].append('unknown')
        self.write()
        with self.assertRaises(ValueError):
            review.load(self.config)

    def test_missing_executable_is_error(self):
        self.doc['checks']['ok']['argv'] = [str(self.root / 'missing-executable')]
        self.assertEqual(review.execute(self.doc, ['ok'], self.root)[0]['status'], 'ERROR')

    def test_multiple_phases_deduplicate_in_requested_order(self):
        self.doc['phases']['first'] = {'checks': ['ok'], 'skills': ['a11y-review', 'uiux-checks']}
        self.write()
        result = self.cli('--phase', 'first', '--phase', 'verify', '--phase', 'first')
        self.assertEqual(result.returncode, 0)
        plan = json.loads(result.stdout)
        self.assertEqual(list(plan['checks']), ['ok', 'bad', 'later'])
        self.assertEqual([s['skill'] for s in plan['skill_plan']], ['a11y-review', 'uiux-checks'])
        self.assertFalse((self.root / 'should-not-exist').exists())

    def test_external_declaration_is_not_installation_or_execution(self):
        self.doc['external_skills'] = ['vendor:frontend-design']
        self.doc['phases']['verify']['skills'].append('vendor:frontend-design')
        self.write()
        plan = json.loads(self.cli('--phase', 'verify').stdout)
        self.assertEqual(plan['skill_plan'][-1], {'skill': 'vendor:frontend-design',
                         'origin': 'external', 'status': 'NOT_RUN', 'availability': 'NOT_CHECKED'})
        self.doc['external_skills'] = []
        self.write()
        self.assertEqual(self.cli('--all').returncode, 2)

    def test_external_declarations_reject_collisions_duplicates_and_paths(self):
        for invalid in [['uiux-checks'], ['extra', 'extra'], ['../extra'], 'extra']:
            with self.subTest(invalid=invalid):
                self.doc['external_skills'] = invalid
                self.write()
                self.assertEqual(self.cli('--all').returncode, 2)

    def test_timeout(self):
        self.doc['checks']['ok'] = {'argv': [sys.executable, '-c', 'import time; time.sleep(3)'], 'timeout_seconds': 1}
        self.assertEqual(review.execute(self.doc, ['ok'], self.root)[0]['status'], 'TIMEOUT')


if __name__ == '__main__':
    unittest.main()
