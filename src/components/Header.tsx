import logo from "@/assets/logo.svg";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <span
      onClick={() => navigate("/")}
      className="flex items-end gap-2 cursor-pointer"
    >
      <img src={logo} className="h-12" alt="logo" />
      <h1 className="text-6xl font-black">Quizpedia</h1>
    </span>
  );
};
