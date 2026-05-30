import { baseURL } from "@/resources";

export default function robots() {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/"] },
      { userAgent: "GPTBot" },
      { userAgent: "ClaudeBot" },
      { userAgent: "anthropic-ai" },
      { userAgent: "PerplexityBot" },
      { userAgent: "Google-Extended" },
      { userAgent: "cohere-ai" },
    ],
    sitemap: `${baseURL}/sitemap.xml`,
  };
}
