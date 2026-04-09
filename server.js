'use strict';

const express        = require('express');
const { execFile, spawn } = require('child_process');
const crypto         = require('crypto');
const path           = require('path');
const { URL }        = require('url');

const app    = express();
const PORT   = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json());

// ─── Redirect fly.dev → custom domain ───
if (isProd) {
  app.use((req, res, next) => {
    if (req.hostname === 'suno-dl-kr.fly.dev' || req.hostname === 'suno-down.kro.kr') {
      return res.redirect(301, `https://suno-down.com${req.originalUrl}`);
    }
    next();
  });
}

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

// ─── Clerk Multi-Session Manager ──────────────────────────────────────
const CLERK_URL      = 'https://clerk.suno.com';
const CLERK_VERSION  = '5.15.0';
const JWT_REFRESH_MS = 50_000;
const SESSION_TTL    = 2 * 60 * 60 * 1000; // 2 hours

const sessions = new Map();

function createSession() {
  const id = crypto.randomUUID();
  const sess = { id, cookie: '', sid: '', jwt: '', refreshedAt: 0, timer: null, _refreshLock: null };
  sessions.set(id, sess);
  return sess;
}

function getSession(id) { return id ? sessions.get(id) || null : null; }

function destroySession(id) {
  const sess = sessions.get(id);
  if (!sess) return;
  if (sess.timer) clearInterval(sess.timer);
  sessions.delete(id);
}

// Cleanup expired sessions every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [id, sess] of sessions) {
    if (now - (sess.refreshedAt || sess._createdAt || now) > SESSION_TTL) {
      console.log(`[clerk] Expired session ${id.slice(0, 8)}…`);
      destroySession(id);
    }
  }
}, 5 * 60 * 1000);

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

async function clerkRefreshJwt(sess) {
  if (sess._refreshLock) return sess._refreshLock;
  sess._refreshLock = _doRefreshJwt(sess);
  try { return await sess._refreshLock; }
  finally { sess._refreshLock = null; }
}

async function _doRefreshJwt(sess) {
  const url = `${CLERK_URL}/v1/client/sessions/${sess.sid}/tokens?_is_native=true&_clerk_js_version=${CLERK_VERSION}`;
  const headers = { 'Authorization': sess.cookie, 'User-Agent': UA, 'Content-Type': 'application/json' };
  const { status, body } = await curlFetch(url, headers, { method: 'POST', body: '{}' });
  if (status !== 200) throw new Error(`Clerk token refresh failed (${status})`);
  const data = JSON.parse(body);
  const jwt = data?.jwt;
  if (!jwt) throw new Error('Clerk: JWT not found in response');
  sess.jwt = jwt;
  sess.refreshedAt = Date.now();
  return jwt;
}

function stopSess(sess, keepCookie = false) {
  if (!sess) return;
  if (sess.timer) { clearInterval(sess.timer); sess.timer = null; }
  if (!keepCookie) sess.cookie = '';
  sess.sid = '';
  sess.jwt = '';
  sess.refreshedAt = 0;
}

function startRefreshTimer(sess) {
  if (sess.timer) clearInterval(sess.timer);
  sess.timer = setInterval(async () => {
    try {
      await clerkRefreshJwt(sess);
    } catch (err) {
      console.error(`[clerk:${sess.id.slice(0, 8)}] JWT refresh failed:`, err.message);
      try {
        sess.sid = await clerkGetSessionId(sess.cookie);
        await clerkRefreshJwt(sess);
      } catch (retryErr) {
        console.error(`[clerk:${sess.id.slice(0, 8)}] Recovery failed:`, retryErr.message);
        stopSess(sess, true);
      }
    }
  }, JWT_REFRESH_MS);
}

async function tryAutoRecover(sess) {
  if (!sess?.cookie) return false;
  try {
    sess.sid = await clerkGetSessionId(sess.cookie);
    await clerkRefreshJwt(sess);
    startRefreshTimer(sess);
    return true;
  } catch (err) {
    console.error(`[clerk:${sess.id.slice(0, 8)}] Auto-recovery failed:`, err.message);
    stopSess(sess, false);
    return false;
  }
}

// POST /api/auth/cookie — initialize Clerk session with __client cookie
app.post('/api/auth/cookie', async (req, res) => {
  const { cookie } = req.body;
  if (!cookie) return res.status(400).json({ error: 'cookie is required' });

  const sess = createSession();

  try {
    sess.cookie = cookie;
    sess.sid = await clerkGetSessionId(cookie);
    await clerkRefreshJwt(sess);

    // Check if the account has a Pro/Premier subscription
    const billingUrl = 'https://studio-api.prod.suno.com/api/billing/info/';
    const billingHeaders = { ...sunoHeaders(sess.jwt), 'Accept': 'application/json, text/plain, */*' };
    const { status: bStatus, body: bBody } = await curlFetch(billingUrl, billingHeaders);
    console.log(`[clerk:${sess.id.slice(0, 8)}] Billing ← ${bStatus}`);

    if (bStatus === 200) {
      try {
        const billing = JSON.parse(bBody);
        const plan = billing?.plan?.id || billing?.subscription_type || '';
        console.log(`[clerk:${sess.id.slice(0, 8)}] Plan: ${plan || '(free)'}`);
        if (!plan || plan === 'free' || plan === 'basic') {
          destroySession(sess.id);
          return res.status(403).json({ error: 'WAV 다운로드는 Suno Pro 또는 Premier 플랜이 필요합니다. / WAV download requires Suno Pro or Premier plan.' });
        }
      } catch (parseErr) {
        console.warn('[clerk] Billing parse failed, allowing session:', parseErr.message);
      }
    } else {
      console.warn(`[clerk] Billing check failed (${bStatus}), allowing session`);
    }

    startRefreshTimer(sess);

    console.log(`[clerk:${sess.id.slice(0, 8)}] Session OK`);
    res.json({ ok: true, sessionId: sess.id });
  } catch (err) {
    destroySession(sess.id);
    console.error('[clerk] Init failed:', err.message);
    res.status(401).json({ error: err.message });
  }
});

// GET /api/auth/status — check session health
app.get('/api/auth/status', (req, res) => {
  const sess = getSession(req.headers['x-session-id']);
  if (!sess) return res.json({ active: false, canRecover: false, tokenAgeSec: -1 });
  const active = !!(sess.jwt && sess.timer);
  const canRecover = !active && !!sess.cookie;
  const age = active ? Math.round((Date.now() - sess.refreshedAt) / 1000) : -1;
  res.json({ active, canRecover, tokenAgeSec: age });
});

// DELETE /api/auth — logout
app.delete('/api/auth', (req, res) => {
  const sessId = req.headers['x-session-id'];
  if (sessId) destroySession(sessId);
  res.json({ ok: true });
});

// ─── Global Suno API rate limiter ─────────────────────────────────────────
// Limits concurrent outgoing requests to Suno to prevent IP ban
const SUNO_MAX_CONCURRENT = 10;
const SUNO_MIN_DELAY_MS   = 100; // minimum gap between requests
let sunoInFlight = 0;
const sunoQueue  = [];

function sunoThrottle(fn) {
  return new Promise((resolve, reject) => {
    const run = async () => {
      sunoInFlight++;
      try { resolve(await fn()); }
      catch (e) { reject(e); }
      finally {
        sunoInFlight--;
        setTimeout(() => {
          if (sunoQueue.length > 0 && sunoInFlight < SUNO_MAX_CONCURRENT) {
            sunoQueue.shift()();
          }
        }, SUNO_MIN_DELAY_MS);
      }
    };
    if (sunoInFlight < SUNO_MAX_CONCURRENT) {
      run();
    } else {
      sunoQueue.push(run);
    }
  });
}

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

// ─── Ensure fresh JWT (with lock, safe for concurrent calls) ────────────────
async function ensureFreshJwt(sess) {
  if (!sess) return null;
  if (sess.jwt && (Date.now() - sess.refreshedAt) < 30_000) return sess.jwt;

  if (sess.jwt && sess.sid) {
    try { return await clerkRefreshJwt(sess); }
    catch (_) { /* fall through to recovery */ }
  }

  if (sess.cookie) {
    const recovered = await tryAutoRecover(sess);
    if (recovered) return sess.jwt;
  }

  return null;
}

// ─── WAV middleware: require active Clerk session ──────────────────────────
async function requireSession(req, res, next) {
  const sessId = req.headers['x-session-id'];
  let sess = getSession(sessId);

  if (sess) {
    const jwt = await ensureFreshJwt(sess);
    if (jwt) {
      req.sunoJwt = jwt;
      req.sunoSession = sess;
      return next();
    }
  }

  // Auto-recover from cookie header if no valid session
  const cookieHeader = req.headers['x-clerk-cookie'];
  if (cookieHeader) {
    const newSess = createSession();
    try {
      newSess.cookie = cookieHeader;
      newSess.sid = await clerkGetSessionId(cookieHeader);
      await clerkRefreshJwt(newSess);
      startRefreshTimer(newSess);
      req.sunoJwt = newSess.jwt;
      req.sunoSession = newSess;
      res.set('x-new-session-id', newSess.id);
      return next();
    } catch (err) {
      console.error('[clerk] Auto-recovery failed:', err.message);
      destroySession(newSess.id);
    }
  }

  return res.status(401).json({ error: 'Suno Pro 쿠키를 먼저 설정해주세요.' });
}

// ─── Helper: call Suno API with auto-retry on 401 ──────────────────────────
async function sunoFetch(url, headersObj, opts = {}, sess = null) {
  let result = await sunoThrottle(() => curlFetch(url, headersObj, opts));

  if (result.status === 401 && sess?.cookie) {
    console.log('[suno] 401 received, refreshing JWT and retrying...');
    const freshJwt = await ensureFreshJwt(sess);
    if (freshJwt) {
      headersObj['Authorization'] = `Bearer ${freshJwt}`;
      result = await sunoThrottle(() => curlFetch(url, headersObj, opts));
      console.log(`[suno] retry ← ${result.status}`);
    }
  }

  return result;
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
    const { status, body } = await sunoFetch(targetUrl, headers, { method: 'POST', body: '{}' }, req.sunoSession);
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
    const { status, body } = await sunoFetch(targetUrl, headers, {}, req.sunoSession);
    console.log(`[wav-url] curl ← ${status}`);
    res.status(status).set('Content-Type', 'application/json').send(body);
  } catch (err) {
    console.error('[wav-url] curl error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: err.message });
  }
});

// ─── GET /api/image?url=<encoded> ────────────────────────────────────────
app.get('/api/image', (req, res) => {
  const rawUrl = req.query.url;
  if (!rawUrl) return res.status(400).json({ error: 'Missing url parameter' });

  let parsed;
  try { parsed = new URL(rawUrl); }
  catch { return res.status(400).json({ error: 'Invalid url parameter' }); }

  if (!isAllowedHost(parsed.hostname)) {
    return res.status(403).json({ error: 'Forbidden CDN host' });
  }

  const headersObj = {
    ...sunoHeaders(),
    'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
  };

  const args = [
    '--silent', '--location', '--max-redirs', '5',
    '--max-time', '30', '--fail',
    '--http2', '--tcp-nodelay',
  ];
  for (const [k, v] of Object.entries(headersObj)) {
    args.push('-H', `${k}: ${v}`);
  }
  args.push(parsed.href);

  const ext = parsed.pathname.split('.').pop()?.toLowerCase();
  const ct = { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp' }[ext] || 'image/jpeg';

  res.set('Content-Type', ct);
  res.set('Cache-Control', 'public, max-age=86400');

  const proc = spawn('curl', args);
  proc.stdout.pipe(res);
  proc.on('close', (code) => {
    if (code !== 0 && !res.headersSent) res.status(502).json({ error: 'Image fetch failed' });
  });
  proc.on('error', (err) => {
    if (!res.headersSent) res.status(502).json({ error: err.message });
  });
  res.on('close', () => { proc.kill(); });
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
  streamAudioCurl(parsed.href, headers, safeName, res);
});

function isAllowedHost(hostname) {
  return hostname.endsWith('.suno.ai') || hostname.endsWith('.suno.com');
}

// curl-based streaming — avoids Cloudflare blocking Node's TLS fingerprint
function streamAudioCurl(targetUrl, headersObj, safeName, res) {
  const args = [
    '--silent', '--location', '--max-redirs', '5',
    '--max-time', '600',
    '--fail',
    '--http2',
    '--tcp-nodelay',
  ];
  for (const [k, v] of Object.entries(headersObj)) {
    args.push('-H', `${k}: ${v}`);
  }
  args.push(targetUrl);

  const ext = safeName.split('.').pop()?.toLowerCase();
  const ct = { mp3: 'audio/mpeg', wav: 'audio/wav', m4a: 'audio/mp4' }[ext] || 'application/octet-stream';

  res.set('Content-Type', ct);
  res.set('Content-Disposition', `attachment; filename="${safeName}"`);

  const proc = spawn('curl', args);

  proc.stdout.pipe(res);

  proc.stderr.on('data', (d) => {
    const msg = d.toString().trim();
    if (msg) console.error('[audio-curl] stderr:', msg);
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.error(`[audio-curl] exit code ${code} for ${targetUrl}`);
      if (!res.headersSent) {
        res.status(502).json({ error: 'Download failed' });
      }
    }
  });

  proc.on('error', (err) => {
    console.error('[audio-curl] spawn error:', err.message);
    if (!res.headersSent) res.status(502).json({ error: err.message });
  });

  res.on('close', () => { proc.kill(); });
}

// ─── Production: serve Vite build ─────────────────────────────────────────
if (isProd) {
  const distDir = path.join(__dirname, 'dist');
  app.use(express.static(distDir, {
    maxAge: '7d',
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html')) {
        res.set('Cache-Control', 'public, max-age=3600');
        res.set('X-Robots-Tag', 'index, follow');
      }
    },
  }));
  app.get('*', (_req, res) => {
    res.set('Cache-Control', 'public, max-age=3600');
    res.set('X-Robots-Tag', 'index, follow');
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  if (!isProd) console.log('   Dev mode — Vite at http://localhost:5173');
});
