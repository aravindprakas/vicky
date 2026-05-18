import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Why Us", href: "#why" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function StickyNavbar() {
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [origin, setOrigin] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [darkCapsule, setDarkCapsule] = useState(true);

  useEffect(() => {
    const getLuminance = (color: string) => {
      if (!color || color === "transparent" || color === "rgba(0, 0, 0, 0)") return null;

      const rgb = color.match(/rgba?\(([^)]+)\)/);
      if (rgb) {
        const [r, g, b, a = 1] = rgb[1].split(",").map((v) => Number.parseFloat(v));
        if (a === 0 || [r, g, b].some(Number.isNaN)) return null;
        return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      }

      const oklch = color.match(/oklch\(([\d.]+)%?/);
      if (oklch) {
        const lightness = Number.parseFloat(oklch[1]);
        return color.includes("%") ? lightness / 100 : lightness;
      }

      return null;
    };

    let frame = 0;
    const updateTheme = () => {
      const nav = navRef.current;
      const rect = nav?.getBoundingClientRect();
      const x = window.innerWidth / 2;
      const y = rect ? rect.top + rect.height / 2 : 24;
      const elements = document.elementsFromPoint(x, y);

      for (const element of elements) {
        if (nav?.contains(element)) continue;

        let current = element as HTMLElement | null;
        while (current && current !== document.documentElement) {
          const luminance = getLuminance(window.getComputedStyle(current).backgroundColor);
          if (luminance !== null) {
            setDarkCapsule(luminance < 0.48);
            return;
          }
          current = current.parentElement;
        }
      }
    };

    const scheduleUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateTheme);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const lenis = (window as any).__lenis;
    if (lenis) { open ? lenis.stop() : lenis.start(); }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const updateOrigin = () => {
    const el = burgerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  };

  useLayoutEffect(() => {
    updateOrigin();
    window.addEventListener("resize", updateOrigin);
    window.addEventListener("scroll", updateOrigin, { passive: true });
    return () => {
      window.removeEventListener("resize", updateOrigin);
      window.removeEventListener("scroll", updateOrigin);
    };
  }, []);

  const toggle = () => {
    updateOrigin();
    setOpen((v) => !v);
  };

  return (
    <>
      <nav ref={navRef} className="pointer-events-none fixed top-6 z-50 flex w-full justify-center px-4 transition-all duration-300">
        <div
          className={`pointer-events-auto relative flex items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-300 backdrop-blur-2xl backdrop-saturate-200 ${
            darkCapsule
              ? "bg-white/[0.08] shadow-[0_4px_24px_-8px_rgb(0_0_0_/_0.5)]"
              : "bg-white/[0.28] shadow-[0_10px_40px_-10px_rgb(0_0_0_/_0.2)]"
          }`}
        >
          <a
            href="#top"
            className={`flex items-baseline gap-1 pl-3 font-display text-xl font-bold transition-colors ${
              darkCapsule ? "text-cream" : "text-ink"
            }`}
          >
            Vicky<span className="text-amber-brand">Vlogs</span>
            <span className="ml-1 inline-block h-2 w-2 rounded-full bg-amber-brand" />
          </a>

          <NavLinks darkCapsule={darkCapsule} />

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-amber-brand px-5 py-2.5 text-sm font-bold text-cream hover:bg-rust-deep hover:text-cream transition-colors"
          >
            Book a Demo <ArrowRight className="h-4 w-4" />
          </a>

          <button
            ref={burgerRef}
            onClick={toggle}
            className={`md:hidden relative z-[60] inline-flex items-center justify-center rounded-full p-2 transition-colors ${
              darkCapsule ? "bg-cream text-ink" : "bg-ink text-cream"
            }`}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span className="relative block h-5 w-5">
              <Menu
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-5 w-5 transition-all duration-300 ${
                  open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <MobileMenu open={open} onClose={() => setOpen(false)} origin={origin} />
    </>
  );
}

function MobileMenu({ open, onClose, origin }: { open: boolean; onClose: () => void; origin: { x: number; y: number } }) {
  // Compute radius needed to cover viewport from origin
  const radius = typeof window !== "undefined"
    ? Math.hypot(Math.max(origin.x, window.innerWidth - origin.x), Math.max(origin.y, window.innerHeight - origin.y)) + 40
    : 1200;

  const clipOpen = `circle(${radius}px at ${origin.x}px ${origin.y}px)`;
  const clipClosed = `circle(0px at ${origin.x}px ${origin.y}px)`;

  return (
    <div
      className={`md:hidden fixed inset-0 z-40 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 backdrop-blur-2xl backdrop-saturate-150 bg-cream/50 border-b border-white/20"
        style={{
          clipPath: open ? clipOpen : clipClosed,
          WebkitClipPath: open ? clipOpen : clipClosed,
          transition: "clip-path 700ms cubic-bezier(0.77, 0, 0.175, 1), -webkit-clip-path 700ms cubic-bezier(0.77, 0, 0.175, 1)",
        }}
        onClick={onClose}
      />

      <button
        onClick={onClose}
        aria-label="Close menu"
        className={`absolute z-[55] inline-flex items-center justify-center rounded-full bg-ink/90 p-2 text-cream transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: origin.x - 18,
          top: origin.y - 18,
          transitionDelay: open ? "350ms" : "0ms",
        }}
      >
        <X className="h-5 w-5" />
      </button>

      <div className="relative h-full container-brand pt-28 pb-10 flex flex-col">
        <ul className="flex flex-col gap-2">
          {navLinks.map((l, i) => (
            <li
              key={l.href}
              style={{
                transform: open ? "translateY(0)" : "translateY(20px)",
                opacity: open ? 1 : 0,
                transition: `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${open ? 280 + i * 60 : 0}ms, opacity 400ms ease ${open ? 280 + i * 60 : 0}ms`,
              }}
            >
              <a
                href={l.href}
                onClick={onClose}
                className="block py-3 font-display text-4xl text-ink hover:text-rust transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div
          className="mt-auto"
          style={{
            transform: open ? "translateY(0)" : "translateY(20px)",
            opacity: open ? 1 : 0,
            transition: `transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${open ? 280 + navLinks.length * 60 : 0}ms, opacity 400ms ease ${open ? 280 + navLinks.length * 60 : 0}ms`,
          }}
        >
          <a
            href="#contact"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-full bg-amber-brand px-6 py-3 text-sm font-semibold text-cream"
          >
            Book a Demo <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function NavLinks({ darkCapsule }: { darkCapsule: boolean }) {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const currentRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
  const pillRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  const tick = () => {
    const ease = 0.12;
    const c = currentRef.current;
    const t = targetRef.current;
    c.x += (t.x - c.x) * ease;
    c.y += (t.y - c.y) * ease;
    c.w += (t.w - c.w) * ease;
    c.h += (t.h - c.h) * ease;
    if (pillRef.current) {
      pillRef.current.style.transform = `translate3d(${c.x}px, ${c.y}px, 0)`;
      pillRef.current.style.width = `${c.w}px`;
      pillRef.current.style.height = `${c.h}px`;
    }
    const dx = Math.abs(t.x - c.x) + Math.abs(t.y - c.y) + Math.abs(t.w - c.w) + Math.abs(t.h - c.h);
    if (dx > 0.2) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      rafRef.current = null;
    }
  };

  const moveTo = (i: number) => {
    const list = listRef.current;
    const el = itemRefs.current[i];
    if (!list || !el) return;
    const lr = list.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    targetRef.current = { x: er.left - lr.left, y: er.top - lr.top, w: er.width, h: er.height };
    if (!visible) {
      currentRef.current = { ...targetRef.current };
    }
    setVisible(true);
    setHoverIdx(i);
    if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);

  return (
    <ul
      ref={listRef}
      onMouseLeave={() => { setVisible(false); setHoverIdx(null); }}
      className={`hidden md:flex relative items-center gap-1 text-sm font-bold transition-colors ${
        darkCapsule ? "text-cream/85" : "text-ink/80"
      }`}
    >
      <span
        ref={pillRef}
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 rounded-full bg-rust"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 300ms ease",
          willChange: "transform, width, height",
        }}
      />
      {navLinks.map((l, i) => (
        <li
          key={l.href}
          ref={(el) => { itemRefs.current[i] = el; }}
          onMouseEnter={() => moveTo(i)}
        >
          <a
            href={l.href}
            className={`relative z-10 inline-flex items-center rounded-full px-4 py-2 transition-colors duration-300 ${
              hoverIdx === i ? "text-cream" : ""
            }`}
          >
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
