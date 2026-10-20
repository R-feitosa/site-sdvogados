import { motion, useInView } from "framer-motion";
import { memo, useMemo, useRef, useState } from "react";
import { BR_DOTS, BR_VIEWBOX, CAPITALS, CE_DOT_INDEX, SOBRAL } from "@/content/geo";
import { EASE_GLASS } from "@/lib/motion";

const BR_H = Number(BR_VIEWBOX.split(" ")[3]);

const Dots = memo(function Dots() {
  return (
    <g>
      {BR_DOTS.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={CE_DOT_INDEX.has(i) ? 0.62 : 0.46}
          fill={CE_DOT_INDEX.has(i) ? "#d4214f" : "url(#br-wave)"}
        />
      ))}
    </g>
  );
});

function arc(x1: number, y1: number, x2: number, y2: number) {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy);
  const k = Math.min(0.32, 6 / Math.max(len, 1)) * len;
  // normal "para cima" do arco
  const nx = -dy / (len || 1);
  const ny = dx / (len || 1);
  const sign = ny > 0 ? -1 : 1;
  return `M${x1},${y1} Q${mx + nx * k * sign},${my + ny * k * sign} ${x2},${y2}`;
}

/**
 * Mapa do Brasil em matriz de pontos (geometria real das UFs).
 * Uma onda luminosa parte de Sobral; arcos ligam a sede às 27 capitais.
 */
export default function BrazilMap() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const [hover, setHover] = useState<string | null>(null);

  const arcs = useMemo(
    () =>
      CAPITALS.map((c) => ({
        ...c,
        d: arc(SOBRAL.x, SOBRAL.y, c.x, c.y),
        dist: Math.hypot(c.x - SOBRAL.x, c.y - SOBRAL.y),
      })),
    [],
  );
  const active = arcs.find((a) => a.uf === hover);

  return (
    <div className="relative">
      <svg
        ref={ref}
        viewBox={BR_VIEWBOX}
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Mapa do Brasil com a sede em Sobral (CE) conectada às 27 capitais"
      >
        <defs>
          <radialGradient id="br-wave" gradientUnits="userSpaceOnUse" cx={SOBRAL.x} cy={SOBRAL.y} r="10">
            <stop offset="0" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="0.82" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="0.9" stopColor="rgba(255,255,255,0.85)" />
            <stop offset="0.96" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="1" stopColor="rgba(255,255,255,0.22)" />
            <animate attributeName="r" values="1;120" dur="5.5s" repeatCount="indefinite" />
          </radialGradient>
          <linearGradient id="br-arc" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#ff4d6d" stopOpacity="0.9" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        <Dots />

        {/* arcos */}
        <g fill="none" strokeLinecap="round">
          {arcs.map((a) => (
            <motion.path
              key={a.uf}
              d={a.d}
              stroke={hover === a.uf ? "#ffffff" : "rgba(255,255,255,0.32)"}
              strokeWidth={hover === a.uf ? 0.42 : 0.18}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : undefined}
              transition={{ duration: 1.4, ease: EASE_GLASS, delay: 0.3 + a.dist * 0.018 }}
            />
          ))}
        </g>

        {/* capitais */}
        {arcs.map((a) => (
          <g
            key={a.uf}
            onPointerEnter={() => setHover(a.uf)}
            onPointerLeave={() => setHover(null)}
            className="cursor-pointer"
          >
            <circle cx={a.x} cy={a.y} r={2.4} fill="transparent" />
            <motion.circle
              cx={a.x}
              cy={a.y}
              fill="#fff"
              initial={{ r: 0 }}
              animate={inView ? { r: hover === a.uf ? 1.15 : 0.72 } : undefined}
              transition={{ duration: 0.5, delay: inView && !hover ? 0.9 + a.dist * 0.018 : 0 }}
            />
          </g>
        ))}

        {/* Sobral */}
        <circle cx={SOBRAL.x} cy={SOBRAL.y} r="1.3" fill="#ff2b5c" />
        <circle cx={SOBRAL.x} cy={SOBRAL.y} r="1.3" fill="none" stroke="#ff2b5c" strokeWidth="0.3">
          <animate attributeName="r" values="1.3;5" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.9;0" dur="2.4s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Rótulo flutuante */}
      <div
        className="glass glass-soft pointer-events-none absolute rounded-full px-3 py-1 text-[12px] text-white transition-opacity duration-300"
        style={{
          left: active ? `${active.x}%` : `${SOBRAL.x}%`,
          top: active ? `${(active.y / BR_H) * 100}%` : `${(SOBRAL.y / BR_H) * 100}%`,
          transform: "translate(-50%, calc(-100% - 10px))",
          opacity: 1,
        }}
      >
        <span className="relative z-10 whitespace-nowrap">{active ? `${active.city} (${active.uf})` : "Sede em Sobral (CE)"}</span>
      </div>
    </div>
  );
}
