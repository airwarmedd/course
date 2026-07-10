import { useEffect, useState } from "react";

const KEY = "drift-course-quiz-v1";

type Answers = Record<string, string>;

function load(): Answers {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Answers) : {};
  } catch {
    /* localStorage unavailable */
    return {};
  }
}

export function useQuizAnswers(dayId: number, questionCount: number) {
  const [answers, setAnswers] = useState<string[]>(() => Array(questionCount).fill(""));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const all = load();
    setAnswers(Array.from({ length: questionCount }, (_, i) => all[`${dayId}:${i}`] ?? ""));
    setLoaded(true);
  }, [dayId, questionCount]);

  const setAnswer = (i: number, value: string) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[i] = value;
      try {
        const all = load();
        all[`${dayId}:${i}`] = value;
        localStorage.setItem(KEY, JSON.stringify(all));
      } catch {
        /* localStorage unavailable */
      }
      return next;
    });
  };

  const answeredCount = answers.filter((a) => a.trim().length > 0).length;

  return { answers, setAnswer, answeredCount, loaded };
}
