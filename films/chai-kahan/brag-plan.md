# Brag Plan: Chai Kahan

## What is this app?
An installable web app that points a truck-art compass at the nearest chai dhaba in Lahore and keeps working with no signal at all: download the city pack once, then GPS, the magnetometer and 454 places in IndexedDB do the rest.

## The angle
Everyone has been there: you want chai, you have one bar, and the map app wants the network for the map, the search and the pins. Chai Kahan's answer is almost rude in its simplicity. Put the city on the phone. Point. The video plays that straight, with the app's own truck-art energy: cream, ink, pink, saffron, cobalt, and a needle that actually swings.

## Hook (first 2-3 seconds)
Cream canvas, ink type. **You want chai.** stamps in. A pink status pill reading `No Service` slides in under it. Then the second line: **Your map wants signal.** That is the whole problem in six words.

## Key moments (the middle)
- The real phone UI arrives: onboarding card `Where are you? · The compass needs your location. It never leaves your phone.` A cursor taps **Allow location**, and the screen becomes the real compass: `Chaaye Khana · dhaba · 840 m`, needle pointing, status pill `Online · Lahore pack v1`.
- The pill flips to `Offline · Lahore pack v1` and nothing else changes. The needle still points. That is the demo.
- Three stats arrive on the beat beside the list and packs screens: `454 places in the Lahore pack`, `0 network requests after install`, `< 1 ms to find the nearest, on device`.

## Outro / punchline
**Download the city once.** / **Then it works with nothing.** Then the lockup: app icon, **Chai Kahan**, `چائے کہاں؟`, `musaabjaved.com`.

## User flow worth showing
Onboarding (grant location) → compass pointing at the nearest dhaba with distance → the same compass with the network gone. Real screenshots from the running app at 390×844, captured on a Lahore GPS fix.

## Tone
- Preset: default
- Creative direction: truck-art maximalism kept legible; the app's own palette on a cream canvas, Bungee for the shouty lines, Nastaliq for the Urdu, Geist for everything that has to be read fast
- Interpretation: 5 scenes, 3–5s each, snappy 0.35–0.5s pushes and crossfades, one bell on the lockup; playful but the claims are the app's real numbers

## Format: landscape — 1920x1080
## Duration: 20s

## Visual identity (from the project)
- Background: #fff5dc (cream, the app body) with the app's repeating saffron/ink stripe motif used as a border band, not a full-screen pattern
- Accent: #ff2e88 pink (needle, pills), #ffb000 saffron (ring, chips), #1f3fbf cobalt (needle tail), #19d66b green (online dot)
- Text: #111111 ink on cream; cream on ink panels
- Display font: Bungee 400 (embedded woff2), the app's display face
- Urdu font: Noto Nastaliq Urdu 400 (embedded woff2)
- Body font: Geist 400/500/600 (embedded woff2), the app's sans
- Strongest visual element: the compass face (cream disc, 10px ink border, dashed saffron ring, pink/cobalt needle, saffron hub) and the truck-art app icon

## Share copy (draft)
Made Chai Kahan. It's a compass that points at the nearest chai dhaba in Lahore and works with zero signal once the city pack is on your phone. 454 dhabas. No map tiles. No server. Just a needle.

## Audio direction
- Role: upbeat bed with a light UI layer
- Music: `happy-beats-business-moves-vol-1-by-ende-dot-app.mp3` (full upbeat track, the default pick)
- Music treatment: start at 0, volume 0.34, fade out over the final 1.2s
- Music cue guidance: preset read from `assets/music/cues/…vol-1…music-cues.md`; tempo 120.19 BPM, beat grid every 0.50s from 3.02. Strong cues: 16.02, 17.02, 17.52, 18.02, 18.52. Lock the outro lockup to 17.02. Stats land on 12.52 / 13.51 / 14.52 (every other beat so each line can be read).
- Audio-reactive treatment: subtle; bass breathes the saffron ring and the cream panel shadow (scale 1.00–1.03), never the type.
- SFX posture: moderate, 5 cues.
- Audio-coupled moments: pill slide (`drop_001`), tap on Allow location (`click_003`), compass reveal (`impactSoft_medium_001`), stat rows (`card-slide-1` on the first only), lockup (`impactBell_heavy_000`)
- Restraint rule: no sound on the offline flip (the silence is the point), no SFX stacked within 0.3s of each other

## Storyboard

### Scene 1 — Hook — 3.5s
Cream field with a saffron/ink stripe band along the bottom edge and a large faint ink `چائے` ghost glyph top-right at 8%. **You want chai.** (Bungee 128px, ink) stamps in at 0.2s with a tiny overshoot. At 1.2s a pink pill `● No Service` slides in from the left under it. At 2.0s **Your map wants signal.** stamps in below. Hold to 3.5.
Sequential/interaction: yes, line → pill → line.
Audio intent: the bed starts; one soft drop on the pill.
Audio-coupled idea: `drop_001` on the pill.
Transition mood: clean push (0.45s, scene slides left) → Scene 2

### Scene 2 — Reveal — 4.5s
Left 45%: title stack, **Chai Kahan** (Bungee 96px) over `چائے کہاں؟` (Nastaliq 56px) and the Geist line `An offline-first compass to the nearest dhaba in Lahore.` Right: a phone frame (ink bezel, 390×844 screen) rises from below carrying the real onboarding screen `Where are you?`. A cursor arrives and taps **Allow location** at 2.4s; the screen crossfades to the real compass screen with `Chaaye Khana · dhaba · 840 m` at 2.8s.
Sequential/interaction: yes, phone rises, cursor taps, screen swaps.
Audio intent: the tap and the reveal are the two beats.
Audio-coupled idea: `click_003` on the tap; `impactSoft_medium_001` as the compass appears.
Transition mood: hold the phone, crossfade the left column → Scene 3

### Scene 3 — The point — 4s
The phone stays. Left column becomes a callout: pill `Online · Lahore pack v1` in green, then at 1.2s it flips to `Offline · Lahore pack v1` in pink, and the Geist line **The needle still points.** stamps in under it. A second line, smaller: `GPS + magnetometer → bearing − heading. No tiles. No server.` On the phone, the needle rotates 40° to a new bearing with a spring (a recreated needle overlaid on the real compass face).
Sequential/interaction: yes, pill flip → line → needle swing.
Audio intent: deliberately no SFX on the flip.
Audio-coupled idea: none.
Transition mood: push (0.45s) → Scene 4

### Scene 4 — The numbers — 4s
Two phones slightly rotated, list screen and packs screen, on the right. Left: three stat rows arriving on 12.52 / 13.51 / 14.52, each Bungee number + Geist caption: **454** `places in the Lahore pack`, **0** `network requests after install`, **< 1 ms** `to find the nearest, on device`. Each holds.
Sequential/interaction: yes, three rows, every other beat.
Audio intent: one card slide on the first row only.
Audio-coupled idea: `card-slide-1` on row 1.
Transition mood: crossfade (0.4s) → Scene 5

### Scene 5 — Outro — 4s
Cream field. **Download the city once.** stamps at 16.02; **Then it works with nothing.** at 16.52. At 17.02 the lockup rises: app icon, **Chai Kahan**, `چائے کہاں؟`, `musaabjaved.com`. Hold; music fades over the last 1.2s. Final scene may fade to cream in the last 0.3s.
Sequential/interaction: yes, two lines then the lockup.
Audio intent: the bell resolves the film.
Audio-coupled idea: `impactBell_heavy_000` on the lockup at 17.02 (beat-locked).
Music: fades to silence by 20.0.

**Music mood for this video:** upbeat, clean
**Audio summary:** an upbeat bed from frame 0, a soft drop, a tap, a soft impact on the compass reveal, one card slide on the first stat, a bell on the lockup, then a fade.
