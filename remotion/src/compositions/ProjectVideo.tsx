import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { BrandedIntro } from "../components/BrandedIntro";
import { PainPoint } from "../components/PainPoint";
import { SolutionScene } from "../components/SolutionScene";
import { MetricCounter } from "../components/MetricCounter";
import { BrandedOutro } from "../components/BrandedOutro";

export interface ProjectConfig {
  title: string;
  tagline: string;
  pain: string;
  solution: string;
  techs: string[];
  metrics: { value: number; label: string; suffix?: string }[];
}

interface ProjectVideoProps {
  config: ProjectConfig;
  audioSrc?: string;
}

export function ProjectVideo({ config, audioSrc = "audio/funky.mp3" }: ProjectVideoProps) {
  return (
    <AbsoluteFill style={{ background: "#0a0a0f" }}>
      <Audio src={staticFile(audioSrc)} volume={0.75} />
      <Series>
        {/* 0–60: Intro (2s) */}
        <Series.Sequence durationInFrames={60}>
          <BrandedIntro title={config.title} tagline={config.tagline} />
        </Series.Sequence>

        {/* 60–150: Pain point (3s) */}
        <Series.Sequence durationInFrames={90}>
          <PainPoint pain={config.pain} />
        </Series.Sequence>

        {/* 150–270: Solution + tech stack (4s) */}
        <Series.Sequence durationInFrames={120}>
          <SolutionScene solution={config.solution} techs={config.techs} />
        </Series.Sequence>

        {/* 270–450: Metrics counting up (6s) */}
        <Series.Sequence durationInFrames={180}>
          <MetricCounter metrics={config.metrics} />
        </Series.Sequence>

        {/* 450–540: Outro (3s) */}
        <Series.Sequence durationInFrames={90}>
          <BrandedOutro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
