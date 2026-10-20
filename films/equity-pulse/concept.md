# Equity Pulse card film: "The screenshot" (v1)

Built on the shape of `../references/onetake-v8-concept.md` and the Dossier Bot film (`../dossier-bot/concept.md`):
a spine, a timing table, one camera, music maths. It replaces the old Remotion card film (which only animated the
n8n workflow) at `portfolio-v2/public/projects/equity-pulse/equity-pulse.mp4`. Rendered with HyperFrames. Build lives
in `portfolio-v2/films/equity-pulse/composition/`.

Format: 1920×1080, 30 fps, 25.00 s = 750 frames. Poster: 11.55 s (the full table with verdicts and the review bar), baked as frame 0. Silent-safe: every beat reads with the sound off.

---

## CONCEPT

One object, one take. The spine is **the screenshot**. The film opens in macro on a generic brokerage app: six
holdings, prices, red and green day moves, and nothing else. The investor takes a screenshot, and that same
screenshot is the thing the camera follows: it shrinks to a thumbnail, flies into the Equity Pulse upload form, then
flies on to the analysis board, where a scan line reads it row by row and every holding lands in a table. The table
grows the answers the broker never gave: price, Graham fair value, beta risk, and a verdict. An advisor approves it,
the approval opens the PDF report, and the report folds into the investor's inbox as an attachment. Only then does
the camera pan down below the inbox to the n8n loop that did the work. At the end the screenshot comes back alone,
flips into a PDF, and the name lands.

Why this works for Equity Pulse: the product's whole promise is a transformation, "Screenshot in. Advisor-grade PDF
out." The old film showed the pipeline and never the screenshot or the report. This one shows both ends and the
table in between, and keeps the pipeline for a short "under the hood" beat.

What we kept from Dossier: macro open on the input, the camera lands before every reveal, dead-still holds where the
viewer reads, a screen-space document that opens out of a click and folds back into a smaller object, a pan down to
the workflow, a lockup on a strong cue. What we changed: the spine is a physical object (the screenshot) instead of
a composer bar, so it travels through three places instead of being typed into.

All people and data are fictional: the investor is Maya Okafor (`maya.okafor@example.com`), the brokerage app has
no name or logo, and every price, fair value, beta and analyst view is invented. The tickers and ISINs are real
public identifiers. The report carries "Illustrative report. Fictional portfolio, not investment advice."

## TIMING

Music: "Happy Beats / Business Moves vol. 9" (ende.app, bundled with /brag), 114.84 BPM, beat 0.5225 s,
bar 2.09 s. Strong cues locked: 3.70 (the screenshot leaves the phone), 12.65 (approve), 23.17 (lockup); the verdicts also land on the strong beat at 10.54.
Beat grid used for smaller entrances: 1.59, 2.65, 4.23, 4.75, 5.28, 6.08 to 7.40 (half beats), 8.44, 8.96, 9.50,
11.06, 16.34, 18.96.

```
 t              beat                                   camera                              carries into the next beat
 0.00–3.40      brokerage app, macro: header, total,   s 1.35 on the phone, dead still     the screenshot
                6 holdings, day moves. "Your broker
                shows prices." (0.35) "Not answers."
                (1.59)
 2.62           screenshot: white flash, the screen    (still)                             the thumbnail
                shrinks to a thumbnail in the corner
 3.70           the thumbnail flies into the upload    pull out 1.35 → 1.0 (the desk:      the upload form
                form (lands 4.22); the form rises in   phone + Equity Pulse form)
 4.28–5.05      filename appears; cursor clicks        dead still                          the screenshot
                "Analyse portfolio" (4.75) →
                "Uploaded · batch EP-2041"
 5.22           the screenshot flies on to the board   pan right to the board, s ~1.3      the board
 6.08–7.40      OCR: a scan line reads the screenshot  dead still                          the table
                row by row; each row lands in the
                table (ticker, ISIN, shares) on the
                half beat. Chip: GPT-4o Vision
 7.66           "6 holdings read"                      7.75 pull to the whole board, s 1.0 the table
 8.44           Price column fills (Yahoo Finance)     dead still                          (same)
 8.96           Fair value column + the Graham         (still)                             (same)
                formula footnote
 9.50           Beta risk column: Low / Normal / High  (still)                             (same)
 10.54          Verdict column (strong cue): Below /   (still)                             (same)
                Above fair value, ETF not scored
 11.06–12.95    review bar rises; cursor clicks        (still)                             the approve button
                Approve (12.65, strong cue)
 12.95–15.94    the PDF unfolds from Approve: cover,   screen-space, slow pan down page    it folds into the email
                AI-written summary, price vs fair
                value table, risk by beta
 15.85–18.70    email card; the page folds into the    dead still                          the inbox
                attachment (lands 16.32). Caption
                16.35: "Under 10 minutes in
                direct mode."
 18.70          pan down below the inbox               mail rises out, workflow rises in   the workflow
                                                       (18.96)
 19.40–22.80    "Under the hood" + the enrichment loop dead still, slow push on the graph  the screenshot icon
 22.75          screenshot → PDF icon pair             dead still                          the name
 23.17          lockup (strong cue)                    (still)                             end
 23.17–25.00    hold; music fades out over 1.5 s       (still)                             end
```

## COPY (verbatim)

- Hook: `Your broker shows prices.` / `Not answers.`
- Brokerage app (no name, no logo): `Portfolio` · `Total value` `$41,227.20` · `+$389.52 · 0.95% today` ·
  `Holdings 6` · rows (ticker, shares, value, day move): AAPL 40 shares $9,044.00 +1.2% · MSFT 12 shares $5,023.20
  -0.4% · NVDA 60 shares $7,908.00 +2.9% · JNJ 25 shares $3,810.00 -0.3% · BAC 150 shares $5,970.00 +0.6% ·
  VT 80 shares $9,472.00 +0.5%. Company names appear only on the board, after enrichment.
- Upload form: `Equity Pulse` · `New report` · `Portfolio screenshot` · `portfolio.png` · `Send report to`
  `maya.okafor@example.com` · `Review before sending` / `An advisor signs off in Google Sheets` ·
  `Analyse portfolio` → `Uploaded · batch EP-2041`
- Board: `Batch EP-2041 · 6 holdings` · chips `GPT-4o Vision` `Yahoo Finance` `Graham fair value` `Beta risk` ·
  columns `Holding` `ISIN` `Shares` `Price` `Fair value` `Beta risk` `Verdict` · footnote
  `Fair value = √(22.5 × EPS × Book value) × 1.15` · verdicts `Below fair value` / `Above fair value` /
  `ETF, not scored`
- Review bar: `REVIEW MODE` · `Approve to write the report.` · `Edit in Sheets` · `Approve` → `Approved`
- Report: `Equity Pulse · Portfolio report` · `Portfolio review` · `Prepared for Maya Okafor · 20 October 2026` ·
  summary tagged `Written by GPT-4o-mini` · `Price vs fair value` table · `Risk by beta` (Low 2, Normal 2, High 2) ·
  `Illustrative report. Fictional portfolio, not investment advice.`
- Email: `Equity Pulse` to `maya.okafor@example.com` · `Your portfolio report is ready` ·
  `Hi Maya, your report on 6 holdings is attached. An advisor reviewed it before sending.` ·
  `Portfolio report, Maya Okafor.pdf`
- Caption: `Under 10 minutes in direct mode.` (the case study states the time for direct mode; this run went
  through review, so the caption names the mode)
- Lockup icons: a phone screenshot, an arrow, a PDF tile
- Under the hood: `UNDER THE HOOD` / `An n8n loop enriches every holding.` / `Zero manual data pulls.`
- Lockup: `Equity Pulse` / `Screenshot in. Advisor-grade PDF out.` / `musaabjaved.com`

Numbers: the only product numbers are from the case study: "under 10 minutes" (direct mode, upload to report), the
Graham formula `√(22.5 × EPS × Book value) × 1.15`, the beta bands (Low below 1.0, Normal 1.0 to 1.2, High above
1.2), and "zero manual data pulls". Everything in the portfolio itself is fictional sample data.

## DESIGN TOKENS

From `EP_THEME` (`remotion/src/flow/theme.ts`), so the workflow frame from the old film sits seamlessly:
page `#020c18`, alt ground `#041e30`, teal `#14b8a6` / `#5eead4`, label `#e6fffb`, amber headline `#fbbf24`,
grid `rgba(20,184,166,0.06)`. Equity Pulse surfaces `#061a2b` with teal hairlines. The brokerage app is
deliberately neutral (graphite `#0e1116`, white text, green `#34d399` / red `#f87171`) so it reads as "someone
else's app". Verdicts: below fair value teal `#5eead4` on dark teal, above fair value amber `#fbbf24` on dark amber.
The report is a light page (`#f6f9fb`) with a deep teal header and amber rule. Type: Instrument Serif (display),
Instrument Sans (UI), IBM Plex Mono (ISINs, formula, chips).

## AUDIO

Bed at 0.30, fade out over the last 1.5 s. SFX (Kenney, CC0): click on the screenshot 2.65, soft drop when the
thumbnail lands 4.23, click on Analyse 4.75, soft drop on the verdicts 10.54, click on Approve 12.65, soft drop when
the PDF lands in the email 16.86, soft impact on the lockup 23.17. Nothing on the OCR rows: the half beats carry them.
Bass breathes the teal glow behind the scene.

## ACCEPTANCE

- `npx hyperframes check` passes (lint, runtime, layout, motion, WCAG contrast).
- Every line on screen holds at least 0.3 s per word after it settles.
- The hook reads in macro before the screenshot is taken.
- No em dashes anywhere in on-screen copy or this file.
- No real broker name or logo; no real person; nothing presented as advice.
- Web copy at 1280×720, poster baked as frame 0.
