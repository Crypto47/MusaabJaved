/**
 * A real n8n workflow, animated.
 *
 * Structure matters here:
 *
 *   <svg>
 *     <g transform={camera}>   <- graph lives in n8n canvas units
 *       edges, then nodes
 *     </g>
 *   </svg>
 *   <label overlay>            <- OUTSIDE the camera, so text stays legible
 *
 * Everything derives from useCurrentFrame() and the passed schedule. There is
 * no state, no effect, no timer and no Math.random anywhere in this tree,
 * because Remotion renders frames in parallel browser tabs and any of those
 * would produce flicker.
 */
import { AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FlowEdgeView } from "./FlowEdge";
import { FlowNodeView } from "./FlowNode";
import type { CameraKey } from "./camera";
import { canvasToScreen, cameraTransform, sampleCamera } from "./camera";
import { BODY, DISPLAY } from "../fonts";
import { prettyType } from "./nodeIcons";
import type { Schedule } from "./order";
import type { FlowTheme } from "./theme";
import type { FlowGraph } from "./types";

export interface FocusStep {
  /** Frame from which this focus applies. */
  from: number;
  /** Node ids to label and highlight. */
  ids: string[];
  /** Optional caption strip shown while this step is active. */
  caption?: string;
}

export interface FlowCanvasProps {
  graph: FlowGraph;
  theme: FlowTheme;
  schedule: Schedule;
  cameraKeys: CameraKey[];
  /** Frames an edge takes to draw. */
  edgeDuration: number;
  eyebrow?: string;
  title?: string;
  focusSteps?: FocusStep[];
  /**
   * Zoom above which unfocused nodes also get a smaller label. Must sit above
   * the wide establishing zoom (~0.8 for a 17-node flow), because at that
   * scale n8n's 224-unit node spacing is far too tight for labels. Wide shots
   * are for shape; reading happens once the camera is in.
   */
  contextLabelZoom?: number;
}

const activeStep = (steps: FocusStep[], frame: number): FocusStep | null => {
  let current: FocusStep | null = null;
  for (const s of steps) {
    if (s.from <= frame) current = s;
  }
  return current;
};

interface LabelCandidate {
  id: string;
  label: string;
  short: string;
  x: number;
  y: number;
  fontSize: number;
  focused: boolean;
  start: number;
}

/** Rough on-screen width of a bold label, good enough for overlap tests. */
const labelWidth = (text: string, fontSize: number) => text.length * fontSize * 0.55;

/**
 * Drop labels that would collide.
 *
 * n8n spaces nodes 224 canvas units apart, which at a fitted zoom is ~180
 * screen px — far narrower than a label like "Prepare for sheets mapping".
 * Without this the wide shot turns into overlapping mush. Focused labels win
 * ties, then left-to-right, greedily keeping whatever still fits. Pure and
 * order-stable, so it renders identically on every frame.
 */
const dropCollisions = (candidates: LabelCandidate[]): LabelCandidate[] => {
  const ordered = [...candidates].sort((a, b) => {
    if (a.focused !== b.focused) return a.focused ? -1 : 1;
    return a.x - b.x;
  });
  const kept: LabelCandidate[] = [];
  for (const c of ordered) {
    const halfW = labelWidth(c.label, c.fontSize) / 2;
    const clash = kept.some((k) => {
      const kHalf = labelWidth(k.label, k.fontSize) / 2;
      const gap = 12;
      const overlapX = Math.abs(k.x - c.x) < halfW + kHalf + gap;
      const overlapY = Math.abs(k.y - c.y) < Math.max(k.fontSize, c.fontSize) * 1.9;
      return overlapX && overlapY;
    });
    if (!clash) kept.push(c);
  }
  return kept;
};

export const FlowCanvas: React.FC<FlowCanvasProps> = ({
  graph,
  theme,
  schedule,
  cameraKeys,
  edgeDuration,
  eyebrow,
  title,
  focusSteps = [],
  contextLabelZoom = 1.15,
}) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  const cam = sampleCamera(cameraKeys, frame, width, height);
  const step = activeStep(focusSteps, frame);
  const focusIds = new Set(step?.ids ?? []);
  const anyFocus = focusIds.size > 0;

  return (
    <AbsoluteFill style={{ backgroundColor: theme.bg }}>
      {/* Screen-fixed ground: soft radial lift plus a faint grid */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse 70% 55% at 50% 45%, ${theme.bgAlt} 0%, ${theme.bg} 70%)`,
        }}
      />
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", inset: 0 }}
      >
        <title>{graph.name}</title>
        <defs>
          <pattern id="flow-grid" width={64} height={64} patternUnits="userSpaceOnUse">
            <path d="M 64 0 L 0 0 0 64" fill="none" stroke={theme.grid} strokeWidth={1} />
          </pattern>
        </defs>
        <rect width={width} height={height} fill="url(#flow-grid)" />

        <g transform={cameraTransform(cam)}>
          {graph.edges.map((e) => (
            <FlowEdgeView
              key={e.id}
              edge={e}
              theme={theme}
              startFrame={schedule.edgeStart[e.id] ?? 0}
              duration={edgeDuration}
              frame={frame}
              zoom={cam.zoom}
              dim={anyFocus && !(focusIds.has(e.source) && focusIds.has(e.target))}
            />
          ))}
          {graph.nodes.map((n) => (
            <FlowNodeView
              key={n.id}
              node={n}
              theme={theme}
              startFrame={schedule.nodeStart[n.id] ?? 0}
              frame={frame}
              fps={fps}
              focused={focusIds.has(n.id)}
              dim={anyFocus && !focusIds.has(n.id)}
            />
          ))}
        </g>
      </svg>

      {/*
        Label overlay, outside the camera transform so type stays readable at
        any zoom. Progressive disclosure: nothing in the wide establishing
        shot, focused nodes always, everything else only once zoomed in.
      */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {dropCollisions(
          graph.nodes.flatMap<LabelCandidate>((n) => {
            const start = schedule.nodeStart[n.id] ?? 0;
            const isFocused = focusIds.has(n.id);
            const showContext = cam.zoom >= contextLabelZoom;
            if (!isFocused && !showContext) return [];
            if (frame < start + 6) return [];

            const p = canvasToScreen({ x: n.x + n.w / 2, y: n.y + n.h }, cam);
            if (p.y < -120 || p.y > height + 120) return [];
            // A label sliced by the frame edge reads as a bug, so require the
            // whole thing to fit instead of letting it clip.
            const fontSize = isFocused ? 38 : 26;
            const half = labelWidth(n.label, fontSize) / 2;
            if (p.x - half < 24 || p.x + half > width - 24) return [];

            // Two zones are already occupied by chrome: the caption strip
            // along the bottom and the identity badge in the corner. A node
            // label wandering into either reads as a collision, so context
            // labels stay out of the caption strip entirely and nothing at
            // all is drawn over the badge.
            const captionStripTop = height - 190;
            if (!isFocused && p.y > captionStripTop) return [];
            const badgeLeft = width - 470;
            const badgeTop = height - 150;
            if (p.x + half > badgeLeft && p.y > badgeTop) return [];
            return [
              {
                id: n.id,
                label: n.label,
                short: n.short,
                x: p.x,
                y: p.y + 14 * cam.zoom,
                fontSize,
                focused: isFocused,
                start,
              },
            ];
          }),
        ).map((c) => {
          const appear = interpolate(frame, [c.start + 6, c.start + 18], [0, 1], {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={c.id}
              style={{
                position: "absolute",
                left: c.x,
                top: c.y,
                transform: "translateX(-50%)",
                textAlign: "center",
                opacity: appear * (c.focused ? 1 : 0.55),
                fontFamily: BODY,
                whiteSpace: "nowrap",
              }}
            >
              <div
                style={{
                  fontSize: c.fontSize,
                  fontWeight: 600,
                  letterSpacing: -0.3,
                  color: c.focused ? theme.label : theme.labelDim,
                }}
              >
                {c.label}
              </div>
              {/* The type eyebrow only earns its place when it says something
                  the node's own name doesn't — "SendGrid / SENDGRID" is noise. */}
              {c.focused &&
              prettyType(c.short).toLowerCase() !== c.label.trim().toLowerCase() ? (
                <div
                  style={{
                    fontSize: c.fontSize * 0.58,
                    fontWeight: 500,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                    color: theme.eyebrow,
                    marginTop: 4,
                  }}
                >
                  {prettyType(c.short)}
                </div>
              ) : null}
            </div>
          );
        })}
      </AbsoluteFill>

      {/* A matching scrim along the bottom. The caption strip and the identity
          badge both live down here, and the camera regularly parks sub-node
          circles behind them — dimming the graph under the chrome is cheaper
          and more reliable than trying to keep the geometry out of the way. */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 240,
          background: `linear-gradient(to top, ${theme.bg} 0%, ${theme.bg}cc 45%, transparent 100%)`,
        }}
      />

      {/* Screen-fixed chrome. The scrim keeps the headline readable when the
          camera pans graph content up behind it. */}
      {eyebrow || title ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 260,
              background: `linear-gradient(to bottom, ${theme.bg} 0%, ${theme.bg}cc 45%, transparent 100%)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 72,
              top: 64,
              fontFamily: BODY,
            }}
          >
            {eyebrow ? (
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 600,
                  letterSpacing: 4,
                  textTransform: "uppercase",
                  color: theme.eyebrow,
                }}
              >
                {eyebrow}
              </div>
            ) : null}
            {title ? (
              <div
                style={{
                  fontFamily: DISPLAY,
                  fontSize: 66,
                  fontWeight: 400,
                  letterSpacing: -1.5,
                  color: theme.headline,
                  marginTop: 6,
                }}
              >
                {title}
              </div>
            ) : null}
          </div>
        </>
      ) : null}

      {step?.caption ? (
        <div
          style={{
            position: "absolute",
            left: 72,
            right: 72,
            bottom: 72,
            fontFamily: DISPLAY,
            fontSize: 46,
            fontWeight: 400,
            lineHeight: 1.35,
            color: theme.label,
            textAlign: "center",
            opacity: interpolate(frame, [step.from, step.from + 12], [0, 1], {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {step.caption}
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
