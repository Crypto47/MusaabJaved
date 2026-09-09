/**
 * Zippit — an automated bilingual SEO content engine.
 *
 * Config only; structure and timing live in CaseStudyFilm. Copy comes from
 * src/app/work/projects/zippit/zippit.mdx, which anonymizes the client as a
 * Dutch health brand — that wording is kept here.
 *
 * The content engine is the largest graph in the corpus: 76 nodes across
 * ~10,900 canvas units, and it is *mirrored* into a Dutch track above and an
 * English track below. That fork is the most distinctive thing in the whole
 * flow set, so act one ends on it. Acts two and three then travel the RAG
 * stack — four Pinecone stores, each with its own embeddings sub-node, per
 * language — before act four switches to the publishing workflow.
 */
import { CaseStudyFilm } from "../film/CaseStudyFilm";
import { ZIPPIT_MUSIC } from "../film/music";
import engineJson from "../flow/data/zippit-content-engine.json";
import publishingJson from "../flow/data/zippit-publishing.json";
import { parseFlow } from "../flow/parse";
import { ZP_THEME } from "../flow/theme";
import type { RawFlow } from "../flow/types";

const ENGINE = parseFlow(engineJson as RawFlow);
const PUBLISHING = parseFlow(publishingJson as RawFlow);

export const ZippitFilm: React.FC = () => (
  <CaseStudyFilm
    music={ZIPPIT_MUSIC}
    theme={ZP_THEME}
    project="Zippit"
    hook={{
      graph: ENGINE,
      title: "Two SEO articles a day. Two languages.",
      stagger: 5,
      revealFrom: -260,
      wideAnchorY: 0.62,
    }}
    problem={{
      headline: "A thousand dollars a month for two articles a week.",
      // Frame the constraint, not the incumbent. The earlier line said the
      // agency "could not scale to Google's EEAT bar", which reads as a swipe
      // at the client's previous supplier and at the client's own judgement
      // for hiring them. The retainer model is the honest culprit: per-article
      // pricing simply cannot reach daily bilingual output at any headcount.
      subline: "Per-article pricing does not reach daily output in two languages.",
    }}
    acts={[
      {
        graph: ENGINE,
        eyebrow: "Step one",
        title: "Source",
        stagger: 5,
        focusStops: [
          {
            ids: ["Search SEO Content", "Blog Amount Selector"],
            caption: "Topics and keywords pulled from Airtable.",
          },
          {
            ids: ["Return Input Sheet Items Dutch", "Return Input Sheet Items English"],
            caption: "Every run forks into Dutch and English.",
          },
        ],
      },
      {
        graph: ENGINE,
        eyebrow: "Step two",
        title: "Ground",
        stagger: 5,
        focusStops: [
          {
            ids: ["Zippit Company Profile", "Embeddings OpenAI1"],
            caption: "Brand voice retrieved from a vector store.",
          },
          {
            ids: ["Zippit Blog Instructions", "Embeddings OpenAI"],
            caption: "Four Pinecone stores ground every draft.",
          },
          {
            ids: ["Dynamic Search", "Embeddings OpenAI7"],
            caption: "Plus a live search over past articles.",
          },
        ],
      },
      {
        graph: ENGINE,
        eyebrow: "Step three",
        title: "Cite",
        stagger: 5,
        focusStops: [
          {
            ids: ["English EEAT", "Get EEAT Sources English"],
            caption: "Perplexity supplies verifiable citations.",
          },
          {
            ids: ["English Content Agent", "Anthropic Chat Model2"],
            caption: "Claude writes the article, in both languages.",
          },
        ],
      },
      {
        graph: PUBLISHING,
        eyebrow: "Step four",
        title: "Publish",
        stagger: 8,
        focusStops: [
          {
            ids: ["Get Translations", "Register Translations"],
            caption: "Pushed to Shopify over the GraphQL API.",
          },
          {
            ids: ["Register Translation per Metafield", "Success"],
            caption: "One URL per article — no duplicate-page penalty.",
          },
        ],
      },
    ]}
    metrics={[
      { value: 10, label: "cheaper than the agency", suffix: "x" },
      { value: 30, label: "articles a month", suffix: "+" },
      { value: 2, label: "languages, fully automated" },
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
