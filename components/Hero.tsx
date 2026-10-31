"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { profile, valuePillars } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden py-32 lg:py-44"
    >
      {/* Studio Grid backdrop: column rules + ambient blob */}
      <div
        aria-hidden
        className="grid-lines pointer-events-none absolute inset-0 -z-20 opacity-5"
      />
      <div
        aria-hidden
        className="aurora-blob pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 -translate-y-1/3 opacity-70"
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container-x flex flex-col items-center text-center"
      >
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 font-mono text-xs text-accent">
          <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-accent" />
          Available for work
        </span>

        <h1 className="font-serif text-6xl font-semibold tracking-tight text-text sm:text-7xl lg:text-8xl">
          {profile.name}
        </h1>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-full bg-accent px-4 py-1.5 text-sm font-semibold text-bg">
            {profile.primaryRole}
          </span>
          <span className="rounded-full border border-border px-4 py-1.5 text-sm font-medium text-muted">
            {profile.secondaryRole}
          </span>
        </div>

        <p className="mt-4 font-mono text-base text-accent sm:text-lg">
          {profile.tagline}
        </p>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          {profile.shortBio}
        </p>

        <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {valuePillars.map((pillar) => (
            <li
              key={pillar}
              className="font-mono text-xs uppercase tracking-eyebrow text-muted"
            >
              {pillar}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-bg shadow-lg shadow-accent/20 transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
          >
            View Selected Work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
          >
            Resume
            <Download className="h-4 w-4" />
          </a>
          <a
            href="#contact"
            className="rounded-full border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-9 flex items-center justify-center gap-5 text-muted">
          <a
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition-colors hover:text-accent"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition-colors hover:text-accent"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a
            href={profile.socials.email}
            aria-label="Email"
            className="transition-colors hover:text-accent"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
