import type { LucideIcon } from "lucide-react";
import {
  Layers,
  ShoppingBag,
  Globe,
  Code2,
  Database,
  PenTool,
  Component,
  Sparkles,
  Palette,
} from "lucide-react";

export const profile = {
  name: "Lovepreet Kaur",
  initials: "LK",
  brand: "lk.dev",
  primaryRole: "Technical Product Designer",
  secondaryRole: "MERN Stack Developer",
  tagline: "Designing digital experiences. Engineering what's next.",
  shortBio:
    "I combine product design thinking, UI engineering and AI-assisted development to create intuitive, visually compelling and functional digital experiences — grounded in 2+ years of shipping real production apps across React, MERN, Shopify and WordPress.",
  longBio:
    "I started as a React.js / MERN Developer, building production apps across e-commerce, SaaS and real-time systems. That hands-on build experience is what's pulling me toward technical product design — I care as much about how an interface should look, flow and feel as I do about how it gets built. I'm expanding deliberately into UI/UX and design-systems work, backed by real shipped projects rather than theory: UI improvements on a live SaaS product, a design-systems lab built with Claude Code, and the frontend engineering to make any of it real.",
  location: "Rupnagar, Punjab, India",
  email: "lovepreetkaur7073@gmail.com",
  available: true,
  yearsCoding: "2+",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/lovepreet7073",
    linkedin: "https://www.linkedin.com/in/lovepreetkaur2611",
    email: "mailto:lovepreetkaur7073@gmail.com",
    whatsapp: "https://wa.me/917009772456?text=Hi%20Lovepreet%21",
  },
} as const;

export type ProjectImage = { src: string; alt: string };

// "feature" = large hero case study, "experimental" = design-focused,
// "dashboard" = technical/data-driven, "gallery" = visual e-commerce grid,
// "interactive" = full-stack/product card. Drives ProjectCard's layout variant.
export type ProjectLayout =
  | "feature"
  | "experimental"
  | "dashboard"
  | "gallery"
  | "interactive";

// Which of the two portfolio tracks a project belongs to. Drives the section
// it appears under (Projects.tsx / ProjectsExplorer.tsx) and which case-study
// section labels ProjectCaseStudy uses.
export type ProjectGroup = "design" | "development";

export const projectGroups: Record<ProjectGroup, { label: string; eyebrow: string }> = {
  design: {
    label: "Product Design & UI Engineering",
    eyebrow: "Design & UI Engineering",
  },
  development: {
    label: "MERN Stack & Web Development",
    eyebrow: "Web Development",
  },
};

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  group: ProjectGroup;
  layout: ProjectLayout;
  description: string;
  /** My contribution — shown only when set (not every project needs it). */
  role?: string[];
  tags: string[];
  /** Key features / highlights — rendered as a bullet list on the card and case study. */
  highlights?: string[];
  /** Pipeline/process steps — currently only AI UI Engineering Lab has one. */
  process?: string[];
  /** Multiple named live links — e.g. several client stores for one grouped project. */
  stores?: { name: string; url: string }[];
  /**
   * Real screenshots first. Empty array renders a "screenshot coming soon" placeholder.
   * An illustrative stock photo (clearly labeled as such in `alt`) is acceptable only
   * as a supplementary image alongside at least one real screenshot — never as a
   * stand-in for missing product screenshots.
   */
  images: ProjectImage[];
  liveUrl?: string;
  repoUrl?: string;
  /** Client/professional work with no public demo or repo — case study shows a note instead of dead links. */
  confidential?: boolean;
  inProgress?: boolean;
  clientCount?: number;
};

// The 7 featured projects — the portfolio's main story, split into two tracks
// (see `group`): Product Design & UI Engineering leads, MERN Stack &
// Web Development backs it up with real shipped technical work.
export const featuredProjects: Project[] = [
  {
    id: "slotback",
    number: "01",
    title: "Slotback",
    subtitle: "Business Management & Booking SaaS",
    category: "SaaS Product UI & Experience Improvements",
    group: "design",
    layout: "feature",
    description:
      "Slotback is a SaaS booking and business-management platform for service businesses — scheduling, customers, staff, payments and customer recovery workflows.",
    role: [
      "UI Implementation",
      "UX Improvements",
      "Frontend Development",
      "Feature Development",
      "Testing",
    ],
    tags: ["React", "Laravel", "Filament", "Tailwind CSS", "Stripe", "JavaScript"],
    highlights: [
      "Business onboarding & profiles",
      "Booking & calendar management",
      "Staff management",
      "Customer management",
      "Payments & customer recovery",
      "Notifications",
      "Reports & insights",
      "Reusable UI components",
    ],
    images: [
      { src: "/slotback-1.png", alt: "Slotback hero section — client booking search" },
      { src: "/slotback-2.png", alt: "Slotback category browse and staff calendar view" },
      { src: "/slotback-3.png", alt: "Slotback multi-step booking flow — service selection" },
      { src: "/slotback-4.png", alt: "Slotback marketplace — find a business" },
    ],
    liveUrl: "https://slotback-alpha.vercel.app",
    repoUrl: "https://github.com/lovepreet7073/slotback",
  },
  {
    id: "vendra",
    number: "02",
    title: "Vendra",
    subtitle: "Travel Agency Website — UI Design Practice",
    category: "UI Design Practice Project",
    group: "design",
    layout: "experimental",
    description:
      "Vendra — \"Travel, enjoy and live a new and full life.\" A travel agency website built as a UI design practice project and deployed for portfolio review — not a production product. Focused on homepage composition, destination exploration and visual hierarchy.",
    tags: [],
    highlights: [
      "Hero with search",
      "Destinations grid with pricing",
      "Multi-step trip booking flow",
      "Flight search & results",
      "Login / auth screen",
      "Responsive layouts",
    ],
    images: [
      { src: "/vendra-1.png", alt: "Vendra hero section — \"Travel, enjoy and live a new and full life\"" },
      { src: "/vendra-2.png", alt: "Vendra destinations grid with pricing and ratings" },
      { src: "/vendra-3.png", alt: "Vendra trip booking flow — departure dates, travellers and accommodation" },
      { src: "/vendra-4.png", alt: "Vendra login screen" },
    ],
    liveUrl: "https://travel-webiste-two.vercel.app",
    repoUrl: "https://github.com/lovepreet7073/Travel-website",
  },
  {
    id: "parcelio",
    number: "03",
    title: "Parcelio",
    subtitle: "Parcel Shipping & Tracking UI — UI Design Practice",
    category: "UI Design Practice Project",
    group: "design",
    layout: "experimental",
    description:
      "Parcelio — \"Ship it. Track it. Relax.\" A parcel delivery marketing site built as a UI design practice project and deployed for portfolio review — not a production product. Hero, testimonials and a how-it-works flow with a live mobile-booking preview.",
    tags: [],
    highlights: [
      "Hero with live-tracking CTA",
      "Testimonials carousel",
      "How-it-works process flow",
      "Mobile booking flow preview",
      "Responsive layouts",
    ],
    images: [
      { src: "/parcelio-1.png", alt: "Parcelio hero section — \"Ship parcels with confidence, track them in real time\"" },
      { src: "/parcelio-2.png", alt: "Parcelio testimonials carousel" },
      { src: "/parcelio-3.png", alt: "Parcelio \"How to get started\" process steps with mobile booking-flow preview" },
    ],
    liveUrl: "https://parcelio-phi.vercel.app",
    repoUrl: "https://github.com/lovepreet7073/delivery-partner",
  },
  {
    id: "ai-ui-lab",
    number: "04",
    title: "AI UI Engineering Lab",
    subtitle: "Design Systems, AI & Frontend Experiments",
    category: "Design Systems & AI-Assisted UI Engineering",
    group: "design",
    layout: "experimental",
    description:
      "An exploration of AI-assisted frontend development using Claude Code, structured design systems, reusable components and design tokens to create consistent web interfaces.",
    tags: [
      "Claude Code",
      "Claude Code Skills",
      "Claude Code Plugins",
      "Design Systems",
      "Design Tokens",
      "Reusable Components",
      "Responsive Design",
    ],
    highlights: [
      "Claude Code",
      "Claude Code skills",
      "Claude Code plugins",
      "DESIGN.md / design systems",
      "Design tokens",
      "Reusable components",
      "Responsive UI",
      "UI consistency",
      "AI-assisted development",
    ],
    process: [
      "Idea",
      "UI Design",
      "DESIGN.md",
      "Design Tokens",
      "Reusable Components",
      "Claude Code",
      "Implementation",
      "Visual Testing",
    ],
    images: [
      {
        src: "/ai-ui-lab-wireframe.jpg",
        alt: "Illustrative photo of wireframe sketches on a tablet (stand-in photo — Alvaro Reyes / Unsplash, not a real screenshot)",
      },
      {
        src: "/ai-ui-lab-code.jpg",
        alt: "Illustrative photo of a dark-mode code editor (stand-in photo — Jakub Żerdzicki / Unsplash, not a real screenshot)",
      },
    ],
  },
  {
    id: "bidder-tracking",
    number: "05",
    title: "Bidder Tracking System",
    subtitle: "Real-Time Auction Monitoring Dashboard",
    category: "Full-Stack Web Application",
    group: "development",
    layout: "dashboard",
    description:
      "A real-time dashboard for tracking and analyzing bidder activity during online auctions.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "WebSockets / Socket.IO"],
    highlights: [
      "Real-time bidder activity",
      "Live dashboard updates",
      "WebSocket communication",
      "Data-driven interface",
      "Updates without page refresh",
    ],
    images: [
      { src: "/bidder-tracking-system.png", alt: "Bidder Tracking System dashboard" },
      {
        src: "/bidder-tracking-livedata.jpg",
        alt: "Illustrative dark-mode live data chart, evoking real-time bid activity (stand-in photo — Maxim Hopman / Unsplash, not the real product UI)",
      },
    ],
    inProgress: true,
  },
  {
    id: "shopify-ecommerce",
    number: "06",
    title: "Shopify E-commerce Projects",
    subtitle: "Client Storefronts & Custom E-commerce Experiences",
    category: "Client / Commercial Work",
    group: "development",
    layout: "gallery",
    description:
      "A collection of Shopify storefronts customized for client brands using Liquid, responsive layouts, JavaScript and third-party integrations.",
    tags: ["Shopify Liquid", "Theme Customization", "Custom Sections", "JavaScript"],
    highlights: [
      "Shopify Liquid",
      "Theme customization",
      "Custom sections",
      "Responsive layouts",
      "JavaScript",
      "Third-party integrations",
    ],
    images: [
      { src: "/shopify-1.png", alt: "Archivi del Reparto — client Shopify storefront" },
      { src: "/shopify-stores.png", alt: "Shopify client storefront" },
    ],
    stores: [
      { name: "Cruel Hand Luke", url: "https://cruelhandluke.com/" },
      { name: "Archivi del Reparto", url: "https://adr-001.com/" },
      { name: "Palm Hills Authentic", url: "https://www.palmhillsauthentic.com/" },
    ],
    clientCount: 6,
  },
  {
    id: "buzz",
    number: "07",
    title: "Buzz",
    subtitle: "Real-Time Chat Application",
    category: "Full-Stack / Real-Time",
    group: "development",
    layout: "interactive",
    description:
      "A full-stack messaging application focused on real-time communication and interactive chat experiences.",
    tags: ["React.js", "Node.js", "MongoDB", "Socket.IO"],
    highlights: [
      "Real-time messaging",
      "Online/offline status",
      "Typing indicators",
      "WebSocket communication",
      "Custom WebSocket hook",
    ],
    images: [{ src: "/chat-app.png", alt: "Buzz chat application interface" }],
    repoUrl: "https://github.com/lovepreet7073",
  },
];

export const designProjects = featuredProjects.filter((p) => p.group === "design");
export const developmentProjects = featuredProjects.filter((p) => p.group === "development");

// Smaller/earlier work — kept as lightweight links, not full case studies.
export type OtherProject = {
  title: string;
  description: string;
  href: string;
};

export const otherProjects: OtherProject[] = [
  {
    title: "WaxxBrandz",
    description: "Custom WordPress theme, built responsive and performance-tuned for a client brand.",
    href: "https://waxxbrandz.com",
  },
  {
    title: "BiteBook — Recipe App",
    description: "Recipe sharing platform with image uploads, comments, and a REST API backend.",
    href: "https://github.com/lovepreet7073",
  },
];

export type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
  Icon: LucideIcon;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Product & UI Design",
    description:
      "Interface design for web apps and dashboards, from wireframes through to a consistent, documented set of design tokens and components.",
    tags: ["UI Design", "Design Systems", "Figma-to-Code", "Prototyping"],
    Icon: Palette,
  },
  {
    number: "02",
    title: "MERN Stack Development",
    description:
      "Custom full-stack apps with MongoDB, Express, React, and Node.js. REST APIs, authentication, real-time features, and deployment.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    Icon: Layers,
  },
  {
    number: "03",
    title: "Shopify Development",
    description:
      "Custom Shopify themes, Liquid templating, app integrations, and performance-optimized storefronts that convert visitors into customers.",
    tags: ["Liquid", "Themes", "Apps"],
    Icon: ShoppingBag,
  },
  {
    number: "04",
    title: "WordPress Development",
    description:
      "Bespoke WordPress themes, WooCommerce stores, and plugin development. Fast, secure, SEO-ready sites for any business.",
    tags: ["WooCommerce", "Plugins", "SEO"],
    Icon: Globe,
  },
];

export type SkillGroup = {
  title: string;
  Icon: LucideIcon;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Product & UI/UX Design",
    Icon: PenTool,
    items: [
      "Interface Design",
      "Responsive UI Design",
      "UI Component Design",
      "Design-to-Code Implementation",
      "Design Consistency",
      "Client Project Support",
    ],
  },
  {
    title: "Design Systems & UI Engineering",
    Icon: Component,
    items: [
      "Design Tokens",
      "Typography Systems",
      "Colour Systems",
      "Spacing Systems",
      "Reusable Components",
      "Component Architecture",
      "Design-to-Code Workflows",
    ],
  },
  {
    title: "Frontend Development",
    Icon: Code2,
    items: [
      "React.js",
      "Next.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Responsive Development",
      "API Integration",
    ],
  },
  {
    title: "Full Stack Development",
    Icon: Database,
    items: ["Node.js", "Express.js", "MongoDB", "REST APIs", "Socket.IO"],
  },
  {
    title: "AI & Development Workflows",
    Icon: Sparkles,
    items: [
      "Claude",
      "Claude Code",
      "Claude Code Skills",
      "Claude Code Plugins",
      "AI-Assisted UI Development",
      "Workflow Automation",
    ],
  },
];

// Short, recruiter-facing value pillars shown under the Hero bio.
export const valuePillars = [
  "Product-minded",
  "Ships fast",
  "AI-native workflow",
  "Real production experience",
] as const;

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;
