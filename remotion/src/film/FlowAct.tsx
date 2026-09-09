/**
 * One pipeline beat: a real workflow graph revealing itself, then the camera
 * travelling to the nodes that carry the story.
 *
 * Supports several focus stops per beat, which matters because the graphs vary
 * enormously: Equity Pulse's ingestion flow is ~2000 canvas units wide, while
 * the Excelr8 and Zippit flows run past 10,000 at ratios near 8:1. One camera
 * push across a graph that wide leaves most of it decorative, so a beat can
 * instead dolly through two or three stops, holding at each.
 *
 * Every value is derived from the graph's own geometry rather than hand-tuned,
 * so changing a workflow changes the shot. All computation is a pure function
 * of the props — no state, no effects — because Remotion renders frames in
 * parallel and anything else flickers.
 */
import { FlowCanvas } from "../flow/FlowCanvas";
import type { FocusStep } from "../flow/FlowCanvas";
import type { CameraKey } from "../flow/camera";
import { boxAround, viewOfBox } from "../flow/camera";
import { buildSchedule } from "../flow/order";
import type { FlowTheme } from "../flow/theme";
import type { FlowGraph } from "../flow/types";

export interface FocusStop {
  /** Nodes the camera settles on and labels. */
  ids: string[];
  /** Caption shown while this stop is active. */
  caption?: string;
  /** Override the padding around this stop's box, in canvas units. */
  pad?: number;
}

export interface FlowActProps {
  graph: FlowGraph;
  theme: FlowTheme;
  /** Total frames this beat occupies in the film. */
  durationInFrames: number;
  eyebrow?: string;
  title?: string;
  /** Two or three stops read as a camera move through the graph. */
  focusStops?: FocusStop[];
  /** Shorthand for a single stop. */
  focusIds?: string[];
  caption?: string;
  /**
   * Frame the first node lands. Negative means the graph is already mid-reveal
   * at frame 0 — used by an opening beat, because a static first frame loses
   * viewers and the product needs to be moving immediately.
   */
  revealFrom?: number;
  stagger?: number;
  edgeDuration?: number;
  /** Fraction of the beat at which the camera leaves the wide shot. */
  focusAt?: number;
  focusPad?: number;
  /**
   * Where the wide shot's centre sits vertically, as a fraction of frame
   * height. Defaults to dead centre, which is right when a graph's nodes are
   * spread evenly through its bounding box. Zippit's content engine has a
   * small sub-loop parked ~3000 units below the main body, which drags the box
   * down and leaves the visual mass in the top half — nudging this above 0.5
   * pushes the content back to the optical centre.
   */
  wideAnchorY?: number;
  aspect?: number;
}

export const FlowAct: React.FC<FlowActProps> = ({
  graph,
  theme,
  durationInFrames,
  eyebrow,
  title,
  focusStops,
  focusIds,
  caption,
  revealFrom = 10,
  stagger = 9,
  edgeDuration = 11,
  focusAt = 0.5,
  focusPad = 150,
  wideAnchorY = 0.5,
  aspect = 1920 / 1080,
}) => {
  const schedule = buildSchedule(graph, {
    from: revealFrom,
    stagger,
    edgeLead: 4,
  });

  const wide = viewOfBox(graph.bounds, aspect, 1.16);

  // Single-stop shorthand folds into the same path as the multi-stop form.
  const stops: FocusStop[] =
    focusStops && focusStops.length > 0
      ? focusStops
      : focusIds && focusIds.length > 0
        ? [{ ids: focusIds, caption }]
        : [];

  const resolved = stops
    .map((s) => ({
      stop: s,
      nodes: s.ids
        .map((id) => graph.byId[id])
        .filter((n): n is NonNullable<typeof n> => Boolean(n)),
    }))
    .filter((r) => r.nodes.length > 0);

  if (resolved.length === 0) {
    return (
      <FlowCanvas
        graph={graph}
        theme={theme}
        schedule={schedule}
        cameraKeys={[{ frame: 0, view: wide, anchorY: wideAnchorY }]}
        edgeDuration={edgeDuration}
        eyebrow={eyebrow}
        title={title}
      />
    );
  }

  const travelStart = Math.round(durationInFrames * focusAt);
  const perStop = (durationInFrames - travelStart) / resolved.length;

  const cameraKeys: CameraKey[] = [
    { frame: 0, view: wide, anchorY: wideAnchorY },
    { frame: travelStart, view: wide, anchorY: wideAnchorY },
  ];
  const focusSteps: FocusStep[] = [];

  resolved.forEach((r, i) => {
    const slotStart = travelStart + Math.round(perStop * i);
    const slotEnd =
      i === resolved.length - 1
        ? durationInFrames
        : travelStart + Math.round(perStop * (i + 1));

    const view = viewOfBox(
      boxAround(
        r.nodes.map((n) => ({ x: n.x, y: n.y, w: n.w, h: n.h })),
        r.stop.pad ?? focusPad,
      ),
      aspect,
      1.25,
    );
    const anchorY = r.stop.caption ? 0.42 : 0.5;

    // TWO keys per stop, not one. sampleCamera interpolates between adjacent
    // keys, so a lone key is a waypoint the camera passes through — it would
    // arrive and immediately leave, and the caption would still be describing
    // the previous subject. An arrive/depart pair gives the stop a real hold,
    // which is what makes it readable rather than a fly-by.
    const arrive = slotStart + Math.round(perStop * 0.4);
    cameraKeys.push({ frame: arrive, view, anchorY });
    cameraKeys.push({ frame: slotEnd, view, anchorY });

    // The highlight switches exactly as the camera departs for this stop, so
    // the subject lights up on approach rather than snapping when it lands.
    focusSteps.push({
      from: slotStart,
      ids: r.stop.ids,
      caption: r.stop.caption,
    });
  });

  return (
    <FlowCanvas
      graph={graph}
      theme={theme}
      schedule={schedule}
      cameraKeys={cameraKeys}
      edgeDuration={edgeDuration}
      eyebrow={eyebrow}
      title={title}
      focusSteps={focusSteps}
    />
  );
};
