/**
 * n8n node type -> icon.
 *
 * Only `react-icons` is used. The other installed set,
 * @icons-pack/react-simple-icons, had OpenAI / SendGrid / Slack / AWS removed
 * upstream and collides on names like SiSupabase and SiAirtable, so mixing the
 * two would force import aliasing for no gain. react-icons/si covers every
 * brand this corpus needs except Pinecone and S3, which take generic icons.
 *
 * The corpus has 48 distinct node types and a long tail, so the category
 * fallback matters more than exhaustive per-type mapping.
 */
import type { ComponentType } from "react";
import {
  LuBot,
  LuBraces,
  LuBrain,
  LuClipboardList,
  LuClock,
  LuCode,
  LuCombine,
  LuDatabase,
  LuFileInput,
  LuFileOutput,
  LuFileText,
  LuFilter,
  LuGitBranch,
  LuGitMerge,
  LuGlobe,
  LuHardDrive,
  LuLayers,
  LuMousePointerClick,
  LuRepeat,
  LuRss,
  LuScanText,
  LuSend,
  LuShuffle,
  LuSquarePen,
  LuTimer,
  LuWebhook,
  LuWorkflow,
} from "react-icons/lu";
import {
  SiAirtable,
  SiAnthropic,
  SiGooglegemini,
  SiGooglesheets,
  SiLangchain,
  SiOpenai,
  SiPerplexity,
  SiReddit,
  SiSendgrid,
  SiSlack,
  SiSupabase,
} from "react-icons/si";

/** Both icon sets satisfy this, so the registry stays library-agnostic. */
export type FlowIcon = ComponentType<{ size?: number | string; color?: string }>;

/** Broad role of a node, used for tinting and for the icon fallback. */
export type NodeCategory = "trigger" | "ai" | "storage" | "messaging" | "logic" | "transform";

const BY_TYPE: Record<string, FlowIcon> = {
  // triggers
  webhook: LuWebhook,
  scheduleTrigger: LuClock,
  manualTrigger: LuMousePointerClick,
  rssFeedReadTrigger: LuRss,
  formTrigger: LuClipboardList,
  executeWorkflowTrigger: LuWorkflow,
  googleSheetsTrigger: SiGooglesheets,
  airtableTrigger: SiAirtable,
  slackTrigger: SiSlack,

  // brands
  googleSheets: SiGooglesheets,
  supabase: SiSupabase,
  supabaseTool: SiSupabase,
  airtable: SiAirtable,
  sendGrid: SiSendgrid,
  slack: SiSlack,
  reddit: SiReddit,
  perplexity: SiPerplexity,
  openAi: SiOpenai,
  lmChatOpenAi: SiOpenai,
  embeddingsOpenAi: SiOpenai,
  lmChatAnthropic: SiAnthropic,
  lmChatGoogleGemini: SiGooglegemini,
  chainLlm: SiLangchain,
  vectorStorePinecone: LuDatabase, // no brand icon in either set
  s3: LuHardDrive, // AWS marks were removed upstream

  // ai
  agent: LuBot,
  informationExtractor: LuScanText,
  outputParserStructured: LuBraces,
  outputParserAutofixing: LuBraces,
  memoryBufferWindow: LuBrain,

  // logic
  if: LuGitBranch,
  switch: LuShuffle,
  filter: LuFilter,
  merge: LuGitMerge,
  splitInBatches: LuRepeat,
  splitOut: LuLayers,
  aggregate: LuCombine,
  wait: LuTimer,
  executeWorkflow: LuWorkflow,

  // transform / io
  code: LuCode,
  set: LuSquarePen,
  httpRequest: LuGlobe,
  httpRequestTool: LuGlobe,
  extractFromFile: LuFileInput,
  convertToFile: LuFileOutput,
  markdown: LuFileText,
  respondToWebhook: LuSend,
};

const CATEGORY_ICON: Record<NodeCategory, FlowIcon> = {
  trigger: LuClock,
  ai: LuBrain,
  storage: LuDatabase,
  messaging: LuSend,
  logic: LuGitBranch,
  transform: LuCode,
};

export const nodeCategory = (short: string): NodeCategory => {
  if (/Trigger$|^webhook$/.test(short)) return "trigger";
  if (/^(agent|lmChat|embeddings|outputParser|memory|chain|vectorStore|openAi|informationExtractor|textClassifier)/.test(short))
    return "ai";
  if (/^(supabase|airtable|googleSheets|s3|vectorStore|postgres|mysql|mongoDb|redis)/.test(short))
    return "storage";
  if (/^(sendGrid|slack|gmail|telegram|discord|whatsapp|respondToWebhook)/.test(short))
    return "messaging";
  if (/^(if|switch|filter|merge|split|aggregate|wait|executeWorkflow)/.test(short)) return "logic";
  return "transform";
};

/** Never returns null — the long tail resolves through its category. */
export const iconForType = (short: string): FlowIcon =>
  BY_TYPE[short] ?? CATEGORY_ICON[nodeCategory(short)];

/**
 * Brand names the camelCase splitter would mangle — it turns "sendGrid" into
 * "Send Grid" and "openAi" into "Open Ai", both of which look like typos on
 * screen.
 */
const BRAND_NAMES: Record<string, string> = {
  sendGrid: "SendGrid",
  openAi: "OpenAI",
  lmChatOpenAi: "OpenAI",
  lmChatAnthropic: "Anthropic",
  lmChatGoogleGemini: "Gemini",
  embeddingsOpenAi: "OpenAI Embeddings",
  googleSheets: "Google Sheets",
  googleSheetsTrigger: "Google Sheets",
  vectorStorePinecone: "Pinecone",
  httpRequest: "HTTP Request",
  httpRequestTool: "HTTP Request",
  s3: "S3",
  supabaseTool: "Supabase",
  splitInBatches: "Loop",
  splitOut: "Split Out",
  chainLlm: "LLM Chain",
  outputParserStructured: "Output Parser",
  outputParserAutofixing: "Output Parser",
  memoryBufferWindow: "Memory",
  executeWorkflow: "Sub-workflow",
  executeWorkflowTrigger: "Sub-workflow",
  respondToWebhook: "Webhook Response",
  extractFromFile: "Extract From File",
  convertToFile: "Convert To File",
};

/** Human-readable node type, e.g. "googleSheets" -> "Google Sheets". */
export const prettyType = (short: string) =>
  BRAND_NAMES[short] ??
  short
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/^./, (c) => c.toUpperCase())
    .replace(/\bTrigger\b/, "Trigger")
    .trim();
