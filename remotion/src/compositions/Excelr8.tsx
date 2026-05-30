import { ProjectVideo } from "./ProjectVideo";

export function Excelr8() {
  return (
    <ProjectVideo
      config={{
        title: "Excelr8",
        tagline: "GTM automation: campaign setup in 10 minutes, not 4 hours.",
        pain: "GTM teams waste hours every week on manual CRM entry, lead enrichment, and copy-pasting data between tools — every campaign launch is a grind.",
        solution: "Full GTM automation stack covering lead import, enrichment, CRM sync, campaign setup, and KPI reporting — end to end.",
        techs: ["HubSpot", "Clay", "GPT-4o", "Python", "n8n", "Apollo"],
        metrics: [
          { value: 96, label: "% less time per campaign", suffix: "%" },
          { value: 30, label: "hrs/month CRM entry eliminated" },
          { value: 36, label: "hrs/month content automated" },
        ],
      }}
    />
  );
}
