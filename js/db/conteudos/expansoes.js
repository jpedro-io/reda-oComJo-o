/**
 * Expansões: o texto completo de cada conteúdo, separado das páginas antigas.
 *
 * Cada arquivo de área exporta um objeto por id de conteúdo com os campos
 * novos. O que não estiver aqui continua valendo o que está em paginas-*.js,
 * então dá para ir completando o guia sem quebrar o que já existe.
 *
 * Campos:
 *   secoes     resumo completo, por subtema: [{ h, ps: [] }]
 *   exemplos   [{ titulo, texto, comentario }]
 *   figuras    [{ titulo, tipo: 'fluxo'|'barras'|'camadas', itens: [], legenda }]
 *   formulas   [{ titulo, expr, uso }]
 *   chave      ["o que mais cai", ...]
 *   questoes   três por conteúdo, com resolução escrita em passos
 */
import { EXP_LINGUAGENS } from './expansao-linguagens.js';
import { EXP_HUMANAS } from './expansao-humanas.js';
import { EXP_NATUREZA } from './expansao-natureza.js';
import { EXP_MATEMATICA } from './expansao-matematica.js';

export const EXPANSOES = {
  ...EXP_LINGUAGENS,
  ...EXP_HUMANAS,
  ...EXP_NATUREZA,
  ...EXP_MATEMATICA,
};
