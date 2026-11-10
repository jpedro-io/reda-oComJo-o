import { normalizar, limitar, nivel } from './texto.js';
import { montarContexto, avaliarC1, avaliarC2, avaliarC3, avaliarC4, avaliarC5 } from './competencias.js';
import { buscarTema, keywordsDeTemaLivre } from '../db/temas.js';
import { explicarCompetencias } from './explicar.js';

const FAIXAS = [
  { min: 900, nome: 'Excelente', cor: '#0f9d58', texto: 'Nível de redação nota 1000 nas competências centrais.' },
  { min: 800, nome: 'Muito bom', cor: '#2f9e44', texto: 'Texto sólido: pequenos ajustes podem levar à faixa dos 900+.' },
  { min: 600, nome: 'Bom', cor: '#c58b00', texto: 'Base construída. O ganho maior está em completar a proposta e variar a coesão.' },
  { min: 400, nome: 'Básico', cor: '#d9730d', texto: 'Estrutura em formação: priorize tese, repertório e proposta completa.' },
  { min: 0, nome: 'Insuficiente', cor: '#d64545', texto: 'Reveja a estrutura do texto e o recorte do tema antes de treinar pontos finos.' }
];

function faixaDe(nota) {
  return FAIXAS.find(f => nota >= f.min) || FAIXAS[FAIXAS.length - 1];
}

/** Resolve o tema: registro da base ou tema livre digitado. */
export function resolverTema({ temaId, temaLivre }) {
  if (temaId && temaId !== 'livre') {
    const t = buscarTema(temaId);
    if (t) return { ...t, livre: false };
  }
  if (temaId === 'livre' && temaLivre && temaLivre.trim().length > 3) {
    const kw = keywordsDeTemaLivre(temaLivre);
    return {
      id: 'livre',
      titulo: temaLivre.trim(),
      tipo: 'livre',
      ano: null,
      recorte: 'Tema digitado pelo participante.',
      nucleo: kw.slice(0, 6),
      apoio: kw.slice(6, 18),
      repertorios: [],
      livre: true
    };
  }
  return null;
}

/**
 * Correção completa (motor heurístico).
 * @returns relatório estruturado
 */
export function corrigir(textoBruto, opts = {}) {
  const texto = (textoBruto || '').replace(/\u00a0/g, ' ').trim();
  const tema = resolverTema(opts);

  if (texto.length < 40) {
    return {
      ok: false,
      erro: 'Texto muito curto para avaliar. Escreva ao menos alguns períodos (ou carregue um exemplo) para ver o relatório.'
    };
  }

  const ctx = montarContexto(texto, tema);
  const comps = [avaliarC1(ctx), avaliarC2(ctx), avaliarC3(ctx), avaliarC4(ctx), avaliarC5(ctx)];
  const alertas = [];

  /* ---------- situações de nota zero ---------- */
  const motivosZero = [];
  if (ctx.metricas.linhas <= 7) {
    motivosZero.push({
      titulo: 'Texto com até 7 linhas',
      detalhe: `Sua redação tem cerca de ${ctx.metricas.linhas} linhas. A cartilha do Inep determina nota zero para textos com até 7 linhas.`
    });
  }
  const identificacao = /(?:nome|assinatura|turma|col[eé]gio|escola)\s*:/i.test(texto);
  if (identificacao) {
    motivosZero.push({
      titulo: 'Possível identificação no texto',
      detalhe: 'Encontrei algo como "nome:", "turma:" ou "escola:". Qualquer marca de identificação no espaço da redação zera o texto.'
    });
  }
  const c2 = comps.find(c => c.id === 'C2');
  if (tema && c2.sinais.riscoTema === 'tangenciamento' && c2.sinais.coberturaTema <= 10) {
    motivosZero.push({
      titulo: 'Risco de fuga total ao tema',
      detalhe: 'O vocabulário do recorte proposto quase não aparece. Se o texto não desenvolve o tema da proposta, a nota é zero — confira antes de considerar a nota abaixo.'
    });
  }

  const zerada = motivosZero.length > 0;

  if (zerada) {
    comps.forEach(c => {
      c.notaOriginal = c.nota;
      c.pontosOriginal = c.pontos;
      c.faixaOriginal = c.faixaNota;
      c.nota = 0; c.pontos = 0; c.nivel = 0; c.nivelOficial = 0;
      /* nota zero não tem divergência: os dois avaliadores chegam ao mesmo 0 */
      c.faixaNota = { min: 0, max: 0 };
      c.abertura = 0;
    });
  }

  /* ---------- tangenciamento: teto de 40 em C2, C3 e C5 ----------
     Regra da cartilha: se o texto aborda o assunto sem chegar ao recorte, as
     competências ligadas ao tema ficam limitadas a 40. Na escala de 20 em 20 o
     teto continua sendo teto — só não é mais o único valor possível abaixo dele. */
  if (!zerada && c2.sinais.riscoTema === 'tangenciamento') {
    ['C2', 'C3', 'C5'].forEach(id => {
      const c = comps.find(x => x.id === id);
      if (c && c.nota > 40) {
        c.notaOriginal = c.nota;
        c.pontosOriginal = c.pontos;
        c.nota = 40;
        c.pontos = Math.min(c.pontos, 40);
        c.nivel = nivel(c.pontos);
        c.nivelOficial = 1;
        c.faixaNota = { min: 40, max: 60 };
        c.abertura = 20;
        c.tetoAplicado = 'tangenciamento';
        c.melhorias.unshift('Tangenciamento do tema: a cartilha limita as Competências II, III e V a 40 pontos quando o texto fala do assunto sem chegar ao recorte pedido.');
      }
    });
  }

  /* ---------- nota final como FAIXA ----------
     Cada avaliador do Enem dá de 0 a 200 por competência e a nota final é a
     média das duas notas totais. Dois avaliadores nunca fecham exatamente o
     mesmo número — a cartilha só chama um terceiro quando a diferença passa de
     100 pontos no total (ou 80 numa competência). Por isso o relatório publica
     um intervalo: o mínimo é a soma das notas oficiais; o máximo soma, em cada
     competência, a abertura que o texto ainda comporta, limitado pela própria
     regra de divergência. */
  const explicadas = explicarCompetencias(comps);

  /* A explicação de cada competência fala da nota que o TEXTO merecia. Numa
     redação zerada isso vira mentira: o aluno leria "faixa de 0 por 11
     desvios" quando o zero vem de fuga ao tema. Aqui o zero ganha causa
     declarada, e o resto passa a ser observação sobre a escrita. */
  if (zerada) {
    for (const c of explicadas) {
      c.explicacao = c.explicacao || {};
      c.explicacao.zero = motivosZero.map(m => ({ titulo: m.titulo, detalhe: m.detalhe }));
      c.explicacao.sintese = `Nota zero: ${motivosZero.map(m => m.titulo.toLowerCase()).join('; ')}. `
        + 'A cartilha zera o texto por esse motivo antes de avaliar a escrita — o que aparece '
        + 'abaixo são observações sobre o texto, não a causa da nota.';
    }
  }
  const notaTotal = comps.reduce((a, c) => a + c.nota, 0);
  const somaMax = comps.reduce((a, c) => a + (c.faixaNota?.max ?? c.nota), 0);
  /* redação zerada não tem faixa: a nota é 0, sem divergência possível */
  const notaTotalMax = zerada ? 0
    : Math.min(1000, Math.max(notaTotal + 40, Math.min(notaTotal + 100, somaMax)));
  const faixa = faixaDe(Math.round((notaTotal + notaTotalMax) / 2));

  /* ---------- alertas pedagógicos ---------- */
  if (ctx.metricas.linhas > 30) {
    alertas.push({
      tipo: 'atencao',
      titulo: 'Mais de 30 linhas',
      texto: `Estimativa de ${ctx.metricas.linhas} linhas. A folha oficial tem 30; o que passar disso é desconsiderado.`
    });
  }
  if (ctx.metricas.linhas >= 8 && ctx.metricas.linhas <= 15) {
    alertas.push({
      tipo: 'atencao',
      titulo: 'Texto curto',
      texto: 'Redações com menos de ~20 linhas dificilmente conseguem desenvolver dois argumentos e uma proposta completa.'
    });
  }
  const c5 = comps.find(c => c.id === 'C5');
  if (c5.sinais.violacaoDH?.length) {
    alertas.push({
      tipo: 'perigo',
      titulo: 'Direitos humanos',
      texto: 'Há termos que podem indicar proposta violenta. Reveja: propostas que incitam violência, tortura ou linchamento recebem 0 na Competência V.'
    });
  }
  if ((c2.sinais.repertoriosExibiveis?.length || 0) > 0 && c2.sinais.repertoriosArticulados === 0) {
    alertas.push({
      tipo: 'info',
      titulo: 'Repertório citado sem desenvolvimento',
      texto: `Você mencionou ${c2.sinais.repertoriosExibiveis.slice(0, 3).join(', ')}, mas não explicou o que esse repertório demonstra. Cite menos e explique mais: o avaliador premia a relação com o tema, não a citação.`
    });
  }
  if (ctx.paras.length > 5) {
    alertas.push({
      tipo: 'info',
      titulo: 'Muitos parágrafos',
      texto: `${ctx.paras.length} parágrafos em 30 linhas costuma deixar cada ideia sem desenvolvimento. O padrão de 4 a 5 funciona melhor.`
    });
  }

  if (zerada) {
    // com nota zero, os motivos explicam tudo: evitamos alertas redundantes
    const soAlertasGraves = alertas.filter(a => a.tipo === 'perigo');
    alertas.length = 0;
    alertas.push(...soAlertasGraves);
  }

  /* ---------- prioridades de estudo ---------- */
  const prioridades = [...comps]
    .sort((a, b) => a.nota - b.nota)
    .slice(0, 2)
    .map(c => ({
      id: c.id,
      titulo: c.nome,
      nota: c.nota,
      dica: c.melhorias[0] || 'Mantenha o desempenho e refine o repertório.'
    }));

  const confianca = ctx.metricas.palavras >= 250 && ctx.metricas.paragrafos >= 4
    ? 'alta'
    : ctx.metricas.palavras >= 120 ? 'media' : 'baixa';

  return {
    ok: true,
    texto,
    tema,
    notaTotal,
    notaTotalMax,
    notaFaixa: { min: notaTotal, max: notaTotalMax },
    faixa,
    zerada,
    motivosZero,
    competencias: explicadas,
    alertas,
    prioridades,
    confianca,
    metricas: {
      ...ctx.metricas,
      paragrafos: ctx.metricas.paragrafos
    },
    geradoEm: new Date().toISOString()
  };
}
