import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Linkedin } from "lucide-react";
import { PARTNERS } from "@/content/site";
import { EASE_GLASS, useMediaQuery } from "@/lib/motion";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";

function Info({ p, compact = false }: { p: (typeof PARTNERS)[number]; compact?: boolean }) {
  return (
    <div className={`glass rounded-[22px] ${compact ? "p-4" : "p-5 md:p-6"}`}>
      <div className="relative z-10 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h3 className={`display font-normal leading-none ${compact ? "text-[1.9rem]" : "text-[2.3rem]"}`}>{p.name}</h3>
          <p className="mt-2 text-[14px] text-white/85">{p.role}</p>
          <p className="text-[13px] text-white/60">{p.title}</p>
        </div>
        {p.linkedin && (
          <a
            href={p.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`LinkedIn de ${p.name}`}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 transition hover:bg-white hover:text-[#0a66c2]"
          >
            <Linkedin className="h-[18px] w-[18px]" />
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Sócios em painéis sanfonados: o painel em foco se expande e revela a ficha em vidro.
 * Os demais mostram o nome na vertical.
 */
export default function Partners() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [active, setActive] = useState(0);

  return (
    <section id="socios" className="relative py-20 md:py-28" aria-label="Sócios">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <LineReveal lines={["Nossos sócios."]} className="display text-[clamp(2.6rem,5.6vw,5.4rem)] font-light" />
          <FadeIn delay={0.1}>
            <p className="lede max-w-[42ch]">
              Liderança próxima de cada cliente, com visão de negócio e rigor técnico.
            </p>
          </FadeIn>
        </div>

        {desktop ? (
          <FadeIn className="mt-14" delay={0.1}>
            <ul className="flex h-[640px] gap-3">
              {PARTNERS.map((p, i) => {
                const on = i === active;
                return (
                  <motion.li
                    key={p.name}
                    className="relative overflow-hidden rounded-[28px]"
                    initial={false}
                    animate={{ flex: on ? 2.4 : 1 }}
                    transition={{ duration: 0.9, ease: EASE_GLASS }}
                    onPointerEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    tabIndex={0}
                    data-cursor={on ? undefined : "Ver"}
                    aria-label={`${p.name}, ${p.role}`}
                  >
                    <motion.img
                      src={p.photo}
                      alt={p.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: "center 18%" }}
                      animate={{ scale: on ? 1 : 1.12, filter: on ? "grayscale(0)" : "grayscale(0.85)" }}
                      transition={{ duration: 1.1, ease: EASE_GLASS }}
                    />
                    <div
                      className="absolute inset-0 transition-opacity duration-700"
                      style={{
                        background: "linear-gradient(0deg, rgba(12,4,6,.85) 0%, rgba(12,4,6,.1) 45%, rgba(12,4,6,0) 70%)",
                        opacity: on ? 1 : 0.9,
                      }}
                    />
                    {/* nome vertical quando recolhido */}
                    <AnimatePresence>
                      {!on && (
                        <motion.span
                          className="display absolute bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[1.9rem] text-white/90 [writing-mode:vertical-rl] rotate-180"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          {p.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {on && (
                        <motion.div
                          className="absolute inset-x-4 bottom-4"
                          initial={{ y: "140%" }}
                          animate={{ y: 0 }}
                          exit={{ y: "140%" }}
                          transition={{ duration: 0.7, ease: EASE_GLASS }}
                        >
                          <Info p={p} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ul>
          </FadeIn>
        ) : (
          <div className="scrollbar-none -mx-[clamp(1rem,4vw,3.5rem)] mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-2">
            {PARTNERS.map((p) => (
              <article key={p.name} className="relative h-[520px] w-[80vw] max-w-[380px] shrink-0 snap-center overflow-hidden rounded-[26px]">
                <img
                  src={p.photo}
                  alt={p.name}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                  style={{ objectPosition: "center 18%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0406]/85 via-transparent to-transparent" />
                <div className="absolute inset-x-3 bottom-3">
                  <Info p={p} compact />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
