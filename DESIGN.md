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
