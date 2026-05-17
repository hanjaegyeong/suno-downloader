# SunoDown — Suno AI 플레이리스트 무료 다운로더

Suno AI에서 생성한 음악 플레이리스트를 MP3/WAV로 무료 다운로드할 수 있는 웹앱.

## 핵심 목표

Suno 플레이리스트 URL만 입력하면 **전곡 일괄 다운로드**(ZIP) 또는 개별 다운로드를 지원.
- MP3: 무료, 인증 불필요
- WAV: Suno Pro 계정 쿠키 필요 (Clerk 세션 관리)

## 기술 스택

- **프론트엔드**: React 18 + Vite 5
- **백엔드**: Express 4 (Node.js 20)
- **ZIP 생성**: JSZip
- **다국어**: 자체 i18n (한국어/영어/일본어)
- **배포**: Fly.io (Docker, 도쿄 리전)
- **CI/CD**: GitHub Actions → Fly.io 자동 배포 (master push)
- **도메인**: https://suno-down.com (Cloudflare Registrar, 만료일 2027-04-05)

## 프로젝트 구조

```
├── server.js                  — Express 백엔드 (Clerk 세션, API 프록시, curl 스트리밍)
├── src/
│   ├── App.jsx                — 메인 앱 컴포넌트
│   ├── main.jsx               — 엔트리 포인트
│   ├── i18n.js                — 다국어 시스템
│   ├── styles.css             — 글로벌 스타일
│   └── components/
│       ├── Downloader.jsx     — 플레이리스트 URL 입력 & 페칭
│       ├── SongList.jsx       — 트랙 목록 & 다운로드 UI
│       ├── TokenSetup.jsx     — Suno Pro 인증 토큰 설정
│       └── AdSlot.jsx         — 광고 컴포넌트
├── vite.config.js             — Vite 빌드 설정 (dev proxy /api → :3000)
├── Dockerfile                 — 멀티스테이지 Docker 빌드
├── fly.toml                   — Fly.io 배포 설정
└── .github/workflows/
    └── fly-deploy.yml         — GitHub Actions 배포 워크플로우
```

## API 엔드포인트

| 메서드 | 경로 | 설명 |
|--------|------|------|
| GET | `/api/playlist/:id?page=N` | 플레이리스트 메타데이터 (curl 프록시) |
| POST | `/api/auth/cookie` | Clerk 세션 초기화 (__client 쿠키) |
| GET | `/api/auth/status` | 세션 상태 확인 |
| DELETE | `/api/auth` | 로그아웃 |
| POST | `/api/wav/convert/:clipId` | WAV 변환 트리거 (Pro 필요) |
| GET | `/api/wav/url/:clipId` | WAV 파일 URL 폴링 (Pro 필요) |
| GET | `/api/audio?url=&name=` | 오디오 스트리밍 다운로드 (curl) |
| GET | `/api/image?url=` | 이미지 CDN 프록시 |

## 핵심 아키텍처 결정

- **curl 기반 HTTP**: Node.js의 TLS 핑거프린트가 Cloudflare에 차단됨 → curl subprocess로 우회
- **Clerk 세션 관리**: JWT 50초 자동 갱신, 동시 리프레시 락, 쿠키 기반 자동 복구
- **허용 호스트**: `*.suno.ai`, `*.suno.com` CDN만 허용 (SSRF 방지)
- **프로덕션 리다이렉트**: fly.dev, kro.kr → suno-down.com 301 리다이렉트

## 코딩 컨벤션

- 한국어 UI, 영어 코드
- JSX 컴포넌트는 `export default function` 스타일
- 환경변수: `PORT`, `NODE_ENV`
- curl은 `--silent --location --compressed` 기본 플래그
- CDN 호스트 화이트리스트 검증 필수 (`isAllowedHost`)

## 개발 환경

```bash
npm install
npm run dev       # Express(:3000) + Vite(:5173) 동시 실행
npm run build     # Vite 프로덕션 빌드 → dist/
npm run start     # NODE_ENV=production 서버 실행
```

---

## 플랜 원칙

- 각 항목은 제목·헤딩 없이 `-`로 한 줄만 작성한다. 부가 정보 없음.
- 구체적 구현 계획은 `/start-phase`로 시작한 뒤 PLAN-CURRENT.md에서 진행.
- 완료 내용은 PLAN-DONE.md에서 관리한다.
- "무엇을 구현할지"가 아니라 생각해야 할 문제를 적는다.
- CLAUDE.md가 프로젝트의 단일 진실 소스.

## 플랜 관리 흐름

플랜 파일 3종:
- `PLAN.md` — 마스터 백로그 (전체 구현 계획)
- `PLAN-CURRENT.md` — 현재 진행 중인 항목 (체크리스트 + 진행 로그)
- `PLAN-DONE.md` — 완료된 항목 아카이브

```
/start-phase
  │  PLAN.md에서 최상단 항목 추출
  │  → PLAN-CURRENT.md에 체크리스트 생성
  │  → PLAN.md에 (진행 중) 표시
  │
  ▼  구현 작업 진행
  │
  │  [자동] Stop 훅 — 매 턴 종료 시
  │  파일 변경 감지 → PLAN-CURRENT.md 업데이트 알림
  │
  ▼  모든 체크리스트 완료
  │
/complete-phase
     PLAN-CURRENT.md → PLAN-DONE.md에 아카이빙
     → PLAN.md에 [x] 체크 + 완료 날짜
     → PLAN-CURRENT.md 초기화
```

### 훅

| 이벤트 | 대상 | 동작 |
|--------|------|------|
| `PostToolUse` | `Edit\|Write` | CLAUDE.md 동기화 알림 |
| `Stop` | 전체 | PLAN-CURRENT.md 진행 상황 업데이트 알림 |
