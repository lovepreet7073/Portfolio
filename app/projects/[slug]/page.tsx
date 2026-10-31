import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { featuredProjects } from "@/lib/data";
import { ProjectCaseStudy } from "@/components/ProjectCaseStudy";
import { Navbar } from "@/components/Navbar";
import { MobileNav } from "@/components/MobileNav";
import { Footer } from "@/components/Footer";

export function generateStaticParams() {
  return featuredProjects.map((p) => ({ slug: p.id }));
}

function getProject(slug: string) {
  return featuredProjects.find((p) => p.id === slug);
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const project = getProject(params.slug);
  if (!project) return {};

  const title = `${project.title} — Case Study`;
  const description = project.description;

  return {
    title,
    description,
    alternates: { canonical: `/projects/${project.id}` },
    openGraph: {
      type: "article",
      url: `/projects/${project.id}`,
      title: `${title} · Lovepreet Kaur`,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Lovepreet Kaur`,
      description,
    },
  };
}

export default function ProjectCaseStudyPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProject(params.slug);
  if (!project) notFound();

  return (
    <>
      <Navbar />
      <main className="pt-24 sm:pt-28">
        <ProjectCaseStudy project={project} />
      </main>
      <Footer />
      <MobileNav />
    </>
  );
}
