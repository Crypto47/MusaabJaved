import { baseURL } from "@/resources";

/**
 * AI crawlers are allowed deliberately: being readable by them is the point of
 * publishing case studies, and blocking them removes any chance of being cited
 * in an AI answer.
 *
 * These groups used to be listed as `{ userAgent: "GPTBot" }` with no rules,
 * which generated six empty blocks:
 *
 *   User-Agent: GPTBot
 *   (nothing)
 *
 * robots.txt resolution picks the most specific matching group, so each of
 * these agents matched its own empty block and ignored the `*` rules entirely
 * — including `Disallow: /api/`. The permission was accidental rather than
 * stated. Listing the directives explicitly makes the intent unambiguous and
 * keeps /api/ out of scope for everyone.
 */
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "anthropic-ai",
  "Claude-SearchBot",
  "PerplexityBot",
  "Google-Extended",
  "cohere-ai",
  "Applebot-Extended",
];

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: AI_CRAWLERS, allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
