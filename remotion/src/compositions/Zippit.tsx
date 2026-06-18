import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { ZPIntro }     from "../components/zp/ZPIntro";
import { ZPPainPoint } from "../components/zp/ZPPainPoint";
import { ZPSolution }  from "../components/zp/ZPSolution";
import { ZPMetrics }   from "../components/zp/ZPMetrics";
import { ZPOutro }     from "../components/zp/ZPOutro";

const config = {
  tagline:  "Replaced a $1K/month agency with $50/month AI.",
  pain:     "The content agency was slow, expensive, and one article at a time. Growth was stuck.",
  solution: "Automated topic research, AI writing, and Shopify publishing. Two articles a day, on autopilot.",
  techs:    ["Claude AI", "n8n", "Pinecone", "Airtable", "Shopify"],
  metrics:  [
    { value: 10, label: "x cost reduction" },
    { value: 30, label: "articles per month" },
    { value: 20, label: "manual hours reclaimed" },
  ],
};

export function Zippit() {
  return (
    <AbsoluteFill style={{ background: "#030d06" }}>
      <Audio src={staticFile("audio/funky.mp3")} volume={0.75} />
      <Series>
        <Series.Sequence durationInFrames={90}>
          <ZPIntro title="Zippit" tagline={config.tagline} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <ZPPainPoint pain={config.pain} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <ZPSolution solution={config.solution} techs={config.techs} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <ZPMetrics metrics={config.metrics} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <ZPOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
