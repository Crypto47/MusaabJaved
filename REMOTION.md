# REMOTION — Agent Instructions

> **How to trigger:** Tell Claude: "Read REMOTION.md and make a video for [project]."
> Claude will read this file, pull the project MDX if it exists, combine it with any extra info you provide, and do all the work below automatically.

---

## What you need to provide

| Info | Where it comes from | Example |
|------|-------------------|---------|
| Project name | MDX title, or you say it | "Zippit" |
| Tagline | MDX summary, or you describe it | "Replaced a $1K/month agency with $50/month AI" |
| Pain point | MDX "The Problem" section, or you describe it | "Teams waste 20+ hrs/week on manual data entry" |
| Solution | MDX "What I Built" section, or you describe it | "Automated X, Y, Z. Two articles a day." |
| Tech stack | MDX body, or you list it | "Claude AI, n8n, Pinecone, Shopify" |
| 2–3 outcome metrics | MDX "Outcomes" section, or you state them | "10x cost reduction, 30 hrs/month saved" |

If the project has an MDX file at `src/app/work/projects/{slug}/{slug}.mdx`, Claude should read it first and extract what it can.

---

## Copy rules

- **Tagline** — lead with the outcome. Short. "Replaced a $1K/month agency with $50/month AI." beats "An automated content pipeline"
- **Pain** — max 2 short sentences. No jargon. No em dashes. Make it feel real.
- **Solution** — max 2 short sentences. Outcome-led, not tech-led. No em dashes.
- **Techs** — 4–6 names, shortest recognizable form. Each gets an icon + label badge.
- **Metrics** — 2–3 max. `value` must be a plain integer (counter animates). Use `suffix: "%"` only for percentages.

---

## Video structure

31 seconds (930 frames at 30fps), 5 scenes:

| Frames | Duration | Scene | What it shows |
|--------|----------|-------|---------------|
| 0–90 | 3s | **Intro** | Title slides in from left. Colored underline draws across. Tagline fades up. |
| 90–330 | 8s | **Pain Point** | Words appear one by one with slide-up stagger. Dark warm bg. Accent color highlights every 6th word. |
| 330–570 | 8s | **Solution** | Solution text fades up. Tech badges drop in from above with bounce spring. Outlined badge style with neon glow. |
| 570–810 | 8s | **Results** | Grid-line background. 2–3 metrics count up. Neon glow behind each number. Bar fills as counter runs. |
| 810–930 | 4s | **Outro** | Name slides from left, CTA from right. Divider line grows center-out. |

Audio: `public/audio/funky.mp3` at 75% volume.

---

## Color themes

Each project gets its own color palette. Create a folder `remotion/src/components/{prefix}/` with 5 scene files.

| Project | Prefix | Primary | Secondary | Background |
|---------|--------|---------|-----------|------------|
| Equity Pulse | `ep` | `#fbbf24` amber | `#14b8a6` teal | `#020c18` deep navy |
| Zippit | `zp` | `#4ade80` lime | `#fb923c` coral | `#030d06` dark forest |
| Excelr8 | `ex` | `#22d3ee` cyan | `#e879f9` magenta | `#06050f` dark slate |
| **New project** | pick 2-letter prefix | pick primary | pick secondary | keep very dark |

**Color picking guide for new projects:**
- Background: always very dark (`#02–06` range), never generic black `#000`
- Primary: the "wow" color — used on title, labels, underline, metric numbers
- Secondary: the "accent" — used on corners, every-nth-word highlights, divider gradient end
- Pain scene bg: dark tint of secondary (e.g. coral bg = `#0f0800`)
- Solution scene bg: dark tint of primary (e.g. lime bg = `#030d06`)
- Never reuse EP's amber/teal or ZP's lime/coral for new projects

---

## Icon map (available)

| Tech | Icon | Import |
|------|------|--------|
| GPT-4o | `FiCpu` | `react-icons/fi` |
| Claude AI | `SiClaude` | `@icons-pack/react-simple-icons` |
| n8n | `SiN8n` | `@icons-pack/react-simple-icons` |
| Yahoo Finance | `FiTrendingUp` | `react-icons/fi` |
| Google Sheets | `SiGooglesheets` | `@icons-pack/react-simple-icons` |
| SendGrid | `FiSend` | `react-icons/fi` |
| html2pdf | `FiFileText` | `react-icons/fi` |
| Shopify | `SiShopify` | `@icons-pack/react-simple-icons` |
| Airtable | `SiAirtable` | `@icons-pack/react-simple-icons` |
| Pinecone | `FiDatabase` | `react-icons/fi` |
| Anthropic | `SiAnthropic` | `@icons-pack/react-simple-icons` |

For unlisted techs: check `SiXxx` in `@icons-pack/react-simple-icons` first, fall back to `react-icons/fi`.

---

## Steps for a new video

### 1. Create scene components

Copy `remotion/src/components/ep/` → `remotion/src/components/{prefix}/`. Rename all files and function names. Swap every color token to the new palette.

### 2. Create the composition

Create `remotion/src/compositions/{PascalName}.tsx`:

```tsx
import { AbsoluteFill, Audio, Series, staticFile } from "remotion";
import { XXIntro }     from "../components/xx/XXIntro";
import { XXPainPoint } from "../components/xx/XXPainPoint";
import { XXSolution }  from "../components/xx/XXSolution";
import { XXMetrics }   from "../components/xx/XXMetrics";
import { XXOutro }     from "../components/xx/XXOutro";

const config = {
  tagline:  "...",
  pain:     "...",
  solution: "...",
  techs:    ["...", "..."],
  metrics:  [{ value: 0, label: "..." }],
};

export function {PascalName}() {
  return (
    <AbsoluteFill style={{ background: "#..." }}>
      <Audio src={staticFile("audio/funky.mp3")} volume={0.75} />
      <Series>
        <Series.Sequence durationInFrames={90}><XXIntro title="{Name}" tagline={config.tagline} /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><XXPainPoint pain={config.pain} /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><XXSolution solution={config.solution} techs={config.techs} /></Series.Sequence>
        <Series.Sequence durationInFrames={240}><XXMetrics metrics={config.metrics} /></Series.Sequence>
        <Series.Sequence durationInFrames={120}><XXOutro /></Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
}
```

### 3. Register in Root.tsx

```tsx
import { {PascalName} } from "./compositions/{PascalName}";

<Composition id="{PascalName}" component={{PascalName}} durationInFrames={930} fps={30} width={1920} height={1080} props={{}} />
```

### 4. Add render script to package.json

```json
"render:{slug}": "npx remotion render src/Root.tsx {PascalName} ../public/projects/{slug}/{slug}.mp4"
```

Update `render:all` to include the new script.

### 5. Render

```bash
cd remotion && npm run render:{slug}
```

### 6. Preview without re-rendering

```bash
cd remotion && npm run studio
```

Opens at `localhost:3000` — scrub the timeline frame by frame before committing to a render.

---

## Example trigger

> "Read REMOTION.md. Project is PortfolioIQ — it automates investment portfolio analysis. Pain: manually reviewing 20 stocks takes hours. Solution: upload a screenshot, get a PDF report with live prices and risk scores in 10 minutes. Stack: GPT-4o, n8n, Yahoo Finance, SendGrid. Results: 10 min turnaround, 6 enrichment signals per stock, 100% automated. Make the video."

Claude reads this → derives config → copies EP components to new prefix → swaps colors → creates composition → registers → renders → done.
