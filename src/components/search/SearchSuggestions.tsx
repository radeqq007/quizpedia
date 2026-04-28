import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { exampleTopics } from "@/constants/constants";
import type { Language } from "@/types";

interface SearchSuggestionsProps {
  input: string;
  selected: string;
  onSelect: (value: string) => void;
  lang: Language;
}

export const SearchSuggestions = ({
  input,
  selected,
  onSelect,
  lang,
}: SearchSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const suggestions = [...exampleTopics[lang]]
      .sort(() => Math.random() - 0.5)
      .slice(0, 4);

    setSuggestions(suggestions);
  }, [lang]);

  return (
    <div className="absolute top-full left-0 right-0 flex justify-center gap-2 pt-2">
      <AnimatePresence mode="wait">
        {!input &&
          !selected &&
          suggestions.map((suggestion, idx) => (
            <motion.span
              key={suggestion}
              initial={{ opacity: -1, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx / 10 }}
              className={clsx({ "hidden sm:inline": idx === 3 })} // display only 3 suggestions on mobile
            >
              <Button
                key={suggestion}
                onClick={(e) => {
                  e.preventDefault();
                  onSelect(suggestion);
                }}
                className="font-normal"
                variant="secondary"
                size="xs"
              >
                {suggestion}
              </Button>
            </motion.span>
          ))}
      </AnimatePresence>
    </div>
  );
};
