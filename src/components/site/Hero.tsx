import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-vicky.png";
import { navState } from "@/components/site/RouteTransition";
import { isLiteDevice } from "@/hooks/use-lite-mode";

type Testimonial = {
  word: string;
  name: string;
  role: string;
  className: string;
};

const testimonials: Testimonial[] = [
  {
    word: "VISIONARY",
    name: "HEMANT CHARYA",
    role: "Ex. Product Development & Head, Reliance Big Flix",
    className: "left-[3%] top-[18%] text-left",
  },
  {
    word: "VERSATILE",
    name: "ALOK ANAND",
    role: "APAC Marketing Director, Kramer Electronics Asia Pacific",
    className: "left-[22%] top-[10%] text-left",
  },
  {
    word: "ADAPTABLE",
    name: "ROHAN CHANDHOK",
    role: "Director & Head of Field & Partner Marketing APAC · SUSE",
    className: "left-[20%] top-[36%] text-left",
  },
  {
    word: "PROACTIVE",
    name: "ADRIAN ORNIK",
    role: "Global Growth Leader at EY.",
    className: "left-[3%] top-[48%] text-left",
  },
  {
    word: "DEDICATED",
    name: "ROBERT SOVEREIGN-SMITH",
    role: "Editor-in-Chief, Digit",
    className: "right-[20%] top-[10%] text-right",
  },
  {
    word: "INSPIRING",
    name: "VIJAY RAMACHANDRAN",
    role: "Ex. Editor-in-Chief, IDG",
    className: "right-[3%] top-[18%] text-right",
  },
  {
    word: "TRAILBLAZER",
    name: "KABIR MALKANI",
    role: "Creative Director, CIT, Inc.",
    className: "right-[20%] top-[36%] text-right",
  },
  {
    word: "MASTERFUL",
    name: "PHIL CLEVENGER",
    role: "VP, Product Experience Docusign · Ex Adobe Sr. Director, UX",
    className: "right-[3%] top-[48%] text-right",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-cream/60 mb-1.5 text-[10px] tracking-[0.3em]">
      ★ ★ ★ ★ ★
    </div>
  );
}

export function Hero() {
  const [scrollY, setScrollY] = useState(0);
  // Intro only on a direct landing (fresh document load), not when the user
  // switches back to the homepage from another route.
  const [withIntro] = useState(() => !navState.hasNavigated);
  const el = withIntro ? "hero-el" : "";

  useEffect(() => {
    // On mobile/tablet skip the scroll-driven parallax entirely: it re-renders
    // the whole hero (portrait + 8 testimonials) on every scroll frame for a
    // subtle effect that isn't worth the jank. scrollY stays 0 → identity transforms.
    if (isLiteDevice()) return;
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative bg-black text-cream overflow-hidden">
      {/* Intro: the full hero pops up as a miniature card, holds a beat, then
          smoothly zooms up into the full-size banner (from the Claude Design handoff). */}
      <div className={`${withIntro ? "hero-intro-mask" : ""} relative min-h-[100svh] w-full flex items-center`}>
      {/* Grain / vignette */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, transparent 0%, transparent 40%, #000 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Huge background name — slowest layer
          IMPORTANT: override only --tw-translate-y so -translate-x-1/2 & -translate-y-1/2 still compose */}
      {/* <span
        aria-hidden
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,22vw,20rem)] leading-none text-cream/[0.4] whitespace-nowrap"
        style={{ "--tw-translate-y": `calc(-50% + ${scrollY * 0.15}px)` } as React.CSSProperties}
      >
        VICKY
      </span> */}

      <div className="container-brand relative w-full pt-4 md:pt-6 pb-16 md:pb-20">
        {/* Portrait — no existing Tailwind transforms, safe to set transform directly */}
        <div
          className={`${el} relative mx-auto w-[min(620px,85vw)] aspect-[3/4] -mt-8 md:-mt-16`}
          style={{ transform: `translateY(${scrollY * 0.25}px)`, "--hero-d": "0.4s" } as React.CSSProperties}
        >
          <img
            src={heroImage}
            alt="Vicky — comedy creator, vlogger and brand storyteller"
            className="h-full w-full object-contain"
          />
          {/* Fade bottom + side edges into black background */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: [
                "linear-gradient(to top,    #000 0%, transparent 28%)",
                "linear-gradient(to right,  #000 0%, transparent 18%)",
                "linear-gradient(to left,   #000 0%, transparent 18%)",
              ].join(", "),
            }}
          />
        </div>

        {/* Floating testimonials — no existing transforms, safe */}
        <div className="absolute inset-0 hidden md:block pointer-events-none">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`${el} absolute max-w-[170px] ${t.className} text-cream/55`}
              style={{ transform: `translateY(${scrollY * 0.4}px)`, "--hero-d": `${0.85 + i * 0.05}s` } as React.CSSProperties}
            >
              <div className={t.className.includes("text-right") ? "flex flex-col items-end" : "flex flex-col items-start"}>
                <Stars />
                <div className="font-display text-lg md:text-xl text-cream/85 tracking-wide leading-none">
                  {t.word}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom tagline — has md:-translate-x-1/2, override only --tw-translate-y */}
        <div
          className={`${el} relative mt-6 text-center z-10`}
          style={{ "--tw-translate-y": `${scrollY * 0.1}px`, "--hero-d": "0.65s" } as React.CSSProperties}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: '"Anton", system-ui, sans-serif',
              fontSize: "clamp(2.5rem, 13vw, 12rem)",
              lineHeight: 0.82,
              letterSpacing: "-0.04em",
              textTransform: "uppercase",
              color: "#f5f4f2",
            }}
          >
            Vicky
            <span
              style={{
                fontFamily: '"Playfair Display", Georgia, serif',
                fontStyle: "italic",
                fontWeight: 400,
                letterSpacing: "-0.01em",
                color: "#c0392b",
                textTransform: "none",
              }}
            >
              vlogs.
            </span>
          </h1>
        </div>
      </div>
      </div>
    </section>
  );
}