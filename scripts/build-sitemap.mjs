#!/usr/bin/env node
/**
 * build-sitemap.mjs
 *
 * Generates public/sitemap.xml from:
 *   1. Hardcoded static page entries + guide entries discovered from public/guide/
 *   2. Dynamic blog entries (posts + /blog, /ko/blog index) read from content/blog/*.ko.md frontmatter
 *
 * Usage:
 *   node scripts/build-sitemap.mjs           -- write to public/sitemap.xml
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = 'https://suno-down.com';
const CONTENT_DIR = join(ROOT, 'content', 'blog');
const OUT_FILE = join(ROOT, 'public', 'sitemap.xml');

// ---------------------------------------------------------------------------
// Guide entry discovery from public/guide/*/index.html
// ---------------------------------------------------------------------------

// lastmod per guide slug — the date its content last changed substantively.
// Dates are explicit on purpose: Docker builds have no .git, so they can't be
// derived at build time. A guide without an entry here fails the build.
const GUIDE_LASTMOD = {
  'how-to-download-suno-playlist': '2026-10-08',
  'suno-mp3-vs-wav':               '2026-05-25',
  'suno-pro-cookie-setup':         '2026-05-26',
};

// Explicit ordering: slugs listed here come first (in this order).
// Discovered slugs not in this list are appended sorted alphabetically.
const GUIDE_ORDER = [
  'how-to-download-suno-playlist',
  'suno-mp3-vs-wav',
  'suno-pro-cookie-setup',
];

const GUIDE_DIR = join(ROOT, 'public', 'guide');

async function discoverGuideEntries() {
  if (!existsSync(GUIDE_DIR)) return [];

  let dirs;
  try {
    const entries = await readdir(GUIDE_DIR, { withFileTypes: true });
    dirs = entries.filter(e => e.isDirectory()).map(e => e.name);
  } catch {
    return [];
  }

  // Sort: known order first, then remaining alphabetically
  const known = GUIDE_ORDER.filter(s => dirs.includes(s));
  const unknown = dirs.filter(s => !GUIDE_ORDER.includes(s)).sort();
  const slugs = [...known, ...unknown];

  const result = [];
  for (const slug of slugs) {
    const lastmod = GUIDE_LASTMOD[slug];
    if (!lastmod) {
      throw new Error(`no lastmod for guide "${slug}" — add it to GUIDE_LASTMOD`);
    }
    const alts = [
      { hreflang: 'en', href: `${BASE}/guide/${slug}` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/${slug}` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/${slug}` },
      { hreflang: 'x-default', href: `${BASE}/guide/${slug}` },
    ];
    for (const [lang, prefix] of [['en', ''], ['ko', '/ko'], ['ja', '/ja']]) {
      result.push({
        loc: `${BASE}${prefix}/guide/${slug}`,
        lastmod,
        changefreq: 'monthly',
        priority: '0.8',
        alternates: alts,
      });
    }
  }
  return result;
}

// ---------------------------------------------------------------------------
// Static page entries — home, faq, about, privacy, terms (no guides here)
// ---------------------------------------------------------------------------

const STATIC_ENTRIES = [
  // Home — single URL serving all 3 languages via client-side toggle. No hreflang
  // alternates: there are no separate /ko/ or /ja/ home URLs to point at.
  {
    loc: `${BASE}/`,
    lastmod: '2026-10-08',
    changefreq: 'weekly',
    priority: '1.0',
    alternates: [],
  },

  // FAQ (3 separate URL entries)
  {
    loc: `${BASE}/faq`,
    lastmod: '2026-10-08',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/faq` },
      { hreflang: 'ko', href: `${BASE}/ko/faq` },
      { hreflang: 'ja', href: `${BASE}/ja/faq` },
      { hreflang: 'x-default', href: `${BASE}/faq` },
    ],
  },
  {
    loc: `${BASE}/ko/faq`,
    lastmod: '2026-10-08',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/faq` },
      { hreflang: 'ko', href: `${BASE}/ko/faq` },
      { hreflang: 'ja', href: `${BASE}/ja/faq` },
      { hreflang: 'x-default', href: `${BASE}/faq` },
    ],
  },
  {
    loc: `${BASE}/ja/faq`,
    lastmod: '2026-10-08',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/faq` },
      { hreflang: 'ko', href: `${BASE}/ko/faq` },
      { hreflang: 'ja', href: `${BASE}/ja/faq` },
      { hreflang: 'x-default', href: `${BASE}/faq` },
    ],
  },

  // Contact (3 separate per-language URLs — same pattern as FAQ)
  {
    loc: `${BASE}/contact`,
    lastmod: '2026-10-08',
    changefreq: 'yearly',
    priority: '0.5',
    alternates: [
      { hreflang: 'en', href: `${BASE}/contact` },
      { hreflang: 'ko', href: `${BASE}/ko/contact` },
      { hreflang: 'ja', href: `${BASE}/ja/contact` },
      { hreflang: 'x-default', href: `${BASE}/contact` },
    ],
  },
  {
    loc: `${BASE}/ko/contact`,
    lastmod: '2026-10-08',
    changefreq: 'yearly',
    priority: '0.5',
    alternates: [
      { hreflang: 'en', href: `${BASE}/contact` },
      { hreflang: 'ko', href: `${BASE}/ko/contact` },
      { hreflang: 'ja', href: `${BASE}/ja/contact` },
      { hreflang: 'x-default', href: `${BASE}/contact` },
    ],
  },
  {
    loc: `${BASE}/ja/contact`,
    lastmod: '2026-10-08',
    changefreq: 'yearly',
    priority: '0.5',
    alternates: [
      { hreflang: 'en', href: `${BASE}/contact` },
      { hreflang: 'ko', href: `${BASE}/ko/contact` },
      { hreflang: 'ja', href: `${BASE}/ja/contact` },
      { hreflang: 'x-default', href: `${BASE}/contact` },
    ],
  },

  // About — single URL serving all 3 languages via client-side toggle. No hreflang.
  {
    loc: `${BASE}/about`,
    lastmod: '2026-10-08',
    changefreq: 'monthly',
    priority: '0.5',
    alternates: [],
  },

  // Privacy — single URL serving all 3 languages via client-side toggle. No hreflang.
  {
    loc: `${BASE}/privacy`,
    lastmod: '2026-10-08',
    changefreq: 'yearly',
    priority: '0.3',
    alternates: [],
  },

  // Terms — single URL serving all 3 languages via client-side toggle. No hreflang.
  {
    loc: `${BASE}/terms`,
    lastmod: '2026-10-08',
    changefreq: 'yearly',
    priority: '0.3',
    alternates: [],
  },
];

// ---------------------------------------------------------------------------
// Frontmatter parser (no external deps — simple regex split on ---)
// ---------------------------------------------------------------------------

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};
  const block = match[1];
  const result = {};
  for (const line of block.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '');
    if (key) result[key] = value;
  }
  return result;
}

// ---------------------------------------------------------------------------
// Blog entry discovery from content/blog/*.ko.md
// ---------------------------------------------------------------------------

async function discoverBlogEntries() {
  if (!existsSync(CONTENT_DIR)) {
    return [];
  }

  let files;
  try {
    files = await readdir(CONTENT_DIR);
  } catch {
    return [];
  }

  const koFiles = files.filter(f => f.endsWith('.ko.md') && !f.startsWith('_'));
  const entries = [];
  let latestLastmod = '';

  for (const file of koFiles) {
    const raw = await readFile(join(CONTENT_DIR, file), 'utf8');
    const fm = parseFrontmatter(raw);

    // Derive slug from filename if frontmatter slug missing
    const slug = fm.slug || file.replace('.ko.md', '');
    if (!fm.publishedAt) {
      throw new Error(`missing publishedAt in content/blog/${file}`);
    }
    // updatedAt is optional and shared by both languages of the slug
    const lastmod = fm.updatedAt || fm.publishedAt;
    if (lastmod > latestLastmod) latestLastmod = lastmod;

    // English entry: /blog/{slug} with alternate to /ko/blog/{slug}
    entries.push({
      loc: `${BASE}/blog/${slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.8',
      alternates: [
        { hreflang: 'en', href: `${BASE}/blog/${slug}` },
        { hreflang: 'ko', href: `${BASE}/ko/blog/${slug}` },
        { hreflang: 'x-default', href: `${BASE}/blog/${slug}` },
      ],
    });

    // Korean entry: /ko/blog/{slug} with alternate to /blog/{slug}
    entries.push({
      loc: `${BASE}/ko/blog/${slug}`,
      lastmod,
      changefreq: 'monthly',
      priority: '0.8',
      alternates: [
        { hreflang: 'en', href: `${BASE}/blog/${slug}` },
        { hreflang: 'ko', href: `${BASE}/ko/blog/${slug}` },
        { hreflang: 'x-default', href: `${BASE}/blog/${slug}` },
      ],
    });
  }

  if (entries.length === 0) return entries;

  // Blog index pages (/blog, /ko/blog) list every post, so their content last
  // changed when the newest post was published or updated.
  const indexAlternates = [
    { hreflang: 'en', href: `${BASE}/blog` },
    { hreflang: 'ko', href: `${BASE}/ko/blog` },
    { hreflang: 'x-default', href: `${BASE}/blog` },
  ];
  const indexEntries = ['/blog', '/ko/blog'].map(path => ({
    loc: `${BASE}${path}`,
    lastmod: latestLastmod,
    changefreq: 'weekly',
    priority: '0.7',
    alternates: indexAlternates,
  }));

  return [...indexEntries, ...entries];
}

// ---------------------------------------------------------------------------
// XML rendering
// ---------------------------------------------------------------------------

function renderEntry(entry) {
  const lines = [
    '  <url>',
    `    <loc>${entry.loc}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
  ];
  // Single-URL pages (home, about, privacy, terms) serve all languages from one
  // URL via a client-side toggle, so they carry NO hreflang alternates — claiming
  // per-language URLs that don't exist is invalid hreflang. Only genuinely
  // per-language URL sets (faq, contact, guides, blog) emit xhtml:link blocks.
  if (Array.isArray(entry.alternates) && entry.alternates.length > 0) {
    for (const a of entry.alternates) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`
      );
    }
  }
  lines.push('  </url>');
  return lines.join('\n');
}

function renderSitemap(entries) {
  const urls = entries.map(renderEntry).join('\n');
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    '</urlset>',
    '',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const guideEntries = await discoverGuideEntries();
  const blogEntries = await discoverBlogEntries();
  const allEntries = [...STATIC_ENTRIES.slice(0, 1), ...guideEntries, ...STATIC_ENTRIES.slice(1), ...blogEntries];
  const xml = renderSitemap(allEntries);

  await writeFile(OUT_FILE, xml, 'utf8');

  console.log(`static entries: ${STATIC_ENTRIES.length}`);
  console.log(`guide entries:  ${guideEntries.length}`);
  console.log(`blog entries:   ${blogEntries.length}`);
  console.log(`total entries:  ${allEntries.length}`);
  console.log(`output:         public/sitemap.xml`);
}

main().catch(err => {
  console.error('build-sitemap error:', err.message);
  process.exit(1);
});
