import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

interface QuestionIndicatorsProps {
  questions: Question[];
  curQuestion: number;
}

export const QuestionIndicators = ({
  questions,
  curQuestion,
}: QuestionIndicatorsProps) => {
  return (
    <div className="flex gap-2 m-auto">
      {questions.map((q, idx) => (
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
  );
};
