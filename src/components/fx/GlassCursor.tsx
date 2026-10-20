import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { prefersReducedMotion, useFinePointer } from "@/lib/motion";

/**
 * Cursor em forma de pequena lente de vidro. Cresce sobre elementos
 * interativos e mostra um rótulo quando o elemento define data-cursor="Texto".
 * Some sobre a lente do hero (data-cursor="hide").
 */
export default function GlassCursor() {
  const fine = useFinePointer();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "hover" | "label" | "hide">("idle");
  const [label, setLabel] = useState("");
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 520, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 520, damping: 40, mass: 0.5 });

  useEffect(() => {
    setEnabled(fine && !prefersReducedMotion());
  }, [fine]);

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-glass-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      if (tagged) {
        const v = tagged.dataset.cursor ?? "";
        if (v === "hide") setMode("hide");
        else if (v) {
          setMode("label");
          setLabel(v);
        } else setMode("hover");
        return;
      }
      if (t?.closest("input, textarea, select")) {
        setMode("hide");
        return;
      }
      if (t?.closest("a, button, [role='button'], label")) setMode("hover");
      else setMode("idle");
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("has-glass-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const size = mode === "label" ? 96 : mode === "hover" ? 58 : 30;
  const scale = mode === "hide" || !visible ? 0 : down ? 0.85 : 1;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[200]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="glass flex items-center justify-center rounded-full"
        style={{
          translateX: "-50%",
          translateY: "-50%",
          ["--glass-blur" as string]: "6px",
          ["--glass-fill" as string]:
            mode === "label"
              ? "linear-gradient(140deg, rgba(128,0,32,.75), rgba(86,16,16,.6))"
              : "linear-gradient(140deg, rgba(255,255,255,.18), rgba(255,255,255,.05))",
        }}
        animate={{ width: size, height: size, scale }}
        transition={{ type: "spring", stiffness: 380, damping: 28 }}
      >
        <AnimatePresence>
          {mode === "label" && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 text-[12px] font-medium tracking-wide text-white"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
        {mode === "idle" && <span className="relative z-10 h-1.5 w-1.5 rounded-full bg-white" />}
      </motion.div>
    </motion.div>
  );
}
