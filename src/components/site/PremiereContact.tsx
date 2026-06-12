import { useEffect, useRef, useState } from "react";

/* Contact 01 — "The Premiere" treatment: bold split layout, business-first.
   Copy-to-clipboard email, social pills, and a form that flips to a SENT. state. */

const RED = "#9a1f1f";
const BEBAS = "'Bebas Neue', sans-serif";
const GROTESK = "'Space Grotesk', sans-serif";
const MONO = "'Space Mono', monospace";

const EMAIL = "hello" + "@" + "vicky.tv";
const SOCIALS = ["INSTAGRAM", "TIKTOK", "X", "PATREON"];

const fieldStyle: React.CSSProperties = {
  fontFamily: GROTESK,
  fontSize: 15,
  color: "#f0f0f2",
  background: "#101013",
  border: "1px solid #26262a",
  borderRadius: 10,
  padding: "14px 16px",
  outline: "none",
};

export function PremiereContact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => clearTimeout(copyTimer.current), []);

  const copyEmail = () => {
    try {
      navigator.clipboard.writeText(EMAIL);
    } catch {
      /* clipboard unavailable */
    }
    setCopied(true);
    clearTimeout(copyTimer.current);
    copyTimer.current = setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      ref={sectionRef}
      style={{
        background: "transparent",
        fontFamily: GROTESK,
        color: "#e8e8ea",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <div className="w-full">
        <div
          className="overflow-hidden"
          style={{
            background:
              "radial-gradient(700px 420px at 12% 110%, rgba(154,31,31,.32), transparent 62%)",
          }}
        >
          <div className="grid grid-cols-1 gap-10 px-8 py-14 md:grid-cols-2 md:gap-14 md:px-16 md:py-20">
            {/* Left — pitch, email, socials */}
            <div className="flex flex-col gap-[22px]">
              <div style={{ fontFamily: BEBAS }} className="text-[clamp(3rem,8vw,84px)] leading-[0.94] text-[#f5f4f2]">
                GET IN
                <br />
                <span style={{ color: "transparent", WebkitTextStroke: `2px ${RED}` }}>TOUCH.</span>
              </div>
              <div className="max-w-[400px] text-[15px] leading-[1.6] text-[#a0a0a8]">
                Brand collabs, press, or just want to say a city Vicky should film next — every
                message gets read.
              </div>

              <div className="flex w-fit flex-wrap items-center gap-3.5 rounded-[12px] border border-[#26262a] bg-[#18181b] px-5 py-4">
                <span className="text-[12px] tracking-[0.16em] text-[#8a8a92]">BUSINESS</span>
                <span style={{ fontFamily: MONO }} className="text-[15px] text-[#f0f0f2]">
                  {EMAIL}
                </span>
                <button
                  onClick={copyEmail}
                  className="premiere-copy cursor-pointer rounded-full border px-3.5 py-[7px] text-[12px] font-bold tracking-[0.1em]"
                  style={{ fontFamily: GROTESK, color: "#d98777", background: "transparent", borderColor: RED }}
                >
                  {copied ? "COPIED ✓" : "COPY"}
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                {SOCIALS.map((s) => (
                  <span
                    key={s}
                    className="premiere-social cursor-pointer rounded-full border border-[#26262a] px-[18px] py-[9px] text-[13px] font-semibold tracking-[0.08em] text-[#b9b9c0]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — form / sent state */}
            <div className="flex flex-col gap-4 rounded-[14px] border border-[#26262a] bg-[#161618] p-8">
              {sent ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center gap-3 text-center">
                  <div style={{ fontFamily: BEBAS }} className="text-[48px] text-[#f5f4f2]">
                    SENT.
                  </div>
                  <div className="max-w-[300px] text-[14px] leading-[1.6] text-[#a0a0a8]">
                    Vicky reads everything between edits. Expect a reply within a few days.
                  </div>
                  <button
                    onClick={() => setSent(false)}
                    className="cursor-pointer text-[13px] font-semibold text-[#d98777] underline"
                    style={{ fontFamily: GROTESK, background: "none", border: "none" }}
                  >
                    Send another
                  </button>
                </div>
              ) : (
                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <input className="premiere-field" placeholder="Your name" style={fieldStyle} required />
                    <input
                      className="premiere-field"
                      placeholder="Email"
                      type="email"
                      style={fieldStyle}
                      required
                    />
                  </div>
                  <textarea
                    className="premiere-field"
                    placeholder="What's on your mind?"
                    rows={5}
                    style={{ ...fieldStyle, resize: "vertical" }}
                    required
                  />
                  <button
                    type="submit"
                    className="premiere-send cursor-pointer rounded-full py-[15px] text-[15px] font-bold tracking-[0.08em] text-white"
                    style={{ fontFamily: GROTESK, background: RED, border: "none" }}
                  >
                    SEND MESSAGE
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
