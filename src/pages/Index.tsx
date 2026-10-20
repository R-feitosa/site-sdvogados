import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Preloader from "@/components/Preloader";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlassCursor from "@/components/fx/GlassCursor";
import { Ambient, ScrollProgress, SectionRail, WhatsAppFab } from "@/components/Chrome";
import Hero from "@/components/sections/Hero";
import Clients from "@/components/sections/Clients";
import Performance from "@/components/sections/Performance";
import PracticeAreas from "@/components/sections/PracticeAreas";
import Partners from "@/components/sections/Partners";
import Awards from "@/components/sections/Awards";
import Story from "@/components/sections/Story";
import Principles from "@/components/sections/Principles";
import Ecosystem from "@/components/sections/Ecosystem";
import Contact from "@/components/sections/Contact";
import { useSite } from "@/providers/SiteProvider";
import { COMPLIANCE } from "@/content/site";

const Index = () => {
  const location = useLocation();
  const { introDone, scrollTo } = useSite();

  // Link direto para uma seção (ex.: /#contato): rola depois da abertura
  useEffect(() => {
    if (!introDone || !location.hash) return;
    const id = location.hash.slice(1);
    const t = window.setTimeout(() => scrollTo(id), 250);
    return () => window.clearTimeout(t);
  }, [introDone, location.hash, scrollTo]);

  return (
    <>
      <Helmet>
        <title>Rfeitosa Advogados Associados | Advocacia empresarial em Sobral/CE</title>
        <meta
          name="description"
          content="Escritório de advocacia empresarial fundado em 2011 em Sobral/CE. Direito Trabalhista, Empresarial, Tributário, Previdenciário, Civil e Administrativo."
        />
        <link rel="canonical" href="https://rfeitosa.com.br/" />
      </Helmet>

      <a
        href="#conteudo"
        className="sr-only z-[400] rounded-full bg-white px-4 py-2 text-[#800020] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>

      <Preloader />
      <Ambient />
      <ScrollProgress />
      <GlassCursor />
      <Header />
      <SectionRail />
      <WhatsAppFab />

      <main id="conteudo" className="noise relative">
        <Hero />
        {COMPLIANCE.showClientLogos && <Clients />}
        <Performance />
        <PracticeAreas />
        <Partners />
        <Awards />
        <Story />
        <Principles />
        <Ecosystem />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default Index;
