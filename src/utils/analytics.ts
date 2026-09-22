import posthog from "posthog-js";

/**
 * Product events for the portfolio. Keep this list short and deliberate: each
 * name answers one question about visitor intent.
 */
export type EventName =
  | "contact_click" // email / whatsapp / phone
  | "book_call_click" // Calendly
  | "resume_download"
  | "case_study_open" // /work/<slug>
  | "social_click" // GitHub, LinkedIn, X…
  | "outbound_click" // any other external link
  | "film_toggle" // image <-> video on a project card
  | "project_details_open"; // "View Workflow Details" accordion

export type EventProps = Record<string, string | number | boolean | undefined>;

/**
 * Capture an event. Safe to call anywhere on the client: a no-op during SSR
 * and whenever PostHog was not initialised (no NEXT_PUBLIC_POSTHOG_KEY).
 */
export function track(event: EventName, properties?: EventProps): void {
  if (typeof window === "undefined" || !posthog.__loaded) return;
  posthog.capture(event, properties);
}

const SOCIAL_HOSTS: Record<string, string> = {
  "github.com": "github",
  "linkedin.com": "linkedin",
  "x.com": "x",
  "twitter.com": "x",
  "instagram.com": "instagram",
  "threads.net": "threads",
  "medium.com": "medium",
  "substack.com": "substack",
  "huggingface.co": "huggingface",
};

/**
 * Map a link target to an event, so server-rendered CTAs need no client code.
 * Returns null for ordinary internal navigation (page views cover that).
 */
export function eventForHref(
  href: string,
  currentHost: string,
): { event: EventName; props: EventProps } | null {
  let url: URL;
  try {
    url = new URL(href, `https://${currentHost}`);
  } catch {
    return null;
  }

  if (url.protocol === "mailto:") return { event: "contact_click", props: { channel: "email" } };
  if (url.protocol === "tel:") return { event: "contact_click", props: { channel: "phone" } };

  const host = url.hostname.replace(/^www\./, "");

  if (host === "wa.me" || host.endsWith("whatsapp.com")) {
    return { event: "contact_click", props: { channel: "whatsapp" } };
  }
  if (host.endsWith("calendly.com")) return { event: "book_call_click", props: {} };

  const internal = host === currentHost.replace(/^www\./, "") || host === "localhost";
  if (internal) {
    if (url.pathname.startsWith("/resume/")) return { event: "resume_download", props: {} };
    const work = url.pathname.match(/^\/work\/([^/]+)\/?$/);
    if (work) return { event: "case_study_open", props: { slug: work[1] } };
    return null;
  }

  for (const [socialHost, network] of Object.entries(SOCIAL_HOSTS)) {
    if (host === socialHost || host.endsWith(`.${socialHost}`)) {
      return { event: "social_click", props: { network } };
    }
  }

  return { event: "outbound_click", props: { host } };
}
