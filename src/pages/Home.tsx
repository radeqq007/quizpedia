import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "@/components/search/SearchBar";
import { Summary } from "@/components/summary/Summary";
import { useExpandSummary } from "@/hooks/useExpandSummary";
import { useQuiz } from "@/hooks/useQuiz";
import { useQuizStore } from "@/hooks/useQuizStore";
import { useWikipediaArticle } from "@/hooks/useWikipedia";
import type { Language } from "@/types";

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

  const queryClient = useQueryClient();

  const {
    mutate: expandSummary,
    isPending: isExpanding,
    error: expandError,
    reset: resetExpand,
  } = useExpandSummary();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleExpand = () => {
    if (!articleData || !quizData) return;
    expandSummary(
      {
        article: articleData,
        summary: quizData.summary,
      },
      {
        onSuccess: (expanded) => {
          queryClient.setQueryData(["quiz", articleData.title], {
            ...quizData,
            summary: expanded,
          });
          setIsExpanded(true);
        },
      },
    );
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: selected is used as a trigger
  useEffect(() => {
    setIsExpanded(false);
    resetExpand();
  }, [selected, resetExpand]);

  return (
    <div className="flex flex-col gap-8 items-center w-full md:w-2/3 lg:w-1/3 lg:min-w-140 m-auto p-8">
      <SearchBar
        lang={lang}
        onLangChange={handleLangChange}
        selected={selected}
        onSelect={setSelected}
      />

      <Summary
        selected={selected}
        quiz={{
          data: quizData,
          isGenerating,
          isFetchingArticle: isFetching,
          error: quizError,
        }}
        expansion={{
          isExpanded,
          isPending: isExpanding,
          error: expandError,
          onExpand: handleExpand,
        }}
        onStart={() => {
          if (!quizData) return;
          setQuiz(quizData);
          navigate("/quiz");
        }}
      />
    </div>
  );
};
