import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="flex items-baseline gap-3">
            <span className="mono-label">◐ Course</span>
            <span className="font-serif text-xl">Robotics for Drift</span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            <Link to="/" activeOptions={{ exact: true }} className="hover:text-signal-ink [&.active]:underline underline-offset-4">
              Overview
            </Link>
            <Link to="/glossary" className="hover:text-signal-ink [&.active]:underline underline-offset-4">
              Artifacts
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border mt-24">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between mono-label">
          <span>4 weeks · 20 lessons</span>
          <span>Progress is saved locally</span>
        </div>
      </footer>
    </div>
  );
}
