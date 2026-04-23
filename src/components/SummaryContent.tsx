import { SummarySkeleton } from "@/components/SummarySkeleton";

type SummaryContentProps = {
  isGenerating: boolean;
  isFetching: boolean;
  error: Error | null;
  summary: string | undefined;
};

export const SummaryContent = ({
  isGenerating,
  isFetching,
  error,
  summary,
}: SummaryContentProps) => {
  if (isGenerating || isFetching) return <SummarySkeleton />;
  if (error?.message === "rate_limited")
    return <p className="text-primary">Rate limit exceeded. Try again soon.</p>;
  if (error)
    return <p className="text-primary">Internal server error. Try again.</p>;

  return <span>{summary}</span>;
};
