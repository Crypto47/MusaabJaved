import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { EPIntro }     from "../components/ep/EPIntro";
import { EPPainPoint } from "../components/ep/EPPainPoint";
import { EPSolution }  from "../components/ep/EPSolution";
import { EPMetrics }   from "../components/ep/EPMetrics";
import { EPOutro }     from "../components/ep/EPOutro";

const config = {
  tagline:  "Portfolio screenshot in. PDF investment report out.",
  pain:     "Your broker shows prices. Not answers. Reviewing your full portfolio means hours of research across a dozen tabs.",
  solution: "Upload a screenshot. Get a PDF report with live prices, analyst ratings, and risk scores. Straight to your inbox in minutes.",
  techs:    ["GPT-4o", "n8n", "Yahoo Finance", "Google Sheets", "SendGrid", "html2pdf"],
  metrics:  [
    { value: 10,  label: "min from screenshot to PDF" },
    { value: 6,   label: "enrichment signals per holding" },
    { value: 100, label: "of data collection automated", suffix: "%" },
  ],
};

export function EquityPulse() {
  return (
    <AbsoluteFill style={{ background: "#020c18" }}>
      <Audio src={staticFile("audio/funky.mp3")} volume={0.75} />
      <Series>
        <Series.Sequence durationInFrames={90}>
          <EPIntro title="Equity Pulse" tagline={config.tagline} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <EPPainPoint pain={config.pain} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <EPSolution solution={config.solution} techs={config.techs} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={240}>
          <EPMetrics metrics={config.metrics} />
        </Series.Sequence>
        <Series.Sequence durationInFrames={120}>
          <EPOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
