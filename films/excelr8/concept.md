# Excelr8 card film: "The spreadsheet row" (v1.1)

Built on the shape of `../dossier-bot/concept.md` and `~/Documents/Code/VIDEOS/references/onetake-v8-concept.md`
(a spine, a timing table, one camera, music maths), for the portfolio card at
`portfolio-v2/public/projects/excelr8/excelr8.mp4`. Rendered with HyperFrames. It replaces the Remotion film,
which only animated the n8n workflow graph. Build lives in `portfolio-v2/films/excelr8/composition/`.

Format: 1920×1080, 30 fps, 32.86 s = 986 frames. Silent-safe: every beat reads with the sound off.

v1.1 (owner: the n8n flow "shows for a second and then is gone"): the still workflow frame is replaced by an
animated reveal clip rendered with the old Remotion flow engine (`assets/video/flow-reveal.mp4`, 8.15 s, silent,
gitignored, regenerated from the Remotion side). It plays in full: the graph builds node by node with names, then
pulls out and holds lit, and its last frame (`assets/img/flow-end.jpg`) holds after the clip ends while the
headline reads. Everything after the beat moved 4 bars later (+8.36 s).

---

## CONCEPT

One lead, one take. The spine is **one spreadsheet row**: `Ines Moreau | fabrikam | head revops??`, blank email,
a note that says "warm?? check LI". It is the first thing on screen, selected, in a messy light-grey sheet with a
duplicate and a sticky note. The camera never cuts: it pulls out, the sheet drops into the Excelr8 dashboard on
the music's drop, and the same row is cleaned up stage by stage (company data, titles, LinkedIn signals,
qualification score). Post Radar flags it warm, a campaign fills itself in from what the enrichment found, one click
launches it, HubSpot syncs, and the KPI strip catches up by itself. Then the camera drops below the window and the
n8n workflow that did the work builds itself node by node. In the music's two-bar break a single selected
spreadsheet cell types the name, and the lockup lands on the kick that ends the break.

Why this works for Excelr8: the product is the distance between a messy row and a launched campaign. The old film
showed the plumbing and never the dashboard. This one shows the row, the clean-up, the launch and the live numbers,
and only then the plumbing.

What we kept from Dossier: camera lands before every reveal; dead-still holds where the viewer must read; status
lines with a spinner that turns into a check; one SFX per reveal; bass breathes the glow. What we changed: the
spine is a row of data instead of an input bar, and the "before" is a light, drab sheet against a dark product, so
the transformation reads in colour as well as in copy.

All people and companies are fictional (Microsoft's sample names: Fabrikam, Contoso, Tailspin, Adatum, Litware,
Proseware, Woodgrove). Emails use `.example`. No real lead data.

## TIMING

Music: `public/audio/excelr8.mp3` (Pixabay, LightBeatsMusic, "Joyful Rhythm Walk Funk"), 114.84 BPM,
beat 0.5225 s, bar 2.09 s. Track intro is light until a 0.25 s gap at 8.54 and the full groove kicks in at
**track 8.85**. `data-media-start = 4.23` (a beat), so the kick lands at **film 4.62** and the sheet drops into
the dashboard on it. Film beat grid = track beats − 4.23: 0.00, 0.52, 1.04, 1.56 … 4.67, 5.20, 5.72 …
Strong cues used (film): 9.90, 11.99 (beat), 13.56, 16.68 (beat).
The track has a near-silent two-bar break at track 31.81 to 33.85 (film 27.58 to 29.62) and the groove comes back
with a kick at track 33.90 = **film 29.68**. The v1 lockup sat at 21.38; the clip needs about 8 s more, and a
3-bar shift (27.65) would land the lockup at the start of the break, so the shift is **4 bars (+8.36 s)**, which
puts the lockup on the kick after the break (21.38 + 8.36 = 29.74 on the grid, 29.68 measured). The break
itself carries the typing. Track used: 4.23 to 37.09 of 138.29 s.

```
 t              beat                                   camera                              carries into the next beat
 0.00–3.90      the messy sheet, spine row selected;   s 1.45 → 1.50 on the sheet, drift   the row
                "Leads live in spreadsheets." 0.25,
                "Campaigns launch by hand." 1.56
 3.90–4.60      pull out; the dashboard fades up;      1.50 → 1.0                          the sheet becomes a file
                the sheet flies into the drop zone
 4.65           DROP (music drop): 6 rows land,         dead still                          the table
                "6 leads imported · 1 duplicate merged"
 5.10–5.70      -                                      push to KPIs + table, s 1.3         -
 5.72–9.30      enrichment, one stage per beat-pair:   dead still                          the score column
                company data 5.72, titles 6.76,
                LinkedIn signals 7.81, score 8.85
 9.30–9.85      -                                      push to the spine row, s 1.45       the row
 9.90           three rows turn Warm; Post Radar card  dead still                          the warm leads
                "Warm lead found" on Ines Moreau
 11.70–12.35    campaign panel slides in               to the panel, s 1.35                the panel
 12.40–12.90    fields fill themselves from the        dead still                          -
                enrichment and signals
 12.95–13.56    cursor travels, clicks Launch (13.56)  -                                   "Campaign live"
 14.07 / 14.59  status lines: Duplicates merged ·      dead still                          -
 / 15.11        Synced to HubSpot · 3 leads in sequence
 16.10–16.65    panel closes                           to the KPI strip, s 1.45            the numbers
 16.68–18.55    KPIs roll up; "zero manual reporting"  dead still                          -
 18.55–19.15    pan down below the window               world rises out                     the workflow
 18.85          "UNDER THE HOOD" eyebrow, top left     -                                   -
 19.15–27.30    n8n reveal clip plays in full: nodes    the clip's own camera glides        -
                build left to right with names,         behind the newest node, then
                then the whole graph, fully lit         pulls out (clip 5.1 to 6.5 s)
 24.50          headline as the pull-out lands         dead still                          -
 27.30–28.20    last frame holds; headline reads       dead still                          -
 28.20–28.55    workflow fades (break starts 27.58)    -                                   the cell
 28.60–29.40    a selected cell types "Excelr8"        dead still, in the silence          -
 29.68          KICK after the break: cell glows,      -                                   end
                subline and URL land
 29.68–32.86    hold; music fades over the last 1.5 s  -                                   -
```

## COPY (verbatim)

- Hook: `Leads live in spreadsheets.` / `Campaigns launch by hand.` (the card's own problem line)
- Sheet tab: `leads_final_v3 (2).csv`; sticky note: `Who is adding these to HubSpot?`
- Drop zone: `Drop a CSV, or pull from Apollo and Clay`
- Import toast: `6 leads imported · 1 duplicate merged`
- Enrichment stages: `Company data` · `Titles cleaned` · `LinkedIn signals` · `Qualification score`
- Post Radar card: `LINKEDIN POST RADAR` / `Warm lead found` / `Commented on an outbound post, 2h ago`
- Campaign panel: `New campaign` · `Filled from enrichment and signals` · Name `Q4 warm leads` ·
  Audience `Warm leads, score 80+` (`3 leads`) · Sequence `Warm intro, 3 emails` · CRM `Two-way HubSpot sync` ·
  button `Launch campaign` → `Campaign live`
- Status lines: `Duplicates merged` · `Synced to HubSpot` · `3 leads in sequence`
- KPI strip: `Leads imported` · `Enriched` · `Warm` · `In sequence` · `Synced to HubSpot`; `Live, zero manual reporting`
- Under the hood: `UNDER THE HOOD` / `n8n workflows, Apollo and Clay to HubSpot.`
- Lockup: `Excelr8` / `Campaign setup, hours down to minutes.` / `musaabjaved.com`

No invented metrics. The only outcome claim on screen is the MDX's own "Campaign setup, hours down to minutes" and
"zero manual reporting". Every other number (6 leads, scores, staff counts, 3 warm leads) is fictional demo data
inside the product UI, not a claim about results.

## DESIGN TOKENS

Built on `EX_THEME` (`remotion/src/flow/theme.ts`): page `#06050f`, alt `#0a0e1e`, cyan `#22d3ee` / `#67e8f9`,
label `#ecfeff`, AI accent fuchsia `#e879f9` (warm leads, the one headline). App window `#0c1120`, sidebar
`#080c18`, panel `#101729`, hairlines `rgba(103,232,249,0.14)`. The "before" sheet is light and drab: white,
`#f1f3f5` headers, `#dfe3e8` grid, red flags `#fde2e2` / `#b42318`, a yellow sticky. UI type Instrument Sans,
display and numbers Instrument Serif, chips IBM Plex Mono, spreadsheet Lato.

## AUDIO

Bed at 0.30 from track 4.23 for 32.86 s, fade out over the last 1.5 s. The reveal clip is muted. SFX (Kenney, CC0):
soft impact on the drop 4.65, soft drop on the warm lead 9.90, click on Launch 13.56, soft impact on the lockup
kick 29.68. Nothing on the
enrichment stages: the beat carries them. Bass breathes the cyan glow behind the window.

## ACCEPTANCE

- `npx hyperframes check` passes (lint, runtime, layout, motion, WCAG contrast).
- Every line on screen holds at least 0.3 s per word after it settles.
- The spine row is readable in the hook and is the same row the camera lands on at 9.90.
- No em dashes anywhere in on-screen copy.
- The n8n reveal clip plays start to finish with no hard rectangle edge (masked into the page).
- Web copy at 1280×720, poster baked as frame 0 (11.0 s).
