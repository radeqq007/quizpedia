import { LucideSearch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import en from "@/assets/en.svg";
import pl from "@/assets/pl.svg";
import { SearchSuggestions } from "@/components/SearchSuggestions";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { exampleTopics } from "@/constants/constants";
import { useSearchBar } from "@/hooks/useSearchBar";
import type { Language } from "@/types";
import { useMemo } from "react";

interface SearchBarProps {
  selected: string;
  onSelect: (value: string) => void;
  lang: Language;
  onLangChange: (lang: Language) => void;
}

export const SearchBar = ({
  onSelect,
  selected,
  lang,
  onLangChange,
}: SearchBarProps) => {
  const {
    input,
    setInput,
    searchResults,
    isSearching,
    searchOpen,
    setSearchOpen,
    handleSelect,
  } = useSearchBar(onSelect, selected, lang);

  const placeholder = useMemo(() => {
    const arr = exampleTopics[lang];
    return arr[Math.floor(Math.random() * arr.length)] + "...";
  }, [lang]);

  return (
    <form
      className="w-full flex items-end gap-5"
      onSubmit={(e) =>
        handleSelect(searchResults.length > 0 ? searchResults[0] : "", e)
      }
    >
      <Field>
        <span className="flex flex-col gap-2">
          <FieldLabel className="text-xl" htmlFor="input">
            I want a quiz about...
          </FieldLabel>

          <Popover open={searchOpen} onOpenChange={setSearchOpen}>
            <div className="relative">
              <PopoverAnchor asChild>
                <div className="flex w-full gap-2">
                  <InputGroup>
                    <InputGroupInput
                      id="input"
                      autoComplete="off"
                      placeholder={placeholder}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                    />

                    <InputGroupButton
                      onClick={() => handleSelect(searchResults[0])}
                    >
                      {isSearching ? <Spinner /> : <LucideSearch />}
                    </InputGroupButton>
                  </InputGroup>
                  <Select
                    value={lang}
                    onValueChange={(e: Language) => onLangChange(e)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="en">
                          <img src={en} alt="EN" className="h-6" />
                        </SelectItem>
                        <SelectItem value="pl">
                          <img src={pl} alt="PL" className="h-6" />
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverAnchor>

              <SearchSuggestions
                input={input}
                selected={selected}
                onSelect={handleSelect}
                lang={lang}
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
