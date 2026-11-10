/**
 * REDAÇÕES ANALISADAS — índice geral
 * ------------------------------------------------------------
 * Um texto comentado para cada tema oficial do Enem de 2014 a 2026,
 * além de um diagnóstico de fuga ao tema.
 *
 * IMPORTANTE: são modelos didáticos escritos para este material,
 * reconstruções do padrão nota 1000 — não transcrições de redações
 * oficiais de participantes.
 */

import { REDACOES_2014_2019 } from './redacoes-2014-2019.js';
import { REDACOES_2020_2026 } from './redacoes-2020-2026.js';

/** Cores dos destaques — pensadas para o fundo escuro do glassmorphism. */
export const TIPOS_DESTAQUE = {
  repertorio: { rotulo: 'Repertório', cor: '#C4A2FF' },
  tese: { rotulo: 'Tese', cor: '#0FFCBE' },
  problema: { rotulo: 'Problema', cor: '#FF8E9E' },
  argumento: { rotulo: 'Argumento', cor: '#FFC46B' },
  conectivo: { rotulo: 'Coesão', cor: '#74C7FF' },
  proposta: { rotulo: 'Proposta', cor: '#E58BFF' }
};

export const REDACOES = [
  ...REDACOES_2014_2019,
  ...REDACOES_2020_2026
].map(r => ({
  tipo: 'Nota 1000 · modelo didático',
  ...r
}));

export function buscarRedacao(id) {
  return REDACOES.find(r => r.id === id) || null;
}

/** Agrupa por ano (mais recente primeiro). */
export function redacoesPorAno() {
  const anos = [...new Set(REDACOES.map(r => r.ano))].sort((a, b) => b - a);
  return anos.map(ano => ({ ano, itens: REDACOES.filter(r => r.ano === ano) }));
}

export const TOTAL_NOTA_MIL = REDACOES.filter(r => r.nota === 1000).length;
