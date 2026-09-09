# IMAGE — Agent Instructions

> **How to trigger:** Tell Claude: "Read IMAGE.md and make a cover for [project]."
> Claude reads this file, pulls the project MDX, derives the config, adds it to the script, and generates the PNG automatically.

---

## What you need to provide

| Info | Where it comes from | Example |
|------|-------------------|---------|
| Project name | MDX title, or you say it | "Excelr8" |
| Subtitle/category | MDX or you describe it | "GTM Automation" |
| Hero metric | MDX outcomes — the single most impressive number | "96%" or "10x" |
| Metric label | What the number means | "less time per campaign" |
| Tech stack | MDX body, or you list it (keep to 4–6) | "HubSpot, Clay, GPT-4o, n8n" |
| Accent color (optional) | You pick, or Claude chooses from palette | "#a78bfa" |

If the project has an MDX file at `src/app/work/projects/{slug}.mdx`, Claude reads it first and extracts what it can.

---

## What Claude does (automatically)

### 1. Derive the config

```ts
{
  title: string,       // short project name — "Excelr8" not "Excelr8 — AI-Powered GTM Platform"
  subtitle: string,    // category/type — "GTM Automation", "AI Content Engine", etc.
  metric: string,      // hero number as a string — "96%", "10x", "$950", "240"
  metricLabel: string, // what it means — "less time per campaign", "cost reduction"
  techs: string[],     // 4–6 names max — fewer looks cleaner on the card
  accentColor: string, // hex — pick from palette below based on project vibe
  outputSlug: string,  // matches the MDX filename — "excelr8", "zippit"
}
```

**Accent color palette — pick one per project:**
| Color | Hex | Use for |
|-------|-----|---------|
| Purple | `#a78bfa` | Default — automation, AI agents |
| Cyan | `#38bdf8` | Data pipelines, content, analytics |
| Green | `#34d399` | Cost savings, efficiency, growth |
| Pink | `#f472b6` | Creative, marketing, design tools |
| Orange | `#fb923c` | Speed, performance, real-time |

**Rules:**
- `metric` — pick the single most impressive number. "96%" beats "847 hours". If it's a range, use the better end
- `subtitle` — 2–3 words max, no verbs. "GTM Automation" not "Automating GTM workflows"
- `techs` — 4 is ideal, 6 is max. Drop supporting tools, keep the recognizable ones

---

### 2. Add the config to the script

In `scripts/generate-cover.tsx`, add an entry to the `CONFIGS` object:

```ts
{slug}: {
  title: "...",
  subtitle: "...",
  metric: "...",
  metricLabel: "...",
  techs: [...],
  accentColor: "...",
  outputSlug: "{slug}",
},
```

---

### 3. Add generate script to package.json

In the `scripts` section of `package.json`:

```json
"generate:{slug}": "npx tsx scripts/generate-cover.tsx {slug}"
```

Also update `generate:all-covers`:
```json
"generate:all-covers": "npm run generate:excelr8 && npm run generate:zippit && npm run generate:{slug}"
```

---

### 4. Run it

```bash
npm run generate:{slug}
```

Output: `public/projects/{slug}/{slug}.png` (1200×630px PNG, ~70–100kb)

---

### 5. Wire to the project card

In `src/app/work/projects/{slug}.mdx`, update frontmatter:

```yaml
images:
  - "/images/projects/{slug}.png"
```

---

## Card design (for reference)

Layout: **1200×630px**, dark purple/blue gradient background.

```
┌──────────────────────────────────────────────┐
│                                              │
│           EXCELR8                            │  ← project name (muted, letter-spaced)
│           GTM AUTOMATION                     │  ← subtitle (more muted)
│                                              │
│                  96%                         │  ← hero metric (accent color, ~192px)
│           less time per campaign             │  ← metric label (muted white)
│                                              │
│     HubSpot   Clay   GPT-4o   n8n            │  ← tech badges (colored pills)
│                                              │
│                          musaabjaved.com     │  ← watermark (very subtle)
└──────────────────────────────────────────────┘
```

- Background glow blob behind the metric in the accent color
- Each tech badge gets a unique dark color from a rotating palette
- No photography, no screenshots — pure typography + color

---

## Example trigger

> "Read IMAGE.md. Make a cover for TechCorp AI — it processes 800 invoices/day, 90% time saved. Stack: GPT-4o, Python, FastAPI, Supabase. Use green."

Claude derives config → adds to CONFIGS → adds npm script → runs generator → done.
