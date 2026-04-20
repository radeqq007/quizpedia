import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label } from "@/components/ui/label";
import { useQuizStore } from "@/lib/store";
import clsx from "clsx";
import { LucideArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

export const Result = () => {
  const { quiz, answers, reset } = useQuizStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!quiz) navigate("/");
  }, [quiz, navigate]);

  if (!quiz) return null;

  const score = quiz.questions.filter((q, i) => answers[i] === q.answer).length;
  const total = quiz.questions.length;
  const percentage = Math.round((score / total) * 100);

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
    <>
      <div className="flex flex-col gap-10 items-center w-full lg:w-2/3 xl:w-1/3 lg:min-w-150 m-auto p-8">
        <div className="border border-input rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-10">
          <Label className="text-2xl font-bold">Result</Label>
          <ChartContainer config={chartConfig} className="h-40 w-full">
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
                    formatter={(value) => [`${value}%`, "Score"]}
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
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.09 }}
            viewport={{ once: true }}
            key={i}
            className="border border-input rounded-md px-6 py-4 w-full flex flex-col gap-2"
          >
            <h3 className="text-xl font-bold">
              {i + 1}. {q.question}
            </h3>
            <span className="flex flex-col gap-2">
              {q.options.map((opt, j) => (
                <span
                  className={clsx(
                    "border px-4 py-2 rounded-lg",
                    quiz.questions[i].answer === opt &&
                      "border-green-400 bg-green-400/30",
                    answers[i] === opt &&
                      quiz.questions[i].answer !== opt &&
                      "border-red-600/75 bg-red-700/30",
                  )}
                  key={j}
                >
                  {opt}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
        <Button
          size="lg"
          onClick={() => {
            reset();
            navigate("/");
          }}
        >
          <LucideArrowLeft />
          Try a different quiz
        </Button>
      </div>
    </>
  );
};
