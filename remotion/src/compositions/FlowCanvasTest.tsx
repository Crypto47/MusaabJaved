/**
 * FlowCanvas proving ground: the real Equity Pulse ingestion workflow
 * (17 nodes) animated from its own n8n export.
 *
 * All timing lives in SHOTS below and flows outward from there, so there are
 * no bare frame numbers buried in the render tree. Camera views are derived
 * from the graph's own geometry rather than hand-tuned, so this composition
 * keeps working if the underlying workflow changes shape.
 *
 * Pacing is deliberately unhurried. The recurring note from practitioners
 * working in this medium is "slow down, hold longer" — one widely used
 * toolkit shipped an always-in-motion system and then defaulted half of it
 * off a month later. Stillness is the design tool.
 */
import { FlowCanvas } from "../flow/FlowCanvas";
import type { FocusStep } from "../flow/FlowCanvas";
import type { CameraKey } from "../flow/camera";
import { boxAround, viewOfBox } from "../flow/camera";
import rawFlow from "../flow/data/equity-pulse-ingestion-hitl.json";
import { buildSchedule } from "../flow/order";
import { parseFlow } from "../flow/parse";
import { EP_THEME } from "../flow/theme";
import type { RawFlow } from "../flow/types";

export const FLOW_CANVAS_TEST_FPS = 30;
export const FLOW_CANVAS_TEST_WIDTH = 1920;
export const FLOW_CANVAS_TEST_HEIGHT = 1080;

const ASPECT = FLOW_CANVAS_TEST_WIDTH / FLOW_CANVAS_TEST_HEIGHT;

/** Parsed once at module scope: pure, deterministic, shared across frames. */
const GRAPH = parseFlow(rawFlow as RawFlow);

/** Single source of truth for timing. */
const SHOTS = {
  /** Wide establishing hold before anything moves. */
  establish: 0,
  /** First node lands. */
  reveal: 30,
  /** Frames between node entrances. */
  stagger: 10,
  /** Frames after an endpoint lands before its edge starts drawing. */
  edgeLead: 4,
  /** Frames an edge takes to draw. */
  edgeDuration: 11,
  /** Camera begins gliding to the human-review gate. */
  focus: 250,
  /** Camera has arrived; rest here. */
  hold: 330,
  total: 360,
} as const;

const SCHEDULE = buildSchedule(GRAPH, {
  from: SHOTS.reveal,
  stagger: SHOTS.stagger,
  edgeLead: SHOTS.edgeLead,
});

/**
 * The story beat: this is the pair of nodes that turns the pipeline from
 * fully automatic into human-reviewed, which is what the HITL variant of the
 * Equity Pulse ingestion flow exists to do.
 */
const FOCUS_IDS = ["Sent to Sheet for Review", "SendGrid"];

const FOCUS_BOX = boxAround(
  FOCUS_IDS.map((id) => GRAPH.byId[id])
    .filter((n): n is NonNullable<typeof n> => Boolean(n))
    .map((n) => ({ x: n.x, y: n.y, w: n.w, h: n.h })),
  140,
);

const WIDE_VIEW = viewOfBox(GRAPH.bounds, ASPECT, 1.18);
const FOCUS_VIEW = viewOfBox(FOCUS_BOX, ASPECT, 1.25);

/**
 * Camera holds wide through the whole reveal, then makes one move. Views are
 * interpolated with d3 interpolateZoom inside sampleCamera, so the push does
 * not accelerate through the middle the way independent zoom/translate lerps
 * do.
 */
const CAMERA_KEYS: CameraKey[] = [
  { frame: SHOTS.establish, view: WIDE_VIEW, anchorY: 0.5 },
  { frame: SHOTS.focus, view: WIDE_VIEW, anchorY: 0.5 },
  { frame: SHOTS.hold, view: FOCUS_VIEW, anchorY: 0.42 },
];

const FOCUS_STEPS: FocusStep[] = [
  {
    from: SHOTS.focus,
    ids: FOCUS_IDS,
    caption: "Nothing reaches the investor until a human signs off here.",
  },
];

export const FLOW_CANVAS_TEST_DURATION = SHOTS.total;

export const FlowCanvasTest: React.FC = () => (
  <FlowCanvas
    graph={GRAPH}
    theme={EP_THEME}
    schedule={SCHEDULE}
    cameraKeys={CAMERA_KEYS}
    edgeDuration={SHOTS.edgeDuration}
    eyebrow="Equity Pulse"
    title="Ingestion, with a human in the loop"
    focusSteps={FOCUS_STEPS}
  />
);
