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
        <div className="hidden md:block opacity-60">Mumbai · India</div>
      </div>
    </div>
  );
}
