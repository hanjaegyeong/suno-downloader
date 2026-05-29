## Why Post-Processing Matters — The Limits of AI Mastering

Drop a fresh Suno WAV straight into YouTube or Spotify and it'll usually sound quieter and a bit muffled next to commercially mastered tracks. The reason is simple. Suno's automatic mastering aims for a generic middle ground, but it doesn't target the loudness, EQ balance, or dynamic shape that each streaming platform actually normalizes to. Most Suno exports land between -16 and -19 LUFS, so on a -14 LUFS reference like Spotify or YouTube your song lands a step below the neighbors.

Post-processing comes down to three goals. First, clean up the frequency clash between vocals and instrumentation. Second, tighten the dynamics so the average loudness can lift without distortion. Third, hit the platform's loudness target on the master bus. Get those three right and the same song feels almost twice as present.

This guide walks through what to do once that WAV is on the timeline, in the order it actually happens: import, optional stem separation, EQ, compression, reverb, loudness matching, common problems, a free-plugin workflow, and a first-setup checklist for four DAWs. Ableton Live 12, Logic Pro 11, FL Studio 21, and REAPER 7 get equal time — the menu paths differ but the signal chain is the same.

<!-- TODO SCREENSHOT: Ableton Live 12 timeline with a Suno WAV loaded — waveform and track header visible -->
## Importing the WAV and Stem Separation Options

Start with WAV, not MP3. Suno's MP3 export is already lossy, so when you push EQ or compression you start hearing the encoder artifacts. The lossless WAV download requires Suno Pro, and we cover the audible difference in the [MP3 vs WAV guide](/guide/suno-mp3-vs-wav).

Match your session sample rate to the file. Suno typically exports at 44.1 kHz, 16-bit, so set the DAW project to the same value. If you import at a different rate, the DAW silently resamples and you can pick up subtle tonal smearing in the highs.

Stem separation decides how much creative control you'll have. Suno is rolling out native stem extraction gradually, and outside that you've got three popular options:

- **Suno's native Stems** — Splits a track into vocals, drums, bass, and other elements. Pro tier recommended.
- **Spleeter (open source)** — Python-based, free. Supports 2-stem (vocal/accompaniment), 4-stem, and 5-stem splits.
- **LALAL.AI** — Web-based, pay-per-track. Generally the cleanest separation quality of the three.

If you only need a quick mastering pass, a single stereo WAV on one track is fine. The moment you want to EQ the vocal differently from the band, or push more compression onto the drums alone, stem separation becomes essential. After splitting, each stem lives on its own track, all routed to one submix bus where you'll place the master chain.

## EQ — Cleaning Low End, Boxy Mids, and Harsh Highs

EQ is the first move. Three problems show up repeatedly in Suno tracks, and each has a predictable fix.

**Low-end cleanup.** Anything below 30 Hz adds no musical content and eats up headroom. Set a high-pass filter at 30–40 Hz with a 12 dB/oct slope. Channel EQ in Logic Pro, EQ Eight in Ableton, Fruity Parametric EQ 2 in FL Studio, and ReaEQ in REAPER all behave the same way here. On an isolated vocal stem you can push the high-pass up to 100–120 Hz without losing body.

**Boxy mids.** The 200–400 Hz region tends to pile up and make the mix feel stuffy. Pull that range down by 2–3 dB with a tight Q (1.5–2.0). This shows up most often on R&B and rock Suno generations. Don't go past -3 dB or the song starts to sound hollow.

**Harsh highs.** A digital-synthesis edge often sits between 6 and 9 kHz. Drop that band by 1.5–2.5 dB, then add a gentle +1 dB Air shelf above 12 kHz to bring back the openness without restoring the harshness. A dedicated de-esser on the vocal stem cleans it up further.

Keep master-bus EQ moves under 1.5 dB. Heavy EQ on the master pushes the whole tone into unnatural territory. Do the big cuts on the stems, and reserve the master EQ for tiny corrections.

<!-- TODO SCREENSHOT: Channel EQ in Logic Pro — high-pass at 30 Hz, 300 Hz -2 dB bell, and a +1 dB Air shelf at 12 kHz -->
## Compression — Taming Vocal Dynamics

Compression squashes the loud bits and lifts the quiet ones so the average loudness can climb. On a Suno track, the vocal is where this matters most. AI vocals tend to swing in level from line to line — the first note of a chorus jumps, the tail of a verse disappears.

Start vocal-stem compression with these values:

- **Threshold** — If the vocal averages around -18 dB, place the threshold near -16 dB.
- **Ratio** — 3:1 to 4:1.
- **Attack** — 5–10 ms (lets consonants through, catches sustained vowels).
- **Release** — 80–150 ms (breathes naturally between syllables).
- **Gain reduction target** — average of -3 to -5 dB.

The Compressor in Ableton Live, Logic Pro's Compressor in VCA mode, FL Studio's Fruity Limiter set to compressor mode, and REAPER's ReaComp will all sit comfortably at these numbers. As you get familiar, fine-tune the attack to the kind of consonants you're hearing.

For the instrumental bus, use a lighter glue compressor. Ableton's Glue Compressor is the classic option: threshold around -18 dB, ratio 2:1, attack 10 ms, release on auto. Aim for 2–3 dB of gain reduction. The Compressor in Logic Pro with "Platinum Digital" or "Classic VCA" character does roughly the same job.

On the master bus, keep it gentle — one glue compressor, threshold around -14 dB, ratio 1.5:1 to 2:1, gain reduction 1–2 dB max. Push the master compressor harder than that and you'll hear pumping artifacts.

<!-- TODO SCREENSHOT: Glue Compressor in Ableton Live 12 — Threshold -18 dB, Ratio 2:1, Attack 10 ms -->
## Reverb and Delay — Adding Space

Suno tracks already include some baked-in reverb, so layering more on top tends to smear the mix. Apply post-processing reverb only on vocals or solo instruments, and keep it short.

For vocals, a plate or short hall does the job:

- **Decay time** — 1.0 to 1.5 seconds.
- **Pre-delay** — 20 to 40 ms (preserves vocal intelligibility).
- **Wet level** — -20 to -16 dB (just present, never obvious).
- **EQ on the reverb send** — high-pass under 200 Hz to stop low-end buildup.

ChromaVerb in Logic Pro, Hybrid Reverb in Ableton, Fruity Reeverb 2 in FL Studio, and ReaVerbate in REAPER all start well inside that range. Route them through a send/return so multiple stems share one reverb — the spatial feel stays consistent.

Use delay sparingly. A short ping-pong (dotted eighth) on the last word of a chorus or the end of a key line feels natural. Don't blanket the whole track in delay.

## Loudness Matching — Platform LUFS Targets

Each streaming platform runs its own loudness normalization. If your master is louder than the platform target, it gets turned down automatically — and you only lose dynamics in the process. If it's quieter, it just sits below the neighboring tracks.

Current normalization targets:

- **Spotify** — -14 LUFS integrated.
- **Apple Music** — -16 LUFS (Sound Check reference).
- **YouTube** — -14 LUFS.
- **Tidal** — -14 LUFS.
- **Broadcast (EBU R128)** — -23 LUFS.
- **Instagram / TikTok short form** — around -14 LUFS.

-14 LUFS is the most useful default. Master a Suno track to that value and it'll sit at a similar loudness on Spotify, YouTube, and TikTok. If you specifically need an Apple Music master, export a separate -16 LUFS version.

Free meters get you all the way there. Youlean Loudness Meter 2 (free tier), TBProAudio dpMeter5 (free), and Waves WLM Plus (paid) all show integrated LUFS and true peak. Land integrated LUFS at -14 ± 0.5 and true peak at -1.0 dBTP or lower and you're safe.

Drop a limiter on the master output. Set the ceiling to -1.0 dBTP, threshold around -10 to -8 dB, and adjust input gain so average gain reduction stays under 3 dB. Adaptive Limiter in Logic Pro, Limiter in Ableton, Fruity Limiter in FL Studio, and ReaLimit in REAPER are all capable here. A dedicated suite like iZotope Ozone 11 (paid) makes automatic LUFS matching easier if you process a lot of tracks.

<!-- TODO SCREENSHOT: Youlean Loudness Meter 2 reading -14.0 integrated LUFS and -1.0 dBTP true peak -->
## Common Problems — Phase, Clipping, and Sidechain Pumping

Three issues come up over and over during post-processing. Here's how to handle each.

**Phase problems.** After stem separation, if certain bands disappear when vocals and instrumental play together, you've got a phase mismatch. Hit the phase invert button on the vocal stem and compare. Whichever version sounds fuller is the correct polarity. Use Logic's Gain plugin (Phase Invert L/R), Ableton's Utility (Phase button), or REAPER's track-header polarity switch.

**Clipping.** When true peak crosses 0 dBTP, some platforms render audible digital distortion. Lock your master limiter ceiling at -1.0 dBTP and don't push past it. Apply dither only on a 24-bit → 16-bit downconvert; if you're exporting at 24-bit, skip dither.

**Sidechain pumping.** If your master compressor's release is too short, the whole track breathes with every kick. Push release past 100 ms or switch to auto release. Reserve short releases (30–50 ms) for moments when you actually want that pumping effect.

## Light Workflow — 90% of the Result From Free Plugins

You can hit 90% of a polished mix using free plugins alone. Recommended picks by category:

- **EQ** — TDR Nova, ReaPlugs ReaEQ, MEqualizer.
- **Compressor** — TDR Kotelnikov GE (free), Klanghelm MJUC jr, ReaComp.
- **Limiter** — LoudMax, ReaLimit, Youlean Loudness Meter (for metering).
- **Reverb** — Valhalla Supermassive (free), OrilRiver, ReaVerbate.
- **Delay** — Valhalla Freq Echo (free), ReaDelay.
- **De-esser** — TDR Nova used as a dynamic multiband.
- **Analysis meters** — Youlean Loudness Meter 2 (free), SPAN.

Those six or seven tools cover the full chain: vocal EQ → compression → reverb → master EQ → glue compression → limiter → LUFS metering. Once you've put in some miles, you can graduate to paid options like FabFilter Pro-Q 4, Pro-C 2, or iZotope Ozone 11. The Suno Pro subscription value side of this is covered in [Is Suno Pro Worth It?](/blog/suno-pro-value-analysis).

## First Setup by DAW — Ableton, Logic, FL Studio, REAPER

The work is the same; the menu paths aren't. Here's a starter setup for each.

**Ableton Live 12**

1. New project → File → New Live Set → set sample rate to 44.1 kHz, 24-bit (Preferences → Audio).
2. Drag the Suno WAV in — it lands on a new audio track automatically.
3. EQ Eight → high-pass at 30 Hz, -2 dB at 300 Hz.
4. Compressor (VCA mode) → threshold -16, ratio 3:1.
5. Glue Compressor on the master → threshold -18, ratio 2:1.
6. Limiter at the end of the master → ceiling -1.0 dB.
7. Insert Youlean Loudness Meter 2 (free) on the master for LUFS reading.

**Logic Pro 11**

1. New project → File → New → Empty Project → 44.1 kHz (Project Settings → Audio).
2. Drag the Suno WAV onto a new audio track.
3. Channel EQ → Low Cut at 30 Hz, -2 dB at 300 Hz, +1 dB Air shelf at 12 kHz.
4. Compressor (VCA mode) → threshold -16, ratio 3:1.
5. Compressor on the Stereo Out → threshold -14, ratio 2:1.
6. Adaptive Limiter at the end → Output -1.0 dB.
7. Use Logic's built-in Multimeter for loudness.

**FL Studio 21**

1. New project → File → New → set sample rate in Options → Audio Settings.
2. Load the Suno WAV onto a Sampler / Audio Clip channel → route it into the Mixer.
3. Fruity Parametric EQ 2 → high-pass at 30 Hz, -2 dB at 300 Hz.
4. Fruity Limiter (compressor mode) → threshold -16, ratio 3:1.
5. Add Fruity Limiter (compressor mode) on the Master insert → threshold -14, ratio 2:1.
6. Fruity Limiter (limiter mode) at the end of the Master → ceiling -1.0 dB.
7. Drop Youlean Loudness Meter 2 (free) on the Master.

**REAPER 7**

1. New project → File → New project → set sample rate to 44.1 kHz in Project Settings.
2. Drag the Suno WAV in — REAPER creates a new track automatically.
3. ReaEQ → Band 1 high-pass at 30 Hz, Band 2 -2 dB at 300 Hz.
4. ReaComp → threshold -16, ratio 3:1.
5. On the Master track (View → Master Track), add ReaComp → threshold -14, ratio 2:1.
6. ReaLimit at the end of the master → ceiling -1.0 dB.
7. Insert Youlean Loudness Meter 2 (free) on the master.

All four DAWs implement the same signal chain. To start, you really only need to remember three dB values: threshold -16, threshold -14, ceiling -1.0. Once that's automatic, move on to stem separation and send-bus reverb.

<!-- TODO SCREENSHOT: REAPER 7 master track FX chain — ReaEQ → ReaComp → ReaLimit → Loudness Meter, in order -->
## Quick Post-Processing Checklist

Nine things to scan before you call a mix done.

1. Did you import the WAV at 24-bit, 44.1 or 48 kHz?
2. Did you high-pass the master at 30 Hz to clear the sub?
3. Did the vocal EQ cut 200–400 Hz by 2–3 dB to kill boxiness?
4. Is the vocal compressor averaging 3–5 dB of gain reduction?
5. Is the master glue compressor sitting at 1–2 dB of gain reduction?
6. Is the reverb wet level buried at -20 to -16 dB?
7. Is integrated LUFS at -14 ± 0.5 (or -16 for Apple Music)?
8. Is true peak at -1.0 dBTP or lower?
9. Does your export format match the platform spec (24-bit or 16-bit WAV)?

Running through those nine each time tightens the consistency from song to song. Most tracks take 30 minutes to an hour to post-process at first, dropping to about 20 minutes once the chain is muscle memory. When a track lands, save the entire master chain as a preset — you can apply it to every other WAV you pull from [SunoDown](/) and stay consistent.

DAW post-processing is a legitimate workflow only for tracks you generated yourself. If the lyric and the descriptors came out of your own keyboard, running the result through EQ, compression, and a limiter to hit streaming spec is clearly within your rights. Suno Pro subscribers downloading their own lossless WAVs into a DAW is the assumed starting point of this guide, and that same right extends naturally to keeping backups and using the songs in your portfolio. Taking someone else's generation, slapping a new master chain on top, and redistributing or selling it is a different action that needs a separate agreement. The checklist exists to raise the quality of work you created, not to launder another creator's output without a license.

Post-processing isn't a one-shot skill. Finish one song, port the chain to the next, then tweak only what stands out. Use the checklist and the four-DAW first-setup as your baseline, and let the EQ curves and compression ratios drift toward whatever your genre actually needs.
