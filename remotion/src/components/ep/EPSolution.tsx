import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FiCpu, FiTrendingUp, FiSend, FiFileText } from "react-icons/fi";
import { SiN8n, SiGooglesheets } from "@icons-pack/react-simple-icons";

interface EPSolutionProps {
  solution: string;
  techs: string[];
}

function TechIcon({ tech }: { tech: string }) {
  const s = 32;
  const c = "#fff";
  switch (tech) {
    case "GPT-4o":        return <FiCpu size={s} color={c} />;
    case "n8n":           return <SiN8n size={s} color={c} />;
    case "Yahoo Finance": return <FiTrendingUp size={s} color={c} />;
    case "Google Sheets": return <SiGooglesheets size={s} color={c} />;
    case "SendGrid":      return <FiSend size={s} color={c} />;
    case "html2pdf":      return <FiFileText size={s} color={c} />;
    default:              return null;
  }
}

const BADGE_STYLES = [
  { border: "#14b8a6", glow: "rgba(20,184,166,0.35)" },
  { border: "#fbbf24", glow: "rgba(251,191,36,0.35)" },
  { border: "#2dd4bf", glow: "rgba(45,212,191,0.35)" },
  { border: "#f59e0b", glow: "rgba(245,158,11,0.35)" },
  { border: "#5eead4", glow: "rgba(94,234,212,0.35)" },
  { border: "#fcd34d", glow: "rgba(252,211,77,0.35)" },
];

export function EPSolution({ solution, techs }: EPSolutionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, fps * 0.2], [0, 1], { extrapolateRight: "clamp" });
  const textOpacity  = interpolate(frame, [fps * 0.15, fps * 0.55], [0, 1], { extrapolateRight: "clamp" });
  const textY        = interpolate(frame, [fps * 0.15, fps * 0.55], [28, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #020c18 0%, #041e30 50%, #020c18 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "48px", fontFamily: "system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* teal glow */}
      <div style={{
        position: "absolute", width: "700px", height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(20,184,166,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "18px", letterSpacing: "8px", fontWeight: 700,
        color: "#14b8a6",
        opacity: labelOpacity,
      }}>
        THE SOLUTION
      </div>

      <div style={{
        fontSize: "40px", fontWeight: 700, color: "#ffffff",
        maxWidth: "1200px", textAlign: "center", lineHeight: 1.45,
        opacity: textOpacity, transform: `translateY(${textY}px)`,
      }}>
        {solution}
      </div>

      {/* drop-bounce badges */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", maxWidth: "1400px" }}>
        {techs.map((tech, i) => {
          const style = BADGE_STYLES[i % BADGE_STYLES.length];
          const start = fps * 0.5 + i * 10;
          const dropSpring = spring({ frame: frame - start, fps, config: { stiffness: 220, damping: 18 } });
          const y = interpolate(dropSpring, [0, 1], [-70, 0]);
          const opacity = interpolate(frame - start, [0, 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div key={tech} style={{
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${style.border}`,
              borderRadius: "14px",
              padding: "16px 30px",
              fontSize: "24px", fontWeight: 700, color: "#fff",
              opacity,
              transform: `translateY(${y}px)`,
              boxShadow: `0 0 20px ${style.glow}, inset 0 0 20px rgba(255,255,255,0.02)`,
              display: "flex", alignItems: "center", gap: "12px",
            }}>
              <TechIcon tech={tech} />
              {tech}
            </div>
          );
        })}
      </div>
    </div>
  );
}
