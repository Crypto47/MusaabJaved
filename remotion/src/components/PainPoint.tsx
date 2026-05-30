import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface PainPointProps {
  pain: string;
}

export function PainPoint({ pain }: PainPointProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // hard slam: high stiffness spring, punches in within ~8 frames
  const slam = spring({ frame, fps, config: { stiffness: 400, damping: 28 } });
  const scale = interpolate(slam, [0, 1], [1.6, 1]);
  const opacity = interpolate(frame, [0, 5], [0, 1], { extrapolateRight: "clamp" });

  const labelOpacity = interpolate(frame, [12, 22], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #1a0505 0%, #2d0808 40%, #1a0505 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "36px",
        fontFamily: "system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* red glow blob */}
      <div style={{
        position: "absolute",
        width: "700px",
        height: "700px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "20px",
        letterSpacing: "6px",
        fontWeight: 600,
        color: "#f87171",
        opacity: labelOpacity,
      }}>
        THE PROBLEM
      </div>

      <div
        style={{
          fontSize: "54px",
          fontWeight: 900,
          color: "#ffffff",
          maxWidth: "1200px",
          textAlign: "center",
          lineHeight: 1.3,
          letterSpacing: "-1px",
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {pain}
      </div>
    </div>
  );
}
