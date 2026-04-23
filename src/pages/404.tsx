import { useEffect } from "react";
import cat from "@/assets/cat.gif";

export const NotFound = () => {
  useEffect(() => {
    document.title = "404 Not Found - Quizpedia";
  }, []);

  return (
    <div className="flex items-center justify-center flex-col">
      <img src={cat} alt="404 not found" className="w-60" />
      <h1 className="text-8xl font-black">404</h1>
      <p className="text-2xl">Page not found.</p>
    </div>
  );
};
