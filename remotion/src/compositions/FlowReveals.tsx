/**
 * The "under the hood" clips embedded in the HyperFrames card films.
 *
 * One per project, each the workflow the old film opened on, so the graph the
 * card used to show is the one that now runs start to finish. Stagger is set
 * per graph: Dossier's Slack bot has 10 nodes, Zippit's engine 76.
 */
import type { FlowRevealConfig } from "../film/FlowReveal";
import dossierSlackJson from "../flow/data/dossier-slack-bot.json";
import epEnrichmentJson from "../flow/data/equity-pulse-enrichment-report-hitl.json";
import exEnrichmentJson from "../flow/data/excelr8-enrichment.json";
import zpEngineJson from "../flow/data/zippit-content-engine.json";
import { parseFlow } from "../flow/parse";
import { DB_THEME, EP_THEME, EX_THEME, ZP_THEME } from "../flow/theme";
import type { RawFlow } from "../flow/types";

export const FLOW_REVEALS: Record<string, FlowRevealConfig> = {
  DossierBotReveal: { graph: parseFlow(dossierSlackJson as RawFlow), theme: DB_THEME, stagger: 20 },
  EquityPulseReveal: { graph: parseFlow(epEnrichmentJson as RawFlow), theme: EP_THEME, stagger: 7 },
  Excelr8Reveal: { graph: parseFlow(exEnrichmentJson as RawFlow), theme: EX_THEME, stagger: 4 },
  ZippitReveal: { graph: parseFlow(zpEngineJson as RawFlow), theme: ZP_THEME, stagger: 2.4, wideAnchorY: 0.62 },
};
