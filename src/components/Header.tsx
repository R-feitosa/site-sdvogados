import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import logoHeader from "@/assets/logo-header.png";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Área de Atuação", href: "#areas" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 pt-6 pb-4 md:py-6 lg:py-8">
        <div className="px-5 md:px-8 lg:px-14">
          <nav className="flex items-center justify-between">
            {/* Logo - Left */}
            <a
              href="#inicio"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("#inicio");
              }}
              className="flex items-center group z-10"
            >
              <img 
                src={logoHeader} 
                alt="Rfeitosa Advogados Associados" 
                className="h-10 md:h-[56px] w-auto transition-all duration-300 group-hover:opacity-80"
              />
            </a>

            {/* Desktop Navigation - Centered White Nav */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
              <div 
                className="relative flex items-center py-2 xl:py-3 rounded-full bg-white shadow-md"
                style={{
                  paddingLeft: '16px',
                  paddingRight: '16px',
                  gap: '2px',
                }}
              >
                {navLinks.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="relative font-medium transition-all whitespace-nowrap text-xs xl:text-sm group px-3 xl:px-4 py-1.5 xl:py-2 rounded-full"
                    style={{ color: '#800020' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#800020';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#800020';
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Right side - Trabalhe Conosco button (same size as menu) */}
            <div className="hidden lg:flex z-10">
              <div 
                className="relative flex items-center py-2 xl:py-3 rounded-full bg-white shadow-md"
                style={{
                  paddingLeft: '16px',
                  paddingRight: '16px',
                }}
              >
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("#contato");
                  }}
                  className="relative font-medium transition-all whitespace-nowrap text-xs xl:text-sm px-3 xl:px-4 py-1.5 xl:py-2 rounded-full"
                  style={{ color: '#800020' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#800020';
                    e.currentTarget.style.color = '#ffffff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#800020';
                  }}
                >
                  Trabalhe Conosco
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center z-[60]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5 text-primary" /> : <Menu className="w-5 h-5 text-primary" />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-50 bg-white"
            >
              <div className="flex flex-col h-full px-6 pt-20 pb-10">
                <div className="flex-1 flex flex-col justify-center space-y-2">
                  {navLinks.map((link, index) => (
                    <motion.a
                      key={link.href + link.label}
                      href={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.08 }}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="block py-4 text-2xl font-medium text-gray-900 hover:text-primary transition-colors border-b border-gray-100"
                    >
                      {link.label}
                    </motion.a>
                  ))}
                  <motion.a
                    href="#contato"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navLinks.length * 0.08 }}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection("#contato");
                    }}
                    className="block py-4 text-2xl font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Trabalhe Conosco
                  </motion.a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
