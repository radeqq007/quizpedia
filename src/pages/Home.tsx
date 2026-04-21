import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuiz } from "@/lib/quiz";
import { useQuizStore } from "@/lib/store";
import { useWikipediaArticle } from "@/lib/wikipedia";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [selected, setSelected] = useState<string>("");
  const { data: articleData } = useWikipediaArticle(selected);
  const {
    data: quizData,
    isFetching: isGenerating,
    error: quizError,
  } = useQuiz(articleData);

  const navigate = useNavigate();
  const setQuiz = useQuizStore((s) => s.setQuiz);

  let summary;
  if (isGenerating) {
    summary = (
      <div className="flex w-full flex-col gap-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
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
    summary = quizData?.summary;
  }

  return (
    <div className="flex flex-col gap-18 items-center w-full md:w-2/3 lg:w-1/3 lg:min-w-140 m-auto p-8">
      <SearchBar selected={selected} onSelect={setSelected} />

      <div className="border border-input bg-transparent rounded-md px-6 py-4 w-full min-h-40 flex flex-col justify-between gap-3">
        <Label className="text-2xl font-bold">Summary</Label>
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
      </div>
    </div>
  );
};
