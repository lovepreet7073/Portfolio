# COMPONENTS.md

> Shared UI components for this project. **Check here before creating any UI element.**
> Shared UI folder: `components/ui/`. Visual rules: DESIGN.md.

## Shared components

| Component | Path | Variants | Sizes | Notes |
|---|---|---|---|---|
| Button | `components/ui/Button.tsx` | primary, outline, ghost | one (sm/lg: planned — not needed yet) | Always `rounded-full`. Renders `<a>`/`Link`/`<button>` from one API via `href`/`external` props. |
| Tag | `components/ui/Tag.tsx` | one (accent pill) | one | Used for tech/skill labels on project and service cards. |
| SectionHeader | `components/ui/SectionHeader.tsx` | one | one | Eyebrow + title + underline + optional subtitle. Starts every section. |
| Input / Textarea | inline in `components/ContactForm.tsx` | default, error | one | **Planned extraction**: not yet a shared component — duplicated `className` logic between the two text inputs and the textarea. Low priority (3 fields, one file). |
| Card | — | — | — | **Not shared on purpose.** `ProjectCard` and `ServiceCard` differ enough in content/actions that a shared wrapper would need more props than markup it saves. Revisit only if a third, similar card type appears. |
| Lightbox | `components/ui/Lightbox.tsx` | one | one | Full-screen `object-contain` image viewer (ESC/backdrop-click to close, prev/next for multiple images). Used by `ProjectCaseStudy`'s "Key Screens"/"Screenshots" grid — thumbnails there are `aspect-video object-cover` and crop, so this is the only way to see a screenshot uncropped. |

## Page templates

Single-page portfolio — sections are composed directly in `app/page.tsx`, not templated. `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` reuse the same `Navbar` + `Footer` + `MobileNav` shell.

| Template | Path | Structure | Used by |
|---|---|---|---|
| Section | each `components/*.tsx` top-level component | `<section id>` → `container-x` → `SectionHeader` → content grid | About, Skills, Projects, Services, Contact |
| Shell | `app/layout.tsx` + per-route composition | `Navbar` + page content + `Footer` + `MobileNav` | every route |
| Case study | `components/ProjectCaseStudy.tsx`, routed by `app/projects/[slug]/page.tsx` | Numbered sections (01 Overview … 10 Links); a section only renders if the project data has real content for it — never filler | one per `featuredProjects` entry |

### ProjectCard

`components/ProjectCard.tsx` is a single compact size for all projects (`aspect-video` image, `p-5` content) — no large/featured layout variant. A `highlight` prop adds a small accent badge + border tint to the lead project without changing its size. `project.images` empty → renders a "Screenshots coming soon" placeholder. `project.layout` still exists on the data type for potential future use but no longer drives card sizing. Every card shows a small track badge ("Design" / "Dev") driven by `project.group` — see DESIGN.md §7.

### Project tracks and groups

`lib/data.ts` exports `designProjects` and `developmentProjects` (both filtered from `featuredProjects` by `project.group`), plus `projectGroups` with each track's section label/eyebrow. `Projects.tsx` (homepage) and `ProjectsExplorer.tsx` (`/projects`) both render the two tracks as separate labeled groups — **Product Design & UI Engineering** first, **MERN Stack & Web Development** second. `ProjectCaseStudy.tsx` reads `project.group` to pick section wording ("Key Screens" for design projects vs. "Screenshots" for development projects); everything else in the template is shared.

## Duplicates to merge

Nothing blocking. One acknowledged, low-priority item:

| Group | Shared target | Duplicates / raw usages | Files | Status |
|---|---|---|---|---|
| Form fields | (new) Input/Textarea | 2 raw `<input>` + 1 raw `<textarea>` with duplicated className logic | 1 (`ContactForm.tsx`) | todo — low priority, single file |

`ProjectCard`/`ServiceCard` flagged by the linter's `duplicateName` rule (both end in "Card") — **acknowledged, not a duplicate**. See DESIGN.md §7.

## Inconsistencies noted at setup

None outstanding — the codebase already used the token system consistently before this redesign; the re-theme only changed token *values* and radius choices, not the underlying pattern.

## Changelog

| Date | Change |
|---|---|
| 2026-10-01 | Redesign: dark-only palette (teal-green accent `#3F8672` on near-black `#1F2025`/`#16171A`), Onest typeface replacing Inter, pill radius for all interactive elements, `2xl`/`3xl` radius for cards, floating pill navbar, hero aurora-blob glow. Removed the light/dark toggle and `next-themes` dependency. Initial DESIGN.md + lint kit added. |
| 2026-10-01 | Projects section rebuilt around 5 featured case studies (Bluespond, AI UI Engineering Lab, Bidder Tracking System, Shopify E-commerce Projects, Buzz) with a new `app/projects/[slug]` case-study route. `ProjectCard` extended for editorial variants and a "coming soon" placeholder (Bluespond and AI UI Lab have no screenshots yet — see Known gaps below). Older WaxxBrandz/BiteBook entries moved to a lightweight `otherProjects` list. |
| 2026-10-01 | Compacted the Projects grid: `ProjectCard` is now one uniform small size (was a large hero card for the lead project) across homepage and `/projects`. `ProjectCaseStudy` condensed from numbered spec-document sections to a shorter header-led layout (overview under the title, Role/Technology side-by-side, no redundant bottom links row). Redesigned `Skills` section from bullet lists to `Tag` chip clouds per group, matching the rest of the site. Added Bluespond's live URL; added one illustrative Unsplash photo to Bidder Tracking System alongside its real screenshot (see Known gaps). |
| 2026-10-02 | Fixed cross-page nav: `Navbar`/`MobileNav` now route `#section` links to `/#section` when off the homepage (`usePathname()`-aware), so Home/Projects/Services/Contact work from any page, not just `/`. Added real Bluespond screenshots (`bluespond-1.png`, `bluespond-2.png`) and a real Archivi del Reparto screenshot (`shopify-1.png`) — both gaps below closed. Added `project.stores` for Shopify E-commerce Projects' 3 real client links (Cruel Hand Luke, Archivi del Reparto, Palm Hills Authentic), replacing a single guessed `liveUrl`. |
| 2026-10-02 | Added 2 illustrative Unsplash photos to AI UI Engineering Lab (a wireframe-sketch photo and a dark-mode code-editor photo — it has no real screenshots, being the meta/process project about this redesign itself). Replaced Bidder Tracking System's illustrative photo twice while dialing in the right fit — settled on a dark-mode live chart photo that visually matches real-time data tracking and the site's dark palette (`bidder-tracking-livedata.jpg`, Maxim Hopman / Unsplash). |
| 2026-10-31 | Repositioned the whole site around a dual identity — **Technical Product Designer / Design Engineer** (primary) with **MERN Stack Developer** (secondary) — per the user's detailed brief. `Project` gained a required `group: "design" \| "development"` field; projects now render as two labeled tracks everywhere (homepage, `/projects`, filter bar) instead of one flat list. Added 2 new placeholder case studies — **Travel Agency** (UI design concept) and **Delivery Partner** (dashboard UI design concept) — both `images: []`/no `tags`, pending real content from the user. Rewrote `skillGroups` from 4 dev-only groups to 5 (Product & UI/UX Design, Design Systems & UI Engineering, Frontend Development, Full Stack Development, AI & Development Workflows). Added a "Product & UI Design" service as the new first `services` entry. Hero rewritten: dual role pills (primary/secondary) + tagline replace the single "React.js & MERN Developer" line; added "Resume" and "Contact Me" CTAs (Resume download was previously unwired — `profile.resumeUrl` existed but no button used it). Updated `app/layout.tsx` metadata/JSON-LD and `app/opengraph-image.tsx` to match the new identity. |
| 2026-10-31 | Renamed the 3 design-track projects to their real deployed product names, with real live URLs and repo links from the user's Vercel dashboard: **Bluespond → Slotback** (`slotback-alpha.vercel.app`, `github.com/lovepreet7073/slotback`), **Travel Agency → Vendra** (`travel-webiste-two.vercel.app`, `github.com/lovepreet7073/Travel-website`), **Delivery Partner → Parcelio** (`parcelio-phi.vercel.app`, `github.com/lovepreet7073/delivery-partner`). All 3 ship with `images: []` (no screenshot tool was available this session — Playwright/Chrome DevTools MCP and the built-in browser all failed to connect); the old Bluespond/Travel Agency/Delivery Partner screenshots and placeholder copy were cleared rather than carried over mismatched. `bluespond-1.png`/`bluespond-2.png` in `public/` are now orphaned (show old "Bluespond" branding) — safe to delete once Slotback has real screenshots. |
| 2026-10-31 | Added `public/resume.pdf` from the user's finalized CV. Tightened the "Product & UI/UX Design" skill group to match that CV's actual claims (dropped UX Fundamentals/User Flows/Wireframing/Interaction Design, which weren't on it; added UI Component Design/Design-to-Code Implementation/Client Project Support, which were) — portfolio and resume should make the same claims. Reframed Vendra and Parcelio as UI design practice projects deployed for portfolio review, not production products, per the user's clarification — updated their `subtitle`/`category`/`description`. |
| 2026-10-31 | **"Studio Grid" visual redesign** — per the user's request (previous system "looked basic/AI-generated"), reversing the earlier dark-only decision and overhauling the look: restored `next-themes`/`ThemeProvider`/`ThemeToggle` (light+dark, `defaultTheme="system"`); replaced the teal accent with **Indigo Signal** (`#6366F1`/`#4F46E5` light, `#818CF8`/`#A5B4FC` dark) across both themes; added **Fraunces** as a 3rd font for display headlines/numerals (serif) alongside Onest (sans/body) and JetBrains Mono (labels/meta). New shared decorative utilities `.grid-lines` (subtle column-grid backdrop) and `.placeholder-tint` (indigo duotone for "coming soon" states, replaces the removed `.project-card-bg`). `Hero` gained a value-pillar strip (`lib/data.ts` → `valuePillars`) and grid-line backdrop; `About` gained a stat-block row (years/projects/skill-domains) replacing the plain fact list; `ProjectCard` gained an oversized serif index numeral. `app/icon.svg` and `app/opengraph-image.tsx` recolored to match (OG image stays dark-mode styled — share cards don't need to respond to the viewer's theme). |
| 2026-10-31 | Added 3 real Parcelio screenshots from the user (hero, testimonials carousel, how-it-works + mobile booking-flow preview) — `parcelio-1.png`/`-2.png`/`-3.png`. Corrected Parcelio's description/highlights to match what the screenshots actually show (a marketing/landing site with a how-it-works flow), not the generic "shipment dashboard" copy written before any screenshot existed. |
| 2026-10-31 | Added 4 real Vendra screenshots, curated from 7 the user sent per "use only good screens" — `vendra-1.png`..`-4.png` (hero, destinations grid, trip booking flow, login). Dropped a trip-detail screen (captured at an inconsistent ~480×960 mobile-like viewport that would crop badly in the `aspect-video` image containers) and 2 flight-search/payment screens that duplicated the booking-flow screen's subject matter — kept variety over volume. Updated `highlights` to match what's actually shown. |
| 2026-10-31 | Added 4 real Slotback screenshots from the user (`slotback-1.png`..`-4.png`: hero/booking search, category browse + staff calendar, multi-step booking flow, marketplace find-a-business) — matched the existing `highlights` well, no copy changes needed. All 7 featured projects now have real screenshots except none remain outstanding. Deleted the orphaned `bluespond-1.png`/`bluespond-2.png` (old "Bluespond"-branded screenshots, unreferenced since the Slotback rename). |
| 2026-10-31 | Added `components/ui/Lightbox.tsx` — the "Key Screens"/"Screenshots" grid on `ProjectCaseStudy` only ever showed `aspect-video object-cover` crops with no way to see a screenshot uncropped (user reported being unable to open them fully). Thumbnails are now buttons that open a full-screen `object-contain` lightbox (ESC/backdrop-click to close, prev/next arrows + counter when a project has multiple images). |

## Known gaps

- **AI UI Engineering Lab** and **Bidder Tracking System** each include illustrative stock photos (Unsplash, free license) alongside — or in AI UI Lab's case, in place of — real screenshots. Each `alt` text says so explicitly and names the photographer; none of them are the real product UI. This is the deliberate, explicitly-requested exception to DESIGN.md's "real screenshots only" rule; don't extend the pattern to other projects without the same explicit ask.
- None outstanding for screenshots — all 7 featured projects (Slotback, AI UI Engineering Lab, Bidder Tracking System, Vendra, Parcelio, Shopify E-commerce Projects, Buzz) now have at least one real image.
