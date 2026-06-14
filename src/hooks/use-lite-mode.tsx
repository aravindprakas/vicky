import * as React from "react";

/* "Lite" devices: phones and tablets (≤1024px, covers iPad landscape), any
   coarse-pointer device, or anyone who prefers reduced motion. On these we skip
   the per-frame canvas / scroll-parallax / GSAP-scrub work that only pays off
   with a desktop pointer, and render simpler static layouts instead. */
export const LITE_QUERY =
  "(max-width: 1024px), (pointer: coarse), (prefers-reduced-motion: reduce)";

/* Imperative check for inside effects — lets a component bail out of expensive
   setup on the very first mount, before the useLiteMode state has settled, so
   the heavy work never starts on mobile (not even for a frame). */
export function isLiteDevice() {
  return typeof window !== "undefined" && window.matchMedia(LITE_QUERY).matches;
}

/* Reactive flag for choosing which JSX to render. Starts `false` so server and
   first client render agree (no hydration mismatch), then settles after mount. */
export function useLiteMode() {
  const [lite, setLite] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(LITE_QUERY);
    const onChange = () => setLite(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return lite;
}
