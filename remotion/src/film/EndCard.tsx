/**
 * The closing card: who, what, where, one action.
 *
 * Deliberately one call to action, not three. Wistia's CTA data across
 * hundreds of thousands of videos shows a single explicit end frame with
 * actionable text outperforms a menu of options, and reading-rate standards
 * put this much copy at a ~5s minimum hold — which is why the scene that
 * uses this runs 150 frames rather than the 60 an animation alone would need.
 */
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BODY, DISPLAY } from "../fonts";
import type { FlowTheme } from "../flow/theme";

export interface EndCardProps {
  theme: FlowTheme;
  name: string;
  jobTitle: string;
  url: string;
  action: string;
  availability?: string;
}

export const EndCard: React.FC<EndCardProps> = ({
  theme,
  name,
  jobTitle,
  url,
  action,
  availability,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const at = (start: number, distance = 20) => ({
    opacity: interpolate(frame, [start, start + 0.32 * fps], [0, 1], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    y: interpolate(frame, [start, start + 0.45 * fps], [distance, 0], {
      easing: Easing.bezier(0.16, 1, 0.3, 1),
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  });

  const title_ = at(0);
  const name_ = at(5);
  const rule = interpolate(frame, [10, 10 + 0.5 * fps], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cta_ = at(18);
  const meta_ = at(26);

  return (
    <AbsoluteFill
      style={{ justifyContent: "center", alignItems: "center", gap: 22 }}
    >
      <div
        style={{
          opacity: title_.opacity,
          translate: `0 ${title_.y}px`,
          fontFamily: BODY,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: 6,
          textTransform: "uppercase",
          color: theme.eyebrow,
        }}
      >
        {jobTitle}
      </div>

      <div
        style={{
          opacity: name_.opacity,
          translate: `0 ${name_.y}px`,
          fontFamily: DISPLAY,
          fontSize: 116,
          fontWeight: 400,
          lineHeight: 1.02,
          letterSpacing: -3,
          color: theme.label,
        }}
      >
        {name}
      </div>

      <div
        style={{
          width: 460,
          height: 1,
          scale: `${rule} 1`,
          background: `linear-gradient(90deg, transparent, ${theme.nodeFocus}, ${theme.headline}, transparent)`,
        }}
      />

      <div
        style={{
          opacity: cta_.opacity,
          translate: `0 ${cta_.y}px`,
          fontFamily: DISPLAY,
          fontSize: 58,
          fontWeight: 400,
          letterSpacing: -1,
          color: theme.headline,
          marginTop: 10,
        }}
      >
        {action}
      </div>

      <div
        style={{
          opacity: meta_.opacity,
          translate: `0 ${meta_.y}px`,
          fontFamily: BODY,
          fontSize: 28,
          fontWeight: 500,
          color: theme.labelDim,
          marginTop: 4,
        }}
      >
        {url}
        {availability ? `  ·  ${availability}` : ""}
      </div>
    </AbsoluteFill>
  );
};
