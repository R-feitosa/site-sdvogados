import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formatBR } from "@/lib/motion";

export default function CountUp({
  to,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 2.2,
  play,
  className,
}: {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  play?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const go = play ?? inView;
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!go) return;
    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [go, to, duration]);

  return (
    <span ref={ref} className={`tabular ${className ?? ""}`} aria-label={`${prefix}${formatBR(to, decimals)}${suffix}`}>
      <span aria-hidden>
        {prefix}
        {formatBR(val, decimals)}
        {suffix}
      </span>
    </span>
  );
}
