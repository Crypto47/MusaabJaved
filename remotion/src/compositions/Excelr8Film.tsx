/**
 * Excelr8 — AI-powered GTM automation.
 *
 * Config only; structure and timing live in CaseStudyFilm. Copy comes from
 * src/app/work/projects/excelr8/excelr8.mdx.
 *
 * Two real workflows carry it. The campaign manager handles intake and
 * deduplication; the enrichment flow is a single pipeline spanning ~10,300
 * canvas units, so acts two through four dolly along it rather than making one
 * jump — at that width a single camera push would leave most of the graph
 * decorative.
 *
 * Metric wording deliberately takes the conservative end of the ranges in the
 * case study ("14-30 hrs/month" becomes "14+"), because overclaiming is the
 * fastest way to lose a technical reader.
 */
import { CaseStudyFilm } from "../film/CaseStudyFilm";
import { EXCELR8_MUSIC } from "../film/music";
import campaignJson from "../flow/data/excelr8-campaign-manager.json";
import enrichmentJson from "../flow/data/excelr8-enrichment.json";
import { parseFlow } from "../flow/parse";
import { EX_THEME } from "../flow/theme";
import type { RawFlow } from "../flow/types";

const CAMPAIGN = parseFlow(campaignJson as RawFlow);
const ENRICH = parseFlow(enrichmentJson as RawFlow);

export const Excelr8Film: React.FC = () => (
  <CaseStudyFilm
    music={EXCELR8_MUSIC}
    theme={EX_THEME}
    project="Excelr8"
    hook={{
      graph: ENRICH,
      title: "Campaign setup, hours down to minutes.",
      stagger: 6,
      revealFrom: -190,
    }}
    problem={{
      headline: "Leads live in spreadsheets. Campaigns launch by hand.",
      subline: "Copy-paste, re-enter the CRM, rebuild the KPI sheet every week.",
    }}
    acts={[
      {
        graph: CAMPAIGN,
        eyebrow: "Step one",
        title: "Import",
        stagger: 11,
        focusStops: [
          {
            ids: ["Webhook", "Normalizer Node"],
            caption: "A lead list arrives and gets normalized.",
          },
          {
            ids: ["Get Row against linkedin_url", "Update lead"],
            caption: "Deduped against everyone already known.",
          },
        ],
      },
      {
        graph: ENRICH,
        eyebrow: "Step two",
        title: "Enrich",
        stagger: 7,
        focusStops: [
          { ids: ["Get all leads", "Url and Identifier Block"], caption: "Every lead, resolved." },
          {
            ids: ["Personality Assesment Agent1", "OpenAI Chat Model", "Structured Output Parser"],
            caption: "An agent scores personality into structured fields.",
          },
        ],
      },
      {
        graph: ENRICH,
        eyebrow: "Step three",
        title: "Watch",
        stagger: 7,
        focusStops: [
          {
            ids: ["Get Commentaories", "Format Comment Json"],
            caption: "Comments on their LinkedIn posts, collected.",
          },
          {
            ids: ["Get Reactionaries", "Format Reactions Json"],
            caption: "Reactions too — engagement is the buying signal.",
          },
        ],
      },
      {
        graph: ENRICH,
        eyebrow: "Step four",
        title: "Sync",
        stagger: 7,
        focusStops: [
          {
            ids: ["AI Agent", "OpenAI Chat Model1"],
            caption: "One agent turns the signals into a profile.",
          },
          { ids: ["If", "Supabase"], caption: "Written straight back to the CRM." },
        ],
      },
    ]}
    metrics={[
      { value: 14, label: "hrs/month CRM entry removed", suffix: "+" },
      { value: 500, label: "leads/month tracked live", suffix: "+" },
      { value: 100, label: "of KPI reporting automated", suffix: "%" },
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
