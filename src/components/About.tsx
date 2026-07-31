import { motion } from "framer-motion";
import { CheckCircle2, Award, BookOpen, Users } from "lucide-react";
import drRoneelyPhoto from "@/assets/dr-roneely-new.jpg";
const highlights = ["Formação em Direito pela USP", "MBA em Gestão Empresarial pela FGV", "Especialização em Direito Tributário", "Membro da OAB-SP desde 2011"];
const achievements = [{
  icon: Award,
  value: "25+",
  label: "Anos de Experiência"
}, {
  icon: BookOpen,
  value: "50+",
  label: "Artigos Publicados"
}, {
  icon: Users,
  value: "200+",
  label: "Palestras Ministradas"
}];
export default function About() {
  return <section id="sobre" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      {/* Minimalist circular arc - Apple style */}
      <div className="absolute -bottom-[500px] -left-[300px] w-[900px] h-[900px] rounded-full pointer-events-none" style={{
      border: '1px solid hsl(var(--primary) / 0.06)'
    }} />
      
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        {/* Header - Same style as Awards */}
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
            Sobre o<br />
            <span className="font-semibold text-primary">Fundador</span>
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
        </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{ once: true, amount: 0.15 }} transition={{
          duration: 0.8
        }} className="relative">
            <div className="relative">
              {/* Main Image Container */}
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted shadow-elegant">
                <img src={drRoneelyPhoto} alt="Dr. Roneely Feitosa" className="w-full h-full object-cover object-top" />
              </div>

              {/* Decorative Frame */}
              <div className="absolute -inset-4 border-2 border-primary/20 rounded-2xl -z-10" />

              {/* Floating Stats Card - Glass Style */}
              <motion.div initial={{
              opacity: 0,
              y: 20
            }} whileInView={{
              opacity: 1,
              y: 0
            }} viewport={{ once: true, amount: 0.15 }} transition={{
              duration: 0.6,
              delay: 0.4
            }} className="absolute -bottom-8 -right-8 rounded-xl p-6 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]" style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            }}>
                {/* Glass accent border */}
                <div className="absolute inset-0 rounded-xl border border-white/40 pointer-events-none" />
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
                
                <div className="grid grid-cols-3 gap-6 relative z-10">
                  {achievements.map(item => <div key={item.label} className="text-center">
                      <item.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                      <p className="text-xl font-bold text-gray-900">{item.value}</p>
                      <p className="text-xs text-gray-500">{item.label}</p>
                    </div>)}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{ once: true, amount: 0.15 }} transition={{
          duration: 0.8
        }}>
            <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-2">
              Dr. Roneely <span className="font-semibold text-primary">Feitosa</span>
            </h3>
            <p className="text-primary font-medium mb-6">Sócio Fundador</p>

            <div className="space-y-4 text-gray-600 mb-8">
              <p className="text-lg leading-relaxed">
                Com mais de 25 anos de experiência no mercado jurídico, Dr. Roneely Feitosa 
                construiu uma carreira sólida baseada em competência técnica, ética profissional 
                e comprometimento com os resultados de seus clientes.
              </p>
              <p className="leading-relaxed">
                À frente do escritório Rfeitosa Advogados Associados, lidera uma equipe 
                multidisciplinar de advogados especializados, oferecendo assessoria jurídica 
                estratégica para empresas de diversos portes e setores da economia.
              </p>
            </div>

            {/* Highlights */}
            <div className="space-y-3 mb-10">
              {highlights.map((item, index) => <motion.div key={item} initial={{
              opacity: 0,
              x: 20
            }} whileInView={{
              opacity: 1,
              x: 0
            }} viewport={{ once: true, amount: 0.15 }} transition={{
              duration: 0.4,
              delay: index * 0.1
            }} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-gray-800 font-medium">{item}</span>
                </motion.div>)}
            </div>

            {/* Quote */}
            <blockquote className="relative pl-6 border-l-4 border-primary italic text-lg text-gray-600">
              "Nosso compromisso é transformar desafios jurídicos em soluções estratégicas 
              que impulsionam o sucesso dos nossos clientes."
              <footer className="mt-3 not-italic text-sm font-medium text-gray-900">
                — Dr. Roneely Feitosa
              </footer>
            </blockquote>
          </motion.div>
        </div>
      </div>
    </section>;
}