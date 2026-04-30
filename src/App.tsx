import { AnimatePresence } from "motion/react";
import { Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { PageTransition } from "@/components/layout/PageTransition";
import { NotFound } from "@/pages/404";
import { Home } from "@/pages/Home";
import { PrivacyPolicy } from "@/pages/PrivacyPolicy";
import { Quiz } from "@/pages/Quiz";
import { Result } from "@/pages/Result";

function App() {
  const location = useLocation();

  return (
    <div className="flex flex-col justify-between items-center gap-10 h-screen max-w-screen overflow-auto nice-scrollbar">
      <Header />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Home />
              </PageTransition>
            }
          />
          <Route
            path="/quiz"
            element={
              <PageTransition>
                <Quiz />
              </PageTransition>
            }
          />
          <Route
            path="/result"
            element={
              <PageTransition>
                <Result />
              </PageTransition>
            }
          />
          <Route
            path="/privacy"
            element={
              <PageTransition>
                <PrivacyPolicy />
              </PageTransition>
            }
          />
          <Route
            path="*"
            element={
              <PageTransition>
                <NotFound />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
