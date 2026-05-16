# VickyVlogs — Single Page Site Plan

A vibrant, editorial single-page site for VickyVlogs (Indian comedy/vlogging influencer). All work is frontend, in TanStack Start route `src/routes/index.tsx`, broken into focused section components.

## Design system (src/styles.css)

Add semantic tokens in `oklch` matching the brief:
- `--brand-rust` ≈ #b03010 (deep burnt orange)
- `--brand-amber` ≈ #f07800 (vivid amber, primary CTA + Services bg)
- `--brand-cream` ≈ #fdf6f0 (light sections)
- `--brand-cream-warm` ≈ #ede8df (Why Choose Us bg)
- `--brand-ink` ≈ #111111 (dark sections)
- `--brand-rust-deep` ≈ #8c2a0c (Feature Projects + footer gradient)

Typography:
- Headings: **Archivo Black** (heavy bold sans)
- Body: **Inter**
- Italic accent words: **Instrument Serif italic**
- Mono (top bar): **JetBrains Mono**

Loaded via Google Fonts `<link>` in `__root.tsx` head.

Utilities: `.font-display`, `.font-serif-italic`, `.font-mono-xs`, watermark text class, marquee keyframe (`@keyframes marquee` 40s linear infinite).

## File structure

```
src/routes/index.tsx              ← assembles sections + SEO head
src/components/site/
  TopContactBar.tsx
  StickyNavbar.tsx                ← scroll-aware bg, hamburger on mobile
  MarqueeTicker.tsx
  Hero.tsx                        ← watermark + social cards row
  ServicesSection.tsx             ← 3 tall cards, middle scaled+rust
  CreativeServicesRow.tsx         ← arrows + 4 portrait cards
  WhyChooseUs.tsx                 ← staggered greyscale→color grid
  TrustedByClients.tsx            ← split testimonial blocks
  FeatureProjects.tsx             ← 3×2 rust grid
  ContactSection.tsx              ← pill radios + animated form
  SiteFooter.tsx                  ← 4 columns + bottom bar
src/assets/                       ← all generated images
```

## Section-by-section

1. **TopContactBar** — `bg-ink`, mono text, email + phone, hidden on small mobile.
2. **StickyNavbar** — fixed; uses `useEffect` scroll listener to swap from transparent → cream w/ shadow at >40px. Mobile: hamburger toggling overlay sheet. Right CTA = amber pill "Book a Demo →".
3. **MarqueeTicker** — full-width rust bar, CSS keyframe infinite scroll (duplicated content for seamless loop), pauses on hover.
4. **Hero** — cream bg, giant faded "Vicky" watermark (text-[18rem], opacity 0.06, absolute, behind). Left column: "Creativity Meets *Strategy*" with italic serif on "Strategy", two paragraphs, outlined CTA. Right column: tall rounded image card. Below the heading, a 4-col grid of branded social cards (YouTube red, Instagram gradient, Facebook blue, Mail amber).
5. **ServicesSection** — amber bg, centered heading with italic on "*beautiful*". 3 tall cards; middle card `scale-110 z-10 bg-rust-deep`. Each card has a label pill at the bottom + image.
6. **CreativeServicesRow** — same amber bg, heading left with two circular arrow buttons, 4 portrait cards on right inside horizontal scroll container (`overflow-x-auto snap-x`). Italic serif label bottom-left over gradient.
7. **WhyChooseUs** — `bg-cream-warm`. Top row: bold uppercase title left, "01 // SERVICES" label right. Hairline divider. 4 staggered portrait cards (cards 2 & 4 use `mt-10`). Default `grayscale`, hover removes filter + `scale-105`. Uppercase badge + bold white title overlaid via gradient.
8. **TrustedByClients** — white bg. Two stacked split rows (image+text, then text+image), all-caps headings.
9. **FeatureProjects** — `bg-rust-deep` text cream. Heading + "All works →" pill button. 3×2 responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`). Each card: rounded image, italic serif name, muted subtitle.
10. **ContactSection** — near-black bg. Left column: amber motivational card + dark contact card. Right: form with floating-label inputs, **Purpose** as pill radio group (Enquiry / Promotion / Others) using styled `<input type=radio>` + `peer` classes, textarea, amber rounded "Send Message →" button. Submit = local toast (no backend).
11. **SiteFooter** — gradient `from-rust-deep to-ink`. Logo + tagline top-left, 4 link columns (Features, Product, Company, Resources). Divider. Bottom: copyright + "Crafted by …" left, social icon buttons right.

## Images (generated via imagegen, saved to src/assets/)

Total ~13 images, all `fast` model except hero (`standard`):
- `hero-vicky.jpg` — portrait of energetic young Indian male creator with camera (standard, 768×1024)
- `service-consulting.jpg`, `service-design.jpg`, `service-engineering.jpg` (3 tall)
- `creative-web.jpg`, `creative-social.jpg`, `creative-ai.jpg`, `creative-3d.jpg` (4 portraits)
- `why-promotions.jpg`, `why-vlogging.jpg`, `why-vocal.jpg`, `why-writing.jpg` (4 portraits)
- `client-1.jpg`, `client-2.jpg` (Trusted by)
- 6 feature project images (`project-1`…`project-6.jpg`)

Imported as ES modules in each section component.

## Layout & polish rules

- Wrap each section in `<section className="mx-auto w-full max-w-[1280px] px-[clamp(1rem,4vw,2.5rem)]">` (full-bleed bg via outer div).
- All cards: `rounded-[1.25rem]` minimum.
- All image cards: gradient overlay `bg-gradient-to-t from-black/75 via-black/30 to-transparent`.
- Animations: existing `animate-fade-in`, plus marquee keyframe + custom hover scales.
- Mobile: grids → 1–2 cols via Tailwind responsive prefixes; navbar hamburger.

## SEO

`createFileRoute("/")` `head()` returns:
- title: "VickyVlogs — Comedy, Vlogging & Brand Promotions"
- meta description (<160 chars)
- og:title, og:description, og:image (= hero image), twitter:card summary_large_image

Single `<h1>` in Hero. Semantic `<section>`, `<nav>`, `<footer>`, alt text on every image.

## Out of scope

- No backend / form submission (toast only).
- No CMS — content is hardcoded from the brief.
- No dark-mode toggle (sections already alternate light/dark).

## Build order

1. Tokens + fonts in `styles.css` and `__root.tsx`.
2. Generate all images in parallel.
3. Write the 11 section components in parallel.
4. Assemble in `index.tsx` with SEO head.
5. Visual QA in preview (desktop + mobile).
