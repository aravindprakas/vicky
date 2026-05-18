## Goal
Add scroll-triggered reveal animations (slide-in + fade-in) to all imagery across the site so each image animates into view only when its component enters the viewport.

## Approach
Build a small, reusable primitive instead of wiring IntersectionObserver into every component.

### 1. New hook: `src/hooks/use-in-view.tsx`
- Wraps `IntersectionObserver` with sensible defaults (`threshold: 0.15`, `rootMargin: '0px 0px -10% 0px'`, `once: true`).
- Returns `{ ref, inView }`.
- Respects `prefers-reduced-motion` — returns `inView: true` immediately so users with reduced motion get no animation.

### 2. New component: `src/components/site/Reveal.tsx`
- Props: `direction?: 'up' | 'left' | 'right' | 'fade'` (default `'up'`), `delay?: number` (ms), `className?`, `as?` element.
- Uses the hook; applies a base class with opacity-0 + translate, and a visible class that transitions to opacity-100 + translate-0.
- Transition: `transition-all duration-700 ease-out` with optional `style={{ transitionDelay }}` for stagger.

### 3. Keyframes / utilities (`src/styles.css`)
- Add `.reveal-base` and direction modifiers (`.reveal-up`, `.reveal-left`, `.reveal-right`, `.reveal-fade`) plus `.reveal-in` visible state.
- Keep duration/easing tokens consistent with existing motion in the site.

### 4. Apply Reveal to every image-bearing block
Wrap image containers (not the section wrappers) so layout stays intact:
- `Hero.tsx` — hero portrait card (slide-right), each social card (fade with staggered 80ms delay).
- `ServicesSection.tsx` — three service cards (slide-up, stagger 0/120/240ms).
- `CreativeServicesRow.tsx` — each card in the horizontal scroller (fade-up, stagger).
- `WhyChooseUs.tsx` — four staggered grid cards (slide-up, stagger 0/100/200/300ms).
- `TrustedByClients.tsx` — the two square client photos (slide-left for first, slide-right for second to mirror layout).
- `FeatureProjects.tsx` — six project image cards (fade-up, stagger by index, capped so it doesn't get sluggish).

No visual redesign — same layout, same images, only entrance animation added.

## Technical notes
- `once: true` so animations don't replay on scroll-back, matching typical agency-site behavior.
- Reduced-motion users skip animation entirely.
- All animation done with Tailwind utility classes + CSS transitions — no new dependencies.
- Stagger via inline `transitionDelay` style on each Reveal instance.
