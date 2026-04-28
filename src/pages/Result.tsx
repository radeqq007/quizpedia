import { LucideArrowLeft, LucideRotateCcw } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionResult } from "@/components/summary/QuestionResult";
import { ResultSummary } from "@/components/summary/ResultSummary";
import { Button } from "@/components/ui/button";
import { useQuizStore } from "@/hooks/useQuizStore";

export const Result = () => {
  const { quiz, answers, reset, retry } = useQuizStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quiz) navigate("/");
  }, [quiz, navigate]);

  useEffect(() => {
    document.title = "Your Results - Quizpedia";
  }, []);

  if (!quiz) return null;

  return (
    <div className="flex flex-col gap-10 items-center w-full lg:w-2/3 xl:w-1/3 lg:min-w-150 m-auto p-8">
      <ResultSummary quiz={quiz} answers={answers} />

      {quiz?.questions.map((q, i) => (
        <QuestionResult key={`${q}`} question={q} idx={i} answer={answers[i]} />
      ))}

      <div className="flex justify-end w-full gap-4">
        <Button
          size="lg"
          variant="secondary"
          className="group"
          onClick={() => {
            retry();
            navigate("/quiz");
          }}
        >
          <LucideRotateCcw className="group-hover:-rotate-20 transition-transform" />
          Try again
        </Button>

        <Button
          size="lg"
          className="group"
          onClick={() => {
            reset();
            navigate("/");
          }}
        >
          <LucideArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Try a different quiz
        </Button>
      </div>
    </div>
  );
};
