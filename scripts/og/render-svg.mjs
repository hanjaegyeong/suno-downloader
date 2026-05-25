function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Rough width estimate for a badge based on character count. Outfit at 16px
// averages ~9px per character including letter-spacing, plus 28px horizontal
// padding on each side.
function badgeWidth(label) {
  return Math.max(120, label.length * 11 + 40);
}

export function renderSvg({ title, subtitle, badge }) {
  const bw = badgeWidth(badge);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#08080f"/>
      <stop offset="100%" stop-color="#111119"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#c084fc"/>
      <stop offset="100%" stop-color="#22d3ee"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="20%" r="60%">
      <stop offset="0%" stop-color="#c084fc" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#c084fc" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="url(#accent)"/>
  <rect x="0" y="624" width="1200" height="6" fill="url(#accent)"/>

  <!-- Brand -->
  <text x="80" y="130" font-family="Outfit" font-size="52" font-weight="900" fill="#c084fc" letter-spacing="-2">SunoDown<tspan fill="#22d3ee">.</tspan></text>

  <!-- Badge -->
  <rect x="80" y="160" width="${bw}" height="40" rx="20" fill="rgba(139,92,246,0.18)" stroke="#8b5cf6" stroke-width="1.5"/>
  <text x="${80 + bw / 2}" y="186" font-family="Outfit" font-size="17" font-weight="700" fill="#c084fc" text-anchor="middle" letter-spacing="1">${escapeXml(badge)}</text>

  <!-- Title -->
  <text x="80" y="370" font-family="Outfit" font-size="72" font-weight="900" fill="#ffffff" letter-spacing="-2">${escapeXml(title)}</text>

  <!-- Accent bar under title -->
  <rect x="80" y="395" width="120" height="6" rx="3" fill="url(#accent)"/>

  <!-- Subtitle -->
  <text x="80" y="465" font-family="Outfit" font-size="28" font-weight="500" fill="#9090a8">${escapeXml(subtitle)}</text>

  <!-- Footer URL -->
  <text x="1120" y="580" font-family="Outfit" font-size="22" font-weight="600" fill="#8b8b9e" text-anchor="end">suno-down.com</text>
</svg>`;
}
