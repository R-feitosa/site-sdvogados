import { motion } from "framer-motion";
import missionValuesBg from "@/assets/mission-values-bg.jpg";
const values = [{
  title: "Missão",
  description: "Oferecer soluções jurídicas de excelência, com atendimento personalizado e comprometido com os resultados de nossos clientes."
}, {
  title: "Visão",
  description: "Ser referência em advocacia empresarial no Brasil, reconhecidos pela qualidade, ética e inovação."
}, {
  title: "Valores",
  description: "Ética profissional, transparência, comprometimento e excelência no atendimento."
}, {
  title: "Propósito",
  description: "Transformar a advocacia em ferramenta de desenvolvimento, protegendo direitos e impulsionando crescimento."
}];
export default function MissionValues() {
  return <section className="px-4 py-4 bg-white">
      <div className="relative overflow-hidden min-h-[90vh] rounded-2xl lg:rounded-3xl">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${missionValuesBg})`
      }} />
        
        {/* Subtle overlay for better text contrast */}
        <div className="absolute inset-0 bg-black/10" />
        
        <div className="relative z-10 flex flex-col justify-center min-h-[90vh] px-8 lg:px-16 xl:px-24 py-20">
          {/* Header - Centered */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          duration: 0.6
        }} className="text-center mb-16 lg:mb-24">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight">Nossos Princípios</h2>
          </motion.div>

          {/* Cards in Staircase Layout */}
          <div className="relative flex-1 flex items-center">
            {/* Desktop: Staircase diagonal layout */}
            <div className="hidden lg:flex items-start gap-6 w-full">
              {values.map((item, index) => <motion.div key={item.title} initial={{
              opacity: 0,
              y: 40
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.6,
              delay: index * 0.15
            }} className="flex-1" style={{
              marginTop: `${index * 70}px`
            }}>
                  <div className="rounded-3xl p-8 border border-white/15 hover:border-white/25 transition-all duration-500" style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}>
                    <h3 className="font-display text-lg font-semibold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-white/75 text-base leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>)}
            </div>

            {/* Mobile/Tablet: Stacked with offset */}
            <div className="lg:hidden space-y-4 w-full">
              {values.map((item, index) => <motion.div key={item.title} initial={{
              opacity: 0,
              y: 30
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{
              once: true
            }} transition={{
              duration: 0.5,
              delay: index * 0.1
            }}>
                  <div className="rounded-2xl p-6 border border-white/15" style={{
                background: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)'
              }}>
                    <h3 className="font-display text-lg font-semibold text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/75 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
}