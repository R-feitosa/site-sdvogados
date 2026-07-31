import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useScrollProgress";

interface LazyVideoBackgroundProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * Background video that stays out of the way of scrolling.
 *
 * The previous markup mounted a 15 MB autoplaying <video> at page load, so the
 * browser downloaded and decoded it while the user was still at the top of the
 * page. Here the poster carries the visual until the section is close to the
 * viewport, and playback is paused whenever the section leaves it — an
 * off-screen video still costs decode work every frame otherwise.
 */
export default function LazyVideoBackground({ src, poster, className }: LazyVideoBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShouldLoad(true);

        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { rootMargin: "300px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  return (
    <div ref={containerRef} className={className}>
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
