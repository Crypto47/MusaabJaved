/**
 * n8n canvas geometry, mirrored from n8n source so the rendered graph matches
 * what the workflow author actually sees in the editor.
 *
 * Constants: packages/frontend/editor-ui/src/app/utils/nodeViewUtils.ts
 * Handles:   packages/frontend/editor-ui/.../nodes/CanvasNode.vue
 * Edges:     packages/frontend/editor-ui/.../edges/utils/getEdgeRenderData.ts
 *
 * IMPORTANT: an n8n `position` is the node's TOP-LEFT corner, not its centre.
 */
import { Position, getBezierPath, getSmoothStepPath } from "@xyflow/system";

export const GRID_SIZE = 16;

/** Standard node: 96 x 96 square. */
export const DEFAULT_NODE_SIZE: readonly [number, number] = [GRID_SIZE * 6, GRID_SIZE * 6];
/** AI sub-node ("configuration"): 80 x 80 circle. */
export const CONFIGURATION_NODE_RADIUS = (GRID_SIZE * 5) / 2;
export const CONFIGURATION_NODE_SIZE: readonly [number, number] = [
  CONFIGURATION_NODE_RADIUS * 2,
  CONFIGURATION_NODE_RADIUS * 2,
];
/** Node that accepts sub-nodes (e.g. AI Agent): 256 x 96. */
export const CONFIGURABLE_NODE_SIZE: readonly [number, number] = [GRID_SIZE * 16, GRID_SIZE * 6];

export const NODE_X_SPACING = GRID_SIZE * 8;
export const HORIZONTAL_NODE_STEP = DEFAULT_NODE_SIZE[0] + NODE_X_SPACING;

/** Edge routing constants from getEdgeRenderData.ts */
export const EDGE_PADDING_BOTTOM = 130;
export const EDGE_PADDING_X = 40;
export const EDGE_BORDER_RADIUS = 16;
export const HANDLE_SIZE = 20;
export const BEZIER_CURVATURE = 0.25;

export type NodeKind = "default" | "configuration" | "configurable";

/** Sub-node types that attach *below* a parent via an ai_* connection. */
const CONFIGURATION_TYPE_RE =
  /(lmChat|lmOpenAi|embeddings|memory|outputParser|retriever|reranker|textSplitter|documentDefault|toolWorkflow|toolCode|toolHttpRequest)/i;
/** Types whose own suffix marks them a sub-node tool. */
const TOOL_SUFFIX_RE = /Tool$/;
/** Types that accept ai_* inputs and therefore render wide. */
const CONFIGURABLE_TYPE_RE = /(\.agent|chainLlm|chainRetrieval|informationExtractor|textClassifier)/i;

export const nodeKind = (type: string): NodeKind => {
  if (CONFIGURATION_TYPE_RE.test(type) || TOOL_SUFFIX_RE.test(type)) return "configuration";
  if (CONFIGURABLE_TYPE_RE.test(type)) return "configurable";
  return "default";
};

export const nodeSize = (type: string): readonly [number, number] => {
  switch (nodeKind(type)) {
    case "configuration":
      return CONFIGURATION_NODE_SIZE;
    case "configurable":
      return CONFIGURABLE_NODE_SIZE;
    default:
      return DEFAULT_NODE_SIZE;
  }
};

export type Box = { x: number; y: number; w: number; h: number };

/**
 * Handle (port) coordinates in canvas space.
 *
 * main inputs  -> Left edge,   main outputs -> Right edge,
 * both spaced at (100 / (count + 1)) * (index + 1) percent of node height.
 * ai_* inputs  -> Bottom edge, ai_* outputs -> Top edge,
 * both offset CONFIGURATION_NODE_RADIUS + GRID_SIZE * 3 * index from the left.
 */
export const handlePoint = (
  box: Box,
  side: "in" | "out",
  kind: string,
  index: number,
  count: number,
): { x: number; y: number; position: Position } => {
  const isMain = kind === "main";
  if (isMain) {
    const ratio = (100 / (count + 1)) * (index + 1) / 100;
    return side === "out"
      ? { x: box.x + box.w, y: box.y + box.h * ratio, position: Position.Right }
      : { x: box.x, y: box.y + box.h * ratio, position: Position.Left };
  }
  const offset = CONFIGURATION_NODE_RADIUS + GRID_SIZE * 3 * index;
  return side === "out"
    ? { x: box.x + offset, y: box.y, position: Position.Top }
    : { x: box.x + offset, y: box.y + box.h, position: Position.Bottom };
};

const isRightOfSourceHandle = (sourceX: number, targetX: number) =>
  sourceX - HANDLE_SIZE > targetX;

/**
 * Build the SVG path segment(s) for one edge, reproducing n8n's own routing.
 *
 * Forward edges (and every non-main edge) are a single bezier at curvature
 * 0.25. A *backward* main edge instead routes below the source node as two
 * smooth-step segments, which is why this returns an array.
 */
export const edgePathSegments = (args: {
  sourceX: number;
  sourceY: number;
  sourcePosition: Position;
  targetX: number;
  targetY: number;
  targetPosition: Position;
  kind: string;
}): string[] => {
  const { sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, kind } = args;

  if (!isRightOfSourceHandle(sourceX, targetX) || kind !== "main") {
    const [path] = getBezierPath({
      sourceX,
      sourceY,
      sourcePosition,
      targetX,
      targetY,
      targetPosition,
      curvature: BEZIER_CURVATURE,
    });
    return [path];
  }

  const midX = (sourceX + targetX) / 2;
  const midY = sourceY + EDGE_PADDING_BOTTOM;
  const [first] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX: midX,
    targetY: midY,
    targetPosition: Position.Right,
    borderRadius: EDGE_BORDER_RADIUS,
    offset: EDGE_PADDING_X,
  });
  const [second] = getSmoothStepPath({
    sourceX: midX,
    sourceY: midY,
    sourcePosition: Position.Left,
    targetX,
    targetY,
    targetPosition,
    borderRadius: EDGE_BORDER_RADIUS,
    offset: EDGE_PADDING_X,
  });
  return [first, second];
};

/** Bounding box of a set of node boxes, in canvas space. */
export const boundsOf = (boxes: Box[], pad = 0): Box => {
  if (boxes.length === 0) return { x: 0, y: 0, w: 1, h: 1 };
  const minX = Math.min(...boxes.map((b) => b.x)) - pad;
  const minY = Math.min(...boxes.map((b) => b.y)) - pad;
  const maxX = Math.max(...boxes.map((b) => b.x + b.w)) + pad;
  const maxY = Math.max(...boxes.map((b) => b.y + b.h)) + pad;
  return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
};
