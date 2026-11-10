/**
 * Testa a escala intermediária (0 a 200, de 20 em 20).
 *
 *   node test/niveis.js
 *
 * O que precisa valer:
 *   1. os 11 degraus existem em cada competência, com descritor próprio;
 *   2. os seis níveis oficiais (0, 40, 80, 120, 160, 200) caem nos degraus pares;
 *   3. a escada da C5 (elementos válidos × vagos) é exatamente a dos descritores;
 *   4. o motor nunca devolve nota fora da escala — e usa, de fato, os degraus
 *      intermediários (se só saísse 0/40/80/…, a escala nova não estaria valendo).
 */

import { PONTOS, NIVEIS, nivelDe, pontosDe, nivelOficial, ehOficial, OFICIAIS } from '../js/db/niveis.js';
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

/* --- 1. os onze degraus --- */
t('escala tem 11 pontos', PONTOS.length === 11 && PONTOS[10] === 200, String(PONTOS.length));
for (const id of ['C1', 'C2', 'C3', 'C4', 'C5']) {
  const lista = NIVEIS[id].niveis;
  t(`${id}: 11 degraus`, lista.length === 11, String(lista.length));
  t(`${id}: descritor próprio em cada degrau`,
    lista.every(nv => typeof nv.texto === 'string' && nv.texto.length > 25));
  t(`${id}: degrau e pontuação andam juntos`,
    lista.every((nv, i) => nv.n === i && nv.pontos === i * 20));
  t(`${id}: tem texto de escada`, typeof NIVEIS[id].avalia === 'string' && NIVEIS[id].avalia.length > 40);
}

/* --- 2. níveis oficiais nas posições pares --- */
for (const p of OFICIAIS) {
  t(`oficial ${p} é degrau par`, ehOficial(p) && nivelDe(p) % 2 === 0);
  t(`oficial ${p} mapeia no nível ${p / 40}`, nivelOficial(p) === p / 40, String(nivelOficial(p)));
}
t('degrau intermediário não é oficial', !ehOficial(20) && !ehOficial(180));
t('conversão ida e volta', PONTOS.every(p => pontosDe(nivelDe(p)) === p));

/* --- 3. escada da C5, exatamente como nos descritores --- */
const esperadoC5 = [
  [0, 0, 0], [0, 1, 20], [1, 0, 40], [1, 1, 60], [2, 0, 80], [2, 1, 100],
  [3, 0, 120], [3, 1, 140], [4, 0, 160], [4, 1, 180], [5, 0, 200]
];
for (const [v, g, nota] of esperadoC5) {
  t(`C5: ${v} válidos + ${g} vago(s) = ${nota}`, notaProposta(v, g) === nota, String(notaProposta(v, g)));
}
t('C5: elemento vago além do primeiro não inventa degrau', notaProposta(2, 3) === notaProposta(2, 1));

/* --- 4. o motor respeita a escala e a usa de verdade --- */
const casos = [
  ...EXEMPLOS.map(e => ({ nome: `exemplo:${e.id}`, texto: e.texto, temaId: e.temaId })),
  ...REDACOES.map(r => ({
    nome: `redacao:${r.id}`,
    texto: r.paragrafos.map(p => p.texto).join('\n'),
    temaId: r.temaId
  }))
];

const vistos = new Set();
for (const caso of casos) {
  const r = corrigir(caso.texto, { temaId: caso.temaId });
  for (const c of r.competencias) {
    t(`${caso.nome}/${c.id}: nota em degrau de 20 (cheio ou meia-faixa)`, c.nota % 20 === 0, String(c.nota));
    t(`${caso.nome}/${c.id}: meia-faixa só quando autorizada`,
      c.nota % 40 === 0 || c.sinais.meiaFaixa === true, String(c.nota));
    t(`${caso.nome}/${c.id}: diagnóstico múltiplo de 20`, c.pontos % 20 === 0, String(c.pontos));
    t(`${caso.nome}/${c.id}: nota entre 0 e 200`, c.nota >= 0 && c.nota <= 200, String(c.nota));
    t(`${caso.nome}/${c.id}: nível = pontos/20`, c.nivel === c.pontos / 20, `${c.nivel} vs ${c.pontos / 20}`);
    t(`${caso.nome}/${c.id}: nota 0 só com diagnóstico 0`,
      c.nota !== 0 || c.pontos === 0, `${c.pontos}/${c.nota}`);
    t(`${caso.nome}/${c.id}: meia-faixa fica 20 acima do nível de baixo`,
      !c.entreDegraus || c.entreDegraus.degrau % 40 !== 20 ||
        (c.entreDegraus.aplicado ? c.nota === c.entreDegraus.degrau : c.nota === c.entreDegraus.de),
      JSON.stringify(c.entreDegraus));
    if (!r.zerada) vistos.add(c.pontos);
  }
  t(`${caso.nome}: total é soma das competências`,
    r.notaTotal === r.competencias.reduce((a, c) => a + c.nota, 0));
}

/* --- 5. gradiente: degradar o texto tem de descer a escada -------------
   Se a escala de 20 em 20 está funcionando, injetar desvios num texto nota
   1000 tem de produzir degraus intermediários — e nunca subir a nota. */
const limpo = EXEMPLOS.find(e => e.id === 'boa').texto;
const trocas = [['saúde', 'saude'], ['também', 'tambem'], ['não', 'nao'],
  ['história', 'historia'], ['educação', 'educacao'], ['consciência', 'consciencia']];
const notasC1 = [];
for (let k = 0; k <= trocas.length; k++) {
  let texto = limpo;
  trocas.slice(0, k).forEach(([de, para]) => { texto = texto.split(de).join(para); });
  notasC1.push(corrigir(texto, { temaId: 'enem-2026' }).competencias[0].nota);
}
t('gradiente: C1 começa em 200', notasC1[0] === 200, String(notasC1[0]));
t('gradiente: C1 nunca sobe ao piorar o texto',
  notasC1.every((n, i) => i === 0 || n <= notasC1[i - 1]), notasC1.join(' > '));
t('gradiente: C1 desce por um degrau intermediário',
  notasC1.includes(180) || notasC1.includes(160) || notasC1.includes(140), notasC1.join(' > '));
t('gradiente: C1 chega abaixo de 160', notasC1[notasC1.length - 1] <= 160, notasC1.join(' > '));

const intermediarios = [...vistos].filter(p => !ehOficial(p));
t('o motor usa degraus intermediários', intermediarios.length >= 2,
  `notas vistas: ${[...vistos].sort((a, b) => a - b).join(', ')}`);

console.log(`\n${ok}/${ok + falhas.length} verificações passaram`);
console.log('degraus de 20 produzidos:', [...vistos].sort((a, b) => a - b).join(' · '));
if (falhas.length) {
  console.log('\nfalhas:');
  falhas.slice(0, 25).forEach(f => console.log('  -', f));
  process.exit(1);
}
