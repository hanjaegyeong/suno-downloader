#!/usr/bin/env node
import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const CONTENT_DIR = join(ROOT, 'content', 'blog');
const TEMPLATE_PATH = join(__dirname, 'templates', 'blog-article.html');
const SITE_URL = 'https://suno-down.com';

marked.use({ gfm: true });

// --- Frontmatter parser ---

function parseFrontmatter(raw, filePath) {
  if (!raw.startsWith('---')) {
    throw new Error(`Missing frontmatter delimiters in ${filePath} — file must start with ---`);
  }
  const end = raw.indexOf('\n---', 3);
  if (end === -1) {
    throw new Error(`Unclosed frontmatter in ${filePath} — add a closing ---`);
  }
  const yamlBlock = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).trim();

  const fm = {};
  for (const line of yamlBlock.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Handle array values: key: [a, b, c] or multi-line list items (- value)
    if (trimmed.startsWith('- ')) {
      // bare list item — attach to last key seen
      const val = trimmed.slice(2).trim();
      const lastKey = fm.__lastKey;
      if (lastKey) {
        if (!Array.isArray(fm[lastKey])) fm[lastKey] = [];
        fm[lastKey].push(val);
      }
      continue;
    }

    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const key = trimmed.slice(0, colonIdx).trim();
    let val = trimmed.slice(colonIdx + 1).trim();
    fm.__lastKey = key;

    // Inline array: [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      fm[key] = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean);
      continue;
    }

    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }

    fm[key] = val;
  }
  delete fm.__lastKey;

  return { fm, body };
}

function validateFrontmatter(fm, filePath) {
  const required = ['title', 'slug', 'summary', 'publishedAt'];
  for (const field of required) {
    if (!fm[field]) {
      throw new Error(`Missing required frontmatter field "${field}" in ${filePath}`);
    }
  }
  if (!fm.schemaVersion) {
    console.warn(`[build-blog] WARN: missing schemaVersion in ${filePath} — treating as v0`);
  }
}

// --- Template substitution ---

function escapeHtml(str) {
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function substitute(template, tokens) {
  return template.replace(/\{\{([A-Z0-9_]+)\}\}/g, (_, key) => {
    return tokens[key] !== undefined ? tokens[key] : '';
  });
}

// --- HTML builders ---

function buildArticleJson(opts) {
  const blogUrl = opts.lang === 'ko' ? `${SITE_URL}/ko/blog` : `${SITE_URL}/blog`;
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.summary,
    datePublished: opts.publishedAt,
    inLanguage: opts.lang,
    author: { '@type': 'Organization', name: 'SunoDown', url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: 'SunoDown',
      url: SITE_URL,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og/blog.png` },
    },
    url: opts.canonicalUrl,
    image: opts.ogImage,
    isPartOf: { '@type': 'Blog', '@id': blogUrl, name: opts.lang === 'ko' ? '블로그' : 'Blog' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': opts.canonicalUrl },
  }, null, 2).replace(/<\//g, '<\\/');
}

function buildBreadcrumbJson(opts) {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'SunoDown', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: opts.blogLabel, item: `${SITE_URL}${opts.blogUrl}` },
      { '@type': 'ListItem', position: 3, name: opts.title, item: opts.canonicalUrl },
    ],
  }, null, 2).replace(/<\//g, '<\\/');
}

function buildInternalLinksHtml(internalLinks, lang) {
  if (!internalLinks || internalLinks.length === 0) return '';
  const label = lang === 'ko' ? '관련 글' : 'Related';
  const items = internalLinks
    .map(href => `          <li><a href="${href}">${href}</a></li>`)
    .join('\n');
  return `
          <div class="internal-links">
            <h3>${label}</h3>
            <ul>
${items}
            </ul>
          </div>`;
}

function buildLangSwitchHtml(lang, enUrl, koUrl) {
  const enClass = lang === 'en' ? ' class="current"' : '';
  const koClass = lang === 'ko' ? ' class="current"' : '';
  return [
    `<a href="${enUrl}"${enClass} hreflang="en">EN</a>`,
    `<a href="${koUrl}"${koClass} hreflang="ko">한국어</a>`,
  ].join('\n              ');
}

// --- Word count helper ---

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

// --- Article generator ---

async function generateArticle(template, fm, bodyHtml, lang, enUrl, koUrl, wordCount) {
  const isKo = lang === 'ko';
  const canonicalUrl = isKo ? `${SITE_URL}${koUrl}` : `${SITE_URL}${enUrl}`;
  const ogImageSlug = isKo ? `ko-blog-${fm.slug}` : `blog-${fm.slug}`;
  const ogImage = `${SITE_URL}/og/${ogImageSlug}.png`;

  const rawTitle = isKo ? fm.title : (fm.title_en || fm.title);
  const rawSummary = isKo ? fm.summary : (fm.summary_en || fm.summary);

  const tokens = {
    LANG: lang,
    TITLE: escapeHtml(rawTitle),
    SUMMARY: escapeHtml(rawSummary),
    CANONICAL_URL: canonicalUrl,
    HREFLANG_EN: `${SITE_URL}${enUrl}`,
    HREFLANG_KO: `${SITE_URL}${koUrl}`,
    OG_IMAGE: ogImage,
    OG_LOCALE: isKo ? 'ko_KR' : 'en_US',
    OG_LOCALE_ALT: isKo ? 'en_US' : 'ko_KR',

    STRUCTURED_DATA_ARTICLE: buildArticleJson({
      title: rawTitle,
      summary: rawSummary,
      publishedAt: fm.publishedAt,
      lang,
      canonicalUrl,
      ogImage,
    }),
    STRUCTURED_DATA_BREADCRUMB: buildBreadcrumbJson({
      title: rawTitle,
      blogLabel: isKo ? '블로그' : 'Blog',
      blogUrl: isKo ? '/ko/blog' : '/blog',
      canonicalUrl,
    }),

    BACK_URL: isKo ? '/ko/blog' : '/blog',
    BACK_LABEL: isKo ? '← 블로그' : '← Blog',
    LANG_SWITCH_LABEL: isKo ? '언어 선택' : 'Language',
    LANG_SWITCH_HTML: buildLangSwitchHtml(lang, enUrl, koUrl),

    BODY: bodyHtml,
    META_LINE: isKo
      ? `게시일: ${fm.publishedAt} · 약 ${wordCount}단어`
      : `Published: ${fm.publishedAt} · ~${wordCount} words`,

    CTA_TEXT: isKo ? '지금 바로 사용해보세요' : 'Ready to try it?',
    CTA_BTN: isKo ? 'SunoDown 열기 →' : 'Open SunoDown →',

    INTERNAL_LINKS_HTML: buildInternalLinksHtml(fm.internalLinks, lang),

    FOOTER_HOME: isKo ? '홈' : 'Home',
    FOOTER_ABOUT_URL: '/about',
    FOOTER_ABOUT: isKo ? '소개' : 'About',
    FOOTER_BLOG_URL: isKo ? '/ko/blog' : '/blog',
    FOOTER_BLOG: isKo ? '블로그' : 'Blog',
    FOOTER_FAQ_URL: isKo ? '/ko/faq' : '/faq',
    FOOTER_GUIDE_URL: isKo ? '/ko/guide/how-to-download-suno-playlist' : '/guide/how-to-download-suno-playlist',
    FOOTER_GUIDE: isKo ? '가이드' : 'Guide',
    FOOTER_PRIVACY: isKo ? '개인정보' : 'Privacy',
    FOOTER_TERMS: isKo ? '이용약관' : 'Terms',
    FOOTER_COPY: isKo
      ? 'SunoDown · Suno AI와 무관한 독립 서비스입니다.'
      : 'SunoDown · Independent service, not affiliated with Suno AI.',
  };

  return substitute(template, tokens);
}

// --- Blog index page generator ---

function buildIndexPage(articles, lang) {
  const isKo = lang === 'ko';
  const pageTitle = isKo
    ? 'Suno AI 음악 블로그 — 프롬프트·장르·저작권 가이드 | SunoDown'
    : 'Suno AI Music Blog — Prompt Tips, Genres & Copyright Guides | SunoDown';
  const pageDesc = isKo
    ? 'Suno AI 음악 제작 팁과 가이드 — 프롬프트 작성, 장르 카탈로그, 저작권, Suno vs Udio, DAW 후처리까지. AI 음악을 200% 활용하세요.'
    : 'Suno AI music tips and guides — prompt writing, genre catalog, copyright, Suno vs Udio, and DAW post-processing. Get more from your AI music.';
  const canonicalUrl = isKo ? `${SITE_URL}/ko/blog` : `${SITE_URL}/blog`;
  const hreflangEn = `${SITE_URL}/blog`;
  const hreflangKo = `${SITE_URL}/ko/blog`;
  const ogImage = `${SITE_URL}/og/${isKo ? 'ko-blog-index' : 'blog-index'}.png`;

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.fm.publishedAt) - new Date(a.fm.publishedAt)
  );

  const cardsHtml = sortedArticles.length > 0
    ? sortedArticles.map(({ fm }) => {
        const articleUrl = isKo ? `/ko/blog/${fm.slug}` : `/blog/${fm.slug}`;
        const title = escapeHtml(isKo ? fm.title : (fm.title_en || fm.title));
        const summary = escapeHtml(isKo ? fm.summary : (fm.summary_en || fm.summary));
        const publishedAt = escapeHtml(fm.publishedAt);
        return `
          <a href="${articleUrl}" class="card">
            <div class="card-date">${publishedAt}</div>
            <h2 class="card-title">${title}</h2>
            <p class="card-summary">${summary}</p>
          </a>`;
      }).join('\n')
    : `<p class="empty">${isKo ? '곧 첫 번째 글이 게시됩니다.' : 'First articles coming soon.'}</p>`;

  const langSwitchHtml = isKo
    ? `<a href="/blog" hreflang="en">EN</a>\n              <a href="/ko/blog" class="current" hreflang="ko">한국어</a>`
    : `<a href="/blog" class="current" hreflang="en">EN</a>\n              <a href="/ko/blog" hreflang="ko">한국어</a>`;

  const backLabel = isKo ? '← 홈' : '← Home';
  const heading = isKo ? '블로그' : 'Blog';
  const subheading = isKo
    ? 'Suno AI 음악 제작 가이드, 장르 분석, 저작권 이슈까지.'
    : 'Guides, genre deep-dives, and practical tips for Suno AI music creators.';

  const footerLinks = isKo
    ? `<a href="/">홈</a> · <a href="/about">소개</a> · <a href="/ko/blog">블로그</a> · <a href="/ko/faq">FAQ</a> · <a href="/ko/guide/how-to-download-suno-playlist">가이드</a> · <a href="/privacy">개인정보</a> · <a href="/terms">이용약관</a>`
    : `<a href="/">Home</a> · <a href="/about">About</a> · <a href="/blog">Blog</a> · <a href="/faq">FAQ</a> · <a href="/guide/how-to-download-suno-playlist">Guide</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a>`;

  const footerCopy = isKo
    ? 'SunoDown · Suno AI와 무관한 독립 서비스입니다.'
    : 'SunoDown · Independent service, not affiliated with Suno AI.';

  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: pageTitle,
    description: pageDesc,
    url: canonicalUrl,
    inLanguage: lang,
    hasPart: sortedArticles.map(({ fm }) => ({
      '@type': 'Article',
      headline: isKo ? fm.title : (fm.title_en || fm.title),
      url: `${SITE_URL}${isKo ? '/ko' : ''}/blog/${fm.slug}`,
      datePublished: fm.publishedAt,
    })),
  }, null, 2);

  return `<!DOCTYPE html>
<html lang="${lang}">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>${pageTitle}</title>
    <meta name="description" content="${pageDesc}" />
    <link rel="canonical" href="${canonicalUrl}" />

    <link rel="alternate" hreflang="en" href="${hreflangEn}" />
    <link rel="alternate" hreflang="ko" href="${hreflangKo}" />
    <link rel="alternate" hreflang="x-default" href="${hreflangEn}" />

    <meta property="og:type" content="website" />
    <meta property="og:title" content="${pageTitle}" />
    <meta property="og:description" content="${pageDesc}" />
    <meta property="og:url" content="${canonicalUrl}" />
    <meta property="og:site_name" content="SunoDown" />
    <meta property="og:image" content="${ogImage}" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:locale" content="${isKo ? 'ko_KR' : 'en_US'}" />
    <meta property="og:locale:alternate" content="${isKo ? 'en_US' : 'ko_KR'}" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${pageTitle}" />
    <meta name="twitter:description" content="${pageDesc}" />
    <meta name="twitter:image" content="${ogImage}" />

    <meta name="theme-color" content="#0a0a12" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Outfit:wght@400;600;800;900&display=swap" rel="stylesheet" />

    <script type="application/ld+json">
    ${structuredData}
    </script>

    <style>
      :root {
        --bg: #08080f;
        --bg-card: #111119;
        --border: #242430;
        --text: #ededf5;
        --text-soft: #c0c0d0;
        --text-mute: #6b6b80;
        --acc1: #c084fc;
        --acc2: #22d3ee;
        --acc3: #8b5cf6;
      }
      * { box-sizing: border-box; }
      html, body { background: var(--bg); margin: 0; padding: 0; }
      body {
        font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        color: var(--text);
        line-height: 1.65;
        -webkit-font-smoothing: antialiased;
      }
      .wrap { max-width: 820px; margin: 0 auto; padding: 0 18px; }

      header {
        background: var(--bg-card);
        border-bottom: 1px solid var(--border);
        padding: 14px 0;
      }
      .header-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .logo {
        font-weight: 900;
        font-size: 1.4rem;
        letter-spacing: -0.03em;
        color: var(--acc1);
        text-decoration: none;
      }
      .logo-dot { color: var(--acc2); }
      .pill {
        background: var(--acc3);
        color: #fff;
        padding: 2px 8px;
        border-radius: 99px;
        font-size: 0.65rem;
        font-weight: 700;
        vertical-align: 2px;
        margin-left: 4px;
      }
      .header-right { display: flex; align-items: center; gap: 14px; }
      .lang-switch {
        display: flex;
        gap: 8px;
        font-size: 13px;
      }
      .lang-switch a {
        color: var(--text-mute);
        text-decoration: none;
        padding: 4px 8px;
        border-radius: 6px;
        border: 1px solid transparent;
      }
      .lang-switch a:hover { color: var(--acc2); border-color: var(--border); }
      .lang-switch a.current { color: var(--text); border-color: var(--border); background: var(--bg); }
      .back-link {
        color: var(--text-mute);
        text-decoration: none;
        font-size: 13px;
        font-weight: 500;
      }
      .back-link:hover { color: var(--acc2); }

      main { padding: 48px 0 80px; }

      .page-heading {
        font-size: clamp(28px, 4.5vw, 40px);
        font-weight: 900;
        line-height: 1.18;
        letter-spacing: -0.03em;
        margin: 0 0 12px;
        background: linear-gradient(120deg, var(--acc1), var(--acc2));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .page-sub {
        color: var(--text-soft);
        font-size: 17px;
        margin: 0 0 40px;
      }

      .card-grid {
        display: grid;
        gap: 16px;
      }
      .card {
        display: block;
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 12px;
        padding: 22px 24px;
        text-decoration: none;
        transition: border-color 0.15s;
      }
      .card:hover { border-color: var(--acc3); }
      .card-date {
        color: var(--text-mute);
        font-size: 12px;
        margin-bottom: 8px;
        font-family: 'DM Mono', monospace;
      }
      .card-title {
        font-size: 1.15rem;
        font-weight: 800;
        color: #fff;
        margin: 0 0 8px;
        letter-spacing: -0.01em;
        line-height: 1.3;
        background: none;
        -webkit-text-fill-color: unset;
      }
      .card-summary {
        color: var(--text-soft);
        font-size: 14px;
        margin: 0;
        line-height: 1.6;
      }
      .empty {
        color: var(--text-mute);
        font-size: 15px;
        text-align: center;
        padding: 48px 0;
      }

      footer {
        background: var(--bg);
        border-top: 1px solid var(--border);
        padding: 24px 0 40px;
        color: var(--text-mute);
        font-size: 12px;
        text-align: center;
        line-height: 1.9;
      }
      footer a { color: var(--text-mute); margin: 0 8px; }
      footer a:hover { color: var(--acc2); }
    </style>
  </head>
  <body>
    <header>
      <div class="wrap">
        <div class="header-inner">
          <a href="/" class="logo">SunoDown<span class="logo-dot">.</span><span class="pill">FREE</span></a>
          <div class="header-right">
            <a href="/" class="back-link">${backLabel}</a>
            <nav class="lang-switch" aria-label="${isKo ? '언어 선택' : 'Language'}">
              ${langSwitchHtml}
            </nav>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="wrap">
        <h1 class="page-heading">${heading}</h1>
        <p class="page-sub">${subheading}</p>
        <div class="card-grid">
          ${cardsHtml}
        </div>
      </div>
    </main>

    <footer>
      <div class="wrap">
        <p>${footerLinks}</p>
        <p>${footerCopy}</p>
      </div>
    </footer>
  </body>
</html>`;
}

// --- Main ---

async function main() {
  let files = [];
  try {
    files = await readdir(CONTENT_DIR);
  } catch {
    // content/blog/ missing — fall through with empty list, indexes regenerate as "no articles"
  }

  const koFiles = files.filter(f => f.endsWith('.ko.md') && !f.startsWith('_'));
  const template = await readFile(TEMPLATE_PATH, 'utf8');
  const articles = [];

  for (const koFile of koFiles) {
    const koPath = join(CONTENT_DIR, koFile);
    const slug = koFile.replace(/\.ko\.md$/, '');
    const enFile = `${slug}.en.md`;
    const enPath = join(CONTENT_DIR, enFile);

    const koRaw = await readFile(koPath, 'utf8');
    const { fm, body: koBody } = parseFrontmatter(koRaw, koPath);
    validateFrontmatter(fm, koPath);

    // slug in filename must match frontmatter slug
    if (fm.slug !== slug) {
      throw new Error(
        `Slug mismatch in ${koPath}: filename slug "${slug}" !== frontmatter slug "${fm.slug}"`
      );
    }

    let enBody = koBody;
    if (existsSync(enPath)) {
      enBody = (await readFile(enPath, 'utf8')).trim();
    } else {
      console.warn(`[build-blog] WARN: no English source for "${slug}" — using Korean body as fallback`);
    }

    const koWordCount = countWords(koBody);
    const enWordCount = countWords(enBody);

    if (koWordCount < 1500 || koWordCount > 3000) {
      console.warn(`[build-blog] WARN: "${slug}" KO word count ${koWordCount} is outside 1500–3000 range`);
    }
    if (enWordCount < 1500 || enWordCount > 3000) {
      console.warn(`[build-blog] WARN: "${slug}" EN word count ${enWordCount} is outside 1500–3000 range`);
    }

    const koBodyHtml = marked.parse(koBody);
    const enBodyHtml = marked.parse(enBody);

    const enUrl = `/blog/${slug}`;
    const koUrl = `/ko/blog/${slug}`;

    const koHtml = await generateArticle(template, fm, koBodyHtml, 'ko', enUrl, koUrl, koWordCount);
    const enHtml = await generateArticle(template, fm, enBodyHtml, 'en', enUrl, koUrl, enWordCount);

    const koOutDir = join(ROOT, 'public', 'ko', 'blog', slug);
    const enOutDir = join(ROOT, 'public', 'blog', slug);

    await mkdir(koOutDir, { recursive: true });
    await mkdir(enOutDir, { recursive: true });

    await writeFile(join(koOutDir, 'index.html'), koHtml, 'utf8');
    console.log(`[build-blog] public/ko/blog/${slug}/index.html`);

    await writeFile(join(enOutDir, 'index.html'), enHtml, 'utf8');
    console.log(`[build-blog] public/blog/${slug}/index.html`);

    articles.push({ fm });
  }

  // Generate blog index pages
  const koIndexHtml = buildIndexPage(articles, 'ko');
  const enIndexHtml = buildIndexPage(articles, 'en');

  const koIndexDir = join(ROOT, 'public', 'ko', 'blog');
  const enIndexDir = join(ROOT, 'public', 'blog');

  await mkdir(koIndexDir, { recursive: true });
  await mkdir(enIndexDir, { recursive: true });

  await writeFile(join(koIndexDir, 'index.html'), koIndexHtml, 'utf8');
  console.log('[build-blog] public/ko/blog/index.html');

  await writeFile(join(enIndexDir, 'index.html'), enIndexHtml, 'utf8');
  console.log('[build-blog] public/blog/index.html');

  console.log(`[build-blog] done — ${articles.length} article(s) processed`);
}

main().catch(err => {
  console.error(`[build-blog] ERROR: ${err.message}`);
  process.exit(1);
});
