# Arabic OCR Post-Correction card film: "The line" (v2)

Built on the shape of the Dossier Bot film (`../dossier-bot/concept.md`, itself on `onetake-v8-concept.md`): a
spine, a timing table, one camera, music maths. It replaces the v1 /brag film (four crossfaded scenes, 20.5 s) at
`portfolio-v2/public/projects/arabic-ocr/arabic-ocr.mp4`. Rendered with HyperFrames. Build lives in
`portfolio-v2/films/arabic-ocr/composition/`. A copy of this file lives in `~/Documents/Code/VIDEOS/concepts/arabic-ocr-v2.md`.

Format: 1920×1080, 30 fps, 29.50 s = 885 frames. Poster: 13.50 s (line 1 repaired, its English meaning, the
search hit and the caption "Scanned. Indexed. Searchable."), baked as frame 0. Silent-safe: every beat reads with
the sound off.

---

## CONCEPT

One line, one take. The spine is **a line of Arabic text**. The film opens in macro on a scanned page from a
fictional library bulletin. A scan beam reads the line right to left, and the line lifts off the paper into an
OCR panel, where four of its ten words come out broken. An archive search for "manuscripts" finds nothing,
because the scanner split that word in two. A cursor flips the Post-correction switch: a caret walks the line
right to left and each broken word repairs on the beat, tagged with what was wrong (dot fixed, word rejoined,
letter restored). The English meaning appears, the search runs again and finds the word. A second line repairs
faster. Then the camera pans down below the panel to the pipeline that taught the model, drawn step by step, and
down again to the measured result: word error rate 41.1% to 20.4%. The name lands last.

The headline the owner approved in v1, "Scanned. Indexed. Unsearchable.", is now built word by word across the
first beats (one word per stage), and its last word turns into "Searchable." when the corrected text is found.

Why this works for Arabic OCR Post-Correction: the product is a function on text, so v1 showed a line flipping
in place and then the numbers. This one shows why it matters (search fails on broken words), the product in use
(a switch, a caret, word-by-word repairs), the outcome a user cares about (the search hit), and only then the
plumbing and the proof.

What we kept from v1: the English translation beside both Arabic examples, the word error rate story
(41.1% → 20.4%), the palette, Noto Naskh Arabic, Instrument Serif, the vol-12 track. What we kept from Dossier:
macro open on the spine, the camera lands before every reveal, dead-still holds where the viewer reads, a pan
down below the product to the system, a lockup on a strong cue, the `#world` camera with screen-space layers above.

The two Arabic sentences are fictional and neutral, written for this film (v1 used news predictions). The page is
an illustration: its damage follows the corruption categories in the case study (dot and skeleton confusion,
word splits, dropped letters), not a logged model output. Every number on screen comes from
`src/app/work/projects/arabic-ocr/arabic-ocr.mdx`.

## TIMING

Music: "Happy Beats / Business Moves vol. 12" (ende.app, bundled with /brag), 109.96 BPM, beat 0.5457 s,
bar 2.18 s. Cue preset re-run over 0 to 32 s with the brag analyser. Strong cues locked: 13.11 (search finds the
word), 22.93 (word error rate lands, strongest cue of the window, 1.00), 25.65 (lockup). Also on strong cues:
8.74 (the switch), 17.47 (first pipeline step). Smaller entrances sit on the beat grid: 0.56, 3.82, 4.39, 4.91,
7.09, 9.83, 10.37, 10.93, 11.46, 12.02, 12.55, 14.20, 14.46 (half), 14.73, 18.02, 18.56, 19.10, 19.66, 20.19,
21.84, 23.46.

```
 t              beat                                     camera                              carries into the next beat
 0.00-3.82      scanned page, macro: bulletin title,     s 1.9 on the page lines, still      the line
                two printed lines, faded patches.
                "Scanned." (0.56). Scan beam reads
                right to left 0.90-3.40
 3.82           OCR: both lines lift off the paper       pull out to page + panel + search,  the raw text
                into the OCR panel                       s ~0.95
 4.39           "Indexed."                               still                               -
 4.91           7 broken words turn coral (4 of 10 in    still                               -
                line 1, 3 of 7 in line 2); legend
 5.80-6.80      search types مخطوطات (manuscripts)       still                               -
 7.09           "0 results. The scanner split the        still                               the switch
                word in two." Coral ring on the split
                word. "Unsearchable."
 7.64-8.74      cursor travels to the Post-correction    still                               -
                switch; click 8.74 (strong): switch on,
                "Qwen2.5-0.5B + LoRA"
 8.85-9.55      -                                        push in to line 1, s 1.42           line 1
 9.55-11.75     caret walks right to left; repairs on    still                               -
                9.83 / 10.37 / 10.93 / 11.46, each with
                a tag
 12.02          English meaning under line 1             12.10-12.70 ease to line + search   the search
 12.55          cursor clicks Search                     still                               -
 13.11          "1 result", blue hit on the word,        still                               -
                caption flips to "Searchable." (strong)
 13.64-14.15    -                                        to line 2, s 1.42                   line 2
 14.20-14.73    line 2: three repairs on 14.20 / 14.46   still                               -
                / 14.73
 15.00          English meaning under line 2             still                               -
 17.00          pan down: the world rises out            world up and out, layer rises in    the pipeline
 17.47-20.19    UNDER THE HOOD: six steps draw on the    screen-space, still                 -
                beat (17.47 strong): clean Arabic text,
                damage it like a scanner (قاعة → فاعة,
                the dot falls), 57k training pairs,
                LoRA fine-tune, greedy decode, drift
                guardrail. A pulse runs the chain
                20.40-21.30
 21.50          pan down again: the result rises in      layer up and out, next rises in     the number
 21.84-22.93    WER 41.1% → 20.4% rolls, lands on 22.93  still                               -
                (strongest cue); bar halves; chip "Half
                the word errors"
 23.46          CER 8.1% → 6.7%; 200 held-out segments,  still                               -
                greedy decoding
 25.30          the result rises out                     -                                   -
 25.65          lockup (strong cue)                      still                               end
 25.65-29.50    hold; music fades over the last 1.5 s    -                                   -
```

## COPY (verbatim)

- Page title (Arabic, Naskh 600): `نشرة المكتبة العامة` ("Public Library Bulletin")
- Line 1, correct: `افتتحت المكتبة العامة قاعة جديدة للمخطوطات القديمة في وسط المدينة.`
  OCR: `افتتحت المكتنة العامة فاعة جديدة للمخطو طات القديمة في وسط المدنة.`
  Repairs: `المكتنة → المكتبة` (dot fixed: ن → ب), `فاعة → قاعة` (dot fixed: ف → ق),
  `للمخطو طات → للمخطوطات` (word rejoined), `المدنة → المدينة` (letter restored: ي)
  English: `The public library opened a new hall for old manuscripts downtown.`
- Line 2, correct: `يبدأ معرض الكتاب السنوي يوم الخميس المقبل.`
  OCR: `يبدأ معرض الكثاب السن وي يوم الحميس المقبل.`
  Repairs: `الكثاب → الكتاب` (dot fixed: ث → ت), `السن وي → السنوي` (word rejoined), `الحميس → الخميس` (dot fixed: ح → خ)
  English: `The annual book fair starts next Thursday.`
- Caption: `Scanned.` `Indexed.` `Unsearchable.` → `Searchable.`
- Panel: `OCR OUTPUT` · legend `broken by the scanner` / `repaired by the model` · switch `Post-correction` · `Qwen2.5-0.5B + LoRA` ·
  label `MEANING` beside each English line · repair tags `dot fixed`, `word rejoined`, `letter restored`
- Search: `ARCHIVE SEARCH` · query `مخطوطات` · hint `manuscripts` · `0 results` / `The scanner split the word in two.` →
  `1 result` / `Found in the repaired text.`
- Pipeline: `UNDER THE HOOD` · `How the model learned the repair.` · `Clean Arabic text` / `news corpus` · `Damage it like a scanner` / `قاعة → فاعة` ·
  `57k training pairs` / `noisy → clean` · `LoRA fine-tune` / `0.5B, 80 min, laptop GPU` · `Greedy decode` /
  `one right answer` · `Drift guardrail` / `rewrites rejected`
- Result: `WORD ERROR RATE` · `41.1%` → `20.4%` · `raw OCR` → `after correction` · chip `Half the word errors` ·
  `Character error rate` / `8.1% → 6.7%` · `Tested on` / `200 held-out segments, greedy decoding`
- Lockup: the corrected line 1 in Naskh above `Arabic OCR Post-Correction` / `Scanned Arabic, made searchable.` /
  `A 0.5B model. Runs on CPU, on-premise.` / `Sheeda/arabic-ocr-post-correction-0.5b · musaabjaved.com`

## CAMERA

`#world` (page, OCR panel, search, cursor, caret, hit rings) is moved by `cam(fx, fy, s)`: world point (fx, fy)
lands at screen centre at scale s. Boxes are measured inside `document.fonts.ready` before any transform.
K0 macro on the page lines (s 1.9), K1 the whole desk (fit, ~0.95), K2 line 1 (s 1.42), K3 line 1 + search (fit),
K4 line 2 (s 1.42), then the world rises out (y −1300) for the pan down. Screen-space layers above the world:
the caption, the pipeline, the result, the lockup.

## DESIGN TOKENS

Ground `#07090d`, panel `#0f141c`, paper `#e9e0c9` with ink `#2f2a22`. Accent blue `#79b8ff` / `#3976bd`,
damage coral `#ff9689`, repaired `#abecff`. Display Instrument Serif, UI Instrument Sans 400/500, labels IBM Plex
Mono 400/500, Arabic Noto Naskh Arabic 400/600. All embedded as local woff2.

## AUDIO

Bed at 0.28, fade out over the last 1.5 s. SFX (Kenney, CC0): switch on 8.74, soft drop on the first repair 9.83,
click on Search 12.55, soft drop on the search hit 13.11, bell when the word error rate lands 22.93, soft impact on
the lockup 25.65. Nothing on the other repairs, the pans or the pipeline steps: the beat carries them. Bass
breathes the blue glow behind the world (`assets/music/audio-data.js`, 885 frames, regenerated for this length).

## ACCEPTANCE

- `npx hyperframes check` passes with 0 errors.
- Every tween after a baseline is `fromTo` with `immediateRender: false`; baselines are `tl.set` at 0. No bare `tl.to`.
- No CSS `transform` on anything GSAP animates; every `<audio>` has an id; no `repeat: -1`, `Math.random`, `Date.now`.
- Arabic is real, shaped Noto Naskh with `dir="rtl"`; English meaning beside both examples.
- Every line holds at least 0.3 s per word after it settles; body text at least 24 px at the camera scale where it is read.
- No em dashes anywhere in on-screen copy, this file or the share copy.
- Web copy at 1280×720, poster baked as frame 0.
