import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { EXIntro }     from "../components/ex/EXIntro";
import { EXPainPoint } from "../components/ex/EXPainPoint";
import { EXSolution }  from "../components/ex/EXSolution";
import { EXMetrics }   from "../components/ex/EXMetrics";
import { EXOutro }     from "../components/ex/EXOutro";

const config = {
  tagline:  "GTM automation: campaign setup in 10 minutes, not 4 hours.",
  pain:     "GTM teams waste hours on manual CRM entry and copy-pasting between tools. Every campaign launch is a grind.",
  solution: "Full GTM automation covering lead import, enrichment, CRM sync, and campaign setup. End to end.",
  techs:    ["HubSpot", "Clay", "GPT-4o", "Python", "n8n", "Apollo"],
  metrics:  [
    { value: 96, label: "% less time per campaign", suffix: "%" },
    { value: 30, label: "hrs/month CRM entry eliminated" },
    { value: 36, label: "hrs/month content automated" },
  ],
};

export function Excelr8() {
  return (
    <AbsoluteFill style={{ background: "#06050f" }}>
      <Audio src={staticFile("audio/funky.mp3")} volume={0.75} />
      <Series>
        <Series.Sequence durationInFrames={90}>
          <EXIntro title="Excelr8" tagline={config.tagline} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <EXPainPoint pain={config.pain} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <EXSolution solution={config.solution} techs={config.techs} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <EXMetrics metrics={config.metrics} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <EXOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
