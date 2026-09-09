/**
 * Dossier Bot — on-demand lead briefings, from a Slack mention.
 *
 * Config only; structure and timing live in CaseStudyFilm.
 *
 * The other three films are pipelines: something enters on the left and leaves
 * on the right. This one is a conversation, so the arc follows the request
 * rather than the data — interface, then the tools the agent can reach for,
 * then what happens when it has to build a briefing from scratch, then the
 * scheduled run that means it usually does not have to.
 *
 * The strongest image in the set sits in act one: the Slack agent has six
 * sub-nodes hanging beneath it — a chat model, a memory buffer and four tools
 * — each an 80x80 circle on its own dashed connector, exactly as n8n draws
 * configuration nodes.
 *
 * NOTE ON METRICS: the two figures in the proof beat are structural facts read
 * off the workflows, not business outcomes. They are honest but they are not
 * impact. Replace or extend them once the real numbers are known — how many
 * briefings have been generated, and how long one took by hand before this.
 */
import { CaseStudyFilm } from "../film/CaseStudyFilm";
import { DOSSIER_MUSIC } from "../film/music";
import generationJson from "../flow/data/dossier-generation.json";
import slackBotJson from "../flow/data/dossier-slack-bot.json";
import toolCallJson from "../flow/data/dossier-tool-call.json";
import { parseFlow } from "../flow/parse";
import { DB_THEME } from "../flow/theme";
import type { RawFlow } from "../flow/types";

const SLACK_BOT = parseFlow(slackBotJson as RawFlow);
const TOOL_CALL = parseFlow(toolCallJson as RawFlow);
const GENERATION = parseFlow(generationJson as RawFlow);

export const DossierBotFilm: React.FC = () => (
  <CaseStudyFilm
    music={DOSSIER_MUSIC}
    theme={DB_THEME}
    project="Dossier Bot"
    hook={{
      graph: SLACK_BOT,
      title: "Mention a name in Slack. Get a briefing.",
      stagger: 8,
      revealFrom: -120,
    }}
    problem={{
      headline: "Every call starts with twenty minutes of tab-opening.",
      subline: "Profile, recent posts, what they care about — assembled by hand, every time.",
    }}
    acts={[
      {
        graph: SLACK_BOT,
        eyebrow: "Step one",
        title: "Ask",
        stagger: 10,
        focusStops: [
          {
            ids: ["Slack Trigger", "Session Parser"],
            caption: "An @mention is the whole interface.",
          },
          {
            ids: ["AI Agent", "OpenAI Chat Model", "Simple Memory"],
            caption: "An agent with memory picks up the thread.",
          },
        ],
      },
      {
        graph: SLACK_BOT,
        eyebrow: "Step two",
        title: "Reach",
        stagger: 10,
        focusStops: [
          {
            ids: ["Get Dossier from bucket"],
            caption: "First it checks whether a briefing already exists.",
          },
          {
            ids: ["Search URL Lead Dossier", "Search Full Name Lead Dossier"],
            caption: "It can find a lead by profile URL or by name.",
          },
          {
            ids: ["Manual Dossier Automation", "Reply to Slack"],
            caption: "No briefing yet? It builds one, then answers.",
          },
        ],
      },
      {
        graph: TOOL_CALL,
        eyebrow: "Step three",
        title: "Build",
        stagger: 8,
        focusStops: [
          {
            ids: ["Get Lead Posts", "Updating Is_Dossier Flag"],
            caption: "It reads what they have been posting about.",
          },
          {
            ids: ["AI Agent", "OpenAI Chat Model"],
            caption: "An agent writes the briefing from their own words.",
          },
        ],
      },
      {
        graph: GENERATION,
        eyebrow: "Step four",
        title: "Ahead",
        stagger: 8,
        focusStops: [
          {
            ids: ["Schedule Trigger", "Extract First N Items"],
            caption: "Every night, the top five leads are briefed in advance.",
          },
          {
            ids: ["Create Pdf", "Updating Dossier Link"],
            caption: "Rendered to PDF and linked, ready before anyone asks.",
          },
        ],
      },
    ]}
    metrics={[
      { value: 5, label: "leads briefed nightly" },
      { value: 4, label: "tools the agent can call" },
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
