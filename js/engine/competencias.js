import {
  normalizar, minusculo, paragrafos, frases, palavras, contarTermo, contarLista,
  termosEncontrados, trecho, limitar, degrau, nivel, oficializar
} from './texto.js';
import { analisarEstilo } from './estilo.js';
import {
  ERROS_ACENTUACAO, DESVIOS_CONSTRUCAO, REGRAS_CONTEXTO, INFORMALIDADES, PRIMEIRA_PESSOA,
  CONECTIVOS, REPERTORIO, CLICHES, MARCADORES_TESE, MARCADORES_SUSTENTACAO,
  INTERVENCAO, VIOLACAO_DH, STOPWORDS
} from '../db/lexico.js';

/* ------------------------------------------------------------------ */
/* CONTEXTO                                                            */
/* ------------------------------------------------------------------ */

export function montarContexto(texto, tema) {
  const paras = paragrafos(texto);
  const frs = frases(texto);
  const ws = palavras(texto);
  const carac = texto.length;
  const semStop = ws.filter(p => p.length > 3);
  const unicas = new Set(semStop);
  const nucleo = tema?.nucleo || [];
  const apoio = tema?.apoio || [];
  const norm = normalizar(texto);

  const termosDoTema = [...nucleo, ...apoio];
  return {
    texto,
    norm,
    tema,
    estilo: analisarEstilo(texto, termosDoTema),
    paras,
    fras: frs,
    palavras: ws,
    metricas: {
      caracteres: carac,
      palavras: ws.length,
      paragrafos: paras.length,
      frases: frs.length,
      linhas: Math.max(texto.split('\n').length, Math.ceil(carac / 66)),
      mediaPalavrasFrase: frs.length ? Math.round(ws.length / frs.length) : 0,
      diversidade: semStop.length ? +(unicas.size / semStop.length).toFixed(2) : 0
    },
    nucleo,
    apoio,
    normParas: paras.map(p => normalizar(p))
  };
}

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA I — norma padrão                                        */
/* ------------------------------------------------------------------ */

export function avaliarC1(ctx) {
  const fortes = [], melhorias = [], sinais = {};
  const original = minusculo(ctx.texto);
  let desconto = 0;

  // 1. acentuação / ortografia
  const erros = [];
  for (const [sem, com] of ERROS_ACENTUACAO) {
    if (sem === com) continue;
    const re = new RegExp(`\\b${sem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const achados = original.match(re) || [];
    if (achados.length > 0) {
      erros.push({ forma: sem, correto: com, n: achados.length });
    }
  }
  // "acesso", "sociedade" etc. são invariáveis: removemos falsos positivos
  const errosReais = erros.filter(e => e.forma !== e.correto);
  const totalOcorr = errosReais.reduce((a, e) => a + e.n, 0);
  /* Cartilha da Competência I, §3.5.3: desvio de convenção da escrita conta
     UMA vez por vocábulo, ainda que a palavra se repita no texto (“brasil”
     minúsculo três vezes = 1 desvio). Repetir o mesmo erro não multiplica a
     contagem — mas mostra falta de revisão, e é isso que entra na conta. */
  const vocabulos = errosReais.length;
  sinais.desviosOrtograficos = totalOcorr;
  sinais.vocabulosComDesvio = vocabulos;
  if (vocabulos > 0) {
    desconto += Math.min(90, vocabulos * 14 + Math.min(2, totalOcorr - vocabulos) * 4);
    const top = errosReais.slice(0, 4)
      .map(e => `“${e.forma}” → “${e.correto}”${e.n > 1 ? ` (${e.n}×)` : ''}`)
      .join(' · ');
    melhorias.push(`Grafia a revisar: ${top}. ` + (totalOcorr > vocabulos
      ? 'O mesmo desvio volta em outras ocorrências: pela cartilha conta um desvio por vocábulo, mas a repetição do erro mostra que faltou revisão.'
      : ''));
  }

  // 2. construções e regências
  const construcoes = [];
  for (const d of DESVIOS_CONSTRUCAO) {
    const n = d.bruto
      ? contarTermo(ctx.texto.toLowerCase().replace(/\s+/g, ' '), d.padrao)
      : contarTermo(ctx.norm, d.padrao);
    if (n > 0) {
      construcoes.push({ ...d, n });
      desconto += Math.max(4, Math.round(12 * (d.peso ?? 1))) * Math.min(n, 3);
    }
  }
  sinais.desviosConstrucao = construcoes.reduce((a, c) => a + c.n, 0);
  if (construcoes.length) {
    melhorias.push('Construções a ajustar: ' + construcoes.slice(0, 3)
      .map(c => `“${c.padrao}” → “${c.sugestao}”`).join(' · ') + '.');
  }

  /* 2b. crase, concordância verbal e nominal, pontuação — dependem de contexto
     (relação entre duas palavras), não de forma fixa. Ver REGRAS_CONTEXTO. */
  const achados = [];
  for (const regra of REGRAS_CONTEXTO) {
    const ms = original.match(regra.re);
    if (!ms || !ms.length) continue;
    // o mesmo trecho pode ser pego por duas regras; conta uma vez
    const trechos = [...new Set(ms.map(m => m.trim().replace(/^[.;:!?\s]+/, '')))];
    achados.push({ id: regra.id, tipo: regra.tipo, sugestao: regra.sugestao,
      n: trechos.length, trechos, peso: regra.peso ?? 1 });
    desconto += Math.max(4, Math.round(12 * (regra.peso ?? 1))) * Math.min(trechos.length, 3);
  }
  sinais.desviosContexto = achados.reduce((a, c) => a + c.n, 0);
  sinais.porTipo = achados.reduce((acc, c) => {
    acc[c.tipo] = (acc[c.tipo] || 0) + c.n;
    return acc;
  }, {});
  if (achados.length) {
    /* agrupado por tipo, e com o trecho do aluno entre aspas: sem o trecho o
       aluno sabe a regra, mas não sabe onde ela foi quebrada. */
    const porTipo = new Map();
    for (const c of achados) {
      if (!porTipo.has(c.tipo)) porTipo.set(c.tipo, []);
      porTipo.get(c.tipo).push(c);
    }
    for (const [tipo, lista] of porTipo) {
      const total = lista.reduce((a, c) => a + c.n, 0);
      const amostra = lista.slice(0, 2)
        .map(c => `“${c.trechos[0]}” → ${c.sugestao}`).join(' · ');
      melhorias.push(`${tipo.charAt(0).toUpperCase()}${tipo.slice(1)}`
        + `, ${total} ${total === 1 ? 'ocorrência' : 'ocorrências'}: ${amostra}`);
    }
  }

  // 3. registro informal
  const informalidades = termosEncontrados(ctx.norm, INFORMALIDADES);
  sinais.informalidades = informalidades.length;
  if (informalidades.length) {
    desconto += Math.min(40, informalidades.length * 8);
    melhorias.push(`Registro informal: ${informalidades.slice(0, 5).map(t => `“${t}”`).join(', ')}. Na redação, mantenha a modalidade escrita formal.`);
  }

  // 4. pontuação inadequada
  const pontuacaoRuim = (ctx.texto.match(/[!?]{2,}|\?!|,,|\.\.\.\.|,,/g) || []).length;
  sinais.pontuacaoInadequada = pontuacaoRuim;
  if (pontuacaoRuim > 0) {
    desconto += Math.min(20, pontuacaoRuim * 6);
    melhorias.push('Excesso de sinais de exclamação/interrogação ou pontuação repetida, prefira a pontuação própria do texto argumentativo.');
  }

  /* 5. repetição de palavras — mesma régua da Competência IV (estilo.js), para
     que o mesmo texto não receba dois veredictos sobre repetição: palavra de
     recheio (GENÉRICAS) a partir de 3 ocorrências, palavra de conteúdo a
     partir de 7, agrupando radical. Termos do tema ficam fora: repetir o
     assunto é obrigatório, não é desvio. */
  const repetidas = (ctx.estilo?.repeticao || []).slice(0, 3);
  sinais.repeticoes = repetidas.length;
  if (repetidas.length) {
    const grave = repetidas.some(r => r.n >= 7);
    desconto += Math.min(45, repetidas.reduce((a, r) => a + (r.n >= 7 ? 16 : 8), 0));
    melhorias.push('Repetição de termos: ' + repetidas
      .map(r => `“${r.termo}” (${r.n}×)` + (r.variantes ? ` [${r.variantes.join(', ')}]` : ''))
      .join(', ') + (grave
        ? '. A cartilha cobra retomada por sinônimo, pronome ou elipse; com esse número de voltas, a repetição é um desvio de norma, não uma escolha de estilo.'
        : '. Troque a segunda e a terceira ocorrências por sinônimo ou pronome.'));
  }

  // 6. frases muito longas
  const longas = ctx.fras.filter(f => palavras(f).length > 45).length;
  sinais.frasesLongas = longas;
  if (longas > 0) {
    desconto += Math.min(15, longas * 5);
    melhorias.push(`${longas} período(s) com mais de 45 palavras, risque a vírgula e divida em duas orações para ganhar clareza.`);
  }

  // 7. diversidade lexical (bônus qualitativo)
  if (ctx.metricas.diversidade >= 0.62 && totalOcorr <= 2) {
    fortes.push(`Vocabulário variado (diversidade lexical de ${ctx.metricas.diversidade}) e poucos desvios de grafia.`);
  }
  if (ctx.metricas.mediaPalavrasFrase >= 14 && ctx.metricas.mediaPalavrasFrase <= 28) {
    fortes.push(`Períodos com extensão equilibrada (média de ${ctx.metricas.mediaPalavrasFrase} palavras por frase).`);
  }

  sinais.exemplos = {
    grafia: errosReais.slice(0, 4).map(e => ({
      forma: e.forma, correto: e.correto, n: e.n, contexto: trecho(ctx.texto, e.forma)
    })),
    construcao: construcoes.slice(0, 3).map(c => ({
      padrao: c.padrao, sugestao: c.sugestao, n: c.n, contexto: trecho(ctx.texto, c.padrao)
    })),
    informalidade: informalidades.slice(0, 4).map(t => ({ termo: t, contexto: trecho(ctx.texto, t) })),
    frasesLongas: ctx.fras.filter(f => palavras(f).length > 45).slice(0, 2)
      .map(f => f.trim().slice(0, 160)),
    repeticoes: repetidas.map(r => ({ termo: r.termo, n: r.n }))
  };
  /* ---- pontuação e estrutura do período (cartilha, Competência I) -----
     A grade cobra "pontuação" como parte do domínio da norma escrita: período
     que atravessa 32 palavras sem uma pausa, parágrafo que não fecha com ponto
     e texto que termina emendado são desvios de pontuação, não estilo. */
  const pt = ctx.estilo.pontuacao;
  const semPausa = pt.periodosSemPausa.length;
  const semPontoParag = pt.paragrafosSemPonto.length;
  let descontoPontuacao = 0;

  if (semPausa > 0) {
    descontoPontuacao += Math.min(54, semPausa * 18);
    melhorias.push(semPausa === 1
      ? 'Há um período longo (32+ palavras) sem nenhuma pausa interna. Coloque vírgula, dois-pontos ou ponto e vírgula, ou divida em dois períodos.'
      : `${semPausa} períodos longos (32+ palavras) sem nenhuma pausa interna. A leitura trava: separe as orações com pontuação.`);
  }
  if (pt.semPontoFinal) {
    descontoPontuacao += 12;
    melhorias.push('O texto (ou o último parágrafo) não termina com ponto final. Fechar o período é parte da norma escrita.');
  }
  if (semPontoParag > 0) {
    descontoPontuacao += Math.min(24, semPontoParag * 8);
    melhorias.push(`${semPontoParag} parágrafo(s) sem ponto final: cada parágrafo precisa fechar o seu último período.`);
  }
  if (pt.pontuacaoEscassa) {
    descontoPontuacao += 20;
    melhorias.push(`Pontuação escassa: média de ${pt.mediaPalavrasFrase} palavras por frase com apenas ${pt.virgulasPorFrase} vírgula(s) por frase. O texto é lido de uma respirada só.`);
  }
  if (pt.encadeamentoComE) {
    descontoPontuacao += 15;
    melhorias.push('Excesso de coordenação com “e” ligando orações em série. Troque parte por subordinação (porque, embora, de modo que) ou por ponto final.');
  }
  /* A vírgula entre orações independentes fica registrada em sinais, mas não
     desconta: sem análise sintática, a mesma marca aparece em texto excelente
     (período longo, bem pontuado) e em texto corrido. Só o que é objetivo —
     ausência de pausa, de ponto final, densidade de vírgula — entra na conta. */

  sinais.periodosSemPausa = semPausa;
  sinais.paragrafosSemPonto = semPontoParag;
  sinais.semPontoFinal = pt.semPontoFinal;
  sinais.pontuacaoEscassa = pt.pontuacaoEscassa;
  sinais.encadeamentoComE = pt.encadeamentoComE;
  sinais.emendasComVirgula = pt.emendasComVirgula.length;
  sinais.exemplosPontuacao = {
    semPausa: pt.periodosSemPausa.slice(0, 2),
    semPontoFinal: pt.semPontoFinal,
    paragrafosSemPonto: pt.paragrafosSemPonto,
    emendas: pt.emendasComVirgula.slice(0, 2),
    mediaPalavrasFrase: pt.mediaPalavrasFrase,
    virgulasPorFrase: pt.virgulasPorFrase,
    ePorFrase: pt.ePorFrase
  };

  /* pontuação limpa = nenhum desvio de pontuação ou de estrutura do período */
  const pontuacaoLimpa = semPausa === 0 && !pt.semPontoFinal && !pt.pontuacaoEscassa &&
    !pt.encadeamentoComE;
  sinais.pontuacaoLimpa = pontuacaoLimpa;

  /* crase, concordância e pontuação de contexto contam como desvio de norma:
     entram na mesma conta da grafia e das construções, não numa caixa à parte */
  const contextuais = sinais.desviosContexto || 0;
  sinais.totalDesvios = totalOcorr + sinais.desviosConstrucao + informalidades.length + contextuais;

  /* ---- degrau na escala de 20 em 20 (js/db/niveis.js) ----------------
     A escala intermediária mede duas coisas ao mesmo tempo: GRAVIDADE e
     REPETIÇÃO. Por isso o desvio de estrutura sintática (falha de construção,
     regência truncada) pesa o dobro do desvio de convenção, e tudo é lido em
     densidade — desvios por 100 palavras — para que um texto de 30 linhas não
     seja punido pelo tamanho nem um texto curto esconda o problema. */
  const leves = totalOcorr + informalidades.length + pontuacaoRuim + contextuais;
  const falhas = sinais.desviosConstrucao;
  const totalDesvios = leves + falhas;
  /* a pontuação entra na densidade em peso próprio: são desvios que o avaliador
     marca um por um, e a cartilha os trata como norma, não como escolha */
  const densidade = +(((leves + falhas * 2 + descontoPontuacao / 6) /
    Math.max(1, ctx.metricas.palavras)) * 100).toFixed(2);
  sinais.descontoPontuacao = descontoPontuacao;

  sinais.desviosLeves = leves;
  sinais.falhasEstrutura = falhas;
  sinais.densidadeDesvios = densidade;

  /* Estrutura praticamente inexistente = ininteligível (nível 0 da grade).
     Cuidado: texto SEM pontuação nenhuma também vira uma única "frase" gigante.
     Isso não é ininteligibilidade — é falta de pontuação, que a grade cobra
     como desvio. Por isso o zero só vale quando há período marcado no texto. */
  const frasesPlausiveis = ctx.fras.filter(f => palavras(f).length >= 6).length;
  const temPontuacaoDePeriodo = pt.pontos >= Math.max(1, ctx.paras.length);
  const semEstrutura = ctx.metricas.palavras > 40 && temPontuacaoDePeriodo &&
    frasesPlausiveis < Math.max(1, Math.ceil(ctx.paras.length / 2));

  /* 200 e 180 não podem ser "ausência de erro encontrado": exigem PROVA de
     estrutura sintática. Período coordenado simples, sem subordinação e com
     pontuação de duas marcas, não demonstra domínio excelente — demonstra
     texto fácil de escrever. */
  const subordinativas = contarLista(ctx.norm, ['porque', 'embora', 'enquanto',
    'apesar de', 'visto que', 'uma vez que', 'ja que', 'caso', 'quando', 'conforme',
    'ainda que', 'mesmo que', 'a medida que', 'de modo que', 'portanto', 'porem',
    'contudo', 'entretanto', 'assim que', 'sempre que', 'desde que', 'a fim de que']);
  const pontuacaoRica = /[;:—–()]/.test(ctx.texto);
  const medidaOk = ctx.metricas.mediaPalavrasFrase >= 12 && ctx.metricas.mediaPalavrasFrase <= 30;
  sinais.subordinativas = subordinativas;
  sinais.pontuacaoRica = pontuacaoRica;
  // "excelente domínio" = texto sem desvio, com período construído (não só
  // coordenação curta) e pontuação que organiza as relações
  const estruturaExemplar = subordinativas >= 2 && medidaOk && pontuacaoLimpa &&
    (pontuacaoRica || ctx.metricas.mediaPalavrasFrase >= 15);

  let nota;
  if (semEstrutura) nota = 0;                       // ininteligível
  else if (densidade >= 16) nota = 20;
  else if (densidade >= 12) nota = 40;
  else if (densidade >= 9) nota = 60;
  else if (densidade >= 7) nota = 80;
  else if (densidade >= 5) nota = 100;
  else if (densidade >= 3.2) nota = 120;
  else if (totalDesvios >= 3) nota = 140;           // 3 a 5 desvios leves
  else if (totalDesvios === 0 && estruturaExemplar) nota = 200;
  else if (totalDesvios === 0 && pontuacaoLimpa) nota = 180;   // sem desvio, sem prova de excelência
  else if (totalDesvios === 0) nota = 160;          // grafia limpa, mas período/pontuação falhos
  else if (falhas === 0 && pontuacaoLimpa) nota = 180;         // 1 ou 2 desvios muito leves
  else nota = 160;                                  // até 2 desvios + 1 falha

  if (totalOcorr === 0 && construcoes.length === 0 && informalidades.length === 0) {
    fortes.push(pontuacaoLimpa
      ? 'Nenhum desvio ortográfico, de regência, de registro ou de pontuação identificado nesta amostra.'
      : 'Grafia e regência sem desvios, o que pesa aqui é a pontuação e a estrutura do período.');
  }

  if (nota === 180 && totalDesvios === 0) {
    melhorias.push('Não há desvio de norma, mas a estrutura ainda é simples: para chegar a 200 o texto precisa mostrar subordinação variada (causa, concessão, condição, consequência) e pontuação que organize essas relações (vírgula, dois-pontos, ponto e vírgula).');
  }

  /* degrau interno 180: nenhum desvio, pontuação limpa, mas sem prova de estrutura
     exemplar (subordinação + pontuação rica). O texto cumpre o 160 inteiro e
     já mostra parte do 200 — vale 180, não 160. */
  sinais.intermediario = totalDesvios === 0 && pontuacaoLimpa && !estruturaExemplar;

  return fechar('C1', nota, fortes, melhorias, sinais,
    'Domínio da norma padrão',
    'Ortografia, acentuação, pontuação, concordância, regência e escolha vocabular.', ctx);
}

/* ------------------------------------------------------------------ */
/* RIGOR: TETO DE AMOSTRA E PROVAS DO TOPO                             */
/* ------------------------------------------------------------------ */

/**
 * Um texto curto não tem como COMPROVAR o descritor do nível máximo.
 * A ausência de defeito em 10 linhas não é domínio excelente — é amostra
 * pequena. O teto abaixo impede que a nota alta venha do pouco que o texto
 * não teve chance de errar.
 */
export function tetoPorAmostra(pontos, palavras) {
  if (palavras < 150) return Math.min(pontos, 120);
  if (palavras < 200) return Math.min(pontos, 160);
  if (palavras < 240) return Math.min(pontos, 180);
  return pontos;
}

/**
 * Fecha a competência.
 *
 * A nota publicada é SEMPRE a oficial da grade (0, 40, 80, 120, 160, 200).
 * Junto dela vai a FAIXA: quanto o segundo avaliador ainda poderia subir nesta
 * competência. É a faixa que aparece no site — nunca um número exato, porque a
 * nota final do Enem é a média aritmética de dois avaliadores que divergem.
 */
function fechar(id, nota20, fortes, melhorias, sinais, nome, resumo, ctx) {
  const brutos = degrau(nota20, 0, 200);
  const comTeto = tetoPorAmostra(brutos, ctx.metricas.palavras);

  const oficial = oficializar(comTeto);
  const { nota, pontos, abertura, faixa } = oficial;

  sinais.tetoAmostra = comTeto < brutos ? brutos - comTeto : 0;
  sinais.pontosDiagnostico = pontos;
  sinais.abertura = abertura;
  sinais.faixaNota = faixa;
  /* o texto "já mostra parte do descritor seguinte": é o que abre a faixa em 40 */
  sinais.proximoNivel = pontos % 40 === 20;

  return {
    id, nome, resumo,
    nota,                        // nota oficial: 0, 40, 80, 120, 160 ou 200
    pontos,                      // leitura interna da mesma nota (uso do motor)
    faixaNota: faixa,            // { min, max } — o intervalo publicado
    nivel: nivel(pontos),
    nivelOficial: Math.floor(nota / 40),
    fortes, melhorias, sinais
  };
}

/* ------------------------------------------------------------------ */
/* DETECÇÃO DE REFERÊNCIA EXTERNA                                      */
/* ------------------------------------------------------------------ */

/**
 * Reconhece referências legitimadas por PADRÃO, e não só por lista fechada.
 * Uma lista de autores famosos nunca cobre o repertório de 30 mil candidatos:
 * "Lei 10.436", "Declaração de Salamanca" e "Vygotsky" são referências
 * legítimas que não estavam no léxico. Aqui o motor procura as três formas
 * mais comuns de citação: norma jurídica numerada, documento-título e autor
 * apresentado por verbo de dizer.
 */
const NORMA = /\b(lei|decreto|resolu[çc][ãa]o|estatuto|constitui[çc][ãa]o|declara[çc][ãa]o|conven[çc][ãa]o|portaria|emenda(?:\s+constitucional)?|artigo)\s+(?:n[ºo°.]?\s*)?\d[\d.]*(?:\s*\/\s*\d{2,4})?(?:\s*,?\s*de\s*\d{4})?/gi;

const TITULO = /\b(Declara[çc][ãa]o|Conven[çc][ãa]o|Estatuto|Constitui[çc][ãa]o|Tratado|Relat[óo]rio)\s+(?:de\s+|do\s+|da\s+)?[A-ZÁ-Ú][a-zà-ÿ]{2,}/g;

const AUTOR = /\b(?:segundo|conforme|de acordo com|na vis[ãa]o de|na perspectiva de|como)\s+(?:o|a|os|as)?\s*(?:demonstrou|demonstra|defende|defendeu|afirma|afirmou|mostrou|mostra|aponta|apontou|explicou|explica|sustenta|sustentou|observou|observa|analisou|analisa|lembrou|lembra|descreveu|descreve|chamou|chama|definiu|define|considera|critica|criticou)?\s*([A-ZÁ-Ú][a-zà-ÿ]{2,}(?:\s+(?:de|da|do)\s+[A-ZÁ-Ú][a-zà-ÿ]+)?)/g;

const NAO_E_REFERENCIA = new Set([
  'brasil', 'enem', 'exame nacional', 'pais', 'sociedade', 'governo', 'estado',
  'ministerio', 'secretaria', 'escola', 'família', 'familia'
]);

/** Lista de referências externas encontradas no texto (forma legível). */
export function detectarReferencias(texto) {
  const achados = [];
  const coletar = (re, grupo = 0) => {
    let m;
    const r = new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g');
    while ((m = r.exec(texto)) !== null) {
      const bruto = (m[grupo] || '').replace(/\s+/g, ' ').replace(/[.,;:]$/, '').trim();
      if (bruto.length < 4) continue;
      if (NAO_E_REFERENCIA.has(normalizar(bruto))) continue;
      achados.push(bruto);
    }
  };
  coletar(NORMA, 0);
  coletar(TITULO, 0);
  coletar(AUTOR, 1);

  // remove duplicatas preservando a primeira grafia
  const vistos = new Set();
  return achados.filter(a => {
    const k = normalizar(a);
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
}

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA II — tema, gênero e repertório                          */
/* ------------------------------------------------------------------ */

export function avaliarC2(ctx) {
  const fortes = [], melhorias = [], sinais = {};
  const nucleoTotal = ctx.nucleo.length;
  const nucleoHits = termosEncontrados(ctx.norm, ctx.nucleo);
  const apoioHits = termosEncontrados(ctx.norm, ctx.apoio);
  const cobertura = nucleoTotal ? nucleoHits.length / nucleoTotal : 0;
  const relevancia = +(0.65 * cobertura + 0.35 * Math.min(1, apoioHits.length / 6)).toFixed(2);

  sinais.coberturaTema = Math.round(cobertura * 100);
  sinais.termosTema = nucleoHits.slice(0, 8);
  sinais.vocabularioApoio = apoioHits.length;

  // repertório
  const grupos = {
    'instituição/lei/dado': termosEncontrados(ctx.norm, REPERTORIO.instituicoes),
    'autor/filósofo': termosEncontrados(ctx.norm, REPERTORIO.autores),
    'obra/filme/livro': termosEncontrados(ctx.norm, REPERTORIO.obras),
    'dado/estatística': termosEncontrados(ctx.norm, REPERTORIO.dados)
  };
  const referencias = detectarReferencias(ctx.texto);
  sinais.referencias = referencias.slice(0, 6);
  const todosRepertorios = [...new Set([
    ...Object.values(grupos).flat(),
    ...referencias.map(normalizar)
  ])];
  const MARCADORES_GENERICOS = new Set(['%', 'por cento', 'segundo', 'de acordo com',
    'dados do', 'pesquisa', 'estudo', 'levantamento', 'censo', 'relatorio', 'indice']);
  const exibiveis = [...new Set([
    ...grupos['autor/filósofo'],
    ...grupos['obra/filme/livro'],
    ...grupos['instituição/lei/dado'].filter(x => !MARCADORES_GENERICOS.has(x)),
    ...grupos['dado/estatística'].filter(x => !MARCADORES_GENERICOS.has(x)),
    ...referencias
  ])];
  sinais.repertorios = [...new Set(todosRepertorios)].slice(0, 10);
  sinais.repertoriosExibiveis = exibiveis.slice(0, 5);

  // articulação: o repertório aparece numa frase que o explica?
  let articulados = 0;
  const frasesCtx = ctx.fras.map(f => ({ f, n: normalizar(f) }));
  for (const autor of new Set(todosRepertorios)) {
    const alvo = normalizar(autor);
    const frase = frasesCtx.find(({ n }) => n.includes(alvo));
    if (!frase) continue;
    const nPalavras = palavras(frase.f).length;
    const VERBOS_EXPLICATIVOS = ['chama', 'chamou', 'defende', 'defendeu', 'mostra', 'mostrou',
      'observa', 'observou', 'acrescenta', 'sintetiza', 'lembra', 'lembrou', 'descreve',
      'demonstra', 'demonstrou', 'revela', 'evidencia', 'explica', 'analisa', 'historia',
      'considera', 'aponta', 'afirma', 'sustenta', 'critica', 'em que', 'segundo', 'conforme',
      'como lembra', 'ao analisar', 'ao descrever', 'ao historiar', 'que define', 'que mostra'];
    const temExplicacao = MARCADORES_SUSTENTACAO.some(m => frase.n.includes(normalizar(m))) ||
      VERBOS_EXPLICATIVOS.some(m => frase.n.includes(normalizar(m)));
    if (nPalavras >= 12 && temExplicacao) articulados++;
  }
  sinais.repertoriosArticulados = articulados;

  if (exibiveis.length > 0 && articulados >= 1) {
    fortes.push(`Repertório pertinente e articulado ao argumento (${exibiveis.slice(0, 3).join(', ')}).`);
  } else if (exibiveis.length > 0) {
    melhorias.push('Há menção a repertório (' + exibiveis.slice(0, 3).join(', ') +
      '), mas sem desenvolvimento: explique o que ele demonstra. Menção solta não pontua como repertório produtivo.');
  } else if (todosRepertorios.length === 0) {
    melhorias.push('Não localizei repertório sociocultural legitimado (dado, lei, autor, obra). Use 2 referências explicadas, não basta citar, é preciso relacionar ao tema.');
  } else {
    melhorias.push('O repertório citado é genérico (“segundo estudos”, “pesquisas apontam”). Nomeie a fonte: lei, instituição, autor, obra.');
  }

  // tema espalhado pelo texto (não só na introdução)
  const parasComTema = ctx.normParas.filter(p =>
    ctx.nucleo.some(t => p.includes(normalizar(t)))).length;
  sinais.paragrafosComTema = parasComTema;
  if (parasComTema >= 3) fortes.push('O recorte temático atravessa vários parágrafos, e não apenas a introdução.');
  else if (parasComTema <= 1) melhorias.push('O tema aparece concentrado em um único parágrafo. Retome o recorte em cada argumento para não parecer tangenciamento.');

  // gênero
  const marcasNarrativas = contarLista(ctx.norm, ['era uma vez', 'certo dia', 'entao ele', 'de repente']);
  if (marcasNarrativas > 0) {
    melhorias.push('Marcas de narração foram identificadas. O gênero exigido é dissertativo-argumentativo, em prosa.');
  }
  if (ctx.paras.length >= 4) fortes.push('Estrutura em parágrafos compatível com o gênero dissertativo-argumentativo.');

  if (relevancia < 0.30) {
    sinais.riscoTema = 'tangenciamento';
    melhorias.unshift('Risco de tangenciamento: o recorte específico do tema aparece pouco. Verifique se você discutiu exatamente o que a proposta pede, e não um assunto vizinho.');
  } else if (relevancia < 0.45) {
    sinais.riscoTema = 'parcial';
    melhorias.push('A aderência ao recorte ainda é parcial, cite o núcleo do tema (as palavras da proposta) ao menos uma vez com clareza.');
  } else {
    sinais.riscoTema = 'ok';
  }

  /* ---- degrau na escala de 20 em 20 ------------------------------------
     A escada da C2 é uma escada de repertório: cobertura do tema → formato →
     repertório próprio → legitimado → pertinente → produtivo → estrutura.
     Cada degrau exige o anterior; por isso o cálculo é por condições, e não
     por soma de pontos. */
  const temRepertorio = todosRepertorios.length > 0;
  const soGenericos = temRepertorio && exibiveis.length === 0;
  const repertorioNoCorpo = temRepertorio && ctx.normParas
    .slice(1, Math.max(1, ctx.paras.length - 1))
    .some(p => todosRepertorios.some(t => p.includes(normalizar(t))));
  const partesOk = ctx.paras.length >= 4 && parasComTema >= 3;
  const generoOk = marcasNarrativas === 0;

  sinais.relevancia = relevancia;

  // o zero da C2 fica reservado à FUGA de fato (cobertura baixa E relevância
  // baixa): assim nenhuma competência vai a 0 sem que o texto seja anulado
  let nota;
  if (sinais.coberturaTema <= 10 && relevancia < 0.20) nota = 0;   // fuga ao tema
  else if (relevancia < 0.24) nota = 20;           // tangenciamento superficial
  else if (relevancia < 0.34) nota = 40;           // abordagem parcial
  else if (!generoOk) nota = 60;                   // tema completo, formato frágil
  else if (!temRepertorio) nota = 80;              // sem repertório próprio
  else if (soGenericos) nota = 100;                // repertório solto, sem fonte
  else if (articulados === 0 && !repertorioNoCorpo) nota = 120;  // válido, fora da argumentação
  else if (articulados === 0) nota = 140;          // pertinente, mas improdutivo
  else if (!partesOk) nota = 160;                  // produtivo, estrutura falha
  else if (articulados >= 2 || parasComTema >= ctx.paras.length) nota = 200;
  else nota = 180;                                 // uma quebra na transição

  // extensão: texto curto não desenvolve o tema (desenvolvimento é exigência da C2)
  if (ctx.metricas.palavras < 90) { nota = Math.min(nota, 80); sinais.limitePorExtensao = 'texto muito curto'; }
  else if (ctx.metricas.palavras < 130) { nota = Math.min(nota, 120); sinais.limitePorExtensao = 'texto curto'; }
  else if (ctx.metricas.palavras < 175) { nota = Math.min(nota, 160); sinais.limitePorExtensao = 'desenvolvimento reduzido'; }

  sinais.temRepertorio = temRepertorio;
  sinais.partesOk = partesOk;

  sinais.cobertura = Math.round(cobertura * 100);
  sinais.nucleoAusente = ctx.nucleo.filter(t => !ctx.norm.includes(normalizar(t))).slice(0, 8);
  sinais.exemploRepertorio = exibiveis[0] ? trecho(ctx.texto, exibiveis[0]) : null;
  sinais.exemploCitacaoSolta = (() => {
    if (!exibiveis.length || articulados > 0) return null;
    const frase = ctx.fras.find(f => {
      const n = normalizar(f);
      return exibiveis.some(e => n.includes(normalizar(e)));
    });
    return frase ? frase.trim().slice(0, 200) : null;
  })();
  sinais.exemploParagrafoTema = ctx.paras[0] ? ctx.paras[0].trim().slice(0, 200) : null;

  /* degrau interno 180: repertório legitimado e articulado, partes no lugar, e a única
     quebra é a transição de um argumento (ou a quantidade de parágrafos com
     tema). Cumpre o 160 e encosta no 200 — 180. */
  sinais.intermediario = nota === 180 && ctx.metricas.palavras >= 175;

  return fechar('C2', nota, fortes, melhorias, sinais,
    'Compreensão do tema e repertório',
    'Aderência ao recorte da proposta, gênero dissertativo-argumentativo e uso produtivo de repertório.', ctx);
}

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA III — argumentação / projeto de texto                   */
/* ------------------------------------------------------------------ */

export function avaliarC3(ctx) {
  const fortes = [], melhorias = [], sinais = {};
  const intro = ctx.normParas[0] || '';
  const introOriginal = ctx.paras[0] || '';
  const corpo = ctx.paras.slice(1, Math.max(1, ctx.paras.length - 1));

  // tese
  const teseMarcada = MARCADORES_TESE.some(m => intro.includes(normalizar(m)));
  const teseLonga = palavras(introOriginal).length >= 25;
  const tese = teseMarcada || (teseLonga && /[.;]/.test(introOriginal));
  sinais.tese = tese;
  if (tese) fortes.push('Há um posicionamento identificável já na introdução.');
  else melhorias.push('A tese não ficou evidente na introdução. Feche o primeiro parágrafo com uma afirmação clara sobre o problema, é ela que orienta todo o texto.');

  // argumentos desenvolvidos no corpo
  let desenvolvidos = 0;
  const paragrafosSemArg = [];
  corpo.forEach((p, i) => {
    const n = normalizar(p);
    const temSustentacao = MARCADORES_SUSTENTACAO.some(m => n.includes(normalizar(m)));
    const temRepertorio = [...REPERTORIO.autores, ...REPERTORIO.obras, ...REPERTORIO.instituicoes,
      ...REPERTORIO.dados].some(t => n.includes(normalizar(t)));
    const nPalavras = palavras(p).length;
    if (nPalavras >= 35 && (temSustentacao || temRepertorio)) desenvolvidos++;
    else paragrafosSemArg.push(i + 2);
  });
  sinais.argumentosDesenvolvidos = desenvolvidos;
  if (desenvolvidos >= 2) fortes.push(`Dois blocos argumentativos com sustentação (explicação, dado ou repertório), não apenas opinião.`);
  else if (desenvolvidos === 1) melhorias.push('Apenas um parágrafo de desenvolvimento sustenta a tese. Construa um segundo eixo argumentativo com causa, consequência ou comparação.');
  else melhorias.push('Os parágrafos de desenvolvimento não apresentam sustentação explícita (porque, visto que, segundo, por exemplo). Sem justificativa, o texto vira opinião solta.');
  if (paragrafosSemArg.length && desenvolvidos > 0) {
    melhorias.push(`O ${paragrafosSemArg.join('º e ')}º parágrafo(s) carece(m) de desenvolvimento: apresenta ideia sem explicá-la.`);
  }

  // autoria x senso comum
  const cliches = termosEncontrados(ctx.norm, CLICHES);
  sinais.cliches = cliches.length;
  if (cliches.length >= 3) {
    melhorias.push(`Excesso de fórmulas genéricas (${cliches.slice(0, 3).map(c => `“${c}”`).join(', ')}). Elas ocupam linhas sem construir argumento: troque por uma afirmação sua.`);
  } else if (cliches.length > 0) {
    melhorias.push(`Cuidado com fórmulas prontas (${cliches.slice(0, 2).map(c => `“${c}”`).join(', ')}): elas enfraquecem a autoria.`);
  }

  const primeiraPessoa = termosEncontrados(ctx.norm, PRIMEIRA_PESSOA);
  sinais.primeiraPessoa = primeiraPessoa.length;
  if (primeiraPessoa.length) {
    melhorias.push(`Marcas de 1ª pessoa (${primeiraPessoa.slice(0, 3).map(t => `“${t.trim()}”`).join(', ')}) quebram a impessoalidade exigida. Prefira “é possível observar”, “constata-se”.`);
  }

  if (ctx.paras.length <= 2) {
    melhorias.push('O texto tem dois parágrafos ou menos: falta espaço para desenvolver argumentos. O padrão é 4 parágrafos (introdução, 2 desenvolvimentos, conclusão).');
  }

  const introOk = palavras(introOriginal).length >= 20;

  /* ---- degrau na escala de 20 em 20 ------------------------------------
     A escada da C3 é a do desenvolvimento: direção (tese) × profundidade
     (quantos argumentos realmente desenvolvidos). Os dois defeitos clássicos
     ganham degrau próprio: sem tese o projeto existe mas não se percebe
     (100), e com um só argumento desenvolvido o texto fica desequilibrado
     (140) — o que a escala de 40 não distinguia. */
  const parasComTemaC3 = ctx.normParas.filter(p => ctx.nucleo.some(t => p.includes(normalizar(t)))).length;
  const textoMuitoCurto = ctx.metricas.palavras < 60 || ctx.paras.length <= 1;

  let nota;
  if (textoMuitoCurto) nota = 20;                       // ideias confusas, sem projeto
  else if (!tese && desenvolvidos === 0) nota = ctx.paras.length >= 3 ? 60 : 40;
  else if (!tese && desenvolvidos === 1) nota = 80;     // projeto com muitas falhas
  else if (!tese) nota = 100;                           // linha perceptível, sem direção explícita
  else if (desenvolvidos === 0) nota = 80;
  else if (desenvolvidos === 1) nota = 140;             // desequilíbrio: um eixo raso
  else if (cliches.length >= 3 || primeiraPessoa.length || ctx.paras.length <= 2) nota = 160;
  else if (introOk && parasComTemaC3 >= 3) nota = 200;  // progressão em todo o texto
  else nota = 180;                                      // ponta solta

  /* Texto que repete a própria frase não progride: o projeto de texto existe,
     mas a argumentação anda em círculo. A cartilha cobra progressão — cada
     parágrafo tem de acrescentar algo —, e repetição literal é a prova de que
     não acrescentou. */
  const frasesRepetidasC3 = ctx.estilo.frasesRepetidas;
  if (frasesRepetidasC3.length) {
    melhorias.push(`${frasesRepetidasC3.length === 1 ? 'Uma frase' : frasesRepetidasC3.length + ' frases'} do texto se repete(m) literalmente. O parágrafo que repete precisa avançar: cause uma consequência, traga um exemplo ou feche o raciocínio.`);
    nota = Math.min(nota, 120);
    sinais.frasesRepetidas = frasesRepetidasC3.map(f => ({ frase: f.frase.trim().slice(0, 160), n: f.n }));
  }

  if (desenvolvidos >= 2 && tese) {
    fortes.push('Projeto de texto consistente: tese na abertura e argumentos que a sustentam na ordem prevista.');
  }

  sinais.exemploIntro = introOriginal.trim().slice(0, 220);
  sinais.exemploParagrafoFraco = paragrafosSemArg.length
    ? (ctx.paras[paragrafosSemArg[0] - 1] || '').trim().slice(0, 220) : null;
  sinais.exemplosCliches = cliches.slice(0, 3);
  sinais.exemplosPrimeiraPessoa = primeiraPessoa.slice(0, 3)
    .map(t => ({ termo: t.trim(), contexto: trecho(ctx.texto, t) }));
  sinais.temasPorParagrafo = ctx.normParas.map((p, i) => ({
    paragrafo: i + 1,
    temTema: ctx.nucleo.some(t => p.includes(normalizar(t)))
  }));
  sinais.paragrafosComTema = parasComTemaC3;

  /* degrau interno 180: tese + dois argumentos desenvolvidos, sem clichê e sem 1ª
     pessoa; a única ponta solta é a progressão não atravessar o texto todo. */
  sinais.intermediario = nota === 180 && cliches.length === 0 && primeiraPessoa.length === 0;

  return fechar('C3', nota, fortes, melhorias, sinais,
    'Seleção e organização de argumentos',
    'Defesa de um ponto de vista com autoria, progressão e projeto de texto.', ctx);
}

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA IV — coesão                                             */
/* ------------------------------------------------------------------ */

export function avaliarC4(ctx) {
  const fortes = [], melhorias = [], sinais = {};
  const porClasse = {};
  let ocorrencias = 0;

  for (const [classe, lista] of Object.entries(CONECTIVOS)) {
    const encontrados = termosEncontrados(ctx.norm, lista);
    if (encontrados.length) {
      porClasse[classe] = encontrados;
      ocorrencias += encontrados.reduce((a, t) => a + contarTermo(ctx.norm, t), 0);
    }
  }
  const classes = Object.keys(porClasse);
  sinais.classesCoesivas = classes;
  sinais.ocorrenciasCoesivas = ocorrencias;
  sinais.densidade = +(ocorrencias / Math.max(1, ctx.metricas.frases)).toFixed(2);

  if (classes.length >= 4) fortes.push(`Articulação variada: ${classes.length} classes de conectivos (${classes.slice(0, 5).join(', ')}).`);
  if (classes.length < 3) melhorias.push('Pouca variedade de articuladores. Combine adição, oposição, causa e conclusão para mostrar as relações entre as ideias.');

  // transições no início dos parágrafos
  const inicios = ['alem disso', 'ademais', 'por outro lado', 'em contrapartida', 'dessa forma',
    'portanto', 'assim', 'entretanto', 'contudo', 'nesse contexto', 'diante disso', 'por fim',
    'em primeiro lugar', 'outrossim', 'nao obstante', 'consequentemente', 'desse modo',
    'historicamente', 'atualmente', 'sob essa otica', 'nesse sentido'];
  let transicoes = 0;
  ctx.normParas.forEach((p, i) => {
    if (i === 0) return;
    if (inicios.some(t => p.startsWith(t))) transicoes++;
  });
  sinais.transicoesParagrafo = transicoes;
  if (transicoes >= 2) fortes.push('Parágrafos conectados entre si por articuladores no início de cada um.');
  else melhorias.push('Abra os parágrafos de desenvolvimento/conclusão com um conectivo (ex.: “Nesse contexto,”, “Diante disso,”). Isso sinaliza para o avaliador a progressão do texto.');

  // parágrafos longos sem conectivo interno
  let semArticulacao = 0;
  ctx.paras.forEach(p => {
    const n = normalizar(p);
    const nFrases = frases(p).length;
    const temConectivo = Object.values(CONECTIVOS).flat().some(c => n.includes(normalizar(c)));
    if (nFrases >= 3 && !temConectivo) semArticulacao++;
  });
  sinais.paragrafosSemArticulacao = semArticulacao;
  if (semArticulacao > 0) {
    melhorias.push(`${semArticulacao} parágrafo(s) com 3+ frases e nenhum articulador interno: as ideias ficam justapostas, sem relação explícita.`);
  }

  // repetição de um mesmo conectivo
  const repetido = Object.values(CONECTIVOS).flat()
    .map(c => ({ c, n: contarTermo(ctx.norm, c) }))
    .filter(o => o.n >= 4 && o.c.length > 4)
    .sort((a, b) => b.n - a.n)[0];
  if (repetido) {
    melhorias.push(`“${repetido.c}” aparece ${repetido.n} vezes. Varie o repertório de conectivos para não soar mecânico.`);
  }

  // retomadas pronominais
  // (os termos vão sem espaço final: contarTermo exige borda de palavra nas duas pontas)
  const retomadas = contarLista(ctx.norm, ['este', 'esta', 'esse', 'essa', 'isso', 'aquele',
    'aquela', 'tal', 'o qual', 'a qual', 'desse', 'dessa', 'nesse', 'nessa']);
  sinais.retomadas = retomadas;
  if (retomadas >= 3) fortes.push('Uso de retomadas (pronomes e expressões referenciais) para evitar repetição de termos.');
  else melhorias.push('Aproveite retomadas pronominais (“esse cenário”, “tal cenário”) para amarrar frases e evitar repetir a mesma palavra.');

  /* ---- degrau na escala de 20 em 20 ------------------------------------
     A escada da C4 tem um marco objetivo, tirado da descrição do próprio
     nível: o conectivo no INÍCIO dos parágrafos. Sem nenhum, o texto para em
     120; com um, 140; com dois ou mais, entra na faixa 160–200, e aí o que
     decide é repetição, articulação interna e retomada. */
  let nota;
  const repeticaoForte = !!repetido && repetido.n >= 4;

  if (ocorrencias === 0) nota = 0;
  else if (ocorrencias <= 2) nota = 20;
  else if (classes.length <= 1) nota = 40;
  else if (classes.length === 2) nota = repeticaoForte ? 60 : 80;
  else if (classes.length === 3) nota = repeticaoForte ? 80 : 100;
  else nota = repeticaoForte ? 100 : 120;

  if (nota >= 120 && transicoes >= 2) nota = 160;
  else if (nota >= 120 && transicoes === 1) nota = 140;

  /* A "escadinha" de parágrafos — em primeiro lugar / além disso / por fim —
     liga os parágrafos, mas sempre pela mesma relação (adição). A descrição do
     nível máximo pede conectivos DIVERSIFICADOS; por isso a sequência mecânica
     trava em 160, que é o nível de "liga dois parágrafos". */
  const CLASSE_DO_TERMO = {};
  for (const [classe, lista] of Object.entries(CONECTIVOS)) {
    lista.forEach(t => { CLASSE_DO_TERMO[normalizar(t)] = classe; });
  }
  const aberturasClasse = [];
  ctx.normParas.forEach((p, i) => {
    if (i === 0) return;
    let achado = null;
    for (const [termo, classe] of Object.entries(CLASSE_DO_TERMO)) {
      if (p.startsWith(termo) && (!achado || termo.length > achado.termo.length)) achado = { termo, classe };
    }
    if (achado) aberturasClasse.push(achado.classe);
  });
  const classesAbertura = new Set(aberturasClasse);
  sinais.classesAbertura = [...classesAbertura];
  const sequenciaMecanica = aberturasClasse.length >= 3 && classesAbertura.size <= 1;
  sinais.sequenciaMecanica = sequenciaMecanica;

  if (nota === 160) {
    if (sequenciaMecanica) {
      melhorias.push('Os parágrafos abrem sempre com conectivo da mesma família (enumeração: “em primeiro lugar”, “além disso”, “por fim”). Isso é progressão aparente: varie a RELAÇÃO entre os parágrafos, oposição, causa, consequência, conclusão.');
    } else if (!repeticaoForte && semArticulacao === 0 && classes.length >= 4 &&
               transicoes >= Math.min(3, ctx.paras.length - 1)) {
      // conectivos diversificados, dentro dos parágrafos e ligando todos eles
      nota = 200;
    } else if (!repeticaoForte && semArticulacao <= 1) {
      /* sem repetição, sem parágrafo justaposto, sem sequência mecânica: falta
         só a prova do nível máximo (conectivos ligando todos os parágrafos e
         diversificados). Cumpre o 160 e encosta no 200 — 180. */
      nota = 180;
      sinais.intermediario = true;
    }
  }

  /* ---- repetição: o que a cartilha cobra na Competência IV -------------
     A grade pede "retomada por sinônimos ou pronomes". Quando a mesma palavra
     volta cinco, oito vezes, quando a mesma expressão reaparece e quando o
     texto repete a própria frase, o mecanismo de coesão é justamente o que
     falta — e isso limita a nota, não importa quantos conectivos existam. */
  const est = ctx.estilo;
  const repeticaoGrave = est.repeticao.filter(a => a.n >= 8);
  const repeticaoMedia = est.repeticao.filter(a => a.n >= 6 && a.n < 8);
  const repeticaoLeve = est.repeticao.filter(a => a.n >= 3 && a.n < 6);
  const noMesmoParagrafo = est.repeticao.filter(a => a.noMesmoParagrafo.some(p => p.n >= 3));
  const frasesRepetidas = est.frasesRepetidas;
  const expressoes = est.expressoes.filter(o => o.n >= 3);
  const aberturas = est.aberturasRepetidas;

  let tetoEstilo = 200;
  if (frasesRepetidas.length) {
    tetoEstilo = Math.min(tetoEstilo, 120);
    melhorias.push(`${frasesRepetidas.length === 1 ? 'Uma frase se repete' : frasesRepetidas.length + ' frases se repetem'} no texto (“${frasesRepetidas[0].frase.trim().slice(0, 90)}…”). Repetir o que já foi dito não é progressão: substitua a segunda ocorrência por um desdobramento, um exemplo ou uma consequência.`);
  }
  if (repeticaoGrave.length) {
    tetoEstilo = Math.min(tetoEstilo, 120);
    melhorias.push('Palavra martelada: ' + repeticaoGrave.slice(0, 3).map(a => `“${a.termo}” (${a.n}×)`).join(', ') + '. A cartilha cobra retomada por sinônimo ou pronome; repetir o mesmo termo é o que ela chama de repetição.');
  } else if (repeticaoMedia.length) {
    tetoEstilo = Math.min(tetoEstilo, 160);
    melhorias.push('Repetição de termo: ' + repeticaoMedia.slice(0, 3).map(a => `“${a.termo}” (${a.n}×)`).join(', ') + '. Troque a segunda e a terceira ocorrências por sinônimo, pronome ou elipse.');
  }
  if (repeticaoLeve.length >= 2 && repeticaoMedia.length === 0 && repeticaoGrave.length === 0) {
    tetoEstilo = Math.min(tetoEstilo, 160);
    melhorias.push('Palavras de recheio repetidas: ' + repeticaoLeve.slice(0, 3).map(a => `“${a.termo}” (${a.n}×)`).join(', ') + '. São termos que não dizem nada de novo, substitua por informação concreta.');
  }
  if (noMesmoParagrafo.length && repeticaoMedia.length === 0 && repeticaoGrave.length === 0) {
    tetoEstilo = Math.min(tetoEstilo, 160);
    melhorias.push(`${noMesmoParagrafo.length} termo(s) repetido(s) dentro do mesmo parágrafo (` +
      noMesmoParagrafo.slice(0, 3).map(a => `“${a.termo}”`).join(', ') + '). No mesmo parágrafo, a repetição aparece colada na leitura.');
  }
  if (expressoes.length && est.pesoRepeticao >= 2) {
    tetoEstilo = Math.min(tetoEstilo, 160);
    melhorias.push('Expressão repetida: ' + expressoes.slice(0, 2).map(o => `“${o.expressao}” (${o.n}×)`).join(', ') + '. Varie a formulação em vez de repetir o mesmo bloco de palavras.');
  }
  if (aberturas.length) {
    tetoEstilo = Math.min(tetoEstilo, 160);
    melhorias.push(`${aberturas.length} abertura(s) de período repetida(s) (` +
      aberturas.slice(0, 2).map(o => `“${o.abertura}…”`).join(', ') + '). Comece as frases de formas diferentes: a repetição da abertura deixa o texto monocórdio.');
  }

  sinais.repeticaoLeve = repeticaoLeve.map(a => ({ termo: a.termo, n: a.n }));
  sinais.repeticaoGrave = repeticaoGrave.map(a => ({ termo: a.termo, n: a.n }));
  sinais.repeticaoMedia = repeticaoMedia.map(a => ({ termo: a.termo, n: a.n }));
  sinais.noMesmoParagrafo = noMesmoParagrafo.map(a => ({ termo: a.termo, paragrafos: a.noMesmoParagrafo }));
  sinais.frasesRepetidas = frasesRepetidas.map(f => ({ frase: f.frase.trim().slice(0, 160), n: f.n }));
  sinais.expressoesRepetidas = expressoes.slice(0, 4);
  sinais.aberturasRepetidas = aberturas.slice(0, 4);
  sinais.tetoEstilo = tetoEstilo;
  if (tetoEstilo === 200) {
    fortes.push('Sem repetição de palavra, de expressão ou de frase: o texto retoma as ideias sem se repetir.');
  }

  sinais.repeticaoConectivo = repeticaoForte;
  sinais.exemplosSemArticulacao = [];
  ctx.paras.forEach((p, i) => {
    const n = normalizar(p);
    const nFrases = frases(p).length;
    const temConectivo = Object.values(CONECTIVOS).flat().some(c => n.includes(normalizar(c)));
    if (nFrases >= 3 && !temConectivo) {
      sinais.exemplosSemArticulacao.push({ paragrafo: i + 1, inicio: p.trim().slice(0, 140) });
    }
  });
  if (nota > tetoEstilo) nota = tetoEstilo;
  sinais.exemploConectivoRepetido = repetido ? { termo: repetido.c, n: repetido.n } : null;
  sinais.aberturasParagrafos = ctx.paras.slice(1).map(p => (p.trim().split(/\s+/).slice(0, 4).join(' ')));

  return fechar('C4', nota, fortes, melhorias, sinais,
    'Coesão e coerência',
    'Mecanismos linguísticos que ligam frases, parágrafos e ideias.', ctx);
}

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA V — proposta de intervenção                             */
/* ------------------------------------------------------------------ */

/**
 * Escada da Competência V: quantos elementos VÁLIDOS e quantos VAGOS.
 *   v=0,g=0 → 0    v=0,g=1 → 20   v=1,g=0 → 40   v=1,g=1 → 60
 *   v=2,g=0 → 80   v=2,g=1 → 100  v=3,g=0 → 120  v=3,g=1 → 140
 *   v=4,g=0 → 160  v=4,g=1 → 180  v=5     → 200
 */
export function notaProposta(validos, vagos) {
  const v = Math.max(0, Math.min(5, validos | 0));
  const g = Math.max(0, Math.min(5, vagos | 0));
  if (v === 5) return 200;
  if (v === 0 && g === 0) return 0;
  return Math.min(180, (v * 2 + (g > 0 ? 1 : 0)) * 20);
}

const ROTULOS = {
  agente: 'agente (quem faz)',
  acao: 'ação (o que faz)',
  meio: 'meio/modo (como faz)',
  finalidade: 'finalidade (para quê)',
  detalhamento: 'detalhamento (explicação adicional)'
};

export function avaliarC5(ctx) {
  const fortes = [], melhorias = [], sinais = {};
  const ultimo = ctx.paras[ctx.paras.length - 1] || '';
  const penultimo = ctx.paras[ctx.paras.length - 2] || '';
  // a intervenção deve estar no fechamento; se o último parágrafo é curto, olhamos os dois últimos
  const bloco = palavras(ultimo).length < 25 && penultimo
    ? `${penultimo} ${ultimo}` : ultimo;
  const nBloco = normalizar(bloco);

  const detectado = {
    agente: termosEncontrados(nBloco, INTERVENCAO.agentes),
    acao: termosEncontrados(nBloco, INTERVENCAO.acoes),
    meio: termosEncontrados(nBloco, INTERVENCAO.meios),
    finalidade: termosEncontrados(nBloco, INTERVENCAO.finalidades),
    detalhamento: []
  };

  // detalhamento: conectivo explicativo OU exemplificação OU parágrafo robusto com 2+ frases
  const detLexico = termosEncontrados(nBloco, INTERVENCAO.detalhamento);
  const temNumero = /\d|%/.test(bloco);
  const frasesBloco = frases(bloco).length;
  const exemplosConcretos = termosEncontrados(nBloco, ['campanha', 'palestra', 'aula',
    'programa', 'projeto', 'aplicativo', 'plataforma', 'verba', 'lei', 'parceria',
    'mutirao', 'posto', 'unidade', 'curso', 'oficina', 'cartilha', 'disque']);
  // gerúndio costuma expressar o MEIO ("contratando médicos", "ampliando a rede")
  const gerundios = (bloco.toLowerCase().match(/\b[a-zà-ÿ]{3,}ndo\b/g) || []).length;
  if (!detectado.meio.length && gerundios >= 1) {
    detectado.meio = ['(meio expresso por gerúndio)'];
  }

  const detalhamentoOk = detLexico.length > 0 ||
    (temNumero && frasesBloco >= 2) ||
    (frasesBloco >= 3 && palavras(bloco).length >= 60) ||
    (exemplosConcretos.length >= 2 && palavras(bloco).length >= 45);
  if (detalhamentoOk) {
    detectado.detalhamento = detLexico.length ? detLexico.slice(0, 3) : ['(exemplificação/justificativa presente)'];
  }

  const chaves = ['agente', 'acao', 'meio', 'finalidade', 'detalhamento'];
  const presentes = chaves.filter(k => detectado[k].length > 0);
  const ausentes = chaves.filter(k => detectado[k].length === 0);

  sinais.elementos = presentes;
  sinais.faltando = ausentes;
  sinais.detectados = detectado;

  // violação de direitos humanos
  const violacao = termosEncontrados(ctx.norm, VIOLACAO_DH);
  sinais.violacaoDH = violacao;

  /* ---- degraus parciais: válido × vago ---------------------------------
     A escada da C5 é a única que a escala intermediária melhora sem
     interpretação nenhuma: cada elemento pode estar ausente, VAGO ou VÁLIDO,
     e os onze degraus descrevem exatamente essas combinações (2 elementos
     válidos = 80; 2 válidos + 1 genérico = 100; 3 válidos = 120…). */
  const AGENTES_VAGOS = new Set(['alguem', 'ninguem', 'voce', 'todos', 'as pessoas',
    'a populacao', 'cada cidadao', 'nos']);
  const ACOES_VAGAS = new Set(['ajudar', 'melhorar', 'investir', 'fazer', 'mudar']);

  const eValido = (k) => {
    const encontrados = detectado[k] || [];
    if (!encontrados.length) return false;
    if (k === 'agente') return encontrados.some(t => !AGENTES_VAGOS.has(normalizar(t)));
    if (k === 'acao') return encontrados.some(t => !ACOES_VAGAS.has(normalizar(t)));
    return true;
  };

  const validos = chaves.filter(eValido);
  const vagos = chaves.filter(k => (detectado[k] || []).length > 0 && !eValido(k));
  sinais.validos = validos;
  sinais.vagos = vagos;

  let nota = notaProposta(validos.length, vagos.length);

  // proposta em uma única frase curta não sustenta quatro ou cinco elementos
  if (palavras(ultimo).length < 30 && presentes.length > 0) {
    nota = Math.min(nota, 160);
    melhorias.push('A proposta aparece em uma frase curta. Reserve 2 a 4 linhas do último parágrafo para desenvolvê-la, é ali que a Competência V é decidida.');
  }

  if (violacao.length) {
    nota = 0;
    melhorias.push(`Atenção: termos associados a violação de direitos humanos (${violacao.map(v => `“${v}”`).join(', ')}) aparecem no texto. Se a proposta sugere punição violenta, tortura ou "justiça com as próprias mãos", a Competência V é zerada.`);
  }

  if (validos.length === 5) {
    fortes.push('Proposta completa: agente, ação, meio/modo, finalidade e detalhamento, a combinação que garante os 200 pontos.');
  } else if (validos.length >= 3) {
    fortes.push(`Proposta bem encaminhada: ${validos.length} de 5 elementos válidos (${validos.map(k => ROTULOS[k].split(' ')[0]).join(', ')}).`);
    melhorias.push(`Para chegar aos 200, inclua: ${ausentes.map(k => ROTULOS[k]).join('; ')}.`);
  } else if (validos.length >= 1) {
    melhorias.push(`A proposta está incompleta, encontrei apenas ${presentes.map(k => ROTULOS[k]).join(', ')}. Estruture assim: “O [agente] deve [ação] por meio de [meio], a fim de [finalidade], visto que [detalhamento]”.`);
    if (vagos.length) {
      melhorias.push(`Estes elementos aparecem, mas de forma vaga: ${vagos.map(k => ROTULOS[k]).join(', ')}. Troque o genérico pelo específico (quem, com que instrumento).`);
    }
  } else {
    melhorias.push('Não localizei proposta de intervenção no fechamento do texto. Ela é obrigatória: sem ela, a Competência V fica próxima de zero.');
  }

  if (ausentes.includes('agente') && presentes.length > 0) {
    melhorias.push('Falta dizer QUEM executa a ação: nomeie o órgão, ministério, escola, mídia ou organização.');
  }
  if (ausentes.includes('meio')) {
    melhorias.push('Falta o COMO: especifique o instrumento (campanha, verba, plataforma, lei, parceria, programa).');
  }

  // proposta no lugar errado
  const propostaNaIntro = MARCADORES_SUSTENTACAO.length && INTERVENCAO.agentes
    .some(a => (ctx.normParas[0] || '').includes(normalizar(a))) &&
    INTERVENCAO.acoes.some(a => (ctx.normParas[0] || '').includes(normalizar(a)));
  if (propostaNaIntro && presentes.length <= 2) {
    melhorias.push('A intervenção parece estar só na introdução. O fechamento do texto é o lugar esperado para a proposta detalhada.');
  }

  sinais.blocoProposta = ultimo.trim().slice(0, 300);
  sinais.agenteImpreciso = !presentes.includes('agente') && presentes.includes('acao');
  sinais.propostaCurta = palavras(ultimo).length < 30;
  sinais.paragrafoDaProposta = ctx.paras.length;

  // cinco elementos só valem 200 se a proposta estiver DESENVOLVIDA no parágrafo
  if (nota === 200 && palavras(bloco).length < 45) {
    nota = 180;
    melhorias.push('Os cinco elementos aparecem, mas comprimidos em poucas palavras. Desenvolva a proposta em duas ou três frases: detalhamento raso não sustenta o nível máximo.');
  }

  /* degrau interno 180: quatro elementos válidos + um vago, ou os cinco presentes mas
     comprimidos numa frase. Cumpre o 160 e encosta no 200 — 180. */
  sinais.intermediario = nota === 180;

  return fechar('C5', nota, fortes, melhorias, sinais,
    'Proposta de intervenção',
    'Solução para o problema, com agente, ação, meio, finalidade e detalhamento, respeitando os direitos humanos.', ctx);
}
