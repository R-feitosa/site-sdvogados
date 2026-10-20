import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import monogram from "@/assets/web/rf-logo-icon-trim.png";
import heroNight from "@/assets/web/hero-night.webp";
import facadeDay from "@/assets/web/facade-day.webp";
import { useSite } from "@/providers/SiteProvider";
import { EASE_GLASS, prefersReducedMotion } from "@/lib/motion";

const KEY = "rf-intro-v1";

function loadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image();
    img.onload = img.onerror = () => resolve();
    img.src = src;
    if (img.decode) img.decode().then(() => resolve(), () => resolve());
  });
}

/**
 * Abertura: o monograma RF é "preenchido" de baixo para cima conforme o hero
 * carrega de verdade (imagens + fontes). Depois, duas lâminas de vidro se abrem.
 * Em visitas seguintes na mesma sessão, a abertura é encurtada.
 */
export default function Preloader() {
  const { setIntroDone, lockScroll } = useSite();
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* sessionStorage indisponível */
    }
    const reduced = prefersReducedMotion();
    const minTime = seen || reduced ? 350 : 1700;
    const start = performance.now();
    lockScroll("intro", true);
    window.scrollTo(0, 0);

    const tasks = [loadImage(heroNight), loadImage(facadeDay), document.fonts?.ready ?? Promise.resolve()];
    let done = 0;
    tasks.forEach((t) => t.then(() => (done += 1)));

    let raf = 0;
    let shown = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const loaded = done / tasks.length;
      const timeCap = Math.min(1, elapsed / minTime);
      const target = Math.min(loaded, timeCap) * 100;
      shown += (target - shown) * 0.12;
      if (target >= 100 && shown > 99.4) shown = 100;
      setProgress(shown);
      if (shown >= 100) {
        setLeaving(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // Segurança: nunca prende o visitante por mais de 5 s
    const failsafe = window.setTimeout(() => setLeaving(true), 5000);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, [lockScroll]);

  useEffect(() => {
    if (!leaving) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ok */
    }
    const t = window.setTimeout(() => {
      setIntroDone(true);
      lockScroll("intro", false);
    }, 420);
    const t2 = window.setTimeout(() => setGone(true), 1500);
    return () => {
      window.clearTimeout(t);
      window.clearTimeout(t2);
    };
  }, [leaving, setIntroDone, lockScroll]);

  if (gone) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] ${leaving ? "pointer-events-none" : ""}`}
      aria-hidden={leaving}
      role="status"
      aria-label="Carregando o site"
    >
      {/* Lâminas */}
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-x-0 overflow-hidden"
          style={{
            top: i === 0 ? 0 : "50%",
            height: "50%",
            background:
              i === 0
                ? "linear-gradient(180deg, #0c0406 0%, #1a070b 100%)"
                : "linear-gradient(0deg, #0c0406 0%, #1a070b 100%)",
          }}
          initial={{ y: 0 }}
          animate={leaving ? { y: i === 0 ? "-100%" : "100%" } : { y: 0 }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.15 }}
        >
          <div
            className="absolute inset-x-0 h-px"
            style={{
              [i === 0 ? "bottom" : "top"]: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,.35), transparent)",
            }}
          />
        </motion.div>
      ))}

      <AnimatePresence>
        {!leaving && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            exit={{ opacity: 0, scale: 0.96, filter: "blur(8px)" }}
            transition={{ duration: 0.45, ease: EASE_GLASS }}
          >
            <div className="relative h-[120px] w-[104px] md:h-[150px] md:w-[130px]">
              {/* contorno apagado */}
              <img src={monogram} alt="" className="absolute inset-0 h-full w-full object-contain opacity-[0.12]" />
              {/* preenchimento conforme carrega */}
              <img
                src={monogram}
                alt=""
                className="absolute inset-0 h-full w-full object-contain"
                style={{ clipPath: `inset(${100 - progress}% 0 0 0)` }}
              />
              {/* brilho do nível */}
              <div
                className="absolute inset-x-[-30%] h-8 -translate-y-1/2 blur-xl"
                style={{
                  top: `${100 - progress}%`,
                  background: "radial-gradient(closest-side, rgba(179,18,58,.55), transparent)",
                  opacity: progress < 99 ? 1 : 0,
                }}
              />
            </div>
            <div className="mt-8 flex items-baseline gap-3 text-white/60">
              <span className="text-[13px] tracking-[0.02em]">Rfeitosa Advogados Associados</span>
              <span className="tabular w-10 text-right text-[13px] text-white">{Math.round(progress)}%</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
