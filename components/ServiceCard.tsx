"use client";

import { motion } from "framer-motion";
import type { Service } from "@/lib/data";
import { Tag } from "./ui/Tag";

export function ServiceCard({
  service,
  index,
}: {
  service: Service;
  index: number;
}) {
  const { Icon } = service;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-3xl border-l-2 border-l-accent/40 border-t border-r border-b border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-l-accent hover:shadow-2xl hover:shadow-accent/10"
    >
      <div className="mb-5 flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent/20">
          <Icon className="h-6 w-6" />
        </span>
        <span className="font-mono text-sm text-muted">{service.number}</span>
      </div>

      <h3 className="mb-3 text-xl font-bold text-text">{service.title}</h3>

      <p className="mb-5 text-sm leading-relaxed text-muted">
        {service.description}
      </p>

      <ul className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
    </motion.article>
  );
}
