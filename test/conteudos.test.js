import assert from 'node:assert/strict';
import { AREAS, TOTAL_CONTEUDOS, TOTAL_COMPLETOS, TOTAL_QUESTOES, paginaDe, paginaCompleta } from '../js/db/conteudos/index.js';
import { AREAS_LEGADO, GRUPOS, conteudoPorId } from '../js/db/conteudos/estrutura.js';
import { EXPANSOES } from '../js/db/conteudos/expansoes.js';
import { viewConteudo } from '../js/ui-conteudos.js';
const legados = AREAS_LEGADO.flatMap(a => a.materias.flatMap(m => m.conteudos));
const conteudos = AREAS.flatMap(a => a.materias.flatMap(m => m.conteudos));
assert.equal(conteudos.length, TOTAL_CONTEUDOS);
assert.equal(new Set(conteudos.map(c => c.id)).size, TOTAL_CONTEUDOS);
for (const [id, p] of Object.entries(EXPANSOES)) {
  assert.ok(legados.some(c => c.id === id), `${id}: ID desconhecido`);
  assert.ok(p.secoes.length >= 3, `${id}: seções insuficientes`);
  assert.equal(p.questoes.length, 3, `${id}: requer exatamente três questões`);
  assert.ok(p.exemplos.length >= 2 && p.figuras.length >= 1, `${id}: faltam exemplos ou figura`);
  p.questoes.forEach((q, i) => {
    assert.ok(q.fonte && q.enunciado && /^[A-E]$/.test(q.correta), `${id}: questão ${i+1} incompleta`);
    assert.equal(q.alternativas.length, 5, `${id}: alternativas`);
    assert.ok(q.resolucao.length >= 2, `${id}: resolução insuficiente`);
  });
  const html = viewConteudo(id);
  assert.equal((html.match(/<details class="questao" open>/g) || []).length, 3 + 3 * (paginaDe(id).subtemas || []).length, `${id}: questões renderizadas`);
  const marcadores = ['id="resumo"','id="exemplos"','id="imagens"','id="questoes"','id="video"'];
  const pos = marcadores.map(m=>html.indexOf(m));
  assert.ok(pos.every(x=>x>=0) && pos.every((x,i)=>i===0 || x>pos[i-1]), `${id}: ordem das seções`);
}
assert.equal(TOTAL_COMPLETOS, conteudos.filter(c => paginaCompleta(c.id)).length);
assert.equal(TOTAL_QUESTOES, conteudos.reduce((n,c)=>{ const p=paginaDe(c.id); return n+p.questoes.length+(p.subtemas||[]).reduce((t,s)=>t+s.questoes.length,0); },0));
console.log(`Conteúdos: ${TOTAL_COMPLETOS}/${TOTAL_CONTEUDOS} ampliados; ${TOTAL_QUESTOES} questões exibidas.`);

const reais = ['mat-porcentagem','mat-razao-proporcao','bio-fisiologia','fis-optica','bio-evolucao','bio-citologia-anterior'];
for (const id of reais) {
  const q = paginaDe(id).questoes.filter(q=>q.urlProva);
  assert.ok(q.length > 0, `${id}: questões oficiais não exibidas`);
  assert.ok(q.every(x=>x.adaptada && x.gabaritoOficial === x.correta && x.urlGabarito), `${id}: fonte e gabarito`);
  assert.equal((viewConteudo(id).match(/Abrir caderno oficial/g)||[]).length,q.length);
}
assert.equal(paginaDe('mat-porcentagem').questoes.filter(q=>q.urlProva).length,3);
const oficiais = conteudos.flatMap(c => paginaDe(c.id).questoes).filter(q => q.gabaritoOficial);
const temasOficiais = conteudos.filter(c => paginaDe(c.id).questoes.some(q => q.gabaritoOficial));
console.log(`Questões com referência e gabarito do Inep: ${oficiais.length} em ${temasOficiais.length} conteúdos.`);
for (const c of conteudos) {
  const html = viewConteudo(c.id);
  const questoes = paginaDe(c.id).questoes;
  assert.equal(questoes.length, 3, `${c.id}: requer três questões`);
  assert.equal((html.match(/<details class="questao" open>/g) || []).length, 3 + 3 * (paginaDe(c.id).subtemas || []).length, `${c.id}: questões visíveis`);
  for (const q of questoes) {
    assert.ok(q.enunciado && q.fonte && /^[A-E]$/.test(q.correta), `${c.id}: questão incompleta`);
    assert.equal(q.alternativas.length, 5, `${c.id}: alternativas`);
    assert.ok(q.alternativas.every(a => typeof a === 'string' && a.trim()), `${c.id}: alternativas inválidas`);
    assert.ok(Array.isArray(q.resolucao) && q.resolucao.length >= 2, `${c.id}: resolução incompleta`);
    if (q.gabaritoOficial) assert.ok(q.adaptada && q.urlProva && q.urlGabarito && q.correta === q.gabaritoOficial, `${c.id}: fonte oficial incompleta`);
  }
  assert.ok(!html.includes('As questões deste conteúdo ainda estão sendo escritas'), `${c.id}: aviso de espera`);
  assert.ok(html.includes('id="resumo"'), `${c.id}: sem resumo`);
  assert.ok(html.includes('id="questoes"'), `${c.id}: sem seção de questões`);
  assert.ok(html.includes('id="video"'), `${c.id}: sem vídeo vinculado`);
}

assert.equal(GRUPOS.length, conteudos.length);
const agrupados = new Set(GRUPOS.flatMap(g => [g.pagina, ...g.relacionados]));
for (const c of legados) {
  assert.ok(conteudoPorId(c.id), `${c.id}: URL antiga perdida`);
  assert.ok(agrupados.has(c.id), `${c.id}: material antigo não agrupado`);
}
for (const g of GRUPOS) {
  const p = paginaDe(g.pagina);
  assert.ok(g.topicos.length >= 2, `${g.pagina}: subtemas ausentes`);
  for (const [titulo] of g.topicos) assert.ok(p.secoes.some(s=>s.h===titulo), `${g.pagina}: subtema ${titulo} ausente`);
  assert.ok(p.exemplos.length && (p.figuras.length || p.formulas.length), `${g.pagina}: falta exemplo ou esquema`);
  const html = viewConteudo(g.pagina);
  const pos = ['id="resumo"','id="exemplos"','id="imagens"','id="questoes"','id="video"'].map(m=>html.indexOf(m));
  assert.ok(pos.every(x=>x>=0) && pos.every((x,i)=>i===0 || x>pos[i-1]), `${g.pagina}: ordem das seções`);
  for (const x of g.relacionados) assert.ok(legados.some(c=>c.id===x), `${g.pagina}: relacionado inválido ${x}`);
}
console.log(`Agrupamento: ${GRUPOS.length} grupos e ${legados.length} URLs anteriores preservadas.`);

const membrana = paginaDe('bio-citologia');
assert.equal(membrana.questoes.length, 3);
assert.equal(membrana.chave.length, 6);
assert.ok(membrana.questoes.every(q => q.ano === null && q.porqueErram.length === 4 && q.resolucao.length >= 3));
assert.ok(membrana.exemplos.slice(0,2).every(e=>e.comentario));
assert.equal(membrana.figuras[0].itens.length,6);
assert.ok(membrana.recomendacoes && membrana.materiaisRelacionados.some(m => m.id === 'bio-citologia-anterior'));
assert.equal(paginaDe('bio-citologia-anterior').questoes.length,3);
console.log('Citologia: tópico aprofundado e questões anteriores preservadas.');

const subtemasCitologia = paginaDe('bio-citologia').subtemas;
assert.equal(subtemasCitologia.length, 3);
for (const t of subtemasCitologia) {
  assert.ok(t.id && t.codigo && t.titulo && t.secoes.length>=3 && t.secoes.length<=5);
  assert.ok(t.secoes.every(s=>s.h && s.ps.length>=2));
  assert.ok(t.chave.length>=4 && t.chave.length<=6);
  assert.equal(t.exemplos.length, 2);
  assert.ok(t.exemplos.every(e=>e.titulo && e.texto && e.comentario));
  assert.ok(t.roteiro.length>=4 && t.roteiro.length<=6);
  assert.equal(t.questoes.length,3);
  for (const q of t.questoes) {
    assert.equal(q.ano,null);
    assert.equal(q.alternativas.length,5);
    assert.ok(/^[A-E]$/.test(q.correta));
    assert.ok(q.resolucao.length>=3 && q.porqueErram.length===4);
    const erradas='ABCDE'.split('').filter(x=>x!==q.correta);
    assert.deepEqual(q.porqueErram.map(x=>x.slice(0,1)).sort(),erradas.sort());
  }
  assert.ok(t.video.url && t.video.busca && t.fontes.length);
  const html=viewConteudo('bio-citologia');
  assert.ok(html.includes(`id="${t.id}"`));
}
console.log('Três subtemas adicionais renderizados com três questões inéditas cada.');

for (const id of ['lin-interpretacao','lin-variacao','mat-porcentagem','his-colonia']) {
  const sub = paginaDe(id).subtemas;
  assert.equal(sub.length,1);
  for (const t of sub) {
    assert.ok(t.secoes.length>=3 && t.secoes.length<=5 && t.secoes.every(s=>s.ps.length>=2));
    assert.ok(t.chave.length>=4 && t.chave.length<=6);
    assert.equal(t.exemplos.length,2);
    assert.ok(t.roteiro.length>=4 && t.roteiro.length<=6);
    assert.equal(t.questoes.length,3);
    for (const q of t.questoes) {
      assert.equal(q.alternativas.length,5);
      assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(), 'ABCDE'.split('').filter(x=>x!==q.correta).sort());
      assert.ok(q.resolucao.length>=3 && q.ano===null);
    }
    assert.ok(viewConteudo(id).includes(`id="${t.id}"`));
  }
}
console.log('Interpretação e variação linguística: subtemas com questões inéditas.');
