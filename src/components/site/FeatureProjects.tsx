import { ArrowRight } from "lucide-react";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import { Reveal } from "@/components/site/Reveal";

const projects = [
  { name: "Orancel Glow Drop", subtitle: "Skincare · Launch Campaign", img: p1 },
  { name: "Stride Sneakers", subtitle: "Streetwear · Product Reel", img: p2 },
  { name: "ChaiTales App", subtitle: "Lifestyle · Social Pack", img: p3 },
  { name: "Spotlight Tour", subtitle: "Live Comedy · Branded Special", img: p4 },
  { name: "Tikki Town", subtitle: "F&B · Series Sponsorship", img: p5 },
  { name: "Lumen Pods", subtitle: "Audio Tech · Unboxing", img: p6 },
];

export function FeatureProjects() {
  return (
    <section id="projects" className="bg-rust-deep text-cream py-20 md:py-28">
      <div className="container-brand">
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            
            <h2 className="mt-3 font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1]">
              Feature <span className="font-serif-italic font-normal text-amber-brand">Projects</span>
            </h2>
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-cream/40 px-5 py-2.5 text-sm font-semibold text-cream hover:bg-cream hover:text-rust-deep transition-colors"
          >
            All works <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal as="article" key={p.name} direction="up" delay={(i % 3) * 120} className="group">
              <div className="aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink/40">
                <img
                  src={p.img}
                  alt={p.name}
                  width={768}
                  height={576}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="font-serif-italic text-2xl text-cream">{p.name}</h3>
                <ArrowRight className="h-4 w-4 text-amber-brand transition-transform group-hover:translate-x-1" />
              </div>
              <p className="text-sm text-cream/60 mt-1">{p.subtitle}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
