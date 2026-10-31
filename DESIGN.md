# DESIGN.md

> The visual source of truth for this project. All UI work follows this file.
> Token values live in: `app/globals.css` (CSS variables) and `tailwind.config.ts` (Tailwind mapping). This file and those must match.

| | |
|---|---|
| Stack | Next.js 14 (App Router), TypeScript, Tailwind CSS 3.4, Framer Motion |
| Reference screen | [components/Navbar.tsx](components/Navbar.tsx) + [components/Hero.tsx](components/Hero.tsx) (new sections copy their layout, spacing and shape language) |
| Shared UI folder | `components/ui/` (see COMPONENTS.md) |
| Source | screenshot (estimated, confirmed by user) — a token export (accent/surface/font) and a reference portfolio layout |
| Last updated | 2026-10-01 |

## 1. Direction

A dark, modern developer portfolio. Near-black charcoal surfaces, a single muted teal-green accent, generous pill-shaped rounding on anything interactive, and soft accent-colored glow instead of hard shadows. Confident and calm rather than loud — one accent color carries all emphasis. Dark-only (no light theme) per the reference and the user's direction.

## 2. Colors

Use tokens by **role**, never raw values. Dark-only — there is no light variant.

| Token | Value | Use for |
|---|---|---|
| accent | `#3F8672` | Primary actions, links, active states, icon badges |
| accent-strong | `#4FA98A` | Hover on accent, emphasis, gradients paired with accent |
| bg | `#16171A` | Page background |
| surface | `#1F2025` | Cards, panels, nav, inputs' containers |
| surface-2 | `#262830` | Nested surfaces inside a card (inputs, info rows) |
| border | `#2A2D33` | Dividers, card and input borders |
| text | `#FFFFFF` | Headings, body text |
| muted | `#9CA3AF` | Secondary text, captions, placeholders |

Status colors (unchanged, used sparingly): `emerald-500` (available/success badges), `amber-500` (in-progress), `red-500` (form errors). These are Tailwind defaults used only for status, never decoration — not promoted to named tokens because they appear in exactly these three places.

Key contrast: text `#FFFFFF` on bg `#16171A` ≈ 18.5:1. text on surface `#1F2025` ≈ 16.9:1. accent `#3F8672` on bg ≈ 3.3:1 (fails body-text AA — accent is never used for small body copy, only icons, borders, large headings and on-accent buttons where the foreground is `bg`/`#16171A`, which passes at ~9.4:1).

## 3. Typography

Font: **Onest** (weights 400/Regular, 500/Medium, 700/Bold via `next/font/google`), loaded as `--font-onest`. Mono: JetBrains Mono (unchanged) for code snippets, labels, and numeric/meta text — this split was already established and reads well with Onest.

| Token / class | Size / line height | Weight | Use for |
|---|---|---|---|
| `text-7xl` (lg) / `text-5xl` (base) | 1.1 | 700 | Hero name |
| `text-5xl` (sm) / `text-4xl` (base) | 1.15 | 700 | Section heading (SectionHeader) |
| `text-xl` / `text-2xl` | 1.3 | 700 | Card title |
| `text-base` / `text-lg` | 1.6 | 400 | Body |
| `text-sm` | 1.4 | 500 | Buttons, labels, nav links |
| `text-xs` | 1.4 | 400–600 | Captions, eyebrows (`tracking-eyebrow`), meta |

## 4. Spacing

Scale: Tailwind's default 4px scale (`1`=4px … `8`=32px … `12`=48px …). No custom spacing tokens.

- Page padding: `container-x` utility → `px-5 sm:px-8 lg:px-12`, `max-w-7xl`
- Gap between sections: `py-20 sm:py-24` per `<section>`
- Gap inside cards: `p-6` (standard), `p-4` (compact/info rows)
- Card padding: `p-6`

## 5. Radius and shadows

| Token | Value | Use for |
|---|---|---|
| radius-pill | `rounded-full` | Buttons, nav bar, nav links, tags/badges, icon-only circular buttons, filter chips |
| radius-md | `rounded-xl` (12px) | Icon badges, form inputs/textarea |
| radius-lg | `rounded-2xl` (16px) | Standard cards (skills, about/contact info rows, nav pill is separate) |
| radius-xl | `rounded-3xl` (24px) | Feature cards (project, service), large panels (hero code card, contact panel) |
| shadow-glow | `.glow` utility / `shadow-accent/*` | Hover lift on primary buttons and featured cards |
| shadow-lg/2xl | Tailwind defaults | Card hover elevation |

**Rule of thumb:** if it's clickable and short (button, nav link, tag, icon action) → pill. If it's a content container → `2xl` or `3xl` depending on size. Nothing uses `rounded-md` or `rounded-lg` anymore — those read as a different, smaller-radius design language than this one.

## 6. Layout

- Page structure: floating pill navbar (`fixed`, inset with `pt-4` margin, `rounded-full`) + single-column scrolling sections + bottom tab bar on mobile (`MobileNav`, `md:hidden`). **Same on every page.**
- Content container: `.container-x` → `max-w-7xl`, responsive side padding
- Section header: eyebrow label (accent, `tracking-eyebrow`) + large title + short accent underline bar + optional subtitle — `components/ui/SectionHeader.tsx`
- Grid: cards use `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (or `lg:grid-cols-4` for Skills), `gap-6` (`gap-5` for Skills)
- Breakpoints: Tailwind defaults (`sm` 640, `md` 768, `lg` 1024, `xl` 1280)

## 7. Components

Details and variants are in COMPONENTS.md. Rules:

- **Button** (`components/ui/Button.tsx`): variants `primary` (accent fill), `outline` (bordered), `ghost` (text only). Always `rounded-full`. One primary button per view/section.
- **Tag** (`components/ui/Tag.tsx`): pill, accent-tinted. Used for tech/skill labels on cards.
- **SectionHeader** (`components/ui/SectionHeader.tsx`): eyebrow + title + underline + optional subtitle. Every section starts with one.
- **Inputs/Textarea** (inline in `ContactForm.tsx`, not yet extracted): `rounded-xl`, `bg-surface-2`, `border-border`, focus ring `ring-accent/20` + `border-accent`. Error state: `border-red-500/60`.
- **Card**: no single shared `Card` primitive — `ProjectCard` and `ServiceCard` are distinct composites (different content shape, actions, badges), not raw duplicates. See COMPONENTS.md.

### States (all interactive components)

| State | Treatment |
|---|---|
| Hover | Accent border/text, slight `-translate-y` lift on cards and primary buttons |
| Focus | `focus-visible:ring-2 ring-accent ring-offset-2 ring-offset-bg` |
| Active | Filled pill background (`bg-accent/15 text-accent`) for nav/filter toggles |
| Disabled | `disabled:opacity-50 disabled:pointer-events-none` |
| Loading | Spinner (`Loader2` icon, `animate-spin`) replaces label text; button keeps its width |
| Error | `border-red-500/60` + red message with `AlertCircle` icon below the field |

## 8. Consistency rules

- Don't invent new colors, fonts, font sizes, spacing, radii or shadows. Use the tokens above.
- Don't use hardcoded values, arbitrary Tailwind values (`p-[13px]`) or inline styles — the one exception is `app/opengraph-image.tsx`, which is rendered by Satori at the edge and structurally requires inline styles; it's marked `design-ignore-file` and its hex values are hand-mirrored from this file.
- Reuse shared components. Never create page-specific copies. Add a variant instead.
- Keep the navbar, footer and mobile tab bar identical on every page.
- Before building a new screen, look at the reference screen (Navbar + Hero) and reuse its shape language: pill interactive elements, `2xl`/`3xl` content containers, accent glow.
- **Design references** (screenshots, websites): copy their layout only. Map every value to the tokens above. List anything that doesn't map, and ask.
- When something new is needed: token exists → use it. Component exists → reuse or extend it. Pattern can be adapted → adapt it. Otherwise → propose a new token or component, then document it.

## 9. Changing the design system

Don't change this file or the tokens just to make a task easier. If the system can't support a requirement:

1. Name the limitation.
2. Propose the change and check whether an existing pattern can be extended instead.
3. Get approval.
4. Update this file, the tokens and COMPONENTS.md together.

## 10. Enforcement

- Check command: `npm run lint && npm run lint:design`
- Rules and levels: `hexColor: error`, `rawColorFn: error`, `arbitraryValue: error`, `inlineStyle: error`, `duplicateName: warn`
- Edit hook: runs the check on every file Claude edits (`.claude/settings.json`)
- Visual check: Playwright MCP + Chrome DevTools MCP (`.mcp.json`) — approve the servers once when Claude Code first asks
- Known gaps: `eslint-plugin-tailwindcss` is not installed, so Tailwind's *default* palette classes (e.g. stray `bg-blue-500`) aren't caught automatically — only hardcoded hex/rgb and arbitrary values are. Relies on review for that gap.
