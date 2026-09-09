/**
 * One edge of the flow graph, drawn on over time.
 *
 * Uses `evolvePath` from @remotion/paths, which computes path length
 * mathematically. The obvious alternative, `path.getTotalLength()`, needs a
 * mounted ref and so delivers its value through an effect one render late —
 * which Remotion's flickering guidance rules out, because frames render in
 * parallel tabs. The other common shortcut, a constant
 * `strokeDasharray={5000}`, reveals every edge at the same pixels-per-frame,
 * so short edges pop while long ones crawl. Neither is used here.
 */
import { evolvePath, getLength } from "@remotion/paths";
import { Easing, interpolate } from "remotion";
import type { FlowEdge as FlowEdgeType } from "./types";
import type { FlowTheme } from "./theme";

interface Props {
  edge: FlowEdgeType;
  theme: FlowTheme;
  /** Frame the draw-on begins. */
  startFrame: number;
  /** Frames the draw-on takes. */
  duration: number;
  frame: number;
  /** Current camera zoom, so stroke width stays constant on screen. */
  zoom: number;
  dim?: boolean;
  /** Opacity before the draw-on starts — see FlowNode's ghostOpacity. */
  ghostOpacity?: number;
}

export const FlowEdgeView: React.FC<Props> = ({
  edge,
  theme,
  startFrame,
  duration,
  frame,
  zoom,
  dim,
  ghostOpacity = 0.1,
}) => {
  const progress = interpolate(frame, [startFrame, startFrame + duration], [0, 1], {
    easing: Easing.bezier(0.16, 1, 0.3, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const isAi = edge.kind !== "main";
  const stroke = isAi ? theme.edgeAi : theme.edge;
  // n8n keeps edges 2px on screen at any zoom; match that.
  const strokeWidth = 2 / zoom;

  // Before the draw-on: show the full route faintly, so the establishing shot
  // reads as a complete workflow waiting to run.
  if (progress <= 0) {
    return (
      <g opacity={ghostOpacity}>
        {edge.segments.map((d, i) => (
          <path
            // biome-ignore lint/suspicious/noArrayIndexKey: segment order is stable
            key={i}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        ))}
      </g>
    );
  }

  // Pace a multi-segment route by real length, so a backward edge's two
  // smooth-step legs draw at one continuous speed rather than 50/50 by time.
  const lengths = edge.segments.map((d) => getLength(d));
  const total = lengths.reduce((a, b) => a + b, 0);
  const drawn = total * progress;

  let consumed = 0;
  const parts = edge.segments.map((d, i) => {
    const len = lengths[i];
    const localDrawn = Math.max(0, Math.min(len, drawn - consumed));
    consumed += len;
    const localProgress = len === 0 ? 1 : localDrawn / len;
    return { d, localProgress };
  });

  const complete = progress >= 1;

  return (
    <g opacity={dim ? 0.3 : 1}>
      {parts.map(({ d, localProgress }, i) => {
        if (localProgress <= 0) return null;
        const evolved = evolvePath(localProgress, d);
        // Once drawn, ai_* edges take n8n's dashed look. While drawing, the
        // dash pattern is the draw-on itself, so the two never fight.
        const dashProps =
          complete && isAi
            ? { strokeDasharray: `${6 / zoom} ${6 / zoom}` }
            : {
                strokeDasharray: evolved.strokeDasharray,
                strokeDashoffset: evolved.strokeDashoffset,
              };
        return (
          <path
            // biome-ignore lint/suspicious/noArrayIndexKey: segment order is stable
            key={i}
            d={d}
            fill="none"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            {...dashProps}
          />
        );
      })}
    </g>
  );
};
