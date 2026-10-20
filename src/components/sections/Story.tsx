import { AnimatePresence, motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import team from "@/assets/web/team.webp";
import plaque from "@/assets/web/office-plaque.webp";
import reel720 from "@/assets/web/video/reel-720.mp4";
import reel1080 from "@/assets/web/video/reel-1080.mp4";
import reelPoster from "@/assets/web/video/reel-poster.jpg";
import { STORY_STATS } from "@/content/site";
import { useSite } from "@/providers/SiteProvider";
import { EASE_GLASS } from "@/lib/motion";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";
import CountUp from "@/components/fx/CountUp";
import Magnetic from "@/components/fx/Magnetic";

const STATEMENT = "Não somos apenas advogados; somos um ecossistema de proteção ao seu negócio.".split(" ");

function Word({ word, i, total, p }: { word: string; i: number; total: number; p: MotionValue<number> }) {
  const start = 0.32 + (i / total) * 0.5;
  const opacity = useTransform(p, [start, start + 0.06], [0.16, 1]);
  const y = useTransform(p, [start, start + 0.06], ["0.18em", "0em"]);
  return (
    <motion.span className="inline-block" style={{ opacity, y }}>
      {word}&nbsp;
    </motion.span>
  );
}

/** Abertura da seção: a foto da equipe se expande e a frase-manifesto aparece palavra por palavra */
function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const inset = useTransform(p, [0, 0.45], [18, 0]);
  const insetX = useTransform(p, [0, 0.45], [24, 0]);
  const radius = useTransform(p, [0, 0.45], [36, 0]);
  const clip = useTransform(
    [inset, insetX, radius] as MotionValue<number>[],
    ([a, b, r]: number[]) => `inset(${a}% ${b}% ${a}% ${b}% round ${r}px)`,
  );
  const imgScale = useTransform(p, [0, 0.6], [1.3, 1]);
  const shade = useTransform(p, [0.15, 0.5], [0.2, 0.82]);

  return (
    <div ref={ref} className="relative h-[230vh]">
      <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.img
            src={team}
            alt="Os colaboradores da Rfeitosa Advogados reunidos em frente à sede"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: imgScale }}
          />
          <motion.div
            className="absolute inset-0"
            style={{ opacity: shade, background: "linear-gradient(180deg, rgba(12,4,6,.86) 0%, rgba(40,6,14,.8) 55%, rgba(12,4,6,.9) 100%)" }}
          />
        </motion.div>
        <p className="display shell relative z-10 max-w-[1100px] text-center text-[clamp(2.2rem,5.4vw,5.2rem)] font-light leading-[1.04]">
          {STATEMENT.map((w, i) => (
            <Word key={i} word={w} i={i} total={STATEMENT.length} p={p} />
          ))}
        </p>
      </div>
    </div>
  );
}

function ReelModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { lockScroll } = useSite();
  useEffect(() => {
    lockScroll("reel", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, lockScroll]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[160] flex items-center justify-center p-3 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo institucional"
        >
          <button
            type="button"
            aria-label="Fechar vídeo"
            onClick={onClose}
            className="absolute inset-0 bg-[#0c0406]/80"
            style={{ WebkitBackdropFilter: "blur(18px)", backdropFilter: "blur(18px)" }}
            data-cursor="Fechar"
          />
          <motion.div
            className="relative w-full max-w-[1280px] overflow-hidden rounded-[24px] ring-1 ring-white/15"
            initial={{ scale: 0.92, y: 30 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            transition={{ duration: 0.7, ease: EASE_GLASS }}
          >
            <video
              src={reel1080}
              poster={reelPoster}
              controls
              autoPlay
              playsInline
              className="aspect-video w-full bg-black"
            />
          </motion.div>
          <button
            type="button"
            onClick={onClose}
            className="glass absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full md:right-8 md:top-8"
            aria-label="Fechar vídeo"
          >
            <X className="relative z-10 h-5 w-5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** Vídeo institucional que se abre conforme entra na tela */
function Cinema() {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.82, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 28]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => undefined);
        else v.pause();
      },
      { threshold: 0.15 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <div className="shell py-16 md:py-24">
      <motion.div
        ref={ref}
        className="relative aspect-[4/5] overflow-hidden sm:aspect-video"
        style={{ scale, borderRadius: radius }}
      >
        <video
          ref={videoRef}
          src={reel720}
          poster={reelPoster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0406]/85 via-[#0c0406]/25 to-[#0c0406]/40" />
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute inset-0 flex items-center justify-center"
          data-cursor="Assistir"
          aria-label="Assistir ao vídeo institucional com som"
        >
          <Magnetic strength={0.4}>
            <span className="glass glass-wine flex h-24 w-24 items-center justify-center rounded-full md:h-32 md:w-32">
              <Play className="relative z-10 ml-1 h-8 w-8 fill-white md:h-10 md:w-10" />
            </span>
          </Magnetic>
        </button>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-between gap-2 p-6 md:flex-row md:items-end md:p-10">
          <p className="display text-[clamp(1.8rem,3.4vw,3rem)] font-light leading-none">Por dentro do escritório</p>
          <p className="text-[14px] text-white/70">Filme institucional, 1 minuto</p>
        </div>
      </motion.div>
      <ReelModal open={open} onClose={close} />
    </div>
  );
}

export default function Story() {
  const { scrollTo } = useSite();
  const plaqueRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: plaqueRef, offset: ["start end", "end start"] });
  const plaqueY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section id="sobre" aria-label="Nossa história" className="relative">
      <Manifesto />

      <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <FadeIn className="lg:col-span-5">
          <div ref={plaqueRef} className="relative h-[460px] overflow-hidden rounded-[28px] md:h-[620px]">
            <motion.img
              src={plaque}
              alt="Monograma RF na fachada da sede"
              loading="lazy"
              className="absolute inset-x-0 top-[-12%] h-[124%] w-full object-cover"
              style={{ y: plaqueY }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0406]/70 to-transparent" />
            <div className="glass absolute bottom-4 left-4 right-4 rounded-[20px] p-5">
              <p className="relative z-10 text-[13px] text-white/65">Fundado em</p>
              <p className="display relative z-10 text-[2rem] leading-tight">25 de abril de 2011</p>
              <p className="relative z-10 text-[14px] text-white/75">Sobral, Ceará</p>
            </div>
          </div>
        </FadeIn>

        <div className="flex flex-col lg:col-span-7">
          <LineReveal
            lines={["Nossa história:", "tradição e inovação."]}
            className="display text-[clamp(2.6rem,5vw,4.8rem)] font-light"
          />
          <FadeIn delay={0.1} className="mt-8 space-y-5 text-[17px] leading-[1.75] text-white/70">
            <p>
              O que começou em 25 de abril de 2011, em Sobral/CE, nasceu com um propósito claro: redefinir a advocacia
              empresarial por meio da excelência técnica e da prevenção estratégica. Fundado pelo Dr. Roneely Feitosa,
              o escritório ultrapassou as fronteiras regionais para se tornar uma referência nacional em compliance e
              soluções jurídicas de alto impacto.
            </p>
            <p>
              Nossa força está na visão multidisciplinar. São mais de 70 colaboradores, entre advogados, administradores, médicos, peritos e
              contadores, atuando em sintonia para prevenir passivos e maximizar a economia da sua empresa.
            </p>
            <p>
              Com sede própria e uma rede de unidades estratégicas, crescemos mantendo a essência que nos trouxe até
              aqui: o compromisso inegociável com o resultado do cliente.
            </p>
          </FadeIn>

          <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
            {STORY_STATS.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-2 text-[13px] text-white/55 md:text-[14px]">{s.label}</dt>
                <dd className="display text-silver order-1 text-[clamp(2.4rem,5.4vw,5rem)] font-light leading-none">
                  <CountUp to={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>

          <button
            type="button"
            onClick={() => scrollTo("rf-group")}
            className="mt-10 w-fit border-b border-white/40 pb-1 text-[15px] text-white/85 transition hover:border-white hover:text-white"
          >
            Conheça o ecossistema RF Group
          </button>
        </div>
      </div>

      <Cinema />
    </section>
  );
}
