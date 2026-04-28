import { forwardRef } from "react";
import { Header } from "@/components/layout/Header";

interface ShareCardProps {
  topic: string;
  score: number;
  total: number;
}

export const ShareCard = forwardRef<HTMLDivElement, ShareCardProps>(
  ({ topic, score, total }: ShareCardProps, ref) => {
    return (
      <div
        ref={ref}
        className="relative bg-background w-160 h-110 flex flex-col items-center px-2"
      >
        <Header />
        <h1 className="text-2xl mt-2 font-semibold text-center">
          I scored {score} out of {total} on a quiz about {topic} on Quizpedia!
        </h1>

        <span className="absolute top-6/10 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl font-bold">
          {((score / total) * 100).toLocaleString(undefined, {
            maximumFractionDigits: 2,
          })}
          %
        </span>

        <p className="absolute bottom-4 text-xl">
          Quiz yourself on any topic on{" "}
          <span className="underline">https://quizpedia.pages.dev</span>
        </p>
      </div>
    );
  },
);
