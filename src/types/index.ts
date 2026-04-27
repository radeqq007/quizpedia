export type Language = "en" | "pl";

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type QuizData = {
  topic: string;
  summary: string;
  questions: Question[];
};

export type Article = {
  title: string;
  content: string;
};
