"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, GraduationCap } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";

const facts = [
  {
    Icon: Briefcase,
    label: "Currently",
    value: "MERN Developer @ Kodion Softwares",
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

export function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeader eyebrow="About" title="A little about me" />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="space-y-5 text-base leading-relaxed text-muted sm:text-lg lg:col-span-7"
          >
            <p>{profile.longBio}</p>
            <p>
              I currently work at{" "}
              <span className="text-text">Kodion Softwares</span>, where I lead
              React.js front-end development for production apps — improving
              component architecture, managing state with Redux/Context API,
              and integrating REST APIs with Node.js/Express backends.
            </p>
            <p>
              Outside of client work, I enjoy building real-time apps with
              Socket.IO and exploring Chrome Extension APIs for productivity
              tools.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5"
          >
            <ul className="space-y-3">
              {facts.map(({ Icon, label, value }) => (
                <li
                  key={label}
                  className="flex items-start gap-4 rounded-xl border border-border bg-surface p-4 transition-colors hover:border-accent/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider text-muted">
                      {label}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-text">
                      {value}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
