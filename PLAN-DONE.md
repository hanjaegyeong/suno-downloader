# 완료된 플랜 아카이브

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
