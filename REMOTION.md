# REMOTION — Agent Instructions

> **How to trigger:** Tell Claude: "Read REMOTION.md and make a video for [project]."
> Claude will read this file, pull the project MDX if it exists, combine it with any extra info you provide, and do all the work below automatically.

---

## What you need to provide

Tell Claude any combination of the following — the more you give, the less Claude has to guess:

| Info | Where it comes from | Example |
|------|-------------------|---------|
| Project name | MDX title, or you say it | "Zippit" |
| Tagline | MDX summary, or you describe it | "Replaced a $1K/month agency with $50/month AI" |
| Pain point | MDX "The Problem" section, or you describe it | "Teams waste 20+ hrs/week on manual data entry" |
| Solution | MDX "What I Built" section, or you describe it | "End-to-end automation covering X, Y, Z" |
| Tech stack | MDX body, or you list it | "LangGraph, Pinecone, GPT-4o" |
| 2–3 outcome metrics | MDX "Outcomes" section, or you state them | "10x cost reduction, 30 hrs/month saved" |

If the project has an MDX file at `src/app/work/projects/{slug}.mdx`, Claude should read it first and extract what it can, then ask only for what's missing.

---

## What Claude does (do all of this automatically)

### 1. Derive the config

From the project info, produce a `ProjectConfig` object:

```ts
{
  title: string,      // project name, short — e.g. "Zippit"
  tagline: string,    // one punchy outcome line, max ~60 chars
  pain: string,       // the pain point — 1–2 sentences, visceral, specific
  solution: string,   // what was built — 1–2 sentences, outcome-led
  techs: string[],    // 4–8 tech names, shortest recognizable form
  metrics: [          // 2–3 metrics max — pick the most impressive
    { value: number, label: string, suffix?: string }
  ]
}
```

**Rules for good copy:**
- `tagline` — lead with the outcome. "Replaced a $1K/month agency with $50/month AI" beats "An automated content pipeline"
- `pain` — make it feel real. Specific hours, dollars, or frustrations. "Teams waste 20+ hrs/week on manual CRM entry" beats "The process was inefficient"
- `solution` — outcome-led, not tech-led. "Fully automated content factory producing 2+ articles/day" beats "A LangGraph pipeline with Pinecone RAG"
- `metrics.value` — must be a plain integer (the counter animates). For ranges (e.g. "10–20x"), use the higher end
- `metrics.suffix` — only needed for `%`. Everything else has no suffix

---

### 2. Create the composition file

Create `remotion/src/compositions/{PascalCaseName}.tsx`:

```tsx
import { ProjectVideo } from "./ProjectVideo";

export function {PascalCaseName}() {
  return (
    <ProjectVideo
      config={{
        title: "...",
        tagline: "...",
        pain: "...",
        solution: "...",
        techs: [...],
        metrics: [...],
      }}
    />
  );
}
```

---

### 3. Register in Root.tsx

In `remotion/src/Root.tsx`, add:

```tsx
// Top of file:
import { {PascalCaseName} } from "./compositions/{PascalCaseName}";

// Inside RemotionRoot, after the last <Composition>:
<Composition
  id="{PascalCaseName}"
  component={{PascalCaseName}}
  durationInFrames={540}
  fps={30}
  width={1920}
  height={1080}
  props={{}}
/>
```

---

### 4. Add render script to package.json

In `remotion/package.json`, add to `scripts`:

```json
"render:{lowercasename}": "npx remotion render src/Root.tsx {PascalCaseName} ../public/videos/{lowercasename}.mp4"
```

Also update `render:all`:

```json
"render:all": "npm run render:excelr8 && npm run render:zippit && npm run render:{lowercasename}"
```

---

### 5. Run the render

```bash
cd remotion
npm run render:{lowercasename}
```

Output: `public/videos/{lowercasename}.mp4`

---

### 6. Wire to the project card

In `src/app/work/projects/{slug}.mdx`, add to frontmatter:

```yaml
video: "/videos/{lowercasename}.mp4"
```

---

## Video structure

18 seconds (540 frames at 30fps), 5 scenes:

| Frames | Duration | Scene | What it shows |
|--------|----------|-------|---------------|
| 0–60 | 2s | **Intro** | Project name + tagline. Gradient title slams in with glow. |
| 60–150 | 3s | **Pain Point** | The problem, bold-slammed onto screen. Red tones, high stiffness spring. |
| 150–270 | 4s | **Solution** | What was built (1–2 sentences) + tech badges sliding in below. Purple/blue tones. |
| 270–450 | 6s | **Results** | 2–3 metrics counting up from zero. Each number in a different gradient color. |
| 450–540 | 3s | **Outro** | musaabjaved.com + "Let's work together." |

Audio: `public/audio/funky.mp3` plays throughout at 75% volume (auto-wired in `ProjectVideo.tsx`).

---

## Example trigger

> "Read REMOTION.md. The project is called TechCorp AI. It automates invoice processing for a logistics firm — before they had 3 people manually reviewing 800 invoices a day, now it's instant. Stack: GPT-4o, Python, FastAPI, Supabase. Results: 800 invoices/day processed, 90% time saved, 6 seconds per invoice. Make the video."

Claude reads this file → derives config → creates 3 files → runs render → wires MDX → done.
