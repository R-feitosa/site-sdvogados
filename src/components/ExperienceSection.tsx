import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import teamOfficePhoto from "@/assets/office-facade.jpg";

const AnimatedStat = ({
  value,
  suffix,
  label,
  index
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
}) => {
  const {
    ref,
    value: displayValue,
    isVisible
  } = useCountUp({
    end: value,
    suffix,
    duration: 2000
  });
  return <motion.div ref={ref} initial={{
    opacity: 0,
    x: -40,
    y: 20
  }} whileInView={{
    opacity: 1,
    x: 0,
    y: 0
  }} transition={{
    duration: 0.7,
    delay: index * 0.15,
    ease: [0.25, 0.1, 0.25, 1]
  }} viewport={{
    once: true
  }}>
      <p className="text-4xl md:text-5xl lg:text-7xl font-light text-primary tracking-tight">
        {isVisible ? displayValue : `0${suffix}`}
      </p>
      <p className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">
        {label}
      </p>
    </motion.div>;
};

// Text reveal animation with blur effect from left to right
const BlurRevealText = ({
  children,
  delay = 0
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return <motion.div initial={{
    opacity: 0,
    y: -20,
    filter: "blur(10px)",
    clipPath: "inset(0 100% 0 0)"
  }} whileInView={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0% 0 0)"
  }} transition={{
    duration: 0.8,
    delay,
    ease: [0.25, 0.1, 0.25, 1]
  }} viewport={{
    once: true
  }}>
      {children}
    </motion.div>;
};

const ExperienceSection = () => {
  const stats = [{
    value: 2500,
    suffix: "+",
    label: "Clientes atendidos"
  }, {
    value: 15,
    suffix: "+",
    label: "Anos de experiência"
  }, {
    value: 70,
    suffix: "+",
    label: "Colaboradores"
  }];
  return <section id="quem-somos" className="py-12 lg:py-20 bg-white relative overflow-hidden">
      {/* Minimalist circular arc */}
      <div className="absolute -bottom-[500px] -right-[300px] w-[900px] h-[900px] rounded-full pointer-events-none border border-primary/5" />
      <div className="absolute -bottom-[600px] -right-[350px] w-[1100px] h-[1100px] rounded-full pointer-events-none border border-primary/[0.03]" />
      
      <div className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch">
          {/* Left - Image */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8
        }} viewport={{
          once: true
        }} className="lg:col-span-5 relative px-4 md:px-12 lg:pl-20 lg:pr-0 flex">
            <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl shadow-xl w-full">
              <img src={teamOfficePhoto} alt="Escritório RFeitosa Advogados" className="w-full h-full min-h-[350px] md:min-h-[480px] object-cover object-right" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
              
            </div>
          </motion.div>

          {/* Right - Content */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col justify-between px-4 md:px-12 lg:px-0 lg:pr-16">
            <BlurRevealText delay={0.1}>
              <h2 className="text-2xl md:text-3xl lg:text-[2.5rem] leading-[1.4] mb-6 font-sans tracking-tight">
                <span className="text-black block mb-3 font-light text-3xl md:text-5xl">Nossa História</span>
                <span className="font-semibold text-primary text-3xl md:text-5xl">Tradição e Inovação</span>
              </h2>
            </BlurRevealText>

            <div className="flex-1 mb-6">
              <BlurRevealText delay={0.2}>
                <p className="leading-relaxed text-muted text-justify text-base md:text-lg font-normal">O que começou em 25 de abril de 2011, em Sobral/CE, nasceu com um propósito claro: redefinir a advocacia empresarial através da excelência técnica e da prevenção estratégica. Fundado pelo renomado Dr. Roneely Feitosa, o escritório transcendeu as fronteiras regionais para se tornar uma referência nacional em compliance e soluções jurídicas de alto impacto. Nossa força reside na nossa visão multidisciplinar. Não somos apenas advogados; somos um ecossistema de proteção ao seu negócio. Atualmente, contamos com mais de 70 colaboradores, integrando advogados, administradores, médicos, peritos e contadores que atuam em sintonia para prevenir passivos e maximizar a economia da sua empresa. Com sede própria e uma rede de unidades estratégicas, crescemos mantendo a essência que nos trouxe até aqui: o compromisso inegociável com o resultado do cliente.</p>
              </BlurRevealText>
            </div>

            <BlurRevealText delay={0.3}>
              <a href="#contato" className="inline-flex items-center text-primary font-medium border-b border-primary pb-1 w-fit hover:opacity-80 transition-opacity mb-8">
                Mais sobre nossa abordagem
              </a>
            </BlurRevealText>

            {/* Stats Row */}
            <div className="flex justify-between pr-4 lg:pr-8">
              {stats.map((stat, index) => <AnimatedStat key={index} value={stat.value} suffix={stat.suffix} label={stat.label} index={index} />)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ExperienceSection;
