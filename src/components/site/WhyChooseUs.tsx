import promotions from "@/assets/why-promotions.jpg";
import vlogging from "@/assets/why-vlogging.jpg";
import vocal from "@/assets/why-vocal.jpg";
import writing from "@/assets/why-writing.jpg";
import { Reveal } from "@/components/site/Reveal";

const cards = [
  { badge: "01", title: "Brand Promotions", img: promotions },
  { badge: "02", title: "Vlogging & Comedy", img: vlogging },
  { badge: "03", title: "Vocal Artistry", img: vocal },
  { badge: "04", title: "Content Writing", img: writing },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="bg-cream-warm py-20 md:py-28">
      <div className="container-brand">
        <div className="flex items-start justify-between gap-6">
          <h2 className="font-display text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95] text-ink uppercase">
            Why Choose <span className="font-serif-italic font-normal text-rust">Us!</span>
          </h2>
          <div className="text-right pt-3">
            <div className="hidden md:block mt-1 text-xs text-ink/50 max-w-[180px]">A blend of voice, vision and street-smart timing.</div>
          </div>
        </div>

        <hr className="mt-8 border-ink/15" />

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((c, idx) => (
            <Reveal
              key={c.title}
              direction="up"
              delay={idx * 110}
              className={`group relative overflow-hidden rounded-[1.5rem] aspect-[3/4] bg-ink ${
                idx % 2 === 1 ? "lg:mt-10" : ""
              }`}
            >
              <img
                src={c.img}
                alt={c.title}
                width={576}
                height={832}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 gradient-overlay" />
              <div className="absolute bottom-5 left-5 right-5">
                <h3 className="font-display text-2xl text-cream leading-tight">{c.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
