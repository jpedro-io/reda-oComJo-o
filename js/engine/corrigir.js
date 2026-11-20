// Arquivo responsável por coordenar a correção completa de uma redação.

import { normalizar, limitar, nivel } from './texto.js';
import { montarContexto, avaliarC1, avaliarC2, avaliarC3, avaliarC4, avaliarC5 } from './competencias.js';
import { buscarTema, keywordsDeTemaLivre } from '../db/temas.js';
import { explicarCompetencias } from './explicar.js';

// Seção: faixas de nota e ajustes de linguagem.

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

function ajustarPlural(txt) {
  return String(txt)
    .replace(/(\d+)\s+([A-Za-zÀ-ÿ]+?)\((s|m)\)/g, (m, n, base, suf) =>
      Number(n) === 1 ? `${n} ${base}` : `${n} ${base}${suf}`)
    .replace(/([A-Za-zÀ-ÿ]+?)\((s|m)\)/g, (m, base, suf) => {
      const numeros = String(txt).match(/\d+/g);
      const n = numeros ? Number(numeros[0]) : 0;
      return n === 1 ? base : `${base}${suf}`;
    });
}

function ajustarPluraisEm(valor) {
  if (typeof valor === 'string') return ajustarPlural(valor);
  if (Array.isArray(valor)) return valor.map(ajustarPluraisEm);
  if (valor && typeof valor === 'object') {
    const saida = {};
    for (const [k, v] of Object.entries(valor)) saida[k] = ajustarPluraisEm(v);
    return saida;
  }
  return valor;
}

// Seção: resolução do tema e situações de nota zero.

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

// Seção: avaliação e composição do relatório final.

export function corrigir(textoBruto, opts = {}) {
  const texto = (textoBruto || '').replace(/\u00a0/g, ' ').trim();
  const tema = resolverTema(opts);

  if (texto.length < 40) {
    return {
      ok: false,
      erro: 'Texto muito curto para avaliar. Escreva ao menos alguns períodos (ou carregue um exemplo) para ver o relatório.'
    };
  }

  const contexto = montarContexto(texto, tema);
  const avaliacoes = [avaliarC1(contexto), avaliarC2(contexto), avaliarC3(contexto), avaliarC4(contexto), avaliarC5(contexto)];
  const alertas = [];

  const motivosZero = [];
  if (contexto.metricas.linhas <= 7) {
    motivosZero.push({
      titulo: 'Texto com até 7 linhas',
      detalhe: `Sua redação tem cerca de ${contexto.metricas.linhas} linhas. A cartilha do Inep determina nota zero para textos com até 7 linhas.`
    });
  }
  const identificacao = /(?:nome|assinatura|turma|col[eé]gio|escola)\s*:/i.test(texto);
  if (identificacao) {
    motivosZero.push({
      titulo: 'Possível identificação no texto',
      detalhe: 'Encontrei algo como "nome:", "turma:" ou "escola:". Qualquer marca de identificação no espaço da redação zera o texto.'
    });
  }
  const c2 = avaliacoes.find(c => c.id === 'C2');
  if (tema && c2.sinais.riscoTema === 'tangenciamento' && c2.sinais.coberturaTema <= 10) {
    motivosZero.push({
      titulo: 'Risco de fuga total ao tema',
      detalhe: 'O vocabulário do recorte proposto quase não aparece. Se o texto não desenvolve o tema da proposta, a nota é zero, confira antes de considerar a nota abaixo.'
    });
  }

  const zerada = motivosZero.length > 0;

  if (zerada) {
    avaliacoes.forEach(c => {
      c.notaOriginal = c.nota;
      c.pontosOriginal = c.pontos;
      c.faixaOriginal = c.faixaNota;
      c.nota = 0; c.pontos = 0; c.nivel = 0; c.nivelOficial = 0;
      c.faixaNota = { min: 0, max: 0 };
      c.abertura = 0;
    });
  }

  if (!zerada && c2.sinais.riscoTema === 'tangenciamento') {
    ['C2', 'C3', 'C5'].forEach(id => {
      const c = avaliacoes.find(x => x.id === id);
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

  const explicadas = explicarCompetencias(avaliacoes);

  if (zerada) {
    for (const c of explicadas) {
      c.explicacao = c.explicacao || {};
      c.explicacao.zero = motivosZero.map(m => ({ titulo: m.titulo, detalhe: m.detalhe }));
      c.explicacao.sintese = `Nota zero: ${motivosZero.map(m => m.titulo.toLowerCase()).join('; ')}. `
        + 'A cartilha zera o texto por esse motivo antes de avaliar a escrita, o que aparece '
        + 'abaixo são observações sobre o texto, não a causa da nota.';
    }
  }
  const notaTotal = avaliacoes.reduce((a, c) => a + c.nota, 0);
  const somaMax = avaliacoes.reduce((a, c) => a + (c.faixaNota?.max ?? c.nota), 0);
  const notaTotalMax = zerada ? 0
    : Math.min(1000, Math.max(notaTotal + 40, Math.min(notaTotal + 100, somaMax)));
  const faixa = faixaDe(Math.round((notaTotal + notaTotalMax) / 2));

  if (contexto.metricas.linhas > 30) {
    alertas.push({
      tipo: 'atencao',
      titulo: 'Mais de 30 linhas',
      texto: `Estimativa de ${contexto.metricas.linhas} linhas. A folha oficial tem 30; o que passar disso é desconsiderado.`
    });
  }
  if (contexto.metricas.linhas >= 8 && contexto.metricas.linhas <= 15) {
    alertas.push({
      tipo: 'atencao',
      titulo: 'Texto curto',
      texto: 'Redações com menos de ~20 linhas dificilmente conseguem desenvolver dois argumentos e uma proposta completa.'
    });
  }
  const c5 = avaliacoes.find(c => c.id === 'C5');
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
  if (contexto.paras.length > 5) {
    alertas.push({
      tipo: 'info',
      titulo: 'Muitos parágrafos',
      texto: `${contexto.paras.length} parágrafos em 30 linhas costuma deixar cada ideia sem desenvolvimento. O padrão de 4 a 5 funciona melhor.`
    });
  }

  if (zerada) {
    const soAlertasGraves = alertas.filter(a => a.tipo === 'perigo');
    alertas.length = 0;
    alertas.push(...soAlertasGraves);
  }

  const prioridades = [...avaliacoes]
    .sort((a, b) => a.nota - b.nota)
    .slice(0, 2)
    .map(c => ({
      id: c.id,
      titulo: c.nome,
      nota: c.nota,
      dica: c.melhorias[0] || 'Mantenha o desempenho e refine o repertório.'
    }));

  const confianca = contexto.metricas.palavras >= 250 && contexto.metricas.paragrafos >= 4
    ? 'alta'
    : contexto.metricas.palavras >= 120 ? 'media' : 'baixa';

  return ajustarPluraisEm({
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
      ...contexto.metricas,
      paragrafos: contexto.metricas.paragrafos
    },
    geradoEm: new Date().toISOString()
  });
}
