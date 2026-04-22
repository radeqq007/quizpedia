import { useEffect, useState } from "react";
import { useWikipediaSearch } from "@/hooks/useWikipedia";

export const useSearchBar = (
  onSelect: (v: string) => void,
  selected: string,
) => {
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const { data: searchData, isFetching: isSearching } =
    useWikipediaSearch(query);

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

  return {
    input,
    setInput,
    searchResults,
    isSearching,
    searchOpen,
    setSearchOpen,
    handleSelect,
  };
};
