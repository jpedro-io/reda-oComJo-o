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
import { MATERIAL_MEMBRANA } from './material-membrana.js';
import { SUBTEMAS_CITOLOGIA } from './subtemas-citologia.js';
import { SUBTEMA_BIOENERGETICA } from './subtema-bioenergetica.js';
import { SUBTEMAS_PORTUGUES } from './subtemas-portugues.js';
import { SUBTEMA_MAT_FINANCEIRA } from './subtema-matematica-financeira.js';
import { SUBTEMA_BRASIL_COLONIA } from './subtema-brasil-colonia.js';
import { SUBTEMAS_ECOLOGIA } from './subtemas-ecologia.js';
import { SUBTEMAS_MATEMATICA } from './subtemas-matematica.js';
import { SUBTEMAS_GEOMETRIA_FUNCOES } from './subtemas-geometria-funcoes.js';
import { SUBTEMAS_PORT_APLICADO } from './subtemas-portugues-aplicado.js';
import { SUBTEMAS_LITERATURA } from './subtemas-literatura.js';
import { SUBTEMAS_ARTES_CORPO } from './subtemas-artes-corpo.js';
import { SUBTEMAS_LINGUAS } from './subtemas-linguas.js';
import { SUBTEMAS_BIOLOGIA_VIDA } from './subtemas-biologia-vida.js';
import { SUBTEMAS_QUIMICA_INICIAL } from './subtemas-quimica-inicial.js';
import { SUBTEMAS_QUIMICA_FINAL } from './subtemas-quimica-final.js';
import { SUBTEMAS_FISICA_MECANICA } from './subtemas-fisica-mecanica.js';
import { SUBTEMAS_FISICA_TERMICA_ONDAS } from './subtemas-fisica-termica-ondas.js';
import { SUBTEMAS_FISICA_ELETRICA_OPTICA } from './subtemas-fisica-eletrica-optica.js';
import { SUBTEMAS_SOCIOLOGIA } from './subtemas-sociologia.js';
import { SUBTEMAS_FILOSOFIA } from './subtemas-filosofia.js';
import { SUBTEMAS_GEOGRAFIA } from './subtemas-geografia.js';
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
  if (id === 'bio-citologia-anterior') return paginaOriginal('bio-citologia', conteudo);
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
  if (id === 'bio-citologia') {
    return {...principal, secoes:[...MATERIAL_MEMBRANA.secoes, ...secoes], resumo:[],
      chave:MATERIAL_MEMBRANA.chave,
      exemplos:[...MATERIAL_MEMBRANA.exemplos, ...textos.flatMap(({p}) => p.exemplos)],
      figuras:[...MATERIAL_MEMBRANA.figuras, ...textos.flatMap(({p}) => p.figuras)],
      formulas:textos.flatMap(({p}) => p.formulas),
      questoes:MATERIAL_MEMBRANA.questoes,
      recomendacoes:MATERIAL_MEMBRANA.recomendacoes,
      subtemas:[SUBTEMAS_CITOLOGIA[0], SUBTEMA_BIOENERGETICA, SUBTEMAS_CITOLOGIA[1]],
      materiaisRelacionados:[{id:'bio-citologia-anterior', titulo:'Citologia: material e questões anteriores, incluindo questão do Enem', video:VIDEOS[id] || null}]
    };
  }
  const subtemasPorGrupo = {'bio-ecologia':SUBTEMAS_ECOLOGIA, 'lin-interpretacao':[SUBTEMAS_PORTUGUES[0]], 'lin-variacao':[SUBTEMAS_PORTUGUES[1]], 'mat-porcentagem':[SUBTEMA_MAT_FINANCEIRA], 'his-colonia':[SUBTEMA_BRASIL_COLONIA]};
  const subtemas = [...(subtemasPorGrupo[id] || []), ...(SUBTEMAS_MATEMATICA[id] || []), ...(SUBTEMAS_GEOMETRIA_FUNCOES[id] || []), ...(SUBTEMAS_PORT_APLICADO[id] || []), ...(id === 'lit-modernismo' ? SUBTEMAS_LITERATURA : []), ...(SUBTEMAS_ARTES_CORPO[id] || []), ...(id === 'ing-interpretacao' ? SUBTEMAS_LINGUAS : []), ...(SUBTEMAS_BIOLOGIA_VIDA[id] || []), ...(SUBTEMAS_QUIMICA_INICIAL[id] || []), ...(SUBTEMAS_QUIMICA_FINAL[id] || []), ...(SUBTEMAS_FISICA_MECANICA[id] || []), ...(SUBTEMAS_FISICA_TERMICA_ONDAS[id] || []), ...(SUBTEMAS_FISICA_ELETRICA_OPTICA[id] || []), ...(SUBTEMAS_SOCIOLOGIA[id] || []), ...(SUBTEMAS_FILOSOFIA[id] || []), ...(SUBTEMAS_GEOGRAFIA[id] || [])]
    .sort((a,b) => a.codigo.localeCompare(b.codigo, 'pt-BR', {numeric:true}));
  return {...principal, secoes, resumo:[], subtemas,
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
  .reduce((t, c) => { const p = paginaDe(c.id); return t + p.questoes.length + (p.subtemas || []).reduce((n, s) => n + s.questoes.length, 0); }, 0);
