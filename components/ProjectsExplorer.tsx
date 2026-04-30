"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Filter } from "lucide-react";
import { projects } from "@/lib/data";
import { ProjectCard } from "./ProjectCard";

const filters = [
  { id: "all", label: "All" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "web", label: "Web / MERN" },
] as const;

type FilterId = (typeof filters)[number]["id"];

export function ProjectsExplorer() {
  const [active, setActive] = useState<FilterId>("all");

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.category === active),
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
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            All Work
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-text sm:text-5xl">
            Every project I&apos;ve shipped
          </h1>
          <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
          <p className="mt-5 max-w-2xl text-base text-muted sm:text-lg">
            From client e-commerce stores to real-time MERN apps — here&apos;s
            the full list. Live demos, source code, and case-study walkthroughs
            where available.
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
          <div className="flex flex-wrap items-center gap-1 rounded-lg border border-border bg-surface p-1">
            {filters.map((f) => {
              const count =
                f.id === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActive(f.id)}
                  className={`rounded-md px-3 py-1.5 font-mono text-xs transition-colors ${
                    active === f.id
                      ? "bg-accent text-bg"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {f.label}{" "}
                  <span className="opacity-70">({count})</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-16 text-center font-mono text-sm text-muted">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
