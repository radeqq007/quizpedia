import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo-full.svg";

export const Header = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/")}
      className="flex items-end gap-2 cursor-pointer mt-8"
    >
      <img src={logo} className="h-16" alt="logo" />
    </button>
  );
};
