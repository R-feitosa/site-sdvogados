import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import heroBackground from "@/assets/hero-background-new.jpg";

// Hook for animated count-up with prefix support
const useHeroCountUp = ({ end, duration = 1500, prefix = '', suffix = '' }: { 
  end: number; 
  duration?: number; 
  prefix?: string; 
  suffix?: string; 
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutExpo = 1 - Math.pow(2, -10 * progress);
      const rawValue = easeOutExpo * end;
      setCount(end < 10 ? Math.round(rawValue * 10) / 10 : Math.floor(rawValue));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  const formattedValue = `${prefix}${count}${suffix}`;

  return { ref, value: formattedValue, hasStarted };
};

// Single stat card component
const HeroStatCard = ({ 
  end, 
  prefix, 
  suffix, 
  label, 
  index 
}: { 
  end: number; 
  prefix: string; 
  suffix: string; 
  label: string; 
  index: number;
}) => {
  const { ref, value, hasStarted } = useHeroCountUp({ end, prefix, suffix, duration: 1500 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
      className="flex-1 min-w-0"
      style={{
        background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.2)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        borderRadius: '16px',
        padding: '16px 16px',
      }}
    >
      <div 
        className="font-bold mb-1"
        style={{ 
          fontSize: 'clamp(22px, 3vw, 40px)',
          background: 'linear-gradient(90deg, #ffffff 0%, #9a9a9a 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        {hasStarted ? value : `${prefix}0${suffix}`}
      </div>
      <div className="text-white/70 text-xs md:text-sm font-medium">
        {label}
      </div>
    </motion.div>
  );
};

// Stats container component
const HeroStats = () => {
  const stats = [
    { end: 50, prefix: 'R$ ', suffix: 'Mi', label: 'Benefícios gerados' },
    { end: 2500, prefix: '+', suffix: '', label: 'Clientes atendidos' },
    { end: 1.6, prefix: '+', suffix: ' Bi', label: 'Ativos geridos' }
  ];

  return (
    <div className="flex gap-3 md:gap-4">
      {stats.map((stat, index) => (
        <HeroStatCard
          key={stat.label}
          end={stat.end === 1.6 ? 1.6 : stat.end}
          prefix={stat.prefix}
          suffix={stat.suffix}
          label={stat.label}
          index={index}
        />
      ))}
    </div>
  );
};

export default function Hero() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="inicio" className="px-2 md:px-4 pt-2 md:pt-4 pb-2 md:pb-4 bg-white">
      <div className="relative min-h-[calc(100vh-1rem)] md:min-h-[calc(100vh-2rem)] overflow-hidden flex flex-col justify-end lg:justify-end rounded-2xl lg:rounded-3xl">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat rounded-2xl lg:rounded-3xl"
          style={{
            backgroundImage: `url(${heroBackground})`
          }}
        />
        
        {/* Overlay escuro sutil */}
        <div className="absolute inset-0 bg-black/30 rounded-2xl lg:rounded-3xl" />

        <div className="px-4 md:px-6 lg:px-10 relative z-10 pb-6 md:pb-16 lg:pb-20 pt-20 md:pt-0 w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-12">
            {/* Left Side - Content + Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex-1 max-w-2xl"
            >
              <h1 
                className="font-display leading-[1.05] mb-4 md:mb-6 text-white"
                style={{ fontSize: "clamp(32px, 5.5vw, 80px)" }}
              >
                <span className="block font-light">Soluções Jurídicas</span>
                <span className="block font-light">Para Seu Negócio</span>
              </h1>

              <p 
                className="text-white/80 mb-6 md:mb-8 max-w-lg leading-relaxed text-sm md:text-lg"
              >
                Oferecemos assessoria jurídica completa e personalizada, trabalhando com empresas e indivíduos para criar impacto duradouro em diversos setores.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-10">
                {/* Button 1 - White with burgundy text and arrow */}
                <button
                  type="button"
                  onClick={() => scrollToSection("#contato")}
                  className="group inline-flex items-center justify-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-full font-medium transition-all duration-300 bg-white hover:bg-gray-100 text-primary text-sm md:text-base"
                >
                  Agende uma Consulta
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-primary" />
                </button>

                {/* Button 2 - Glass Style Enhanced */}
                <button
                  type="button"
                  onClick={() => scrollToSection("#areas")}
                  className="inline-flex items-center justify-center gap-2 px-5 md:px-7 py-2.5 md:py-3 rounded-full font-semibold transition-all duration-300 text-white hover:scale-105 text-sm md:text-base"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)'
                  }}
                >
                  Nossas Áreas
                </button>
              </div>

              {/* Stats Cards - Below Buttons with Count-Up Effect */}
              <HeroStats />
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}
