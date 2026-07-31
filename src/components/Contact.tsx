import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import LazyVideoBackground from "@/components/LazyVideoBackground";
import rfeitosaVideo from "@/assets/rfeitosa-video-2.mp4";
import contactPoster from "@/assets/office-facade.jpg";

const contactInfo = [
  {
    icon: Phone,
    title: "Telefone",
    value: "(88) 9 8844-1638",
    href: "tel:+5588988441638",
  },
  {
    icon: Mail,
    title: "E-mail",
    value: "contato@rfeitosa.com.br",
    href: "mailto:contato@rfeitosa.com.br",
  },
  {
    icon: MapPin,
    title: "Sede",
    value: "Rua Rita Marina Morais de Aquino, N35 - Sobral, CE",
    href: "https://maps.google.com/?q=Rua+Rita+Marina+Morais+de+Aquino+35+Sobral+CE",
  },
  {
    icon: Clock,
    title: "Horário de Atendimento",
    value: "Seg - Sex: 8h às 18h",
    href: null,
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });

    setFormData({ name: "", email: "", phone: "", message: "" });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const openWhatsApp = () => {
    window.open(
      "https://wa.me/5588988441638?text=Olá! Gostaria de agendar uma consulta.",
      "_blank"
    );
  };

  return (
    <section id="contato" className="py-20 relative overflow-hidden">
      {/* Video Background — poster first, video only once the section is near */}
      <LazyVideoBackground
        src={rfeitosaVideo}
        poster={contactPoster}
        className="absolute inset-0 z-0"
      />
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 z-[1] bg-black/75" />

      <div className="section-container relative z-10">
        {/* Header - Title left, description right */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-light text-white leading-tight"
          >
            Entre em <span className="font-semibold">Contato</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-lg text-white/80 text-lg"
          >
            Estamos prontos para atender sua demanda jurídica. Agende uma consulta ou envie sua mensagem.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-stretch">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="surface-frost-dark rounded-2xl p-8 text-white h-full flex flex-col">
              <h3 className="font-display text-2xl font-semibold mb-6 text-white">
                Informações de Contato
              </h3>

              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-primary/30" style={{ background: 'linear-gradient(135deg, hsl(0 75% 10%), hsl(0 65% 18%), hsl(0 75% 14%))' }}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/60 mb-1">
                        {item.title}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-white hover:text-primary-foreground transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-auto pt-8 border-t border-white/10">
                <p className="text-sm text-white/60 mb-4">
                  Prefere atendimento rápido?
                </p>
                <Button
                  variant="whatsapp"
                  size="lg"
                  className="w-full"
                  onClick={openWhatsApp}
                >
                  <MessageCircle className="w-5 h-5" />
                  Falar via WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            <div className="surface-frost-dark rounded-2xl p-8">
              <h3 className="font-display text-2xl font-semibold text-white mb-2">
                Envie sua Mensagem
              </h3>
              <p className="text-white/60 mb-8">
                Preencha o formulário abaixo e retornaremos em até 24 horas.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      Nome Completo
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Seu nome"
                      required
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-white mb-2"
                    >
                      E-mail
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="seu@email.com"
                      required
                      className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Telefone
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(11) 99999-9999"
                    className="h-12 bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-white mb-2"
                  >
                    Mensagem
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Descreva brevemente sua demanda jurídica..."
                    rows={5}
                    required
                    className="resize-none bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-white/40 focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                  />
                </div>

                <Button
                  type="submit"
                  size="xl"
                  className="w-full text-white border-0"
                  style={{ background: 'linear-gradient(135deg, hsl(0 75% 10%), hsl(0 65% 18%), hsl(0 75% 14%))' }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Enviando..."
                  ) : (
                    <>
                      Enviar Mensagem
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}