import { corrigir } from '../js/engine/corrigir.js';
import { REDACOES } from '../js/db/redacoes.js';

let falhas = 0;
for (const r of REDACOES) {
  const texto = r.paragrafos.map(p => p.texto).join('\n');
  const res = corrigir(texto, { temaId: r.temaId });
  const comps = res.competencias.map(c => c.id + '=' + c.nota).join(' ');
  const okMil = r.nota === 0 ? res.notaTotal === 0 : res.notaTotal >= 880;
  if (!okMil) falhas++;
  console.log(`${okMil ? 'OK  ' : 'VER '} ${r.ano} ${r.id.padEnd(14)} esperado=${String(r.nota).padEnd(4)} motor=${String(res.notaTotal).padEnd(4)} | ${comps}`);
  if (!okMil) {
    res.competencias.forEach(c => c.melhorias.forEach(m => console.log(`        ${c.id} ! ${m}`)));
  }
}
console.log(falhas === 0 ? '\nTodas as redações nota 1000 ficaram na faixa alta.' : `\n${falhas} caso(s) a revisar.`);
