import { useEffect, useRef, useState } from "react";

/* Manifesto — the text section under the marquee in the revamp design.
   Scroll-driven word-fill headline + a hairline stat row. Lots of air. */

const SENTENCE = ["Comedy", "that", "earns", "watch-time", "—", "and", "brands", "people", "remember."];

export function RevampManifesto() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="manifesto"
      className="revamp"
      style={{
        background: "radial-gradient(900px 600px at 90% -8%, rgba(154,31,31,.30), transparent 58%)",
        color: "#f5f4f2",
        padding: "clamp(110px, 16vw, 220px) 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="shell">
        <h2
          style={{
            fontFamily: "var(--f-display)",
            fontSize: "clamp(2.4rem, 7vw, 6.5rem)",
            lineHeight: 1.02,
            letterSpacing: "-0.025em",
            textTransform: "uppercase",
            color: "#ffffff",
          }}
        >
          {SENTENCE.map((w, i) => (
            <span
              key={i}
              className="wordfill"
              style={{
                display: "inline-block",
                marginRight: w === "—" ? 0 : "0.22em",
                animationDelay: `${i * 40}ms`,
              }}
            >
              {w === "remember." ? (
                <span
                  style={{
                    fontFamily: "var(--f-display)",
                    color: "transparent",
                    WebkitTextStroke: "2px #c0392b",
                  }}
                >
                  {w}
                </span>
              ) : (
                w
              )}
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
