import type { ComparisonPair } from "@/components/ui/before-after";

/**
 * Page copy and launch content. Arrays left empty on purpose render honest
 * "to be provided" slots (or nothing, for social proof) — fill them with real material only.
 */

export const cta = {
  automate: "Quero automatizar minhas fotos",
  mySkill: "Quero minha Skill para Claude",
  install: "Quero instalar no meu Claude",
} as const;

export const pipelineSteps = [
  {
    n: "01",
    title: "Análise inteligente",
    body: "Identifica os arquivos, formatos, dimensões e informações técnicas disponíveis.",
  },
  {
    n: "02",
    title: "Seleção das melhores",
    body: "Compara imagens semelhantes para identificar duplicatas e ajudar a escolher as melhores fotografias.",
  },
  {
    n: "03",
    title: "Correção técnica",
    body: "Analisa iluminação, exposição, sombras e altas luzes para realizar ajustes compatíveis com o tratamento escolhido.",
  },
  {
    n: "04",
    title: "Seu próprio LUT",
    body: "Aplica o LUT fornecido pelo fotógrafo, considerando suas especificações de entrada e saída.",
  },
  {
    n: "05",
    title: "Conferência automatizada",
    body: "Verifica problemas técnicos e sinaliza imagens que precisam de revisão.",
  },
  {
    n: "06",
    title: "Exportação em alta resolução",
    body: "Organiza e exporta as fotografias selecionadas, preservando os arquivos originais.",
  },
] as const;

/** Real before/after pairs only (same photo, the photographer's own LUT). */
export const comparisons: ComparisonPair[] = [];

export type DemoMetric = { label: string; value: string; kind: "medido" | "estimado"; note?: string };
/** Fill after recording the real demo: file count, measured time, selection, hardware. */
export const demoMetrics: DemoMetric[] = [];

export type Testimonial = { quote: string; name: string; role: string; city?: string; photo?: string };
/** Real, authorised testimonials only. The proof section stays hidden while empty. */
export const testimonials: Testimonial[] = [];

export const included = [
  { title: "CINELANE Skill para Claude", body: "A Skill estruturada que orienta o Claude em todo o fluxo de trabalho." },
  { title: "Scripts de automação fotográfica", body: "As ferramentas que executam o processamento sobre seus arquivos." },
  { title: "Seleção automatizada", body: "Agrupamento de semelhantes e apoio na escolha das melhores." },
  { title: "Correções técnicas", body: "Ajustes de exposição, sombras e altas luzes antes do seu tratamento." },
  { title: "Aplicação de LUTs próprios", body: "Seu LUT aplicado considerando entrada e saída de cor." },
  { title: "Organização e exportação", body: "Pastas organizadas e exportação em alta resolução." },
  { title: "Guia de utilização", body: "Referência escrita dos comandos, opções e boas práticas." },
] as const;

export const installVideo = {
  title: "Tutorial completo de instalação em vídeo",
  body: "Do zero ao primeiro lote processado, passo a passo. Pensado para quem nunca programou — você acompanha a tela e repete.",
  extra: "Inclui também um vídeo explicativo do primeiro uso.",
};

/** Usage requirements shown under the offer. Confirm each item before launch. */
export const requirements = [
  "Conta no Claude com plano e configuração compatíveis com Skills e execução de scripts (cobrada à parte pela Anthropic).",
  "Computador com acesso à pasta das suas fotografias.",
  "Seu próprio LUT, se quiser aplicá-lo — a CINELANE não inclui LUTs.",
  "Formatos de arquivo e sistemas compatíveis detalhados no guia de instalação.",
] as const;

export const faq = [
  {
    q: "O que exatamente estou comprando?",
    a: "Uma Skill para Claude com os scripts de automação que ela coordena: análise dos arquivos, seleção de semelhantes, correção técnica, aplicação do seu LUT, conferência e exportação organizada. Junto vêm o tutorial de instalação em vídeo, o vídeo do primeiro uso e o guia de utilização. LUTs e a assinatura do Claude não estão incluídos.",
  },
  {
    q: "A CINELANE funciona dentro do Claude?",
    a: "Sim. Você instala a Skill no seu ambiente Claude compatível e inicia a automação com um comando. O Claude coordena o processo e os scripts executam o processamento sobre os arquivos do seu computador.",
  },
  {
    q: "Preciso saber programar?",
    a: "Não. A instalação é demonstrada em vídeo, passo a passo, e o uso acontece por meio de comandos simples em português. Você aponta a pasta das fotos, informa seu LUT (se quiser) e inicia.",
  },
  {
    q: "Preciso ter uma assinatura do Claude?",
    a: "Sim. O Claude não está incluído na compra. O uso de Skills e a execução de scripts podem exigir um plano pago e uma configuração compatível, conforme as condições definidas pela Anthropic. Os requisitos são informados antes da compra e no material de instalação.",
  },
  {
    q: "A Skill inclui LUTs?",
    a: "Não. A CINELANE não vende LUTs. A proposta é justamente trabalhar com o LUT que você já usa e que define o seu estilo.",
  },
  {
    q: "Posso utilizar meus próprios LUTs?",
    a: "Sim — esse é o centro da proposta. A Skill aplica o LUT que você fornecer, considerando as especificações de entrada e saída de cor desse LUT.",
  },
  {
    q: "Minha identidade de cores será preservada?",
    a: "A CINELANE foi desenvolvida para usar o seu tratamento de cor, sem impor uma nova estética. O compromisso técnico é aplicar seu LUT no espaço de cor adequado. Como o resultado também depende dos arquivos, da exposição original e do próprio LUT, recomendamos validar com um lote de teste e revisar as imagens antes de entregar.",
  },
  {
    q: "A CINELANE gera fotografias artificiais?",
    a: "Não. A CINELANE não usa geração de imagens para recriar rostos, pessoas ou cenas. Ela executa processamento técnico sobre as suas fotografias reais e preserva os arquivos originais.",
  },
  {
    q: "Posso utilizar em casamentos e eventos?",
    a: "Sim. Ela foi pensada para quem trabalha com grandes volumes, como casamentos, aniversários e eventos corporativos — inclusive para prévias e entregas expressas durante o evento. A velocidade depende do seu computador, da quantidade e do tamanho dos arquivos e do tempo de conferência.",
  },
  {
    q: "Quais formatos e câmeras são compatíveis?",
    a: "A lista de formatos validados é informada no guia de instalação. Não declaramos compatibilidade com câmeras ou formatos que ainda não foram testados. Antes de usar em um trabalho, recomendamos processar um lote de teste com os seus próprios arquivos.",
  },
  {
    q: "Existe mensalidade?",
    a: "Não há mensalidade da CINELANE. O pagamento é único e você pode reutilizar a versão adquirida, conforme as condições de licença. A assinatura do Claude, quando necessária, é cobrada separadamente pela Anthropic.",
  },
  {
    q: "Como recebo e instalo a Skill?",
    a: "Após a confirmação do pagamento, o acesso digital é liberado com os arquivos da Skill, o tutorial de instalação em vídeo, o vídeo do primeiro uso e o guia de utilização. É só seguir o vídeo.",
  },
] as const;
