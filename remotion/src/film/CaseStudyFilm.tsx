/**
 * The shared case-study film skeleton.
 *
 * Three projects use this. Writing the eight-beat structure out once per
 * project is exactly the failure this codebase already suffers from — the
 * ep/, ex/ and zp/ folders are three near-identical copies of five components
 * differing only in palette. So the structure lives here and each film is a
 * config.
 *
 * The beat timings encode retention evidence rather than taste:
 *
 *   - No title card. Frame 0 is the real workflow already mid-execution: a
 *     floating logo open measurably lowers view-through, while the product on
 *     screen early raises it, and static first frames lose to motion.
 *   - The judgment beat sits in act three, landing around 22-30s. Of viewers
 *     who reach 3s roughly 65% reach 10s and 45% reach 30s, so anything that
 *     has to be seen cannot wait for the final third.
 *   - Text carries the narration, because most viewers watch muted. Copy is
 *     budgeted near 70 words for the whole film.
 *   - Metrics count up for about a second then hold several more, since a
 *     number needs time on screen to register.
 *
 * DURATION MATH: TransitionSeries overlaps adjacent scenes, so the film runs
 * shorter than the sum of its sequences — total = Σ sequences − Σ transitions.
 * 1590 − 90 = 1500 frames (50s). Sequence durations are inlined rather than
 * computed so they stay editable in Studio.
 */
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { AbsoluteFill, Audio, interpolate, staticFile } from "remotion";
import type { FlowTheme } from "../flow/theme";
import type { FlowGraph } from "../flow/types";
import { EndCard } from "./EndCard";
import type { FocusStop } from "./FlowAct";
import { FlowAct } from "./FlowAct";
import { IdentityBadge } from "./IdentityBadge";
import type { Metric } from "./MetricsScene";
import { MetricsScene } from "./MetricsScene";
import type { MusicTrack } from "./music";
import { TextCard } from "./TextCard";

export const FILM_FPS = 30;
export const FILM_WIDTH = 1920;
export const FILM_HEIGHT = 1080;
export const FILM_DURATION = 1500;

/** Every transition: long enough to read, short of sluggish. */
const T = 15;

/** Music bed level. There is no voiceover competing with it, so it can sit up. */
const MUSIC_LEVEL = 0.58;

/** Beat lengths. Sum 1590; less 6 transitions of 15 gives FILM_DURATION. */
const BEATS = {
  hook: 90,
  problem: 165,
  act1: 210,
  act2: 240,
  act3: 225,
  act4: 195,
  proof: 270,
  cta: 195,
} as const;

/** Frame the persistent name mark appears / hands over to the end card. */
const BADGE_FROM = 240;
const BADGE_UNTIL = 1305;

export interface ActConfig {
  graph: FlowGraph;
  eyebrow: string;
  title: string;
  focusStops: FocusStop[];
  stagger?: number;
  focusAt?: number;
}

export interface CaseStudyFilmProps {
  theme: FlowTheme;
  /** Project name, shown as the eyebrow on the opening beat. */
  project: string;
  hook: {
    graph: FlowGraph;
    /** Result-first, 5-8 words. */
    title: string;
    stagger?: number;
    /** Negative: how far into the reveal the graph already is at frame 0. */
    revealFrom?: number;
    /** Vertical framing for graphs whose mass is off-centre in their bounds. */
    wideAnchorY?: number;
  };
  problem: { headline: string; subline?: string };
  /** Exactly four: the pipeline read left to right. */
  acts: [ActConfig, ActConfig, ActConfig, ActConfig];
  metrics: Metric[];
  cta: {
    name: string;
    jobTitle: string;
    action: string;
    url: string;
    availability?: string;
  };
  /** This film's own music bed — see src/film/music.ts. */
  music: MusicTrack;
}

export const CaseStudyFilm: React.FC<CaseStudyFilmProps> = ({
  theme,
  project,
  hook,
  problem,
  acts,
  metrics,
  cta,
  music,
}) => {
  const actDurations = [BEATS.act1, BEATS.act2, BEATS.act3, BEATS.act4] as const;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {/*
        The track is shorter than the film — funky.mp3 is 27s against 50s — so
        without `loop` the last 23 seconds play in silence, which is exactly
        what happened before: the music died somewhere in act three and the
        proof and CTA beats had no bed at all.

        `loopVolumeCurveBehavior="extend"` keeps the volume callback's frame
        counting across loops instead of resetting each time, so the fade-in
        and fade-out below apply to the whole film rather than to every
        repetition.
      */}
      <Audio
        src={staticFile(music.src)}
        loop
        loopVolumeCurveBehavior="extend"
        volume={(f) => {
          const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
          const fadeIn = interpolate(f, [0, 45], [0, 1], clamp);
          const fadeOut = interpolate(f, [FILM_DURATION - 75, FILM_DURATION], [1, 0], clamp);
          // Dip briefly either side of the loop point so the restart reads as
          // a breath rather than a hard cut — the track was not authored to
          // loop seamlessly.
          const p = f % music.loopFrames;
          const seam = Math.min(
            interpolate(p, [0, 12], [0.6, 1], clamp),
            interpolate(p, [music.loopFrames - 12, music.loopFrames], [1, 0.6], clamp),
          );
          return (music.level ?? MUSIC_LEVEL) * fadeIn * fadeOut * seam;
        }}
      />

      <TransitionSeries>
        {/* HOOK. No transition after it — a hard cut into the problem lands
            harder than a dissolve. */}
        <TransitionSeries.Sequence durationInFrames={BEATS.hook}>
          <FlowAct
            graph={hook.graph}
            theme={theme}
            durationInFrames={BEATS.hook}
            revealFrom={hook.revealFrom ?? -150}
            stagger={hook.stagger ?? 7}
            wideAnchorY={hook.wideAnchorY}
            eyebrow={project}
            title={hook.title}
          />
        </TransitionSeries.Sequence>

        <TransitionSeries.Sequence durationInFrames={BEATS.problem}>
          <AbsoluteFill style={{ backgroundColor: theme.bg }}>
            <TextCard
              theme={theme}
              eyebrow="The problem"
              headline={problem.headline}
              subline={problem.subline}
              tone="accent"
              delay={4}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        {/* Emitted as a flat array, not wrapped in a component. TransitionSeries
            pairs children positionally via React.Children.toArray, which
            flattens arrays and Fragments — but NOT a custom component, so a
            wrapper here would hide every Sequence from it. */}
        {acts.flatMap((act, i) => [
          <TransitionSeries.Sequence
            key={`${act.title}-seq`}
            durationInFrames={actDurations[i]}
          >
            <FlowAct
              graph={act.graph}
              theme={theme}
              durationInFrames={actDurations[i]}
              eyebrow={act.eyebrow}
              title={act.title}
              focusStops={act.focusStops}
              stagger={act.stagger}
              focusAt={act.focusAt ?? 0.4}
            />
          </TransitionSeries.Sequence>,
          <TransitionSeries.Transition
            key={`${act.title}-trans`}
            presentation={i === acts.length - 1 ? fade() : slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: T })}
          />,
        ])}

        <TransitionSeries.Sequence durationInFrames={BEATS.proof}>
          <AbsoluteFill style={{ backgroundColor: theme.bg }}>
            <MetricsScene theme={theme} eyebrow="Results" metrics={metrics} stagger={22} />
          </AbsoluteFill>
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: T })}
        />

        <TransitionSeries.Sequence durationInFrames={BEATS.cta}>
          <AbsoluteFill style={{ backgroundColor: theme.bg }}>
            <EndCard
              theme={theme}
              name={cta.name}
              jobTitle={cta.jobTitle}
              action={cta.action}
              url={cta.url}
              availability={cta.availability}
            />
          </AbsoluteFill>
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Outside the TransitionSeries so it does not blink at every cut.
          Present from 8s because a large share of viewers never reach the
          end card. */}
      <IdentityBadge
        theme={theme}
        name={cta.name}
        handle={cta.jobTitle.toUpperCase()}
        from={BADGE_FROM}
        until={BADGE_UNTIL}
      />
    </AbsoluteFill>
  );
};
