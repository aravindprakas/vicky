import client1 from "@/assets/client-1.jpg";
import client2 from "@/assets/client-2.jpg";

export function TrustedByClients() {
  return (
    <section id="about" className="bg-background py-20 md:py-28">
      <div className="container-brand space-y-20 md:space-y-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-4">
            <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-cream-warm">
              <img src={client1} alt="Priya Menon, founder of Cocoa & Co" width={704} height={704} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="font-mono-brand text-[11px] uppercase tracking-widest text-rust">Trusted by Clients</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink uppercase leading-[1]">
              About the <span className="font-serif-italic font-normal text-rust">VickyVlogs</span> Universe
            </h2>
            <p className="mt-6 text-base md:text-lg text-ink/75 leading-relaxed">
              We are proud to be trusted by our customers who confidently choose us for their creative needs.
              Our commitment to quality, transparency, and consistency has helped us build strong and lasting
              relationships. Every project we take on is handled with full responsibility and attention to
              detail, ensuring that our clients feel secure and satisfied at every step.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink/75 leading-relaxed">
              We listen carefully to our clients' ideas and turn them into impactful content, maintaining
              clear communication throughout the process. We respect deadlines and ensure timely delivery
              without compromising on quality — customer satisfaction is always our top priority.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-8 md:order-1 order-2">
            <p className="font-mono-brand text-[11px] uppercase tracking-widest text-rust">Affordable Excellence</p>
            <h2 className="mt-3 font-display text-3xl md:text-5xl text-ink uppercase leading-[1]">
              Premium creative <br />
              that <span className="font-serif-italic font-normal text-rust">scales</span> with you.
            </h2>
            <p className="mt-6 text-base md:text-lg text-ink/75 leading-relaxed">
              We offer affordable pricing that makes high-quality content accessible to everyone — delivering
              the best value without compromising on creativity or professionalism. We maintain complete
              transparency in our pricing, ensuring there are no hidden costs or surprises, and every project
              is carefully planned to match your budget while still achieving excellent results.
            </p>
            <p className="mt-4 text-base md:text-lg text-ink/75 leading-relaxed">
              Flexible packages suit different needs and budgets. We make sure every rupee you invest brings
              visible results and growth — quality and affordability, hand in hand.
            </p>
          </div>
          <div className="md:col-span-4 md:order-2 order-1">
            <div className="aspect-square overflow-hidden rounded-[1.5rem] bg-cream-warm">
              <img src={client2} alt="Arjun Rao, Head of Brand at Lumen" width={704} height={704} loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
