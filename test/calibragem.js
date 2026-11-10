/* Calibragem: texto fraco não tira nota alta.
   Cada ensaio abaixo é um tipo de redação que aparece de verdade na correção —
   e nenhum deles merece nota de "bom" ou "excelente". As faixas são teto, não
   meta: o teste falha se o motor voltar a ser generoso. */

import { corrigir } from '../js/engine/corrigir.js';

const ensaios = {
  'mediana-comum': {
    teto: 400,
    texto: `A saúde é um direito de todos e dever do Estado, como diz a Constituição. Porém, na prática, muitas pessoas não conseguem atendimento de qualidade no SUS.
Em primeiro lugar, a falta de médicos é um problema sério. Muitas cidades pequenas não tem hospital e as pessoas precisam viajar para conseguir atendimento, o que é muito ruim.
Outro ponto importante é a demora nas filas. As pessoas esperam meses para fazer uma consulta com especialista e muitas vezes desistem do tratamento.
Portanto, o governo deve investir mais na saúde, contratando médicos e melhorando os hospitais, para que a população tenha um atendimento melhor e mais rápido.`
  },

  'colada-nos-motivadores': {
    teto: 400,
    texto: `A Constituição Federal de 1988 diz que a saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas que visem à redução do risco de doença e de outros agravos. O Sistema Único de Saúde rege-se pelos princípios de universalidade de acesso e integralidade da assistência.
O texto motivador também afirma que o acesso deve ser universal e igualitário às ações e serviços para sua promoção, proteção e recuperação. Isso mostra que a saúde é importante para todos os brasileiros.
Além disso, a lei 8.080 diz que a iniciativa privada poderá participar do sistema em caráter complementar. Assim, é preciso que todos tenham acesso.
Portanto, o governo deve cumprir a Constituição e garantir o acesso universal por meio de políticas públicas, a fim de que todos tenham saúde.`
  },

  'bem-escrita-sem-repertorio': {
    teto: 560,
    texto: `O acesso à saúde pública no Brasil enfrenta um paradoxo: o direito é universal na lei e desigual na prática. Enquanto centros urbanos concentram equipamentos e especialistas, municípios distantes dependem de deslocamentos longos para atendimento básico.
Em primeiro lugar, a distribuição de profissionais reproduz a desigualdade regional. A fixação de médicos em áreas remotas esbarra em salários, infraestrutura e perspectivas de carreira, o que esvazia equipes e sobrecarrega as que permanecem.
Além disso, o subfinanciamento crônico comprime a oferta de serviços. Quando o orçamento não acompanha o envelhecimento populacional, o resultado aparece na fila por consultas e exames, sobretudo nas especialidades.
Portanto, é necessário ampliar o investimento e criar incentivos para fixar equipes no interior, de modo que o direito previsto na lei se converta em atendimento real.`
  },

  'proposta-vaga': {
    teto: 400,
    texto: `A saúde pública brasileira precisa de atenção. As pessoas ficam doentes e não conseguem atendimento, o que é um problema grave no país.
Por um lado, faltam médicos. Por outro lado, faltam remédios e exames. Nesse contexto, a população sofre com a espera e com a falta de estrutura nos hospitais.
Diante disso, é preciso que as pessoas se conscientizem e que o poder público faça sua parte, porque a saúde é um direito de todos e deve ser garantida.
Portanto, alguém precisa tomar providências para melhorar a situação da saúde no Brasil, pois a população precisa de atendimento digno e de qualidade.`
  },

  'repeticao-de-palavras': {
    teto: 320,
    espelho: { C4: 120 },
    texto: `A saúde é um problema muito grave no Brasil e o problema da saúde afeta muitas pessoas. Muitas pessoas não têm acesso e o problema fica ainda maior quando as pessoas ficam doentes.
O problema da falta de médicos é um problema sério, porque muitas pessoas precisam de atendimento e não conseguem. As pessoas ficam na fila e o problema continua.
Outro problema muito grave é a falta de remédios. As pessoas precisam de remédios e o problema das pessoas é muito grande, porque muitas pessoas não têm dinheiro.
Portanto, o problema da saúde é muito grave e precisa de uma solução, porque muitas pessoas sofrem com esse problema todos os dias.`
  },

  'frases-repetidas': {
    teto: 340,
    espelho: { C3: 120, C4: 120 },
    texto: `A saúde pública no Brasil é um direito de todos e dever do Estado. Muitas pessoas não conseguem atendimento de qualidade nos hospitais públicos do país.
Em primeiro lugar, a falta de médicos é um problema sério nas cidades pequenas. Muitas pessoas não conseguem atendimento de qualidade nos hospitais públicos do país.
Além disso, as filas são longas e a espera por uma consulta demora meses. Muitas pessoas não conseguem atendimento de qualidade nos hospitais públicos do país.
Portanto, o governo deve contratar mais médicos e investir nos hospitais, a fim de melhorar o atendimento à população brasileira.`
  },

  'sem-pontuacao': {
    teto: 320,
    espelho: { C1: 80 },
    texto: `A saúde pública no Brasil é um direito de todos e dever do Estado mas na prática muitas pessoas não conseguem atendimento de qualidade nos hospitais públicos do país porque faltam médicos e faltam remédios e as filas são muito longas e as pessoas esperam meses por uma consulta com especialista e muitas desistem do tratamento
Em primeiro lugar a falta de médicos é um problema sério nas cidades pequenas porque os profissionais não querem ir para o interior e a população fica sem atendimento e precisa viajar para conseguir uma consulta
Além disso faltam remédios e exames nos postos de saúde e as pessoas precisam comprar os remédios com o próprio dinheiro e isso é ruim para quem ganha pouco
Portanto o governo deve investir mais na saúde e contratar mais médicos e melhorar os hospitais para que a população tenha um atendimento melhor e mais rápido`
  },

  'texto-corrido-sem-final': {
    teto: 320,
    espelho: { C1: 80 },
    texto: `A saúde é um direito de todos e dever do Estado como diz a Constituição Federal de 1988 e na prática isso não acontece porque muitas pessoas não conseguem atendimento e ficam dias esperando por uma consulta nos hospitais públicos do Brasil.
Em primeiro lugar a falta de médicos é um problema sério porque as cidades pequenas não têm hospital e as pessoas precisam viajar para conseguir atendimento o que é ruim para todos.
Além disso a demora nas filas faz com que muitas pessoas desistam do tratamento e fiquem doentes por mais tempo o que aumenta o custo para o sistema de saúde
Portanto o governo deve investir mais na saúde contratando médicos e melhorando os hospitais para que a população tenha um atendimento melhor e mais rápido`
  },

  'com-erros-de-portugues': {
    teto: 400,
    texto: `A saude publica no Brasil é um assunto muito importante para todos nos. Muitas pessoa não tem acesso a um atendimento decente e isso é um problema que vem desde muito tempo.
Primeiramente, os hospitais estão sempre lotados e não a recursos para atender todo mundo. As pessoa esperam horas na fila e muitas vezes vãoembora sem ser atendida.
Outro fator é a falta de medico nas cidades pequenas. Os profissionais não querem ir pra lá porque ganham pouco, e a população fica sem opção de atendimento.
Então, o governo tem que investir mais e contratar mais médicos para melhorar a saúde do povo brasileiro, porque sem saúde não a vida digna.`
  }
};

/* O outro lado da régua: um texto com repertório explicado, quatro parágrafos e
   proposta completa tem de conseguir nota alta. O motor pune o texto fraco,
   não o bom — se este caso cair abaixo de 720, a régua endureceu demais. */
const solido = `O Sistema Único de Saúde é apresentado pela Constituição de 1988 como direito de todos e dever do Estado, mas a distância entre o texto legal e o cotidiano dos serviços segue aberta. Discutir a valorização do SUS é reconhecer que a saúde pública não é favor, é obrigação.
Em primeiro lugar, o subfinanciamento compromete a integralidade do atendimento. Como demonstra o Conselho Nacional de Saúde, o gasto público per capita brasileiro é inferior ao de países com renda semelhante, o que empurra parte da população para planos privados e deixa aos mais pobres a fila da atenção básica.
Além disso, a formação de profissionais concentra-se nas capitais. Segundo o IBGE, a razão de médicos por habitante nas regiões Norte e Nordeste é menos da metade da verificada no Sudeste, o que reproduz a desigualdade regional dentro do próprio sistema que deveria corrigi-la.
Portanto, o Ministério da Saúde deve ampliar o financiamento federal e criar incentivos de fixação para equipes de saúde da família nas áreas remotas, por meio de bolsas de residência e planos de carreira vinculados ao território, a fim de que a universalidade prevista na lei chegue a quem depende exclusivamente do SUS para viver, já que a saúde é a condição primeira da cidadania.`;

let ok = 0;
const falhas = [];

function t(nome, cond, detalhe = '') {
  if (cond) { ok++; return; }
  falhas.push(`${nome} — ${detalhe}`);
}

console.log('\n=== Calibragem: nota contra o tipo de texto ===\n');

for (const [nome, { texto, teto, espelho }] of Object.entries(ensaios)) {
  const r = corrigir(texto, { temaId: 'enem-2026' });
  const comps = r.competencias.map(c => `${c.id}=${c.nota}`).join(' ');
  console.log(`${nome.padEnd(26)} ${String(r.notaTotal).padStart(4)} de 1000 · ${r.faixa.nome.padEnd(13)} ${String(r.metricas.palavras).padStart(3)} palavras | ${comps}`);

  t(`${nome}: total dentro do teto`, r.notaTotal <= teto, `${r.notaTotal} > ${teto}`);
  t(`${nome}: cada competência é uma das seis notas oficiais`,
    r.competencias.every(c => c.nota % 40 === 0), r.competencias.map(c => c.nota).join(' · '));
  t(`${nome}: ninguém publica nota exata — toda competência tem faixa`,
    r.competencias.every(c => c.faixaNota && c.faixaNota.min === c.nota && c.faixaNota.max >= c.nota),
    r.competencias.map(c => `${c.id}:${c.faixaNota?.min}-${c.faixaNota?.max}`).join(' '));
  t(`${nome}: faixa de competência abre no máximo um nível (40)`,
    r.competencias.every(c => c.faixaNota.max - c.faixaNota.min <= 40),
    r.competencias.filter(c => c.faixaNota.max - c.faixaNota.min > 40).map(c => c.id).join(' · ') || '—');
  t(`${nome}: nenhuma competência em 200`, r.competencias.every(c => c.nota < 200),
    r.competencias.filter(c => c.nota === 200).map(c => c.id).join(' · ') || '—');
  t(`${nome}: total é a soma das competências`,
    r.competencias.reduce((s, c) => s + c.nota, 0) === r.notaTotal,
    `${r.notaTotal} ≠ soma`);
  for (const [id, tetoComp] of Object.entries(espelho || {})) {
    const comp = r.competencias.find(c => c.id === id);
    t(`${nome}: ${id} ≤ ${tetoComp}`, comp.nota <= tetoComp, `${comp.nota}`);
  }
}

const rSolido = corrigir(solido, { temaId: 'enem-2026' });
console.log(`\n${'texto sólido (referência)'.padEnd(26)} ${String(rSolido.notaTotal).padStart(4)} de 1000 · ${rSolido.faixa.nome.padEnd(13)} ${String(rSolido.metricas.palavras).padStart(3)} palavras | ${rSolido.competencias.map(c => `${c.id}=${c.nota}`).join(' ')}`);
t('texto sólido fica entre 720 e 880', rSolido.notaTotal >= 720 && rSolido.notaTotal <= 880, String(rSolido.notaTotal));
t('texto sólido: a nota final é publicada como faixa',
  rSolido.notaFaixa.max >= rSolido.notaFaixa.min && rSolido.notaFaixa.max - rSolido.notaFaixa.min <= 100,
  JSON.stringify(rSolido.notaFaixa));
t('texto sólido: ao menos uma competência abre faixa de 40 (mostra o nível seguinte)',
  rSolido.competencias.some(c => c.faixaNota.max - c.faixaNota.min === 40) ||
  rSolido.notaTotal === 1000,
  rSolido.competencias.map(c => `${c.id}:${c.faixaNota.min}-${c.faixaNota.max}`).join(' '));
t('texto sólido: toda nota publicada é oficial',
  rSolido.competencias.every(c => c.nota % 40 === 0),
  rSolido.competencias.map(c => c.id + ':' + c.nota).join(' '));
t('texto sólido não zera nenhuma competência', rSolido.competencias.every(c => c.nota >= 120),
  rSolido.competencias.map(c => c.nota).join(' · '));

console.log(`\n${ok}/${ok + falhas.length} verificações passaram`);
if (falhas.length) {
  console.log('\nFALHAS:');
  falhas.forEach(f => console.log('  - ' + f));
  process.exit(1);
}
