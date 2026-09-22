# Case-study films made with /brag + Hyperframes

The Remotion films (`remotion/`) animate real n8n workflows. The two projects here
are not workflows, so their card films were made with the
[`/brag`](https://github.com/latent-spaces/brag) skill, which plans a 15–25s
launch video and renders it with [Hyperframes](https://github.com/heygen-com/hyperframes)
(HTML + GSAP → MP4 through headless Chrome).

```
films/
  arabic-ocr/
    brag-plan.md          storyboard, tone, audio direction (Step 2 of /brag)
    composition-brief.md  handoff brief for Hyperframes (Step 3)
    share-copy.txt        one postable caption
    brag.jpg              poster frame (baked as frame 0 of the render)
    composition/          the Hyperframes project: index.html + assets/
  chai-kahan/             same layout
```

## Regenerate a film

Needs Node 22+, FFmpeg on PATH, and the brag skill installed (`~/.claude/skills/brag`).

```bash
# 1. music is not committed — copy the track named in composition-brief.md
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

Poster timestamps used: Arabic OCR 14.6s (the word-error counter, settled), Chai Kahan 10.6s (the needle still points).

`assets/music/audio-data.js` is the pre-extracted per-frame band data that drives the
subtle audio-reactive glow; regenerate it with the `hyperframes-creative` skill's
`extract-audio-data.py` if the track changes.

Screens in `chai-kahan/composition/assets/img/` are real captures of the app at 390×844
on a Lahore GPS fix (see the plan). Fonts are Google Fonts (OFL) embedded as woff2;
SFX are CC0 from Kenney via the brag skill.
