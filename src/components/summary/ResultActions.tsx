import { LucideArrowLeft, LucideRotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ResultActionsProps {
  onTryAgain: () => void;
  onTryDifferent: () => void;
}

export const ResultActions = ({
  onTryAgain,
  onTryDifferent,
}: ResultActionsProps) => {
  return (
    <div className="flex justify-end w-full gap-4">
      <Button
        size="lg"
        variant="secondary"
        className="group"
        onClick={onTryAgain}
      >
        <LucideRotateCcw className="group-hover:-rotate-20 transition-transform" />
        Try again
      </Button>

      <Button size="lg" className="group" onClick={onTryDifferent}>
        <LucideArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Try a different quiz
      </Button>
    </div>
  );
};
