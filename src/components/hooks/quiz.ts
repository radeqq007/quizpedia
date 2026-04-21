import type { Article } from "@/components/hooks/wikipedia";
import { type UseQueryResult, useQuery } from "@tanstack/react-query";

const WORKER_URL = import.meta.env.VITE_BACKEND_URL;

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type QuizData = {
  summary: string;
  questions: Question[];
};

export function useQuiz(article?: Article): UseQueryResult<QuizData, Error> {
  return useQuery<QuizData>({
    queryKey: ["quiz", article?.title],
    queryFn: () => fetchQuiz(article!),
    enabled: !!article,
  });
}

const fetchQuiz = async (article: Article) => {
  const res = await fetch(WORKER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      articleTitle: article.title,
      articleContent: article.content,
    }),
  });

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error("Failed to generate quiz");

  return res.json();
};
