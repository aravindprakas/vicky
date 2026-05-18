import { useState, type FormEvent } from "react";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

const purposes = ["Enquiry", "Promotion", "Others"] as const;

export function ContactSection() {
  const [purpose, setPurpose] = useState<(typeof purposes)[number]>("Enquiry");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! Vicky's team will reach out within 24 hours.");
    (e.target as HTMLFormElement).reset();
    setPurpose("Enquiry");
  };

  const inputCls =
    "w-full rounded-2xl border border-cream/15 bg-cream/[0.04] px-5 py-4 text-cream placeholder:text-cream/40 outline-none transition-all focus:border-amber-brand focus:bg-cream/[0.08] focus:ring-4 focus:ring-amber-brand/20";

  return (
    <section id="contact" className="bg-ink text-cream py-20 md:py-28">
      <div className="container-brand grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-[1.75rem] bg-amber-brand text-cream p-8">
            
            <h2 className="mt-3 font-display text-4xl md:text-5xl leading-[1]">
              Have an idea? <span className="font-serif-italic font-normal">Let's make it loud.</span>
            </h2>
            <p className="mt-4 text-cream/80">
              Drop a brief, a vibe, or just a meme reference. Every reply comes from a real human in 24 hours flat.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-cream/10 p-8 space-y-5">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-amber-brand mt-0.5" />
              <div>
                <div className="font-mono-brand text-[10px] uppercase tracking-widest text-cream/50">Email</div>
                <a href="mailto:vigneshwar.els@gmail.com" className="text-cream hover:text-amber-brand">vigneshwar.els@gmail.com</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-amber-brand mt-0.5" />
              <div>
                <div className="font-mono-brand text-[10px] uppercase tracking-widest text-cream/50">Phone</div>
                <a href="tel:+919597600706" className="text-cream hover:text-amber-brand">+91 95976 00706</a>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-amber-brand mt-0.5" />
              <div>
                <div className="font-mono-brand text-[10px] uppercase tracking-widest text-cream/50">Studio</div>
                <div className="text-cream">Bandra West, Mumbai · India</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={onSubmit} className="lg:col-span-7 rounded-[1.75rem] border border-cream/10 bg-cream/[0.02] p-6 md:p-10 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input required name="name" placeholder="Your name" className={inputCls} />
            <input required name="contact" placeholder="Email or phone" className={inputCls} />
          </div>
          <input name="location" placeholder="Location (city)" className={inputCls} />

          <div>
            <div className="font-mono-brand text-[11px] uppercase tracking-widest text-cream/60 mb-3">Purpose</div>
            <div className="flex flex-wrap gap-2">
              {purposes.map((p) => (
                <label
                  key={p}
                  className={`cursor-pointer rounded-full border px-5 py-2.5 text-sm font-medium transition-all ${
                    purpose === p
                      ? "bg-amber-brand text-cream border-amber-brand"
                      : "border-cream/20 text-cream/80 hover:border-cream/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="purpose"
                    value={p}
                    checked={purpose === p}
                    onChange={() => setPurpose(p)}
                    className="sr-only"
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          <textarea
            required
            name="message"
            rows={5}
            placeholder="Tell us about your project, brand, or wild idea…"
            className={inputCls + " resize-none"}
          />

          <button
            type="submit"
            className="group inline-flex items-center gap-2 rounded-full bg-amber-brand px-7 py-3.5 text-sm font-semibold text-cream hover:bg-cream hover:text-rust transition-colors"
          >
            Send Message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>
      </div>
    </section>
  );
}
