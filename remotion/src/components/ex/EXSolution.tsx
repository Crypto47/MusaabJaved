import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FiUsers, FiSearch } from "react-icons/fi";
import { SiHubspot, SiPython, SiN8n } from "@icons-pack/react-simple-icons";

interface EXSolutionProps {
  solution: string;
  techs: string[];
}

function TechIcon({ tech }: { tech: string }) {
  const s = 32; const c = "#fff";
  switch (tech) {
    case "HubSpot": return <SiHubspot size={s} color={c} />;
    case "Clay":    return <FiUsers size={s} color={c} />;
    case "GPT-4o":  return <FiSearch size={s} color={c} />;
    case "Python":  return <SiPython size={s} color={c} />;
    case "n8n":     return <SiN8n size={s} color={c} />;
    case "Apollo":  return <FiSearch size={s} color={c} />;
    default:        return null;
  }
}

const BADGE_STYLES = [
  { border: "#22d3ee", glow: "rgba(34,211,238,0.35)" },
  { border: "#e879f9", glow: "rgba(232,121,249,0.35)" },
  { border: "#67e8f9", glow: "rgba(103,232,249,0.35)" },
  { border: "#f0abfc", glow: "rgba(240,171,252,0.35)" },
  { border: "#a5f3fc", glow: "rgba(165,243,252,0.35)" },
  { border: "#e879f9", glow: "rgba(232,121,249,0.35)" },
];

export function EXSolution({ solution, techs }: EXSolutionProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, fps * 0.2], [0, 1], { extrapolateRight: "clamp" });
  const textOpacity  = interpolate(frame, [fps * 0.15, fps * 0.55], [0, 1], { extrapolateRight: "clamp" });
  const textY        = interpolate(frame, [fps * 0.15, fps * 0.55], [28, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #06050f 0%, #0a0e1e 50%, #06050f 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "48px", fontFamily: "system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ fontSize: "18px", letterSpacing: "8px", fontWeight: 700, color: "#22d3ee", opacity: labelOpacity }}>
        THE SOLUTION
      </div>

      <div style={{
        fontSize: "40px", fontWeight: 700, color: "#ffffff",
        maxWidth: "1200px", textAlign: "center", lineHeight: 1.45,
        opacity: textOpacity, transform: `translateY(${textY}px)`,
      }}>
        {solution}
      </div>

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
              borderRadius: "14px", padding: "16px 30px",
              fontSize: "24px", fontWeight: 700, color: "#fff",
              opacity, transform: `translateY(${y}px)`,
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
