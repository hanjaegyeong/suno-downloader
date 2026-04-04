import { useState, useCallback, useRef, useEffect } from 'react';
import Downloader from './components/Downloader';
import SongList from './components/SongList';
import AdSlot from './components/AdSlot';
import { t, getLang, setLang, LANGS } from './i18n';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [status, setStatus] = useState({ msg: '', type: '' });
  const [fmt, setFmt] = useState('mp3');
  const [showCookie, setShowCookie] = useState(false);
  const [cookieInput, setCookieInput] = useState(() => localStorage.getItem('suno_clerk_cookie') || '');
  const [proActive, setProActive] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [lang, setLangState] = useState(getLang);

  // Auto-reconnect if cookie was saved from a previous session
  useEffect(() => {
    const saved = localStorage.getItem('suno_clerk_cookie');
    if (saved) {
      fetch('/api/auth/cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie: saved }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.ok) setProActive(true);
        })
        .catch(() => {});
    }
  }, []);

  const changeLang = (code) => {
    setLang(code);
    setLangState(code);
  };

  const connectCookie = useCallback(async () => {
    const val = cookieInput.trim();
    if (!val) return;
    setConnecting(true);
    setStatus({ msg: t('connectingStatus'), type: 'loading' });
    try {
      const resp = await fetch('/api/auth/cookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cookie: val }),
      });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.error || `HTTP ${resp.status}`);
      localStorage.setItem('suno_clerk_cookie', val);
      setProActive(true);
      setShowCookie(false);
      setStatus({ msg: t('connectOk'), type: 'ok' });
      if (cookieResolveRef.current) {
        cookieResolveRef.current(true);
        cookieResolveRef.current = null;
      }
    } catch (err) {
      setProActive(false);
      setStatus({ msg: `${t('connectFail')} ${err.message}`, type: 'error' });
    } finally {
      setConnecting(false);
    }
  }, [cookieInput, lang]);

  const cookieResolveRef = useRef(null);

  const handleCookieExpired = useCallback(() => {
    setProActive(false);
    setShowCookie(true);
    setStatus({ msg: t('cookieExpired'), type: 'error' });
    return new Promise((resolve) => {
      cookieResolveRef.current = resolve;
    });
  }, [lang]);

  const disconnectCookie = useCallback(async () => {
    await fetch('/api/auth', { method: 'DELETE' }).catch(() => {});
    localStorage.removeItem('suno_clerk_cookie');
    setProActive(false);
    setCookieInput('');
    setFmt('mp3');
    setStatus({ msg: t('disconnected'), type: 'ok' });
  }, [lang]);

  const handleFmtChange = (f) => {
    setFmt(f);
  };

  return (
    <>
      {/* Top Leaderboard */}
      <div style={{ background: '#0a0a12', padding: '8px 18px 4px' }}>
        <div className="wrap">
          <AdSlot type="728" label="① Leaderboard 728×90" />
        </div>
      </div>

      <header>
        <div className="wrap">
          <div className="header-inner">
            <div className="logo">
              SunoDown<span className="logo-dot">.</span>{' '}
              <span className="pill">FREE</span>
            </div>
            <div className="header-right">
              <div className="lang-wrapper">
                <span className="lang-label">Language</span>
                <select
                  className="lang-select"
                  value={lang}
                  onChange={(e) => changeLang(e.target.value)}
                >
                  {LANGS.map((l) => (
                    <option key={l.code} value={l.code}>{l.label}</option>
                  ))}
                </select>
              </div>
              <button
                className={`token-badge ${proActive ? 'ok' : 'neutral'}`}
                onClick={() => setShowCookie(!showCookie)}
              >
                {proActive ? t('proBadgeOn') : t('proBadgeOff')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Cookie modal */}
      {showCookie && (
        <div className="cookie-overlay" onClick={(e) => { if (e.target === e.currentTarget) { setShowCookie(false); if (cookieResolveRef.current) { cookieResolveRef.current(false); cookieResolveRef.current = null; } } }}>
          <div className="cookie-modal">
            <div className="cookie-modal-head">
              <h3>{t('modalTitle')}</h3>
              <button className="cookie-close" onClick={() => { setShowCookie(false); if (cookieResolveRef.current) { cookieResolveRef.current(false); cookieResolveRef.current = null; } }}>×</button>
            </div>

            <div className="cookie-guide">
              <b>{t('modalDesc')}</b><br /><br />
              <b style={{ color: 'var(--acc3)' }}>{t('modalHowTitle')}</b><br />
              1. <a href="https://suno.com" target="_blank" rel="noopener noreferrer">
                {t('modalStep1')}
              </a><br />
              2. {t('modalStep2')}<br />
              3. {t('modalStep3')}<br />
              4. <code>__client</code> — {t('modalStep4')}<br />
              5. {t('modalStep5')}
            </div>

            <div className="cookie-input-row">
              <input
                type="text"
                className="token-input"
                placeholder={t('modalPlaceholder')}
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
                  <p className="cookie-status ok">{t('modalSessionOk')}</p>
                  <button className="token-clear" onClick={disconnectCookie}>{t('disconnect')}</button>
                </>
              ) : (
                <button
                  className="btn-main"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={connectCookie}
                  disabled={connecting || !cookieInput.trim()}
                >
                  {connecting ? <><span className="spin" /> {t('connecting')}</> : t('connect')}
                </button>
              )}
            </div>

            {!proActive && (
              <p className="cookie-note">{t('modalNote')}</p>
            )}
          </div>
        </div>
      )}

      <main>
        <div className="wrap">
          <section className="hero">
            <h1>
              {t('heroTitle1')}<br />
              <em>{t('heroTitle2')}</em>
            </h1>
            <p style={{ whiteSpace: 'pre-line' }}>{t('heroDesc')}</p>
          </section>

          <Downloader
            onSongs={setSongs}
            onStatus={setStatus}
            fmt={fmt}
            onFmt={handleFmtChange}
            hasToken={proActive}
            lang={lang}
          />

          {status.msg && (
            <div id="status" className={status.type}>
              {status.type === 'loading' && <span className="spin" />}
              {status.msg}
            </div>
          )}

          {fmt === 'wav' && !proActive && (
            <div className="wav-warn">
              <span>{t('wavWarn')}</span>
              <button onClick={() => setShowCookie(true)}>{t('wavWarnBtn')}</button>
            </div>
          )}

          {songs.length > 0 && (
            <SongList
              songs={songs}
              fmt={fmt}
              onStatus={setStatus}
              lang={lang}
              onCookieExpired={handleCookieExpired}
            />
          )}

          <div style={{ display: 'flex', justifyContent: 'center', margin: '0 0 16px' }}>
            <AdSlot type="728" label="② Mid-page Leaderboard 728×90" />
          </div>

          <div className="footer-ads">
            <div className="ad-row">
              <AdSlot type="336" label="③ Footer Rectangle 336×280" />
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <p>{t('footerCopy')}</p>
          <p>{t('footerRight')}</p>
        </div>
      </footer>
    </>
  );
}
