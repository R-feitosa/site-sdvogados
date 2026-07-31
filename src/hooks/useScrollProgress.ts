import { useEffect, useState } from "react";

/**
 * Scroll listeners are the main source of jank on this site: every wheel tick
 * fires a handler that reads layout and calls setState. These hooks batch the
 * work into a single rAF per frame and only commit state when the value
 * actually changes, so React re-renders on transitions instead of on scroll.
 */

/** True once the page has scrolled past `threshold` pixels. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;
    let current = false;

    const read = () => {
      frame = 0;
      const next = window.scrollY > threshold;
      if (next !== current) {
        current = next;
        setScrolled(next);
      }
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return scrolled;
}

/**
 * Returns the id of the section currently occupying the viewport.
 * Uses IntersectionObserver instead of a scroll handler, so it costs nothing
 * while the user is scrolling between sections.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = "";
        let bestRatio = 0;
        for (const id of ids) {
          const ratio = visibility.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }

        if (best) setActive(best);
      },
      {
        // Discount the area behind the fixed header when deciding what is "in view".
        rootMargin: "-88px 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.6, 1],
      },
    );

    // Sections live in lazily loaded chunks, so they appear over the first few
    // frames. Keep looking until every id has been found (or we give up).
    const observed = new Set<string>();
    let attempts = 0;

    const attach = () => {
      for (const id of ids) {
        if (observed.has(id)) continue;
        const element = document.getElementById(id);
        if (element) {
          observed.add(id);
          observer.observe(element);
        }
      }
      return observed.size === ids.length;
    };

    let timer = 0;
    const poll = () => {
      if (attach() || ++attempts > 40) return;
      timer = window.setTimeout(poll, 150);
    };
    poll();

    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [ids]);

  return active;
}

/** Respects the OS "reduce motion" setting so animations can be skipped entirely. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(query.matches);
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
