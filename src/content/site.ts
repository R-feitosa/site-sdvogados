import { Scale, Building2, Users, Landmark, ShieldCheck, Briefcase, type LucideIcon } from "lucide-react";

import partnerRoneely from "@/assets/web/partner-roneely.webp";
import partnerTayse from "@/assets/web/partner-tayse.webp";
import partnerFabio from "@/assets/web/partner-fabio.webp";

import awardLaqi from "@/assets/web/awards/latin-american-quality.png";
import awardGptw from "@/assets/web/awards/gptw.png";
import awardIso from "@/assets/web/awards/iso-9001.png";

import grpAdvogados from "@/assets/web/group/rfeitosa-advogados.png";
import grpImoveis from "@/assets/web/group/feitosa-imoveis.png";
import grpEco from "@/assets/web/group/eco-solucoes.png";
import grpValley from "@/assets/web/group/connect-valley.png";
import grpAcademy from "@/assets/web/group/connect-academy.png";

/* --------------------------------------------------------------------------
   Conteúdo central do site. Para editar textos, telefones ou endereços,
   altere apenas este arquivo.
   -------------------------------------------------------------------------- */

export const FIRM = {
  name: "Rfeitosa Advogados Associados",
  founded: "25 de abril de 2011",
  city: "Sobral/CE",
  email: "contato@rfeitosa.com.br",
  phone: "(88) 9 8844-1638",
  phoneHref: "tel:+5588988441638",
  whatsapp: "5588988441638",
  hours: "Segunda a sexta, das 8h às 20h",
  linkedin: "https://br.linkedin.com/company/roneelyfeitosaadvogados",
  instagram: "https://www.instagram.com/rfeitosadvogados",
};

/**
 * Chaves de conformidade com as regras de publicidade da OAB.
 * O conteúdo do site anterior foi mantido (true), mas atenção:
 * - CED (Res. 02/2015), art. 42, IV: vedado "divulgar ou deixar que sejam divulgadas listas de clientes e demandas";
 * - Provimento 205/2021, art. 3º, IV (expressões de autoengrandecimento) e art. 4º, § 2º (menção a resultados).
 * Para ocultar, troque para false: a faixa de logos de clientes e os números de resultado do hero somem do site.
 */
export const COMPLIANCE = {
  showClientLogos: true,
  showResultFigures: true,
};

export const NAV = [
  { id: "inicio", label: "Início" },
  { id: "areas", label: "Áreas de atuação" },
  { id: "socios", label: "Sócios" },
  { id: "sobre", label: "Sobre" },
  { id: "contato", label: "Contato" },
] as const;

/** Seções exibidas no trilho lateral de navegação */
export const RAIL = [
  { id: "inicio", label: "Início" },
  { id: "performance", label: "Alta performance" },
  { id: "areas", label: "Áreas de atuação" },
  { id: "socios", label: "Sócios" },
  { id: "reconhecimento", label: "Reconhecimento" },
  { id: "sobre", label: "Nossa história" },
  { id: "principios", label: "Princípios" },
  { id: "rf-group", label: "RF Group" },
  { id: "contato", label: "Contato" },
] as const;

export const HERO_STATS = [
  { value: 50, prefix: "R$ ", suffix: " mi", decimals: 0, label: "em benefícios gerados", result: true },
  { value: 2500, prefix: "+", suffix: "", decimals: 0, label: "clientes atendidos", result: false },
  { value: 1.6, prefix: "+R$ ", suffix: " bi", decimals: 1, label: "em ativos geridos", result: true },
];

export const STORY_STATS = [
  { value: 2500, suffix: "+", label: "clientes atendidos" },
  { value: 15, suffix: "+", label: "anos de experiência" },
  { value: 70, suffix: "+", label: "colaboradores" },
];

export type PracticeArea = {
  id: string;
  icon: LucideIcon;
  title: string;
  summary: string;
  detail: string;
  items: string[];
};

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: "trabalhista",
    icon: Scale,
    title: "Direito Trabalhista",
    summary: "Defesa e consultoria em relações de trabalho",
    detail:
      "Atuação preventiva e contenciosa ao lado do empregador: reduzimos passivos antes que virem processos e defendemos a empresa quando eles chegam.",
    items: [
      "Defesa da empresa em reclamações trabalhistas",
      "Compliance trabalhista e auditoria de rotinas de DP",
      "Negociações e acordos coletivos",
      "Prevenção de passivos: jornada, terceirização e saúde do trabalhador",
    ],
  },
  {
    id: "empresarial",
    icon: Building2,
    title: "Direito Empresarial",
    summary: "Assessoria jurídica para empresas",
    detail:
      "Estrutura jurídica para crescer com segurança: da constituição da sociedade à sucessão, com contratos que protegem o negócio.",
    items: [
      "Estruturação societária e holdings",
      "Contratos empresariais e acordos de sócios",
      "Governança, sucessão e proteção patrimonial",
      "Reestruturação de empresas e negociação de dívidas",
    ],
  },
  {
    id: "previdenciario",
    icon: Users,
    title: "Direito Previdenciário",
    summary: "Benefícios e aposentadorias",
    detail:
      "Orientação completa para segurados e empresas, com análise técnica do histórico contributivo e acompanhamento até a concessão.",
    items: [
      "Planejamento de aposentadoria",
      "Concessão e revisão de benefícios",
      "Processos administrativos e judiciais junto ao INSS",
      "Contribuições previdenciárias da empresa",
    ],
  },
  {
    id: "tributario",
    icon: Landmark,
    title: "Direito Tributário",
    summary: "Planejamento e economia fiscal",
    detail:
      "Inteligência tributária para pagar o tributo correto: revisamos o passado, organizamos o presente e preparamos a empresa para a Reforma Tributária.",
    items: [
      "Planejamento tributário e escolha de regime",
      "Recuperação de créditos tributários",
      "Defesa em autuações e execuções fiscais",
      "Adequação à Reforma Tributária (CBS e IBS)",
    ],
  },
  {
    id: "civil",
    icon: ShieldCheck,
    title: "Direito Civil",
    summary: "Contratos e responsabilidade civil",
    detail:
      "Segurança nas relações do dia a dia da empresa e da família, com foco em prevenir litígios e resolver com rapidez os que surgirem.",
    items: [
      "Elaboração e revisão de contratos",
      "Responsabilidade civil e indenizações",
      "Cobrança e recuperação de crédito",
      "Questões imobiliárias, sucessões e inventários",
    ],
  },
  {
    id: "administrativo",
    icon: Briefcase,
    title: "Direito Administrativo",
    summary: "Licitações e contratos públicos",
    detail:
      "Assessoria para quem contrata com o poder público e para quem precisa receber dele, do edital ao pagamento.",
    items: [
      "Licitações e contratos administrativos",
      "Defesa em processos administrativos",
      "Reequilíbrio econômico-financeiro de contratos",
      "Execução contra a Fazenda Pública: precatórios e RPV",
    ],
  },
];

export const PARTNERS = [
  {
    name: "Dr. Roneely Feitosa",
    role: "Sócio proprietário",
    title: "Diretor-geral",
    photo: partnerRoneely,
    linkedin: "https://www.linkedin.com/in/roneely-feitosa-76680a87",
  },
  {
    name: "Dra. Tayse Ponte",
    role: "Sócia proprietária",
    title: "Diretora financeira",
    photo: partnerTayse,
    linkedin: "https://www.linkedin.com/in/tayse-feitosa-831243192",
  },
  {
    name: "Dr. Fabio Freitas",
    role: "Sócio",
    title: "Diretor",
    photo: partnerFabio,
    linkedin: "",
  },
];

export const AWARDS = [
  {
    id: "laqi",
    short: "LAQI",
    title: "Latin American Quality Institute",
    text: "Reconhecimento internacional pela excelência em qualidade e inovação nos serviços jurídicos prestados na América Latina.",
    year: "2024",
    logo: awardLaqi,
    wide: true,
  },
  {
    id: "gptw",
    short: "GPTW",
    title: "Great Place to Work",
    text: "Certificação que reconhece o escritório como um excelente ambiente de trabalho, pela cultura organizacional e pelo cuidado com os colaboradores.",
    year: "2024",
    logo: awardGptw,
    wide: false,
  },
  {
    id: "iso",
    short: "ISO 9001",
    title: "ISO 9001",
    text: "Certificação internacional de sistema de gestão da qualidade: processos padronizados e excelência operacional em todos os serviços.",
    year: "2024",
    logo: awardIso,
    wide: false,
  },
];

export const PRINCIPLES = [
  {
    title: "Missão",
    text: "Oferecer soluções jurídicas de excelência, com atendimento personalizado e comprometido com os resultados de nossos clientes.",
  },
  {
    title: "Visão",
    text: "Ser referência em advocacia empresarial no Brasil, reconhecidos pela qualidade, ética e inovação.",
  },
  {
    title: "Valores",
    text: "Ética profissional, transparência, comprometimento e excelência no atendimento.",
  },
  {
    title: "Propósito",
    text: "Transformar a advocacia em ferramenta de desenvolvimento, protegendo direitos e impulsionando crescimento.",
  },
];

export const GROUP = [
  {
    id: "advogados",
    name: "Rfeitosa Advogados",
    logo: grpAdvogados,
    dark: false,
    text: "Advocacia empresarial preventiva e contenciosa: o núcleo jurídico do grupo.",
  },
  {
    id: "imoveis",
    name: "Feitosa Imóveis",
    logo: grpImoveis,
    dark: false,
    text: "Participações e desenvolvimento imobiliário.",
  },
  {
    id: "eco",
    name: "Eco Soluções",
    logo: grpEco,
    dark: false,
    text: "Consultoria empresarial em gestão de pessoas e compliance.",
  },
  {
    id: "valley",
    name: "Connect Valley",
    logo: grpValley,
    dark: true,
    text: "O encontro anual de empreendedores realizado em Sobral.",
  },
  {
    id: "academy",
    name: "Connect Academy",
    logo: grpAcademy,
    dark: true,
    text: "Educação executiva e imersões para empresários.",
  },
];

export type Unit = {
  id: string;
  city: string;
  tag?: string;
  phone: string;
  tel: string;
  whatsapp: string;
  address: string;
  maps: string;
};

export const UNITS: Unit[] = [
  {
    id: "sobral",
    city: "Sobral",
    tag: "Sede",
    phone: "(88) 9 8844-1638",
    tel: "+5588988441638",
    whatsapp: "5588988441638",
    address: "Rua Rita Marina Morais de Aquino, 35",
    maps: "https://maps.google.com/?q=Rua+Rita+Marina+Morais+de+Aquino+35+Sobral+CE",
  },
  {
    id: "jijoca",
    city: "Jijoca de Jericoacoara",
    phone: "(88) 9 9791-3345",
    tel: "+5588997913345",
    whatsapp: "5588997913345",
    address: "Rua 17 de Outubro, 1340, sala 3, 1º andar, Centro",
    maps: "https://maps.google.com/?q=Rua+17+de+Outubro+1340+Jijoca+de+Jericoacoara+CE",
  },
  {
    id: "tiangua",
    city: "Tianguá",
    phone: "(88) 9 9325-4995",
    tel: "+5588993254995",
    whatsapp: "5588993254995",
    address: "Rua Maestro Quincas Bezerril, 803",
    maps: "https://maps.google.com/?q=Rua+Maestro+Quincas+Bezerril+803+Tiangua+CE",
  },
  {
    id: "camocim",
    city: "Camocim",
    phone: "(88) 9 9977-1775",
    tel: "+5588999771775",
    whatsapp: "5588999771775",
    address: "Praça da Rodoviária",
    maps: "https://maps.google.com/?q=Praca+da+Rodoviaria+Camocim+CE",
  },
];

export const CONTACT_TOPICS = [
  ...PRACTICE_AREAS.map((a) => ({ id: a.id, label: a.title })),
  { id: "trabalhe-conosco", label: "Trabalhe conosco" },
  { id: "outro", label: "Outro assunto" },
];
