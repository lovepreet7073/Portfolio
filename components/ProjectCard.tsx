"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff, Loader, Star } from "lucide-react";
import type { Project } from "@/lib/data";

export function ProjectCard({
  project,
  index,
  highlight = false,
}: {
  project: Project;
  index: number;
  /** Small accent treatment (badge + border) for the lead project — no layout/size change. */
  highlight?: boolean;
}) {
  const cover = project.images[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.id}`}
        className={`group flex h-full flex-col overflow-hidden rounded-2xl border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 ${
          highlight ? "border-accent/30" : "border-border"
        }`}
      >
        {/* Visual */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-accent/20 via-accent/5 to-transparent">
          {highlight && (
            <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-bg shadow-lg">
              <Star className="h-3 w-3 fill-current" /> Main project
            </span>
          )}
          {project.inProgress && (
            <span className="absolute right-3 top-3 z-20 inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-2.5 py-1 text-xs font-medium text-amber-500 backdrop-blur">
              <Loader className="h-3 w-3 animate-spin" /> In Progress
            </span>
          )}

          {cover ? (
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-center">
              <div aria-hidden className="project-card-bg absolute inset-0 opacity-50" />
              <ImageOff className="relative h-5 w-5 text-accent/50" />
              <span className="relative font-mono text-xs text-muted">
                Screenshots coming soon
              </span>
            </div>
          )}
        </div>

        {/* Content — short on purpose; full detail lives on the case study page */}
        <div className="flex flex-1 flex-col p-5">
          <p className="mb-1.5 truncate font-mono text-xs uppercase tracking-eyebrow text-accent">
            {project.category}
          </p>

          <h3 className="text-lg font-bold text-text transition-colors group-hover:text-accent">
            {project.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-sm text-muted">
            {project.subtitle}
          </p>

          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
            View Case Study
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
