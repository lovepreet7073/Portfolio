import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-strong shadow-sm hover:shadow-md hover:-translate-y-0.5",
  outline:
    "border border-border text-text hover:border-accent hover:text-accent",
  ghost: "text-text hover:text-accent",
};

type Props = {
  variant?: Variant;
  href?: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<"button">, "ref">;

export function Button({
  variant = "primary",
  href,
  external,
  className = "",
  children,
  ...rest
}: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (href) {
    if (external || href.startsWith("http") || href.startsWith("mailto:")) {
      return (
        <a
          href={href}
          target={external ? "_blank" : undefined}
          rel={external ? "noopener noreferrer" : undefined}
          className={cls}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
