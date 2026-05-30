import satori from "satori";
import sharp from "sharp";
import React from "react";
import fs from "node:fs";
import path from "node:path";

interface CoverConfig {
  title: string;
  subtitle: string;
  techs: string[];
  accentColor: string;
  outputSlug: string;
  logoStyle: "dark" | "light";
}

const CONFIGS: Record<string, CoverConfig> = {
  excelr8: {
    title: "Excelr8",
    subtitle: "GTM Automation",
    techs: ["GPT-4o", "Clay", "HubSpot", "n8n"],
    accentColor: "#a78bfa",
    outputSlug: "excelr8",
    logoStyle: "dark",
  },
  zippit: {
    title: "Zippit",
    subtitle: "AI Content Engine",
    techs: ["LangGraph", "Pinecone", "GPT-4o", "Shopify"],
    accentColor: "#38bdf8",
    outputSlug: "zippit",
    logoStyle: "light",
  },
};

const STARS: { x: number; y: number; r: number; o: number }[] = [
  { x: 82,  y: 44,  r: 1.5, o: 0.7 }, { x: 210, y: 88,  r: 1,   o: 0.5 },
  { x: 340, y: 22,  r: 2,   o: 0.6 }, { x: 480, y: 60,  r: 1,   o: 0.4 },
  { x: 620, y: 35,  r: 1.5, o: 0.7 }, { x: 750, y: 70,  r: 1,   o: 0.5 },
  { x: 900, y: 28,  r: 2,   o: 0.6 }, { x: 1050,y: 55,  r: 1,   o: 0.4 },
  { x: 1140,y: 90,  r: 1.5, o: 0.7 }, { x: 55,  y: 200, r: 1,   o: 0.5 },
  { x: 160, y: 310, r: 2,   o: 0.6 }, { x: 1100,y: 180, r: 1,   o: 0.4 },
  { x: 1170,y: 300, r: 1.5, o: 0.7 }, { x: 30,  y: 420, r: 1,   o: 0.5 },
  { x: 120, y: 520, r: 2,   o: 0.6 }, { x: 1080,y: 450, r: 1,   o: 0.4 },
  { x: 1155,y: 560, r: 1.5, o: 0.7 }, { x: 260, y: 580, r: 1,   o: 0.5 },
  { x: 420, y: 600, r: 2,   o: 0.6 }, { x: 600, y: 590, r: 1,   o: 0.4 },
  { x: 780, y: 610, r: 1.5, o: 0.7 }, { x: 960, y: 580, r: 1,   o: 0.5 },
  { x: 700, y: 130, r: 2,   o: 0.4 }, { x: 830, y: 480, r: 1.5, o: 0.6 },
  { x: 500, y: 200, r: 1,   o: 0.3 },
];

function CoverImage({ c, logoSrc, logoW, logoH }: { c: CoverConfig; logoSrc: string | null; logoW: number; logoH: number }) {
  const techString = c.techs.join("  ·  ");

  return (
    <div
      style={{
        width: 1200,
        height: 630,
        background: "#04040c",
        position: "relative",
        display: "flex",
        fontFamily: "Inter",
        overflow: "hidden",
      }}
    >
      {/* nebula blobs */}
      <div style={{ position: "absolute", left: -80, top: -80, width: 680, height: 680, borderRadius: "50%", background: "radial-gradient(circle, rgba(120,40,220,0.28) 0%, transparent 70%)", display: "flex" }} />
      <div style={{ position: "absolute", right: -100, top: -60, width: 620, height: 620, borderRadius: "50%", background: "radial-gradient(circle, rgba(20,60,200,0.22) 0%, transparent 70%)", display: "flex" }} />
      <div style={{ position: "absolute", left: 200, bottom: -150, width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,160,140,0.16) 0%, transparent 70%)", display: "flex" }} />
      <div style={{ position: "absolute", left: 350, top: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(160,60,240,0.18) 0%, transparent 70%)", display: "flex" }} />
      <div style={{ position: "absolute", left: -60, bottom: -80, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(60,20,180,0.15) 0%, transparent 70%)", display: "flex" }} />

      {/* stars */}
      {STARS.map((s) => (
        <div
          key={`${s.x}-${s.y}`}
          style={{
            position: "absolute",
            left: s.x,
            top: s.y,
            width: s.r * 2,
            height: s.r * 2,
            borderRadius: "50%",
            background: `rgba(255,255,255,${s.o})`,
            display: "flex",
          }}
        />
      ))}

      {/* top-left: title + subtitle */}
      <div
        style={{
          position: "absolute",
          top: 52,
          left: 60,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ fontSize: 52, fontWeight: 900, color: "#ffffff", letterSpacing: -1, display: "flex" }}>
          {c.title}
        </div>
        <div style={{ fontSize: 22, fontWeight: 500, color: "rgba(255,255,255,0.45)", letterSpacing: 1, display: "flex" }}>
          {c.subtitle}
        </div>
      </div>

      {/* top-right: tech string */}
      <div
        style={{
          position: "absolute",
          top: 64,
          right: 60,
          fontSize: 18,
          fontWeight: 500,
          color: "rgba(255,255,255,0.38)",
          letterSpacing: 0.5,
          display: "flex",
        }}
      >
        {techString}
      </div>

      {/* centered logo */}
      {logoSrc && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {c.logoStyle === "light" ? (
            <div
              style={{
                background: "rgba(12,12,28,0.88)",
                borderRadius: 28,
                padding: "28px 40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <img src={logoSrc} alt={c.title} style={{ width: logoW, height: logoH, display: "flex" }} />
            </div>
          ) : (
            <img
              src={logoSrc}
              alt={c.title}
              style={{
                width: logoW,
                height: logoH,
                borderRadius: 20,
                display: "flex",
                boxShadow: `0 0 80px rgba(${hexToRgbStr(c.accentColor)},0.25)`,
              }}
            />
          )}
        </div>
      )}

      {/* watermark */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          right: 44,
          fontSize: 15,
          fontWeight: 500,
          color: "rgba(255,255,255,0.12)",
          display: "flex",
        }}
      >
        musaabjaved.com
      </div>
    </div>
  );
}

function hexToRgbStr(hex: string): string {
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return "255,255,255";
  const n = Number.parseInt(m[1], 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

async function generateCover(slug: string) {
  const config = CONFIGS[slug];
  if (!config) {
    console.error(`Unknown project: "${slug}". Available: ${Object.keys(CONFIGS).join(", ")}`);
    process.exit(1);
  }

  const logoPath = path.join(process.cwd(), "public", "images", "clients", `${config.outputSlug}.png`);
  let logoBase64: string | null = null;
  let logoW = 320;
  let logoH = 200;
  if (fs.existsSync(logoPath)) {
    const logoBuffer = fs.readFileSync(logoPath);
    logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
    const meta = await sharp(logoBuffer).metadata();
    if (meta.width && meta.height) {
      logoW = 320;
      logoH = Math.round(320 * meta.height / meta.width);
    }
  }

  const fontsDir = path.join(process.cwd(), "node_modules/@fontsource/inter/files");
  const fontBold = fs.readFileSync(path.join(fontsDir, "inter-latin-900-normal.woff"));
  const fontMed  = fs.readFileSync(path.join(fontsDir, "inter-latin-500-normal.woff"));

  const svg = await satori(
    React.createElement(CoverImage, { c: config, logoSrc: logoBase64, logoW, logoH }),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontBold, weight: 900, style: "normal" },
        { name: "Inter", data: fontMed,  weight: 500, style: "normal" },
      ],
    }
  );

  const outDir = path.join(process.cwd(), "public", "projects", config.outputSlug);
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${config.outputSlug}.png`);
  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  fs.writeFileSync(outPath, png);
  console.log(`✓  public/projects/${config.outputSlug}/${config.outputSlug}.png  (${Math.round(png.length / 1024)}kb)`);
}

const slug = process.argv[2];
if (!slug) {
  console.error("Usage: npx tsx scripts/generate-cover.tsx <slug>");
  process.exit(1);
}

generateCover(slug).catch((e) => { console.error(e); process.exit(1); });
