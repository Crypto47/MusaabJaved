import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface MetricCounterProps {
  metrics: { value: number; label: string; suffix?: string }[];
}

const NUMBER_COLORS = ["#c084fc", "#38bdf8", "#34d399"];

function Counter({ value, label, suffix = "", delay, color }: { value: number; label: string; suffix: string; delay: number; color: string }) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 80, stiffness: 60 } });
  const displayed = Math.round(interpolate(progress, [0, 1], [0, value]));
  const opacity = interpolate(frame - delay, [0, fps * 0.3], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const scale = interpolate(frame - delay, [0, fps * 0.4], [0.7, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div style={{ textAlign: "center", opacity, transform: `scale(${scale})` }}>
      <div style={{
        fontSize: "96px",
        fontWeight: 900,
        lineHeight: 1,
        background: `linear-gradient(135deg, ${color}, #ffffff)`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        {displayed.toLocaleString()}{suffix}
      </div>
      <div style={{ fontSize: "26px", color: "rgba(255,255,255,0.55)", marginTop: "14px", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

export function MetricCounter({ metrics }: MetricCounterProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #050510 0%, #0f0a20 50%, #050510 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "64px",
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
        RESULTS
      </div>
      <div style={{ display: "flex", gap: "120px", flexWrap: "wrap", justifyContent: "center" }}>
        {metrics.map((m, i) => (
          <Counter
            key={m.label}
            value={m.value}
            label={m.label}
            suffix={m.suffix ?? ""}
            delay={i * 20}
            color={NUMBER_COLORS[i % NUMBER_COLORS.length]}
          />
        ))}
      </div>
    </div>
  );
}
