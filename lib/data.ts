import type { LucideIcon } from "lucide-react";
import {
  Layers,
  ShoppingBag,
  Globe,
  Code2,
  Database,
  Wrench,
} from "lucide-react";

export const profile = {
  name: "Lovepreet Kaur",
  initials: "LK",
  brand: "lk.dev",
  role: "React.js & MERN Developer",
  taglineParts: ["MERN", "Shopify", "WordPress"],
  shortBio:
    "I build fast, responsive web apps and custom e-commerce experiences. Two years of crafting digital solutions across React, MERN, Shopify, and WordPress.",
  longBio:
    "I'm a React.js Developer with 2+ years of experience building production-grade web applications. I focus on clean component structure, performant front-ends, and smooth user experiences — whether that's a custom Shopify storefront, a real-time MERN dashboard, or a bespoke WordPress site.",
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

export type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
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

// The 5 featured projects — the portfolio's main story. Order is deliberate:
// Bluespond (real SaaS) → AI UI Lab (differentiator) → Bidder Tracking (technical)
// → Shopify (client work) → Buzz (full-stack/real-time).
export const featuredProjects: Project[] = [
  {
    id: "bluespond",
    number: "01",
    title: "Bluespond",
    subtitle: "Business Management & Booking SaaS",
    category: "SaaS / Product Development",
    layout: "feature",
    description:
      "A SaaS platform designed for service businesses to manage bookings, customers, staff, payments and customer recovery workflows.",
    role: [
      "Frontend Development",
      "UI Implementation",
      "Feature Development",
      "Testing",
      "UX Improvements",
    ],
    tags: ["React", "Laravel", "Filament", "Tailwind CSS", "Stripe", "JavaScript"],
    highlights: [
      "Business onboarding",
      "Business profiles",
      "Booking & calendar management",
      "Staff management",
      "Customer management",
      "Payments",
      "Customer recovery",
      "Notifications",
      "Reports & insights",
    ],
    images: [
      { src: "/bluespond-1.png", alt: "Bluespond landing page — client booking search" },
      { src: "/bluespond-2.png", alt: "Bluespond category browse screen — \"What are you booking?\"" },
    ],
    liveUrl: "https://bluespond.kodionsoftwares.com/",
  },
  {
    id: "ai-ui-lab",
    number: "02",
    title: "AI UI Engineering Lab",
    subtitle: "AI-Assisted UI Development & Design Systems",
    category: "AI / UI Engineering / R&D",
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
    number: "03",
    title: "Bidder Tracking System",
    subtitle: "Real-Time Auction Monitoring Dashboard",
    category: "Real-Time Web Application",
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
    number: "04",
    title: "Shopify E-commerce Projects",
    subtitle: "Client Storefronts & Custom E-commerce Experiences",
    category: "Client / Commercial Work",
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
    number: "05",
    title: "Buzz",
    subtitle: "Real-Time Chat Application",
    category: "Full-Stack / Real-Time",
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
    title: "MERN Stack Development",
    description:
      "Custom full-stack apps with MongoDB, Express, React, and Node.js. REST APIs, authentication, real-time features, and deployment.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    Icon: Layers,
  },
  {
    number: "02",
    title: "Shopify Development",
    description:
      "Custom Shopify themes, Liquid templating, app integrations, and performance-optimized storefronts that convert visitors into customers.",
    tags: ["Liquid", "Themes", "Apps"],
    Icon: ShoppingBag,
  },
  {
    number: "03",
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
    title: "Frontend",
    Icon: Code2,
    items: [
      "React.js",
      "Next.js",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Redux",
      "Context API",
      "Responsive Design",
    ],
  },
  {
    title: "Backend & Database",
    Icon: Database,
    items: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "MongoDB"],
  },
  {
    title: "CMS & E-commerce",
    Icon: ShoppingBag,
    items: ["Shopify", "Liquid", "Theme Customization", "WordPress"],
  },
  {
    title: "Tools & Workflow",
    Icon: Wrench,
    items: ["Git", "GitHub", "Postman", "npm", "Chrome Extension APIs", "Agile"],
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;
