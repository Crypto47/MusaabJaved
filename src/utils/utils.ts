import fs from "fs";
import path from "path";
import matter from "gray-matter";

type Team = {
  name: string;
  role: string;
  avatar: string;
  linkedIn: string;
};

type Metadata = {
  title: string;
  subtitle?: string;
  publishedAt: string;
  summary: string;
  image?: string;
  images: string[];
  tag?: string;
  team: Team[];
  link?: string;
  video?: string;
};

import { notFound } from "next/navigation";

export const getRandom = <T>(array: T[], limit?: number): T[] => {
  const shuffled = [...array];
  const n = shuffled.length;

  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return limit ? shuffled.slice(0, limit) : shuffled;
};

function getMDXFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    notFound();
  }

  const result: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isFile() && path.extname(entry.name) === ".mdx") {
      result.push(entry.name);
    } else if (entry.isDirectory()) {
      const subdir = path.join(dir, entry.name);
      for (const subEntry of fs.readdirSync(subdir)) {
        if (path.extname(subEntry) === ".mdx") {
          result.push(path.join(entry.name, subEntry));
        }
      }
    }
  }
  return result;
}

function readMDXFile(filePath: string) {
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const rawContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(rawContent);

  const metadata: Metadata = {
    title: data.title || "",
    subtitle: data.subtitle || "",
    publishedAt: data.publishedAt,
    summary: data.summary || "",
    image: data.image || "",
    images: data.images || [],
    tag: data.tag || [],
    team: data.team || [],
    link: data.link || "",
    video: data.video || "",
  };

  return { metadata, content };
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getPosts(customPath = ["", "", "", ""]) {
  const postsDir = path.join(process.cwd(), ...customPath);
  return getMDXData(postsDir);
}

export function getClientLogos(): { name: string; logo: string }[] {
  const dir = path.join(process.cwd(), "public", "images", "clients");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(svg|png|jpg|jpeg|webp)$/i.test(f))
    .sort()
    .map((f) => ({
      name: f.replace(/\.[^.]+$/, "").replace(/-/g, " "),
      logo: `/images/clients/${f}`,
    }));
}

export type Testimonial = {
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
};

export type CurrentlyItem = {
  title: string;
  category: string;
  image: string;
};

export function getCurrentlyItems(type: "games" | "books"): CurrentlyItem[] {
  const dir = path.join(process.cwd(), "public", "currently", type);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((slug) => fs.statSync(path.join(dir, slug)).isDirectory())
    .map((slug) => {
      const folder = path.join(dir, slug);
      const imgFile = fs
        .readdirSync(folder)
        .find((f) => /\.(png|jpg|jpeg|webp|svg)$/i.test(f));
      const raw = fs.readFileSync(path.join(folder, "info.md"), "utf-8");
      const { data } = matter(raw);
      return {
        title: (data.title as string) || slug,
        category: (data.category as string) || "",
        image: imgFile ? `/currently/${type}/${slug}/${imgFile}` : "",
      };
    });
}

export function getTestimonials(): Testimonial[] {
  const dir = path.join(process.cwd(), "public", "testimonials");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((slug) => fs.statSync(path.join(dir, slug)).isDirectory())
    .map((slug) => {
      const folder = path.join(dir, slug);
      const imgFile = fs
        .readdirSync(folder)
        .find((f) => /\.(png|jpg|jpeg|svg|webp)$/i.test(f));
      const imagePath = imgFile ? `/testimonials/${slug}/${imgFile}` : "";
      const mdPath = path.join(folder, "testimonial.md");
      const raw = fs.readFileSync(mdPath, "utf-8");
      const { data, content } = matter(raw);
      return {
        name: (data.name as string) || "",
        role: (data.role as string) || "",
        company: (data.company as string) || "",
        quote: content.trim(),
        image: imagePath,
      };
    });
}
