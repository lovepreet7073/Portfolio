"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { Tag } from "./ui/Tag";

export function Skills() {
  return (
    <section id="skills" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeader
          eyebrow="Skills"
          title="My tech stack"
          subtitle="Technologies and tools I work with day-to-day."
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {skillGroups.map((group, i) => {
            const { Icon } = group;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-text">
                    {group.title}
                  </h3>
                </div>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
