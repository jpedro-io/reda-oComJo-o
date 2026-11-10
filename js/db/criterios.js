/**
 * CONTEÚDO DA SEÇÃO "CRITÉRIOS"
 * Os descritores de nível abaixo seguem o Guia do Participante /
 * Cartilha da Redação do Enem (transcrição fiel dos níveis 0 a 200).
 * Os campos didáticos (o que é avaliado, derruba, levanta, exemplos)
 * foram escritos para este material.
 */

export const CRITERIOS = [
  {
    id: 'C1',
    nome: 'Domínio da norma padrão',
    valor: 200,
    resumo: 'Demonstrar domínio da modalidade escrita formal da língua portuguesa e de escolha de registro.',
    oQueAvalia: [
      'Convenções da escrita: ortografia, acentuação, pontuação',
      'Gramática: concordância, regência, flexões, paralelismo sintático',
      'Escolha de registro: ausência de marcas de oralidade e de informalidade',
      'Recorrência dos desvios — o mesmo erro repetido pesa mais que o erro isolado'
    ],
    niveis: [
      { n: 5, texto: 'Demonstra excelente domínio da modalidade escrita formal da língua portuguesa e de escolha de registro. Desvios gramaticais ou de convenções da escrita serão aceitos somente como excepcionalidade e quando não caracterizarem recidência.' },
      { n: 4, texto: 'Demonstra bom domínio da modalidade escrita formal da língua portuguesa e de escolha de registro, com poucos desvios gramaticais e de convenções da escrita.' },
      { n: 3, texto: 'Demonstra domínio mediano da modalidade escrita formal da língua portuguesa e de escolha de registro, com alguns desvios gramaticais e de convenções da escrita.' },
      { n: 2, texto: 'Demonstra domínio insuficiente da modalidade escrita formal da língua portuguesa, com muitos desvios gramaticais, de escolha de registro e de convenções da escrita.' },
      { n: 1, texto: 'Demonstra domínio precário da modalidade escrita formal da língua portuguesa, de forma sistemática, com diversificados e frequentes desvios gramaticais, de escolha de registro e de convenções da escrita.' },
      { n: 0, texto: 'Demonstra desconhecimento da modalidade escrita formal da língua portuguesa.' }
    ],
    derrubam: [
      'O mesmo desvio repetido: “recidência” é o que separa 160 de 120 na descrição oficial.',
      'Trocas clássicas: “mais” por “mas”, “a cerca de” por “acerca de”, “ao invés de” por “em vez de”.',
      'Vírgula entre sujeito e verbo ou antes de complemento direto.',
      'Marcas de fala: “pra”, “aí”, “tipo”, “coisa”, “né” — a escolha de registro está na descrição do nível.',
      'Período longo (30+ palavras) sem nenhuma pausa interna: é a justaposição que a cartilha aponta como falha de estrutura sintática.',
      'Parágrafo — ou o texto — que termina sem ponto final.',
      'Períodos longos com quase nenhuma vírgula: o texto é lido de uma respirada só.',
      'Orações em série ligadas só por “e”, no lugar da subordinação.'
    ],
    sobem: [
      'Reserve os últimos 5 minutos para reler em voz baixa: a boca escuta o erro que o olho pula.',
      'Prefira períodos mais curtos — 40+ palavras costumam virar problema de pontuação.',
      'Na dúvida sobre uma palavra difícil, troque por uma que você domina: erro em vocabulário rebuscado pesa mais que simplicidade correta.',
      'Cuidado com “onde”: só com antecedente de lugar.'
    ],
    exemplo: {
      fraco: 'Percebe-se que os jovens não tem acesso a leitura, onde muitos acha que isso não é um problema sério pra sociedade.',
      forte: 'Percebe-se que os jovens não têm acesso à leitura, um problema que parcela significativa da sociedade considera pouco relevante.'
    }
  },
  {
    id: 'C2',
    nome: 'Compreensão do tema e repertório',
    valor: 200,
    resumo: 'Desenvolver o tema com argumentação consistente, a partir de repertório sociocultural produtivo, no texto dissertativo-argumentativo.',
    oQueAvalia: [
      'Se o texto desenvolve o recorte específico da proposta (não apenas o assunto)',
      'Domínio da estrutura dissertativo-argumentativa: proposição, argumentação e conclusão',
      'Repertório sociocultural produtivo — e não apenas citado',
      'Atenção: copiar trechos dos textos motivadores derruba para 80'
    ],
    niveis: [
      { n: 5, texto: 'Desenvolve o tema por meio de argumentação consistente, a partir de um repertório sociocultural produtivo, e apresenta excelente domínio do texto dissertativo-argumentativo.' },
      { n: 4, texto: 'Desenvolve o tema por meio de argumentação consistente e apresenta bom domínio do texto dissertativo-argumentativo, com proposição, argumentação e conclusão.' },
      { n: 3, texto: 'Desenvolve o tema por meio de argumentação previsível e apresenta domínio mediano do texto dissertativo-argumentativo, com proposição, argumentação e conclusão.' },
      { n: 2, texto: 'Desenvolve o tema recorrendo à cópia de trechos dos textos motivadores ou apresenta domínio insuficiente do texto dissertativo-argumentativo, não atendendo à estrutura com proposição, argumentação e conclusão.' },
      { n: 1, texto: 'Apresenta o assunto, tangenciando o tema, ou demonstra domínio precário do texto dissertativo-argumentativo, com traços constantes de outros tipos textuais.' },
      { n: 0, texto: 'Fuga ao tema/não atendimento à estrutura dissertativo-argumentativa. Nestes casos a redação recebe nota zero e é anulada.' }
    ],
    derrubam: [
      'Tangenciar: falar do assunto amplo e não do recorte. Em C2 isso trava a nota em 40 — e o mesmo limite se aplica a C3 e C5.',
      'Copiar trechos dos textos motivadores: o nível 80 descreve exatamente essa situação.',
      'Repertório de bolso: citar autor ou lei e seguir adiante sem explicar o que aquilo demonstra.',
      'Contaminar o texto com narração, descrição, poema ou diálogo.'
    ],
    sobem: [
      'Sublinhe o recorte exato da proposta — as palavras que limitam o tema.',
      'Um repertório por argumento, sempre explicado: “Segundo X, [ideia]. Isso explica, no caso brasileiro, que...”.',
      'Prefira repertório legitimado: Constituição, leis, instituições, autores, obras, dados de pesquisa.',
      'Cite o núcleo do tema com as mesmas palavras da proposta pelo menos uma vez.'
    ],
    exemplo: {
      fraco: 'Segundo Bauman, vivemos em tempos líquidos. Portanto, é preciso resolver o problema.',
      forte: 'Segundo Bauman, as relações contemporâneas são marcadas pela fluidez — é exatamente esse desenho que se observa no convívio digital, em que vínculos se desfazem antes de qualquer responsabilidade legal.'
    }
  },
  {
    id: 'C3',
    nome: 'Seleção e organização de argumentos',
    valor: 200,
    resumo: 'Selecionar, relacionar, organizar e interpretar informações, fatos e opiniões em defesa de um ponto de vista — configurando autoria.',
    oQueAvalia: [
      'Existência de um ponto de vista explícito (tese)',
      'Autoria: argumento próprio, e não apenas o que os textos motivadores já diziam',
      'Organização: progressão e ausência de contradição',
      'Projeto de texto: cada parágrafo cumpre a função prevista'
    ],
    niveis: [
      { n: 5, texto: 'Apresenta informações, fatos e opiniões relacionados ao tema proposto, de forma consistente e organizada, configurando autoria, em defesa de um ponto de vista.' },
      { n: 4, texto: 'Apresenta informações, fatos e opiniões relacionados ao tema, de forma organizada, com indícios de autoria, em defesa de um ponto de vista.' },
      { n: 3, texto: 'Apresenta informações, fatos e opiniões relacionados ao tema, limitados aos argumentos dos textos motivadores e pouco organizados, em defesa de um ponto de vista.' },
      { n: 2, texto: 'Apresenta informações, fatos e opiniões relacionados ao tema, mas desorganizados ou contraditórios e limitados aos argumentos dos textos motivadores, em defesa de um ponto de vista.' },
      { n: 1, texto: 'Apresenta informações, fatos e opiniões pouco relacionados ao tema ou incoerentes e sem defesa de um ponto de vista.' },
      { n: 0, texto: 'Apresenta informações, fatos e opiniões não relacionados ao tema e sem defesa de um ponto de vista.' }
    ],
    derrubam: [
      'Repetir exatamente os argumentos dos textos motivadores: a descrição do nível 120 diz isso com todas as letras.',
      'Argumento circular: retomar a tese com outras palavras sem justificar.',
      'Contradição entre parágrafos.',
      'Primeira pessoa (“eu acho”, “na minha opinião”) — quebra a impessoalidade.',
      'Clichês de abertura que ocupam linhas sem construir ideia.'
    ],
    sobem: [
      'Feche a introdução com uma frase-tese sobre o problema, não com uma pergunta.',
      'Abra cada desenvolvimento com um tópico frasal que já anuncie o argumento.',
      'Sustente com causa, consequência, comparação ou dado — não com adjetivo.',
      'Antecipe a objeção do leitor e responda: isso é o que a descrição chama de autoria.'
    ],
    exemplo: {
      fraco: 'O problema é muito grave e afeta todas as pessoas, o que é uma coisa bastante ruim para toda a sociedade.',
      forte: 'A ausência de fiscalização converte uma lei adequada em peça de ficção: sem órgão capacitado para autuar, o texto legal não altera a prática que pretendia coibir.'
    }
  },
  {
    id: 'C4',
    nome: 'Mecanismos de coesão',
    valor: 200,
    resumo: 'Articular as partes do texto com repertório diversificado de recursos coesivos.',
    oQueAvalia: [
      'Articulação entre os parágrafos e entre as frases',
      'Diversidade de recursos coesivos (não só conectivos: pronomes, termos-resumo, sinônimos)',
      'Adequação das escolhas: o conectivo precisa expressar a relação lógica correta',
      'Pontuação usada como organizadora do raciocínio'
    ],
    niveis: [
      { n: 5, texto: 'Articula bem as partes do texto e apresenta repertório diversificado de recursos coesivos.' },
      { n: 4, texto: 'Articula as partes do texto, com poucas inadequações, e apresenta repertório diversificado de recursos coesivos.' },
      { n: 3, texto: 'Articula as partes do texto, de forma mediana, com inadequações, e apresenta repertório pouco diversificado de recursos coesivos.' },
      { n: 2, texto: 'Articula as partes do texto, de forma insuficiente, com muitas inadequações, e apresenta repertório limitado de recursos coesivos.' },
      { n: 1, texto: 'Articula as partes do texto de forma precária.' },
      { n: 0, texto: 'Não articula as informações.' }
    ],
    derrubam: [
      'Parágrafos empilhados, sem transição.',
      'Repetir o mesmo conectivo (“além disso” três, quatro vezes) — a descrição fala em repertório pouco diversificado.',
      'Relação lógica invertida: “porém” onde a ideia é de consequência.',
      'Frases coladas só por “e”, típicas de escrita espontânea.',
      'Termo repetido sem retomada: a cartilha pede retomada por sinônimos ou pronomes.',
      'Palavra de recheio martelada (“problema”, “pessoas”, “questão” voltando seis, oito vezes).',
      'A mesma frase aparecendo duas vezes — repetir não é progressão.',
      'Expressão e abertura de período repetidas: o texto fica monocórdio.'
    ],
    sobem: [
      'Comece cada parágrafo com um articulador que diga qual é a função dele.',
      'Varie as classes: adição, oposição, causa, conclusão, finalidade.',
      'Use termos-resumo (“essa prática”, “tal cenário”) para retomar blocos de ideia.',
      'Leia só a primeira frase de cada parágrafo: se o texto ainda fizer sentido, a progressão funciona.'
    ],
    exemplo: {
      fraco: 'A lei existe. As pessoas não obedecem. O governo não fiscaliza. O problema continua.',
      forte: 'Embora a lei exista, sua aplicação é irregular; por isso, quando falta fiscalização, o problema persiste.'
    }
  },
  {
    id: 'C5',
    nome: 'Proposta de intervenção',
    valor: 200,
    resumo: 'Elaborar proposta de intervenção detalhada, relacionada ao tema e articulada à discussão desenvolvida no texto.',
    oQueAvalia: [
      'Presença de proposta ligada ao tema (e não apenas ao assunto)',
      'Detalhamento: agente, ação, meio/modo, finalidade e detalhamento',
      'Articulação com a discussão construída no texto',
      'Respeito aos direitos humanos — condição eliminatória'
    ],
    niveis: [
      { n: 5, texto: 'Elabora muito bem proposta de intervenção, detalhada, relacionada ao tema e articulada à discussão desenvolvida no texto.' },
      { n: 4, texto: 'Elabora bem proposta de intervenção relacionada ao tema e articulada à discussão desenvolvida no texto.' },
      { n: 3, texto: 'Elabora, de forma mediana, proposta de intervenção relacionada ao tema e articulada à discussão desenvolvida no texto.' },
      { n: 2, texto: 'Elabora, de forma insuficiente, proposta de intervenção relacionada ao tema, ou não articulada com a discussão desenvolvida no texto.' },
      { n: 1, texto: 'Apresenta proposta de intervenção vaga, precária ou relacionada apenas ao assunto.' },
      { n: 0, texto: 'Não apresenta proposta de intervenção ou apresenta proposta não relacionada ao tema ou ao assunto.' }
    ],
    derrubam: [
      'Proposta vaga: “é preciso conscientizar a sociedade” — sem quem, como e para quê.',
      'Proposta relacionada apenas ao assunto (e não ao recorte do tema): nível 40 na descrição oficial.',
      'Faltar o agente: dizer o que fazer sem nomear quem executa.',
      'Faltar o meio: não indicar o instrumento (campanha, verba, lei, plataforma, programa).',
      'Sugerir violência, tortura ou “justiça com as próprias mãos”: zera a competência.'
    ],
    sobem: [
      'Use a estrutura: agente + ação + meio/modo + finalidade + detalhamento.',
      'Nomeie instituições reais: Ministério da Saúde, MEC, prefeituras, escolas, mídia, ONGs.',
      'Detalhe com exemplo concreto (tipo de campanha, fonte de verba, público-alvo).',
      'Reserve de 5 a 7 linhas para a conclusão — é a parte mais previsível de gabaritar.'
    ],
    exemplo: {
      fraco: 'Portanto, o governo deve fazer algo para melhorar essa situação e conscientizar as pessoas.',
      forte: 'Portanto, cabe ao Ministério da Saúde, em parceria com as secretarias estaduais, ampliar as equipes de Saúde da Família por meio da revisão dos repasses federais, a fim de garantir cobertura nas regiões de maior vulnerabilidade, visto que são essas localidades que dependem exclusivamente do sistema público.'
    }
  }
];

export const ZEROS = [
  { titulo: 'Fuga total ao tema', texto: 'O texto não desenvolve nem o assunto amplo nem o recorte específico da proposta. A redação recebe nota zero e é anulada.' },
  { titulo: 'Até 7 linhas', texto: 'Texto com até sete linhas transcritas na folha oficial recebe nota zero.' },
  { titulo: 'Gênero diferente', texto: 'Não atendimento à estrutura dissertativo-argumentativa: predomínio de narração, descrição, poema, receita, diálogo.' },
  { titulo: 'Trechos desconectados', texto: 'Inserir no meio do texto um trecho deliberadamente sem relação com o tema.' },
  { titulo: 'Desrespeito à seriedade do exame', texto: 'Assinatura, nome, apelido, desenho, sinais gráficos, linguagem ofensiva ou deboche.' },
  { titulo: 'Cópia dos motivadores', texto: 'Transcrição integral dos textos da proposta, sem contribuição própria.' }
];

export const AVISO_TANGENCIAMENTO = {
  titulo: 'Tangenciamento não zera — mas custa caro',
  texto: 'Se o texto aborda apenas o assunto, tangenciando o tema, a redação continua sendo avaliada, porém as Competências II, III e V ficam limitadas a 40 pontos cada. Na prática, isso derruba a nota máxima possível para 560.'
};

export const CALCULO_NOTA = [
  { titulo: 'Dois avaliadores, às cegas', texto: 'Cada redação é corrigida por dois avaliadores independentes, sem acesso ao nome do participante e sem ver a nota do outro.' },
  { titulo: 'Nota por competência', texto: 'Cada avaliador atribui 0, 40, 80, 120, 160 ou 200 em cada uma das cinco competências — os níveis do guia oficial.' },
  { titulo: 'Média das duas notas', texto: 'A nota final é a média aritmética das notas totais dos dois avaliadores, somando até 1.000 pontos.' },
  { titulo: 'Quando entra um terceiro', texto: 'Há discrepância se a diferença total passar de 100 pontos, se passar de 80 pontos em qualquer competência, ou se um avaliador zerar e o outro não. Nesse caso, um terceiro avaliador corrige o texto.' },
  { titulo: 'A nota é de 40 em 40 — com uma exceção', texto: 'Como na grade oficial, cada competência vale 0, 40, 80, 120, 160 ou 200. Um texto que reúne características de dois níveis é avaliado no inferior, como manda a cartilha. A exceção é o caso abaixo.' },
  { titulo: 'A meia-faixa (20 em 20): entre dois níveis, sem defeito', texto: 'Quando o texto cumpre INTEGRALMENTE o descritor de um nível, já mostra parte do descritor seguinte e não tem nenhum defeito objetivo que o derrube, a nota fica na metade do caminho: 20, 60, 100, 140 ou 180. É o caso do texto que não erra nada e ainda não sustenta o nível de cima. Com qualquer defeito encontrado — desvio de norma, repetição, período sem pontuação, falta de repertório, proposta incompleta — vale a regra geral: fica no nível inferior.' },
  { titulo: 'Amostra curta tem teto', texto: 'Nenhuma competência passa de 120 em texto com menos de 150 palavras, de 160 abaixo de 200 e de 180 abaixo de 240. O descritor exige prova — parágrafos, repertório desenvolvido, proposta completa — e amostra curta não tem espaço para essa prova; por isso não sai 200 de um texto de dez linhas.' },
  { titulo: 'Controle de qualidade', texto: 'A cada 50 redações, o avaliador recebe 2 redações de controle já pontuadas pela comissão. Serve para medir calibragem e pode gerar recapacitação.' }
];
