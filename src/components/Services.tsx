import { motion } from "framer-motion";
import {
  Building2,
  Users,
  FileText,
  Scale,
  Briefcase,
  BadgeDollarSign,
  Landmark,
  Shield,
} from "lucide-react";
import servicesIllustration from "@/assets/services-illustration.png";

const services = [
  {
    icon: Building2,
    title: "Direito Empresarial",
    description:
      "Assessoria completa para empresas, desde a constituição até fusões e aquisições.",
  },
  {
    icon: Users,
    title: "Direito Civil",
    description:
      "Resolução de conflitos, contratos, responsabilidade civil e questões patrimoniais.",
  },
  {
    icon: BadgeDollarSign,
    title: "Direito Tributário",
    description:
      "Planejamento tributário, defesas fiscais e recuperação de créditos.",
  },
  {
    icon: Briefcase,
    title: "Direito Trabalhista",
    description:
      "Consultoria preventiva e defesa em ações trabalhistas para empresas e executivos.",
  },
  {
    icon: Landmark,
    title: "Direito Imobiliário",
    description:
      "Transações imobiliárias, regularização fundiária e contratos de locação.",
  },
  {
    icon: FileText,
    title: "Contratos",
    description:
      "Elaboração, revisão e negociação de contratos nacionais e internacionais.",
  },
  {
    icon: Scale,
    title: "Contencioso",
    description:
      "Representação judicial e arbitragem em disputas comerciais complexas.",
  },
  {
    icon: Shield,
    title: "Compliance",
    description:
      "Implementação de programas de conformidade e governança corporativa.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function Services() {
  return (
    <section id="areas" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      {/* Background Illustration */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `url(${servicesIllustration})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      
      <div className="section-container relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Áreas de Atuação
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Expertise Jurídica
            <span className="text-gradient-gold"> Completa</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nossa equipe multidisciplinar oferece soluções jurídicas integradas, 
            combinando profundo conhecimento técnico com visão estratégica de negócios.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              variants={itemVariants}
              className="group bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl p-6 hover-lift cursor-pointer transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:shadow-gold transition-all duration-300">
                <service.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex items-center text-primary font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span>Saiba mais</span>
                <svg
                  className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
