import { corrigir } from '../js/engine/corrigir.js';
import { EXEMPLOS } from '../js/db/exemplos.js';

for (const ex of EXEMPLOS) {
  const r = corrigir(ex.texto, { temaId: ex.temaId });
  console.log('\n==== ' + ex.rotulo + ' (' + ex.temaId + ') ====');
  console.log('nota:', r.notaTotal, '|', r.faixa.nome, '| zerada:', r.zerada, '| confianca:', r.confianca);
  console.log('metricas:', JSON.stringify(r.metricas));
  r.competencias.forEach(c => {
    console.log(` ${c.id} ${c.nota}/200 nv${c.nivel} | sinais: ${JSON.stringify(c.sinais)}`);
    c.fortes.forEach(f => console.log('   + ' + f));
    c.melhorias.forEach(f => console.log('   ! ' + f));
  });
  if (r.alertas.length) r.alertas.forEach(a => console.log(' ALERTA[' + a.tipo + '] ' + a.titulo));
  r.prioridades.forEach((p,i) => console.log(` PRIO${i+1}: ${p.titulo} -> ${p.dica}`));
}
