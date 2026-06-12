import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "@tanstack/react-router";

gsap.registerPlugin(ScrollTrigger);

/* Page-transition overlay adapted from Blake Bowen's "shape overlays" pen.
   Two layered gradient paths sweep across the screen with a multi-point wavy
   edge and staggered per-point delays. A navigation runs cover -> swap route
   -> reveal so the route change is hidden behind the sweep. */

const NUM_POINTS = 10;
const COVER_DURATION = 0.7;
const POINT_STAGGER_MAX = 0.3;
const PATH_STAGGER = 0.16;

type Mode = "cover" | "reveal";

type NavFn = (to: string, hash?: string) => void;

/* True once the user has performed any client-side navigation (navbar or
   back/forward). Lets pages distinguish a direct landing (fresh document
   load) from an in-app route switch — e.g. the hero intro only plays on
   direct landings. Module state resets on a hard reload by definition. */
/* `covering` is true only while the overlay fully hides the screen (between the
   cover sweep finishing and the reveal starting). Destination pages use it to
   run otherwise-visible warm-up work (layer creation, first scaled raster)
   under the cover, so the user's first scroll isn't the first time that happens. */
export const navState = { hasNavigated: false, covering: false };

/* Page-readiness gate. A destination page can keep the transition fully
   covered until it's ready to be scrolled — e.g. the gallery decodes its
   images and builds its scroll tween before letting the reveal play. Call
   holdTransition() on mount; it returns a release() to call when ready. */
let pendingHolds = 0;
let holdWaiters: Array<() => void> = [];

export function holdTransition(): () => void {
  pendingHolds += 1;
  let released = false;
  return () => {
    if (released) return;
    released = true;
    pendingHolds = Math.max(0, pendingHolds - 1);
    if (pendingHolds === 0) {
      const waiters = holdWaiters;
      holdWaiters = [];
      waiters.forEach((w) => w());
    }
  };
}

function resetHolds() {
  pendingHolds = 0;
  holdWaiters = [];
}

function waitForReady(maxMs: number): Promise<void> {
  if (pendingHolds === 0) return Promise.resolve();
  return new Promise<void>((resolve) => {
    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      resolve();
    };
    holdWaiters.push(finish);
    // Fallback so a page that never releases can't hang the transition.
    setTimeout(finish, maxMs);
  });
}

const TransitionContext = createContext<NavFn>(() => {});

export const useTransitionNavigate = () => useContext(TransitionContext);

function buildPath(points: number[], mode: Mode): string {
  let d = `M 0 ${points[0]} C`;
  for (let j = 0; j < NUM_POINTS - 1; j++) {
    const p = ((j + 1) / (NUM_POINTS - 1)) * 100;
    const cp = p - (100 / (NUM_POINTS - 1)) / 2;
    d += ` ${cp} ${points[j]} ${cp} ${points[j + 1]} ${p} ${points[j + 1]}`;
  }
  // cover fills from the top edge down to the wavy edge; reveal fills from the
  // wavy edge down to the bottom. Both render "full" at their start endpoint.
  d += mode === "cover" ? " V 0 H 0 Z" : " V 100 H 0 Z";
  return d;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const overlayRef = useRef<SVGSVGElement>(null);
  const pathRefs = [useRef<SVGPathElement>(null), useRef<SVGPathElement>(null)];
  const points = useRef<number[][]>([
    new Array(NUM_POINTS).fill(100),
    new Array(NUM_POINTS).fill(100),
  ]);
  const busy = useRef(false);

  const render = useCallback((mode: Mode) => {
    pathRefs.forEach((ref, i) => {
      ref.current?.setAttribute("d", buildPath(points.current[i], mode));
    });
  }, []);

  // Animate every point 0 -> 100; the mode only swaps the fill direction.
  const animate = useCallback(
    (mode: Mode) =>
      new Promise<void>((resolve) => {
        points.current = points.current.map(() => new Array(NUM_POINTS).fill(0));
        render(mode);

        const tl = gsap.timeline({
          defaults: { ease: "power2.inOut", duration: COVER_DURATION },
          onUpdate: () => render(mode),
          onComplete: resolve,
        });

        const pointDelays = Array.from(
          { length: NUM_POINTS },
          () => Math.random() * POINT_STAGGER_MAX,
        );

        points.current.forEach((arr, i) => {
          // On cover the front path trails; on reveal it leads — gives depth.
          const pathDelay = PATH_STAGGER * (mode === "cover" ? i : pathRefs.length - 1 - i);
          for (let j = 0; j < NUM_POINTS; j++) {
            tl.to(arr, { [j]: 100 }, pointDelays[j] + pathDelay);
          }
        });
      }),
    [render],
  );

  const transitionNavigate = useCallback<NavFn>(
    (to, hash) => {
      if (busy.current) return;
      navState.hasNavigated = true;
      // Clear any stale holds; the destination page registers fresh ones on mount.
      resetHolds();

      const reduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Jump the destination to the top (or the target hash) with no smooth
      // tween — Lenis would otherwise keep the old scroll position briefly.
      const resetScroll = () => {
        if (window.__lenis) {
          window.__lenis.scrollTo(hash ? `#${hash}` : 0, { immediate: true, force: true, offset: 0 });
        } else {
          window.scrollTo(0, 0);
        }
      };

      if (reduced) {
        Promise.resolve(navigate({ to, hash })).then(() => {
          requestAnimationFrame(() => {
            resetScroll();
            ScrollTrigger.refresh();
          });
        });
        return;
      }

      busy.current = true;
      const overlay = overlayRef.current;
      if (overlay) overlay.style.pointerEvents = "auto";
      // Freeze smooth scroll for the duration so its RAF work doesn't compete
      // with the sweep and so the user can't scroll mid-transition.
      window.__lenis?.stop();

      const release = () => {
        navState.covering = false;
        points.current = points.current.map(() => new Array(NUM_POINTS).fill(100));
        render("reveal");
        if (overlay) overlay.style.pointerEvents = "none";
        window.__lenis?.start();
        busy.current = false;
      };

      // Resolve after `n` animation frames — used to let the main thread fully
      // settle (decode/layout/raster flushed) before the reveal timeline starts,
      // otherwise GSAP, being time-based, skips the stalled early frames.
      const afterFrames = (n: number) =>
        new Promise<void>((r) => {
          const step = (k: number) =>
            k <= 0 ? r() : requestAnimationFrame(() => step(k - 1));
          step(n);
        });

      animate("cover")
        // Screen is now fully covered — pages may run warm-up work invisibly.
        .then(() => {
          navState.covering = true;
        })
        // Wait for the destination route to actually settle before continuing —
        // navigate() is async, so without awaiting it the reveal could expose a
        // half-mounted page. All of this happens while the overlay fully covers.
        .then(() => Promise.resolve(navigate({ to, hash })))
        .then(
          () =>
            new Promise<void>((r) => {
              // Two frames: one for React to commit the new route + run its
              // effects (which create its ScrollTriggers), one for layout.
              requestAnimationFrame(() =>
                requestAnimationFrame(() => {
                  resetScroll();
                  // Re-measure all triggers against the new page's layout so the
                  // bento scrub etc. don't jump once revealed.
                  ScrollTrigger.refresh();
                  r();
                }),
              );
            }),
        )
        // Hold the cover until the destination page reports it's ready to be
        // scrolled (e.g. gallery images decoded). Capped so it can't hang.
        .then(() => waitForReady(3000))
        // Let decode/refresh/first-paint flush so the reveal starts on a calm
        // main thread — this is what kept the reveal from skipping frames.
        .then(() => afterFrames(3))
        .then(() => {
          navState.covering = false;
          return animate("reveal");
        })
        .then(release)
        .catch(release);
    },
    [animate, navigate, render],
  );

  useEffect(() => {
    render("reveal");
    // Back/forward navigation also counts as an in-app route switch.
    const onPop = () => {
      navState.hasNavigated = true;
    };
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [render]);

  return (
    <TransitionContext.Provider value={transitionNavigate}>
      {children}
      <svg
        ref={overlayRef}
        className="route-transition"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          {/* Site theme: wine red sweep backed by a near-black layer */}
          <linearGradient id="rt-grad-1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9a1f1f" />
            <stop offset="100%" stopColor="#4a0d0d" />
          </linearGradient>
          <linearGradient id="rt-grad-2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1d" />
            <stop offset="100%" stopColor="#0e0e10" />
          </linearGradient>
        </defs>
        <path ref={pathRefs[0]} fill="url(#rt-grad-1)" />
        <path ref={pathRefs[1]} fill="url(#rt-grad-2)" />
      </svg>
    </TransitionContext.Provider>
  );
}
