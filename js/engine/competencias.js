// Arquivo responsável por avaliar as cinco competências da redação.

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

// Seção: preparação do contexto compartilhado.

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

// Seção: avaliação das competências I a V.

export function avaliarC1(contexto) {
  const fortes = [], melhorias = [], sinais = {};
  const original = minusculo(contexto.texto);
  let desconto = 0;
  const erros = [];
  for (const [sem, com] of ERROS_ACENTUACAO) {
    if (sem === com) continue;
    const re = new RegExp(`\\b${sem.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'g');
    const achados = original.match(re) || [];
    if (achados.length > 0) {
      erros.push({ forma: sem, correto: com, n: achados.length });
    }
  }
  const errosReais = erros.filter(e => e.forma !== e.correto);
  const totalOcorr = errosReais.reduce((a, e) => a + e.n, 0);
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
  const construcoes = [];
  for (const d of DESVIOS_CONSTRUCAO) {
    const n = d.bruto
      ? contarTermo(contexto.texto.toLowerCase().replace(/\s+/g, ' '), d.padrao)
      : contarTermo(contexto.norm, d.padrao);
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

  const achados = [];
  for (const regra of REGRAS_CONTEXTO) {
    const ms = original.match(regra.re);
    if (!ms || !ms.length) continue;
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
  const informalidades = termosEncontrados(contexto.norm, INFORMALIDADES);
  sinais.informalidades = informalidades.length;
  if (informalidades.length) {
    desconto += Math.min(40, informalidades.length * 8);
    melhorias.push(`Registro informal: ${informalidades.slice(0, 5).map(t => `“${t}”`).join(', ')}. Na redação, mantenha a modalidade escrita formal.`);
  }
  const pontuacaoRuim = (contexto.texto.match(/[!?]{2,}|\?!|,,|\.\.\.\.|,,/g) || []).length;
  sinais.pontuacaoInadequada = pontuacaoRuim;
  if (pontuacaoRuim > 0) {
    desconto += Math.min(20, pontuacaoRuim * 6);
    melhorias.push('Excesso de sinais de exclamação/interrogação ou pontuação repetida, prefira a pontuação própria do texto argumentativo.');
  }

  const repetidas = (contexto.estilo?.repeticao || []).slice(0, 3);
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
  const longas = contexto.fras.filter(f => palavras(f).length > 45).length;
  sinais.frasesLongas = longas;
  if (longas > 0) {
    desconto += Math.min(15, longas * 5);
    melhorias.push(`${longas} período(s) com mais de 45 palavras, risque a vírgula e divida em duas orações para ganhar clareza.`);
  }
  if (contexto.metricas.diversidade >= 0.62 && totalOcorr <= 2) {
    fortes.push(`Vocabulário variado (diversidade lexical de ${contexto.metricas.diversidade}) e poucos desvios de grafia.`);
  }
  if (contexto.metricas.mediaPalavrasFrase >= 14 && contexto.metricas.mediaPalavrasFrase <= 28) {
    fortes.push(`Períodos com extensão equilibrada (média de ${contexto.metricas.mediaPalavrasFrase} palavras por frase).`);
  }

  sinais.exemplos = {
    grafia: errosReais.slice(0, 4).map(e => ({
      forma: e.forma, correto: e.correto, n: e.n, contexto: trecho(contexto.texto, e.forma)
    })),
    construcao: construcoes.slice(0, 3).map(c => ({
      padrao: c.padrao, sugestao: c.sugestao, n: c.n, contexto: trecho(contexto.texto, c.padrao)
    })),
    informalidade: informalidades.slice(0, 4).map(t => ({ termo: t, contexto: trecho(contexto.texto, t) })),
    frasesLongas: contexto.fras.filter(f => palavras(f).length > 45).slice(0, 2)
      .map(f => f.trim().slice(0, 160)),
    repeticoes: repetidas.map(r => ({ termo: r.termo, n: r.n }))
  };
  const pt = contexto.estilo.pontuacao;
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

  const pontuacaoLimpa = semPausa === 0 && !pt.semPontoFinal && !pt.pontuacaoEscassa &&
    !pt.encadeamentoComE;
  sinais.pontuacaoLimpa = pontuacaoLimpa;

  const contextuais = sinais.desviosContexto || 0;
  sinais.totalDesvios = totalOcorr + sinais.desviosConstrucao + informalidades.length + contextuais;

  const leves = totalOcorr + informalidades.length + pontuacaoRuim + contextuais;
  const falhas = sinais.desviosConstrucao;
  const totalDesvios = leves + falhas;
  const densidade = +(((leves + falhas * 2 + descontoPontuacao / 6) /
    Math.max(1, contexto.metricas.palavras)) * 100).toFixed(2);
  sinais.descontoPontuacao = descontoPontuacao;

  sinais.desviosLeves = leves;
  sinais.falhasEstrutura = falhas;
  sinais.densidadeDesvios = densidade;

  const frasesPlausiveis = contexto.fras.filter(f => palavras(f).length >= 6).length;
  const temPontuacaoDePeriodo = pt.pontos >= Math.max(1, contexto.paras.length);
  const semEstrutura = contexto.metricas.palavras > 40 && temPontuacaoDePeriodo &&
    frasesPlausiveis < Math.max(1, Math.ceil(contexto.paras.length / 2));

  const subordinativas = contarLista(contexto.norm, ['porque', 'embora', 'enquanto',
    'apesar de', 'visto que', 'uma vez que', 'ja que', 'caso', 'quando', 'conforme',
    'ainda que', 'mesmo que', 'a medida que', 'de modo que', 'portanto', 'porem',
    'contudo', 'entretanto', 'assim que', 'sempre que', 'desde que', 'a fim de que']);
  const pontuacaoRica = /[;:—–()]/.test(contexto.texto);
  const medidaOk = contexto.metricas.mediaPalavrasFrase >= 12 && contexto.metricas.mediaPalavrasFrase <= 30;
  sinais.subordinativas = subordinativas;
  sinais.pontuacaoRica = pontuacaoRica;
  const estruturaExemplar = subordinativas >= 2 && medidaOk && pontuacaoLimpa &&
    (pontuacaoRica || contexto.metricas.mediaPalavrasFrase >= 15);

  let nota;
  if (semEstrutura) nota = 0;
  else if (densidade >= 16) nota = 20;
  else if (densidade >= 12) nota = 40;
  else if (densidade >= 9) nota = 60;
  else if (densidade >= 7) nota = 80;
  else if (densidade >= 5) nota = 100;
  else if (densidade >= 3.2) nota = 120;
  else if (totalDesvios >= 3) nota = 140;
  else if (totalDesvios === 0 && estruturaExemplar) nota = 200;
  else if (totalDesvios === 0 && pontuacaoLimpa) nota = 180;
  else if (totalDesvios === 0) nota = 160;
  else if (falhas === 0 && pontuacaoLimpa) nota = 180;
  else nota = 160;

  if (totalOcorr === 0 && construcoes.length === 0 && informalidades.length === 0) {
    fortes.push(pontuacaoLimpa
      ? 'Nenhum desvio ortográfico, de regência, de registro ou de pontuação identificado nesta amostra.'
      : 'Grafia e regência sem desvios, o que pesa aqui é a pontuação e a estrutura do período.');
  }

  if (nota === 180 && totalDesvios === 0) {
    melhorias.push('Não há desvio de norma, mas a estrutura ainda é simples: para chegar a 200 o texto precisa mostrar subordinação variada (causa, concessão, condição, consequência) e pontuação que organize essas relações (vírgula, dois-pontos, ponto e vírgula).');
  }

  sinais.intermediario = totalDesvios === 0 && pontuacaoLimpa && !estruturaExemplar;

  return fechar('C1', nota, fortes, melhorias, sinais,
    'Domínio da norma padrão',
    'Ortografia, acentuação, pontuação, concordância, regência e escolha vocabular.', contexto);
}

export function tetoPorAmostra(pontos, palavras) {
  if (palavras < 150) return Math.min(pontos, 120);
  if (palavras < 200) return Math.min(pontos, 160);
  if (palavras < 240) return Math.min(pontos, 180);
  return pontos;
}

function fechar(id, nota20, fortes, melhorias, sinais, nome, resumo, contexto) {
  const brutos = degrau(nota20, 0, 200);
  const comTeto = tetoPorAmostra(brutos, contexto.metricas.palavras);

  const oficial = oficializar(comTeto);
  const { nota, pontos, abertura, faixa } = oficial;

  sinais.tetoAmostra = comTeto < brutos ? brutos - comTeto : 0;
  sinais.pontosDiagnostico = pontos;
  sinais.abertura = abertura;
  sinais.faixaNota = faixa;
  sinais.proximoNivel = pontos % 40 === 20;

  return {
    id, nome, resumo,
    nota,
    pontos,
    faixaNota: faixa,
    nivel: nivel(pontos),
    nivelOficial: Math.floor(nota / 40),
    fortes, melhorias, sinais
  };
}

const NORMA = /\b(lei|decreto|resolu[çc][ãa]o|estatuto|constitui[çc][ãa]o|declara[çc][ãa]o|conven[çc][ãa]o|portaria|emenda(?:\s+constitucional)?|artigo)\s+(?:n[ºo°.]?\s*)?\d[\d.]*(?:\s*\/\s*\d{2,4})?(?:\s*,?\s*de\s*\d{4})?/gi;

const TITULO = /\b(Declara[çc][ãa]o|Conven[çc][ãa]o|Estatuto|Constitui[çc][ãa]o|Tratado|Relat[óo]rio)\s+(?:de\s+|do\s+|da\s+)?[A-ZÁ-Ú][a-zà-ÿ]{2,}/g;

const AUTOR = /\b(?:segundo|conforme|de acordo com|na vis[ãa]o de|na perspectiva de|como)\s+(?:o|a|os|as)?\s*(?:demonstrou|demonstra|defende|defendeu|afirma|afirmou|mostrou|mostra|aponta|apontou|explicou|explica|sustenta|sustentou|observou|observa|analisou|analisa|lembrou|lembra|descreveu|descreve|chamou|chama|definiu|define|considera|critica|criticou)?\s*([A-ZÁ-Ú][a-zà-ÿ]{2,}(?:\s+(?:de|da|do)\s+[A-ZÁ-Ú][a-zà-ÿ]+)?)/g;

const NAO_E_REFERENCIA = new Set([
  'brasil', 'enem', 'exame nacional', 'pais', 'sociedade', 'governo', 'estado',
  'ministerio', 'secretaria', 'escola', 'família', 'familia'
]);

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
  const vistos = new Set();
  return achados.filter(a => {
    const k = normalizar(a);
    if (vistos.has(k)) return false;
    vistos.add(k);
    return true;
  });
}

export function avaliarC2(contexto) {
  const fortes = [], melhorias = [], sinais = {};
  const nucleoTotal = contexto.nucleo.length;
  const nucleoHits = termosEncontrados(contexto.norm, contexto.nucleo);
  const apoioHits = termosEncontrados(contexto.norm, contexto.apoio);
  const cobertura = nucleoTotal ? nucleoHits.length / nucleoTotal : 0;
  const relevancia = +(0.65 * cobertura + 0.35 * Math.min(1, apoioHits.length / 6)).toFixed(2);

  sinais.coberturaTema = Math.round(cobertura * 100);
  sinais.termosTema = nucleoHits.slice(0, 8);
  sinais.vocabularioApoio = apoioHits.length;
  const grupos = {
    'instituição/lei/dado': termosEncontrados(contexto.norm, REPERTORIO.instituicoes),
    'autor/filósofo': termosEncontrados(contexto.norm, REPERTORIO.autores),
    'obra/filme/livro': termosEncontrados(contexto.norm, REPERTORIO.obras),
    'dado/estatística': termosEncontrados(contexto.norm, REPERTORIO.dados)
  };
  const referencias = detectarReferencias(contexto.texto);
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
  let articulados = 0;
  const frasesCtx = contexto.fras.map(f => ({ f, n: normalizar(f) }));
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
  const parasComTema = contexto.normParas.filter(p =>
    contexto.nucleo.some(t => p.includes(normalizar(t)))).length;
  sinais.paragrafosComTema = parasComTema;
  if (parasComTema >= 3) fortes.push('O recorte temático atravessa vários parágrafos, e não apenas a introdução.');
  else if (parasComTema <= 1) melhorias.push('O tema aparece concentrado em um único parágrafo. Retome o recorte em cada argumento para não parecer tangenciamento.');
  const marcasNarrativas = contarLista(contexto.norm, ['era uma vez', 'certo dia', 'entao ele', 'de repente']);
  if (marcasNarrativas > 0) {
    melhorias.push('Marcas de narração foram identificadas. O gênero exigido é dissertativo-argumentativo, em prosa.');
  }
  if (contexto.paras.length >= 4) fortes.push('Estrutura em parágrafos compatível com o gênero dissertativo-argumentativo.');

  if (relevancia < 0.30) {
    sinais.riscoTema = 'tangenciamento';
    melhorias.unshift('Risco de tangenciamento: o recorte específico do tema aparece pouco. Verifique se você discutiu exatamente o que a proposta pede, e não um assunto vizinho.');
  } else if (relevancia < 0.45) {
    sinais.riscoTema = 'parcial';
    melhorias.push('A aderência ao recorte ainda é parcial, cite o núcleo do tema (as palavras da proposta) ao menos uma vez com clareza.');
  } else {
    sinais.riscoTema = 'ok';
  }

  const temRepertorio = todosRepertorios.length > 0;
  const soGenericos = temRepertorio && exibiveis.length === 0;
  const repertorioNoCorpo = temRepertorio && contexto.normParas
    .slice(1, Math.max(1, contexto.paras.length - 1))
    .some(p => todosRepertorios.some(t => p.includes(normalizar(t))));
  const partesOk = contexto.paras.length >= 4 && parasComTema >= 3;
  const generoOk = marcasNarrativas === 0;

  sinais.relevancia = relevancia;
  let nota;
  if (sinais.coberturaTema <= 10 && relevancia < 0.20) nota = 0;
  else if (relevancia < 0.24) nota = 20;
  else if (relevancia < 0.34) nota = 40;
  else if (!generoOk) nota = 60;
  else if (!temRepertorio) nota = 80;
  else if (soGenericos) nota = 100;
  else if (articulados === 0 && !repertorioNoCorpo) nota = 120;
  else if (articulados === 0) nota = 140;
  else if (!partesOk) nota = 160;
  else if (articulados >= 2 || parasComTema >= contexto.paras.length) nota = 200;
  else nota = 180;
  if (contexto.metricas.palavras < 90) { nota = Math.min(nota, 80); sinais.limitePorExtensao = 'texto muito curto'; }
  else if (contexto.metricas.palavras < 130) { nota = Math.min(nota, 120); sinais.limitePorExtensao = 'texto curto'; }
  else if (contexto.metricas.palavras < 175) { nota = Math.min(nota, 160); sinais.limitePorExtensao = 'desenvolvimento reduzido'; }

  sinais.temRepertorio = temRepertorio;
  sinais.partesOk = partesOk;

  sinais.cobertura = Math.round(cobertura * 100);
  sinais.nucleoAusente = contexto.nucleo.filter(t => !contexto.norm.includes(normalizar(t))).slice(0, 8);
  sinais.exemploRepertorio = exibiveis[0] ? trecho(contexto.texto, exibiveis[0]) : null;
  sinais.exemploCitacaoSolta = (() => {
    if (!exibiveis.length || articulados > 0) return null;
    const frase = contexto.fras.find(f => {
      const n = normalizar(f);
      return exibiveis.some(e => n.includes(normalizar(e)));
    });
    return frase ? frase.trim().slice(0, 200) : null;
  })();
  sinais.exemploParagrafoTema = contexto.paras[0] ? contexto.paras[0].trim().slice(0, 200) : null;

  sinais.intermediario = nota === 180 && contexto.metricas.palavras >= 175;

  return fechar('C2', nota, fortes, melhorias, sinais,
    'Compreensão do tema e repertório',
    'Aderência ao recorte da proposta, gênero dissertativo-argumentativo e uso produtivo de repertório.', contexto);
}

export function avaliarC3(contexto) {
  const fortes = [], melhorias = [], sinais = {};
  const intro = contexto.normParas[0] || '';
  const introOriginal = contexto.paras[0] || '';
  const corpo = contexto.paras.slice(1, Math.max(1, contexto.paras.length - 1));
  const teseMarcada = MARCADORES_TESE.some(m => intro.includes(normalizar(m)));
  const teseLonga = palavras(introOriginal).length >= 25;
  const tese = teseMarcada || (teseLonga && /[.;]/.test(introOriginal));
  sinais.tese = tese;
  if (tese) fortes.push('Há um posicionamento identificável já na introdução.');
  else melhorias.push('A tese não ficou evidente na introdução. Feche o primeiro parágrafo com uma afirmação clara sobre o problema, é ela que orienta todo o texto.');
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
  const cliches = termosEncontrados(contexto.norm, CLICHES);
  sinais.cliches = cliches.length;
  if (cliches.length >= 3) {
    melhorias.push(`Excesso de fórmulas genéricas (${cliches.slice(0, 3).map(c => `“${c}”`).join(', ')}). Elas ocupam linhas sem construir argumento: troque por uma afirmação sua.`);
  } else if (cliches.length > 0) {
    melhorias.push(`Cuidado com fórmulas prontas (${cliches.slice(0, 2).map(c => `“${c}”`).join(', ')}): elas enfraquecem a autoria.`);
  }

  const primeiraPessoa = termosEncontrados(contexto.norm, PRIMEIRA_PESSOA);
  sinais.primeiraPessoa = primeiraPessoa.length;
  if (primeiraPessoa.length) {
    melhorias.push(`Marcas de 1ª pessoa (${primeiraPessoa.slice(0, 3).map(t => `“${t.trim()}”`).join(', ')}) quebram a impessoalidade exigida. Prefira “é possível observar”, “constata-se”.`);
  }

  if (contexto.paras.length <= 2) {
    melhorias.push('O texto tem dois parágrafos ou menos: falta espaço para desenvolver argumentos. O padrão é 4 parágrafos (introdução, 2 desenvolvimentos, conclusão).');
  }

  const introOk = palavras(introOriginal).length >= 20;

  const parasComTemaC3 = contexto.normParas.filter(p => contexto.nucleo.some(t => p.includes(normalizar(t)))).length;
  const textoMuitoCurto = contexto.metricas.palavras < 60 || contexto.paras.length <= 1;

  let nota;
  if (textoMuitoCurto) nota = 20;
  else if (!tese && desenvolvidos === 0) nota = contexto.paras.length >= 3 ? 60 : 40;
  else if (!tese && desenvolvidos === 1) nota = 80;
  else if (!tese) nota = 100;
  else if (desenvolvidos === 0) nota = 80;
  else if (desenvolvidos === 1) nota = 140;
  else if (cliches.length >= 3 || primeiraPessoa.length || contexto.paras.length <= 2) nota = 160;
  else if (introOk && parasComTemaC3 >= 3) nota = 200;
  else nota = 180;

  const frasesRepetidasC3 = contexto.estilo.frasesRepetidas;
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
    ? (contexto.paras[paragrafosSemArg[0] - 1] || '').trim().slice(0, 220) : null;
  sinais.exemplosCliches = cliches.slice(0, 3);
  sinais.exemplosPrimeiraPessoa = primeiraPessoa.slice(0, 3)
    .map(t => ({ termo: t.trim(), contexto: trecho(contexto.texto, t) }));
  sinais.temasPorParagrafo = contexto.normParas.map((p, i) => ({
    paragrafo: i + 1,
    temTema: contexto.nucleo.some(t => p.includes(normalizar(t)))
  }));
  sinais.paragrafosComTema = parasComTemaC3;

  sinais.intermediario = nota === 180 && cliches.length === 0 && primeiraPessoa.length === 0;

  return fechar('C3', nota, fortes, melhorias, sinais,
    'Seleção e organização de argumentos',
    'Defesa de um ponto de vista com autoria, progressão e projeto de texto.', contexto);
}

export function avaliarC4(contexto) {
  const fortes = [], melhorias = [], sinais = {};
  const porClasse = {};
  let ocorrencias = 0;

  for (const [classe, lista] of Object.entries(CONECTIVOS)) {
    const encontrados = termosEncontrados(contexto.norm, lista);
    if (encontrados.length) {
      porClasse[classe] = encontrados;
      ocorrencias += encontrados.reduce((a, t) => a + contarTermo(contexto.norm, t), 0);
    }
  }
  const classes = Object.keys(porClasse);
  sinais.classesCoesivas = classes;
  sinais.ocorrenciasCoesivas = ocorrencias;
  sinais.densidade = +(ocorrencias / Math.max(1, contexto.metricas.frases)).toFixed(2);

  if (classes.length >= 4) fortes.push(`Articulação variada: ${classes.length} classes de conectivos (${classes.slice(0, 5).join(', ')}).`);
  if (classes.length < 3) melhorias.push('Pouca variedade de articuladores. Combine adição, oposição, causa e conclusão para mostrar as relações entre as ideias.');
  const inicios = ['alem disso', 'ademais', 'por outro lado', 'em contrapartida', 'dessa forma',
    'portanto', 'assim', 'entretanto', 'contudo', 'nesse contexto', 'diante disso', 'por fim',
    'em primeiro lugar', 'outrossim', 'nao obstante', 'consequentemente', 'desse modo',
    'historicamente', 'atualmente', 'sob essa otica', 'nesse sentido'];
  let transicoes = 0;
  contexto.normParas.forEach((p, i) => {
    if (i === 0) return;
    if (inicios.some(t => p.startsWith(t))) transicoes++;
  });
  sinais.transicoesParagrafo = transicoes;
  if (transicoes >= 2) fortes.push('Parágrafos conectados entre si por articuladores no início de cada um.');
  else melhorias.push('Abra os parágrafos de desenvolvimento/conclusão com um conectivo (ex.: “Nesse contexto,”, “Diante disso,”). Isso sinaliza para o avaliador a progressão do texto.');
  let semArticulacao = 0;
  contexto.paras.forEach(p => {
    const n = normalizar(p);
    const nFrases = frases(p).length;
    const temConectivo = Object.values(CONECTIVOS).flat().some(c => n.includes(normalizar(c)));
    if (nFrases >= 3 && !temConectivo) semArticulacao++;
  });
  sinais.paragrafosSemArticulacao = semArticulacao;
  if (semArticulacao > 0) {
    melhorias.push(`${semArticulacao} parágrafo(s) com 3+ frases e nenhum articulador interno: as ideias ficam justapostas, sem relação explícita.`);
  }
  const repetido = Object.values(CONECTIVOS).flat()
    .map(c => ({ c, n: contarTermo(contexto.norm, c) }))
    .filter(o => o.n >= 4 && o.c.length > 4)
    .sort((a, b) => b.n - a.n)[0];
  if (repetido) {
    melhorias.push(`“${repetido.c}” aparece ${repetido.n} vezes. Varie o repertório de conectivos para não soar mecânico.`);
  }
  const retomadas = contarLista(contexto.norm, ['este', 'esta', 'esse', 'essa', 'isso', 'aquele',
    'aquela', 'tal', 'o qual', 'a qual', 'desse', 'dessa', 'nesse', 'nessa']);
  sinais.retomadas = retomadas;
  if (retomadas >= 3) fortes.push('Uso de retomadas (pronomes e expressões referenciais) para evitar repetição de termos.');
  else melhorias.push('Aproveite retomadas pronominais (“esse cenário”, “tal cenário”) para amarrar frases e evitar repetir a mesma palavra.');

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

  const CLASSE_DO_TERMO = {};
  for (const [classe, lista] of Object.entries(CONECTIVOS)) {
    lista.forEach(t => { CLASSE_DO_TERMO[normalizar(t)] = classe; });
  }
  const aberturasClasse = [];
  contexto.normParas.forEach((p, i) => {
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
               transicoes >= Math.min(3, contexto.paras.length - 1)) {
      nota = 200;
    } else if (!repeticaoForte && semArticulacao <= 1) {
      nota = 180;
      sinais.intermediario = true;
    }
  }

  const est = contexto.estilo;
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
  contexto.paras.forEach((p, i) => {
    const n = normalizar(p);
    const nFrases = frases(p).length;
    const temConectivo = Object.values(CONECTIVOS).flat().some(c => n.includes(normalizar(c)));
    if (nFrases >= 3 && !temConectivo) {
      sinais.exemplosSemArticulacao.push({ paragrafo: i + 1, inicio: p.trim().slice(0, 140) });
    }
  });
  if (nota > tetoEstilo) nota = tetoEstilo;
  sinais.exemploConectivoRepetido = repetido ? { termo: repetido.c, n: repetido.n } : null;
  sinais.aberturasParagrafos = contexto.paras.slice(1).map(p => (p.trim().split(/\s+/).slice(0, 4).join(' ')));

  return fechar('C4', nota, fortes, melhorias, sinais,
    'Coesão e coerência',
    'Mecanismos linguísticos que ligam frases, parágrafos e ideias.', contexto);
}

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

export function avaliarC5(contexto) {
  const fortes = [], melhorias = [], sinais = {};
  const ultimo = contexto.paras[contexto.paras.length - 1] || '';
  const penultimo = contexto.paras[contexto.paras.length - 2] || '';
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
  const detLexico = termosEncontrados(nBloco, INTERVENCAO.detalhamento);
  const temNumero = /\d|%/.test(bloco);
  const frasesBloco = frases(bloco).length;
  const exemplosConcretos = termosEncontrados(nBloco, ['campanha', 'palestra', 'aula',
    'programa', 'projeto', 'aplicativo', 'plataforma', 'verba', 'lei', 'parceria',
    'mutirao', 'posto', 'unidade', 'curso', 'oficina', 'cartilha', 'disque']);
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
  const violacao = termosEncontrados(contexto.norm, VIOLACAO_DH);
  sinais.violacaoDH = violacao;

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
  const propostaNaIntro = MARCADORES_SUSTENTACAO.length && INTERVENCAO.agentes
    .some(a => (contexto.normParas[0] || '').includes(normalizar(a))) &&
    INTERVENCAO.acoes.some(a => (contexto.normParas[0] || '').includes(normalizar(a)));
  if (propostaNaIntro && presentes.length <= 2) {
    melhorias.push('A intervenção parece estar só na introdução. O fechamento do texto é o lugar esperado para a proposta detalhada.');
  }

  sinais.blocoProposta = ultimo.trim().slice(0, 300);
  sinais.agenteImpreciso = !presentes.includes('agente') && presentes.includes('acao');
  sinais.propostaCurta = palavras(ultimo).length < 30;
  sinais.paragrafoDaProposta = contexto.paras.length;
  if (nota === 200 && palavras(bloco).length < 45) {
    nota = 180;
    melhorias.push('Os cinco elementos aparecem, mas comprimidos em poucas palavras. Desenvolva a proposta em duas ou três frases: detalhamento raso não sustenta o nível máximo.');
  }

  sinais.intermediario = nota === 180;

  return fechar('C5', nota, fortes, melhorias, sinais,
    'Proposta de intervenção',
    'Solução para o problema, com agente, ação, meio, finalidade e detalhamento, respeitando os direitos humanos.', contexto);
}
