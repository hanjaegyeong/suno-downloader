# 완료된 플랜 아카이브

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
