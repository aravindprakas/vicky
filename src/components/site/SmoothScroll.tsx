import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window { __lenis?: Lenis }
}

export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      // Longer settle (duration) + lower multipliers = slower, smoother glide.
      // Note: with duration+easing set, Lenis uses that path and ignores `lerp`.
      duration: 2.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.0,
      lerp: 0.07,
    });
    window.__lenis = lenis;

    // Keep GSAP ScrollTrigger in sync with Lenis virtual scroll.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis off the GSAP ticker (a single shared RAF loop) instead of its
    // own requestAnimationFrame. GSAP's ticker time is in seconds, so ×1000.
    // Crucially, GSAP lag-smoothing (on by default) clamps the giant time delta
    // produced when a backgrounded/idle tab regains focus — so Lenis never gets
    // fed minutes of elapsed time at once, which was the post-idle scroll jank.
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(500, 33);

    return () => {
      gsap.ticker.remove(tick);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  return null;
}
