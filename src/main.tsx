import { createRoot } from "react-dom/client";
// Fontes hospedadas no próprio site (sem chamadas ao Google Fonts: mais rápido e sem repasse de IP do visitante a terceiros)
import "@fontsource/cormorant-garamond/latin-300.css";
import "@fontsource/cormorant-garamond/latin-400.css";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource-variable/outfit/wght.css";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
