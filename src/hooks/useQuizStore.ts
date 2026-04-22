import type { QuizData } from "@/hooks/useQuiz";
import { create } from "zustand";

type QuizStore = {
  quiz: QuizData | null;
  curQuestion: number;
  answers: Record<number, string>;
  setQuiz: (quiz: QuizData) => void;
  selectAnswer: (idx: number, answer: string) => void;
  nextQuestion: () => void;
  reset: () => void;
  retry: () => void;
};

export const useQuizStore = create<QuizStore>(
  (set): QuizStore => ({
    quiz: null,
    curQuestion: 0,
    answers: {},
    setQuiz: (quiz) => set({ quiz, curQuestion: 0, answers: {} }),
    selectAnswer: (index, answer) =>
      set((s) => ({ answers: { ...s.answers, [index]: answer } })),
    nextQuestion: () => set((s) => ({ curQuestion: s.curQuestion + 1 })),
    reset: () => set({ quiz: null, curQuestion: 0, answers: {} }),
    retry: () => set({ curQuestion: 0, answers: {} }),
  }),
);
