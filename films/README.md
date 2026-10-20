# Case-study films made with /brag + Hyperframes

Every card film on the portfolio is now a Hyperframes film
([Hyperframes](https://github.com/heygen-com/hyperframes): HTML + GSAP → MP4 through headless Chrome).
The first two were planned with the [`/brag`](https://github.com/latent-spaces/brag) skill. The workflow
projects (Dossier Bot, Equity Pulse, Excelr8, Zippit) used to have Remotion films (`remotion/`) that only
animated the n8n graph; their Hyperframes films show the product in use and keep one frame of that graph
for a short "under the hood" beat.

```
films/
  arabic-ocr/
    brag-plan.md          storyboard, tone, audio direction (Step 2 of /brag)
    composition-brief.md  handoff brief for Hyperframes (Step 3)
    share-copy.txt        one postable caption
    brag.jpg              poster frame (baked as frame 0 of the render)
    composition/          the Hyperframes project: index.html + assets/
  chai-kahan/             same layout
  dossier-bot/            same layout; concept.md is the timing table (also in ~/Documents/Code/VIDEOS/concepts)
  equity-pulse/           same as dossier-bot (music: brag vol. 9)
  excelr8/                same as dossier-bot (music: public/audio/excelr8.mp3, data-media-start 4.23)
  zippit/                 same as dossier-bot (music: public/audio/zippit.mp3, data-media-start 0.52)
  krownai/                frames the app's own one-take film (assets/video/, not committed)
```

The "under the hood" beat in the four workflow films is a clip, not a still: the real n8n graph
building itself left to right, rendered by the Remotion flow engine (`remotion/src/film/FlowReveal.tsx`,
compositions `*Reveal` in the "Reveals" folder). The clips are not committed; before rendering one of
those films, run `npm run render:reveals` in `remotion/`, which writes each to
`films/<slug>/composition/assets/video/flow-reveal.mp4`. Equity Pulse, Excelr8 and Zippit hold the
finished graph after the clip ends with a committed still of its last frame (`assets/img/flow-end.*`);
if a clip changes, re-extract it with `ffmpeg -sseof -0.1 -i assets/video/flow-reveal.mp4 -frames:v 1 -update 1 assets/img/flow-end.png`
(`.jpg` for Excelr8).

## Regenerate a film

Needs Node 22+, FFmpeg on PATH, and the brag skill installed (`~/.claude/skills/brag`).

```bash
# 1. music is not committed: copy the track named in composition-brief.md or concept.md
cp ~/.claude/skills/brag/assets/music/<track>.mp3 films/<slug>/composition/assets/music/

# 2. gate, then render
cd films/<slug>/composition
npx hyperframes check
npx hyperframes render --quality looks --output ../brag.mp4

# 3. poster + web copy (from films/<slug>/)
ffmpeg -ss <t> -i brag.mp4 -frames:v 1 -q:v 2 brag.jpg
ffmpeg -y -i brag.mp4 -i brag.jpg -filter_complex "[0:v][1:v]overlay=0:0:enable='eq(n,0)'[v]" \
  -map "[v]" -map 0:a? -c:v libx264 -crf 18 -preset slow -pix_fmt yuv420p -c:a copy -movflags +faststart brag.poster.mp4 \
  && mv brag.poster.mp4 brag.mp4
ffmpeg -y -i brag.mp4 -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart \
  ../../public/projects/<slug>/<slug>.mp4
```

Poster timestamps used: Arabic OCR 13.5s (line one repaired, the search finds it), Chai Kahan 12.2s (airplane mode on, the needle still points), Dossier Bot 8.0s (the agent's tool calls in the thread), Equity Pulse 11.55s (every verdict in the table), Excelr8 11.0s (enriched table with the warm-lead card), Zippit 11.5s (the English and Dutch drafts side by side). Web copies of the workflow films use `scale=1280:-2` at crf 27, audio 96k.

Authoring rule learned on Dossier Bot: the renderer seeks frames out of order across workers, so every exit tween is a `fromTo` with `immediateRender: false`, never a bare `tl.to`.

`assets/music/audio-data.js` is the pre-extracted per-frame band data that drives the
subtle audio-reactive glow; regenerate it with the `hyperframes-creative` skill's
`extract-audio-data.py` if the track changes.

Screens in `chai-kahan/composition/assets/img/` are real captures of the app at 390×844
on a Lahore GPS fix (see the plan). Fonts are Google Fonts (OFL) embedded as woff2;
SFX are CC0 from Kenney via the brag skill.
