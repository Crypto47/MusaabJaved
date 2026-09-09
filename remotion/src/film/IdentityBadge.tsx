/**
 * A small, persistent name mark in the lower right.
 *
 * This exists because of a specific number: sub-one-minute videos average
 * around half their runtime watched, so a large share of viewers never reach
 * the end card. Wistia's own CTA analysis recommends placing identity early
 * for short videos. A quiet lower-third from ~8s means the people who leave
 * at 20s still leave knowing whose work they just saw, without stealing
 * attention from the pipeline.
 *
 * Rendered above the scenes but outside the TransitionSeries, so it does not
 * fade in and out with every cut.
 */
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BODY } from "../fonts";
import type { FlowTheme } from "../flow/theme";

export interface IdentityBadgeProps {
  theme: FlowTheme;
  name: string;
  handle: string;
  /** Frame the badge fades in. */
  from: number;
  /** Frame the badge fades out, ahead of the end card taking over. */
  until: number;
}

export const IdentityBadge: React.FC<IdentityBadgeProps> = ({
  theme,
  name,
  handle,
  from,
  until,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(
    frame,
    [from, from + 0.5 * fps, until - 0.5 * fps, until],
    [0, 1, 1, 0],
    {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  if (opacity <= 0.001) return null;

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          right: 72,
          bottom: 64,
          opacity,
          display: "flex",
          alignItems: "center",
          gap: 14,
          fontFamily: BODY,
        }}
      >
        <div
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: theme.nodeFocus,
          }}
        />
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 600,
              letterSpacing: 0.2,
              color: theme.label,
            }}
          >
            {name}
          </div>
          <div
            style={{
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: 1.4,
              color: theme.labelDim,
              marginTop: 2,
            }}
          >
            {handle}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
