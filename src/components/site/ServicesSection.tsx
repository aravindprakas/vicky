import consulting from "@/assets/service-consulting.jpg";
import design from "@/assets/service-design.jpg";
import engineering from "@/assets/service-engineering.jpg";

const cards = [
  { label: "Product Consulting & Automation", img: consulting, featured: false },
  { label: "Product Design", img: design, featured: true },
  { label: "Product Engineering", img: engineering, featured: false },
];

export function ServicesSection() {
  return (
    <section id="services" className="bg-amber-brand py-20 md:py-28">
      <div className="container-brand">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-mono-brand text-[11px] uppercase tracking-widest text-ink/70">02 // What we do</p>
          <h2 className="mt-4 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1] text-ink">
            We believe great design <br />
            isn't just <span className="font-serif-italic font-normal">beautiful</span> — it works.
          </h2>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          {cards.map((c) => (
            <article
              key={c.label}
              className={`group relative overflow-hidden rounded-[1.75rem] aspect-[3/4] ${
                c.featured
                  ? "md:scale-[1.06] md:-translate-y-4 md:z-10 bg-rust-deep ring-4 ring-rust-deep/40 shadow-[0_30px_60px_-15px_rgb(0_0_0_/_0.4)]"
                  : "bg-rust"
              }`}
            >
              <img
                src={c.img}
                alt={c.label}
                width={640}
                height={896}
                loading="lazy"
                className="h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 gradient-overlay" />
              <div className="absolute bottom-5 left-5 right-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 text-xs font-semibold text-ink">
                  <span className="h-1.5 w-1.5 rounded-full bg-rust" />
                  {c.label}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
