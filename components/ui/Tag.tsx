import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent transition-colors hover:bg-accent/10">
      {children}
    </span>
  );
}
