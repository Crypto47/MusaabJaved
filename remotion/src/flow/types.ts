import type { Box } from "./geometry";

/** Shape written by scripts/extract-flow.mjs — already sanitized. */
export interface RawFlowNode {
  name: string;
  label: string;
  type: string;
  typeVersion: number;
  /** [x, y] top-left. Typed loosely because JSON imports widen tuples. */
  position: number[];
}

export interface RawFlowConnection {
  node: string;
  type: string;
  index: number;
}

/** connections[sourceName][kind][outputIndex] -> targets */
export type RawConnections = Record<string, Record<string, RawFlowConnection[][]>>;

export interface RawFlow {
  name: string;
  executionOrder: string;
  nodes: RawFlowNode[];
  connections: RawConnections;
}

export interface FlowNode {
  /** n8n node name — the identity connections are keyed by. */
  id: string;
  label: string;
  /** Full n8n type, e.g. "n8n-nodes-base.googleSheets". */
  type: string;
  /** Type suffix used for icon lookup, e.g. "googleSheets". */
  short: string;
  kind: "default" | "configuration" | "configurable";
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  /** "main" for execution flow, "ai_*" for sub-node attachments. */
  kind: string;
  outputIndex: number;
  /** One entry for a forward bezier, two for a backward smooth-step route. */
  segments: string[];
  sourcePoint: { x: number; y: number };
  targetPoint: { x: number; y: number };
}

export interface FlowGraph {
  name: string;
  executionOrder: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
  byId: Record<string, FlowNode>;
  /** Outgoing edges per node id, in output-index order. */
  outgoing: Record<string, FlowEdge[]>;
  bounds: Box;
}
