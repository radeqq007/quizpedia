import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionResult } from "@/components/summary/QuestionResult";
import { ResultActions } from "@/components/summary/ResultActions";
import { ResultSummary } from "@/components/summary/ResultSummary";
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

      <ResultActions
        onTryAgain={() => {
          retry();
          navigate("/quiz");
        }}
        onTryDifferent={() => {
          reset();
          navigate("/");
        }}
      />
    </div>
  );
};
