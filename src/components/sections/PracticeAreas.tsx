import { motion, useMotionValueEvent, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import { Plus } from "lucide-react";
import servicesBg from "@/assets/web/services-bg.webp";
import { PRACTICE_AREAS, type PracticeArea } from "@/content/site";
import { useSite } from "@/providers/SiteProvider";
import { useMediaQuery } from "@/lib/motion";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";
import Magnetic from "@/components/fx/Magnetic";
import AreaDrawer from "./AreaDrawer";

const N = PRACTICE_AREAS.length;

function AreaCard({
  area,
  onOpen,
  contentOpacity,
}: {
  area: PracticeArea;
  onOpen: () => void;
  contentOpacity?: MotionValue<number>;
}) {
  return (
    <div className="glass specular flex h-full flex-col rounded-[30px] p-7 md:p-10">
      <motion.div className="relative z-10 flex h-full flex-col" style={{ opacity: contentOpacity ?? 1 }}>
      <div className="flex items-center justify-between">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/25">
          <area.icon className="h-6 w-6" />
        </span>
      </div>
      <div className="mt-auto">
        <h3 className="display text-[clamp(2.2rem,4vw,3.6rem)] font-light">{area.title}</h3>
        <p className="mt-2 text-[16px] text-white/70">{area.summary}</p>
        <p className="mt-5 hidden max-w-[52ch] text-[15px] leading-relaxed text-white/60 md:block">{area.detail}</p>
        <button
          type="button"
          onClick={onOpen}
          data-cursor="Abrir"
          className="mt-7 inline-flex items-center gap-3 rounded-full bg-white/10 py-2 pl-5 pr-2 text-[14px] ring-1 ring-white/20 transition hover:bg-white hover:text-[#800020]"
        >
          Ver como atuamos
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15">
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </div>
      </motion.div>
    </div>
  );
}

/**
 * Cartão do baralho: posição derivada do progresso contínuo do scroll.
 * Atenção: opacidade < 1 ou filter num ancestral anulam o backdrop-filter do vidro,
 * por isso o cartão ativo fica sempre com opacidade 1 e o escurecimento é uma camada interna.
 */
function DeckCard({
  area,
  index,
  f,
  onOpen,
}: {
  area: PracticeArea;
  index: number;
  f: MotionValue<number>;
  onOpen: () => void;
}) {
  const d = useTransform(f, (v) => index - v);
  const y = useTransform(d, (v) => (v < 0 ? `${v * 115}%` : `${v * 9}%`));
  const scale = useTransform(d, (v) => (v < 0 ? 1 + v * 0.08 : 1 - v * 0.065));
  const rotateX = useTransform(d, (v) => (v < 0 ? v * -18 : 0));
  const opacity = useTransform(d, (v) => {
    if (v < -0.2) return Math.max(0, 1 + (v + 0.2) * 1.8);
    if (v > 1.2) return Math.max(0, 1 - (v - 1.2) * 0.55);
    return 1;
  });
  const shade = useTransform(d, (v) => (v > 0 ? Math.min(0.6, v * 0.32) : 0));
  const content = useTransform(d, (v) => (v > 0 ? Math.max(0, 1 - v * 2.2) : Math.max(0, 1 + v * 1.6)));
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 10));
  const pointer = useTransform(d, (v) => (Math.abs(v) < 0.5 ? "auto" : "none"));

  return (
    <motion.div
      className="absolute inset-0 origin-top"
      style={{ y, scale, rotateX, opacity, zIndex, pointerEvents: pointer, transformPerspective: 1400 }}
    >
      <AreaCard area={area} onOpen={onOpen} contentOpacity={content} />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[30px] bg-[#0c0406]"
        style={{ opacity: shade }}
      />
    </motion.div>
  );
}

export default function PracticeAreas() {
  const { scrollTo, scrollToY } = useSite();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const sectionRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<PracticeArea | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const close = useCallback(() => setOpen(null), []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0.04, 0.96], [0, N - 1], { clamp: true });
  const f = useSpring(raw, { stiffness: 140, damping: 26, mass: 0.6 });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);
  const bgRotate = useTransform(scrollYProgress, [0, 1], [-4, 3]);
  const barScale = useTransform(scrollYProgress, [0.04, 0.96], [1 / N, 1]);

  useMotionValueEvent(raw, "change", (v) => setActiveIdx(Math.round(v)));

  const goTo = (i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    const p = 0.04 + (i / (N - 1)) * 0.92;
    scrollToY(top + range * p + 2);
  };

  const Intro = (
    <>
      <LineReveal
        lines={["Excelência jurídica", "em diversas áreas."]}
        className="display text-[clamp(2.6rem,4.6vw,4.6rem)] font-light"
      />
      <FadeIn delay={0.15}>
        <p className="lede mt-6 max-w-[40ch]">
          Soluções jurídicas completas e personalizadas, com uma equipe multidisciplinar preparada para atender às
          necessidades específicas do seu negócio.
        </p>
      </FadeIn>
    </>
  );

  return (
    <section
      id="areas"
      ref={sectionRef}
      className="relative"
      style={{ height: desktop ? `${100 + N * 45}vh` : "auto" }}
      aria-label="Áreas de atuação"
    >
      {desktop ? (
        <div className="sticky top-0 h-screen overflow-hidden p-3">
          <div className="relative h-full overflow-hidden rounded-[32px]">
            <motion.img
              src={servicesBg}
              alt=""
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover"
              style={{ scale: bgScale, rotate: bgRotate }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0c0406]/85 via-[#0c0406]/40 to-[#0c0406]/10" />

            <div className="shell relative grid h-full grid-cols-12 gap-10 py-24">
              <div className="col-span-5 flex flex-col">
                {Intro}
                {/* Índice das áreas */}
                <nav aria-label="Áreas" className="mt-auto">
                  <ul className="space-y-1">
                    {PRACTICE_AREAS.map((a, i) => (
                      <li key={a.id}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          className={`group flex items-center gap-4 py-1.5 text-left text-[15px] transition-colors ${
                            i === activeIdx ? "text-white" : "text-white/45 hover:text-white/80"
                          }`}
                          aria-current={i === activeIdx ? "true" : undefined}
                        >
                          <span
                            className="h-px bg-current transition-all duration-500"
                            style={{ width: i === activeIdx ? 40 : 16 }}
                          />
                          {a.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-5">
                    <Magnetic>
                      <button type="button" className="btn btn-solid h-12" onClick={() => scrollTo("contato")}>
                        Fale conosco
                      </button>
                    </Magnetic>
                    <div className="h-px flex-1 overflow-hidden bg-white/15">
                      <motion.div className="h-full origin-left bg-white" style={{ scaleX: barScale }} />
                    </div>
                  </div>
                </nav>
              </div>

              <div className="col-span-7 flex items-center">
                <div className="relative h-[min(470px,62vh)] w-full" style={{ perspective: 1400 }}>
                  {PRACTICE_AREAS.map((a, i) => (
                    <DeckCard key={a.id} area={a} index={i} f={f} onOpen={() => setOpen(a)} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden py-20">
          <img src={servicesBg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0c0406] via-[#0c0406]/50 to-[#0c0406]" />
          <div className="shell relative">{Intro}</div>
          <div className="scrollbar-none relative mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[clamp(1rem,4vw,3.5rem)] pb-4">
            {PRACTICE_AREAS.map((a) => (
              <div key={a.id} className="h-[420px] w-[84vw] max-w-[420px] shrink-0 snap-center">
                <AreaCard area={a} onOpen={() => setOpen(a)} />
              </div>
            ))}
          </div>
          <p className="shell relative mt-2 text-[13px] text-white/45">Deslize para ver todas as áreas</p>
        </div>
      )}

      <AreaDrawer area={open} onClose={close} />
    </section>
  );
}
