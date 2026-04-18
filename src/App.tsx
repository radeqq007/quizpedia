import { NotFound } from "@/pages/404";
import { Home } from "@/pages/Home";
import { Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
