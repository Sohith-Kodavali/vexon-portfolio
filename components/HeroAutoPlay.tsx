"use client";

import { useEffect } from "react";
import { gsap, registerGsap } from "@/lib/gsap";
import { stage } from "@/lib/zoom";

/** How long the hero's exit animation takes once it starts. */
const DURATION = 2.2;

/**
 * Plays the hero's exit animation on its own, once, as soon as the hero has
 * loaded — the wordmark settling smaller (camera dolly) and the 3D pointer
 * leaving — the motion you would otherwise only get by scrolling, but here it is
 * independent of the page scroll and simply holds when it finishes.
 *
 * It publishes progress as `stage.heroAnim`, which the camera folds into its
 * dolly and the pointer folds into its exit.
 */
export default function HeroAutoPlay() {
  useEffect(() => {
    registerGsap();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let started = false;
    let tween: gsap.core.Tween | null = null;

    const run = () => {
      if (started) return;
      started = true;

      const proxy = { p: 0 };
      tween = gsap.to(proxy, {
        p: 1,
        duration: DURATION,
        ease: "power2.inOut",
        onUpdate: () => {
          stage.heroAnim = proxy.p;
        }
      });
    };

    // The loader fires app:ready when it finishes; the timeout is a failsafe in
    // case that signal is missed.
    if (document.documentElement.dataset.ready === "1") run();
    window.addEventListener("app:ready", run, { once: true });
    const failsafe = window.setTimeout(run, 5200);

    return () => {
      window.clearTimeout(failsafe);
      window.removeEventListener("app:ready", run);
      tween?.kill();
    };
  }, []);

  return null;
}
