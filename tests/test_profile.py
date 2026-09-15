import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / 'optional-skill-profile/scripts/profile.py'
spec = importlib.util.spec_from_file_location('profile_store', SCRIPT)
store = importlib.util.module_from_spec(spec)
spec.loader.exec_module(store)


class ProfileTests(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        self.base = Path(self.tmp.name)
        self.workspace = self.base / 'project'
        self.workspace.mkdir()
        self.path = store.profile_path(self.workspace, root=self.base / 'private')

    def test_first_read_has_no_side_effect(self):
        self.assertEqual(store.read(self.path)['revision'], 0)
        self.assertFalse(self.path.parent.exists())

    def test_save_read_modify_and_disconnect(self):
        store.save(self.path, {'setup_seen': True, 'preview_port': 4321,
                              'google_account': 'writer@example.com', 'calendar_enabled': True}, 0)
        self.assertEqual(store.read(self.path)['preferences']['preview_port'], 4321)
        second = store.save(self.path, {'preview_port': 4322, 'calendar_enabled': False}, 1)
        self.assertTrue(second['preferences']['setup_seen'])
        self.assertFalse(second['preferences']['calendar_enabled'])
        self.assertFalse(second['preferences']['gmail_enabled'])

    def test_declined_setup_can_be_remembered(self):
        result = store.save(self.path, {'setup_seen': True}, 0)
        self.assertTrue(store.read(self.path)['preferences']['setup_seen'])
        self.assertFalse(result['preferences']['calendar_enabled'])

    def test_profiles_and_workspaces_isolated(self):
        other = self.base / 'other'
        other.mkdir()
        paths = {self.path, store.profile_path(other, root=self.base / 'private'),
                 store.profile_path(self.workspace, 'second', root=self.base / 'private')}
        self.assertEqual(len(paths), 3)

    def test_rejects_in_repo_storage(self):
        with self.assertRaises(ValueError):
            store.profile_path(self.workspace, root=self.workspace / 'settings')

    def test_path_traversal_rejected(self):
        with self.assertRaises(ValueError):
            store.profile_path(self.workspace, '../escape', root=self.base / 'private')

    def test_unknown_fields_and_credentials_rejected(self):
        for patch in ({'oauth_token': 'test'}, {'kill_approved': True},
                      {'company_label': 'Bearer synthetic'}, {'calendar_ids': ['ya29.synthetic']}):
            with self.subTest(patch=patch), self.assertRaises(ValueError):
                store.save(self.path, patch, 0)
        self.assertFalse(self.path.exists())

    def test_port_and_boolean_validation(self):
        for value in (True, 0, 65536, '4321'):
            with self.subTest(value=value), self.assertRaises(ValueError):
                store.save(self.path, {'preview_port': value}, 0)

    def test_stale_writer_does_not_overwrite(self):
        store.save(self.path, {'preview_port': 4321}, 0)
        with self.assertRaises(ValueError):
            store.save(self.path, {'preview_port': 4322}, 0)
        self.assertEqual(store.read(self.path)['preferences']['preview_port'], 4321)

    def test_busy_lock_does_not_get_removed(self):
        with store.lock(self.path):
            with self.assertRaises(ValueError):
                store.save(self.path, {'setup_seen': True}, 0)
            self.assertTrue(self.path.with_suffix('.lock').exists())

    def test_invalid_existing_document_preserved(self):
        self.path.parent.mkdir(parents=True)
        self.path.write_text('{broken', encoding='utf-8')
        with self.assertRaises(ValueError):
            store.save(self.path, {'setup_seen': True}, 0)
        self.assertEqual(self.path.read_text(encoding='utf-8'), '{broken')

    def test_reset_forgets_values_and_rejects_stale_writer(self):
        store.save(self.path, {'google_account': 'writer@example.com'}, 0)
        result = store.reset(self.path, 1)
        self.assertNotIn('google_account', result['preferences'])
        self.assertFalse(result['preferences']['setup_seen'])
        with self.assertRaises(ValueError):
            store.save(self.path, {'setup_seen': True}, 1)

    def test_summary_masks_account_without_mutating_storage(self):
        doc = store.save(self.path, {'google_account': 'writer@example.com',
                                    'calendar_ids': ['private@example.com']}, 0)
        shown = json.dumps(store.summary(doc))
        self.assertNotIn('writer@example.com', shown)
        self.assertNotIn('private@example.com', shown)
        self.assertEqual(store.read(self.path)['preferences']['google_account'], 'writer@example.com')


if __name__ == '__main__':
    unittest.main()
