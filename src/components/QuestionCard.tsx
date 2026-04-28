import { AnimatePresence, motion } from "motion/react";
import { AnswerButton } from "@/components/AnswerButton";
import type { Question } from "@/types";

interface QuestionCardProps {
  question: Question;
  onSelect: (option: string) => void;
}

export const QuestionCard = ({ question, onSelect }: QuestionCardProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={question.question}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.1, ease: "easeInOut" }}
        className="border border-input rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-10"
      >
        <h2 className="text-2xl font-semibold text-center">
          {question.question}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 auto-rows-fr justify-between gap-4">
          {question.options.map((option, idx) => (
            <AnswerButton
              key={`${option}`}
              option={option}
              idx={idx}
              onClick={() => onSelect(option)}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
