# CINELANE — landing page

Landing page comercial da **CINELANE — Skill de edição fotográfica para Claude**.

Stack: React 18 · TypeScript · Vite 6 · Tailwind CSS 4 · shadcn/ui (Button, Accordion) · Lucide.

## Rodar localmente

```bash
npm install
npm run dev        # http://localhost:5173
npm run typecheck  # checagem de tipos
npm run build      # gera dist/
npm run preview    # serve o build
```

Copie `.env.example` para `.env.local` e preencha o que já existir. Toda variável é opcional:
sem valor, a página mostra o ponto de integração e não inventa conteúdo.

## Estrutura

```
src/
  config/site.ts            preço, checkout, vídeos, IDs de analytics (lidos do .env)
  content/copy.ts           textos, etapas, FAQ, requisitos, slots de prova real
  lib/
    analytics.ts            GA4 / GTM / Meta Pixel com consentimento (LGPD) + eventos
    checkout.ts             destino único de todos os CTAs + repasse de UTMs
    attribution.ts          captura de utm_*, gclid, fbclid na sessão
  components/
    ui/                     componentes compartilhados (padrão shadcn)
      liquid-sculpture-hero.tsx   escultura de partículas + fallback estático
      liquid-sculpture/engine.ts  motor WebGL (carregado sob demanda)
      video-player.tsx            player 16:9 MP4 / Vimeo / slot pendente
      before-after.tsx            comparador antes/depois acessível
      button.tsx, accordion.tsx, reveal.tsx, logo.tsx
    sections/               as 12 seções, na ordem do briefing
    layout/                 header, footer, CTA fixo mobile, aviso de checkout, consentimento
public/
  termos/, privacidade/     rascunhos jurídicos (revisar antes do lançamento)
```

## Escultura de partículas

O arquivo `liquid-sculpture-hero.tsx` original não estava disponível nesta sessão, então o componente
foi escrito do zero no mesmo caminho (`src/components/ui/liquid-sculpture-hero.tsx`):

- Escultura própria: lente com 7 lâminas de diafragma, barril, elemento frontal e cantos de visor.
- Mover o cursor dissolve a forma em partículas; parado, ela se recompõe suavemente. No toque, um toque dispersa.
- WebGL puro, sem three.js (≈ 4 kB gzip), carregado só quando a seção se aproxima da tela.
- Menos partículas e DPR menor em mobile/dispositivos modestos; pausa fora da tela e com a aba oculta.
- `prefers-reduced-motion`, falta de WebGL ou perda de contexto → fallback SVG estático.

Se quiser usar o seu componente original, substitua o arquivo mantendo a exportação `LiquidSculpture`.

## Eventos de analytics

| Evento | Quando dispara |
| --- | --- |
| `page_view` | após o consentimento |
| `video_start` / `video_progress` | play e marcos de 25/50/75/100% (MP4 e Vimeo) |
| `view_offer` | card de preço 50% visível (uma vez) |
| `initiate_checkout` | clique em qualquer CTA de compra com checkout configurado |
| `purchase` | **nunca automático.** Use `trackPurchase(transactionId)` somente após confirmação real (página de obrigado validada ou, de preferência, webhook da plataforma + API de Conversões / Measurement Protocol) |

Nada é carregado antes do aceite no banner. O banner só aparece se houver ao menos um ID configurado.

## Publicar no Netlify

1. Em [app.netlify.com](https://app.netlify.com): **Add new site → Import an existing project → GitHub** e escolha o repositório `meu-site`.
2. Branch: a branch que você quer publicar. Build command e diretório já vêm do `netlify.toml` (`npm run build` → `dist`).
3. **Site configuration → Environment variables**: cadastre as variáveis do `.env.example` (no mínimo `VITE_SITE_URL` e `VITE_CHECKOUT_URL`).
4. Deploy. Depois de configurar o domínio, atualize `VITE_SITE_URL` e faça novo deploy (canonical, Open Graph e sitemap usam esse valor).

As variáveis `VITE_*` são embutidas no build: toda alteração exige um novo deploy.

## Pendências para o lançamento

Itens que precisam de material real — a página já tem o ponto de integração para cada um:

1. **Checkout** — `VITE_CHECKOUT_URL`. Sem ele, os CTAs mostram "As vendas abrem em breve" e não navegam.
2. **Vídeo principal** — `VITE_HERO_VIDEO_MP4` ou `VITE_HERO_VIDEO_VIMEO_ID` + `VITE_HERO_VIDEO_POSTER` (JPG/WebP 1920×1080, idealmente < 200 kB).
3. **Vídeo de demonstração real** — `VITE_DEMO_VIDEO_*` e as medições reais em `demoMetrics` (`src/content/copy.ts`), marcando cada uma como `medido` ou `estimado`.
4. **Comparações antes/depois** — pares reais em `comparisons` (mesma foto, LUT do próprio fotógrafo, com autorização de uso de imagem).
5. **Depoimentos** — `testimonials`, somente reais e autorizados (a seção fica oculta enquanto vazia).
6. **Requisitos e compatibilidade** — confirmar plano do Claude exigido, sistemas operacionais, formatos de arquivo e LUT testados; ajustar `requirements` e as respostas 2, 4 e 10 do FAQ.
7. **Domínio** — `VITE_SITE_URL`.
8. **Imagem Open Graph** — `public/og-image.jpg` (1200×630) para compartilhamentos.
9. **Analytics** — `VITE_GA4_ID`, `VITE_GTM_ID` e/ou `VITE_META_PIXEL_ID` (use GTM *ou* GA4 direto para não duplicar).
10. **Evento `purchase`** — integrar o webhook da plataforma de pagamento ou uma página de obrigado com validação.
11. **Termos e privacidade** — revisar com assessoria jurídica e preencher os campos entre colchetes; definir licença, reembolso, suporte e atualizações.
12. **Contato** — `VITE_CONTACT_EMAIL`.
