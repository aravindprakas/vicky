import { Mail, Phone } from "lucide-react";

export function TopContactBar() {
  return (
    <div className="bg-ink text-cream/80">
      <div className="container-brand flex items-center justify-between py-2 font-mono-brand text-[11px] tracking-widest uppercase">
        <div className="flex items-center gap-5">
          <a href="mailto:vigneshwar.els@gmail.com" className="flex items-center gap-2 hover:text-amber-brand transition-colors">
            <Mail className="h-3 w-3" />
            <span className="hidden sm:inline">vigneshwar.els@gmail.com</span>
            <span className="sm:hidden">Email</span>
          </a>
          <a href="tel:+919597600706" className="flex items-center gap-2 hover:text-amber-brand transition-colors">
            <Phone className="h-3 w-3" />
            <span className="hidden sm:inline">+91 95976 00706</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
        <div className="hidden md:block text-cream/90">
          Built by{" "}
          <a
            href="https://www.aravindprakash.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-amber-brand underline decoration-amber-brand/40 underline-offset-4 transition-colors hover:text-cream hover:decoration-cream"
          >
            Aravind Prakash
          </a>
        </div>
      </div>
    </div>
  );
}
