/**
 * Flow canvas theming.
 *
 * Parameterized deliberately. The existing ep/ex/zp component sets are
 * near-identical files differing only in palette — the documented failure mode
 * of "six near-copies rather than one parameterized component". A new
 * component should not add a fourth copy, so every colour here arrives as a
 * prop.
 *
 * EP values are lifted from remotion/src/components/ep/* so a FlowCanvas scene
 * drops into the Equity Pulse video without a palette clash. Note EP inverts
 * the convention used by EX and ZP: its headline uses the *accent* (amber)
 * while labels use the primary (teal), hence separate `headline` and `label`
 * tokens rather than one "brand" colour.
 */
export interface FlowTheme {
  /** Page ground. */
  bg: string;
  /** Secondary ground for gradient stops. */
  bgAlt: string;
  /** Node fill. */
  nodeFill: string;
  /** Node border, resting. */
  nodeStroke: string;
  /** Node border + glow once focused. */
  nodeFocus: string;
  /** Execution (`main`) edges. */
  edge: string;
  /** AI sub-node (`ai_*`) edges. */
  edgeAi: string;
  /** Icon colour. */
  icon: string;
  /** Node label text. */
  label: string;
  /** Dimmed label for unfocused nodes. */
  labelDim: string;
  /** Section eyebrow / small caps. */
  eyebrow: string;
  /** Headline text. */
  headline: string;
  /** Faint background grid. */
  grid: string;
}

export const EP_THEME: FlowTheme = {
  bg: "#020c18",
  bgAlt: "#041e30",
  nodeFill: "rgba(255,255,255,0.04)",
  nodeStroke: "rgba(20,184,166,0.35)",
  nodeFocus: "#14b8a6",
  edge: "rgba(94,234,212,0.55)",
  edgeAi: "rgba(251,191,36,0.5)",
  icon: "#5eead4",
  label: "#e6fffb",
  labelDim: "rgba(230,255,251,0.45)",
  eyebrow: "#14b8a6",
  headline: "#fbbf24",
  grid: "rgba(20,184,166,0.06)",
};

export const EX_THEME: FlowTheme = {
  bg: "#06050f",
  bgAlt: "#0a0e1e",
  nodeFill: "rgba(255,255,255,0.04)",
  nodeStroke: "rgba(34,211,238,0.35)",
  nodeFocus: "#22d3ee",
  edge: "rgba(103,232,249,0.55)",
  edgeAi: "rgba(232,121,249,0.5)",
  icon: "#67e8f9",
  label: "#ecfeff",
  labelDim: "rgba(236,254,255,0.45)",
  eyebrow: "#22d3ee",
  headline: "#22d3ee",
  grid: "rgba(34,211,238,0.05)",
};

export const ZP_THEME: FlowTheme = {
  bg: "#030d06",
  bgAlt: "#061e0c",
  nodeFill: "rgba(255,255,255,0.04)",
  nodeStroke: "rgba(74,222,128,0.35)",
  nodeFocus: "#4ade80",
  edge: "rgba(134,239,172,0.55)",
  edgeAi: "rgba(251,146,60,0.5)",
  icon: "#86efac",
  label: "#f0fff4",
  labelDim: "rgba(240,255,244,0.45)",
  eyebrow: "#4ade80",
  headline: "#4ade80",
  grid: "rgba(74,222,128,0.05)",
};

/**
 * Dossier Bot — violet primary with a coral accent.
 *
 * A fourth palette rather than a reuse: the four films sit side by side on
 * /work, and sharing a colour would make two of them read as the same project.
 * Violet also nods at Slack without imitating its logo.
 */
export const DB_THEME: FlowTheme = {
  bg: "#0b0716",
  bgAlt: "#17102b",
  nodeFill: "rgba(255,255,255,0.04)",
  nodeStroke: "rgba(167,139,250,0.35)",
  nodeFocus: "#a78bfa",
  edge: "rgba(196,181,253,0.55)",
  edgeAi: "rgba(251,113,133,0.5)",
  icon: "#c4b5fd",
  label: "#f5f3ff",
  labelDim: "rgba(245,243,255,0.45)",
  eyebrow: "#a78bfa",
  headline: "#fb7185",
  grid: "rgba(167,139,250,0.06)",
};
