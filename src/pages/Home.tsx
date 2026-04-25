import { SearchBar } from "@/components/SearchBar";
import { SummaryContent } from "@/components/SummaryContent";
import { Button } from "@/components/ui/button";
import { useQuiz } from "@/hooks/useQuiz";
import { useQuizStore } from "@/hooks/useQuizStore";
import { useWikipediaArticle } from "@/hooks/useWikipedia";
import { cn } from "@/lib/utils";
import type { Language } from "@/types";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [selected, setSelected] = useState<string>("");
  const [lang, setLang] = useState<Language>(
    (localStorage.getItem("lang") as Language) ?? "en",
  );
  const { data: articleData, isFetching } = useWikipediaArticle(selected, lang);
  const {
    data: quizData,
    isFetching: isGenerating,
    error: quizError,
  } = useQuiz(articleData);

  const navigate = useNavigate();
  const setQuiz = useQuizStore((s) => s.setQuiz);

  useEffect(() => {
    document.title = selected
      ? `${selected} - Quizpedia`
      : "Quizpedia - Quiz Yourself on Anything";
  }, [selected]);

  const handleLangChange = (language: Language) => {
    setLang(language);
    localStorage.setItem("lang", language);
  };

  return (
    <div className="flex flex-col gap-8 items-center w-full md:w-2/3 lg:w-1/3 lg:min-w-140 m-auto p-8">
      <SearchBar
        lang={lang}
        onLangChange={handleLangChange}
        selected={selected}
        onSelect={setSelected}
      />

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
            <Button variant="secondary" disabled={!quizData} >Expand</Button>
            <Button
              disabled={!quizData}
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
