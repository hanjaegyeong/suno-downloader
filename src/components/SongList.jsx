import { useState, useEffect, useRef, Fragment } from 'react';
import JSZip from 'jszip';
import AdSlot from './AdSlot';
import { t } from '../i18n';

function cdnUrl(id, fmt) {
  return `https://cdn1.suno.ai/${id}.${fmt}`;
}

function sanitize(title) {
  return title.replace(/[/\\?%*:|"<>]/g, '_');
}

function triggerBlobDownload(blob, filename) {
  const objUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = objUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(objUrl), 3000);
}

async function fetchTrackBlob(proxyUrl, signal) {
  const resp = await fetch(proxyUrl, { signal });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.blob();
}

function sleep(ms, signal) {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'));
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => { clearTimeout(timer); reject(new DOMException('Aborted', 'AbortError')); }, { once: true });
  });
}

class CookieExpiredError extends Error {
  constructor(msg) { super(msg); this.name = 'CookieExpiredError'; }
}

function clerkCookieHeaders() {
  const h = {};
  const cookie = localStorage.getItem('suno_clerk_cookie');
  if (cookie) h['x-clerk-cookie'] = cookie;
  const sessId = localStorage.getItem('suno_session_id');
  if (sessId) h['x-session-id'] = sessId;
  return h;
}

async function fetchWavBlob(clipId) {
  const convResp = await fetch(`/api/wav/convert/${clipId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...clerkCookieHeaders() },
  });
  if (convResp.status === 401) throw new CookieExpiredError(t('proCookieRequired'));
  if (convResp.status === 403) throw new Error(t('wavProRequired'));
  if (!convResp.ok) throw new Error(`${t('wavConvertFail')} ${convResp.status}`);

  let consecutiveErrors = 0;
  let delay = 4000;
  while (true) {
    await sleep(delay);
    try {
      const urlResp = await fetch(`/api/wav/url/${clipId}`, { headers: clerkCookieHeaders() });
      if (urlResp.status === 401) throw new CookieExpiredError(t('proCookieRequired'));
      if (urlResp.status === 429) {
        consecutiveErrors++;
        delay = Math.min(delay * 2, 30000);
        continue;
      }
      if (!urlResp.ok) { consecutiveErrors++; }
      else {
        consecutiveErrors = 0;
        delay = 4000;
        const data = await urlResp.json();
        const wavUrl = data.wav_file_url;
        if (wavUrl) {
          const name = `${clipId}.wav`;
          const audioResp = await fetch(`/api/audio?url=${encodeURIComponent(wavUrl)}&name=${encodeURIComponent(name)}`);
          if (!audioResp.ok) throw new Error(`${t('wavDownloadFail')} ${audioResp.status}`);
          return audioResp.blob();
        }
      }
    } catch (e) {
      if (e instanceof CookieExpiredError) throw e;
      consecutiveErrors++;
    }
    if (consecutiveErrors >= 15) throw new Error(t('wavTimeout'));
  }
}

// Kick off WAV conversion without waiting for result (fire-and-forget)
async function startWavConvert(clipId, signal) {
  const resp = await fetch(`/api/wav/convert/${clipId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...clerkCookieHeaders() },
    signal,
  });
  if (resp.status === 401) throw new CookieExpiredError(t('proCookieRequired'));
  if (resp.status === 403) throw new Error(t('wavProRequired'));
}

// Run tasks with concurrency limit
async function pooledMap(items, fn, concurrency = 3, signal) {
  const results = new Array(items.length);
  let idx = 0;
  const worker = async () => {
    while (idx < items.length) {
      if (signal?.aborted) break;
      const i = idx++;
      results[i] = await fn(items[i], i).catch((e) => ({ __error: e }));
    }
  };
  await Promise.all(Array.from({ length: Math.min(concurrency, items.length) }, worker));
  return results;
}

export default function SongList({ songs, fmt, onStatus, lang, onCookieExpired }) {
  const [btnStates, setBtnStates] = useState({});
  const [dlProgress, setDlProgress] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => {
    setBtnStates({});
    setDlProgress(null);
    if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; }
  }, [songs]);

  const cancelDl = () => {
    if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; }
  };

  const getProxyUrl = (song, f) => {
    const raw = f === 'mp3' && song.audioUrl ? song.audioUrl : cdnUrl(song.id, f);
    const fname = `${sanitize(song.title)}.${f}`;
    return `/api/audio?url=${encodeURIComponent(raw)}&name=${encodeURIComponent(fname)}`;
  };

  const markBtn = (key, state, delay = 0) => {
    setBtnStates((s) => ({ ...s, [key]: state }));
    if (delay) {
      setTimeout(() => setBtnStates((s) => { const n = { ...s }; delete n[key]; return n; }), delay);
    }
  };

  const downloadBlob = async (song, f, signal) => {
    if (f === 'wav') return fetchWavBlob(song.id);
    return fetchTrackBlob(getProxyUrl(song, 'mp3'), signal);
  };

  const dlOne = async (song, f, btnKey) => {
    markBtn(btnKey, 'loading');
    try {
      const blob = await downloadBlob(song, f);
      triggerBlobDownload(blob, `${sanitize(song.title)}.${f}`);
      markBtn(btnKey, 'done', 2500);
    } catch (err) {
      if (err instanceof CookieExpiredError && onCookieExpired) {
        const reconnected = await onCookieExpired();
        if (reconnected) return dlOne(song, f, btnKey);
      }
      markBtn(btnKey, 'error', 3000);
      onStatus({ msg: `❌ "${song.title}" ${t('dlOneFail')} ${err.message}`, type: 'error' });
    }
  };

  const dlAll = async () => {
    const ac = new AbortController();
    abortRef.current = ac;
    const { signal } = ac;

    const zip = new JSZip();
    const total = songs.length;
    let failed = 0;
    let completed = 0;

    setDlProgress({ current: 0, total, phase: 'download' });

    try {
      // WAV: pipeline — each worker does convert → poll → download
      if (fmt === 'wav') {
        const results = await pooledMap(songs, async (song, i) => {
          const filename = `${String(i + 1).padStart(2, '0')} - ${sanitize(song.title)}.wav`;

          // Step 1: Trigger conversion
          await startWavConvert(song.id, signal);

          // Step 2: Poll until WAV is ready, then download
          let consecutiveErrors = 0;
          let delay = 2000;
          while (true) {
            await sleep(delay, signal);
            try {
              const urlResp = await fetch(`/api/wav/url/${song.id}`, { headers: clerkCookieHeaders(), signal });
              if (urlResp.status === 401) throw new CookieExpiredError(t('proCookieRequired'));
              if (urlResp.status === 429) {
                consecutiveErrors++;
                delay = Math.min(delay * 2, 30000);
                continue;
              }
              if (!urlResp.ok) { consecutiveErrors++; }
              else {
                consecutiveErrors = 0;
                delay = 2000;
                const data = await urlResp.json();
                const wavUrl = data.wav_file_url;
                if (wavUrl) {
                  const name = `${song.id}.wav`;
                  const audioResp = await fetch(`/api/audio?url=${encodeURIComponent(wavUrl)}&name=${encodeURIComponent(name)}`, { signal });
                  if (!audioResp.ok) throw new Error(`${t('wavDownloadFail')} ${audioResp.status}`);
                  const blob = await audioResp.blob();
                  completed++;
                  setDlProgress({ current: completed, total, phase: 'download' });
                  return { filename, blob };
                }
              }
            } catch (e) {
              if (e.name === 'AbortError') throw e;
              if (e instanceof CookieExpiredError) throw e;
              consecutiveErrors++;
            }
            if (consecutiveErrors >= 15) throw new Error(t('wavTimeout'));
          }
        }, 8, signal);

        for (const r of results) {
          if (r && r.__error) {
            if (r.__error.name === 'AbortError') throw r.__error;
            if (r.__error instanceof CookieExpiredError && onCookieExpired) {
              onStatus({ msg: t('cookieExpired'), type: 'error' });
              await onCookieExpired();
              setDlProgress(null);
              abortRef.current = null;
              return;
            }
            failed++;
          } else if (r && r.filename) {
            zip.file(r.filename, r.blob);
          }
        }
      } else {
        // MP3: parallel download (5 concurrent)
        const results = await pooledMap(songs, async (song, i) => {
          const filename = `${String(i + 1).padStart(2, '0')} - ${sanitize(song.title)}.${fmt}`;
          const blob = await downloadBlob(song, fmt, signal);
          completed++;
          setDlProgress({ current: completed, total, phase: 'download' });
          return { filename, blob };
        }, 5, signal);

        for (const r of results) {
          if (r && r.__error) {
            if (r.__error.name === 'AbortError') throw r.__error;
            if (r.__error instanceof CookieExpiredError && onCookieExpired) {
              onStatus({ msg: t('cookieExpired'), type: 'error' });
              await onCookieExpired();
              setDlProgress(null);
              abortRef.current = null;
              return;
            }
            failed++;
          } else if (r && r.filename) {
            zip.file(r.filename, r.blob);
          }
        }
      }

      if (zip.file(/.*/).length === 0) {
        setDlProgress(null);
        abortRef.current = null;
        onStatus({ msg: t('dlFailEmpty'), type: 'error' });
        return;
      }

      setDlProgress({ current: 0, total: 1, phase: 'zip' });

      const zipBlob = await zip.generateAsync({ type: 'blob' }, (meta) => {
        setDlProgress({ current: Math.round(meta.percent), total: 100, phase: 'zip' });
      });

      triggerBlobDownload(zipBlob, 'suno-playlist.zip');
      setDlProgress(null);

      if (failed) {
        onStatus({
          msg: `⚠️ ${total - failed}${t('dlDonePartial')} ${failed}${t('dlDoneFail')}`,
          type: 'error',
        });
      } else {
        onStatus({ msg: `✅ ${total}${t('dlDoneAll')}`, type: 'ok' });
      }
    } catch (err) {
      setDlProgress(null);
      if (err.name === 'AbortError') {
        onStatus({ msg: t('dlCancelled'), type: 'error' });
      } else {
        onStatus({ msg: `${t('dlZipFail')} ${err.message}`, type: 'error' });
      }
    } finally {
      abortRef.current = null;
    }
  };

  const btnLabel = (state, defaultLabel) => {
    if (state === 'loading') return <span className="spin" />;
    if (state === 'done')    return '✅';
    if (state === 'error')   return '❌';
    return defaultLabel;
  };

  return (
    <div id="results">
      <div className="results-bar">
        <h2>🎵 {songs.length}{t('trackCount')}</h2>
        {dlProgress ? (
          <button className="btn-all btn-cancel" onClick={cancelDl}>
            {dlProgress.phase === 'zip'
              ? `${t('dlZipping')} ${dlProgress.current}%`
              : `⏳ ${dlProgress.current}/${dlProgress.total} ${t('dlProgress')}`}
            {' '}— {t('dlCancel')} ✕
          </button>
        ) : (
          <button className="btn-all" onClick={dlAll}>
            {t('dlAllZip')}
          </button>
        )}
      </div>

      <div className="song-list">
        {songs.map((song, i) => {
          const mainKey = `${i}-${fmt}`;

          return (
            <Fragment key={song.id}>
              <div className="song-card">
                <span className="s-num">{String(i + 1).padStart(2, '0')}</span>

                {song.img
                  ? (
                    <img
                      className="s-img"
                      src={`/api/image?url=${encodeURIComponent(song.img)}`}
                      alt=""
                      loading="lazy"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )
                  : <div className="s-placeholder">🎵</div>
                }

                <div className="s-info">
                  <div className="s-title" title={song.title}>{song.title}</div>
                  <div className="s-id">{song.id}</div>
                </div>

                <div className="s-btns">
                  <button
                    className="s-btn"
                    onClick={() => dlOne(song, fmt, mainKey)}
                    disabled={btnStates[mainKey] === 'loading'}
                  >
                    {btnLabel(btnStates[mainKey], `⬇ ${fmt.toUpperCase()}`)}
                  </button>

                  <a
                    className="s-btn suno"
                    href={`https://suno.com/song/${song.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    🔗
                  </a>
                </div>
              </div>

              {(i + 1) % 5 === 0 && i + 1 < songs.length && (
                <div className="in-list-ad">
                  <AdSlot type="468" label="In-list Banner" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="ad-row">
        <AdSlot type="336" label="④ Large Rectangle 336×280" />
        <AdSlot type="300" label="⑤ Medium Rectangle 300×250" />
      </div>
    </div>
  );
}
