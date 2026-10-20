import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import silk from "@/assets/web/silk.webp";
import { PRINCIPLES } from "@/content/site";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";
import Tilt from "@/components/fx/Tilt";

/**
 * O momento mais "vidro" do site: quatro lâminas sobre a seda vinho em movimento.
 * A seda reage ao scroll e ao ponteiro, e o vidro refrata o que está atrás.
 */
export default function Principles() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.25, 1.12, 1.25]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });

  return (
    <section
      id="principios"
      ref={ref}
      className="relative overflow-hidden px-3 py-3"
      aria-label="Nossos princípios"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width - 0.5) * -40);
        my.set(((e.clientY - r.top) / r.height - 0.5) * -30);
      }}
    >
      <div className="relative overflow-hidden rounded-[32px]">
        <motion.div className="absolute inset-[-8%]" style={{ y: bgY, scale: bgScale }}>
          <motion.img
            src={silk}
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
            loading="lazy"
            style={{ x: sx, y: sy }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,rgba(12,4,6,.15),rgba(12,4,6,.6))]" />

        <div className="shell relative pb-16 pt-24 md:pb-24 md:pt-32">
          <LineReveal
            lines={["Nossos princípios."]}
            className="display text-center text-[clamp(2.8rem,6vw,5.8rem)] font-light"
          />
          <FadeIn delay={0.1}>
            <p className="lede mx-auto mt-5 text-center text-white/80">
              O que orienta cada parecer, cada audiência e cada decisão que tomamos ao lado dos nossos clientes.
            </p>
          </FadeIn>

          <div className="mt-16 grid gap-4 md:grid-cols-2 lg:mt-24 lg:grid-cols-4 lg:items-start lg:gap-5">
            {PRINCIPLES.map((p, i) => (
              <div key={p.title} style={{ ["--step" as string]: `${i * 72}px` }} className="lg:mt-[var(--step)]">
                <FadeIn delay={0.1 * i}>
                <Tilt max={7} className="glass specular rounded-[26px] p-7 md:p-8">
                  <div className="relative z-10">
                    <h3 className="display text-[2.4rem] font-normal leading-none">{p.title}</h3>
                    <div className="my-5 h-px w-12 bg-white/40" />
                    <p className="text-[16px] leading-relaxed text-white/80">{p.text}</p>
                  </div>
                </Tilt>
                </FadeIn>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
