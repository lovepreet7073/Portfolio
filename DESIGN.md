# DESIGN.md

> The visual source of truth for this project. All UI work follows this file.
> Token values live in: `app/globals.css` (CSS variables) and `tailwind.config.ts` (Tailwind mapping). This file and those must match.

| | |
|---|---|
| Stack | Next.js 14 (App Router), TypeScript, Tailwind CSS 3.4, Framer Motion |
| Reference screen | [components/Navbar.tsx](components/Navbar.tsx) + [components/Hero.tsx](components/Hero.tsx) (new sections copy their layout, spacing and shape language) |
| Shared UI folder | `components/ui/` (see COMPONENTS.md) |
| Source | user brief ("Studio Grid" creative direction, approved via plan) — palette is the user-confirmed **Indigo Signal** direction; layout motifs (grid lines, serif display numerals, stat blocks) are this session's proposal |
| Last updated | 2026-10-31 |

## 1. Direction

**"Studio Grid"** — a design-engineer's portfolio that visibly shows its own craft, for a dual-track professional: **Technical Product Designer / Design Engineer** (primary) and **MERN Stack Developer** (secondary). Light **and** dark theme (`next-themes`, `.dark` class), both built on one indigo accent. A 3-font system — serif display (Fraunces) for headlines/numerals, sans (Onest) for body/UI, mono (JetBrains Mono) for labels/meta — stands in for the design+engineering duality itself. Subtle vertical grid-rule lines and oversized serif index numbers are the recurring signature motif (a visible layout grid, like a design tool's canvas). Layouts lean asymmetric/editorial rather than uniformly centered. Pill radius on interactive elements and soft accent glow carry over from the previous dark-only system; the previous teal accent and single-theme constraint do not.

## 2. Colors

Use tokens by **role**, never raw values. Both light and dark are first-class — `:root` holds light, `.dark` overrides.

| Token | Light | Dark | Use for |
|---|---|---|---|
| accent | `#6366F1` (indigo-500) | `#818CF8` (indigo-400) | Primary actions, links, active states, icon badges |
| accent-strong | `#4F46E5` (indigo-600) | `#A5B4FC` (indigo-300) | Hover on accent, emphasis, gradients paired with accent |
| bg | `#FFFFFF` | `#0B0D12` | Page background |
| surface | `#F8FAFC` | `#151823` | Cards, panels, nav, inputs' containers |
| surface-2 | `#F1F5F9` | `#1C2030` | Nested surfaces inside a card (inputs, info rows) |
| border | `#E2E8F0` | `#262B3D` | Dividers, card and input borders |
| text | `#0F172A` | `#F8FAFC` | Headings, body text |
| muted | `#64748B` | `#94A3B8` | Secondary text, captions, placeholders |

Note the hover direction flips by mode: `accent-strong` is *darker* than `accent` in light mode but *lighter* than `accent` in dark mode — both move toward more contrast/pop against their own background, not toward a fixed "darker" rule.

Status colors (unchanged, used sparingly): `emerald-500` (available/success badges), `amber-500` (in-progress), `red-500` (form errors). Tailwind defaults used only for status, never decoration — not promoted to named tokens because they appear in exactly these three places, and the 500-weight values hold reasonable contrast on both a near-white and a near-black surface.

Key contrast: text/bg ≈15:1+ in both modes (AAA). accent/bg ≈8:1 in dark (fine for body-sized accent text). accent/bg ≈4.6:1 in light (AA for large text/UI only — accent stays reserved for icons, borders, large headings and on-accent buttons where the foreground is white, which passes comfortably).

Theme default: system preference (`next-themes`, `defaultTheme="system"`), with a manual toggle (`components/ThemeToggle.tsx`) in the navbar.

## 3. Typography

Three fonts, each with a job:

- **Fraunces** (serif, `--font-fraunces`, `font-serif`) — display only: hero name, section titles (`SectionHeader`), project/case-study `h1`s, project card titles, the large stat numerals in About, the oversized index numerals on project cards. Never body text.
- **Onest** (sans, `--font-onest`, default `font-sans`) — all body copy and UI text (buttons, nav, form fields, descriptions).
- **JetBrains Mono** (`--font-mono`, `font-mono`) — eyebrows/labels (`tracking-eyebrow`), meta text, numbers-as-data (project numbers in list contexts, filter counts).

| Token / class | Size / line height | Weight | Font | Use for |
|---|---|---|---|---|
| `text-7xl` (lg) / `text-5xl` (base) | 1.05 | 600 (serif) | Fraunces | Hero name |
| `text-5xl` (sm) / `text-4xl` (base) | 1.1 | 600 (serif) | Fraunces | Section heading |
| `text-xl` (serif) | 1.3 | 600 | Fraunces | Card/case-study title |
| `text-base` / `text-lg` | 1.6 | 400 | Onest | Body |
| `text-sm` | 1.4 | 500 | Onest | Buttons, labels, nav links |
| `text-xs` | 1.4 | 400–600 | JetBrains Mono | Captions, eyebrows, meta, data numerals |

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
| `.grid-lines` | repeating vertical `border`-colored rules, 12 columns | Decorative column-grid backdrop (Hero) — the "Studio Grid" motif, always low-opacity (`opacity-5`) |
| `.placeholder-tint` | two radial accent/accent-strong gradients | Indigo-tinted duotone treatment on "screenshot coming soon" placeholder states (`ProjectCard`, `ProjectCaseStudy`) |

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
- **Track badge** (inline pattern in `ProjectCard.tsx` / `ProjectCaseStudy.tsx`, not yet extracted): a small pill marking which of the two project tracks (`project.group`) a project belongs to — `bg-accent/15 text-accent` for `"design"`, `bg-surface-2 text-muted` for `"development"`. Reuses existing tokens; no new colors.
- **ThemeToggle** (`components/ThemeToggle.tsx`) + **ThemeProvider** (`components/ThemeProvider.tsx`, wraps `next-themes`): sun/moon icon-swap button in the navbar; `attribute="class"` toggles `.dark` on `<html>`. `app/layout.tsx` has `suppressHydrationWarning` on `<html>` (required by `next-themes`) — don't remove it.

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
