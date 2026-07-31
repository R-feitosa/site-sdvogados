import { Linkedin, Instagram, Mail } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import rfLogoIcon from "@/assets/rf-logo-icon.png";

const socialLinks = [{
  icon: Linkedin,
  href: "https://br.linkedin.com/company/roneelyfeitosaadvogados",
  label: "LinkedIn"
}, {
  icon: Instagram,
  href: "https://www.instagram.com/rfeitosadvogados?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  label: "Instagram"
}, {
  icon: Mail,
  href: "mailto:contato@rfeitosa.com.br",
  label: "Email"
}];

const branches = [
  { name: "Sobral (Sede)", phone: "(88) 9 8844-1638", address: "Rua Rita Marina Morais de Aquino, N35" },
  { name: "Jijoca de Jericoacoara", phone: "(88) 9.9791-3345", address: "Sala 3, 1º andar, Rua 17 de Outubro, 1340, Centro" },
  { name: "Tianguá", phone: "(88) 9.9325-4995", address: "Rua Maestro Quincas Bezerril, 803" },
  { name: "Camocim", phone: "(88) 9.9977-1775", address: "Praça da Rodoviária" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  };

  return <footer className="bg-background border-t border-border/30">
      {/* Main Footer */}
      <div className="section-container py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 md:gap-10">
          {/* Brand */}
          <div className="sm:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                <img src={rfLogoIcon} alt="RF Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h4 className="font-display text-xl font-semibold text-foreground">Rfeitosa</h4>
                <p className="text-xs text-muted-foreground tracking-wider uppercase">
                  Advogados Associados
                </p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Excelência jurídica e compromisso com resultados. 
              Sua confiança é nossa maior responsabilidade.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl glass-button flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300" aria-label={link.label}>
                  <link.icon className="w-5 h-5" />
                </a>)}
            </div>
          </div>

          {/* Branch columns */}
          {branches.map((branch) => (
            <div key={branch.name}>
              <h5 className="font-semibold text-sm md:text-base mb-3 md:mb-4 text-foreground">{branch.name}</h5>
              <ul className="space-y-2 text-xs md:text-sm text-muted-foreground">
                <li>{branch.phone}</li>
                <li>{branch.address}</li>
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/30">
        <div className="section-container py-6">
          <div className="flex justify-center items-center text-xs md:text-sm text-muted-foreground text-center">
            <p>
              © {new Date().getFullYear()} Rfeitosa Advogados Associados. 
              Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>;
}
