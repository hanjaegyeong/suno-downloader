# Deep Interview Spec: /blog 시스템 + 7편 정보성 글

## Metadata
- Interview ID: blog-system-2026-05-29
- Rounds: 7
- Final Ambiguity Score: 16.75%
- Type: brownfield
- Generated: 2026-05-29
- Threshold: 20%
- Status: PASSED

## Clarity Breakdown
| Dimension | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| Goal Clarity | 0.9 | 0.35 | 0.315 |
| Constraint Clarity | 0.9 | 0.25 | 0.225 |
| Success Criteria | 0.75 | 0.25 | 0.1875 |
| Context Clarity | 0.7 | 0.15 | 0.105 |
| **Total Clarity** | | | **0.8325** |
| **Ambiguity** | | | **0.1675** |

## Goal

Suno Downloader 사이트에 `/blog` 정보성 콘텐츠 섹션을 구축해 AdSense의 "사이트 주된 목적이 도구가 아닌 정보"라는 시그널을 충족한다. 도구 사용법이 아닌 주제로 7편의 1500~3000단어 글을 작성하고, 한국어·영어 2개 언어로 운영한다. 기존 정적 HTML 패턴과 호환되되 저작은 마크다운+빌드 스크립트로 자동화한다.

## Constraints

- **언어 범위**: 한국어 + 영어 2개 언어 (일본어 제외 — 메인 사이트는 ja 유지하나 블로그는 미적용)
- **저작 스택**: 마크다운 소스 (`content/blog/{slug}.{ko,en}.md`) → `scripts/build-blog.mjs` → 정적 HTML (`dist/blog/{slug}/index.html`, `dist/en/blog/{slug}/index.html`)
- **편수**: 7편 × 2언어 = 14개 HTML 파일
- **편당 분량**: 1500~3000 단어, 스크린샷 3~5장
- **출시 sequencing**: 7편 병렬 작성 후 일괄 출시 (인프라 검증은 첫 글 작성 과정에 자연스럽게 포함)
- **빌드 통합**: sitemap.xml 자동 업데이트, OG 이미지 자동 생성 (기존 `scripts/og/build-og.mjs` 패턴 차용)
- **새 의존성**: 경량 마크다운 파서 (예: `marked`) 1개만 허용
- **기존 패턴 존중**: 기존 `/guide`·`/about`·`/faq` 정적 HTML과 일관된 머리말·푸터·메타 태그 구조 유지

## Non-Goals

- React Router 도입 (SPA 라우팅 재구성 안 함)
- SSG/SSR 프레임워크 마이그레이션 (Vite SPA + Express static 그대로)
- 일본어 블로그 (`/ja/blog/*`) — 이번 phase 범위 밖
- JSON 기반 데이터 구조 — 마크다운으로 결정됨
- 외부 CMS·헤드리스 백엔드 도입
- AI 탐지 외부 툴(GPTZero 등) 자동 게이트 — 의무화 안 함

## Acceptance Criteria

### 인프라
- [ ] `scripts/build-blog.mjs` 작성: `content/blog/*.md` 읽어 `dist/blog/{slug}/index.html` + `dist/en/blog/{slug}/index.html` 생성
- [ ] 공통 HTML 템플릿 (head·footer·내비) 정의 — 기존 `/guide` 페이지와 일관
- [ ] `marked` 경량 마크다운 파서 1개 의존성 추가
- [ ] `package.json` 빌드 파이프라인에 `build-blog` 단계 통합 (`npm run build` 전후로 자동 실행)
- [ ] `public/sitemap.xml`에 블로그 글 14개 URL + hreflang 자동 삽입
- [ ] OG 이미지 자동 생성 (기존 `scripts/og/build-og.mjs` 확장 또는 동등 스크립트)
- [ ] 메인 앱 푸터에 `/blog` 진입 링크 추가 (한·영·일 3개 언어 푸터 모두)
- [ ] 블로그 목록 페이지 (`/blog/index.html`, `/en/blog/index.html`) — 제목·요약·발행일 카드 레이아웃

### 콘텐츠 (7편)
1. 가사 프롬프트 기법
2. AI 음악 장르 카탈로그
3. AI 음악 저작권
4. Suno vs Udio 비교
5. Suno Pro 가치 분석
6. DAW 후처리
7. 유튜브 콘텐츠 활용

- [ ] 각 글: 1500~3000 단어, 빌드 스크립트가 워드카운트 검증
- [ ] 각 글: 1인칭 실제 경험·스크린샷 3~5장 포함
- [ ] 각 글: 내부 링크 2~3개 (다른 블로그 글 + 메인 도구)
- [ ] 각 글: 한국어·영어 2개 언어 (hreflang 적용)
- [ ] 각 글: AI 어투 다듬기 1회 패스 완료 (사용자 직접 검토)

## Workflow (작업 분담)

1. **Phase A — 인프라 (Claude)**: 빌드 스크립트·템플릿·sitemap 통합·푸터 링크
2. **Phase B — 한국어 초안 (Claude, 병렬)**: 7편 한국어 초안 작성
3. **Phase C — 한국어 보강 (User)**: 1인칭 경험·스크린샷·AI 어투 다듬기
4. **Phase D — 영어 번역 (Claude)**: 한국어 최종본을 영어로 자연스럽게 번역
5. **Phase E — 영어 마무리 (User)**: 영어판 검토·다듬기
6. **Phase F — 빌드·배포 (자동)**: `npm run build` → Fly.io 배포

## Assumptions Exposed & Resolved

| Assumption | Challenge | Resolution |
|------------|-----------|------------|
| 3개 언어 운영(ko·en·ja) | "AdSense는 영어 글로벌 시그널 우선?" | 한+영 2개로 축소, 일본어 제외 (작업량 30→20→14개 파일) |
| 손으로 쓴 HTML이 기존 패턴이니 그대로 유지 | "20개를 손으로 쓰는 게 현실적인가?" | 마크다운+빌드 스크립트 도입, marked 경량 의존성 1개 |
| 10편 필요 (AdSense 양적 요구) | "양 vs 질의 트레이드오프" | 7편 고품질로 축소, 자신 있는 주제만 |
| 7편 작성에 수 달 걸린다 | "왜 그렇게 오래?" — 실제는 25~30시간 | sequencing 이유 = 시간 분산이 아니라 derisking |
| 1편 먼저 시험 배포 후 6편 증설 | "그냥 7편 동시 작성하면 안 됨?" | 병렬 작성 후 일괄 출시로 단순화 |
| 사용자가 모든 글 직접 작성 | "AI 티 안 나게 + 7편 동시" 충돌 | Claude 초안 → 사용자 1인칭/스크린샷 보강 워크플로우로 정리 |

## Technical Context (Brownfield)

- **라우팅**: React Router 미사용. 정적 HTML 파일(`/public/{path}/index.html`)을 Express가 직접 서빙. SPA는 `/`(`dist/index.html`)만 사용.
- **기존 정적 페이지 경로**:
  - `public/about/index.html`, `public/faq/index.html`
  - `public/guide/how-to-download-suno-playlist/index.html`
  - `public/guide/suno-mp3-vs-wav/index.html`
  - `public/guide/suno-pro-cookie-setup/index.html`
  - 다국어 미러: `public/ko/...`, `public/ja/...`
- **i18n**: `src/i18n.js`는 React 앱 전용. 정적 페이지는 언어별 별도 HTML 파일(`/ko/`, `/ja/` 접두) 방식.
- **sitemap**: `public/sitemap.xml` 수동 유지, hreflang alternate 포함, 마지막 업데이트 2026-05-26.
- **OG 이미지**: `scripts/og/build-og.mjs` — SVG → PNG 빌드 타임 생성, `public/og/*.png` 출력.
- **마크다운 라이브러리**: 없음. 신규 도입 필요 (marked 권장).
- **빌드 흐름**: Vite로 React 앱 빌드 → `dist/index.html`. `public/` 정적 파일이 dist로 복사됨. Express가 둘 다 서빙.

## Ontology (Key Entities)

| Entity | Type | Fields | Relationships |
|--------|------|--------|---------------|
| BlogArticle | core domain | slug, title, summary, publishedAt, wordCount, screenshots[], language | belongs to Topic, has many InternalLink |
| Topic | core domain | name, description | has one BlogArticle (per language) |
| Language | supporting | code(ko\|en), label | BlogArticle filtered by Language |
| MarkdownSource | supporting | path, frontmatter, body | source of BlogArticle |
| BuildScript | external system | input glob, output dir, template | transforms MarkdownSource → BlogArticle HTML |
| SitemapEntry | supporting | url, lastmod, hreflang | generated from BlogArticle |
| OGImage | supporting | slug, language, png path | generated per BlogArticle |
| InternalLink | supporting | from BlogArticle, to BlogArticle\|Tool | structural SEO |
| ArticleAcceptance | supporting | wordCount min/max, screenshotCount min, hasFirstPersonExp, internalLinkCount | validates BlogArticle |

## Ontology Convergence

| Round | Entity Count | New | Changed | Stable | Stability |
|-------|-------------|-----|---------|--------|-----------|
| 1 | 3 | 3 | - | - | N/A |
| 2 | 6 | 3 | 0 | 3 | 60% |
| 3 | 8 | 2 | 0 | 6 | 75% |
| 4 | 8 | 0 | 0 | 8 | 100% |
| 5 | 9 | 1 (Topic 구체화) | 0 | 8 | 89% |
| 6 | 9 | 0 | 0 | 9 | 100% |
| 7 | 9 | 0 | 0 | 9 | 100% |

엔티티 모델 안정화 — 마지막 2라운드 변경 없음.

## Interview Transcript

<details>
<summary>Full Q&A (7 rounds)</summary>

### Round 1
**Q:** 블로그 글의 언어 범위는 어떻게 할까요? (현재 가이드/FAQ는 한·영·일 3개 언어 정적 HTML로 운영 중)
**A:** 한+영 2언어
**Ambiguity:** 48%

### Round 2
**Q:** 20개 블로그 파일을 어떻게 저작·생성할까요?
**A:** 마크다운 + 빌드 스크립트 (Recommended)
**Ambiguity:** 45%

### Round 3
**Q:** 각 블로그 글이 "완료" 조건에 포함할 공통 체크리스트는?
**A:** 구글 애드센스 통과할 정도 (자유재량으로 합리적 baseline 채택)
**Ambiguity:** 39%

### Round 4 (Contrarian Mode)
**Q:** 편수·주제 전략을 어떻게 가져갈까요?
**A:** 7편 고품질 (자신 있는 주제만)
**Ambiguity:** 30%

### Round 5
**Q:** PLAN 후보 7개 주제 — 이대로 확정할까요, 일부 교체할까요?
**A:** 7개 그대로 확정
**Ambiguity:** 24%

### Round 6 (Simplifier Mode)
**Q:** /blog 출시 sequencing은? (인프라 + 1편 vs 일괄)
**A:** 7편 동시 작성해줘. (시간 가정 문제 제기 후 병렬 작성으로 결정)
**Ambiguity:** 21%

### Round 7
**Q:** 작업 분담 워크플로우 확인
**A:** 네, 이대로 (Claude 초안 → User 보강 → Claude 번역 → User 마무리)
**Ambiguity:** 16.75%

</details>
