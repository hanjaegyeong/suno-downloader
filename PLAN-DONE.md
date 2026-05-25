# 완료된 플랜 아카이브

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
