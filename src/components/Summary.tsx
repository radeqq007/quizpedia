import { AnimatePresence, motion } from "motion/react";
import { SummaryContent } from "@/components/SummaryContent";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/types";

interface SummaryProps {
  selected: string;
  quizData: QuizData | undefined;
  quizError: Error | null;
  isGenerating: boolean;
  isFetching: boolean;
  isExpanded: boolean;
  isExpanding: boolean;
  expandError: Error | null;
  onExpand: () => void;
  onStart: () => void;
}

export const Summary = ({
  selected,
  quizData,
  isGenerating,
  isFetching,
  quizError,
  isExpanded,
  isExpanding,
  expandError,
  onExpand,
  onStart,
}: SummaryProps) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={selected ? "box" : "empty"}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        layout
        className={cn(
          "border border-input bg-transparent rounded-md px-6 py-4 w-full min-h-40 flex flex-col justify-between gap-3",
          !selected && "hidden",
        )}
      >
        <h2 className="text-2xl font-bold">Summary</h2>

        <SummaryContent
          isGenerating={isGenerating}
          isFetching={isFetching}
          error={quizError}
          summary={quizData?.summary}
        />

        <span className="w-full flex gap-2 justify-end mt-5">
          <Button
            variant="secondary"
            disabled={!quizData || isExpanded || isExpanding}
            onClick={onExpand}
          >
            {expandError ? "Error." : isExpanding ? <Spinner /> : "Expand"}
          </Button>
          <Button disabled={!quizData} onClick={onStart}>
            Start
          </Button>
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
