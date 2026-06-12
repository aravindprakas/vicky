import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { Hero } from "@/components/site/Hero";
import { TickerScroll } from "@/components/site/TickerScroll";
import { RevampManifesto } from "@/components/site/RevampManifesto";
import { RevampFooter } from "@/components/site/RevampFooter";
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
    <div className="min-h-screen bg-black">
      <CustomCursor />
      <StickyNavbar />
      <main>
        <Hero />
        <TickerScroll />
        <div style={{ background: "#121214" }}>
          <RevampManifesto />
          <RevampFooter />
        </div>
      </main>
      <Toaster richColors position="top-center" />
    </div>
  );
}
