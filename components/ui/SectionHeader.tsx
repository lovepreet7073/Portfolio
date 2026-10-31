"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
};

export function SectionHeader({ eyebrow, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 max-w-2xl"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-eyebrow text-accent">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl font-semibold tracking-tight text-text sm:text-5xl">
        {title}
      </h2>
      <div className="mt-4 h-1 w-16 rounded-full bg-accent" />
      {subtitle && (
        <p className="mt-5 text-base text-muted sm:text-lg">{subtitle}</p>
      )}
    </motion.div>
  );
}
