# Portfolio High-Impact Features: Metrics Strip, Services Section, Project Write-ups

## Context
Previous work (completed): content.tsx fully rewritten with Musaab's info, 7 template MDX projects deleted, ClientsCarousel added, RSS blog feed wired up. The projects section is now empty and the home page has no proof-of-value or service clarity. This plan adds three high-impact items: a metrics strip, a "What I build" services grid, and real project write-ups for Excelr8 and Zippit.

---

## Scope

### 1. Metrics Strip
A horizontal row of 4 bold stat tiles displayed directly below the hero CTA button, before the "What I build" section.

**Numbers to show (from resume):**
- `3+` — Years of production AI experience
- `60–70%` — Avg. manual workflow reduction
- `100–300 hrs` — Saved per client / month
- `15+` — Clients served

**Implementation:**
- Add a `metrics` array to `src/resources/content.tsx` as a standalone export
- Render inline in `src/app/page.tsx` after the CTA RevealFx block
- Use Once UI: `<Row>` with `<Heading variant="display-strong-s">` + `<Text variant="label-default-s">`

---

### 2. "What I Build" Services Grid
A 2×2 grid of service cards placed **below the hero section, above the ClientsCarousel**.

**Four services:**
| Title | Description |
|-------|-------------|
| Lead Intelligence Systems | Multi-stage lead sourcing, qualification, and enrichment pipelines across Apollo, Clay, and Apify |
| RAG Pipelines | Production document retrieval systems over 5K+ docs with LangChain, LlamaIndex, and Pinecone |
| CRM & Workflow Automation | Event-driven n8n automations synced to HubSpot and GoHighLevel, cutting manual ops by 60–70% |
| Content Automation | AI content factories — SEO articles, newsletters, and reports generated end-to-end at scale |

**Implementation:**
- Add `services` array to `src/resources/content.tsx`
- New `src/components/ServicesGrid.tsx` — `<Grid columns="2">` with `<Card>` per service
- Export from `src/components/index.ts`
- Render in `src/app/page.tsx` between hero and carousel

---

### 3. Project Write-ups: Excelr8 + Zippit

- `src/app/work/projects/excelr8.mdx` — GTM automation platform (Founding Engineer, Jan 2026–Present)
- `src/app/work/projects/zippit.mdx` — Automated SEO blog system (Automation Engineer, Feb 2026–Present)
- `public/images/projects/excelr8-placeholder.svg` — placeholder image
- `public/images/projects/zippit-placeholder.svg` — placeholder image

---

## Files Modified
| File | Change |
|------|--------|
| `src/resources/content.tsx` | Added `metrics` and `services` exports |
| `src/app/page.tsx` | Added metrics strip + ServicesGrid |
| `src/components/index.ts` | Exported ServicesGrid |

## Files Created
| File | Purpose |
|------|---------|
| `src/components/ServicesGrid.tsx` | 2×2 service cards component |
| `src/app/work/projects/excelr8.mdx` | Excelr8 project write-up |
| `src/app/work/projects/zippit.mdx` | Zippit project write-up |
| `public/images/projects/excelr8-placeholder.svg` | Placeholder project image |
| `public/images/projects/zippit-placeholder.svg` | Placeholder project image |

---

## Home Page Layout (top → bottom)
1. Hero: headline, subline, CTA button
2. **Metrics strip** (4 stat tiles)
3. **Services grid** (2×2 cards)
4. Clients carousel
5. Selected Projects (Excelr8 + Zippit)
6. Mailchimp
