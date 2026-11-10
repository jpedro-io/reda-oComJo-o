# Redação com João

Site estático de estudo da redação do ENEM. Paleta de seriedade e foco: **azul-marinho `#17395C`** e **azul-petróleo `#1F5A63`** sobre **cinza-gelo quente `#F6F4EF`**, com **areia `#EFE6D6`** como neutro de apoio e **dourado `#B8891F`** reservado a conquistas — notas, medalhas, "o que já está certo". Tema escuro automático em chumbo `#14181D`. **Vidro em quatro superfícies apenas**, mobile primeiro, sem dependências externas e sem build obrigatório.

> As decisões de direção de arte (cores, par de fontes, ícones, escala de espaçamento, lógica de raio, tokens de movimento, formato de cada seção, uso do vidro e por que **não** entrou Three.js/Framer Motion) estão fechadas em [`DESIGN.md`](DESIGN.md).

| Página | O que tem |
|---|---|
| **Critérios** | As 5 competências com os **seis níveis da cartilha** (0 a 200, de 40 em 40): o descritor oficial de cada nível e, abaixo dele, o que o avaliador procura no texto; o que é avaliado, o que derruba, o que levanta, trecho fraco × trecho forte, o que zera, tangenciamento e como a nota final é calculada. |
| **Estrutura** | Distribuição das 30 linhas, as partes (introdução, desenvolvimentos, conclusão) com fórmula e erros comuns, os 5 elementos da proposta, esqueleto de 30 linhas e banco de conectivos. |
| **Ler o tema** | 11 comandos de tema (“valorização”, “importância”, “desafios”, “caminhos”, “perspectivas”, “estigma”, “invisibilidade”, “democratização”, “manipulação”, “direito universal”, “em questão”) com: o que pede, armadilha e como fazer. |
| **Temas** | **32 temas** (13 oficiais de 2014 a 2026 + 19 de treino), filtráveis por eixo, cada um com núcleo temático, repertórios sugeridos, o comando do enunciado e **3 textos motivadores** — 96 no total. |
| **Redações analisadas** | 13 redações nota 1000, **uma por tema oficial de 2014 a 2026**, agrupadas por ano, + 1 diagnóstico de fuga ao tema. Cada texto é comentado parágrafo por parágrafo, com destaques coloridos (repertório, tese, problema, argumento, coesão, proposta) e “por que é nota 1000”. |
| **Corrigir** | A proposta aparece ao lado do editor — tema, recorte, comando e os textos motivadores do tema — e a correção vem com **explicação da nota**: nota 0–1000, nota por competência em múltiplos de 40 (0 a 200), e, para cada competência, **por que não chegou a 200**, com a regra da grade específica, o trecho do próprio texto que motivou a observação, o que falta para o próximo nível e como resolver. |

## Rodar

```bash
cd corretor-enem
python3 -m http.server 8000 --bind 0.0.0.0   # http://localhost:8000
```

Ou abra `standalone.html` direto no navegador: é o site inteiro (HTML + CSS + JS) em um único arquivo, funciona offline.

## Estrutura de arquivos

```
index.html                    shell do site (navegação por hash: #/criterios, #/comandos, ...)
standalone.html               build de arquivo único (gerado, fontes embutidas)
DESIGN.md                     decisões de direção de arte e movimento
css/style.css                 tokens, layout, vidro (4 superfícies), responsivo, impressão
css/fontes.css                @font-face das duas famílias (self-hosted)
fonts/*.woff2                 Fraunces + Manrope, subsets latin e latin-ext
js/ui.js                      router e renderização das 6 páginas (um molde por conteúdo)
js/motion.js                  entradas, stagger, contagem, anel de nota (Web Animations API)
js/bg.js                      fundo 3D em WebGL puro, carregado sob demanda
js/engine/texto.js            utilitários de análise textual (+ degraus e nota oficial)
js/engine/estilo.js           repetição (palavra, expressão, frase) e pontuação do período
js/engine/competencias.js     avaliadores C1..C5
js/engine/corrigir.js         orquestração, nota zero, alertas, prioridades
js/engine/explicar.js         por que a competência não chegou a 200 (regra + evidência + ação)
js/db/lexico.js               léxicos: 166 formas com erro de acentuação, 40 construções/regências, informalidades, conectivos, repertório
js/db/criterios.js            critérios + descritores oficiais de nível
js/db/estrutura.js            partes da redação, esqueleto, elementos da proposta
js/db/comandos.js             como ler o comando do tema
js/db/cartilhas.js            grades específicas C1–C5 (destiladas das cartilhas FGV/Inep)
js/db/niveis.js               escala INTERNA de diagnóstico (20 em 20) — nunca publicada; a nota publicada é convertida em texto.js
js/db/temas.js                banco de temas oficiais (núcleo + repertórios + eixo)
js/db/temas-extra.js          segundo bloco de temas (treino-10..19), anexado a TEMAS
js/db/motivadores-oficiais.js textos motivadores dos 13 temas oficiais
js/db/motivadores-treino.js   textos motivadores dos 19 temas de treino
js/db/motivadores.js          agregador: MOTIVADORES + motivadoresDe(temaId)
js/db/acentos.js              restaura acento e maiúscula do vocabulário na interface
js/db/redacoes-2014-2019.js   análises de 2014 a 2019
js/db/redacoes-2020-2026.js   análises de 2020 a 2026 (+ diagnóstico)
js/db/redacoes.js             índice das análises, cores dos destaques
js/db/exemplos.js             textos dos botões de exemplo do corretor
tools/build-standalone.py     gera standalone.html (embute CSS, JS e fontes em data URI)
test/                         testes do motor (node) — engine, casos, redações, explicações, escala, acentos e gramática
../uploads/                   cartilhas de capacitação (PDF) e o texto extraído em uploads/txt/
```

## Decisões de estilo (resumo)

| Item | Decisão |
|---|---|
| Cores | **fundo branco** `#FFFFFF`; **azul royal** `#1A3EC8` nos botões, barras, anéis e faixas (realce `#2F55F0`, véu `#E9EEFF`); tinta quase preta `#080D1C`. Títulos em **preto sobre o branco** e em **branco sobre as faixas azuis**. Tema único (claro) — o escuro foi removido |
| Fontes | **Fraunces** (display, serifada editorial) + **Manrope** (interface e texto). Sem Inter, Geist, Space Grotesk. Self-hosted, 163 KB |
| Ícones | família própria em SVG inline (traço 1,75, grade 24). Sem Lucide nem biblioteca de ícones |
| Espaçamento | escala única 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72 · 112 |
| Raio | cresce com a elevação: 6 (etiqueta) · 12 (controle) · 18 (conteúdo) · 26 (faixa e vidro) · pílula |
| Movimento | micro 150 ms, hover 220 ms, entrada 600 ms, hero 800 ms; só `transform`/`opacity`; `prefers-reduced-motion` desliga tudo |
| Vidro | **vidro líquido** em todas as superfícies de função: véu translúcido (`rgba(255,255,255,.58)`) + `backdrop-filter: blur(26px) saturate(190%)` + realce especular na borda de cima (`inset 0 1px 0`) + reflexo no topo dos botões primários. Sobre as faixas azuis o vidro é o inverso: véu branco a 12–16% com realce claro. Fallback sólido sem `backdrop-filter` |
| Tema | **um só**, claro, com tokens em `:root`. O `prefers-color-scheme: dark` foi retirado do CSS, do `bg.js` e do `index.html` — fundo branco é decisão de marca, não preferência do sistema |
| Celular | alvo de projeto, não sobra: topo em duas linhas com o CTA "Corrigir" fixo, navegação rolável, toque ≥ 44 px, tabelas e réguas reflowadas, editor acima do relatório e rolagem automática até a nota |
| 3D | campo de profundidade em WebGL puro (~4 KB), lazy, só em telas ≥ 900 px; fallback de aurora em CSS. **Sem Three.js**: 2,1 MB por um fundo decorativo |
| Marca | `assets/logo.svg`: duas aspas de abertura brancas sobre fio de citação, dentro de squircle de vidro azul royal. Legível a 16 px; o mesmo desenho é o favicon (data-URI) e o cabeçalho — o quadrado "RJ" e o bico de pena foram aposentados |
| Seções | cada uma com formato derivado do conteúdo (régua, linha do tempo, acordeão, lista densa, crônica por ano, workspace) |

Contraste: todo texto ≥ 4,5:1 no pior ponto do fundo; onde há vidro, existe camada de escurecimento atrás do texto.

## A nota: só as seis oficiais — e sempre publicada como faixa

Cada competência vale **0, 40, 80, 120, 160 ou 200**, como na grade oficial, e é isso que soma até 1000. **Não existe nota de 20 em 20**: 180 não é uma nota da grade, e o relatório nunca mostra 180.

**O que o relatório mostra é uma faixa.** A cartilha é explícita: "a nota final do(a) participante será a média aritmética das notas totais atribuídas pelos dois avaliadores". Dois avaliadores não fecham o mesmo número — por isso publicar um valor exato seria inventar uma precisão que o exame não tem. O corretor publica **"nota entre X e Y"**, da mínima à máxima:

```
competência:  nota oficial 160  →  "nota entre 160 e 200"
nota final:   soma das oficiais →  "nota entre 800 e 900"
```

- **Abertura de 20** quando o texto está firme no nível alcançado: é a divergência previsível entre dois avaliadores.
- **Abertura de 40** quando o texto cumpre o nível e já mostra parte do descritor seguinte: o segundo avaliador poderia subir um nível inteiro.
- **A faixa total nunca passa de 100 pontos** — é exatamente o limite em que a cartilha manda chamar um terceiro avaliador (diferença > 100 no total, > 80 numa competência, ou um avaliador zera e o outro não). Nesse caso a nota final é a média das duas notas mais próximas.
- **Redação zerada não tem faixa**: os dois avaliadores chegam ao mesmo 0.
- **Teto por amostra** (`tetoPorAmostra`): nenhuma competência passa de **120** com menos de 150 palavras, de **160** abaixo de 200 e de **180** abaixo de 240 — e 180 é leitura interna, publicada como "160 com faixa até 200".
- A conversão fica em `oficializar()` (`js/engine/texto.js`): degrau interno → `nota = floor(pontos/40)*40` + `abertura` (0, 20 ou 40).

**Régua interna.** O motor continua medindo de 20 em 20 (`js/db/niveis.js`) porque precisa de resolução para decidir; essa escala **não é publicada** e existe só para o diagnóstico. A regra de ouro: `js/db/niveis.js` alimenta o motor, `oficializar()` decide o que o estudante lê.

**Calibragem** (`node test/calibragem.js`): texto fraco de dez linhas fica entre **240 e 480**; redação repetitiva, **240**; frases repetidas, **280**; sem pontuação, **240**; redação sólida (cumpre os níveis, ainda sem a prova do topo), **800** com faixa até 1000; as treze redações modelo, **920–1000**.

## O que o corretor marca — como um professor com a cartilha na mão

Além de acentuação, concordância e repertório, o motor mede o que um avaliador circula de lápis na margem (`js/engine/estilo.js`):

| Achado | Como é medido | Onde pesa |
|---|---|---|
| **Palavra repetida** | palavra de recheio (“problema”, “pessoas”, “questão”) a partir de **3** ocorrências; palavra de conteúdo a partir de **8** — ou **7** quando o grupo soma variantes de mesmo radical (“jovem/jovens”, “desigualdade/desigualdades”) | C4: 8+ travam em 120; 3–7 em 160. C1: desconto, com a mesma régua da C4 |
| **Termo repetido no mesmo parágrafo** | 3+ ocorrências no mesmo parágrafo | C4: teto 160 |
| **Frase repetida** | duas frases com **74%** ou mais de palavras em comum | C4: teto 120 · C3: teto 120 (repetir não é progressão) |
| **Expressão repetida** | o mesmo bloco de três palavras **três** vezes ou mais | C4: teto 160 |
| **Abertura de período repetida** | mesmas duas primeiras palavras em 3+ frases | C4: teto 160 |
| **Período sem pausa** | 30+ palavras sem vírgula, travessão, dois-pontos ou ponto e vírgula | C1: desconto por ocorrência, e nenhum 200 |
| **Parágrafo sem ponto final** | último período do parágrafo em aberto | C1: desconto por parágrafo |
| **Pontuação escassa** | média de 22+ palavras por frase com menos de 0,6 vírgula por frase | C1: desconto, e nenhum 200 |
| **Orações em série com “e”** | 2,2+ “e” por frase | C1: desconto |
| **Período longo** | mais de 40 palavras | C1: desconto (o mesmo desvio repetido pesa mais) |

Cada achado chega ao relatório como um cartão **“impede o 200”** (ou “pesa na nota”), com o título do problema, a regra da grade que ele viola, o trecho do próprio texto e a correção concreta. É a mesma lógica da cartilha: o nível 5 admite no máximo uma falha de estrutura e no máximo dois desvios no texto inteiro — e repetição e falta de pontuação contam nessa conta.

**Calibragem** (`node test/calibragem.js`): texto fraco de dez linhas fica entre **280 e 480**; redação repetitiva, **280**; texto com frases repetidas, **320**; texto sem pontuação, **280**; redação sólida com repertório explicado e proposta completa, **800**; as treze redações modelo, **960–1000**.

## Crase, concordância e pontuação — regras de contexto

A Competência I não se corrige com lista de palavras. `DESVIOS_CONSTRUCAO` (`js/db/lexico.js`) pega forma fixa — “as vezes”, “houveram”, “menas”. O resto é **relação entre duas palavras**, e isso está em `REGRAS_CONTEXTO`, no mesmo arquivo: vinte regras com expressão regular que enxergam contexto.

| Grupo | Exemplos que a regra pega |
|---|---|
| crase | “à partir”, “à ser cobrados”, “à todos”, “a aquela questão”, “devido a falta”, “à nível de” |
| concordância verbal | “os jovens precisa”, “as pessoas que não tem”, “houveram muitos casos”, “fazem dez anos”, “existe pessoas”, “falta recursos”, “se tratam de” |
| concordância nominal | “os mesmo direitos”, “as políticas pública”, “duas vez”, “meia cansada” |
| pontuação | vírgula entre sujeito e verbo: “A sociedade, é responsável” |

Duas decisões valem registro:

1. **Falso positivo custa mais caro que omissão.** Uma regra que acusa redação boa estraga a ferramenta; uma regra que não existe só deixa passar. Por isso toda regra nova passa por `node test/gramatica.js`, que exige três coisas: zero acusações nas 14 redações modelo, 19 defeitos plantados encontrados e 8 frases corretas intocadas.
2. **`\b` não serve em português.** O `\b` do JavaScript só conhece `[A-Za-z0-9_]` — para ele, “à” e “é” não são letras, e `\bà\b` nunca casa. As regras usam lookarounds Unicode (`(?<![\p{L}\p{N}])`). Esse detalhe foi o que fez a primeira versão das regras de crase passar em branco.

Regras deliberadamente ausentes estão documentadas no fim de `lexico.js`, com o motivo — crase antes de nome de lugar, vírgula antes de “que” (não dá para distinguir restritiva de explicativa) e a concordância com “a maioria” (as duas formas são aceitas).

## Como a explicação da nota é construída

Três camadas, todas com origem rastreável:

1. **Regra** — `js/db/cartilhas.js` guarda a *grade específica* de cada competência, transcrita das cartilhas de capacitação (Competências I a V, FGV/Inep), e `js/db/niveis.js` guarda a leitura interna que traduz essa grade em pontos, dos quais sai a nota de 40 em 40. É de lá que vem o princípio que rege tudo: *o texto só sobe de nível se cumprir integralmente o descritor; quando reúne características de dois níveis, fica no inferior.*
2. **Sinal** — os avaliadores em `js/engine/competencias.js` medem o texto (desvios, cobertura do núcleo do tema, repertório articulado, eixos desenvolvidos, operadores entre parágrafos, elementos da proposta) e guardam, além dos números, o **trecho** que sustenta cada achado.
3. **Explicação** — `js/engine/explicar.js` transforma sinal em frase: título do problema, `porque` com a regra da grade, `evidência` citada do texto, `comoResolver` com ação concreta e o `próximo degrau` com o que falta para subir de nível.

Exemplo de saída (competência II de uma redação com repertório citado e não explicado):

> **Repertório citado, mas sem uso produtivo (Constituição Federal, IBGE)**
> Esta é a diferença exata entre 160 e 200 na Competência II: a grade prevê “repertório legitimado e pertinente, mas com uso improdutivo” no nível 4 e reserva o nível 5 para o uso produtivo. Uso produtivo significa vincular o repertório à discussão — dizer o que ele prova sobre o seu argumento.
> *“Segundo o IBGE, milhões de brasileiros…”*
> **Como resolver:** depois de citar, escreva a frase que faltava: “Isso demonstra que…”. Sem essa frase, o repertório é enfeite; com ela, vale 40 pontos a mais.

## Textos motivadores

Toda proposta tem de vir com material de leitura, como na prova. São **96 textos** — 3 por tema, nos 32 temas — com o formato de cada um:

| Campo | O que é |
|---|---|
| `titulo` | "Texto I", "Texto II", "Texto III" |
| `fonte` | lei, autor, instituição e ano — sempre visível na tela |
| `texto` | 40 a 70 palavras, no registro do texto de apoio do Enem |

Os textos cobrem três entradas diferentes, como a prova costuma fazer: **norma** (Constituição, ECA, leis específicas), **dado** (IBGE, Inep, OIT, OMS) e **conceito** (autores e noções que dão vocabulário ao tema). Na página **Temas** eles ficam no bloco "Textos motivadores" de cada proposta; na página **Corrigir** aparecem ao lado do editor, junto do recorte e do comando.

> **Importante:** os motivadores são **paráfrases e adaptações didáticas**, escritas para este material a partir de leis, dados públicos e conceitos consolidados. A fonte é real e está creditada; o texto **não** é a transcrição do texto original da prova nem citação literal da obra citada.

## Como adicionar conteúdo

**Nova redação analisada** — em `js/db/redacoes-2020-2026.js` (ou no arquivo do período):

```js
{
  id: 'enem-2027', ano: 2027, temaId: 'enem-2027',
  tema: 'Tema oficial',
  comando: 'o que o enunciado pedia e como o texto responde',
  nota: 1000,
  resumo: 'uma linha',
  porQueMil: ['...', '...'],
  paragrafos: [{
    rotulo: 'Introdução',
    funcao: 'o que o parágrafo precisa cumprir',
    texto: 'texto integral do parágrafo',
    destaques: [{ trecho: 'trecho exato do texto', tipo: 'repertorio', nota: 'comentário' }],
    analise: 'leitura do parágrafo',
    melhoria: 'opcional'
  }],
  competencias: [{ id: 'C1', nota: 200, comentario: '...' }]
}
```

Tipos de destaque: `repertorio`, `tese`, `problema`, `argumento`, `conectivo`, `proposta`.
O campo `trecho` precisa aparecer literalmente no `texto` para ser marcado.

**Novo tema** — em `js/db/temas.js` (ou `js/db/temas-extra.js`): `{ id, tipo, eixo, ano, titulo, recorte, nucleo, apoio, repertorios }`.

**Textos motivadores do tema** — em `js/db/motivadores-oficiais.js` ou `js/db/motivadores-treino.js`:

```js
'id-do-tema': [
  { titulo: 'Texto I', fonte: 'Lei 8.080/1990 (adaptado)', texto: '...' }
]
```

Atenção ao vocabulário: `nucleo` e `apoio` são comparados com o texto do aluno **sem acento e em minúsculas**. Escreva `matriz energetica`, nunca `matriz energética`. A interface restaura acento e maiúscula por `termoBonito()` (`js/db/acentos.js`); para um termo novo aparecer bonito, acrescente-o ao mapa `ACENTOS`. O teste `test/acentos.js` confere que cada entrada volta à chave original quando normalizada.

**Novo comando de tema** — em `js/db/comandos.js`: `{ id, palavra, temas, oQuePede, armadilha, comoFazer }`. O vínculo com cada tema é automático pela palavra do título (`comandoDoTema`).

Depois de qualquer mudança: `python3 tools/build-standalone.py`.

## Testes

```bash
node test/engine.test.js      # exemplos do corretor
node test/casos.js            # casos-limite: fuga ao tema, texto curto, tema livre
node test/redacoes.test.js    # confere que as 13 redações nota 1000 pontuam na faixa alta
node test/explicacoes.test.js # 1374 checagens: toda competência < 200 tem motivo, regra e evidência
node test/niveis.js           # 796 checagens: as seis notas oficiais, a faixa por competência e a faixa total
node test/acentos.js          # 832 checagens: mapa de acentos e todo o vocabulário dos temas
node test/calibragem.js       # 64 checagens: repetição, pontuação, teto do texto fraco e faixa sem nota exata
node test/gramatica.js        # crase, concordância verbal/nominal e pontuação: 19 defeitos plantados, 8 textos corretos, 14 redações modelo
```

Estado atual: 1374/1374 (explicações), 796/796 (notas e faixas), 832/832 (acentos), 64/64 (calibragem), 13 redações nota 1000 na faixa alta (920–1000), casos 1000 / 360 / 0 / 0 / 600.

## Notas importantes

- As redações analisadas são **modelos didáticos** que reconstroem o padrão nota 1000. Não são transcrições de redações oficiais de participantes.
- Os descritores de nível são os do guia oficial da redação do Enem; os campos didáticos (o que derruba, o que levanta, exemplos) foram escritos para este material.
- Os **textos motivadores** são adaptações didáticas (ver seção acima), não reproduções oficiais.
- A **nota publicada é sempre uma das seis da grade (0, 40, 80, 120, 160, 200)** e vem sempre como **faixa** ("nota entre X e Y"): a nota do Enem é a média de dois avaliadores, e dois avaliadores divergem. Nenhum relatório mostra nota exata.
- O motor de correção é **heurístico**: mede desvios de grafia, aderência ao vocabulário do tema, tese e sustentação, variedade de conectivos e os cinco elementos da proposta. Não interpreta sentido. A correção oficial é humana, com dois avaliadores independentes.
