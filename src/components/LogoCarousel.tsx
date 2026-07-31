import { motion } from "framer-motion";
import logoQuick from "@/assets/client-logos/quick.jpg";
import logoDrysteel from "@/assets/client-logos/drysteel.jpg";
import logoFabricio from "@/assets/client-logos/fabricio-capas.jpg";
import logoFamol from "@/assets/client-logos/famol.jpg";
import logoAdConstrutora from "@/assets/client-logos/ad-construtora.jpg";
import logoValmirAndrade from "@/assets/client-logos/valmir-andrade.jpg";
import logoOliveira from "@/assets/client-logos/agropecuaria-oliveira.jpg";
import logoAcoGranja from "@/assets/client-logos/aco-granja.jpg";
import logo3aFrios from "@/assets/client-logos/3a-frios.jpg";
import logoChocobalas from "@/assets/client-logos/chocobalas.jpg";
import logoGelatoGrano from "@/assets/client-logos/gelato-grano.jpg";
import logoPaoMix from "@/assets/client-logos/pao-mix.jpg";
import logoUtilmix from "@/assets/client-logos/utilmix.jpg";
import logoGateway from "@/assets/client-logos/gateway.jpg";
import logoNestleDfa from "@/assets/client-logos/nestle-dfa.jpg";

const clientLogos = [
  { src: logoQuick, alt: "Quick" },
  { src: logoDrysteel, alt: "Drysteel Sistema Construtivo" },
  { src: logoFabricio, alt: "Fabrício Capas Pra Você" },
  { src: logoFamol, alt: "Famol Móveis e Eletros" },
  { src: logoAdConstrutora, alt: "AD Construtora" },
  { src: logoValmirAndrade, alt: "Valmir Andrade Contabilidade" },
  { src: logoOliveira, alt: "Agropecuária Oliveira" },
  { src: logoAcoGranja, alt: "Aço Granja" },
  { src: logo3aFrios, alt: "3A Frios" },
  { src: logoChocobalas, alt: "Varejão Chocobalas" },
  { src: logoGelatoGrano, alt: "Gelato & Grano" },
  { src: logoPaoMix, alt: "Pão Mix" },
  { src: logoUtilmix, alt: "Lojão Utilmix" },
  { src: logoGateway, alt: "Gateway" },
  { src: logoNestleDfa, alt: "Nestlé DFA" },
];

export default function LogoCarousel() {
  return (
    <section className="py-0 bg-white overflow-hidden flex flex-col">
      <div className="relative my-auto">
        {/* Gradient overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-scroll-logos">
          {/* First set */}
          <div className="flex gap-0 px-0 shrink-0 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={`first-${index}`}
className="w-72 h-52 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
          {/* Duplicate set for seamless loop */}
          <div className="flex gap-0 px-0 shrink-0 items-center">
            {clientLogos.map((logo, index) => (
              <motion.div
                key={`second-${index}`}
                className="w-72 h-52 flex items-center justify-center cursor-pointer"
                whileHover={{ scale: 1.06 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="w-full h-full object-contain opacity-60 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
