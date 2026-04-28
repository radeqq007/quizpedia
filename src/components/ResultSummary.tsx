import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ShareButton } from "@/components/ShareButton";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuizResults } from "@/hooks/useQuizResults";
import type { QuizData } from "@/types";

interface ResultSummaryProps {
  quiz: QuizData;
  answers: Record<number, string>;
}

const chartConfig = {
  score: {
    label: "Score %",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export const ResultSummary = ({ quiz, answers }: ResultSummaryProps) => {
  const { score, total, percentage, chartData } = useQuizResults({
    quiz,
    answers,
  });

  return (
    <div className="border border-input rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-10">
      <span className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Result</h2>
        <ShareButton topic={quiz.topic} score={score} total={total} />
      </span>
      <ChartContainer config={chartConfig} className="h-60 w-full">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="question" tick={{ fontSize: 12 }} />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 12 }}
            width={40}
          />
          <ChartTooltip
            content={
              <ChartTooltipContent
                formatter={(value) => [`${value}%`, " Score"]}
              />
            }
          />
          <Line
            type="monotone"
            dataKey="score"
            stroke="var(--color-score)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--color-score)" }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>

      <div className="flex text-lg justify-between items-center w-full">
        <span className="font-semibold">
          {score} / {total}
        </span>
        <span className="bg-primary text-primary-foreground rounded-lg px-4 py-2 font-bold">
          {percentage}%
        </span>
      </div>
    </div>
  );
};
