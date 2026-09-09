# Adding Content — Step-by-Step Guide

Everything you need to add, update, or remove content from the portfolio. No code knowledge required for most tasks.

---

## Table of Contents
1. [Add a new project](#1-add-a-new-project)
2. [Add images to a project](#2-add-images-to-a-project)
3. [Make a Remotion video for a project](#3-make-a-remotion-video-for-a-project)
4. [Add a client logo](#4-add-a-client-logo)
5. [Add a testimonial](#5-add-a-testimonial)
6. [Add a blog post](#6-add-a-blog-post)
7. [Update the Currently section (games / books)](#7-update-the-currently-section-games--books)
8. [Update home page metrics](#8-update-home-page-metrics)
9. [Update the Services grid](#9-update-the-services-grid)
10. [Update personal info / social links / resume](#10-update-personal-info--social-links--resume)

---

## 1. Add a new project

### Files involved
- `src/app/work/projects/your-project/your-project.mdx` ← create this
- `public/projects/your-project/your-project.png` ← drop image here

### Steps

**Step 1** — Create the MDX file at `src/app/work/projects/your-project/your-project.mdx`:

```mdx
---
title: "Your Project Title"
publishedAt: "2025-01-01"
summary: "One sentence shown on the project card. Keep it under 120 chars."
images:
  - "/images/projects/your-project.png"
team:
  - name: "Musaab Javed"
    role: "AI Engineer"
    avatar: "/images/avatar.jpg"
link: "https://example.com"
video: "/videos/your-project.mp4"
---

Write the full case study here using Markdown.

## The Problem

...

## What I Built

...

## Results

...
```

**Step 2** — Drop your project image at `public/projects/your-project/your-project.png`.

That's it. The project card and detail page generate automatically.

### Notes
- `publishedAt` controls sort order (newest first)
- `images` array accepts multiple images — they show as a carousel on the card
- `video` is optional — only add it if you have a rendered video (see section 3)
- `link` is the external demo/repo link shown on the detail page
- The filename (`your-project.mdx`) becomes the URL slug: `/work/your-project`

---

## 2. Add images to a project

### Files involved
- `public/projects/{slug}/` ← drop images here
- `src/app/work/projects/your-project/your-project.mdx` ← update `images:` frontmatter

### Steps

**Step 1** — Drop your image at `public/projects/{slug}/my-image.png`.

**Step 2** — Add it to the `images:` array in the project's MDX frontmatter:

```yaml
images:
  - "/images/projects/my-image.png"
  - "/images/projects/my-image-2.png"
```

The first image is used as the card thumbnail. Additional images cycle in the card carousel.

### For inline images in the write-up body

Use standard Markdown:
```md
![Alt text](/images/projects/my-image.png)
```

---

## 3. Make a Remotion video for a project

Remotion renders a branded motion-graphic MP4 (no screen recording needed). The video shows: intro title card → workflow diagram → tech stack logos → metrics counting up → outro.

### Files involved
- `remotion/src/compositions/YourProject.tsx` ← create this
- `remotion/src/Root.tsx` ← register the composition
- `public/projects/your-project/your-project.mp4` ← output goes here (auto-created on render)
- `src/app/work/projects/your-project/your-project.mdx` ← add `video:` frontmatter field

### Steps

**Step 1** — Create `remotion/src/compositions/YourProject.tsx` by copying an existing one:

```tsx
import { ProjectVideo } from "./ProjectVideo";

export function YourProject() {
  return (
    <ProjectVideo
      config={{
        title: "Your Project Name",
        tagline: "What it does in one line.",
        workflow: {
          before: "Manual Process",   // what the client did before
          after: "Automated Output",  // what it does now
        },
        techs: ["LangChain", "GPT-4o", "Python", "n8n"],  // your stack
        metrics: [
          { value: 847, label: "hours saved per month" },
          { value: 70, label: "% cost reduction", suffix: "%" },
        ],
      }}
    />
  );
}
```

**Step 2** — Register the composition in `remotion/src/Root.tsx`:

```tsx
import { YourProject } from "./compositions/YourProject";

// Inside RemotionRoot, add:
<Composition
  id="YourProject"
  component={YourProject}
  durationInFrames={540}
  fps={30}
  width={1920}
  height={1080}
  props={{}}
/>
```

**Step 3** — Add a render script to `remotion/package.json`:

```json
"render:yourproject": "npx remotion render src/Root.tsx YourProject ../public/projects/your-project/your-project.mp4"
```

**Step 4** — Install and render:

```bash
cd remotion
npm install        # first time only
npm run studio     # preview in browser (optional)
npm run render:yourproject
```

The MP4 is saved to `public/projects/your-project/your-project.mp4`.

**Step 5** — Add the `video:` field to the project's MDX frontmatter:

```yaml
video: "/videos/your-project.mp4"
```

The video toggle button appears automatically on the project card.

---

## 4. Add a client logo

Logos are auto-discovered from `public/images/clients/`. Just drop a file in.

### Files involved
- `public/images/clients/` ← drop logo here

### Steps

**Step 1** — Drop your logo file into `public/images/clients/`:

```
public/images/clients/acme-corp.svg
```

Accepted formats: `.svg` `.png` `.jpg` `.jpeg` `.webp`

The filename (without extension, hyphens → spaces) becomes the alt text. `acme-corp.svg` → "acme corp".

**Step 2** — Refresh the home page. The logo appears in the carousel automatically.

### Notes
- SVG is preferred (scales cleanly at any size)
- Logo should ideally be on a transparent background
- Files are sorted alphabetically, so prefix with a number to control order: `01-acme.svg`, `02-beta.svg`

---

## 5. Add a testimonial

Testimonials are auto-discovered from `public/testimonials/`. Create a folder per person.

### Files involved
- `public/testimonials/{slug}/image.jpg` ← their photo (or placeholder)
- `public/testimonials/{slug}/testimonial.md` ← their quote + metadata

### Steps

**Step 1** — Create a folder for the person. Use lowercase-hyphenated name:

```
public/testimonials/john-smith/
```

**Step 2** — Create `public/testimonials/john-smith/testimonial.md`:

```md
---
name: John Smith
role: Head of Growth
company: Acme Corp
---
Write the testimonial quote here. Just the quote text, no quotation marks needed.
Keep it 2–4 sentences — long enough to be credible, short enough to read quickly.
```

**Step 3** — Drop their photo as `image.jpg` (or `image.png`, `image.webp`) into the same folder:

```
public/testimonials/john-smith/image.jpg
```

If you don't have a real photo yet, the placeholder SVG in the folder will be used until you replace it.

**Step 4** — Refresh the home page. The testimonial appears in the grid automatically.

### Notes
- Folder name (`john-smith`) is only used internally — it doesn't show on the page
- If no image file is found, the photo area is skipped (just the quote card shows)
- Order is alphabetical by folder name — prefix with numbers to control it: `01-john-smith/`

---

## 6. Add a blog post

### Files involved
- `src/app/blog/posts/your-post.mdx` ← create this
- `public/projects/{slug}/your-post-cover.png` ← optional cover image

### Steps

**Step 1** — Create `src/app/blog/posts/your-post.mdx`:

```mdx
---
title: "Your Post Title"
publishedAt: "2025-06-01"
summary: "One sentence shown on the blog card."
image: "/images/projects/your-post-cover.png"
tag: "AI"
---

Write the full post here in Markdown.

## Heading

Body text...
```

**Step 2** — (Optional) Drop a cover image at `public/projects/{slug}/your-post-cover.png`.

The post card and detail page generate automatically.

### Notes
- `publishedAt` controls sort order (newest first)
- `tag` shows as a label on the card (e.g. "AI", "Tutorial", "Case Study")
- `image` is optional — cards without images still display correctly
- The filename becomes the URL slug: `your-post.mdx` → `/blog/your-post`

---

## 7. Update the Currently section (games / books)

Shown at the bottom of `/about`. Items are auto-discovered from `public/currently/`.

### Files involved
- `public/currently/games/{slug}/info.md` + image file
- `public/currently/books/{slug}/info.md` + image file

### Add a game

**Step 1** — Create the folder and `info.md`:

```
public/currently/games/dark-souls/
```

```md
---
title: Dark Souls III
category: Action RPG
---
```

**Step 2** — Drop the box art / wallpaper into the same folder as `image.jpg` (or `.png`, `.webp`).

### Add a book

```
public/currently/books/dune/
```

```md
---
title: Dune
category: Frank Herbert
---
```

Drop the cover as `image.jpg` into the folder.

### Remove an item

Delete (or rename) the folder. The item disappears on the next page load.

### Notes
- `category` is flexible — use it for genre, author, platform, anything
- Portrait images (roughly 2:3 ratio) look best — book covers and game box art already are
- Order is alphabetical by folder name — prefix with numbers to control it

---

## 8. Update home page metrics

The three stats under the hero (e.g. "3+ Years", "60-70% Cost Reduction").

### File
`src/resources/content.tsx` → `metrics` export (near the bottom of the file)

```tsx
export const metrics = [
  { value: "3+",    label: "Years of Experience" },
  { value: "60–70%", label: "Average Cost Reduction" },
  { value: "10+",   label: "Projects Shipped" },
];
```

Edit `value` and `label` directly. Any number of metrics works — they wrap on mobile.

---

## 9. Update the Services grid

The "What I Build" section on the home page.

### File
`src/resources/content.tsx` → `services` export

```tsx
export const services = [
  {
    icon: "sparkles",
    title: "RAG Pipelines",
    description: "...",
  },
  // add/edit/remove entries here
];
```

- `icon` — any icon name from the Once UI icon set
- `title` — card heading
- `description` — 1–2 sentence card body

---

## 10. Update personal info / social links / resume

### File
`src/resources/content.tsx` → `person` and `social` objects near the top.

**Personal info:**
```tsx
const person: Person = {
  firstName: "Musaab",
  lastName: "Javed",
  name: "Musaab Javed",
  role: "AI Integrations Engineer",
  avatar: "/images/avatar.jpg",  // drop new photo at public/images/avatar.jpg
  email: "musabjaved47@gmail.com",
  location: "Asia/Karachi",
  languages: ["English", "Urdu"],
};
```

**Resume:**
1. Drop new PDF at `public/resume/Musaab_Javed_Resume.pdf`
2. The `social` array already points to `/resume/Musaab_Javed_Resume.pdf` — no change needed unless you rename the file.

**Social links:**
```tsx
const social: Social[] = [
  { name: "GitHub", icon: "github", link: "https://github.com/Crypto47", essential: true },
  { name: "LinkedIn", icon: "linkedin", link: "https://www.linkedin.com/in/musabjaved", essential: true },
  // add/remove entries, set essential: false to hide from About header
];
```
