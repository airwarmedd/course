import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

const navLink = "hover:text-signal-ink [&.active]:underline underline-offset-4";

export function Shell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 gap-4">
          <Link to="/" className="flex items-baseline gap-3 min-w-0">
            <span className="mono-label shrink-0">◐ Course</span>
            <span className="font-serif text-xl truncate">Robotics for Drift</span>
          </Link>
          <nav className="flex items-center gap-4 md:gap-6 text-sm">
            <Link to="/" activeOptions={{ exact: true }} className={navLink}>
              Overview
            </Link>
            <Link to="/glossary" className={navLink}>
              Glossary
            </Link>
            <Link to="/library" className={navLink}>
              Library
            </Link>
            <Link to="/artifacts" className={navLink}>
              Artifacts
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="border-t border-border mt-24">
        <div className="mx-auto max-w-6xl px-6 py-8 flex items-center justify-between mono-label">
          <span>4 weeks · 20 lessons · 3 labs</span>
          <span>Progress and quiz answers are saved on this device</span>
        </div>
      </footer>
    </div>
  );
}
