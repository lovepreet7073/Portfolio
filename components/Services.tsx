"use client";

import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeader } from "./ui/SectionHeader";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="container-x">
        <SectionHeader
          eyebrow="Services"
          title="What I Do"
          subtitle="End-to-end development services tailored to your needs."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full border border-accent/40 px-6 py-3 font-mono text-sm text-accent transition-colors hover:bg-accent/10"
          >
            Discuss Your Project
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
