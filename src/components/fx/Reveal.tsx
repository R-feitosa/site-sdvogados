import { motion, useInView } from "framer-motion";
import { useRef, type ElementType, type ReactNode } from "react";
import { EASE_GLASS } from "@/lib/motion";

/**
 * Revelação por máscara, linha a linha. Cada item de `lines` sobe de trás
 * de uma janela invisível. É a única entrada de títulos usada no site.
 */
export function LineReveal({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  play,
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  /** força o disparo (ex.: após a abertura); se omitido, dispara ao entrar na tela */
  play?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const show = play ?? inView;
  return (
    <Tag ref={ref} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "108%" }}
            animate={show ? { y: "0%" } : { y: "108%" }}
            transition={{ duration: 1.15, ease: EASE_GLASS, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** Entrada discreta para blocos (opacidade + leve deslocamento). */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 1, ease: EASE_GLASS, delay }}
    >
      {children}
    </motion.div>
  );
}
