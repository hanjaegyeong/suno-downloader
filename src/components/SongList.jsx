import { useState, useEffect, Fragment } from 'react';
import JSZip from 'jszip';
import AdSlot from './AdSlot';

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

async function fetchWavBlob(clipId) {
  const convResp = await fetch(`/api/wav/convert/${clipId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  if (convResp.status === 401) throw new Error('Pro 쿠키를 먼저 연결해주세요');
  if (convResp.status === 403) throw new Error('WAV는 Suno Pro 플랜 필요');
  if (!convResp.ok) throw new Error(`변환 요청 실패 HTTP ${convResp.status}`);

  for (let attempt = 0; attempt < 30; attempt++) {
    await sleep(2000);
    const urlResp = await fetch(`/api/wav/url/${clipId}`);
    if (!urlResp.ok) continue;
    const data = await urlResp.json();
    const wavUrl = data.wav_file_url;
    if (wavUrl) {
      const name = `${clipId}.wav`;
      const audioResp = await fetch(`/api/audio?url=${encodeURIComponent(wavUrl)}&name=${encodeURIComponent(name)}`);
      if (!audioResp.ok) throw new Error(`WAV 다운로드 실패 HTTP ${audioResp.status}`);
      return audioResp.blob();
    }
  }
  throw new Error('WAV 변환 시간 초과 (60초)');
}

export default function SongList({ songs, fmt, onStatus }) {
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
    if (f === 'wav') {
      return fetchWavBlob(song.id);
    }
    return fetchTrackBlob(getProxyUrl(song, 'mp3'));
  };

  const dlOne = async (song, f, btnKey) => {
    markBtn(btnKey, 'loading');
    try {
      const blob = await downloadBlob(song, f);
      triggerBlobDownload(blob, `${sanitize(song.title)}.${f}`);
      markBtn(btnKey, 'done', 2500);
    } catch (err) {
      markBtn(btnKey, 'error', 3000);
      onStatus({ msg: `❌ "${song.title}" 다운로드 실패: ${err.message}`, type: 'error' });
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
        failed++;
        console.warn(`다운로드 실패: ${song.title}`, e);
      }
    }

    if (zip.file(/.*/).length === 0) {
      setDlProgress(null);
      onStatus({ msg: '❌ 다운로드된 트랙이 없어 ZIP을 생성할 수 없습니다.', type: 'error' });
      return;
    }

    setDlProgress({ current: 0, total: 1, phase: 'zip' });

    try {
      const zipBlob = await zip.generateAsync({ type: 'blob' }, (meta) => {
        setDlProgress({ current: Math.round(meta.percent), total: 100, phase: 'zip' });
      });

      triggerBlobDownload(zipBlob, `suno-playlist.zip`);

      setDlProgress(null);
      if (failed) {
        onStatus({ msg: `⚠️ ${total - failed}개 성공, ${failed}개 실패 — ZIP 다운로드 완료`, type: 'error' });
      } else {
        onStatus({ msg: `✅ 전체 ${total}개 트랙 ZIP 다운로드 완료!`, type: 'ok' });
      }
    } catch (err) {
      setDlProgress(null);
      onStatus({ msg: `❌ ZIP 생성 실패: ${err.message}`, type: 'error' });
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
      {/* Results bar */}
      <div className="results-bar">
        <h2>🎵 {songs.length}개 트랙</h2>
        <button className="btn-all" onClick={dlAll} disabled={!!dlProgress}>
          {dlProgress
            ? dlProgress.phase === 'zip'
              ? `📦 ZIP 생성 중 ${dlProgress.current}%`
              : `⏳ ${dlProgress.current}/${dlProgress.total} 다운로드 중`
            : '📦 전체 ZIP 다운로드'}
        </button>
      </div>

      {/* Song list */}
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

              {/* ⑥ In-list ad — every 5 tracks */}
              {(i + 1) % 5 === 0 && i + 1 < songs.length && (
                <div className="in-list-ad">
                  <AdSlot type="468" label="⑥ In-list Banner (5곡마다) — 스크롤 중 자연 노출" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>

      {/* ④ ⑤ Post-results ads */}
      <div className="ad-row">
        <AdSlot
          type="336"
          label="④ Large Rectangle 336×280"
          sublabel="결과 하단 — 체류 유저 타겟, 단가 높음"
        />
        <AdSlot
          type="300"
          label="⑤ Medium Rectangle 300×250"
          sublabel="사이드 or 하단 병렬 배치"
        />
      </div>
    </div>
  );
}
