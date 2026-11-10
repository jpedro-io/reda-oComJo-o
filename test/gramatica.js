/**
 * Teste das regras de contexto da Competência I: crase, concordância verbal,
 * concordância nominal e pontuação.
 *
 * Duas exigências, nesta ordem:
 *  1. nenhuma das redações nota 1000 pode ser acusada (falso positivo em texto
 *     bom é pior do que não ter a regra);
 *  2. cada defeito plantado tem de ser encontrado, com a regra certa.
 *
 * node test/gramatica.js
 */
import { REGRAS_CONTEXTO, DESVIOS_CONSTRUCAO } from '../js/db/lexico.js';
import { REDACOES } from '../js/db/redacoes.js';

let falhas = 0;
const ok = (cond, msg) => { if (!cond) { falhas++; console.log('  ✗ ' + msg); } };

/* 1. silêncio nas redações de referência */
let acusacoes = 0;
for (const r of REDACOES) {
  const t = r.paragrafos.join(' ').toLowerCase();
  for (const regra of REGRAS_CONTEXTO) {
    const ms = t.match(regra.re);
    if (ms && ms.length) {
      acusacoes++;
      console.log(`  ✗ ${regra.id} acusou a redação ${r.id}: ${JSON.stringify(ms.slice(0, 2))}`);
    }
  }
}
ok(acusacoes === 0, `${acusacoes} falsos positivos nas ${REDACOES.length} redações`);
console.log(`redações de referência: ${REDACOES.length} · acusações: ${acusacoes}`);

/* 2. defeitos plantados */
const casos = [
  ['crase', 'O governo deve investir à partir de 2024.'],
  ['crase', 'Isso leva à uma situação de risco.'],
  ['crase', 'Devido a falta de médicos, a saúde piora.'],
  ['crase', 'O texto se refere a aquela questão.'],
  ['crase', 'Vamos à ser cobrados por isso.'],
  ['crase', 'Ele chegou à todos os lugares.'],
  ['crase', 'O país melhorou a nível de educação.'],
  ['concordância verbal', 'Os jovens precisa de mais oportunidades.'],
  ['concordância verbal', 'As pessoas que não tem acesso sofrem.'],
  ['concordância verbal', 'Houveram muitos problemas na região.'],
  ['concordância verbal', 'Fazem dez anos que o programa existe.'],
  ['concordância verbal', 'Existe pessoas que ignoram o problema.'],
  ['concordância verbal', 'Falta recursos para a saúde.'],
  ['concordância verbal', 'Se tratam de questões estruturais.'],
  ['concordância nominal', 'Os mesmo direitos não são garantidos.'],
  ['concordância nominal', 'As políticas pública falharam.'],
  ['concordância nominal', 'Isso ocorre duas vez por semana.'],
  ['concordância nominal', 'Ela estava meia cansada.'],
  ['pontuação', 'A sociedade, é responsável.'],
];
let pegos = 0;
for (const [tipo, frase] of casos) {
  const t = frase.toLowerCase();
  const regras = REGRAS_CONTEXTO.filter(r => { const m = t.match(r.re); return m && m.length; });
  const tipoCerto = regras.some(r => r.tipo === tipo);
  if (regras.length) pegos++;
  ok(tipoCerto, `não classificou como ${tipo}: “${frase}” → ${regras.map(r => r.tipo + '/' + r.id).join(', ') || 'nada'}`);
}
console.log(`defeitos plantados: ${casos.length} · encontrados: ${pegos}`);

/* 3. textos corretos que NÃO podem ser acusados */
const corretos = [
  'A educação, que é direito de todos, falha no Brasil.',
  'O texto trata da questão do lixo, que é um problema urbano.',
  'Devido à falta de médicos, a saúde piora.',
  'Os jovens precisam de mais oportunidades.',
  'A maioria dos jovens precisa de oportunidades.',
  'O governo deve investir a partir de 2024.',
  'As políticas públicas falharam em diversos municípios.',
  'A Constituição de 1988 determina que a saúde é direito de todos.',
];
let injustos = 0;
for (const frase of corretos) {
  const t = frase.toLowerCase();
  const regras = REGRAS_CONTEXTO.filter(r => { const m = t.match(r.re); return m && m.length; });
  const fixas = DESVIOS_CONSTRUCAO.filter(d => t.includes(d.padrao));
  if (regras.length || fixas.length) {
    injustos++;
    console.log(`  ✗ acusou texto correto: “${frase}” → ${[...regras.map(r => r.id), ...fixas.map(d => d.padrao)].join(', ')}`);
  }
}
ok(injustos === 0, `${injustos} textos corretos acusados`);
console.log(`textos corretos: ${corretos.length} · acusados: ${injustos}`);

console.log(falhas ? `\n${falhas} FALHA(S)` : '\nTUDO CERTO');
process.exit(falhas ? 1 : 0);
