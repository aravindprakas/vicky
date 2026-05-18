import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { TopContactBar } from "@/components/site/TopContactBar";
import { VLoader } from "@/components/site/VLoader";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { MarqueeTicker } from "@/components/site/MarqueeTicker";
import { Hero } from "@/components/site/Hero";
import { ServicesSection } from "@/components/site/ServicesSection";
import { CreativeServicesRow } from "@/components/site/CreativeServicesRow";
import { WhyChooseUs } from "@/components/site/WhyChooseUs";
import { TrustedByClients } from "@/components/site/TrustedByClients";
import { FeatureProjects } from "@/components/site/FeatureProjects";
import { ContactSection } from "@/components/site/ContactSection";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SmoothScroll } from "@/components/site/SmoothScroll";
import { CustomCursor } from "@/components/site/CustomCursor";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VickyVlogs — Comedy, Vlogging & Brand Promotions in India" },
      {
        name: "description",
        content:
          "VickyVlogs is an Indian comedy creator and vlogger turning brands into culture moments. Reels, vlogs, voice work and full-stack creator campaigns.",
      },
      { property: "og:title", content: "VickyVlogs — Comedy, Vlogging & Brand Promotions" },
      {
        property: "og:description",
        content: "Creativity meets strategy. Brand promotions, vlogs, comedy and voice from one of India's most engaged creators.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VickyVlogsPage,
});

function VickyVlogsPage() {
  return (
    <div className="min-h-screen bg-cream">
      <SmoothScroll />
      <CustomCursor />
      <VLoader />
      <TopContactBar />
      <StickyNavbar />
      <main>
        <Hero />
        <MarqueeTicker />
        <ServicesSection />
        <CreativeServicesRow />
        <WhyChooseUs />
        <TrustedByClients />
        <FeatureProjects />
        <ContactSection />
      </main>
      <SiteFooter />
      <Toaster richColors position="top-center" />
    </div>
  );
}
