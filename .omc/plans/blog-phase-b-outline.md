# Blog Phase B — 7편 한국어 초안 Outline + 내부 링크 그래프

**Date:** 2026-05-29
**Spec:** `.omc/specs/deep-interview-blog-system.md`
**Plan:** `.omc/plans/blog-infra-phase-a.md` (Phase A 인프라 완료)

## 작업 원칙

- **Phase B sequencing**: 1편 derisking → 6편 병렬
- **첫 글**: `suno-lyrics-prompt-tips` — 가장 표준적 정보성, 다른 6편이 모두 참조 가능한 hub, AdSense 톤 안전
- **AI 어투 baseline 1차 패스**: Phase B 초안 단계에 포함 — 패시브 회피·구체 수치·반복 표현 제거
- **스크린샷**: `> 📸 [SCREENSHOT: 설명]` blockquote 마커로 placeholder, Phase C에서 사용자가 `![alt](path)` 마크다운으로 교체
- **1인칭 경험**: Phase B 초안은 정보·구조 위주, 1인칭은 Phase C 사용자 보강
- **워드카운트**: 한국어는 어절 1500~3000(=영어 정보 밀도와 유사), 빌드 스크립트는 경고만·차단 안 함

---

## 내부 링크 그래프

각 글은 2~3개의 outgoing 내부 링크를 가짐 (spec 요구사항). 메인 도구(`/`)는 모든 글에서 1회 노출, 나머지 1~2개는 다른 블로그 글 또는 기존 가이드.

```
                    suno-lyrics-prompt-tips  (HUB — 가장 많은 백링크)
                    ↗ ↑ ↑ ↑
                   /  |  |  \
suno-vs-udio  ─→  ai-music-genre-catalog  ─→  daw-post-processing
       ↓                                          ↑
       ↓                                          ↑
suno-pro-value-analysis  ←─────────────────────  ↑
       ↑                                          ↑
       ↑                                          ↑
ai-music-copyright-guide  ←──  youtube-content-with-ai-music
```

| Slug | Outgoing 링크 (2~3개) | 받는 백링크 수 |
|---|---|---|
| `suno-lyrics-prompt-tips` (HUB) | `/`, `/ko/blog/ai-music-genre-catalog`, `/ko/blog/ai-music-copyright-guide` | 3 (genre, vs-udio, daw 글에서) |
| `ai-music-genre-catalog` | `/`, `/ko/blog/suno-lyrics-prompt-tips`, `/ko/blog/daw-post-processing` | 2 (vs-udio, lyrics 글에서) |
| `ai-music-copyright-guide` | `/`, `/ko/blog/youtube-content-with-ai-music`, `/ko/blog/suno-pro-value-analysis` | 2 (lyrics, youtube 글에서) |
| `suno-vs-udio-comparison` | `/`, `/ko/blog/suno-pro-value-analysis`, `/ko/blog/suno-lyrics-prompt-tips` | 0 (의도적 — 결정 단계 글) |
| `suno-pro-value-analysis` | `/`, `/ko/blog/daw-post-processing`, `/ko/guide/suno-mp3-vs-wav`, `/ko/guide/suno-pro-cookie-setup` | 3 (vs-udio, copyright, youtube 글에서) |
| `daw-post-processing` | `/`, `/ko/guide/suno-mp3-vs-wav`, `/ko/blog/suno-pro-value-analysis` | 3 (genre, pro-value, youtube 글에서) |
| `youtube-content-with-ai-music` | `/`, `/ko/blog/ai-music-copyright-guide`, `/ko/blog/daw-post-processing`, `/ko/blog/suno-pro-value-analysis` | 1 (copyright 글에서) |

링크 분포 분석:
- HUB 글(`suno-lyrics-prompt-tips`)에 백링크 3개 집중 — PageRank 응집
- `suno-pro-value-analysis`·`daw-post-processing`도 백링크 3개 (Pro·후처리는 자연스러운 종착점)
- `suno-vs-udio-comparison`은 의도적으로 백링크 0 — 첫 진입점(검색·SNS) 후 다른 글로 분산되는 fan-out 글
- 기존 가이드(`/ko/guide/suno-mp3-vs-wav`, `/ko/guide/suno-pro-cookie-setup`)도 cross-link으로 통합

---

## 7편 Outline

### 1. `suno-lyrics-prompt-tips` (첫 글 — derisking)

- **title**: "Suno AI 가사 프롬프트 작성법: 자연스러운 보컬을 만드는 9가지 규칙"
- **title_en**: "Suno AI Lyrics Prompting: 9 Rules for Natural-Sounding Vocals"
- **summary**: "Suno에서 가사 입력란을 어떻게 쓰느냐에 따라 곡 품질이 크게 갈립니다. 메타태그·운율·발음 함정·한국어 처리까지 실전 규칙을 정리했습니다."
- **summary_en**: "Lyrics prompting in Suno is the single biggest quality lever — free or Pro. Meta tags, rhyme, phonetic traps, and Korean handling, all in one guide."
- **ogSubtitle**: "Meta Tags · Rhyme · Phonetic Traps"
- **tags**: [suno, lyrics, prompt]
- **타깃 키워드**: "suno 가사 프롬프트", "suno lyrics tips", "suno 메타태그", "[verse] [chorus]"
- **목차 (h2)**:
  1. 가사 프롬프트가 결과의 70%를 결정한다
  2. 가사 프롬프트와 스타일 프롬프트는 다르다
  3. 구조 메타태그: [Verse], [Chorus], [Bridge] 활용법
  4. 운율과 음절 수가 멜로디를 결정한다
  5. Suno가 잘 못 부르는 단어 패턴
  6. 한국어 가사 작성 시 주의점
  7. 후렴 반복 vs Variation 균형
  8. Custom Mode 글자 수 한계 다루기
  9. 빠른 체크리스트
- **스크린샷 슬롯 (5)**:
  - Custom Mode 가사 입력란 UI
  - [Verse]/[Chorus] 메타태그가 들어간 실제 가사 예시 화면
  - 같은 멜로디 다른 운율로 생성된 두 버전 비교
  - 한국어 가사 입력 화면 + 발음 결과
  - 가사 길이 초과 경고 메시지
- **내부 링크**: `/`, `/ko/blog/ai-music-genre-catalog`, `/ko/blog/ai-music-copyright-guide`

### 2. `ai-music-genre-catalog`

- **title**: "AI 음악 장르 카탈로그: Suno에서 잘 작동하는 87개 스타일 디스크립터"
- **title_en**: "AI Music Genre Catalog: 87 Style Descriptors That Work in Suno"
- **summary**: "장르 이름을 정확히 적는 것이 톤을 결정합니다. Suno에서 실제로 잘 잡히는 장르·서브장르·악기·무드 디스크립터를 카탈로그로 정리했습니다."
- **summary_en**: "Naming the genre precisely shapes the tone. A catalog of genre, sub-genre, instrument, and mood descriptors that actually resolve well in Suno."
- **ogSubtitle**: "Genres · Sub-genres · Instruments · Moods"
- **tags**: [suno, genres, prompt]
- **타깃 키워드**: "suno 장르 프롬프트", "ai music genres", "suno style descriptors"
- **목차**:
  1. 장르 이름이 톤·악기 편성·BPM을 한 번에 정한다
  2. 5대 메인 장르 + 자주 쓰이는 서브장르
  3. 악기 디스크립터 — "live drums" vs "808 trap drums"
  4. 무드·에너지 키워드 — slow/uptempo/dreamy/aggressive
  5. 시대·지역 디스크립터 — 80s synthwave, lo-fi Korean indie
  6. 잘 안 잡히는 장르 — "neoclassical darkwave" 같은 niche
  7. 장르 조합 규칙 — 2개는 OK, 4개는 죽
  8. 빠른 참고 카탈로그
- **스크린샷 슬롯 (4)**:
  - 같은 가사에 장르만 다르게 한 3개 버전 출력
  - 스타일 입력란 UI
  - 장르 조합 실패 사례 (스타일 무시됨)
  - 카탈로그 캡쳐 화면 (있다면)
- **내부 링크**: `/`, `/ko/blog/suno-lyrics-prompt-tips`, `/ko/blog/daw-post-processing`

### 3. `ai-music-copyright-guide`

- **title**: "AI 음악 저작권 가이드: Suno로 만든 곡, 어디까지 내 것인가"
- **title_en**: "AI Music Copyright Guide: How Much of Your Suno Song Do You Actually Own?"
- **summary**: "Suno로 만든 곡을 상업적으로 써도 되는지, 누구에게 권리가 있는지, Pro와 무료가 어떻게 다른지 — 약관·법·실무를 한자리에 정리했습니다."
- **summary_en**: "Can you sell what Suno generated for you? Who holds the rights? How does Pro differ from Free? Terms, law, and practical implications in one place."
- **ogSubtitle**: "Terms · Ownership · Commercial Use"
- **tags**: [suno, copyright, legal]
- **타깃 키워드**: "suno 저작권", "ai music copyright", "suno commercial use"
- **목차**:
  1. 결론부터: Suno 무료 vs Pro의 권리 차이
  2. Suno 공식 약관이 명시하는 권리 구조
  3. 미국 저작권청의 AI 콘텐츠 입장 (2023~2026)
  4. 한국 저작권법과 AI 생성물
  5. 가사를 직접 쓴 경우 vs 자동 생성한 경우
  6. 상업적 사용 시 체크 포인트
  7. 유튜브·스포티파이 업로드 시 메타데이터 명시
  8. 분쟁 사례 — 표절 의심·소스 추적
  9. 자주 묻는 질문
- **스크린샷 슬롯 (4)**:
  - Suno 공식 Terms 페이지
  - Pro 구독 권리 명시 화면
  - 유튜브 콘텐츠 ID·메타데이터 화면
  - 미국 저작권청 가이드라인 페이지
- **내부 링크**: `/`, `/ko/blog/youtube-content-with-ai-music`, `/ko/blog/suno-pro-value-analysis`
- **법적 톤**: "Suno 공식 약관 확인 권장", "변호사 상담 권장", 단정적 법률 진술 회피

### 4. `suno-vs-udio-comparison`

- **title**: "Suno vs Udio 비교 2026: 어떤 AI 음악 서비스를 골라야 하나"
- **title_en**: "Suno vs Udio 2026: Which AI Music Service Should You Pick?"
- **summary**: "Suno와 Udio는 비슷해 보이지만 보컬·믹스·길이·가격·저작권 정책이 다릅니다. 6개 축으로 두 서비스를 비교하고 사용 시나리오별 추천을 제시합니다."
- **summary_en**: "Suno and Udio look similar but differ in vocals, mix, length, pricing, and rights. A 6-axis comparison with scenario-based recommendations."
- **ogSubtitle**: "Vocals · Mix · Pricing · Rights"
- **tags**: [suno, udio, comparison]
- **타깃 키워드**: "suno vs udio", "udio 비교", "ai music service 비교"
- **목차**:
  1. 결론 표 — 6개 축 한눈에
  2. 보컬 — Suno의 가사 합성 vs Udio의 사운드
  3. 믹스·마스터링 톤
  4. 곡 길이·구조 제어
  5. 가격·생성 횟수
  6. 저작권·상업적 사용 정책
  7. 워크플로우 비교 — 가사·스타일·extend
  8. 시나리오별 추천 — 유튜브 BGM / 개인 데모 / 라이브 / 상업 음원
  9. 둘 다 쓰는 하이브리드 워크플로우
- **스크린샷 슬롯 (4)**:
  - 같은 프롬프트의 Suno·Udio 출력 비교
  - Suno 가격 페이지
  - Udio 가격 페이지
  - 양쪽 곡 길이·구조 UI 비교
- **내부 링크**: `/`, `/ko/blog/suno-pro-value-analysis`, `/ko/blog/suno-lyrics-prompt-tips`

### 5. `suno-pro-value-analysis`

- **title**: "Suno Pro 구독은 본전을 뽑을까: 무손실 WAV·다운로드·우선 처리의 가치 분석"
- **title_en**: "Is Suno Pro Worth It? A Value Analysis of Lossless WAV, Downloads, and Priority"
- **summary**: "Suno Pro의 핵심 권리는 무손실 WAV·라이선스 명확화·우선 처리입니다. 월 $8과 $24 플랜을 사용 시나리오별로 분석하고 본전 손익분기점을 계산합니다."
- **summary_en**: "Pro's core perks: lossless WAV, clearer licensing, and priority. Plan-by-plan ROI for $8 and $24 tiers with breakeven scenarios."
- **ogSubtitle**: "WAV · Licensing · ROI"
- **tags**: [suno, pro, subscription]
- **타깃 키워드**: "suno pro 가치", "suno pro 본전", "suno subscription worth it"
- **목차**:
  1. Pro가 주는 4가지 권리
  2. 무손실 WAV vs MP3 — 청취 vs DAW에서 차이
  3. 라이선스 — Free의 회색지대 vs Pro의 명시
  4. 우선 처리 — 실제 대기 시간 측정
  5. $8 Pro 플랜 손익분기 시나리오
  6. $24 Premier 플랜이 의미 있는 사용자
  7. 결제 전 체크리스트
  8. 해지·다운그레이드 시 기존 곡은 어떻게 되나
- **스크린샷 슬롯 (4)**:
  - 가격 페이지 + 플랜 비교
  - WAV 다운로드 옵션 화면
  - 라이선스 안내 화면
  - 우선 처리 큐 대기 화면
- **내부 링크**: `/`, `/ko/blog/daw-post-processing`, `/ko/guide/suno-mp3-vs-wav`, `/ko/guide/suno-pro-cookie-setup`

### 6. `daw-post-processing`

- **title**: "Suno 곡을 DAW에서 후처리하기: EQ·컴프레서·매스터링 체크리스트"
- **title_en**: "Post-Processing Suno Tracks in a DAW: EQ, Compressor, and Mastering Checklist"
- **summary**: "Suno에서 받은 WAV를 DAW에 올린 뒤 무엇을 해야 듣기 좋아질까. EQ·컴프레서·리버브·마스터링 단계별 체크리스트와 자주 발생하는 문제 해결법."
- **summary_en**: "Once you have a Suno WAV in your DAW, what do you actually do? An EQ → compression → reverb → mastering checklist with common problem fixes."
- **ogSubtitle**: "EQ · Compression · Mastering"
- **tags**: [suno, daw, mastering]
- **타깃 키워드**: "suno daw 후처리", "ai music mastering", "suno wav 편집"
- **목차**:
  1. 후처리가 필요한 이유 — AI 마스터링의 한계
  2. WAV 가져오기 + 트랙 분리 (stem) 옵션
  3. EQ — 저음 정리·중음 답답함·고음 거칠음
  4. 컴프레서 — 보컬 다이내믹 조절
  5. 리버브·딜레이 — 공간감 추가
  6. 라우드니스 매칭 — 스포티파이 -14 LUFS
  7. 자주 발생하는 문제 — 위상·클리핑·사이드체인
  8. 라이트 워크플로우 — 무료 플러그인만으로 90% 달성
  9. DAW 별 첫 세팅 — Ableton/Logic/FL Studio/REAPER
- **스크린샷 슬롯 (5)**:
  - DAW 타임라인에 Suno WAV 올라간 화면
  - EQ 커브 (저·중·고)
  - 컴프레서 세팅
  - LUFS 미터 화면
  - 마스터 체인 전체
- **내부 링크**: `/`, `/ko/guide/suno-mp3-vs-wav`, `/ko/blog/suno-pro-value-analysis`

### 7. `youtube-content-with-ai-music`

- **title**: "유튜브 콘텐츠에 Suno AI 음악 활용하기: 수익화·메타데이터·저작권 안전 가이드"
- **title_en**: "Using Suno AI Music in YouTube Content: Monetization, Metadata, and Copyright Safety"
- **summary**: "유튜브 BGM·인트로·전체 음악 채널까지 — Suno로 만든 곡을 안전하게 쓰는 방법. 콘텐츠 ID·메타데이터·수익화 정책·실패 사례를 정리했습니다."
- **summary_en**: "From BGM to full music channels — how to use Suno tracks on YouTube safely. Content ID, metadata, monetization policy, and failure cases."
- **ogSubtitle**: "Monetization · Content ID · Safety"
- **tags**: [suno, youtube, monetization]
- **타깃 키워드**: "suno 유튜브", "ai music youtube", "suno bgm 수익화"
- **목차**:
  1. 유튜브에서 AI 음악은 어떤 카테고리로 분류되나
  2. 수익화 가능 조건 (Pro vs Free)
  3. 콘텐츠 ID·매칭 시스템과 AI 음악
  4. 메타데이터 — 설명란·태그·크레딧 표기
  5. BGM 사용 시 vs 메인 음원 사용 시
  6. AI 음악 전용 채널 운영 시 주의점
  7. 수익화 거절·노란딱지 사례와 대응
  8. 쇼츠·롱폼 별 권장 사용법
  9. 안전한 워크플로우 한 장 요약
- **스크린샷 슬롯 (5)**:
  - 유튜브 스튜디오 수익화 화면
  - 콘텐츠 ID 매칭 결과
  - 설명란·태그 작성 예시
  - 노란딱지 화면 (있다면)
  - AI 음악 전용 채널 사례
- **내부 링크**: `/`, `/ko/blog/ai-music-copyright-guide`, `/ko/blog/daw-post-processing`, `/ko/blog/suno-pro-value-analysis`

---

## AI 어투 baseline 체크리스트 (Phase B 초안 전 적용)

- 패시브 보이스("...됩니다", "...되어 있습니다") 줄이기 — 액티브로 전환
- "매우·정말·다양한·여러" 같은 모호 부사 빈도 ↓
- 구체 수치·이름·예시 삽입 ("BPM 90", "[Chorus]", "Ableton Live 12.1")
- 같은 문장 시작어 반복 회피 ("이는 ~", "이는 ~", "이는 ~" 같은 패턴 차단)
- 결론을 첫 단락에 배치 (역피라미드)
- 단락당 3~5문장, 한 문장당 25~40자 권장
- AdSense 톤: "본인 창작물·Pro 권리·개인 청취"
