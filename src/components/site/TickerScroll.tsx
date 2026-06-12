const words = ["COMEDY", "VLOGS", "BRAND DEALS", "REELS", "VOICE WORK", "CREATOR"];
const GAP = 40;

function WordSet({ hidden }: { hidden?: boolean }) {
  return (
    <div
      className="ticker-set flex items-center flex-shrink-0"
      style={{ gap: GAP }}
      aria-hidden={hidden || undefined}
    >
      {words.map((word) => (
        <span key={word} className="flex items-center gap-[40px] flex-shrink-0">
          <span className="font-display text-cream whitespace-nowrap uppercase leading-none text-[clamp(2.5rem,5vw,4.5rem)]">
            {word}
          </span>
          <span className="text-rust text-[clamp(1rem,2vw,1.75rem)] leading-none flex-shrink-0">✦</span>
        </span>
      ))}
    </div>
  );
}

export function TickerScroll() {
  return (
    <section className="bg-black py-7 overflow-hidden">
      <div
        className="ticker-track flex items-center overflow-hidden"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 12.5%, black 87.5%, transparent 100%)",
        }}
      >
        <div className="flex" style={{ gap: GAP }}>
          <WordSet />
          <WordSet hidden />
        </div>
      </div>
    </section>
  );
}
