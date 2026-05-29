// Per-page OG image metadata. The `slug` field is used as the output PNG
// filename and must match the og:image URL referenced in each HTML head.
// Text is intentionally Latin-only — CJK strings would require bundling a
// Noto CJK font (~10MB+); the page's og:title already conveys language.

export const pages = [
  {
    slug: 'home',
    title: 'Free Suno AI Playlist Downloader',
    subtitle: 'MP3 & WAV  ·  ZIP Bulk Download  ·  No Sign-up',
    badge: 'FREE',
  },
  {
    slug: 'about',
    title: 'About SunoDown',
    subtitle: 'Mission  ·  Principles  ·  Contact',
    badge: 'ABOUT',
  },
  {
    slug: 'privacy',
    title: 'Privacy Policy',
    subtitle: 'How SunoDown handles your data and cookies',
    badge: 'LEGAL',
  },
  {
    slug: 'terms',
    title: 'Terms of Service',
    subtitle: 'Permitted use, copyright, disclaimer',
    badge: 'LEGAL',
  },

  // FAQ — 3 languages
  {
    slug: 'faq',
    title: 'SunoDown FAQ',
    subtitle: 'Pricing · Pro · Mobile · Copyright · Errors',
    badge: 'EN  ·  FAQ',
  },
  {
    slug: 'ko-faq',
    title: 'SunoDown FAQ',
    subtitle: 'Pricing · Pro · Mobile · Copyright · Errors',
    badge: 'KO  ·  FAQ',
  },
  {
    slug: 'ja-faq',
    title: 'SunoDown FAQ',
    subtitle: 'Pricing · Pro · Mobile · Copyright · Errors',
    badge: 'JA  ·  FAQ',
  },

  // Guide: how-to-download-suno-playlist
  {
    slug: 'guide-how-to-download-suno-playlist',
    title: 'How to Download Suno Playlists',
    subtitle: 'Step-by-step  ·  MP3 & WAV  ·  ZIP bulk',
    badge: 'EN  ·  GUIDE',
  },
  {
    slug: 'ko-guide-how-to-download-suno-playlist',
    title: 'How to Download Suno Playlists',
    subtitle: 'Step-by-step  ·  MP3 & WAV  ·  ZIP bulk',
    badge: 'KO  ·  GUIDE',
  },
  {
    slug: 'ja-guide-how-to-download-suno-playlist',
    title: 'How to Download Suno Playlists',
    subtitle: 'Step-by-step  ·  MP3 & WAV  ·  ZIP bulk',
    badge: 'JA  ·  GUIDE',
  },

  // Guide: suno-mp3-vs-wav
  {
    slug: 'guide-suno-mp3-vs-wav',
    title: 'Suno MP3 vs WAV',
    subtitle: 'Which format should you download?',
    badge: 'EN  ·  GUIDE',
  },
  {
    slug: 'ko-guide-suno-mp3-vs-wav',
    title: 'Suno MP3 vs WAV',
    subtitle: 'Which format should you download?',
    badge: 'KO  ·  GUIDE',
  },
  {
    slug: 'ja-guide-suno-mp3-vs-wav',
    title: 'Suno MP3 vs WAV',
    subtitle: 'Which format should you download?',
    badge: 'JA  ·  GUIDE',
  },

  // Guide: suno-pro-cookie-setup
  {
    slug: 'guide-suno-pro-cookie-setup',
    title: 'Suno Pro Cookie Setup',
    subtitle: 'Unlock WAV downloads in 2 minutes',
    badge: 'EN  ·  GUIDE',
  },
  {
    slug: 'ko-guide-suno-pro-cookie-setup',
    title: 'Suno Pro Cookie Setup',
    subtitle: 'Unlock WAV downloads in 2 minutes',
    badge: 'KO  ·  GUIDE',
  },
  {
    slug: 'ja-guide-suno-pro-cookie-setup',
    title: 'Suno Pro Cookie Setup',
    subtitle: 'Unlock WAV downloads in 2 minutes',
    badge: 'JA  ·  GUIDE',
  },

  // Blog index pages
  {
    slug: 'blog',
    title: 'SunoDown Blog',
    subtitle: 'AI Music  ·  Tips  ·  Guides',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog',
    title: 'SunoDown Blog',
    subtitle: 'AI Music  ·  Tips  ·  Guides',
    badge: 'KO  ·  BLOG',
  },

  // Blog: suno-lyrics-prompt-tips
  {
    slug: 'blog-suno-lyrics-prompt-tips',
    title: 'Suno AI Lyrics Prompt Guide',
    subtitle: 'Lyrics  ·  Prompts  ·  Quality Tips',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog-suno-lyrics-prompt-tips',
    title: 'Suno AI Lyrics Prompt Guide',
    subtitle: 'Lyrics  ·  Prompts  ·  Quality Tips',
    badge: 'KO  ·  BLOG',
  },

  // Blog: ai-music-genre-catalog
  {
    slug: 'blog-ai-music-genre-catalog',
    title: 'AI Music Genre Catalog',
    subtitle: 'Styles  ·  Moods  ·  Prompts',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog-ai-music-genre-catalog',
    title: 'AI Music Genre Catalog',
    subtitle: 'Styles  ·  Moods  ·  Prompts',
    badge: 'KO  ·  BLOG',
  },

  // Blog: ai-music-copyright-guide
  {
    slug: 'blog-ai-music-copyright-guide',
    title: 'AI Music Copyright Guide',
    subtitle: 'Ownership  ·  Licensing  ·  Commercial Use',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog-ai-music-copyright-guide',
    title: 'AI Music Copyright Guide',
    subtitle: 'Ownership  ·  Licensing  ·  Commercial Use',
    badge: 'KO  ·  BLOG',
  },

  // Blog: suno-vs-udio-comparison
  {
    slug: 'blog-suno-vs-udio-comparison',
    title: 'Suno vs Udio Comparison',
    subtitle: 'Features  ·  Quality  ·  Pricing',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog-suno-vs-udio-comparison',
    title: 'Suno vs Udio Comparison',
    subtitle: 'Features  ·  Quality  ·  Pricing',
    badge: 'KO  ·  BLOG',
  },

  // Blog: suno-pro-value-analysis
  {
    slug: 'blog-suno-pro-value-analysis',
    title: 'Suno Pro Value Analysis',
    subtitle: 'Credits  ·  WAV  ·  Is It Worth It?',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog-suno-pro-value-analysis',
    title: 'Suno Pro Value Analysis',
    subtitle: 'Credits  ·  WAV  ·  Is It Worth It?',
    badge: 'KO  ·  BLOG',
  },

  // Blog: daw-post-processing
  {
    slug: 'blog-daw-post-processing',
    title: 'DAW Post-Processing for AI Music',
    subtitle: 'EQ  ·  Mastering  ·  Export',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog-daw-post-processing',
    title: 'DAW Post-Processing for AI Music',
    subtitle: 'EQ  ·  Mastering  ·  Export',
    badge: 'KO  ·  BLOG',
  },

  // Blog: youtube-content-with-ai-music
  {
    slug: 'blog-youtube-content-with-ai-music',
    title: 'YouTube Content with AI Music',
    subtitle: 'Workflow  ·  Copyright  ·  Monetization',
    badge: 'EN  ·  BLOG',
  },
  {
    slug: 'ko-blog-youtube-content-with-ai-music',
    title: 'YouTube Content with AI Music',
    subtitle: 'Workflow  ·  Copyright  ·  Monetization',
    badge: 'KO  ·  BLOG',
  },
];
