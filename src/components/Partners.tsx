import { motion } from "framer-motion";
import { Linkedin } from "lucide-react";
import partnerRoneely from "@/assets/partner-roneely.jpg";
import partnerTayse from "@/assets/partner-tayse.jpg";
import partnerFabio from "@/assets/partner-fabio.jpg";
const partners = [{
  name: "Dr. Roneely Feitosa",
  role: "Sócio Proprietário",
  specialty: "Diretor Geral",
  photo: partnerRoneely,
  linkedin: "https://www.linkedin.com/in/roneely-feitosa-76680a87"
}, {
  name: "Dra. Tayse Ponte",
  role: "Sócia Proprietária",
  specialty: "Diretora Financeira",
  photo: partnerTayse,
  linkedin: "https://www.linkedin.com/in/tayse-feitosa-831243192"
}, {
  name: "Dr. Fabio Freitas",
  role: "Sócio",
  specialty: "Diretor",
  photo: partnerFabio,
  linkedin: "https://linkedin.com/in/"
}];
export default function Partners() {
  return <section id="socios" className="py-20 lg:py-24 bg-white">
      <div className="container mx-auto px-6 lg:px-10">
        {/* Header - Same style as Awards */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
          <motion.h2 initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{ once: true, amount: 0.15 }} transition={{
          duration: 0.6
        }} className="text-4xl text-gray-900 leading-tight md:text-3xl font-medium">
            Nossos<br />
            <span className="text-5xl font-bold text-primary">Sócios</span>
          </motion.h2>
          
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {partners.map((partner, index) => <motion.div key={partner.name} initial={{
          opacity: 0,
          y: 30
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{ once: true, amount: 0.15 }} transition={{
          duration: 0.5,
          delay: index * 0.1
        }} className="group">
              <div className="relative h-[520px] md:h-[520px] lg:h-[580px] rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]" style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.15)'
          }}>
                {/* Photo - Full Cover */}
                <img src={partner.photo} alt={partner.name} className="absolute inset-0 w-full h-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-105" />
                
                {/* Subtle gradient only at bottom for text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-2/5 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                
                {/* LinkedIn Button - Top Right */}
                <a href={partner.linkedin} target="_blank" rel="noopener noreferrer" className="surface-frost-strong absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110">
                  <Linkedin className="w-5 h-5 text-white" />
                </a>
                
                {/* Glass Info Panel at Bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <div className="surface-frost-dark rounded-xl p-4 text-center">
                    <h3 className="font-display text-lg md:text-xl font-bold text-white mb-1">
                      {partner.name}
                    </h3>
                    <p className="text-white/90 font-medium text-sm mb-1">
                      {partner.role}
                    </p>
                    <p className="text-white/70 text-xs md:text-sm">
                      {partner.specialty}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>)}
        </div>
      </div>
    </section>;
}