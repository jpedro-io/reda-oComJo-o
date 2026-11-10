/**
 * COMO LER O COMANDO DO TEMA
 * ------------------------------------------------------------
 * O primeiro substantivo do tema diz o que a banca quer. Quem
 * responde ao comando ganha tempo e evita tangenciamento.
 */

export const REGRA_GERAL = [
  'O comando do tema é o substantivo que abre a frase: valorização, importância, desafios, caminhos, perspectivas, estigma, invisibilidade, democratização, manipulação, garantia, questão.',
  'Todo tema do Enem é uma questão-problema: existe algo errado a ser enfrentado. Mesmo “valorização” e “importância” pressupõem uma falta — e é essa falta que você precisa nomear.',
  'A proposta de intervenção deve responder ao comando: se o tema pede “caminhos”, a intervenção é o coração do texto; se pede “valorização”, a proposta precisa atacar o mecanismo que desvaloriza.',
  'Repita o núcleo do tema (as palavras da proposta) na introdução e na conclusão. Isso sinaliza ao avaliador que você leu o recorte, e não o assunto genérico.'
];

export const COMANDOS = [
  {
    id: 'valorizacao',
    palavra: 'Valorização / valorizar',
    temas: ['2024 — herança africana', '2023 — trabalho de cuidado', '2026 — SUS', '2019 — acesso ao cinema (democratização)'],
    oQuePede: 'Mostrar que algo tem valor e não é reconhecido como deveria. O texto precisa nomear o mecanismo da desvalorização — não basta elogiar o objeto.',
    armadilha: 'Texto panfletário ou expositivo: “a cultura africana é muito importante para o Brasil” e nada além disso. Sem problema, não há argumento.',
    comoFazer: [
      'Abra contrastando o reconhecimento formal (lei, artigo, dado) com a prática social.',
      'Nomeie as causas da desvalorização: preconceito, ausência de política pública, invisibilidade estatística, precarização.',
      'Na proposta, ataque esse mecanismo — “conscientizar” sozinho não responde a “valorização”.'
    ]
  },
  {
    id: 'importancia',
    palavra: 'Importância / relevância',
    temas: ['2010 — trabalho e dignidade', 'temas de treino sobre saúde mental e leitura'],
    oQuePede: 'Justificar por que algo importa — mas por meio de um problema: provavelmente porque está sendo negligenciado.',
    armadilha: 'O maior risco de todos: texto expositivo, que apenas explica a importância e nunca defende um ponto de vista.',
    comoFazer: [
      'Transforme a importância em problema: “é importante e, justamente por isso, sua ausência produz...”',
      'Traga consequências concretas da falta (dado, exemplo, caso).',
      'A conclusão deve propor como garantir o que se mostrou importante.'
    ]
  },
  {
    id: 'desafios',
    palavra: 'Desafios para...',
    temas: ['2024', '2023', '2022', '2021', '2020', '2017', '2015'],
    oQuePede: 'Identificar obstáculos concretos. A banca quer ver quais são as barreiras e por que elas persistem.',
    armadilha: 'Listar problemas sem explicar nenhum, ou propor solução sem ter nomeado o obstáculo correspondente.',
    comoFazer: [
      'Escolha dois obstáculos diferentes (um estrutural, um cultural) e desenvolva cada um em um parágrafo.',
      'Explique por que o obstáculo persiste: falta de fiscalização, de verba, de informação, de representação.',
      'A proposta deve remover exatamente esses obstáculos — não outros.'
    ]
  },
  {
    id: 'caminhos',
    palavra: 'Caminhos para...',
    temas: ['2016 — intolerância religiosa', 'temas de treino sobre leitura, mobilidade e desinformação'],
    oQuePede: 'O foco está nas soluções. O texto argumenta, mas o peso maior recai sobre a proposta.',
    armadilha: 'Discutir o problema por cinco parágrafos e entregar uma proposta de uma linha.',
    comoFazer: [
      'Mesmo com foco em solução, apresente o diagnóstico: sem causa, o caminho parece arbitrário.',
      'Reserve espaço real para a intervenção — ela é o “caminho” que o tema pede.',
      'Detalhe a viabilidade: quem executa, com que recurso, em que prazo.'
    ]
  },
  {
    id: 'perspectivas',
    palavra: 'Perspectivas acerca de...',
    temas: ['2025 — envelhecimento'],
    oQuePede: 'Mais de um olhar sobre o mesmo fenômeno: dimensão social, econômica, cultural, afetiva.',
    armadilha: 'Ficar em um único ângulo (só a previdência, por exemplo) e não explorar a multiplicidade que o comando sugere.',
    comoFazer: [
      'Organize os dois desenvolvimentos como dois olhares distintos sobre o mesmo fato.',
      'Mostre que as dimensões se cruzam: o econômico produz exclusão, o cultural naturaliza o abandono.',
      'Na conclusão, a proposta deve integrar as dimensões apresentadas.'
    ]
  },
  {
    id: 'estigma',
    palavra: 'Estigma associado a...',
    temas: ['2020 — doenças mentais'],
    oQuePede: 'O julgamento social que recai sobre o grupo ou a condição — não a condição em si.',
    armadilha: 'Explicar a doença ou o fenômeno em vez do estigma; o recorte é o preconceito, não o diagnóstico.',
    comoFazer: [
      'Defina o estigma: rótulo, silenciamento, afastamento, culpabilização.',
      'Mostre os efeitos: quem é estigmatizado esconde o problema e não busca ajuda.',
      'Proposta: informação qualificada e serviços de acolhimento, não apenas “campanhas”.'
    ]
  },
  {
    id: 'invisibilidade',
    palavra: 'Invisibilidade',
    temas: ['2023 — trabalho de cuidado', '2021 — registro civil'],
    oQuePede: 'Aquilo que existe, produz efeitos e não é visto — nem estatisticamente, nem juridicamente, nem socialmente.',
    armadilha: 'Dizer que “as pessoas não dão atenção” sem mostrar o mecanismo dessa invisibilidade.',
    comoFazer: [
      'Comece pelo dado que a torna visível: número de pessoas sem registro, horas de trabalho não remunerado.',
      'Explique o que a invisibilidade produz: ausência de política, de direito, de remuneração.',
      'Proposta: tornar visível (estatística, cadastro, política nominal) e reparar.'
    ]
  },
  {
    id: 'democratizacao',
    palavra: 'Democratização do acesso',
    temas: ['2019 — cinema'],
    oQuePede: 'Ampliar o acesso a um bem cultural ou serviço que hoje é privilégio de poucos.',
    armadilha: 'Falar do valor do bem cultural (o cinema é arte) e nunca da barreira de acesso.',
    comoFazer: [
      'Nomeie as barreiras: preço, território, oferta, informação, acessibilidade.',
      'Use dado de distribuição — quantas cidades não têm sala, quem consome cultura.',
      'Proposta deve reduzir barreira específica: transporte, ingresso, editais, cineclubes.'
    ]
  },
  {
    id: 'manipulacao',
    palavra: 'Manipulação / controle',
    temas: ['2018 — dados na internet'],
    oQuePede: 'Uma relação de poder: alguém usa algo para conduzir o comportamento de outro.',
    armadilha: 'Ficar no “uso excessivo da internet”, que é outro assunto. O recorte é o controle pelo uso de dados.',
    comoFazer: [
      'Explique o modelo de negócio: dados viram previsão e previsão vira condução.',
      'Mostre o efeito público: bolhas, desinformação, fragilidade do debate democrático.',
      'Proposta: transparência algorítmica, proteção de dados, educação digital.'
    ]
  },
  {
    id: 'direito',
    palavra: 'Como direito universal / garantia de acesso',
    temas: ['2026 — SUS', '2021 — registro civil'],
    oQuePede: 'Discutir a distância entre o direito previsto e o direito efetivo.',
    armadilha: 'Gastar o texto provando que o direito existe — isso a proposta já disse. O problema é a efetivação.',
    comoFazer: [
      'Abra com a previsão legal e vire rapidamente para a falha de efetivação.',
      'Explique o que impede o acesso: financiamento, território, burocracia, desigualdade.',
      'Proposta: medidas que convertam o direito formal em acesso concreto.'
    ]
  },
  {
    id: 'questao',
    palavra: 'X em questão',
    temas: ['2014 — publicidade infantil'],
    oQuePede: 'Um tema controverso, com disputa de interesses. O texto precisa se posicionar nessa disputa.',
    armadilha: 'Descrever os dois lados e não defender nenhum — sem ponto de vista, C3 cai.',
    comoFazer: [
      'Apresente o conflito: de um lado o interesse comercial, de outro a proteção integral.',
      'Assuma posição explícita já na tese.',
      'Proposta: regulação, autorregulação ou educação — escolha e justifique.'
    ]
  }
];

/** Descobre o comando a partir do título de um tema. */
export function comandoDoTema(titulo = '') {
  const t = titulo.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  if (t.includes('valoriza')) return COMANDOS.find(c => c.id === 'valorizacao');
  if (t.includes('importancia') || t.includes('relevancia')) return COMANDOS.find(c => c.id === 'importancia');
  if (t.includes('desafio')) return COMANDOS.find(c => c.id === 'desafios');
  if (t.includes('caminho')) return COMANDOS.find(c => c.id === 'caminhos');
  if (t.includes('perspectiva')) return COMANDOS.find(c => c.id === 'perspectivas');
  if (t.includes('estigma')) return COMANDOS.find(c => c.id === 'estigma');
  if (t.includes('invisibilidade')) return COMANDOS.find(c => c.id === 'invisibilidade');
  if (t.includes('democratiza')) return COMANDOS.find(c => c.id === 'democratizacao');
  if (t.includes('manipula') || t.includes('controle de dados')) return COMANDOS.find(c => c.id === 'manipulacao');
  if (t.includes('direito universal') || t.includes('garantia de acesso')) return COMANDOS.find(c => c.id === 'direito');
  if (t.includes('em questao')) return COMANDOS.find(c => c.id === 'questao');
  return null;
}
