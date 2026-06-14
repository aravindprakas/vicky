import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLiteDevice } from "@/hooks/use-lite-mode";

gsap.registerPlugin(ScrollTrigger);

const rows = [
  [
    { text: "Comedy", ghost: false },
    { text: "Vlogs", ghost: true },
    { text: "Comedy", ghost: false },
    { text: "Vlogs", ghost: true },
    { text: "Comedy", ghost: false },
    { text: "Vlogs", ghost: true },
    { text: "Comedy", ghost: false },
    { text: "Vlogs", ghost: true },
    { text: "Comedy", ghost: false },
    { text: "Vlogs", ghost: true },
  ],
  [
    { text: "Brand Deals", ghost: true },
    { text: "Reels", ghost: false },
    { text: "Brand Deals", ghost: true },
    { text: "Reels", ghost: false },
    { text: "Brand Deals", ghost: true },
    { text: "Reels", ghost: false },
    { text: "Brand Deals", ghost: true },
    { text: "Reels", ghost: false },
    { text: "Brand Deals", ghost: true },
    { text: "Reels", ghost: false },
  ],
  [
    { text: "Voice Work", ghost: false },
    { text: "Creator", ghost: true },
    { text: "Voice Work", ghost: false },
    { text: "Creator", ghost: true },
    { text: "Voice Work", ghost: false },
    { text: "Creator", ghost: true },
     { text: "Voice Work", ghost: false },
    { text: "Creator", ghost: true },
    { text: "Voice Work", ghost: false },
  ],
];

export function OpposingMarquee() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  useEffect(() => {
    // Static rows on mobile/tablet — skip the scroll-scrub ScrollTriggers.
    if (isLiteDevice()) return;
    const section = sectionRef.current;
    if (!section) return;

    const triggers = rowRefs.map((rowRef, i) => {
      const dir = i % 2 === 0 ? -1 : 1;
      gsap.fromTo(
        rowRef.current,
        { xPercent: 0 },
        {
          xPercent: dir * 20,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
      return ScrollTrigger.getAll().at(-1);
    });

    return () => {
      triggers.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        overflow: "hidden",
        padding: "50px 0",
        borderTop: "1px solid rgba(244, 241, 232, 0.12)",
        borderBottom: "1px solid rgba(244, 241, 232, 0.12)",
        display: "grid",
        gap: 10,
        background: "radial-gradient(ellipse 60% 160% at 0% 50%, rgba(200,0,0,0.13) 0%, transparent 65%), #000",
      }}
    >
      {rows.map((row, i) => (
        <div
          key={i}
          ref={rowRefs[i]}
          style={{
            display: "flex",
            gap: 32,
            width: "max-content",
            margin: "0 auto",
            whiteSpace: "nowrap",
            fontSize: "clamp(22px, 3.5vw, 52px)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            willChange: "transform",
            fontFamily: "var(--f-display, 'Helvetica Neue', Helvetica, Arial, sans-serif)",
          }}
        >
          {row.map((item, j) => (
            <span
              key={j}
              style={
                item.ghost
                  ? {
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(244, 241, 232, 0.45)",
                    }
                  : { color: "#f4f1e8" }
              }
            >
              {item.text}
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}
