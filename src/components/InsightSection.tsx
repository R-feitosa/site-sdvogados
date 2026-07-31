import { motion } from "framer-motion";
import { MapPin, Users } from "lucide-react";
import teamHistoryPhoto from "@/assets/team-history-photo.jpg";

// SVG path representing Brazil's shape with dot pattern
const BrazilMap = () => {
  // Approximate state capital positions (normalized 0-100)
  const statePositions = [{
    x: 28,
    y: 12,
    name: "RR"
  }, {
    x: 18,
    y: 18,
    name: "AM"
  }, {
    x: 10,
    y: 28,
    name: "AC"
  }, {
    x: 22,
    y: 32,
    name: "RO"
  }, {
    x: 35,
    y: 22,
    name: "PA"
  }, {
    x: 18,
    y: 40,
    name: "MT"
  }, {
    x: 48,
    y: 18,
    name: "AP"
  }, {
    x: 55,
    y: 28,
    name: "MA"
  }, {
    x: 65,
    y: 32,
    name: "PI"
  }, {
    x: 75,
    y: 30,
    name: "CE"
  }, {
    x: 82,
    y: 34,
    name: "RN"
  }, {
    x: 84,
    y: 40,
    name: "PB"
  }, {
    x: 86,
    y: 46,
    name: "PE"
  }, {
    x: 80,
    y: 52,
    name: "AL"
  }, {
    x: 78,
    y: 58,
    name: "SE"
  }, {
    x: 72,
    y: 62,
    name: "BA"
  }, {
    x: 38,
    y: 38,
    name: "TO"
  }, {
    x: 45,
    y: 52,
    name: "GO"
  }, {
    x: 52,
    y: 48,
    name: "DF"
  }, {
    x: 38,
    y: 55,
    name: "MS"
  }, {
    x: 55,
    y: 62,
    name: "MG"
  }, {
    x: 68,
    y: 70,
    name: "ES"
  }, {
    x: 60,
    y: 76,
    name: "RJ"
  }, {
    x: 48,
    y: 78,
    name: "SP"
  }, {
    x: 38,
    y: 82,
    name: "PR"
  }, {
    x: 35,
    y: 90,
    name: "SC"
  }, {
    x: 30,
    y: 96,
    name: "RS"
  }];
  return <div className="relative w-full h-full" style={{
    perspective: "400px"
  }}>
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{
      transform: "rotateX(25deg) rotateY(-15deg)"
    }}>
        <defs>
          <clipPath id="brazilClip">
            <path d="M28,8 Q35,5 45,10 L55,12 Q65,15 75,18 L82,22 Q88,28 90,35 L92,42 Q90,50 88,55 L85,60 Q80,65 75,68 L70,72 Q65,78 60,82 L52,85 Q45,88 38,90 L32,92 Q28,95 25,98 L22,95 Q18,90 20,85 L22,80 Q25,75 30,72 L35,68 Q32,60 28,55 L22,50 Q18,45 15,40 L12,35 Q8,28 10,22 L15,15 Q20,10 28,8 Z" />
          </clipPath>
        </defs>
        
        <g clipPath="url(#brazilClip)">
          {Array.from({
          length: 20
        }).map((_, row) => Array.from({
          length: 20
        }).map((_, col) => <circle key={`${row}-${col}`} cx={col * 5 + 2.5} cy={row * 5 + 2.5} r="1" className="fill-gray-300" />))}
        </g>
        
        {statePositions.map((state, i) => <g key={state.name}>
            <motion.circle initial={{
          scale: 0
        }} whileInView={{
          scale: 1
        }} transition={{
          duration: 0.3,
          delay: 0.02 * i
        }} viewport={{ once: true, amount: 0.15 }} cx={state.x} cy={state.y} r="2.5" className="fill-primary" />
            <motion.circle initial={{
          scale: 0
        }} whileInView={{
          scale: 1
        }} transition={{
          duration: 0.3,
          delay: 0.02 * i
        }} viewport={{ once: true, amount: 0.15 }} cx={state.x} cy={state.y} r="1" className="fill-white" />
          </g>)}
      </svg>
    </div>;
};
const InsightSection = () => {
  return <section className="pt-8 lg:pt-12 pb-12 lg:pb-20 bg-white text-primary">
      <div className="relative z-10">
        {/* Header Row - Title + Card side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 px-6 md:px-12 lg:pl-20 lg:pr-16">
          {/* Left - Title and Description */}
          <div className="lg:col-span-6">
            <h2 className="text-3xl md:text-4xl leading-tight text-secondary lg:text-4xl font-light">Alta Performance</h2>
            <h2 className="text-3xl md:text-4xl text-primary leading-tight font-semibold lg:text-5xl">Inteligência Jurídica Estratégica</h2>
            <p className="mt-6 text-muted text-base font-sans font-medium">
              Mais do que um escritório, somos parceiros estratégicos na defesa dos seus interesses e na construção do seu futuro. Nossa metodologia une conhecimento técnico profundo à visão de resultados.
            </p>
          </div>
          
          {/* Right - Parceiro Estratégico Card */}
          <motion.div initial={{
          opacity: 0,
          x: 30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }} viewport={{ once: true, amount: 0.15 }} className="lg:col-span-6 relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-white via-gray-50/80 to-white border border-gray-200/60 shadow-sm flex flex-col justify-center">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-28 h-28 bg-gradient-to-br from-primary/5 to-transparent rounded-br-full" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-primary/3 to-transparent rounded-tl-full" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                  Parceiro Estratégico
                </h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                Com estrutura robusta e atuação nacional, garantimos a segurança jurídica necessária para proteger seu patrimônio e maximizar seus êxitos, seja para sua empresa ou para você.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-stretch px-6 md:px-12 lg:pl-20 lg:pr-16">
          {/* Left - Image with Stats */}
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.6
        }} viewport={{ once: true, amount: 0.15 }} className="lg:col-span-6 relative h-full">
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl h-full min-h-[400px]">
              <img src={teamHistoryPhoto} alt="Equipe RFeitosa Advogados" className="absolute inset-0 w-full h-full object-cover" />
              
            </div>
          </motion.div>

          {/* Right - Cards */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-4 h-full">
            {/* Card 1 - Presença Nacional */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.1
          }} viewport={{ once: true, amount: 0.15 }} className="relative overflow-hidden rounded-2xl p-5 flex-1 bg-gradient-to-br from-white via-gray-50/80 to-white border border-gray-200/60 shadow-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-primary/3 to-transparent rounded-tr-full" />
              <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-primary/5 rounded-full blur-xl" />
              
              <div className="flex items-center gap-5 relative z-10">
                {/* Left - Text Content */}
                <div className="flex-1">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                    Presença Nacional
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Atuamos em todas as capitais do Brasil, oferecendo suporte jurídico estratégico para empresas em todo o território nacional.
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">27 capitais atendidas</span>
                  </div>
                </div>
                
                {/* Right - Brazil Map */}
                <div className="w-28 md:w-36 h-28 md:h-36 flex-shrink-0">
                  <BrazilMap />
                </div>
              </div>
            </motion.div>

            {/* Card 2 - Crescimento Consistente */}
            <motion.div initial={{
            opacity: 0,
            x: 30
          }} whileInView={{
            opacity: 1,
            x: 0
          }} transition={{
            duration: 0.6,
            delay: 0.2
          }} viewport={{ once: true, amount: 0.15 }} className="relative overflow-hidden rounded-2xl p-6 flex-1 bg-gradient-to-br from-white via-gray-50/80 to-white border border-gray-200/60 shadow-sm">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-primary/5 to-transparent rounded-br-full" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-primary/4 to-transparent rounded-tl-full" />
              <div className="absolute top-1/3 left-1/3 w-20 h-20 bg-primary/3 rounded-full blur-2xl" />
              <div className="absolute bottom-1/4 right-1/4 w-12 h-12 bg-primary/5 rounded-full blur-xl" />
              
              <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 relative z-10">
                Crescimento Consistente
              </h3>
              <p className="text-gray-500 text-sm mb-4 relative z-10">
                Uma abordagem sólida e orientada por resultados, 
                focada em soluções sustentáveis ao longo do tempo.
              </p>
              
              {/* Stair-step Growth Chart */}
              <div className="flex items-end gap-2 h-32 pb-6 relative z-10">
                {[{
                year: "2011",
                height: 20,
                highlight: false
              }, {
                year: "2014",
                height: 35,
                highlight: false
              }, {
                year: "2017",
                height: 50,
                highlight: false
              }, {
                year: "2020",
                height: 65,
                highlight: false
              }, {
                year: "2023",
                height: 85,
                highlight: false
              }, {
                year: "2026",
                height: 100,
                highlight: true
              }].map((bar, i) => <div key={i} className="flex flex-col items-center flex-1 h-full relative">
                    <div className="flex-1 w-full flex items-end">
                      <motion.div initial={{
                    scaleY: 0
                  }} whileInView={{
                    scaleY: 1
                  }} transition={{
                    duration: 0.5,
                    delay: 0.1 * i
                  }} viewport={{ once: true, amount: 0.15 }} className={`w-full rounded-t-md origin-bottom shadow-sm ${bar.highlight ? 'bg-gradient-to-t from-primary to-primary/90' : 'bg-gradient-to-t from-primary/30 to-primary/20'}`} style={{
                    height: `${bar.height}%`
                  }} />
                    </div>
                    <span className={`text-[10px] absolute -bottom-5 whitespace-nowrap font-medium ${bar.highlight ? 'text-primary' : 'text-gray-400'}`}>
                      {bar.year}
                    </span>
                  </div>)}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>;
};
export default InsightSection;