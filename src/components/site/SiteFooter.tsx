import { Youtube, Instagram, Facebook, Mail } from "lucide-react";

const columns = [
  {
    title: "Features",
    links: ["Brand Promotions", "Vlogging", "Comedy Skits", "Voice Work"],
  },
  {
    title: "Product",
    links: ["Creator Reels", "Long-form", "Podcast Cameos", "Live Events"],
  },
  {
    title: "Company",
    links: ["About", "Press", "Careers", "Partners"],
  },
  {
    title: "Resources",
    links: ["Media Kit", "Rate Card", "Case Studies", "FAQ"],
  },
];

export function SiteFooter() {
  return (
    <footer className="bg-gradient-to-b from-rust-deep to-ink text-cream">
      <div className="container-brand pt-20 pb-10">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <a href="#top" className="flex items-baseline gap-1 font-display text-3xl">
              Vicky<span className="text-amber-brand">Vlogs</span>
            </a>
            <p className="mt-4 max-w-xs text-sm text-cream/65 leading-relaxed">
              Comedy, vlogs and brand stories from India — engineered for the algorithm, written for humans.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-cream/10 px-4 py-2 font-mono-brand text-[11px] uppercase tracking-widest text-cream/80">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-brand" />
              Booking 2026 collaborations
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm uppercase tracking-wider text-cream">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm text-cream/65 hover:text-amber-brand transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr className="mt-14 border-cream/15" />

        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-cream/50 space-y-1">
            <div>© {new Date().getFullYear()} VickyVlogs. All Rights Reserved.</div>
            <div>Training and Mentorship by <span className="text-cream/70">Atozerv India Pvt Ltd</span></div>
            <div>Developed by <span className="text-amber-brand"><a href="https://www.aravindprakash.in/" target="_blank" rel="noopener noreferrer">Aravind Prakash</a></span></div>
          </div>
          <div className="flex items-center gap-2">
            {[
              { Icon: Youtube, href: "https://www.youtube.com/@vickyvlogzs" },
              { Icon: Instagram, href: "https://www.instagram.com/vickyvlogs_/" },
              { Icon: Facebook, href: "https://www.facebook.com/mass.vicky.178061" },
              { Icon: Mail, href: "mailto:vigneshwar.els@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="h-9 w-9 rounded-full border border-cream/20 hover:bg-amber-brand hover:text-ink hover:border-amber-brand transition-colors flex items-center justify-center"
                aria-label="social link"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
