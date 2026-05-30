import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface BrandedIntroProps {
  title: string;
  tagline: string;
}

export function BrandedIntro({ title, tagline }: BrandedIntroProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOpacity  = interpolate(frame, [0, fps * 0.5], [0, 1], { extrapolateRight: "clamp" });
  const titleY        = interpolate(frame, [0, fps * 0.5], [40, 0], { extrapolateRight: "clamp" });
  const taglineOpacity = interpolate(frame, [fps * 0.4, fps * 0.9], [0, 1], { extrapolateRight: "clamp" });
  const taglineY      = interpolate(frame, [fps * 0.4, fps * 0.9], [24, 0], { extrapolateRight: "clamp" });
  const glowScale     = interpolate(frame, [0, fps * 0.8], [0.6, 1.2], { extrapolateRight: "clamp" });

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
        gap: "28px",
        fontFamily: "system-ui, sans-serif",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* background glow blob */}
      <div style={{
        position: "absolute",
        width: "800px",
        height: "800px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(139,92,246,0.18) 0%, transparent 70%)",
        transform: `scale(${glowScale})`,
        pointerEvents: "none",
      }} />

      {/* title */}
      <div
        style={{
          fontSize: "100px",
          fontWeight: 900,
          letterSpacing: "-3px",
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          background: "linear-gradient(90deg, #c084fc 0%, #818cf8 50%, #38bdf8 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </div>

      {/* tagline */}
      <div
        style={{
          fontSize: "34px",
          fontWeight: 400,
          color: "rgba(255,255,255,0.7)",
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
          maxWidth: "1000px",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {tagline}
      </div>
    </div>
  );
}
