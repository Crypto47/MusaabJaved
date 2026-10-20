# Chai Kahan card film: "The needle still points" (v2)

Built on the shape of `../dossier-bot/concept.md` (a spine, a timing table, one camera, music maths), for the
portfolio card at `portfolio-v2/public/projects/chai-kahan/chai-kahan.mp4`. Rendered with HyperFrames. Build lives in
`portfolio-v2/films/chai-kahan/composition/`. Replaces the 20 s /brag cut (five scenes, push transitions).

Format: 1920×1080, 30 fps, 27.00 s = 810 frames. Silent-safe: every beat reads with the sound off.

---

## CONCEPT

One phone, one take. The spine is **the compass needle**. It opens dim and hunting next to the hook (the app's own
"heading unknown" state, needle at 30%), and it closes on the lockup pointing at the name. In between, the camera never
cuts: it tilts down from the hook to the phone, a cursor taps Allow location, it pulls out left to watch the Lahore pack
get built and poured into the phone, pushes in as the compass appears and the needle finds a dhaba, pushes again to the
status bar as airplane mode goes on, then pulls out right to a top-down map that explains, start to finish, how the
needle still knows: GPS fix, 454 places already on the phone, nearest found, bearing, heading, and the one subtraction
that is the whole product. The user turns to face it (the needle holds its direction while the phone turns around it),
walks it, and arrives: the needle spins, the phone buzzes, "Chai time!".

Why this works for Chai Kahan: the product's claim is negative space (no signal, no server, no tiles), and a claim like
that is unconvincing as text. The old cut said it; this one shows a phone that loses its signal and keeps working,
then shows why with the real maths from the case study.

What we kept from v1: the hook lines, the real onboarding copy and the Allow location tap, the compass appearing, the
Online to Offline pill flip with no sound on it, "The needle still points.", the "Download the city once." line, the
truck-art palette and fonts, the Urdu name, the track. What we dropped: the stat slide and every claim about network
requests (owner feedback). What is new: the phone is rebuilt in HTML from the real 390×844 captures and the app source,
so the camera can push to 2× without blur and the needle actually moves; the pack pipeline and the needle maths are
animated, not flashed.

All places are fictional or generic: the target dhaba is "Kadak Chai" (کڑک چائے, "strong tea"); the 454 map dots are
seeded, not real coordinates. No people are shown.

## TIMING

Music: "Happy Beats / Business Moves vol. 1" (ende.app, bundled with /brag), 120.19 BPM, beat 0.50 s, bar 2.0 s,
grid from 3.02. The track lifts at 16.02 (first 1.00-intensity cue). Strong cues locked: 16.02 (the formula),
20.02 (arrival), 23.02 (lockup). Smaller events sit on the grid: tap 5.03, classify 7.02, pack 7.52, compass 9.02,
offline 11.02, the turn 17.02.

```
 t              beat                                        camera                              carries into the next beat
 0.00–2.95      HOOK. "You want chai." 0.25 / "Your map     K0 above the phone, s 1.00 → 1.04   the dim needle
                wants signal." 1.25. A dim compass hunts
                beside them (needle at 30%, the app's own
                "heading unknown" state)
 2.95–3.80      tilt down                                   K0 → K1 onboarding, s 1.60          the onboarding card
 3.80–5.03      "Where are you?" reads; cursor in at 4.10,  dead still                          the tap
                taps Allow location on the beat (5.03)
 5.12–5.85      button reads "Asking your browser…"         ·                                   ·
 5.70–6.50      screen: "Downloading the Lahore pack…"      K1 → K2 pull out left, s 0.82       the pack
                (view swap 5.85–6.25)
 6.05–8.30      "Download the city once." Three sources,    slow drift s 0.82 → 0.84            dots pour into the phone
                Classify · dedupe (7.02), Lahore pack v1
                card (7.52), dots stream into the phone
                and the progress bar fills (7.58–8.32),
                "454 places ready" (8.30)
 9.02           compass screen; needle springs to the       K2 → K3 on the compass, s 1.35      the needle
                dhaba: Kadak Chai, dhaba, 840 m, Online
 10.45–11.00    push to the status bar and pill             K3 → K4, s 2.00                     the pill
 11.02          OFFLINE: airplane icon, bars drop, pill     dead still                          ·
                flips to "Offline · Lahore pack v1"
                (saffron dot, as in the app). Caption
                "Airplane mode. No signal at all." No SFX.
 12.55–13.35    pull out right to the map                   K4 → K5, s 0.76                     the map
 12.90–15.60    "The needle still points." GPS fix 13.10,   dead still                          ·
                454 dots spread 13.70, scan ring finds
                the nearest 14.40–14.70, bearing and
                heading rays 15.00–15.60
 16.02          "needle = bearing − heading" (strong cue)   ·                                   ·
 17.02–17.90    the turn: phone rotates 35°, the map arrow  dead still                          the needle never moves
                follows, the pink wedge closes, the needle                                      in the world
                goes to straight ahead
 17.90–19.90    the walk: you-dot travels the bearing       slow push s 0.76 → 0.78             ·
                line, 840 m counts down to 20 m
 19.40–20.00    push into the phone; it straightens;        K5 → K6, s 1.40                     ·
                the map fades (19.50)
 20.02          ARRIVAL (strong cue): needle spins, phone   dead still                          the needle
                buzzes 120 / 60 / 120 ms, "Chai time!"
                card, "You are at Kadak Chai."
 22.30–22.85    dive into the compass face                  K6 → K7 face macro, s 2.40          the face
 22.86–23.00    the lockup face takes over in place (same   screen-space                        ·
                size, same needle angle)
 23.02          LOCKUP (strong cue): the face slides left,  screen-space                        end
                its needle turns once and settles pointing
                up at the name
 23.02–27.00    hold; music fades over the last 1.5 s       ·                                   ·
```

## COPY (verbatim)

- Hook: `You want chai.` / `Your map wants signal.`
- Onboarding (real app copy): `Where are you?` · `The compass needs your location. It never leaves your phone.` ·
  `Allow location` · `Skip for now` · pressed: `Asking your browser…`
- Download (real app copy): `Downloading the Lahore pack…` then `454 places ready`
- Pipeline: `Download the city once.` · sources `OpenStreetMap` `Overture Places` `Curated list` · `Classify · dedupe` ·
  `Lahore pack v1` / `454 places · JSON` · `Into IndexedDB, on the phone`
- Compass (real layout): `Chai Kahan چائے کہاں؟` · pill `Online · Lahore pack v1` then `Offline · Lahore pack v1` ·
  `Dhabas only` · target `Kadak Chai` / `کڑک چائے` / `dhaba` / `840 m` · `‹ Prev` `1 of 5` `Next ›` · tabs
  `Compass Map List Add Packs`
- Offline caption: `Airplane mode.` / `No signal at all.`
- Map: title `The needle still points.` · steps `GPS: where you are.` · `All 454 places are already on the phone.` ·
  `Nearest one found in under 1 ms.` · `Magnetometer: which way you face.` · formula `needle = bearing − heading` ·
  ray labels `N` `heading` `bearing` · pin `Kadak Chai`
- Arrival (real app copy): `Chai time!` · `You are at Kadak Chai.` · `Open in Google Maps`
- Lockup: `Chai Kahan` / `چائے کہاں؟` / `Download the city once. The compass works with nothing.` / `musaabjaved.com`

Numbers come from the case study only: 454 places, under 1 ms, the 25 m arrival radius (the walk ends at 20 m).
`840 m`, `1 of 5` and `Lahore pack v1` are UI readouts from the real capture, not claims. No claim about network
requests appears anywhere (owner feedback on v1).

## CAMERA

`#world` (transform-origin 0 0) holds the hook, the pipeline, the phone and the map on one plane; `cam(fx, fy, s)` puts a
world point at screen centre. Element boxes are measured inside `document.fonts.ready`. Every camera move is a
`fromTo` with explicit from-values and `immediateRender: false`; the camera lands before each reveal. Screen-space
layers above the world: the offline caption and the lockup. A faint ink dot grid lives in the world so moves read
as moves.

Procedural state (phone rotation and buzz, the map rays, arcs and wedge, the walking dot, the distance readout, the
dots pouring into the phone, the GPS pulse) is a pure function of timeline time, driven by one full-length tween's
`onUpdate`, so any frame renders the same no matter which worker seeks it or in what order.

## DESIGN TOKENS

From the app (`app/globals.css`): cream `#fff5dc`, ink `#111111`, pink `#ff2e88`, saffron `#ffb000`, cobalt `#1f3fbf`,
green `#19d66b`; chamak patti stripe pink / saffron / green / cobalt at 12 px. Display Bungee, body Geist, Urdu
Noto Nastaliq Urdu with `dir="rtl"`. Needle geometry from `components/compass/Needle.tsx` (cream disc, 10 px ink border,
dashed saffron ring, pink and cobalt polygons, saffron hub). Offline dot is saffron, as in `StatusPill.tsx`.

## AUDIO

Bed at 0.34, fade out over the last 1.5 s. SFX (Kenney, CC0): click on the tap 5.03, card slide on the pack 7.52, soft
impact on the compass 9.02, soft drop when the nearest is found 14.70, glass clink on "Chai time!" 20.02, bell on the
lockup 23.02. Nothing on the offline flip: the silence is the point. Bass breathes the saffron glow behind the world.

## ACCEPTANCE

- `npx hyperframes check` passes with 0 errors.
- No bare `tl.to`; every later tween is a `fromTo` with `immediateRender: false`; baselines set at 0.
- Every line holds at least 0.3 s per word after it settles; read text is 24 px or more at its camera scale.
- No em dashes anywhere. No emoji. No network-request claims.
- Web copy at 1280×720, poster baked as frame 0.
