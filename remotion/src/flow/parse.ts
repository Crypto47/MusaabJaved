/**
 * Turn a sanitized n8n export into a normalized, render-ready graph.
 *
 * This must stay a PURE function of its input: Remotion renders frames in
 * parallel browser tabs, so anything non-deterministic here shows up as
 * flicker. Call it at module scope or inside useMemo — never in an effect.
 */
import { boundsOf, edgePathSegments, handlePoint, nodeKind, nodeSize } from "./geometry";
import type { Box } from "./geometry";
import type { FlowEdge, FlowGraph, FlowNode, RawFlow } from "./types";

const shortType = (type: string) => type.split(".").pop() ?? type;

export const parseFlow = (raw: RawFlow): FlowGraph => {
  const nodes: FlowNode[] = raw.nodes.map((n) => {
    const [w, h] = nodeSize(n.type);
    return {
      id: n.name,
      label: n.label,
      type: n.type,
      short: shortType(n.type),
      kind: nodeKind(n.type),
      x: n.position[0] ?? 0,
      y: n.position[1] ?? 0,
      w,
      h,
    };
  });

  const byId: Record<string, FlowNode> = {};
  for (const n of nodes) byId[n.id] = n;

  // Pass 1: how many handles does each node need per connection kind?
  // Output count comes straight from the connections array length. Input
  // count is the highest target index seen +1 (a Merge node has two).
  const outCount: Record<string, number> = {};
  const inCount: Record<string, number> = {};
  const keyOf = (id: string, kind: string) => `${id}::${kind}`;

  for (const [source, kinds] of Object.entries(raw.connections)) {
    for (const [kind, outputs] of Object.entries(kinds)) {
      outCount[keyOf(source, kind)] = Math.max(
        outCount[keyOf(source, kind)] ?? 0,
        outputs.length,
      );
      for (const targets of outputs) {
        for (const t of targets) {
          const k = keyOf(t.node, t.type ?? kind);
          inCount[k] = Math.max(inCount[k] ?? 0, (t.index ?? 0) + 1);
        }
      }
    }
  }

  // Pass 2: build edges with real handle coordinates and path geometry.
  const edges: FlowEdge[] = [];
  const boxOf = (n: FlowNode): Box => ({ x: n.x, y: n.y, w: n.w, h: n.h });

  for (const [source, kinds] of Object.entries(raw.connections)) {
    const sourceNode = byId[source];
    if (!sourceNode) continue;

    for (const [kind, outputs] of Object.entries(kinds)) {
      outputs.forEach((targets, outputIndex) => {
        for (const t of targets) {
          const targetNode = byId[t.node];
          if (!targetNode) continue;

          const from = handlePoint(
            boxOf(sourceNode),
            "out",
            kind,
            outputIndex,
            outCount[keyOf(source, kind)] ?? 1,
          );
          const to = handlePoint(
            boxOf(targetNode),
            "in",
            t.type ?? kind,
            t.index ?? 0,
            inCount[keyOf(t.node, t.type ?? kind)] ?? 1,
          );

          edges.push({
            id: `${source}#${outputIndex}->${t.node}#${t.index ?? 0}:${kind}`,
            source,
            target: t.node,
            kind,
            outputIndex,
            sourcePoint: { x: from.x, y: from.y },
            targetPoint: { x: to.x, y: to.y },
            segments: edgePathSegments({
              sourceX: from.x,
              sourceY: from.y,
              sourcePosition: from.position,
              targetX: to.x,
              targetY: to.y,
              targetPosition: to.position,
              kind,
            }),
          });
        }
      });
    }
  }

  const outgoing: Record<string, FlowEdge[]> = {};
  for (const n of nodes) outgoing[n.id] = [];
  for (const e of edges) outgoing[e.source]?.push(e);
  for (const id of Object.keys(outgoing)) {
    outgoing[id].sort((a, b) => a.outputIndex - b.outputIndex);
  }

  return {
    name: raw.name,
    executionOrder: raw.executionOrder,
    nodes,
    edges,
    byId,
    outgoing,
    bounds: boundsOf(nodes.map(boxOf)),
  };
};
