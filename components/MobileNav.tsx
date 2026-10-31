"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Home, Briefcase, Code2, Mail } from "lucide-react";
import { navLinks } from "@/lib/data";

const icons = {
  Home,
  Projects: Briefcase,
  Services: Code2,
  Contact: Mail,
} as const;

export function MobileNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [active, setActive] = useState<string>("#home");

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(`#${entry.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-4">
        {navLinks.map((link) => {
          const Icon = icons[link.label as keyof typeof icons];
          const isActive = isHome && active === link.href;
          return (
            <li key={link.href}>
              <Link
                href={isHome ? link.href : `/${link.href}`}
                className={`flex flex-col items-center gap-1 px-2 py-3 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-muted hover:text-text"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{link.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
