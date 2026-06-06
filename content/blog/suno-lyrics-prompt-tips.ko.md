---
schemaVersion: 1
slug: suno-lyrics-prompt-tips
title: "Suno AI 가사 프롬프트 작성법: 자연스러운 보컬을 만드는 9가지 규칙"
title_en: "Suno AI Lyrics Prompting: 9 Rules for Natural-Sounding Vocals"
summary: "Suno에서 가사 입력란을 어떻게 쓰느냐에 따라 곡 품질이 크게 갈립니다. 메타태그·운율·발음 함정·한국어 처리까지 실전 규칙 9가지를 정리했습니다."
summary_en: "Lyrics prompting in Suno is the single biggest quality lever — free or Pro. Meta tags, rhyme, phonetic traps, and Korean handling — 9 rules in one guide."
publishedAt: 2026-06-01
ogSubtitle: "Meta Tags · Rhyme · Phonetic Traps"
tags: [suno, lyrics, prompt]
internalLinks:
  - /
  - /ko/blog/ai-music-genre-catalog
  - /ko/blog/ai-music-copyright-guide
---

## 가사 프롬프트가 결과의 70%를 결정한다

같은 장르 프롬프트를 적어도 가사가 어색하면 곡 전체가 어색해진다. Suno는 가사 입력란에 들어간 텍스트를 실제로 노래로 합성하는데, 이 합성 결과가 멜로디 라인·박자·보컬 톤·발음을 전부 좌우한다. 장르나 스타일 디스크립터를 아무리 정교하게 적어도, 가사가 너무 길거나 발음이 어렵거나 운율이 무너지면 보컬이 부자연스럽게 끊긴다.

체감상 곡 품질의 70% 정도는 가사 프롬프트에서 결정된다. 나머지 30%가 장르·악기·무드 디스크립터다. 무료·Pro 모두 동일하게 적용되는 규칙이고, Pro로 업그레이드해도 가사가 부실하면 결과는 그대로 부실하다.

내가 직접 가사를 입력해 써보면, 장르 프롬프트를 그대로 둔 채 가사만 다듬어도 결과가 크게 달라지는 걸 매번 다시 확인하게 된다. 같은 입력으로 여러 번 생성해 비교하다 보면, 어색하게 끊기던 보컬이 결국 가사 쪽 문제였던 경우가 대부분이었다. 그래서 나는 무엇을 손보든 가사부터 점검하는 습관이 생겼다.

이 글은 Suno에서 자주 발견되는 실패 패턴 9가지를 정리하고, 각 패턴을 피하는 작성 규칙을 함께 제시한다. 메타태그·운율·음절·발음·한국어 특이사항·후렴 비율·글자수 한계까지 9개 항목을 한자리에 모았다.

![Suno Custom Mode(Advanced) Lyrics 입력란 — [Verse]·[Pre-Chorus]·[Chorus] 구조 메타태그가 들어간 영어 가사 예시](/blog/images/suno-lyrics-prompt-tips/01-custom-mode-ui.png)
## 가사 프롬프트와 스타일 프롬프트는 역할이 다르다

Suno Custom Mode에는 큰 입력란이 두 개 있다. 첫째는 `Lyrics`, 둘째는 `Style of Music`이다. 둘은 역할이 완전히 다르다.

- `Lyrics` — 실제로 노래로 합성되는 텍스트. 보컬이 입혀지는 부분
- `Style of Music` — 장르·악기·BPM·무드를 결정하는 메타 디스크립터. 보컬에 들어가지 않음

자주 발생하는 실수는 `Lyrics` 필드에 장르 설명을 함께 적는 경우다. 예를 들어 "K-pop dance, 120 BPM, female vocal" 같은 텍스트를 가사 자리에 적으면, Suno가 이 문장을 그대로 노래로 부른다. 결과는 어색한 영문 메타 디스크립션이 멜로디에 얹힌 곡이 된다.

장르·악기·무드는 반드시 `Style of Music` 필드에만 적는다. 가사 필드는 가사만, 그것도 노래로 부를 수 있는 자연어 문장만 들어간다. 이 분리가 안 되면 다른 규칙은 다 지켜도 결과가 망가진다.

<!-- TODO SCREENSHOT: Lyrics 필드에 장르 설명이 잘못 들어간 사례 — 결과 음원에서 메타 텍스트가 그대로 노래된 비교 클립 -->
## 구조 메타태그: [Verse], [Chorus], [Bridge] 활용법

가사 텍스트 안에 대괄호로 메타태그를 적으면, Suno가 곡의 구조를 인식한다. 자주 쓰이는 태그는 다음과 같다.

- `[Intro]` — 도입부, 보컬 없거나 짧은 험
- `[Verse]` 또는 `[Verse 1]`, `[Verse 2]` — 절
- `[Pre-Chorus]` — 후렴 직전 빌드업
- `[Chorus]` — 후렴
- `[Bridge]` — 다리, 곡의 분위기 전환부
- `[Outro]` — 끝맺음
- `[Instrumental]` — 가사 없는 연주 구간
- `[Hook]` — 캐치한 반복 구절

메타태그는 대괄호 안에 영어로 적는다. 한국어로 적으면 인식이 일관되지 않는다(`[후렴]` 같은 표기는 동작이 불안정). 메타태그 뒤에는 줄바꿈을 한 번 주는 것이 안정적이다.

가사 전체에 메타태그를 빼곡히 채울 필요는 없다. 보통 `[Verse 1]` → `[Chorus]` → `[Verse 2]` → `[Chorus]` → `[Bridge]` → `[Chorus]` 정도 구조면 충분하고, `[Outro]`까지 명시하면 끝맺음이 깔끔해진다.

`[Instrumental break]`나 `[Guitar solo]` 같은 자유 메타태그도 일부 인식된다. 짧은 연주 구간을 명시적으로 요청할 때 유용하다.

<!-- TODO SCREENSHOT: [Verse]/[Chorus] 메타태그가 들어간 실제 가사 예시 + 생성된 곡 파형에서 구조가 분리된 모습 -->
## 운율과 음절 수가 멜로디를 결정한다

Suno는 가사의 음절 수와 운율을 기반으로 멜로디 라인을 만든다. 같은 의미의 가사라도 음절 수가 다르면 멜로디 자체가 달라진다.

영어 기준 권장 음절 수는 다음과 같다.

- Verse 라인 — 한 줄에 8~12 음절
- Chorus 라인 — 한 줄에 6~10 음절 (조금 더 짧고 임팩트 있게)
- Bridge — 12~16 음절도 가능 (전환부라 자유도가 ↑)

음절 수가 들쭉날쭉하면 멜로디가 안정되지 않는다. 모든 줄이 정확히 같을 필요는 없지만, 같은 위치(예: Verse 1의 4줄)에서는 비슷한 음절 수를 유지하는 게 좋다.

운율도 중요하다. ABAB·AABB·ABCB 같은 라임 스킴 중 하나를 일관되게 유지하면, Suno가 후렴부에서 음정을 비슷한 모양으로 처리해 자연스러운 노래 느낌이 난다. 운율이 완전히 무작위면 보컬이 곳곳에서 끊기는 인상을 준다.

운율이 어렵다면 ABAB 한 가지만 우선 익히는 것을 권한다. 1·3번째 줄 끝 단어가 라임을 이루고, 2·4번째 줄 끝 단어가 다른 라임을 이루는 구조다. K-pop·팝·R&B 어디서든 자연스럽게 작동한다.

간단한 ABAB 예시는 이런 식이다.

```
City lights are calling me out      ← A
I follow neon down the street       ← B
Echoes of the rain, no doubt        ← A
Footsteps falling soft and sweet    ← B
```

음절 수도 거의 일정하고(8/8/8/8), 줄 끝이 out/street/doubt/sweet로 ABAB 라임이다. Suno에 이대로 넣으면 후렴 멜로디가 비교적 깔끔하게 잡힌다.

<figure style="margin:28px 0;background:#111119;border:1px solid #242430;border-radius:10px;padding:22px 24px;">
<svg width="100%" viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="ABAB rhyme aligning melody contours">
<defs><style>.lab{font-family:'DM Mono',monospace;font-size:12px;fill:#c0c0d0}.tag{font-family:'DM Mono',monospace;font-size:14px;font-weight:700}.end{font-family:'DM Mono',monospace;font-size:11px;fill:#6b6b80}.cap{font-family:'Outfit',sans-serif;font-size:11px;fill:#6b6b80;letter-spacing:1px}</style></defs>
<rect x="60" y="20" width="600" height="280" fill="none" stroke="#242430" stroke-dasharray="2 4"/>
<text x="40" y="64" class="cap" transform="rotate(-90 40 64)">PITCH</text>
<text x="370" y="316" text-anchor="middle" class="cap">TIME →</text>
<line x1="60" y1="80" x2="660" y2="80" stroke="#242430" stroke-width="1"/>
<line x1="60" y1="140" x2="660" y2="140" stroke="#242430" stroke-width="1"/>
<line x1="60" y1="200" x2="660" y2="200" stroke="#242430" stroke-width="1"/>
<line x1="60" y1="260" x2="660" y2="260" stroke="#242430" stroke-width="1"/>
<text x="70" y="74" class="tag" fill="#c084fc">A</text>
<path d="M90 80 Q160 50 230 70 T370 60 Q450 55 540 75 L600 70" fill="none" stroke="#c084fc" stroke-width="2.5"/>
<circle cx="600" cy="70" r="4" fill="#c084fc"/>
<text x="612" y="74" class="end">out</text>
<text x="70" y="134" class="tag" fill="#22d3ee">B</text>
<path d="M90 140 Q170 165 250 150 T390 160 Q470 170 550 145 L600 150" fill="none" stroke="#22d3ee" stroke-width="2.5"/>
<circle cx="600" cy="150" r="4" fill="#22d3ee"/>
<text x="612" y="154" class="end">street</text>
<text x="70" y="194" class="tag" fill="#c084fc">A</text>
<path d="M90 200 Q160 170 230 190 T370 180 Q450 175 540 195 L600 190" fill="none" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="0"/>
<circle cx="600" cy="190" r="4" fill="#c084fc"/>
<text x="612" y="194" class="end">doubt</text>
<text x="70" y="254" class="tag" fill="#22d3ee">B</text>
<path d="M90 260 Q170 285 250 270 T390 280 Q470 290 550 265 L600 270" fill="none" stroke="#22d3ee" stroke-width="2.5"/>
<circle cx="600" cy="270" r="4" fill="#22d3ee"/>
<text x="612" y="274" class="end">sweet</text>
<rect x="540" y="40" width="120" height="60" fill="none" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="3 3" rx="4"/>
<rect x="540" y="160" width="120" height="60" fill="none" stroke="#8b5cf6" stroke-width="1" stroke-dasharray="3 3" rx="4"/>
<text x="670" y="74" class="lab" fill="#8b5cf6">↑</text>
<text x="670" y="194" class="lab" fill="#8b5cf6">↑</text>
<text x="370" y="305" text-anchor="middle" class="lab">A lines share contour · B lines share contour</text>
</svg>
<figcaption style="margin-top:12px;color:#6b6b80;font-size:13px;text-align:center;">Figure: ABAB 라임이 멜로디 윤곽선을 정렬하는 방식 — A 라인끼리, B 라인끼리 음정 모양이 닮는다</figcaption>
</figure>

<!-- TODO SCREENSHOT: 같은 멜로디 같은 장르, 운율만 다르게 적은 두 버전 비교 — 보컬 자연스러움 차이 -->
## Suno가 잘 못 부르는 단어 패턴

Suno의 보컬 합성 엔진은 일부 발음 패턴에 약하다. 자주 발견되는 실패 사례를 모았다.

- **약어·이니셜** — `NASA`, `FBI` 같은 영문 약어는 글자 단위 발음과 한 단어 발음 사이에서 흔들린다
- **숫자·연도** — `2026`은 "two thousand twenty-six"로 풀어 적으면 안정적이다. 숫자 그대로 적으면 가끔 다른 형태로 읽는다
- **연속 자음 클러스터** — `strengths`, `twelfths` 같이 마지막에 자음이 3개 이상 붙은 단어는 뭉개진다
- **외국어 고유명사** — 한국어 가사 안에 영문 이름을 섞으면 발음이 불안정해진다
- **동음이의어** — `lead`(이끌다 / 납), `read`(현재형 / 과거형) 같은 단어는 문맥에 맞게 발음하지 못할 때가 있다
- **너무 긴 단어** — `incomprehensibility` 같은 8음절 이상 단어는 박자에 안 맞아 잘린다
- **연속 모음** — `idea of a year` 같이 모음으로 끝나고 모음으로 시작하는 단어 연결은 합쳐져 발음이 흐려진다

발음에 자신이 없는 단어는 그 자리에 비슷한 의미의 짧은 단어로 교체하는 게 안전하다. 어쩔 수 없이 써야 하면 그 단어가 들어간 줄을 한 번 더 짧게 만들어, 박자에 여유를 준다.

<!-- TODO SCREENSHOT: Suno에서 약어·숫자 발음이 어색하게 나온 사례 — 가사 vs 실제 들리는 발음 비교 -->
## 한국어 가사 작성 시 주의점

Suno는 한국어 가사도 입력 가능하다. 다만 영어보다 합성 안정성이 떨어지므로 몇 가지 규칙을 따르는 게 좋다.

- 음절 수를 영어보다 더 일정하게 유지 — 한국어는 음절 단위가 명확해서, 줄마다 음절 수가 들쭉날쭉하면 박자가 더 크게 흔들린다
- 받침이 많이 몰린 줄은 피하기 — `깊은 밤 잠 못 들어` 같이 받침이 연속되면 발음이 흐려진다
- 외래어 혼합은 최소화 — `당신의 heart는` 같은 한영 혼용은 발음 톤이 자주 흔들린다
- 의성어·의태어는 짧게 — `반짝반짝`, `우당탕탕` 같은 반복형은 한 번까지가 안전하다
- 첫 줄에 발음 안정 단어 배치 — 도입부 첫 줄이 어색하면 곡 전체가 어색하게 들린다
- 마침표·쉼표 사용 자제 — 한국어 가사에서 구두점이 많으면 박자가 자주 끊긴다

한국어 가사 작성 시 영어와 다른 점이 또 하나 있다. 영어는 강세(stressed syllable)가 멜로디에 큰 영향을 주지만, 한국어는 강세가 약한 언어라 Suno가 음정을 더 자유롭게 배치한다. 그래서 동일한 가사도 생성할 때마다 멜로디가 더 크게 달라질 수 있다. 마음에 드는 버전이 나올 때까지 같은 가사로 3~5회 생성하는 것을 권한다.

발음이 잘 잡히는 줄과 그렇지 않은 줄의 예시는 다음과 같다.

```
잘 잡히는 줄:  바람이 불어와 너에게 닿네     ← 받침 적고 모음 흐름 매끄러움
어색한 줄:    깊은 밤 잠 못 들었던 끝났던     ← 받침 6개 몰림, 단어 경계 모호
```

같은 의미를 전하려면 두 번째 줄을 `밤은 깊어 잠은 멀어졌어` 정도로 다듬으면 받침 부담이 줄고, 음절 수도 일정해진다. 이런 다듬기를 가사 전체에 한 번 거치는 데 5~10분이면 충분하다.

<!-- TODO SCREENSHOT: 한국어 가사 입력 화면 + 생성 결과에서 받침이 많은 줄과 적은 줄의 발음 명료도 차이 -->
## 후렴 반복과 Variation의 균형

후렴(Chorus)은 곡의 정체성을 만드는 부분이다. 그런데 Suno에서 후렴을 너무 똑같이 반복해 적으면, 결과 곡의 후렴부가 단조롭게 들린다. 반대로 매번 가사를 바꾸면 후렴의 정체성이 사라진다.

권장 패턴은 다음과 같다.

- 1번째 Chorus와 2번째 Chorus는 가사를 동일하게 유지 — 후렴의 정체성 확립
- 마지막 Chorus(보통 Bridge 다음)에서 한두 줄만 미세하게 변경 — 결말감 강화
- 후렴 안에서도 반복되는 키 라인 한 줄은 유지 — 캐치한 후크 효과

이렇게 적으면 Suno가 후렴부 멜로디를 거의 동일하게 유지하면서, 마지막 후렴에서 미세한 변주를 시도한다. 결과적으로 곡이 단조롭지도 산만하지도 않게 된다.

Bridge는 후렴과 반대 방향으로 갈수록 효과적이다. 후렴이 밝다면 Bridge는 잠시 어두워지고, 후렴이 빠르다면 Bridge는 잠깐 호흡을 잡는다. 이 대비가 마지막 후렴의 카타르시스를 만든다.

## Custom Mode 글자 수 한계 다루기

Suno Custom Mode의 가사 입력란은 글자 수 한계가 있다. 무료·Pro 모두 약 3,000자(영문 기준) 수준이고, 한국어는 글자 수 자체는 비슷해도 곡 시간이 더 길어지는 경향이 있다.

곡이 한 번에 안 끝나면 다음 옵션을 사용한다.

- `Extend` 기능 — 생성된 곡 끝에서 이어 작곡. 가사는 새로 입력
- `Continue From` — 임의 시점에서 이어 작곡 (Pro 권장)
- 곡을 두 곡으로 나눠 만들기 — 가장 깔끔한 결과

긴 곡(예: 4분 이상)을 한 번에 시도하기보다, 2~3분 곡 두 개로 나눠 만들고 DAW에서 이어 붙이는 방법이 결과가 안정적이다. Extend는 편리하지만 톤이 미세하게 달라지는 경우가 많아서, 정밀한 곡에는 두 곡 분리 + DAW 접합이 낫다.

## 같은 가사로 여러 번 생성해 비교한다

Suno는 같은 가사·스타일 프롬프트라도 매번 다른 결과를 낸다. 가사를 한 번 다듬은 뒤에는 같은 입력으로 3~5회 생성해 비교하는 것이 효율적이다.

좋은 결과 1개를 뽑기 위해 평균 3회 생성한다고 보면, 무료 플랜의 일일 크레딧 한도 안에서도 충분히 한 곡을 완성할 수 있다. Pro 플랜이라면 더 많은 시도로 베스트 테이크를 뽑을 수 있다.

비교할 때 봐야 할 항목은 세 가지다.

- 첫 단어의 발음이 명료한가
- 후렴부 멜로디 라인이 인상적인가
- 곡 후반부 (특히 마지막 30초)의 마무리감이 자연스러운가

이 세 가지가 모두 OK인 버전이 나오면 채택하고, 부족하면 가사를 한 줄 정도 다듬어 다시 시도한다. 가사 다듬기 → 5회 생성 → 베스트 테이크 채택 워크플로우가 가장 안정적이다.

## 빠른 체크리스트

가사 프롬프트 작성 직전 점검할 9가지다.

1. 가사 필드에 장르·BPM 같은 메타 디스크립션이 안 섞여 있는가
2. `[Verse]`, `[Chorus]` 같은 구조 메타태그가 적어도 3~4개 적혀 있는가 (영어 대괄호)
3. Verse 한 줄 음절 8~12, Chorus 한 줄 6~10이 대체로 지켜지는가
4. ABAB 또는 AABB 같은 일관된 운율 스킴이 있는가
5. 약어·연속 자음·동음이의어 같은 발음 함정이 없는가
6. (한국어) 받침 많은 단어가 한 줄에 몰려있지 않은가
7. 후렴 1·2번은 동일, 마지막 후렴만 한두 줄 변경되어 있는가
8. 가사 총 길이가 3,000자 이내인가
9. 첫 줄이 발음하기 쉬운 단어로 시작하는가

<!-- TODO SCREENSHOT: 가사 길이 초과 시 나타나는 Suno의 경고 메시지 + 글자수 카운터 -->
이 9가지를 확인하고 생성하면, 같은 장르 프롬프트에서도 결과 품질이 크게 달라진다. 가사가 잘 잡히면 다음 단계는 장르·악기 프롬프트의 정확도이고, 그다음이 DAW 후처리다.

가사를 자동으로 생성해주는 Suno의 `Generate Lyrics` 버튼도 있지만, 자동 생성된 가사는 위 9가지 규칙을 자주 어긴다. AI가 생성한 가사를 그대로 쓰기보다는, 받아서 한 번 다듬는 것을 권한다. 다듬는 시간이 5분이면, 곡 품질 차이는 1시간을 다시 돌리는 만큼 벌어진다.

이 글에서 정리한 규칙은 어디까지나 본인이 직접 프롬프트와 가사를 입력해 만든 곡에 적용된다. 내가 쓴 가사로 합성한 곡이라면 그 결과물에 대한 개인 청취·DAW 후처리·본인 포트폴리오 활용은 정당한 워크플로우다. Suno Pro 구독자라면 무손실 WAV로 본인 창작물을 백업하는 행위 역시 명백한 권리에 속한다. 다만 타인이 만든 곡을 임의로 가져와 가사만 바꿔 재배포하거나 상업적으로 이용하는 행위는 별도 합의가 필요하고, 이 글의 작성 규칙이 그런 사용을 정당화해주지는 않는다. 본인 창작물을 더 잘 만드는 도구로 쓰는 것이 출발점이다.

저작권·상업적 사용에 대한 별도 가이드는 [AI 음악 저작권 가이드](/ko/blog/ai-music-copyright-guide)에서 다룬다. 장르·스타일 디스크립터를 어떻게 적어야 잘 잡히는지는 [AI 음악 장르 카탈로그](/ko/blog/ai-music-genre-catalog)에 정리했다. 곡이 완성되면 [SunoDown](/)에서 무손실 WAV·MP3로 전곡 일괄 다운로드할 수 있다.
