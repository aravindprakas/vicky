import { ArrowUpRight, Youtube, Instagram, Facebook, Mail } from "lucide-react";
import heroImage from "@/assets/hero-vicky.jpg";

const socials = [
  { name: "YouTube", handle: "@vickyvlogzs", icon: Youtube, bg: "bg-[#ff0033]", text: "text-white", href: "https://www.youtube.com/@vickyvlogzs" },
  { name: "Instagram", handle: "@vickyvlogs_", icon: Instagram, bg: "bg-gradient-to-br from-[#feda75] via-[#fa7e1e] via-[#d62976] to-[#962fbf]", text: "text-white", href: "https://www.instagram.com/vickyvlogs_/" },
  { name: "Facebook", handle: "mass.vicky", icon: Facebook, bg: "bg-[#1877f2]", text: "text-white", href: "https://www.facebook.com/mass.vicky.178061" },
  { name: "Mail", handle: "vigneshwar.els@gmail.com", icon: Mail, bg: "bg-amber-brand", text: "text-ink", href: "mailto:vigneshwar.els@gmail.com" },
];

export function Hero() {
  return (
    <section id="top" className="relative bg-cream overflow-hidden">
      <span
        aria-hidden
        className="pointer-events-none select-none absolute -top-8 left-1/2 -translate-x-1/2 font-display text-[clamp(8rem,28vw,22rem)] leading-none text-rust/[0.06] whitespace-nowrap"
      >
        Vicky
      </span>

      <div className="container-brand relative pt-12 pb-20 md:pt-20 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-cream/60 px-3 py-1 font-mono-brand text-[11px] uppercase tracking-widest text-ink/70">
              <span className="h-1.5 w-1.5 rounded-full bg-rust" />
              India · Comedy · Vlogging · Brand
            </p>
            <h1 className="font-display text-[clamp(3rem,8vw,6.5rem)] leading-[0.95] text-ink">
              Creativity <br />
              Meets <span className="font-serif-italic text-rust font-normal">Strategy</span>
            </h1>
            <div className="mt-8 max-w-xl space-y-4 text-base md:text-lg text-ink/75 leading-relaxed">
              <p>
                I'm Vicky — a comedy creator, vlogger, and storyteller from India turning brands into
                everyday culture moments people actually share.
              </p>
              <p>
                From punchline product drops to long-form lifestyle vlogs, every frame is engineered to
                hold attention and convert curiosity into community.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border-2 border-ink px-6 py-3 text-sm font-semibold text-ink hover:bg-ink hover:text-cream transition-colors"
              >
                Let's collaborate
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a href="#projects" className="text-sm font-medium text-ink/70 hover:text-rust">
                See latest work →
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-[0_30px_80px_-20px_rgb(176_48_16_/_0.4)]">
              <img
                src={heroImage}
                alt="Vicky, the creator behind VickyVlogs, holding a camera"
                width={832}
                height={1088}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 gradient-overlay" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-cream">
                <div>
                  <div className="font-mono-brand text-[10px] uppercase tracking-widest opacity-70">Now Featuring</div>
                  <div className="font-display text-xl">Episode 042</div>
                </div>
                <div className="rounded-full bg-amber-brand px-3 py-1 text-[11px] font-semibold text-ink">LIVE</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {socials.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`group relative overflow-hidden rounded-2xl ${s.bg} ${s.text} p-5 transition-transform hover:-translate-y-1`}
            >
              <s.icon className="h-7 w-7 mb-8" />
              <div className="font-display text-lg leading-tight">{s.name}</div>
              <div className="text-xs opacity-80 mt-0.5">{s.handle}</div>
              <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 opacity-70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
