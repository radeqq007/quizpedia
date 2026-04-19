import logo from "@/assets/logo.svg";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { useQuiz } from "@/lib/quiz";
import { useWikipediaArticle, useWikipediaSearch } from "@/lib/wikipedia";
import { LucideSearch } from "lucide-react";
import { useState } from "react";

export const Home = () => {
  const [input, setInput] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const { data: searchData, isFetching: isSearching } =
    useWikipediaSearch(query);
  const { data: articleData, isFetching } = useWikipediaArticle(
    searchData?.[1]?.[0],
  );
  const { data: quizData, isFetching: isGenerating, error: quizError } = useQuiz(articleData);

  let summary;
  if (isGenerating) {
    summary = <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  } else if (quizError?.message === "rate_limited") {
    summary = <p className="text-primary-foreground">Rate limit exceeded. Try again soon.</p>
  } else if (quizError) {
    summary = <p className="text-primary-foreground">Internal server error.</p>
  } else {
    summary = quizData?.summary
  }

  const handleSearch = (e?: React.SubmitEvent) => {
    e?.preventDefault();
    setQuery(input);
  };

  return (
    <div className="flex flex-col gap-18 items-center w-1/3 m-auto h-screen p-8">
      <span className="flex items-end gap-2">
        <img src={logo} className="h-12" alt="logo" />
        <h1 className="text-6xl font-black">Quizpedia</h1>
      </span>

      <form className="w-full flex items-end gap-5" onSubmit={handleSearch}>
        <Field>
          <span className="flex flex-col gap-2">
            <FieldLabel className="text-xl" htmlFor="input">
              I want a quiz about...
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                id="input"
                placeholder="Ducks..."
                onChange={(e) => setInput(e.target.value)}
              />

              <InputGroupButton onClick={() => handleSearch()}>
                {isSearching ? <Spinner /> : <LucideSearch />}
              </InputGroupButton>
            </InputGroup>
          </span>
        </Field>
      </form>

      <div className="border border-input bg-transparent rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-3">
        <Label className="text-2xl font-bold">Summary</Label>
        {summary}

        <span className="w-full flex gap-2 justify-end mt-5">
          <Button variant="secondary">Expand</Button>
          <Button>Start</Button>
        </span>
      </div>
    </div>
  );
};
