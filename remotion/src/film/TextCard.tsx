/**
 * A full-frame statement card: eyebrow, headline, subline.
 *
 * Deliberately plain. Elaborate kinetic typography measurably slows
 * comprehension, and this film is designed to be read with the sound off —
 * roughly 70-85% of viewers watch muted, so the text *is* the narration.
 * Each element animates two properties (opacity + a small rise) once, then
 * holds still to be read.
 *
 * Text budget: 5-8 words for the headline, one short subline. Reading-rate
 * standards put a ten-word card at ~2.5s minimum on screen, so scenes using
 * this must hold well past their entrance.
 */
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BODY, DISPLAY } from "../fonts";
import type { FlowTheme } from "../flow/theme";

export interface TextCardProps {
  theme: FlowTheme;
  eyebrow?: string;
  headline: string;
  subline?: string;
  /** Frames before the first element starts. */
  delay?: number;
  /** "accent" tints the headline amber, "plain" leaves it near-white. */
  tone?: "accent" | "plain";
  align?: "center" | "left";
}

const rise = (frame: number, from: number, fps: number) => {
  const opacity = interpolate(frame, [from, from + 0.3 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [from, from + 0.4 * fps], [22, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return { opacity, y };
};

export const TextCard: React.FC<TextCardProps> = ({
  theme,
  eyebrow,
  headline,
  subline,
  delay = 0,
  tone = "plain",
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const a = rise(frame, delay, fps);
  const b = rise(frame, delay + 0.22 * fps, fps);
  const c = rise(frame, delay + 0.46 * fps, fps);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "center",
        alignItems: align === "center" ? "center" : "flex-start",
        padding: align === "center" ? "0 160px" : "0 140px",
        textAlign: align,
        gap: 28,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            opacity: a.opacity,
            translate: `0 ${a.y}px`,
            fontFamily: BODY,
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: theme.eyebrow,
          }}
        >
          {eyebrow}
        </div>
      ) : null}

      <div
        style={{
          opacity: b.opacity,
          translate: `0 ${b.y}px`,
          fontFamily: DISPLAY,
          fontSize: 104,
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: -2,
          color: tone === "accent" ? theme.headline : theme.label,
          maxWidth: 1500,
          textWrap: "balance",
        }}
      >
        {headline}
      </div>

      {subline ? (
        <div
          style={{
            opacity: c.opacity,
            translate: `0 ${c.y}px`,
            fontFamily: BODY,
            fontSize: 40,
            fontWeight: 400,
            lineHeight: 1.4,
            color: theme.labelDim,
            maxWidth: 1100,
            textWrap: "balance",
          }}
        >
          {subline}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
