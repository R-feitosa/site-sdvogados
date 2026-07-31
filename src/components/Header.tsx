import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useActiveSection, useScrolled } from "@/hooks/useScrollProgress";
import logoHeader from "@/assets/logo-header.png";

const navLinks = [
  { label: "Início", id: "inicio" },
  { label: "Áreas de Atuação", id: "areas" },
  { label: "Sócios", id: "socios" },
  { label: "Quem Somos", id: "quem-somos" },
  { label: "Contato", id: "contato" },
];

const sectionIds = navLinks.map((link) => link.id);

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isScrolled = useScrolled(24);
  const activeSection = useActiveSection(useMemo(() => sectionIds, []));
  const navigate = useNavigate();
  const location = useLocation();

  const isHome = location.pathname === "/";

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMobileMenuOpen]);

  const goToSection = useCallback(
    (id: string) => {
      setIsMobileMenuOpen(false);
      if (!isHome) {
        navigate("/#" + id);
        return;
      }
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    },
    [isHome, navigate],
  );

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50">
      {/* Mobile sheet is rendered first and sits below the bar, so the bar —
          logo and close button included — stays visible while the menu is open. */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="pointer-events-auto fixed inset-0 z-0 bg-neutral-950 lg:hidden"
          >
            <div className="flex h-full flex-col px-6 pb-10 pt-28">
              <nav className="flex flex-1 flex-col justify-center">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.id}
                    href={`#${link.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + index * 0.05, duration: 0.35, ease: "easeOut" }}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(link.id);
                    }}
                    className="group flex items-center justify-between border-b border-white/10 py-5 text-2xl font-light tracking-tight text-white/90 transition-colors duration-300 active:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-5 w-5 text-white/30 transition-transform duration-300 group-active:translate-x-1" />
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contato"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.05, duration: 0.35 }}
                onClick={(event) => {
                  event.preventDefault();
                  goToSection("contato");
                }}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-brand-light to-brand px-6 py-4 text-base font-semibold text-white"
              >
                Trabalhe Conosco
                <ArrowUpRight className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={cn(
          "relative z-10 px-4 transition-[padding] duration-500 ease-out md:px-6 lg:px-10",
          isScrolled ? "pt-2 md:pt-3" : "pt-4 md:pt-6",
        )}
      >
        <nav
          className={cn(
            "pointer-events-auto mx-auto flex max-w-[1440px] items-center justify-between gap-4",
            "rounded-full border px-3 py-2 md:px-4 md:py-2.5",
            "transition-[background-color,border-color,box-shadow] duration-500 ease-out",
            isMobileMenuOpen
              ? "border-transparent bg-transparent shadow-none"
              : isScrolled
                ? "border-black/[0.06] bg-white/85 shadow-[0_10px_40px_-16px_rgba(15,12,14,0.35)] supports-[backdrop-filter]:bg-white/70 supports-[backdrop-filter]:backdrop-blur-xl"
                : "border-white/20 bg-white/10 supports-[backdrop-filter]:backdrop-blur-md",
          )}
        >
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(event) => {
              event.preventDefault();
              goToSection("inicio");
            }}
            className="flex shrink-0 items-center rounded-full pl-1 pr-2 outline-none transition-opacity duration-300 hover:opacity-70 focus-visible:ring-2 focus-visible:ring-brand/50"
            aria-label="Rfeitosa Advogados Associados — ir para o início"
          >
            <img
              src={logoHeader}
              alt="Rfeitosa Advogados Associados"
              width={220}
              height={56}
              className={cn(
                "w-auto transition-[height] duration-500 ease-out",
                isScrolled ? "h-8 md:h-10" : "h-9 drop-shadow-[0_1px_10px_rgba(0,0,0,0.35)] md:h-12",
              )}
            />
          </a>

          {/* Desktop navigation */}
          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = isHome && activeSection === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault();
                      goToSection(link.id);
                    }}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "relative flex items-center rounded-full px-3.5 py-2 text-[13px] font-medium tracking-tight",
                      "outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand/50 xl:px-4 xl:text-sm",
                      isScrolled
                        ? isActive
                          ? "text-brand"
                          : "text-neutral-600 hover:text-brand"
                        : isActive
                          ? "text-white"
                          : "text-white/70 hover:text-white",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                        className={cn(
                          "absolute inset-0 -z-10 rounded-full",
                          isScrolled ? "bg-brand/[0.08]" : "bg-white/15",
                        )}
                      />
                    )}
                    <span className="relative">{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Desktop CTA */}
          <a
            href="#contato"
            onClick={(event) => {
              event.preventDefault();
              goToSection("contato");
            }}
            className={cn(
              "group hidden shrink-0 items-center gap-1.5 rounded-full py-2.5 pl-5 pr-4 lg:inline-flex",
              "text-[13px] font-semibold tracking-tight text-white xl:text-sm",
              "bg-gradient-to-br from-brand-light to-brand",
              "shadow-[0_8px_24px_-10px_hsl(var(--brand)/0.9)]",
              "outline-none transition-[box-shadow,transform] duration-300",
              "hover:shadow-[0_14px_32px_-10px_hsl(var(--brand)/0.95)] active:scale-[0.98]",
              "focus-visible:ring-2 focus-visible:ring-white/70",
            )}
          >
            Trabalhe Conosco
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>

          {/* Mobile trigger */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
            className={cn(
              "relative z-[60] flex h-10 w-10 shrink-0 items-center justify-center rounded-full lg:hidden",
              "outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-brand/50",
              isMobileMenuOpen
                ? "bg-white/10 text-white"
                : isScrolled
                  ? "bg-brand/[0.08] text-brand"
                  : "bg-white/15 text-white ring-1 ring-inset ring-white/25",
            )}
          >
            <AnimatePresence initial={false} mode="wait">
              {isMobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.18 }}
                >
                  <X className="h-5 w-5" />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.18 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </div>

    </header>
  );
}
