export type Language = "en" | "pl";

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type QuizData = {
  summary: string;
  questions: Question[];
};

export type Article = {
  title: string;
  content: string;
};
