import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

interface WorkflowDiagramProps {
  before: string;
  after: string;
}

function Node({ label, gradient, opacity, x }: { label: string; gradient: string; opacity: number; x: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: "50%",
        transform: "translate(-50%, -50%)",
        background: gradient,
        borderRadius: "20px",
        padding: "28px 48px",
        fontSize: "28px",
        fontWeight: 700,
        color: "#fff",
        opacity,
        whiteSpace: "nowrap",
        boxShadow: "0 0 60px rgba(139,92,246,0.4)",
        textAlign: "center",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      {label}
    </div>
  );
}

function Arrow({ opacity, x }: { opacity: number; x: number }) {
  return (
    <div
      style={{
        position: "absolute",
        left: `${x}%`,
        top: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: "64px",
        background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
        opacity,
        lineHeight: 1,
      }}
    >
      →
    </div>
  );
}

export function WorkflowDiagram({ before, after }: WorkflowDiagramProps) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const beforeOpacity = interpolate(frame, [0,          fps * 0.3], [0, 1], { extrapolateRight: "clamp" });
  const arrow1Opacity = interpolate(frame, [fps * 0.3,  fps * 0.6], [0, 1], { extrapolateRight: "clamp" });
  const aiOpacity     = interpolate(frame, [fps * 0.5,  fps * 0.8], [0, 1], { extrapolateRight: "clamp" });
  const arrow2Opacity = interpolate(frame, [fps * 0.7,  fps * 1.0], [0, 1], { extrapolateRight: "clamp" });
  const afterOpacity  = interpolate(frame, [fps * 0.9,  fps * 1.2], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "linear-gradient(160deg, #0a0a1a 0%, #0f1a2e 50%, #0a0a1a 100%)",
        position: "relative",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{
        position: "absolute",
        top: "80px",
        left: 0,
        right: 0,
        textAlign: "center",
        fontSize: "22px",
        letterSpacing: "6px",
        fontWeight: 600,
        background: "linear-gradient(90deg, #a78bfa, #38bdf8)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}>
        WORKFLOW
      </div>

      {/* Before (15%) → Arrow (32%) → AI (50%) → Arrow (68%) → After (85%) */}
      <Node label={before}  gradient="linear-gradient(135deg, #4c1d95, #1e3a5f)" opacity={beforeOpacity} x={15} />
      <Arrow opacity={arrow1Opacity} x={32} />
      <Node label="🤖 AI"  gradient="linear-gradient(135deg, #7c3aed, #2563eb)"  opacity={aiOpacity}    x={50} />
      <Arrow opacity={arrow2Opacity} x={68} />
      <Node label={after}   gradient="linear-gradient(135deg, #065f46, #0e7490)" opacity={afterOpacity}  x={85} />
    </div>
  );
}
