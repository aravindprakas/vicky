import { useEffect, useRef, useState } from "react";

const RED = "#9a1f1f";
const BEBAS = "'Bebas Neue', sans-serif";
const GROTESK = "'Space Grotesk', sans-serif";

type Episode = {
  num: string;
  title: string;
  meta: string;
  dur: string;
  grad: string;
  prog: string;
};

const episodes: Episode[] = [
  {
    num: "12",
    title: "I Lived on Night Trains for a Week",
    meta: "214K views · 5 days ago",
    dur: "18:42",
    grad: "linear-gradient(135deg, #3a1414, #191a22)",
    prog: "64%",
  },
  {
    num: "11",
    title: "Tokyo Before the Tourists Wake Up",
    meta: "186K views · 2 weeks ago",
    dur: "14:05",
    grad: "linear-gradient(135deg, #241a2e, #101114)",
    prog: "31%",
  },
  {
    num: "10",
    title: "The Last Ferry to Nowhere",
    meta: "342K views · 3 weeks ago",
    dur: "21:17",
    grad: "linear-gradient(135deg, #13251f, #121214)",
    prog: "88%",
  },
];


function useSubscriberCount(target = 48213, dur = 1700) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(target * e));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [target, dur]);

  return count.toLocaleString("en-US");
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span style={{ fontFamily: BEBAS }} className="text-[44px] leading-none text-[#f5f4f2]">
        {value}
      </span>
      <span className="text-[12px] tracking-[0.16em] text-[#8a8a92]">{label}</span>
    </div>
  );
}

function EpisodeCard({ ep }: { ep: Episode }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="cursor-pointer overflow-hidden rounded-[12px] bg-[#18181b]"
      style={{
        border: `1px solid ${hover ? RED : "#26262a"}`,
        transform: hover ? "translateY(-6px)" : "none",
        boxShadow: hover ? "0 18px 44px rgba(0,0,0,.5)" : "none",
        transition: "transform .25s ease, border-color .25s ease, box-shadow .25s ease",
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: "16 / 9", background: ep.grad }}
      >
        <span style={{ fontFamily: BEBAS }} className="text-[64px] text-[#f5f4f2]/[0.22]">
          EP {ep.num}
        </span>
        <span className="absolute bottom-2.5 right-2.5 rounded-[4px] bg-black/75 px-[7px] py-[3px] text-[12px] font-semibold text-[#e8e8ea]">
          {ep.dur}
        </span>
        <span
          className="absolute bottom-0 left-0 h-[3px]"
          style={{ width: ep.prog, background: RED }}
        />
      </div>
      <div className="flex flex-col gap-1.5 px-[18px] pb-[18px] pt-4">
        <div className="text-[16px] font-semibold leading-[1.35] text-[#f0f0f2]">{ep.title}</div>
        <div className="text-[13px] text-[#8a8a92]">{ep.meta}</div>
      </div>
    </div>
  );
}

export function PremiereShowcase() {
  const countStr = useSubscriberCount();
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
      className=""
      style={{
        fontFamily: GROTESK,
        color: "#e8e8ea",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="w-full">
        <div
          className="overflow-hidden"
          style={{
            background:
              "radial-gradient(900px 520px at 72% -12%, rgba(154,31,31,.38), transparent 62%)",
          }}
        >
          {/* Headline */}
          <div className="px-6 pt-12 md:px-16 md:pt-16">
            <div
              style={{ fontFamily: BEBAS }}
              className="mt-[22px] text-[clamp(3.5rem,11vw,118px)] leading-[0.92] text-[#f5f4f2]"
            >
              NO SCRIPT.
            </div>
            <div
              style={{ fontFamily: BEBAS, WebkitTextStroke: `2px ${RED}`, color: "transparent" }}
              className="text-[clamp(3.5rem,11vw,118px)] leading-[0.92]"
            >
              NO FILTER.
            </div>

            {/* Trailer row */}
            <div className="mt-9 flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-7">
              <div className="flex items-center gap-7">
                <div className="relative h-[84px] w-[84px] flex-none cursor-pointer">
                  <span
                    className="absolute inset-0 rounded-full border-2"
                    style={{
                      borderColor: "rgba(154,31,31,.65)",
                      animation: "premiere-pulse-ring 2.2s ease-out infinite",
                    }}
                  />
                  <span
                    className="absolute inset-0 flex items-center justify-center rounded-full"
                    style={{ background: RED, boxShadow: "0 12px 40px rgba(154,31,31,.45)" }}
                  >
                    <span
                      className="ml-1.5"
                      style={{
                        width: 0,
                        height: 0,
                        borderLeft: "22px solid #fff",
                        borderTop: "13px solid transparent",
                        borderBottom: "13px solid transparent",
                      }}
                    />
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="text-[17px] font-semibold text-[#f0f0f2]">
                    Watch the trailer — 1:24
                  </div>
                  <div className="max-w-[460px] text-[14px] leading-[1.55] text-[#a0a0a8]">
                    Vicky films the cities everyone else sleeps through. Raw, unscripted, and twenty
                    minutes at a time.
                  </div>
                </div>
              </div>

              <div className="flex gap-8 sm:gap-12 lg:ml-auto">
                <Stat value={countStr} label="SUBSCRIBERS" />
                <Stat value="4.2M" label="TOTAL VIEWS" />
                <Stat value="87" label="EPISODES" />
              </div>
            </div>
          </div>

          {/* Episode grid */}
          <div className="grid grid-cols-1 gap-5 px-6 pt-9 pb-20 sm:grid-cols-2 md:grid-cols-3 md:px-16 md:pb-28">
            {episodes.map((ep) => (
              <EpisodeCard key={ep.num} ep={ep} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
