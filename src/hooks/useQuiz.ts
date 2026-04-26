import { useQuery } from "@tanstack/react-query";
import { WORKER_URL } from "@/constants/constants";
import type { UseQueryResult } from "@tanstack/react-query";
import type { QuizData, Article } from "@/types";

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
      articleContent: article.content.slice(0, 6000),
    }),
  });

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error("Failed to generate quiz");

  return res.json();
};

