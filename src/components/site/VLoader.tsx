import { useEffect, useState } from "react";

export function VLoader() {
  const [hidden, setHidden] = useState(false);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 2200);
    const t2 = setTimeout(() => setHidden(true), 2900);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream transition-opacity duration-700 ${
        fading ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={fading}
    >
      <svg width="220" height="220" viewBox="0 0 220 220" className="drop-shadow-[0_20px_40px_rgba(176,48,16,0.25)]">
        <defs>
          <clipPath id="v-clip">
            <path d="M30 30 H75 L110 145 L145 30 H190 L130 195 H90 Z" />
          </clipPath>
          <linearGradient id="water-grad" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--brand-amber)" />
            <stop offset="100%" stopColor="var(--brand-rust)" />
          </linearGradient>
        </defs>

        <path
          d="M30 30 H75 L110 145 L145 30 H190 L130 195 H90 Z"
          fill="none"
          stroke="var(--brand-ink)"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        <g clipPath="url(#v-clip)">
          <g className="v-rise">
            <rect x="0" y="0" width="220" height="220" fill="url(#water-grad)" />
            <g className="v-wave">
              <path
                d="M-220,0 Q-165,-18 -110,0 T0,0 T110,0 T220,0 T330,0 T440,0 V20 H-220 Z"
                fill="var(--brand-amber)"
                opacity="0.9"
              />
            </g>
          </g>
        </g>
      </svg>

      <div className="mt-8 font-display text-xl tracking-[0.3em] text-ink">
        VICKY<span className="text-amber-brand">VLOGS</span>
      </div>
      <div className="mt-2 font-mono-brand text-[10px] uppercase tracking-[0.4em] text-ink/50">
        loading the show
      </div>

      <style>{`
        .v-rise {
          transform: translateY(220px);
          animation: v-rise 2.1s cubic-bezier(0.65, 0, 0.35, 1) forwards;
        }
        .v-wave {
          transform: translateX(0);
          animation: v-wave 1.4s linear infinite;
        }
        @keyframes v-rise {
          0% { transform: translateY(220px); }
          100% { transform: translateY(0); }
        }
        @keyframes v-wave {
          0% { transform: translateX(0); }
          100% { transform: translateX(110px); }
        }
      `}</style>
    </div>
  );
}
