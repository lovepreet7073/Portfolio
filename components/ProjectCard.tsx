"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Github,
  Users,
  Sparkles,
  Loader,
  Mail,
} from "lucide-react";
import type { Project } from "@/lib/data";
import { Tag } from "./ui/Tag";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5"
    >
      {/* Visual */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-accent/20 via-accent/5 to-transparent">
        {project.featured && (
          <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-md bg-accent px-2.5 py-1 text-xs font-semibold text-bg shadow-lg">
            <Sparkles className="h-3 w-3" /> Featured
          </span>
        )}
        {project.inProgress && (
          <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-md border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-500 backdrop-blur">
            <Loader className="h-3 w-3 animate-spin" /> In Progress
          </span>
        )}

        {project.image ? (
          <>
            <Image
              src={project.image}
              alt={`${project.title} screenshot`}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-surface/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
          </>
        ) : (
          <>
            <div
              aria-hidden
              className="project-card-bg absolute inset-0 opacity-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-mono text-6xl font-bold text-accent/30 transition-transform duration-500 group-hover:scale-110">
                {project.number}
              </span>
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-bold text-text transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <span className="font-mono text-sm text-muted">{project.number}</span>
        </div>

        <ul className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        <p className="mb-5 flex-1 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {project.clientCount !== undefined && (
          <div className="mb-4 flex items-center gap-5 border-t border-border pt-4 font-mono text-xs text-muted">
            <span className="flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-accent" />
              {project.clientCount}{" "}
              {project.clientCount === 1 ? "client" : "clients"}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ProjectActions project={project} />
        </div>
      </div>
    </motion.article>
  );
}

function ProjectActions({ project }: { project: Project }) {
  // Has live demo + repo: Live Demo button + GitHub icon
  if (project.liveUrl && project.repoUrl) {
    return (
      <>
        <a
          href={project.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.title} GitHub repository`}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          <Github className="h-4 w-4" />
        </a>
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-strong"
        >
          Live Demo <ArrowUpRight className="h-4 w-4" />
        </a>
      </>
    );
  }

  // Live demo only
  if (project.liveUrl) {
    return (
      <a
        href={project.liveUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-strong"
      >
        Live Demo <ArrowUpRight className="h-4 w-4" />
      </a>
    );
  }

  // Repo only
  if (project.repoUrl) {
    return (
      <a
        href={project.repoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 rounded-md border border-accent/40 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10"
      >
        <Github className="h-4 w-4" /> View Code
      </a>
    );
  }

  // Nothing public yet — invite contact
  return (
    <a
      href="#contact"
      className="flex flex-1 items-center justify-center gap-2 rounded-md border border-dashed border-border px-4 py-2.5 text-sm font-medium text-muted transition-colors hover:border-accent/40 hover:text-accent"
    >
      <Mail className="h-4 w-4" /> Request a walkthrough
    </a>
  );
}
