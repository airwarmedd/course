import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "../components/Shell";
import { course, weeks, days, getDay } from "../data/course";
import { useProgress } from "../lib/progress";

export const Route = createFileRoute("/")({ component: Index });

function Index() {
  const { done } = useProgress();
  const totalLessons = days.length;
  const doneCount = [...done].filter((id) => days.some((d) => d.id === id)).length;
  const pct = Math.round((doneCount / totalLessons) * 100);

  return (
    <Shell>
      {/* HERO */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-8">
            <p className="mono-label">A field course for growth marketers</p>
            <h1 className="font-serif text-6xl md:text-7xl leading-[0.95] mt-6">
              {course.title}.
              <br />
              <em className="text-signal-ink">The full course.</em>
            </h1>
            <p className="mt-8 text-lg max-w-2xl leading-relaxed text-foreground/80">
              {course.intro}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                to="/day/$dayId"
                params={{ dayId: "1" }}
                className="bg-ink text-paper px-6 py-3 hover:bg-signal-ink transition-colors"
              >
                Start Day 1 →
              </Link>
              <Link to="/week/$weekId" params={{ weekId: "1" }} className="border border-ink px-6 py-3 hover:bg-secondary transition-colors">
                Browse Week 1
              </Link>
              <span className="mono-label">{course.meta}</span>
            </div>
          </div>
          <aside className="md:col-span-4 border-l border-border pl-8">
            <p className="mono-label">Your progress</p>
            <div className="font-serif text-6xl mt-3">{pct}<span className="text-2xl text-muted-foreground">%</span></div>
            <p className="text-sm text-muted-foreground mt-1">{doneCount} of {totalLessons} lessons complete</p>
            <div className="mt-4 h-2 bg-secondary relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 bg-signal" style={{ width: `${pct}%` }} />
            </div>
            <ul className="mt-8 space-y-2 text-sm">
              {weeks.map((w) => {
                const wDays = days.filter((d) => d.week === w.id);
                const d = wDays.filter((x) => done.has(x.id)).length;
                return (
                  <li key={w.id} className="flex justify-between">
                    <span>Week {w.id}</span>
                    <span className="font-mono">{d}/{wDays.length}</span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="mono-label">01 · How to use it</p>
            <h2 className="font-serif text-4xl mt-3">The rules of the road.</h2>
          </div>
          <dl className="md:col-span-8 divide-y divide-border">
            {course.howToUse.map((r) => (
              <div key={r.k} className="grid grid-cols-4 gap-6 py-5">
                <dt className="mono-label pt-1">{r.k}</dt>
                <dd className="col-span-3 text-foreground/85 leading-relaxed">{r.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* COVERS / SKIPS */}
      <section className="border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-16 grid md:grid-cols-2 gap-12">
          <div>
            <p className="mono-label">02 · What it covers</p>
            <h3 className="font-serif text-3xl mt-3">Enough robotics to be useful.</h3>
            <ul className="mt-6 space-y-3">
              {course.covers.map((c, i) => (
                <li key={i} className="flex gap-3 border-t border-border pt-3">
                  <span className="mono-label text-signal-ink shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-foreground/85">{c}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mono-label">03 · What you skip</p>
            <h3 className="font-serif text-3xl mt-3">And what you don't.</h3>
            <ul className="mt-6 space-y-3">
              {course.skips.map((c, i) => (
                <li key={i} className="flex gap-3 border-t border-border pt-3">
                  <span className="mono-label text-destructive shrink-0">✕</span>
                  <span className="text-foreground/70 line-through decoration-1 decoration-destructive/40">{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* WEEKS */}
      <section>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="mono-label">04 · The syllabus</p>
              <h2 className="font-serif text-4xl mt-3">Four weeks. Twenty lessons.</h2>
            </div>
            <p className="mono-label hidden md:block">Click a week to open</p>
          </div>
          <div className="space-y-4">
            {weeks.map((w) => {
              const wDays = w.days.map((id) => getDay(id)!).filter(Boolean);
              const doneN = wDays.filter((d) => done.has(d.id)).length;
              return (
                <Link
                  key={w.id}
                  to="/week/$weekId"
                  params={{ weekId: String(w.id) }}
                  className="group block border border-border hover:border-ink transition-colors bg-card"
                >
                  <div className="grid md:grid-cols-12 gap-6 p-6">
                    <div className="md:col-span-2">
                      <p className="mono-label">Week</p>
                      <div className="font-serif text-6xl leading-none">{w.id}</div>
                    </div>
                    <div className="md:col-span-7">
                      <h3 className="font-serif text-2xl group-hover:text-signal-ink">{w.title}</h3>
                      <p className="text-muted-foreground mt-1">{w.subtitle}</p>
                      <p className="mt-4 text-sm text-foreground/80 leading-relaxed">{w.objective}</p>
                    </div>
                    <div className="md:col-span-3 flex flex-col justify-between border-l border-border pl-6">
                      <div>
                        <p className="mono-label">Days</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {wDays.map((d) => (
                            <span
                              key={d.id}
                              className={`h-6 w-6 grid place-items-center font-mono text-[10px] border ${
                                done.has(d.id) ? "bg-signal border-signal text-signal-ink" : "border-border text-muted-foreground"
                              }`}
                            >
                              {d.isLab ? "L" : d.id}
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="mono-label mt-4">{doneN}/{wDays.length} done →</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Shell>
  );
}
