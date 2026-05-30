import { interpolate, useCurrentFrame } from "remotion";

interface TechLogoRevealProps {
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

export function TechLogoReveal({ techs }: TechLogoRevealProps) {
  const frame = useCurrentFrame();
  const stagger = 18;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #050510 0%, #0a0a20 50%, #050510 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "48px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{
        fontSize: "22px",
        letterSpacing: "6px",
        fontWeight: 600,
        background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        TECH STACK
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "center", maxWidth: "1400px" }}>
        {techs.map((tech, i) => {
          const color = BADGE_COLORS[i % BADGE_COLORS.length];
          const start = i * stagger;
          const opacity = interpolate(frame, [start, start + stagger], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const x = interpolate(frame, [start, start + stagger], [-30, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          const scale = interpolate(frame, [start, start + stagger], [0.8, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
          return (
            <div
              key={tech}
              style={{
                background: color.bg,
                borderRadius: "14px",
                padding: "18px 36px",
                fontSize: "28px",
                fontWeight: 700,
                color: "#fff",
                opacity,
                transform: `translateX(${x}px) scale(${scale})`,
                border: `1px solid ${color.border}`,
                boxShadow: `0 4px 24px ${color.border}`,
              }}
            >
              {tech}
            </div>
          );
        })}
      </div>
    </div>
  );
}
