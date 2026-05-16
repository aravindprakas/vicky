import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import web from "@/assets/creative-web.jpg";
import social from "@/assets/creative-social.jpg";
import ai from "@/assets/creative-ai.jpg";
import threed from "@/assets/creative-3d.jpg";

const items = [
  { label: "Web & UI Design", img: web },
  { label: "Social Assets", img: social },
  { label: "AI Consulting", img: ai },
  { label: "3D Design", img: threed },
];

export function CreativeServicesRow() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    scroller.current?.scrollBy({ left: dir * 360, behavior: "smooth" });
  };

  return (
    <section className="bg-amber-brand pb-20 md:pb-28">
      <div className="container-brand">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-10">
          <div className="lg:col-span-6">
            <h3 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1] text-ink">
              Over 10+ Flexible <br />
              <span className="font-serif-italic font-normal">Creative</span> Services
            </h3>
          </div>
          <div className="lg:col-span-6 flex lg:justify-end gap-3">
            <button
              onClick={() => scroll(-1)}
              className="h-12 w-12 rounded-full border-2 border-ink text-ink hover:bg-ink hover:text-cream transition-colors flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="h-12 w-12 rounded-full border-2 border-ink text-ink hover:bg-ink hover:text-cream transition-colors flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scroller}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((i) => (
            <article
              key={i.label}
              className="group relative shrink-0 snap-start w-[260px] md:w-[300px] aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-rust-deep"
            >
              <img
                src={i.img}
                alt={i.label}
                width={576}
                height={832}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 gradient-overlay" />
              <div className="absolute bottom-4 left-5 right-5 text-cream">
                <div className="font-serif-italic text-2xl leading-tight">{i.label}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
