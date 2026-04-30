"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { featuredProjects } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeader
          eyebrow="Featured Projects"
          title="Things I've Built"
          subtitle="A selection of my best work across stacks."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-md border border-accent/40 px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
