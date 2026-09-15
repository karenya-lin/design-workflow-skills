"""Loopback helper security tests. Never launch a real native application."""
import http.client
import importlib.util
import json
from pathlib import Path
import threading
import unittest

SCRIPT = Path(__file__).resolve().parents[1] / 'ui-element-inspector/scripts/preview_server.py'
spec = importlib.util.spec_from_file_location('preview_server', SCRIPT)
preview = importlib.util.module_from_spec(spec)
spec.loader.exec_module(preview)


class PreviewServerTests(unittest.TestCase):
    def setUp(self):
        self.calls = []
        self.server = preview.PreviewServer(0, launcher=lambda: self.calls.append('launched'))
        self.worker = threading.Thread(target=self.server.serve_forever, daemon=True)
        self.worker.start()

    def tearDown(self):
        self.server.shutdown()
        self.server.server_close()
        self.worker.join()

    def request(self, method, path, headers=None):
        conn = http.client.HTTPConnection('127.0.0.1', self.server.server_port)
        conn.request(method, path, headers=headers or {})
        response = conn.getresponse()
        result = response.status, response.read()
        conn.close()
        return result

    def valid_headers(self):
        return {'Origin': self.server.origin, 'X-Inspector-Token': self.server.token}

    def test_disabled_by_default(self):
        status, data = self.request('GET', '/_inspector/capabilities')
        self.assertEqual(status, 200)
        self.assertEqual(json.loads(data), {'snipping': False, 'printscreen': False, 'token': None})
        self.assertEqual(self.request('POST', '/_inspector/snipping', self.valid_headers())[0], 403)
        self.assertFalse(self.calls)

    def test_requires_origin_token_and_exact_host(self):
        self.server.enable_snipping = True
        for extra in ({'Origin': 'http://evil.example'}, {'X-Inspector-Token': 'wrong'}, {'Host': 'evil.example'}, {'Content-Length': '5'}):
            with self.subTest(extra=extra):
                self.assertEqual(self.request('POST', '/_inspector/snipping', {**self.valid_headers(), **extra})[0], 403)
        self.assertFalse(self.calls)
        self.assertEqual(self.request('GET', '/_inspector/capabilities', {'Host':'evil.example'})[0], 403)

    def test_explicit_authorized_request_launches_only_fixed_action(self):
        self.server.enable_snipping = True
        self.assertEqual(self.request('GET', '/_inspector/snipping')[0], 404)
        self.assertEqual(self.request('POST', '/_inspector/execute', self.valid_headers())[0], 403)
        self.assertFalse(self.calls)
        self.assertEqual(self.request('POST', '/_inspector/snipping', self.valid_headers())[0], 200)
        self.assertEqual(self.calls, ['launched'])

    def test_missing_native_tool_reports_failure(self):
        self.server.enable_snipping = True
        def fail():
            raise OSError('Synthetic failure')
        self.server.launcher = fail
        self.assertEqual(self.request('POST', '/_inspector/snipping', self.valid_headers())[0], 503)
        self.assertFalse(self.calls)

    def test_printscreen_requires_separate_opt_in_and_fixed_post(self):
        self.server.printscreen_launcher = lambda: self.calls.append('printscreen')
        self.server.enable_snipping = True
        self.assertEqual(self.request('POST', '/_inspector/printscreen', self.valid_headers())[0], 403)
        self.server.enable_printscreen = True
        self.assertEqual(self.request('GET', '/_inspector/printscreen')[0], 404)
        self.assertEqual(self.request('POST', '/_inspector/printscreen', {'Origin':'http://evil.example'})[0], 403)
        self.assertFalse(self.calls)
        self.assertEqual(self.request('POST', '/_inspector/printscreen', self.valid_headers())[0], 200)
        self.assertEqual(self.calls, ['printscreen'])


if __name__ == '__main__':
    unittest.main()
