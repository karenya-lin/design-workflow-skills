import copy
import importlib.util
import json
import os
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
from unittest.mock import patch

SCRIPTS = Path(__file__).resolve().parents[1] / 'scripts'
sys.path.insert(0, str(SCRIPTS))
spec = importlib.util.spec_from_file_location('workflow_settings', SCRIPTS / 'settings.py')
settings = importlib.util.module_from_spec(spec)
spec.loader.exec_module(settings)


class SettingsTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.root = Path(self.tmp.name)
        self.workspace = self.root / 'project'
        self.workspace.mkdir()
        env = patch.dict(os.environ, {'LOCALAPPDATA': str(self.root / 'config'),
                                      'XDG_CONFIG_HOME': str(self.root / 'config')})
        env.start()
        self.addCleanup(env.stop)

    def menu(self, answers):
        iterator = iter(answers)
        return settings.Menu(self.workspace, input_fn=lambda _: next(iterator), output_fn=lambda _: None)

    def test_all_profile_fields_have_menu_labels(self):
        self.assertEqual(set(settings.LABELS), settings.profile.TEXT | settings.profile.BOOL
                         | settings.profile.LIST | {'preview_port'})

    def test_cancel_and_exit_do_not_write(self):
        menu = self.menu(['4', 'NO', '0'])
        menu.prefs['preview_port'] = 4321
        self.assertEqual(menu.run(), 0)
        self.assertFalse(menu.path.exists())
        self.assertFalse(menu.review_path.exists())

    def test_preferences_save_reload_and_revision_conflict(self):
        first = self.menu(['YES'])
        stale = self.menu(['YES'])
        first.prefs['preview_port'] = 4321
        first.save_preferences()
        self.assertEqual(self.menu([]).prefs['preview_port'], 4321)
        stale.prefs['preview_port'] = 5432
        with self.assertRaises(ValueError):
            stale.save_preferences()
        self.assertEqual(self.menu([]).prefs['preview_port'], 4321)

    def test_pipeline_save_is_never_execute_and_detects_conflict(self):
        menu = self.menu(['YES'])
        marker = self.workspace / 'must-not-exist'
        menu.pipeline['checks']['unsafe-example'] = {
            'argv': [sys.executable, '-c', f'open({str(marker)!r}, "w").close()'], 'timeout_seconds': 5}
        menu.save_review()
        self.assertFalse(marker.exists())
        self.assertEqual(self.menu([]).pipeline, menu.pipeline)
        changed = copy.deepcopy(menu.pipeline)
        changed['external_skills'] = ['vendor:design']
        settings.save_pipeline(menu.review_path, changed, menu.digest)
        with self.assertRaises(ValueError):
            settings.save_pipeline(menu.review_path, menu.pipeline, menu.digest)

    def test_invalid_profile_values(self):
        for key, value in [('preview_port', '80'), ('preview_port', 'abc'),
                           ('calendar_enabled', 'yes'), ('google_account', 'not-email'),
                           ('context_label', 'password=example')]:
            with self.subTest(key=key, value=value), self.assertRaises(ValueError):
                settings.parse_value(key, value)
        self.assertEqual(settings.parse_value('calendar_ids', 'one, two'), ['one', 'two'])
        self.assertEqual(settings.parse_value('gmail_enabled', '2'), False)

    def test_disconnect_resets_local_sources_not_other_preferences(self):
        menu = self.menu(['8', '4', 'YES', '0'])
        menu.prefs.update({'google_account': 'person@example.com', 'calendar_ids': ['demo'],
                           'calendar_enabled': True, 'gmail_enabled': True, 'preview_port': 4321})
        menu.run()
        prefs = self.menu([]).prefs
        self.assertFalse(prefs['calendar_enabled'])
        self.assertFalse(prefs['gmail_enabled'])
        self.assertNotIn('google_account', prefs)
        self.assertEqual(prefs['preview_port'], 4321)

    def test_referenced_external_skill_cannot_be_removed(self):
        doc = settings.empty_pipeline()
        doc['external_skills'] = ['vendor:design']
        doc['phases']['review']['skills'].append('vendor:design')
        with self.assertRaises(ValueError):
            settings.remove_item(doc, 'external_skills', 'vendor:design')
        doc = settings.remove_item(doc, 'phases', 'review')
        self.assertEqual(settings.remove_item(doc, 'external_skills', 'vendor:design')['external_skills'], [])

    def test_menu_selects_multiple_skills_without_execution(self):
        menu = self.menu(['1', 'combined', '1,2,1', ''])
        menu.edit_pipeline()
        self.assertEqual(menu.pipeline['phases']['combined'],
                         {'skills': sorted(settings.review.SKILLS)[:2], 'checks': []})
        self.assertFalse(menu.review_path.exists())

    def test_pipeline_rejects_shell_and_credential_like_commands(self):
        menu = self.menu([])
        for argv in [['cmd.exe', '/c', 'echo no'], ['tool', 'password=example']]:
            doc = settings.empty_pipeline()
            doc['checks']['bad'] = {'argv': argv, 'timeout_seconds': 5}
            with self.assertRaises(ValueError):
                settings.save_pipeline(menu.review_path, doc, None)
        self.assertFalse(menu.review_path.exists())

    def test_cli_eof_discards_unsaved_state(self):
        result = subprocess.run([sys.executable, str(SCRIPTS / 'settings.py'),
                                 '--workspace', str(self.workspace), '--language', 'en'],
                                input='', capture_output=True, text=True, encoding='utf-8')
        self.assertEqual(result.returncode, 0)
        self.assertFalse(self.menu([]).path.exists())

    def test_cli_menu_save_reopen_and_multiskill_runner_plan(self):
        port_field = str(list(settings.LABELS).index('preview_port') + 1)
        a11y = str(sorted(settings.review.SKILLS).index('a11y-review') + 1)
        external = str(len(settings.review.SKILLS) + 1)
        answers = ['1', port_field, '4321', '4', 'YES',
                   '2', '3', 'vendor:frontend',
                   '2', '1', 'combined', external + ',' + a11y, '', '5', 'YES', '0']
        command = [sys.executable, str(SCRIPTS / 'settings.py'),
                   '--workspace', str(self.workspace), '--language', 'en']
        result = subprocess.run(command, input='\n'.join(answers) + '\n',
                                capture_output=True, text=True, encoding='utf-8')
        self.assertEqual(result.returncode, 0, result.stderr)
        reopened = self.menu([])
        self.assertEqual(reopened.prefs['preview_port'], 4321)
        self.assertEqual(reopened.pipeline['phases']['combined']['skills'],
                         ['vendor:frontend', 'a11y-review'])
        reload_result = subprocess.run(command, input='3\n0\n', capture_output=True,
                                       text=True, encoding='utf-8')
        self.assertIn('4321', reload_result.stdout)
        plan_result = subprocess.run([sys.executable, str(SCRIPTS / 'review.py'),
                                      '--config', str(reopened.review_path),
                                      '--workspace', str(self.workspace), '--phase', 'combined'],
                                     capture_output=True, text=True, encoding='utf-8')
        self.assertEqual(plan_result.returncode, 0, plan_result.stderr)
        plan = json.loads(plan_result.stdout)
        self.assertEqual([s['skill'] for s in plan['skill_plan']], ['vendor:frontend', 'a11y-review'])
        self.assertTrue(all(s['status'] == 'NOT_RUN' for s in plan['skill_plan']))
        self.assertEqual(list(self.workspace.iterdir()), [])


if __name__ == '__main__':
    unittest.main()
