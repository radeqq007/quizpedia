import { LucideArrowLeft, LucideRotateCcw } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { QuestionResult } from "@/components/QuestionResult";
import { ShareButton } from "@/components/ShareButton";
import { Button } from "@/components/ui/button";
import type { ChartConfig } from "@/components/ui/chart";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuizStore } from "@/hooks/useQuizStore";

export const Result = () => {
  const { quiz, answers, reset, retry } = useQuizStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quiz) navigate("/");
  }, [quiz, navigate]);

  useEffect(() => {
    document.title = "Your Results - Quizpedia";
  }, []);

  const { score, total, percentage } = useMemo(() => {
    if (!quiz) return { score: 0, total: 0, percentage: 0 };

    const score = quiz.questions.filter(
      (q, i) => answers[i] === q.answer,
    ).length;
    const total = quiz.questions.length;
    const percentage = Math.round((score / total) * 100);

    return { score, total, percentage };
  }, [quiz, answers]);

  if (!quiz) return null;

  const chartConfig = {
    score: {
      label: "Score %",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const chartData = quiz.questions.map((_, i) => {
    const correctSoFar = quiz.questions
      .slice(0, i + 1)
      .filter((qq, j) => answers[j] === qq.answer).length;

    return {
      question: `Q${i + 1}`,
      score: Math.round((correctSoFar / (i + 1)) * 100),
    };
  });

  return (
    <div className="flex flex-col gap-10 items-center w-full lg:w-2/3 xl:w-1/3 lg:min-w-150 m-auto p-8">
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
      {quiz?.questions.map((q, i) => (
        <QuestionResult key={`${q}`} question={q} idx={i} answer={answers[i]} />
      ))}

      <div className="flex justify-end w-full gap-4">
        <Button
          size="lg"
          variant="secondary"
          className="group"
          onClick={() => {
            retry();
            navigate("/quiz");
          }}
        >
          <LucideRotateCcw className="group-hover:-rotate-20 transition-transform" />
          Try again
        </Button>

        <Button
          size="lg"
          className="group"
          onClick={() => {
            reset();
            navigate("/");
          }}
        >
          <LucideArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Try a different quiz
        </Button>
      </div>
    </div>
  );
};
