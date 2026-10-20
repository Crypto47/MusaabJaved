# Dossier Bot card film: "The real thread" (v1)

Built on the shape of `../references/onetake-v8-concept.md` (a spine, a timing table, one camera, music maths),
for the portfolio card at `portfolio-v2/public/projects/dossier-bot/dossier-bot.mp4`. Rendered with HyperFrames,
not Remotion, because the HyperFrames registry already covers the chat, cursor and camera moves this needs.
Build lives in `portfolio-v2/films/dossier-bot/composition/`.

Format: 1920×1080, 30 fps, 25.00 s = 750 frames. Silent-safe: every beat reads with the sound off.

---

## CONCEPT

One thread, one take. The spine is **the Slack composer bar**. It is the first thing on screen, a rep types one
mention into it, and everything after is that mention being answered. The camera never cuts: it starts in macro on
the bar, pulls out to the workspace, pushes into the thread while the agent works, dives into the PDF it returns,
comes back for a second ask that costs nothing, then pans down *below* the window to the n8n workflow that did
the work. At the end the bar comes back alone and types the product's name.

Why this works for Dossier Bot: the product is invisible plumbing behind one Slack message. The old card film
showed the plumbing and never the message. This one shows the message, the wait (seconds, with each tool call
visible), the result, and only then the plumbing.

What we kept from onetake v8: the bar is the spine and the last thing on screen; dead-still holds where the viewer
must read; the camera lands before every reveal. What we changed: one bar, not three (the product has one input),
and the "shorter each time" idea becomes the cache beat: the second ask gets the same file with no new work.

All people and companies are fictional (Northwind, Sarah Chen, Ayesha Malik, Omar Haddad). No real lead data.

## TIMING

Music: "Happy Beats / Business Moves vol. 11" (ende.app, bundled with /brag), 114.84 BPM, beat 0.5225 s,
bar 2.09 s. Downbeats used: 1.60, 3.70, 5.80, 9.50, 12.65, 17.91, 22.65 (strong cues from the brag preset).

```
 t              beat                                   camera                              carries into the next beat
 0.00–3.60      composer, macro; "9:41 · call at 10"   s 2.0 on the bar, dead still        the bar
 0.40–3.40      types "@Dossier Bot Sarah Chen, Head    —                                   —
                of Ops at Northwind"
 3.70           SEND (downbeat)                        pull out 2.0 → 1.0                  the message lands in #sales
 4.75–5.25      "1 reply"; thread pane slides in        push to channel + thread, s 1.5    the thread
 5.80–9.50      agent works: 4 status lines on the     dead still                          —
                beat (5.80 / 6.86 / 7.91 / 8.96),
                each spinner turns into a check
 9.50           briefing card drops (downbeat)         push to the card, s 1.75            the card
 10.30–11.06    cursor travels, clicks                 —                                   the card opens
 11.30–15.20    PDF preview: name, what she cares       screen-space, slow pan down page    it folds back into the card
                about, posts; the real dossier
                template, scrolled top to bottom
 15.81–17.40    Omar asks again; instant reply          back to s 1.5                       —
                "Already briefed. Same file."
 17.91          DROP: pan down below the window        world rises out, workflow rises in  the workflow
 18.40–21.20    "Under the hood" + nightly line         dead still                          —
 21.40–22.40    the bar returns alone, types the name  dead still                          —
 22.65          SEND → lockup (downbeat)               —                                   end
 23.50–25.00    hold; music fades                      —                                   —
```

## COPY (verbatim)

- Context strip: `9:41 AM · Call with Northwind at 10:00`
- Typed: `@Dossier Bot Sarah Chen, Head of Ops at Northwind`
- Status lines: `Checking for an existing dossier` · `Looking up Sarah Chen by name` ·
  `Reading her profile and 12 recent posts` · `Writing the briefing`
- Reply: `Here's your briefing on Sarah Chen.` + `Sarah Chen, Northwind.pdf · 3 pages`
- Second ask: `@Dossier Bot Sarah Chen` → `Already briefed this morning. Same file, no new work.` + chip `cache hit`
- Under the hood: `Under the hood: three n8n workflows and one agent with memory.` /
  `Every night it briefs the top five leads before anyone asks.`
- Lockup: `Dossier Bot` / `Lead briefings in Slack, ready before the call.` / `musaabjaved.com`

No metrics: there are no measured outcome numbers yet, so the film states what the product does, not what it saved.

The PDF preview recreates the real Dossier Bot output template (dark header, tier badge, round portrait, executive
profile, three advantage cards, four metric tiles, competencies, recent posts, footer). Every value in it is invented:
Sarah Chen of Northwind, Austin, `sarah.chen@northwind.example`, three made-up posts. The portrait is an AI-generated
face from thispersondoesnotexist.com, so it shows no real person.

## DESIGN TOKENS

Page `#0b0716` (the old film's ground, so the workflow still sits seamlessly). Window `#1a1d21`, sidebar
`#1f1433`, top bar `#2a1a45`. Accent violet `#a78bfa` / `#c4b5fd`, coral `#fb7185` for the one headline.
UI type Lato (Slack's own face), display Instrument Serif, tool chips IBM Plex Mono.

## AUDIO

Bed at 0.30, fade out over the last 1.5 s. SFX (Kenney, CC0): click on send 3.70, soft drop on the card 9.50,
click on the cursor 11.06, soft drop on the cache reply 16.86, soft impact on the lockup 22.65. Nothing on the
status lines: the beat already carries them. Bass breathes the violet glow behind the window.

## ACCEPTANCE

- `npx hyperframes check` passes (lint, runtime, layout, motion, WCAG contrast).
- Every line on screen holds at least 0.3 s per word after it settles.
- The typed mention is readable in macro before the send.
- No em dashes anywhere in on-screen copy.
- Web copy at 1280×720, poster baked as frame 0.
