# 완료된 플랜 아카이브

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
