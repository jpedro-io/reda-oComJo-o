/**
 * Testa a camada de explicação: todo relatório precisa dizer POR QUE a
 * competência não chegou a 200, com a regra da grade e a evidência do texto.
 *
 *   node test/explicacoes.test.js
 */

import { corrigir } from '../js/engine/corrigir.js';
import { EXEMPLOS } from '../js/db/exemplos.js';
import { REDACOES } from '../js/db/redacoes.js';
import { GRADES } from '../js/db/cartilhas.js';

const norm = s => String(s || '')
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().replace(/\s+/g, ' ')
  .replace(/[“”"'…]/g, '').trim();

let ok = 0;
const falhas = [];
const t = (nome, cond, extra = '') => {
  if (cond) ok++;
  else falhas.push(`${nome}${extra ? ` — ${extra}` : ''}`);
};

const casos = [
  ...EXEMPLOS.map(e => ({ nome: `exemplo:${e.id}`, texto: e.texto, temaId: e.temaId })),
  ...REDACOES.map(r => ({
    nome: `redacao:${r.id}`,
    texto: r.paragrafos.map(p => p.texto).join('\n'),
    temaId: r.temaId
  }))
];

for (const caso of casos) {
  const rel = corrigir(caso.texto, { temaId: caso.temaId });
  t(`${caso.nome}: relatório válido`, rel.ok, rel.erro || '');

  for (const c of rel.competencias) {
    const ex = c.explicacao;
    t(`${caso.nome}/${c.id}: tem explicação`, !!ex);
    if (!ex) continue;

    t(`${caso.nome}/${c.id}: nível coerente`,
      ex.nivel.n === Math.round(c.pontos / 20) && ex.nivel.pontos === c.pontos,
      `nivel=${ex.nivel.n}/${c.pontos / 20} pontos=${ex.nivel.pontos}/${c.pontos}`);
    t(`${caso.nome}/${c.id}: cita a regra da grade`, ex.regra === GRADES[c.id].regra);
    t(`${caso.nome}/${c.id}: fonte da cartilha`, /Competencia_|cartilha/.test(ex.fonte || ''));
    t(`${caso.nome}/${c.id}: sí­ntese`, typeof ex.sintese === 'string' && ex.sintese.length > 20);

    // nota máxima não precisa de motivo; qualquer nota menor precisa
    if (c.nota < 200) {
      t(`${caso.nome}/${c.id}: explica por que não foi 200`, ex.motivos.length > 0,
        `nota=${c.nota} motivos=${ex.motivos.length}`);
    }

    ex.motivos.forEach((m, i) => {
      const et = `${caso.nome}/${c.id}/motivo${i + 1}`;
      t(`${et}: título`, typeof m.titulo === 'string' && m.titulo.length > 8);
      t(`${et}: explicação da regra`, typeof m.porque === 'string' && m.porque.length > 80);
      t(`${et}: ação concreta`, typeof m.comoResolver === 'string' && m.comoResolver.length > 20);
      t(`${et}: gravidade válida`, ['alta', 'media', 'baixa'].includes(m.gravidade));

      if (m.evidencia) {
        const alvo = norm(m.evidencia);
        const corpo = norm(caso.texto);
        // a evidência é um recorte do próprio texto (toleramos corte nas pontas)
        const inicio = alvo.slice(0, 35);
        t(`${et}: evidência vem do texto`, corpo.includes(inicio),
          `“${inicio.slice(0, 60)}…”`);
      }
    });

    if (ex.proximo) {
      t(`${caso.nome}/${c.id}: próximo degrau coerente`,
        ex.proximo.pontos === Math.min(200, c.pontos + 20),
        `${ex.proximo.pontos} vs ${c.pontos + 20}`);
      t(`${caso.nome}/${c.id}: degrau intermediário tem descritor`,
        typeof ex.proximo.exige === 'string' && ex.proximo.exige.length > 20);
    }

    // a régua intermediária e a oficial têm de andar juntas
    t(`${caso.nome}/${c.id}: nota em degrau de 20`, c.nota % 20 === 0, String(c.nota));
    t(`${caso.nome}/${c.id}: diagnóstico em degrau de 20`, c.pontos % 20 === 0, String(c.pontos));
    t(`${caso.nome}/${c.id}: nota e diagnóstico combinam`,
      c.pontos >= c.nota, `${c.pontos} vs ${c.nota}`);
    t(`${caso.nome}/${c.id}: degrau = pontos/20`, ex.nivel.n === c.pontos / 20,
      `${ex.nivel.n} vs ${c.pontos / 20}`);
    t(`${caso.nome}/${c.id}: nível oficial = nota/40 (meia-faixa no nível de baixo)`,
      ex.nivel.oficial === Math.floor(c.nota / 40), `${ex.nivel.oficial} vs ${c.nota}`);
    t(`${caso.nome}/${c.id}: "entre níveis" coerente`,
      !c.entreDegraus || (c.pontos === c.entreDegraus.degrau &&
        c.entreDegraus.para === Math.min(200, (c.entreDegraus.aplicado ? c.entreDegraus.degrau : c.entreDegraus.de) + 40)),
      JSON.stringify(c.entreDegraus));
    t(`${caso.nome}/${c.id}: descritor oficial citado`,
      typeof ex.nivel.exigeOficial === 'string' && ex.nivel.exigeOficial.length > 15);
  }
}

/* --- casos específicos que a explicação precisa pegar --- */

const problemas = corrigir(EXEMPLOS.find(e => e.id === 'problemas').texto, { temaId: 'enem-2025' });
const c2 = problemas.competencias.find(c => c.id === 'C2');
t('repertório ausente é explicado', c2.explicacao.motivos.some(m => /repert/i.test(m.titulo)));
const c5 = problemas.competencias.find(c => c.id === 'C5');
t('C5 explica os elementos que faltam', c5.explicacao.motivos.some(m => /elemento/i.test(m.titulo)));
t('C5 cita o exemplo de cada elemento que falta',
  c5.explicacao.motivos.some(m => (m.comoResolver || '').includes('meio/modo')));

const bom = corrigir(EXEMPLOS.find(e => e.id === 'boa').texto, { temaId: 'enem-2026' });
t('redação de alto desempenho chega a 1000', bom.notaTotal === 1000, String(bom.notaTotal));
t('nota máxima não inventa impedimento',
  bom.competencias.every(c => c.nota === 200 ? c.explicacao.motivos.every(m => m.gravidade === 'baixa') : true));
t('redação anulada explica o zero em cada competência',
  corrigir(REDACOES.find(r => r.id === 'futebol-fuga').paragrafos.map(p => p.texto).join('\n'),
    { temaId: 'enem-2026' }).competencias.every(c => c.explicacao.motivos.length > 0));

const fallback = corrigir(EXEMPLOS.find(e => e.id === 'problemas').texto, { temaId: 'livre', temaLivre: 'inclusão digital de idosos' });
t('tema livre também explica', fallback.competencias.every(c => !!c.explicacao));

console.log(`\n${ok}/${ok + falhas.length} verificações passaram`);
if (falhas.length) {
  console.log('\nfalhas:');
  falhas.slice(0, 25).forEach(f => console.log('  -', f));
  process.exit(1);
}
