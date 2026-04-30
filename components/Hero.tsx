"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden py-20 lg:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="min-w-0"
        >
          <p className="mb-3 font-mono text-sm text-accent">
            <span className="opacity-70">$</span> whoami
          </p>

          <h1 className="text-5xl font-bold tracking-tight text-text sm:text-6xl lg:text-7xl">
            {profile.name}
          </h1>

          <p className="mt-4 font-mono text-lg text-accent sm:text-xl">
            React.js &amp; MERN Developer
          </p>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {profile.shortBio}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 text-sm font-semibold text-bg transition-all hover:-translate-y-0.5 hover:bg-accent-strong"
            >
              View Projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#contact"
              className="rounded-md border border-border px-6 py-3 text-sm font-medium text-text transition-colors hover:border-accent hover:text-accent"
            >
              Hire Me
            </a>
          </div>

          <div className="mt-8 flex items-center gap-4 text-muted">
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

        {/* Right: code editor card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative min-w-0"
        >
          {/* Glow */}
          <div
            aria-hidden
            className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-accent/30 to-accent-strong/20 opacity-50 blur-2xl"
          />

          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-2xl">
            {/* Window chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-red-400/70" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/70" />
              <span className="h-3 w-3 rounded-full bg-green-400/70" />
              <span className="ml-3 font-mono text-xs text-muted">
                developer.ts
              </span>
            </div>

            {/* Code body */}
            <pre className="overflow-x-auto px-5 py-5 font-mono text-[13px] leading-7 sm:text-sm">
              <code>
                <span className="text-muted">{`// 👋 nice to meet you`}</span>
                {"\n"}
                <span className="text-pink-400 dark:text-pink-300">const</span>{" "}
                <span className="text-text">developer</span>{" "}
                <span className="text-pink-400 dark:text-pink-300">=</span>{" "}
                <span className="text-text">{"{"}</span>
                {"\n"}
                {"  "}
                <span className="text-sky-500 dark:text-sky-300">name</span>
                <span className="text-muted">: </span>
                <span className="text-emerald-500 dark:text-emerald-300">
                  &quot;{profile.name}&quot;
                </span>
                <span className="text-muted">,</span>
                {"\n"}
                {"  "}
                <span className="text-sky-500 dark:text-sky-300">role</span>
                <span className="text-muted">: </span>
                <span className="text-emerald-500 dark:text-emerald-300">
                  &quot;React &amp; MERN Developer&quot;
                </span>
                <span className="text-muted">,</span>
                {"\n"}
                {"  "}
                <span className="text-sky-500 dark:text-sky-300">stack</span>
                <span className="text-muted">: [</span>
                <span className="text-emerald-500 dark:text-emerald-300">
                  &quot;React&quot;
                </span>
                <span className="text-muted">, </span>
                <span className="text-emerald-500 dark:text-emerald-300">
                  &quot;Next.js&quot;
                </span>
                <span className="text-muted">, </span>
                <span className="text-emerald-500 dark:text-emerald-300">
                  &quot;Node.js&quot;
                </span>
                <span className="text-muted">, </span>
                <span className="text-emerald-500 dark:text-emerald-300">
                  &quot;Shopify&quot;
                </span>
                <span className="text-muted">],</span>
                {"\n"}
                {"  "}
                <span className="text-sky-500 dark:text-sky-300">years</span>
                <span className="text-muted">: </span>
                <span className="text-amber-500 dark:text-amber-300">2</span>
                <span className="text-muted">,</span>
                {"\n"}
                {"  "}
                <span className="text-sky-500 dark:text-sky-300">location</span>
                <span className="text-muted">: </span>
                <span className="text-emerald-500 dark:text-emerald-300">
                  &quot;Punjab, India&quot;
                </span>
                <span className="text-muted">,</span>
                {"\n"}
                {"  "}
                <span className="text-sky-500 dark:text-sky-300">available</span>
                <span className="text-muted">: </span>
                <span className="text-amber-500 dark:text-amber-300">true</span>
                <span className="text-muted">,</span>
                {"\n"}
                <span className="text-text">{"}"}</span>
                <span className="text-muted">;</span>
                <span className="ml-1 inline-block h-4 w-2 animate-blink bg-accent align-middle" />
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
