import { useEffect } from "react";
import { keyMap } from "@/constants/constants";
import type { QuizData } from "@/types";

type UseQuizKeyboardParams = {
  quiz: QuizData | null;
  curQuestion: number;
  selectAnswer: (qIdx: number, answer: string) => void;
  nextQuestion: () => void;
};

export const useQuizKeyboard = ({
  quiz,
  curQuestion,
  selectAnswer,
  nextQuestion,
}: UseQuizKeyboardParams) => {
  useEffect(() => {
    if (!quiz) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quiz || curQuestion >= quiz.questions.length) return;

      const options = quiz.questions[curQuestion].options;

      const idx = keyMap[e.key.toLowerCase()];

      if (idx === undefined) return;

      selectAnswer(curQuestion, options[idx]);
      nextQuestion();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quiz, curQuestion, selectAnswer, nextQuestion]);
};
