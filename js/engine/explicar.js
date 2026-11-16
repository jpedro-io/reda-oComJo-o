/**
 * EXPLICAÇÃO DA NOTA — por que a competência não chegou a 200.
 *
 * Cada motivo segue a mesma estrutura:
 *   titulo      o que foi encontrado no texto
 *   porque      a regra da grade específica que impede o 200 (com a fonte)
 *   evidencia   o trecho do próprio texto que sustenta a observação
 *   comoResolver a ação concreta para subir de degrau
 *
 * As regras vêm de js/db/cartilhas.js (destilado das cartilhas da FGV/Inep).
 */

/* sem alias de import: o build offline remove as linhas de import e deixa um
escopo só, nomes aliasados quebrariam o standalone ("EXIGES is not defined"). */
import { GRADES, EXIGE, PARA_SUBIR } from '../db/cartilhas.js';
import { NIVEIS, nivelDe } from '../db/niveis.js';

const motivo = (gravidade, titulo, porque, evidencia, comoResolver, exemplos = []) =>
  ({ gravidade, titulo, porque, evidencia, comoResolver, exemplos });

/**
 * Bloco de nível da explicação, agora em uma régua só: a da cartilha (0 a 5).
 * O motor continua lendo o texto em passos de 20 internamente, mas o que o
 * estudante vê é o nível oficial, a nota oficial e a FAIXA em que dois
 * avaliadores poderiam fechar a mesma competência.
 */
function base(id, comp) {
  const g = GRADES[id];
  const nota = Math.max(0, Math.min(200, comp.nota ?? 0));
  const oficial = Math.max(0, Math.min(5, Math.floor(nota / 40)));
  const prox = Math.min(5, oficial + 1);
  const faixa = comp.faixaNota || { min: nota, max: Math.min(200, nota + 40) };
  return {
    eixo: g.eixo,
    regra: g.regra,
    fonte: g.fonte,
    nivel: {
      n: oficial,
      pontos: nota,
      nota,
      oficial,
      faixa,
      exige: g.niveis[oficial],
      exigeOficial: g.niveis[oficial],
      exigeCurto: EXIGE[id][oficial] || ''
    },
    nivelTexto: g.niveis[oficial],
    nivelTextoProximo: g.niveis[prox],
    proximo: oficial >= 5 ? null : {
      n: prox,
      pontos: prox * 40,
      oficial: prox,
      exige: g.niveis[prox],
      faltou: (PARA_SUBIR[id] || {})[oficial] || null
    }
  };
}

function sintese(comp, motivos) {
  const faixa = comp.faixaNota || { min: comp.nota, max: comp.nota };
  const intervalo = faixa.max > faixa.min ? `${faixa.min} e ${faixa.max}` : `${faixa.min}`;
  if (comp.nota === 200) {
    return 'Chegou a 200/200: nesta amostra o texto cumpre integralmente o descritor do nível máximo. O que aparece abaixo são observações de refinamento, não impedimentos.';
  }
  if (!motivos.length) {
    return `Faixa de ${intervalo}/200: nesta amostra o texto cumpre o descritor do nível alcançado, e a diferença para o nível seguinte é o que o segundo avaliador poderia reconhecer.`;
  }
  const primeiro = motivos[0];
  return `Faixa de ${intervalo}/200 porque ${primeiro.titulo.charAt(0).toLowerCase()}${primeiro.titulo.slice(1).replace(/\.$/, '')}.`;
}

/* ------------------------------------------------------------------ */
/* C1 — norma padrão                                                   */
/* ------------------------------------------------------------------ */

export function explicarC1(comp) {
  const s = comp.sinais || {};
  const e = s.exemplos || {};
  const motivos = [];
  const total = s.totalDesvios || 0;
  const grafia = e.grafia || [];
  const construcao = e.construcao || [];
  const informal = e.informalidade || [];
  const longas = e.frasesLongas || [];

  if (total > 2) {
    const lista = [
      ...grafia.map(g => `“${g.forma}” → “${g.correto}”${g.n > 1 ? ` (${g.n}× no texto)` : ''}`),
      ...construcao.map(c => `“${c.padrao}” → “${c.sugestao}”`)
    ].slice(0, 5);
    motivos.push(motivo(
      total > 8 ? 'alta' : 'media',
      `${total} desvios de norma padrão, o nível 5 admite no máximo 2`,
      'A grade da Competência I é combinatória: o 200 exige, ao mesmo tempo, estrutura sintática excelente (no máximo uma falha) e no máximo dois desvios no texto inteiro. E a regra geral manda ficar com o nível inferior quando o texto reúne características de dois níveis, por isso três desvios já bastam para tirar a redação do nível 5, mesmo com a estrutura impecável.',
      grafia[0]?.contexto || construcao[0]?.contexto || null,
      total > 6
        ? 'Priorize os desvios que se repetem: a recorrência é o que pesa mais na leitura do conjunto. Releia o texto em voz alta, a boca escuta o que o olho pula.'
        : 'Falta pouco: elimine esses desvios na revisão final e o texto volta ao nível 5.',
      lista
    ));
  }

  if (informal.length) {
    motivos.push(motivo(
      'media',
      `Escolha de registro: ${informal.map(i => `“${i.termo}”`).join(', ')}`,
      '“Escolha de registro” está escrito no próprio descritor da competência: marcas de oralidade e de informalidade são desvios, não estilo. Na grade, elas entram na mesma contagem dos desvios gramaticais.',
      informal[0]?.contexto || null,
      'Troque a marca de fala pela forma escrita equivalente: “pra” → “para”, “aí” → “então/neste ponto”, “coisa” → o substantivo exato. Se a palavra não existe no registro formal, ela não entra na redação.'
    ));
  }

  if (longas.length) {
    motivos.push(motivo(
      longas.length > 1 ? 'alta' : 'media',
      `${longas.length} período(s) com mais de 45 palavras`,
      'A estrutura sintática é metade da grade da Competência I: o nível 5 aceita no máximo uma falha. Período longo demais costuma virar período truncado ou mal pontuado, a falha mais comum apontada na cartilha é justamente o truncamento e a justaposição de orações que deveriam estar no mesmo período.',
      longas[0] ? `“${longas[0]}”` : null,
      'Divida o período em dois: localize a vírgula que separa duas ideias completas e troque por ponto final. Um período com mais de 45 palavras quase sempre tem duas ideias dentro.'
    ));
  }

  /* ---- pontuação: desvio de norma, como qualquer outro ---------------- */
  const semPausa = s.exemplosPontuacao?.semPausa || [];
  const semPontoFinal = s.semPontoFinal === true;
  const parasSemPonto = s.paragrafosSemPonto || 0;
  const escassa = s.pontuacaoEscassa === true;
  const eEncadeado = s.encadeamentoComE === true;

  if (semPausa.length) {
    motivos.push(motivo(
      semPausa.length > 1 ? 'alta' : 'media',
      `${semPausa.length} período(s) longo(s) sem nenhuma pausa interna`,
      '“Pontuação” aparece no descritor da Competência I junto de ortografia e concordância: não é enfeite, é norma. A cartilha aponta a justaposição de orações (período que atravessa 30, 40 palavras sem uma vírgula, um travessão ou dois-pontos) como falha de estrutura sintática, e o nível 5 admite no máximo uma falha.',
      `“${semPausa[0]}…”`,
      'Localize onde termina a primeira ideia e ponha um sinal: ponto final para separar, vírgula para enumerar, dois-pontos para explicar. Se o período passa de 30 palavras sem pausa, quase sempre há duas orações independentes dentro dele.'
    ));
  }

  if (semPontoFinal || parasSemPonto > 0) {
    motivos.push(motivo(
      'media',
      semPontoFinal ? 'O texto não termina com ponto final' : `${parasSemPonto} parágrafo(s) sem ponto final`,
      'Fechar o período é parte da convenção da escrita: o parágrafo que termina sem ponto deixa a última oração em aberto e o leitor sem a marca de encerramento. A grade trata isso como desvio de pontuação, na mesma conta dos desvios de grafia.',
      null,
      'Revise o fim de cada parágrafo. Todo parágrafo fecha com ponto final; a última frase do texto também.'
    ));
  }

  if (escassa) {
    motivos.push(motivo(
      'media',
      `Pontuação escassa: ${s.exemplosPontuacao?.mediaPalavrasFrase} palavras por frase e ${s.exemplosPontuacao?.virgulasPorFrase} vírgula(s) por frase`,
      'A cartilha chama de justaposição quando as orações se encostam sem sinal de relação. Um texto com períodos longos e quase nenhuma vírgula é lido de uma respirada só, e o avaliador registra isso como falta de recursos de pontuação, não como fluência.',
      null,
      'Regra prática: nenhum período passa de 25 a 30 palavras sem uma pausa. Use a vírgula para o adjunto deslocado e para a enumeração, e o ponto para separar as ideias que se completam.'
    ));
  }

  if (eEncadeado) {
    motivos.push(motivo(
      'media',
      'Orações em série ligadas por “e”',
      'A coordenação em cadeia (“... e faltam médicos e as filas crescem e as pessoas desistem”) é o retrato da falta de hierarquia sintática. A grade do nível 5 pede estrutura sintática excelente, com subordinação, e a cartilha lista a justaposição por coordenação como falha.',
      null,
      'Troque metade dos “e” por uma relação explícita: causa (“porque”, “visto que”), consequência (“de modo que”, “por isso”) ou concessão (“embora”). Onde a ideia é independente, use ponto final.'
    ));
  }

  const repeticoes = e.repeticoes || [];
  if (repeticoes.length && total <= 2) {
    motivos.push(motivo(
      'baixa',
      `Repetição de termos: ${repeticoes.map(r => `“${r.termo}” (${r.n}×)`).join(', ')}`,
      'A escolha vocabular faz parte do descritor da Competência I, mas a repetição que trava a nota é cobrada sobretudo na Competência IV (retomada por sinônimos e pronomes). Aqui ela entra como sinal de revisão: some da conta quando o texto varia o vocabulário.',
      null,
      'Alterne com sinônimos e retomadas pronominais (“esse cenário”, “tal prática”).'
    ));
  }

  return { ...base('C1', comp), motivos, sintese: sintese(comp, motivos) };
}

/* ------------------------------------------------------------------ */
/* C2 — tema, tipologia e repertório                                   */
/* ------------------------------------------------------------------ */

export function explicarC2(comp) {
  const s = comp.sinais || {};
  const motivos = [];

  const cobertura = s.cobertura ?? 0;
  const ausentes = s.nucleoAusente || [];

  if (cobertura < 100) {
    motivos.push(motivo(
      cobertura < 50 ? 'alta' : 'media',
      comp.nota === 200
        ? `O recorte cobre ${cobertura}% do vocabulário do núcleo da proposta`
        : `O recorte do tema aparece em ${cobertura}% do núcleo da proposta`,
      'A grade da Competência II exige “abordagem completa do tema” para o nível 4, e o nível 5 herda essa exigência. Abordar o assunto não é abordar o tema: quando a proposta é tratada só em parte, o avaliador entende que o texto fala de um assunto vizinho, é o que separa tangência de recorte cumprido.',
      s.exemploParagrafoTema ? `“${s.exemploParagrafoTema}…”` : null,
      ausentes.length
        ? `Incorpore as palavras da própria proposta no seu texto, não como citação solta, mas como objeto da discussão: ${ausentes.slice(0, 5).join(', ')}.`
        : 'Retome o recorte em cada parágrafo, e não só na introdução.'
    ));
  }

  if (!s.repertoriosExibiveis?.length) {
    motivos.push(motivo(
      'alta',
      'Nenhum repertório sociocultural legitimado identificado',
      'Sem repertório legitimado e pertinente ao tema, o texto não alcança o nível 4, e o nível 5 exige ainda o uso produtivo. Repertório legitimado é o que se identifica como produzido nas áreas do conhecimento: lei, artigo, autor, obra, dado de instituição, fato histórico.',
      null,
      'Traga duas referências que você realmente entenda: uma legal ou institucional (Constituição, lei, órgão, dado) e uma de outra área (autor, obra, conceito). Diga o que cada uma demonstra.'
    ));
  } else if (!(s.repertoriosArticulados > 0)) {
    motivos.push(motivo(
      'alta',
      `Repertório citado, mas sem uso produtivo (${s.repertoriosExibiveis.slice(0, 3).join(', ')})`,
      'Esta é a diferença exata entre 160 e 200 na Competência II: a grade prevê “repertório legitimado e pertinente, mas com uso improdutivo” no nível 4 e reserva o nível 5 para o uso produtivo. Uso produtivo significa vincular o repertório à discussão, dizer o que ele prova sobre o seu argumento.',
      s.exemploCitacaoSolta ? `“${s.exemploCitacaoSolta}…”` : null,
      'Depois de citar, escreva a frase que faltava: “Isso demonstra que…”, “Esse dado evidencia que…”. Sem essa frase, o repertório é enfeite; com ela, vale 40 pontos a mais.'
    ));
  }

  if (s.limitePorExtensao) {
    motivos.push(motivo(
      'alta',
      `Desenvolvimento reduzido (${s.limitePorExtensao})`,
      'O descritor fala em “desenvolver o tema por meio de argumentação consistente”. Um texto curto não tem espaço para dois eixos e uma proposta completa; a grade não premia o que não foi dito.',
      null,
      'Ocupe as 30 linhas: introdução de 4 a 6, dois desenvolvimentos de 7 a 8 e conclusão de 5 a 7. Se o assunto acabou antes disso, o argumento não foi desenvolvido.'
    ));
  }

  if ((s.paragrafosComTema ?? 0) <= 1) {
    motivos.push(motivo(
      'media',
      'O tema aparece concentrado em um único parágrafo',
      'A grade exige as três partes do texto com função: introdução, argumentação e conclusão. Se o recorte só aparece na introdução, a argumentação corre solta, e o avaliador lê isso como abordagem parcial.',
      null,
      'Abra cada parágrafo de desenvolvimento retomando o recorte da proposta antes de apresentar o argumento.'
    ));
  }

  return { ...base('C2', comp), motivos, sintese: sintese(comp, motivos) };
}

/* ------------------------------------------------------------------ */
/* C3 — projeto de texto e desenvolvimento                             */
/* ------------------------------------------------------------------ */

export function explicarC3(comp) {
  const s = comp.sinais || {};
  const motivos = [];
  const desenvolvidos = s.argumentosDesenvolvidos ?? 0;

  if (!s.tese) {
    motivos.push(motivo(
      'alta',
      'Não há tese identificável na introdução',
      'Sem tese não existe “direção”: a grade da Competência III avalia o projeto de texto, quais argumentos, em que ordem, a serviço de que ponto de vista. Se o leitor não sabe o que você defende, o texto é lido como “abordagem completa do tema e sem direção”, que é o nível 2.',
      s.exemploIntro ? `“${s.exemploIntro}…”` : null,
      'Feche a introdução com uma afirmação sua sobre a causa ou a natureza do problema: “Esse cenário persiste porque…”. A tese é uma frase, não um tema.'
    ));
  }

  if (desenvolvidos < 2) {
    motivos.push(motivo(
      'alta',
      desenvolvidos === 1
        ? 'Apenas um argumento desenvolvido em todo o texto'
        : 'Nenhum argumento desenvolvido, os parágrafos enunciam sem explicar',
      desenvolvidos === 1
        ? 'A grade reserva o nível 3 para “desenvolvimento de algumas informações, fatos e opiniões” e exige, no nível 5, desenvolvimento em todo o texto. Com um único eixo sustentado, o projeto de texto fica incompleto: sobra espaço para a opinião, falta argumento.'
        : 'A grade é explícita: “sem desenvolvimento ou com desenvolvimento de apenas uma informação, fato ou opinião” não passa do nível 3, e, sem direção, cai ao nível 2. Enunciar não é argumentar: falta a frase que explica por que aquilo é verdade.',
      s.exemploParagrafoFraco ? `“${s.exemploParagrafoFraco}…”` : null,
      'Cada parágrafo de desenvolvimento precisa de: tópico frasal (o argumento em uma frase) + repertório ou dado + explicação + arremate ligando à tese. Se você apagar o parágrafo e a tese continuar de pé, ele não estava argumentando.'
    ));
  }

  if ((s.cliches ?? 0) > 0) {
    motivos.push(motivo(
      (s.cliches ?? 0) >= 3 ? 'media' : 'baixa',
      `Fórmulas genéricas: ${(s.exemplosCliches || []).map(c => `“${c}”`).join(', ')}`,
      'A competência avalia autoria, selecionar, relacionar, organizar e interpretar. Fórmula pronta não seleciona nada: serve para qualquer tema e, por isso, não sustenta ponto de vista.',
      null,
      'Substitua cada fórmula por uma afirmação específica do seu argumento: em vez de “desde os tempos remotos”, diga o fato, a data ou o mecanismo.'
    ));
  }

  if ((s.primeiraPessoa ?? 0) > 0) {
    motivos.push(motivo(
      'media',
      `Marcas de 1ª pessoa (${(s.exemplosPrimeiraPessoa || []).map(p => `“${p.termo}”`).join(', ')})`,
      'O texto dissertativo-argumentativo do Enem exige impessoalidade; a 1ª pessoa desloca o texto para o relato pessoal e enfraquece o projeto de texto.',
      (s.exemplosPrimeiraPessoa || [])[0]?.contexto || null,
      'Use “constata-se”, “é possível observar”, “percebe-se”. Se precisar de experiência, atribua a um sujeito coletivo: “a sociedade brasileira”, “os jovens”.'
    ));
  }

  return { ...base('C3', comp), motivos, sintese: sintese(comp, motivos) };
}

/* ------------------------------------------------------------------ */
/* C4 — coesão                                                         */
/* ------------------------------------------------------------------ */

export function explicarC4(comp) {
  const s = comp.sinais || {};
  const motivos = [];
  const transicoes = s.transicoesParagrafo ?? 0;
  const classes = s.classesCoesivas || [];

  if (transicoes < 2) {
    motivos.push(motivo(
      transicoes === 0 ? 'alta' : 'media',
      transicoes === 0
        ? 'Nenhum operador argumentativo ligando os parágrafos'
        : 'Apenas um momento de articulação entre parágrafos',
      'A grade da Competência IV é explícita: o nível 4 exige elemento coesivo do tipo operador argumentativo entre parágrafos em pelo menos um momento do texto; o nível 5 exige isso em pelo menos dois momentos E ao menos um elemento coesivo dentro de todos os parágrafos. Sem essa ligação, o texto para no nível 3 por mais conectivos que tenha dentro das frases.',
      null,
      'Abra o segundo desenvolvimento com “Além disso,” ou “Outrossim,” e a conclusão com “Portanto,” ou “Diante disso,”. Dois conectivos em posição de abertura já cumprem essa exigência.'
    ));
  }

  if (classes.length < 4) {
    motivos.push(motivo(
      'media',
      `Apenas ${classes.length} classe(s) de conectivo no texto`,
      '“Presença expressiva de elementos coesivos” não é quantidade, é variedade: a grade fala em recursos inter e intraparágrafos. Repetir o mesmo “além disso” mostra articulação de um só tipo de relação.',
      null,
      'Combine as quatro relações básicas: adição (“além disso”), oposição (“entretanto”), causa (“visto que”) e conclusão (“portanto”). Uma de cada por parágrafo já basta.'
    ));
  }

  const semArt = s.exemplosSemArticulacao || [];
  if (semArt.length) {
    motivos.push(motivo(
      'media',
      `${semArt.length} parágrafo(s) com três ou mais frases e nenhum articulador interno`,
      'Para o nível 5 a grade pede pelo menos um elemento coesivo dentro de todos os parágrafos. Parágrafo com frases justapostas quebra essa exigência naquele parágrafo específico, e a regra do nível inferior derruba o conjunto.',
      `Parágrafo ${semArt[0].paragrafo}: “${semArt[0].inicio}…”`,
      'Ligue a segunda frase à primeira com “isso”, “esse cenário”, “tal prática”, “por isso”. A retomada pronominal já é elemento coesivo.'
    ));
  }

  if (s.exemploConectivoRepetido) {
    motivos.push(motivo(
      'baixa',
      `O conectivo “${s.exemploConectivoRepetido.termo}” aparece ${s.exemploConectivoRepetido.n} vezes`,
      'A grade fala em “repetições” como um dos fatores que impedem o nível máximo. A repetição mecânica do mesmo operador é justamente o que o avaliador registra como repertório coesivo pobre.',
      null,
      'Guarde o conectivo mais forte para a conclusão e varie nos outros parágrafos.'
    ));
  }

  /* ---- repetição: o núcleo do que a grade cobra na C4 ------------------ */
  const grave = s.repeticaoGrave || [];
  const mediaRep = s.repeticaoMedia || [];
  const leve = s.repeticaoLeve || [];
  const mesmosParas = s.noMesmoParagrafo || [];
  const frasesRep = s.frasesRepetidas || [];
  const expressoes = s.expressoesRepetidas || [];
  const aberturas = s.aberturasRepetidas || [];

  if (frasesRep.length) {
    motivos.push(motivo(
      'alta',
      frasesRep.length === 1
        ? 'Uma frase do texto se repete literalmente'
        : `${frasesRep.length} frases se repetem literalmente`,
      'A grade da Competência IV cobra progressão: cada parágrafo deve acrescentar informação. Repetir a mesma frase (mesmo com outra roupa) é a definição de texto que não progride, e o avaliador marca isso tanto na coesão quanto na coerência.',
      `“${frasesRep[0].frase}…”`,
      'Corte a segunda ocorrência e escreva o que ela deveria acrescentar: uma consequência (“por isso, a fila cresce”), um exemplo ou um dado. Se não houver nada a acrescentar, o parágrafo é dispensável.'
    ));
  }

  if (grave.length) {
    motivos.push(motivo(
      'alta',
      'Palavra martelada: ' + grave.slice(0, 3).map(a => `“${a.termo}” (${a.n}×)`).join(', '),
      'A grade é explícita ao pedir “retomada por sinônimos ou pronomes” e ao listar as repetições entre os fatores que impedem o nível 5. Quando o mesmo termo volta oito vezes, o problema deixa de ser escolha vocabular e passa a ser mecanismo de coesão ausente.',
      null,
      'Na primeira ocorrência, mantenha o termo. Na segunda, use um sinônimo; na terceira, um pronome ou uma expressão referencial (“esse quadro”, “tal prática”); na quarta, elipse (deixe o sujeito oculto).'
    ));
  } else if (mediaRep.length) {
    motivos.push(motivo(
      'media',
      'Repetição de termo: ' + mediaRep.slice(0, 3).map(a => `“${a.termo}” (${a.n}×)`).join(', '),
      'A cartilha cobra a retomada por sinônimo ou pronome. Repetir o mesmo termo seis, sete vezes ao longo do texto é o mínimo que o avaliador registra como repetição, e repetição é um dos itens que impedem o nível 5.',
      null,
      'Alterne: sinônimo na segunda ocorrência, pronome relativo ou demonstrativo na terceira. Se o termo é técnico e não tem sinônimo, use “esse conceito”, “tal prática”.'
    ));
  } else if (leve.length >= 2) {
    motivos.push(motivo(
      'baixa',
      'Palavras de recheio repetidas: ' + leve.slice(0, 3).map(a => `“${a.termo}” (${a.n}×)`).join(', '),
      '“Problema”, “pessoas”, “muito”, “questão” não são vocabulário do tema: são recheio. Repetir recheio mostra que o texto fala do assunto sem dizer nada específico, e a grade pede que a articulação se faça com recursos, não com palavras vazias.',
      null,
      'Cada vez que “problema” aparecer, pergunte qual é o problema: falta de médicos, fila, subfinanciamento. A palavra genérica vira informação concreta.'
    ));
  }

  if (mesmosParas.length && !grave.length && !mediaRep.length) {
    motivos.push(motivo(
      'media',
      'Termo repetido dentro do mesmo parágrafo: ' + mesmosParas.slice(0, 3).map(a => `“${a.termo}”`).join(', '),
      'Dentro de um parágrafo, a repetição fica colada na leitura: o avaliador vê as duas ocorrências na mesma linha. A cartilha pede retomada por sinônimo ou pronome exatamente para evitar isso.',
      null,
      'No mesmo parágrafo, use o pronome na segunda menção: “as pessoas… elas”, “o governo… ele não”, “a lei… tal dispositivo”.'
    ));
  }

  if (expressoes.length && (s.tetoEstilo ?? 200) <= 160) {
    motivos.push(motivo(
      'baixa',
      'Expressão repetida: ' + expressoes.slice(0, 2).map(o => `“${o.expressao}” (${o.n}×)`).join(', '),
      'Repetir o mesmo bloco de palavras é repetir a mesma frase em escala menor. A grade trata disso como repetição, e o repertório coesivo deixa de ser “expressivo” quando o texto se repete.',
      null,
      'Guarde a expressão para uma ocorrência e reformule as outras duas com estrutura diferente.'
    ));
  }

  if (aberturas.length) {
    motivos.push(motivo(
      'baixa',
      'Abertura de período repetida: ' + aberturas.slice(0, 2).map(o => `“${o.abertura}…”`).join(', '),
      'Começar três períodos com as mesmas palavras deixa o texto monocórdio e é registrado como repetição. A grade pede variedade nos recursos de articulação, não só nos conectivos.',
      null,
      'Inverta a ordem dos termos, comece pelo adjunto ou use uma retomada pronominal na abertura.'
    ));
  }

  if ((s.retomadas ?? 0) < 3) {
    motivos.push(motivo(
      'baixa',
      'Poucas retomadas por pronome ou expressão referencial',
      'A coesão também se faz por referenciação: retomar sem repetir. Um texto que sempre repete o substantivo depende só de conectivos para se articular.',
      null,
      'Use “esse cenário”, “tal prática”, “esse grupo”, “isso” para retomar a ideia anterior sem repetir palavra por palavra.'
    ));
  }

  return { ...base('C4', comp), motivos, sintese: sintese(comp, motivos) };
}

/* ------------------------------------------------------------------ */
/* C5 — proposta de intervenção                                        */
/* ------------------------------------------------------------------ */

const ELEMENTOS = {
  agente: {
    nome: 'agente',
    porque: 'sem dizer quem executa, o leitor preenche a lacuna por você, e a cartilha é clara: só conta o agente textualmente marcado.',
    exemplo: '“cabe ao Ministério da Saúde…”'
  },
  acao: {
    nome: 'ação',
    porque: 'a ação é o núcleo da proposta: um verbo claro que diga o que deve ser feito.',
    exemplo: '“…ampliar a cobertura da atenção básica…”'
  },
  meio: {
    nome: 'meio/modo',
    porque: 'o meio é o instrumento, sem ele, a proposta fica no desejo (“é preciso conscientizar”) em vez de virar providência.',
    exemplo: '“…por meio da revisão dos repasses federais…”'
  },
  finalidade: {
    nome: 'finalidade/efeito',
    porque: 'a finalidade liga a proposta ao problema discutido; é o que mostra que a intervenção resolve o que o texto apontou.',
    exemplo: '“…a fim de garantir acesso nas regiões vulneráveis…”'
  },
  detalhamento: {
    nome: 'detalhamento',
    porque: 'o detalhamento é o que separa a proposta detalhada da vaga: explicar por que a ação funciona, para quem, ou com que critério.',
    exemplo: '“…visto que são essas localidades que dependem exclusivamente do sistema público.”'
  }
};

export function explicarC5(comp) {
  const s = comp.sinais || {};
  const motivos = [];
  const presentes = s.elementos || [];
  const faltando = s.faltando || [];

  if ((s.violacaoDH || []).length) {
    motivos.push(motivo(
      'alta',
      'A proposta pode ferir direitos humanos',
      'A Competência V é zerada quando a intervenção desrespeita os direitos humanos, é a única situação, além da ausência, que zera uma competência isolada.',
      (s.blocoProposta || '').slice(0, 200),
      'Reescreva a proposta sem punição violenta, tortura ou “justiça com as próprias mãos”. Propostas de prevenção e de política pública sempre passam.'
    ));
  }

  if (!presentes.length) {
    motivos.push(motivo(
      'alta',
      'Não foi identificada proposta de intervenção no fechamento',
      'A contagem da grade parte do zero: sem proposta não há elementos. E atenção a um caso que a cartilha destaca, constatação de falta não é proposta: “falta liberdade de escolha” aponta o problema; “é preciso garantir a liberdade de escolha” aponta a solução.',
      s.blocoProposta ? `“${s.blocoProposta}…”` : null,
      'Reserve o último parágrafo para a proposta completa: agente + ação + meio + finalidade + detalhamento, em duas a quatro linhas.'
    ));
  } else if (faltando.length) {
    const listaExemplos = faltando.map(k => `• ${ELEMENTOS[k].nome}, ${ELEMENTOS[k].exemplo}`).join('\n');
    motivos.push(motivo(
      'alta',
      faltando.length === 1
        ? `Falta 1 dos 5 elementos: ${faltando.map(k => ELEMENTOS[k].nome).join(', ')}`
        : `Faltam ${faltando.length} dos 5 elementos: ${faltando.map(k => ELEMENTOS[k].nome).join(', ')}`,
      `A pontuação da Competência V é uma contagem objetiva: 5 elementos = 200, 4 = 160, 3 = 120, 2 = 80, 1 = 40. Seu texto tem ${presentes.length}. Cada elemento que falta custa 40 pontos, e o que falta não é “escrever mais”, é cumprir a função que o elemento tem na proposta.`,
      s.blocoProposta ? `“${s.blocoProposta}…”` : null,
      `Complete assim:\n${listaExemplos}`,
      faltando.map(k => `${ELEMENTOS[k].nome}: ${ELEMENTOS[k].porque}`)
    ));
  }

  if (s.agenteImpreciso) {
    motivos.push(motivo(
      'alta',
      'A ação aparece sem agente nomeado',
      'A cartilha trata como elemento nulo o agente que não permite identificar o ator social (“alguém”, “ninguém”, “você”, imperativo sem vocativo). E não vale pressupor: se o texto diz “é necessário criar leis”, não se pode supor que o agente é o Governo.',
      null,
      'Nomeie o órgão ou grupo: “o Ministério da Educação”, “as secretarias municipais”, “as escolas públicas”. “Todos”, “as pessoas”, “nós” e “a sociedade” são agentes válidos.'
    ));
  }

  if (s.propostaCurta && presentes.length >= 3) {
    motivos.push(motivo(
      'media',
      'A proposta foi resolvida em uma frase curta',
      'Mesmo com elementos presentes, a frase única costuma deixá-los implícitos. A grade conta elementos, e o avaliador só conta o que está escrito.',
      s.blocoProposta ? `“${s.blocoProposta}…”` : null,
      'Desdobre a frase em duas ou três: uma para agente e ação, outra para o meio, outra para a finalidade e o detalhamento.'
    ));
  }

  return { ...base('C5', comp), motivos, sintese: sintese(comp, motivos) };
}

/* ------------------------------------------------------------------ */

const EXPLICADORES = {
  C1: explicarC1,
  C2: explicarC2,
  C3: explicarC3,
  C4: explicarC4,
  C5: explicarC5
};

/**
 * Anexa `explicacao` a cada competência avaliada.
 * Quando a redação é anulada, as competências vão a 0 mesmo que o recorte
 * técnico estivesse preservado — e a explicação precisa dizer isso.
 */
export function explicarCompetencias(comps = []) {
  return comps.map(c => {
    const fn = EXPLICADORES[c.id];
    if (!fn) return c;

    const explicacao = fn(c);

    if (c.nota === 0 && !explicacao.motivos.length) {
      const original = typeof c.notaOriginal === 'number' ? c.notaOriginal : null;
      explicacao.motivos.push(motivo(
        'alta',
        'Competência zerada pela situação de nota zero',
        `A redação foi anulada, e a anulação alcança todas as competências: fuga ao tema, até 7 linhas, trecho desconectado, gênero diferente do pedido ou desrespeito à seriedade do exame levam a nota a 0 em C1–C5. ${original ? `Nesta competência, isoladamente, o texto estava em ${original}/200, mas a anulação prevalece.` : ''}`,
        null,
        'Resolva primeiro o motivo da anulação. Enquanto ele existir, nenhuma competência pontua.'
      ));
      explicacao.sintese = 'Ficou em 0/200 porque a redação foi anulada, a anulação zera as cinco competências.';
    }

    // toda nota abaixo de 200 precisa de um motivo explícito, mesmo quando o
    // motor não achou defeito além de o descritor seguinte não estar cumprido
    if (c.nota < 200 && !explicacao.motivos.length) {
      const alvo = explicacao.proximo;
      explicacao.motivos.push(motivo(
        'baixa',
        alvo ? `Falta cumprir o descritor de ${alvo.pontos}: ${alvo.exige}` : 'Falta cumprir integralmente o descritor de 200',
        `Nesta amostra nenhum defeito objetivo foi encontrado, e o texto cumpre o descritor de ${c.nota}. A nota não sobe porque o nível seguinte exige o descritor inteiro, por escrito, e é aí que o segundo avaliador também não subiria sozinho. A faixa do relatório mostra até onde a dupla de avaliadores poderia chegar.`,
        null,
        alvo
          ? `Cumpra por escrito o que o descritor de ${alvo.pontos} pede; a diferença entre ele e o seu texto é o que falta.`
          : 'Volte ao descritor de 200 e cumpra-o por escrito.'
      ));
      explicacao.sintese = sintese(c, explicacao.motivos);
    }

    // numa competência que chegou a 200, o que sobrou são observações, não impedimentos
    if (c.nota === 200) {
      explicacao.motivos = explicacao.motivos.map(m => ({ ...m, gravidade: 'baixa' }));
    }

    return { ...c, explicacao };
  });
}
