import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useQuizStore } from '@/lib/store';
import clsx from 'clsx';
import { LucideArrowLeft } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

  return (
    <>
      <div className="flex flex-col gap-10 items-center w-1/3 m-auto p-8">
        <div className="border border-input rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-10">
          <Label className="text-2xl font-bold">Result</Label>
          <div className="flex text-lg justify-between items-center w-full">
            <span className="font-semibold">
              {score} / {total}
            </span>
            <span className='bg-primary text-primary-foreground rounded-lg px-4 py-2 font-bold'>
              {percentage}%
            </span>
          </div>
        </div>
        {
          quiz?.questions.map((q, i) => (
            <div key={i} className="border border-input rounded-md px-6 py-4 w-full flex flex-col gap-2">
              <h3 className="text-xl font-bold">{i + 1}. {q.question}</h3>
              <span className="flex flex-col gap-2">
                {q.options.map((opt, j) => (
                  <span
                    className={clsx(
                      "border px-4 py-2 rounded-lg",
                      quiz.questions[i].answer === opt && "border-green-400 bg-green-400/30",
                      answers[i] === opt && quiz.questions[i].answer !== opt && "border-red-600/75 bg-red-700/30"
                    )}
                    key={j}
                  >
                    {opt}
                  </span>
                ))}
              </span>
            </div>
          ))
        }
        <Button size="lg" onClick={ () => {reset(); navigate("/");} }>
          <LucideArrowLeft />
          Try a different quiz
        </Button>
      </div>
    </>
  )
};
