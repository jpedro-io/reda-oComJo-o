import { corrigir } from '../js/engine/corrigir.js';
import { EXEMPLOS } from '../js/db/exemplos.js';

const casos = [
  ...EXEMPLOS.map(e => ({ nome: e.rotulo, texto: e.texto, temaId: e.temaId })),
  { nome: 'FUGA AO TEMA (fala de futebol, tema SUS)', temaId: 'enem-2026',
    texto: `O futebol brasileiro atravessa um momento de transformação. Os clubes investem em categorias de base, e os estádios recebem público recorde.
Em primeiro lugar, a formação de atletas exige estrutura. Segundo dados da CBF, os centros de treinamento aumentaram nos últimos anos, o que demonstra profissionalização.
Além disso, a transmissão por streaming ampliou a receita. Nesse contexto, os torcedores consomem mais conteúdo, embora os ingressos sigam caros.
Portanto, cabe à CBF ampliar os repasses aos clubes por meio de editais, a fim de fortalecer as categorias de base, visto que a base sustenta o espetáculo.` },
  { nome: 'TEXTO COM 5 LINHAS (nota zero)', temaId: 'enem-2026',
    texto: `A saúde pública é importante para todos. O SUS atende milhões de brasileiros e precisa de investimento.\nO governo deve melhorar o atendimento.` },
  { nome: 'TEMA LIVRE (inclusão digital de idosos)', temaId: 'livre',
    temaLivre: 'Desafios para a inclusão digital de idosos no Brasil',
    texto: `A inclusão digital de idosos se tornou um desafio central no Brasil. Segundo o IBGE, parte significativa da população acima de 60 anos não acessa a internet com regularidade, o que limita o acesso a serviços bancários e à saúde.
Em primeiro lugar, a falta de letramento digital aprofunda a exclusão. Como mostra a pesquisa TIC Domicílios, o custo dos aparelhos e a ausência de formação específica afastam os idosos das plataformas digitais, sobretudo os de menor renda.
Além disso, o desenho das interfaces ignora limitações cognitivas e visuais. Nesse sentido, aplicativos com letras pequenas e fluxos complexos ampliam a dependência de terceiros.
Portanto, cabe ao Ministério da Educação, em parceria com centros de convivência, oferecer oficinas de letramento digital para idosos por meio de monitores capacitados, a fim de ampliar a autonomia dessa população, visto que a cidadania contemporânea passa também pelo acesso à rede.` }
];

for (const c of casos) {
  const r = corrigir(c.texto, { temaId: c.temaId, temaLivre: c.temaLivre });
  console.log('\n==== ' + c.nome + ' ====');
  if (!r.ok) { console.log('ERRO:', r.erro); continue; }
  console.log('nota:', r.notaTotal, '|', r.faixa.nome, '| zerada:', r.zerada, '| linhas:', r.metricas.linhas, '| palavras:', r.metricas.palavras, '| conf:', r.confianca);
  console.log('comps:', r.competencias.map(x => x.id + '=' + x.nota + '(degrau ' + x.nivel + '/10)').join(' '));
  if (r.zerada) r.motivosZero.forEach(m => console.log('  ZERO:', m.titulo));
  r.alertas.forEach(a => console.log('  ALERTA:', a.titulo));
  r.competencias.forEach(c2 => c2.melhorias.slice(0, 2).forEach(f => console.log('   ' + c2.id + ' ! ' + f)));
}
