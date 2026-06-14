import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { isLiteDevice, useLiteMode } from "@/hooks/use-lite-mode";

gsap.registerPlugin(ScrollTrigger);

const INK = "#f4f1e8";

const cards = [
  {
    heading: "Comedy that earns watch-time.",
    offset: { x: "-6%", y: "-24%" },
    z: 3,
  },
  {
    heading: "Brand deals built to convert.",
    offset: { x: "6%", y: "0%" },
    z: 2,
  },
  {
    heading: "Voice work heard everywhere.",
    offset: { x: "-4%", y: "24%" },
    z: 1,
  },
];

export function FocusBlurSection() {
  const lite = useLiteMode();
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fc1 = useRef<HTMLHeadingElement>(null);
  const fc2 = useRef<HTMLHeadingElement>(null);
  const fc3 = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Skip the per-frame dot-field canvas + pinned blur-rack on mobile/tablet.
    if (isLiteDevice()) return;
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    // ── dot field background ──
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    let ctx = canvas.getContext("2d")!;
    let W = 0,
      H = 0;

    function sizeCanvas() {
      const rect = stage!.getBoundingClientRect();
      canvas!.width = Math.max(1, rect.width * DPR);
      canvas!.height = Math.max(1, rect.height * DPR);
      ctx = canvas!.getContext("2d")!;
      W = canvas!.width;
      H = canvas!.height;
    }
    sizeCanvas();
    const ro = new ResizeObserver(sizeCanvas);
    ro.observe(stage);

    const tickFn = (time: number) => {
      if (!W || !H) return;
      ctx.clearRect(0, 0, W, H);
      const gap = 28 * DPR;
      const cols = Math.ceil(W / gap);
      const rows = Math.ceil(H / gap);
      const fx = W * (0.5 + 0.38 * Math.sin(time * 0.28));
      const fy = H * (0.5 + 0.32 * Math.sin(time * 0.19 + 1.3));
      const radius = Math.min(W, H) * 0.32;
      ctx.fillStyle = INK;
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gap,
            y = j * gap;
          const dx = x - fx,
            dy = y - fy;
          const d = Math.sqrt(dx * dx + dy * dy);
          const push = Math.max(0, 1 - d / radius);
          const k = push * push * 46 * DPR;
          const nx = d > 0.01 ? x + (dx / d) * k : x;
          const ny = d > 0.01 ? y + (dy / d) * k : y;
          const r = (1 + push * 2.6) * DPR;
          ctx.globalAlpha = 0.22 + push * 0.55;
          ctx.beginPath();
          ctx.arc(nx, ny, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
    gsap.ticker.add(tickFn);

    // ── blur rack ──
    gsap.set(fc2.current, { filter: "blur(14px)", opacity: 0.35, scale: 1.12 });
    gsap.set(fc3.current, { filter: "blur(14px)", opacity: 0.35, scale: 1.12 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
      },
    });

    tl.to(fc1.current, { filter: "blur(14px)", scale: 1.12, opacity: 0.35, duration: 1 }, 0)
      .to(fc2.current, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1 }, 0)
      .to(fc2.current, { filter: "blur(14px)", scale: 1.12, opacity: 0.35, duration: 1 }, 1.2)
      .to(fc3.current, { filter: "blur(0px)", scale: 1, opacity: 1, duration: 1 }, 1.2);

    return () => {
      gsap.ticker.remove(tickFn);
      ro.disconnect();
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const refs = [fc1, fc2, fc3];

  // Mobile/tablet: a static, readable stack of the three lines — no canvas,
  // no pinned scroll, no blur rack. Same headings, just laid out in flow.
  if (lite) {
    return (
      <section
        id="work"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "clamp(1.75rem, 7vw, 3rem)",
          padding: "clamp(4rem, 14vw, 7rem) clamp(1.5rem, 7vw, 3rem)",
          background:
            "radial-gradient(ellipse 90% 120% at 100% 0%, rgba(200,0,0,0.16) 0%, transparent 60%), #000",
        }}
      >
        {cards.map((card, i) => (
          <h3
            key={card.heading}
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 8.5vw, 4.5rem)",
              fontWeight: 500,
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              color: INK,
              opacity: 1 - i * 0.18,
              maxWidth: "16ch",
              fontFamily: "var(--f-display, 'Helvetica Neue', Helvetica, Arial, sans-serif)",
            }}
          >
            {card.heading}
          </h3>
        ))}
      </section>
    );
  }

  return (
    <div
      ref={stageRef}
      id="work"
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        background:
          "radial-gradient(ellipse 60% 160% at 100% 50%, rgba(200,0,0,0.13) 0%, transparent 65%), #000",
        position: "relative",
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {cards.map((card, i) => (
        <h3
          key={card.heading}
          ref={refs[i]}
          style={{
            position: "absolute",
            margin: 0,
            translate: `${card.offset.x} ${card.offset.y}`,
            zIndex: card.z,
            fontSize: "clamp(3rem, 7.5vw, 9rem)",
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.0,
            color: INK,
            textAlign: "center",
            maxWidth: "20ch",
            willChange: "filter, transform",
            fontFamily: "var(--f-display, 'Helvetica Neue', Helvetica, Arial, sans-serif)",
          }}
        >
          {card.heading}
        </h3>
      ))}
    </div>
  );
}
