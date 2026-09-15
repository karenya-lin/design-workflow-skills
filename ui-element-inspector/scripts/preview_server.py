"""Foreground loopback preview. Optional, click-only Windows Snipping Tool launch."""
import argparse
import hmac
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import json
import os
from pathlib import Path
import secrets
import subprocess
import sys

ASSETS = Path(__file__).resolve().parents[1] / 'assets'


def launch_snipping_tool():
    if sys.platform != 'win32':
        raise OSError('Windows only')
    candidates = [Path(os.environ.get('SystemRoot', r'C:\Windows')) / 'System32' / 'SnippingTool.exe']
    if os.environ.get('LOCALAPPDATA'):
        candidates.append(Path(os.environ['LOCALAPPDATA']) / 'Microsoft' / 'WindowsApps' / 'SnippingTool.exe')
    executable = next((p for p in candidates if p.is_absolute() and p.is_file()), None)
    if executable is None:
        raise OSError('Snipping Tool executable unavailable')
    subprocess.Popen([str(executable)], shell=False)


class PreviewServer(ThreadingHTTPServer):
    daemon_threads = True

    def __init__(self, port, enable_snipping=False, launcher=launch_snipping_tool):
        self.enable_snipping = enable_snipping
        self.launcher = launcher
        self.token = secrets.token_urlsafe(32)
        super().__init__(('127.0.0.1', port), PreviewHandler)
        self.origin = f'http://127.0.0.1:{self.server_port}'


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ASSETS), **kwargs)

    def safe_host(self):
        return self.headers.get('Host') == f'127.0.0.1:{self.server.server_port}'

    def reply(self, code, body):
        data = json.dumps(body).encode()
        self.send_response(code)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_GET(self):
        if not self.safe_host():
            self.reply(403, {'error': 'Host rejected'})
        elif self.path == '/_inspector/capabilities':
            self.reply(200, {'snipping': self.server.enable_snipping,
                             'token': self.server.token if self.server.enable_snipping else None})
        elif self.path.startswith('/_inspector/'):
            self.reply(404, {'error': 'Unknown action'})
        else:
            super().do_GET()

    def do_POST(self):
        authorized = (self.safe_host()
                      and self.headers.get('Origin') == self.server.origin
                      and hmac.compare_digest(self.headers.get('X-Inspector-Token', ''), self.server.token)
                      and self.headers.get('Content-Length', '0') == '0'
                      and not self.headers.get('Transfer-Encoding'))
        if not authorized:
            self.reply(403, {'error': 'Request rejected'})
        elif self.path != '/_inspector/snipping' or not self.server.enable_snipping:
            self.reply(403, {'error': 'Snipping is not enabled'})
        else:
            try:
                self.server.launcher()
                self.reply(200, {'launched': True})
            except OSError:
                self.reply(503, {'error': 'Use Win+Shift+S; native launch unavailable'})


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--port', type=int, required=True)
    parser.add_argument('--enable-snipping', action='store_true', help='Allow explicit UI clicks to open Windows Snipping Tool')
    args = parser.parse_args()
    if not 1024 <= args.port <= 65535:
        parser.error('port must be between 1024 and 65535')
    if args.enable_snipping and sys.platform != 'win32':
        parser.error('--enable-snipping requires Windows')
    try:
        server = PreviewServer(args.port, args.enable_snipping)
    except OSError as error:
        parser.exit(1, f'Cannot bind requested port; no process stopped: {error}\n')
    print(f'{server.origin}/rwd-preview.html\nSnipping enabled: {args.enable_snipping}. Ctrl+C stops this preview.', flush=True)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()


if __name__ == '__main__':
    main()
