import { SummarySkeleton } from "@/components/summary/SummarySkeleton";

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

  return (
    <div
      className="h-full pt-1 pb-4 overflow-y-auto leading-relaxed nice-scrollbar"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
      }}
    >
      {summary}
    </div>
  );
};
