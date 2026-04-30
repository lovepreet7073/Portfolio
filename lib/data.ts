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

export type Project = {
  id: string;
  title: string;
  number: string;
  tags: string[];
  description: string;
  featured?: boolean;
  category: "ecommerce" | "web" | "mobile";
  liveUrl?: string;
  repoUrl?: string;
  inProgress?: boolean;
  clientCount?: number;
  image?: string;
};

// Single source of truth for all projects.
// `featured: true` projects show on the home page Projects section.
// All projects show on /projects.
// Add `liveUrl` if it has a public demo, `repoUrl` if code is on GitHub.
// Bidder Tracking System has neither — card auto-falls back to "In Progress".
export const projects: Project[] = [
  {
    id: "shopify-stores",
    number: "01",
    title: "Shopify Client Stores",
    featured: true,
    category: "ecommerce",
    tags: ["Shopify", "Liquid", "JavaScript"],
    description:
      "Customized storefronts for 6 brands — Archivi del Reparto, Cruel Hand Luke, Smokehalo, Workmode-2, Palm Hills, Dandy Hats. Liquid templating, responsive layouts, and third-party app integrations.",
    clientCount: 6,
    liveUrl: "https://archividelreparto.com",
    image: "/shopify-stores.png",
  },
  {
    id: "bidder-tracking",
    number: "02",
    title: "Bidder Tracking System",
    featured: true,
    category: "web",
    tags: ["React", "Node.js", "MongoDB", "Socket.IO"],
    description:
      "Live dashboard to track and analyze bidder activity during online auctions. Real-time data updates via WebSockets without page refresh.",
    inProgress: true,
    image: "/bidder-tracking-system.png",
  },
  {
    id: "waxxbrandz",
    number: "03",
    title: "WaxxBrandz",
    featured: true,
    category: "ecommerce",
    tags: ["WordPress", "PHP", "JavaScript"],
    description:
      "Custom WordPress site with bespoke theme, fully responsive design, and front-end performance optimizations for a real client brand.",
    liveUrl: "https://waxxbrandz.com",
    image: "/wordpress-waxxbrandz.png",
  },
  {
    id: "buzz-chat",
    number: "04",
    title: "Buzz — Chat App",
    category: "web",
    tags: ["React", "Socket.IO", "Node.js", "MongoDB"],
    description:
      "Real-time messaging app with custom WebSocket hook, typing indicators, and online presence.",
    repoUrl: "https://github.com/lovepreet7073",
    image: "/chat-app.png",
  },
  {
    id: "bitebook",
    number: "05",
    title: "BiteBook — Recipe App",
    category: "web",
    tags: ["React", "Express", "MongoDB"],
    description:
      "Recipe sharing platform with image uploads, comments, REST API backend, and responsive UI.",
    repoUrl: "https://github.com/lovepreet7073",
    image: "/recipe-website.png",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

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
