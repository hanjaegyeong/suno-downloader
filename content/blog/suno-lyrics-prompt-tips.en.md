## Lyrics prompting decides 70% of the result

You can write the cleanest genre prompt in the world, and an awkward lyric will still ruin the track. Suno feeds the text in the Lyrics field straight into its vocal synth, and that synth is what controls the melodic phrasing, the rhythm of each bar, the vocal timbre, and the pronunciation. So no matter how carefully you tune style descriptors, if the lyric is too long, hard to pronounce, or rhythmically broken, the vocal will stumble in places you can hear.

In practice, roughly 70% of a Suno track's quality is decided by the lyric prompt. The other 30% is genre, instrumentation, and mood descriptors. The same rule holds whether you're on the free plan or paying for Pro — upgrading doesn't rescue a weak lyric.

This guide collects the 9 failure patterns I keep running into, and the writing rules that avoid them. Meta tags, rhyme schemes, syllable counts, phonetic traps, Korean-specific quirks, chorus repetition, and the character limit are all covered in one place.

<!-- TODO SCREENSHOT: Custom Mode lyrics input UI — Lyrics field and Style of Music field separated -->
## The Lyrics field and the Style field do different jobs

Suno's Custom Mode shows two big text boxes. The first is `Lyrics`, the second is `Style of Music`. They're not interchangeable.

- `Lyrics` — the text that actually gets sung. Anything you type here ends up as vocals.
- `Style of Music` — meta descriptors for genre, instrumentation, BPM, and mood. Nothing here is sung.

The single most common mistake is dumping genre tags into the Lyrics field. If you write "K-pop dance, 120 BPM, female vocal" in the lyric box, Suno will literally sing those words. You'll get a track with an awkward English meta-description glued to a melody.

Genre, instruments, and mood belong only in `Style of Music`. The Lyrics field takes lyrics and nothing else — and ideally only natural-language sentences a human could sing. Get this separation wrong and every other rule below stops mattering.

<!-- TODO SCREENSHOT: Lyrics field misused with genre descriptors — comparison clip where the meta text gets sung -->
## Structure meta tags: how to use [Verse], [Chorus], [Bridge]

Drop bracketed meta tags inside the lyric text and Suno picks up the song's structure. The tags that work consistently:

- `[Intro]` — opening, often vocal-free or a short hum
- `[Verse]` or `[Verse 1]`, `[Verse 2]` — verses
- `[Pre-Chorus]` — the build into the chorus
- `[Chorus]` — chorus
- `[Bridge]` — the contrast section that breaks the song
- `[Outro]` — the close
- `[Instrumental]` — a vocal-less section
- `[Hook]` — a short, repeatable catchy line

Write the tags in English inside square brackets. Korean equivalents like `[후렴]` work inconsistently. Add a line break after each tag — it stabilizes the way Suno parses the boundary.

You don't need a tag on every section. A structure like `[Verse 1]` → `[Chorus]` → `[Verse 2]` → `[Chorus]` → `[Bridge]` → `[Chorus]` covers most pop tracks, and adding `[Outro]` gives you a cleaner ending. Free-form tags like `[Instrumental break]` or `[Guitar solo]` also resolve some of the time and are useful when you want a specific short instrumental moment.

<!-- TODO SCREENSHOT: Actual lyric example with [Verse]/[Chorus] meta tags + generated waveform showing the section split -->
## Syllable count and rhyme decide the melody

Suno builds melodic phrasing on top of syllable counts and rhyme. Two lyrics with identical meaning but different syllable counts produce different melodies — sometimes drastically.

Working syllable ranges for English:

- Verse line — 8 to 12 syllables
- Chorus line — 6 to 10 syllables (slightly shorter for impact)
- Bridge — 12 to 16 is fine (the contrast section tolerates more)

If syllable counts swing wildly within the same section, the melody never settles. Lines don't have to match exactly, but lines in the same role (say, all four lines of Verse 1) should sit in the same range.

Rhyme matters just as much. Pick one scheme — ABAB, AABB, or ABCB — and hold it. When the rhyme is consistent, Suno tends to repeat similar pitch shapes across chorus lines, which is what makes a section feel "sung" rather than "spoken at pitch." A fully random rhyme scheme gives you a vocal that drops out at unpredictable points.

If you're new to rhyme, start with ABAB. Lines 1 and 3 share an end-rhyme; lines 2 and 4 share a different one. It works in pop, K-pop, R&B, almost anywhere.

A clean ABAB example:

```
City lights are calling me out      ← A
I follow neon down the street       ← B
Echoes of the rain, no doubt        ← A
Footsteps falling soft and sweet    ← B
```

Syllables sit around 8/8/8/8, end words are out/street/doubt/sweet — straight ABAB. Feed that into Suno and the chorus melody locks in pretty cleanly.

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
<figcaption style="margin-top:12px;color:#6b6b80;font-size:13px;text-align:center;">Figure: ABAB rhyme aligning melody contours — A lines share pitch shape, B lines share another</figcaption>
</figure>

<!-- TODO SCREENSHOT: Two versions with the same melody and genre but different rhyme — vocal naturalness comparison -->
## Word patterns Suno can't sing well

Suno's vocal synth has known weak spots. The patterns I keep flagging in drafts:

- **Acronyms and initialisms** — `NASA`, `FBI` waver between letter-by-letter and word pronunciation
- **Numbers and years** — `2026` is safer written as "two thousand twenty-six". As a raw numeral, it sometimes comes out as something else
- **Heavy consonant clusters** — `strengths`, `twelfths`, anything ending in three or more consonants tends to mush together
- **Foreign proper nouns** — dropping an English name into a Korean lyric (or vice versa) destabilizes the pronunciation
- **Homographs** — `lead` (to guide / the metal), `read` (present / past tense) — context-based pronunciation isn't reliable
- **Very long words** — 8-syllable monsters like `incomprehensibility` don't fit the bar and get truncated
- **Vowel-to-vowel transitions** — phrases like `idea of a year` (vowel ending, vowel starting) blur into each other

If a word feels risky, swap it for a shorter near-synonym. If you can't replace it, shorten the line it sits in so the bar has more breathing room for the awkward syllables.

<!-- TODO SCREENSHOT: Suno mispronouncing acronyms or numbers — lyric vs what's actually sung -->
## Korean lyric considerations

Suno accepts Korean lyrics, but vocal stability drops compared to English. A few rules help.

- Keep syllable counts more uniform than you would in English — Korean has crisp syllable units, so uneven counts swing the rhythm harder
- Avoid stacking final consonants on one line — a line like `깊은 밤 잠 못 들어` packs final consonants back to back and gets blurred
- Minimize Korean-English mixing — `당신의 heart는` style mixed lines slip in and out of timbre
- Keep onomatopoeia short — `반짝반짝`, `우당탕탕` are safer used once, not repeated within a line
- Open with an easy-to-pronounce word — if the very first line sounds off, the whole track does
- Use punctuation sparingly — heavy commas and periods chop the rhythm

There's another difference from English worth knowing. English uses stressed syllables that strongly shape the melody. Korean is a low-stress language, which means Suno has more freedom in pitch placement. The same Korean lyric can produce noticeably different melodies on each generation, so plan on running the same input 3 to 5 times until you get a take you like.

A quick comparison of clean vs messy Korean lines:

```
Clean line:   바람이 불어와 너에게 닿네     ← Few final consonants, smooth vowel flow
Awkward line: 깊은 밤 잠 못 들었던 끝났던     ← 6 final consonants stacked, fuzzy word boundaries
```

To carry the same meaning, the second line rewrites cleanly to `밤은 깊어 잠은 멀어졌어` — fewer stacked consonants, more even syllables. Running that pass across an entire lyric takes 5 to 10 minutes.

<!-- TODO SCREENSHOT: Korean lyric input + generated result showing pronunciation clarity difference between consonant-heavy and clean lines -->
## Balancing chorus repetition and variation

The chorus is the song's identity. But if you write every chorus identically, Suno's output ends up flat. Swing the other way and vary each one and the chorus loses its hook.

The pattern that works:

- Keep chorus 1 and chorus 2 word-for-word identical — this locks in identity
- Tweak one or two lines in the final chorus (usually right after the bridge) — this signals the ending
- Within each chorus, keep one repeating key line as the anchor hook

This nudges Suno to hold the chorus melody steady across repetitions, then add a subtle variation on the final hit. The track ends up neither monotonous nor scattered.

The bridge works best when it pushes against the chorus. If the chorus is bright, drop the bridge into something darker. If the chorus is fast, let the bridge breathe. That contrast is what makes the final chorus feel like a payoff.

## Working around Custom Mode's character limit

Suno's Custom Mode lyric box has a character cap — roughly 3,000 characters on both free and Pro. Korean text hits a similar character count but tends to produce longer audio.

When a single track can't hold the whole song, the options are:

- `Extend` — continue from the end of the existing track, with new lyrics
- `Continue From` — branch from an arbitrary point (Pro recommended)
- Split the song into two tracks and stitch in a DAW — the cleanest result

For anything past 4 minutes, two 2-to-3-minute tracks joined in a DAW give a more stable result than a single `Extend` chain. Extend is convenient but the timbre often drifts slightly across the seam, and for anything you care about, splitting and editing is worth it.

## Generate the same lyric multiple times and compare

Suno produces a different result every run, even from identical lyrics and style prompts. After you've cleaned up the lyric, generate the same input 3 to 5 times and compare.

Plan on roughly three generations to land one keeper. Even within the free plan's daily credits, that's enough to finish one full track. Pro gives you more attempts, which mostly means more chances at a great take rather than a different quality ceiling.

Three things to listen for when comparing takes:

- Is the first word of the song pronounced cleanly?
- Does the chorus melody land as something you'd hum back?
- Does the last 30 seconds feel like an ending, not a fade-out cut?

If all three check out, ship it. If not, tweak one line and run another batch. The cycle that holds up best is: revise lyric → generate 5 times → pick the best take.

## Quick checklist

Nine things to verify before you hit generate:

1. The Lyrics field is free of genre or BPM descriptors
2. Structure tags like `[Verse]` and `[Chorus]` appear at least 3 to 4 times (in English, in brackets)
3. Verse lines mostly sit at 8 to 12 syllables, chorus lines at 6 to 10
4. The lyric follows a consistent rhyme scheme like ABAB or AABB
5. No acronyms, consonant clusters, or homographs in risky positions
6. (Korean only) No line stacks heavy final consonants
7. Chorus 1 and 2 are identical, with the final chorus tweaked by a line or two
8. Total lyric length is under 3,000 characters
9. The first line opens with an easy-to-pronounce word

<!-- TODO SCREENSHOT: Suno character-limit warning when the lyric exceeds the cap, with the counter visible -->
Checking these nine before generating changes the output meaningfully even when the genre prompt is identical. Once the lyric is locked, the next quality lever is your style descriptors, and after that, DAW post-processing.

Suno does have a `Generate Lyrics` button. Auto-generated lyrics tend to break the 9 rules above — they're a starting point, not a finished input. Spend 5 minutes editing the AI draft and you'll save the hour you'd otherwise burn re-rolling generations.

Every rule above assumes you're the person writing the prompt and the lyric. When the song was synthesized from your own words, personal listening, DAW post-processing, and using the track in your own portfolio are all legitimate uses. Suno Pro subscribers also have a clear right to back up their own creations as lossless WAVs. What this guide doesn't cover is grabbing someone else's track, swapping the lyric, and redistributing or monetizing it — that path requires a separate agreement and isn't justified by anything in this post. The point is to make your own work better, not to repurpose other people's.

A separate guide covers [AI Music Copyright](/blog/ai-music-copyright-guide) for commercial use questions. Style descriptors that actually resolve well in Suno are catalogued in [AI Music Genre Catalog](/blog/ai-music-genre-catalog). When the song is done, [SunoDown](/) downloads the whole playlist in lossless WAV or MP3 in one click.
