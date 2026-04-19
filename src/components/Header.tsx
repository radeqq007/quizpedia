import logo from "@/assets/logo.svg";

export const Header = () => {
  return (
    <span className="flex items-end gap-2">
      <img src={logo} className="h-12" alt="logo" />
      <h1 className="text-6xl font-black">Quizpedia</h1>
    </span>
  );
};
