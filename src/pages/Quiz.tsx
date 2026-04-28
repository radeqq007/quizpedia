import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionIndicators } from "@/components/QuestionIndicators";
import { useQuizKeyboard } from "@/hooks/useQuizKeyboard";
import { useQuizStore } from "@/hooks/useQuizStore";

export const Quiz = () => {
  const { quiz, curQuestion, selectAnswer, nextQuestion } = useQuizStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!quiz) {
      navigate("/");
      return;
    }
    if (curQuestion >= quiz?.questions.length) navigate("/result");
  }, [quiz, curQuestion, navigate]);

  useEffect(() => {
    if (!quiz || curQuestion >= quiz.questions.length) return;
    document.title = `${quiz.questions[curQuestion].question} - Quizpedia`;
  }, [quiz, curQuestion]);

  useQuizKeyboard({ quiz, curQuestion, selectAnswer, nextQuestion });

  if (!quiz || curQuestion >= quiz.questions.length) return null;

  return (
    <div className="flex flex-col gap-10 items-center w-full lg:w-2/3 xl:w-1/3 lg:min-w-150 m-auto p-8">
      <QuestionCard
        question={quiz?.questions[curQuestion]}
        onSelect={(option: string) => {
          selectAnswer(curQuestion, option);
          nextQuestion();
        }}
      />

      <QuestionIndicators
        questions={quiz?.questions}
        curQuestion={curQuestion}
      />
    </div>
  );
};
