import { motion } from "framer-motion";
import ecosystemImage from "@/assets/rf-group-ecosystem.png";
import ecoSolucoesLogo from "@/assets/rf-group-logos/eco-solucoes.png";
import rfeitosaLogo from "@/assets/rf-group-logos/rfeitosa-advogados.png";
import feitosaImoveisLogo from "@/assets/rf-group-logos/feitosa-imoveis.png";
import connectAcademyLogo from "@/assets/rf-group-logos/connect-academy.png";
import connectValleyLogo from "@/assets/rf-group-logos/connect-valley.png";

const companies = [
  { name: "RFeitosa Advogados", logo: rfeitosaLogo, darkBg: false },
  { name: "RF Imóveis", logo: feitosaImoveisLogo, darkBg: false },
  { name: "Eco Soluções", logo: ecoSolucoesLogo, darkBg: false },
  { name: "Connect Valley", logo: connectValleyLogo, darkBg: true },
  { name: "Connect Academy", logo: connectAcademyLogo, darkBg: true },
];

const glassStyle = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
  border: '1px solid rgba(255,255,255,0.2)',
  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
};

const CompanyCards = ({ className = "" }: { className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true, amount: 0.15 }}
    className={`flex items-center w-full ${className}`}
  >
    {companies.map((company, index) => (
      <motion.div
        key={company.name}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
        viewport={{ once: true, amount: 0.15 }}
        className="flex-1 aspect-square rounded-xl flex items-center justify-center overflow-hidden transition-all duration-300 group cursor-pointer"
        style={{
          ...glassStyle,
          backgroundColor: company.darkBg ? '#001451' : 'rgba(255,255,255,0.7)',
        }}
      >
        <img
          src={company.logo}
          alt={company.name}
          className="w-[130%] h-[130%] object-contain transition-all duration-300 group-hover:scale-110"
        />
      </motion.div>
    ))}
  </motion.div>
);

export default function RFGroupEcosystem() {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="px-4 md:px-12 lg:px-20">
        {/* Mobile Layout */}
        <div className="lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.15 }}
            className="mb-6"
          >
            <h2 className="text-2xl md:text-3xl leading-[1.2] font-sans tracking-tight mb-4">
              <span className="text-black font-light">Fazemos parte do ecossistema</span>
              <br />
              <span className="text-primary font-semibold">RF Group</span>
            </h2>
            <p className="text-sm leading-relaxed text-justify text-muted font-sans font-normal">
              Nascemos do inconformismo com soluções jurídicas fragmentadas. O RF Group é um hub estratégico que integra advocacia especializada, compliance corporativo, estruturação societária e inteligência de negócios em um único ecossistema.
            </p>
          </motion.div>

          <CompanyCards className="gap-2 justify-between" />
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:block relative overflow-hidden rounded-3xl">
          {/* Text Content - Top Left */}
          <div className="absolute top-10 left-16 z-10 max-w-[48%] flex flex-col h-[calc(100%-80px)]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.15 }}
              className="mb-6"
            >
              <h2 className="text-3xl leading-[1.2] font-sans tracking-tight">
                <span className="text-black font-light">Fazemos parte do ecossistema</span>
                <br />
                <span className="text-primary font-semibold">RF Group</span>
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true, amount: 0.15 }}
              className="text-lg leading-relaxed text-justify text-muted font-sans font-normal"
            >
              Nascemos do inconformismo com soluções jurídicas fragmentadas. O RF Group é um hub estratégico que integra advocacia especializada, compliance corporativo, estruturação societária e inteligência de negócios em um único ecossistema. Atuamos como parceiros técnicos de empresas que exigem rigor jurídico aliado à visão empresarial, oferecendo desde assessoria preventiva e contenciosa até fomento econômico e desenvolvimento imobiliário. Cada unidade do grupo opera com autonomia e expertise própria, mas conectadas por uma filosofia comum: entregar soluções completas, tecnicamente robustas e orientadas a resultados mensuráveis.
            </motion.p>

            <div className="flex-1" />

            <CompanyCards className="gap-4" />
          </div>

          {/* Ecosystem Image */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, amount: 0.15 }}
          >
            <img
              src={ecosystemImage}
              alt="Ecossistema RF Group - Connect Valley, Connect Academy, RFeitosa Group e empresas parceiras"
              className="w-full h-auto object-contain"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
