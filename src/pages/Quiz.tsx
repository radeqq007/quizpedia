import { useQuizStore } from '@/lib/store';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Quiz = () => {
  const { quiz, curQuestion, selectAnswer, nextQuestion } = useQuizStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!quiz) {
      navigate('/');
      return;
    }
    if (curQuestion >= quiz!.questions.length) navigate('/result');
  }, [quiz, curQuestion, navigate]);

  if (!quiz || curQuestion >= quiz.questions.length) return null;

  return (
    <div className="flex flex-col gap-10 items-center w-full lg:w-2/3 xl:w-1/3 m-auto p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={curQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
          className="border border-input rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-10"
        >
          <h2 className="text-2xl font-semibold text-center">
            {quiz?.questions[curQuestion].question}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4">
            {quiz?.questions[curQuestion].options.map((option, idx) => (
              <div
                key={idx}
                className="h-12 text-xl flex justify-start items-center group"
                onClick={() => {
                  selectAnswer(curQuestion, option);
                  nextQuestion();
                }}
              >
                <span className="bg-primary text-primary-foreground font-bold text-2xl h-full aspect-square flex items-center justify-center rounded-l-lg">
                  {['A', 'B', 'C', 'D'][idx]}
                </span>

                <span className="border border-primary h-full w-full flex items-center justify-center rounded-r-lg group-hover:bg-primary/80 cursor-pointer transition-colors">
                  {option}
                </span>
              </div>
            ))}
          </div>

        </motion.div>
      </AnimatePresence>
          <div className="flex gap-2 m-auto">
            {quiz?.questions.map((_, idx) => (
              <span
                key={idx}
                className={clsx(
                  'relative overflow-clip h-4 aspect-square rounded-full bg-primary/50',
                )}
              >
                <motion.div
                  initial={false}
                  animate={{ 
                    width: idx <= curQuestion ? '100%' : '0%' 
                  }}
                  transition={{ 
                    duration: 0.1, 
                    ease: "easeInOut" 
                  }}
                  className="absolute inset-0 bg-primary"
                />
              </span>
            ))}
          </div>
    </div>
  );
};
