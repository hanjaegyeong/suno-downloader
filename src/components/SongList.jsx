import { useState, useEffect, Fragment } from 'react';
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

async function fetchTrackBlob(proxyUrl) {
  const resp = await fetch(proxyUrl);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.blob();
}

function sleep(ms) { return new Promise((r) => setTimeout(r, ms)); }

class CookieExpiredError extends Error {
  constructor(msg) { super(msg); this.name = 'CookieExpiredError'; }
}

async function fetchWavBlob(clipId) {
  const convResp = await fetch(`/api/wav/convert/${clipId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (convResp.status === 401) throw new CookieExpiredError(t('proCookieRequired'));
  if (convResp.status === 403) throw new Error(t('wavProRequired'));
  if (!convResp.ok) throw new Error(`${t('wavConvertFail')} ${convResp.status}`);

  for (let attempt = 0; attempt < 30; attempt++) {
    await sleep(2000);
    const urlResp = await fetch(`/api/wav/url/${clipId}`);
    if (urlResp.status === 401) throw new CookieExpiredError(t('proCookieRequired'));
    if (!urlResp.ok) continue;
    const data = await urlResp.json();
    const wavUrl = data.wav_file_url;
    if (wavUrl) {
      const name = `${clipId}.wav`;
      const audioResp = await fetch(`/api/audio?url=${encodeURIComponent(wavUrl)}&name=${encodeURIComponent(name)}`);
      if (!audioResp.ok) throw new Error(`${t('wavDownloadFail')} ${audioResp.status}`);
      return audioResp.blob();
    }
  }
  throw new Error(t('wavTimeout'));
}

export default function SongList({ songs, fmt, onStatus, lang, onCookieExpired }) {
  const [btnStates, setBtnStates] = useState({});
  const [dlProgress, setDlProgress] = useState(null);

  useEffect(() => {
    setBtnStates({});
    setDlProgress(null);
  }, [songs]);

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

  const downloadBlob = async (song, f) => {
    if (f === 'wav') return fetchWavBlob(song.id);
    return fetchTrackBlob(getProxyUrl(song, 'mp3'));
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
    const zip = new JSZip();
    const total = songs.length;
    let failed = 0;

    setDlProgress({ current: 0, total, phase: 'download' });

    for (let i = 0; i < total; i++) {
      const song = songs[i];
      const filename = `${String(i + 1).padStart(2, '0')} - ${sanitize(song.title)}.${fmt}`;
      setDlProgress({ current: i + 1, total, phase: 'download' });

      try {
        const blob = await downloadBlob(song, fmt);
        zip.file(filename, blob);
      } catch (e) {
        if (e instanceof CookieExpiredError && onCookieExpired) {
          onStatus({ msg: t('cookieExpired'), type: 'error' });
          const reconnected = await onCookieExpired();
          if (reconnected) {
            i--;
            continue;
          }
          setDlProgress(null);
          return;
        }
        failed++;
        console.warn(`Download failed: ${song.title}`, e);
      }
    }

    if (zip.file(/.*/).length === 0) {
      setDlProgress(null);
      onStatus({ msg: t('dlFailEmpty'), type: 'error' });
      return;
    }

    setDlProgress({ current: 0, total: 1, phase: 'zip' });

    try {
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
      onStatus({ msg: `${t('dlZipFail')} ${err.message}`, type: 'error' });
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
        <button className="btn-all" onClick={dlAll} disabled={!!dlProgress}>
          {dlProgress
            ? dlProgress.phase === 'zip'
              ? `${t('dlZipping')} ${dlProgress.current}%`
              : `⏳ ${dlProgress.current}/${dlProgress.total} ${t('dlProgress')}`
            : t('dlAllZip')}
        </button>
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
                      src={song.img}
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
