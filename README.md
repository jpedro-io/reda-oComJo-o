# Redação com João

**Redação com João** é um guia gratuito, completo e independente para a redação do ENEM. Reúne tudo o que um estudante precisa: as 5 competências explicadas com a grade oficial, estrutura da redação (esqueleto de 30 linhas), como ler o comando do tema, 32 temas com recorte e repertórios, 13 redações modelo nota 1000 comentadas parágrafo a parágrafo, e um corretor automático que devolve nota por competência, faixa, pontos fortes, o que segurou a nota e o que revisar primeiro.

> **Importante:** Este projeto **não tem vínculo com o Inep**. As redações analisadas são **modelos didáticos** que reconstroem o padrão nota 1000 — não são transcrições de textos oficiais de participantes. A correção automática é **heurística** (baseada em regras da cartilha) e **não substitui a avaliação humana** com dois avaliadores independentes.

---

## Funcionalidades Principais

| Seção | O que você encontra |
|-------|---------------------|
| **Competências** | As 5 competências do ENEM com os 6 níveis oficiais (0, 40, 80, 120, 160, 200). Para cada nível: descritor oficial, o que o avaliador procura, o que é avaliado, o que derruba a nota, o que levanta, exemplo fraco × forte, regras de nota zero, tangenciamento e cálculo da nota final. |
| **Estrutura** | Distribuição sugerida das 30 linhas, as 4 partes (introdução, 2 desenvolvimentos, conclusão) com fórmula, passos, erro comum e dica. Os 5 elementos da proposta (agente, ação, meio/modo, finalidade, detalhamento). Esqueleto de 30 linhas pronto para usar. |
| **Ler o tema** | 11 comandos de tema (valorização, importância, desafios, caminhos, perspectivas, estigma, invisibilidade, democratização, manipulação, direito universal/garantia de acesso, em questão). Para cada um: o que pede, a armadilha típica e roteiro de como responder. |
| **Temas** | 32 temas (13 oficiais de 2014 a 2026 + 19 de treino), filtráveis por eixo. Cada tema traz: recorte, núcleo temático (palavras que não podem faltar), vocabulário de apoio, repertórios sugeridos com sugestão de uso, comando identificado automaticamente e **3 textos motivadores** (96 no total). |
| **Redações analisadas** | 13 redações modelo nota 1000 (uma por tema oficial de 2014 a 2026) + 1 diagnóstico de fuga ao tema. Agrupadas por ano. Cada uma tem: comentário parágrafo a parágrafo, destaques coloridos (repertório, tese, problema, argumento, coesão, proposta), "por que é nota 1000", notas por competência e navegação entre anos. |
| **Corrigir** | Editor com a proposta ao lado (tema, recorte, comando, textos motivadores). Cole o texto, clique em **Corrigir** e receba: nota total com faixa (ex.: "entre 800 e 900"), nota por competência (0 a 200), para cada competência **por que não chegou a 200** (regra da grade + trecho do seu texto + o que falta para o próximo nível + como resolver), alertas (texto curto, >30 linhas, repertório citado sem desenvolver, violação de DH), prioridades (2 competências mais baixas com dica) e métricas. Salva histórico local no navegador (sem conta, sem servidor). |
| **Conteúdos** | Guia das 4 áreas do ENEM (Linguagens, Humanas, Natureza, Matemática) com 17 matérias e 80+ conteúdos. Cada página traz: resumo, "o que mais cai", fórmulas/esquemas, questões resolvidas comentadas (com gabarito oficial e por que as outras erram) e aula em vídeo recomendada. |
| **Programas** | Explicação clara e direta de Sisu, Prouni e FIES — o que cada um oferece, requisitos, diferenças e links para simuladores externos. |

---

## Como a Correção Funciona (Motor Heurístico)

O corretor analisa o texto nas **5 competências** seguindo os mesmos parâmetros da cartilha oficial Inep/FGV. O fluxo completo está em `js/engine/corrigir.js` e as avaliações individuais em `js/engine/competencias.js`.

### Arquivos Principais do Motor

| Arquivo | Responsabilidade |
|---------|------------------|
| `js/engine/corrigir.js` | Orquestração: recebe texto e opções, monta contexto, chama C1→C5, ajusta faixas (zero, tangenciamento, teto por amostra) e gera relatório final. |
| `js/engine/texto.js` | Utilitários: normalização (`normalizar`, `paraMinusculo`), segmentação (`extrairParagrafos`, `extrairFrases`, `extrairPalavras`), contagem (`contarTermo`, `encontrarTermos`), métricas (`medirTexto`, `extrairTrecho`), conversão de nota (`limitarNota`, `arredondarDegrau`, `converterParaOficial`, `nivelOficialDaNota`). |
| `js/engine/competencias.js` | Avaliadores C1 a C5. Cada um recebe o `contexto` e retorna nota (0–200), pontos fortes, melhorias e sinais ricos (desvios, cobertura, repertório, conectivos, elementos da proposta). |
| `js/engine/estilo.js` | Análise de estilo: repetição de palavra/termo/expressão/frase/abertura de período, pontuação escassa, períodos sem pausa, parágrafos sem ponto final, orações em série com "e". |
| `js/engine/explicacao.js` | Gera a explicação pedagógica: transforma sinais em "por que não chegou a 200" com título, regra da grade, evidência do texto, como resolver e próximo degrau. |
| `js/db/lexico.js` | Bases léxicas: 166 formas com erro de acentuação, 40 construções/regências, informalidades, conectivos por classe, repertório (instituições, autores, obras, dados), clichês, marcadores de tese/sustentação, proposta de intervenção, violação de DH, stopwords, regras de contexto (crase, concordância, pontuação via regex Unicode). |
| `js/db/niveis.js` | Escala interna de diagnóstico (11 degraus de 20 em 20, 0 a 200). **Nunca publicada** — serve só para o motor decidir. A nota que o usuário lê vem de `converterParaOficial()`. |
| `js/db/cartilhas.js` | Grades específicas C1–C5 destiladas das cartilhas de capacitação FGV/Inep: eixo, regra, o que conta, contagem, fonte. Princípio regente: *"o texto só sobe se cumprir integralmente o descritor; quando reúne características de dois níveis, fica no inferior"*. |

### Fluxo de Correção

1. **Recebimento** — `corrigir(texto, { temaId, temaLivre })`
   - `texto`: redação do usuário
   - `temaId`: ID do tema oficial (ex.: `"enem-2024"`) ou `"livre"`
   - `temaLivre`: texto do tema quando livre

2. **Normalização e Contexto** — `montarContexto(texto, tema)`
   - Quebra em parágrafos, frases, palavras
   - Métricas: caracteres, palavras, diversidade lexical, linhas estimadas
   - Identifica núcleo e apoio do tema (palavras-chave sem acento/minúsculas)
   - Analisa estilo (repetição, pontuação, conectivos)

3. **Avaliação das 5 Competências** — `avaliarCompetencia1` a `avaliarCompetencia5`
   - **C1** (Norma padrão): acentuação, construções, regras de contexto, informalidades, pontuação, repetição, períodos longos
   - **C2** (Tema e repertório): cobertura do núcleo/apoio, repertório sociocultural (instituições, autores, obras, dados), detecção de referências, gênero dissertativo-argumentativo, risco de tangenciamento
   - **C3** (Argumentação): tese na introdução, argumentos desenvolvidos, clichês, 1ª pessoa, estrutura de 4–5 parágrafos
   - **C4** (Coesão): conectivos (adição, oposição, causa, conclusão, explicação, finalidade, temporal, comparação), variedade, repetição, aberturas de parágrafo, teto por estilo
   - **C5** (Proposta): agente, ação, meio/modo, finalidade, detalhamento no bloco final; validação (não vago), violação de direitos humanos

4. **Ajustes e Composição da Nota** — em `corrigir.js`
   - **Nota zero**: texto < 40 chars, identificação (nome/turma/escola), risco de fuga total ao tema
   - **Tangenciamento**: se C2 indica risco e baixa cobertura, C2, C3 e C5 limitadas a 40 pts
   - **Teto por amostra** (`aplicarTetoPorAmostra`): <150 palavras → teto 120; <200 → 160; <240 → 180
   - **Oficializar** (`converterParaOficial`): converte pontos brutos em nota oficial (0, 40, 80, 120, 160, 200) + abertura (0, 20 ou 40) para faixa
   - **Nota total**: soma das 5 competências (máx. 1000) com faixa calculada

5. **Relatório Final** — Objeto com:
   - `notaTotal`, `notaTotalMax`, `faixa` (nome: "Excelente", "Muito bom", "Bom", "Básico", "Insuficiente")
   - `motivosZero` (se houver)
   - `competencias`: 5 avaliações detalhadas com `explicacao` (motivos, regra, evidência, como resolver, próximo nível)
   - `alertas`: texto curto, >30 linhas, repertório citado sem desenvolver, violação DH, muitos parágrafos
   - `prioridades`: 2 competências mais baixas + dica
   - `confianca`: "alta" (≥250 palavras, ≥4 parágrafos), "média" (≥120), "baixa"
   - `metricas`: caracteres, palavras, parágrafos, frases, média palavras/frase, diversidade, linhas

### Métodos Principais

#### `corrigir(texto, { temaId, temaLivre })`
```js
corrigir(texto, { temaId: 'enem-2024', temaLivre: '' })
```

#### `montarContexto(texto, tema)`
Retorna objeto com: `texto`, `norm` (normalizado), `tema`, `estilo`, `paras`, `fras`, `palavras`, `metricas`, `nucleo`, `apoio`, `normParas`.

#### Avaliadores por Competência
Cada `avaliarCompetenciaX(contexto)` retorna: `id`, `nome`, `resumo`, `nota` (0–200), `pontos`, `faixaNota`, `nivel`, `nivelOficial`, `fortes[]`, `melhorias[]`, `sinais{}`.

#### `converterParaOficial(pontos)`
```js
converterParaOficial(pontos) // → { nota, pontos, abertura, faixa: {min, max} }
```
- `nota`: 0, 40, 80, 120, 160 ou 200
- `abertura`: 0 (nível 5), 20 (firme no nível) ou 40 (já mostra próximo nível)
- `faixa`: `{min: nota, max: min + abertura}`

#### `aplicarTetoPorAmostra(pontos, palavras)`
Limita conforme tamanho: <150 palavras → 120; <200 → 160; <240 → 180.

---

## A Nota: Só as 6 Oficiais — Sempre Publicada como Faixa

Cada competência vale **0, 40, 80, 120, 160 ou 200** (grade oficial). **Não existe nota de 20 em 20** (180 não é nota da grade).

**O relatório mostra faixa**, não valor exato. A cartilha determina: *"a nota final será a média aritmética das notas totais atribuídas pelos dois avaliadores"*. Dois avaliadores divergem → publicar valor exato seria inventar precisão.

```
Competência:  nota oficial 160  →  "nota entre 160 e 200"
Nota final:   soma das oficiais →  "nota entre 800 e 900"
```

- **Abertura 20**: texto firme no nível → divergência previsível entre avaliadores
- **Abertura 40**: texto cumpre nível e mostra parte do descritor seguinte → 2º avaliador poderia subir
- **Faixa total ≤ 100 pontos** — limite para terceiro avaliador (diferença >100 total, >80 em competência, ou um zera e outro não)
- **Redação zerada não tem faixa** (dois avaliadores chegam ao 0)
- **Teto por amostra**: nenhuma competência passa de 120 (<150 palavras), 160 (<200), 180 (<240)

A conversão fica em `converterParaOficial()` (`js/engine/texto.js`): degrau interno → `nota = floor(pontos/40)*40` + `abertura`.

**Régua interna** (`js/db/niveis.js`): 11 degraus de 20 em 20 para o motor ter resolução. **Não é publicada**. Regra: `niveis.js` alimenta o motor, `converterParaOficial()` decide o que o estudante lê.

---

## O que o Corretor Marca — Como um Professor com a Cartilha na Mão

Além de acentuação, concordância e repertório, o motor mede o que um avaliador circula na margem (`js/engine/estilo.js`):

| Achado | Como é medido | Onde pesa |
|--------|--------------|-----------|
| **Palavra repetida** | Palavra de recheio a partir de 3 ocorrências; palavra de conteúdo a partir de 8 (ou 7 com variantes de radical) | C4: 8+ travam em 120; 3–7 em 160. C1: mesmo desconto |
| **Termo repetido no mesmo parágrafo** | 3+ ocorrências no mesmo parágrafo | C4: teto 160 |
| **Frase repetida** | 2 frases com ≥74% palavras em comum | C4: teto 120 · C3: teto 120 |
| **Expressão repetida** | Mesmo bloco de 3 palavras ≥3 vezes | C4: teto 160 |
| **Abertura de período repetida** | Mesmas 2 primeiras palavras em 3+ frases | C4: teto 160 |
| **Período sem pausa** | 30+ palavras sem vírgula/travessão/dois-pontos/ponto e vírgula | C1: desconto, nenhum 200 |
| **Parágrafo sem ponto final** | Último período do parágrafo em aberto | C1: desconto por parágrafo |
| **Pontuação escassa** | Média ≥22 palavras/frase com <0,6 vírgula/frase | C1: desconto, nenhum 200 |
| **Orações em série com "e"** | ≥2,2 "e" por frase | C1: desconto |
| **Período longo** | >40 palavras | C1: desconto (reincidência pesa mais) |

Cada achado vira cartão **"impede o 200"** (ou "pesa na nota") com: título, regra da grade, trecho do texto e correção concreta. Mesma lógica da cartilha: nível 5 admite no máximo 1 falha de estrutura e 2 desvios no texto inteiro.

---

## Interface e Design

- **Arquitetura CSS**: `css/tokens.css` → `css/components.css` → `css/layout.css` (importados em ordem)
- **Paleta**: Fundo preto carvão `#030607`, superfícies grafite, texto claro `#EEF2F0`, **verde-lima `#25E88C` restrito a CTAs, foco e pequenos detalhes**
- **Fontes**: **Fraunces** (display, serifada editorial) + **General Sans** (interface/texto). Self-hosted em `fonts/`
- **Ícones**: Família própria SVG inline (traço 1.75, grade 24). Sem bibliotecas externas
- **Espaçamento**: Escala única 4·8·12·16·24·32·48·72·112
- **Raio**: Cresce com elevação: 6 (etiqueta) · 10 (controle) · 16 (conteúdo) · 24 (faixa/vidro) · pílula
- **Movimento**: Cartões estáveis no hover (sem brilho que segue ponteiro nem inclinação 3D). Home: orbes de fundo flutuam lentamente. `prefers-reduced-motion` paralisa orbes
- **Superfícies**: Carvão fosco, bordas neutras, sombras discretas, contraste alto. Vidro usado com moderação
- **Tema**: Escuro fixo (tokens em `:root`)
- **Mobile-first**: Topo em 2 linhas com CTA "Corrigir" fixo, navegação rolável, toque ≥44px, tabelas reflow, editor acima do relatório com scroll automático à nota
- **Background 3D**: WebGL puro (~4 KB), lazy, só em ≥900px. Fallback aurora CSS. **Sem Three.js** (2.1 MB por fundo decorativo)
- **Acessibilidade**: Contraste ≥4.5:1, skip link, ARIA labels, `prefers-reduced-motion` respeitado

---

## Guia de Conteúdos (Áreas → Matérias → Conteúdo)

| Rota | Tela |
|------|------|
| `#/conteudos` | Sumário: 4 áreas, cada uma com matérias e contagem de conteúdos |
| `#/conteudos/materia/:id` | Lista de botões (um por conteúdo da matéria) |
| `#/conteudos/c/:id` | Resumo, "o que mais cai", fórmulas, questões resolvidas, aula em vídeo |

**Dados**: `js/db/conteudos/estrutura.js` guarda hierarquia (80 conteúdos em 17 matérias). Texto de cada conteúdo em `paginas-<area>.js` (buscado por `id` global e estável — link salvo no celular não vira 404 se título mudar).

**Vídeos**: `js/db/conteudos/videos.js` gerado por busca no YouTube (assunto + canal indicado). Título visível abaixo do player para conferir; para trocar, mude o `id` (11 chars, após `watch?v=`).

**Questões**: De edições anteriores do ENEM, com resolução comentada passo a passo e gabarito oficial. Transcritas dos PDFs oficiais do Inep (incluindo distratores). Se dependem de figura e não há imagem, a página avisa em vez de inventar.

**Regra editorial**: Nenhuma questão entra sem enunciado conferido na prova original e resolução escrita explicando por que as outras erram.

---

## Crase, Concordância e Pontuação — Regras de Contexto

A Competência I não se corrige com lista de palavras. `DESVIOS_CONSTRUCAO` pega forma fixa ("as vezes", "houveram", "menas"). O resto é **relação entre duas palavras** → `REGRAS_CONTEXTO` (regex Unicode com lookarounds, pois `\b` do JS não reconhece letras acentuadas).

| Grupo | Exemplos que a regra pega |
|-------|---------------------------|
| crase | "à partir", "à ser cobrados", "à todos", "a aquela questão", "devido a falta", "à nível de" |
| concordância verbal | "os jovens precisa", "as pessoas que não tem", "houveram muitos casos", "fazem dez anos", "existe pessoas", "falta recursos", "se tratam de" |
| concordância nominal | "os mesmo direitos", "as políticas pública", "duas vez", "meia cansada" |
| pontuação | Vírgula entre sujeito e verbo: "A sociedade, é responsável" |

**Decisões valem registro:**
1. **Falso positivo custa mais que omissão**. Regra que acusa redação boa estraga a ferramenta. Toda regra nova passa em `node test/gramatica.js`: zero acusações nas 14 redações modelo, 19 defeitos plantados encontrados, 8 frases corretas intocadas.
2. **`\b` não serve em português**. Usam-se lookarounds Unicode `(?<![\p{L}\p{N}])`. Foi o que fez a 1ª versão das regras de crase passar em branco.

Regras deliberadamente ausentes documentadas no fim de `lexico.js` (crase antes de lugar, vírgula antes de "que", concordância com "a maioria").

---

## Como a Explicação da Nota é Construída

Três camadas, todas rastreáveis:

1. **Regra** — `js/db/cartilhas.js` guarda a *grade específica* de cada competência (transcrita das cartilhas FGV/Inep) e `js/db/niveis.js` a leitura interna que traduz em pontos. Princípio regente: *"o texto só sobe se cumprir integralmente o descritor; quando reúne características de dois níveis, fica no inferior."*
2. **Sinal** — Avaliadores em `js/engine/competencias.js` medem o texto (desvios, cobertura do núcleo, repertório articulado, eixos desenvolvidos, operadores entre parágrafos, elementos da proposta) e guardam números + **trecho que sustenta cada achado**.
3. **Explicação** — `js/engine/explicacao.js` transforma sinal em frase: título do problema, `porque` com regra da grade, `evidencia` citada do texto, `comoResolver` com ação concreta, `proximoDegrau` com o que falta para subir.

**Exemplo (C2 com repertório citado não explicado):**

> **Repertório citado, mas sem uso produtivo (Constituição Federal, IBGE)**
> Esta é a diferença exata entre 160 e 200 na Competência II: a grade prevê "repertório legitimado e pertinente, mas com uso improdutivo" no nível 4 e reserva o nível 5 para o uso produtivo. Uso produtivo significa vincular o repertório à discussão — dizer o que ele prova sobre o seu argumento.
> *"Segundo o IBGE, milhões de brasileiros…"*
> **Como resolver:** depois de citar, escreva a frase que faltava: "Isso demonstra que…". Sem essa frase, o repertório é enfeite; com ela, vale 40 pontos a mais.

---

## Textos Motivadores

Toda proposta tem material de leitura, como na prova. São **96 textos** — 3 por tema, nos 32 temas:

| Campo | O que é |
|-------|---------|
| `titulo` | "Texto I", "Texto II", "Texto III" |
| `fonte` | Lei, autor, instituição e ano — sempre visível |
| `texto` | 40 a 70 palavras, registro de texto de apoio do ENEM |

Cobrem três entradas como a prova: **norma** (Constituição, ECA, leis), **dado** (IBGE, Inep, OIT, OMS) e **conceito** (autores/noções). Na página **Temas** ficam no bloco "Textos motivadores"; na **Corrigir** aparecem ao lado do editor.

> **Importante:** São **paráfrases e adaptações didáticas**, escritas para este material a partir de leis, dados públicos e conceitos. Fonte real creditada; texto **não** é transcrição oficial da prova nem citação literal de obra.

---

## Como Adicionar Conteúdo

### Nova redação analisada
Em `js/db/redacoes-2020-2026.js` (ou arquivo do período):

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

Tipos de destaque: `repertorio`, `tese`, `problema`, `argumento`, `conectivo`, `proposta`. O `trecho` deve aparecer literalmente no `texto`.

### Novo tema
Em `js/db/temas.js` (ou `temas-extra.js`): `{ id, tipo, eixo, ano, titulo, recorte, nucleo, apoio, repertorios }`.

### Textos motivadores do tema
Em `js/db/motivadores-oficiais.js` ou `motivadores-treino.js`:
```js
'id-do-tema': [
  { titulo: 'Texto I', fonte: 'Lei 8.080/1990 (adaptado)', texto: '...' }
]
```

**Atenção ao vocabulário**: `nucleo` e `apoio` são comparados sem acento/minúsculas. Escreva `matriz energetica`, nunca `matriz energética`. A interface restaura via `formatarTermo()` (`js/db/acentos.js`); para termo novo aparecer bonito, adicione ao mapa `ACENTOS`. Teste `test/acentos.js` confere normalização.

### Novo comando de tema
Em `js/db/comandos.js`: `{ id, palavra, temas, oQuePede, armadilha, comoFazer }`. Vínculo automático via `identificarComandoDoTema()`.

**Após qualquer mudança**: `python3 tools/build-standalone.py`.

---

## Testes

```bash
node test/engine.test.js         # exemplos do corretor
node test/casos.test.js          # casos-limite: fuga ao tema, texto curto, tema livre
node test/redacoes.test.js       # 13 redações nota 1000 pontuam na faixa alta
node test/explicacoes.test.js    # 1374 checagens: toda competência < 200 tem motivo, regra, evidência
node test/niveis.test.js         # 796 checagens: 6 notas oficiais, faixa por competência e total
node test/acentos.test.js        # 832 checagens: mapa de acentos e vocabulário dos temas
node test/calibragem.test.js     # 64 checagens: repetição, pontuação, teto, faixa sem nota exata
node test/gramatica.test.js      # crase, concordância, pontuação: 19 defeitos, 8 corretas, 14 modelos
```

**Estado atual**: 1374/1374 (explicações), 796/796 (notas/faixas), 832/832 (acentos), 64/64 (calibragem), 13 redações nota 1000 na faixa alta (920–1000).

---

## Estrutura de Arquivos

```
index.html                      # Shell do site (navegação por hash: #/competencias, #/corrigir, ...)
standalone.html                 # Build de arquivo único (HTML + CSS + JS + fontes em data URI)
css/tokens.css                  # Design tokens: cores, espaçamento, tipografia, raio, sombras, transições, z-index
css/components.css              # Componentes: botões, cards, tabelas, formulários, alertas, badges
css/layout.css                  # Layout: header, hero, sections, footer, grid, responsividade, impressão
fonts/*.woff2                   # Fraunces + General Sans (subsets latin/latin-ext)
js/ui.js                        # Roteamento (hash) e renderização de todas as telas
js/interface-conteudos.js       # Renderização do guia de conteúdos (sumário, matéria, conteúdo, subtema)
js/navegacao.js                 # Controle do menu mobile (IIFE, sem imports)
js/movimento.js                 # Animações acessíveis, indicador de leitura, entrada de página
js/vidro.js                     # Compatibilidade; brilho/inclinação por cursor desativados
js/fundo.js                     # Background WebGL opcional (lazy, ≥900px), fallback CSS
js/engine/texto.js              # Utilitários textuais + degraus e nota oficial
js/engine/estilo.js             # Repetição (palavra, expressão, frase, abertura) e pontuação
js/engine/competencias.js       # Avaliadores C1..C5 + montarContexto, fecharAvaliacao
js/engine/corrigir.js           # Orquestração, nota zero, tangenciamento, alertas, prioridades
js/engine/explicacao.js         # Por que não chegou a 200 (regra + evidência + ação)
js/db/lexico.js                 # Léxicos: acentuação, construções, regras contexto, informalidades, conectivos, repertório, clichês, marcadores, proposta, violação DH, stopwords
js/db/criterios.js              # 5 competências + descritores oficiais de nível + o que derruba/levanta + exemplos
js/db/estrutura.js              # Partes da redação, esqueleto 30 linhas, elementos da proposta
js/db/comandos.js               # 11 comandos de tema + regra geral + identificarComandoDoTema
js/db/cartilhas.js              # Grades específicas C1–C5 (FGV/Inep): eixo, regra, o que conta, contagem, fonte
js/db/niveis.js                 # Escala interna diagnóstico (20 em 20) — nunca publicada
js/db/temas.js                  # Banco de temas oficiais (núcleo + apoio + repertórios + eixo)
js/db/temas-extra.js            # 2º bloco de temas de treino (anexado a TEMAS)
js/db/motivadores-oficiais.js   # Textos motivadores dos 13 temas oficiais
js/db/motivadores-treino.js     # Textos motivadores dos 19 temas de treino
js/db/motivadores.js            # Agregador: MOTIVADORES + buscarMotivadoresDe(temaId)
js/db/acentos.js                # Restaura acento/maiúscula do vocabulário na interface (formatarTermo)
js/db/redacoes-2014-2019.js     # Análises 2014–2019
js/db/redacoes-2020-2026.js     # Análises 2020–2026 + diagnóstico
js/db/redacoes.js               # Índice das análises, cores dos destaques (TIPOS_DESTAQUE)
js/db/exemplos.js               # Textos dos botões de exemplo do corretor
js/db/conteudos/                # Guia Enem: estrutura.js (hierarquia), paginas-*.js, expansao-*.js, subtemas-*.js, questoes-*.js, videos.js, grupos-*.js
tools/build-standalone.py       # Gera standalone.html (embute CSS, JS, fontes em data URI)
test/                           # Testes do motor (node)
../uploads/                     # Cartilhas capacitação (PDF) + texto extraído em uploads/txt/
```

---

## Decisões de Estilo (Resumo)

| Item | Decisão |
|------|---------|
| Cores | Base `#030607`; superfícies `#060D09`/`#0A1611`; texto `#EEF2F0`/`#9AA8A1`; **verde-lima `#25E88C` só em CTAs, foco, detalhes** |
| Fontes | **Fraunces** (display) + **General Sans** (UI/texto). Self-hosted |
| Ícones | SVG inline próprio (traço 1.75, grade 24). Sem Lucide/bibliotecas |
| Espaçamento | Escala única 4·8·12·16·24·32·48·72·112 |
| Raio | 6·10·16·24·pílula (cresce com elevação) |
| Movimento | Cartões estáveis no hover; orbes só na home; `prefers-reduced-motion` paralisa |
| Superfícies | Carvão fosco, bordas neutras, sombras discretas, contraste alto |
| Tema | Escuro fixo (tokens em `:root`) |
| Mobile | Topo 2 linhas, CTA fixo, nav rolável, toque ≥44px, tabelas reflow, editor > relatório, scroll à nota |
| 3D | WebGL puro ~4KB, lazy, ≥900px; fallback CSS. **Sem Three.js** |
| Marca | Logo: aspas brancas em quadrado arredondado esmeralda |
| Seções | Formato derivado do conteúdo (régua, timeline, acordeão, lista, workspace) |

Contraste: todo texto ≥4.5:1; onde há vidro, camada de escurecimento atrás do texto.

---

## Notas Importantes

- **Redações analisadas** são **modelos didáticos** que reconstroem o padrão nota 1000. Não são transcrições oficiais.
- **Descritores de nível** são do guia oficial ENEM; campos didáticos (derruba/levanta/exemplos) escritos para este material.
- **Textos motivadores** são adaptações didáticas (ver seção acima), não reproduções oficiais.
- **Nota publicada** é sempre uma das 6 da grade (0, 40, 80, 120, 160, 200) e **sempre vem como faixa** ("nota entre X e Y"): a nota do ENEM é média de dois avaliadores que divergem. Nenhum relatório mostra nota exata.
- **Motor de correção é heurístico**: mede desvios de grafia, aderência ao vocabulário do tema, tese/sustentação, variedade de conectivos, 5 elementos da proposta. **Não interpreta sentido**. Correção oficial é humana, com dois avaliadores independentes.

### Histórico Local e Conteúdos Acessados

Ao clicar em **Corrigir**, a redação, tema, data e relatório original são salvos no **localStorage do navegador**, sem criar conta nem enviar dados a servidor. Abra/exclua cada redação em "Suas redações neste navegador". Exemplos corrigidos automaticamente não entram no histórico até o usuário clicar em **Corrigir**.

Nas listas de matérias, ✓ **Acessado** indica que a página foi aberta naquele navegador, não que o estudo foi concluído. Dá para apagar marcações sem apagar redações. Histórico e marcações **não sincronizam** entre navegadores/dispositivos e podem sumir ao limpar dados do navegador; navegação privada também pode descartá-los. Se não houver espaço ou armazenamento estiver bloqueado, o site avisa. Em dispositivos compartilhados, outras pessoas com acesso ao navegador podem ler os dados. O backup JSON exportável contém redações e acessos — guarde em local privado; a importação combina dados, sem apagar atuais.

---

## 👥 Créditos

Este projeto nasceu da colaboração entre concepção pedagógica e desenvolvimento técnico:

| Função | Responsável |
|--------|-------------|
| **Idealização, Concepção e Backend (Lógica/Métodos)** | **João Pedro Campos Rocha** — Definição do escopo, regras de negócio, algoritmos de correção, estrutura de dados, grades por competência, base de temas/textos motivadores/redações, regras de crase/concordância/pontuação, heurísticas de avaliação, teto por amostra, tangenciamento, nota zero, calibragem. |
| **Frontend e Interface** | **Claude Code** — Arquitetura da interface (SPA com hash routing), design system (tokens, componentes, layout), tipografia, paleta, ícones SVG, animações acessíveis, renderização de todas as telas (Home, Competências, Estrutura, Comandos, Temas, Redações, Corrigir, Conteúdos, Programas), responsividade mobile-first, WebGL background, build standalone, acessibilidade (ARIA, skip link, prefers-reduced-motion), histórico local (localStorage), exportação/importação de backup. |

> **João Pedro Campos Rocha** — Estudante de Sistemas de Informação no IFBA (campus Vitória da Conquista). Projeto voluntário, independente, sem fins lucrativos.
> **Contato**: jprocha.tech@gmail.com · [GitHub](https://github.com/jpedro-io) · [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-pedro-c-rocha-98ab7b3b5) · [Portfólio](https://portfolio-ivory-eta-p7jmkacusy.vercel.app)

---

## Licença

Uso educacional livre. Não oficial, não afiliado ao Inep/MEC. As redações modelo são reconstruções didáticas do padrão nota 1000.