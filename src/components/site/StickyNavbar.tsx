import { useEffect, useRef, useState } from "react";
import { Images } from "lucide-react";
import { useRouterState } from "@tanstack/react-router";
import vIcon from "@/assets/v-icon.png";
import { useTransitionNavigate } from "@/components/site/RouteTransition";

type NavLink = { label: string; Icon: typeof Images; href?: string; to?: string };

const navLinks: NavLink[] = [
  { label: "Gallery", to: "/gallery", Icon: Images },
];

export function StickyNavbar() {
  const [open, setOpen] = useState(false);
  const capsuleRef = useRef<HTMLDivElement>(null);
  const transitionNavigate = useTransitionNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Route a nav item: hash links scroll within the home page (transitioning
  // back home first when on another route); `to` links transition between routes.
  const handleNav = (link: NavLink) => {
    setOpen(false);
    if (link.to) {
      if (pathname !== link.to) transitionNavigate(link.to);
      return;
    }
    if (!link.href) return;
    const hash = link.href.slice(1);
    if (pathname === "/") {
      const el = document.getElementById(hash);
      if (window.__lenis && el) window.__lenis.scrollTo(el);
      else el?.scrollIntoView({ behavior: "smooth" });
    } else {
      transitionNavigate("/", hash);
    }
  };

  const goHome = () => {
    setOpen(false);
    if (pathname === "/") {
      if (window.__lenis) window.__lenis.scrollTo(0);
      else window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      transitionNavigate("/");
    }
  };

  // Collapse only on scroll down
  useEffect(() => {
    if (!open) return;
    let lastY = window.scrollY;
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastY) setOpen(false);
      lastY = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  // Collapse on outside click (touch devices)
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (!capsuleRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <nav className="pointer-events-none fixed top-5 z-50 flex w-full justify-center px-4">
      <div
        ref={capsuleRef}
        className="pointer-events-auto relative flex flex-nowrap items-center gap-2 rounded-full p-2"
        onMouseEnter={() => setOpen(true)}
        style={{
          background: "oklch(0.14 0 0)",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.55), 0 1px 0 rgba(255,255,255,0.05) inset",
        }}
      >
        {/* V logo */}
        <button
          onClick={goHome}
          aria-label="VickyVlogs home"
          className="flex-shrink-0 h-11 w-11 cursor-pointer border-0 bg-transparent p-0 transition-opacity hover:opacity-80"
        >
          <img src={vIcon} alt="VickyVlogs" className="h-full w-full object-contain" />
        </button>

        {/* Expanding tray */}
        <div className={`mobile-tray ${open ? "tray-open" : ""}`}>
          {navLinks.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleNav(link)}
              className="mobile-nav-btn cursor-pointer border-0 bg-transparent text-cream/75 hover:bg-white/[0.1] hover:text-cream"
            >
              <span className="btn-icon">
                <link.Icon className="w-[22px] h-[22px]" strokeWidth={1.6} />
              </span>
              <span className="btn-label">{link.label}</span>
            </button>
          ))}
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex-shrink-0 h-11 w-11 rounded-full flex items-center justify-center transition-colors hover:bg-white/[0.1] text-cream"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className={`burger-lines ${open ? "is-open" : ""}`} aria-hidden>
            <span />
            <span />
            <span />
          </span>
        </button>
      </div>
    </nav>
  );
}
