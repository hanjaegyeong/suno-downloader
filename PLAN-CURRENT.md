# 현재 진행 중인 플랜

> 시작: 2026-05-29
> 항목: /blog Phase B~F — 7편 정보성 블로그 글 작성·번역·배포
> 합의 산출물: `.omc/specs/deep-interview-blog-system.md`, `.omc/plans/blog-infra-phase-a.md`
> Phase A 인프라 완료: PLAN-DONE.md 최상단 항목 참조

---

## 목표

Phase A에서 구축한 마크다운→정적 HTML 빌드 파이프라인(`scripts/build-blog.mjs`, `marked`, `content/blog/*.{ko,en}.md` → `public/blog/{slug}` + `public/ko/blog/{slug}`)을 사용해 7편의 정보성 블로그를 한국어·영어 2개 언어로 작성·발행한다. 도구 사용법이 아닌 주제로 1500~3000단어 분량을 채워 AdSense의 "사이트 주된 목적 = 정보" 시그널을 충족하는 것이 핵심 목적이다.

7개 슬러그(확정):
1. `suno-lyrics-prompt-tips` — 가사 프롬프트 기법
2. `ai-music-genre-catalog` — AI 음악 장르 카탈로그
3. `ai-music-copyright-guide` — AI 음악 저작권
4. `suno-vs-udio-comparison` — Suno vs Udio 비교
5. `suno-pro-value-analysis` — Suno Pro 가치 분석
6. `daw-post-processing` — DAW 후처리
7. `youtube-content-with-ai-music` — 유튜브 콘텐츠 활용

## 결정 사항 (2026-05-29 합의)

- **Phase B sequencing**: 1편 derisking 후 6편 병렬 — 첫 글에서 톤·인프라·내부 링크 패턴을 검증한 뒤 나머지 6편을 병렬 작성. 초기 발견 이슈 누적 회귀 차단
- **AI 어투 처리**: Phase B 초안 단계에 baseline 패스 포함 — 패시브 회피·구체 수치·반복 표현 제거를 초안에 반영. Phase C 사용자 보강 부담 감소
- **스크린샷**: Phase B 초안은 placeholder 마커로 남기고 Phase C에서 사용자가 실제 캡처 (사용자만 Suno UI 접근 가능)
- **1인칭 경험**: Phase B 초안은 정보·구조 위주, 1인칭 경험은 Phase C 사용자 보강 (AI 티 회피)
- **영어 번역**: 한국어 보강(Phase C)이 끝난 뒤 일괄 진행 — 보강이 분기되는 문제 회피
- **내부 링크 그래프**: Phase B outline 단계에서 7편 cross-reference 사전 매핑
- **Naver·Bing 웹마스터 등록**: 이번 Phase 범위 밖, 별도 백로그 항목으로 유지

## 생각해야 할 문제 (남은 항목)

- 첫 글로 어떤 슬러그를 선택할까 — derisking 가치 큰 글: (a) 가사 프롬프트(가장 표준적 정보성·내부 링크 hub 후보), (b) 저작권(법적 톤 캘리브레이션 가치), (c) Pro 가치(메인 도구와 강한 연결) 중 어느 것이 인프라·톤 검증에 가장 유리한가
- 스크린샷 placeholder 마커 표기 방식 — `[SCREENSHOT: ...]` 같은 인라인 마커 vs frontmatter `screenshots[]` 배열에 슬롯 정의 vs 별도 `.todo.md` 파일. 빌드 스크립트 영향 평가 필요
- 워드카운트 1500~3000은 한국어·영어 모두 동일 단위인가 — 한국어는 띄어쓰기 단위지만 영어 단어 수와 비교 시 분량 격차 가능, build-blog.mjs 검증 로직 확인 필요

## 체크리스트

### Phase B — 한국어 초안 7편 (Claude, 병렬)
- [ ] 7편 슬러그별 outline(목차·핵심 메시지·내부 링크 후보) 사전 합의
- [ ] 각 글 1500~3000단어 한국어 초안 — `content/blog/{slug}.ko.md` (frontmatter + 본문)
- [ ] 각 글 frontmatter 완성: slug, title, title_en, summary, summary_en, publishedAt, ogSubtitle, tags, schemaVersion: 1
- [ ] 초안 단계 워드카운트 검증 — `node scripts/build-blog.mjs`가 1500~3000 범위 경고 0
- [ ] 7편 내부 링크 그래프 mapping (각 글이 어떤 글·메인 도구를 참조하는지)
- [ ] AI 어투 baseline 1차 패스 — 패시브 회피·구체 수치·반복 표현 제거

### Phase C — 한국어 보강 (User)
- [ ] 각 글 1인칭 실제 경험 삽입
- [ ] 각 글 스크린샷 3~5장 캡처 + `public/og/`·`content/blog/images/`(또는 결정 위치) 배치
- [ ] AI 어투 최종 다듬기 (사용자 직접 검토)

### Phase D — 영어 번역 (Claude)
- [ ] 한국어 최종본 → 영어 자연스러운 재작성 (`content/blog/{slug}.en.md`)
- [ ] 영어 검색 의도·이디엄 반영 (직역 아님)
- [ ] 7편 모두 영어 워드카운트 1500~3000 범위 확인

### Phase E — 영어 마무리 (User)
- [ ] 영어판 검토·다듬기

### Phase F — 빌드·배포
- [ ] `npm run build` 통과 (build:blog → build:sitemap → build:og → vite build)
- [ ] `node scripts/build-sitemap.mjs --verify` 통과 (기존 URL zero drift)
- [ ] 14개 블로그 HTML + 블로그 인덱스 2개 정상 생성 확인
- [ ] OG 이미지 14개 + 인덱스 2개 정상 생성 확인
- [ ] Fly.io 배포 (master push 자동 트리거)
- [ ] 프로덕션 URL 14개 + 인덱스 2개 200 응답 확인
- [ ] sitemap.xml에 블로그 URL 정상 노출 확인 (ko+en hreflang only)
- [ ] Google Search Console에 sitemap 재제출

## 진행 로그
| 시간 | 작업 내용 |
|------|----------|
| 2026-05-29 | /start-phase — PLAN.md 최상단 항목을 PLAN-CURRENT.md로 이동, Phase B~F 5단계 체크리스트 + 7개 생각 문제 정리 |
| 2026-05-29 | 합의 결정: 1편 derisking 후 6편 병렬 / Phase B 초안에 AI 어투 baseline 패스 포함 / 스크린샷 placeholder 마커 / 1인칭은 Phase C / 영어는 Phase D에서 일괄 |
| 2026-05-29 | 인프라 확인 — `scripts/build-blog.mjs`·`_template.md`·`blog-article.html` 점검, OG 16엔트리 사전 등록 확인, 워드카운트 한·영 동일 split 단위 확인 |
| 2026-05-29 | 7편 outline + 내부 링크 그래프 산출 — `.omc/plans/blog-phase-b-outline.md` (HUB: suno-lyrics-prompt-tips, fan-out: suno-vs-udio, 종착점: pro-value / daw / youtube) |
| 2026-05-29 | **첫 글 derisking 완료** — `content/blog/suno-lyrics-prompt-tips.ko.md` 작성 (1500+ 어절, 9개 h2 섹션, 5개 스크린샷 placeholder, 3개 내부 링크) + 빌드 통과 + HTML 렌더 검증 (canonical/hreflang ko·en·x-default/OG/Twitter/Article+Breadcrumb JSON-LD/blockquote 16건/내부 링크 박스) |
| 2026-05-29 | **나머지 6편 병렬 작성 완료** — 3개 에이전트가 각 2편씩 분담: (A) ai-music-genre-catalog(1928어절) + ai-music-copyright-guide(1620어절), (B) suno-vs-udio-comparison(1544어절) + suno-pro-value-analysis(1574어절), (C) daw-post-processing(2051어절) + youtube-content-with-ai-music(1780어절) — 모두 1500~3000 범위 |
| 2026-05-29 | **Phase B 전체 빌드 검증** — `npm run build` 통과 (build:blog 7편 + build:sitemap zero drift + build:og 32장 + vite 38 modules / 616ms) + sitemap `--verify` OK + dist/blog 7개·dist/ko/blog 7개 디렉터리 생성 |
