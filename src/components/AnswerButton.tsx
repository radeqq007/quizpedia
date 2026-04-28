interface AnswerButtonProps {
  option: string;
  idx: number;
  onClick: () => void;
}

export const AnswerButton = ({ option, idx, onClick }: AnswerButtonProps) => {
  return (
    <button
      type="button"
      key={option}
      className="h-full min-h-12 text-xl flex justify-start items-center group min-w-0 overflow-hidden"
      onClick={onClick}
    >
      <span className="bg-primary text-primary-foreground font-bold text-2xl min-w-0 h-full aspect-square flex items-center justify-center rounded-l-lg shrink-0">
        {["A", "B", "C", "D"][idx]}
      </span>

      <span className="border border-l-0 border-primary h-full w-full px-1 flex items-center justify-center rounded-r-lg group-hover:bg-primary/80 cursor-pointer transition-colors">
        <span className="leading-tight wrap-break-word min-w-0 w-full text-center py-2">
          {option}
        </span>
      </span>
    </button>
  );
};
