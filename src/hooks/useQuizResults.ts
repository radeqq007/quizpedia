import { useMemo } from "react";
import type { QuizData } from "@/types";

interface UseQuizResultsProps {
  quiz: QuizData;
  answers: Record<number, string>;
}

export const useQuizResults = ({ quiz, answers }: UseQuizResultsProps) => {
  return useMemo(() => {
    const score = quiz.questions.filter(
      (q, i) => answers[i] === q.answer,
    ).length;
    const total = quiz.questions.length;
    const percentage = Math.round((score / total) * 100);

    const chartData = quiz.questions.map((_, i) => {
      const correctSoFar = quiz.questions
        .slice(0, i + 1)
        .filter((qq, j) => answers[j] === qq.answer).length;

      return {
        question: `Q${i + 1}`,
        score: Math.round((correctSoFar / (i + 1)) * 100),
      };
    });

    return { score, total, percentage, chartData };
  }, [quiz, answers]);
};
