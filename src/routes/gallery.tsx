import { createFileRoute } from "@tanstack/react-router";
import { StickyNavbar } from "@/components/site/StickyNavbar";
import { BentoGallery } from "@/components/site/BentoGallery";
import { RevampFooter } from "@/components/site/RevampFooter";
import { CustomCursor } from "@/components/site/CustomCursor";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Visual Diary — VickyVlogs" },
      {
        name: "description",
        content:
          "A scrolling visual diary of VickyVlogs — frames from the road, the sets and the cities in between.",
      },
      { property: "og:title", content: "Visual Diary — VickyVlogs" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <div className="min-h-screen" style={{ background: "#121214" }}>
      <CustomCursor />
      <StickyNavbar />
      <main>
        {/* Hero banner — scroll-driven bento gallery */}
        <BentoGallery />
        <RevampFooter />
      </main>
    </div>
  );
}
