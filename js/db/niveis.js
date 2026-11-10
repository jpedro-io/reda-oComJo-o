/**
 * ESCALA INTERNA DE DIAGNÓSTICO — 11 degraus por competência (0 a 200, de 20 em 20).
 *
 * ATENÇÃO: nada aqui é publicado. A nota que o estudante lê é sempre uma das
 * seis da grade oficial (0, 40, 80, 120, 160, 200) e vem acompanhada de uma
 * FAIXA — porque a nota do Enem é a média de dois avaliadores que divergem.
 *
 * Esta escala serve apenas ao motor, para medir com mais resolução o que o
 * texto entrega. Ela mantém os seis pontos oficiais nas posições pares:
 *
 *   degrau   0   1   2   3   4   5   6   7   8   9  10
 *   pontos   0  20  40  60  80 100 120 140 160 180 200
 *   oficial  0   –   1   –   2   –   3   –   4   –   5
 *
 * O degrau ímpar é leitura interna: significa "cumpre o nível de baixo e já
 * mostra parte do descritor do nível seguinte". Ao publicar, `oficializar()`
 * (js/engine/texto.js) converte o degrau ímpar na nota oficial de baixo e ABRE
 * a faixa em 40 pontos — é assim que o texto que já mostra o nível seguinte
 * aparece no relatório: "nota entre 160 e 200".
 *
 * A régua oficial continua sendo a régua-mãe: o texto só sobe de nível quando
 * cumpre integralmente o descritor daquele nível (ver PRINCIPIO em
 * js/db/cartilhas.js).
 */

/** Os 11 pontos possíveis, do menor ao maior. */
export const PONTOS = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

/** Converte nota (0–200) no índice do degrau (0–10). */
export function nivelDe(nota) {
  const v = Math.max(0, Math.min(200, Number(nota) || 0));
  return Math.round(v / 20);
}

/** Converte o índice do degrau na pontuação. */
export function pontosDe(n) {
  const i = Math.max(0, Math.min(10, Math.round(Number(n) || 0)));
  return i * 20;
}

/** Nível oficial correspondente (0–5) — os degraus pares da escala da cartilha. */
export function nivelOficial(nota) {
  return Math.floor(nivelDe(nota) / 2);
}

/** Próximo degrau a partir de uma nota (ou null se já está em 200). */
export function proximoDegrau(nota) {
  const n = nivelDe(nota);
  return n >= 10 ? null : { n: n + 1, pontos: pontosDe(n + 1) };
}

/**
 * Descritores dos 11 degraus, por competência.
 * `curto` aparece na régua; `texto` é o descritor completo.
 */
export const NIVEIS = {
  C1: {
    nome: 'Domínio da norma culta',
    avalia: 'A estrutura das frases e a quantidade de desvios gramaticais, ortográficos e de pontuação. A grade manda olhar a recorrência: o mesmo erro repetido pesa mais que o erro isolado.',
    niveis: [
      { n: 0, pontos: 0, curto: 'ininteligível', texto: 'Fuga total às regras da língua portuguesa: o texto é ininteligível.' },
      { n: 1, pontos: 20, curto: 'estrutura inexistente', texto: 'Estrutura sintática praticamente inexistente; a leitura é quase impossível devido à gravidade dos erros.' },
      { n: 2, pontos: 40, curto: 'erros graves e constantes', texto: 'Desvios gramaticais e falhas estruturais muito graves e constantes em todo o texto, prejudicando bastante a compreensão.' },
      { n: 3, pontos: 60, curto: 'leitura travada', texto: 'A leitura começa a fluir um pouco, mas os erros ainda travam o entendimento em várias partes.' },
      { n: 4, pontos: 80, curto: 'estrutura precária', texto: 'Estrutura sintática ainda precária, com presença frequente de erros de ortografia, pontuação ou concordância.' },
      { n: 5, pontos: 100, curto: 'domínio irregular', texto: 'Texto de qualidade regular, não é péssimo, mas demonstra falta de domínio de regras básicas de forma repetida ao longo da leitura.' },
      { n: 6, pontos: 120, curto: 'adequada, com desvios', texto: 'A estrutura das frases já é adequada, mas o corretor encontra vários desvios de gramática que não chegam a ser graves.' },
      { n: 7, pontos: 140, curto: 'três a cinco desvios leves', texto: 'Boa estrutura sintática, com cerca de três a cinco desvios leves, a transição em que punir com 120 seria pesado demais.' },
      { n: 8, pontos: 160, curto: 'dois desvios e uma falha', texto: 'Estrutura sintática muito boa: admite no máximo dois desvios gramaticais e apenas uma falha de construção nas frases.' },
      { n: 9, pontos: 180, curto: 'quase perfeito', texto: 'Próximo da perfeição: apenas um ou dois desvios muito leves, sem absolutamente nenhuma falha na estrutura das frases.' },
      { n: 10, pontos: 200, curto: 'excelente', texto: 'Domínio excelente, com no máximo desvios excepcionais e muito pontuais, que não comprometem o texto em nada.' }
    ]
  },

  C2: {
    nome: 'Tema, estrutura e repertório',
    avalia: 'A compreensão do tema, a estrutura do texto dissertativo e o uso de conhecimento de fora para enriquecer a discussão.',
    niveis: [
      { n: 0, pontos: 0, curto: 'fuga ao tema', texto: 'Fuga completa ao tema proposto ou cópia integral dos textos motivadores.' },
      { n: 1, pontos: 20, curto: 'tangenciamento', texto: 'Tangencia o tema superficialmente e mistura tipos de texto diferentes, sem manter o caráter dissertativo.' },
      { n: 2, pontos: 40, curto: 'abordagem parcial', texto: 'Abordagem apenas parcial do tema, mas com estrutura básica dissertativa, geralmente com muitos trechos copiados da prova.' },
      { n: 3, pontos: 60, curto: 'tema completo, formato frágil', texto: 'Aborda o tema de forma completa, mas domina mal o formato do texto ou baseia a argumentação quase inteiramente em paráfrases dos textos de apoio.' },
      { n: 4, pontos: 80, curto: 'sem repertório próprio', texto: 'Abordagem completa e texto com formato correto, mas apoiado fortemente nos textos motivadores, sem nenhum repertório sociocultural próprio.' },
      { n: 5, pontos: 100, curto: 'repertório solto', texto: 'O texto tenta trazer um repertório externo, mas a referência é solta e não faz sentido com a discussão proposta.' },
      { n: 6, pontos: 120, curto: 'repertório sem relação', texto: 'Traz um repertório de fora válido, mas sem relação direta com o assunto discutido: serve apenas para preencher espaço.' },
      { n: 7, pontos: 140, curto: 'repertório improdutivo', texto: 'O repertório é válido e tem a ver com o tema, mas não é usado de forma produtiva para ajudar no avanço da argumentação.' },
      { n: 8, pontos: 160, curto: 'estrutura com falhas', texto: 'O repertório é legitimado, ligado ao tema e usado de forma produtiva, mas a estrutura do texto apresenta falhas na divisão entre introdução, desenvolvimento e conclusão.' },
      { n: 9, pontos: 180, curto: 'uma quebra de transição', texto: 'Repertório produtivo e bem articulado, com as três partes bem definidas, mas com leve quebra na transição das ideias centrais.' },
      { n: 10, pontos: 200, curto: 'excelente', texto: 'Abordagem excelente, repertório externo muito bem amarrado à argumentação e estrutura de texto perfeita.' }
    ]
  },

  C3: {
    nome: 'Argumentação e projeto de texto',
    avalia: 'A capacidade de selecionar, relacionar, organizar e interpretar informações em defesa de um ponto de vista.',
    niveis: [
      { n: 0, pontos: 0, curto: 'aglomerado de palavras', texto: 'Texto sem nenhuma direção ou defesa de ideia: apenas um aglomerado de palavras.' },
      { n: 1, pontos: 20, curto: 'ideias confusas', texto: 'Ideias totalmente confusas, sem projeto de texto: é impossível identificar o que o autor quer defender.' },
      { n: 2, pontos: 40, curto: 'argumentos soltos', texto: 'Argumentos muito soltos, sem relação clara com o tema ou com a tese principal.' },
      { n: 3, pontos: 60, curto: 'início de projeto', texto: 'Existe o início de um projeto de texto, mas as ideias são pouco desenvolvidas, contraditórias e muito desorganizadas.' },
      { n: 4, pontos: 80, curto: 'desenvolvimento raso', texto: 'Projeto de texto com muitas falhas, desenvolvimento raso das ideias, limitação ao senso comum e sem direcionamento lógico claro.' },
      { n: 5, pontos: 100, curto: 'lacunas lógicas', texto: 'Argumentação previsível, com lacunas lógicas visíveis, mas a linha de raciocínio principal consegue ser percebida.' },
      { n: 6, pontos: 120, curto: 'projeto mediano', texto: 'Projeto de texto mediano: argumentos dentro do senso comum, com organização aceitável e pouco aprofundamento.' },
      { n: 7, pontos: 140, curto: 'desequilíbrio', texto: 'Projeto bom e claro, mas desequilibrado: um argumento é bem explicado e o outro fica muito superficial.' },
      { n: 8, pontos: 160, curto: 'pequena falha de progressão', texto: 'Bom planejamento e ideias bem desenvolvidas em todo o texto, com uma pequena falha de progressão ou repetição de ideias.' },
      { n: 9, pontos: 180, curto: 'ponta solta', texto: 'Excelente linha de raciocínio, muito bem explicada, que deixa escapar uma leve ponta solta ou pequena imprecisão na conclusão de um dos parágrafos.' },
      { n: 10, pontos: 200, curto: 'excelente', texto: 'Projeto de texto excelente, argumentação forte e consistente, progressão lógica e defesa de ponto de vista impecáveis.' }
    ]
  },

  C4: {
    nome: 'Coesão e uso de conectivos',
    avalia: 'A conexão entre as ideias, o encadeamento dos parágrafos e o vocabulário usado para articular o texto. A grade olha a repetição: palavra, expressão e frase repetidas mostram que a retomada por sinônimo ou pronome faltou.',
    niveis: [
      { n: 0, pontos: 0, curto: 'nenhum conectivo', texto: 'Ausência total de elementos de coesão: palavras e frases jogadas sem conexão.' },
      { n: 1, pontos: 20, curto: 'frases soltas', texto: 'Uso muito precário de conectivos; frases soltas na maior parte do texto.' },
      { n: 2, pontos: 40, curto: 'conectivo errado', texto: 'Poucos conectivos, muitas vezes usados de forma errada, causando quebra de sentido e confusão.' },
      { n: 3, pontos: 60, curto: 'repertório limitado', texto: 'Conectivos presentes, mas o repertório é extremamente limitado, com repetições constantes das mesmas palavras.' },
      { n: 4, pontos: 80, curto: 'sentido trocado', texto: 'Repertório pequeno, com várias repetições e alguns conectivos usados no sentido errado, adição onde deveria haver oposição.' },
      { n: 5, pontos: 100, curto: 'uso regular', texto: 'Uso regular de conectivos: articula as partes do texto, mas repete termos básicos com muita frequência.' },
      { n: 6, pontos: 120, curto: 'sem conectivo no início', texto: 'Domínio mediano: articula bem a maioria das frases, mas apresenta inadequações esporádicas e não usa conectores no início dos parágrafos.' },
      { n: 7, pontos: 140, curto: 'um parágrafo articulado', texto: 'Bom repertório, articula quase sem erros de sentido, mas apresenta conectivo apenas no início de um dos parágrafos de desenvolvimento.' },
      { n: 8, pontos: 160, curto: 'dois parágrafos ligados', texto: 'Bom repertório, poucas repetições, com conectivos usados corretamente para ligar pelo menos dois parágrafos diferentes.' },
      { n: 9, pontos: 180, curto: 'repetição sutil', texto: 'Ótimo repertório, liga frases e parágrafos, mas comete uma repetição muito sutil ou escolhe um termo pouco preciso em um momento específico.' },
      { n: 10, pontos: 200, curto: 'excelente', texto: 'Excelência no uso: conectivos diversificados, sem nenhum erro de sentido, presentes dentro dos parágrafos e ligando todos eles.' }
    ]
  },

  C5: {
    nome: 'Proposta de intervenção',
    avalia: 'A solução criada para o problema discutido. Exige agente, ação, modo, efeito e detalhamento; a pontuação parcial reconhece os elementos incompletos.',
    niveis: [
      { n: 0, pontos: 0, curto: 'sem proposta', texto: 'Nenhuma proposta, ou proposta que não tem relação alguma com a discussão do texto.' },
      { n: 1, pontos: 20, curto: 'um elemento vago', texto: 'Apenas um elemento presente, e de forma muito vaga e imprecisa, um agente genérico demais.' },
      { n: 2, pontos: 40, curto: 'um elemento válido', texto: 'Apenas um elemento válido e claro.' },
      { n: 3, pontos: 60, curto: 'um válido + um vago', texto: 'Um elemento válido e claro, acompanhado de outro elemento vago ou incompleto.' },
      { n: 4, pontos: 80, curto: 'dois elementos válidos', texto: 'Dois elementos perfeitamente válidos.' },
      { n: 5, pontos: 100, curto: 'dois válidos + um genérico', texto: 'Dois elementos válidos, acompanhados de um terceiro formulado de maneira muito genérica.' },
      { n: 6, pontos: 120, curto: 'três elementos válidos', texto: 'Três elementos perfeitamente válidos.' },
      { n: 7, pontos: 140, curto: 'três válidos + um raso', texto: 'Três elementos válidos e um quarto apresentado de forma superficial.' },
      { n: 8, pontos: 160, curto: 'quatro elementos válidos', texto: 'Quatro elementos perfeitamente válidos.' },
      { n: 9, pontos: 180, curto: 'quatro válidos + detalhamento raso', texto: 'Quatro elementos válidos, com o último presente, mas desenvolvido de forma incompleta ou com detalhamento muito raso.' },
      { n: 10, pontos: 200, curto: 'cinco elementos desenvolvidos', texto: 'Cinco elementos válidos, claros e bem desenvolvidos, fechando perfeitamente a proposta de intervenção.' }
    ]
  }
};

/**
 * Regularidade da escala: onde ficam os pontos oficiais.
 * Serve para a interface marcar "este degrau é um nível da cartilha".
 */
export const OFICIAIS = [0, 40, 80, 120, 160, 200];

export const ehOficial = (pontos) => OFICIAIS.includes(pontos);
