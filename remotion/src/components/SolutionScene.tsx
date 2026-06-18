import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FiCpu, FiTrendingUp, FiSend, FiFileText } from "react-icons/fi";
import { SiN8n, SiGooglesheets } from "@icons-pack/react-simple-icons";

function TechIcon({ tech }: { tech: string }) {
  const s = 30;
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

interface SolutionSceneProps {
  solution: string;
  techs: string[];
}

const BADGE_COLORS = [
  { bg: "linear-gradient(135deg, #7c3aed, #4f46e5)", border: "rgba(139,92,246,0.4)" },
  { bg: "linear-gradient(135deg, #2563eb, #0891b2)", border: "rgba(56,189,248,0.4)" },
  { bg: "linear-gradient(135deg, #059669, #0891b2)", border: "rgba(16,185,129,0.4)" },
  { bg: "linear-gradient(135deg, #d97706, #dc2626)", border: "rgba(249,115,22,0.4)" },
  { bg: "linear-gradient(135deg, #db2777, #9333ea)", border: "rgba(236,72,153,0.4)" },
  { bg: "linear-gradient(135deg, #0891b2, #2563eb)", border: "rgba(6,182,212,0.4)" },
  { bg: "linear-gradient(135deg, #16a34a, #0d9488)", border: "rgba(34,197,94,0.4)" },
  { bg: "linear-gradient(135deg, #9333ea, #db2777)", border: "rgba(168,85,247,0.4)" },
];

export function SolutionScene({ solution, techs }: SolutionSceneProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, fps * 0.2], [0, 1], { extrapolateRight: "clamp" });
  const descOpacity  = interpolate(frame, [fps * 0.2, fps * 0.55], [0, 1], { extrapolateRight: "clamp" });
  const descY        = interpolate(frame, [fps * 0.2, fps * 0.55], [24, 0], { extrapolateRight: "clamp" });

  const badgeStagger = 14;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0d0221 0%, #1a0540 40%, #0a1628 70%, #0d0221 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "44px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* purple glow blob */}
      <div style={{
        position: "absolute",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "20px",
        letterSpacing: "6px",
        fontWeight: 600,
        background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        opacity: labelOpacity,
      }}>
        THE SOLUTION
      </div>

      <div style={{
        fontSize: "40px",
        fontWeight: 700,
        color: "#ffffff",
        maxWidth: "1200px",
        textAlign: "center",
        lineHeight: 1.45,
        opacity: descOpacity,
        transform: `translateY(${descY}px)`,
      }}>
        {solution}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", maxWidth: "1400px" }}>
        {techs.map((tech, i) => {
          const color = BADGE_COLORS[i % BADGE_COLORS.length];
          const start = fps * 0.55 + i * badgeStagger;
          const opacity = interpolate(frame, [start, start + badgeStagger], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = interpolate(frame, [start, start + badgeStagger], [-28, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <div
              key={tech}
              style={{
                background: color.bg,
                borderRadius: "12px",
                padding: "14px 28px",
                fontSize: "24px",
                fontWeight: 700,
                color: "#fff",
                opacity,
                transform: `translateX(${x}px)`,
                border: `1px solid ${color.border}`,
                boxShadow: `0 4px 20px ${color.border}`,
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <TechIcon tech={tech} />
              {tech}
            </div>
          );
        })}
      </div>
    </div>
  );
}
