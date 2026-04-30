"use client";

import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { Mail, MapPin, Clock, Github, Linkedin } from "lucide-react";
import { profile } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { ContactForm } from "./ContactForm";
import { WhatsApp } from "./icons/WhatsApp";

type InfoCardProps = {
  Icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
  badge?: string;
};

function InfoCard({ Icon, label, value, href, badge }: InfoCardProps) {
  const inner = (
    <div className="flex items-start gap-4 rounded-xl border border-border bg-surface-2 p-4 transition-colors hover:border-accent/40">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-medium text-text">{value}</p>
      </div>
      {badge && (
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 font-mono text-xs text-emerald-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          {badge}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <a href={href} className="block transition-transform hover:-translate-y-0.5">
        {inner}
      </a>
    );
  }
  return inner;
}

const infoCards = [
  {
    Icon: Mail,
    label: "Email",
    value: profile.email,
    href: profile.socials.email,
  },
  {
    Icon: MapPin,
    label: "Location",
    value: profile.location,
  },
  {
    Icon: Clock,
    label: "Status",
    value: "Response within 24h",
    badge: "Available",
  },
];

const socials = [
  { Icon: Github, href: profile.socials.github, label: "GitHub" },
  { Icon: Linkedin, href: profile.socials.linkedin, label: "LinkedIn" },
  { Icon: WhatsApp, href: profile.socials.whatsapp, label: "WhatsApp" },
  { Icon: Mail, href: profile.socials.email, label: "Email" },
];

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeader
          eyebrow="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you — let's build something great together."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>

          {/* Side info */}
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-5 lg:col-span-5"
          >
            <div className="rounded-2xl border border-border bg-surface p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Contact Info
              </p>
              <h3 className="mb-5 text-2xl font-bold text-text">
                Let&apos;s connect
              </h3>

              <ul className="space-y-3">
                {infoCards.map((card) => (
                  <li key={card.label}>
                    <InfoCard {...card} />
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                  Find me on
                </p>
                <div className="flex gap-2">
                  {socials.map(({ Icon, href, label }) => {
                    const isExternal = href.startsWith("http");
                    return (
                      <a
                        key={label}
                        href={href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noopener noreferrer" : undefined}
                        aria-label={label}
                        className="flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-surface-2 text-muted transition-all hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent"
                      >
                        <Icon className="h-5 w-5" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

          </motion.aside>
        </div>
      </div>
    </section>
  );
}
