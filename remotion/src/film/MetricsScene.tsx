/**
 * The proof beat: two or three numbers, counted up then held.
 *
 * Timing follows the evidence rather than feel. A metric needs roughly a
 * second of count-up with decelerating ease and then at least two seconds
 * static before it registers, and the number has to be the dominant element
 * on screen — not a caption with a figure tucked beside it. Larger type and
 * higher contrast both correlate with better retention, so the numbers run
 * large in the display face with the label small underneath.
 */
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BODY, DISPLAY } from "../fonts";
import type { FlowTheme } from "../flow/theme";

export interface Metric {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface MetricsSceneProps {
  theme: FlowTheme;
  eyebrow?: string;
  metrics: Metric[];
  /** Frames between each metric starting. */
  stagger?: number;
  delay?: number;
}

const MetricTile: React.FC<{
  metric: Metric;
  theme: FlowTheme;
  start: number;
  colour: string;
}> = ({ metric, theme, start, colour }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - start;

  // ~1s count-up that decelerates into its final value.
  const progress = spring({
    frame: local,
    fps,
    config: { damping: 200, stiffness: 60, mass: 0.9 },
  });
  const shown = Math.round(progress * metric.value);

  const opacity = interpolate(local, [0, 0.3 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(local, [0, 0.45 * fps], [26, 0], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        opacity,
        translate: `0 ${y}px`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: 360,
        gap: 10,
      }}
    >
      <div
        style={{
          fontFamily: DISPLAY,
          fontSize: 168,
          fontWeight: 400,
          lineHeight: 1,
          letterSpacing: -4,
          color: colour,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {metric.prefix}
        {shown}
        {metric.suffix}
      </div>
      <div
        style={{
          fontFamily: BODY,
          fontSize: 27,
          fontWeight: 500,
          lineHeight: 1.35,
          color: theme.labelDim,
          textAlign: "center",
          maxWidth: 380,
        }}
      >
        {metric.label}
      </div>
    </div>
  );
};

export const MetricsScene: React.FC<MetricsSceneProps> = ({
  theme,
  eyebrow,
  metrics,
  stagger = 18,
  delay = 6,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headOpacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // One accent among primaries, so a single colour carries the emphasis.
  const colours = [theme.headline, theme.nodeFocus, theme.icon];

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 72 }}
    >
      {eyebrow ? (
        <div
          style={{
            opacity: headOpacity,
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
      <div style={{ display: "flex", flexDirection: "row", gap: 100 }}>
        {metrics.map((m, i) => (
          <MetricTile
            key={m.label}
            metric={m}
            theme={theme}
            start={delay + i * stagger}
            colour={colours[i % colours.length]}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
