import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/lib/data";
import { WhatsApp } from "./icons/WhatsApp";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface/50 pb-24 md:pb-0">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-accent/10 font-mono text-sm font-semibold text-accent">
            {profile.initials.charAt(0)}
          </span>
          <span className="font-mono text-sm font-semibold text-text">
            {profile.brand}
          </span>
        </div>

        <p className="text-xs text-muted">
          The web is a craft. I&apos;m here to practice it.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted transition-colors hover:text-accent"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted transition-colors hover:text-accent"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href={profile.socials.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="text-muted transition-colors hover:text-accent"
          >
            <WhatsApp className="h-5 w-5" />
          </Link>
          <Link
            href={profile.socials.email}
            aria-label="Email"
            className="text-muted transition-colors hover:text-accent"
          >
            <Mail className="h-5 w-5" />
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x py-4 text-center font-mono text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
