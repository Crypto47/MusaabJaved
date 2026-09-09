/**
 * Reveal order for a flow graph.
 *
 * n8n's `executionOrder: "v1"` is depth-first: it "executes each branch in
 * turn, completing one branch before starting another", ordering branches
 * "from topmost to bottommost" and, on ties, leftmost first. Matching that
 * means the animation reveals the workflow in the order it actually runs.
 * Legacy "v0" is breadth-first.
 *
 * Docs: https://docs.n8n.io/build/flow-logic/understand-execution-order
 *
 * Pure functions only — see the note in parse.ts.
 */
import type { FlowEdge, FlowGraph } from "./types";

const MAIN = "main";

/** Node ids with no incoming `main` edge, i.e. the triggers. */
export const triggerIds = (graph: FlowGraph): string[] => {
  const hasMainInput = new Set(
    graph.edges.filter((e) => e.kind === MAIN).map((e) => e.target),
  );
  return graph.nodes
    .filter((n) => n.kind !== "configuration" && !hasMainInput.has(n.id))
    .sort((a, b) => a.y - b.y || a.x - b.x)
    .map((n) => n.id);
};

/**
 * True if the `main` subgraph contains a cycle. n8n workflows legitimately
 * loop back through Wait/Merge/SplitInBatches nodes, and a naive topological
 * sort throws on those — so callers check this first and fall back to
 * position order rather than crashing a render.
 */
export const hasCycle = (graph: FlowGraph): boolean => {
  const state: Record<string, 0 | 1 | 2> = {};
  const visit = (id: string): boolean => {
    if (state[id] === 1) return true;
    if (state[id] === 2) return false;
    state[id] = 1;
    for (const e of graph.outgoing[id] ?? []) {
      if (e.kind !== MAIN) continue;
      if (visit(e.target)) return true;
    }
    state[id] = 2;
    return false;
  };
  return graph.nodes.some((n) => visit(n.id));
};

/** Sort an edge list the way n8n picks the next branch: top, then left. */
const byTargetPosition = (graph: FlowGraph) => (a: FlowEdge, b: FlowEdge) => {
  const na = graph.byId[a.target];
  const nb = graph.byId[b.target];
  if (!na || !nb) return 0;
  return na.y - nb.y || na.x - nb.x;
};

/**
 * Reveal order over the `main` subgraph. Fan-in nodes appear once, on first
 * reach. Any node unreachable from a trigger (orphan, or stranded behind a
 * back-edge) is appended in position order so nothing is silently dropped.
 * AI sub-nodes are omitted — they reveal with their parent, not in sequence.
 */
export const revealOrder = (graph: FlowGraph): string[] => {
  const depthFirst = graph.executionOrder !== "v0";
  const sorter = byTargetPosition(graph);
  const seen = new Set<string>();
  const out: string[] = [];

  const push = (id: string) => {
    if (seen.has(id)) return false;
    seen.add(id);
    out.push(id);
    return true;
  };

  const mainOut = (id: string) =>
    (graph.outgoing[id] ?? []).filter((e) => e.kind === MAIN).sort(sorter);

  for (const root of triggerIds(graph)) {
    if (seen.has(root)) continue;
    if (depthFirst) {
      const stack = [root];
      while (stack.length > 0) {
        const id = stack.pop() as string;
        if (!push(id)) continue;
        // reversed so the topmost branch is popped first
        for (const e of mainOut(id).reverse()) {
          if (!seen.has(e.target)) stack.push(e.target);
        }
      }
    } else {
      const queue = [root];
      while (queue.length > 0) {
        const id = queue.shift() as string;
        if (!push(id)) continue;
        for (const e of mainOut(id)) {
          if (!seen.has(e.target)) queue.push(e.target);
        }
      }
    }
  }

  const stragglers = graph.nodes
    .filter((n) => n.kind !== "configuration" && !seen.has(n.id))
    .sort((a, b) => a.y - b.y || a.x - b.x);
  for (const n of stragglers) push(n.id);

  return out;
};

export interface Schedule {
  order: string[];
  /** Frame at which each node begins its entrance. */
  nodeStart: Record<string, number>;
  /** Frame at which each edge begins drawing. */
  edgeStart: Record<string, number>;
  /** Frame by which the last node has landed. */
  revealEnd: number;
}

export interface ScheduleOptions {
  /** Frame the first node lands on. */
  from: number;
  /** Frames between consecutive node entrances. */
  stagger: number;
  /** Frames after a source node lands before its edges start drawing. */
  edgeLead: number;
}

/**
 * Map reveal order onto frames. Every downstream component derives its own
 * timing from this one table, so there are no bare frame numbers scattered
 * through the render tree.
 */
export const buildSchedule = (graph: FlowGraph, opts: ScheduleOptions): Schedule => {
  const order = revealOrder(graph);
  const nodeStart: Record<string, number> = {};

  order.forEach((id, i) => {
    nodeStart[id] = opts.from + i * opts.stagger;
  });

  // Sub-nodes land with the parent they hang off.
  for (const e of graph.edges) {
    if (e.kind === MAIN) continue;
    const parentStart = nodeStart[e.target];
    if (parentStart !== undefined && nodeStart[e.source] === undefined) {
      nodeStart[e.source] = parentStart;
    }
  }
  for (const n of graph.nodes) {
    if (nodeStart[n.id] === undefined) nodeStart[n.id] = opts.from;
  }

  const edgeStart: Record<string, number> = {};
  for (const e of graph.edges) {
    const src = nodeStart[e.source] ?? opts.from;
    const tgt = nodeStart[e.target] ?? opts.from;
    // Draw once the earlier endpoint is up, so the line arrives with its target.
    edgeStart[e.id] = Math.min(src, tgt) + opts.edgeLead;
  }

  return {
    order,
    nodeStart,
    edgeStart,
    revealEnd: opts.from + Math.max(0, order.length - 1) * opts.stagger,
  };
};
