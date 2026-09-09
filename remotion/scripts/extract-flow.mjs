#!/usr/bin/env node
/**
 * Extract a minimal, sanitized graph from an n8n workflow export.
 *
 * This is a PRIVACY BOUNDARY, not a convenience. n8n exports carry
 * `credentials` (whose *names* identify clients and accounts) and
 * `parameters` (API URLs, prompt text, table names, header auth).
 * None of that is needed to draw a canvas, so none of it crosses into
 * the video project.
 *
 * Kept per node : name, type, typeVersion, position
 * Kept top level: name, connections, settings.executionOrder
 * Dropped       : credentials, parameters, pinData, webhookId, ids, tags, meta
 *
 * Usage:
 *   node scripts/extract-flow.mjs "../n8n flows/Nicholas Project/Ingestion_Flow_HITL__1_3_.json" equity-pulse-ingestion-hitl
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = resolve(HERE, "../src/flow/data");

/**
 * Node labels are rendered on screen, so client-identifying names are
 * rewritten here rather than at render time. Order matters: longest first.
 */
const LABEL_REDACTIONS = [
  [/\bYves\b/g, "Client"],
  [/\bNicholas\b/g, "Client"],
  [/\bDavy\b/g, "Client"],
  [/\bLuttick\b/g, "Client"],
  [/\bStefan\b/g, "Client"],
  [/\bMetagora\b/g, "Account"],
  [/\bDegiro\b/g, "Brokerage"],
];

const redactLabel = (label) =>
  LABEL_REDACTIONS.reduce((acc, [re, to]) => acc.replace(re, to), label);

const [, , inputPath, slug] = process.argv;
if (!inputPath || !slug) {
  console.error("usage: node scripts/extract-flow.mjs <n8n-export.json> <out-slug>");
  process.exit(1);
}
if (!/^[a-z0-9-]+$/.test(slug)) {
  console.error(`slug must be kebab-case [a-z0-9-]: got "${slug}"`);
  process.exit(1);
}

const raw = JSON.parse(readFileSync(inputPath, "utf8"));

const nodes = [];
let stickyCount = 0;
let redactedCount = 0;

for (const n of raw.nodes ?? []) {
  if (typeof n?.type !== "string" || !Array.isArray(n.position)) continue;
  if (n.type.includes("stickyNote")) {
    stickyCount++;
    continue; // annotations are authored copy, handled separately if wanted
  }
  const label = redactLabel(String(n.name ?? ""));
  if (label !== n.name) redactedCount++;
  nodes.push({
    name: n.name, // identity: connections are keyed by the original name
    label, // what gets drawn
    type: n.type,
    typeVersion: n.typeVersion ?? 1,
    position: [Number(n.position[0]), Number(n.position[1])],
  });
}

// Rebuild connections, keeping only edges whose endpoints survived.
const keptNames = new Set(nodes.map((n) => n.name));
const connections = {};
for (const [src, spec] of Object.entries(raw.connections ?? {})) {
  if (!keptNames.has(src)) continue;
  const kinds = {};
  for (const [kind, outputs] of Object.entries(spec ?? {})) {
    if (!Array.isArray(outputs)) continue;
    const cleaned = outputs.map((out) =>
      (Array.isArray(out) ? out : [])
        .filter((c) => c && keptNames.has(c.node))
        .map((c) => ({ node: c.node, type: c.type, index: c.index ?? 0 })),
    );
    if (cleaned.some((o) => o.length > 0)) kinds[kind] = cleaned;
  }
  if (Object.keys(kinds).length > 0) connections[src] = kinds;
}

const out = {
  name: redactLabel(String(raw.name ?? slug)),
  executionOrder: raw.settings?.executionOrder ?? "v1",
  nodes,
  connections,
};

mkdirSync(OUT_DIR, { recursive: true });
const outPath = resolve(OUT_DIR, `${slug}.json`);
writeFileSync(outPath, `${JSON.stringify(out, null, 2)}\n`, "utf8");

const edgeCount = Object.values(connections)
  .flatMap((k) => Object.values(k))
  .flat()
  .reduce((a, o) => a + o.length, 0);

console.log(`${slug}.json written`);
console.log(`  nodes:   ${nodes.length} (${stickyCount} sticky notes skipped)`);
console.log(`  edges:   ${edgeCount}`);
console.log(`  order:   ${out.executionOrder}`);
console.log(`  redacted labels: ${redactedCount}`);
