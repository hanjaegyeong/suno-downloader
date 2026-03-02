import { useState } from 'react';

function extractId(raw) {
  raw = raw.trim();
  const m = raw.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return m ? m[1] : null;
}

export default function Downloader({
  onSongs,
  onStatus,
  fmt,
  onFmt,
  hasToken,
}) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const go = async () => {
    const pid = extractId(url);
    if (!pid) {
      onStatus({ msg: '❌ 올바른 Suno 플레이리스트 URL 또는 ID를 입력해주세요.', type: 'error' });
      return;
    }

    setLoading(true);
    onSongs([]);
    onStatus({ msg: '플레이리스트 불러오는 중…', type: 'loading' });

    try {
      const allSongs = [];
      let page = 0;

      while (true) {
        const resp = await fetch(`/api/playlist/${pid}?page=${page}`);

        if (!resp.ok) {
          throw new Error(`서버 오류 HTTP ${resp.status}`);
        }

        const data = await resp.json();
        const clips = data.playlist_clips || data.clips || [];
        if (!clips.length) break;

        clips.forEach((c) => {
          const cl = c.clip || c;
          allSongs.push({
            id: cl.id,
            title: cl.title || cl.display_name || `Track ${allSongs.length + 1}`,
            img: cl.image_url || null,
            audioUrl: cl.audio_url || null,
          });
        });

        // Suno returns up to 20 items per page; empty next page = done
        if (clips.length < 20) break;
        page++;
      }

      if (!allSongs.length) {
        onStatus({ msg: '⚠️ 플레이리스트에서 트랙을 찾지 못했습니다.', type: 'error' });
        return;
      }

      onSongs(allSongs);
      onStatus({ msg: `✅ ${allSongs.length}개 트랙을 찾았습니다!`, type: 'ok' });
    } catch (err) {
      onStatus({ msg: `❌ 불러오기 실패: ${err.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="row">
        <input
          className="url-input"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !loading && go()}
          placeholder="https://suno.com/playlist/"
          autoComplete="off"
          spellCheck="false"
        />
        <select className="fmt" value={fmt} onChange={(e) => onFmt(e.target.value)}>
          <option value="mp3">MP3</option>
          <option value="wav">WAV {!hasToken ? '(Pro)' : ''}</option>
        </select>
        <button className="btn-main" onClick={go} disabled={loading}>
          {loading ? <><span className="spin" /> 로딩 중</> : '불러오기 ↓'}
        </button>
      </div>
      <p className="hint">
        Suno 플레이리스트 URL 또는 <b>Playlist ID</b>만 붙여넣어도 됩니다.<br />
        예: <b>suno.com/playlist/fe85c062-…</b>
      </p>
    </div>
  );
}
