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
    const uniqueSuggestions = new Set<string>();

    while (uniqueSuggestions.size < 4) {
      const randomIndex = Math.floor(
        Math.random() * exampleTopics[lang].length,
      );
      uniqueSuggestions.add(exampleTopics[lang][randomIndex]);
    }

    setSuggestions(Array.from(uniqueSuggestions));
  }, []);
  return (
    <div className="absolute top-full left-0 right-0 sm:flex justify-center gap-2 pt-2 hidden">
      <AnimatePresence>
        {!input &&
          !selected &&
          suggestions.map((suggestion, idx) => (
            <motion.span
              key={suggestion}
              initial={{ opacity: -1, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: idx / 10 }}
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
