#!/usr/bin/env node
/**
 * build-sitemap.mjs
 *
 * Generates public/sitemap.xml from:
 *   1. Hardcoded static page entries (faithfully reproducing the 16 existing entries)
 *   2. Dynamic blog entries read from content/blog/*.ko.md frontmatter
 *
 * Usage:
 *   node scripts/build-sitemap.mjs           -- write to public/sitemap.xml
 *   node scripts/build-sitemap.mjs --verify  -- diff non-blog entries vs sitemap.xml.bak, exit non-zero if changed
 */

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';
import { tmpdir } from 'node:os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const BASE = 'https://suno-down.com';
const CONTENT_DIR = join(ROOT, 'content', 'blog');
const OUT_FILE = join(ROOT, 'public', 'sitemap.xml');
const BAK_FILE = join(ROOT, 'public', 'sitemap.xml.bak');

const VERIFY_MODE = process.argv.includes('--verify');

// ---------------------------------------------------------------------------
// Static page entries — hardcoded, must exactly match the 16 existing entries
// in public/sitemap.xml.bak (changefreq, priority, lastmod, hreflang pattern)
// ---------------------------------------------------------------------------

const STATIC_ENTRIES = [
  // Home — single URL, all 3 language alternates + x-default point to same URL
  {
    loc: `${BASE}/`,
    lastmod: '2026-05-25',
    changefreq: 'weekly',
    priority: '1.0',
    alternates: [
      { hreflang: 'ko', href: `${BASE}/` },
      { hreflang: 'en', href: `${BASE}/` },
      { hreflang: 'ja', href: `${BASE}/` },
      { hreflang: 'x-default', href: `${BASE}/` },
    ],
  },

  // Guide: how-to-download-suno-playlist (3 separate URL entries)
  {
    loc: `${BASE}/guide/how-to-download-suno-playlist`,
    lastmod: '2026-05-25',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/how-to-download-suno-playlist` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/how-to-download-suno-playlist` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/how-to-download-suno-playlist` },
      { hreflang: 'x-default', href: `${BASE}/guide/how-to-download-suno-playlist` },
    ],
  },
  {
    loc: `${BASE}/ko/guide/how-to-download-suno-playlist`,
    lastmod: '2026-05-25',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/how-to-download-suno-playlist` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/how-to-download-suno-playlist` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/how-to-download-suno-playlist` },
      { hreflang: 'x-default', href: `${BASE}/guide/how-to-download-suno-playlist` },
    ],
  },
  {
    loc: `${BASE}/ja/guide/how-to-download-suno-playlist`,
    lastmod: '2026-05-25',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/how-to-download-suno-playlist` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/how-to-download-suno-playlist` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/how-to-download-suno-playlist` },
      { hreflang: 'x-default', href: `${BASE}/guide/how-to-download-suno-playlist` },
    ],
  },

  // Guide: suno-mp3-vs-wav (3 separate URL entries)
  {
    loc: `${BASE}/guide/suno-mp3-vs-wav`,
    lastmod: '2026-05-25',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/suno-mp3-vs-wav` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/suno-mp3-vs-wav` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/suno-mp3-vs-wav` },
      { hreflang: 'x-default', href: `${BASE}/guide/suno-mp3-vs-wav` },
    ],
  },
  {
    loc: `${BASE}/ko/guide/suno-mp3-vs-wav`,
    lastmod: '2026-05-25',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/suno-mp3-vs-wav` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/suno-mp3-vs-wav` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/suno-mp3-vs-wav` },
      { hreflang: 'x-default', href: `${BASE}/guide/suno-mp3-vs-wav` },
    ],
  },
  {
    loc: `${BASE}/ja/guide/suno-mp3-vs-wav`,
    lastmod: '2026-05-25',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/suno-mp3-vs-wav` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/suno-mp3-vs-wav` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/suno-mp3-vs-wav` },
      { hreflang: 'x-default', href: `${BASE}/guide/suno-mp3-vs-wav` },
    ],
  },

  // Guide: suno-pro-cookie-setup (3 separate URL entries)
  {
    loc: `${BASE}/guide/suno-pro-cookie-setup`,
    lastmod: '2026-05-26',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/suno-pro-cookie-setup` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/suno-pro-cookie-setup` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/suno-pro-cookie-setup` },
      { hreflang: 'x-default', href: `${BASE}/guide/suno-pro-cookie-setup` },
    ],
  },
  {
    loc: `${BASE}/ko/guide/suno-pro-cookie-setup`,
    lastmod: '2026-05-26',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/suno-pro-cookie-setup` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/suno-pro-cookie-setup` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/suno-pro-cookie-setup` },
      { hreflang: 'x-default', href: `${BASE}/guide/suno-pro-cookie-setup` },
    ],
  },
  {
    loc: `${BASE}/ja/guide/suno-pro-cookie-setup`,
    lastmod: '2026-05-26',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/guide/suno-pro-cookie-setup` },
      { hreflang: 'ko', href: `${BASE}/ko/guide/suno-pro-cookie-setup` },
      { hreflang: 'ja', href: `${BASE}/ja/guide/suno-pro-cookie-setup` },
      { hreflang: 'x-default', href: `${BASE}/guide/suno-pro-cookie-setup` },
    ],
  },

  // FAQ (3 separate URL entries)
  {
    loc: `${BASE}/faq`,
    lastmod: '2026-05-26',
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
    lastmod: '2026-05-26',
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
    lastmod: '2026-05-26',
    changefreq: 'monthly',
    priority: '0.8',
    alternates: [
      { hreflang: 'en', href: `${BASE}/faq` },
      { hreflang: 'ko', href: `${BASE}/ko/faq` },
      { hreflang: 'ja', href: `${BASE}/ja/faq` },
      { hreflang: 'x-default', href: `${BASE}/faq` },
    ],
  },

  // About — single URL with 3 alternates all pointing to same URL
  {
    loc: `${BASE}/about`,
    lastmod: '2026-05-29',
    changefreq: 'monthly',
    priority: '0.5',
    alternates: [
      { hreflang: 'ko', href: `${BASE}/about` },
      { hreflang: 'en', href: `${BASE}/about` },
      { hreflang: 'ja', href: `${BASE}/about` },
      { hreflang: 'x-default', href: `${BASE}/about` },
    ],
  },

  // Privacy — single URL with 3 alternates all pointing to same URL
  {
    loc: `${BASE}/privacy`,
    lastmod: '2026-05-18',
    changefreq: 'yearly',
    priority: '0.3',
    alternates: [
      { hreflang: 'ko', href: `${BASE}/privacy` },
      { hreflang: 'en', href: `${BASE}/privacy` },
      { hreflang: 'ja', href: `${BASE}/privacy` },
      { hreflang: 'x-default', href: `${BASE}/privacy` },
    ],
  },

  // Terms — single URL with 3 alternates all pointing to same URL
  {
    loc: `${BASE}/terms`,
    lastmod: '2026-05-18',
    changefreq: 'yearly',
    priority: '0.3',
    alternates: [
      { hreflang: 'ko', href: `${BASE}/terms` },
      { hreflang: 'en', href: `${BASE}/terms` },
      { hreflang: 'ja', href: `${BASE}/terms` },
      { hreflang: 'x-default', href: `${BASE}/terms` },
    ],
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

  for (const file of koFiles) {
    const raw = await readFile(join(CONTENT_DIR, file), 'utf8');
    const fm = parseFrontmatter(raw);

    // Derive slug from filename if frontmatter slug missing
    const slug = fm.slug || file.replace('.ko.md', '');
    const publishedAt = fm.publishedAt || new Date().toISOString().slice(0, 10);

    // English entry: /blog/{slug} with alternate to /ko/blog/{slug}
    entries.push({
      loc: `${BASE}/blog/${slug}`,
      lastmod: publishedAt,
      changefreq: 'monthly',
      priority: '0.7',
      alternates: [
        { hreflang: 'en', href: `${BASE}/blog/${slug}` },
        { hreflang: 'ko', href: `${BASE}/ko/blog/${slug}` },
        { hreflang: 'x-default', href: `${BASE}/blog/${slug}` },
      ],
    });

    // Korean entry: /ko/blog/{slug} with alternate to /blog/{slug}
    entries.push({
      loc: `${BASE}/ko/blog/${slug}`,
      lastmod: publishedAt,
      changefreq: 'monthly',
      priority: '0.7',
      alternates: [
        { hreflang: 'en', href: `${BASE}/blog/${slug}` },
        { hreflang: 'ko', href: `${BASE}/ko/blog/${slug}` },
        { hreflang: 'x-default', href: `${BASE}/blog/${slug}` },
      ],
    });
  }

  return entries;
}

// ---------------------------------------------------------------------------
// XML rendering
// ---------------------------------------------------------------------------

function renderEntry(entry) {
  const alts = entry.alternates
    .map(
      a =>
        `    <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}" />`
    )
    .join('\n');
  return [
    '  <url>',
    `    <loc>${entry.loc}</loc>`,
    `    <lastmod>${entry.lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    alts,
    '  </url>',
  ].join('\n');
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
// Extract non-blog <url> blocks from an XML string for diffing
// ---------------------------------------------------------------------------

function extractNonBlogUrls(xml) {
  const urlBlocks = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = urlRegex.exec(xml)) !== null) {
    const block = m[0];
    // Blog entries contain /blog/ in their <loc>
    if (!block.includes('/blog/')) {
      urlBlocks.push(block.trim());
    }
  }
  return urlBlocks;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const blogEntries = await discoverBlogEntries();
  const allEntries = [...STATIC_ENTRIES, ...blogEntries];
  const xml = renderSitemap(allEntries);

  if (VERIFY_MODE) {
    if (!existsSync(BAK_FILE)) {
      console.error(`ERROR: ${BAK_FILE} not found. Run without --verify first to generate sitemap, then create the .bak file.`);
      process.exit(1);
    }

    const bakXml = await readFile(BAK_FILE, 'utf8');
    const nonBlogGenerated = extractNonBlogUrls(xml);
    const nonBlogBak = extractNonBlogUrls(bakXml);

    // Write to temp files for diff
    const tmpDir = tmpdir();
    const tmpGen = join(tmpDir, 'sitemap-generated-nonblog.txt');
    const tmpBak = join(tmpDir, 'sitemap-bak-nonblog.txt');
    await writeFile(tmpGen, nonBlogGenerated.join('\n\n'));
    await writeFile(tmpBak, nonBlogBak.join('\n\n'));

    let diffOutput = '';
    let exitCode = 0;
    try {
      diffOutput = execSync(`diff "${tmpBak}" "${tmpGen}"`, { encoding: 'utf8' });
    } catch (err) {
      diffOutput = err.stdout || '';
      exitCode = 1;
    }

    if (exitCode === 0) {
      console.log('verify: OK -- non-blog entries match sitemap.xml.bak (no drift detected)');
    } else {
      console.error('verify: FAIL -- non-blog entries differ from sitemap.xml.bak:');
      console.error(diffOutput);
      process.exit(1);
    }
    return;
  }

  await writeFile(OUT_FILE, xml, 'utf8');

  console.log(`static entries: ${STATIC_ENTRIES.length}`);
  console.log(`blog entries:   ${blogEntries.length}`);
  console.log(`total entries:  ${allEntries.length}`);
  console.log(`output:         public/sitemap.xml`);
}

main().catch(err => {
  console.error('build-sitemap error:', err.message);
  process.exit(1);
});
