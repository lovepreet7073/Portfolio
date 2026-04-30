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

export const metadata = {
  title: "All Projects · Lovepreet Kaur",
  description:
    "A complete list of projects I've built — Shopify storefronts, MERN apps, WordPress sites, real-time tools, and more.",
};
