import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "../components/Shell";
import { glossary } from "../data/course";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary — Robotics for Drift" },
      {
        name: "description",
        content:
          "50+ robotics terms in plain English, from URDF to QoS to VLAs. The vocabulary a growth marketer needs to read the room.",
      },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [q, setQ] = useState("");
  const categories = useMemo(() => [...new Set(glossary.map((t) => t.category))], []);
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return glossary;
    return glossary.filter(
      (t) => t.term.toLowerCase().includes(needle) || t.def.toLowerCase().includes(needle),
    );
  }, [q]);

  return (
    <Shell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-12">
          <p className="mono-label">The vocabulary</p>
          <h1 className="font-serif text-5xl mt-4">Glossary.</h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-2xl leading-relaxed">
            {glossary.length} terms in plain English. The course asks you to write your own
            definitions; these are the reference to check yours against. If you can define a term
            without hedging, you own it.
          </p>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search terms and definitions…"
            className="mt-8 w-full max-w-md border border-ink bg-card px-4 py-2.5 font-mono text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            aria-label="Search glossary"
          />
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl px-6 py-12 space-y-14">
          {categories.map((cat) => {
            const terms = filtered.filter((t) => t.category === cat);
            if (terms.length === 0) return null;
            return (
              <div key={cat}>
                <div className="mb-5 flex items-baseline gap-4 border-b border-border pb-3">
                  <span className="mono-label text-signal-ink">{cat}</span>
                  <span className="mono-label">{terms.length} terms</span>
                </div>
                <dl className="divide-y divide-border">
                  {terms.map((t) => (
                    <div key={t.term} className="grid md:grid-cols-12 gap-3 md:gap-6 py-4">
                      <dt className="md:col-span-3 font-mono text-sm font-medium pt-0.5">
                        {t.term}
                      </dt>
                      <dd className="md:col-span-9 text-foreground/85 leading-relaxed">{t.def}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-muted-foreground py-10 text-center">
              No terms match "{q}". If the field invented something new, add it to your own glossary
              — that's the habit.
            </p>
          )}
        </div>
      </section>
    </Shell>
  );
}
