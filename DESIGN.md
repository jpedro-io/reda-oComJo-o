# Decisões de direção de arte — Redação com João

Documento de decisão fechado **antes** do visual. Tudo abaixo vale para o site inteiro.

---

## 1. Cores

A paleta foi trocada por decisão do cliente: **seriedade, credibilidade e foco no estudo**. A instrução anterior (azul + menta) está revogada. O que rege a escolha: um azul institucional escuro como cor de estrutura, um neutro quente (papel, areia) para tirar o ar de "painel de TI", e o dourado **só** onde há conquista — nunca como cor de interface comum.

**Dois temas, um conjunto de tokens.** O claro é o padrão; `prefers-color-scheme: dark` troca os valores e nenhum componente precisa saber qual está ativo.

| Papel | Token | Claro | Escuro (chumbo) | Uso |
|---|---|---|---|---|
| Principal | `--marinho` | `#17395C` | `#3E6E9E` | botão primário, barra ativa, estrutura |
| Principal (texto) | `--marinho-txt` | `#1B4B78` | `#A8C9E8` | links e palavras-âncora |
| Apoio frio | `--petroleo` | `#1F5A63` | `#2F7B85` | marcações de vocabulário, "eyebrow" |
| Apoio frio (texto) | `--petroleo-txt` | `#1A5058` | `#7FC6CC` | legendas de seção |
| Conquista | `--dourado` | `#B8891F` | `#D9B75F` | anel da nota, medalha, barra de progresso |
| Conquista (texto) | `--dourado-txt` | `#8A6714` | `#E4C877` | números de nota, "1000 pontos" |
| Neutro quente | `--areia` / `--areia-2` | `#EFE6D6` / `#F7F2E8` | `#2A2B2C` / `#232527` | faixas, blocos de apoio, hover |
| Tinta | `--tinta` | `#132A43` | `#F1EDE4` | texto principal |
| Tinta 2 / 3 | `--tinta-2` / `--tinta-3` | `rgba(19,42,67,.74)` / `.56` | `rgba(241,237,228,.76)` / `.56` | texto secundário, legenda |
| Fundo 0 | `--fundo-0` | `#F6F4EF` | `#14181D` | base da página (cinza-gelo quente) |
| Fundo 1 | `--fundo-1` | `#FFFFFF` | `#1A1F26` | cartões e superfícies |
| Fundo 2 / 3 | `--fundo-2` / `--fundo-3` | `#FBF8F2` / `#EFE6D6` | `#222A33` / `#2A333D` | camadas internas |
| Erro | `--erro` | `#A63A32` | `#F09A92` | nota zero, "impede o 200" |
| Alerta | `--alerta` | `#8A5A0B` | `#E0B661` | atenção, "pesa na nota" |
| Sucesso | `--ok` | `#1F6B50` | `#7FCFB0` | "o que já está certo" |

**Regra de contraste (AA):** texto ≥ 4,5:1 no pior ponto do fundo — inclusive nos tons mais claros do dourado, que por isso tem um token próprio para texto (`--dourado-txt` `#8A6714` em vez de `#B8891F`). Onde há vidro, o painel tem fundo branco a 74% (ou chumbo a 62% no escuro) *antes* do blur — nunca texto direto sobre gradiente claro.

**Vidro por tema:** `--vidro: rgba(255,255,255,.74)` no claro, `rgba(26,31,38,.62)` no escuro; `--borda-vidro` e `--realce-borda` acompanham. Os painéis de vidro são os mesmos quatro de sempre.

**Cor por função, não por gosto:** dourado = conquista; vermelho = risco; azul = estrutura e navegação; areia = apoio neutro. Se um elemento é dourado, ele precisa estar comemorando algo.

## 2. Tipografia — 1 par, justificado

- **Fraunces** (variável, serifada) — display, títulos e o texto das redações.
- **Manrope** (variável, grotesca humanista) — interface, corpo de texto, números.

> **Justificativa:** o site é sobre escrita, então o display é serifado e editorial (Fraunces, com eixo óptico que fecha bem em títulos grandes); a interface é densa em tabelas, filtros e números, onde Manrope ganha por altura-x alta e algarismos tabulares.

Não foram usadas Inter, Geist, Space Grotesk nem Lucide. Fontes **self-hosted** (woff2, subsets latin + latin-ext, 163 KB no total), sem chamada a CDN.

**Ícones:** uma única família própria — traço 1,75 px, grade 24 px, cantos arredondados. São 9 glifos inline (seta, check, alerta, documento, régua, camada, tema, análise, mira). Sem biblioteca de ícones.

## 3. Espaçamento e raio

**Escala de espaçamento** (base 4): `4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112`
→ tokens `--s1` … `--s9`. Nenhum valor fora da escala.

**Lógica de raio** — o raio cresce com a elevação da superfície e nunca coincide com o raio de quem a contém:

| Elevação | Raio | Onde |
|---|---|---|
| 0 — etiqueta/chip | `4px` | chips, tags, badges |
| 1 — controle | `10px` | botões, inputs, selects |
| 2 — conteúdo | `16px` | blocos de texto, itens de lista |
| 3 — superfície de vidro | `22px` | navegação, painel do hero, painel de resultado |
| — pílula | `999px` | filtros e navegação em pílula |

## 4. Movimento — tokens únicos

| Token | Valor | Uso |
|---|---|---|
| `--t-micro` | `150ms` | hover de chip, underline de link |
| `--t-hover` | `220ms` | elevação, borda, foco |
| `--t-entrada` | `600ms` | entrada de seção (fade + 12px de subida) |
| `--t-hero` | `800ms` | primeira dobra, com stagger de 80ms |
| `--e-out` | `cubic-bezier(.22,1,.36,1)` | entradas |
| `--e-inout` | `cubic-bezier(.65,0,.35,1)` | loops do fundo (24s) |
| `--e-toque` | `cubic-bezier(.34,1.56,.64,1)` | confirmação/feedback de clique |

Anima **apenas** `transform`, `opacity` e, em casos isolados, `filter`. Hierarquia: o movimento mais forte está no hero e na seção de correção; o resto entra discreto. Nada de parallax em texto.

**`prefers-reduced-motion`:** desliga o fundo animado, o stagger e as entradas (o conteúdo aparece direto; só o feedback de estado permanece).

## 5. Estrutura — um molde por conteúdo

| Seção | Formato derivado do conteúdo |
|---|---|
| Home | hero assimétrico (texto 7/12 + painel de vidro 5/12) → índice numerado em lista → faixa horizontal das 5 competências |
| Critérios | **régua vertical de níveis**: cada competência tem a escala oficial de **6 níveis** (0 a 200, de 40 em 40), com o descritor da cartilha ao lado do risco e, abaixo dele, o que o avaliador procura no texto |
| Estrutura | **linha do tempo** das 4 partes + trilha horizontal dos 5 elementos da proposta + tabela de conectivos |
| Ler o tema | **acordeão tipográfico**: índice de palavras-comando, cada uma abre com o que pede / armadilha / como fazer |
| Temas | **lista densa** (ano · título · comando · eixo) com filtros em pílula, **textos motivadores** em bloco expansível e repertórios em detalhe próprio |
| Redações analisadas | **crônica com espinha de ano** (número do ano fixo enquanto os textos rolam) e blocos largos |
| Corrigir | **workspace** em duas colunas: proposta + editor à esquerda, painel de resultado em vidro à direita. No celular, a proposta encolhe primeiro e o resultado vem logo abaixo do botão |

## 6. Vidro — só onde tem função

O glassmorphism é usado em **4 superfícies**, e apenas elas:

1. barra de navegação (fixa, sobre o fundo animado);
2. painel do hero;
3. painel de resultado da correção (superfície flutuante sobre o fundo);
4. toast/modal.

Todo o resto é **superfície sólida** com tom da marca. Construção em camadas: `backdrop-filter: blur(20px) saturate(160%)` + fundo semitransparente + borda de 1px com highlight superior e sombra inferior + reflexo interno.

**Requisitos atendidos:**
- O vidro tem **algo interessante atrás**: campo 3D em WebGL com a paleta da marca.
- `@supports not (backdrop-filter: blur(1px))` → fundo sólido `#0B2438`.
- `prefers-reduced-transparency: reduce` → fundo sólido, sem blur.
- Máximo de 3 camadas com blur simultâneas; no celular o fundo vira gradiente CSS, sem canvas.
- No tema claro o vidro é branco translúcido; no escuro, chumbo translúcido — os mesmos quatro lugares, nenhum a mais.
- Refração real com `feDisplacementMap` fica como melhoria progressiva opcional — o fallback é blur simples.

## 7. 3D — decisão de dependência

**Não entra Three.js / React Three Fiber.** O r180 distribui 2,1 MB (`three.module.js` 644 KB + `three.core.js` 1,5 MB); para um fundo decorativo isso é desproporcional e atrapalha o LCP.

**Implementado:** campo de profundidade em WebGL puro (~4 KB), com partículas em três planos de paralaxe e uma luz na cor da marca. Carrega depois do primeiro paint, só em telas ≥ 900 px, com WebGL e sem `reduced-motion`. Fallback: gradiente aurora em CSS (usado no celular, no standalone e em qualquer falha).

**Sobre Framer Motion:** as regras de animação (só `transform`/`opacity`, 150–250 ms em micro-interações, 600–800 ms em entradas, hierarquia e `reduced-motion`) foram implementadas com Web Animations API + tokens de CSS — o site é estático, sem React, e a API nativa cobre o mesmo escopo com 0 KB. Se o projeto migrar para React, o lugar de trocar é `js/motion.js`, mantendo os mesmos tokens.

## 8. Escala de nota — como o número aparece

A nota de cada competência é a da cartilha — **0, 40, 80, 120, 160, 200** — com uma exceção: a **meia-faixa** (20, 60, 100, 140, 180), reservada ao texto que cumpre um nível inteiro, já mostra parte do seguinte e não tem defeito objetivo.

| Onde | O que aparece |
|---|---|
| Critérios | a **régua dos seis níveis** (200 → 0), com o descritor oficial do nível e, abaixo dele, o que o avaliador procura no texto |
| Cartão do relatório | `180` em destaque, com `/200` em corpo menor; `Nível 4–5 de 5 · 180 de 200` quando é meia-faixa (nível `4` quando é cheio); chip dourado explicando a regra |
| Motivos | cartões `IMPEDE O 200` / `PESA NA NOTA` / `OBSERVAÇÃO`. **Só existe meia-faixa quando todos os cartões são observação** — qualquer cartão de gravidade alta ou média devolve a nota ao nível inferior, e o relatório escreve "a meia-faixa não foi aplicada" |
| Próximo passo | `Para subir · 200`, com o descritor oficial do nível seguinte |
| Anel da nota final | 0–1000, com `--pct` animado; a soma usa as notas cheias e as meias-faixas aplicadas |

Hierarquia visual: o **número** é sempre o protagonista; a meia-faixa se identifica por um chip dourado discreto logo abaixo do selo de nível, nunca por cor de alerta.

Regra em um lugar só (`oficializar()`, em `js/engine/texto.js`): nível cheio → a própria nota; meia-faixa autorizada pela competência **e** pelo relatório → a própria nota; nos demais casos → a nota de baixo. `tetoPorAmostra()` corta em 120/160/180 para textos com menos de 150/200/240 palavras.

## 9. Celular — decisões, não sobras

O celular é alvo de projeto. O que muda de fato (≤ 860 px):

| Elemento | Decisão |
|---|---|
| Topo | duas linhas: marca + **CTA "Corrigir" fixo à direita** na primeira; navegação em pílulas roláveis na segunda. O CTA nunca sai da tela |
| Altura do topo | `--topo` sobe para 108 px (96 px abaixo de 430 px) para o conteúdo não ficar sob a barra |
| Alvos de toque | ≥ 44 px em botão, pílula, `summary` e filtro; 40 px é o mínimo absoluto em elementos secundários |
| Espaço | os tokens `--s7/--s8/--s9` encolhem (40/56/72 px), o resto da escala é o mesmo |
| Critérios | a régua de 6 degraus fica em coluna única; o cabeçalho da competência reflui e a nota vai para a linha de baixo |
| Estrutura | linha do tempo com marcador menor; trilha de 5 elementos vira lista vertical; esqueleto de 30 linhas empilha |
| Temas | `ano` fica em coluna estreita, os botões descem para uma linha própria; filtros rolam na horizontal |
| Corrigir | editor acima do relatório; depois de corrigir, `scrollIntoView` leva à nota; o painel de proposta fica recolhido por padrão |
| Redações | crônica sem espinha fixa, nota alinhada à esquerda |
| Hover | `@media (hover: none)` desliga elevações e deslocamentos que só fazem sentido com mouse |

**Testado em** Chromium 390×844 e 360×800, claro e escuro: nenhuma rolagem horizontal em nenhuma das 6 rotas.

## 10. Sombras

Sombra só em quem flutua de verdade: navegação fixa, painel de vidro, toast e o botão primário. Blocos de conteúdo usam **borda** em vez de sombra.
