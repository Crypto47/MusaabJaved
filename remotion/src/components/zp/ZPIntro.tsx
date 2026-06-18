import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface ZPIntroProps {
  title: string;
  tagline: string;
}

export function ZPIntro({ title, tagline }: ZPIntroProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity = interpolate(frame, [0, fps * 0.35], [0, 1], { extrapolateRight: "clamp" });
  const titleX       = interpolate(frame, [0, fps * 0.4], [-80, 0], { extrapolateRight: "clamp" });
  const lineWidth    = interpolate(frame, [fps * 0.4, fps * 0.75], [0, 480], { extrapolateRight: "clamp" });
  const lineOpacity  = interpolate(frame, [fps * 0.38, fps * 0.45], [0, 1], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [fps * 0.7, fps * 1.1], [0, 1], { extrapolateRight: "clamp" });
  const taglineY       = interpolate(frame, [fps * 0.7, fps * 1.1], [20, 0], { extrapolateRight: "clamp" });
  const glowPulse = interpolate(frame, [0, fps], [0.7, 1.2], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #030d06 0%, #061a0c 50%, #030d06 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "0px", fontFamily: "system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      {/* lime glow */}
      <div style={{
        position: "absolute", width: "900px", height: "900px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(74,222,128,0.11) 0%, transparent 65%)",
        transform: `scale(${glowPulse})`, pointerEvents: "none",
      }} />
      {/* coral corner */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: "400px", height: "400px",
        background: "radial-gradient(circle at top right, rgba(251,146,60,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        fontSize: "108px", fontWeight: 900, letterSpacing: "-4px",
        opacity: titleOpacity, transform: `translateX(${titleX}px)`,
        background: "linear-gradient(90deg, #4ade80 0%, #86efac 50%, #4ade80 100%)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
      }}>
        {title}
      </div>

      <div style={{
        width: `${lineWidth}px`, height: "3px",
        background: "linear-gradient(90deg, #4ade80, #86efac, #fb923c)",
        borderRadius: "2px", opacity: lineOpacity,
        marginTop: "8px", marginBottom: "32px",
        boxShadow: "0 0 12px rgba(74,222,128,0.6)",
      }} />

      <div style={{
        fontSize: "36px", fontWeight: 400, color: "rgba(255,255,255,0.65)",
        opacity: taglineOpacity, transform: `translateY(${taglineY}px)`,
        maxWidth: "1000px", textAlign: "center", lineHeight: 1.45,
      }}>
        {tagline}
      </div>
    </div>
  );
}
