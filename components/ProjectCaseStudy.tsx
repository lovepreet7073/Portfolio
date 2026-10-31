"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  Github,
  ImageOff,
  Loader,
  Lock,
} from "lucide-react";
import type { Project } from "@/lib/data";
import { Tag } from "./ui/Tag";
import { Lightbox } from "./ui/Lightbox";

function Block({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-3 font-mono text-xs uppercase tracking-eyebrow text-accent">
        {label}
      </p>
      {children}
    </div>
  );
}

export function ProjectCaseStudy({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pb-24 sm:pb-28"
    >
      <div className="container-x max-w-3xl">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" /> all projects
        </Link>

        {/* Header + overview */}
        <header className="mb-10">
          <div className="mb-3 flex items-center gap-2">
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-xs font-semibold uppercase ${
                project.group === "design"
                  ? "bg-accent/15 text-accent"
                  : "bg-surface-2 text-muted"
              }`}
            >
              {project.group === "design" ? "Design" : "Dev"}
            </span>
            <p className="font-mono text-xs uppercase tracking-eyebrow text-accent">
              {project.category}
            </p>
          </div>
          <h1 className="font-serif text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 text-lg text-muted">{project.subtitle}</p>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            {project.description}
          </p>

          {project.stores && (
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {project.stores.map((store) => (
                <a
                  key={store.url}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
                >
                  {store.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-colors hover:bg-accent-strong"
              >
                Visit Live Site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
              >
                <Github className="h-4 w-4" /> View Code
              </a>
            )}
            <Link
              href="/#contact"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              Discuss a project like this
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {project.confidential && (
            <p className="mt-4 flex items-center gap-2 text-sm text-muted">
              <Lock className="h-4 w-4 text-accent" />
              Client/professional work — no public demo or source. Happy to
              walk through it live.
            </p>
          )}
          {project.inProgress && !project.liveUrl && (
            <p className="mt-4 flex items-center gap-2 font-mono text-xs text-amber-500">
              <Loader className="h-3.5 w-3.5 animate-spin" /> Still in
              progress — no public link yet.
            </p>
          )}
        </header>

        {/* Role + Technology side by side */}
        {(project.role || project.tags.length > 0) && (
          <div className="mb-10 grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-2">
            {project.role && (
              <Block label="My Role">
                <ul className="flex flex-wrap gap-2">
                  {project.role.map((r) => (
                    <li key={r}>
                      <Tag>{r}</Tag>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
            {project.tags.length > 0 && (
              <Block label="Technology">
                <ul className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </Block>
            )}
          </div>
        )}

        {/* Key Features */}
        {project.highlights && (
          <div className="mb-10 border-t border-border pt-8">
            <Block label="Key Features">
              <ul className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
                {project.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2 text-sm text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        )}

        {/* Process (AI UI Lab only) */}
        {project.process && (
          <div className="mb-10 border-t border-border pt-8">
            <Block label="Process">
              <div className="flex flex-wrap items-center gap-2">
                {project.process.map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-xs text-accent">
                      {step}
                    </span>
                    {i < project.process!.length - 1 && (
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-muted" />
                    )}
                  </div>
                ))}
              </div>
            </Block>
          </div>
        )}

        {/* Key Screens / Screenshots — label reflects design vs. dev track */}
        <div className="border-t border-border pt-8">
          <Block label={project.group === "design" ? "Key Screens" : "Screenshots"}>
            {project.images.length > 0 ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {project.images.map((img, i) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setLightboxIndex(i)}
                    aria-label={`View full screenshot: ${img.alt}`}
                    className="group relative aspect-video overflow-hidden rounded-2xl border border-border bg-surface-2 text-left"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-bg/0 opacity-0 transition-all duration-200 group-hover:bg-bg/40 group-hover:opacity-100">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text">
                        <Expand className="h-4 w-4" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="relative flex flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl border border-dashed border-border bg-surface-2 py-14 text-center">
                <div aria-hidden className="placeholder-tint absolute inset-0" />
                <ImageOff className="relative h-5 w-5 text-muted" />
                <p className="relative font-mono text-xs text-muted">
                  Screenshots coming soon
                </p>
              </div>
            )}
          </Block>
        </div>
      </div>

      <Lightbox
        images={project.images}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </motion.article>
  );
}
