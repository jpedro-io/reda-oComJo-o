/**
 * Verifica o mapa de acentos de exibição.
 * Regra: cada valor, ao ser normalizado (minúsculas, sem acento), tem de voltar
 * à chave. Garante que nenhum acento errado entre na interface.
 */
import { ACENTOS, termoBonito } from '../js/db/acentos.js';
import { TEMAS } from '../js/db/temas.js';

const norm = (s) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

let ok = 0, falhas = [];
for (const [chave, valor] of Object.entries(ACENTOS)) {
  if (norm(valor) === chave) ok++;
  else falhas.push(`${chave} -> ${valor} (normaliza para ${norm(valor)})`);
}

// nenhum termo do banco pode sair com acento inventado
for (const t of TEMAS) {
  for (const termo of [...(t.nucleo || []), ...(t.apoio || [])]) {
    const bonito = termoBonito(termo);
    if (norm(bonito) !== norm(termo)) falhas.push(`termo "${termo}" virou "${bonito}"`);
    else ok++;
  }
}

// amostras esperadas
const amostras = [
  ['saude publica', 'Saúde pública'],
  ['sus', 'SUS'],
  ['atencao basica', 'Atenção básica'],
  ['pessoas com deficiencia', 'Pessoas com deficiência'],
  ['matriz energetica', 'Matriz energética'],
  ['lei maria da penha', 'Lei Maria da Penha']
];
for (const [entrada, esperado] of amostras) {
  const saida = termoBonito(entrada);
  if (saida === esperado) ok++;
  else falhas.push(`amostra "${entrada}": esperado "${esperado}", veio "${saida}"`);
}

console.log(`${ok} verificações passaram`);
if (falhas.length) {
  console.log(`\n${falhas.length} falha(s):`);
  falhas.slice(0, 20).forEach(f => console.log('  !', f));
  process.exit(1);
}
