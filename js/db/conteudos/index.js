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

export const PAGINAS = {
  ...PAGINAS_LINGUAGENS,
  ...PAGINAS_HUMANAS,
  ...PAGINAS_NATUREZA,
  ...PAGINAS_MATEMATICA,
};

/** Conteúdo pronto para render: página + vídeo + hierarquia. */
export function paginaDe(id, conteudo) {
  const pagina = PAGINAS[id] || {};
  return {
    ...pagina,
    resumo: pagina.resumo || [],
    chave: pagina.chave || [],
    formulas: pagina.formulas || [],
    questoes: pagina.questoes || [],
    video: VIDEOS[id] || null,
    conteudo: conteudo || null,
  };
}

/** Quantos conteúdos de uma matéria já têm texto escrito. */
export function temTexto(id) { return Array.isArray(PAGINAS[id]?.resumo) && PAGINAS[id].resumo.length > 0; }

/** Quantas questões reais já foram resolvidas no guia inteiro. */
export const TOTAL_QUESTOES = Object.values(PAGINAS)
  .reduce((t, p) => t + (p.questoes?.length || 0), 0);
