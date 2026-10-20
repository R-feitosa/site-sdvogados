import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { useState } from "react";
import { FIRM, RAIL } from "@/content/site";
import { useSite } from "@/providers/SiteProvider";
import { useActiveSection } from "@/lib/motion";

const IDS = RAIL.map((r) => r.id);

/** Barra de progresso de leitura no topo */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[130] h-[2px] origin-left"
      style={{ scaleX, background: "linear-gradient(90deg, #800020, #ff4d6d 60%, #ffffff)" }}
    />
  );
}

/** Trilho lateral: marca a seção atual e permite saltar entre seções */
export function SectionRail() {
  const { scrollTo, introDone } = useSite();
  const active = useActiveSection(IDS);
  const [hover, setHover] = useState<string | null>(null);

  const visible = introDone && active !== "inicio";
  return (
    <motion.nav
      aria-label="Seções da página"
      className="fixed right-4 top-1/2 z-[100] hidden -translate-y-1/2 xl:block"
      initial={{ x: 60 }}
      animate={{ x: visible ? 0 : 60 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <ul className="flex flex-col items-end gap-1">
        {RAIL.map((r) => {
          const on = r.id === active;
          return (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => scrollTo(r.id)}
                onPointerEnter={() => setHover(r.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(r.id)}
                onBlur={() => setHover(null)}
                className="group flex h-6 items-center gap-3"
                aria-label={r.label}
                aria-current={on ? "true" : undefined}
              >
                <AnimatePresence>
                  {hover === r.id && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      className="glass glass-soft whitespace-nowrap rounded-full px-3 py-1 text-[12px] text-white"
                    >
                      {r.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                <span
                  className="block h-px bg-white transition-all duration-500"
                  style={{ width: on ? 28 : 12, opacity: on ? 1 : 0.35 }}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </motion.nav>
  );
}

/** Botão flutuante de WhatsApp (aparece depois do hero) */
export function WhatsAppFab() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setShow(y > window.innerHeight * 0.8));
  const href = `https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent("Olá! Gostaria de agendar uma consulta.")}`;

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Falar com o escritório pelo WhatsApp"
          data-cursor="WhatsApp"
          className="glass fixed bottom-5 right-5 z-[100] flex h-14 w-14 items-center justify-center rounded-full md:bottom-8 md:right-8 md:h-16 md:w-16"
          style={{ ["--glass-fill" as string]: "linear-gradient(140deg, rgba(37,211,102,.55), rgba(18,140,72,.45))" }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
        >
          <span aria-hidden className="absolute inset-0 animate-ping rounded-full bg-[#25d366]/25 [animation-duration:2.6s]" />
          <svg viewBox="0 0 24 24" className="relative z-10 h-7 w-7 fill-white" aria-hidden>
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.32l-.34-.2-3.57.94.95-3.48-.22-.36a9.4 9.4 0 0 1-1.44-5.02c0-5.2 4.23-9.43 9.44-9.43 2.52 0 4.89.98 6.67 2.77a9.37 9.37 0 0 1 2.76 6.67c0 5.2-4.24 9.43-9.44 9.43m8.03-17.46A11.27 11.27 0 0 0 12.05.72C5.8.72.7 5.8.7 12.06c0 2 .52 3.95 1.52 5.67L.6 23.62l6.02-1.58a11.33 11.33 0 0 0 5.42 1.38h.01c6.25 0 11.34-5.09 11.34-11.35 0-3.03-1.18-5.88-3.32-8.03" />
          </svg>
        </motion.a>
      )}
    </AnimatePresence>
  );
}

/** Luzes vinho ao fundo, para o vidro sempre ter o que refratar */
export function Ambient() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[#0c0406]" />
      <div className="ambient-blob absolute left-[-15%] top-[-10%] h-[70vmax] w-[70vmax] rounded-full bg-[radial-gradient(closest-side,rgba(128,0,32,.32),transparent)]" />
      <div
        className="ambient-blob absolute bottom-[-25%] right-[-20%] h-[80vmax] w-[80vmax] rounded-full bg-[radial-gradient(closest-side,rgba(86,16,16,.45),transparent)]"
        style={{ animationDelay: "-12s", animationDuration: "34s" }}
      />
    </div>
  );
}
