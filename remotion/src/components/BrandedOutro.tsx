import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export function BrandedOutro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const opacity = interpolate(frame, [0, fps * 0.5], [0, 1], { extrapolateRight: "clamp" });
  const scale   = interpolate(frame, [0, fps * 0.5], [0.92, 1], { extrapolateRight: "clamp" });

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
        gap: "20px",
        fontFamily: "system-ui, sans-serif",
        opacity,
        transform: `scale(${scale})`,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* glow */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "22px",
        letterSpacing: "6px",
        fontWeight: 600,
        background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        MUSAAB JAVED
      </div>

      <div style={{
        fontSize: "64px",
        fontWeight: 900,
        background: "linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        letterSpacing: "-1px",
      }}>
        Let's work together.
      </div>

      <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.45)", marginTop: "8px" }}>
        musaabjaved.com · musabjaved47@gmail.com
      </div>
    </div>
  );
}
