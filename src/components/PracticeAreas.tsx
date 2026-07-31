import { Scale, Building2, Users, FileText, Shield, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import servicesBg from "@/assets/services-bg-modern.jpg";

const practiceAreas = [
  {
    icon: Scale,
    title: "Direito Trabalhista",
    description: "Defesa e consultoria em relações de trabalho"
  },
  {
    icon: Building2,
    title: "Direito Empresarial",
    description: "Assessoria jurídica para empresas"
  },
  {
    icon: Users,
    title: "Direito Previdenciário",
    description: "Benefícios e aposentadorias"
  },
  {
    icon: FileText,
    title: "Direito Tributário",
    description: "Planejamento e economia fiscal"
  },
  {
    icon: Shield,
    title: "Direito Civil",
    description: "Contratos e responsabilidade civil"
  },
  {
    icon: Briefcase,
    title: "Direito Administrativo",
    description: "Licitações e contratos públicos"
  }
];

const PracticeAreas = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = section.offsetHeight;
      const viewportHeight = window.innerHeight;
      
      // Calculate scroll progress within the section
      if (sectionTop <= 0 && sectionTop > -(sectionHeight - viewportHeight)) {
        const scrollProgress = Math.abs(sectionTop) / (sectionHeight - viewportHeight);
        const newIndex = Math.min(
          Math.floor(scrollProgress * practiceAreas.length),
          practiceAreas.length - 1
        );
        setActiveCardIndex(newIndex);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      id="areas"
      ref={sectionRef} 
      className="relative bg-white"
      style={{ height: window.innerWidth >= 1024 ? `${100 + (practiceAreas.length * 25)}vh` : 'auto' }}
    >
      {/* Sticky container - stays in viewport while scrolling */}
      <div className="lg:sticky lg:top-0 lg:h-screen px-2 md:px-4 py-2 md:py-4 overflow-hidden">
        <div className="relative h-full overflow-hidden rounded-2xl lg:rounded-3xl">
          {/* Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${servicesBg})` }}
          />
          <div className="absolute inset-0 bg-black/25" />

          {/* Content - Full height flex */}
          <div className="relative z-10 h-full flex flex-col lg:flex-row">
            
            {/* Left side - Title */}
            <div className="w-full lg:w-[40%] px-4 md:px-8 lg:px-14 py-6 md:py-12 lg:py-16 flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                  <span className="text-white/60 text-xs tracking-widest uppercase">
                    Áreas de Atuação
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-4xl lg:text-[44px] text-white mb-5 leading-[1.1]">
                  <span className="font-light">Excelência Jurídica</span>
                  <br />
                  <span className="font-semibold">Em Diversas Áreas</span>
                </h2>
                
                <p className="text-white/50 text-[15px] mb-8 max-w-[300px] leading-relaxed">
                  Oferecemos soluções jurídicas completas e personalizadas, 
                  com uma equipe multidisciplinar preparada para atender 
                  às necessidades específicas do seu negócio.
                </p>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    const contactSection = document.querySelector('#contato');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium text-white border border-white/25 hover:bg-white/10 w-fit transition-all"
                >
                  Fale Conosco
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>

                {/* Progress indicator - desktop only */}
                <div className="mt-auto pt-16 hidden lg:flex items-center gap-3">
                  <div className="flex gap-2">
                    {practiceAreas.map((_, index) => (
                      <div
                        key={index}
                        className={`transition-all duration-500 rounded-full ${
                          index === activeCardIndex 
                            ? 'w-6 h-2 bg-white' 
                            : index < activeCardIndex 
                              ? 'w-2 h-2 bg-white/60'
                              : 'w-2 h-2 bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right side - Scrolling cards stack */}
            <div className="hidden lg:flex lg:w-[60%] py-12 lg:py-16 pr-8 lg:pr-14 items-center">
              <div className="relative w-full h-[500px]">
                {practiceAreas.map((card, index) => {
                  const Icon = card.icon;
                  const isActive = index === activeCardIndex;
                  const isPast = index < activeCardIndex;
                  const isFuture = index > activeCardIndex;
                  const relativeIndex = index - activeCardIndex;
                  
                  // Calculate position for stacking effect
                  let translateY = 0;
                  let opacity = 1;
                  let scale = 1;
                  let zIndex = practiceAreas.length - index;

                  if (isPast) {
                    // Cards that have scrolled past go up and fade out
                    translateY = -150 - (activeCardIndex - index) * 50;
                    opacity = 0;
                    scale = 0.95;
                  } else if (isActive) {
                    // Active card
                    translateY = 0;
                    opacity = 1;
                    scale = 1;
                    zIndex = 10;
                  } else if (isFuture) {
                    // Future cards stack below with gap
                    const stackPosition = relativeIndex;
                    translateY = stackPosition * 140;
                    opacity = Math.max(0.2, 1 - stackPosition * 0.25);
                    scale = 1 - stackPosition * 0.02;
                    zIndex = practiceAreas.length - index;
                  }

                  return (
                    <motion.div
                      key={card.title}
                      animate={{ 
                        y: translateY,
                        opacity,
                        scale,
                      }}
                      transition={{ 
                        duration: 0.6, 
                        ease: [0.32, 0.72, 0, 1]
                      }}
                      className="absolute top-0 left-0 right-0"
                      style={{ 
                        zIndex,
                        height: 120
                      }}
                    >
                      <div 
                        className="w-full h-full p-6 rounded-2xl flex items-center"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.08) 100%)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          border: '1px solid rgba(255,255,255,0.15)',
                          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
                        }}
                      >
                        <div className="flex items-center gap-5 w-full">
                          <div 
                            className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                            style={{
                              background: 'rgba(255,255,255,0.15)',
                              border: '1px solid rgba(255,255,255,0.2)'
                            }}
                          >
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-white font-semibold text-xl mb-1">
                              {card.title}
                            </h3>
                            <p className="text-white/50 text-base">
                              {card.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile cards - static list */}
          <div className="lg:hidden px-4 pb-6 space-y-3 relative z-10">
            {practiceAreas.map((area) => {
              const Icon = area.icon;
              return (
                <div
                  key={area.title}
                  className="w-full p-4 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <Icon className="w-5 h-5 text-white/80" />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-base">{area.title}</h3>
                      <p className="text-white/40 text-xs">{area.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
