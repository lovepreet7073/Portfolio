"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { profile, navLinks } from "@/lib/data";
import { Button } from "./ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const hrefFor = (hash: string) => (isHome ? hash : `/${hash}`);

  const [active, setActive] = useState<string>("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <nav
        className={`container-x flex h-14 items-center justify-between rounded-full border px-4 transition-all duration-300 sm:h-16 sm:px-5 ${
          scrolled
            ? "border-border bg-surface/90 shadow-lg shadow-black/20 backdrop-blur-md"
            : "border-border/60 bg-surface/60 backdrop-blur-md"
        }`}
      >
        <Link
          href={hrefFor("#home")}
          className="flex items-center gap-2 font-mono text-base font-semibold"
          aria-label="Home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent/10 text-accent">
            {profile.initials.charAt(0)}
          </span>
          <span className="hidden text-text sm:inline">{profile.brand}</span>
        </Link>

        <ul className="hidden items-center gap-1 rounded-full md:flex">
          {navLinks.map((link) => {
            const isActive = isHome && active === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={hrefFor(link.href)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent/15 text-accent"
                      : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <Button href={hrefFor("#contact")} variant="primary" className="!px-4 !py-2 text-xs sm:!px-6 sm:!py-2.5 sm:text-sm">
          Hire Me
        </Button>
      </nav>
    </header>
  );
}
