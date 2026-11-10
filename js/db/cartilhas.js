/**
 * GRADES ESPECÍFICAS — destiladas das cartilhas de capacitação (FGV/Inep).
 *
 * Fontes analisadas (em uploads/):
 *   Competencia_1.pdf  — estrutura sintática × desvios
 *   Competencia_2.pdf  — tema × tipologia × repertório
 *   Competencia_3.pdf  — projeto de texto × desenvolvimento
 *   Competencia_4.pdf  — elementos coesivos inter/intraparágrafos × repetições
 *   Competencia_5.pdf  — contagem dos cinco elementos da proposta
 *   cartilha_enem_2026.pdf — cartilha do participante 2026
 *
 * A ideia central que rege as cinco competências: o nível não é uma média.
 * O texto só sobe se cumprir INTEGRALMENTE o descritor do nível; quando reúne
 * características de dois níveis, o avaliador fica com o INFERIOR. É por isso
 * que uma redação "quase perfeita" pode valer 160 e não 200.
 */

export const PRINCIPIO = 'Para ser avaliado em um nível, o texto precisa cumprir integralmente o descritor daquele nível. Quando apresenta características de dois níveis diferentes, é avaliado no nível inferior.';

export const GRADES = {
  C1: {
    eixo: 'estrutura sintática × quantidade e recorrência de desvios',
    regra: 'O nível 5 exige estrutura sintática excelente — no máximo uma falha — E, no máximo, dois desvios no texto inteiro. Como a regra do nível inferior vale, um texto com estrutura impecável e três desvios cai para o nível 4.',
    niveis: {
      5: 'estrutura sintática excelente (no máximo uma falha) E, no máximo, dois desvios',
      4: 'estrutura sintática boa E poucos desvios',
      3: 'estrutura sintática regular E alguns desvios',
      2: 'estrutura sintática deficitária OU muitos desvios',
      1: 'estrutura sintática deficitária com muitos desvios',
      0: 'estrutura sintática inexistente, independentemente da quantidade de desvios'
    },
    oQueConta: [
      'Convenções da escrita: acentuação, ortografia, hífen, maiúsculas e minúsculas, separação silábica',
      'Gramática: regência, concordância, pontuação, paralelismo sintático, emprego de pronomes, crase',
      'Escolha de registro: informalidade e marca de oralidade',
      'Estrutura sintática: períodos truncados, justaposição de palavras, ausência ou excesso de termos'
    ],
    contagem: 'Cada vocábulo com desvio é contabilizado uma única vez, mesmo que o erro se repita — mas a repetição pesa como recorrência na leitura do conjunto. O nível 5 é o único com limite objetivo: no máximo uma falha de estrutura e dois desvios.',
    fonte: 'Competencia_1.pdf, seções 1.2 (Grade específica) e 2 (A estrutura sintática)'
  },

  C2: {
    eixo: 'abordagem do tema × tipologia textual × repertório sociocultural',
    regra: 'Abordagem completa do tema e as três partes sem nenhuma embrionária são pré-requisito para o nível 4. O que separa 160 de 200 é uma única coisa: o repertório legitimado e pertinente ser usado de forma produtiva — isto é, vinculado à discussão que o texto faz.',
    niveis: {
      5: ' abordagem completa do tema + três partes (nenhuma embrionária) + repertório legitimado, pertinente e com uso produtivo',
      4: 'abordagem completa do tema + três partes (nenhuma embrionária) + repertório legitimado e pertinente, mas com uso improdutivo',
      3: 'abordagem completa + três partes (uma pode ser embrionária) + repertório baseado nos motivadores, ou não legitimado, ou não pertinente ao tema',
      2: 'tangência ao tema, ou três partes com duas embrionárias, ou conclusão finalizada por frase incompleta',
      1: 'tangência ao tema com texto composto por aglomerado de palavras, ou traços constantes de outros tipos textuais',
      0: 'fuga total ao tema (redação anulada)'
    },
    repertorio: {
      legitimado: 'Referência identificável produzida nas áreas do conhecimento: lei, artigo científico, autor, obra, dado de instituição, fato histórico documentado.',
      pertinente: 'O repertório se associa a pelo menos um dos elementos do tema (por sinônimo, hiperônimo ou hipônimo).',
      produtivo: 'O repertório é vinculado à discussão do texto — o participante diz o que ele demonstra. Citar sem explicar é uso improdutivo.',
      motivadores: 'Repertório retirado dos textos motivadores da prova não sobe o nível: a grade manda não ultrapassar o nível 3 quando há muitos trechos copiados.'
    },
    fonte: 'Competencia_2.pdf, seções 2 (Grade específica) e 5 (Repertório)'
  },

  C3: {
    eixo: 'projeto de texto × desenvolvimento dos argumentos',
    regra: 'A partir do nível 2 os dois aspectos são exigidos com E, não OU: é preciso ter projeto de texto com poucas falhas E desenvolver as informações, fatos e opiniões. Sem direção, o texto cai para o nível 2, por mais bem escrito que seja.',
    niveis: {
      5: 'projeto de texto sem falhas + desenvolvimento das informações, fatos e opiniões em todo o texto',
      4: 'projeto de texto com poucas falhas + desenvolvimento da maior parte das informações, fatos e opiniões',
      3: 'projeto de texto com muitas falhas + desenvolvimento de algumas informações, fatos e opiniões',
      2: 'abordagem completa do tema sem direção, ou sem desenvolvimento, ou com desenvolvimento de apenas uma informação, fato ou opinião',
      1: 'texto tangente ao tema, com direção',
      0: 'texto tangente ao tema e sem direção'
    },
    vocabulario: {
      direcao: 'Direção é o caminho argumentativo que o texto deixa visível: o leitor sabe para onde está sendo levado. Tese + progressão = direção.',
      projeto: 'Projeto de texto é o planejamento anterior ao texto: quais argumentos, em que ordem, a serviço de qual tese. Falhas de projeto aparecem como argumento que não sustenta a tese ou parágrafo que não avança.',
      desenvolvimento: 'Desenvolver é explicar o que a informação demonstra, e não apenas enunciá-la.',
      contradicao: 'Contradição grave entre o que se defende e o que se propõe impede o texto de passar do nível 3.'
    },
    fonte: 'Competencia_3.pdf, seções 3 (Grade específica) e 4 (Termos importantes)'
  },

  C4: {
    eixo: 'presença de elementos coesivos entre e dentro dos parágrafos × repetições × inadequações',
    regra: 'O nível 4 exige ao menos um operador argumentativo ligando parágrafos em pelo menos um momento do texto. O nível 5 exige dois desses momentos entre parágrafos E pelo menos um elemento coesivo dentro de todos os parágrafos, com raras ou nenhuma repetição e nenhuma inadequação.',
    niveis: {
      5: 'presença expressiva de elementos coesivos inter e intraparágrafos, com raras ou ausentes repetições e sem inadequação',
      4: 'presença constante de elementos coesivos inter e intraparágrafos, com poucas repetições ou poucas inadequações',
      3: 'presença regular de elementos coesivos inter e/ou intraparágrafos, com algumas repetições e/ou algumas inadequações',
      2: 'presença rara de elementos coesivos, ou excessivas repetições, ou excessivas inadequações',
      1: 'presença pontual de elementos coesivos, ou muitas repetições, ou muitas inadequações',
      0: 'palavras e períodos justapostos e desconexos ao longo de todo o texto'
    },
    monobloco: 'Texto escrito em um único bloco, sem divisão em parágrafos, não ultrapassa o nível 2 — não há como articular o que não está separado.',
    fonte: 'Competencia_4.pdf, seções 5 (Grade específica) e 6 (Termos importantes)'
  },

  C5: {
    eixo: 'contagem objetiva dos cinco elementos da proposta',
    regra: 'A contagem é objetiva e cada elemento vale 1: 5 elementos = 200, 4 = 160, 3 = 120, 2 = 80, 1 = 40, nenhum = 0. O avaliador considera sempre a proposta mais completa do texto. Elemento nulo — impreciso ou genérico demais — não entra na conta.',
    niveis: {
      5: '5 elementos válidos',
      4: '4 elementos válidos',
      3: '3 elementos válidos',
      2: '2 elementos válidos',
      1: '1 elemento válido, ou todos os elementos nulos',
      0: 'sem proposta, proposta copiada da prova, proposta que desrespeita os direitos humanos ou proposta não relacionada sequer ao assunto'
    },
    elementos: [
      { id: 'agente', nome: 'Agente', pergunta: 'Quem executa?', exemplo: 'Ministério da Saúde, MEC, prefeituras, escolas, mídia, ONGs, famílias' },
      { id: 'acao', nome: 'Ação', pergunta: 'O que se propõe?', exemplo: 'ampliar, criar, fiscalizar, capacitar, destinar verbas' },
      { id: 'meio', nome: 'Meio / modo', pergunta: 'Como será feito?', exemplo: 'por meio de campanhas, editais, plataformas, parcerias, leis' },
      { id: 'finalidade', nome: 'Finalidade / efeito', pergunta: 'Para quê?', exemplo: 'a fim de garantir, para reduzir, com o objetivo de ampliar' },
      { id: 'detalhamento', nome: 'Detalhamento', pergunta: 'Por que isso funciona?', exemplo: 'visto que, sobretudo nas regiões…, por exemplo' }
    ],
    nulos: {
      agente: ['alguém', 'ninguém', 'alguns', 'uns', 'você', 'as autoridades competentes', 'órgãos competentes'],
      acao: ['medidas devem ser tomadas', 'algo deve ser feito', 'é preciso mudar', 'deve haver consciência'],
      nota: '“Todos”, “as pessoas”, “nós” e “a sociedade” são agentes válidos — a cartilha os trata como ator social definido. Já “alguém”, “ninguém” e o imperativo sem vocativo são nulos.'
    },
    constatacao: 'Constatação de falta não é proposta: “falta liberdade de escolha” aponta o problema; “é preciso garantir a liberdade de escolha” aponta a solução. Só a segunda conta.',
    fonte: 'Competencia_5.pdf, seções 3 (Grade específica) e 4 (Descrição dos níveis)'
  }
};

/** Necessidade de cada nível, em texto curto, para usar na explicação. */
export const EXIGE = {
  C1: {
    5: 'no máximo uma falha de estrutura sintática e no máximo dois desvios',
    4: 'estrutura sintática boa e poucos desvios',
    3: 'estrutura sintática regular e alguns desvios',
    2: 'estrutura sintática deficitária ou muitos desvios',
    1: 'estrutura sintática deficitária com muitos desvios',
    0: 'estrutura sintática inexistente'
  },
  C2: {
    5: 'tema completo, três partes e repertório com uso produtivo',
    4: 'tema completo, três partes e repertório pertinente (uso improdutivo)',
    3: 'tema completo, três partes (uma embrionária) e repertório frágil',
    2: 'tangência ao tema ou estrutura com partes embrionárias',
    1: 'tangência com traços de outros tipos textuais',
    0: 'fuga ao tema'
  },
  C3: {
    5: 'projeto de texto sem falhas e desenvolvimento em todo o texto',
    4: 'projeto com poucas falhas e desenvolvimento da maior parte',
    3: 'projeto com muitas falhas e desenvolvimento de algumas partes',
    2: 'sem direção, ou desenvolvimento de uma única ideia',
    1: 'tangente ao tema, com direção',
    0: 'tangente ao tema e sem direção'
  },
  C4: {
    5: 'coesão expressiva inter e intraparágrafos, sem inadequação',
    4: 'coesão constante inter e intraparágrafos, com poucas falhas',
    3: 'coesão regular, com algumas repetições ou inadequações',
    2: 'coesão rara, ou excesso de repetições',
    1: 'coesão pontual, ou muitas repetições',
    0: 'períodos justapostos e desconexos'
  },
  C5: {
    5: '5 elementos válidos',
    4: '4 elementos válidos',
    3: '3 elementos válidos',
    2: '2 elementos válidos',
    1: '1 elemento válido',
    0: 'sem proposta válida'
  }
};

/** O que falta, na prática, para o degrau seguinte. */
export const PARA_SUBIR = {
  C1: {
    4: 'Elimine os desvios: com dois ou menos em todo o texto, a estrutura já sustenta o nível 5.',
    3: 'Resolva os desvios recorrentes primeiro (os mesmos erros repetidos) — a recorrência é o que separa “alguns” de “poucos”.',
    2: 'Reduza o volume de desvios e revise os períodos truncados: o nível 2 aceita muitos desvios, mas a estrutura precisa deixar de ser deficitária.',
    1: 'Reescreva os períodos incompletos e as justaposições: a estrutura sintática precisa existir antes de qualquer outra coisa.'
  },
  C2: {
    4: 'Explique o repertório: diga o que a lei, o dado ou o autor demonstra sobre o seu argumento. É o degrau que separa o 160 do 200.',
    3: 'Feche as três partes com função clara e traga repertório legitimado (lei, dado, autor, obra) que não venha dos textos motivadores.',
    2: 'Desenvolva o recorte do tema, não o assunto: use as palavras da proposta na introdução, no desenvolvimento e na conclusão.',
    1: 'Abandone a tangência: o texto precisa discutir exatamente a frase temática da proposta.'
  },
  C3: {
    4: 'Desenvolva também as ideias secundárias: no nível 5, todo o texto desenvolve, não só a maior parte.',
    3: 'Garanta que cada parágrafo avance a tese com um argumento explicado, e não apenas enunciado.',
    2: 'Construa direção: tese explícita na introdução e dois eixos que a sustentem.',
    1: 'Saia da tangência antes de pensar em projeto de texto.'
  },
  C4: {
    4: 'Abra os parágrafos com operadores argumentativos (dois momentos no texto) e use ao menos um elemento coesivo dentro de cada parágrafo.',
    3: 'Varie as classes de conectivos e elimine as repetições do mesmo articulador.',
    2: 'Insira conectivos de oposição, causa e conclusão: hoje o texto encadeia pouco.',
    1: 'Ligue as frases entre si: use pelo menos um conectivo por parágrafo.'
  },
  C5: {
    4: 'Falta um elemento: acrescente o detalhamento (por que a ação funciona, com que critério, para quem).',
    3: 'Complete o meio/modo e a finalidade: “por meio de…” e “a fim de…” fecham dois elementos de uma vez.',
    2: 'Nomeie o agente e o meio: quem executa e com que instrumento.',
    1: 'Estruture a proposta inteira: agente + ação + meio + finalidade + detalhamento.'
  }
};
