---
schemaVersion: 1
slug: ai-music-genre-catalog
title: "AI 음악 장르 카탈로그: Suno에서 잘 작동하는 87개 스타일 디스크립터"
title_en: "AI Music Genre Catalog: 87 Style Descriptors That Work in Suno"
summary: "장르 이름을 정확히 적는 것이 톤을 결정한다. Suno에서 실제로 잘 잡히는 장르·서브장르·악기·무드 디스크립터 87개를 카탈로그로 정리했다."
summary_en: "Naming the genre precisely shapes the tone. A catalog of 87 genre, sub-genre, instrument, and mood descriptors that actually resolve well in Suno."
publishedAt: 2026-06-02
ogSubtitle: "Genres · Sub-genres · Instruments · Moods"
tags: [suno, genres, prompt]
internalLinks:
  - /
  - /ko/blog/suno-lyrics-prompt-tips
  - /ko/blog/daw-post-processing
---

## 장르 이름이 톤·악기 편성·BPM을 한 번에 정한다

Suno의 `Style of Music` 입력란에 적는 한 단어가 곡 전체의 방향을 결정한다. "pop"이라고만 적은 결과와 "synthwave 80s retro"라고 적은 결과는 BPM·악기 편성·보컬 톤·믹스 색감이 모두 다르다. 같은 가사를 넣어도 장르 디스크립터 하나가 30% 이상 다른 곡을 만든다.

장르 디스크립터는 단순한 태그가 아니라 메타 명령이다. Suno 모델은 디스크립터에서 BPM 범위, 주력 악기, 보컬 처리, 믹스 톤을 동시에 추론한다. 예를 들어 `lo-fi hip hop`이라고 적으면 모델은 자동으로 BPM 70~85, 따뜻한 키 EP, 비닐 노이즈, 낮은 보컬 컴프레션을 함께 가져온다. 별도로 BPM이나 악기를 적지 않아도 결과가 일관된다.

문제는 잘 잡히는 디스크립터와 그렇지 않은 디스크립터가 따로 있다는 점이다. "neoclassical darkwave" 같은 niche 합성어는 모델이 학습한 표본이 적어 결과가 들쭉날쭉하다. 반면 `synthwave`, `trap`, `bossa nova` 같은 표준 장르명은 거의 항상 일관된 톤을 낸다. 이 글은 Suno에서 안정적으로 잡히는 87개 디스크립터를 5개 카테고리로 정리한다.

> 📸 [SCREENSHOT: 같은 가사에 장르만 다르게 한 3개 버전 출력 — Style of Music 필드만 변경한 비교]

## 5대 메인 장르 + 자주 쓰이는 서브장르

먼저 가장 안정적인 메인 장르 5개와 그 안에서 자주 호출되는 서브장르를 정리한다. 메인 장르 하나만 적어도 결과가 잘 나오지만, 서브장르까지 명시하면 톤이 더 좁혀진다.

**Pop 계열 (12개)**

- `pop` — 가장 보편적 베이스. BPM 100~120, 깔끔한 보컬, 표준 밴드 편성
- `synth pop` — 80s 신스 베이스, BPM 110~125
- `k-pop` — 한국어 가사와 잘 맞음, 빠른 BPM 120~135, 비트 전환 풍부
- `j-pop` — 비교적 밝은 톤, 어쿠스틱 요소 ↑
- `dream pop` — 리버브 가득, 보컬 흐릿하게, BPM 80~100
- `hyperpop` — 디지털 디스토션, 피치업 보컬, BPM 140 이상
- `indie pop` — 어쿠스틱 기타 + 단순 드럼, BPM 95~115
- `electropop` — 신스 리드 + EDM 드럼, BPM 120~128
- `bedroom pop` — 로우파이 톤, 작은 마이크 느낌, BPM 80~100
- `art pop` — 비정형 구조, 실험적 사운드 디자인
- `dance pop` — 4-on-the-floor 킥, 후크 강조, BPM 120~128
- `power pop` — 일렉 기타 중심, 80s 록 영향

**Rock 계열 (10개)**

- `rock` — 일렉 기타 + 드럼 기본
- `indie rock` — 거친 톤, 라이브 느낌
- `alternative rock` — 90s 영향, 디스토션 중간
- `hard rock` — 강한 디스토션, 강한 드럼
- `punk rock` — 빠른 BPM 150~180, 짧은 송폼
- `pop punk` — 빠른 BPM + 멜로딕 보컬
- `garage rock` — 거친 녹음 톤, 단순 진행
- `progressive rock` — 긴 곡, 비정형 박자
- `classic rock` — 70s 톤, 오르간 + 일렉 기타
- `shoegaze` — 두꺼운 기타 월, 보컬 묻힘

**Hip-Hop / R&B 계열 (10개)**

- `hip hop` — 표준 트랩 드럼, BPM 70~90
- `trap` — 808 베이스 강조, 하이햇 트리플렛
- `lo-fi hip hop` — 따뜻한 키 EP, 비닐 노이즈, BPM 70~85
- `boom bap` — 90s 샘플링 톤, 스윙 드럼
- `drill` — 빠른 하이햇, 어두운 톤, BPM 140~150
- `cloud rap` — 신스 패드 가득, 흐릿한 보컬
- `r&b` — 부드러운 보컬, 7th 코드, BPM 70~90
- `neo soul` — 어쿠스틱 + 일렉 피아노, 재즈 영향
- `contemporary r&b` — 현대 팝 R&B 톤
- `alternative r&b` — 실험적 R&B, FKA twigs 계열

**Electronic 계열 (15개)**

- `house` — 4-on-the-floor, BPM 120~128
- `deep house` — 어두운 베이스, BPM 120~124
- `tech house` — 미니멀 신스, BPM 122~128
- `techno` — 강박적 킥, BPM 125~135
- `trance` — 빌드업 + 드롭 구조, BPM 130~138
- `dnb` 또는 `drum and bass` — 빠른 브레이크비트, BPM 170~180
- `dubstep` — 워블 베이스, BPM 140 (half-time 70)
- `future bass` — 슈퍼소우 코드 + 사이드체인, BPM 140~160
- `synthwave` — 80s 신스 + 게이트 리버브 스네어, BPM 80~110
- `vaporwave` — 느린 BPM 60~80, 피치 다운, 8-bit 노이즈
- `chillwave` — 따뜻한 신스 패드, BPM 80~100
- `ambient` — 박자 없음, 신스 드론
- `idm` — 실험적 비트, 글리치 사운드
- `breakbeat` — 90s 영향, BPM 130~140
- `hardstyle` — 강한 디스토션 킥, BPM 150

**Jazz / 어쿠스틱 계열 (8개)**

- `jazz` — 표준 콤보, 워킹 베이스
- `bossa nova` — 보사 기타 패턴, 부드러운 보컬, BPM 70~90
- `lounge` — 70s 영향, 비브라폰
- `swing` — 4비트 스윙 드럼, 빅밴드 호른
- `bebop` — 빠른 BPM 200+, 복잡한 화성
- `acoustic folk` — 어쿠스틱 기타 + 보컬, 단순 구조
- `indie folk` — 어쿠스틱 + 약간의 일렉
- `country` — 컨트리 기타 + 페달 스틸

여기까지 55개 디스크립터다. 메인 장르 5개를 알면 어떤 곡이든 출발점은 잡힌다. 자신이 만들려는 곡의 가장 가까운 메인 장르 하나, 서브장르 하나를 조합하는 것이 안전한 출발이다.

> 📸 [SCREENSHOT: Style of Music 입력란 UI — Custom Mode에서 장르 디스크립터를 입력하는 화면]

## 악기 디스크립터 — "live drums" vs "808 trap drums"

장르 디스크립터만 적어도 악기 편성이 자동으로 따라오지만, 특정 악기를 강조하고 싶을 때는 별도 디스크립터를 추가한다. Suno에서 잘 잡히는 악기 키워드 14개를 정리한다.

- `live drums` — 어쿠스틱 드럼 킷, 자연스러운 룸 톤
- `808 drums` 또는 `808 trap drums` — 강한 서브 베이스 킥
- `acoustic guitar` — 스틸 스트링 어쿠스틱
- `nylon guitar` — 클래식 기타, 보사노바·플라멩코 어울림
- `electric guitar` — 일렉 기타 (장르에 따라 톤 자동)
- `distorted guitar` — 록·메탈용 디스토션
- `piano` — 어쿠스틱 그랜드 피아노
- `electric piano` 또는 `rhodes` — 70s 펜더 로즈 톤
- `synth bass` — 신스 베이스, 일렉트로닉 장르
- `upright bass` — 재즈 워킹 베이스
- `strings` — 스트링 섹션, 발라드·시네마틱
- `brass` — 브라스 섹션, 펑크·재즈
- `saxophone` — 색소폰 솔로
- `vinyl noise` — 로우파이 노이즈, 빈티지 톤

악기는 두 개 정도 조합이 가장 안정적이다. `synthwave with saxophone`처럼 장르 + 악기 1개 조합은 명확하게 잡힌다. 반대로 `synthwave with saxophone, electric guitar, piano, strings, choir`처럼 5개 이상 나열하면 모델이 우선순위를 잃고 결과가 들쭉날쭉해진다.

악기 디스크립터는 가능하면 영어로 적는다. `색소폰`보다 `saxophone`이 인식률이 높다. Suno 학습 데이터의 메타데이터가 대부분 영어이기 때문이다.

## 무드·에너지 키워드 — slow / uptempo / dreamy / aggressive

무드 키워드는 BPM과 보컬 톤에 영향을 준다. 장르 + 무드 조합은 거의 항상 안정적이다.

- `slow` — BPM을 한 단계 낮춤 (예: pop 100 → slow pop 80)
- `uptempo` — BPM을 한 단계 높임
- `dreamy` — 리버브 ↑, 보컬 흐릿, 패드 사용 ↑
- `energetic` — 강한 드럼, 빠른 BPM
- `aggressive` — 디스토션 ↑, 큰 다이내믹
- `melancholic` — 마이너 키, 느린 BPM
- `uplifting` — 메이저 키, 밝은 화성
- `nostalgic` — 빈티지 톤, 약한 리버브
- `cinematic` — 스트링 섹션, 풍부한 다이내믹
- `intimate` — 작은 편성, 가까운 마이크 톤
- `epic` — 큰 편성, 강한 다이내믹, 빌드업
- `chill` — 느린 BPM, 부드러운 톤
- `dark` — 마이너 키, 어두운 신스, 낮은 EQ
- `bright` — 메이저 키, 높은 EQ, 밝은 신스

`synthwave nostalgic dreamy` 같은 조합은 톤을 정확히 잡아낸다. 무드는 2~3개까지 안전하다. 4개 이상 적으면 서로 충돌해 결과가 흐려진다.

> 📸 [SCREENSHOT: 같은 장르 디스크립터에 무드 키워드만 다르게 한 비교 — dreamy vs aggressive]

## 시대·지역 디스크립터 — 80s synthwave, lo-fi Korean indie

시대와 지역 디스크립터는 Suno에서 의외로 강력하다. 단순히 `synthwave`라고 적는 것과 `80s synthwave`라고 적는 것은 결과 톤이 다르다. 80s가 들어가면 게이트 리버브 스네어, DX7 신스 톤, 아날로그 코러스가 추가된다.

시대 디스크립터 8개를 정리한다.

- `60s` — 모노 톤, 빈티지 리버브, 단순 드럼
- `70s` — 아날로그 신스 등장, 펑크·디스코
- `80s` — 게이트 리버브, FM 신스, 신스 베이스
- `90s` — 그런지·하우스·붐뱁의 시대
- `2000s` — 디지털 톤 ↑, R&B·이모
- `2010s` — EDM·트랩·하이퍼팝의 시대
- `retro` — 시대 미지정 빈티지 톤
- `modern` — 현대적 믹스, 깔끔한 사운드

지역 디스크립터 11개도 잘 작동한다.

- `korean indie` — 한국 인디 톤
- `japanese city pop` — 일본 시티팝, 80s 도쿄
- `latin` — 라틴 리듬, 퍼커션
- `afrobeats` — 아프리카 BPM 100~115, 폴리리듬
- `brazilian` — 보사노바·삼바 영향
- `flamenco` — 플라멩코 기타
- `celtic` — 켈틱 호른, 5/8 박자
- `arabic` — 마캄 스케일, 우드
- `indian` 또는 `bollywood` — 인도 영화 음악 톤
- `caribbean` — 레게·소카 영향
- `country americana` — 미국 컨트리

지역 디스크립터는 메인 장르와 조합할 때 가장 잘 잡힌다. `korean indie pop`은 `korean` 단독보다 안정적이고, `japanese city pop`은 80s 도쿄 톤을 거의 정확히 재현한다. `lo-fi korean indie`처럼 무드 + 지역 + 장르를 함께 적으면 톤이 매우 좁혀진다.

> 📸 [SCREENSHOT: 시대 디스크립터 비교 — 80s synthwave vs modern synthwave 결과 톤 차이]

## 잘 안 잡히는 장르 — "neoclassical darkwave" 같은 niche

모든 장르가 잘 잡히는 것은 아니다. 다음 패턴은 Suno에서 결과가 들쭉날쭉한 경우가 많다.

- **합성 신조어** — `neoclassical darkwave`, `solarpunk`, `weirdcore` 같이 표본이 적은 장르
- **너무 좁은 마이크로 장르** — `seapunk`, `witch house`, `vaporgrunge` 같이 SoundCloud 시기 niche
- **로컬 마이너 장르** — `enka`, `노라조` 같이 한국·일본 로컬 한정 장르
- **클래식 세부 분류** — `baroque counterpoint`, `serialism` 같이 클래식 학술 용어
- **메탈 세부 분류** — `melodic death metal`, `progressive black metal` 같이 너무 세분화된 메탈

이런 niche 장르를 시도하려면 두 가지 전략이 있다. 첫째는 가장 가까운 표준 장르 + 세부 키워드를 조합하는 방법이다. 예를 들어 `darkwave`는 `synthwave dark cold 80s` 정도로 풀어 쓰면 비슷한 결과가 나온다. 둘째는 reference 곡의 키워드를 직접 가져오는 방법이다. Suno의 학습 데이터에 포함된 곡 메타데이터가 표준 장르 라벨을 사용하므로, Spotify·Apple Music의 공식 장르 라벨을 그대로 가져오는 게 안전하다.

마이너 장르에 대한 헛수고를 줄이려면, 한 번 생성해서 결과가 어색하면 빠르게 표준 장르로 복귀한다. 같은 디스크립터로 5회 이상 생성해도 결과가 좁혀지지 않으면 그 디스크립터는 모델이 모르는 것이다.

## 장르 조합 규칙 — 2개는 OK, 4개는 죽

장르를 여러 개 섞을 수 있지만 한계가 있다. Suno에서 안정적인 조합 규칙은 다음과 같다.

- **장르 1개** — 가장 안정적. 톤이 명확하게 잡힌다
- **장르 2개** — 두 장르가 서로 가깝거나(예: `synth pop electropop`), 명확한 fusion 의도(예: `jazz hip hop`)라면 OK
- **장르 3개** — 한두 개는 무시될 가능성 ↑. 우선순위가 모호해진다
- **장르 4개 이상** — 결과가 무작위에 가까워진다

장르 디스크립터 1개 + 서브장르 1개 + 무드 2개 + 시대 1개 + 악기 1개 정도가 안정적인 상한이다. 디스크립터 총 개수는 6~7개 이내로 유지하는 게 좋다.

조합할 때 가장 흔한 실수는 서로 충돌하는 장르를 함께 적는 경우다. `country techno`처럼 BPM·악기·문화가 너무 다른 조합은 모델이 하나를 무시한다. `country folk`, `techno house`처럼 서로 가까운 장르끼리 조합한다.

자신이 만들려는 장르가 표준 라벨이 없는 fusion이라면, 가까운 표준 장르 1개를 메인으로 적고 무드·시대·악기 키워드로 좁히는 게 낫다. `synth pop nostalgic 80s with saxophone`은 `synthwave city pop 80s yacht rock`보다 안정적이다.

> 📸 [SCREENSHOT: 장르 조합 실패 사례 — 4개 이상 나열했을 때 스타일이 무시된 결과]

## 빠른 참고 카탈로그

87개 디스크립터를 카테고리별로 한자리에 모은다. 메인 장르 55개, 악기 14개, 무드 14개, 시대 8개, 지역 11개 — 합계 102개지만, 중복·서브카테고리 제외한 핵심 87개를 기억해두면 거의 모든 곡에 대응할 수 있다.

| 카테고리 | 안전한 디스크립터 |
|---|---|
| Pop | pop, synth pop, k-pop, j-pop, dream pop, hyperpop, indie pop, electropop, bedroom pop, dance pop |
| Rock | rock, indie rock, alternative rock, hard rock, punk rock, pop punk, classic rock, shoegaze |
| Hip-Hop / R&B | hip hop, trap, lo-fi hip hop, boom bap, drill, r&b, neo soul, alternative r&b |
| Electronic | house, deep house, techno, trance, dnb, dubstep, future bass, synthwave, vaporwave, chillwave, ambient |
| Jazz / 어쿠스틱 | jazz, bossa nova, swing, acoustic folk, indie folk, country |
| 악기 | live drums, 808 drums, acoustic guitar, electric guitar, piano, rhodes, synth bass, strings, brass, saxophone |
| 무드 | slow, uptempo, dreamy, energetic, melancholic, uplifting, nostalgic, cinematic, chill, dark, bright |
| 시대 | 60s, 70s, 80s, 90s, 2000s, retro, modern |
| 지역 | korean indie, japanese city pop, latin, afrobeats, brazilian, flamenco, celtic, americana |

이 표를 한 번 보고 곡 만들기 시작하면 디스크립터 선정이 1분 안에 끝난다. 곡 컨셉이 "80년대 분위기의 잔잔한 K-pop"이라면 `k-pop 80s nostalgic dreamy`처럼 4개 키워드 조합으로 정리된다. 같은 가사로 3~5회 생성해 베스트 테이크를 뽑으면 된다.

가사 프롬프트 작성법은 [Suno AI 가사 프롬프트 작성법](/ko/blog/suno-lyrics-prompt-tips)에서 다룬다. 장르 디스크립터를 정했으면 다음 단계는 DAW에서 후처리다 — [Suno 곡을 DAW에서 후처리하기](/ko/blog/daw-post-processing)에 EQ·컴프레서·마스터링 체크리스트를 정리했다. 곡이 완성되면 [SunoDown](/)에서 무손실 WAV·MP3로 전곡 일괄 다운로드할 수 있다.
