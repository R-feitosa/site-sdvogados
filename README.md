# Rfeitosa Advogados Associados — site institucional (v2 "Clareza")

Reconstrução completa do site, mantendo logos, paleta (bordô `#800020`, vinho `#561010`, preto-vinho, branco e prata) e as fotos originais.

## Conceito

**Clareza**: o vidro é a metáfora da transparência jurídica. Cada elemento de vidro funciona como uma lente que revela algo.

- **Hero com lente reveladora**: a foto noturna da sede e a diurna têm o mesmo enquadramento (escala 0,93333 e deslocamento de 94,82 × 55,01 px, calculados por correspondência de pontos SIFT). O cursor vira uma lente de vidro com zoom que mostra a fachada à luz do dia; no celular a lente flutua sozinha e responde ao toque.
- Cursor de vidro, scroll inercial (Lenis), barra de progresso e trilho lateral de seções.
- Áreas de atuação em baralho 3D guiado pelo scroll + painel de detalhes que pré-seleciona a área no formulário.
- Sócios em painéis sanfonados; certificações com brilho holográfico; mapa do Brasil em pontos (geometria real das UFs) com arcos de Sobral até as 27 capitais; manifesto revelado palavra a palavra; vídeo institucional que se expande; órbita interativa do RF Group.
- Formulário em 3 etapas com consentimento LGPD que entrega a mensagem pronta no WhatsApp do escritório.

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Telefones, e-mail, endereços, unidades, sócios, áreas, certificações, princípios, RF Group | `src/content/site.ts` |
| Textos de cada seção | `src/components/sections/*.tsx` |
| Cores, vidro e tipografia | `src/index.css` e `tailwind.config.ts` |
| SEO (título, descrição, dados estruturados) | `index.html` |

Imagens usadas pelo site ficam em `src/assets/web/` (versões WebP otimizadas das fotos originais).
Scripts que geraram esses arquivos: `scripts/optimize_assets.py` e `scripts/build_geo.py`.

## Rodar e publicar

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:8080
npm run build     # gera a pasta dist/ para publicação
npm run preview   # serve a versão de produção localmente
```

`vercel.json` já traz as regras para hospedar na Vercel (rotas da SPA e cache dos arquivos estáticos).

### Registrar os contatos do formulário (opcional)

Por padrão, o formulário abre o WhatsApp do escritório com todos os dados preenchidos.
Para também gravar cada contato num CRM, planilha ou automação, defina a variável de ambiente:

```
VITE_FORM_ENDPOINT=https://seu-endpoint
```

O site enviará um `POST` em JSON com `topic`, `topicLabel`, `name`, `company`, `phone`, `email`, `unit`, `unitCity`, `message`, `consent`, `origem` e `enviadoEm`.

## Acessibilidade e desempenho

- Respeita "reduzir movimento" do sistema (desliga scroll inercial, cursor e animações).
- Navegação por teclado com foco visível, link "Pular para o conteúdo", rótulos ARIA.
- Fontes hospedadas no próprio site (sem Google Fonts: mais rápido e sem repasse do IP do visitante a terceiros).
- Fotos em WebP (ex.: hero de 1,3 MB → 54 KB) e vídeo de fundo de 15 MB → 3,8 MB; vídeos só tocam quando visíveis.
