import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchWikiArticle, useWikipediaSearch } from "@/hooks/useWikipedia";
import type { Language } from "@/types";

export const useSearchBar = (
  onSelect: (v: string) => void,
  selected: string,
  lang: Language,
) => {
  const queryClient = useQueryClient();
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const { data: searchData, isFetching: isSearching } = useWikipediaSearch(
    query,
    lang,
  );

  const searchResults: string[] = searchData?.[1];

  useEffect(() => {
    if (!input) {
      setSearchOpen(false);
      setQuery("");
      return;
    }

    if (input === selected) {
      setSearchOpen(false);
      return;
    }

    const delay = setTimeout(() => {
      setQuery(input);
      setSearchOpen(true);
    }, 300);

    return () => clearTimeout(delay);
  }, [input, selected]);

  const handleSelect = (value: string, e?: React.SubmitEvent) => {
    e?.preventDefault();
    if (!value && searchResults.length === 0) return;
    if (!value) return;

    onSelect(value);
    setInput(value);
    setSearchOpen(false);
  };

  const handleHover = (title: string) => {
    queryClient.prefetchQuery({
      queryKey: ["wikiArticle", title],
      queryFn: () => fetchWikiArticle(title, lang),
      staleTime: 1000 * 60 * 5,
    });
  };

  return {
    input,
    setInput,
    searchResults,
    isSearching,
    searchOpen,
    setSearchOpen,
    handleSelect,
    handleHover,
  };
};
