import { LucideSearch } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
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
import { useWikipediaSearch } from "@/lib/wikipedia";

interface SearchBarProps {
  selected: string;
  onSelect: (value: string) => void;
}

const placeholders: string[] = [
  "Ducks",
  "Radiohead",
  "The smashing pumpkins",
  "Cats",
  "Edam cheese",
  "Earth",
  "Van Halen",
  "Linus Torvalds",
  "Linux kernel",
  "Jimi Hendrix",
  "Minecraft",
  "Time travel",
  "Quantum physics",
  "Roman empire",
  "Area 51",
  "Evolution",
  "Vikings",
  "Game development",
  "Artificial intelligence",
  "Black holes",
  "X Japan",
  "Neon Genesis Evangelion",
  "Pink Floyd",
  "Metallica",
  "Angine de Poitrine",
  "Weezer",
  "Black Sabbath",
  "Bocchi the Rock",
  "88Kasyo Junrei",
];

export const SearchBar = ({ onSelect, selected }: SearchBarProps) => {
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");

  const { data: searchData, isFetching: isSearching } =
    useWikipediaSearch(query);

  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const searchResults: string[] = searchData?.[1];

  const handleSelect = (value: string, e?: React.SubmitEvent) => {
    e?.preventDefault();
    if (!value && searchResults.length === 0) return;
    if (!value) return;

    onSelect(value);
    setInput(value);
    setSearchOpen(false);
  };

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
    }, 500);

    return () => clearTimeout(delay);
  }, [input, selected]);

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
            <PopoverAnchor asChild>
              <InputGroup>
                <InputGroupInput
                  id="input"
                  autoComplete="off"
                  placeholder={`${placeholders[Math.floor(Math.random() * placeholders.length)]}...`}
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
                  ) : (
                    <span className="w-full text-center">No results.</span>
                  )}
                </motion.div>
              </AnimatePresence>
            </PopoverContent>
          </Popover>
        </span>
      </Field>
    </form>
  );
};
