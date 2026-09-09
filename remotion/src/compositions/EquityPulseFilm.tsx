/**
 * Equity Pulse — automated portfolio intelligence for retail investors.
 *
 * Config only; the eight-beat structure and every timing decision live in
 * CaseStudyFilm. Copy is taken from the published case study at
 * src/app/work/projects/equity-pulse/equity-pulse.mdx so the video and the
 * write-up cannot drift apart.
 *
 * The four acts are the four real workflows behind the project, in execution
 * order: ingest, enrich, review, deliver.
 */
import { CaseStudyFilm } from "../film/CaseStudyFilm";
import { EQUITY_PULSE_MUSIC } from "../film/music";
import confirmationJson from "../flow/data/equity-pulse-confirmation-hitl.json";
import emailJson from "../flow/data/equity-pulse-email-direct.json";
import enrichmentJson from "../flow/data/equity-pulse-enrichment-report-hitl.json";
import ingestionJson from "../flow/data/equity-pulse-ingestion-hitl.json";
import { parseFlow } from "../flow/parse";
import { EP_THEME } from "../flow/theme";
import type { RawFlow } from "../flow/types";

const INGESTION = parseFlow(ingestionJson as RawFlow);
const ENRICHMENT = parseFlow(enrichmentJson as RawFlow);
const CONFIRMATION = parseFlow(confirmationJson as RawFlow);
const EMAIL = parseFlow(emailJson as RawFlow);

export const EquityPulseFilm: React.FC = () => (
  <CaseStudyFilm
    music={EQUITY_PULSE_MUSIC}
    theme={EP_THEME}
    project="Equity Pulse"
    hook={{
      graph: ENRICHMENT,
      title: "Screenshot in. Advisor-grade PDF out.",
    }}
    problem={{
      headline: "Your broker shows prices. Not answers.",
      subline: "Reviewing twenty holdings means hours across a dozen tabs.",
    }}
    acts={[
      {
        graph: INGESTION,
        eyebrow: "Step one",
        title: "Ingest",
        focusStops: [
          { ids: ["Webhook", "OpenAI"], caption: "GPT-4o Vision reads the screenshot." },
          {
            ids: ["Sent to Sheet for Review", "SendGrid"],
            caption: "Extracted holdings go out for review.",
          },
        ],
      },
      {
        graph: ENRICHMENT,
        eyebrow: "Step two",
        title: "Enrich",
        stagger: 7,
        focusStops: [
          { ids: ["Loop Over Items"], caption: "Every holding loops through enrichment." },
          {
            ids: ["Get Yahoo Quote", "Get What Analysts are saying", "Get latest news"],
            caption: "Six signals pulled for every holding.",
          },
          {
            ids: ["Get Beta Stats", "Parse Beta and Get Flag"],
            caption: "Beta becomes a risk flag.",
          },
        ],
      },
      {
        graph: CONFIRMATION,
        eyebrow: "Step three",
        title: "Review",
        stagger: 11,
        focusStops: [
          {
            ids: ["Update Status to reviewed", "Wait"],
            caption: "Nothing ships without a human sign-off.",
          },
        ],
      },
      {
        graph: EMAIL,
        eyebrow: "Step four",
        title: "Deliver",
        stagger: 10,
        focusStops: [
          { ids: ["AI Agent", "OpenAI Chat Model"], caption: "An AI agent writes the analysis." },
          { ids: ["Create Pdf", "SendGrid3"], caption: "Rendered to PDF and emailed." },
        ],
      },
    ]}
    metrics={[
      { value: 10, label: "minutes to PDF", prefix: "<" },
      { value: 6, label: "signals per holding" },
      { value: 100, label: "of data pulls automated", suffix: "%" },
    ]}
    cta={{
      name: "Musaab Javed",
      jobTitle: "AI Integrations Engineer",
      action: "Book a 20-minute call",
      url: "musaabjaved.com",
      availability: "musabjaved47@gmail.com",
    }}
  />
);
