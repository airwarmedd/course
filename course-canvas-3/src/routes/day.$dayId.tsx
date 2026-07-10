import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Shell } from "../components/Shell";
import { getDay, days, getWeek, type Day } from "../data/course";
import { useProgress } from "../lib/progress";
import { useQuizAnswers } from "../lib/quiz";
import { resourceNotes } from "../data/notes";

export const Route = createFileRoute("/day/$dayId")({
  component: DayPage,
  loader: ({ params }) => {
    const day = getDay(Number(params.dayId));
    if (!day) throw notFound();
    return { day };
  },
  head: ({ loaderData }) => {
    const day = loaderData?.day;
    const label = day ? (day.isLab ? `Lab · Week ${day.week}` : `Day ${day.id}`) : "Lesson";
    return {
      meta: [
        {
          title: day
            ? `${label}: ${day.title} — Robotics for Drift`
            : "Lesson — Robotics for Drift",
        },
        { name: "description", content: day?.objective ?? "" },
      ],
    };
  },
});

function DayPage() {
  const { day } = Route.useLoaderData() as { day: Day };
  const { done, toggle } = useProgress();
  const [showKey, setShowKey] = useState(false);
  const { answers, setAnswer, answeredCount } = useQuizAnswers(day.id, day.quiz.length);
  const week = getWeek(day.week)!;
  const isDone = done.has(day.id);

  const orderedDays = [...days].sort((a, b) => a.id - b.id);
  const idx = orderedDays.findIndex((d) => d.id === day.id);
  const prev = orderedDays[idx - 1];
  const next = orderedDays[idx + 1];

  const kindColor: Record<string, string> = {
    watch: "border-signal text-signal-ink",
    read: "border-ink text-ink",
    do: "border-destructive text-destructive",
  };

  return (
    <Shell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 pt-10 pb-10">
          <div className="flex items-center gap-3 mono-label">
            <Link to="/" className="hover:text-signal-ink">
              Home
            </Link>
            <span>/</span>
            <Link
              to="/week/$weekId"
              params={{ weekId: String(week.id) }}
              className="hover:text-signal-ink"
            >
              Week {week.id}
            </Link>
            <span>/</span>
            <span>{day.isLab ? "Lab" : `Day ${day.id}`}</span>
          </div>
          <p className="mono-label mt-8">
            {day.isLab ? `Weekend Lab · Week ${week.id}` : `Day ${day.id} · Week ${week.id}`}
          </p>
          <h1 className="font-serif text-5xl mt-3 leading-tight">{day.title}</h1>
          <p className="mt-5 text-lg text-foreground/85 leading-relaxed">
            <span className="mono-label mr-2">Objective</span>
            {day.objective}
          </p>

          <button
            onClick={() => toggle(day.id)}
            className={`mt-8 inline-flex items-center gap-3 px-4 py-2 border transition-colors ${
              isDone
                ? "bg-signal border-signal text-signal-ink"
                : "border-ink hover:bg-ink hover:text-paper"
            }`}
          >
            <span className="h-4 w-4 border border-current grid place-items-center text-[10px]">
              {isDone ? "✓" : ""}
            </span>
            {isDone ? "Marked complete" : "Mark this lesson complete"}
          </button>
        </div>
      </section>

      <article className="mx-auto max-w-3xl px-6 py-14 space-y-14">
        {/* LESSON */}
        <section>
          <SectionHead
            num="01"
            label="Lesson"
            title="Read this first — it's the actual teaching."
          />
          <div className="space-y-4 text-[17px] leading-[1.75] text-foreground/90">
            {day.lesson.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* RESOURCES */}
        {day.resources.length > 0 && (
          <section>
            <SectionHead num="02" label="Resources" title="Watch and read, with why." />
            <ul className="space-y-4">
              {day.resources.map((r, i) => (
                <li key={i} className="border border-border bg-card">
                  <div className="p-5">
                    <div className="flex flex-wrap items-baseline gap-3">
                      <span className={`mono-label px-2 py-0.5 border ${kindColor[r.kind]}`}>
                        {r.kind}
                      </span>
                      {r.time && <span className="mono-label">{r.time}</span>}
                      {r.href ? (
                        <a
                          href={r.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium underline underline-offset-4 decoration-border hover:decoration-signal hover:text-signal-ink"
                        >
                          {r.label} ↗
                        </a>
                      ) : (
                        <span className="font-medium">{r.label}</span>
                      )}
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      <span className="mono-label mr-2">Why</span>
                      {r.why}
                    </p>
                  </div>
                  {resourceNotes[r.label] && <ResourceNotes notes={resourceNotes[r.label]} />}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* QUIZ */}
        {day.quiz.length > 0 && (
          <section>
            <SectionHead
              num="03"
              label="Quiz"
              title="Write your answers here before revealing the key."
            />
            <ol className="space-y-6">
              {day.quiz.map((q, i) => (
                <li key={i} className="border-l-2 border-signal pl-4">
                  <div className="flex gap-3 py-1">
                    <span className="font-mono text-signal-ink shrink-0">Q{i + 1}.</span>
                    <span>{q}</span>
                  </div>
                  <textarea
                    value={answers[i] ?? ""}
                    onChange={(e) => setAnswer(i, e.target.value)}
                    placeholder="Your answer — saved on this device as you type."
                    rows={3}
                    className="mt-2 w-full border border-border bg-card px-3 py-2 text-[15px] leading-relaxed placeholder:text-muted-foreground/70 focus:outline-none focus:border-ink focus:ring-1 focus:ring-ring resize-y"
                    aria-label={`Answer to question ${i + 1}`}
                  />
                </li>
              ))}
            </ol>
            {day.answerKey && (
              <div className="mt-6">
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    onClick={() => setShowKey((v) => !v)}
                    className="mono-label border border-border px-3 py-1.5 hover:bg-secondary"
                  >
                    {showKey ? "Hide answer key ▲" : "Reveal answer key ▼"}
                  </button>
                  <span className="mono-label">
                    {answeredCount}/{day.quiz.length} answered
                    {answeredCount < day.quiz.length && !showKey
                      ? " — write first, reading the key teaches nothing"
                      : ""}
                  </span>
                </div>
                {showKey && (
                  <div className="mt-4 border border-border bg-secondary/40 p-5">
                    <p className="mono-label mb-2">Answer key</p>
                    <p className="text-sm leading-relaxed text-foreground/85">{day.answerKey}</p>
                  </div>
                )}
              </div>
            )}
          </section>
        )}

        {/* OUTPUT */}
        <section>
          <SectionHead num="04" label="Output" title="The compounding artifact." />
          <div className="border-l-4 border-highlight bg-highlight/25 p-5">
            <p className="text-[17px] leading-relaxed">{day.output}</p>
          </div>
        </section>
      </article>

      {/* NAV */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-8 flex justify-between gap-4">
          {prev ? (
            <Link
              to="/day/$dayId"
              params={{ dayId: String(prev.id) }}
              className="border border-border p-4 hover:border-ink flex-1"
            >
              <div className="mono-label">← Previous</div>
              <div className="mt-1 font-serif">
                {prev.isLab ? "Lab" : `Day ${prev.id}`}: {prev.title}
              </div>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
          {next ? (
            <Link
              to="/day/$dayId"
              params={{ dayId: String(next.id) }}
              className="border border-border p-4 hover:border-ink flex-1 text-right"
            >
              <div className="mono-label">Next →</div>
              <div className="mt-1 font-serif">
                {next.isLab ? "Lab" : `Day ${next.id}`}: {next.title}
              </div>
            </Link>
          ) : (
            <span className="flex-1" />
          )}
        </div>
      </section>
    </Shell>
  );
}

function ResourceNotes({ notes }: { notes: string[] }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-border bg-secondary/30">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-2.5 mono-label hover:text-signal-ink"
      >
        <span>Study notes — enough to skip the source</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="px-5 pb-5 space-y-3 border-l-2 border-signal ml-5">
          {notes.map((p, i) => (
            <p key={i} className="text-[15px] leading-[1.7] text-foreground/85 pl-3">
              {p}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

function SectionHead({ num, label, title }: { num: string; label: string; title: string }) {
  return (
    <div className="mb-6 flex items-baseline gap-4 border-b border-border pb-3">
      <span className="mono-label">{num}</span>
      <span className="mono-label text-signal-ink">{label}</span>
      <span className="font-serif text-xl">{title}</span>
    </div>
  );
}
