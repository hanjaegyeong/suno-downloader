import { useState } from 'react';

export default function TokenSetup({ token, onSave, onClose }) {
  const [val, setVal] = useState(token || '');
  const [err, setErr] = useState('');

  const handleSave = () => {
    const t = val.trim();
    if (!t) {
      setErr('토큰을 입력해주세요.');
      return;
    }
    onSave(t);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && token) onClose();
  };

  return (
    <div className="token-overlay" onClick={(e) => { if (e.target === e.currentTarget && token) onClose(); }}>
      <div className="token-panel" onKeyDown={handleKeyDown}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <h3>🔑 Suno 세션 토큰 설정</h3>
          {token && (
            <button
              onClick={onClose}
              style={{
                background: 'none', border: 'none',
                color: 'var(--muted)', cursor: 'pointer',
                fontSize: 22, lineHeight: 1, padding: '0 4px',
              }}
              aria-label="닫기"
            >
              ×
            </button>
          )}
        </div>

        {/* Guide */}
        <div className="token-guide">
          <strong>토큰 취득 방법:</strong><br />
          1.{' '}
          <a href="https://suno.com" target="_blank" rel="noopener noreferrer">suno.com</a>
          {' '}에 로그인<br />
          2. 브라우저 개발자도구 열기 <span style={{ opacity: 0.6 }}>(F12 또는 Ctrl+Shift+I)</span><br />
          3. <strong style={{ color: 'var(--acc2)' }}>Console</strong> 탭 클릭<br />
          4. ⚠️ 붙여넣기 경고가 보이면 <strong style={{ color: 'var(--acc3)' }}>allow pasting</strong> 을 직접 타이핑하고 Enter<br />
          5. 아래 명령을 붙여넣고 Enter:<br />
          <code>copy(await window.Clerk.session.getToken())</code>
          6. 클립보드에 복사됨 → 아래 입력창에 붙여넣기
        </div>

        {/* Input */}
        <textarea
          className="token-textarea"
          placeholder="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
          value={val}
          onChange={(e) => { setVal(e.target.value); setErr(''); }}
          autoFocus
          spellCheck="false"
        />

        {err && <p className="token-err">{err}</p>}

        <button className="btn-main" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>
          저장
        </button>

        {token && (
          <p style={{ marginTop: 10, fontSize: 11, color: 'var(--muted)', textAlign: 'center', fontFamily: "'DM Mono', monospace" }}>
            토큰은 이 브라우저에만 저장됩니다 (localStorage)
          </p>
        )}
      </div>
    </div>
  );
}
