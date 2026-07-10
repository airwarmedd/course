import { createFileRoute } from "@tanstack/react-router";
import { Shell } from "../components/Shell";
import { library, contentTrack, platformPlaybook, contentRules, maintenance } from "../data/course";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library & Build-in-Public — Robotics for Drift" },
      {
        name: "description",
        content:
          "Every resource in one place, the permanent listening posts, a Reddit-first content track, and the after-graduation maintenance loop.",
      },
    ],
  }),
  component: LibraryPage,
});

const platformColor: Record<string, string> = {
  reddit: "border-destructive text-destructive",
  twitter: "border-signal text-signal-ink",
  linkedin: "border-ink text-ink",
  instagram: "border-amber text-amber",
};

function LibraryPage() {
  return (
    <Shell>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 pt-16 pb-12">
          <p className="mono-label">Everything in one place</p>
          <h1 className="font-serif text-5xl mt-4">Library.</h1>
          <p className="mt-6 text-lg text-foreground/80 max-w-2xl leading-relaxed">
            Every resource the course points at, the listening posts you keep forever, the content
            track if you want to share the journey, and the maintenance loop for after graduation.
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
          <p className="mono-label">Optional, recommended · Reddit-first</p>
          <h2 className="font-serif text-4xl mt-3">The content track.</h2>
          <p className="mt-4 text-foreground/80 max-w-2xl leading-relaxed">
            One insight a week, drawn from that week's lab, adapted to each platform's native shape.
            The through-line is your edge: an honest outsider learning the field in public. Reddit
            leads; Twitter, LinkedIn, and Instagram each get their own version, never a copy-paste.
          </p>

          {/* PLATFORM PLAYBOOK */}
          <div className="mt-8 grid md:grid-cols-2 gap-4">
            {platformPlaybook.map((pl) => (
              <div key={pl.platform} className="border border-border bg-card p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-lg">{pl.platform}</span>
                  <span className="mono-label">{pl.role}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{pl.truth}</p>
              </div>
            ))}
          </div>

          {/* WEEKLY INSIGHTS */}
          <div className="mt-10 space-y-8">
            {contentTrack.map((w) => (
              <div key={w.week} className="border border-border bg-card">
                <div className="border-b border-border p-5 grid md:grid-cols-12 gap-4">
                  <div className="md:col-span-2">
                    <p className="mono-label">Week</p>
                    <div className="font-serif text-4xl leading-none mt-1">{w.week}</div>
                    <p className="mono-label mt-3 leading-snug">{w.source}</p>
                  </div>
                  <div className="md:col-span-10">
                    <p className="mono-label mb-1">The insight</p>
                    <h3 className="font-serif text-xl leading-snug">{w.insight}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mono-label mr-2">Why they care</span>
                      {w.whyTheyCare}
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {w.posts.map((post, i) => (
                    <div key={i} className="p-5 grid md:grid-cols-12 gap-3">
                      <div className="md:col-span-2">
                        <span
                          className={`mono-label px-2 py-0.5 border inline-block ${platformColor[post.platform]}`}
                        >
                          {post.platform}
                        </span>
                        <p className="mono-label mt-2 leading-snug normal-case tracking-normal text-muted-foreground">
                          {post.where}
                        </p>
                      </div>
                      <div className="md:col-span-10 space-y-2">
                        <p className="text-[15px] leading-relaxed font-medium">{post.hook}</p>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          <span className="mono-label mr-2">Shape</span>
                          {post.shape}
                        </p>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          <span className="mono-label mr-2">Goal</span>
                          {post.ask}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-l-4 border-highlight bg-highlight/25 p-5">
            <p className="mono-label mb-3">Rules for the track</p>
            <ul className="space-y-2 text-[15px] leading-relaxed">
              {contentRules.map((r, i) => (
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
