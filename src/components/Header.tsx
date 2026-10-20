import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X, Phone, Mail } from "lucide-react";
import logo from "@/assets/web/logo-header-trim.png";
import { FIRM, NAV, RAIL } from "@/content/site";
import { useSite } from "@/providers/SiteProvider";
import { EASE_GLASS, useActiveSection } from "@/lib/motion";
import Magnetic from "@/components/fx/Magnetic";

const SPY_IDS = RAIL.map((r) => r.id);

/** Mapeia a seção visível para o item de menu correspondente */
const NAV_OF: Record<string, string> = {
  inicio: "inicio",
  performance: "inicio",
  areas: "areas",
  socios: "socios",
  reconhecimento: "socios",
  sobre: "sobre",
  principios: "sobre",
  "rf-group": "sobre",
  contato: "contato",
};

export default function Header() {
  const { scrollTo, introDone, setTopic, lockScroll } = useSite();
  const active = useActiveSection(SPY_IDS);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCompact(y > 60);
    setHidden(y > 640 && y > prev + 4 && !open);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    lockScroll("menu", open);
  }, [open, lockScroll]);

  const go = (id: string) => {
    setOpen(false);
    window.setTimeout(() => scrollTo(id), open ? 380 : 0);
  };

  const careers = () => {
    setTopic("trabalhe-conosco");
    go("contato");
  };

  const navActive = NAV_OF[active] ?? "inicio";

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[120]"
        initial={{ y: -120, opacity: 0 }}
        animate={introDone ? { y: hidden ? -120 : 0, opacity: 1 } : { y: -120, opacity: 0 }}
        transition={{ duration: 0.9, ease: EASE_GLASS, delay: introDone && !compact ? 0.5 : 0 }}
      >
        <div
          className="shell flex items-center justify-between gap-6 transition-[padding] duration-500"
          style={{ paddingTop: compact ? 14 : 26, paddingBottom: 14 }}
        >
          <a
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              go("inicio");
            }}
            className="relative z-10 shrink-0"
            aria-label="Rfeitosa Advogados Associados — voltar ao início"
          >
            <img
              src={logo}
              alt="Rfeitosa Advogados Associados"
              className={`w-auto transition-all duration-500 ${compact ? "h-8 md:h-10" : "h-9 md:h-12"}`}
            />
          </a>

          {/* Navegação central em pílula de vidro com indicador deslizante */}
          <nav aria-label="Principal" className="glass absolute left-1/2 hidden -translate-x-1/2 rounded-full p-1.5 lg:block">
            <ul className="relative z-10 flex items-center">
              {NAV.map((item) => {
                const isActive = navActive === item.id;
                return (
                  <li key={item.id} className="relative">
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative block rounded-full px-[18px] py-2.5 text-[14px] font-normal transition-colors duration-300 ${
                        isActive ? "text-[#800020]" : "text-white/80 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="relative z-10 flex items-center gap-3">
            <Magnetic className="hidden lg:inline-flex">
              <button type="button" onClick={careers} className="btn btn-glass glass h-11 px-5 text-[14px]">
                <span className="relative z-10">Trabalhe conosco</span>
              </button>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="glass flex h-11 w-11 items-center justify-center rounded-full lg:hidden"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              aria-controls="menu-mobile"
            >
              <span className="relative z-10">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menu mobile: vidro em tela cheia */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            className="fixed inset-0 z-[110] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(160deg, rgba(86,16,16,.55), rgba(12,4,6,.82))",
                WebkitBackdropFilter: "blur(28px) saturate(150%)",
                backdropFilter: "blur(28px) saturate(150%)",
              }}
            />
            <nav aria-label="Menu" className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28">
              <ul className="space-y-1">
                {NAV.map((item, i) => (
                  <li key={item.id} className="overflow-hidden">
                    <motion.a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        go(item.id);
                      }}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.6, ease: EASE_GLASS, delay: 0.05 + i * 0.06 }}
                      className={`display block py-1.5 text-[44px] ${navActive === item.id ? "text-white" : "text-white/55"}`}
                    >
                      {item.label}
                    </motion.a>
                  </li>
                ))}
                <li className="overflow-hidden">
                  <motion.button
                    type="button"
                    onClick={careers}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.6, ease: EASE_GLASS, delay: 0.05 + NAV.length * 0.06 }}
                    className="display block py-1.5 text-left text-[44px] text-white/55"
                  >
                    Trabalhe conosco
                  </motion.button>
                </li>
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="space-y-3 text-[15px] text-white/75"
              >
                <a href={FIRM.phoneHref} className="flex items-center gap-3">
                  <Phone className="h-4 w-4" /> {FIRM.phone}
                </a>
                <a href={`mailto:${FIRM.email}`} className="flex items-center gap-3">
                  <Mail className="h-4 w-4" /> {FIRM.email}
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
