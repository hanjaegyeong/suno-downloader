import { useState } from 'react';
import { t } from '../i18n';

function extractId(raw) {
  raw = raw.trim();
  const m = raw.match(/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
  return m ? m[1] : null;
}

export default function Downloader({ onSongs, onStatus, fmt, onFmt, hasToken, lang }) {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const go = async () => {
    const pid = extractId(url);
    if (!pid) {
      onStatus({ msg: t('invalidUrl'), type: 'error' });
      return;
    }

    setLoading(true);
    onSongs([]);
    onStatus({ msg: t('loadingPlaylist'), type: 'loading' });

    try {
      const allSongs = [];
      let page = 0;

      while (true) {
        const resp = await fetch(`/api/playlist/${pid}?page=${page}`);
        if (!resp.ok) throw new Error(`${t('serverError')} ${resp.status}`);

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

        if (clips.length < 20) break;
        page++;
      }

      if (!allSongs.length) {
        onStatus({ msg: t('noTracks'), type: 'error' });
        return;
      }

      onSongs(allSongs);
      onStatus({ msg: `✅ ${allSongs.length}${t('tracksFound')}`, type: 'ok' });
    } catch (err) {
      onStatus({ msg: `${t('loadFail')} ${err.message}`, type: 'error' });
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
          placeholder={t('inputPlaceholder')}
          autoComplete="off"
          spellCheck="false"
        />
        <select className="fmt" value={fmt} onChange={(e) => onFmt(e.target.value)}>
          <option value="mp3">MP3</option>
          <option value="wav">WAV {!hasToken ? '(Pro)' : ''}</option>
        </select>
        <button className="btn-main" onClick={go} disabled={loading}>
          {loading ? <><span className="spin" /> {t('loading')}</> : t('load')}
        </button>
      </div>
      <p className="hint">
        {t('inputHint')}<br />
        <b>{t('inputExample')}</b>
      </p>
    </div>
  );
}
