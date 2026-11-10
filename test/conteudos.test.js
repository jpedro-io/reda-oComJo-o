import assert from 'node:assert/strict';
import { AREAS, TOTAL_CONTEUDOS, TOTAL_COMPLETOS, TOTAL_QUESTOES, paginaDe, paginaCompleta } from '../js/db/conteudos/index.js';
import { EXPANSOES } from '../js/db/conteudos/expansoes.js';
import { viewConteudo } from '../js/ui-conteudos.js';
const conteudos = AREAS.flatMap(a => a.materias.flatMap(m => m.conteudos));
assert.equal(conteudos.length, TOTAL_CONTEUDOS);
assert.equal(new Set(conteudos.map(c => c.id)).size, TOTAL_CONTEUDOS);
for (const [id, p] of Object.entries(EXPANSOES)) {
  assert.ok(conteudos.some(c => c.id === id), `${id}: ID desconhecido`);
  assert.ok(p.secoes.length >= 3, `${id}: seções insuficientes`);
  assert.equal(p.questoes.length, 3, `${id}: requer exatamente três questões`);
  assert.ok(p.exemplos.length >= 2 && p.figuras.length >= 1, `${id}: faltam exemplos ou figura`);
  p.questoes.forEach((q, i) => {
    assert.ok(q.fonte && q.enunciado && /^[A-E]$/.test(q.correta), `${id}: questão ${i+1} incompleta`);
    assert.equal(q.alternativas.length, 5, `${id}: alternativas`);
    assert.ok(q.resolucao.length >= 2, `${id}: resolução insuficiente`);
  });
  const html = viewConteudo(id);
  assert.equal((html.match(/<details class="questao" open>/g) || []).length, 3, `${id}: questões renderizadas`);
  const marcadores = ['id="resumo"','id="exemplos"','id="imagens"','id="questoes"','id="video"'];
  const pos = marcadores.map(m=>html.indexOf(m));
  assert.ok(pos.every(x=>x>=0) && pos.every((x,i)=>i===0 || x>pos[i-1]), `${id}: ordem das seções`);
}
assert.equal(TOTAL_COMPLETOS, conteudos.filter(c => paginaCompleta(c.id)).length);
assert.equal(TOTAL_QUESTOES, conteudos.reduce((n,c)=>n+paginaDe(c.id).questoes.length,0));
console.log(`Conteúdos: ${TOTAL_COMPLETOS}/${TOTAL_CONTEUDOS} ampliados; ${TOTAL_QUESTOES} questões exibidas.`);

const reais = ['mat-porcentagem','mat-razao-proporcao','bio-fisiologia','fis-optica','bio-evolucao','bio-citologia'];
for (const id of reais) {
  const q = paginaDe(id).questoes.filter(q=>q.urlProva);
  assert.ok(q.length > 0, `${id}: questões oficiais não exibidas`);
  assert.ok(q.every(x=>x.adaptada && x.gabaritoOficial === x.correta && x.urlGabarito), `${id}: fonte e gabarito`);
  assert.equal((viewConteudo(id).match(/Abrir caderno oficial/g)||[]).length,q.length);
}
assert.equal(paginaDe('mat-porcentagem').questoes.filter(q=>q.urlProva).length,3);
console.log('Questões verificadas: 8 em 6 conteúdos, incluindo 3 em porcentagem.');
for (const c of conteudos) {
  const html = viewConteudo(c.id);
  assert.ok(html.includes('id="resumo"'), `${c.id}: sem resumo`);
  assert.ok(html.includes('id="questoes"'), `${c.id}: sem seção de questões`);
  assert.ok(html.includes('id="video"'), `${c.id}: sem vídeo vinculado`);
}
