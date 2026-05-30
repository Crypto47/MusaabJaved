# Musaab Javed — Portfolio v2

Built on **Magic Portfolio** + **Once UI** design system.

> For step-by-step content instructions (add project, video, testimonial, etc.) see **[ADDING-CONTENT.md](./ADDING-CONTENT.md)**.

---

## Who this is for
**Musaab Javed** — AI Integrations Engineer, ~3 years experience (Tkrupt, WhisperFrames, Zaltech AI, Developers Den).
- Role: AI Integrations Engineer @ **Tkrupt**, Lahore, Pakistan
- Education: BSCS — PIEAS Islamabad
- GitHub: github.com/Crypto47
- LinkedIn: linkedin.com/in/musabjaved
- Email: musabjaved47@gmail.com

---

## Commands

```bash
# Portfolio (Next.js)
npm run dev          # localhost:3000
npm run build        # production build
npm run lint         # ESLint
npm run biome-write  # format (Biome, not Prettier)
npx tsc --noEmit     # type-check only

# Remotion videos (separate package)
cd remotion && npm install   # first time only
npm run studio               # visual preview at localhost:3000
npm run render:excelr8       # renders → public/projects/excelr8/excelr8.mp4
npm run render:zippit        # renders → public/projects/zippit/zippit.mp4
npm run render:all           # renders all videos
```

---

## File structure

```
src/
  resources/
    content.tsx          ← ALL content: person, home, about, metrics, services, currently
    once-ui.config.ts    ← Routes, design tokens, theme
    icons.ts             ← Icon library (react-icons mappings)
  app/
    page.tsx             ← Home page (server component)
    about/page.tsx       ← About / CV page
    work/
      projects/{slug}/
        {slug}.mdx       ← ADD PROJECTS HERE (one folder per project)
    blog/
      posts/*.mdx        ← ADD BLOG POSTS HERE
    lab/                 ← Hidden Easter egg terminal (/lab)
    doom/                ← Doom game (/doom)
    site-map/            ← Human-readable sitemap (/site-map)
  components/
    ServicesGrid.tsx     ← "What I build" section (home)
    ClientsCarousel.tsx  ← Auto-scrolling logo strip (home)
    TestimonialsCarousel.tsx  ← Testimonials grid (home)
    ROICalculator.tsx    ← ROI calculator (home)
    CurrentlySection.tsx ← Games/books section (about)
    ProjectCard.tsx      ← Project card with image/video toggle
remotion/
  src/
    compositions/        ← One file per project video
    components/          ← Reusable animation primitives
  package.json           ← Run render commands from here
public/
  resume/
    Musaab_Javed_Resume.pdf
  projects/
    {slug}/              ← PROJECT COVER + VIDEO PER PROJECT
      {slug}.png
      {slug}.mp4
  images/
    avatar.jpg
    clients/             ← DROP CLIENT LOGOS HERE (auto-discovered)
  testimonials/
    {slug}/              ← DROP TESTIMONIAL FOLDERS HERE (auto-discovered)
      image.jpg
      testimonial.md
  currently/
    games/{slug}/        ← DROP GAME FOLDERS HERE (auto-discovered)
    books/{slug}/        ← DROP BOOK FOLDERS HERE (auto-discovered)
```

---

## Where content lives

| What | File | Key |
|------|------|-----|
| Name, role, email, avatar | `src/resources/content.tsx` | `person` |
| Social links, resume link | `src/resources/content.tsx` | `social` |
| Home headline, badge, subline | `src/resources/content.tsx` | `home` |
| Metrics strip (home) | `src/resources/content.tsx` | `metrics` |
| Services grid (home) | `src/resources/content.tsx` | `services` |
| Bio, work, education, skills | `src/resources/content.tsx` | `about` |
| Currently section (about) | `src/resources/content.tsx` | `about.currently` |
| Route on/off | `src/resources/once-ui.config.ts` | `routes` |
| Project write-ups | `src/app/work/projects/{slug}/{slug}.mdx` | frontmatter + body |
| Blog posts | `src/app/blog/posts/*.mdx` | frontmatter + body |
| Client logos | `public/images/clients/` | any image file, auto-discovered |
| Testimonials | `public/testimonials/{slug}/` | folder per person, auto-discovered |
| Currently playing/reading | `public/currently/{games\|books}/{slug}/` | folder per item, auto-discovered |
| Project cover image | `public/projects/{slug}/{slug}.png` | generate with `npm run generate:{slug}` |
| Project demo videos | `public/projects/{slug}/{slug}.mp4` | rendered by Remotion |

---

## Supabase (guestbook / goals)

Required `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
PAGE_ACCESS_PASSWORD=...
```
To disable without Supabase: set `"/guestbook": false` and `"/goals": false` in `once-ui.config.ts` → `routes`.

---

## Once UI Rules

Never use raw `<div>`, Tailwind classes, or hex colors. Always use Once UI primitives.

### Layout
- `<Column>` — vertical stack (`<div>` equivalent)
- `<Row>` — horizontal stack (`<div style="display:flex">` equivalent)
- `<Grid>` — equal-column grid
- Inline `<div>` is allowed only for things Once UI has no primitive for (e.g. absolute-positioned overlays)

### Spacing
Props: `gap`, `padding`, `paddingX`, `paddingY`, `margin`, `marginTop`  
Tokens: `"4"` `"8"` `"12"` `"16"` `"24"` `"32"` `"40"` `"48"` `"64"`  
Page horizontal padding: `paddingX="l"`

### Sizing
- `fillWidth` not `w-full`
- `fillHeight` not `h-full`
- `maxWidth="s"` / `"m"` / `"l"` / `"xl"` for containers

### Typography
```tsx
<Heading variant="display-strong-xl" />  // hero
<Heading variant="display-strong-s" />   // section heading
<Text variant="body-default-m" />        // body
<Text variant="label-default-s" />       // label / caption
```

### Colors
Never hex. Use semantic tokens:
- `background="surface"` — cards
- `onBackground="neutral-weak"` — muted text
- `onBackground="accent-medium"` — accent text
- `solid="accent-strong" onSolid="static-white"` — primary CTA

### Responsive
```tsx
<Column s={{ gap: "16" }} m={{ gap: "24" }}>
```

### Custom components
- Go in `src/components/` with a barrel export in `src/components/index.ts`
- Build from Once UI primitives
- Use inline styles only when props are insufficient
