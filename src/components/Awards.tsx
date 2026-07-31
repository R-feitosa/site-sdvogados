import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Award logos
import latinAmericanQualityLogo from "@/assets/awards/latin-american-quality.png";
import gptwLogo from "@/assets/awards/gptw.png";
import iso9001Logo from "@/assets/awards/iso-9001.png";

const awards = [{
  id: 1,
  abbreviation: "LAQI",
  title: "Latin American Quality Institute",
  description: "Reconhecimento internacional pela excelência em qualidade e inovação nos serviços jurídicos prestados na América Latina.",
  year: "2024",
  logoImage: latinAmericanQualityLogo
}, {
  id: 2,
  abbreviation: "GPTW",
  title: "Great Place to Work",
  description: "Certificação que reconhece o escritório como um excelente ambiente de trabalho, destacando nossa cultura organizacional e o cuidado com nossos colaboradores.",
  year: "2024",
  logoImage: gptwLogo
}, {
  id: 3,
  abbreviation: "ISO",
  title: "ISO 9001",
  description: "Certificação internacional de sistema de gestão da qualidade, garantindo processos padronizados e excelência operacional em todos os serviços.",
  year: "2024",
  logoImage: iso9001Logo
}];
const Awards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % awards.length);
  };
  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + awards.length) % awards.length);
  };
  const getVisibleCards = () => {
    const prev = (currentIndex - 1 + awards.length) % awards.length;
    const next = (currentIndex + 1) % awards.length;
    return [prev, currentIndex, next];
  };
  const visibleCards = getVisibleCards();
  return <section className="py-24 overflow-hidden relative bg-white">
      {/* Decorative gradient circles/orbs - discrete design elements */}
      
      {/* Top left orb */}
      <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)'
    }} />
      
      {/* Top right orb */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full opacity-15 blur-2xl pointer-events-none" style={{
      background: 'radial-gradient(circle, rgba(180, 160, 150, 0.5) 0%, transparent 70%)'
    }} />
      
      {/* Bottom left orb */}
      <div className="absolute -bottom-24 -left-12 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none" style={{
      background: 'radial-gradient(circle, rgba(160, 140, 130, 0.4) 0%, transparent 65%)'
    }} />
      
      {/* Bottom right orb - primary color accent */}
      <div className="absolute -bottom-16 -right-20 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 60%)'
    }} />
      
      {/* Center-left subtle orb */}
      <div className="absolute top-1/2 -left-32 w-56 h-56 rounded-full opacity-10 blur-2xl pointer-events-none" style={{
      background: 'radial-gradient(circle, rgba(200, 180, 165, 0.5) 0%, transparent 70%)'
    }} />
      
      {/* Center-right subtle orb */}
      <div className="absolute top-1/3 -right-24 w-48 h-48 rounded-full opacity-10 blur-2xl pointer-events-none" style={{
      background: 'radial-gradient(circle, hsl(var(--primary) / 0.25) 0%, transparent 70%)'
    }} />
      
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header - Original Style */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-16">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{ once: true, amount: 0.15 }} transition={{
          duration: 0.6
        }} className="text-4xl md:text-5xl font-light text-gray-900 leading-tight">
            Reconhecimento e<br />
            <span className="font-semibold text-primary text-5xl">Excelência</span>
          </motion.h2>
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{ once: true, amount: 0.15 }} transition={{
          duration: 0.6,
          delay: 0.1
        }} className="max-w-md text-gray-600 text-lg">
            Nosso compromisso com a qualidade é reconhecido pelas principais instituições de avaliação jurídica.
          </motion.p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-center gap-4 md:gap-6 min-h-[320px] md:min-h-[420px]">
            <AnimatePresence mode="popLayout">
              {visibleCards.map((index, position) => {
              const award = awards[index];
              const isCenter = position === 1;
              return <motion.div key={award.id} layout initial={{
                 opacity: 0,
                 scale: 0.8
               }} animate={{
                 opacity: isCenter ? 1 : 0.5,
                 scale: isCenter ? 1 : 0.75,
                 zIndex: isCenter ? 10 : 5
               }} exit={{
                 opacity: 0,
                 scale: 0.8
               }} transition={{
                 duration: 0.4,
                 ease: "easeInOut"
               }} className={`
                       ${isCenter ? "w-full md:w-[420px] px-4 md:px-0" : "w-[300px] hidden md:block"}
                       flex-shrink-0
                     `}>
                    {isCenter ? (/* Center Card - Featured Glass Style with Primary Color */
                <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-l-2 border-r-2 md:border border-primary/40 md:border-primary/30 shadow-[0_4px_16px_0_rgba(128,0,32,0.15)] md:shadow-[0_8px_32px_0_rgba(128,0,32,0.25)]" style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.95) 0%, hsl(var(--primary) / 0.8) 100%)',
                }}>
                        {/* Glass accent border */}
                        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        
                        {/* Logo/Image Area */}
                        <div className="h-40 md:h-56 bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 opacity-15 md:opacity-30">
                            <div className="absolute top-4 left-4 w-20 h-20 border border-white/20 rounded-full" />
                            <div className="absolute bottom-4 right-4 w-32 h-32 border border-white/15 rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-white/10 rounded-full" />
                          </div>
                          <div className="relative z-10 text-center p-6">
                            {award.logoImage ? (
                              <img 
                                src={award.logoImage} 
                                alt={award.title}
                                className="max-h-32 max-w-[280px] w-auto object-contain mx-auto drop-shadow-lg"
                              />
                            ) : (
                              <div className="w-24 h-24 rounded-2xl surface-frost-strong flex items-center justify-center mx-auto shadow-lg">
                                <span className="text-white text-xl font-bold">{award.abbreviation}</span>
                              </div>
                            )}
                            <span className="text-white/80 text-sm font-medium mt-4 block">{award.year}</span>
                          </div>
                        </div>
                        
                        {/* Content */}
                        <div className="p-5 md:p-8">
                          <span className="text-white/70 md:text-white/80 text-xs md:text-sm font-bold tracking-wider uppercase">
                            {award.abbreviation}
                          </span>
                          <h3 className="text-lg md:text-2xl font-semibold text-white mt-2 mb-3 md:mb-4">
                            {award.title}
                          </h3>
                          <p className="text-white/70 md:text-white/80 text-sm md:text-base leading-relaxed line-clamp-3 md:line-clamp-none">
                            {award.description}
                          </p>
                        </div>
                      </div>) : (/* Side Cards - Glass Style with Primary Color */
                <div className="relative rounded-3xl p-8 h-[380px] flex flex-col justify-between border border-primary/20 shadow-[0_8px_32px_0_rgba(128,0,32,0.15)]" style={{
                  background: 'linear-gradient(135deg, hsl(var(--primary) / 0.85) 0%, hsl(var(--primary) / 0.7) 100%)',
                }}>
                        {/* Glass accent border */}
                        <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        
                        <div>
                          {award.logoImage ? (
                            <img 
                              src={award.logoImage} 
                              alt={award.title}
                              className="h-12 w-auto object-contain mb-4 drop-shadow-md"
                            />
                          ) : (
                            <span className="text-white/80 text-sm font-bold tracking-wider uppercase">
                              {award.abbreviation}
                            </span>
                          )}
                          <h3 className="text-xl font-semibold text-white mt-3 mb-4">
                            {award.title}
                          </h3>
                          <p className="text-white/70 text-sm leading-relaxed line-clamp-4">
                            {award.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-white/70">
                          <span className="text-sm font-medium">{award.year}</span>
                        </div>
                      </div>)}
                  </motion.div>;
            })}
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <div className="w-32 h-0.5 bg-border rounded-full overflow-hidden">
              <motion.div className="h-full bg-primary" initial={{
              width: "0%"
            }} animate={{
              width: `${(currentIndex + 1) / awards.length * 100}%`
            }} transition={{
              duration: 0.3
            }} />
            </div>
            <span className="text-sm text-muted-foreground">
              {String(currentIndex + 1).padStart(2, "0")} / {String(awards.length).padStart(2, "0")}
            </span>
          </div>

          {/* Navigation */}
          <div className="flex justify-end gap-3 mt-8">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center text-primary hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>;
};
export default Awards;