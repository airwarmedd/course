import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "../components/Shell";
import { library, buildInPublic, bipRules, maintenance } from "../data/course";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library & Build-in-Public — Robotics for Drift" },
      {
        name: "description",
        content:
          "Every resource in one place, the permanent listening posts, the 4-post build-in-public track, and the after-graduation maintenance loop.",
      },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <Shell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-12">
          <p className="mono-label">Everything in one place</p>
          <h1 className="font-serif text-5xl mt-4">Library.</h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-2xl leading-relaxed">
            Every resource the course points at, the listening posts you keep forever, the
            build-in-public track if you want to share the journey, and the maintenance loop for
            after graduation.
          </p>
        </div>
      </section>

      {/* RESOURCES */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-14 space-y-12">
          {library.map((group) => (
            <div key={group.title}>
              <div className="mb-5 flex items-baseline gap-4 border-b border-border pb-3">
                <span className="mono-label text-signal-ink">{group.title}</span>
                <span className="mono-label">{group.items.length} sources</span>
              </div>
              <ul className="divide-y divide-border">
                {group.items.map((item) => (
                  <li key={item.label} className="grid md:grid-cols-12 gap-2 md:gap-6 py-4">
                    <div className="md:col-span-5 font-medium">
                      {item.href ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline underline-offset-4 decoration-border hover:decoration-signal hover:text-signal-ink"
                        >
                          {item.label} ↗
                        </a>
                      ) : (
                        item.label
                      )}
                    </div>
                    <div className="md:col-span-7 text-sm text-muted-foreground leading-relaxed">
                      {item.note}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <p className="text-sm text-muted-foreground border-l-2 border-signal pl-4">
            Links rot. If one dies, the label doubles as the search query.
          </p>
        </div>
      </section>

      {/* BUILD IN PUBLIC */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-14">
          <p className="mono-label">Optional, recommended</p>
          <h2 className="font-serif text-4xl mt-3">The build-in-public track.</h2>
          <p className="mt-4 text-foreground/80 max-w-2xl leading-relaxed">
            "Marketer learns robotics in 4 weeks" is a natural series for LinkedIn or Twitter, and
            it doubles as top-of-funnel for Drift. One post per week, published the weekend after
            each lab.
          </p>
          <div className="mt-8 space-y-4">
            {buildInPublic.map((p) => (
              <div
                key={p.week}
                className="border border-border bg-card p-5 grid md:grid-cols-12 gap-4"
              >
                <div className="md:col-span-2">
                  <p className="mono-label">Week</p>
                  <div className="font-serif text-4xl leading-none mt-1">{p.week}</div>
                </div>
                <div className="md:col-span-10">
                  <h3 className="font-serif text-xl leading-snug">{p.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed">
                    <span className="mono-label mr-2">Material</span>
                    {p.material}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    <span className="mono-label mr-2">Angle</span>
                    {p.angle}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-l-4 border-highlight bg-highlight/25 p-5">
            <p className="mono-label mb-3">Rules for the series</p>
            <ul className="space-y-2 text-[15px] leading-relaxed">
              {bipRules.map((r, i) => (
                <li key={i} className="flex gap-3">
                  <span className="font-mono text-signal-ink shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* MAINTENANCE */}
      <section>
        <div className="mx-auto max-w-4xl px-6 py-14">
          <p className="mono-label">After graduation</p>
          <h2 className="font-serif text-4xl mt-3">The maintenance loop.</h2>
          <ul className="mt-8 divide-y divide-border border-y border-border">
            {maintenance.map((m, i) => (
              <li key={i} className="flex gap-4 py-4">
                <span className="font-mono text-signal-ink shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-foreground/85 leading-relaxed">{m}</span>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-lg leading-relaxed max-w-2xl">
            You'll never out-engineer the users, and the job never required it. The job is knowing
            their Tuesday afternoon so well that when you write about Drift, they think:{" "}
            <em className="font-serif">finally, someone who gets it.</em>
          </p>
        </div>
      </section>
    </Shell>
  );
}
