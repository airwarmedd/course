import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Shell } from "../components/Shell";
import { getWeek, getDay, weeks, type Week } from "../data/course";
import { useProgress } from "../lib/progress";

export const Route = createFileRoute("/week/$weekId")({
  component: WeekPage,
  loader: ({ params }) => {
    const week = getWeek(Number(params.weekId));
    if (!week) throw notFound();
    return { week };
  },
});

function WeekPage() {
  const { week } = Route.useLoaderData() as { week: Week };
  const { done } = useProgress();
  const wDays = week.days.map((id) => getDay(id)!).filter(Boolean);
  const doneN = wDays.filter((d) => done.has(d.id)).length;

  const prev = weeks.find((w) => w.id === week.id - 1);
  const next = weeks.find((w) => w.id === week.id + 1);

  return (
    <Shell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-5xl px-6 pt-12 pb-16">
          <Link to="/" className="mono-label hover:text-signal-ink">← All weeks</Link>
          <div className="mt-6 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-2">
              <p className="mono-label">Week</p>
              <div className="font-serif text-7xl leading-none">{week.id}</div>
            </div>
            <div className="md:col-span-10">
              <h1 className="font-serif text-5xl">{week.title}</h1>
              <p className="text-lg text-muted-foreground mt-2">{week.subtitle}</p>
              <p className="mt-6 text-foreground/85 leading-relaxed max-w-3xl">{week.objective}</p>
              <div className="mt-6 inline-flex items-center gap-3 border border-border px-3 py-1.5 bg-secondary/50">
                <span className="mono-label">Pass bar</span>
                <span className="text-sm">{week.passBar}</span>
              </div>
              <div className="mt-4 mono-label">{doneN} / {wDays.length} lessons complete</div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16 space-y-3">
          {wDays.map((d) => {
            const isDone = done.has(d.id);
            return (
              <Link
                key={d.id}
                to="/day/$dayId"
                params={{ dayId: String(d.id) }}
                className="block border border-border hover:border-ink bg-card transition-colors group"
              >
                <div className="grid md:grid-cols-12 gap-6 p-5">
                  <div className="md:col-span-2 flex items-center gap-3">
                    <div className={`h-8 w-8 grid place-items-center font-mono text-xs border ${
                      isDone ? "bg-signal border-signal text-signal-ink" : "border-border"
                    }`}>
                      {isDone ? "✓" : d.isLab ? "L" : d.id}
                    </div>
                    <span className="mono-label">{d.isLab ? "Lab" : `Day ${d.id}`}</span>
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="font-serif text-xl group-hover:text-signal-ink">{d.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{d.objective}</p>
                  </div>
                  <div className="md:col-span-1 flex items-center justify-end mono-label">→</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-5xl px-6 py-8 flex justify-between">
          {prev ? (
            <Link to="/week/$weekId" params={{ weekId: String(prev.id) }} className="mono-label hover:text-signal-ink">
              ← Week {prev.id}: {prev.title}
            </Link>
          ) : <span />}
          {next ? (
            <Link to="/week/$weekId" params={{ weekId: String(next.id) }} className="mono-label hover:text-signal-ink ml-auto text-right">
              Week {next.id}: {next.title} →
            </Link>
          ) : <span />}
        </div>
      </section>
    </Shell>
  );
}
