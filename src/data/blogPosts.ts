import blogTributario from "@/assets/blog/blog-tributario.jpg";
import blogEmpresarial from "@/assets/blog/blog-empresarial.jpg";
import blogInstitucional from "@/assets/blog/blog-institucional.jpg";
import blogTrabalhista from "@/assets/blog/blog-trabalhista.jpg";
import blogDigital from "@/assets/blog/blog-digital.jpg";
import blogEvento from "@/assets/blog/blog-evento.jpg";
import blogImobiliario from "@/assets/blog/blog-imobiliario.jpg";
import blogAmbiental from "@/assets/blog/blog-ambiental.jpg";
import blogFamilia from "@/assets/blog/blog-familia.jpg";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "reforma-tributaria-impacto-empresas",
    title: "Reforma Tributária: como ela impacta diretamente as empresas brasileiras",
    excerpt: "Entenda os principais pontos da reforma tributária e como sua empresa deve se preparar para as mudanças na CBS e no IBS.",
    date: "25 Fev 2026",
    category: "Direito Tributário",
    image: blogTributario,
    content: `A Reforma Tributária aprovada pelo Congresso Nacional representa a maior mudança no sistema de impostos do Brasil em décadas. Para empresas de todos os portes, compreender as alterações é fundamental para manter a competitividade e evitar riscos fiscais.

## O que muda na prática?

A principal alteração é a unificação de cinco tributos — PIS, COFINS, IPI, ICMS e ISS — em dois novos impostos: a Contribuição sobre Bens e Serviços (CBS), de competência federal, e o Imposto sobre Bens e Serviços (IBS), de competência estadual e municipal.

## Período de transição

A transição será gradual, iniciando em 2026 com alíquotas-teste e se estendendo até 2033. Durante esse período, as empresas terão que conviver com dois sistemas tributários simultâneos, o que exige planejamento cuidadoso.

## Impacto nos preços e contratos

Com a mudança para o modelo de IVA (Imposto sobre Valor Agregado), contratos de longo prazo precisam ser revisados para contemplar a nova carga tributária. Empresas do setor de serviços, em especial, devem ficar atentas ao possível aumento da carga.

## Como se preparar

Recomendamos que as empresas realizem simulações de impacto tributário, revisem contratos vigentes, atualizem sistemas de gestão fiscal e busquem assessoria jurídica especializada para navegar com segurança pela transição.`,
  },
  {
    id: 2,
    slug: "reforma-tributaria-setor-servicos",
    title: "Setor de serviços e a Reforma Tributária: riscos e oportunidades",
    excerpt: "Empresas prestadoras de serviços podem enfrentar aumento de carga tributária. Saiba como mitigar riscos e aproveitar oportunidades.",
    date: "18 Fev 2026",
    category: "Direito Tributário",
    image: blogEmpresarial,
    content: `O setor de serviços é um dos mais impactados pela Reforma Tributária. Com a unificação dos tributos e a adoção do modelo de IVA, muitas empresas prestadoras de serviços podem ver sua carga tributária aumentar significativamente.

## Por que o setor de serviços é mais afetado?

Atualmente, empresas de serviços recolhem ISS com alíquotas que variam de 2% a 5%. Com a reforma, a alíquota unificada do IBS + CBS pode chegar a 26,5%, e como o setor de serviços tem menor volume de créditos tributários para compensar, o impacto líquido tende a ser maior.

## Estratégias de mitigação

Existem caminhos legais para reduzir o impacto, como a revisão da estrutura societária, a análise de enquadramento em regimes especiais previstos na reforma e o aproveitamento máximo de créditos tributários na cadeia produtiva.

## Regimes especiais e exceções

A reforma prevê regimes diferenciados para setores como saúde, educação, transporte e tecnologia. Empresas desses segmentos devem avaliar se se enquadram nas exceções para usufruir de alíquotas reduzidas.

## Planejamento é essencial

O momento exige ação preventiva. Empresas que se anteciparem na análise de impacto e no planejamento tributário terão vantagem competitiva durante e após a transição.`,
  },
  {
    id: 3,
    slug: "reforma-tributaria-planejamento-fiscal-2026",
    title: "Planejamento fiscal 2026: adaptando sua empresa à nova realidade tributária",
    excerpt: "Com a reforma em fase de implementação, o planejamento fiscal se torna ferramenta indispensável para a saúde financeira das empresas.",
    date: "10 Fev 2026",
    category: "Direito Tributário",
    image: blogInstitucional,
    content: `Com a Reforma Tributária entrando em fase de implementação em 2026, o planejamento fiscal deixa de ser uma opção e passa a ser uma necessidade estratégica para qualquer empresa que deseja manter sua competitividade.

## O cenário atual

As alíquotas-teste da CBS já começam a vigorar em 2026, exigindo que empresas adaptem seus sistemas de faturamento, precificação e compliance fiscal. A convivência entre o sistema antigo e o novo gera complexidade operacional.

## Revisão de contratos e precificação

Contratos firmados antes da reforma podem gerar prejuízos se não forem revisados. Cláusulas de reajuste tributário devem ser incluídas em novos contratos, e acordos vigentes precisam de análise caso a caso.

## Créditos tributários na nova sistemática

O sistema de créditos amplos do IVA permite que empresas recuperem tributos pagos em etapas anteriores da cadeia. Mapear corretamente esses créditos pode representar economia significativa.

## Compliance e tecnologia

Investir em sistemas de gestão fiscal atualizados e em equipes capacitadas é fundamental. A SEFAZ e a Receita Federal estão implementando novos mecanismos de fiscalização digital que exigem maior precisão nas obrigações acessórias.

## Assessoria jurídica especializada

Contar com advogados tributaristas experientes é o diferencial para atravessar esse período de transição com segurança. Nossa equipe oferece consultoria personalizada para adequar sua empresa à nova realidade fiscal brasileira.`,
  },
  {
    id: 4,
    slug: "reforma-trabalhista-empregadores",
    title: "Reforma trabalhista: o que muda para empregadores",
    excerpt: "Análise detalhada das novas obrigações e direitos nas relações de trabalho após a reforma.",
    date: "10 Jan 2026",
    category: "Direito Trabalhista",
    image: blogTrabalhista,
    content: `A reforma trabalhista trouxe mudanças profundas nas relações de trabalho no Brasil. Para os empregadores, é fundamental compreender as novas regras para garantir conformidade e aproveitar as flexibilidades oferecidas pela legislação.

## Principais alterações

Entre as mudanças mais impactantes estão as novas regras para trabalho remoto e híbrido, a flexibilização da jornada de trabalho, as alterações nas regras de terceirização e as novas modalidades de contratação.

## Trabalho remoto

As novas disposições sobre teletrabalho trazem maior segurança jurídica para empregadores e empregados, definindo claramente responsabilidades sobre equipamentos, custos de infraestrutura e controle de jornada.

## Impacto nos contratos existentes

Contratos de trabalho vigentes devem ser revisados para adequação às novas regras. Recomendamos uma análise criteriosa de cada contrato para identificar cláusulas que precisam ser atualizadas.

## Recomendações práticas

Empregadores devem atualizar políticas internas, revisar contratos de trabalho, capacitar gestores sobre as novas regras e implementar sistemas de controle adequados às exigências legais.`,
  },
  {
    id: 5,
    slug: "lgpd-compliance-desafios-2026",
    title: "LGPD e compliance: desafios para 2026",
    excerpt: "As empresas precisam se adaptar às novas exigências de proteção de dados e governança digital.",
    date: "02 Jan 2026",
    category: "Direito Digital",
    image: blogDigital,
    content: `A Lei Geral de Proteção de Dados (LGPD) continua evoluindo, e 2026 traz novos desafios para as empresas que precisam garantir a conformidade com as exigências de proteção de dados pessoais.

## Novas regulamentações

A ANPD publicou novas resoluções que detalham obrigações específicas para diferentes setores, incluindo requisitos mais rigorosos para relatórios de impacto à proteção de dados e notificação de incidentes de segurança.

## Inteligência artificial e dados

Com o avanço da inteligência artificial, surgem novas questões sobre o uso ético e legal de dados pessoais em algoritmos de decisão automatizada. As empresas precisam implementar mecanismos de transparência e explicabilidade.

## Programa de compliance digital

Um programa robusto de compliance digital deve incluir mapeamento de dados, avaliação de riscos, políticas de privacidade atualizadas, treinamento de colaboradores e mecanismos de resposta a incidentes.

## Como o Rfeitosa pode ajudar

Nossa equipe especializada em Direito Digital oferece consultoria completa para implementação e manutenção de programas de conformidade com a LGPD, adequados à realidade de cada empresa.`,
  },
  {
    id: 6,
    slug: "rfeitosa-premio-inovacao-juridica",
    title: "Rfeitosa conquista prêmio de inovação jurídica",
    excerpt: "Escritório é reconhecido por suas práticas inovadoras em tecnologia aplicada ao direito.",
    date: "20 Dez 2025",
    category: "Institucional",
    image: blogEvento,
    content: `O Rfeitosa Advogados Associados foi reconhecido com o Prêmio de Inovação Jurídica 2025, destacando nossas práticas pioneiras na aplicação de tecnologia ao exercício do direito.

## Sobre o prêmio

O Prêmio de Inovação Jurídica reconhece escritórios que se destacam pela implementação de soluções tecnológicas inovadoras, eficiência operacional e excelência no atendimento ao cliente através da transformação digital.

## Nossas inovações

Entre as práticas reconhecidas estão a implementação de inteligência artificial para análise de jurisprudência, a digitalização completa dos processos internos, o uso de plataformas de colaboração avançadas e o desenvolvimento de ferramentas proprietárias de gestão jurídica.

## Impacto para nossos clientes

A inovação tecnológica se traduz em benefícios diretos para nossos clientes: maior agilidade na resolução de demandas, análises mais precisas e aprofundadas, redução de custos operacionais e comunicação mais eficiente.

## Compromisso com o futuro

Este reconhecimento reforça nosso compromisso contínuo com a inovação e a busca constante por melhores formas de servir nossos clientes. Continuaremos investindo em tecnologia e capacitação para permanecer na vanguarda do setor jurídico.`,
  },
  {
    id: 7,
    slug: "contratos-imobiliarios-cuidados",
    title: "Contratos imobiliários: cuidados essenciais",
    excerpt: "Saiba quais cláusulas são indispensáveis para garantir segurança nas transações imobiliárias.",
    date: "12 Dez 2025",
    category: "Direito Imobiliário",
    image: blogImobiliario,
    content: `Os contratos imobiliários são instrumentos fundamentais para garantir a segurança jurídica nas transações de compra, venda, locação e permuta de imóveis. Conhecer as cláusulas essenciais pode evitar problemas futuros.

## Cláusulas indispensáveis

Todo contrato imobiliário deve conter identificação completa das partes e do imóvel, descrição detalhada do objeto da transação, valor e condições de pagamento, prazos e penalidades, e cláusulas de garantia.

## Due diligence imobiliária

Antes de qualquer transação, é fundamental realizar uma due diligence completa do imóvel, verificando a situação registral, fiscal, ambiental e urbanística. Essa análise prévia pode prevenir surpresas desagradáveis.

## Riscos comuns

Entre os riscos mais frequentes em transações imobiliárias estão vícios ocultos no imóvel, pendências fiscais, restrições ambientais, irregularidades registrais e problemas com direitos de vizinhança.

## Assessoria especializada

Contar com assessoria jurídica especializada em direito imobiliário é essencial para garantir que todos os aspectos legais sejam observados e que seus interesses estejam devidamente protegidos em qualquer transação.`,
  },
  {
    id: 8,
    slug: "licenciamento-ambiental-industrial",
    title: "Licenciamento ambiental e o setor industrial",
    excerpt: "Novas diretrizes ambientais exigem atenção redobrada das indústrias no processo de licenciamento.",
    date: "05 Dez 2025",
    category: "Direito Ambiental",
    image: blogAmbiental,
    content: `O licenciamento ambiental é um instrumento essencial da política ambiental brasileira, e as indústrias precisam estar atentas às constantes atualizações nas normas e procedimentos.

## Novas diretrizes

As recentes alterações na legislação ambiental trouxeram novos requisitos para o licenciamento de atividades industriais, incluindo estudos de impacto mais abrangentes, monitoramento contínuo de emissões e programas de compensação ambiental.

## Processo de licenciamento

O processo de licenciamento envolve três etapas principais: Licença Prévia (LP), Licença de Instalação (LI) e Licença de Operação (LO). Cada etapa exige documentação específica e análise técnica rigorosa.

## Compliance ambiental

As empresas devem implementar programas de compliance ambiental que incluam gestão de resíduos, controle de emissões, uso racional de recursos naturais e programas de educação ambiental.

## Consequências do descumprimento

O descumprimento das normas ambientais pode resultar em multas pesadas, embargo de atividades, responsabilização criminal dos gestores e danos irreparáveis à reputação da empresa.`,
  },
  {
    id: 9,
    slug: "direito-familia-mediacao",
    title: "Direito de família: mediação como alternativa",
    excerpt: "A mediação familiar ganha força como solução mais rápida e menos conflituosa para disputas.",
    date: "28 Nov 2025",
    category: "Direito de Família",
    image: blogFamilia,
    content: `A mediação familiar tem se consolidado como uma alternativa eficaz ao litígio tradicional na resolução de conflitos familiares. Essa abordagem busca o diálogo e o consenso, preservando os relacionamentos.

## O que é mediação familiar?

A mediação é um processo voluntário e confidencial no qual um mediador imparcial auxilia as partes a encontrarem soluções mutuamente satisfatórias para seus conflitos. No contexto familiar, é especialmente valiosa em casos de divórcio, guarda de filhos e partilha de bens.

## Vantagens da mediação

Entre os principais benefícios estão a maior celeridade na resolução, custos reduzidos em comparação ao processo judicial, preservação do relacionamento entre as partes, soluções personalizadas e maior índice de cumprimento dos acordos.

## Quando buscar a mediação

A mediação é indicada sempre que houver disposição das partes para o diálogo. É especialmente recomendada quando há filhos envolvidos, pois preserva a relação entre os genitores e minimiza o impacto emocional sobre as crianças.

## O papel do advogado na mediação

Mesmo na mediação, a presença de um advogado é fundamental para orientar as partes sobre seus direitos, garantir que o acordo seja justo e equilibrado, e formalizar os termos acordados perante o judiciário.`,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
