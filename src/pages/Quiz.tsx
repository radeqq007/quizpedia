import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AnswerButton } from "@/components/AnswerButton";
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
      <AnimatePresence mode="wait">
        <motion.div
          key={curQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.1, ease: "easeInOut" }}
          className="border border-input rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-10"
        >
          <h2 className="text-2xl font-semibold text-center">
            {quiz?.questions[curQuestion].question}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr justify-between gap-4">
            {quiz?.questions[curQuestion].options.map((option, idx) => (
              <AnswerButton
                key={`${option}`}
                option={option}
                idx={idx}
                onClick={() => {
                  selectAnswer(curQuestion, option);
                  nextQuestion();
                }}
              />
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
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
