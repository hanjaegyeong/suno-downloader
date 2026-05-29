# 완료된 플랜 아카이브

---

## /about 페이지 — 운영 주체 신뢰 신호 (2026-05-29 완료)

### 결정 사항
- **운영 주체**: 익명 개인 (실명·닉네임 비공개) — 사용자 결정
- **운영자 약력**: 노출하지 않음 — 사용자 결정
- **페이지 구조**: privacy/terms 패턴 채택 — 단일 `/about` URL, 3개 lang block JS 토글 (faq/guide 같은 locale 분리 안 함)
- **운영 톤**: "Suno Pro 구독자가 자신이 만든 음악을 로컬에 백업할 권리"를 핵심 미션으로 정의 — 광고 정책(AdSense) 대응 + 도구 정체성 리스크 완화 일관 톤

### 체크리스트
- [x] /about 라우트 추가 — `server.js` CONTENT_PAGES에 `'about'` 추가, `public/about/index.html` 생성
- [x] 운영 주체 정체성 — 익명 개인, 자비·광고로 운영비 충당 명시
- [x] 미션 섹션 — Suno Pro 구독자의 로컬 백업·개인 청취·DAW 후처리 권리 행사
- [x] ~~운영자 약력/배경 섹션~~ 제거 (사용자 결정)
- [x] 책임감 있는 사용 원칙 — 본인 창작물 / 본인 계정 / 개인 청취 / 재배포·상업 활용 금지 / 저작권 준수
- [x] 연락처 — `hjg000223@naver.com`
- [x] 다국어 콘텐츠 — 한국어/English/日本語 3개 lang block + i18n.js footer 키
- [x] SEO 메타 — title·description·canonical·hreflang·OG·Twitter Card·robots index
- [x] OG 이미지 — `scripts/og/pages.mjs`에 `about` 슬러그 추가 → 빌드 시 `og/about.png` 자동 생성 (89.1 KB)
- [x] 푸터 링크 노출 — `App.jsx` (메인) + 14개 정적 페이지 푸터에 /about 링크 추가
- [x] sitemap.xml에 `/about` 포함 (priority 0.5, monthly)
- [x] JSON-LD `AboutPage` 스키마 + Organization publisher

### 산출물

| 파일 | 변경 내용 |
|---|---|
| `public/about/index.html` | 신규 — 3개 lang block, AboutPage JSON-LD, OG/Twitter 메타, 미션·원칙·관계·연락 섹션 |
| `server.js` | CONTENT_PAGES에 `'about'` 추가 |
| `scripts/og/pages.mjs` | `about` 슬러그 엔트리 추가 (badge: ABOUT) |
| `public/sitemap.xml` | `/about` URL 추가 (3개 hreflang) |
| `src/i18n.js` | `footerAbout` 키 ko/en/ja 추가 |
| `src/App.jsx` | 푸터에 `<a href="/about">{t('footerAbout')}</a>` 추가 |
| `public/{privacy,terms,faq,ko/faq,ja/faq}/index.html` | 푸터에 about 링크 추가 |
| `public/guide/{how-to-download-suno-playlist,suno-mp3-vs-wav,suno-pro-cookie-setup}/index.html` × 3 locales | 푸터에 about 링크 추가 (총 9개) |

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-29 | /start-phase — PLAN.md에서 PLAN-CURRENT.md로 이동 |
| 2026-05-29 | 사용자 결정 수신: 익명 운영 / 약력 미노출 → 컨텐츠 스코프 확정 |
| 2026-05-29 | `public/about/index.html` 생성 (3 lang block, AboutPage JSON-LD) |
| 2026-05-29 | `server.js` CONTENT_PAGES + `sitemap.xml` + `pages.mjs` 동시 갱신 |
| 2026-05-29 | `i18n.js` footerAbout 키 3개 언어 + `App.jsx` 푸터 링크 |
| 2026-05-29 | 14개 정적 페이지 푸터에 about 링크 일괄 추가 (en/ko/ja 라벨 분기) |
| 2026-05-29 | `npm run build` 검증 — OG 16장 생성, vite build 성공 |
| 2026-05-29 | 로컬 서버 `/about` 200 OK + canonical/og:url/title 정상 확인 |
| 2026-05-29 | /complete-phase로 아카이빙 |

### 메모
- **트러스트 시그널 보강 완료**: 운영자·미션·원칙·연락처·법적 면책의 5개 신호가 AdSense 운영자 신뢰성 평가 시 평가 포인트. 익명 운영을 유지하면서도 "왜·어떤 자격으로" 정도는 충분히 노출.
- **약력 미노출의 트레이드오프**: AdSense는 "운영자가 실존하는가" 신호를 선호하지만, 익명 + 미션·원칙·연락 가능한 이메일이 명시되면 1인 개발 도구 카테고리에서는 충분히 통과 가능. 차후 거절 시 약력 추가가 다음 카드.
- **다음 작업 후보**: PLAN.md 최상단 "사이트 톤 리프레이밍 + 메인 본문 강화" — /about에서 정의한 톤("Suno 활용 허브" 정체성)을 메인 페이지 본문에 800~1500단어로 확장해야 일관성이 완성됨.

---

## 이미지 alt 텍스트 정비 (2026-05-26 완료)

### 결정 사항
- **인벤토리 결과**: 본문 `<img>`는 `src/components/SongList.jsx`의 곡 썸네일 1곳뿐이고 가이드/FAQ/정책 페이지에는 본문 이미지가 전혀 없음. 따라서 작업의 실질 SEO 임팩트는 (1) 곡 썸네일 alt에 곡명 노출 (2) og:image:alt + twitter:image:alt 13개 페이지 보강에 집중
- **언어 전략**: alt 텍스트는 페이지의 콘텐츠 언어(ko/en/ja)를 따라가되, og:image PNG 자체는 영문(이전 라운드 결정 유지)이라 alt가 실제 의미 정보 전달자 역할
- **og:image 안정성 추가**: 모든 페이지에 `og:image:type` `image/png`, `og:image:width` 1200, `og:image:height` 630 동시 명시 (페북/디스코드 스크래퍼 렌더 안정성)

### 체크리스트
- [x] 사이트 내 모든 `<img>` 인벤토리 수집 (src/components, src/pages, index.html, public/og-images 등)
- [x] 현재 alt 텍스트 현황 평가 (없음 / 빈 값 / 부적절 / 양호)
- [x] 의미 있는 이미지 vs 장식용 이미지 분류
- [x] 메인 페이지 (Downloader/SongList/TokenSetup/AdSlot 등) alt 정비
- [x] /guide/* 가이드 페이지 이미지 alt 정비
- [x] /faq, /blog 등 추가 페이지 이미지 alt 정비
- [x] 다국어(ko/en/ja) alt 텍스트 i18n 키 정리 또는 페이지별 분기
- [x] 장식용 이미지에 `alt=""` 명시 처리
- [x] OG 이미지 메타데이터(`og:image:alt`) 페이지별로 적용 확인
- [x] 빌드(`npm run build`) 후 dist 결과물에서 alt 누락 점검

### 산출물

| 파일 | 변경 내용 |
|---|---|
| `src/components/SongList.jsx` | 곡 썸네일 `alt=""` → `alt={`${song.title} — Suno AI cover art`}` |
| `public/faq/index.html` | og:image:type/width/height/alt + twitter:image:alt (영문) |
| `public/ko/faq/index.html` | 동일 패턴 (한국어 alt) |
| `public/ja/faq/index.html` | 동일 패턴 (일본어 alt) |
| `public/privacy/index.html` | 동일 패턴 (영문 alt, 단일 다국어 페이지) |
| `public/terms/index.html` | 동일 패턴 (영문 alt, 단일 다국어 페이지) |
| `public/guide/{how-to-download-suno-playlist,suno-mp3-vs-wav,suno-pro-cookie-setup}/index.html` | 영문 alt 3개 |
| `public/ko/guide/{같음 ×3}/index.html` | 한국어 alt 3개 |
| `public/ja/guide/{같음 ×3}/index.html` | 일본어 alt 3개 |

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-26 | /start-phase로 시작, 인벤토리 — 본문 `<img>` 1개(SongList), 정적 HTML 15개 중 index.html만 og:image:alt + twitter:image:alt 보유 |
| 2026-05-26 | SongList.jsx 곡 썸네일 alt에 곡명 + "Suno AI cover art" 적용 |
| 2026-05-26 | FAQ 3개 언어 og:image:type/width/height/alt + twitter:image:alt 추가 |
| 2026-05-26 | Privacy·Terms 페이지에 같은 메타 추가 (영문 alt) |
| 2026-05-26 | 가이드 9개(en/ko/ja × 3종) 메타 추가, 각 언어별 키워드 반영 |
| 2026-05-26 | `npm run build` 통과, dist 15개 모두 `og:image:alt` 1회 출현 / 곡명 alt도 번들 JS 검증 |
| 2026-05-26 | /complete-phase로 아카이빙 |

### 메모
- **본문 이미지 부재가 본질적 한계**: 가이드/FAQ 페이지에 스크린샷·다이어그램 같은 실제 콘텐츠 이미지가 없어 Google 이미지 검색 노출 자체의 surface가 매우 작음. og:image는 SNS 카드용이지 이미지 검색용은 아님. 진짜 이미지 검색 트래픽을 노리려면 향후 가이드에 실제 스크린샷(Suno 플레이리스트 페이지, SunoDown UI, 쿠키 추출 스크린샷 등)을 추가해야 함. 본 라운드는 "현재 자산 한도 내 최대치"에 해당.
- **곡 썸네일 alt의 가치**: SongList 썸네일은 사용자가 플레이리스트를 로드할 때만 렌더되므로 크롤러가 직접 인덱싱하지는 않지만, 향후 SSR/프리렌더로 전환하거나 인기 플레이리스트 페이지를 SEO 페이지로 만들 때 즉시 효과가 작동하도록 미리 정비.
- **og:image:width/height 효과**: 페북 스크래퍼는 dims가 메타에 없으면 이미지를 직접 다운로드해 측정하는데, 이게 첫 공유 시 지연·캐싱 누락을 유발. 명시하면 즉시 카드 렌더. 13개 페이지에 일괄 적용해 SNS 카드 안정성 확보.
- **언어별 키워드 매핑**: ko alt에는 "전곡 MP3·WAV", "무손실 WAV", "쿠키 설정" 같은 한국어 검색어, ja alt에는 "ロスレス WAV", "クッキー設定" 같은 일본어 검색어를 자연스럽게 포함. og:title과 중복되지 않게 약간 다른 표현 사용.
- **alt vs og:image:alt 구분**: 본문 `<img alt>`는 이미지 검색·접근성용, `og:image:alt`는 SNS 카드 접근성(스크린리더)용. 둘은 별개 목적이라 같은 페이지여도 다르게 작성하는 게 자연스러움.
- **다음 자연 후속**: PLAN.md 최상단 "/blog 블로그 시스템 구축". 블로그가 생기면 글마다 OG 이미지·alt·본문 이미지를 함께 설계하는 표준 패턴이 필요.

---

## 페이지별 OG 이미지·title·description·canonical 개별화 (2026-05-26 완료)

### 결정 사항
- **og:image 전략**: SVG 템플릿 + 빌드 시 PNG 생성. 렌더러는 `@resvg/resvg-js` (devDep), 폰트는 `scripts/og/fonts/Outfit-*.ttf` 5개 두께 번들 커밋. 텍스트는 영문 ASCII로 통일 (CJK 폰트 무게 회피, og:title이 페이지별로 한·일을 이미 표시)
- **출력**: `public/og/<slug>.png` 15개 — 빌드 시 Vite가 `dist/og/`로 복사
- **PNG 커밋 여부**: 커밋함 (배포 안정성 우선, 1.4MB 추가는 허용 범위)

### 체크리스트
- [x] 현 15개 페이지의 title·description·canonical을 표로 정리해 길이·중복·키워드 매칭 1차 감사 — 모두 페이지별 개별화 완료 확인
- [x] hreflang: 모든 언어 분리 페이지(/faq, /ko/faq 등)가 자기 형제 3개를 정확히 가리키도록 점검 — 모두 정상 (privacy/terms는 단일 다국어 페이지라 자기 자신을 가리키는 게 맞음)
- [x] og:image 전략 결정 — SVG 템플릿 + `@resvg/resvg-js` 빌드 시 생성
- [x] og:image 결정안 구현 + 각 페이지 og:image / twitter:image 절대 URL 교체 (15개 페이지)
- [x] og:url / canonical 마지막 슬래시 일관성 점검 — 전부 슬래시 없음으로 통일
- [x] /privacy, /terms index 정책 재확인 — `index, follow` 유지 (신뢰 시그널)
- [x] 빌드 후 dist/ 산출물에서 15개 페이지의 메타 태그를 grep으로 일괄 검증 — `/og-image.png` 잔재 0건, 페이지별 `/og/<slug>.png` 정확히 적용
- [x] guide/suno-mp3-vs-wav 3종(en/ko/ja)의 JSON-LD `"image"` 필드도 함께 교체 (Article 스키마 일관성)
- [ ] og:image:alt 페이지별 다르게 — 현재 root만 보유. og:title 폴백으로 동작하므로 후속 접근성 라운드(PLAN.md "이미지 alt 텍스트 정비")에 묶음
- [ ] 변경 후 opengraph.xyz 등 실제 카드 미리보기 확인 — 배포 후 외부 검증 작업

### 산출물

| 파일/디렉터리 | 역할 |
|---|---|
| `scripts/og/pages.mjs` | 15개 페이지 메타(slug·title·subtitle·badge) 데이터 |
| `scripts/og/render-svg.mjs` | 페이지 메타 → SVG 문자열 변환 |
| `scripts/og/build-og.mjs` | SVG → PNG 렌더 + `public/og/<slug>.png` 출력 |
| `scripts/og/fonts/Outfit-*.ttf` | 번들 폰트 (Regular/Medium/SemiBold/Bold/Black) ~375KB |
| `public/og/*.png` | 생성된 15개 OG 이미지 (각 ~95KB) |
| `package.json` | `build:og` 스크립트 신설 + `build`에 체이닝 |

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-26 | /start-phase로 시작, 현 상태 감사 → title/desc/canonical은 페이지별 거의 개별화돼 있고 og:image만 단일 PNG 공유 상태 |
| 2026-05-26 | og:image 전략 SVG 템플릿+빌드 시 PNG 생성으로 결정, `@resvg/resvg-js` 도입 |
| 2026-05-26 | woff2 폰트 텍스트 렌더 실패 → Outfit TTF 5종을 GitHub raw에서 다운로드해 `scripts/og/fonts/`에 커밋, 정상 렌더 확인 |
| 2026-05-26 | 15개 페이지 HTML의 `og:image`/`twitter:image`(+ mp3-vs-wav 3종 JSON-LD `image`) 일괄 sed 교체 |
| 2026-05-26 | `npm run build` 통과 (build:og 277ms + vite 612ms), dist 산출물 grep 검증 완료 |
| 2026-05-26 | /complete-phase로 아카이빙 |

### 메모
- **woff2 폰트 함정**: `@fontsource/outfit`은 `.woff/.woff2`만 제공. `@resvg/resvg-js`가 woff2 로딩에 실패해 텍스트가 안 그려져 첫 산출물은 텍스트 없는 카드였음. GitHub `Outfitio/Outfit-Fonts` raw에서 TTF 5종(Regular/Medium/SemiBold/Bold/Black) 직접 다운로드해 `scripts/og/fonts/`에 커밋하는 방향으로 전환. `@fontsource/outfit`은 미사용이 됐으니 devDeps에서 제거. resvg에 woff2를 쓰려면 별도 처리가 필요할 수 있다는 점 기록.
- **CJK 폰트 회피**: og:image 텍스트는 영문 ASCII로 통일 (FAQ/GUIDE/LEGAL 뱃지 + 영문 타이틀). 한·일 페이지도 같은 영문 카드를 쓰되 뱃지에 `KO · GUIDE` / `JA · FAQ` 같은 언어 힌트만 노출. CJK 폰트(Noto Sans CJK 등)는 ~10MB+로 무거워 빌드 산출물·Docker 이미지에 부담. og:title 메타가 이미 페이지별 한·일을 노출하므로 SNS 카드에서 언어 정보 손실은 미미.
- **JSON-LD `image` 동기화**: `guide/suno-mp3-vs-wav` 3종은 Article 스키마에 `image` 필드를 별도로 갖고 있어 og:image와 함께 일괄 치환. 다음에 schema에 이미지를 추가할 때도 og 도메인 룰과 동일 URL을 유지해야 일관성 유지.
- **PNG 커밋 트레이드오프**: 1.4MB 추가지만 배포 안정성(빌드 실패해도 직전 PNG 유지)과 dev 모드 OG 프리뷰 가능. 향후 페이지 추가 시 `build:og`만 다시 돌리면 됨.
- **hreflang 감사 부수 결과**: 모든 분리 페이지가 이미 형제 3개를 정확히 지목하고 있어 추가 수정 없었음. privacy/terms가 ko/en/ja 모두 자기 URL을 가리키는 건 단일 다국어 페이지 패턴이라 의도된 동작. 메인 index.html도 동일 패턴.
- **다음 자연 후속**: PLAN.md 두 번째 줄 "이미지 alt 텍스트 정비"에 og:image:alt 페이지별 추가 작업을 끼워넣으면 접근성 라운드로 묶기 좋음.

---

## `/faq` 정적 페이지 — 메인 FAQ 분리·확장, 페이지별 FAQ Schema (2026-05-26 완료)

### 체크리스트
- [x] 메인 FAQ 위치·개수·톤 파악 — `index.html`에 FAQPage JSON-LD 19 Q&A(KO+EN+JA 혼재) + 시각 KO 6 / EN 3 / JA 3, App.jsx에는 FAQ 없음
- [x] Q&A 카테고리 설계 — 가이드 18개와 비중복 도구·서비스 질문 15개 도출 (5 카테고리 × 3)
- [x] `public/faq/index.html` (en, self canonical, lang=en, FAQPage+BreadcrumbList JSON-LD, 15 Q&A)
- [x] `public/ko/faq/index.html` (ko, lang=ko)
- [x] `public/ja/faq/index.html` (ja, lang=ja)
- [x] 3개 페이지 hreflang 4종(en/ko/ja/x-default) + self canonical
- [x] `server.js` `CONTENT_PAGES`에 3개 라우트 등록
- [x] `public/sitemap.xml`에 3개 URL + hreflang alternate 추가
- [x] 메인 페이지 처리 — FAQPage JSON-LD 통째 삭제, 각 lang FAQ 섹션 끝 "전체 FAQ 보기 →" CTA 추가, 푸터에 /faq 3개 lang 줄 신설
- [x] 기존 가이드 3개 × 3개 언어 = 9개 페이지 푸터에 /faq cross-link 추가 (sed 일괄)
- [x] `src/i18n.js` ko/en/ja에 `footerFaq`/`footerFaqUrl` 키 추가
- [x] `src/App.jsx` 푸터 맨 앞에 FAQ 링크 노출
- [x] `public/privacy/index.html` · `public/terms/index.html` 푸터에 /faq 링크 추가
- [x] `npm run build` 1.64s 성공, dist에 3개 신규 페이지 산출 확인
- [x] 로컬 prod curl 검증 — 신규 3 URL 200 + lang/canonical/4 hreflang/FAQPage+BreadcrumbList 정상, 가이드 9개·privacy·terms /faq 링크 1개씩, 메인 /faq 링크 6건(3 CTA + 3 푸터), 메인 FAQPage 스키마 0건(중복 제거 확인), sitemap /faq 매칭 15회
- [x] 3개 언어 페이지 푸터·본문 언어 일관성 회귀 검수 — KO에 가나 0, JA의 한글은 의도된 언어 스위처 라벨(`한국어`) 뿐
- [ ] Google Rich Results Test로 FAQPage·BreadcrumbList 스키마 유효성 확인 (배포 후 외부 검증 작업)

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-26 | /start-phase로 항목 시작, PLAN-CURRENT 작성 (의사결정 9개 명시) |
| 2026-05-26 | "SEO 가치 우선, 쓸데없는 것 제외" 원칙 합의 → 의사결정 9개 모두 SEO 유리한 방향으로 고정 |
| 2026-05-26 | index.html 정적 폴백 FAQ 파악 — FAQPage JSON-LD에 19 Q&A 혼재(KO+EN+JA), 시각 HTML은 lang별 분리. App.jsx에는 FAQ 없음 |
| 2026-05-26 | EN/KO/JA 3개 FAQ 페이지 작성 — 5 카테고리(서비스&요금/다운로드&호환/계정&인증/안전&약관/오류&트러블슈팅) × 3 Q&A = 15개, h2 헤딩 그룹화, FAQPage+BreadcrumbList JSON-LD, 4 hreflang, self canonical |
| 2026-05-26 | server.js CONTENT_PAGES 3개 라우트 추가, sitemap.xml 3 URL × 4 hreflang 추가 |
| 2026-05-26 | index.html 메인 페이지 처리 — FAQPage JSON-LD 블록(141줄) 통째 sed 삭제, 각 lang 시각 FAQ 끝에 "전체 FAQ 15개 보기" CTA 추가, 푸터에 /faq 3개 lang 줄 신설 |
| 2026-05-26 | 기존 9개 가이드 페이지 푸터에 /faq 링크 sed 일괄 삽입 (BSD sed \xc2\xb7 escape 이슈 발견 → 후속 sed로 정상화) |
| 2026-05-26 | i18n.js ko/en/ja에 footerFaq/footerFaqUrl 키 추가, App.jsx 푸터 맨 앞에 FAQ 링크 노출, privacy/terms 푸터에 /faq 줄 동기화 |
| 2026-05-26 | npm run build 1.64s 성공 → 로컬 prod curl 검증: 신규 3 FAQ URL + 9 가이드 + privacy/terms + 메인 + sitemap 전부 200, lang/canonical/4 hreflang/JSON-LD 정상, 메인 FAQPage 스키마 0(제거 확인), 가이드 9개 FAQ 링크 각 1건, 메인 6건, lang 회귀 없음 |
| 2026-05-26 | /complete-phase로 아카이빙 |

### 메모
- **메인 FAQPage 스키마 통째 제거가 이번 작업의 핵심 의사결정**. 한 도메인 안에서 동일·유사 FAQPage가 여러 URL에 중복되면 스키마 가중치가 분산되거나 (최악의 경우) 무시될 수 있어, `/faq`가 단일 FAQPage 소스가 되도록 정리. 메인의 시각 FAQ HTML은 본문 콘텐츠로서 유지하되 스키마는 떼어냄 — 본문 텍스트(검색엔진 본문 매칭)와 스키마(리치 결과 후보)를 분리한 접근.
- **가이드 18 Q&A와의 차별화**: 가이드는 "단계·절차·기술 깊이", `/faq`는 "서비스·계정·법·오류" — 의도 분리. 가이드와 동일 주제일 때는 짧게 답하고 가이드 링크로 위임해 식인 회피.
- **카테고리 5개 × 3 Q&A 구조**: 단일 흐름 대신 h2 헤딩 그룹화. long-tail 키워드 표면 ↑(섹션 제목 자체가 키워드), 사용자 스캔성 ↑, 페이지 길이 ↑ 트레이드오프는 4분 읽기 시간 내라 허용.
- **법·저작권 면책 톤**: "Suno 공식 약관 확인 권장" / "개인 용도만" / "Suno AI와 무관한 독립 서비스" 일관 명시. 단정적 법적 진술 회피.
- **BSD sed escape 함정**: macOS sed는 `\xc2\xb7` 시퀀스를 리터럴 문자열로 삽입. UTF-8 바이트 escape는 GNU sed 전용 → 일단 placeholder로 삽입 후 후속 sed 치환으로 실제 `·` 문자 주입. 다음 작업에서 동일 패턴 쓸 때 처음부터 실제 문자 사용 권장.
- **푸터 줄 수 확장**: 가이드 3 + FAQ 1 + privacy/terms = 4줄. 5번째 가이드 추가 시 `/guides` 인덱스 페이지 도입 재검토 약속은 그대로 유효.
- 다음 자연 후속 작업: PLAN.md 상단 "페이지별 OG 이미지·title·description·canonical 개별화" — `/faq`·가이드·privacy·terms가 모두 동일 og-image.png를 쓰고 있어 OG 차별화 + 검색 결과 시각 차별화 기회.

---

## `/guide/suno-pro-cookie-setup` 한·영·일 분리 URL Pro 쿠키 설정 튜토리얼 (2026-05-26 완료)

### 체크리스트
- [x] `public/guide/suno-pro-cookie-setup/index.html` (en, self canonical, lang=en, 26 KB)
- [x] `public/ko/guide/suno-pro-cookie-setup/index.html` (ko, lang=ko, 27 KB)
- [x] `public/ja/guide/suno-pro-cookie-setup/index.html` (ja, lang=ja, 29 KB)
- [x] 3개 페이지 HowTo + FAQPage(6 Q&A) + BreadcrumbList JSON-LD
- [x] 3개 페이지 hreflang 4종(en/ko/ja/x-default) + self canonical
- [x] 본문 핵심 섹션 — 사전 안내 / 5단계 / 4 브라우저 분기 카드 / 보안 모델 5포인트 / 만료·재연결 / 트러블슈팅 5케이스 / FAQ 6개 / 관련 링크
- [x] `server.js` `CONTENT_PAGES`에 3개 라우트 등록 + curl 200 검증
- [x] `public/sitemap.xml`에 3개 URL + hreflang alternate 추가
- [x] 기존 2개 가이드(how-to·mp3-vs-wav) 6개 페이지에 본 가이드 cross-link (관련 링크 + 푸터, 페이지당 2건)
- [x] `src/i18n.js` ko/en/ja에 `footerGuide3`/`footerGuide3Url` 키 추가
- [x] `src/App.jsx` 푸터에 본 가이드 링크 노출, `index.html` 정적 폴백·`/privacy`·`/terms` 푸터 동기화
- [x] `npm run build` 658ms 성공, 3개 `dist/.../index.html` (26~29 KB) 생성
- [x] 로컬 prod curl 검증 — 13개 URL 전부 200, lang/canonical/4 hreflang/JSON-LD 3종 정상, cross-link 페이지당 2건·메인 폴백 3건 정상
- [ ] Google Rich Results Test로 HowTo·FAQPage·BreadcrumbList 스키마 유효성 확인 (배포 후 외부 검증 작업)

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-26 | /start-phase로 항목 시작, PLAN-CURRENT 작성 (브라우저 분기·보안 톤·트러블슈팅 범위 의사결정 항목 명시) |
| 2026-05-26 | "SEO에 도움되면 다 하고, 쓸데없는 건 다 지워" 합의 — 의사결정 5개 SEO 유리한 방향으로 고정, 본문 작성 시 keyword stuffing·모달 반복·일반론 배제 원칙 확립 |
| 2026-05-26 | EN/KO/JA 3개 페이지 작성 — 사전 안내 + 5단계 + 4 브라우저 카드 + 보안 5포인트 + 만료 + 트러블슈팅 5케이스 + FAQ 6개 + 관련 링크 |
| 2026-05-26 | server.js CONTENT_PAGES 3개 라우트 추가, sitemap.xml 3 URL × 4 hreflang 추가 |
| 2026-05-26 | how-to·mp3-vs-wav 6개 페이지에 본 가이드 cross-link (관련 링크 1 + 푸터 1, 페이지당 2건) |
| 2026-05-26 | i18n.js footerGuide3/footerGuide3Url 키 ko/en/ja 추가, App.jsx 푸터 노출, index.html 정적 폴백·privacy·terms 푸터 동기화 |
| 2026-05-26 | npm run build 658ms 성공 → prod 서버 curl 검증: 신규 3 URL + mp3-vs-wav 3 + how-to 3 + main + privacy + terms + sitemap 전부 200, JSON-LD 3종 유효, cross-link 12건 + 메인 폴백 3건 + privacy/terms 푸터 2건 모두 정상 |
| 2026-05-26 | JA mp3-vs-wav 푸터 마지막 줄에 잘못 들어간 한글 문구를 일본어로 즉시 수정 (회귀 차단) |
| 2026-05-26 | /complete-phase로 아카이빙 |

### 메모
- 직전 두 가이드의 패턴(분리 URL + CONTENT_PAGES + sitemap + hreflang + 동일 CSS 변수)을 그대로 재사용. 신규 의존성 0.
- **메인 모달 식인 회피**: 같은 5단계가 두 곳에 있는 것은 불가피하지만, 본 페이지는 모달이 다루지 않는 **브라우저별 카드 · 보안 모델 5포인트 · 세션 만료 동작 · 5개 트러블슈팅**으로 차별화. 모달은 "즉시 연결" / 본 페이지는 "처음 켜기 + 깊은 이해"로 의도 분리.
- **보안 톤**: server.js의 in-memory `Map` · 50초 JWT 갱신 · 세션 종료 시 즉시 폐기를 평문으로 명시. 의심을 인정하고 사실로 답하는 방식 — 이런 정보성 신뢰 신호가 LLM·검색엔진의 페이지 평가에 유리.
- 4개 브라우저 카드(Chrome/Edge · Firefox · Safari · Brave/Arc/Opera)는 한 줄씩만 — long-tail 키워드 표면 확보 + 페이지 비대화 방지의 균형.
- 페이지 용량 26~29 KB로 mp3-vs-wav(25~27 KB)와 유사. 여전히 JS·이미지 0, LCP 영향 미미.
- 푸터 노출은 가이드 3개째 — 한 줄에 모두 노출(다운로드 방법 + MP3 vs WAV + Pro 쿠키 + 개인정보 + 이용약관). `/guides` 인덱스 페이지 도입은 가이드 5개 시점에 재검토하기로 합의 유지.
- **WAV 가이드의 위임 약속 이행** — mp3-vs-wav 가이드의 "Pro 설정만 다루는 별도 페이지는 다음 가이드" 약속을 지킴. 두 가이드 모두에서 본 페이지로의 직접 진입 경로 확보.
- 회귀 차단: 마지막 Edit에서 JA mp3-vs-wav 푸터에 한국어 "독립 서비스입니다"가 잘못 들어간 것을 검증 단계에서 발견 → 일본어 "独立サービスです"로 즉시 복원. 이런 multi-lang 페이지 동시 편집의 위험 신호.
- PLAN.md 백로그의 "SoftwareApplication / WebApplication JSON-LD" 항목은 이미 `index.html`에 WebApplication 스키마가 있음을 발견 → 부분 중복이라 추후 별건으로 정리하면 됨.
- 다음 자연 후속 작업: PLAN.md 상단 `/faq` 정적 페이지(메인 FAQ 분리·확장) — 가이드 3개와 메인 FAQ 사이에 검색 표면 분산을 정리하는 작업.

---

## `/guide/suno-mp3-vs-wav` 한·영·일 분리 URL 포맷 비교 가이드 (2026-05-26 완료)

### 체크리스트
- [x] `public/guide/suno-mp3-vs-wav/index.html` 작성 (en, self canonical, lang=en, 25 KB)
- [x] `public/ko/guide/suno-mp3-vs-wav/index.html` 작성 (ko, lang=ko, 26 KB)
- [x] `public/ja/guide/suno-mp3-vs-wav/index.html` 작성 (ja, lang=ja, 27 KB)
- [x] 3개 페이지 모두 Article + FAQPage(6 Q&A) + BreadcrumbList JSON-LD 삽입
- [x] 3개 페이지 모두 hreflang 4종(en/ko/ja/x-default) + self canonical
- [x] 본문 핵심 섹션 — 결론 / 비교표 / MP3·WAV 카드 / 용량 추산 / 기술 깊이 / 청취 변수 / 의사결정 플로우 / FAQ / 관련 링크
- [x] `server.js` `CONTENT_PAGES`에 3개 라우트 등록
- [x] `public/sitemap.xml`에 3개 URL + hreflang alternate 추가
- [x] `/guide/how-to-download-suno-playlist` 3개 페이지에 본 가이드 cross-link (관련 링크 + 푸터, 페이지당 2개)
- [x] `src/i18n.js` ko/en/ja에 `footerGuide2`/`footerGuide2Url` 키 추가
- [x] `src/App.jsx` 푸터 본 가이드 링크 노출, `index.html` 정적 폴백·`/privacy`·`/terms` 푸터에도 동기화
- [x] `npm run build` 622ms 성공, 3개 `dist/.../index.html` (25~27 KB) 생성
- [x] 로컬 prod curl 검증 — 10개 URL 200, lang/canonical/4 hreflang/3종 JSON-LD 전부 정상, cross-link 페이지당 2건 확인
- [ ] Google Rich Results Test로 Article·FAQPage·BreadcrumbList 스키마 유효성 확인 (배포 후 외부 검증 작업)

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-25 | /start-phase로 항목 시작, PLAN-CURRENT 작성 (스키마·구조 의사결정 항목 명시) |
| 2026-05-25 | "전부 SEO 가치"로 사용자 확정 → 스키마 Article+FAQPage+BreadcrumbList, 본문 구조·푸터 노출 방식 모두 SEO 유리한 방향으로 고정 |
| 2026-05-25 | EN/KO/JA 3개 페이지 작성 — 비교표 10행 + MP3/WAV 카드 + 용량 추산 + 기술 깊이 + 청취 변수 + 의사결정 플로우 + FAQ 6개 |
| 2026-05-25 | server.js CONTENT_PAGES 3개 라우트 추가, sitemap.xml 3 URL × 4 hreflang 추가 |
| 2026-05-25 | how-to 가이드 3개 페이지에 본 가이드 cross-link (관련 링크 1 + 푸터 1, 페이지당 2건) |
| 2026-05-25 | i18n.js footerGuide2/footerGuide2Url 키 ko/en/ja 추가, App.jsx 푸터 노출, index.html 정적 폴백·privacy·terms 푸터 동기화 |
| 2026-05-25 | npm run build 622ms 성공 → prod 서버 curl 검증: 신규 6 URL + how-to 3 + main + privacy + terms + sitemap 전부 200, JSON-LD 9 blocks 유효, cross-link 6건·푸터 노출 정상 |
| 2026-05-26 | /complete-phase로 아카이빙 |

### 메모
- 직전 `/guide/how-to-download-suno-playlist` 작업이 만든 패턴(분리 URL + CONTENT_PAGES + sitemap + hreflang + 동일 CSS 변수)을 그대로 재사용 — 신규 의존성 0.
- HowTo 스키마는 부적합 → **Article + FAQPage** 조합으로 변경. FAQ Rich Result는 클릭률이 높고 본 페이지의 의사결정 의도와 잘 맞음. 사용자가 "SEO에 도움되면 다 진행"으로 확정해 의사결정 항목 5개 전부 SEO 유리한 방향으로 고정.
- 페이지 용량 25~27 KB로 직전 가이드(17~18 KB)보다 1.5배 — 비교표·카드·기술 깊이 섹션 추가가 원인. 여전히 단일 HTML(JS·이미지 0)이라 LCP 영향 미미.
- 메인 페이지와의 식인 회피: 본 페이지를 **"기술적 깊이"**(비트레이트·실측 용량·DAW 워크플로우·플랫폼 재인코딩 동작)로 차별화. 메인은 "도구 의도" 유지.
- Pro 쿠키 설정은 본 페이지에서 한 줄 + how-to 4단계 링크로 위임. 다음 백로그 항목 `/guide/suno-pro-cookie-setup`이 별도 페이지 담당.
- 푸터 노출은 가이드 2개째라 직접 한 줄씩 노출. `/guides` 인덱스 페이지 도입은 가이드 5개 시점에 재검토하기로 합의.
- 다음 자연 후속 작업: PLAN.md 상단 `/guide/suno-pro-cookie-setup` — 동일 분리 URL 패턴으로 30~40분 가능.

---

## `/guide/how-to-download-suno-playlist` 한·영·일 분리 URL 가이드 페이지 (2026-05-25 완료)

### 체크리스트
- [x] `public/guide/how-to-download-suno-playlist/index.html` (en, self canonical, lang=en)
- [x] `public/ko/guide/how-to-download-suno-playlist/index.html` (ko, lang=ko)
- [x] `public/ja/guide/how-to-download-suno-playlist/index.html` (ja, lang=ja)
- [x] 3개 페이지 모두 HowTo JSON-LD 삽입 (5단계, position/name/text/url) + BreadcrumbList
- [x] 3개 페이지 모두 hreflang 4종(en/ko/ja/x-default) + self canonical
- [x] 본문 5단계 — URL 복사 / 붙여넣기 / 트랙 불러오기 / MP3·WAV 선택 / 개별·ZIP 다운로드
- [x] 메인 페이지 ↔ 가이드 양방향 내부 링크 (App.jsx 푸터 lang별 URL, 정적 폴백·privacy·terms에 가이드 링크)
- [x] `server.js` `CONTENT_PAGES`에 3개 라우트(중첩 경로) 등록 + curl 200 검증
- [x] `public/sitemap.xml`에 3개 URL 각각 + hreflang alternate 추가
- [x] `npm run build` 성공, 3개 `dist/.../index.html` 생성 확인 (각 17~18KB)
- [x] 로컬 prod curl 검증 — 3개 URL 200, lang/canonical/4 hreflang 정상, JSON-LD 2 blocks/page 유효, 메인 회귀 없음
- [ ] Google Rich Results Test로 HowTo 스키마 유효성 확인 (3개 언어 모두) — 배포 후 외부 검증 작업

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-18 | /start-phase로 항목 시작 |
| 2026-05-18 | URL 구조 확정: 분리 URL + `/[lang]/` prefix (SEO 효과 최대화) |
| 2026-05-25 | 3개 가이드 페이지 작성 — privacy/terms 디자인 시스템 재사용, 단일 언어 분리 구조 |
| 2026-05-25 | HowTo JSON-LD 5단계 + BreadcrumbList per page, 4 hreflang(en/ko/ja/x-default) self-canonical |
| 2026-05-25 | server.js CONTENT_PAGES 확장 (중첩 경로 5개), sitemap.xml에 3 URL × 4 hreflang 추가 |
| 2026-05-25 | i18n.js footerGuide/footerGuideUrl 키 ko/en/ja 추가, App.jsx 푸터에 lang별 가이드 링크 |
| 2026-05-25 | index.html 정적 폴백·privacy·terms 푸터 모두에 가이드 링크 추가 (양방향 PageRank) |
| 2026-05-25 | npm run build 600ms 성공 → prod 서버 curl 검증: 3개 URL + main + privacy + terms + sitemap 전부 200, JSON-LD 6 blocks 전체 유효 |

### 메모
- GSC 데이터(약 7주간 노출 ~50, 클릭 5)로 콘텐츠 매칭 표면 부재가 진단된 직후의 첫 콘텐츠 페이지 — "도구 + 정보 분리" 전략의 시작점.
- **URL 구조 결정**: privacy/terms는 단일 URL + 인라인 언어 토글이지만, 가이드는 분리 URL + `/[lang]/` prefix. 이유: privacy/terms는 SEO 가치보다 의무 표시 성격이지만 가이드는 명확한 검색 의도 키워드("how to download suno playlist", "suno 플레이리스트 다운로드 방법", "suno プレイリスト ダウンロード")를 잡아야 하므로 hreflang 효과 극대화가 필요.
- 메인 페이지에 이미 HowTo JSON-LD가 ko/en/ja 3개 들어있는데(인덱스 페이지) 가이드와 충돌 가능성 → 가이드 본문은 메인보다 훨씬 상세하게(긴 본문, 단계별 카드, FAQ, CTA, 관련 링크) 작성해 정보 의도 페이지로 차별화. 메인은 "도구" 의도 페이지로 유지.
- 신규 의존성 0 — 기존 `public/<slug>/index.html` + `CONTENT_PAGES` 패턴이 중첩 경로(`guide/how-to-download-suno-playlist`, `ko/guide/...`, `ja/guide/...`)도 그대로 지원.
- i18n 새 키 `footerGuideUrl`은 단순 텍스트가 아니라 URL — 각 언어 사용자가 자기 언어 가이드로 정확히 가도록 설계.
- 정적 폴백(노JS 크롤러용)에는 3개 언어 가이드 링크를 모두 노출 — 크롤러가 hreflang 신호와 동시에 양방향 링크로도 페이지 그래프 파악 가능.
- 페이지당 17~18KB로 메인 정적 폴백(~32KB) 대비 가벼움. Core Web Vitals LCP에 유리.
- 다음 자연 후속 작업은 PLAN.md 상단 `/guide/suno-mp3-vs-wav` — 동일 분리 URL 패턴으로 30~40분 내 가능.

---

## `/terms` 정적 페이지(이용약관·면책 조항) (2026-05-18 완료)

### 체크리스트
- [x] /privacy 페이지 구조 분석 (HTML, 스타일, 다국어 처리 방식 확인)
- [x] `public/terms/index.html` 작성 (ko/en/ja, /privacy와 일관된 다크 테마 + 언어 토글 vanilla JS)
- [x] 약관 본문 16개 섹션 — 서비스 설명, Suno 비제휴 고지, 이용 자격, 허용/금지 행위, 책임, IP, 제3자 서비스, 보증 부인, 책임 제한, 면책 보장, 변경·중단, 약관 변경, 준거법·관할, 개인정보 링크, 문의
- [x] `server.js` `CONTENT_PAGES`에 `'terms'` 추가 (한 줄 확장)
- [x] `src/i18n.js`에 `footerTerms` 키 ko/en/ja 추가 (이용약관 / Terms of Service / 利用規約)
- [x] `src/App.jsx` 푸터에 `/terms` 링크 추가
- [x] `public/sitemap.xml`에 `/terms` 및 누락됐던 `/privacy` 항목 동시 보강 (hreflang 4종)
- [x] `public/privacy/index.html` 자체 푸터에도 `/terms` 링크 추가 (페이지 간 일관성)
- [x] `npm run build` 성공 (570ms, `dist/terms/index.html` 생성)
- [x] 로컬 prod 서버 curl 검증: `/terms` 200, `/terms/` 200, `/privacy` 200, `/` 200; 한국어 title/og 정상 노출

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-18 | /start-phase로 항목 시작 |
| 2026-05-18 | /privacy 구조 분석 후 동일 스타일로 public/terms/index.html 작성 (16개 섹션, ko/en/ja) |
| 2026-05-18 | server.js CONTENT_PAGES, i18n footerTerms, App.jsx 푸터, sitemap.xml 동시 갱신; /privacy 푸터에도 /terms 링크 추가 |
| 2026-05-18 | npm run build 성공 → 로컬 server.js 기동 후 /terms, /terms/, /privacy 모두 200 응답 확인 |

### 메모
- /privacy 작업에서 확립한 **`public/<slug>/index.html` + `CONTENT_PAGES` 배열** 패턴이 그대로 적용 — 신규 의존성 0, 코드 변경 최소.
- 준거법: 대한민국, 1심 전속관할: 운영자 주소지 (소비자 강행법규 우선 단서 포함).
- 책임 한도 USD 0 명시 (무료 서비스). AdSense 도입 시 광고 조항도 본 약관과 함께 재검토 필요.
- 시행일: 2026-05-18.
- 다음 자연 후속 작업은 `/about`(운영자·서비스 소개) — 동일 패턴으로 30분 내 가능.

---

## `/privacy` 정적 페이지(개인정보 처리 방침) + 정적 페이지 빌드 전략 결정 (2026-05-18 완료)

### 체크리스트
- [x] `public/privacy/index.html` 작성 (3개 언어 콘텐츠 inline + 메타·canonical)
- [x] 언어 토글 vanilla JS (localStorage `sunodown-lang` 키 공유)
- [x] `server.js`: `/privacy` 라우트 명시 응답 (express.static 앞에 배치, 301 회피)
- [x] 메인 페이지(`src/App.jsx`) 푸터에 `/privacy` 링크 추가 + i18n 키 `footerPrivacy`
- [x] 정적 폴백 `index.html` 푸터에도 `/privacy` 링크 추가 (크롤러 가시성)
- [x] `npm run build` 성공, `dist/privacy/index.html` 26KB 정상 복사
- [x] curl 검증: `/privacy` 200 (no redirect), `/privacy/` 200, `/` 200, `/nonexistent` SPA fallback 200
- [x] 페이지 콘텐츠 검증: title, og, h1, 3개 lang-block, 연락처 이메일 3× 포함

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-18 | CMP 보류 (AdSense 등록 전), /privacy로 전환 |
| 2026-05-18 | vite-react-ssg 검토 → 메인 SEO 폴백 500줄을 React로 마이그레이션해야 하는 비용이 과대 → 기각 |
| 2026-05-18 | **빌드 전략 확정: `public/` 디렉토리 정적 HTML** — 의존성 0 추가, 메인 페이지 무손상 |
| 2026-05-18 | `public/privacy/index.html` 작성 (ko/en/ja 인라인, vanilla JS 언어 토글) |
| 2026-05-18 | `server.js` `CONTENT_PAGES` 배열로 라우트 일반화 (express.static 앞에 배치하여 301 회피) |
| 2026-05-18 | 빌드·prod 서버 curl 검증 모두 통과, 의존성 추가 없음 확인 |

### 메모
- 본 플랜으로 백로그의 **"정적 페이지 빌드 전략 결정"** 항목도 동시 해소.
- 향후 `/terms`, `/about`, `/guide/*`, `/faq` 모두 동일 패턴(`public/<slug>/index.html` + `CONTENT_PAGES` 배열 추가) — 한 줄 라우팅 등록으로 확장 가능.
- 광고 조항은 "도입 예정" 톤으로 작성 — **AdSense 실제 등록 시 본 방침 갱신 필요**.
- 연락처 이메일: `hjg000223@naver.com` (사용자 지정).
- 시행일: 2026-05-18.
- 블로그가 본격화되면 그때 정적 사이트 생성기(예: Astro·11ty) 도입을 다시 검토 — 현 시점은 콘텐츠 페이지 1~10개 규모라 정적 HTML이 best.

---

## `public/ads.txt` 추가로 AdSense 게시자 ID 인증 (2026-05-18 완료)

### 체크리스트
- [x] `public/ads.txt` 작성 — `google.com, pub-7817461938422229, DIRECT, f08c47fec0942fa0`
- [x] `npm run build` → `dist/ads.txt` 59B 정상 복사 확인
- [x] 로컬 prod 서버 `curl /ads.txt` → 200 OK + `Content-Type: text/plain; charset=UTF-8` + 본문 일치
- [x] `file` 검사 `ASCII text`, `od -c` 검사 BOM 없음·LF 정상
- [x] `server.js` 추가 분기 불필요 — Express static이 기본 text/plain 처리

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-18 | 플랜 시작, AdSense publisher ID `pub-7817461938422229` 확인 |
| 2026-05-18 | `public/ads.txt` 작성, `npm run build` → `dist/ads.txt` 복사 확인 |
| 2026-05-18 | prod 서버 curl 검증 200 OK / text/plain / 59B / Cache-Control 1주 |

### 메모
- TAG ID `f08c47fec0942fa0`는 Google 전체 publisher 공통 식별자.
- 향후 다른 광고 네트워크(Ezoic·Mediavine 등) 도입 시 ads.txt에 한 줄씩 추가하면 됨.
- AdSense Console 반영까지 보통 24시간 ~ 며칠 소요. 실제 인증 확인은 배포 후 별도 모니터링.

---

## `<meta name="keywords">` 축소와 본문 키워드 밀도 자연화 (2026-05-18 완료)

### 체크리스트
- [x] `<meta name="keywords">` 완전 삭제 (SEO 베스트 프랙티스 — Google 무시, Bing 스팸 시그널 가능성)
- [x] `<meta name="description">` 152자로 축소·자연화 (한·영 혼합 유지)
- [x] `<title>` 중복 제거 (73자 → 59자, 영문 단일화)
- [x] `src/i18n.js` ko/en `pageTitle`·`pageDesc` 자연화 (브랜드 중복·stuffing 제거, ja는 이미 자연스러움)
- [x] `Downloader.jsx`/`SongList.jsx` 노출 텍스트는 모두 i18n 키 → 본문 stuffing 없음 확인
- [x] 빌드 → `dist/index.html`에서 keywords 제거·title·description 정상 반영 확인
- [x] 전/후 글자 수: keywords ~2,500자→0자, title 73→59자, description ~210→152자, index.html 38.6KB→30.9KB

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-18 | 플랜 시작, 현재 keywords meta 100+개 한·영·일 혼재 확인 |
| 2026-05-18 | SEO 최선책으로 keywords 완전 삭제 결정 (검색엔진 무시·스팸 시그널) |
| 2026-05-18 | index.html title/description 정리, i18n.js ko/en pageTitle·pageDesc 자연화 |
| 2026-05-18 | `npm run build` 성공, dist/index.html 메타 검증 — 7.7KB 감소 |

### 메모
- 결정 근거: Google은 2009년부터 keywords meta 공식 무시, Bing 일부는 스팸 시그널로 사용. 경쟁자에게 키워드 전략 노출되는 리스크도 제거.
- 다국어 hreflang은 다음 페이지 분리 작업(/guide/* 등)에서 본격화 예정. 현재는 단일 페이지에서 한·영 description 혼합으로 다국어 SERP cover.
- 한국어 `i18n.js` pageTitle의 어색한 "수노 다운로더 SunoDown" 중복은 제거 → "수노 다운로더 – Suno 플레이리스트 …"로 자연화.

---

## `www.suno-down.com` → apex 301 리다이렉트 코드 추가 (2026-05-18 완료)

### 체크리스트
- [x] `server.js`의 prod 리다이렉트 미들웨어에 `www.suno-down.com` 호스트 분기 추가
- [x] 리다이렉트 루프 방지를 위해 대상 호스트(`suno-down.com`)는 분기에서 제외 유지
- [x] `req.originalUrl` 유지로 경로·쿼리 보존되는지 코드 리뷰
- [x] dev 환경(`isProd=false`)에서 리다이렉트가 동작하지 않도록 기존 가드 유지 확인
- [x] 로컬에서 `Host: www.suno-down.com` 헤더로 curl 테스트 → 301 + Location 검증

### 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-18 | 플랜 시작, 코드단으로 범위 축소 |
| 2026-05-18 | `server.js` `REDIRECT_HOSTS` Set에 `www.suno-down.com` 추가 |
| 2026-05-18 | curl 검증: www→301(/foo?bar=1 보존), fly.dev→301, apex→200 (루프 없음) |

### 메모
- DNS·Fly 인증서·Cloudflare 설정은 본 플랜 범위 외 (외부 인프라 작업).
- 기존 단일 `if` 분기를 `REDIRECT_HOSTS` Set으로 리팩터링 → 호스트 추가 시 한 줄로 확장 가능.
