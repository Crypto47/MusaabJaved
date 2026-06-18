import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

export function EXOutro() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const nameOpacity = interpolate(frame, [0, fps * 0.4], [0, 1], { extrapolateRight: "clamp" });
  const nameX       = interpolate(frame, [0, fps * 0.4], [-60, 0], { extrapolateRight: "clamp" });
  const ctaOpacity  = interpolate(frame, [fps * 0.3, fps * 0.7], [0, 1], { extrapolateRight: "clamp" });
  const ctaX        = interpolate(frame, [fps * 0.3, fps * 0.7], [60, 0], { extrapolateRight: "clamp" });
  const subOpacity  = interpolate(frame, [fps * 0.6, fps * 1.0], [0, 1], { extrapolateRight: "clamp" });
  const lineScale   = interpolate(frame, [fps * 0.25, fps * 0.55], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #06050f 0%, #0d0a1e 60%, #06050f 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "24px", fontFamily: "system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.11) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, width: "350px", height: "350px",
        background: "radial-gradient(circle at bottom left, rgba(232,121,249,0.09) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "20px", letterSpacing: "8px", fontWeight: 700, color: "#22d3ee",
        opacity: nameOpacity, transform: `translateX(${nameX}px)`,
      }}>
        MUSAAB JAVED
      </div>

      <div style={{
        width: "480px", height: "2px",
        background: "linear-gradient(90deg, transparent, #22d3ee, #e879f9, transparent)",
        transform: `scaleX(${lineScale})`,
        boxShadow: "0 0 10px rgba(34,211,238,0.4)",
      }} />

      <div style={{
        fontSize: "68px", fontWeight: 900,
        background: "linear-gradient(90deg, #22d3ee 0%, #67e8f9 50%, #e879f9 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        letterSpacing: "-2px",
        opacity: ctaOpacity, transform: `translateX(${ctaX}px)`,
      }}>
        Let's work together.
      </div>

      <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.4)", marginTop: "4px", opacity: subOpacity }}>
        musaabjaved.com · musabjaved47@gmail.com
      </div>
    </div>
  );
}
