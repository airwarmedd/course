import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Shell } from "../components/Shell";

function NotFoundComponent() {
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mono-label">404 · not found</p>
        <h1 className="font-serif text-5xl mt-4">This page isn't in the syllabus.</h1>
        <p className="mt-4 text-muted-foreground">Head back to the course overview.</p>
        <a href="/" className="mt-8 inline-block border border-ink px-5 py-2 hover:bg-ink hover:text-paper transition-colors">
          Return home
        </a>
      </div>
    </Shell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <Shell>
      <div className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="mono-label">error</p>
        <h1 className="font-serif text-4xl mt-4">This page didn't load.</h1>
        <div className="mt-8 flex justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border border-ink px-5 py-2 hover:bg-ink hover:text-paper transition-colors"
          >Try again</button>
          <a href="/" className="border border-border px-5 py-2 hover:bg-secondary transition-colors">Go home</a>
        </div>
      </div>
    </Shell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Robotics for Drift Growth — The Full Course" },
      { name: "description", content: "A 4-week, 20-lesson course for growth marketers learning enough robotics to understand Drift's users and position the product on evidence." },
      { property: "og:title", content: "Robotics for Drift Growth — The Full Course" },
      { property: "og:description", content: "4 weeks. 20 lessons. Everything in one course." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600&family=Instrument+Serif:ital@0;1&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
