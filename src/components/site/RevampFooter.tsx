/* Footer — white, minimal. Giant wordmark, socials row, fine print.
   Ported from the revamp design (red/white monotone). */

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLiteDevice } from "@/hooks/use-lite-mode";

gsap.registerPlugin(ScrollTrigger);

const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/vickyvlogs_/" },
  { label: "YouTube", href: "https://www.youtube.com/@vickyvlogs.entertainment" },
  { label: "Facebook", href: "https://www.facebook.com/mass.vicky.178061" },
];

export function RevampFooter() {
  /* Design "Live Components II" #39 — gradient-filled headline. A red↔black
     gradient lives inside the wordmark (background-clip: text) and its
     horizontal position is scrubbed by scroll, so the band sweeps through the
     letters as the footer enters view. Desktop only; lite devices keep the
     static gradient fill (see the inline default background-position). */
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLiteDevice()) return;
    const el = wordmarkRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { backgroundPositionX: "100%" },
      {
        backgroundPositionX: "0%",
        ease: "none",
        scrollTrigger: { trigger: el, start: "top 88%", end: "bottom 30%", scrub: true },
      },
    );
    const trigger = ScrollTrigger.getAll().at(-1);

    return () => {
      trigger?.kill();
    };
  }, []);

  return (
    <footer
      id="contact"
      className="revamp"
      style={{
        background: "radial-gradient(700px 420px at 8% 110%, rgba(154,31,31,.28), transparent 60%)",
        color: "#f5f4f2",
        paddingTop: "clamp(60px, 8vw, 110px)",
        overflow: "hidden",
      }}
    >
      <div className="shell">
        <div
          ref={wordmarkRef}
          data-rise=""
          style={{
            fontFamily: "var(--f-display)",
            fontSize: "clamp(2.5rem, 13vw, 12rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.04em",
            textTransform: "uppercase",
            marginBottom: 48,
            // #39 gradient-filled headline — red & black only, sized wider than
            // the text so scroll can scrub the band across the letters. The 200%
            // height + centred Y keep the gradient over the serif descenders (the
            // "g" tail in vlogs.) instead of clipping them transparent.
            backgroundImage:
              "linear-gradient(115deg, #c0392b, #000 32%, #c0392b 52%, #000 72%, #c0392b)",
            backgroundSize: "220% 200%",
            backgroundPositionY: "center",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            willChange: "background-position",
          }}
        >
          Vicky
          <span
            className="serif"
            style={{
              color: "transparent",
              WebkitTextFillColor: "transparent",
              textTransform: "none",
            }}
          >
            vlogs.
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
            paddingBottom: 28,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--f-display)",
                  fontSize: "1.05rem",
                  letterSpacing: "-0.01em",
                  color: "#f5f4f2",
                  transition: "opacity .25s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <span style={{ width: 6, height: 6, borderRadius: 999, background: "#c0392b" }} />
                {s.label}
                <span className="mono" style={{ fontSize: 9, opacity: 0.6 }}>
                  ↗
                </span>
              </a>
            ))}
          </div>
          <div className="serif" style={{ fontSize: "1.1rem", opacity: 0.55, color: "#f5f4f2" }}>
            Comedy, vlogs &amp; brand stories from India.
          </div>
        </div>

        <div
          style={{
            padding: "22px 0 40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div className="mono" style={{ opacity: 0.5, fontSize: 9 }}>
            © {new Date().getFullYear()} VickyVlogs
          </div>
          <div className="mono" style={{ opacity: 0.5, fontSize: 9 }}>
            Designed &amp; developed by{" "}
            <a
              href="https://www.aravindprakash.in/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--red)", textDecoration: "underline", textUnderlineOffset: 3 }}
            >
              Aravind Prakash ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
