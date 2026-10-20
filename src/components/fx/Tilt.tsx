import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type CSSProperties, type ReactNode } from "react";
import { useFinePointer } from "@/lib/motion";

/**
 * Inclina o cartão em 3D conforme o ponteiro e alimenta --gx/--gy
 * para o reflexo especular (.specular) do vidro.
 */
export default function Tilt({
  children,
  className,
  max = 8,
  style,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
  as?: "div" | "article" | "li";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 160, damping: 18 });
  const Comp = motion[as];

  return (
    <Comp
      ref={ref as never}
      className={className}
      style={{ ...style, rotateX: fine ? rx : 0, rotateY: fine ? ry : 0, transformPerspective: 1100 }}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        el.style.setProperty("--gx", `${nx * 100}%`);
        el.style.setProperty("--gy", `${ny * 100}%`);
        if (fine) {
          px.set(nx);
          py.set(ny);
        }
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </Comp>
  );
}
