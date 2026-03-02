/**
 * AdSlot — placeholder for Google AdSense units.
 *
 * type: '728' | '336' | '300' | '468'
 *
 * To activate, replace the inner comment block with the real <ins> tag
 * and the adsbygoogle.push() call for each slot.
 */
export default function AdSlot({ type, label, sublabel }) {
  return (
    <div className={`ad ad-${type}`}>
      {/*
        배포 시 아래로 교체:
        <ins className="adsbygoogle" style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
             data-ad-slot="XXXXXXXXXX"
             data-ad-format="auto"
             data-full-width-responsive="true" />
        <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({});' }} />
      */}
      <span>{label}</span>
      {sublabel && <span style={{ fontSize: 9, opacity: 0.5 }}>{sublabel}</span>}
    </div>
  );
}
