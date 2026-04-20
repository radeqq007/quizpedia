import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useQuiz } from "@/lib/quiz";
import { useQuizStore } from "@/lib/store";
import { useWikipediaArticle, useWikipediaSearch } from "@/lib/wikipedia";
import { LucideSearch } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<string>("");
  const { data: searchData, isFetching: isSearching } =
    useWikipediaSearch(query);
  const { data: articleData } = useWikipediaArticle(selected);
  const {
    data: quizData,
    isFetching: isGenerating,
    error: quizError,
  } = useQuiz(articleData);
  const searchResults: string[] = searchData?.[1];

  const navigate = useNavigate();
  const setQuiz = useQuizStore((s) => s.setQuiz);

  const [searchOpen, setSearchOpen] = useState<boolean>(false);

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

  const handleSelect = (value: string, e?: React.SubmitEvent) => {
    e?.preventDefault();
    setSelected(value);
  };

  useEffect(() => {
    if (!input) {
      setSearchOpen(false);
      setQuery("");
      return;
    }

    const delay = setTimeout(() => {
      setQuery(input);
      setSearchOpen(true);
    }, 500);

    return () => clearTimeout(delay);
  }, [input]);

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

  return (
    <div className="flex flex-col gap-18 items-center w-full md:w-2/3 lg:w-1/3 lg:min-w-140 m-auto p-8">
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
                <div className="w-full flex flex-col rounded-lg px-1 py-2">
                  {searchResults?.map((result) => (
                    <button
                      className="my-1 cursor-pointer hover:bg-input h-8 px-3 rounded-lg text-left transition-colors"
                      key={result}
                      onClick={() => handleSelect(result)}
                    >
                      {result}
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          </span>
        </Field>
      </form>

      <div className="border border-input bg-transparent rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-3">
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
