import { ProjectVideo } from "./ProjectVideo";

export function Zippit() {
  return (
    <ProjectVideo
      config={{
        title: "Zippit",
        tagline: "Replaced a $1K/month agency with a $50/month AI pipeline.",
        pain: "Zippit was paying $1,000/month for a content agency that was slow, couldn't scale, and produced articles one at a time.",
        solution: "Fully automated content factory: topic research, LLM drafting, EEAT citations, and bilingual Shopify publishing — 2+ articles per day.",
        techs: [],
        metrics: [
          { value: 10, label: "x cost reduction" },
          { value: 30, label: "articles/month automated" },
          { value: 20, label: "manual hours/week reclaimed" },
        ],
      }}
    />
  );
}
