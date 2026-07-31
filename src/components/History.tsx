import { motion } from "framer-motion";
import { Scale, Building2, Users2, TrendingUp } from "lucide-react";

const timeline = [
  {
    year: "2011",
    title: "Fundação",
    description: "Início das atividades do escritório com foco em Direito Empresarial.",
    icon: Scale,
  },
  {
    year: "2015",
    title: "Expansão",
    description: "Ampliação da equipe e abertura de novas áreas de atuação.",
    icon: Users2,
  },
  {
    year: "2018",
    title: "Nova Sede",
    description: "Inauguração da sede própria com infraestrutura moderna.",
    icon: Building2,
  },
  {
    year: "2024",
    title: "Consolidação",
    description: "Reconhecimento no mercado jurídico e mais de 70 empresas atendidas.",
    icon: TrendingUp,
  },
];

export default function History() {
  return (
    <section id="historia" className="py-20 lg:py-32 bg-background relative overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Trajetória
            </span>

            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Nossa História
              <span className="block text-2xl md:text-3xl text-gradient-gold mt-2">
                Tradição e Inovação
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground mb-8">
              <p className="text-lg leading-relaxed">
                Desde 2011, o escritório <strong className="text-foreground">Rfeitosa Advogados Associados</strong> vem 
                construindo uma trajetória de excelência no mercado jurídico brasileiro.
              </p>
              <p className="leading-relaxed">
                Nossa história é marcada por conquistas significativas, crescimento 
                sustentável e, acima de tudo, pelo compromisso inabalável com 
                nossos clientes e parceiros.
              </p>
              <p className="leading-relaxed">
                Cada etapa de nossa jornada reflete nossa dedicação em oferecer 
                soluções jurídicas de alta qualidade e atendimento personalizado.
              </p>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="relative pl-16"
                >
                  {/* Timeline Line */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-6 top-14 w-0.5 h-full bg-border" />
                  )}

                  {/* Icon */}
                  <div className="absolute left-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center border border-accent/30">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>

                  {/* Content */}
                  <div className="glass-card rounded-2xl p-6">
                    <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-bold rounded-full mb-2">
                      {item.year}
                    </span>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
