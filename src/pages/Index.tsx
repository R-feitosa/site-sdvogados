import { Suspense, lazy, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoCarousel from "@/components/LogoCarousel";

/**
 * Only the header, hero and logo strip are part of the first paint. Everything
 * below the fold is split into its own chunk so the initial bundle stays small
 * and the main thread is not busy mounting sections the user cannot see yet.
 */
const InsightSection = lazy(() => import("@/components/InsightSection"));
const PracticeAreas = lazy(() => import("@/components/PracticeAreas"));
const Partners = lazy(() => import("@/components/Partners"));
const Awards = lazy(() => import("@/components/Awards"));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection"));
const MissionValues = lazy(() => import("@/components/MissionValues"));
const RFGroupEcosystem = lazy(() => import("@/components/RFGroupEcosystem"));
const Contact = lazy(() => import("@/components/Contact"));
const Footer = lazy(() => import("@/components/Footer"));

/** Reserves vertical space while a chunk loads so the page never jumps. */
const SectionFallback = () => <div className="min-h-[60vh]" aria-hidden="true" />;

const Index = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    // The target may live in a lazily loaded chunk, so poll briefly for it.
    let attempts = 0;
    const timer = window.setInterval(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.clearInterval(timer);
      } else if (++attempts > 20) {
        window.clearInterval(timer);
      }
    }, 100);
    return () => window.clearInterval(timer);
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
          <Suspense fallback={<SectionFallback />}>
            <div className="section-defer">
              <InsightSection />
            </div>
            {/* PracticeAreas drives its own sticky scroll, so it must not be
                inside a content-visibility container. Neither may the sections
                the header's scroll-spy observes (#socios, #quem-somos): skipped
                content has no layout box for IntersectionObserver to report. */}
            <PracticeAreas />
            <Partners />
            <div className="section-defer">
              <Awards />
            </div>
            <ExperienceSection />
            <div className="section-defer">
              <MissionValues />
            </div>
            <div className="section-defer">
              <RFGroupEcosystem />
            </div>
            <Contact />
          </Suspense>
        </main>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
};

export default Index;
