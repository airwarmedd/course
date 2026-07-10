import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "../components/Shell";
import { artifacts } from "../data/course";

export const Route = createFileRoute("/glossary")({
  head: () => ({
    meta: [
      { title: "Compounding Artifacts — Robotics for Drift" },
      { name: "description", content: "The nine artifacts you build across the course. Each one feeds the next." },
    ],
  }),
  component: ArtifactsPage,
});

function ArtifactsPage() {
  return (
    <Shell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-14">
          <p className="mono-label">The deliverables</p>
          <h1 className="font-serif text-5xl mt-4">Nine compounding artifacts.</h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-2xl leading-relaxed">
            Outputs compound. What you produce on Day 8 feeds Day 19. By graduation you own a shelf
            of primary-source marketing assets that the founders can't write themselves.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto max-w-4xl px-6 py-14">
          <ol className="divide-y divide-border border-y border-border">
            {artifacts.map((a, i) => (
              <li key={i} className="grid grid-cols-12 gap-6 py-6 hover:bg-secondary/40 px-3 transition-colors">
                <div className="col-span-2 mono-label">Artifact {String(i + 1).padStart(2, "0")}</div>
                <div className="col-span-10 font-serif text-xl">{a}</div>
              </li>
            ))}
          </ol>
          <p className="mono-label mt-10 text-center">
            Maintain these after graduation. 10 min daily · one interview monthly · quarterly positioning review.
          </p>
        </div>
      </section>
    </Shell>
  );
}
