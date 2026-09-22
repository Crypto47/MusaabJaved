"use client";

import { eventForHref, track } from "@/utils/analytics";
import posthog from "posthog-js";
import { useEffect } from "react";

/**
 * Boots PostHog and turns link clicks into named events.
 *
 * - Off unless NEXT_PUBLIC_POSTHOG_KEY is set, so local dev sends nothing.
 * - Requests go through /ingest on this origin (rewrites in next.config.mjs),
 *   which keeps ad blockers from dropping them.
 * - Memory-only persistence: no cookies, no localStorage, no consent banner.
 *   Returning visitors are not stitched across visits; if that matters later,
 *   switch to `cookieless_mode: "always"` after enabling "cookieless server
 *   hash mode" in the PostHog project settings.
 * - One delegated click listener maps every <a href> to an event via
 *   eventForHref, so server-rendered CTAs need no client code of their own.
 */
export function PostHogAnalytics() {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    if (!posthog.__loaded) {
      const ingestHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";
      posthog.init(key, {
        api_host: "/ingest",
        ui_host: ingestHost.replace(".i.posthog.com", ".posthog.com"),
        defaults: "2026-08-30",
        persistence: "memory",
        capture_pageleave: true,
      });
    }

    const onClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;
      const hit = eventForHref(anchor.href, window.location.host);
      if (!hit) return;
      track(hit.event, {
        ...hit.props,
        label: (anchor.textContent ?? "").trim().slice(0, 80),
        href: anchor.href,
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
