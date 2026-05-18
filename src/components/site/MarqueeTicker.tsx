const items = [
  "Engaging your Customers with our Social Media platforms",
  "Don't worry — We Are Here For Promotion",
  "We are Holding your Businesses with Media Power",
];

export function MarqueeTicker() {
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="bg-white text-rust overflow-hidden border-y border-rust/10">
      <div className="flex w-max animate-marquee whitespace-nowrap py-3">
        {loop.map((t, i) => (
          <span key={i} className="mx-8 flex items-center gap-8 font-display text-lg uppercase tracking-wide">
            {t}
            <span className="inline-block h-2 w-2 rounded-full bg-amber-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}
