# SunoDown 백링크 론칭 킷

**목표**: suno-down.com의 첫 백링크와 신뢰 신호 확보  
**전략**: 스팸 회피 + 진정한 도움 제공 + 자연스러운 링크 획득  
**언어**: 한국어 전략 + 영어 포스트 드래프트 (Reddit/Discord/Product Hunt 영어권 커뮤니티)

---

## 1. 전략 원칙: 스팸이 아니려면

### 1.1 왜 순수 자가 홍보는 실패하는가

Reddit과 Discord에서 "우리 도구를 써보세요" 포스트는:
- **즉시 다운보트** 또는 **삭제**(mod action)
- **계정 제한** 또는 **밴**
- **신뢰도 0** → 나머지 포스트도 의심받음
- 백링크 이득 없음 (삭제된 포스트는 인덱싱 안 됨)

### 1.2 신뢰를 이기는 규칙: "도움이 먼저, 언급은 나중"

**핵심 원칙**:
1. **정답을 먼저**: 사용자의 실제 질문에 솔직하고 유용한 답변을 제공한다.
2. **자연스러운 연결**: 그 답변이 SunoDown을 사용하면 더 쉬워진다면, *그때만* 가볍게 언급.
3. **선택지 제시**: "이 도구도 있어"가 아니라 "당신 상황에서는 이런 방법들이 있는데, 하나는..."
4. **투명성**: "저는 이 도구를 만들었지만..." → 신뢰도 상승.
5. **스팸 비율 회피**: 한 번 도움 → 한 번 자가 언급. 그 비율을 2:1 이상으로.

### 1.3 계정 신뢰도 먼저 구축하기

**Reddit**:
- r/SunoAI 가입 후 최소 1-2주 관찰 기간
- 자기 도구와 무관한 댓글 5-10개로 karma 쌓기
- 구독자 게시물에 성실한 답변 → "아, 이 계정은 스팸이 아니네" 신호
- 계정 나이 2주+ 권장 (신규 계정 포스트는 자동 suspicion)

**Discord**:
- 며칠 관찰 후 일반 질문/토론에 참여
- 도움이 되는 답변 몇 개 먼저
- 그 후에 문제 해결로 자신의 도구 언급

### 1.4 각 플랫폼 규칙 읽기 (필수!)

**Reddit r/SunoAI**:
- 서브 규칙 1순위: 자기 홍보는 총 포스트의 10% 이하
- mod 명시: "자기 프로젝트 링크는 댓글로만, 별도 스팸 포스트 금지"
- 신고 시 즉시 답변 → mod 인상 좋음

**Discord (공식 Suno 서버 가정)**:
- #help, #questions 채널 ○ / #general, #announcements ✗
- 명확한 도움 요청에만 응답
- DM으로 링크 전달 금지 (스팸으로 보임)
- 채널 분위기 관찰 후 첫 메시지

### 1.5 메시징 원칙: "당신의 데이터, 당신의 선택"

모든 포스트와 댓글에서 이 프레이밍 유지:
- **"AI 생성 음악을 로컬에 백업하고 싶어" → SunoDown은 그걸 도와준다**
- **"Pro 계정을 들었는데 WAV를 받고 싶어" → Suno의 로컬 WAV 다운로드 자격을 활용**
- **"내 플레이리스트 통째로 다운로드" → 개인 아카이브 목적**

**피해야 할 프레이밍**:
- "Suno 음악을 무료로 다운로드" ← 도둑질처럼 들림
- "Suno API 우회" ← 기술적 불법 냄새
- "고화질로 받아내기" ← 해킹 냄새

→ 항상 "당신 자신의 콘텐츠, 당신의 권리" 각도에서

---

## 2. Reddit 전략 & 드래프트

### 2.1 목표 서브레딧

**주요 (높은 우선순위)**:
- **r/SunoAI** — 가장 직접적, Suno 사용자 다수, 활발한 질문

**부 (낮은 우선순위, 규칙 엄격함)**:
- **r/aimusic** — AI 음악 일반, SunoDown이 너무 직접적 링크면 거절
- **r/WeAreTheMusicMakers** — 음악 제작자, 하지만 상업 링크에 민감
- **r/PromptEngineering** — Suno 프롬프트 토론 시에만, 드물게

### 2.2 Reddit 댓글 드래프트 4개

각 드래프트는 **실제 r/SunoAI에서 자주 나오는 질문에 대한 답변**:

---

#### 드래프트 A: "어떻게 Suno 노래를 다운로드해?"

**상황**: 누군가 "I made this song in Suno but can't download it as a file" 또는 "How do I get my songs off Suno?" 질문 시

```
There are a couple of ways depending on what you need:

1. **Right-click download (basic)** — Suno lets you right-click the song 
   in your library and save as MP3. It's the built-in method, but it's slow 
   if you have a lot of songs.

2. **Bulk download tool** — If you have a whole playlist you want to back up, 
   tools like SunoDown can batch-download everything at once (MP3 + ZIP). 
   Just paste your playlist URL and go. Saves a lot of time if you've got 
   50+ songs.

3. **Pro WAV export** — If you're a Suno Pro subscriber and want lossless WAV 
   (better for further production), that's available through your Pro account 
   or the export option.

Which format/scale are you after? That'll help narrow it down.
```

**Why it works**:
- 3 options 제시 (SunoDown만 강조 안 함)
- Pro subscriber 고려 (도덕적 포지션)
- 자연스러운 질문으로 끝남 (대화 유도)
- 스팸 냄새 없음

---

#### 드래프트 B: "Suno Pro WAV는 어디서 다운로드?"

**상황**: "I'm a Suno Pro subscriber but can't find where to download WAV files" 또는 "어디서 Suno Pro WAV를 받지?"

```
Good news — it's built into Suno! Here's the flow:

1. Go to suno.com, find your song
2. Click the three-dot menu → "Download" or "Export"
3. You should see WAV option (Pro only)
4. If the export isn't working or is slow, some people use a playlist backup 
   tool (like SunoDown) to convert Suno Pro credentials → bulk WAV export. 
   It's helpful if you're trying to save 100+ songs at once.

If you're not seeing the WAV option, might be account/subscription sync lag. 
Try logout + login or contact Suno support.

Let me know if it shows up!
```

**Why it works**:
- Suno's official process 먼저
- SunoDown은 "alternative" or "bulk" 용도로만 언급
- Pro 자격 존중
- Transparency (저는 SunoDown 관계자) 추가 옵션:

```
(If you want to add transparency later in reply:)
"By the way, I built SunoDown, so full disclosure — but the official 
Suno export is always the easiest. Our tool mainly helps if you're doing 
bulk archiving."
```

---

#### 드래프트 C: "전체 플레이리스트 다운로드"

**상황**: "Can I download an entire Suno playlist at once?" 또는 "How to back up my whole Suno library?"

```
Not directly through Suno (as of now), but here's what works:

**Manual**: Download one by one from Suno → takes forever with a big library.

**Bulk tool**: SunoDown (disclaimer: I made this) lets you paste a Suno 
playlist URL → downloads all songs in bulk as MP3 or ZIP. Takes 2-3 min 
for 100 songs instead of an hour of clicking. Free and no account needed 
for MP3; Pro cookie for WAV if you want lossless.

**Why you'd want it**: 
- Personal backup (cloud goes down, account compromised, etc.)
- Offline listening
- Future-proof your creations (keep them locally)

If you want the official Suno way, they're working on better export, but 
for now, batch tools are the fastest option.

Lmk if you want step-by-step!
```

**Why it works**:
- Pain point 명확히 (시간 낭비)
- 솔직한 공개 (I made this)
- 정당한 이유 제시 (backup, offline, ownership)
- Pro를 optional로 (압박 아님)

---

#### 드래프트 D: "곡을 다시 렌더링하지 않고 WAV로?"

**상황**: "Do I need to regenerate my song to get it in WAV?" 또는 "Can I convert my MP3 to WAV?"

```
Nope, you don't need to regenerate!

**If you're a Pro subscriber**: 
- Your MP3 songs are already available as WAV in your account.
- Go to song → Download/Export → WAV option
- If you don't see it, wait a few minutes (Suno's system processes)

**If you're Free tier**:
- Suno only gives MP3 to Free users. Converting MP3 → WAV later 
  (via an audio editor) doesn't help — you'd lose quality (MP3 is 
  already compressed).
- Upgrading to Pro is the real solution if lossless matters to you.

**Backup tool angle**: If you're a Pro subscriber with lots of songs, 
tools like SunoDown can batch-fetch all your WAVs at once (with your 
Pro session) instead of the slow web interface.

Does that clear it up?
```

**Why it works**:
- Technical accuracy 먼저
- Free vs Pro 구분 명확
- SunoDown은 "convenience" (convenience, not necessity)
- 신뢰 증가

---

### 2.3 Reddit 독립 포스트 드래프트 1개

**사용 시점**: 충분한 karma + 계정 나이 2주+ 후, 한 번만 (self-promotion 비율 주의)

**제목**:
```
A simple guide: Backing up your Suno music library locally
```

**본문**:

```
I've built up ~200 songs in Suno over the last few months, and realized 
I was 100% dependent on Suno's cloud for access. That felt risky — 
cloud goes down, account hacked, company pivot, etc. So I wrote a 
guide on how to back up your library locally.

[Link to guide or medium post, or just text it below]

## Why back up?

- **Ownership**: You created it. Keep a copy.
- **Offline access**: Listen without internet.
- **Peace of mind**: Suno's cloud isn't guaranteed forever.
- **Lossless**: If you're Pro, WAV export gives you better quality 
  than streaming MP3s.

## How (the easy way)

1. Get your Suno library URL (your profile page)
2. Use a bulk download tool (like SunoDown — full disclosure, I made it) 
   to grab your whole library as ZIP
3. Store locally or in your own cloud (Dropbox, Google Drive, etc.)
4. Done.

## For Pro users: WAV export

If you're a Suno Pro subscriber, you can export each song as lossless WAV 
instead of MP3. Same backup tool can batch this for you — just plug in 
your Pro session.

## Tools that help

- **Suno's official export**: Built-in, but one-at-a-time
- **Batch tools**: SunoDown, [others if they exist] — all at once
- **Your own archiving**: Download the ZIP, keep it safe

The point isn't which tool; it's that you *should* back up. Your music 
is valuable.

---

Questions? Happy to walk through it. And if you've got a better method, 
drop it in the comments — always happy to learn.
```

**Why it works**:
- 질문이 아니라 **가치 제시**
- 저자의 honest motivation ("I realized")
- SunoDown은 footnote이지 주인공이 아님
- Pro와 Free 모두 포함
- "Questions? Comments?" → 커뮤니티 대화
- 자연스러운 링크 (제목에 없음, 본문에만)

**Launch 후 이 포스트 타이밍**:
- r/SunoAI에서 최소 10-15개 helpful comments 후
- 계정 나이 3-4주+ 후
- 월요일-목요일 오전 (UTC-5 기준, US 동부 시간)

---

### 2.4 Reddit 실행 체크리스트

| 액션 | 상태 | 날짜 | 결과 |
|------|------|------|------|
| r/SunoAI 가입 | ☐ | | |
| 2주 관찰, 무관한 댓글 5-10개 작성 | ☐ | | |
| 드래프트 A (bulk download) 댓글 | ☐ | | 결과 URL |
| 드래프트 B (WAV 다운로드) 댓글 | ☐ | | 결과 URL |
| 드래프트 C (전체 플레이리스트) 댓글 | ☐ | | 결과 URL |
| 드래프트 D (MP3 vs WAV) 댓글 | ☐ | | 결과 URL |
| 포스트 드래프트 (가이드) 게시 | ☐ | | 결과 URL |
| r/aimusic 댓글 (신중함) | ☐ | | 결과 URL |

---

## 3. Suno Discord 전략 & 드래프트

### 3.1 채널 선택 (중요)

**✓ 적절한 채널**:
- `#help` — 기술 문제 & 사용법
- `#questions` — 기능 설명
- `#feedback` — 기능 요청 (backup 언급 자연스러움)

**✗ 피해야 할 채널**:
- `#general` — 프로모션 채널 아님
- `#announcements` — 공식만
- `#off-topic` — 스팸처럼 보임

### 3.2 Discord 메시지 드래프트 2개

각 메시지는 **짧고 casual하면서 도움이 주 목표**:

---

#### 드래프트 A: "다운로드 방법?"

**상황**: 누군가 `#help`에서 "How do I download my songs?" 물었을 때

```
A few ways:

1. **Right-click your song** → Download in Suno (official, safest)
2. **Bulk if you have lots** → A bunch of people use batch tools 
   like SunoDown to grab whole playlists at once as ZIP
3. **Pro WAV export** → If you're Pro, the WAV export gives you 
   lossless quality

What's your situation — just a few songs or a whole library?
```

**Why it works**:
- 짧음 (Discord는 wall-of-text 싫어함)
- 2개 이상 옵션
- 자연스러운 질문으로 끝남
- 도움이 먼저

---

#### 드래프트 B: "WAV로 변환하려면?"

**상황**: `#help`에서 "Can I export my songs as WAV?" 물었을 때

```
If you're on **Pro**, WAV is in your account → just download from Suno.

If you're **Free**, Suno only offers MP3. You can't convert MP3→WAV 
later without quality loss.

Pro subscribers: If you've got a big library and downloading one-by-one 
is slow, some people batch-fetch using tools (Pro session + bulk tool). 
But the official Suno export is always the baseline.

Are you Pro or Free tier?
```

**Why it works**:
- Pro/Free 구분 명확
- SunoDown은 "some people use" (가볍게)
- 기술적 정확 (MP3 변환 불가)
- 대화 유도

---

### 3.3 Discord 에티켓 노트

- **DM으로 링크 전달 금지** — 스팸으로 보이고 report당함
- **한 번만 응답** — 같은 문제에 또 물으면 DM 제안 "Check your DMs" 하되, 공개 채널에 링크 다시 안 붙임
- **Emoji 사용** — ✓ 도움이 되면 thumbs_up 반응 하면 활동 신호
- **모드 친절함** — Suno 공식 Discord라면 mod가 strict하지 않은 편 (도움 댓글은 허용)

### 3.4 Discord 실행 체크리스트

| 액션 | 상태 | 날짜 | 결과 |
|------|------|------|------|
| Suno 공식 Discord 가입 | ☐ | | |
| 며칠 관찰, 일반 대화 참여 | ☐ | | |
| 드래프트 A (다운로드) 메시지 | ☐ | | |
| 드래프트 B (WAV) 메시지 | ☐ | | |

---

## 4. Product Hunt 론칭 전략

### 4.1 왜 중요한가

- **일회성 이벤트** — 한 번 launch → 많은 트래픽 + 백링크 1개
- **높은 DA 사이트** — Product Hunt 자체의 신뢰도가 높음
- **Maker 커뮤니티** — 개발자/크리에이터 많음 → 신뢰할 가능성 ↑

### 4.2 준비물

Product Hunt 에 post하기 전에 준비할 것:

**1. 계정 설정**
- PH 계정 생성 (real name, real photo)
- 이전 활동이 있으면 더 신뢰받음 (다른 제품에 thoughtful comment 5-10개)
- 신규 계정도 괜찮지만, 준비 기간 1주일 권장

**2. 제품 정보**
```
프로덕트 이름: SunoDown
태그 (3-5개): Music, Backup, AI, Productivity, Utilities
카테고리: Productivity 또는 Music
```

**3. 썸네일 & 이미지 에셋**
- **로고** — 1200x630px (og:image)
- **스크린샷** — 3-5개 (다운로드 과정, 곡 목록, ZIP 결과)
- **갤러리 비디오** — 30초 데모 (선택, 하지만 있으면 engagement ↑)

---

### 4.3 Product Hunt 메인 설명 드래프트

**제목 (max ~60자)**:
```
SunoDown — Backup your Suno music library locally
```

**태그라인 (한 문장, ~80자)**:
```
Free bulk download of your Suno playlist as MP3 or WAV (no sign-up)
```

**설명 (Product Hunt 메인 설명, 2-3 문단)**:

```
We love Suno, but our music lives only on their cloud. 
Not anymore.

SunoDown lets you download your entire Suno playlist in one click — 
as MP3 (free, no account needed) or WAV (Suno Pro). Paste your 
playlist URL, click download, get a ZIP with all your songs. 
It's backup done right.

Why it matters:
- Own your music locally — no cloud dependency
- Offline listening — listen anywhere
- Lossless quality — if you're Pro, WAV export gives you studio-ready files
- Privacy — your data, your device, no tracking

100% free, no sign-up needed for MP3. For WAV, just plug in your 
Suno Pro session (same as you'd use in Suno).

Made by [your name], a Suno user and music producer frustrated with 
cloud-only workflows.
```

---

### 4.4 "Maker's First Comment" (매우 중요)

**타이밍**: 론칭 후 5-10분 내에 post ("Be the first to comment")  
**목적**: 당신의 스토리 + 투명성 + 신뢰 구축

**드래프트**:

```
Hey! [Your name] here, maker of SunoDown.

I built this because I hit a wall: I'd created ~150 songs in Suno 
(over 5 months), and realized they all lived only on Suno's servers. 
No local backup, no peace of mind if the account got hacked or 
company pivoted. 

As a music producer, I wanted lossless WAV for archive + further 
production. But Suno's export is one-at-a-time. That's... not great 
when you've got 100+ songs.

So I built SunoDown: drop your playlist URL → get everything as ZIP 
in 2 minutes. MP3 is free. If you're Pro and want WAV, just add your 
session.

A few notes:
- This respects your rights. You're backing up your own creations.
- Suno Pro gets WAV lossless quality → important for anyone making music seriously.
- No tracking, no nonsense. Just download and keep it locally.

Questions? I'm here all day. Excited to get feedback from the community.

Happy creating!
```

**Why it works**:
- Personal story (emotional + credible)
- Problem statement (relatable)
- Solution explanation (clear)
- Ethical framing (respects rights)
- Open invitation (engagement)

---

### 4.5 Product Hunt 론칭 체크리스트

| 액션 | 상태 | 날짜 | 노트 |
|------|------|------|------|
| PH 계정 생성 | ☐ | | |
| 미리 5-10개 thoughtful comment 작성 | ☐ | | 신뢰도 높이기 |
| 제품 썸네일 (1200x630) 준비 | ☐ | | |
| 스크린샷 3-5개 준비 | ☐ | | |
| 30초 데모 비디오 (선택) | ☐ | | |
| 타이틀 최종 확정 | ☐ | | |
| 태그라인 최종 확정 | ☐ | | |
| 설명 텍스트 최종 확정 | ☐ | | |
| 메이커 첫 댓글 준비 | ☐ | | |
| **론칭** | ☐ | | 최적 시간: 화요일-목요일 오전 10am PT |
| 첫 1시간: 댓글 모니터링 | ☐ | | |
| 질문 즉시 답변 | ☐ | | |
| 일 종일 available | ☐ | | PH는 처음 6시간이 중요 |
| 결과 분석 (영향도) | ☐ | | |

---

## 5. 기타 무료 백링크 기회

한 줄씩, 우선순위 순:

1. **BuiltWith / Crunchbase** — 자동으로 기술 스택 스캔하지만, manual submission으로 더 빠름
2. **Quora (Q&A)** — "How to download Suno music?" 답변에 SunoDown 링크 + 투명성
3. **GitHub (public repo)** — 프론트엔드/백엔드 구현 공개하면 developer trust signal
4. **Indie Hackers** — 커뮤니티에 제품 공유 (제작 과정 스토리 + 피드백 수집)
5. **AlternativeTo** — "Alternatives to Suno cloud download" 카테고리
6. **YouTube (short how-to)** — "How to backup your Suno library" 5-10분 영상 → suno-down.com 링크
7. **Medium (blog post)** — 자세한 가이드 → SEO 고도화 + backlink
8. **Tech directories** — Product Catalyst, BetaList, Hacker News (Show HN 태그)

---

## 6. 메시지 일관성: 핵심 프레이밍

**모든 포스트/댓글에서 꼭 지킬 것**:

### 정당한 사용 사례
- ✓ "내가 만든 Suno 곡을 로컬에 백업하고 싶어"
- ✓ "Pro 구독 WAV를 얻고 싶어"
- ✓ "내 플레이리스트 통째로 보관하고 싶어"
- ✓ "오프라인에서 내 음악을 듣고 싶어"

### 피해야 할 메시징
- ✗ "누군가 Suno 음악을 free로 훔쳐받기"
- ✗ "Suno를 뚫고 쓰기" or "우회하기"
- ✗ "저작권 없이 음악 받기"
- ✗ "Suno Pro 없이 WAV 얻기"

### 투명성 문구 (선택적이지만 효과적)
```
"By the way, I built SunoDown, so full disclosure — but the best 
solution always starts with Suno's official tools first."
```

→ 신뢰도 ↑, 스팸 냄새 ↓

---

## 7. 실행 일정 & 우선순위

### Phase 1: 준비 (1주)
- Reddit r/SunoAI 가입 + 관찰
- Discord Suno 가입 + 관찰
- Product Hunt 계정 준비 (thoughtful comments 작성)
- 에셋 (썸네일, 스크린샷) 준비

### Phase 2: Reddit 댓글 (2-3주)
- 무관한 댓글 5-10개로 karma 쌓기
- 드래프트 A, B, C, D를 자연스러운 질문에 응답
- 포스트 드래프트 준비 (markdown)

### Phase 3: Product Hunt 론칭 (3-4주)
- 일정: 월 또는 화-목 선택 (US 동부 시간 오전 10시 최고조)
- 론칭 즉시 maker's first comment 게시
- 첫 6시간: 댓글 모니터링 & 즉시 응답
- 투표 부탁 → 가족, 친구, 온라인 커뮤니티 (transparent하게)

### Phase 4: Discord + 추가 채널 (2주 동안 분산)
- Discord #help, #feedback에서 질문 응답
- Quora 답변 작성
- GitHub repo 공개 (있다면)
- Medium 블로그 포스트

### Phase 5: Reddit 포스트 (4-5주 후)
- 충분한 karma + 도움 평판 쌓은 후
- 독립 포스트 (가이드) 1개 게시
- 이후 자가 홍보 금지 (비율 지키기)

---

## 8. 추적 & 성과 측정

### 8.1 백링크 추적 테이블

| 플랫폼 | 액션 | 상태 | 링크 URL | 게시일 | DA | 상태 |
|--------|------|------|---------|--------|----|----|
| Reddit r/SunoAI | 댓글 A | ☐ | | | | |
| Reddit r/SunoAI | 댓글 B | ☐ | | | | |
| Reddit r/SunoAI | 댓글 C | ☐ | | | | |
| Reddit r/SunoAI | 댓글 D | ☐ | | | | |
| Reddit r/SunoAI | 포스트 | ☐ | | | | |
| Product Hunt | 론칭 | ☐ | | | High | |
| Discord | 메시지 A | ☐ | | | Low | |
| Discord | 메시지 B | ☐ | | | Low | |
| Quora | 답변 | ☐ | | | High | |
| GitHub | repo link | ☐ | | | High | |
| Medium | 블로그 | ☐ | | | Medium | |
| YouTube | 영상 | ☐ | | | Medium | |

### 8.2 성공 지표

**1주 후**:
- Product Hunt: 100+ upvotes 목표
- Reddit: 20+ upvotes/댓글 on helpful comments
- 트래픽: 초기 500-1000 방문자 (PH + Reddit)

**1개월 후**:
- 백링크 5-10개 (Reddit, PH, 기타)
- 도메인 authority 신호 (Google Search Console: links 섹션)
- 월간 기본 트래픽: 1000-5000 방문자

**3개월 후**:
- 백링크 10-20개 (자연스러운 언급 + 커뮤니티)
- SEO 개선: "Suno download" 등 주요 키워드 top 50 진입
- 반복 사용자 5-10% (로컬 스토리지 기반)

---

## 9. 피하면 안 되는 실수

| 실수 | 결과 | 예방 |
|------|------|------|
| 신규 계정으로 즉시 자가 홍보 | 즉시 ban | 2주 관찰 + 도움 댓글 먼저 |
| "무료 Suno 음악 다운로드" 메시징 | 스팸/도둑질 냄새 | "내 콘텐츠 백업" 프레이밍 |
| Reddit 동일 댓글 복붙 | spam 플래그 | 각 상황에 맞게 수정 |
| Discord DM 링크 전달 | 계정 제한 | 채널 댓글만 + 자연스럽게 |
| Product Hunt "Please upvote!" | downvote + 신뢰도 ↓ | 좋은 제품이면 자연스레 올라옴 |
| 투명성 없이 "내 도구" 숨기기 | 적발 시 신뢰도 완전 붕괴 | 처음부터 "I made this" 명시 |
| 과도한 자가 홍보 (비율 깨기) | sub/discord 영구 ban | 도움 5 : 홍보 1 비율 유지 |

---

## 10. 팀플레이 (선택): 확대

만약 trusted friends가 있으면:

- **자연스러운 endorsement** — 친구가 organic 댓글 ("I used this, works great") → 신뢰도 ↑
- **Reddit 다른 서브** — 친구가 r/aimusic에서, 당신은 r/SunoAI에서 (같은 댓글 아님)
- **Discord 다른 서버** — Music production, AI, etc. (단, 규칙 확인)

**주의**: 조직된 vote brigading이나 fake upvoting은 금지 (ban risk 높음)

---

## 최종 체크리스트

준비 완료 확인:

- [ ] 모든 드래프트를 읽고 상황에 맞게 수정
- [ ] 메시징 일관성 (정당한 백업 프레이밍) 확인
- [ ] 계정 준비 (Reddit, Discord, PH)
- [ ] 에셋 준비 (PH 썸네일, 스크린샷)
- [ ] Phase 1 일정 (1주) 설정
- [ ] 드래프트를 노트에 저장하고 즉시 접근 가능하게 정리
- [ ] 실행 후 추적 테이블 업데이트 (자동 reminder 설정)

---

**궁극의 목표**: 
SunoDown이 "스팸"이 아니라 "음악 제작자의 로컬 백업 솔루션"으로 커뮤니티에서 인식 → 자연스러운 backlink + 트래픽 → SEO 도메인 신뢰도 상승 → AdSense 신청 시 이력 강함
