import { useEffect, useRef } from "react";

/* YouTube subscribe CTA — ported from the Claude Design "Subscribe Button"
   handoff, recolored from YouTube red to the site's wine-red palette.
   It's a real external link (opens the channel in a new tab); the click also
   plays the local "Subscribed" flip + confetti effect on this page. */

// `?sub_confirmation=1` makes YouTube pop the subscribe confirmation on open.
const CHANNEL_URL = "https://www.youtube.com/@vickyvlogs.entertainment?sub_confirmation=1";

// On-palette confetti: brand reds, amber and cream (was YouTube primary colors).
const CONFETTI = ["#c0392b", "#9a1f1f", "#e8a33d", "#f5f4f2", "#d23f2c"];

export function SubscribeButton({ className = "" }: { className?: string }) {
  const btnRef = useRef<HTMLAnchorElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const burstRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const btn = btnRef.current;
    const label = labelRef.current;
    const burst = burstRef.current;
    if (!btn || !label || !burst) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = !window.matchMedia("(hover: none)").matches;

    // Build the confetti shards once.
    for (let i = 0; i < 14; i++) {
      const s = document.createElement("i");
      const ang = (Math.PI * 2 * i) / 14 + (Math.random() - 0.5);
      const dist = 46 + Math.random() * 32;
      s.style.setProperty("--tx", `calc(-50% + ${Math.cos(ang) * dist}px)`);
      s.style.setProperty("--ty", `calc(-50% + ${Math.sin(ang) * dist}px)`);
      s.style.setProperty("--rot", `${Math.random() * 540 - 270}deg`);
      s.style.background = CONFETTI[i % CONFETTI.length];
      s.style.animationDelay = `${Math.random() * 0.05}s`;
      burst.appendChild(s);
    }

    // Magnetic hover — pointer-capable devices only.
    const onMove = (e: PointerEvent) => {
      if (btn.classList.contains("done")) return;
      const r = btn.getBoundingClientRect();
      const mx = e.clientX - r.left - r.width / 2;
      const my = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${mx * 0.16}px, ${my * 0.26}px) scale(1.05)`;
    };
    const onLeave = () => {
      btn.style.transform = "";
    };
    const onDown = () => {
      btn.style.transition = "transform 0.12s cubic-bezier(0.33,1,0.68,1)";
      btn.style.transform =
        (btn.style.transform || "").replace(/scale\([^)]*\)/, "") + " scale(0.95)";
      window.setTimeout(() => {
        btn.style.transition = "";
      }, 130);
    };
    // Play the click effect; the link still opens the channel in a new tab.
    const onClick = () => {
      if (btn.classList.contains("done")) return;
      btn.classList.add("done");
      btn.style.transform = "";
      label.textContent = "Subscribed";
      if (!reduce) {
        btn.classList.remove("pop");
        void btn.offsetWidth; // restart the confetti animation
        btn.classList.add("pop");
      }
    };

    if (canHover) {
      btn.addEventListener("pointermove", onMove);
      btn.addEventListener("pointerleave", onLeave);
    }
    btn.addEventListener("pointerdown", onDown);
    btn.addEventListener("click", onClick);

    return () => {
      btn.removeEventListener("pointermove", onMove);
      btn.removeEventListener("pointerleave", onLeave);
      btn.removeEventListener("pointerdown", onDown);
      btn.removeEventListener("click", onClick);
      burst.replaceChildren(); // avoid duplicate shards on re-mount / HMR
    };
  }, []);

  return (
    <a
      ref={btnRef}
      className={`subscribe-btn ${className}`.trim()}
      href={CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Subscribe on YouTube"
    >
      <span className="content">
        <span className="ico play" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M7 5v14l12-7z" />
          </svg>
        </span>
        <span className="ico check" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M5 12.5 10 17.5 19 7" />
          </svg>
        </span>
        <span className="label" ref={labelRef}>
          Subscribe
        </span>
      </span>
      <span className="burst" aria-hidden="true" ref={burstRef} />
    </a>
  );
}
