import { HelmetProvider } from "react-helmet-async";
import { MotionConfig } from "framer-motion";
import { BrowserRouter, MemoryRouter, Routes, Route } from "react-router-dom";
import { SiteProvider } from "@/providers/SiteProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// VITE_ROUTER=memory é usado só na prévia hospedada (sem controle do caminho da URL)
const Router = import.meta.env.VITE_ROUTER === "memory" ? MemoryRouter : BrowserRouter;

const App = () => (
  <HelmetProvider>
    <MotionConfig reducedMotion="user">
    <Router>
      <SiteProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          {/* Adicione rotas personalizadas acima da rota coringa "*" */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SiteProvider>
    </Router>
    </MotionConfig>
  </HelmetProvider>
);

export default App;
