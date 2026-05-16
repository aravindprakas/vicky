import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function StickyNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "pt-3" : "pt-5"
      }`}
    >
      <nav className="container-brand">
        <div
          className={`flex items-center justify-between gap-4 rounded-full border border-ink/10 px-3 py-2 transition-all duration-300 ${
            scrolled
              ? "bg-cream/95 backdrop-blur shadow-[0_10px_40px_-10px_rgb(0_0_0_/_0.15)]"
              : "bg-cream/70 backdrop-blur-sm shadow-[0_4px_24px_-8px_rgb(0_0_0_/_0.08)]"
          }`}
        >
          <a href="#top" className="flex items-baseline gap-1 pl-3 font-display text-xl text-ink">
            Vicky<span className="text-amber-brand">Vlogs</span>
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-amber-brand" />
          </a>

          <ul className="hidden md:flex items-center gap-1 text-sm font-medium text-ink/80">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative inline-flex items-center rounded-full px-4 py-2 transition-colors duration-300 hover:text-cream"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-bottom scale-y-0 rounded-full bg-rust transition-transform duration-300 ease-out group-hover:scale-y-100"
                  />
                  <span className="relative z-10">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-amber-brand px-5 py-2.5 text-sm font-semibold text-ink hover:bg-rust hover:text-cream transition-colors"
          >
            Book a Demo <ArrowRight className="h-4 w-4" />
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden inline-flex items-center justify-center rounded-full bg-ink/90 p-2 text-cream"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-ink/10 bg-cream animate-fade-in">
          <ul className="container-brand flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-ink hover:bg-ink/5"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-amber-brand px-5 py-3 text-sm font-semibold text-ink"
              >
                Book a Demo <ArrowRight className="h-4 w-4" />
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
