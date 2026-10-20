import Lenis from "lenis";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { prefersReducedMotion } from "@/lib/motion";

type SiteContextValue = {
  /** a abertura (preloader) terminou e a página pode animar */
  introDone: boolean;
  setIntroDone: (v: boolean) => void;
  /** rola suavemente até uma seção pelo id */
  scrollTo: (id: string, opts?: { immediate?: boolean }) => void;
  /** rola suavemente até uma posição absoluta (px) */
  scrollToY: (y: number) => void;
  /** pausa/retoma o scroll (modais, menu). Cada origem usa sua própria chave. */
  lockScroll: (key: string, locked: boolean) => void;
  /** assunto pré-selecionado no formulário de contato */
  topic: string | null;
  setTopic: (t: string | null) => void;
};

const SiteContext = createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [introDone, setIntroDone] = useState(false);
  const [topic, setTopic] = useState<string | null>(null);
  const locks = useRef(new Set<string>());

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;
    if (locks.current.size) lenis.stop();
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  const scrollTo = useCallback((id: string, opts?: { immediate?: boolean }) => {
    const el = id === "inicio" ? document.body : document.getElementById(id);
    if (!el) return;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(id === "inicio" ? 0 : el, {
        offset: 0,
        duration: opts?.immediate ? 0 : 1.6,
        immediate: opts?.immediate,
      });
    } else {
      if (id === "inicio") window.scrollTo({ top: 0, behavior: "smooth" });
      else el.scrollIntoView({ behavior: "smooth" });
    }
    history.replaceState(null, "", id === "inicio" ? window.location.pathname : `#${id}`);
  }, []);

  const scrollToY = useCallback((y: number) => {
    const lenis = lenisRef.current;
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }, []);

  const lockScroll = useCallback((key: string, locked: boolean) => {
    if (locked) locks.current.add(key);
    else locks.current.delete(key);
    const any = locks.current.size > 0;
    const lenis = lenisRef.current;
    if (lenis) {
      if (any) lenis.stop();
      else lenis.start();
    }
    document.documentElement.style.overflow = any ? "hidden" : "";
  }, []);

  const value = useMemo(
    () => ({ introDone, setIntroDone, scrollTo, scrollToY, lockScroll, topic, setTopic }),
    [introDone, scrollTo, scrollToY, lockScroll, topic],
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite deve ser usado dentro de <SiteProvider>");
  return ctx;
}
