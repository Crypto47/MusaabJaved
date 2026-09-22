# Hyperframes Composition Brief: Arabic OCR Post-Correction

## Objective
Create a short launch-style brag video for Arabic OCR Post-Correction, the card film for `/work/arabic-ocr` on the portfolio.

## Output
- Composition directory: `films/arabic-ocr/composition/`
- Rendered video: `films/arabic-ocr/brag.mp4` → copied to `public/projects/arabic-ocr/arabic-ocr.mp4`
- Format: landscape — 1920x1080
- Duration: 20.5 seconds

## Source Material
- Project root: `github.com/Crypto47/arabic-ocr-post-correction` (clone in scratchpad/arabic-ocr)
- Primary files read: README.md, results/*.json, results/arasum_full_preds.jsonl, src layout
- Product name: Arabic OCR Post-Correction
- Tagline / strongest claim: Word error rate 41.1% → 20.4%, a 50.3% reduction, trained in 80 minutes on one laptop GPU
- Key UI or visual moment to recreate: the raw-vs-corrected Arabic line (README sample), damaged tokens marked, repairing in place
- Copy that must appear verbatim:
  - `Scanned. Indexed. Unsearchable.`
  - raw: `وأضا ف أن "بريطايا يمكن أن تؤثر على الاتحاد الأوروبى عبر الـعمل هع شركائها".`
  - corrected: `وأضاف أن "بريطانيا يمكن أن تؤثر على الاتحاد الأوروبي عبر العمل مع شركائها".`
  - second example raw `وماذا تفعل لول ايات المتحدة الأمريكية والاتحاد الأوربي؟` → fixed `وماذا تفعل الولايات المتحدة الأمريكية والاتحاد الأوروبي؟`
  - `41.1%` → `20.4%`, `CER 8.1% → 6.7%`, `200 held-out segments`, `untuned base: CER 1.81`
  - `80 minutes`, `Runs on CPU`, `No paired corpus`
  - `Sheeda/arabic-ocr-post-correction-0.5b`, `musaabjaved.com`

## Creative Direction
- Tone preset: polished
- Creative direction: quiet research film in the portfolio's house style
- Interpretation: 4 scenes, long holds, soft 0.7s crossfades, one headline rise; type carries hierarchy
- Angle: see brag-plan.md
- Hook: the damaged Arabic line, then `Scanned. Indexed. Unsearchable.`
- Outro / punchline: three facts on the beat, then the title lockup and the Hugging Face handle
- Avoid: generic SaaS language, abstract filler, any redesign away from the portfolio palette

## Visual Identity
- Background: #07090d
- Text: #dee1e7 body, #ffffff display, #b1b4ba muted
- Accent: #79b8ff / #3976bd; damage #FF9689; corrected #abecff
- Display font: Instrument Serif (assets/fonts, @font-face)
- Arabic font: Noto Naskh Arabic 400/600 (assets/fonts, @font-face)
- Body font: Instrument Sans (assets/fonts); labels IBM Plex Mono (bundled)
- Visual references from the project: README sample pair, results tables, the portfolio cover `public/projects/arabic-ocr/arabic-ocr.png`

## Storyboard
Use the storyboard in `brag-plan.md` as the creative contract.

Scene summary:
1. Hook — 4.5s — damaged line reveals RTL, coral underlines, headline rises
2. The repair — 5.5s — tokens flip to corrected, second example, model line
3. The numbers — 6s — counter 41.1→20.4, bar shrinks, stat rows on beats, landing beat-locked 13.11
4. Facts and lockup — 4.5s — three facts on 15.29/15.84/16.38, lockup at 17.47, fade

## Audio
- Audio role: low warm bed with two soft accents
- Audio arc: bed from 0, first accent at the first repair (~5.4s), bell at 13.11, soft impact at 17.47, fade out 19.1–20.5
- Music: `assets/music/happy-beats-business-moves-vol-12-by-ende-dot-app.mp3`
- Music treatment: volume 0.28, `data-fade-out="1.4"`
- Music cue guidance: `~/.claude/skills/brag/assets/music/cues/happy-beats-business-moves-vol-12-by-ende-dot-app.music-cues.json`; strong cues 8.74, 9.29, 10.93, 13.11, 17.47, 18.56; grid ≈0.55s
- Audio-reactive treatment: subtle; bass band → glow opacity 0.14–0.24 behind the Arabic line and the numerals (pre-extracted bands; skip and document if extraction fails)
- Audio-coupled moments:
  - first token repair — `assets/sfx/interface/drop_001.ogg` at 0.55
  - counter landing 13.11 — `assets/sfx/interface/bong_001.ogg` at 0.55
  - title lockup 17.47 — `assets/sfx/impact/impactSoft_medium_001.ogg` at 0.5
- SFX selection guidance: low HF-risk only; nothing on transitions
- Exact SFX choice: as above; adjust timestamps to the implemented tweens
- Audio files: already copied into `films/arabic-ocr/composition/assets/`

## Hyperframes Instructions
Monolithic standalone composition (`index.html`), scenes as `.clip` sections timed by `data-start`/`data-duration`, crossfades by 0.7s clip overlap plus inner-wrapper opacity tweens, one paused GSAP timeline keyed `main`. Fonts embedded from `assets/fonts`. `npx hyperframes check` must pass before render.
