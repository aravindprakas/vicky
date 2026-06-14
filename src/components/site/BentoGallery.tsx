import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { holdTransition, navState } from "@/components/site/RouteTransition";
import { isLiteDevice, useLiteMode } from "@/hooks/use-lite-mode";

import img1 from "@/assets/gallery-one.jpg";
import img2 from "@/assets/gallery-two.jpg";
// Center tile (nth-child(3)) — fills the screen on expand.
import img3 from "@/assets/gallery-four.jpg";
import img4 from "@/assets/gallery-three.jpg";
import img5 from "@/assets/gallery-five.jpg";
import img6 from "@/assets/gallery-six.jpg";
import img7 from "@/assets/gallery-seven.jpg";
import img8 from "@/assets/gallery-eight.jpg";

gsap.registerPlugin(ScrollTrigger, Flip);

const IMAGES = [img1, img2, img3, img4, img5, img6, img7, img8];
const BEBAS = "'Bebas Neue', sans-serif";
const RED = "#9a1f1f";

export function BentoGallery() {
  const lite = useLiteMode();
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Mobile/tablet renders a plain image grid below — skip the Flip scrub,
    // the image-decode warm-up and the route-transition hold entirely.
    if (isLiteDevice()) return;
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section || !gallery) return;

    const items = gallery.querySelectorAll<HTMLElement>(".bento-item");

    const lenisScrollUpdate = ScrollTrigger.update.bind(ScrollTrigger);
    window.__lenis?.on("scroll", lenisScrollUpdate);

    let ctx: gsap.Context | null = null;
    let scrubTl: gsap.core.Timeline | null = null;

    const createTween = () => {
      ctx?.revert();
      gallery.classList.remove("bento-final");

      ctx = gsap.context(() => {
        gallery.classList.add("bento-final");
        const flipState = Flip.getState(items);
        gallery.classList.remove("bento-final");

        const flip = Flip.to(flipState, {
          simple: true,
          ease: "power2.inOut",
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.5,
          },
        });
        tl.add(flip);
        scrubTl = tl;

        return () => gsap.set(items, { clearProps: "all" });
      });
    };

    createTween();
    window.addEventListener("resize", createTween);

    const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

    // Drive the scrub timeline through its full range once, with real paint
    // frames, so the browser does its first-time work (compositor layers, GSAP
    // Flip's lazy build, rasterizing the images at the scaled-up size) NOW.
    // Only run while the transition overlay covers the screen so it's invisible;
    // on a direct page load there's no cover, so we skip it.
    const warmUp = async () => {
      if (!navState.covering || !scrubTl) return;
      try {
        scrubTl.progress(1, true);
        await nextFrame();
        scrubTl.progress(0, true);
        await nextFrame();
      } catch {
        scrubTl?.progress(0, true);
      }
    };

    // Keep the route transition covered until every image is decoded, the tween
    // is measured, and the scroll pipeline is warmed — so the first real scroll
    // is smooth instead of janking on first-time work.
    const release = holdTransition();
    let released = false;
    const ready = async () => {
      if (released) return;
      released = true;
      ScrollTrigger.refresh();
      await warmUp();
      // One frame so everything settles while still covered.
      requestAnimationFrame(release);
    };

    const imgs = Array.from(gallery.querySelectorAll("img"));
    Promise.all(
      imgs.map((img) => (img.decode ? img.decode().catch(() => undefined) : Promise.resolve())),
    ).then(ready);
    // Safety net in case decode stalls (e.g. a broken image).
    const readyTimer = window.setTimeout(ready, 2500);

    return () => {
      window.clearTimeout(readyTimer);
      release();
      window.removeEventListener("resize", createTween);
      ctx?.revert();
      window.__lenis?.off("scroll", lenisScrollUpdate);
    };
  }, []);

  // Mobile/tablet: a simple, responsive image grid. No scroll-driven scaling.
  if (lite) {
    return (
      <section id="gallery" className="gallery-lite" style={{ background: "#121214" }}>
        <div className="gallery-lite-head">
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: "clamp(2.5rem, 14vw, 5rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#f5f4f2" }}>VISUAL</span>
            <span
              style={{ display: "block", color: "transparent", WebkitTextStroke: `2px ${RED}` }}
            >
              DIARY.
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(0.65rem, 3vw, 0.8rem)",
              letterSpacing: "0.2em",
              color: "rgba(245,244,242,0.35)",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            frames from the road
          </p>
        </div>

        <div className="gallery-lite-grid">
          {IMAGES.map((src, i) => (
            <img key={i} src={src} alt="" loading="lazy" decoding="async" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="bento-section"
      style={{ background: "#121214" }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          padding: "clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 3.5rem)",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: BEBAS,
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.02em",
            }}
          >
            <span style={{ color: "#f5f4f2" }}>VISUAL</span>
            <span
              style={{
                display: "block",
                color: "transparent",
                WebkitTextStroke: `2px ${RED}`,
              }}
            >
              DIARY.
            </span>
          </div>
          <p
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
              letterSpacing: "0.2em",
              color: "rgba(245,244,242,0.35)",
              textTransform: "uppercase",
              paddingBottom: "0.4em",
              margin: 0,
            }}
          >
            scroll to explore
          </p>
        </div>
      </div>

      <div className="bento-wrap">
        <div ref={galleryRef} className="bento-gallery">
          {IMAGES.map((src, i) => (
            <div key={i} className="bento-item">
              <img src={src} alt="" loading="eager" decoding="async" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
