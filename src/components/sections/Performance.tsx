import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Handshake, MapPin } from "lucide-react";
import teamHistory from "@/assets/web/team-history.webp";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";
import Tilt from "@/components/fx/Tilt";
import CountUp from "@/components/fx/CountUp";
import BrazilMap from "./BrazilMap";
import { EASE_GLASS } from "@/lib/motion";

const GROWTH = [
  { year: "2011", h: 20 },
  { year: "2014", h: 35 },
  { year: "2017", h: 50 },
  { year: "2020", h: 65 },
  { year: "2023", h: 85 },
  { year: "2026", h: 100 },
];

function GrowthChart() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [hover, setHover] = useState<number | null>(null);
  const current = hover ?? GROWTH.length - 1;
  return (
    <div ref={ref} className="relative z-10">
      <div className="flex h-36 items-end gap-2 md:h-40" onPointerLeave={() => setHover(null)}>
        {GROWTH.map((b, i) => {
          const on = i === current;
          return (
            <button
              type="button"
              key={b.year}
              className="group relative flex h-full flex-1 items-end"
              onPointerEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              aria-label={`Ano de ${b.year}`}
            >
              <motion.span
                className="block w-full origin-bottom rounded-t-[10px] rounded-b-[4px]"
                style={{
                  height: `${b.h}%`,
                  background: on
                    ? "linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,.55) 100%)"
                    : "linear-gradient(180deg, rgba(255,255,255,.28) 0%, rgba(255,255,255,.06) 100%)",
                  boxShadow: on ? "0 0 30px rgba(255,255,255,.35)" : "inset 0 1px 0 rgba(255,255,255,.35)",
                  transition: "background .4s, box-shadow .4s",
                }}
                initial={{ scaleY: 0 }}
                animate={inView ? { scaleY: 1 } : undefined}
                transition={{ duration: 1.1, ease: EASE_GLASS, delay: 0.15 + i * 0.08 }}
              />
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex gap-2">
        {GROWTH.map((b, i) => (
          <span
            key={b.year}
            className={`tabular flex-1 text-center text-[11px] transition-colors md:text-[12px] ${
              i === current ? "text-white" : "text-white/40"
            }`}
          >
            {b.year}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Performance() {
  const photoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: photoRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section id="performance" className="relative py-20 md:py-28" aria-labelledby="performance-title">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <LineReveal
              lines={["Alta performance,", "inteligência jurídica", "estratégica."]}
              className="display text-[clamp(2.6rem,5.6vw,5.4rem)] font-light"
            />
          </div>
          <FadeIn className="flex flex-col justify-end gap-6 lg:col-span-5" delay={0.15}>
            <p className="lede" id="performance-title">
              Mais do que um escritório, somos parceiros estratégicos na defesa dos seus interesses e na construção do
              seu futuro. Nossa metodologia une conhecimento técnico profundo à visão de resultados.
            </p>
          </FadeIn>
        </div>

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {/* Foto da equipe */}
          <FadeIn className="md:col-span-2 lg:col-span-4 lg:row-span-2">
            <div
              ref={photoRef}
              className="relative h-[420px] overflow-hidden rounded-[28px] md:h-[480px] lg:h-full lg:min-h-[640px]"
            >
              <motion.img
                src={teamHistory}
                alt="Equipe da Rfeitosa Advogados Associados em frente à sede"
                loading="lazy"
                className="absolute inset-x-0 top-[-10%] h-[120%] w-full object-cover"
                style={{ y: photoY }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0406]/85 via-transparent to-transparent" />
              <div className="glass absolute inset-x-4 bottom-4 rounded-[20px] p-5">
                <div className="relative z-10 flex items-end justify-between gap-4">
                  <div>
                    <p className="display text-[2.6rem] leading-none">
                      <CountUp to={70} prefix="+" />
                    </p>
                    <p className="mt-1 text-[14px] text-white/70">
                      colaboradores entre advogados, administradores, médicos, peritos e contadores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Mapa */}
          <FadeIn className="md:col-span-2 lg:col-span-5 lg:row-span-2" delay={0.08}>
            <Tilt max={4} className="glass specular h-full rounded-[28px] p-6 md:p-8">
              <div className="relative z-10 flex h-full flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-[22px] font-normal">Presença nacional</h3>
                    <p className="mt-2 max-w-[42ch] text-[15px] leading-relaxed text-white/65">
                      Atuamos em todas as capitais do Brasil, oferecendo suporte jurídico estratégico para empresas em
                      todo o território nacional.
                    </p>
                  </div>
                </div>
                <div className="mx-auto mt-6 w-full max-w-[460px] flex-1">
                  <BrazilMap />
                </div>
                <p className="mt-4 flex items-center gap-2 text-[14px] text-white/80">
                  <MapPin className="h-4 w-4 text-[#ff4d6d]" />
                  <span>
                    <CountUp to={27} /> capitais atendidas a partir de Sobral
                  </span>
                </p>
              </div>
            </Tilt>
          </FadeIn>

          {/* Crescimento */}
          <FadeIn className="lg:col-span-3" delay={0.16}>
            <Tilt max={5} className="glass specular h-full rounded-[28px] p-6">
              <div className="relative z-10">
                <h3 className="text-[20px] font-normal">Crescimento consistente</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/60">
                  Uma abordagem sólida e orientada por resultados, focada em soluções sustentáveis ao longo do tempo.
                </p>
              </div>
              <div className="mt-6">
                <GrowthChart />
              </div>
            </Tilt>
          </FadeIn>

          {/* Parceiro estratégico */}
          <FadeIn className="lg:col-span-3" delay={0.22}>
            <Tilt max={5} className="glass glass-wine specular h-full rounded-[28px] p-6">
              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/25">
                  <Handshake className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-[20px] font-normal">Parceiro estratégico</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-white/75">
                    Com estrutura robusta e atuação nacional, garantimos a segurança jurídica necessária para proteger
                    seu patrimônio e maximizar seus êxitos, seja para sua empresa ou para você.
                  </p>
                </div>
              </div>
            </Tilt>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
