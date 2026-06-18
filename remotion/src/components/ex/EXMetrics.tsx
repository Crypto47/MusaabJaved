import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface EXMetricsProps {
  metrics: { value: number; label: string; suffix?: string }[];
}

const COLORS    = ["#22d3ee", "#e879f9", "#a5f3fc"];
const BAR_COLORS = ["rgba(34,211,238,0.25)", "rgba(232,121,249,0.25)", "rgba(165,243,252,0.25)"];

function EXCounter({ value, label, suffix = "", delay, color, barColor }: {
  value: number; label: string; suffix: string; delay: number; color: string; barColor: string;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 70, stiffness: 50 } });
  const displayed = Math.round(interpolate(progress, [0, 1], [0, value]));
  const opacity = interpolate(frame - delay, [0, fps * 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const y       = interpolate(frame - delay, [0, fps * 0.4], [40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const barWidth = interpolate(progress, [0, 1], [0, 100]);

  return (
    <div style={{ textAlign: "center", opacity, transform: `translateY(${y}px)`, minWidth: "280px" }}>
      <div style={{ position: "relative", display: "inline-block" }}>
        <div style={{
          position: "absolute", inset: "-20px",
          background: `radial-gradient(circle, ${barColor} 0%, transparent 70%)`,
          borderRadius: "50%", filter: "blur(20px)",
        }} />
        <div style={{
          fontSize: "100px", fontWeight: 900, lineHeight: 1,
          background: `linear-gradient(135deg, ${color}, #ffffff)`,
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          position: "relative",
        }}>
          {displayed.toLocaleString()}{suffix}
        </div>
      </div>
      <div style={{ fontSize: "24px", color: "rgba(255,255,255,0.5)", marginTop: "16px", marginBottom: "16px", fontWeight: 500 }}>
        {label}
      </div>
      <div style={{ width: "200px", height: "3px", background: "rgba(255,255,255,0.08)", borderRadius: "2px", margin: "0 auto", overflow: "hidden" }}>
        <div style={{
          width: `${barWidth}%`, height: "100%",
          background: `linear-gradient(90deg, ${color}, #ffffff)`,
          borderRadius: "2px", boxShadow: `0 0 8px ${color}`,
        }} />
      </div>
    </div>
  );
}

export function EXMetrics({ metrics }: EXMetricsProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const labelOpacity = interpolate(frame, [0, fps * 0.3], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#06050f",
      backgroundImage: `
        linear-gradient(rgba(34,211,238,0.05) 1px, transparent 1px),
        linear-gradient(90deg, rgba(34,211,238,0.05) 1px, transparent 1px)
      `,
      backgroundSize: "64px 64px",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: "64px", fontFamily: "system-ui, sans-serif",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", width: "700px", height: "700px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{ fontSize: "18px", letterSpacing: "8px", fontWeight: 700, color: "#22d3ee", opacity: labelOpacity }}>
        RESULTS
      </div>
      <div style={{ display: "flex", gap: "100px", flexWrap: "wrap", justifyContent: "center" }}>
        {metrics.map((m, i) => (
          <EXCounter key={m.label} value={m.value} label={m.label} suffix={m.suffix ?? ""}
            delay={i * 24} color={COLORS[i % COLORS.length]} barColor={BAR_COLORS[i % BAR_COLORS.length]} />
        ))}
      </div>
    </div>
  );
}
