import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import reel720 from "@/assets/web/video/reel-720.mp4";
import reelPoster from "@/assets/web/video/reel-poster.jpg";
import { CE_PATH, CE_VIEWBOX, UNIT_POS } from "@/content/geo";
import { CONTACT_TOPICS, FIRM, UNITS } from "@/content/site";
import { useSite } from "@/providers/SiteProvider";
import { EASE_GLASS } from "@/lib/motion";
import { LineReveal, FadeIn } from "@/components/fx/Reveal";

/* ------------------------------------------------------------------ */
/* Mapa do Ceará com as unidades                                       */
/* ------------------------------------------------------------------ */
function CearaMap({ active, onSelect }: { active: string; onSelect: (id: string) => void }) {
  return (
    <svg viewBox={CE_VIEWBOX} className="h-full w-full overflow-visible" role="group" aria-label="Unidades no Ceará">
      <path d={CE_PATH} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" strokeLinejoin="round" />
      {UNITS.map((u) => {
        const p = UNIT_POS[u.id];
        const on = u.id === active;
        return (
          <g
            key={u.id}
            onClick={() => onSelect(u.id)}
            className="cursor-pointer"
            role="button"
            tabIndex={-1}
            aria-label={u.city}
          >
            <circle cx={p.x} cy={p.y} r="5" fill="transparent" />
            {on && (
              <circle cx={p.x} cy={p.y} r="2" fill="none" stroke="#ff2b5c" strokeWidth="0.5">
                <animate attributeName="r" values="2;7" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="1;0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            )}
            <circle cx={p.x} cy={p.y} r={on ? 2 : 1.4} fill={on ? "#ff2b5c" : "#fff"} style={{ transition: "r .3s" }} />
          </g>
        );
      })}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Formulário em etapas                                               */
/* ------------------------------------------------------------------ */
const maskPhone = (v: string) => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 3)} ${d.slice(3, 7)}-${d.slice(7)}`;
};

type FormState = {
  topic: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  unit: string;
  message: string;
  consent: boolean;
};

const EMPTY: FormState = {
  topic: "",
  name: "",
  company: "",
  phone: "",
  email: "",
  unit: "sobral",
  message: "",
  consent: false,
};

const STEPS = ["Assunto", "Seus dados", "Mensagem"];

function ContactForm({ unit, setUnit }: { unit: string; setUnit: (u: string) => void }) {
  const { topic: presetTopic, setTopic } = useSite();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [f, setF] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState<string | null>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // assunto vindo de outro ponto do site (áreas, "Trabalhe conosco")
  useEffect(() => {
    if (!presetTopic) return;
    setF((s) => ({ ...s, topic: presetTopic }));
    setSent(null);
    setDir(-1);
    setStep(0);
    setTopic(null);
  }, [presetTopic, setTopic]);

  useEffect(() => setF((s) => ({ ...s, unit })), [unit]);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setF((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
    if (k === "unit") setUnit(v as string);
  };

  const validate = (s: number) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 0 && !f.topic) e.topic = "Escolha um assunto para continuar.";
    if (s === 1) {
      if (f.name.trim().length < 3) e.name = "Informe seu nome completo.";
      if (f.phone.replace(/\D/g, "").length < 10) e.phone = "Informe um telefone com DDD.";
      if (f.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Confira o e-mail digitado.";
    }
    if (s === 2) {
      if (f.message.trim().length < 10) e.message = "Descreva sua demanda em pelo menos uma frase.";
      if (!f.consent) e.consent = "É preciso autorizar o uso dos dados para o retorno.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validate(step)) return;
    setDir(1);
    setStep((s) => Math.min(2, s + 1));
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(0, s - 1));
  };

  useEffect(() => {
    if (step === 1) window.setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 450);
  }, [step]);

  const topicLabel = CONTACT_TOPICS.find((t) => t.id === f.topic)?.label ?? "";
  const unitData = UNITS.find((u) => u.id === f.unit) ?? UNITS[0];

  const buildText = () =>
    [
      "Olá! Vim pelo site da Rfeitosa Advogados.",
      `*Assunto:* ${topicLabel}`,
      `*Nome:* ${f.name.trim()}`,
      f.company.trim() ? `*Empresa:* ${f.company.trim()}` : "",
      `*Telefone:* ${f.phone}`,
      f.email.trim() ? `*E-mail:* ${f.email.trim()}` : "",
      `*Unidade de preferência:* ${unitData.city}`,
      `*Mensagem:* ${f.message.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate(2)) return;
    const text = buildText();
    const url = `https://wa.me/${FIRM.whatsapp}?text=${encodeURIComponent(text)}`;
    // Integração opcional: defina VITE_FORM_ENDPOINT para também registrar o lead (CRM, planilha, e-mail).
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT as string | undefined;
    if (endpoint) {
      fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, topicLabel, unitCity: unitData.city, origem: "site", enviadoEm: new Date().toISOString() }),
        keepalive: true,
      }).catch(() => undefined);
    }
    window.open(url, "_blank", "noopener");
    setSent(url);
  };

  const reset = () => {
    setF({ ...EMPTY, unit: f.unit });
    setSent(null);
    setStep(0);
  };

  const mailto = `mailto:${FIRM.email}?subject=${encodeURIComponent(`Contato pelo site: ${topicLabel}`)}&body=${encodeURIComponent(
    buildText().replace(/\*/g, ""),
  )}`;

  return (
    <div className="glass rounded-[30px] p-6 md:p-10">
      <div className="relative z-10">
        {sent ? (
          <motion.div
            initial={{ scale: 0.96, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_GLASS }}
            className="flex min-h-[460px] flex-col items-start justify-center"
            role="status"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#800020]">
              <Check className="h-7 w-7" />
            </span>
            <h3 className="display mt-8 text-[clamp(2.2rem,4vw,3.2rem)] font-light leading-none">Mensagem pronta no WhatsApp.</h3>
            <p className="mt-4 max-w-[46ch] text-white/70">
              Abrimos uma conversa com o escritório com todos os dados preenchidos. É só tocar em enviar. Se a janela não
              abriu, use o botão abaixo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={sent} target="_blank" rel="noopener noreferrer" className="btn btn-solid">
                Abrir o WhatsApp
              </a>
              <a href={mailto} className="btn glass btn-glass">
                <span className="relative z-10">Enviar por e-mail</span>
              </a>
            </div>
            <button type="button" onClick={reset} className="mt-8 text-[14px] text-white/60 underline-offset-4 hover:text-white hover:underline">
              Escrever outra mensagem
            </button>
          </motion.div>
        ) : (
          <form onSubmit={submit} noValidate>
            {/* Etapas */}
            <ol className="flex items-center gap-3" aria-label="Etapas do formulário">
              {STEPS.map((s, i) => (
                <li key={s} className="flex flex-1 flex-col gap-2">
                  <span className="h-[3px] overflow-hidden rounded-full bg-white/15">
                    <motion.span
                      className="block h-full origin-left bg-white"
                      animate={{ scaleX: i <= step ? 1 : 0 }}
                      transition={{ duration: 0.6, ease: EASE_GLASS }}
                    />
                  </span>
                  <span className={`text-[12px] md:text-[13px] ${i === step ? "text-white" : "text-white/45"}`}>
                    {i + 1}. {s}
                  </span>
                </li>
              ))}
            </ol>

            <div className="relative mt-8 min-h-[330px] overflow-hidden">
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div
                  key={step}
                  custom={dir}
                  initial={{ x: dir * 60 }}
                  animate={{ x: 0 }}
                  exit={{ x: dir * -60 }}
                  transition={{ duration: 0.45, ease: EASE_GLASS }}
                >
                  {step === 0 && (
                    <fieldset>
                      <legend className="display text-[clamp(1.9rem,3vw,2.6rem)] font-light leading-tight">
                        Como podemos ajudar?
                      </legend>
                      <div className="mt-6 flex flex-wrap gap-2.5">
                        {CONTACT_TOPICS.map((t) => {
                          const on = f.topic === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => set("topic", t.id)}
                              aria-pressed={on}
                              className={`rounded-full px-4 py-2.5 text-[14px] ring-1 transition duration-300 ${
                                on
                                  ? "bg-white text-[#800020] ring-white"
                                  : "bg-white/5 text-white/80 ring-white/20 hover:bg-white/10 hover:text-white"
                              }`}
                            >
                              {t.label}
                            </button>
                          );
                        })}
                      </div>
                      {errors.topic && <p className="mt-4 text-[14px] text-[#ff9db0]">{errors.topic}</p>}
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset className="grid gap-4 sm:grid-cols-2">
                      <legend className="display mb-6 text-[clamp(1.9rem,3vw,2.6rem)] font-light leading-tight">
                        Como falamos com você?
                      </legend>
                      <label className="sm:col-span-2">
                        <span className="mb-2 block text-[14px] text-white/75">Nome completo</span>
                        <input
                          ref={firstFieldRef}
                          className="field"
                          value={f.name}
                          onChange={(e) => set("name", e.target.value)}
                          autoComplete="name"
                          aria-invalid={!!errors.name}
                          placeholder="Seu nome"
                        />
                        {errors.name && <span className="mt-1.5 block text-[13px] text-[#ff9db0]">{errors.name}</span>}
                      </label>
                      <label>
                        <span className="mb-2 block text-[14px] text-white/75">Telefone / WhatsApp</span>
                        <input
                          className="field tabular"
                          value={f.phone}
                          onChange={(e) => set("phone", maskPhone(e.target.value))}
                          inputMode="tel"
                          autoComplete="tel"
                          aria-invalid={!!errors.phone}
                          placeholder="(88) 9 0000-0000"
                        />
                        {errors.phone && <span className="mt-1.5 block text-[13px] text-[#ff9db0]">{errors.phone}</span>}
                      </label>
                      <label>
                        <span className="mb-2 block text-[14px] text-white/75">
                          E-mail <span className="text-white/40">(opcional)</span>
                        </span>
                        <input
                          className="field"
                          type="email"
                          value={f.email}
                          onChange={(e) => set("email", e.target.value)}
                          autoComplete="email"
                          aria-invalid={!!errors.email}
                          placeholder="voce@empresa.com.br"
                        />
                        {errors.email && <span className="mt-1.5 block text-[13px] text-[#ff9db0]">{errors.email}</span>}
                      </label>
                      <label>
                        <span className="mb-2 block text-[14px] text-white/75">
                          Empresa <span className="text-white/40">(opcional)</span>
                        </span>
                        <input
                          className="field"
                          value={f.company}
                          onChange={(e) => set("company", e.target.value)}
                          autoComplete="organization"
                          placeholder="Nome da empresa"
                        />
                      </label>
                      <label>
                        <span className="mb-2 block text-[14px] text-white/75">Unidade de preferência</span>
                        <select className="field appearance-none" value={f.unit} onChange={(e) => set("unit", e.target.value)}>
                          {UNITS.map((u) => (
                            <option key={u.id} value={u.id} className="bg-[#1a070b]">
                              {u.city}
                            </option>
                          ))}
                        </select>
                      </label>
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset>
                      <legend className="display mb-6 text-[clamp(1.9rem,3vw,2.6rem)] font-light leading-tight">
                        Conte um pouco sobre o caso.
                      </legend>
                      <label className="block">
                        <span className="mb-2 block text-[14px] text-white/75">
                          Mensagem sobre <span className="text-white">{topicLabel.toLowerCase()}</span>
                        </span>
                        <textarea
                          className="field"
                          rows={6}
                          value={f.message}
                          onChange={(e) => set("message", e.target.value)}
                          aria-invalid={!!errors.message}
                          placeholder="Descreva brevemente sua demanda. Não inclua documentos ou dados sensíveis neste primeiro contato."
                        />
                        {errors.message && <span className="mt-1.5 block text-[13px] text-[#ff9db0]">{errors.message}</span>}
                      </label>
                      <label className="mt-5 flex cursor-pointer items-start gap-3">
                        <input
                          type="checkbox"
                          checked={f.consent}
                          onChange={(e) => set("consent", e.target.checked)}
                          className="peer sr-only"
                        />
                        <span
                          aria-hidden
                          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md ring-1 transition peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white ${
                            f.consent ? "bg-white text-[#800020] ring-white" : "ring-white/40"
                          }`}
                        >
                          {f.consent && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className="text-[13px] leading-relaxed text-white/65">
                          Autorizo o uso destes dados exclusivamente para o retorno deste contato, nos termos da Lei
                          Geral de Proteção de Dados (Lei nº 13.709/2018).
                        </span>
                      </label>
                      {errors.consent && <p className="mt-2 text-[13px] text-[#ff9db0]">{errors.consent}</p>}
                    </fieldset>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-6">
              {step > 0 ? (
                <button type="button" onClick={back} className="flex items-center gap-2 text-[14px] text-white/70 hover:text-white">
                  <ArrowLeft className="h-4 w-4" /> Voltar
                </button>
              ) : (
                <span className="text-[13px] text-white/45">Resposta em até 24 horas úteis</span>
              )}
              {step < 2 ? (
                <button type="button" onClick={next} className="btn btn-solid">
                  Continuar
                </button>
              ) : (
                <button type="submit" className="btn btn-solid">
                  <MessageCircle className="h-4 w-4" />
                  Enviar pelo WhatsApp
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function Contact() {
  const [unit, setUnit] = useState("sobral");
  const videoRef = useRef<HTMLVideoElement>(null);
  const u = UNITS.find((x) => x.id === unit) ?? UNITS[0];

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => undefined) : v.pause()), {
      threshold: 0.05,
    });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <section id="contato" className="relative overflow-hidden py-20 md:py-28" aria-label="Contato">
      <video
        ref={videoRef}
        src={reel720}
        poster={reelPoster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[#0c0406]/80" />
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_80%_20%,rgba(128,0,32,.45),transparent)]" />

      <div className="shell relative grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <LineReveal lines={["Entre em", "contato."]} className="display text-[clamp(2.8rem,6vw,5.8rem)] font-light" />
          <FadeIn delay={0.1}>
            <p className="lede mt-6">
              Estamos prontos para atender sua demanda jurídica. Escolha a unidade mais próxima ou envie sua mensagem.
            </p>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-10">
            <div className="glass glass-soft rounded-[26px] p-5 md:p-6">
              <div className="relative z-10 grid grid-cols-[96px_1fr] gap-5 md:grid-cols-[120px_1fr]">
                <div className="h-[118px] md:h-[150px]">
                  <CearaMap active={unit} onSelect={setUnit} />
                </div>
                <div>
                  <div role="tablist" aria-label="Unidades" className="flex flex-wrap gap-1.5">
                    {UNITS.map((x) => (
                      <button
                        key={x.id}
                        role="tab"
                        type="button"
                        aria-selected={x.id === unit}
                        onClick={() => setUnit(x.id)}
                        className={`rounded-full px-3 py-1.5 text-[12px] ring-1 transition md:text-[13px] ${
                          x.id === unit ? "bg-white text-[#800020] ring-white" : "text-white/70 ring-white/20 hover:text-white"
                        }`}
                      >
                        {x.id === "jijoca" ? "Jijoca" : x.city}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={u.id}
                      role="tabpanel"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.35 }}
                      className="mt-4 space-y-2 text-[14px]"
                    >
                      <p className="display text-[1.6rem] leading-none">
                        {u.city}
                        {u.tag && <span className="ml-2 align-middle font-sans text-[12px] text-white/55">{u.tag}</span>}
                      </p>
                      <a href={`tel:${u.tel}`} className="flex items-center gap-2 text-white/85 hover:text-white">
                        <Phone className="h-3.5 w-3.5" /> {u.phone}
                      </a>
                      <a
                        href={u.maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 text-white/70 hover:text-white"
                      >
                        <MapPin className="mt-1 h-3.5 w-3.5 shrink-0" /> {u.address}
                      </a>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="mt-6 grid gap-3 text-[15px] text-white/75 sm:grid-cols-2">
            <a href={`mailto:${FIRM.email}`} className="flex items-center gap-3 hover:text-white">
              <Mail className="h-4 w-4" /> {FIRM.email}
            </a>
            <p className="flex items-center gap-3">
              <Clock className="h-4 w-4" /> {FIRM.hours}
            </p>
          </div>
        </div>

        <FadeIn className="lg:col-span-7" delay={0.1}>
          <ContactForm unit={unit} setUnit={setUnit} />
        </FadeIn>
      </div>
    </section>
  );
}
