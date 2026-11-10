/**
 * CONTEÚDO DA SEÇÃO "ESTRUTURA" — anatomia da redação.
 */

export const DISTRIBUICAO_LINHAS = [
  { parte: 'Introdução', linhas: '4 a 6 linhas', funcao: 'Contextualizar, apresentar o problema e a tese' },
  { parte: 'Desenvolvimento 1', linhas: '7 a 8 linhas', funcao: 'Primeiro eixo de argumentação, com repertório' },
  { parte: 'Desenvolvimento 2', linhas: '7 a 8 linhas', funcao: 'Segundo eixo, diferente do primeiro' },
  { parte: 'Conclusão', linhas: '5 a 7 linhas', funcao: 'Retomar a tese e apresentar a proposta completa' }
];

export const PARTES = [
  {
    id: 'introducao',
    nome: 'Introdução',
    apelido: 'o mapa do texto',
    linhas: '4 a 6 linhas',
    funcao: 'Situar o tema, apresentar o problema e anunciar a tese que será defendida.',
    formula: 'Contextualização (repertório) + apresentação do recorte + tese',
    passos: [
      'Abra com um repertório legitimado: lei, dado, autor, obra, fato histórico.',
      'Mostre o recorte: qual é a face do problema que o seu texto vai discutir.',
      'Feche com uma frase-tese — uma afirmação sobre a causa ou a natureza do problema.'
    ],
    erroComum: 'Gastar as seis linhas contextualizando e terminar sem dizer o que defende. Sem tese, a Competência III desaba.',
    dica: 'Se você apagar a introdução, o leitor deve conseguir dizer qual é a sua opinião sobre o problema.'
  },
  {
    id: 'desenvolvimento',
    nome: 'Desenvolvimento',
    apelido: 'onde a nota é decidida',
    linhas: '7 a 8 linhas cada',
    funcao: 'Sustentar a tese com dois eixos distintos de argumentação.',
    formula: 'Tópico frasal + repertório/dado + explicação + arremate',
    passos: [
      'Abra o parágrafo com o argumento em uma frase (tópico frasal) e um conectivo de progressão.',
      'Traga o repertório que comprova o argumento — e explique a relação, não apenas cite.',
      'Desdobre a consequência: o que acontece se nada mudar.',
      'Arremate ligando de volta à tese.'
    ],
    erroComum: 'Dois parágrafos que dizem a mesma coisa com palavras diferentes. Os eixos precisam ser diferentes: um pode ser estrutural (falta de política pública) e o outro cultural (mentalidade, preconceito).',
    dica: 'Eixos que funcionam bem: causa estrutural × causa cultural; consequência social × consequência econômica; o que diz a lei × o que acontece na prática.'
  },
  {
    id: 'conclusao',
    nome: 'Conclusão',
    apelido: 'a parte mais previsível de gabaritar',
    linhas: '5 a 7 linhas',
    funcao: 'Retomar a tese e apresentar a proposta de intervenção com os cinco elementos.',
    formula: 'Retomada + agente + ação + meio/modo + finalidade + detalhamento',
    passos: [
      'Comece com um conectivo conclusivo: “Portanto”, “Diante disso”, “Nesse sentido”.',
      'Nomeie o agente: quem executa (ministério, secretaria, escola, mídia, ONG).',
      'Diga a ação com verbo claro: ampliar, criar, fiscalizar, implementar, capacitar.',
      'Indique o meio: por meio de campanhas, verba, plataforma, parceria, lei.',
      'Feche com a finalidade e um detalhamento que mostre viabilidade.'
    ],
    erroComum: 'Uma única frase genérica: “o governo deve conscientizar a sociedade”. Isso entrega 120 pontos quando a competência vale 200.',
    dica: 'A proposta precisa conversar com o que você argumentou. Se você falou de falta de fiscalização, a proposta deve tratar disso — e não de “conscientização” genérica.'
  }
];

export const ELEMENTOS_PROPOSTA = [
  { id: 'agente', nome: 'Agente', pergunta: 'Quem executa?', exemplos: 'Ministério da Saúde, MEC, prefeituras, escolas, mídia, ONGs, famílias' },
  { id: 'acao', nome: 'Ação', pergunta: 'O que deve ser feito?', exemplos: 'ampliar, criar, implementar, fiscalizar, capacitar, destinar verbas' },
  { id: 'meio', nome: 'Meio / modo', pergunta: 'Como será feito?', exemplos: 'por meio de campanhas, editais, plataformas digitais, parcerias, leis' },
  { id: 'finalidade', nome: 'Finalidade', pergunta: 'Para quê?', exemplos: 'a fim de reduzir, para garantir, com o objetivo de ampliar' },
  { id: 'detalhamento', nome: 'Detalhamento', pergunta: 'Por que isso funciona / como se aplica?', exemplos: 'tais como..., visto que..., especialmente nas regiões..., por exemplo' }
];

export const ESQUELETO = {
  titulo: 'Esqueleto de 30 linhas',
  linhas: [
    { bloco: 'Introdução', texto: '[repertório] + [recorte do problema] + [tese]', n: '4–6' },
    { bloco: 'Desenvolvimento 1', texto: 'Em primeiro lugar, [argumento]. Segundo [repertório], [explicação]. Dessa forma, [consequência].', n: '7–8' },
    { bloco: 'Desenvolvimento 2', texto: 'Além disso, [segundo argumento]. [repertório diferente]. Nesse sentido, [aprofundamento].', n: '7–8' },
    { bloco: 'Conclusão', texto: 'Portanto, cabe ao [agente] [ação] por meio de [meio], a fim de [finalidade], visto que [detalhamento].', n: '5–7' }
  ]
};
