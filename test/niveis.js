/**
 * Testa o contrato de nota: OFICIAIS de 40 em 40 + FAIXA publicada.
 *
 *   node test/niveis.js
 *
 * O que precisa valer:
 *   1. a escala interna (0 a 200, de 20 em 20) continua existindo — é o
 *      diagnóstico do motor, não a nota publicada;
 *   2. as notas PUBLICADAS são só as seis da grade: 0, 40, 80, 120, 160, 200;
 *   3. toda competência traz `faixaNota` = [nota, nota + abertura], com abertura
 *      de 0, 20 ou 40 pontos, e nunca passa de 200;
 *   4. o nível oficial é floor(nota / 40) — 180 não existe, e 160 é nível 4;
 *   5. a nota final é uma faixa: mínimo = soma das oficiais, máximo no máximo
 *      100 pontos acima (o limite em que a cartilha chama o terceiro avaliador);
 *   6. a escada da C5 (elementos válidos × vagos) segue a dos descritores;
 *   7. degradar um texto bom nunca sobe a nota.
 */

import { PONTOS, NIVEIS, nivelDe, pontosDe, nivelOficial, ehOficial, OFICIAIS } from '../js/db/niveis.js';
import { oficializar } from '../js/engine/texto.js';
import { notaProposta } from '../js/engine/competencias.js';
import { corrigir } from '../js/engine/corrigir.js';
import { EXEMPLOS } from '../js/db/exemplos.js';
import { REDACOES } from '../js/db/redacoes.js';

let ok = 0;
const falhas = [];
const t = (nome, cond, extra = '') => {
  if (cond) ok++;
  else falhas.push(`${nome}${extra ? ` — ${extra}` : ''}`);
};

/* --- 1. escala interna intacta ---------------------------------------- */
t('escala interna tem 11 pontos', PONTOS.length === 11 && PONTOS[10] === 200, String(PONTOS.length));
for (const id of ['C1', 'C2', 'C3', 'C4', 'C5']) {
  const lista = NIVEIS[id].niveis;
  t(`${id}: 11 degraus internos`, lista.length === 11, String(lista.length));
  t(`${id}: descritor próprio em cada degrau`,
    lista.every(nv => typeof nv.texto === 'string' && nv.texto.length > 25));
  t(`${id}: degrau e pontuação andam juntos`,
    lista.every((nv, i) => nv.n === i && nv.pontos === i * 20));
}
t('conversão ida e volta', PONTOS.every(p => pontosDe(nivelDe(p)) === p));
t('nível oficial dos seis pontos da grade', OFICIAIS.every(p => nivelOficial(p) === p / 40));
t('degrau de 20 não é nota oficial', !ehOficial(20) && !ehOficial(180) && !ehOficial(100));

/* --- 2. oficializar(): só 40 em 40, com faixa -------------------------- */
for (let p = 0; p <= 200; p += 20) {
  const o = oficializar(p);
  t(`oficializar(${p}): nota é oficial`, OFICIAIS.includes(o.nota), String(o.nota));
  t(`oficializar(${p}): mínimo da faixa = nota`, o.faixa.min === o.nota, JSON.stringify(o.faixa));
  t(`oficializar(${p}): abertura 0, 20 ou 40`, [0, 20, 40].includes(o.abertura), String(o.abertura));
  t(`oficializar(${p}): máximo = nota + abertura`, o.faixa.max === o.nota + o.abertura, JSON.stringify(o.faixa));
  t(`oficializar(${p}): nunca passa de 200`, o.faixa.max <= 200, String(o.faixa.max));
}
t('200 fecha a faixa', oficializar(200).abertura === 0 && oficializar(200).faixa.max === 200);
t('180 não é publicado como nota (vira 160 + faixa 160–200)',
  oficializar(180).nota === 160 && oficializar(180).faixa.max === 200);

/* --- 3. escada da C5, como nos descritores ---------------------------- */
const esperadoC5 = [
  [0, 0, 0], [0, 1, 20], [1, 0, 40], [1, 1, 60], [2, 0, 80], [2, 1, 100],
  [3, 0, 120], [3, 1, 140], [4, 0, 160], [4, 1, 180], [5, 0, 200]
];
for (const [v, g, nota] of esperadoC5) {
  t(`C5: ${v} válidos + ${g} vago(s) = ${nota}`, notaProposta(v, g) === nota, String(notaProposta(v, g)));
}
t('C5: elemento vago além do primeiro não inventa degrau', notaProposta(2, 3) === notaProposta(2, 1));

/* --- 4. o que o motor publica ---------------------------------------- */
const casos = [
  ...EXEMPLOS.map(e => ({ nome: `exemplo:${e.id}`, texto: e.texto, temaId: e.temaId })),
  ...REDACOES.map(r => ({
    nome: `redacao:${r.id}`,
    texto: r.paragrafos.map(p => p.texto).join('\n'),
    temaId: r.temaId
  }))
];

for (const caso of casos) {
  const r = corrigir(caso.texto, { temaId: caso.temaId });
  for (const c of r.competencias) {
    t(`${caso.nome}/${c.id}: nota publicada é oficial`, OFICIAIS.includes(c.nota), String(c.nota));
    t(`${caso.nome}/${c.id}: faixaNota existe`, !!c.faixaNota, JSON.stringify(c.faixaNota));
    t(`${caso.nome}/${c.id}: faixaNota.min = nota`, c.faixaNota.min === c.nota, JSON.stringify(c.faixaNota));
    t(`${caso.nome}/${c.id}: faixaNota.max − min em 0/20/40`,
      [0, 20, 40].includes(c.faixaNota.max - c.faixaNota.min), JSON.stringify(c.faixaNota));
    t(`${caso.nome}/${c.id}: faixa nunca passa de 200`, c.faixaNota.max <= 200, String(c.faixaNota.max));
    t(`${caso.nome}/${c.id}: nível oficial = floor(nota/40)`,
      c.nivelOficial === Math.floor(c.nota / 40), `${c.nivelOficial} vs ${Math.floor(c.nota / 40)}`);
    t(`${caso.nome}/${c.id}: diagnóstico interno em passo de 20`, c.pontos % 20 === 0, String(c.pontos));
    t(`${caso.nome}/${c.id}: sem meia-faixa publicada`, c.nota % 40 === 0 && !c.entreDegraus, String(c.nota));
  }
  t(`${caso.nome}: total é soma das competências`,
    r.notaTotal === r.competencias.reduce((a, c) => a + c.nota, 0), String(r.notaTotal));
  t(`${caso.nome}: notaFaixa.min = total`, r.notaFaixa.min === r.notaTotal, JSON.stringify(r.notaFaixa));
  t(`${caso.nome}: faixa total cabe no limite de divergência`,
    r.notaFaixa.max >= r.notaFaixa.min &&
    (r.zerada ? r.notaFaixa.max === 0 : r.notaFaixa.max - r.notaFaixa.min <= 100),
    JSON.stringify(r.notaFaixa));
  t(`${caso.nome}: total é múltiplo de 40`, r.notaTotal % 40 === 0, String(r.notaTotal));
}

/* --- 5. degradar não sobe a nota -------------------------------------- */
const limpo = EXEMPLOS.find(e => e.id === 'boa').texto;
const trocas = [['saúde', 'saude'], ['também', 'tambem'], ['não', 'nao'],
  ['história', 'historia'], ['educação', 'educacao'], ['consciência', 'consciencia']];
const notasC1 = [];
const faixasC1 = [];
for (let k = 0; k <= trocas.length; k++) {
  let texto = limpo;
  trocas.slice(0, k).forEach(([de, para]) => { texto = texto.split(de).join(para); });
  const c1 = corrigir(texto, { temaId: 'enem-2026' }).competencias[0];
  notasC1.push(c1.nota);
  faixasC1.push(`${c1.faixaNota.min}–${c1.faixaNota.max}`);
}
t('gradiente: C1 começa em 200', notasC1[0] === 200, String(notasC1[0]));
t('gradiente: C1 nunca sobe ao piorar o texto',
  notasC1.every((n, i) => i === 0 || n <= notasC1[i - 1]), notasC1.join(' > '));
t('gradiente: C1 chega abaixo de 160', notasC1[notasC1.length - 1] <= 160, notasC1.join(' > '));
t('gradiente: só notas oficiais no caminho',
  notasC1.every(n => OFICIAIS.includes(n)), notasC1.join(' > '));

console.log(`\n${ok}/${ok + falhas.length} verificações passaram`);
console.log('notas oficiais produzidas:', [...new Set(notasC1)].sort((a, b) => a - b).join(' · '));
console.log('faixas da C1 no gradiente:', faixasC1.join(' · '));
if (falhas.length) {
  console.log('\nfalhas:');
  falhas.slice(0, 25).forEach(f => console.log('  -', f));
  process.exit(1);
}
