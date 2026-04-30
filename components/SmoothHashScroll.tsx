"use client";

import { useEffect } from "react";

const NAV_OFFSET = 80; // px — height of fixed navbar
const MIN_DURATION = 300;
const MAX_DURATION = 700;

/**
 * Intercepts in-page hash anchors and:
 *   1. Smooth-scrolls (custom RAF, faster than browser default)
 *   2. Accounts for the fixed navbar so the section header isn't hidden
 *   3. Cleans the URL (no `#section` visible)
 *
 * Capture-phase listener runs before Next.js Link.
 */
export function SmoothHashScroll() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const a = target.closest("a") as HTMLAnchorElement | null;
      if (!a) return;
      if (a.target && a.target !== "" && a.target !== "_self") return;

      const href = a.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;

      const id = href.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      e.stopPropagation();

      const startY = window.scrollY;
      const elTop = el.getBoundingClientRect().top + startY;
      const targetY = Math.max(elTop - NAV_OFFSET, 0);
      const distance = targetY - startY;

      // Respect reduced-motion users
      const prefersReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReduced || distance === 0) {
        window.scrollTo(0, targetY);
      } else {
        // Duration scales with distance, clamped to feel snappy
        const duration = Math.min(
          Math.max(Math.abs(distance) / 3, MIN_DURATION),
          MAX_DURATION
        );
        const startTime = performance.now();

        function step(now: number) {
          const elapsed = now - startTime;
          const t = Math.min(elapsed / duration, 1);
          // ease-out cubic — fast start, gentle land
          const eased = 1 - Math.pow(1 - t, 3);
          window.scrollTo(0, startY + distance * eased);
          if (t < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      }

      const cleanUrl = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", cleanUrl);
    }

    document.addEventListener("click", onClick, { capture: true });
    return () =>
      document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
