import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { Navbar } from "@/components/Navbar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

export default function ProjectsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <ProjectsExplorer />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}

export const metadata: Metadata = {
  title: "All Projects",
  description:
    "A complete list of projects by Lovepreet Kaur — Shopify storefronts, MERN apps, WordPress sites, real-time tools, and more.",
  alternates: { canonical: "/projects" },
  openGraph: {
    type: "website",
    url: "/projects",
    title: "All Projects · Lovepreet Kaur",
    description:
      "A complete list of projects by Lovepreet Kaur — Shopify storefronts, MERN apps, WordPress sites, real-time tools, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Projects · Lovepreet Kaur",
    description:
      "A complete list of projects by Lovepreet Kaur — Shopify storefronts, MERN apps, WordPress sites, real-time tools, and more.",
  },
};
