import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "framer-motion";
import { useRef } from "react";
import { prefersReducedMotion } from "@/lib/motion";

// PNG com fundo transparente: <nome>.png (cores) e <nome>-mono.png (branco), gerados por scripts/make_logo_png.py
const logos = import.meta.glob("@/assets/web/logos/*.png", { eager: true, import: "default" }) as Record<
  string,
  string
>;
const find = (file: string) => {
  const path = Object.keys(logos).find((p) => p.endsWith(`/${file}`));
  return path ? logos[path] : null;
};

const NAMES: Record<string, string> = {
  quick: "Quick",
  drysteel: "Drysteel Sistema Construtivo",
  "fabricio-capas": "Fabrício Capas Pra Você",
  famol: "Famol Móveis e Eletros",
  gateway: "Gateway Computadores",
  "nestle-dfa": "Nestlé DFA Distribuição",
  "sg-protecao": "SG Proteção Veicular",
  "ad-construtora": "AD Construtora",
  "valmir-andrade": "Valmir Andrade Contabilidade",
  "agropecuaria-oliveira": "Agropecuária Oliveira",
  "bocca-felice": "Bocca Felice Pasta e Pizza",
  "aco-granja": "Aço Granja",
  "3a-frios": "3A Frios",
  chocobalas: "Varejão Chocobalas",
  "r-logo": "R",
  "gelato-grano": "Gelato & Grano",
  "pao-mix": "Pão Mix",
  utilmix: "Lojão Utilmix",
};
const ORDER = Object.keys(NAMES);

const items = ORDER.map((key) => {
  const color = find(`${key}.png`);
  const mono = find(`${key}-mono.png`);
  return color && mono ? { key, color, mono, alt: NAMES[key] } : null;
}).filter(Boolean) as { key: string; color: string; mono: string; alt: string }[];

/**
 * Faixa de clientes: desliza sozinha e acelera/inverte conforme a velocidade do scroll.
 * Logos em PNG transparente: brancos (monocromia) no estado normal; ao passar o mouse, ganham as cores
 * originais com um leve contorno de luz, sem nenhuma placa de fundo.
 */
export default function Clients() {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const paused = useRef(false);
  const reduced = prefersReducedMotion();

  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduced) return;
    let move = direction.current * -1.6 * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    move += direction.current * -1 * Math.abs(vf) * (delta / 1000) * 1.6;
    if (paused.current) move *= 0.08;
    baseX.set(baseX.get() + move);
  });

  return (
    <section aria-label="Clientes" className="relative py-10 md:py-14">
      <div className="shell mb-6 flex items-end justify-between gap-6 md:mb-8">
        <p className="max-w-[34ch] text-[15px] text-white/60">Empresas que confiam o seu jurídico ao nosso time.</p>
        <p className="hidden text-[13px] text-white/40 md:block">Passe o mouse para ver em cores</p>
      </div>
      <div
        className="glass glass-soft mask-fade-x overflow-hidden rounded-none border-y border-white/5 py-5"
        onPointerEnter={() => (paused.current = true)}
        onPointerLeave={() => (paused.current = false)}
      >
        <motion.ul className="relative z-10 flex w-max" style={{ x }}>
          {[0, 1].map((dup) =>
            items.map((logo) => (
              <li key={`${dup}-${logo.key}`} className="px-2 md:px-3" aria-hidden={dup === 1}>
                <div className="group relative flex h-[72px] w-[148px] items-center justify-center md:h-[84px] md:w-[176px]">
                  <img
                    src={logo.mono}
                    alt={dup === 0 ? logo.alt : ""}
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="max-h-[52px] max-w-[120px] object-contain opacity-75 transition duration-500 ease-glass group-hover:scale-110 group-hover:opacity-0 md:max-h-[60px] md:max-w-[140px]"
                  />
                  <img
                    src={logo.color}
                    alt=""
                    aria-hidden
                    loading="lazy"
                    decoding="async"
                    draggable={false}
                    className="absolute max-h-[52px] max-w-[120px] object-contain opacity-0 transition duration-500 ease-glass [filter:drop-shadow(0_0_1px_rgba(255,255,255,.95))_drop-shadow(0_0_10px_rgba(255,255,255,.28))] group-hover:scale-110 group-hover:opacity-100 md:max-h-[60px] md:max-w-[140px]"
                  />
                </div>
              </li>
            )),
          )}
        </motion.ul>
      </div>
    </section>
  );
}
