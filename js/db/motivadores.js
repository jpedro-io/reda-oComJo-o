/**
 * Textos motivadores por tema — agregador.
 *
 * Uso: `motivadoresDe(temaId)` devolve a lista de textos de apoio da proposta.
 * Cada item tem `titulo`, `fonte` e `texto`. São versões didáticas (adaptadas),
 * construídas a partir de leis, conceitos e dados públicos — não são os textos
 * originais da prova.
 */

import { MOTIVADORES_OFICIAIS } from './motivadores-oficiais.js';
import { MOTIVADORES_TREINO } from './motivadores-treino.js';

export const MOTIVADORES = { ...MOTIVADORES_OFICIAIS, ...MOTIVADORES_TREINO };

export const motivadoresDe = (temaId) => MOTIVADORES[temaId] || [];

export const TOTAL_MOTIVADORES = Object.values(MOTIVADORES)
  .reduce((soma, lista) => soma + lista.length, 0);

/** Temas que já receberam textos motivadores. */
export const TEMAS_COM_MOTIVADORES = Object.keys(MOTIVADORES).length;
