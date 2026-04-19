import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { NotFound } from "@/pages/404";
import { Home } from "@/pages/Home";
import { Quiz } from "@/pages/Quiz";
import { Result } from "@/pages/Result";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col justify-between items-center gap-10 h-screen max-w-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
