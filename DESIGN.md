# Decisões de arte

## 1. Identidade: folha de correção
O site deve parecer uma folha de correção de redação, não um painel de vendas.
Papel branco, tinta preta-esverdeada, marca-texto esmeralda e caneta vermelha
só onde há algo a corrigir. Três adjetivos guiam cada escolha: editorial,
sóbrio, confiável.

| Papel | Cor | Uso |
|---|---|---|
| fundo | `#FFFFFF` | papel |
| superfície | `#F6FAF8` | bloco secundário, citação |
| tinta | `#10201A` | texto e títulos |
| discreto | `#5B6B64` | rótulos, legendas, metadados |
| linha | `#DFE8E3` | fio de 1px, divisória universal |
| marca | `#047857` | botão, link, destaque |
| marca escura | `#065F46` | hover, `:visited` |
| marca clara | `#ECFDF5` | fundo de apoio |
| marca-texto | `#D1FAE5` | trecho elogiado, grifo na logo |
| alerta | `#B42318` | só o que precisa ser corrigido |

**Regra de cor com sentido:** esmeralda significa "está certo"; vermelho
significa "corrija isto". Nenhuma cor é usada para enfeitar.

## 2. Arquitetura das folhas de estilo
`css/style.css` guarda o desenho anterior (faixas verdes, vidro, pílulas).
`css/editorial.css` carrega depois e é a camada que manda: redefine os tokens
(`--ink`, `--muted`, `--line`, `--brand`, raio 6px, sombras desligadas, vidro
desligado) e sobrescreve os componentes que precisam mudar de linguagem.
Duas folhas em vez de uma reescrita de 2.600 linhas: o risco de quebrar o
motor de correção fica em zero e a camada nova é legível por inteiro.

## 3. Tipografia
- **Sentient** nos títulos (serifada, editorial), servida do próprio site.
- **General Sans** no texto (sem serifa, neutra), servida do próprio site.
- Três tamanhos de título (44, 30, 22 px), dois pesos (400 e 600).
- Nenhuma fonte vem de CDN: o site funciona offline e no preview sem rede.

## 4. Geometria
- Raio 6px em caixas, botões, campos e imagens. Nada de pílula.
- Borda de 1px em tudo que é caixa; **nenhuma sombra difusa** no site.
- Separação entre blocos é linha fina, não cartão dentro de cartão.
- Um nível de caixa por tela; o segundo nível vira fio.

## 5. Componentes
- **Header:** branco, fio inferior, links em tinta, ativo em esmeralda com
  sublinhado de 2px. Só "Corrigir" é botão cheio. No celular vira hambúrguer.
- **Cabeçalho de página:** título serifado à esquerda, uma frase de apoio em
  cinza e um fio embaixo. Sem eyebrow, sem caixa, sem gradiente.
- **Botão primário:** fundo esmeralda, texto branco, 6px. **Secundário:**
  link sublinhado. Nunca dois botões iguais empilhados.
- **Rótulos:** texto pequeno em cinza, sem caixa alta espaçada.

## 6. Movimento
Só fade-in de 240 ms na entrada e transição de cor no hover. Sem parallax,
sem partículas, sem contador animado. `prefers-reduced-motion` desliga tudo.

## 7. Relatório de correção
- Nota final em serifada grande, com "de 1000" ao lado, sem cartão nem barra.
- Cada competência é uma linha `C1 · Domínio da norma padrão ⋯ 80/200`,
  clicável, com o detalhe abrindo embaixo.
- Trecho elogiado leva marca-texto `#D1FAE5`; trecho com problema leva
  sublinhado na cor de alerta e fundo `#FEF3F2`.
- "O que revisar" usa caixa de seleção; "o que já está certo" usa ✓.

## 8. Guia de conteúdos
Sumário em quatro blocos com o nome da área em serifada e a contagem à
direita; matérias em linhas finas; conteúdo em páginas com seções separadas
por fio. Questão fechada por padrão: o gabarito só aparece ao abrir, porque
questão que não se tenta não ensina.

## 9. Acessibilidade
Contraste mínimo AA (o cinza `#5B6B64` sobre branco dá 5,1:1), foco visível
com contorno de 2px em esmeralda, alvos de toque de 40px, tabelas que
empilham no celular e menu por botão anunciado com `aria-expanded`.

## 10. A capa
A capa não usa foto. No lugar dela, à direita do título, entra uma amostra do
relatório: um trecho real de uma das redações nota 1000 do site, em serifada de
18 px sobre 1,7, com marca-texto esmeralda nos acertos e sublinhado ondulado
vermelho no ponto de melhoria, com a anotação na margem direita. No celular a
anotação desce para baixo do parágrafo. O bloco é uma caixa branca de borda
1 px, raio 6 px, sem sombra e sem animação. Duas colunas no desktop, uma no
resto, dentro de 1120 px, com 44 px entre o cabeçalho e o título.

## 11. Camada de vidro (2026-11)
O site passou de folha branca para **vidro sobre esmeralda profundo**, sem
tocar no motor de correção: `css/glass.css` entra por cima de `style.css` e
`editorial.css` e `js/glass.js` cuida do brilho e da inclinação.

| Papel | Cor | Uso |
|---|---|---|
| fundo | `#031A13` | esmeralda mais fundo, base do `body` |
| fundo 2 | `#04241B` | meio do gradiente |
| vidro | `rgba(255,255,255,.11) → .035` | superfície padrão, com `backdrop-filter: blur(20px)` |
| fio | `rgba(255,255,255,.16)` | 1px de borda clara |
| tom 1 | `#F4FBF7` | faixa da C1: o off-white da escala |
| tom 2 | `#E7F8EF` | faixa da C2 |
| tom 3 | `#D9F4E5` | faixa da C3 |
| tom 4 | `#C6EFD9` | faixa da C4 |
| tom 5 | `#B2EACD` | faixa da C5: o verde mais claro da escala |

**Escala de tons.** Cada seção (competência, parte da estrutura, comando,
área de conteúdo, item de índice, tema) recebe um dos cinco tons por
`:nth-child`, do off-white ao verde claro. O tom aparece na faixa do título,
no fio da esquerda e no número; o corpo do texto continua em vidro escuro,
para a página não voltar a ser branca.

**Interação.** `js/glass.js` aplica `.brilho` (spotlight que segue o ponteiro,
desenhado em `::after` com `--mx`/`--my`) e `.inclina` (tilt 3D de até 3,2°,
`perspective(1000px)`), só em blocos grandes, nunca em linha de tabela, e
desligado em `prefers-reduced-motion`.

**Largura.** `--largura: 1400px` e `main.wrap` com 40px de respiro lateral: o
conteúdo ocupa a tela no desktop. Páginas de leitura longa usam duas colunas
(redação: texto à esquerda, análise à direita; conteúdo: resumo à esquerda,
apoio à direita, vídeo na largura toda).

## Guia de conteúdo — rodada em andamento

As páginas ampliadas combinam resumo e painel lateral no desktop, exemplos,
esquemas e fórmulas, três questões abertas com resolução escrita e vídeo ao
final. No celular, os blocos se empilham sem exigir rolagem horizontal. Os
links do índice rolam até a seção sem alterar a rota baseada em hash. O estado
real de cobertura e os pendentes estão em `tools/PROGRESSO-QUESTOES.md`;
“ampliado” é um critério estrutural, não uma garantia de revisão factual nem
comprovação de que todos os vídeos são aulas integrais.

## Direção visual de estudos

A plataforma de referência serviu para observar a entrada orientada a estudo,
a clareza das ações e a organização das disciplinas, sem reutilizar imagens,
marcas ou layout literal. A identidade própria combina índigo escuro, menta,
lavanda e vidro translúcido; os cabeçalhos preservam tons claros diferentes,
com texto escuro e contraste. A capa oferece caminhos para conteúdos, modelos
e correção. Questões oficiais parafraseadas apontam para prova e gabarito Inep;
as demais continuam explicitamente identificadas, sem parecerem oficiais.

## Atualização — Vibrant Azure

A paleta de referência usa azul royal `#007FFF`, azul céu `#66CCFF`,
azul-gelo `#F0F8FF` e azul `#1E90FF`. Para manter o vidro e o contraste,
os fundos de leitura usam azul-marinho de apoio e as faixas claras usam tinta
azul-escura. Entradas, botões, navegação e tabelas não usam branco puro como
superfície. Os marcadores dos comentários da correção possuem uma coluna própria
para não cobrir o início do texto, inclusive quando o texto quebra em linhas.
Na C4, a orientação de revisão prioriza um sinal observado, em vez de afirmar
que faltam classes de conectivos quando a própria análise identificou variedade.

## Revisão visual — inspiração Skillgrove

A interface usa uma direção própria inspirada na referência fornecida: abertura
centralizada, tipografia sem serifa, verde vivo sobre fundos verde-escuros e
superfícies discretas. Não utiliza marcas, depoimentos, imagens ou números do
modelo. Elementos translúcidos, realce e leve profundidade permanecem no
computador. Em telas estreitas e dispositivos de toque, a camada pesada de
backdrop-filter, fundo fixo, animações de entrada e barra de progresso na
rolagem são desativados para reduzir trabalho de pintura; a navegação continua
funcional sem movimento. O teste automatizado não substitui teste em aparelho
real. A tabela da estrutura apresenta linhas empilhadas em telas pequenas,
sem remover seus cabeçalhos semânticos; caixas aninhadas no corretor têm
espaçamento reduzido para preservar uma largura confortável de texto.
