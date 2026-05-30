// RSS feed URLs
// Substack: if https://substack.com/@musaab3/feed doesn't work, try https://musaab3.substack.com/feed
const FEEDS = [
  { url: "https://medium.com/feed/@musabjaved", source: "Medium" },
  { url: "https://substack.com/@musaab3/feed", source: "Substack" },
] as const;

export type RSSPost = {
  metadata: {
    title: string;
    publishedAt: string;
    summary: string;
    image: string;
    images: string[];
    tag: string;
    team: never[];
    link: string;
  };
  slug: string;
  content: string;
};

function stripCDATA(text: string): string {
  const match = text.match(/^<!\[CDATA\[([\s\S]*?)\]\]>$/);
  return match ? match[1] : text;
}

function extractTag(xml: string, tag: string): string {
  const regex = new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = xml.match(regex);
  if (!match) return "";
  return stripCDATA(match[1]).trim();
}

function extractFirstImage(html: string): string {
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    // Skip tracking pixels (medium.com/_/stat, 1×1 beacons, etc.)
    if (/medium\.com\/_\//.test(src)) continue;
    if (/\/(stat|beacon|pixel|track)\b/i.test(src)) continue;
    return src;
  }
  return "";
}

function decodeEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");
}

function stripHtml(html: string): string {
  return decodeEntities(html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
}

function toSlug(title: string, url: string): string {
  // Prefer the URL path segment as slug so it's unique across platforms
  try {
    const path = new URL(url).pathname;
    const last = path.split("/").filter(Boolean).pop() || "";
    if (last) return last;
  } catch {}
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseDate(raw: string): string {
  if (!raw) return "";
  try {
    return new Date(raw).toISOString().split("T")[0];
  } catch {
    return "";
  }
}

function parseItems(xml: string): RSSPost[] {
  const posts: RSSPost[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match: RegExpExecArray | null;

  while ((match = itemRegex.exec(xml)) !== null) {
    const item = match[1];

    const title = stripHtml(extractTag(item, "title"));
    const link = extractTag(item, "link");
    const pubDate =
      extractTag(item, "pubDate") || extractTag(item, "dc:date");
    const description = extractTag(item, "description");
    const contentEncoded = extractTag(item, "content:encoded");
    const fullHtml = contentEncoded || description;

    const summary = stripHtml(description).substring(0, 220).trimEnd();
    const image = extractFirstImage(fullHtml);
    const publishedAt = parseDate(pubDate);

    if (!title || !link) continue;

    posts.push({
      metadata: {
        title,
        publishedAt,
        summary: summary || title,
        image,
        images: image ? [image] : [],
        tag: "",
        team: [],
        link,
      },
      slug: toSlug(title, link),
      content: "",
    });
  }

  return posts;
}

async function fetchFeed(url: string): Promise<RSSPost[]> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 3600 }, // re-fetch at most every hour
      headers: { "User-Agent": "Mozilla/5.0 (portfolio RSS reader)" },
    });
    if (!res.ok) {
      console.warn(`RSS fetch failed (${res.status}): ${url}`);
      return [];
    }
    const xml = await res.text();
    return parseItems(xml);
  } catch (err) {
    console.warn(`RSS fetch error for ${url}:`, err);
    return [];
  }
}

export async function getAllRSSPosts(): Promise<RSSPost[]> {
  const results = await Promise.all(FEEDS.map(({ url }) => fetchFeed(url)));
  const all = results.flat();

  // Deduplicate by link
  const seen = new Set<string>();
  const unique = all.filter(({ metadata }) => {
    if (seen.has(metadata.link)) return false;
    seen.add(metadata.link);
    return true;
  });

  return unique.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
  );
}
