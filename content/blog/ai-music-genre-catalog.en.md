## A genre name sets tone, instrumentation, and BPM in one move

The single word you drop into Suno's `Style of Music` field decides the whole direction of the track. Type "pop" and the result is one thing; type "synthwave 80s retro" and BPM, instrumentation, vocal timbre, and mix color all shift. Same lyric, different descriptor, and the output can differ by 30% or more.

A genre descriptor isn't a tag — it's a meta-instruction. Suno's model infers BPM range, lead instruments, vocal treatment, and mix tone from that descriptor simultaneously. Write `lo-fi hip hop` and the model automatically pulls in BPM 70 to 85, warm electric piano, vinyl noise, and gentle vocal compression without you typing a single one of those details. The output stays consistent across generations because the descriptor already carries that bundle.

The catch is that some descriptors resolve well and some don't. A niche compound like `neoclassical darkwave` rarely appears in the model's training data, so results swing wildly. Standard genre names like `synthwave`, `trap`, or `bossa nova` almost always produce a consistent tone. This guide catalogs 87 descriptors that resolve reliably in Suno, organized into five categories.

<!-- TODO SCREENSHOT: Same lyric, three different style descriptors — comparison of how the Style of Music field alone changes the output -->
## 5 main genres + their reliable sub-genres

Start with the five most stable main genres and the sub-genres that consistently get pulled in alongside them. The main genre alone produces a usable result, but adding a sub-genre tightens the tone.

**Pop family (12)**

- `pop` — the most universal baseline. BPM 100 to 120, clean vocal, standard band arrangement
- `synth pop` — 80s synth bass, BPM 110 to 125
- `k-pop` — pairs well with Korean lyrics, fast BPM 120 to 135, lots of beat switches
- `j-pop` — brighter tone overall, more acoustic elements
- `dream pop` — heavy reverb, hazy vocals, BPM 80 to 100
- `hyperpop` — digital distortion, pitched-up vocals, BPM 140+
- `indie pop` — acoustic guitar plus simple drums, BPM 95 to 115
- `electropop` — synth leads plus EDM drums, BPM 120 to 128
- `bedroom pop` — lo-fi tone, small-mic feel, BPM 80 to 100
- `art pop` — unconventional structure, experimental sound design
- `dance pop` — 4-on-the-floor kick, strong hooks, BPM 120 to 128
- `power pop` — electric-guitar-driven, 80s rock influence

**Rock family (10)**

- `rock` — electric guitar plus drums as the default
- `indie rock` — rougher tone, live feel
- `alternative rock` — 90s influence, moderate distortion
- `hard rock` — heavy distortion, hard-hitting drums
- `punk rock` — fast BPM 150 to 180, short song forms
- `pop punk` — fast BPM plus melodic vocals
- `garage rock` — raw recording tone, simple progressions
- `progressive rock` — long-form, odd meters
- `classic rock` — 70s tone, organ plus electric guitar
- `shoegaze` — wall-of-guitar, vocals buried in the mix

**Hip-Hop / R&B family (10)**

- `hip hop` — standard trap drums, BPM 70 to 90
- `trap` — 808 bass forward, hi-hat triplets
- `lo-fi hip hop` — warm EP, vinyl noise, BPM 70 to 85
- `boom bap` — 90s sampling tone, swung drums
- `drill` — fast hi-hats, dark tone, BPM 140 to 150
- `cloud rap` — synth pads everywhere, hazy vocals
- `r&b` — smooth vocals, 7th chords, BPM 70 to 90
- `neo soul` — acoustic plus Rhodes, jazz influence
- `contemporary r&b` — modern pop-leaning R&B
- `alternative r&b` — experimental R&B, FKA twigs territory

**Electronic family (15)**

- `house` — 4-on-the-floor, BPM 120 to 128
- `deep house` — darker bass, BPM 120 to 124
- `tech house` — minimal synths, BPM 122 to 128
- `techno` — driving kick, BPM 125 to 135
- `trance` — build-and-drop structure, BPM 130 to 138
- `dnb` or `drum and bass` — fast breakbeats, BPM 170 to 180
- `dubstep` — wobble bass, BPM 140 (half-time 70)
- `future bass` — supersaw chords plus sidechain, BPM 140 to 160
- `synthwave` — 80s synths plus gated reverb snare, BPM 80 to 110
- `vaporwave` — slow BPM 60 to 80, pitched down, 8-bit noise
- `chillwave` — warm synth pads, BPM 80 to 100
- `ambient` — no fixed rhythm, synth drones
- `idm` — experimental beats, glitch sounds
- `breakbeat` — 90s influence, BPM 130 to 140
- `hardstyle` — heavily distorted kick, BPM 150

**Jazz / acoustic family (8)**

- `jazz` — standard combo, walking bass
- `bossa nova` — bossa guitar pattern, soft vocals, BPM 70 to 90
- `lounge` — 70s influence, vibraphone
- `swing` — 4-beat swing drums, big-band horns
- `bebop` — fast BPM 200+, complex harmony
- `acoustic folk` — acoustic guitar plus vocals, simple structure
- `indie folk` — acoustic with a touch of electric
- `country` — country guitar plus pedal steel

That's 55 descriptors. Knowing the five main families is enough to find a starting point for almost any track. Pick the family closest to what you're after, add one sub-genre, and you've got a safe launch position.

![Suno Custom Mode Styles field — entering the descriptor `synthwave, nostalgic, dreamy, 110 bpm, female vocal, analog synths`](/blog/images/ai-music-genre-catalog/02-style-of-music-ui.png)
## Instrument descriptors — "live drums" vs "808 trap drums"

A genre descriptor pulls instrumentation along with it, but when you want to push a specific instrument into the foreground, add a dedicated descriptor. Fourteen instrument keywords that resolve well in Suno:

- `live drums` — acoustic drum kit, natural room tone
- `808 drums` or `808 trap drums` — heavy sub-bass kick
- `acoustic guitar` — steel-string acoustic
- `nylon guitar` — classical guitar, pairs with bossa nova and flamenco
- `electric guitar` — electric guitar (tone follows the genre)
- `distorted guitar` — distortion for rock and metal
- `piano` — acoustic grand
- `electric piano` or `rhodes` — 70s Fender Rhodes tone
- `synth bass` — synthetic bass for electronic genres
- `upright bass` — walking bass for jazz
- `strings` — string section for ballads and cinematic work
- `brass` — brass section for funk and jazz
- `saxophone` — sax solo
- `vinyl noise` — lo-fi noise floor, vintage tone

Stick to about two instrument descriptors. `synthwave with saxophone` — genre plus one instrument — resolves cleanly. Stretch it to `synthwave with saxophone, electric guitar, piano, strings, choir` and the model loses priority, with results swinging unpredictably.

Write instrument names in English. `saxophone` resolves better than `색소폰`, because most of Suno's training metadata is in English.

## Mood and energy keywords — slow / uptempo / dreamy / aggressive

Mood keywords shift BPM and vocal treatment. Genre plus mood is one of the most reliable combinations in the entire system.

- `slow` — pulls BPM down one step (pop 100 → slow pop 80)
- `uptempo` — pushes BPM up one step
- `dreamy` — more reverb, hazy vocals, heavier pad usage
- `energetic` — harder drums, faster BPM
- `aggressive` — more distortion, bigger dynamics
- `melancholic` — minor key, slower BPM
- `uplifting` — major key, bright harmony
- `nostalgic` — vintage tone, soft reverb
- `cinematic` — string section, full dynamic range
- `intimate` — small arrangement, close-mic tone
- `epic` — large arrangement, big dynamics, build-ups
- `chill` — slow BPM, soft tone
- `dark` — minor key, dark synths, low-end weight
- `bright` — major key, top-end emphasis, bright synths

A combo like `synthwave nostalgic dreamy` nails the tone. Stop at two or three mood keywords. Past four, they start contradicting each other and the result blurs.

<figure style="margin:28px 0;background:#111119;border:1px solid #242430;border-radius:10px;padding:22px 24px;">
<svg width="100%" viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mood and Energy matrix of Suno genres">
<defs><style>.ax{font-family:'Outfit',sans-serif;font-size:11px;fill:#6b6b80;letter-spacing:1.5px}.al{font-family:'DM Mono',monospace;font-size:11px;fill:#c0c0d0}.gl{font-family:'DM Mono',monospace;font-size:12px;font-weight:600}.cor{font-family:'Outfit',sans-serif;font-size:10px;fill:#6b6b80;font-style:italic}</style></defs>
<rect x="80" y="40" width="580" height="360" fill="none" stroke="#242430"/>
<line x1="370" y1="40" x2="370" y2="400" stroke="#242430" stroke-dasharray="3 4"/>
<line x1="80" y1="220" x2="660" y2="220" stroke="#242430" stroke-dasharray="3 4"/>
<text x="370" y="430" text-anchor="middle" class="ax">ENERGY →</text>
<text x="90" y="412" class="al">low</text>
<text x="650" y="412" text-anchor="end" class="al">high</text>
<text x="50" y="220" text-anchor="middle" class="ax" transform="rotate(-90 50 220)">MOOD →</text>
<text x="65" y="46" text-anchor="end" class="al">bright</text>
<text x="65" y="398" text-anchor="end" class="al">dark</text>
<text x="225" y="58" text-anchor="middle" class="cor">bright · low</text>
<text x="515" y="58" text-anchor="middle" class="cor">bright · high</text>
<text x="225" y="395" text-anchor="middle" class="cor">dark · low</text>
<text x="515" y="395" text-anchor="middle" class="cor">dark · high</text>
<circle cx="160" cy="115" r="5" fill="#c084fc"/><text x="170" y="119" class="gl" fill="#ededf5">dream pop</text>
<circle cx="240" cy="160" r="5" fill="#c084fc"/><text x="250" y="164" class="gl" fill="#ededf5">chillwave</text>
<circle cx="200" cy="195" r="5" fill="#c084fc"/><text x="210" y="199" class="gl" fill="#ededf5">bossa nova</text>
<circle cx="310" cy="135" r="5" fill="#c084fc"/><text x="320" y="139" class="gl" fill="#ededf5">indie pop</text>
<circle cx="460" cy="105" r="5" fill="#22d3ee"/><text x="470" y="109" class="gl" fill="#ededf5">k-pop dance</text>
<circle cx="555" cy="135" r="5" fill="#22d3ee"/><text x="565" y="139" class="gl" fill="#ededf5">future bass</text>
<circle cx="520" cy="175" r="5" fill="#22d3ee"/><text x="530" y="179" class="gl" fill="#ededf5">house</text>
<circle cx="610" cy="195" r="5" fill="#22d3ee"/><text x="500" y="210" class="gl" fill="#ededf5">trance</text>
<circle cx="170" cy="270" r="5" fill="#8b5cf6"/><text x="180" y="274" class="gl" fill="#ededf5">lo-fi hip hop</text>
<circle cx="120" cy="320" r="5" fill="#8b5cf6"/><text x="130" y="324" class="gl" fill="#ededf5">ambient</text>
<circle cx="260" cy="355" r="5" fill="#8b5cf6"/><text x="270" y="359" class="gl" fill="#ededf5">vaporwave</text>
<circle cx="225" cy="300" r="5" fill="#8b5cf6"/><text x="235" y="304" class="gl" fill="#ededf5">jazz</text>
<circle cx="465" cy="265" r="5" fill="#c084fc"/><text x="475" y="269" class="gl" fill="#ededf5">trap</text>
<circle cx="540" cy="305" r="5" fill="#c084fc"/><text x="550" y="309" class="gl" fill="#ededf5">drill</text>
<circle cx="600" cy="340" r="5" fill="#c084fc"/><text x="455" y="345" class="gl" fill="#ededf5">hardstyle</text>
<circle cx="425" cy="350" r="5" fill="#c084fc"/><text x="345" y="370" class="gl" fill="#ededf5">techno</text>
<circle cx="500" cy="380" r="5" fill="#c084fc"/><text x="510" y="384" class="gl" fill="#ededf5">synthwave</text>
</svg>
<figcaption style="margin-top:12px;color:#6b6b80;font-size:13px;text-align:center;">Figure: Mood × Energy matrix — descriptor placement guides which mood keyword to pick</figcaption>
</figure>

<!-- TODO SCREENSHOT: Same genre descriptor with only the mood keyword swapped — dreamy vs aggressive comparison -->
## Era and region descriptors — 80s synthwave, lo-fi Korean indie

Era and region descriptors are surprisingly strong in Suno. Writing `synthwave` produces one tone; writing `80s synthwave` adds gated reverb snare, DX7 synth timbre, and analog chorus on top.

Eight era descriptors:

- `60s` — mono tone, vintage reverb, simple drums
- `70s` — analog synths arrive, funk and disco
- `80s` — gated reverb, FM synths, synth bass
- `90s` — the grunge / house / boom bap era
- `2000s` — digital tone forward, R&B and emo
- `2010s` — EDM, trap, hyperpop
- `retro` — undated vintage tone
- `modern` — current mix style, clean sound

Eleven region descriptors that also resolve well:

- `korean indie` — Korean indie tone
- `japanese city pop` — Japanese city pop, 80s Tokyo
- `latin` — Latin rhythms, percussion
- `afrobeats` — African BPM 100 to 115, polyrhythm
- `brazilian` — bossa nova and samba influence
- `flamenco` — flamenco guitar
- `celtic` — Celtic horns, 5/8 meter
- `arabic` — maqam scales, oud
- `indian` or `bollywood` — Indian film music tone
- `caribbean` — reggae and soca influence
- `country americana` — American country

Region descriptors resolve best when stacked with a main genre. `korean indie pop` is more stable than `korean` alone, and `japanese city pop` reproduces the 80s Tokyo tone almost exactly. Stack mood plus region plus genre — like `lo-fi korean indie` — and the tone narrows dramatically.

<!-- TODO SCREENSHOT: Era descriptor comparison — 80s synthwave vs modern synthwave, tone difference visible in the result -->
## Genres that don't resolve well — "neoclassical darkwave" and other niches

Not every label works. These patterns produce inconsistent results:

- **Compound neologisms** — `neoclassical darkwave`, `solarpunk`, `weirdcore` — too few training samples
- **Hyper-narrow micro-genres** — `seapunk`, `witch house`, `vaporgrunge` — SoundCloud-era niches
- **Regional minor genres** — `enka` or `노라조`, locked to Korea or Japan
- **Classical sub-classifications** — `baroque counterpoint`, `serialism` — academic terms
- **Over-specific metal sub-genres** — `melodic death metal`, `progressive black metal`

Two strategies if you need a niche sound. First, decompose it into a nearby standard genre plus modifier keywords. `darkwave` becomes `synthwave dark cold 80s` and lands fairly close. Second, lift the keywords directly from a reference track. Suno's training data uses standard Spotify and Apple Music genre labels, so the official label of a reference track is usually the safest starting word.

To avoid burning credits on a label the model doesn't know, generate once. If the result feels random, fall back to a standard genre. If you've run the same niche descriptor five times and the output still doesn't converge, the model doesn't have a clear concept for that word.

## Combination rules — 2 is fine, 4 is dead

You can stack genres, but only so far. The pattern that holds:

- **1 genre** — most stable. Tone resolves cleanly
- **2 genres** — fine if they're close (`synth pop electropop`) or an established fusion (`jazz hip hop`)
- **3 genres** — one or two get ignored. Priority becomes murky
- **4+ genres** — output approaches random

A safe upper bound: 1 genre + 1 sub-genre + 2 moods + 1 era + 1 instrument. Keep the total under 7 descriptors.

The most common mistake when combining is pairing genres that fight each other. `country techno` mixes incompatible BPMs, instrumentation, and culture — the model picks one and drops the other. Stack genres that already live near each other: `country folk`, `techno house`.

When the sound you want is a fusion without a standard label, anchor on the nearest standard genre and let mood, era, and instrument descriptors do the narrowing. `synth pop nostalgic 80s with saxophone` resolves far more reliably than `synthwave city pop 80s yacht rock`.

<!-- TODO SCREENSHOT: Failed genre stacking — 4+ genres listed, style descriptors ignored in the result -->
## Quick reference catalog

All 87 descriptors collected by category. Main genres 55, instruments 14, moods 14, eras 8, regions 11 — that's 102 raw entries, but stripping duplicates and sub-categories leaves the 87 core descriptors that cover almost any track.

| Category | Reliable descriptors |
|---|---|
| Pop | pop, synth pop, k-pop, j-pop, dream pop, hyperpop, indie pop, electropop, bedroom pop, dance pop |
| Rock | rock, indie rock, alternative rock, hard rock, punk rock, pop punk, classic rock, shoegaze |
| Hip-Hop / R&B | hip hop, trap, lo-fi hip hop, boom bap, drill, r&b, neo soul, alternative r&b |
| Electronic | house, deep house, techno, trance, dnb, dubstep, future bass, synthwave, vaporwave, chillwave, ambient |
| Jazz / acoustic | jazz, bossa nova, swing, acoustic folk, indie folk, country |
| Instruments | live drums, 808 drums, acoustic guitar, electric guitar, piano, rhodes, synth bass, strings, brass, saxophone |
| Moods | slow, uptempo, dreamy, energetic, melancholic, uplifting, nostalgic, cinematic, chill, dark, bright |
| Eras | 60s, 70s, 80s, 90s, 2000s, retro, modern |
| Regions | korean indie, japanese city pop, latin, afrobeats, brazilian, flamenco, celtic, americana |

Scan this table once and descriptor selection drops to under a minute. "A mellow K-pop track with 80s vibes" becomes `k-pop 80s nostalgic dreamy` — four keywords, done. Generate that combination 3 to 5 times with the same lyric and pick the best take.

Combining descriptors only does its job when you're the one typing them. A track you synthesized from `k-pop 80s nostalgic dreamy` is your own prompted output, and using it for personal listening, DAW post-processing, or your portfolio is well within bounds. Suno Pro subscribers also have a clear right to keep lossless WAV backups of the songs they generate themselves. Pulling another creator's track, claiming the same descriptors got you there, and redistributing or commercializing it is a different conversation that needs a separate agreement. The catalog is a map for narrowing your own tone, not a license for someone else's work.

The full lyrics-prompting workflow lives in [Suno AI Lyrics Prompting](/blog/suno-lyrics-prompt-tips). Once the descriptors are locked, the next step is DAW post-processing — [Post-Processing Suno Tracks in a DAW](/blog/daw-post-processing) covers the EQ, compression, and mastering checklist. When the track is finished, [SunoDown](/) downloads the whole playlist in lossless WAV or MP3 in one click.
