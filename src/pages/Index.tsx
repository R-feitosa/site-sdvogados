import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import InsightSection from "@/components/InsightSection";
import LogoCarousel from "@/components/LogoCarousel";

import ExperienceSection from "@/components/ExperienceSection";
import PracticeAreas from "@/components/PracticeAreas";
import MissionValues from "@/components/MissionValues";
import VideoSection from "@/components/VideoSection";
import Partners from "@/components/Partners";
import Awards from "@/components/Awards";
import RFGroupEcosystem from "@/components/RFGroupEcosystem";

import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  return (
    <>
      <Helmet>
        <title>Rfeitosa Advogados Associados | Excelência Jurídica em São Paulo</title>
        <meta
          name="description"
          content="Escritório de advocacia especializado em Direito Empresarial, Civil, Tributário e Trabalhista. Mais de 25 anos de experiência oferecendo soluções jurídicas personalizadas."
        />
        <meta
          name="keywords"
          content="advogado empresarial São Paulo, direito tributário, assessoria jurídica, advocacia corporativa, Rfeitosa"
        />
        <link rel="canonical" href="https://rfeitosa.com.br" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <Hero />
          <LogoCarousel />
          <InsightSection />
          <PracticeAreas />
          <Partners />
          <Awards />
          <ExperienceSection />
          <MissionValues />
          <RFGroupEcosystem />
          
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
