# Musaab Javed — Portfolio v2

Personal portfolio for **Musaab Javed**, AI Integrations Engineer. Built on [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) + [Once UI](https://once-ui.com).

🌐 [musaabjaved.com](https://musaabjaved.com)

---

## Stack

- **Next.js 16** (App Router, MDX)
- **Once UI** design system
- **Supabase** (guestbook / goals)
- **Remotion** (project demo videos, separate package)
- **Satori + Sharp** (project cover image generation)

---

## Getting started

```bash
npm install
npm run dev        # localhost:3000
```

Required `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
PAGE_ACCESS_PASSWORD=...
```

To run without Supabase: set `"/guestbook": false` and `"/goals": false` in `src/resources/once-ui.config.ts`.

---

## Commands

```bash
# Dev & build
npm run dev              # localhost:3000
npm run build            # production build
npm run lint             # ESLint
npm run biome-write      # format with Biome
npx tsc --noEmit         # type-check

# Project cover images
npm run generate:excelr8
npm run generate:zippit
npm run generate:all-covers

# Remotion videos (run from remotion/ folder)
cd remotion && npm install     # first time only
npm run studio                 # preview at localhost:3000
npm run render:excelr8         # → public/projects/excelr8/excelr8.mp4
npm run render:zippit          # → public/projects/zippit/zippit.mp4
npm run render:all
```

---

## Project structure

```
src/
  resources/
    content.tsx          ← ALL content: person, home, about, metrics, services
    once-ui.config.ts    ← Routes, design tokens, theme
    icons.ts             ← Icon mappings
  app/
    page.tsx             ← Home page
    about/page.tsx       ← About / CV page
    work/
      projects/
        {slug}/
          {slug}.mdx     ← One folder per project (MDX + assets together)
    blog/
      posts/*.mdx        ← Blog posts
    lab/                 ← Hidden Easter egg terminal (/lab)
    doom/                ← Playable Doom (/doom)
    site-map/            ← Human-readable sitemap
  components/
    ProjectCard.tsx           ← Project card (defaults to video)
    ServicesGrid.tsx           ← "What I build" section
    ClientsCarousel.tsx        ← Auto-scrolling client logos
    TestimonialsCarousel.tsx   ← Testimonials grid
    ROICalculator.tsx          ← Interactive ROI calculator
    CurrentlySection.tsx       ← Playing/reading section (about)

remotion/
  src/
    compositions/        ← One file per project video
    components/          ← Animation primitives (PainPoint, SolutionScene, etc.)
  package.json           ← Render scripts

scripts/
  generate-cover.tsx     ← Satori/Sharp cover image generator

public/
  projects/
    {slug}/
      {slug}.png         ← Project cover image
      {slug}.mp4         ← Rendered Remotion video
  images/
    avatar.jpg
    clients/             ← Client logos (auto-discovered)
  testimonials/
    {slug}/              ← Testimonial folders (auto-discovered)
      image.jpg
      testimonial.md
  currently/
    games/{slug}/        ← Auto-discovered
    books/{slug}/        ← Auto-discovered
  audio/
    funky.mp3            ← Background music for Remotion videos
  resume/
    Musaab_Javed_Resume.pdf
```

---

## Adding content

| What | Where |
|------|-------|
| New project | Create `src/app/work/projects/{slug}/{slug}.mdx` |
| Project cover | Drop PNG into `public/projects/{slug}/` or run `npm run generate:{slug}` |
| Project video | Run `cd remotion && npm run render:{slug}` |
| Blog post | Create `src/app/blog/posts/{slug}.mdx` |
| Client logo | Drop image into `public/images/clients/` |
| Testimonial | Create `public/testimonials/{slug}/testimonial.md` + `image.jpg` |
| Currently playing | Create `public/currently/games/{slug}/info.md` + image |
| Currently reading | Create `public/currently/books/{slug}/info.md` + image |
| All bio/copy | Edit `src/resources/content.tsx` |

For generating new project videos, see [REMOTION.md](./REMOTION.md).  
For generating cover images, see [IMAGE.md](./IMAGE.md).

---

## Hidden pages

| Route | What |
|-------|------|
| `/lab` | Interactive terminal Easter egg — try `knight`, `pikachu`, `hire` |
| `/doom` | Playable Doom |
| `/site-map` | Human-readable sitemap |


DONE