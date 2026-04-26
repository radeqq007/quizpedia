import { useMutation } from "@tanstack/react-query";
import { WORKER_URL } from "@/constants/constants";
import type { Article } from "@/types";


type ExpandParams = {
  article: Article;
  summary: string;
};

const fetchExpandedSummary = async ({
  article,
  summary,
}: ExpandParams): Promise<string> => {
  const res = await fetch(`${WORKER_URL}/expand`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      articleContent: article.content,
      existingSummary: summary,
    }),
  });

  if (res.status === 429) throw new Error("rate_limited");
  if (!res.ok) throw new Error("Failed to expand summary");

  const { summary: expanded } = await res.json();
  return expanded;
};

export function useExpandSummary() {
  return useMutation({
    mutationFn: fetchExpandedSummary,
  });
}
