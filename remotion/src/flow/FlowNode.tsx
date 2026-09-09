/**
 * One node of the flow graph: n8n's rounded square (or a circle for AI
 * sub-nodes) with the service icon centred.
 *
 * Labels are NOT drawn here. At a wide fit the graph scales to ~0.5, which
 * would put a 14px n8n label at ~7px against a 40px legibility floor for
 * 1080p video. Labels live in a screen-space overlay outside the camera
 * transform instead — see FlowCanvas.
 *
 * The scale entrance is expressed as an explicit
 * translate/scale/translate-back so it does not depend on `transform-box`
 * or `transform-origin` resolving inside SVG.
 */
import { spring } from "remotion";
import { iconForType } from "./nodeIcons";
import type { FlowNode as FlowNodeType } from "./types";
import type { FlowTheme } from "./theme";

interface Props {
  node: FlowNodeType;
  theme: FlowTheme;
  startFrame: number;
  frame: number;
  fps: number;
  focused?: boolean;
  dim?: boolean;
  /**
   * Opacity before the node's scheduled entrance. Non-zero draws the graph's
   * shape from frame 0, so the establishing shot has something to establish
   * and the reveal reads as nodes *lighting up* rather than popping into a
   * void.
   */
  ghostOpacity?: number;
}

export const FlowNodeView: React.FC<Props> = ({
  node,
  theme,
  startFrame,
  frame,
  fps,
  focused,
  dim,
  ghostOpacity = 0.16,
}) => {
  const local = frame - startFrame;
  const isGhost = local < 0;

  const enter = isGhost
    ? 1
    : spring({
        frame: local,
        fps,
        config: { damping: 14, stiffness: 220, mass: 0.65 },
      });

  const cx = node.x + node.w / 2;
  const cy = node.y + node.h / 2;
  const scale = isGhost ? 1 : 0.72 + enter * 0.28;

  const isCircle = node.kind === "configuration";
  const radius = isCircle ? node.w / 2 : 12;
  const iconSize = Math.round(node.h * (isCircle ? 0.42 : 0.46));
  const Icon = iconForType(node.short);

  const stroke = focused ? theme.nodeFocus : theme.nodeStroke;
  const strokeWidth = focused ? 3 : 1.5;

  const opacity = isGhost ? ghostOpacity : dim ? 0.35 : enter;

  return (
    <g
      opacity={opacity}
      transform={`translate(${cx} ${cy}) scale(${scale}) translate(${-cx} ${-cy})`}
    >
      {focused && !isGhost ? (
        <rect
          x={node.x - 8}
          y={node.y - 8}
          width={node.w + 16}
          height={node.h + 16}
          rx={radius + 6}
          fill="none"
          stroke={theme.nodeFocus}
          strokeWidth={1}
          opacity={0.35}
        />
      ) : null}

      {isCircle ? (
        <circle
          cx={cx}
          cy={cy}
          r={node.w / 2}
          fill={theme.nodeFill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      ) : (
        <rect
          x={node.x}
          y={node.y}
          width={node.w}
          height={node.h}
          rx={radius}
          fill={theme.nodeFill}
          stroke={stroke}
          strokeWidth={strokeWidth}
        />
      )}

      <g transform={`translate(${cx - iconSize / 2} ${cy - iconSize / 2})`}>
        <Icon size={iconSize} color={focused ? theme.nodeFocus : theme.icon} />
      </g>
    </g>
  );
};
