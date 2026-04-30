# Lovepreet Kaur — Portfolio

Personal portfolio site built with **Next.js 14**, **Tailwind CSS**, **TypeScript**, and **Framer Motion**. Dark/light theme, fully responsive (mobile bottom-nav included), and ready to deploy to Vercel.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS 3.4](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/) — animations
- [next-themes](https://github.com/pacocoursey/next-themes) — dark/light toggle
- [Lucide](https://lucide.dev/) — icons

## Run locally

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:3000
```

### Other scripts

```bash
npm run build   # production build
npm run start   # run production build locally
npm run lint    # eslint
```

## Folder structure

```text
portfolio/
├── app/
│   ├── globals.css          # Tailwind + CSS variables for both themes
│   ├── layout.tsx           # Root layout, fonts, metadata, ThemeProvider
│   └── page.tsx             # Home page composition
├── components/
│   ├── ui/                  # Reusable primitives
│   │   ├── Button.tsx
│   │   ├── Tag.tsx
│   │   └── SectionHeader.tsx
│   ├── ThemeProvider.tsx
│   ├── ThemeToggle.tsx
│   ├── Navbar.tsx           # Top nav (desktop)
│   ├── MobileNav.tsx        # Bottom tab bar (mobile)
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── ProjectCard.tsx
│   ├── Services.tsx
│   ├── ServiceCard.tsx
│   ├── Contact.tsx
│   ├── ContactForm.tsx
│   └── Footer.tsx
├── lib/
│   └── data.ts              # ⭐ Edit your bio, projects, skills here
├── public/
│   └── avatar-placeholder.svg
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Customizing

### Update your content

Almost all your content lives in **`lib/data.ts`**. Edit:

- `profile` — name, email, bio, socials, location
- `stats` — the four numbers in the hero
- `projects` — featured project cards
- `moreProjects` — extra projects (not currently rendered, swap into `projects` if you want)
- `services` — the three service cards
- `skillGroups` — your tech stack groups

### Replace the avatar

Drop your photo at `public/avatar.png` (or `.jpg`), then in `components/Hero.tsx` change the `<Image src="/avatar-placeholder.svg" ... />` line to your file.

### Add your resume

Drop your CV at `public/resume.pdf`. The `profile.resumeUrl` is already wired to `/resume.pdf`.

### Hook up the contact form (Formspree)

The contact form posts to Formspree. **It won't deliver email until you set up an account** — until then, the form will show a clear error and offer your direct email link as fallback.

Setup (~3 min, free):

1. Sign up at [formspree.io](https://formspree.io). Free tier: 50 submissions/month.
2. Create a new form. Set the **send to** email to `lovepreetkaur7073@gmail.com` (or wherever you want messages delivered).
3. Verify the email Formspree sends you (one-time confirmation).
4. Formspree gives you an endpoint like `https://formspree.io/f/xanblogp` — copy the ID (`xanblogp`).
5. In your project root, copy `.env.local.example` to `.env.local` and paste the ID:

   ```bash
   NEXT_PUBLIC_FORMSPREE_ID=xanblogp
   ```

6. Restart the dev server (`npm run dev`).

That's it. Test the form — you should receive the message in your inbox within seconds.

**For Vercel deployment**: add `NEXT_PUBLIC_FORMSPREE_ID` in your project → Settings → Environment Variables.

### Theme colors

Defined as CSS variables in `app/globals.css` under `:root` (light) and `.dark` (dark). Edit those RGB values to rebrand.

## Deploy

Push to GitHub, then import in [Vercel](https://vercel.com/new) — zero config required.

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:lovepreet7073/portfolio.git
git push -u origin main
```

## Accessibility & Performance

- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<article>`, `<aside>`)
- Skip-to-content link
- `prefers-reduced-motion` respected
- Focus-visible rings on interactive elements
- `next/image` for the avatar
- Google Fonts loaded via `next/font` (no CLS)
