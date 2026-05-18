import heroImage from "@/assets/hero-vicky.png";

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
  return (
    <section
      id="top"
      className="relative bg-ink text-cream overflow-hidden min-h-[100svh] flex items-center"
    >
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

      {/* Huge background name */}
      <span
        aria-hidden
        className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-display text-[clamp(8rem,22vw,20rem)] leading-none text-cream/[0.04] whitespace-nowrap"
      >
        VICKY
      </span>

      {/* Side nominee badge */}
      <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 flex-col items-center gap-3 bg-ink border-l border-cream/10 px-3 py-6 z-20">
        <span className="font-display text-xl tracking-tight">V.</span>
        <span
          className="font-mono-brand text-[11px] uppercase tracking-[0.4em] text-cream/70"
          style={{ writingMode: "vertical-rl" }}
        >
          Creator
        </span>
      </div>

      <div className="container-brand relative w-full pt-4 md:pt-6 pb-16 md:pb-20">
        {/* Portrait — ring light + subject only, black bg blends with ink */}
        <div className="relative mx-auto w-[min(620px,85vw)] aspect-[3/4] -mt-8 md:-mt-16">
          <img
            src={heroImage}
            alt="Vicky — comedy creator, vlogger and brand storyteller"
            className="h-full w-full object-contain"
            style={{ mixBlendMode: "screen" }}
          />
        </div>

        {/* Floating testimonials */}
        <div className="absolute inset-0 hidden md:block pointer-events-none">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className={`absolute max-w-[170px] ${t.className} text-cream/55`}
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


        {/* Bottom tagline */}
        <div className="relative mt-10 md:mt-0 md:absolute md:left-1/2 md:bottom-12 md:-translate-x-1/2 text-center z-10">
          <h1 className="font-display text-cream text-[clamp(1.5rem,3.2vw,2.6rem)] leading-tight tracking-tight">
            I DO COMEDY,<br />
            THAT DRIVES<br />
            <span className="text-rust">BRAND GROWTH</span>
          </h1>
          <div className="mt-4 flex justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" className="text-rust">
              <path
                fill="currentColor"
                d="M12 2l2.39 4.84L20 8l-4 3.9.94 5.5L12 14.77 7.06 17.4 8 11.9 4 8l5.61-1.16L12 2z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
