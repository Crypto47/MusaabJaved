import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface ZPPainPointProps {
  pain: string;
}

export function ZPPainPoint({ pain }: ZPPainPointProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = pain.split(" ");
  const staggerPerWord = 4;

  const labelOpacity = interpolate(frame, [0, fps * 0.25], [0, 1], { extrapolateRight: "clamp" });
  const labelX       = interpolate(frame, [0, fps * 0.25], [-30, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, #0f0800 0%, #1a0f00 45%, #0f0800 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "40px", fontFamily: "system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* coral glow */}
      <div style={{
        position: "absolute", width: "800px", height: "800px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(251,146,60,0.14) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "18px", letterSpacing: "8px", fontWeight: 700,
        color: "#fb923c",
        opacity: labelOpacity, transform: `translateX(${labelX}px)`,
      }}>
        THE PROBLEM
      </div>

      <div style={{
        fontSize: "52px", fontWeight: 800,
        maxWidth: "1200px", textAlign: "center",
        lineHeight: 1.35, letterSpacing: "-0.5px",
        display: "flex", flexWrap: "wrap",
        justifyContent: "center", gap: "16px",
      }}>
        {words.map((word, i) => {
          const start = fps * 0.2 + i * staggerPerWord;
          const opacity = interpolate(frame, [start, start + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const y       = interpolate(frame, [start, start + 10], [18, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          return (
            <span key={i} style={{
              opacity, transform: `translateY(${y}px)`, display: "inline-block",
              color: i % 6 === 0 ? "#fb923c" : "#ffffff",
            }}>
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
}
