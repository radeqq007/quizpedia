import { Footer } from "@/components/Footer";
import { NotFound } from "@/pages/404";
import { Home } from "@/pages/Home";
import { Quiz } from "@/pages/Quiz";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
