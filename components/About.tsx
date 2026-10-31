"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { profile, featuredProjects, skillGroups } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";

const facts = [
  {
    Icon: Briefcase,
    label: "Currently",
    value: "Frontend/MERN Developer @ Kodion Softwares",
  },
  {
    Icon: GraduationCap,
    label: "Education",
    value: "B.Tech in Computer Engineering",
  },
  {
    Icon: MapPin,
    label: "Based in",
    value: profile.location,
  },
];

const stats = [
  { value: profile.yearsCoding, label: "Years experience" },
  { value: String(featuredProjects.length), label: "Shipped projects" },
  { value: String(skillGroups.length), label: "Skill domains" },
];

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeader eyebrow="About" title="A little about me" />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <p className="font-serif text-2xl font-medium leading-snug text-text sm:text-3xl">
              From shipping code to shaping products.
            </p>
            <div className="mt-5 space-y-5 text-base leading-relaxed text-muted sm:text-lg">
              <p>{profile.longBio}</p>
              <p>
                I currently work at{" "}
                <span className="text-text">Kodion Softwares</span>, building
                React.js front-ends for production apps and contributing UI/UX
                improvements — managing state, integrating REST APIs with
                Node.js/Express backends, and refining interface consistency
                across screens.
              </p>
              <p>
                I&apos;m most interested in dashboard and application-interface
                design, design systems and AI-assisted product development —
                outside of client work, that shows up as real-time apps with
                Socket.IO and frontend experiments with Claude Code.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-3 gap-4 rounded-3xl border border-border bg-surface p-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-serif text-4xl font-semibold text-accent sm:text-5xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-eyebrow text-muted">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <ul className="mt-5 space-y-3">
              {facts.map(({ Icon, label, value }) => (
                <li key={label} className="flex items-center gap-3">
                  <Icon className="h-4 w-4 shrink-0 text-accent" />
                  <p className="text-sm text-muted">
                    <span className="text-text">{label}:</span> {value}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
