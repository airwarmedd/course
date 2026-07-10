import { useEffect, useState } from "react";

const KEY = "drift-course-progress-v1";

export function useProgress() {
  const [done, setDone] = useState<Set<number>>(new Set());

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDone(new Set(JSON.parse(raw)));
    } catch {}
  }, []);

  const toggle = (id: number) => {
    setDone((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      try {
        localStorage.setItem(KEY, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  };

  const reset = () => {
    setDone(new Set());
    try {
      localStorage.removeItem(KEY);
    } catch {}
  };

  return { done, toggle, reset };
}
