"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { profile, navLinks } from "@/lib/data";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/Button";

export function Navbar() {
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
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-bg/80 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="container-x flex h-16 items-center justify-between sm:h-20">
        <Link
          href="#home"
          className="flex items-center gap-2 font-mono text-base font-semibold"
          aria-label="Home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-md border border-accent/40 bg-surface text-accent">
            {profile.initials.charAt(0)}
          </span>
          <span className="hidden text-text sm:inline">{profile.brand}</span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`group relative text-sm font-medium transition-colors ${
                    isActive ? "text-text" : "text-muted hover:text-text"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Button href="#contact" variant="outline" className="hidden sm:inline-flex">
            Hire Me
          </Button>
        </div>
      </nav>
    </header>
  );
}
