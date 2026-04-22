import { useQuizStore } from "@/hooks/useQuizStore";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quiz || curQuestion >= quiz.questions.length) return;

      const options = quiz.questions[curQuestion].options;
      const keyMap: Record<string, number> = {
        "1": 0,
        "2": 1,
        "3": 2,
        "4": 3,
        a: 0,
        b: 1,
        c: 2,
        d: 3,
      };

      const idx = keyMap[e.key.toLowerCase()];

      if (idx === undefined) return;

      selectAnswer(curQuestion, options[idx]);
      nextQuestion();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quiz, curQuestion, selectAnswer, nextQuestion]);

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
              <button
                type="button"
                key={option}
                className="h-full min-h-12 text-xl flex justify-start items-center group min-w-0 overflow-hidden"
                onClick={() => {
                  selectAnswer(curQuestion, option);
                  nextQuestion();
                }}
              >
                <span className="bg-primary text-primary-foreground font-bold text-2xl min-w-0 h-full aspect-square flex items-center justify-center rounded-l-lg shrink-0">
                  {["A", "B", "C", "D"][idx]}
                </span>

                <span className="border border-l-0 border-primary h-full w-full px-1 flex items-center justify-center rounded-r-lg group-hover:bg-primary/80 cursor-pointer transition-colors">
                  <span className="leading-tight wrap-break-word min-w-0 w-full text-center py-2">{option}</span>
                </span>
              </button>
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
