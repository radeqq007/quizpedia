import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionCard } from "@/components/QuestionCard";
import { useQuizKeyboard } from "@/hooks/useQuizKeyboard";
import { useQuizStore } from "@/hooks/useQuizStore";
import { cn } from "@/lib/utils";

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

      <div className="flex gap-2 m-auto">
        {quiz?.questions.map((q, idx) => (
          <span
            key={q.question}
            className={cn(
              "relative overflow-clip h-4 aspect-square rounded-full bg-primary/50 transition-all ease-in-out",
              idx === curQuestion && "scale-120",
            )}
          >
            <motion.div
              initial={false}
              animate={{
                width: idx <= curQuestion ? "100%" : "0%",
              }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-primary"
            />
          </span>
        ))}
      </div>
    </div>
  );
};
