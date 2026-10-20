/**
 * A whole workflow running start to finish, as one clip.
 *
 * The HyperFrames card films (films/<slug>/) show the product in use and end
 * on an "under the hood" beat. That beat embeds this clip, so the graph builds
 * itself instead of appearing as a still frame.
 *
 * This is a sweep, not n8n's execution order. The films' FlowAct reveals in
 * true depth-first order, which is right when the camera holds a wide shot,
 * but a camera that follows the newest node then jumps between lanes, loops
 * and parked sub-flows. Here nodes land left to right, as n8n lays a run out,
 * and the camera glides at one zoom just behind the leading node. Once the
 * last node lands it pulls out to the whole graph and holds, fully lit.
 *
 * No eyebrow, title or captions: the film that embeds the clip owns the type.
 */
import { FlowCanvas } from "../flow/FlowCanvas";
import type { CameraKey, View } from "../flow/camera";
import { viewOfBox } from "../flow/camera";
import type { Schedule } from "../flow/order";
import type { FlowTheme } from "../flow/theme";
import type { FlowGraph } from "../flow/types";

const FROM = 6;
const EDGE_DURATION = 11;
/** Frames from the last node landing to the wide shot settling. */
const PULL_OUT = 42;
/** Frames the finished graph holds at the end. */
const HOLD = 48;
const ASPECT = 1920 / 1080;

// A type alias, not an interface: Remotion's Composition needs props
// assignable to Record<string, unknown>, which interfaces are not.
export type FlowRevealConfig = {
  graph: FlowGraph;
  theme: FlowTheme;
  /** Frames between node entrances: fewer for bigger graphs. */
  stagger: number;
  /** Vertical framing of the final wide shot, as in FlowAct. */
  wideAnchorY?: number;
};

/** Left-to-right schedule. Sub-nodes land with the node they configure. */
const sweepSchedule = (graph: FlowGraph, stagger: number): Schedule => {
  const order = graph.nodes
    .filter((n) => n.kind !== "configuration")
    .sort((a, b) => a.x - b.x || a.y - b.y)
    .map((n) => n.id);

  const nodeStart: Record<string, number> = {};
  order.forEach((id, i) => {
    nodeStart[id] = FROM + i * stagger;
  });
  for (const e of graph.edges) {
    if (e.kind === "main") continue;
    if (nodeStart[e.target] !== undefined && nodeStart[e.source] === undefined) {
      nodeStart[e.source] = nodeStart[e.target];
    }
  }
  for (const n of graph.nodes) {
    if (nodeStart[n.id] === undefined) nodeStart[n.id] = FROM;
  }

  // A line draws as the later of its two nodes lands, so nothing reaches
  // toward a node that is not there yet (loops point back across the graph).
  const edgeStart: Record<string, number> = {};
  for (const e of graph.edges) {
    edgeStart[e.id] = Math.max(nodeStart[e.source], nodeStart[e.target]) - 2;
  }

  return {
    order,
    nodeStart,
    edgeStart,
    revealEnd: FROM + Math.max(0, order.length - 1) * stagger,
  };
};

export const flowRevealDuration = ({ graph, stagger }: FlowRevealConfig) =>
  Math.ceil(sweepSchedule(graph, stagger).revealEnd + EDGE_DURATION + PULL_OUT + HOLD);

const median = (xs: number[]) => {
  const s = [...xs].sort((a, b) => a - b);
  return s[Math.floor(s.length / 2)];
};

export const FlowReveal: React.FC<FlowRevealConfig> = ({
  graph,
  theme,
  stagger,
  wideAnchorY = 0.5,
}) => {
  const schedule = sweepSchedule(graph, stagger);
  const wide = viewOfBox(graph.bounds, ASPECT, 1.16);

  // Close enough to read node names (labels show from zoom 0.75 here), wide
  // enough that a big graph glides rather than whips past.
  const width = Math.min(wide[2], Math.min(2500, Math.max(1500, wide[2] * 0.3)));
  const mains = schedule.order.map((id) => graph.byId[id]);
  const left = graph.bounds.x + width / 2;
  const right = graph.bounds.x + graph.bounds.w - width / 2;
  const cxFor = (frontX: number) =>
    right <= left ? (left + right) / 2 : Math.min(right, Math.max(left, frontX - width * 0.12));
  // Height follows the median of the last few nodes to land: Excelr8's graph
  // runs in several bands and Zippit's in two language lanes, so a fixed
  // height leaves the active strand at the edge of frame.
  const top = graph.bounds.y + width / ASPECT / 2;
  const bottom = graph.bounds.y + graph.bounds.h - width / ASPECT / 2;
  const cyFor = (i: number) => {
    const y = median(mains.slice(Math.max(0, i - 6), i + 1).map((n) => n.y + n.h / 2));
    return bottom <= top ? (top + bottom) / 2 : Math.min(bottom, Math.max(top, y));
  };

  const keys: CameraKey[] = mains.map((n, i) => {
    const view: View = [cxFor(n.x + n.w / 2), cyFor(i), width];
    return { frame: i === 0 ? 0 : schedule.nodeStart[n.id], view, ease: "linear" };
  });
  keys.push({
    frame: schedule.revealEnd + EDGE_DURATION + PULL_OUT,
    view: wide,
    anchorY: wideAnchorY,
  });

  return (
    <FlowCanvas
      graph={graph}
      theme={theme}
      schedule={schedule}
      cameraKeys={keys}
      edgeDuration={EDGE_DURATION}
      contextLabelZoom={0.75}
    />
  );
};
