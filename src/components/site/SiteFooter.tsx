import { Linkedin, Instagram, Facebook, Youtube } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: ["Portfolio", "Services", "About Us", "Contact"],
  },
  {
    title: "Solutions",
    links: ["Brand Promotions", "Vlogging", "Voice Work"],
  },
];

const socials = [
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Facebook, href: "https://www.facebook.com/mass.vicky.178061", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/vickyvlogs_/", label: "Instagram" },
  { Icon: Youtube, href: "https://www.youtube.com/@vickyvlogzs", label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="bg-ink text-cream">
      <div>
        <div className="container-brand pt-12 md:pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
            {/* Logo */}
            <div className="md:col-span-5">
              <a href="#top" className="inline-flex items-baseline gap-1 font-display text-4xl md:text-5xl leading-none">
                Vicky<span className="text-rust">Vlogs</span>
              </a>
              <p className="mt-5 max-w-xs text-sm text-cream/55 leading-relaxed">
                Comedy, vlogs and brand stories from India — engineered for the algorithm, written for humans.
              </p>
            </div>

            {/* Columns */}
            {columns.map((col) => (
              <div key={col.title} className="md:col-span-2">
                <h4 className="font-display text-base text-cream mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-cream/55 hover:text-rust transition-colors">{l}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Follow */}
            <div className="md:col-span-3">
              <h4 className="font-display text-base text-cream mb-5">Follow Us</h4>
              <div className="flex items-center gap-2.5">
                {socials.map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    aria-label={label}
                    className="h-11 w-11 rounded-xl bg-cream/5 hover:bg-rust hover:text-cream text-cream/70 flex items-center justify-center transition-colors"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <hr className="mt-12 border-cream/10" />

          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
            <div className="text-xs text-cream/50">
              © {new Date().getFullYear()} VickyVlogs, All Rights Reserved. Designed &amp; Developed by{" "}
              <a
                href="https://www.aravindprakash.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-rust hover:underline"
              >
                Aravind Prakash
              </a>
            </div>
            <a href="#" className="text-xs text-cream/50 hover:text-rust transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
