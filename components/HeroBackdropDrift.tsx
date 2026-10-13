"use client";

import { useEffect } from "react";
import { onTick } from "@/lib/ticker";

/** Seconds the backdrop takes to ease from rest into the drift. */
const RAMP = 2.8;
/** Parallax offset the backdrop settles into, CSS px. */
const TARGET_X = -26;
const TARGET_Y = 34;
/** Slow breathing around the settled offset, so it never sits perfectly still. */
const BREATHE_X = 10;
const BREATHE_Y = 12;

/**
 * Eases the hero backdrop into a slow parallax drift once the loader is gone —
 * the "alive" motion you get from scrolling, but automatic and with the text
 * completely still.
 *
 * It writes `--ox` / `--oy`, which only the decorative `.hero-backdrop` layers
 * (and the grid) consume; nothing about the page's layout or scroll position
 * changes. The page sits perfectly normal until the loader signals `app:ready`,
 * then the offset eases in over RAMP seconds and breathes gently from there, so
 * the effect is never wasted waiting for a first scroll.
 */
export default function HeroBackdropDrift() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const root = document.documentElement;
    let started = 0;

    const begin = () => {
      if (started === 0) started = performance.now();
    };

    // The loader fires app:ready when it finishes; the timeout is a failsafe so
    // a missed signal still ends up with a living backdrop.
    if (root.dataset.ready === "1") begin();
    window.addEventListener("app:ready", begin, { once: true });
    const failsafe = window.setTimeout(begin, 5200);

    return onTick(() => {
      if (started === 0) return;
      const seconds = (performance.now() - started) / 1000;

      const eased = 1 - Math.pow(1 - Math.min(1, seconds / RAMP), 3);
      const breath = seconds > RAMP ? Math.min(1, (seconds - RAMP) / 3.5) : 0;
      const phase = (seconds - RAMP) * 0.28;

      const ox = TARGET_X * eased + Math.sin(phase) * BREATHE_X * breath;
      const oy = TARGET_Y * eased + Math.cos(phase * 0.85) * BREATHE_Y * breath;

      root.style.setProperty("--ox", `${ox.toFixed(2)}px`);
      root.style.setProperty("--oy", `${oy.toFixed(2)}px`);
    });
  }, []);

  return null;
}
