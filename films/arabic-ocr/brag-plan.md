# Brag Plan: Arabic OCR Post-Correction

## What is this app?
A 0.5B language model, fine-tuned with LoRA on 57k synthetic pairs, that repairs Arabic OCR output so scanned archives become searchable: word error rate falls from 41% to 20% on held-out text.

## The angle
A scanned archive is stored, indexed and useless. Not because the scanner missed pages, but because Arabic letters share skeletons and differ by dots, so a lost dot changes the letter and one wrong letter breaks the word. The video shows one real broken line healing, then lets the numbers do the talking. Quiet, exact, no adjectives. The joke, if there is one, is the untuned base model scoring worse than doing nothing.

## Hook (first 2-3 seconds)
A real raw-OCR line in large Naskh, damaged tokens underlined in coral, with the mono label `RAW OCR · 8.1% OF CHARACTERS WRONG`. Then the serif headline lands: **Scanned. Indexed. Unsearchable.** The viewer sees the damage before they read a word of English.

## Key moments (the middle)
- The same line repairs in place: each coral token crossfades to its corrected form in pale blue, the label flips to `CORRECTED`, and a second short real example follows. These are real predictions from `results/arasum_full_preds.jsonl`, not invented text.
- The word-error counter runs down 41.1% → 20.4% in big serif numerals while a bar shrinks beside it; CER 8.1% → 6.7% sits underneath in mono. `200 held-out segments · greedy decoding · guardrail on`.
- Three quiet facts, one per beat: `80 minutes · one laptop GPU`, `Runs on CPU, on-premise`, `No paired corpus existed, so the data was generated`.

## Outro / punchline
Title lockup: **Arabic OCR Post-Correction**, then the Hugging Face handle `Sheeda/arabic-ocr-post-correction-0.5b` and `musaabjaved.com`. Music resolves and fades under it.

## User flow worth showing
Noisy line in → corrected line out. The product is a function on text, so the flow is the repair itself: broken tokens → fixed tokens, then the metric that proves it was a repair and not a rewrite (the guardrail line in scene 3).

## Tone
- Preset: polished
- Creative direction: quiet research film in the portfolio's own house style; the same dark ground, serif and blue as the other case-study films so it sits beside them on the card
- Interpretation: 4 scenes, 4–6s holds, soft crossfades, nothing slams except the one headline; typography carries hierarchy, motion stays inside 0.4–0.8s eases

## Format: landscape — 1920x1080
## Duration: 20.5s

## Visual identity (from the project)
- Background: #07090d (portfolio page ground)
- Accent: #79b8ff (brand weak) / #3976bd (brand solid); damage marks #FF9689; corrected glow #abecff
- Text: #dee1e7 body, #ffffff display, #b1b4ba muted
- Display font: Instrument Serif 400 (embedded woff2)
- Arabic font: Noto Naskh Arabic 400/600 (embedded woff2)
- Body / data font: Instrument Sans 400/500 (embedded) and IBM Plex Mono (bundled) for labels and numbers
- Strongest visual element: the raw-vs-corrected Arabic line from the README and the cover image

## Share copy (draft)
Introducing Arabic OCR Post-Correction: a 0.5B model that halves the word error rate of scanned Arabic text, trained in 80 minutes on one laptop GPU. Built with Qwen2.5-0.5B, LoRA and 57k synthetic pairs.

## Audio direction
- Role: low warm bed with two soft accents
- Music: `happy-beats-business-moves-vol-12-by-ende-dot-app.mp3` (steady and clean, the polished pick)
- Music treatment: start at 0, volume 0.28, fade out over the final 1.4s under the title lockup
- Music cue guidance: preset read from `assets/music/cues/…vol-12…music-cues.md`; tempo 109.96 BPM. Strong cues in window: 8.74, 9.29, 10.93, 13.11, 17.47, 18.56. Lock the counter's landing to 13.11 and the title lockup to 17.47. Beat grid ≈0.55s; the three outro facts arrive on 15.29 / 15.84 / 16.38 (every beat is fine, they are 3–5 words each and hold).
- Audio-reactive treatment: subtle; bass energy breathes the blue glow behind the Arabic line and the numerals (opacity 0.14–0.24). No bars, no waveforms.
- SFX posture: sparse, professional. Three cues total.
- Audio-coupled moments: token repair (one soft `drop_001` on the first token flipping), counter landing (`bong_001`), title lockup (`impactSoft_medium_001`)
- Restraint rule: no SFX on the per-token flips after the first, no sound on transitions, nothing above 0.6

## Storyboard

### Scene 1 — Hook — 4.5s
Dark ground with a faint blue radial glow upper-left and a very large ghost `٪` mark at 6% opacity drifting slowly. Mono label `RAW OCR · 8.1% OF CHARACTERS WRONG` fades up at 0.2s. The damaged Arabic line (Naskh 64px, right-to-left) reveals word by word from the right over 1.2s; the damaged tokens carry a coral wavy underline. At 2.2s the serif headline **Scanned. Indexed. Unsearchable.** rises 24px and settles; it holds 2.3s.
Sequential/interaction: yes, the Arabic words appear one by one right-to-left (7 words, 0.16s apart, ≤1.2s total).
Audio intent: the bed is already playing; nothing else.
Audio-coupled idea: none (words are read, not tapped).
Music: steady, low.
Transition mood: soft → Scene 2 (0.7s crossfade)

### Scene 2 — The repair — 5.5s
Same layout so the eye does not move. The label flips to `CORRECTED · 0.5B MODEL · GREEDY DECODE`. Each coral token crossfades to its corrected form in pale blue with a 0.3s glow bloom, right-to-left, 0.35s apart. Beneath, the serif line **A 0.5B model that repairs Arabic OCR.** rises at 1.6s. At 3.4s the line is replaced by a second, shorter real example already corrected: raw `لول ايات المتحدة` shown small and struck, fixed `الولايات المتحدة` large. Mono footnote `Qwen2.5-0.5B · LoRA r=32 · 57k synthetic pairs`.
Sequential/interaction: yes, five tokens repair one by one; hold the finished line ≥1.2s before the second example.
Audio intent: one soft confirmation on the first repair, then let the music carry.
Audio-coupled idea: `drop_001` on the first token flip.
Transition mood: soft → Scene 3 (0.7s crossfade)

### Scene 3 — The numbers — 6s
Split frame. Left 58%: mono label `WORD ERROR RATE`, giant serif numeral counting 41.1% → 20.4% over 1.6s (ease out, tabular figures) and a horizontal bar shrinking with it from full to half; a small `−50.3%` chip lands as the count stops. Right 42%: a quiet stat stack that arrives on consecutive beats: `CER 8.1% → 6.7%`, `200 held-out segments`, `untuned base model: 1.81 CER (worse than doing nothing)`. Footer mono: `greedy decoding · drift guardrail ≤ 0.20`.
Sequential/interaction: yes, the counter runs, then three stat rows arrive one per beat (0.55s apart) and hold for the rest of the scene.
Audio intent: the count landing is the film's one "click".
Audio-coupled idea: counter lands on strong cue 13.11s with `bong_001`; the rows snap to 13.64 / 14.20 / 14.73.
Transition mood: soft → Scene 4 (0.7s crossfade)

### Scene 4 — Facts and lockup — 4.5s
Three facts in a row across the top third, each a serif phrase over a mono caption, arriving left to right on 15.29 / 15.84 / 16.38: **80 minutes** / `one RTX 5070 Ti laptop GPU`; **Runs on CPU** / `on-premise, archives that cannot leave the building`; **No paired corpus** / `so the training data was generated`. At 17.47 the title lockup **Arabic OCR Post-Correction** rises center-bottom with `Sheeda/arabic-ocr-post-correction-0.5b` and `musaabjaved.com` beneath. Everything holds; music fades out over the last 1.4s. Final scene may fade to the ground in the last 0.4s.
Sequential/interaction: yes, three facts on consecutive beats, then the lockup.
Audio intent: resolve.
Audio-coupled idea: `impactSoft_medium_001` on the lockup at 17.47 (beat-locked).
Music: fades to silence by 20.5.

**Music mood for this video:** polished, steady
**Audio summary:** a low clean bed from frame 0, one soft drop on the first repair, a bell on the metric landing, a soft impact on the title, then a fade to silence.
