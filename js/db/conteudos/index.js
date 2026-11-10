/**
 * Junta estrutura + páginas + vídeos num lugar só. Quem renderiza importa
 * daqui e não precisa saber em que arquivo cada área mora.
 */
export {
  AREAS, TOTAL_CONTEUDOS, areaPorId, materiaPorId, conteudoPorId,
} from './estrutura.js';
export { VIDEOS } from './videos.js';
import { PAGINAS_MATEMATICA } from './paginas-matematica.js';
import { PAGINAS_NATUREZA } from './paginas-natureza.js';
import { PAGINAS_HUMANAS } from './paginas-humanas.js';
import { PAGINAS_LINGUAGENS } from './paginas-linguagens.js';
import { VIDEOS } from './videos.js';
import { AREAS } from './estrutura.js';
import { EXPANSOES } from './expansoes.js';

export const PAGINAS = {
  ...PAGINAS_LINGUAGENS,
  ...PAGINAS_HUMANAS,
  ...PAGINAS_NATUREZA,
  ...PAGINAS_MATEMATICA,
};

/** Conteúdo pronto para render: página + vídeo + hierarquia. */
export function paginaDe(id, conteudo) {
  const pagina = PAGINAS[id] || {};
  const extra = EXPANSOES[id] || {};
  return {
    ...pagina,
    ...extra,
    resumo: extra.secoes?.length ? [] : (pagina.resumo || []),
    secoes: extra.secoes || [],
    exemplos: extra.exemplos || [],
    figuras: extra.figuras || [],
    chave: extra.chave || pagina.chave || [],
    formulas: extra.formulas || pagina.formulas || [],
    questoes: extra.questoes?.length ? extra.questoes : (pagina.questoes || []),
    video: VIDEOS[id] || null,
    conteudo: conteudo || null,
  };
}

/** Página completa: tem resumo longo escrito (não só o aviso). */
export function paginaCompleta(id) {
  const extra = EXPANSOES[id];
  return Boolean(extra && extra.secoes && extra.secoes.length >= 3 && (extra.questoes || []).length >= 3);
}

/** Quantos conteúdos já receberam o texto completo. */
export const TOTAL_COMPLETOS = Object.keys(EXPANSOES)
  .filter(id => paginaCompleta(id)).length;

/** Quantos conteúdos de uma matéria já têm texto escrito. */
export function temTexto(id) { return Array.isArray(PAGINAS[id]?.resumo) && PAGINAS[id].resumo.length > 0; }

/** Quantas questões reais já foram resolvidas no guia inteiro. */
export const TOTAL_QUESTOES = AREAS.flatMap(a => a.materias.flatMap(m => m.conteudos))
  .reduce((t, c) => t + paginaDe(c.id).questoes.length, 0);
