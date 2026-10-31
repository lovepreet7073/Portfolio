"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { designProjects, developmentProjects, projectGroups } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeader
          eyebrow="Selected Work"
          title="Design & Development"
          subtitle="Product design and UI engineering first, backed by real MERN/full-stack work."
        />

        <p className="mb-5 font-mono text-xs uppercase tracking-eyebrow text-accent">
          {projectGroups.design.eyebrow}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {designProjects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              highlight={i === 0}
            />
          ))}
        </div>

        <p className="mb-5 mt-14 font-mono text-xs uppercase tracking-eyebrow text-accent">
          {projectGroups.development.eyebrow}
        </p>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {developmentProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
          >
            View All Projects
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
