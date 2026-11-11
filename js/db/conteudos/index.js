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
import { AREAS, AREAS_LEGADO, GRUPOS } from './estrutura.js';
import { MATERIAL_REDACAO } from './material-redacao.js';
import { APOIO_GRUPOS } from './apoio-grupos.js';
import { EXPANSOES } from './expansoes.js';
import { QUESTOES_ENEM } from './questoes-enem.js';
import { QUESTOES_DIA1 } from './questoes-inep-dia1.js';
import { QUESTOES_REAPLICACAO } from './questoes-inep-reaplicacao.js';
import { QUESTOES_COMPLEMENTARES } from './questoes-autorais-complementares.js';
import { QUESTOES_REFORCO } from './questoes-autorais-reforco.js';

export const PAGINAS = {
  ...PAGINAS_LINGUAGENS,
  'red-competencias': MATERIAL_REDACAO,
  ...PAGINAS_HUMANAS,
  ...PAGINAS_NATUREZA,
  ...PAGINAS_MATEMATICA,
};

/** Conteúdo pronto para render: página + vídeo + hierarquia. */
function paginaOriginal(id, conteudo) {
  const pagina = PAGINAS[id] || {};
  const extra = EXPANSOES[id] || {};
  const oficiais = [...(QUESTOES_ENEM[id] || []), ...(QUESTOES_DIA1[id] || []), ...(QUESTOES_REAPLICACAO[id] || [])];
  const anteriores = [...(extra.questoes?.length ? extra.questoes : (pagina.questoes || [])).filter(q => !q.ano || q.gabaritoOficial), ...(QUESTOES_COMPLEMENTARES[id] || []), ...(QUESTOES_REFORCO[id] || [])];
  return {
    ...pagina,
    ...extra,
    resumo: extra.secoes?.length ? [] : (pagina.resumo || []),
    secoes: extra.secoes || [],
    exemplos: extra.exemplos || pagina.exemplos || [],
    figuras: extra.figuras || pagina.figuras || [],
    chave: extra.chave || pagina.chave || [],
    formulas: extra.formulas || pagina.formulas || [],
    questoes: oficiais.length ? [...oficiais.slice(0, 3), ...anteriores.slice(0, Math.max(0, 3 - oficiais.length))] : anteriores.slice(0, 3),
    video: VIDEOS[id] || (id === 'red-competencias' ? {id:'TuMVDXpMKZI', titulo:'Redação ENEM: aula de redação', canal:''} : null),
    conteudo: conteudo || null,
  };
}


/** As páginas agrupadas mantêm as seções dos materiais anteriores na mesma página.
 * Exercícios e aulas adicionais permanecem disponíveis nos links históricos. */
export function paginaDe(id, conteudo) {
  const principal = paginaOriginal(id, conteudo);
  const grupo = GRUPOS.find(g => g.pagina === id);
  if (!grupo) return principal;
  const ids = [id, ...grupo.relacionados.filter(x => x !== id)];
  const textos = ids.map(x => ({id:x, p:paginaOriginal(x)}));
  const titulos = Object.fromEntries(AREAS_LEGADO.flatMap(a => a.materias.flatMap(m => m.conteudos.map(c => [c.id,c.titulo]))));
  const secoes = grupo.topicos.map(([h, texto]) => ({h, ps:[texto]}));
  for (const {id: antigo, p} of textos) {
    const conteudoAntigo = p.secoes.length ? p.secoes : (p.resumo.length ? [{h:titulos[antigo] || grupo.titulo, ps:p.resumo}] : []);
    secoes.push(...conteudoAntigo.map(sec => ({...sec, h:`${titulos[antigo] || grupo.titulo} · ${sec.h}`})));
  }
  const apoio = APOIO_GRUPOS[id];
  return {...principal, secoes, resumo:[],
    exemplos:[...textos.flatMap(({p}) => p.exemplos), ...(apoio ? [{titulo:apoio.exemplo[0], texto:apoio.exemplo[1]}] : [])],
    figuras:[...textos.flatMap(({p}) => p.figuras), ...(apoio ? [{tipo:'fluxo', titulo:'Esquema de estudo', itens:apoio.esquema}] : [])],
    formulas:textos.flatMap(({p}) => p.formulas),
    materiaisRelacionados: grupo.relacionados.filter(x => x !== id).map(x => ({id:x, titulo:titulos[x] || x, video:VIDEOS[x] || null}))
  };
}

/** Página completa: tem resumo longo escrito (não só o aviso). */
export function paginaCompleta(id) {
  if (GRUPOS.some(g => g.pagina === id)) return false; // Não confundir texto introdutório com cobertura completa.
  const extra = EXPANSOES[id];
  return Boolean(extra && extra.secoes && extra.secoes.length >= 3 && (extra.questoes || []).length >= 3);
}

/** Quantos conteúdos já receberam o texto completo. */
export const TOTAL_COMPLETOS = AREAS.flatMap(a => a.materias.flatMap(m => m.conteudos))
  .filter(c => paginaCompleta(c.id)).length;

/** Quantos conteúdos de uma matéria já têm texto escrito. */
export function temTexto(id) { return Array.isArray(PAGINAS[id]?.resumo) && PAGINAS[id].resumo.length > 0; }

/** Quantas questões reais já foram resolvidas no guia inteiro. */
export const TOTAL_QUESTOES = AREAS.flatMap(a => a.materias.flatMap(m => m.conteudos))
  .reduce((t, c) => t + paginaDe(c.id).questoes.length, 0);
