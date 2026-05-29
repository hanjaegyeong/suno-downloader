# Phase A: /blog Infrastructure Plan

**Date:** 2026-05-29
**Spec:** `.omc/specs/deep-interview-blog-system.md`
**Scope:** Infrastructure only (build pipeline, templates, sitemap, OG, footer). No article content.

---

## RALPLAN-DR Summary

### Principles
1. **Mirror existing static-HTML pattern** -- blog pages are `public/blog/{slug}/index.html` just like `public/guide/{slug}/index.html`, not a new serving paradigm
2. **Single new dependency only** -- `marked` is the sole addition; no framework migration
3. **Build-time generation, zero runtime cost** -- markdown-to-HTML happens in `npm run build`, Express serves static files
4. **Existing convention parity** -- head meta, OG tags, footer links, CSS variables, header/lang-switch all match guide pages exactly
5. **Blog is ko+en only** -- no `/ja/blog/*` pages, but footer link to `/blog` appears in all 3 language footers

### Decision Drivers
1. **AdSense info-site signal** -- blog exists to satisfy "site's primary purpose is informational" requirement; infra must produce crawlable, hreflang-correct, structured-data-rich HTML
2. **Low maintenance overhead** -- adding a new article should require only: write `.md` file, run `npm run build`; no manual HTML, sitemap, or OG editing
3. **Hreflang correctness** -- Google requires bidirectional hreflang; blog has 2 languages (ko+en) not 3, so sitemap/head must reflect that accurately (no ja alternates for blog)

### Viable Options

#### A1: Where blog HTML output lives

| | **Option A: `public/blog/`** (chosen) | **Option B: `dist/blog/` direct write** |
|---|---|---|
| Pros | Vite auto-copies public/ to dist/; matches guide pattern exactly; files are visible in dev without build; git-trackable if desired | Skips the public/ intermediary |
| Cons | Generated files in public/ may confuse contributors (mitigated by .gitignore) | Breaks Vite convention (dist/ is wiped on each build); requires build ordering guarantee; can't serve in dev mode without Express |
| **Verdict** | **Chosen** | Invalidated: Vite runs `rm -rf dist` before build, so pre-writing to dist/ is fragile. Writing to public/ and letting Vite copy is the established pattern. |

#### A2: Markdown parser

| | **Option A: `marked`** (chosen) | **Option B: `markdown-it`** |
|---|---|---|
| Pros | 45KB, zero deps, fast, spec says "marked"; GFM tables built-in | Extensible plugin ecosystem |
| Cons | Fewer plugins | 3x bundle size, overkill for 14 static files |
| **Verdict** | **Chosen** -- spec explicitly names `marked`; lightweight; no plugin needs for blog content | Invalidated: spec constraint "marked 경량 마크다운 파서 1개만 허용" |

#### A3: Sitemap strategy

| | **Option A: Full regeneration script** (chosen) | **Option B: Append to existing manual XML** |
|---|---|---|
| Pros | Single source of truth; no drift; captures guide + blog + static pages | Simple patch |
| Cons | Must encode all existing pages in the script | Manual maintenance continues; easy to forget new blog posts |
| **Verdict** | **Chosen** -- spec says "sitemap.xml 자동 업데이트"; appending is not automation. Script reads blog frontmatter + hardcoded static pages list to regenerate. | Invalidated: defeats the automation goal |

#### A4: Build orchestration

| | **Option A: npm script chain** (chosen) | **Option B: Node-level orchestrator** |
|---|---|---|
| Pros | Transparent; each step visible in package.json; can run individually | Single entry point |
| Cons | Slightly verbose scripts section | Opaque; harder to debug individual steps |
| **Verdict** | **Chosen** -- matches existing `"build:og"` pattern. Chain: `build:blog` -> `build:sitemap` -> `build:og` -> `vite build` | Invalidated: over-engineering for 4 sequential steps |

---

## Task Flow (6 steps)

### Step 1: Install `marked` + create content directory structure

**Files:**
- `package.json` -- add `marked` to devDependencies
- `content/blog/.gitkeep` -- create source directory
- `.gitignore` -- add `public/blog/` and `public/ko/blog/` (generated output, not source)

**Actions:**
- `npm install --save-dev marked`
- Create `content/blog/` directory
- Create `content/blog/_template.md` -- sample frontmatter schema:
  ```yaml
  ---
  slug: example-post
  title: Example Blog Post Title
  title_en: Example Blog Post Title (English)
  summary: One-line summary for cards and meta description
  summary_en: English one-line summary
  publishedAt: 2026-06-01
  ogSubtitle: Short subtitle for OG image
  tags: [suno, ai-music]
  internalLinks:
    - /blog/another-post
    - /
  ---
  ```

**Acceptance:**
- [ ] `npm ls marked` shows installed version
- [ ] `content/blog/` directory exists with `_template.md`
- [ ] `.gitignore` includes `public/blog/` and `public/ko/blog/`

---

### Step 2: Create `scripts/build-blog.mjs` -- markdown to HTML build script

**File:** `scripts/build-blog.mjs`

**Input:** `content/blog/{slug}.ko.md`, `content/blog/{slug}.en.md`
**Output:** `public/ko/blog/{slug}/index.html` (Korean), `public/blog/{slug}/index.html` (English, default)

**Logic:**
1. Glob `content/blog/*.ko.md` to discover all slugs
2. For each slug, read both `.ko.md` and `.en.md`
3. Parse YAML frontmatter (simple regex split on `---`, no extra dep -- or use the frontmatter fields from the .ko.md file which contains both-language metadata)
4. Convert markdown body to HTML via `marked`
5. Validate word count (1500-3000 per spec; warn if outside range, don't block)
6. Inject into HTML template (see Step 3) with correct:
   - `<html lang="ko">` or `<html lang="en">`
   - `<title>`, `<meta name="description">`, canonical URL
   - hreflang alternates (ko + en only, no ja; plus x-default = en version)
   - OG meta tags (og:image pointing to `/og/blog-{slug}.png`)
   - Twitter card meta
   - BreadcrumbList structured data (`SunoDown > Blog > {title}`)
   - Article structured data (datePublished, author, wordCount)
7. Write to `public/blog/{slug}/index.html` (en) and `public/ko/blog/{slug}/index.html` (ko)
8. Also generate blog index pages (see Step 4)

**Acceptance:**
- [ ] Running `node scripts/build-blog.mjs` with a test `.md` file produces correct HTML in `public/blog/{slug}/index.html`
- [ ] HTML passes basic validation: has `<!DOCTYPE html>`, correct `lang` attr, all OG tags, hreflang links
- [ ] Word count validation prints warning for out-of-range articles
- [ ] Script exits 0 on success, non-zero on missing files

---

### Step 3: HTML template matching existing guide pages

**Embedded in:** `scripts/build-blog.mjs` (template literal function, not a separate file)

**Must match guide page patterns exactly:**
- CSS: same `:root` variables (`--bg`, `--bg-card`, `--border`, `--text`, `--text-soft`, `--text-mute`, `--acc1`, `--acc2`, `--acc3`)
- Header: `SunoDown.` logo + `FREE` pill + `<- Home` back-link + lang-switch (EN / 한국어 only, no 日本語 for blog)
- Typography: same `h1` gradient, `h2`/`h3` styles, `code` blocks, `.wrap` max-width 820px
- Footer: same link bar as guide pages but with Blog link added (Home / About / Blog / FAQ / guides / Privacy / Terms)
- Google Fonts: Outfit + DM Mono preconnect
- Responsive: same clamp() sizing as guide pages

**Key differences from guide template:**
- hreflang: 2 languages (ko+en) not 3
- Structured data: `Article` schema (not `HowTo`)
- Header lang-switch: only EN and 한국어 links (no 日本語)

**Acceptance:**
- [ ] Blog page CSS variables match guide page CSS variables exactly
- [ ] Header structure matches guide pages (logo, back-link, lang-switch)
- [ ] Footer link list includes Blog entry
- [ ] No 日本語 lang-switch link on blog pages

---

### Step 4: Blog index pages (`/blog/index.html`, `/ko/blog/index.html`)

**Generated by:** `scripts/build-blog.mjs` (as final step after individual articles)

**Design:**
- Card layout: each article shows title, summary, publishedAt date, OG thumbnail
- Sorted by publishedAt descending
- Same header/footer as article pages
- Page title: "Blog - SunoDown" (en) / "블로그 - SunoDown" (ko)
- Structured data: `CollectionPage` with `hasPart` array of `Article` references
- hreflang: ko+en bidirectional

**Acceptance:**
- [ ] `public/blog/index.html` lists all English articles as cards
- [ ] `public/ko/blog/index.html` lists all Korean articles as cards
- [ ] Cards link to correct article URLs
- [ ] Articles sorted by publishedAt descending

---

### Step 5: Integration -- package.json, server.js, sitemap, OG images

**5a. package.json build scripts:**
```json
{
  "build:blog": "node scripts/build-blog.mjs",
  "build:sitemap": "node scripts/build-sitemap.mjs",
  "build": "npm run build:blog && npm run build:sitemap && npm run build:og && vite build"
}
```
Order: blog HTML first (so sitemap can read generated files), then sitemap, then OG, then Vite (copies public/ to dist/).

**5b. server.js `CONTENT_PAGES` array:**
Add blog routes to the hardcoded array:
```js
'blog',                              // /blog index
'ko/blog',                           // /ko/blog index
'blog/{slug}',                       // per-article (7 slugs)
'ko/blog/{slug}',                    // per-article ko (7 slugs)
```
Implementation: instead of hardcoding 14+ new entries, refactor `CONTENT_PAGES` to also glob `dist/blog/*/index.html` and `dist/ko/blog/*/index.html` at startup. Or keep explicit list -- executor decides based on simplicity.

**5c. `scripts/build-sitemap.mjs` (new file):**
- Hardcoded list of static pages (home, about, privacy, terms, faq x3, guide x9) -- migrated from current manual `public/sitemap.xml`
- Dynamic: reads `content/blog/*.ko.md` frontmatter to get slugs + publishedAt
- Generates `public/sitemap.xml` with correct hreflang for each page type:
  - Static pages: ko+en+ja (3-way, as currently)
  - Blog pages: ko+en only (2-way, no ja alternate)
- Output overwrites `public/sitemap.xml`

**5d. OG images -- extend `scripts/og/pages.mjs`:**
Add blog entries to the pages array. For each blog slug, 2 entries:
```js
{ slug: 'blog-{slug}', title: '...', subtitle: '...', badge: 'EN  ·  BLOG' },
{ slug: 'ko-blog-{slug}', title: '...', subtitle: '...', badge: 'KO  ·  BLOG' },
```
Alternative: make `pages.mjs` dynamically read blog frontmatter. Executor decides -- static list is simpler if article count is fixed at 7.

**Acceptance:**
- [ ] `npm run build` executes blog -> sitemap -> og -> vite in order, exits 0
- [ ] `dist/blog/{slug}/index.html` exists after build (Vite copied from public/)
- [ ] `dist/sitemap.xml` includes blog URLs with ko+en hreflang (no ja for blog)
- [ ] `dist/og/blog-*.png` OG images exist for all blog slugs
- [ ] server.js serves `/blog/{slug}` with correct HTML in production mode

---

### Step 6: Footer link in App.jsx + i18n keys

**Files:**
- `src/i18n.js` -- add footer keys for all 3 languages:
  - `ko`: `footerBlog: '블로그'`, `footerBlogUrl: '/ko/blog'`
  - `en`: `footerBlog: 'Blog'`, `footerBlogUrl: '/blog'`
  - `ja`: `footerBlog: 'ブログ'`, `footerBlogUrl: '/blog'` (ja footer links to en blog since no ja blog exists)
- `src/App.jsx` -- add Blog link to footer between FAQ and Guide links:
  ```jsx
  <a href={t('footerBlogUrl')}>{t('footerBlog')}</a>
  <span aria-hidden="true"> · </span>
  ```

**Acceptance:**
- [ ] Footer shows Blog link in all 3 languages (ko, en, ja)
- [ ] ko footer links to `/ko/blog`
- [ ] en footer links to `/blog`
- [ ] ja footer links to `/blog` (English blog, since no ja blog)

---

## Frontmatter Schema (Reference)

```yaml
---
slug: suno-lyrics-prompt-tips        # URL slug, must match filename
title: "Suno AI 가사 프롬프트 작성법"  # Korean title
title_en: "Suno AI Lyrics Prompt Guide" # English title
summary: "가사 프롬프트로 Suno 곡 퀄리티 올리기"  # Korean summary (meta description)
summary_en: "Improve Suno song quality with lyrics prompts" # English summary
publishedAt: 2026-06-15              # ISO date
ogSubtitle: "Lyrics · Prompts · Quality Tips"  # OG image subtitle (English only, per existing pattern)
tags: [suno, lyrics, prompt]         # For future filtering (not used in Phase A)
---
```

Korean body follows in the `.ko.md` file. English body in `.en.md` file.
Frontmatter lives in the `.ko.md` file only (single source of metadata).

---

## 7 Blog Slugs (locked from spec)

1. `suno-lyrics-prompt-tips` -- 가사 프롬프트 기법
2. `ai-music-genre-catalog` -- AI 음악 장르 카탈로그
3. `ai-music-copyright-guide` -- AI 음악 저작권
4. `suno-vs-udio-comparison` -- Suno vs Udio 비교
5. `suno-pro-value-analysis` -- Suno Pro 가치 분석
6. `daw-post-processing` -- DAW 후처리
7. `youtube-content-with-ai-music` -- 유튜브 콘텐츠 활용

---

## Final Acceptance Criteria (Phase A Done)

- [ ] `npm install` adds `marked` as devDependency
- [ ] `content/blog/_template.md` exists with documented frontmatter schema
- [ ] `scripts/build-blog.mjs` converts markdown to HTML matching guide page style
- [ ] `scripts/build-sitemap.mjs` generates sitemap.xml with all pages + blog hreflang
- [ ] `npm run build` runs full pipeline (blog -> sitemap -> og -> vite) without errors
- [ ] With a test article present: `dist/blog/{slug}/index.html` and `dist/ko/blog/{slug}/index.html` exist and are valid HTML
- [ ] Blog index pages (`/blog/index.html`, `/ko/blog/index.html`) render article cards
- [ ] OG images generated for blog posts
- [ ] server.js serves blog URLs correctly in production mode
- [ ] Footer in React app shows Blog link in ko/en/ja
- [ ] Sitemap blog entries have ko+en hreflang only (no ja alternates for blog)
- [ ] Blog page header lang-switch shows EN/한국어 only (no 日本語)

---

## ADR: Blog Infrastructure Architecture

**Decision:** Static markdown-to-HTML build pipeline writing to `public/blog/`, with automated sitemap generation, extending the existing OG image and Express static serving patterns.

**Drivers:** AdSense information-site signal, low maintenance overhead for 7 articles, hreflang correctness for 2-language blog within a 3-language site.

**Alternatives considered:**
- Direct dist/ write: rejected (Vite wipes dist/ on build)
- markdown-it parser: rejected (spec mandates `marked`, oversized for need)
- Manual sitemap patching: rejected (defeats automation goal)
- Node orchestrator script: rejected (npm script chain is transparent and matches existing pattern)
- React Router for blog: rejected (spec non-goal, would require SPA architecture change)

**Why chosen:** Mirrors the exact pattern already proven by `/guide` pages. Zero new paradigms. Build script is the only net-new concept, and it uses the same conventions (ESM, Node 20, `public/` output) as the existing `build-og.mjs`.

**Consequences:** Generated HTML files in `public/blog/` must be .gitignored. Adding a new article requires writing 2 markdown files and rebuilding. server.js `CONTENT_PAGES` must be updated when articles are added.

**Follow-ups:** Phase B (Korean drafts), Phase C (user enrichment), Phase D (English translation), Phase E (English review), Phase F (build and deploy).

---

## Required Hardening Edits (Architect + Critic consensus, 2026-05-29)

These 4 edits MUST be incorporated during implementation. Verdict: APPROVE with these as in-execution hardening.

### H1 — Sitemap snapshot guard (Architect risk #1, highest priority)
- Before the first `scripts/build-sitemap.mjs` run modifies `public/sitemap.xml`, capture a baseline: copy current `public/sitemap.xml` to `public/sitemap.xml.bak` once at implementation time (committed alongside the script, not regenerated)
- Add a `--verify` mode to `build-sitemap.mjs` that re-emits sitemap content and diffs all NON-blog `<url>` entries against `sitemap.xml.bak` — must report zero changes to existing 16 indexed URLs
- Per-entry preservation required: existing `changefreq` (weekly/monthly/yearly), `priority` (1.0/0.8/0.5/0.3), `lastmod` (per-page values), `xmlns:xhtml` namespace, and the `/about` /`/privacy` /`/terms` single-URL-with-3-alternates pattern (NOT 3 separate entries)
- CI / pre-deploy: run `node scripts/build-sitemap.mjs --verify` and fail if diff detected

### H2 — Spec path deviation acknowledgment in ADR
- Spec line 49 says `dist/en/blog/{slug}/index.html` but plan uses `public/blog/{slug}/index.html` (English bare) + `public/ko/blog/{slug}/index.html` (Korean prefix)
- This matches existing `/guide` convention. Add explicit note to ADR so future readers don't see this as a bug

### H3 — server.js CONTENT_PAGES auto-population with fallback
- In `server.js`, populate `CONTENT_PAGES` blog entries via glob `dist/blog/*/index.html` (and `dist/ko/blog/*/index.html`) at startup
- If glob returns zero results, log a warning (`[server] dist/blog not built — falling back to hardcoded list`) and use a hardcoded list of the 7 known slugs
- Prevents silent SPA catch-all serving wrong content when a new article is added but server.js is not updated

### H4 — Frontmatter schemaVersion field
- `content/blog/_template.md` frontmatter must include `schemaVersion: 1`
- `build-blog.mjs` warns (does NOT fail) on missing `schemaVersion`, treating absence as v0
- Provides migration path if frontmatter schema evolves (author, updatedAt, category, etc.)

### Additional Critic-flagged minor concerns (incorporate opportunistically)
- `build-blog.mjs` should fail fast with a clear error message on malformed YAML frontmatter (missing `---` delimiters, missing required `title`/`slug`/`publishedAt` fields)
- `_template.md` must include a `schemaVersion: 1` example so contributors learn the convention

---

## Execution Plan (Autopilot)

This plan is APPROVED. Autopilot should:
1. Implement steps 1-6 of the plan body
2. Incorporate H1-H4 hardening edits inline (not as a separate pass)
3. Verify all 12 acceptance criteria pass before declaring Phase A complete
4. Do NOT begin Phase B (Korean article drafts) — that is a separate phase

