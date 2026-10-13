"use client";

import { useEffect } from "react";
import { getLenis } from "@/lib/scroll";

/** How far the hero scrolls itself, as a fraction of the viewport. Deep enough
 *  to reach the colour grade and the hero's exit animation. */
const DEPTH = 0.7;
const DOWN_MS = 1300;
const HOLD_MS = 750;
const UP_MS = 1500;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/**
 * Plays the hero's scroll-driven effect automatically once the loader is gone —
 * the backdrop/colour-grade animation you would otherwise only see after a
 * manual scroll — then eases back to the top so the page ends exactly where it
 * started.
 *
 * Any real user input (wheel, touch, key, click) cancels it immediately, so it
 * can never fight someone who starts scrolling during the intro.
 */
export default function AutoScrollIntro() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let started = false;
    let hold = 0;
    let retry = 0;

    const cancel = () => {
      cancelled = true;
      window.clearTimeout(hold);
      window.clearTimeout(retry);
    };

    const start = () => {
      if (started || cancelled) return;

      // Lenis is created by SmoothScroll, a *parent* effect, so it does not
      // exist yet when this child mounts — it only appears by the time the
      // loader signals app:ready. Resolve it lazily and retry if we are early.
      const lenis = getLenis();
      if (!lenis) {
        retry = window.setTimeout(start, 250);
        return;
      }
      started = true;

      window.addEventListener("wheel", cancel, { passive: true, once: true });
      window.addEventListener("touchstart", cancel, { passive: true, once: true });
      window.addEventListener("keydown", cancel, { once: true });
      window.addEventListener("pointerdown", cancel, { once: true });

      lenis.scrollTo(Math.round(window.innerHeight * DEPTH), {
        duration: DOWN_MS / 1000,
        easing: easeInOut,
        onComplete: () => {
          if (cancelled) return;
          hold = window.setTimeout(() => {
            if (cancelled) return;
            lenis.scrollTo(0, { duration: UP_MS / 1000, easing: easeInOut });
          }, HOLD_MS);
        }
      });
    };

    // The loader fires app:ready when it finishes; the timeout is a failsafe in
    // case that signal is missed.
    if (document.documentElement.dataset.ready === "1") start();
    window.addEventListener("app:ready", start, { once: true });
    const failsafe = window.setTimeout(start, 5200);

    return () => {
      window.clearTimeout(failsafe);
      window.clearTimeout(hold);
      window.clearTimeout(retry);
      window.removeEventListener("app:ready", start);
      window.removeEventListener("wheel", cancel);
      window.removeEventListener("touchstart", cancel);
      window.removeEventListener("keydown", cancel);
      window.removeEventListener("pointerdown", cancel);
    };
  }, []);

  return null;
}
