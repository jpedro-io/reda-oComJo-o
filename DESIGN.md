# Decisões de direção de arte — Redação com João

Documento de decisão fechado **antes** do visual. Tudo abaixo vale para o site inteiro.

---

## 1. Cores

Paleta refeita por decisão do cliente: **fundo branco, azul royal nos botões e barras, títulos em branco e preto, liquid glass**. A instrução anterior (marinho + areia + dourado, com tema escuro) está revogada — inclusive o dourado, que era cor de "conquista".

**Um tema só.** O site é branco. `prefers-color-scheme: dark` foi removido do CSS, do `index.html` e do `js/bg.js`: fundo branco aqui é decisão de marca, não preferência do sistema. Manter um tema escuro "de cortesia" obrigaria a manter duas paletas para sempre e a testar tudo duas vezes.

| Papel | Token | Valor | Uso |
|---|---|---|---|
| Esmeralda | `--azul` | `#026842` | botão primário, barra, trilho da nota, faixa de seção |
| Royal (texto) | `--azul-txt` | `#14309B` | links e palavras-âncora sobre branco (AA) |
| Royal realce | `--azul-alto` | `#2F55F0` | topo do gradiente dos botões, hover |
| Véu azul | `--azul-fundo` | `#E9EEFF` | chips, badges, blocos de apoio |
| Tinta | `--tinta` | `#080D1C` | texto principal e **títulos sobre o branco** |
| Tinta 2 / 3 | `--tinta-2` / `--tinta-3` | `rgba(8,13,28,.76)` / `.54` | texto secundário, legenda |
| Fundo | `--fundo-0` / `--fundo-1` | `#FFFFFF` / `#FFFFFF` | base e superfícies |
| Apoio | `--fundo-2` / `--fundo-3` | `#F7F9FF` / `#EDF1FF` | camadas internas, tabelas, hover |
| Erro | `--erro` | `#B3261E` | nota zero, "impede o 200" |
| Alerta | `--alerta` | `#8A5A0B` | atenção, "pesa na nota" |
| Sucesso | `--ok` | `#0A7A55` | "o que já está certo" |

**Onde o título é branco.** Em duas superfícies, e só nelas: a faixa do hero da home e a faixa de abertura de cada página (`.secao-topo`), ambas em gradiente royal `#2B4FEC → #1A3EC8 → #102A96` com brilho radial no canto. Fora da faixa, todo título é preto sobre branco. Isso dá o contraste preto/branco pedido sem inverter a página inteira: a mancha azul fica concentrada no alto, e o conteúdo respira em fundo branco.

**Contraste (AA):** texto ≥ 4,5:1 no pior ponto do fundo, incluindo o branco sobre a faixa azul (13:1 no trecho escuro, 7:1 no mais claro) e o `--azul-txt` sobre branco (9:1). Onde há vidro, existe véu branco antes do desfoque — nunca texto direto sobre gradiente.

**Cor por função:** azul = estrutura, ação e nota; vermelho = risco; verde = acerto; véu azul claro = apoio. Não existe cor decorativa.

## 1b. Vidro líquido — o material do site

Não é "caixa com transparência": são **três camadas** obrigatórias, sempre nesta ordem.

| # | Camada | Implementação |
|---|---|---|
| 1 | Véu translúcido | `--vidro: rgba(255,255,255,.58)` (`.82` quando o conteúdo exige leitura densa) |
| 2 | Desfoque que carrega a cor de trás | `backdrop-filter: blur(26px) saturate(190%)` |
| 3 | Realce especular | `inset 0 1px 0 rgba(255,255,255,.9)` em cima, `inset 0 -1px 0 rgba(8,13,28,.04)` embaixo, mais `--sombra-flut` azulada |

Sobre as **faixas azuis** o vidro se inverte: véu branco a 12–16%, borda a 34%, realce claro — é o painel "Como a nota se forma" do hero. Nos **botões primários**, um pseudo-elemento `::after` desenha a faixa de luz do topo, como reflexo em superfície curva.

Requisitos que continuam valendo: algo interessante atrás do vidro (aurora royal em CSS + campo 3D), no máximo 3 camadas com blur simultâneas, `@supports not (backdrop-filter)` cai para fundo sólido, `prefers-reduced-transparency` idem, e `prefers-reduced-motion` desliga as animações.

**Marca:** `assets/logo.svg` — **duas aspas de abertura** brancas sobre um fio de citação, dentro do squircle de vidro azul royal com realce especular e contorno claro. O desenho diz o que o site faz: aspas são o gesto de citar repertório, que é o coração da Competência II e o que separa a redação nota 1000 da redação correta e vazia. O mesmo desenho é o favicon (data-URI) e a marca do cabeçalho, e continua legível a 16 px.

Duas marcas anteriores foram aposentadas: o quadrado de letras "RJ" (inicial em caixa dentro de quadrado é assinatura de placeholder) e o **bico de pena** — a pena é o clichê visual de qualquer coisa ligada a escrita, e o traço fino do bico desaparecia no tamanho da topbar.

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

Todo o resto é **superfície sólida** com tom da marca. Construção em camadas: `backdrop-filter: blur(26px) saturate(190%)` + fundo semitransparente + borda de 1px com highlight superior e sombra inferior + reflexo interno.

**Requisitos atendidos:**
- O vidro tem **algo interessante atrás**: campo 3D em WebGL com a paleta da marca.
- `@supports not (backdrop-filter: blur(1px))` → fundo sólido `#0B2438`.
- `prefers-reduced-transparency: reduce` → fundo sólido, sem blur.
- Máximo de 3 camadas com blur simultâneas; no celular o fundo vira gradiente CSS, sem canvas.
- Refração real com `feDisplacementMap` fica como melhoria progressiva opcional — o fallback é blur simples.

## 7. 3D — decisão de dependência

**Não entra Three.js / React Three Fiber.** O r180 distribui 2,1 MB (`three.module.js` 644 KB + `three.core.js` 1,5 MB); para um fundo decorativo isso é desproporcional e atrapalha o LCP.

**Implementado:** campo de profundidade em WebGL puro (~4 KB), com partículas em três planos de paralaxe e uma luz na cor da marca. Carrega depois do primeiro paint, só em telas ≥ 900 px, com WebGL e sem `reduced-motion`. Fallback: gradiente aurora em CSS (usado no celular, no standalone e em qualquer falha).

**Sobre Framer Motion:** as regras de animação (só `transform`/`opacity`, 150–250 ms em micro-interações, 600–800 ms em entradas, hierarquia e `reduced-motion`) foram implementadas com Web Animations API + tokens de CSS — o site é estático, sem React, e a API nativa cobre o mesmo escopo com 0 KB. Se o projeto migrar para React, o lugar de trocar é `js/motion.js`, mantendo os mesmos tokens.

## 8. Escala de nota — o número nunca aparece sozinho

A nota de cada competência é uma das **seis oficiais** — 0, 40, 80, 120, 160, 200 — e o relatório **nunca publica um número exato**: publica uma **faixa**, "nota entre X e Y". Motivo de cartilha: a nota final do Enem é a média aritmética das notas totais de dois avaliadores, e dois avaliadores divergem. 180 não é nota: é leitura interna do motor, e vira "160 com faixa até 200".

| Onde | O que aparece |
|---|---|
| Critérios | a **régua dos seis níveis** (200 → 0), com o descritor oficial do nível e, abaixo dele, o que o avaliador procura no texto |
| Cartão do relatório | a faixa em destaque — `160–200` — com `/200` em corpo menor; selo `Nível 4 de 5 · nota entre 160 e 200`; chip azul explicando **por que** a faixa abre 20 ou 40 |
| Motivos | cartões `IMPEDE O 200` / `PESA NA NOTA` / `OBSERVAÇÃO`, cada um com regra, trecho e ação |
| Próximo passo | `Para subir · 200`, com o descritor oficial do nível seguinte |
| Anel da nota final | **dois arcos**: azul sólido até o mínimo da faixa, azul claro cobrindo a margem até o máximo; dentro, `entre 800 – 900` e `de 1000` |

Hierarquia: a **faixa** é o protagonista, e a cor nunca é de alerta — a faixa aparece em azul mesmo quando a nota é baixa (o vermelho fica reservado à nota em si, no cartão).

**Por que a faixa não vira ruído:** ela tem duas larguras e ambas dizem algo. 20 = "o texto está firme no nível; é a divergência previsível". 40 = "o texto já mostra parte do descritor seguinte; o segundo avaliador poderia subir um nível". A faixa total nunca passa de 100 pontos, o limite em que a cartilha manda chamar o terceiro avaliador.

Regra em um lugar só (`oficializar()`, em `js/engine/texto.js`): `nota = floor(pontos/40)*40`; `abertura = 20` (firme) ou `40` (mostra o seguinte); `faixa = [nota, nota+abertura]`. `tetoPorAmostra()` corta em 120/160/180 pontos internos para textos com menos de 150/200/240 palavras. Redação zerada não tem faixa: os dois avaliadores chegam ao mesmo 0.

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

**Testado em** Chromium 390×844 e 360×800: nenhuma rolagem horizontal em nenhuma das 6 rotas. A faixa azul do hero e das seções reduz o padding no celular (24 px) para não comer a tela.

## 10. Sombras

Sombra só em quem flutua de verdade: navegação fixa, painel de vidro, toast, o botão primário e as faixas azuis. Todas são **azuis** (`rgba(16,34,120,…)`), nunca cinza — sombra cinza sobre branco suja a cor. Blocos de conteúdo usam borda (`rgba(8,13,28,.08)`) em vez de sombra.


## 12. Guia de conteúdos — três telas, um material

O guia das quatro áreas usa o mesmo vocabulário visual do resto do site, com uma diferença: a faixa verde passa a ser o cabeçalho de cada área no sumário, não o hero. Cada área é um bloco de vidro com cabeçalho esmeralda cheio (`#026842 → #003817`) e as matérias em cartões brancos por baixo — a hierarquia fica visível sem precisar de título de seção.

| Tela | Componente | Por quê |
|---|---|---|
| sumário `#/conteudos` | `.hub-area` + `.hub-materia` | a área é o bloco, a matéria é o alvo do clique — dois níveis, sem menu lateral |
| matéria | `.conteudo-btn` | botão de linha inteira, número à esquerda: o aluno varre a lista, não caça link |
| conteúdo | `.cp-bloco` | mesma lógica do relatório da redação: seções com rótulo em caixa alta pequena e fio de separação |

**Questão fechada por padrão.** O destaque verde da alternativa correta só aparece em `.questao[open]`. Antes disso, a questão é só pergunta: se o gabarito vem pintado, o aluno não tenta — e questão que não se tenta não ensina.

**Vídeo com legenda de procedência.** O player é `youtube-nocookie` (sem cookie de rastreio antes do play) em moldura 16:9 escura (`#05130E`), e embaixo aparecem título do vídeo, canal e link direto. O título é o da busca, não uma suposição: se o vídeo estiver errado, você vê na hora.
