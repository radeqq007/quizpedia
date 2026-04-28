import { AnimatePresence, motion } from "motion/react";
import { SummaryContent } from "@/components/SummaryContent";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import type { QuizData } from "@/types";

interface SummaryProps {
  selected: string;
  quiz: {
    data?: QuizData;
    isGenerating: boolean;
    isFetchingArticle: boolean;
    error: Error | null;
  };
  expansion: {
    isExpanded: boolean;
    isPending: boolean;
    error: Error | null;
    onExpand: () => void;
  };
  onStart: () => void;
}

export const Summary = ({
  selected,
  quiz,
  expansion,
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
          isGenerating={quiz.isGenerating}
          isFetching={quiz.isFetchingArticle}
          error={quiz.error}
          summary={quiz.data?.summary}
        />

        <span className="w-full flex gap-2 justify-end mt-5">
          <Button
            variant="secondary"
            disabled={!quiz.data || expansion.isExpanded || expansion.isPending}
            onClick={expansion.onExpand}
          >
            {expansion.error ? (
              "Error."
            ) : expansion.isPending ? (
              <Spinner />
            ) : (
              "Expand"
            )}
          </Button>
          <Button disabled={!quiz.data} onClick={onStart}>
            Start
          </Button>
        </span>
      </motion.div>
    </AnimatePresence>
  );
};
