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
