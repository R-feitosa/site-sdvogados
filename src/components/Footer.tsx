import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowUp, Instagram, Linkedin, Mail } from "lucide-react";
import logo from "@/assets/web/logo-header-trim.png";
import { FIRM, NAV, UNITS } from "@/content/site";
import Magnetic from "@/components/fx/Magnetic";
import { useSite } from "@/providers/SiteProvider";

/** Rodapé. Na home rola até a seção; em outras páginas o link segue para /#secao. */
export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const logoY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

  const { scrollTo } = useSite();
  const go = (e: React.MouseEvent, id: string) => {
    if (!document.getElementById(id)) return; // fora da home: deixa o link seguir para /#id
    e.preventDefault();
    scrollTo(id);
  };

  const social = [
    { href: FIRM.linkedin, label: "LinkedIn", icon: Linkedin },
    { href: FIRM.instagram, label: "Instagram", icon: Instagram },
    { href: `mailto:${FIRM.email}`, label: "E-mail", icon: Mail },
  ];

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/10 pt-20" aria-label="Rodapé">
      <div aria-hidden className="pointer-events-none absolute bottom-[-30%] left-1/2 h-[600px] w-[1100px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(128,0,32,.4),transparent)]" />

      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="display max-w-[16ch] text-[2.2rem] font-light leading-[1.05]">
              Excelência jurídica e compromisso com resultados.
            </p>
            <p className="mt-4 max-w-[36ch] text-[15px] text-white/55">Sua confiança é nossa maior responsabilidade.</p>
            <div className="mt-8 flex gap-2.5">
              {social.map((s) => (
                <Magnetic key={s.label}>
                  <a
                    href={s.href}
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="glass flex h-12 w-12 items-center justify-center rounded-full transition hover:bg-white/10"
                  >
                    <s.icon className="relative z-10 h-[18px] w-[18px]" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          <nav aria-label="Rodapé" className="lg:col-span-2">
            <ul className="space-y-2.5 text-[15px] text-white/70">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`/#${n.id}`} onClick={(e) => go(e, n.id)} className="hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="grid gap-8 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-4">
            {UNITS.map((u) => (
              <address key={u.id} className="not-italic">
                <p className="text-[15px] text-white">
                  {u.city}
                  {u.tag && <span className="text-white/45"> ({u.tag.toLowerCase()})</span>}
                </p>
                <a href={`tel:${u.tel}`} className="mt-2 block text-[14px] text-white/70 hover:text-white">
                  {u.phone}
                </a>
                <p className="mt-1 text-[13px] leading-relaxed text-white/50">{u.address}</p>
              </address>
            ))}
          </div>
        </div>

        <div className="relative mt-20 overflow-hidden">
          <motion.img
            src={logo}
            alt="Rfeitosa Advogados Associados"
            className="mx-auto w-full max-w-[880px] opacity-90"
            style={{ y: logoY }}
            loading="lazy"
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-8 pb-24 text-[13px] text-white/45 md:flex-row md:pb-8 md:pr-24">
          <p>© {new Date().getFullYear()} Rfeitosa Advogados Associados. Todos os direitos reservados.</p>
          <Magnetic>
            <a
              href="#inicio"
              onClick={(e) => go(e, "inicio")}
              className="flex items-center gap-2 rounded-full px-4 py-2 text-white/70 ring-1 ring-white/15 hover:text-white hover:ring-white/40"
            >
              <ArrowUp className="h-4 w-4" /> Voltar ao topo
            </a>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
