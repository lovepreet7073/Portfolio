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

## Page templates

Single-page portfolio — sections are composed directly in `app/page.tsx`, not templated. `app/projects/page.tsx` and `app/projects/[slug]/page.tsx` reuse the same `Navbar` + `Footer` + `MobileNav` shell.

| Template | Path | Structure | Used by |
|---|---|---|---|
| Section | each `components/*.tsx` top-level component | `<section id>` → `container-x` → `SectionHeader` → content grid | About, Skills, Projects, Services, Contact |
| Shell | `app/layout.tsx` + per-route composition | `Navbar` + page content + `Footer` + `MobileNav` | every route |
| Case study | `components/ProjectCaseStudy.tsx`, routed by `app/projects/[slug]/page.tsx` | Numbered sections (01 Overview … 10 Links); a section only renders if the project data has real content for it — never filler | one per `featuredProjects` entry |

### ProjectCard

`components/ProjectCard.tsx` is a single compact size for all projects (`aspect-video` image, `p-5` content) — no large/featured layout variant. A `highlight` prop adds a small accent badge + border tint to the lead project without changing its size. `project.images` empty → renders a "Screenshots coming soon" placeholder. `project.layout` still exists on the data type for potential future use but no longer drives card sizing.

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

## Known gaps

- **AI UI Engineering Lab** and **Bidder Tracking System** each include illustrative stock photos (Unsplash, free license) alongside — or in AI UI Lab's case, in place of — real screenshots. Each `alt` text says so explicitly and names the photographer; none of them are the real product UI. This is the deliberate, explicitly-requested exception to DESIGN.md's "real screenshots only" rule; don't extend the pattern to other projects without the same explicit ask.
