import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { Question } from "@/types";

interface QuestionResultProps {
  question: Question;
  answer: string;
  idx: number;
}

export const QuestionResult = ({
  question,
  answer,
  idx,
}: QuestionResultProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.09 }}
      viewport={{ once: true }}
      key={question.question}
      className="border border-input rounded-md px-6 py-4 w-full flex flex-col gap-2"
    >
      <h3 className="text-xl font-bold">
        {idx + 1}. {question.question}
      </h3>
      <span className="flex flex-col gap-2">
        {question.options.map((opt) => (
          <span
            className={cn(
              "border px-4 py-2 rounded-lg",
              question.answer === opt && "border-green-400 bg-green-400/30",
              answer === opt &&
                question.answer !== opt &&
                "border-red-600/75 bg-red-700/30",
            )}
            key={opt}
          >
            {opt}
          </span>
        ))}
      </span>
    </motion.div>
  );
};
