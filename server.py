#!/usr/bin/env python3
"""
Suno Downloader 로컬 서버
- HTML 정적 파일 서빙
- /proxy?url= 엔드포인트로 Suno CDN 요청 중계 (CORS 우회)

실행: python server.py
접속: http://localhost:8765/suno-downloader.html
"""
import http.server
import urllib.request
import urllib.parse

PORT = 8765
ALLOWED_HOSTS = ('cdn1.suno.ai', 'cdn2.suno.ai')


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/proxy?'):
            self._proxy()
        else:
            super().do_GET()

    def _proxy(self):
        qs = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        url = qs.get('url', [''])[0]
        parsed = urllib.parse.urlparse(url)

        if parsed.netloc not in ALLOWED_HOSTS:
            self.send_error(403, 'Forbidden host')
            return

        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Referer': 'https://suno.com/',
            'Origin': 'https://suno.com',
        })
        try:
            with urllib.request.urlopen(req, timeout=60) as resp:
                ct = resp.headers.get('Content-Type', 'application/octet-stream')
                cl = resp.headers.get('Content-Length', '')
                self.send_response(200)
                self.send_header('Content-Type', ct)
                self.send_header('Access-Control-Allow-Origin', '*')
                if cl:
                    self.send_header('Content-Length', cl)
                self.end_headers()
                while True:
                    chunk = resp.read(65536)
                    if not chunk:
                        break
                    self.wfile.write(chunk)
        except urllib.error.HTTPError as e:
            self.send_error(e.code, f'CDN error: {e.reason}')
        except Exception as e:
            self.send_error(502, str(e))

    def log_message(self, fmt, *args):
        print(f'  {args[0]} {args[1]}')


if __name__ == '__main__':
    server = http.server.HTTPServer(('localhost', PORT), Handler)
    print(f'✅ 서버 시작됨: http://localhost:{PORT}/suno-downloader.html')
    print('   종료하려면 Ctrl+C')
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print('\n서버 종료')
