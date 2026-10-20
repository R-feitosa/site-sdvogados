import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Check, X } from "lucide-react";
import type { PracticeArea } from "@/content/site";
import { FIRM } from "@/content/site";
import { useSite } from "@/providers/SiteProvider";
import { EASE_GLASS } from "@/lib/motion";

export default function AreaDrawer({ area, onClose }: { area: PracticeArea | null; onClose: () => void }) {
  const { lockScroll, setTopic, scrollTo } = useSite();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    lockScroll("drawer", !!area);
    if (!area) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      prev?.focus?.();
    };
  }, [area, lockScroll, onClose]);

  const talk = () => {
    if (!area) return;
    setTopic(area.id);
    onClose();
    window.setTimeout(() => scrollTo("contato"), 350);
  };

  const wa = area
    ? `https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent(
        `Olá! Gostaria de falar com um especialista em ${area.title}.`,
      )}`
    : "#";

  return (
    <AnimatePresence>
      {area && (
        <motion.div
          className="fixed inset-0 z-[150]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="area-drawer-title"
        >
          <button
            type="button"
            aria-label="Fechar"
            className="absolute inset-0 bg-black/50"
            style={{ WebkitBackdropFilter: "blur(6px)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
            data-cursor="Fechar"
          />
          <motion.aside
            data-lenis-prevent
            className="glass absolute bottom-0 right-0 top-auto flex max-h-[88svh] w-full flex-col overflow-y-auto rounded-t-[28px] md:top-0 md:max-h-none md:w-[min(560px,92vw)] md:rounded-l-[32px] md:rounded-tr-none"
            style={{
              ["--glass-fill" as string]:
                "linear-gradient(160deg, rgba(86,16,16,.78) 0%, rgba(28,8,11,.86) 55%, rgba(128,0,32,.6) 100%)",
              ["--glass-blur" as string]: "30px",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.75, ease: EASE_GLASS }}
          >
            <div className="relative z-10 flex flex-1 flex-col p-7 md:p-10">
              <div className="flex items-center justify-between">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/25">
                  <area.icon className="h-6 w-6" />
                </span>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/20 transition hover:bg-white/20"
                  aria-label="Fechar detalhes"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h3 id="area-drawer-title" className="display mt-10 text-[clamp(2.6rem,6vw,3.8rem)] font-light">
                {area.title}
              </h3>
              <p className="mt-4 text-[17px] leading-relaxed text-white/80">{area.detail}</p>

              <ul className="mt-8 space-y-3">
                {area.items.map((it, i) => (
                  <motion.li
                    key={it}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, ease: EASE_GLASS, delay: 0.25 + i * 0.07 }}
                    className="flex items-start gap-3 rounded-2xl bg-white/[0.06] px-4 py-3.5 ring-1 ring-white/10"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#ff8aa3]" />
                    <span className="text-[15px] text-white/90">{it}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
                <button type="button" onClick={talk} className="btn btn-solid flex-1">
                  Falar com um especialista
                </button>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn glass btn-glass flex-1">
                  <span className="relative z-10">Chamar no WhatsApp</span>
                </a>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
