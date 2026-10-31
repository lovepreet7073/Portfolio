"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Filter } from "lucide-react";
import { featuredProjects, otherProjects, projectGroups, type ProjectGroup } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

const filters = [
  { id: "all", label: "All" },
  { id: "design", label: projectGroups.design.label },
  { id: "development", label: projectGroups.development.label },
] as const;

type FilterId = "all" | ProjectGroup;

export function ProjectsExplorer() {
  const [active, setActive] = useState<FilterId>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? featuredProjects
        : featuredProjects.filter((p) => p.group === active),
    [active]
  );

  return (
    <section className="pb-24 sm:pb-28">
      <div className="container-x">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> back to home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-eyebrow text-accent">
            All Work
          </p>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            Every project I&apos;ve shipped
          </h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
          <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
            Product design and UI engineering work, backed by real MERN and
            full-stack development. Open a project for the full case study.
          </p>
        </motion.div>

        {/* Filter bar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="flex items-center gap-1.5 font-mono text-xs text-muted">
            <Filter className="h-3.5 w-3.5 text-accent" />
            filter:
          </span>
          <div className="flex flex-wrap items-center gap-1 rounded-full border border-border bg-surface p-1">
            {filters.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActive(f.id)}
                className={`rounded-full px-3 py-1.5 font-mono text-xs transition-colors ${
                  active === f.id
                    ? "bg-accent text-bg"
                    : "text-muted hover:text-text"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-muted">
            No projects in this category yet.
          </p>
        )}

        {/* Other experiments */}
        <div className="mt-16 border-t border-border pt-10">
          <p className="mb-5 font-mono text-xs uppercase tracking-eyebrow text-accent">
            Other experiments
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {otherProjects.map((p) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent/40"
              >
                <div>
                  <p className="font-semibold text-text group-hover:text-accent">
                    {p.title}
                  </p>
                  <p className="mt-1 text-sm text-muted">{p.description}</p>
                </div>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-accent" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            More experiments on{" "}
            <a
              href="https://github.com/lovepreet7073"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              GitHub
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
