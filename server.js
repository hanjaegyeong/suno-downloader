'use strict';

const express        = require('express');
const https          = require('https');
const { execFile }   = require('child_process');
const path           = require('path');
const { URL }        = require('url');

const app    = express();
const PORT   = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// ─── Chrome-like headers ───
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
           '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

function sunoHeaders(token) {
  const h = {
    'User-Agent': UA,
    'Accept-Language': 'en-US,en;q=0.9',
    'Origin':  'https://suno.com',
    'Referer': 'https://suno.com/',
    'sec-ch-ua': '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
    'sec-ch-ua-mobile':   '?0',
    'sec-ch-ua-platform': '"Windows"',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'cross-site',
  };
  if (token) h['Authorization'] = `Bearer ${token}`;
  return h;
}

// ─── Clerk Session Manager ─────────────────────────────────────────────
const CLERK_URL     = 'https://clerk.suno.com';
const CLERK_VERSION = '5.15.0';
const JWT_REFRESH_MS = 50_000;

const session = {
  cookie: '',
  sid: '',
  jwt: '',
  refreshedAt: 0,
  timer: null,
};

function getJwt() { return session.jwt; }

async function clerkGetSessionId(cookie) {
  const url = `${CLERK_URL}/v1/client?_is_native=true&_clerk_js_version=${CLERK_VERSION}`;
  const headers = { 'Authorization': cookie, 'User-Agent': UA, 'Content-Type': 'application/json' };
  const { status, body } = await curlFetch(url, headers);
  if (status !== 200) throw new Error(`Clerk auth failed (${status}): ${body.slice(0, 200)}`);
  const data = JSON.parse(body);
  const sid = data?.response?.last_active_session_id;
  if (!sid) throw new Error('Clerk: no active session — cookie may be expired');
  return sid;
}

async function clerkRefreshJwt() {
  const url = `${CLERK_URL}/v1/client/sessions/${session.sid}/tokens?_is_native=true&_clerk_js_version=${CLERK_VERSION}`;
  const headers = { 'Authorization': session.cookie, 'User-Agent': UA, 'Content-Type': 'application/json' };
  const { status, body } = await curlFetch(url, headers, { method: 'POST', body: '{}' });
  if (status !== 200) throw new Error(`Clerk token refresh failed (${status})`);
  const data = JSON.parse(body);
  const jwt = data?.jwt;
  if (!jwt) throw new Error('Clerk: JWT not found in response');
  session.jwt = jwt;
  session.refreshedAt = Date.now();
  return jwt;
}

function stopSession() {
  if (session.timer) { clearInterval(session.timer); session.timer = null; }
  session.cookie = '';
  session.sid = '';
  session.jwt = '';
  session.refreshedAt = 0;
}

// POST /api/auth/cookie — initialize Clerk session with __client cookie
app.post('/api/auth/cookie', async (req, res) => {
  const { cookie } = req.body;
  if (!cookie) return res.status(400).json({ error: 'cookie is required' });

  stopSession();

  try {
    session.cookie = cookie;
    session.sid = await clerkGetSessionId(cookie);
    await clerkRefreshJwt();

    session.timer = setInterval(async () => {
      try {
        await clerkRefreshJwt();
        console.log('[clerk] JWT auto-refreshed');
      } catch (err) {
        console.error('[clerk] JWT refresh failed, retrying with new session ID:', err.message);
        try {
          session.sid = await clerkGetSessionId(session.cookie);
          await clerkRefreshJwt();
          console.log('[clerk] JWT recovered after session ID refresh');
        } catch (retryErr) {
          console.error('[clerk] Recovery failed, stopping session:', retryErr.message);
          stopSession();
        }
      }
    }, JWT_REFRESH_MS);

    console.log(`[clerk] Session OK (sid=${session.sid.slice(0, 12)}…)`);
    res.json({ ok: true });
  } catch (err) {
    stopSession();
    console.error('[clerk] Init failed:', err.message);
    res.status(401).json({ error: err.message });
  }
});

// GET /api/auth/status — check session health
app.get('/api/auth/status', (_req, res) => {
  const active = !!(session.jwt && session.timer);
  const age = active ? Math.round((Date.now() - session.refreshedAt) / 1000) : -1;
  res.json({ active, tokenAgeSec: age });
});

// DELETE /api/auth — logout
app.delete('/api/auth', (_req, res) => {
  stopSession();
  res.json({ ok: true });
});

// ─── curl-based fetch ──────────────────────────────────────────────────────
// curl's TLS fingerprint is whitelisted by Cloudflare; Node's https/undici
// both get blocked with 503.  Windows 10/11 ships curl in System32.
const CURL_MARKER = '<<<CURL_HTTP_STATUS>>>';

function curlFetch(url, headersObj, { method = 'GET', body = null, timeout = 30 } = {}) {
  return new Promise((resolve, reject) => {
    const args = [
      '--silent',
      '--location',
      '--max-redirs', '5',
      '--compressed',
      '--max-time',   String(timeout),
      '--write-out',  `\n${CURL_MARKER}%{http_code}`,
      '-X', method,
    ];

    for (const [k, v] of Object.entries(headersObj)) {
      args.push('-H', `${k}: ${v}`);
    }
    if (body !== null) {
      args.push('-d', typeof body === 'string' ? body : JSON.stringify(body));
    }
    args.push(url);

    execFile('curl', args, { maxBuffer: 10 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err && !stdout) return reject(new Error(stderr || err.message));

      const markerIdx = stdout.lastIndexOf(`\n${CURL_MARKER}`);
      if (markerIdx === -1) return reject(new Error('curl: response marker missing'));

      const body   = stdout.slice(0, markerIdx);
      const status = parseInt(stdout.slice(markerIdx + CURL_MARKER.length + 1).trim(), 10);
      resolve({ status, body });
    });
  });
}

// ─── GET /api/playlist/:id?page=N ─────────────────────────────────────────
app.get('/api/playlist/:id', async (req, res) => {
  const token = req.headers['x-suno-token'] || '';
  const { id } = req.params;
  const page   = parseInt(req.query.page, 10) || 0;

  const targetUrl = `https://studio-api.prod.suno.com/api/playlist/${id}/?page=${page}`;
  const headers   = { ...sunoHeaders(token), 'Accept': 'application/json, text/plain, */*' };

  console.log(`[playlist] curl → ${targetUrl}`);

  try {
    const { status, body } = await curlFetch(targetUrl, headers);
    console.log(`[playlist] curl ← ${status}`);
    res.status(status).set('Content-Type', 'application/json').send(body);
  } catch (err) {
    console.error('[playlist] curl error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: err.message });
  }
});

// ─── WAV middleware: require active Clerk session ──────────────────────────
function requireSession(req, res, next) {
  const jwt = getJwt();
  if (!jwt) return res.status(401).json({ error: 'Suno Pro 쿠키를 먼저 설정해주세요.' });
  req.sunoJwt = jwt;
  next();
}

// ─── POST /api/wav/convert/:clipId — trigger WAV conversion ────────────────
app.post('/api/wav/convert/:clipId', requireSession, async (req, res) => {
  const { clipId } = req.params;
  const targetUrl = `https://studio-api.prod.suno.com/api/gen/${clipId}/convert_wav/`;
  const headers = {
    ...sunoHeaders(req.sunoJwt),
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  console.log(`[wav-convert] curl POST → ${targetUrl}`);
  try {
    const { status, body } = await curlFetch(targetUrl, headers, { method: 'POST', body: '{}' });
    console.log(`[wav-convert] curl ← ${status}`);
    res.status(status).set('Content-Type', 'application/json').send(body || '{}');
  } catch (err) {
    console.error('[wav-convert] curl error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: err.message });
  }
});

// ─── GET /api/wav/url/:clipId — poll WAV file URL ──────────────────────────
app.get('/api/wav/url/:clipId', requireSession, async (req, res) => {
  const { clipId } = req.params;
  const targetUrl = `https://studio-api.prod.suno.com/api/gen/${clipId}/wav_file/`;
  const headers = { ...sunoHeaders(req.sunoJwt), 'Accept': 'application/json, text/plain, */*' };

  console.log(`[wav-url] curl → ${targetUrl}`);
  try {
    const { status, body } = await curlFetch(targetUrl, headers);
    console.log(`[wav-url] curl ← ${status}`);
    res.status(status).set('Content-Type', 'application/json').send(body);
  } catch (err) {
    console.error('[wav-url] curl error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: err.message });
  }
});

// ─── GET /api/audio?url=<encoded>&name=<encoded> ──────────────────────────
app.get('/api/audio', (req, res) => {
  const token  = req.headers['x-suno-token'] || '';
  const rawUrl = req.query.url;
  const name   = req.query.name || 'track.mp3';

  if (!rawUrl) return res.status(400).json({ error: 'Missing url parameter' });

  let parsed;
  try { parsed = new URL(rawUrl); }
  catch { return res.status(400).json({ error: 'Invalid url parameter' }); }

  if (!isAllowedHost(parsed.hostname)) {
    return res.status(403).json({ error: 'Forbidden CDN host' });
  }

  const safeName = name.replace(/[^\w\s.\-()[\]]/g, '_').slice(0, 200);
  const headers  = {
    ...sunoHeaders(token),
    'Accept': 'audio/webm,audio/ogg,audio/wav,audio/*;q=0.9,*/*;q=0.8',
  };

  console.log(`[audio] → ${parsed.hostname}${parsed.pathname}`);
  streamAudio(parsed.href, headers, safeName, res);
});

function isAllowedHost(hostname) {
  return hostname.endsWith('.suno.ai') || hostname.endsWith('.suno.com');
}

function streamAudio(targetUrl, headers, safeName, res, redirectCount = 0) {
  if (redirectCount > 5) return res.status(508).json({ error: 'Too many redirects' });
  let parsed;
  try { parsed = new URL(targetUrl); }
  catch { return res.status(400).json({ error: 'Invalid redirect URL' }); }

  const upReq = https.request(
    { hostname: parsed.hostname, port: 443, path: parsed.pathname + parsed.search, method: 'GET', headers },
    (upRes) => {
      console.log(`[audio] ← ${upRes.statusCode}`);

      if ([301, 302, 303, 307, 308].includes(upRes.statusCode)) {
        const loc = upRes.headers['location'];
        upRes.resume();
        if (!loc) return res.status(502).json({ error: 'Redirect with no location' });
        let rParsed;
        try { rParsed = new URL(loc); } catch { return res.status(502).json({ error: 'Bad redirect URL' }); }
        if (!isAllowedHost(rParsed.hostname)) return res.status(403).json({ error: 'Redirect to forbidden host' });
        return streamAudio(loc, headers, safeName, res, redirectCount + 1);
      }

      res.status(upRes.statusCode);
      res.set('Content-Type', upRes.headers['content-type'] || 'audio/mpeg');
      res.set('Content-Disposition', `attachment; filename="${safeName}"`);
      if (upRes.headers['content-length']) res.set('Content-Length', upRes.headers['content-length']);
      upRes.pipe(res);
    }
  );

  upReq.on('error', (err) => {
    console.error('[audio] error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: err.message });
  });
  upReq.end();
}

// ─── Production: serve Vite build ─────────────────────────────────────────
if (isProd) {
  const distDir = path.join(__dirname, 'dist');
  app.use(express.static(distDir));
  app.get('*', (_req, res) => res.sendFile(path.join(distDir, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  if (!isProd) console.log('   Dev mode — Vite at http://localhost:5173');
});
