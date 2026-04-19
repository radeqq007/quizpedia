import logo from "@/assets/logo.svg";
import { useQuizStore } from "@/lib/store";
import clsx from "clsx";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const { quiz, curQuestion, selectAnswer, nextQuestion } = useQuizStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!quiz) navigate("/");
  })

  return (
    <div className="flex flex-col gap-18 items-center w-1/2 m-auto h-screen p-8">
      <span className="flex items-end gap-2">
        <img src={logo} className="h-12" alt="logo" />
        <h1 className="text-6xl font-black">Quizpedia</h1>
      </span>

      <div className="border border-input rounded-md px-6 py-4 w-full min-h-40 flex flex-col gap-10">
        <h2 className="text-2xl font-semibold text-center">{quiz?.questions[curQuestion].question}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between gap-4">
          {
            quiz?.questions[curQuestion].options.map((option, idx) => (
              <div key={idx} className="h-12 text-xl flex justify-start items-center group" onClick={() => { selectAnswer(idx, option); nextQuestion()}}>
                <span className="bg-primary text-primary-foreground font-bold text-2xl h-full aspect-square flex items-center justify-center rounded-l-lg">
                  {["A", "B", "C", "D"][idx]}
                </span>

                <span className="border border-primary h-full w-full flex items-center justify-center rounded-r-lg group-hover:bg-primary/80 cursor-pointer transition-colors">
                  {option}
                </span>
              </div>
            ))
          }
        </div>
        
        <div className="flex gap-2 m-auto">
            {
              quiz?.questions.map((_, idx) => 
                <span key={idx} className={clsx("h-4 aspect-square rounded-full", idx <= curQuestion ? "bg-primary" : "bg-primary/50")}></span>
              )
            }
        </div>
      </div>
    </div>
  )
}