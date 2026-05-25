#!/usr/bin/env node
import { Resvg } from '@resvg/resvg-js';
import { writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { pages } from './pages.mjs';
import { renderSvg } from './render-svg.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..', '..');
const FONT_DIR = join(__dirname, 'fonts');
const OUT_DIR = join(ROOT, 'public', 'og');

const FONT_FILES = [
  join(FONT_DIR, 'Outfit-Regular.ttf'),
  join(FONT_DIR, 'Outfit-Medium.ttf'),
  join(FONT_DIR, 'Outfit-SemiBold.ttf'),
  join(FONT_DIR, 'Outfit-Bold.ttf'),
  join(FONT_DIR, 'Outfit-Black.ttf'),
];

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const started = Date.now();
let totalBytes = 0;

for (const page of pages) {
  const svg = renderSvg(page);
  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: false,
      fontFiles: FONT_FILES,
      defaultFontFamily: 'Outfit',
    },
    fitTo: { mode: 'width', value: 1200 },
  });
  const png = resvg.render().asPng();
  const outFile = join(OUT_DIR, `${page.slug}.png`);
  await writeFile(outFile, png);
  totalBytes += png.length;
  console.log(`  ✓ og/${page.slug}.png  (${(png.length / 1024).toFixed(1)} KB)`);
}

const elapsed = Date.now() - started;
console.log(
  `\nGenerated ${pages.length} OG images in ${elapsed} ms  (total ${(totalBytes / 1024).toFixed(1)} KB)`
);
