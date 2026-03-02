import { useState, useCallback } from 'react';
import Downloader from './components/Downloader';
import SongList from './components/SongList';
import AdSlot from './components/AdSlot';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [fmt, setFmt] = useState('mp3');
  const [showCookie, setShowCookie] = useState(false);
  const [cookieInput, setCookieInput] = useState('');
  const [proActive, setProActive] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const connectCookie = useCallback(async () => {
    const val = cookieInput.trim();
    if (!val) return;
    setConnecting(true);
    setStatus({ msg: 'Suno Pro 연결 중…', type: 'loading' });
    try {
      const resp = await fetch('/api/auth/cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie: val }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`);
      setProActive(true);
      setStatus({ msg: '✅ Suno Pro 연결 완료! WAV 다운로드 가능.', type: 'ok' });
    } catch (err) {
      setProActive(false);
      setStatus({ msg: `❌ 연결 실패: ${err.message}`, type: 'error' });
    } finally {
      setConnecting(false);
    }
  }, [cookieInput]);

  const disconnectCookie = useCallback(async () => {
    await fetch('/api/auth', { method: 'DELETE' }).catch(() => {});
    setProActive(false);
    setCookieInput('');
    setFmt('mp3');
    setStatus({ msg: 'Pro 연결 해제됨.', type: 'ok' });
  }, []);

  const handleFmtChange = (f) => {
    setFmt(f);
  };

  return (
    <>
      {/* ① 최상단 Leaderboard 728×90 — 최고 노출 */}
      <div style={{ background: '#0a0a12', padding: '8px 18px 4px' }}>
        <div className="wrap">
          <AdSlot type="728" label="① Leaderboard 728×90 — 최상단 (최고 노출)" />
        </div>
      </div>

      {/* Sticky header */}
      <header>
        <div className="wrap">
          <div className="header-inner">
            <div className="logo">
              SunoDL<span className="logo-dot">.</span>{' '}
              <span className="pill">FREE</span>
            </div>
            <button
              className={`token-badge ${proActive ? 'ok' : 'neutral'}`}
              onClick={() => setShowCookie(!showCookie)}
            >
              {proActive ? '● Pro 연결됨' : '● WAV용 Pro 연결 (선택)'}
            </button>
          </div>
        </div>
      </header>

      {/* Cookie modal */}
      {showCookie && (
        <div className="cookie-overlay" onClick={(e) => { if (e.target === e.currentTarget) setShowCookie(false); }}>
          <div className="cookie-modal">
            <div className="cookie-modal-head">
              <h3>🔑 Suno Pro 계정 연동</h3>
              <button className="cookie-close" onClick={() => setShowCookie(false)}>×</button>
            </div>

            <div className="cookie-guide">
              <b>WAV 다운로드</b>에는 Suno Pro/Premier 계정의 쿠키가 필요합니다.<br /><br />
              <b style={{ color: 'var(--acc3)' }}>쿠키 취득 방법:</b><br />
              1. <a href="https://suno.com" target="_blank" rel="noopener noreferrer">suno.com</a>에 로그인<br />
              2. <b>F12</b> (개발자도구) → <b>Application</b> 탭<br />
              3. 좌측 <b>Cookies</b> → <code>https://suno.com</code> 클릭<br />
              4. <code>__client</code> 항목의 <b>Value</b>를 복사<br />
              5. 아래에 붙여넣기 후 "연결" 클릭
            </div>

            <div className="cookie-input-row">
              <input
                type="text"
                className="token-input"
                placeholder="__client 쿠키 값을 붙여넣으세요…"
                value={cookieInput}
                onChange={(e) => setCookieInput(e.target.value)}
                spellCheck="false"
                autoFocus
                disabled={connecting}
              />
            </div>

            <div className="cookie-actions">
              {proActive ? (
                <>
                  <p className="cookie-status ok">✅ 세션 활성 — JWT 자동 갱신 중 (만료 없음)</p>
                  <button className="token-clear" onClick={disconnectCookie}>연결 해제</button>
                </>
              ) : (
                <button
                  className="btn-main"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={connectCookie}
                  disabled={connecting || !cookieInput.trim()}
                >
                  {connecting ? <><span className="spin" /> 연결 중…</> : '연결'}
                </button>
              )}
            </div>

            {!proActive && (
              <p className="cookie-note">
                쿠키는 서버 메모리에만 저장되며, 서버가 JWT를 자동 갱신하므로 시간 제한이 없습니다.
              </p>
            )}
          </div>
        </div>
      )}

      <main>
        <div className="wrap">
          {/* Hero */}
          <section className="hero">
            <h1>
              Suno 플레이리스트<br />
              <em>전곡 다운로드</em>
            </h1>
            <p>
              플레이리스트 URL만 붙여넣으면<br />
              MP3 · WAV 무료 다운로드
            </p>
          </section>

          {/* URL input + format selector */}
          <Downloader
            onSongs={setSongs}
            onStatus={setStatus}
            fmt={fmt}
            onFmt={handleFmtChange}
            hasToken={proActive}
          />

          {/* Status message */}
          {status.msg && (
            <div id="status" className={status.type}>
              {status.type === 'loading' && <span className="spin" />}
              {status.msg}
            </div>
          )}

          {/* WAV requires Pro connection */}
          {fmt === 'wav' && !proActive && (
            <div className="wav-warn">
              <span>WAV 다운로드는 Suno Pro 계정 연동이 필요합니다.</span>
              <button onClick={() => setShowCookie(true)}>계정 연동하기 →</button>
            </div>
          )}

          {/* Track list */}
          {songs.length > 0 && (
            <SongList
              songs={songs}
              fmt={fmt}
              onStatus={setStatus}
            />
          )}

          {/* ② Mid-page Leaderboard */}
          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 16px' }}>
            <AdSlot type="728" label="② Mid-page Leaderboard 728×90" />
          </div>

          {/* ③ Footer Rectangle */}
          <div className="footer-ads">
            <div className="ad-row">
              <AdSlot
                type="336"
                label="③ Footer Rectangle 336×280"
                sublabel="페이지 이탈 직전 — 높은 전환율"
              />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <p>SunoDL &copy; 2025 · Suno AI와 무관한 독립 서비스입니다.</p>
          <p>음악 저작권은 각 제작자에게 있습니다. 개인 용도로만 사용하세요.</p>
          <p style={{ marginTop: 6 }}>
            <a href="#">Privacy Policy</a>
            &nbsp;·&nbsp;
            <a href="#">Terms of Use</a>
          </p>
        </div>
      </footer>
    </>
  );
}
