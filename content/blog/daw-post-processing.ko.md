---
schemaVersion: 1
slug: daw-post-processing
title: "Suno 곡을 DAW에서 후처리하기: EQ·컴프레서·매스터링 체크리스트"
title_en: "Post-Processing Suno Tracks in a DAW: EQ, Compression, and Mastering Checklist"
summary: "Suno에서 받은 WAV를 DAW에 올린 뒤 무엇을 해야 듣기 좋아질까. EQ·컴프·리버브·라우드니스 매칭까지 단계별 체크리스트와 4개 DAW 첫 세팅을 정리했습니다."
summary_en: "Once you have a Suno WAV in your DAW, what do you actually do? An EQ → compression → reverb → loudness checklist with first-setup notes for four DAWs."
publishedAt: 2026-06-06
ogSubtitle: "EQ · Compression · Mastering"
tags: [suno, daw, mastering]
internalLinks:
  - /
  - /ko/guide/suno-mp3-vs-wav
  - /ko/blog/suno-pro-value-analysis
---

## 후처리가 필요한 이유 — AI 마스터링의 한계

Suno에서 다운받은 WAV를 그대로 유튜브나 스포티파이에 올리면 다른 곡에 비해 작게 들리거나 답답하게 느껴진다. 이유는 단순하다. Suno의 자동 마스터링은 곡 톤을 일반적인 평균에 맞춰주지만, 라우드니스 목표·EQ 밸런스·다이내믹은 플랫폼 기준과 맞지 않다. 결과물 LUFS는 보통 -16 ~ -19 사이라 -14 LUFS 기준의 스포티파이·유튜브에서 한 단계 작게 들린다.

후처리의 목표는 세 가지로 압축된다. 첫째, 보컬과 반주의 주파수 충돌 정리. 둘째, 다이내믹을 일정하게 잡아 평균 라우드니스 끌어올리기. 셋째, 플랫폼별 라우드니스 타깃에 맞춰 마스터 출력 조정. 이 세 가지만 잡아도 같은 곡이 두 배 가까이 다르게 들린다.

이 글은 Suno WAV를 DAW에 올린 뒤 진행하는 순서를 단계별로 정리한다. WAV 가져오기 → stem 분리 옵션 → EQ → 컴프레서 → 리버브 → 라우드니스 매칭 → 자주 발생하는 문제 → 무료 플러그인 워크플로우 → 4개 DAW 첫 세팅 순이다. Ableton Live 12, Logic Pro 11, FL Studio 21, REAPER 7을 균형 있게 다룬다.

> 📸 [SCREENSHOT: Ableton Live 12 타임라인에 Suno에서 받은 WAV가 올라간 화면 — 파형과 트랙 헤더]

## WAV 가져오기와 stem 분리 옵션

먼저 MP3보다 WAV를 받는 게 후처리에 유리하다. Suno의 MP3는 최종 압축이 들어간 결과라 EQ·컴프를 강하게 걸면 아티팩트가 드러난다. 무손실 WAV는 Suno Pro에서 받을 수 있고, 자세한 차이는 [MP3 vs WAV 가이드](/ko/guide/suno-mp3-vs-wav)에서 다룬다.

DAW에 WAV를 올릴 때 샘플레이트는 44.1 kHz 또는 48 kHz로 맞춘다. Suno는 보통 44.1 kHz 16-bit로 export 되므로, DAW 프로젝트 설정도 같은 값으로 잡는 게 안전하다. 다른 샘플레이트로 임포트하면 DAW가 자동 리샘플링을 하면서 미세한 톤 변화가 생긴다.

stem 분리는 후처리 자유도를 결정한다. Suno는 자체 stems 추출 기능을 점진적으로 제공 중이고, 그 외 옵션으로 다음 세 가지가 자주 쓰인다.

- **Suno 자체 Stems** — 곡 단위로 보컬·드럼·베이스·기타 등 분리. Pro 권리 권장
- **Spleeter (오픈소스)** — Python 기반, 무료. 2-stem(보컬/반주), 4-stem, 5-stem 지원
- **LALAL.AI** — 웹 기반, 곡 단위 과금. 분리 품질이 가장 안정적

후처리 목표가 단순한 마스터링이면 분리 없이 stereo WAV 한 트랙으로 진행해도 충분하다. 다만 보컬 EQ를 따로 만지고 싶거나, 드럼만 압축을 더 걸고 싶다면 stem 분리가 필수다. 분리 후에는 각 stem을 별도 트랙에 올리고, 모든 트랙을 하나의 그룹 버스(Submix)로 묶어 마스터 체인을 거기에 건다.

## EQ — 저음 정리·중음 답답함·고음 거칠음

EQ는 후처리의 첫 단계다. Suno 곡에서 자주 발견되는 세 가지 문제와 대응을 정리했다.

**저음 정리** — 30 Hz 이하는 음악적 정보가 거의 없고 헤드룸만 잡아먹는다. High-pass 필터를 30~40 Hz에 두고 12 dB/oct slope로 잘라낸다. Logic Pro의 Channel EQ, Ableton의 EQ Eight, FL Studio의 Fruity Parametric EQ 2, REAPER의 ReaEQ 모두 동일한 동작을 한다. 보컬 stem만 따로 처리할 때는 100~120 Hz까지 high-pass를 올려도 자연스럽다.

**중음 답답함** — 200~400 Hz 대역이 뭉치면 답답하게 들린다. 이 대역을 -2 ~ -3 dB 정도 좁은 Q(1.5~2.0)로 살짝 깎는다. Suno 곡 중 R&B·록 계열에서 이 문제가 자주 보인다. 너무 많이 깎으면 곡이 비어 들리니 한 번에 -3 dB 이상은 피한다.

**고음 거칠음** — 6~9 kHz 부근에 디지털 합성 특유의 거칠음이 종종 묻어 있다. 이 대역을 -1.5 ~ -2.5 dB 살짝 내리고, 12 kHz 이상은 Air shelf로 +1 dB 미세하게 올리면 거칠지 않으면서 공기감이 살아난다. de-esser를 보컬 stem에 따로 걸면 효과가 더 깔끔하다.

마스터 트랙 EQ에서는 변화를 1.5 dB 안에서 끝내는 게 안전하다. 마스터 EQ를 강하게 쓰면 곡 전체 톤이 비현실적으로 바뀐다. 큰 EQ는 stem 단계에서, 마스터에서는 미세 조정만.

> 📸 [SCREENSHOT: Logic Pro Channel EQ 화면 — high-pass 30 Hz, 300 Hz -2 dB, 12 kHz Air shelf +1 dB 커브]

## 컴프레서 — 보컬 다이내믹 조절

컴프레서는 큰 부분을 누르고 작은 부분을 끌어올려 평균 라우드니스를 확보한다. Suno 곡에서 컴프가 가장 절실한 자리는 보컬이다. AI 보컬은 구간마다 다이내믹 차이가 크고, 후렴 첫 음이 튀거나 verse 끝 음이 묻히는 경우가 잦다.

보컬 stem 컴프 권장 세팅은 다음과 같다.

- **Threshold** — 보컬 평균이 -18 dB 부근이면 threshold를 -16 dB 근처에 두고 시작
- **Ratio** — 3:1 ~ 4:1
- **Attack** — 5~10 ms (자음 어택은 살리되 모음에서 잡힘)
- **Release** — 80~150 ms (글자 사이 자연 호흡)
- **Gain reduction 목표** — 평균 -3 ~ -5 dB

Ableton Live의 Compressor, Logic Pro의 Compressor(VCA 모드), FL Studio의 Fruity Limiter(컴프 모드), REAPER의 ReaComp 모두 위 세팅으로 시작하면 무난하다. 후처리에 익숙해지면 attack을 자음 종류에 맞춰 미세 조정한다.

반주·드럼 그룹 버스에는 좀 더 가벼운 컴프를 건다. Ableton Live의 Glue Compressor가 대표적이고, threshold는 평균 -18 dB 부근에 두고 ratio 2:1, attack 10 ms, release auto로 설정한다. Gain reduction은 -2 ~ -3 dB 정도면 충분하다. Logic의 Compressor에는 "Platinum Digital" 또는 "Classic VCA" 모드가 비슷한 역할을 한다.

마스터 버스에는 글루 컴프 하나만 가볍게 건다. Threshold를 평균 -14 dB 부근, ratio 1.5:1 ~ 2:1, gain reduction -1 ~ -2 dB. 마스터에서 컴프를 강하게 걸면 펌핑이 생기므로 약하게.

> 📸 [SCREENSHOT: Ableton Live 12 Glue Compressor 세팅 — Threshold -18 dB, Ratio 2:1, Attack 10 ms]

## 리버브와 딜레이 — 공간감 추가

Suno 곡은 자체 리버브가 일정량 들어가 있어, DAW에서 리버브를 또 많이 걸면 공간이 뭉친다. 후처리 리버브는 보컬·솔로 악기 stem에 짧고 가볍게만 추가한다.

보컬에 자주 쓰는 리버브 세팅은 Plate Reverb 또는 짧은 Hall 계열이다.

- **Decay time** — 1.0 ~ 1.5초
- **Pre-delay** — 20 ~ 40 ms (보컬 자체 명료도 확보)
- **Wet level** — -20 ~ -16 dB (드러나지 않는 정도)
- **EQ on reverb send** — 200 Hz 이하 high-pass로 저음 누적 차단

Logic Pro의 ChromaVerb, Ableton의 Hybrid Reverb, FL Studio의 Fruity Reeverb 2, REAPER의 ReaVerbate 모두 위 범위에서 시작한다. 송 트랙(send return)으로 처리해 같은 리버브를 여러 stem이 공유하면 공간감이 통일된다.

딜레이는 보컬 후렴 마지막 단어 또는 특정 라인 끝에 ping-pong 으로 짧게(8th note dotted) 한 번씩 들어가는 게 자연스럽다. 곡 전체에 깔지 않는다.

## 라우드니스 매칭 — 플랫폼별 LUFS 타깃

각 음원 플랫폼은 자체 라우드니스 정규화를 한다. 곡 마스터링 LUFS가 플랫폼 타깃보다 너무 크면 자동으로 낮춰져 다이내믹만 손해 보고, 너무 작으면 옆 곡보다 작게 들린다.

플랫폼별 정규화 타깃은 다음과 같다.

- **Spotify** — 통합 -14 LUFS
- **Apple Music** — -16 LUFS (Sound Check 기준)
- **YouTube** — -14 LUFS
- **Tidal** — -14 LUFS
- **방송용 (EBU R128)** — -23 LUFS
- **인스타그램/틱톡 쇼트폼** — -14 LUFS 부근

가장 보편적인 타깃은 -14 LUFS다. Suno 곡 마스터링을 이 값으로 맞추면 스포티파이·유튜브·틱톡에서 평균 라우드니스가 다른 곡과 비슷해진다. Apple Music 전용 마스터를 따로 만들려면 -16 LUFS 별도 버전을 export 한다.

라우드니스 측정은 무료 미터로 충분하다. Youlean Loudness Meter 2 무료 버전, TBProAudio dpMeter5 무료, Waves WLM Plus(유료) 모두 통합 LUFS·트루 피크를 표시한다. Integrated LUFS가 -14 ± 0.5 안에 들어오고 True Peak가 -1.0 dBTP 이하면 안전하다.

마스터 체인 끝에 리미터(Maximizer)를 둔다. Ceiling을 -1.0 dBTP, threshold를 -10 ~ -8 dB 부근에 두고, gain reduction이 평균 -3 dB 안에서 머물도록 input gain을 조정한다. Logic Pro의 Adaptive Limiter, Ableton의 Limiter, FL Studio의 Fruity Limiter, REAPER의 ReaLimit 모두 충분한 성능을 낸다. iZotope Ozone 11(유료) 같은 전용 마스터링 스위트를 쓰면 LUFS 자동 매칭이 더 편하다.

> 📸 [SCREENSHOT: Youlean Loudness Meter 2 화면 — Integrated -14.0 LUFS, True Peak -1.0 dBTP 도달]

## 자주 발생하는 문제 — 위상·클리핑·사이드체인

후처리 도중 마주치는 세 가지 문제와 해결법을 정리했다.

**위상 문제** — stem 분리 후 보컬과 반주를 동시 재생할 때 특정 대역이 빠지면 위상이 어긋난 경우다. 보컬 stem 채널 인스펙터에서 위상 반전(Phase invert) 버튼을 눌러 비교한다. 차이가 크게 들리는 쪽이 정상. Logic Pro는 Gain 플러그인의 Phase Invert L/R, Ableton은 Utility의 Phase 버튼, REAPER는 트랙 헤더의 위상 버튼으로 처리한다.

**클리핑** — True Peak가 0 dBTP를 넘으면 일부 플랫폼에서 디지털 왜곡이 들린다. 마스터 리미터의 ceiling을 -1.0 dBTP로 고정하고, 그 이상 올리지 않는다. 디더링은 24-bit → 16-bit로 변환할 때만 적용하고, 24-bit로 export 할 거면 디더링 없이.

**사이드체인 펌핑** — 마스터 컴프 release가 짧으면 킥에 맞춰 곡 전체가 펌핑한다. Release를 100 ms 이상으로 늘리거나, auto release 모드로 바꾼다. 의도적으로 펌핑을 만들고 싶을 때만 짧은 release(30~50 ms)를 쓴다.

## 라이트 워크플로우 — 무료 플러그인만으로 90% 달성

유료 플러그인 없이 무료 도구만으로도 후처리 90%는 가능하다. 카테고리별 추천 무료 플러그인은 다음과 같다.

- **EQ** — TDR Nova, ReaPlugs ReaEQ, MEqualizer
- **컴프레서** — TDR Kotelnikov GE 무료, Klanghelm MJUC jr, ReaComp
- **리미터** — LoudMax, ReaLimit, Youlean Loudness Meter(측정용)
- **리버브** — Valhalla Supermassive 무료, OrilRiver, ReaVerbate
- **딜레이** — Valhalla Freq Echo 무료, ReaDelay
- **De-esser** — TDR Nova(다중 밴드 컴프 활용)
- **분석 미터** — Youlean Loudness Meter 2 무료, SPAN

위 6~7개만 갖춰도 보컬 EQ → 컴프 → 리버브 → 마스터 EQ → 글루 컴프 → 리미터 → LUFS 측정 체인이 완성된다. 후처리에 익숙해진 다음 FabFilter Pro-Q 4, Pro-C 2, iZotope Ozone 11 같은 유료 옵션으로 천천히 옮겨가도 늦지 않다. Suno Pro 구독 가치 분석은 [Suno Pro 가치 분석](/ko/blog/suno-pro-value-analysis)에서 따로 다룬다.

## DAW별 첫 세팅 — Ableton / Logic / FL Studio / REAPER

DAW마다 동일한 작업을 다른 메뉴 경로로 처리한다. 첫 세팅 안내를 4개 DAW로 정리했다.

**Ableton Live 12**

1. 새 프로젝트 → File → New Live Set → 샘플레이트 44.1 kHz, 24-bit (Preferences → Audio)
2. Suno WAV 드래그 → 오디오 트랙에 자동 배치
3. EQ Eight → 30 Hz high-pass, 300 Hz -2 dB
4. Compressor(VCA 모드) → Threshold -16, Ratio 3:1
5. 마스터에 Glue Compressor → Threshold -18, Ratio 2:1
6. 마스터 끝에 Limiter → Ceiling -1.0 dB
7. Loudness Meter 2 무료 플러그인을 마스터에 인서트해 LUFS 측정

**Logic Pro 11**

1. 새 프로젝트 → File → New → Empty Project → 샘플레이트 44.1 kHz (Project Settings → Audio)
2. Suno WAV 드래그 → 새 오디오 트랙
3. Channel EQ → Low Cut 30 Hz, 300 Hz -2 dB, 12 kHz Air shelf +1 dB
4. Compressor(VCA 모드) → Threshold -16, Ratio 3:1
5. 마스터(Stereo Out)에 Compressor → Threshold -14, Ratio 2:1
6. 마스터 끝에 Adaptive Limiter → Output -1.0 dB
7. Logic의 Loudness Meter 내장 사용 (Multimeter)

**FL Studio 21**

1. 새 프로젝트 → File → New → 샘플레이트는 Options → Audio Settings에서
2. Suno WAV를 Sampler/Audio Clip 채널로 → Mixer에 라우팅
3. Fruity Parametric EQ 2 → 30 Hz high-pass, 300 Hz -2 dB
4. Fruity Limiter(컴프 모드) → Threshold -16, Ratio 3:1
5. Master 인서트에 Fruity Limiter(컴프 모드) 추가 → Threshold -14, Ratio 2:1
6. Master 끝에 Fruity Limiter(리미터 모드) → Ceiling -1.0 dB
7. Youlean Loudness Meter 2 무료를 Master에 추가

**REAPER 7**

1. 새 프로젝트 → File → New project → Project Settings에서 샘플레이트 44.1 kHz
2. Suno WAV 드래그 → 새 트랙 자동 생성
3. ReaEQ → Band 1 high-pass 30 Hz, Band 2 300 Hz -2 dB
4. ReaComp → Threshold -16, Ratio 3:1
5. 마스터 트랙(View → Master Track)에 ReaComp → Threshold -14, Ratio 2:1
6. 마스터 끝에 ReaLimit → Ceiling -1.0 dB
7. Youlean Loudness Meter 2 무료를 마스터에 인서트

네 DAW 모두 동일한 시그널 체인을 구현한다. 처음에는 세 가지 dB 값(threshold -16 / -14, ceiling -1.0)만 외워도 충분하다. 익숙해진 다음 stem 분리와 송 트랙 리버브로 넘어간다.

> 📸 [SCREENSHOT: REAPER 7의 마스터 트랙 FX 체인 — ReaEQ → ReaComp → ReaLimit → Loudness Meter 순서]

## 빠른 후처리 체크리스트

작업 마지막에 한 번 훑어볼 9개 항목이다.

1. WAV 24-bit 44.1 kHz 또는 48 kHz로 임포트 했는가
2. 마스터 High-pass 30 Hz로 저음 청소 했는가
3. 보컬 EQ에서 200~400 Hz 답답함 -2 ~ -3 dB 정리 했는가
4. 보컬 컴프 평균 gain reduction -3 ~ -5 dB 범위인가
5. 마스터 글루 컴프 gain reduction -1 ~ -2 dB 안인가
6. 리버브 wet level -20 ~ -16 dB 안에 묻혀 있는가
7. Integrated LUFS -14 ± 0.5 안인가 (Apple용은 -16)
8. True Peak -1.0 dBTP 이하인가
9. Export 포맷이 플랫폼 요구 사양(WAV 24-bit 또는 16-bit) 인가

이 9가지를 매번 확인하면 곡 단위 품질 편차가 크게 줄어든다. 후처리에 들이는 시간은 곡당 30분~1시간이 보통이고, 워크플로우에 익숙해지면 20분 안에 끝난다. 곡이 완성되면 [SunoDown](/)에서 받은 다른 WAV에도 같은 마스터 체인 프리셋을 그대로 재사용할 수 있다.

후처리는 한번에 완벽해지지 않는다. 한 곡을 끝낸 다음 같은 체인을 다음 곡에 적용하고, 차이가 보이는 부분만 미세 조정하는 식으로 반복한다. 이 글의 체크리스트와 4개 DAW 첫 세팅을 출발점으로 두고, 본인 장르에 맞춰 EQ 곡선과 컴프 비율을 점차 다듬어 가면 된다.
