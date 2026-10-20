# Zippit card film: "Written once, in two languages" (v1)

Built on the shape of `../dossier-bot/concept.md` and `VIDEOS/references/onetake-v8-concept.md` (a spine, a timing
table, one camera, music maths), for the portfolio card at `portfolio-v2/public/projects/zippit/zippit.mp4`.
Rendered with HyperFrames. Build lives in `portfolio-v2/films/zippit/composition/`.

Format: 1920×1080, 30 fps, 32.68 s = 981 frames. Silent-safe: every beat reads with the sound off.

---

## CONCEPT

One article, one take. The spine is **the headline**. It is the first thing on screen, typed into an empty draft
in macro, and everything after is that headline travelling: it gets researched and cited, written, approved by
one person, split into English and Dutch, published to the store's blog at one URL, and becomes one cell in a month
of two posts a day. The camera never cuts: it starts in macro on the headline, pulls out to the content desk, pushes
into the draft while sources arrive, then pans straight down a single tall world (desk, the two-language split, the
storefront, the calendar, the workflow). At the end the empty headline field comes back alone and types the
product's name.

Why this works for Zippit: the old card film only animated the n8n graph. A reader never sees the graph; they see
an article in their language, and the client sees a calendar that fills itself. This film shows those first and
keeps the graph for an "under the hood" beat that plays in full: a reveal clip rendered with the old Remotion flow
engine builds the graph node by node, glides through both language lanes, then pulls out to the whole graph, so the
last beat rhymes with the split.

v1.1 (after the owner said the flow "shows for a second and then is gone"): the still workflow frame became the
8.76 s reveal clip, and everything after it moved four bars (7.68 s) later, so the lockup still lands on a strong
beat (29.28, intensity 0.91).

Tone: polished, respectful to the client. The cadence is framed as something per-article pricing could not reach,
never as something the client could not do. Article topics are plausible breathing and sleep topics; titles are
invented and nothing claims a medical outcome. Sources are fictional (`.example` domains).

## TIMING

Music: `zippit.mp3` (Pixabay, AlexGuz, "funk amp breakbeat"). Measured beat grid ~125 BPM, beat 0.48 s,
bar 1.92 s (CREDITS lists 83 BPM; the onset grid says 0.48 s beats). The track opens with 0.5 s of silence, so the
bed starts at `data-media-start="0.52"`, which puts a downbeat on film 0.00. Film downbeats then fall on
0.00 / 1.92 / 3.84 / 5.76 / 7.68 / 9.60 / 11.52 / 13.44 / 15.36 / 17.28 / 19.20 / 21.12 / 23.04 / 24.96 /
26.88 / 28.80 / 30.72 / 32.64.
Strong cues used (film time): 3.84 pull out, 5.76 brand source, 7.68 quality checks, 9.60 split,
15.36 calendar, 19.20 under the hood, 29.28 lockup.

```
 t              beat                                    camera                              carries into the next beat
 0.00–3.84      draft, macro; "06:00 · First topic       s 1.8 on the headline, dead still   the headline
                of the day"; headline types itself
 3.84           pull out (strong)                       1.8 → 1.0, the whole content desk    the desk
 4.50           push to draft + research rail           s 1.3                               the draft
 4.80/5.28      two Perplexity sources drop                dead still                          ·
 5.76           Pinecone brand-voice source (strong)       ·                                   ·
 5.95–7.40      the draft writes itself, citation       ·                                   ·
                markers [1] [2] pop as it types
 7.68           four quality checks tick (strong)       ·                                   ·
 8.30–9.12      cursor travels, clicks Approve          ·                                   the approved draft
                (the single review checkpoint)
 9.60           SPLIT: pan down, the draft divides      pan down to the split, s 1.0        the article, twice
                into English and Dutch (strong)
 9.90–12.40     "Written once, in two languages."       dead still                          ·
 12.48          pan down to the store's blog            s 1.0                               the published page
 13.00          "Published" toast                       slow push 1.0 → 1.04                ·
 13.92          language switch EN → NL, URL stays;     ·                                   ·
                "One URL, both languages."
 15.36          pan down to October (strong)            s 1.0                               the calendar
 16.00–17.20    days 1 to 20 fill with two posts each   dead still                          ·
 17.28          today's cell lights up: our article     ·                                   ·
 19.20          pan down to the workflow (strong)       s 1.0                               the workflow
 19.90–28.66    the reveal clip plays in full           the clip's own camera: glides        ·
                (flow-reveal.mp4, 8.76 s): nodes build   behind the newest node through
                left to right with names, both lanes     both lanes, pulls out at
                                                         clip 5.8–7.2 (film 25.7–27.1)
 25.80–28.98    "Under the hood" + one line, above      dead still once the pull-out lands   ·
                the graph as the pull-out lands
 28.60–28.98    the clip's last frame holds as a still  ·                                   ·
 29.28          the headline field returns alone,       screen space                        end
                types the name (strong)
 30.24–31.08    sub in English, then Dutch; URL         ·                                   ·
 31.08–32.68    hold; music fades                       ·                                   ·
```

## COPY (verbatim)

- Context strip: `06:00 · First topic of the day`
- Desk: `Content desk` / `Zippit Journal · EN + NL`
- Topic queue: `Nose breathing at night: a beginner's guide` (Writing) · `Why you wake up with a dry mouth`
  (Today 14:00) · `A wind-down routine that sticks` (Tomorrow) · `Sleeping well while travelling` (Tomorrow)
- Headline (typed): `Nose breathing at night: a beginner's guide`
- Meta: `A calm, practical guide to breathing through your nose at night.`
- Sources: `[1] Nasal breathing during sleep: a review` · `journal.example` (Perplexity) ·
  `[2] Breathing patterns in sleep, a primer` · `sleep-research.example` (Perplexity) ·
  `Zippit brand voice and past posts` · `brand store` (Pinecone)
- Draft body: H2 `Why breathe through your nose?` + `Nose breathing at night is a habit you can build, step by step.`
  with markers `[1]` `[2]`, then H2 `A simple routine for tonight`
- Checks: `2 citations` · `Brand voice grounded` · `Internal links` · `Meta description`
- Review: `Review checkpoint` + button `Approve` → `Approved`
- Split caption: `Written once, in two languages.`
- Dutch card: `Concept · NL` / `Neusademhaling ’s nachts: een beginnersgids` / H2 `Waarom door je neus ademen?` /
  `Door je neus ademen tijdens het slapen is een gewoonte die je stap voor stap opbouwt.`
- Store page: path `/blogs/journal/nose-breathing-at-night`, nav `Shop · Sleep · Journal`, toggle `EN | NL`,
  eyebrow `Journal · 4 min read` → `Journal · 4 min leestijd`, toast `Published to the store blog`,
  chip `One URL, both languages.`
- Calendar: `October 2026`; heading `Two articles a day. Every day.`; sub `$50 to $100 a month in API costs.`
- Under the hood: eyebrow `UNDER THE HOOD`; `One pipeline. One human checkpoint.`
- Lockup: typed `Zippit AI Content Engine`; `Two SEO articles a day. Two languages.`;
  `Twee SEO-artikelen per dag. Twee talen.`; `musaabjaved.com`

Numbers on screen come only from the case study: two articles a day, English and Dutch, $50 to $100 a month in API
costs, one review checkpoint. The storefront is a generic blog page, not Shopify's admin, and no logo appears; the
name "Zippit" appears as plain text only.

## DESIGN TOKENS

Ground `#030d06` / `#061e0c` (ZP_THEME, so the workflow frame sits seamlessly). Green `#4ade80` / `#86efac`,
label `#f0fff4`, orange `#fb923c` for citations (ZP_THEME's AI-edge colour). Article paper `#f4f7f1` with ink
`#0f1f14`, so the content reads as a document, not a dashboard. Display Instrument Serif (headlines are editorial),
UI Instrument Sans, chips and URLs IBM Plex Mono.

## AUDIO

Bed at 0.32 from 0.52 s into the track, fade out over the last 1.5 s. SFX (Kenney, CC0): soft drop on the first
source 4.80, click on Approve 9.12, soft drop as the Dutch card lands 10.05, click on the language switch 13.92,
soft drop as today's cell lights 17.28, soft impact on the lockup sub 30.24. The reveal clip is muted. Bass breathes the green glow.

## ACCEPTANCE

- `npx hyperframes check` passes (lint, runtime, layout, motion, WCAG contrast).
- Every line on screen holds at least 0.3 s per word after it settles; body text ≥ 24 px at the scale it is read.
- The headline is readable in macro before the pull out.
- Dutch reads as natural Dutch.
- The reveal clip plays start to finish; its edges are masked into the ground so no rectangle shows, and the
  caption never overlaps the graph.
- No em dashes anywhere. No invented metrics.
- Web copy at 1280×720, poster baked as frame 0 (poster: 11.5 s, the English and Dutch cards under "Written once, in two languages.").
