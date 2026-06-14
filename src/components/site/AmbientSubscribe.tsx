import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLiteDevice } from "@/hooks/use-lite-mode";
import { SubscribeButton } from "@/components/site/SubscribeButton";

gsap.registerPlugin(ScrollTrigger);

/* Ambient-blobs subscribe CTA — design component 29 ("Ambient blobs: soft drift
   + scroll parallax"), recolored to the site's wine-red palette and built around
   the Subscribe button instead of the original centered label. */
export function AmbientSubscribe() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Static blobs on mobile/tablet — skip the per-frame drift and scroll
    // parallax (large blurred layers are expensive to recomposite there).
    if (isLiteDevice()) return;
    const card = cardRef.current;
    if (!card) return;
    const blobs = Array.from(card.querySelectorAll<HTMLElement>(".atmos-blob"));
    if (!blobs.length) return;

    // Soft, continuous drift — only advances while the card is on-screen.
    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(card);

    let t = 0;
    const onTick = (_time: number, delta: number) => {
      if (!visible) return;
      t += delta * 0.001;
      blobs.forEach((b, i) => {
        const x = Math.sin(t * (0.6 + i * 0.2) + i) * 40;
        const y = Math.cos(t * (0.5 + i * 0.25) + i) * 40;
        gsap.set(b, { x, y });
      });
    };
    gsap.ticker.add(onTick);

    // Parallax drift as the section scrolls through the viewport.
    const tween = gsap.to(blobs, {
      yPercent: (i: number) => (i % 2 ? 18 : -18),
      ease: "none",
      scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
    });

    return () => {
      gsap.ticker.remove(onTick);
      io.disconnect();
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="atmos" aria-label="Subscribe on YouTube">
      <div className="atmos-card" ref={cardRef}>
        <div className="atmos-blob b1" aria-hidden="true" />
        <div className="atmos-blob b2" aria-hidden="true" />
        <div className="atmos-blob b3" aria-hidden="true" />
        <div className="atmos-content">
          <p className="atmos-eyebrow">VickyVlogs on YouTube</p>
          <h2 className="atmos-title">Never miss a drop.</h2>
          <SubscribeButton />
        </div>
      </div>
    </section>
  );
}
