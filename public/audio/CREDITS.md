# Audio credits

Original filenames are recorded here because renaming them for clarity loses
the artist attribution. Pixabay's licence does not require attribution, but
keeping the provenance makes it possible to find the track again or check the
terms later.

| File in repo | Original filename | Source |
|---|---|---|
| `excelr8.mp3` | `lightbeatsmusic-joyful-rhythm-walk-funk-513936.mp3` | Pixabay — LightBeatsMusic |
| `zippit.mp3` | `alexguz-funk-amp-breakbeat-upbeat-advertising-happy-cook-541097.mp3` | Pixabay — AlexGuz |
| `funky.mp3` | `funky.mp3` | unknown — predates this work, used by the legacy compositions |
| `faaahhh.wav` | `faaahhh.wav` | sound effect, played by the /seeker page |

## Measured characteristics

Taken over the first 50 seconds, which is all the films use.

| File | Duration | Mean dBFS | BPM | Dynamics | Brightness (ZCR/s) |
|---|---|---|---|---|---|
| `excelr8.mp3` | 138.3s | −13.2 | 115 | 0.69 | 1121 |
| `zippit.mp3` | 124.8s | −13.6 | 83 | 0.45 | 1823 |
| `funky.mp3` | 27.0s | −17.1 | 97 | 0.60 | 886 |

Both new tracks are longer than the 50s films, so they never loop. `funky.mp3`
is shorter and does loop, which is why it needs the seam dip in
`src/film/music.ts`.

Regenerate this table with `npm run audio-info` from `remotion/`.
