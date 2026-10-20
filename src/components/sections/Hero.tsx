import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import heroNight from "@/assets/web/hero-night.webp";
import facadeDay from "@/assets/web/facade-day.webp";
import { COMPLIANCE, HERO_STATS } from "@/content/site";

const STATS = HERO_STATS.filter((s) => COMPLIANCE.showResultFigures || !s.result);
import { useSite } from "@/providers/SiteProvider";
import { EASE_GLASS, clamp, lerp, prefersReducedMotion } from "@/lib/motion";
import { LineReveal } from "@/components/fx/Reveal";
import CountUp from "@/components/fx/CountUp";
import Magnetic from "@/components/fx/Magnetic";

/*
 * A foto noturna (vinho) e a foto diurna da sede são o mesmo enquadramento:
 * a diurna equivale à noturna com escala 0,93333 e deslocamento de
 * 94,82 × 55,01 px (calculado por correspondência de pontos SIFT).
 * Por isso a lente revela a fachada "à luz do dia" exatamente no lugar.
 */
const SRC_W = 1920;
const SRC_H = 1080;
const DAY = { left: 94.82 / SRC_W, top: 55.005 / SRC_H, scale: 0.933332 };

type Stage = { w: number; h: number; l: number; t: number; W: number; H: number };

export default function Hero() {
  const { introDone, scrollTo } = useSite();
  const sectionRef = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<Stage>({ w: 0, h: 0, l: 0, t: 0, W: 0, H: 0 });
  const [stage, setStage] = useState<Stage>(stageRef.current);
  const [touched, setTouched] = useState(false);

  const lens = useRef({
    x: 0,
    y: 0,
    tx: 0,
    ty: 0,
    r: 0,
    tr: 0,
    z: 1.18,
    tz: 1.18,
    user: false,
    lastMove: 0,
    down: false,
    px: 0,
    py: 0,
  });

  /* Enquadramento "cover" calculado em JS para alinhar as duas fotos */
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const W = entry.contentRect.width;
      const H = entry.contentRect.height;
      const s = Math.max(W / SRC_W, H / SRC_H);
      const w = SRC_W * s;
      const h = SRC_H * s;
      const next = { w, h, l: (W - w) / 2, t: (H - h) / 2, W, H };
      stageRef.current = next;
      setStage(next);
      const L = lens.current;
      if (!L.x) {
        L.x = L.tx = W * 0.66;
        L.y = L.ty = H * 0.42;
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* Loop da lente: interpolação suave + piloto automático quando ocioso */
  useEffect(() => {
    const wrap = wrapRef.current;
    const ring = ringRef.current;
    if (!wrap || !ring) return;
    const reduced = prefersReducedMotion();
    let raf = 0;
    const t0 = performance.now();

    const frame = (now: number) => {
      const L = lens.current;
      const S = stageRef.current;
      const mobile = S.W < 768;
      const baseR = clamp(Math.min(S.W, S.H) * (mobile ? 0.2 : 0.16), 84, 190);
      L.tr = introDone ? baseR * (L.down ? 1.22 : 1) : 0;
      L.tz = L.down ? 1.42 : 1.18;

      const idle = !L.user || now - L.lastMove > 4200;
      if (idle && !reduced) {
        const t = (now - t0) / 1000;
        const cx = mobile ? 0.5 : 0.64;
        const cy = mobile ? 0.3 : 0.4;
        const ax = mobile ? 0.26 : 0.17;
        const ay = mobile ? 0.1 : 0.15;
        L.tx = S.W * (cx + ax * Math.sin(t * 0.32));
        L.ty = S.H * (cy + ay * Math.sin(t * 0.47 + 1.2));
      }

      const k = L.user && !idle ? 0.16 : 0.035;
      L.x = lerp(L.x, L.tx, k);
      L.y = lerp(L.y, L.ty, k);
      L.r = lerp(L.r, L.tr, 0.08);
      L.z = lerp(L.z, L.tz, 0.1);
      L.px = lerp(L.px, ((L.x / (S.W || 1)) - 0.5) * -18, 0.05);
      L.py = lerp(L.py, ((L.y / (S.H || 1)) - 0.5) * -12, 0.05);

      // coordenadas no palco (para máscara e origem do zoom)
      const lx = L.x - S.l - L.px;
      const ly = L.y - S.t - L.py;
      wrap.style.setProperty("--lx", `${lx}px`);
      wrap.style.setProperty("--ly", `${ly}px`);
      wrap.style.setProperty("--r", `${L.r}px`);
      wrap.style.setProperty("--z", `${L.z}`);
      wrap.style.setProperty("--px", `${L.px}px`);
      wrap.style.setProperty("--py", `${L.py}px`);

      const d = L.r * 2;
      ring.style.width = `${d}px`;
      ring.style.height = `${d}px`;
      ring.style.transform = `translate3d(${L.x - L.r}px, ${L.y - L.r}px, 0)`;
      ring.style.opacity = L.r > 4 ? "1" : "0";
      if (tagRef.current) {
        tagRef.current.style.transform = `translate3d(${L.x}px, ${L.y + L.r + 14}px, 0) translateX(-50%)`;
        tagRef.current.style.opacity = L.user && !idle && L.r > 40 ? "1" : "0";
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [introDone]);

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    const L = lens.current;
    L.tx = e.clientX - rect.left;
    L.ty = e.clientY - rect.top;
    L.user = true;
    L.lastMove = performance.now();
    if (!touched) setTouched(true);
  };

  /* Saída do hero com o scroll */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const stageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const stageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const { w, h, l, t } = stage;

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-[#0c0406]"
      aria-label="Início"
    >
      {/* ---------- Palco das imagens ---------- */}
      <motion.div
        ref={wrapRef}
        className="absolute inset-0 touch-pan-y"
        style={{ scale: stageScale, y: stageY }}
        data-cursor="hide"
        onPointerMove={onPointerMove}
        onPointerDown={(e) => {
          onPointerMove(e);
          lens.current.down = true;
        }}
        onPointerUp={() => (lens.current.down = false)}
        onPointerCancel={() => (lens.current.down = false)}
        onPointerLeave={() => {
          lens.current.down = false;
          lens.current.lastMove = performance.now() - 3000;
        }}
      >
        <div
          className="absolute"
          style={{
            width: w,
            height: h,
            left: l,
            top: t,
            transform: "translate3d(var(--px, 0px), var(--py, 0px), 0)",
          }}
        >
          {/* Noite (estado padrão) */}
          <motion.img
            src={heroNight}
            alt="Fachada da sede da Rfeitosa Advogados Associados, em Sobral (CE), à noite"
            className="absolute inset-0 h-full w-full select-none"
            draggable={false}
            initial={{ opacity: 0.25, scale: 1.14 }}
            animate={introDone ? { opacity: 1, scale: 1 } : undefined}
            transition={{ duration: 2.2, ease: EASE_GLASS }}
          />
          {/* Dia (revelado pela lente, com leve ampliação) */}
          <div
            className="absolute inset-0"
            aria-hidden
            style={{
              WebkitMaskImage:
                "radial-gradient(circle at var(--lx) var(--ly), #000 calc(var(--r) - 1.5px), transparent var(--r))",
              maskImage:
                "radial-gradient(circle at var(--lx) var(--ly), #000 calc(var(--r) - 1.5px), transparent var(--r))",
            }}
          >
            <div
              className="absolute inset-0"
              style={{ transform: "scale(var(--z))", transformOrigin: "var(--lx) var(--ly)" }}
            >
              <img src={heroNight} alt="" className="absolute inset-0 h-full w-full" draggable={false} />
              <img
                src={facadeDay}
                alt=""
                draggable={false}
                className="absolute"
                style={{
                  left: `${DAY.left * 100}%`,
                  top: `${DAY.top * 100}%`,
                  width: `${DAY.scale * 100}%`,
                  height: `${DAY.scale * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Leitura do texto */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(0deg, rgba(12,4,6,.96) 0%, rgba(12,4,6,.55) 32%, rgba(12,4,6,0) 62%), linear-gradient(90deg, rgba(12,4,6,.55) 0%, rgba(12,4,6,0) 55%), linear-gradient(180deg, rgba(12,4,6,.55) 0%, rgba(12,4,6,0) 22%)",
          }}
        />

        {/* Aro da lente */}
        <div ref={ringRef} className="pointer-events-none absolute left-0 top-0 rounded-full opacity-0" aria-hidden>
          <div
            className="absolute inset-0 rounded-full"
            style={{
              WebkitBackdropFilter: "blur(9px) saturate(170%)",
              backdropFilter: "blur(9px) saturate(170%)",
              WebkitMaskImage: "radial-gradient(circle, transparent calc(100% - 16px), #000 calc(100% - 15px))",
              maskImage: "radial-gradient(circle, transparent calc(100% - 16px), #000 calc(100% - 15px))",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              boxShadow:
                "inset 0 0 0 1px rgba(255,255,255,.6), inset 4px 0 10px rgba(255,40,90,.22), inset -4px 0 10px rgba(80,170,255,.18), inset 0 0 50px rgba(255,255,255,.12), 0 0 0 1px rgba(255,255,255,.08), 0 40px 90px -20px rgba(0,0,0,.7)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full mix-blend-screen"
            style={{
              background:
                "radial-gradient(circle at 30% 22%, rgba(255,255,255,.38), rgba(255,255,255,0) 34%), radial-gradient(circle at 72% 84%, rgba(255,255,255,.12), rgba(255,255,255,0) 30%)",
            }}
          />
        </div>
        <div
          ref={tagRef}
          className="glass glass-soft pointer-events-none absolute left-0 top-0 whitespace-nowrap rounded-full px-3 py-1 text-[12px] text-white/90 opacity-0 transition-opacity duration-500"
          aria-hidden
        >
          <span className="relative z-10">Nossa sede, em Sobral</span>
        </div>
      </motion.div>

      {/* ---------- Conteúdo ---------- */}
      <motion.div
        className="pointer-events-none relative z-10 flex h-full flex-col justify-end"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="shell pb-8 md:pb-14 lg:pb-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-[860px]">
              <LineReveal
                as="h1"
                play={introDone}
                delay={0.35}
                className="display text-[clamp(2.9rem,8.2vw,8.4rem)] font-light"
                lineClassName="text-silver w-fit pr-[0.06em]"
                lines={["Soluções jurídicas", "para o seu negócio."]}
              />
              <motion.p
                className="lede mt-6 max-w-[520px] md:mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={introDone ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, ease: EASE_GLASS, delay: 0.75 }}
              >
                Oferecemos assessoria jurídica completa e personalizada, trabalhando com empresas e pessoas para criar
                impacto duradouro em diversos setores.
              </motion.p>
              <motion.div
                className="pointer-events-auto mt-8 flex flex-wrap gap-3 md:mt-10"
                initial={{ opacity: 0, y: 16 }}
                animate={introDone ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 1, ease: EASE_GLASS, delay: 0.9 }}
              >
                <Magnetic>
                  <button type="button" data-cursor="" className="btn btn-solid" onClick={() => scrollTo("contato")}>
                    Agendar uma consulta
                  </button>
                </Magnetic>
                <Magnetic>
                  <button type="button" data-cursor="" className="btn btn-glass glass" onClick={() => scrollTo("areas")}>
                    <span className="relative z-10">Conhecer as áreas</span>
                  </button>
                </Magnetic>
              </motion.div>
            </div>

            {/* Indicadores */}
            <motion.dl
              className="glass pointer-events-auto grid overflow-hidden rounded-[22px] lg:w-[300px] lg:!grid-cols-1"
              style={{ gridTemplateColumns: `repeat(${STATS.length}, minmax(0, 1fr))` }}
              initial={{ opacity: 0, y: 24 }}
              animate={introDone ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 1.1, ease: EASE_GLASS, delay: 1.05 }}
            >
              {STATS.map((s, i) => (
                <div
                  key={s.label}
                  className={`relative z-10 flex flex-col px-3 py-4 md:px-6 md:py-5 ${
                    i > 0 ? "border-l border-white/10 lg:border-l-0 lg:border-t" : ""
                  }`}
                >
                  <dt className="order-2 mt-2 text-[11px] leading-snug text-white/60 md:text-[13px]">{s.label}</dt>
                  <dd className="text-silver order-1 text-[clamp(1.15rem,3.6vw,2.4rem)] font-light leading-none">
                    <CountUp to={s.value} decimals={s.decimals} prefix={s.prefix} suffix={s.suffix} play={introDone} />
                  </dd>
                </div>
              ))}
            </motion.dl>
          </div>
        </div>
      </motion.div>

      {/* Dica de interação */}
      <div className="pointer-events-none absolute inset-x-0 top-[92px] z-10 flex justify-center md:top-[118px]">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={introDone && !touched ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.8, ease: EASE_GLASS, delay: introDone && !touched ? 1.6 : 0 }}
      >
        <div className="glass glass-soft flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-[13px] text-white/85">
          <Search className="relative z-10 h-3.5 w-3.5" />
          <span className="relative z-10 hidden md:inline">Passe o cursor e veja a nossa sede à luz do dia</span>
          <span className="relative z-10 md:hidden">Toque na imagem para revelar a sede</span>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
