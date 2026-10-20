import { AnimatePresence, motion, useAnimationFrame, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import { useRef, useState } from "react";
import monogram from "@/assets/web/rf-logo-icon-trim.png";
import { GROUP } from "@/content/site";
import { EASE_GLASS, prefersReducedMotion } from "@/lib/motion";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";

const N = GROUP.length;
const RX = 40; // raio horizontal da órbita (% da largura do palco)
const RY = 34; // raio vertical (% da altura; palco 5:4 → elipse que sugere profundidade)

function Satellite({
  index,
  rot,
  active,
  onSelect,
  onHover,
}: {
  index: number;
  rot: MotionValue<number>;
  active: boolean;
  onSelect: () => void;
  onHover: (on: boolean) => void;
}) {
  const g = GROUP[index];
  const angle = useTransform(rot, (r) => ((r + (index * 360) / N) * Math.PI) / 180);
  const left = useTransform(angle, (a) => `${50 + RX * Math.cos(a)}%`);
  const top = useTransform(angle, (a) => `${50 + RY * Math.sin(a)}%`);
  const depth = useTransform(angle, (a) => (Math.sin(a) + 1) / 2);
  const scale = useTransform(depth, (d) => 0.7 + 0.42 * d);
  const zIndex = useTransform(depth, (d) => (d > 0.5 ? 30 + Math.round(d * 10) : 5 + Math.round(d * 10)));
  const shade = useTransform(depth, (d) => Math.max(0, 0.35 - d * 0.6));

  return (
    <motion.button
      type="button"
      className="absolute aspect-square w-[29%] md:w-[25%]"
      style={{ left, top, scale, zIndex, x: "-50%", y: "-50%" }}
      onClick={onSelect}
      onPointerEnter={() => onHover(true)}
      onPointerLeave={() => onHover(false)}
      onFocus={() => onHover(true)}
      onBlur={() => onHover(false)}
      aria-pressed={active}
      aria-label={g.name}
      data-cursor="Ver"
    >
      <span
        className={`glass absolute inset-0 rounded-full transition-shadow duration-500 ${
          active ? "shadow-[0_0_0_2px_rgba(255,255,255,.85),0_20px_60px_-10px_rgba(179,18,58,.8)]" : ""
        }`}
      />
      <span
        className="absolute inset-[11%] z-10 flex items-center justify-center overflow-hidden rounded-full"
        style={{ background: g.dark ? "#001451" : "rgba(255,255,255,.94)" }}
      >
        <img src={g.logo} alt="" className="w-[82%] object-contain" draggable={false} />
      </span>
      <motion.span className="absolute inset-0 z-20 rounded-full bg-[#0c0406]" style={{ opacity: shade }} />
    </motion.button>
  );
}

function Spoke({ index, rot, active }: { index: number; rot: MotionValue<number>; active: boolean }) {
  const angle = useTransform(rot, (r) => ((r + (index * 360) / N) * Math.PI) / 180);
  const x2 = useTransform(angle, (a) => 50 + RX * Math.cos(a));
  const y2 = useTransform(angle, (a) => 50 + RY * Math.sin(a));
  return (
    <motion.line
      x1={50}
      y1={50}
      x2={x2}
      y2={y2}
      stroke={active ? "rgba(255,255,255,.75)" : "rgba(255,255,255,.18)"}
      strokeWidth={active ? 1.4 : 1}
      strokeDasharray={active ? "0" : "4 5"}
      vectorEffect="non-scaling-stroke"
    />
  );
}

/** RF Group: as empresas do grupo orbitam o monograma. Passe o mouse para pausar; clique para ver detalhes. */
export default function Ecosystem() {
  const rot = useMotionValue(-90);
  const [active, setActive] = useState(0);
  const hovering = useRef(false);
  const reduced = prefersReducedMotion();

  useAnimationFrame((_, delta) => {
    if (reduced || hovering.current) return;
    rot.set(rot.get() + delta * 0.008);
  });

  const select = (i: number) => {
    setActive(i);
    // traz a empresa escolhida para a frente (ângulo 90° = ponto mais próximo)
    const current = rot.get();
    const target = 90 - (i * 360) / N;
    const diff = ((((target - current) % 360) + 540) % 360) - 180;
    const start = current;
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 900);
      const e = 1 - Math.pow(1 - t, 3);
      rot.set(start + diff * e);
      if (t < 1) requestAnimationFrame(step);
    };
    if (reduced) rot.set(start + diff);
    else requestAnimationFrame(step);
  };

  const g = GROUP[active];

  return (
    <section id="rf-group" className="relative overflow-hidden py-20 md:py-28" aria-label="Ecossistema RF Group">
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-1/2 h-[900px] w-[900px] -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(128,0,32,.45),transparent)]" />

      <div className="shell relative grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <LineReveal
            lines={["Fazemos parte", "do ecossistema", "RF Group."]}
            className="display text-[clamp(2.4rem,4.6vw,4.4rem)] font-light"
          />
          <FadeIn delay={0.1}>
            <p className="lede mt-6">
              Nascemos do inconformismo com soluções jurídicas fragmentadas. O RF Group é um hub estratégico que integra
              advocacia especializada, compliance corporativo, estruturação societária e inteligência de negócios em um
              único ecossistema. Cada unidade opera com autonomia e expertise próprias, conectadas por uma filosofia
              comum: entregar soluções completas, tecnicamente robustas e orientadas a resultados mensuráveis.
            </p>
          </FadeIn>

          <div className="glass mt-8 min-h-[148px] rounded-[24px] p-6" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={g.id}
                className="relative z-10"
                initial={{ y: 14 }}
                animate={{ y: 0 }}
                exit={{ y: -10 }}
                transition={{ duration: 0.45, ease: EASE_GLASS }}
              >
                <p className="text-[13px] text-white/55">Empresa do grupo</p>
                <h3 className="display mt-1 text-[2rem] leading-none">{g.name}</h3>
                <p className="mt-3 text-[15px] text-white/75">{g.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Empresas do grupo">
            {GROUP.map((c, i) => (
              <li key={c.id}>
                <button
                  type="button"
                  onClick={() => select(i)}
                  className={`rounded-full px-4 py-2 text-[13px] ring-1 transition ${
                    i === active ? "bg-white text-[#800020] ring-white" : "text-white/70 ring-white/20 hover:text-white hover:ring-white/50"
                  }`}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <FadeIn className="lg:col-span-7" delay={0.1}>
          <div className="relative mx-auto aspect-[5/4] w-full max-w-[700px]">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
              <ellipse cx="50" cy="50" rx={RX} ry={RY} fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <ellipse cx="50" cy="50" rx={RX + 7} ry={RY + 8} fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              {GROUP.map((c, i) => (
                <Spoke key={c.id} index={i} rot={rot} active={i === active} />
              ))}
            </svg>

            {/* núcleo */}
            <div className="absolute left-1/2 top-1/2 z-20 flex aspect-square w-[32%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
              <div className="glass glass-wine absolute inset-0 rounded-full" />
              <div aria-hidden className="absolute inset-[-18%] animate-[spin_24s_linear_infinite] rounded-full border border-dashed border-white/10" />
              <img src={monogram} alt="" className="relative z-10 w-[34%]" />
              <span className="relative z-10 mt-2 text-[12px] tracking-[0.02em] text-white/80 md:text-[14px]">RF Group</span>
            </div>

            {GROUP.map((c, i) => (
              <Satellite
                key={c.id}
                index={i}
                rot={rot}
                active={i === active}
                onSelect={() => select(i)}
                onHover={(on) => {
                  hovering.current = on;
                  if (on) setActive(i);
                }}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
