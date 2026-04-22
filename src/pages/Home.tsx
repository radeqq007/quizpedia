import { AnimatePresence, motion } from "motion/react";
import { type ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuiz } from "@/hooks/useQuiz";
import { useQuizStore } from "@/hooks/useQuizStore";
import { useWikipediaArticle } from "@/hooks/useWikipedia";
import { cn } from "@/lib/utils";

export const Home = () => {
  const [selected, setSelected] = useState<string>("");
  const { data: articleData, isFetching } = useWikipediaArticle(selected);
  const {
    data: quizData,
    isFetching: isGenerating,
    error: quizError,
  } = useQuiz(articleData);

  const navigate = useNavigate();
  const setQuiz = useQuizStore((s) => s.setQuiz);

  let summary: ReactElement;
  if (isGenerating || isFetching) {
    summary = (
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-9/10" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    );
  } else if (quizError?.message === "rate_limited") {
    summary = (
      <p className="text-primary-foreground">
        Rate limit exceeded. Try again soon.
      </p>
    );
  } else if (quizError) {
    summary = <p className="text-primary-foreground">Internal server error.</p>;
  } else {
    summary = <span>{quizData?.summary}</span>;
  }

  return (
    <div className="flex flex-col gap-8 items-center w-full md:w-2/3 lg:w-1/3 lg:min-w-140 m-auto p-8">
      <SearchBar selected={selected} onSelect={setSelected} />

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
          {summary}

          <span className="w-full flex gap-2 justify-end mt-5">
            <Button variant="secondary">Expand</Button>
            <Button
              onClick={() => {
                if (!quizData) return;
                setQuiz(quizData);
                navigate("/quiz");
              }}
            >
              Start
            </Button>
          </span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
