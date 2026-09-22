# Hyperframes Composition Brief: Chai Kahan

## Objective
Create a short launch-style brag video for Chai Kahan, the card film for `/work/chai-kahan` on the portfolio.

## Output
- Composition directory: `films/chai-kahan/composition/`
- Rendered video: `films/chai-kahan/brag.mp4` → copied to `public/projects/chai-kahan/chai-kahan.mp4`
- Format: landscape — 1920x1080
- Duration: 20 seconds

## Source Material
- Project root: `C:/Users/Musab/Documents/Code/chai` (private repo `Crypto47/chai-kahan`)
- Primary files read: README.md, docs/superpowers/specs/2026-09-10-chai-kahan-design.md, app/layout.tsx (fonts), app/globals.css (palette), components/compass/Needle.tsx, views/*, public/packs/lahore.json (454 places)
- Product name: Chai Kahan · چائے کہاں؟
- Tagline / strongest claim: "Open it once with signal to download the Lahore pack; after that the compass works with no network at all."
- Key UI or visual moment to recreate: the real compass screen (`Chaaye Khana · dhaba · 840 m`, pill `Online · Lahore pack v1`) and the onboarding card `Where are you?` with its `Allow location` button. Real screenshots at 390×844 live in `assets/img/` (onboarding.png, compass.png, list.png, packs.png).
- Copy that must appear verbatim:
  - `You want chai.` / `Your map wants signal.`
  - `Where are you?` · `The compass needs your location. It never leaves your phone.` · `Allow location`
  - `Chaaye Khana` · `840 m` · `Online · Lahore pack v1` / `Offline · Lahore pack v1`
  - `454`, `0 network requests after install`, `< 1 ms`
  - `Download the city once.` / `Then it works with nothing.`
  - `Chai Kahan`, `چائے کہاں؟`, `musaabjaved.com`

## Creative Direction
- Tone preset: default
- Creative direction: truck-art maximalism kept legible
- Interpretation: 5 scenes, 3–5s, snappy pushes and crossfades, stamped Bungee lines, one bell
- Angle: see brag-plan.md
- Hook: `You want chai.` + a `No Service` pill + `Your map wants signal.`
- Outro / punchline: `Download the city once. Then it works with nothing.` then the lockup
- Avoid: generic SaaS language, abstract filler, a dark redesign of a cream app

## Visual Identity
- Background: #fff5dc cream
- Text: #111111 ink; cream on ink panels
- Accent: #ff2e88 pink, #ffb000 saffron, #1f3fbf cobalt, #19d66b green
- Display font: Bungee (assets/fonts, @font-face)
- Urdu font: Noto Nastaliq Urdu (assets/fonts, @font-face)
- Body font: Geist 400/500/600 (assets/fonts, @font-face)
- Visual references from the project: Needle.tsx geometry (cream disc, 10px ink border, dashed saffron ring, pink/cobalt polygons, saffron hub), app icon `assets/img/icon.png`, the body stripe motif

## Storyboard
Use the storyboard in `brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 3.5s — two stamped lines and a pink pill
2. Reveal — 4.5s — title stack, phone rises with onboarding, cursor taps Allow location, screen swaps to the compass
3. The point — 4s — pill flips Online → Offline, `The needle still points.`, needle swings
4. The numbers — 4s — list + packs phones, three stats on 12.52 / 13.51 / 14.52
5. Outro — 4s — two lines at 16.02 / 16.52, lockup at 17.02, fade

## Audio
- Audio role: upbeat bed with a light UI layer
- Audio arc: bed from 0; drop at the pill; click on the tap; soft impact on the compass; card slide on stat 1; bell on the lockup; fade 18.8–20
- Music: `assets/music/happy-beats-business-moves-vol-1-by-ende-dot-app.mp3`
- Music treatment: volume 0.34, `data-fade-out="1.2"`
- Music cue guidance: `~/.claude/skills/brag/assets/music/cues/happy-beats-business-moves-vol-1-by-ende-dot-app.music-cues.json`; tempo 120.19, grid 0.50s from 3.02; strong cues 16.02, 17.02, 17.52, 18.02
- Audio-reactive treatment: subtle; bass → saffron ring scale 1.00–1.03 and panel shadow (skip and document if extraction fails)
- Audio-coupled moments:
  - pill slide ~1.2 — `assets/sfx/interface/drop_001.ogg` 0.6
  - tap ~5.9 — `assets/sfx/interface/click_003.ogg` 0.7
  - compass reveal ~6.3 — `assets/sfx/impact/impactSoft_medium_001.ogg` 0.6
  - stat 1 at 12.52 — `assets/sfx/casino/card-slide-1.ogg` 0.55
  - lockup 17.02 — `assets/sfx/impact/impactBell_heavy_000.ogg` 0.6
- SFX selection guidance: low/medium HF risk; nothing within 0.3s of another cue
- Audio files: already copied into `films/chai-kahan/composition/assets/`

## Hyperframes Instructions
Monolithic standalone composition, `.clip` scenes with overlap for crossfades and push slides on inner wrappers, one paused GSAP timeline keyed `main`. Phone screenshots are `<img>` elements inside the scenes at native 390×844 (never upscaled). `npx hyperframes check` must pass before render.
