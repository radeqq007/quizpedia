import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { exampleTopics } from "@/constants/constants";
import { useSearchBar } from "@/hooks/useSearchBar";
import { useWikipediaSearch } from "@/hooks/wikipedia";
import { LucideSearch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { SearchSuggestions } from "./SearchSuggestions";

interface SearchBarProps {
  selected: string;
  onSelect: (value: string) => void;
}

export const SearchBar = ({ onSelect, selected }: SearchBarProps) => {
  const {
    input,
    setInput,
    searchResults,
    isSearching,
    searchOpen,
    setSearchOpen,
    handleSelect,
  } = useSearchBar(onSelect, selected);

  return (
    <form
      className="w-full flex items-end gap-5"
      onSubmit={(e) => handleSelect(searchResults[0], e)}
    >
      <Field>
        <span className="flex flex-col gap-2">
          <FieldLabel className="text-xl" htmlFor="input">
            I want a quiz about...
          </FieldLabel>

          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <div className="relative">
              <PopoverAnchor asChild>
                <InputGroup>
                  <InputGroupInput
                    id="input"
                    autoComplete="off"
                    placeholder={`${exampleTopics[Math.floor(Math.random() * exampleTopics.length)]}...`}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  />

                  <InputGroupButton
                    onClick={() => handleSelect(searchResults[0])}
                  >
                    {isSearching ? <Spinner /> : <LucideSearch />}
                  </InputGroupButton>
                </InputGroup>
              </PopoverAnchor>

              <SearchSuggestions
                input={input}
                selected={selected}
                onSelect={handleSelect}
              />
            </div>

            <PopoverContent
              onOpenAutoFocus={(e) => e.preventDefault()}
              className="p-0 mt-0 w-(--radix-popover-trigger-width)"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.1 }}
                  className="w-full flex flex-col rounded-lg px-1 py-2"
                >
                  {searchResults && searchResults.length > 0 ? (
                    searchResults?.map((result) => (
                      <button
                        type="button"
                        className="my-1 cursor-pointer hover:bg-input h-8 px-3 rounded-lg text-left transition-colors"
                        key={result}
                        onClick={() => handleSelect(result)}
                      >
                        {result}
                      </button>
                    ))
                  ) : !isSearching ? (
                    <span className="w-full text-center">No results.</span>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </PopoverContent>
          </Popover>
        </span>
      </Field>
    </form>
  );
};
