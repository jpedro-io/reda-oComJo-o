/**
 * REDAÇÕES ANALISADAS — 2014 a 2019
 * Modelos didáticos escritos no padrão nota 1000, um para cada tema
 * oficial do Enem. Não são textos de participantes: são reconstruções
 * do padrão de excelência, comentadas parágrafo por parágrafo.
 * Tipos de destaque: repertorio | tese | problema | argumento | conectivo | proposta
 */

export const REDACOES_2014_2019 = [
  {
    id: 'enem-2014',
    ano: 2014,
    temaId: 'enem-2014',
    tema: 'Publicidade infantil em questão no Brasil',
    comando: '“Em questão” pede posicionamento em uma disputa de interesses — não basta descrever os dois lados.',
    nota: 1000,
    resumo: 'Mostra como transformar um tema polêmico em tese clara: vulnerabilidade cognitiva da criança + insuficiência da autorregulação.',
    porQueMil: [
      'A tese aparece na última frase da introdução e responde ao comando “em questão”: escolhe um lado (proteção) e justifica.',
      'Dois eixos distintos: um cognitivo (a criança não identifica persuasão) e um institucional (a autorregulação não funciona).',
      'Repertório produtivo: dispositivo constitucional, resolução do Conanda e um conceito sociológico — todos explicados.',
      'Proposta específica, com órgão competente (Conanda), instrumento (resolução vinculante) e detalhamento.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Contextualiza pela via legal, apresenta o conflito e fecha com tese.',
        texto: 'A Constituição Federal determina, no artigo 227, que criança e adolescente devem ser protegidos com absoluta prioridade pela família, pela sociedade e pelo Estado. No entanto, a publicidade dirigida ao público infantil segue ocupando faixas extensas da programação e das plataformas digitais, apostando justamente na incapacidade da criança de distinguir informação de persuasão. Assim, o debate sobre a propaganda infantil não é uma questão de gosto: um público que ainda não formou juízo crítico não pode ser tratado como consumidor autônomo.',
        destaques: [
          { trecho: 'A Constituição Federal determina, no artigo 227', tipo: 'repertorio', nota: 'Abre com a norma que fundamenta o próprio tema. Repertório de abertura dá autoridade ao texto e já delimita o campo do direito.' },
          { trecho: 'a publicidade dirigida ao público infantil segue ocupando faixas extensas da programação', tipo: 'problema', nota: 'O recorte do tema aparece na segunda frase: não é “consumo”, é publicidade dirigida à criança.' },
          { trecho: 'um público que ainda não formou juízo crítico não pode ser tratado como consumidor autônomo', tipo: 'tese', nota: 'Frase-tese que se posiciona na disputa (“em questão”). Todo o texto passa a defender esta afirmação.' }
        ],
        analise: 'A introdução cumpre as três funções: contexto legal, apresentação do recorte e posicionamento. O conectivo “No entanto” instala a tensão entre o que a lei garante e o que acontece na prática — é dela que nasce a argumentação.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Explica a vulnerabilidade cognitiva da criança com apoio científico.',
        texto: 'Em primeiro lugar, a publicidade infantil explora uma vulnerabilidade cognitiva. Estudos da área de psicologia do desenvolvimento indicam que, até cerca de oito anos, a criança não reconhece a intenção persuasiva de um anúncio: ela o percebe como entretenimento. O resultado aparece na prática das famílias, em que o pedido insistente da criança, e não a escolha do adulto, decide a compra. O sociólogo Zygmunt Bauman, ao analisar a sociedade de consumo, lembra que o consumo deixa de ser meio e passa a funcionar como forma de pertencimento — e é esse deslocamento que a propaganda produz na infância.',
        destaques: [
          { trecho: 'Em primeiro lugar', tipo: 'conectivo', nota: 'Conectivo de ordenação + tópico frasal na sequência: o avaliador identifica de imediato a função do parágrafo.' },
          { trecho: 'até cerca de oito anos, a criança não reconhece a intenção persuasiva de um anúncio', tipo: 'argumento', nota: 'Argumento de autoridade (psicologia do desenvolvimento) com a informação explicada — não é citação solta.' },
          { trecho: 'o consumo deixa de ser meio e passa a funcionar como forma de pertencimento', tipo: 'repertorio', nota: 'Repertório sociológico produtivo: o conceito de Bauman é usado para explicar o efeito da propaganda, não como enfeite.' }
        ],
        analise: 'Note a estrutura interna: afirmação → comprovação → consequência no cotidiano → reforço teórico. Esse encadeamento é o que a Competência III chama de argumento “consistente e organizado”.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Demonstra que a autorregulação do setor é insuficiente.',
        texto: 'Além disso, a autorregulação do setor tem se mostrado insuficiente. A Resolução 163 do Conanda, de 2014, considera abusiva a publicidade dirigida à criança, mas o setor publicitário contesta sua aplicação e mantém práticas de merchandising em programas, embalagens e perfis de influenciadores mirins. Quando a norma depende da boa vontade de quem lucra com a prática, a proteção se converte em exceção. Nesse cenário, o discurso de que cabe à família controlar transfere ao indivíduo um problema que é coletivo e estrutural.',
        destaques: [
          { trecho: 'Além disso', tipo: 'conectivo', nota: 'Adição que sinaliza novo eixo — aqui, o institucional, diferente do cognitivo anterior.' },
          { trecho: 'A Resolução 163 do Conanda, de 2014, considera abusiva a publicidade dirigida à criança', tipo: 'repertorio', nota: 'Repertório preciso e atual em relação ao ano do exame: mostra leitura de mundo, não só de manual.' },
          { trecho: 'o discurso de que cabe à família controlar transfere ao indivíduo um problema que é coletivo e estrutural', tipo: 'argumento', nota: 'Autoria: antecipa o argumento contrário e o responde. É o tipo de movimento que separa 160 de 200 em C3.' }
        ],
        analise: 'O parágrafo não repete o anterior: sai do indivíduo e vai para a instituição. Essa mudança de plano (do cognitivo para o regulatório) é o que garante progressão real ao texto.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Retoma a tese e apresenta proposta completa, articulada aos dois eixos.',
        texto: 'Portanto, cabe ao Conanda, em parceria com o Ministério da Educação, restringir a veiculação de publicidade dirigida a menores de doze anos por meio de resolução vinculante e de fiscalização conjunta com o Ministério Público, a fim de preservar a infância da pressão comercial, visto que a autorregulação já demonstrou não sustentar essa proteção. Complementarmente, as escolas devem incluir a educação midiática no currículo, com projetos que ensinem a criança a reconhecer a intenção persuasiva dos anúncios, pois proteção duradoura exige também repertório crítico.',
        destaques: [
          { trecho: 'cabe ao Conanda, em parceria com o Ministério da Educação', tipo: 'proposta', nota: 'AGENTE nomeado e competente para o problema discutido — não é “o governo” genérico.' },
          { trecho: 'restringir a veiculação de publicidade dirigida a menores de doze anos por meio de resolução vinculante', tipo: 'proposta', nota: 'AÇÃO + MEIO instrumentais: a proposta ataca exatamente a falha apontada no desenvolvimento 2.' },
          { trecho: 'visto que a autorregulação já demonstrou não sustentar essa proteção', tipo: 'proposta', nota: 'DETALHAMENTO que remete ao argumento anterior: é isso que a Competência V chama de proposta “articulada à discussão”.' }
        ],
        analise: 'A segunda frase da conclusão recupera o eixo cognitivo do primeiro desenvolvimento (educação midiática). A proposta, portanto, responde aos dois argumentos — e não a um só. É o desenho clássico da nota 1000.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Registro formal, pontuação precisa e nenhum desvio recorrente — nível 5 do guia.' },
      { id: 'C2', nota: 200, comentario: 'Argumentação consistente com repertório produtivo: os três repertórios são explicados e servem ao recorte.' },
      { id: 'C3', nota: 200, comentario: 'Tese explícita, dois eixos organizados e resposta ao argumento contrário — autoria configurada.' },
      { id: 'C4', nota: 200, comentario: 'Recursos coesivos diversificados e bem empregados, com transições entre parágrafos.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, relacionada ao recorte e articulada aos dois argumentos.' }
    ]
  },
  {
    id: 'enem-2015',
    ano: 2015,
    temaId: 'enem-2015',
    tema: 'A persistência da violência contra a mulher na sociedade brasileira',
    comando: '“A persistência de...” exige explicar por que algo continua apesar das leis — o foco é a causa da continuidade.',
    nota: 1000,
    resumo: 'Um tema que costuma virar denúncia vira argumento: causa cultural (patriarcado) + falha institucional (rede de proteção desigual).',
    porQueMil: [
      'Responde ao comando “persistência”: não descreve a violência, explica o que a mantém.',
      'Contraste produtivo logo na abertura: marco legal de 2006 × números atuais.',
      'Repertório filosófico (Beauvoir) usado para explicar, não para decorar.',
      'Proposta com repasses condicionados — detalhamento viável e verificável.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Contrapõe a lei aos dados e enuncia a tese da persistência.',
        texto: 'A Lei Maria da Penha, de 2006, representou um marco ao tipificar a violência doméstica e criar mecanismos de proteção. Quase duas décadas depois, os números seguem alarmantes: o Anuário Brasileiro de Segurança Pública registra, a cada ano, centenas de milhares de agressões e milhares de feminicídios. A persistência do problema revela que a norma jurídica, sozinha, não desmonta a cultura que naturaliza o controle sobre o corpo e a vida das mulheres.',
        destaques: [
          { trecho: 'A Lei Maria da Penha, de 2006, representou um marco', tipo: 'repertorio', nota: 'Repertório legal específico do tema — o mais previsível e, por isso mesmo, o que precisa ser bem usado. Aqui ele serve de contraponto.' },
          { trecho: 'o Anuário Brasileiro de Segurança Pública registra, a cada ano, centenas de milhares de agressões', tipo: 'argumento', nota: 'Dado que sustenta a ideia de persistência: a lei existe, os casos continuam.' },
          { trecho: 'a norma jurídica, sozinha, não desmonta a cultura que naturaliza o controle sobre o corpo e a vida das mulheres', tipo: 'tese', nota: 'Tese que responde exatamente ao comando: o que persiste é a cultura, não a lei.' }
        ],
        analise: 'A introdução usa a estrutura “conquista legal → dado atual → tese da insuficiência”. É um modelo reutilizável para qualquer tema em que exista lei e prática divergentes.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Explica a raiz cultural da violência.',
        texto: 'Em primeiro lugar, a violência se sustenta em uma mentalidade que associa a mulher a um papel subalterno. A filósofa Simone de Beauvoir, em O Segundo Sexo, demonstra que o feminino é construído socialmente como o outro, o complementar — e é dessa hierarquia simbólica que nasce a ideia de que a mulher deve ser corrigida ou tutelada. Essa lógica aparece nos detalhes do cotidiano: no controle do dinheiro, na proibição de roupas, na desqualificação profissional. Quando a agressão é lida como desavença doméstica, o Estado chega tarde.',
        destaques: [
          { trecho: 'A filósofa Simone de Beauvoir, em O Segundo Sexo, demonstra que o feminino é construído socialmente', tipo: 'repertorio', nota: 'Repertório explicado em uma linha: o conceito é apresentado, não apenas o nome da autora.' },
          { trecho: 'no controle do dinheiro, na proibição de roupas, na desqualificação profissional', tipo: 'argumento', nota: 'Concretude: o argumento abstrato desce ao cotidiano em três exemplos encadeados.' },
          { trecho: 'Quando a agressão é lida como desavença doméstica, o Estado chega tarde', tipo: 'tese', nota: 'Arremate que reata o parágrafo à tese geral do texto.' }
        ],
        analise: 'O parágrafo evita o senso comum (“a sociedade é machista”) porque nomeia o mecanismo: a construção social do feminino como subalternidade. Nomear mecanismo é o que a banca chama de autoria.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Mostra a desigualdade territorial da rede de proteção.',
        texto: 'Além disso, a rede de proteção é desigualmente distribuída no território. Delegacias especializadas, casas-abrigo e equipes psicossociais concentram-se em capitais e em municípios de maior porte; em cidades pequenas, a vítima muitas vezes depende do mesmo delegado que conhece o agressor. Como consequência, a lei que prevê medida protetiva em quarenta e oito horas encontra filas, distâncias e falta de servidores. A proteção existe no papel e falha justamente onde a vulnerabilidade é maior.',
        destaques: [
          { trecho: 'a rede de proteção é desigualmente distribuída no território', tipo: 'argumento', nota: 'Segundo eixo de natureza institucional — não repete o cultural do parágrafo anterior.' },
          { trecho: 'a vítima muitas vezes depende do mesmo delegado que conhece o agressor', tipo: 'argumento', nota: 'Detalhe concreto que torna o problema visível sem precisar de dado numérico.' },
          { trecho: 'A proteção existe no papel e falha justamente onde a vulnerabilidade é maior', tipo: 'tese', nota: 'Fechamento que prepara a proposta: o que será atacado é a distribuição, não a lei.' }
        ],
        analise: 'Aqui está a chave do projeto de texto: eixo 1 = cultura (simbólico), eixo 2 = território (material). Dois planos diferentes sustentam a mesma tese.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe intervenção casada com os dois eixos.',
        texto: 'Portanto, cabe ao Ministério das Mulheres, em articulação com prefeituras e governos estaduais, ampliar a rede de casas-abrigo e de delegacias especializadas por meio de repasses condicionados à criação de equipes permanentes, a fim de tornar efetiva a proteção prevista na Lei Maria da Penha, visto que a vítima do interior não pode depender da sorte de morar perto de um serviço. Além disso, o Ministério da Educação deve incluir a educação para a igualdade de gênero na formação continuada de professores, pois a mudança cultural é a única capaz de interromper a reprodução da violência.',
        destaques: [
          { trecho: 'cabe ao Ministério das Mulheres, em articulação com prefeituras e governos estaduais', tipo: 'proposta', nota: 'Agente competente e em regime de cooperação — detalhe que demonstra conhecimento do federalismo.' },
          { trecho: 'por meio de repasses condicionados à criação de equipes permanentes', tipo: 'proposta', nota: 'MEIO verificável: diz de onde vem o recurso e qual é a contrapartida.' },
          { trecho: 'pois a mudança cultural é a única capaz de interromper a reprodução da violência', tipo: 'proposta', nota: 'Segunda frase que ataca o eixo cultural — a proposta articula-se aos dois argumentos.' }
        ],
        analise: 'A conclusão é o espelho do texto: primeiro resolve o institucional (eixo 2), depois o cultural (eixo 1). Essa simetria é um dos traços mais reconhecíveis da nota 1000.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Norma padrão preservada, inclusive em passagens de maior complexidade sintática.' },
      { id: 'C2', nota: 200, comentario: 'Repertório produtivo (lei, anuário, filosofia) a serviço da tese, sem desvio do recorte.' },
      { id: 'C3', nota: 200, comentario: 'Explica a persistência em dois planos, com autoria e sem contradição.' },
      { id: 'C4', nota: 200, comentario: 'Articulação consistente entre parágrafos e retomadas bem colocadas.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada e articulada aos dois eixos discutidos.' }
    ]
  },
  {
    id: 'enem-2016',
    ano: 2016,
    temaId: 'enem-2016',
    tema: 'Caminhos para combater a intolerância religiosa no Brasil',
    comando: '“Caminhos para combater” desloca o peso para a solução — mas a solução só é boa se o diagnóstico for preciso.',
    nota: 1000,
    resumo: 'Diagnóstico de duas causas (desconhecimento e laicidade mal compreendida) e proposta voltada a cada uma.',
    porQueMil: [
      'Interpreta o comando “caminhos”: os dois argumentos preparam as soluções apresentadas.',
      'Traz o recorte específico do tema: religiões de matriz africana, e não “religião” em geral.',
      'Usa conceito histórico (Lélia Gonzalez) para explicar por que a intolerância é também racismo.',
      'A proposta usa instrumento legal existente (Lei 10.639), o que a torna viável de imediato.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Contrapõe a garantia constitucional à prática e delimita o recorte.',
        texto: 'A Constituição de 1988 assegura, no artigo 5º, a liberdade de crença e a proteção aos cultos. Ainda assim, terreiros de candomblé e de umbanda são, todos os anos, alvo de invasões, depredações e ofensas em cidades brasileiras. Esse contraste mostra que a intolerância religiosa no país não é episódica, mas estrutural: ela atinge especialmente as religiões de matriz africana, revelando que, sob o argumento da fé, reproduz-se o racismo.',
        destaques: [
          { trecho: 'A Constituição de 1988 assegura, no artigo 5º, a liberdade de crença', tipo: 'repertorio', nota: 'Base legal direta do tema, citada com o artigo — precisão que conta como domínio de repertório.' },
          { trecho: 'terreiros de candomblé e de umbanda são, todos os anos, alvo de invasões', tipo: 'problema', nota: 'Recorte definido: o alvo real da intolerância no Brasil são as religiões de matriz africana.' },
          { trecho: 'sob o argumento da fé, reproduz-se o racismo', tipo: 'tese', nota: 'Tese que liga intolerância e racismo — análise, não constatação.' }
        ],
        analise: 'A introdução é curta e certeira: norma, prática, tese. Não perde linha com generalidades sobre “respeito às diferenças”.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Explica a intolerância pelo desconhecimento e pelo racismo religioso.',
        texto: 'Em primeiro lugar, a intolerância se alimenta do desconhecimento. A historiadora Lélia Gonzalez mostrou que a herança africana foi tratada, na formação brasileira, como folclore, e não como sistema de pensamento. Nesse vácuo de informação, o culto de matriz africana é associado ao mal, e a violência ganha justificativa moral. O ataque a imagens religiosas em praça pública, registrado em diferentes capitais, não é apenas vandalismo: é a tentativa de apagar uma memória.',
        destaques: [
          { trecho: 'A historiadora Lélia Gonzalez mostrou que a herança africana foi tratada como folclore', tipo: 'repertorio', nota: 'Repertório que constrói a explicação em vez de enfeitá-la — o conceito é usado para interpretar o fato.' },
          { trecho: 'Nesse vácuo de informação, o culto de matriz africana é associado ao mal', tipo: 'argumento', nota: 'Relação de causa explícita: desconhecimento produz preconceito.' },
          { trecho: 'não é apenas vandalismo: é a tentativa de apagar uma memória', tipo: 'tese', nota: 'Releitura autoral de um fato: o mesmo dado ganha outro sentido. Marca forte de C3 nível 5.' }
        ],
        analise: 'O parágrafo interpreta um fato, e não apenas o relata. Essa diferença entre relatar e interpretar é o que o guia chama de “configurando autoria”.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Mostra o mal-entendido sobre laicidade do Estado.',
        texto: 'Além disso, a laicidade do Estado é frequentemente mal compreendida. Parte da sociedade interpreta laicidade como silenciamento da religião, e não como garantia de convivência entre todas. O resultado aparece em escolas que tratam uma crença como padrão e as demais como exceção, e em políticas públicas que ignoram calendários e demandas de minorias religiosas. A liberdade de culto, nesse cenário, fica restrita ao espaço privado — e uma liberdade que só existe escondida não é liberdade.',
        destaques: [
          { trecho: 'a laicidade do Estado é frequentemente mal compreendida', tipo: 'argumento', nota: 'Segundo eixo: institucional-simbólico. Não repete o “desconhecimento” do parágrafo anterior, embora dialogue com ele.' },
          { trecho: 'escolas que tratam uma crença como padrão e as demais como exceção', tipo: 'argumento', nota: 'Exemplo institucional concreto: a escola é onde o padrão cultural se reproduz.' },
          { trecho: 'uma liberdade que só existe escondida não é liberdade', tipo: 'tese', nota: 'Síntese autoral que fecha o parágrafo com força — e prepara a proposta de tornar o direito exercível.' }
        ],
        analise: 'A frase final é o tipo de formulação que alunos chamam de “frase de efeito”, mas aqui ela tem função: é conclusão lógica do raciocínio, não ornamento.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe caminhos concretos ligados às duas causas.',
        texto: 'Portanto, cabe ao Ministério da Educação, em parceria com as secretarias estaduais, incluir o ensino da história das religiões de matriz africana na formação de professores e nos materiais didáticos, por meio da efetivação da Lei 10.639, a fim de substituir o preconceito pelo conhecimento, visto que a intolerância se sustenta na ignorância sobre o outro. Ademais, o Ministério Público deve criar canais específicos de denúncia com acolhimento jurídico, pois a proteção legal só inibe a violência quando é acessível a quem a sofre.',
        destaques: [
          { trecho: 'por meio da efetivação da Lei 10.639', tipo: 'proposta', nota: 'MEIO: usa um instrumento que já existe — solução viável, não utópica.' },
          { trecho: 'visto que a intolerância se sustenta na ignorância sobre o outro', tipo: 'proposta', nota: 'DETALHAMENTO que remete ao desenvolvimento 1: a proposta conversa com o diagnóstico.' },
          { trecho: 'o Ministério Público deve criar canais específicos de denúncia', tipo: 'proposta', nota: 'Segundo agente para o segundo eixo — manutenção da simetria entre argumento e intervenção.' }
        ],
        analise: 'Quando o tema pede “caminhos”, a conclusão precisa ser a parte mais forte. Aqui ela ocupa seis linhas e cobre os dois diagnósticos.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Domínio pleno da norma, com escolhas de registro adequadas ao texto argumentativo.' },
      { id: 'C2', nota: 200, comentario: 'Tema desenvolvido com repertório produtivo em todos os parágrafos.' },
      { id: 'C3', nota: 200, comentario: 'Dois eixos com autoria e interpretação de fatos, não apenas relato.' },
      { id: 'C4', nota: 200, comentario: 'Diversidade de recursos coesivos e transições claras.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, viável e articulada à discussão.' }
    ]
  },
  {
    id: 'enem-2017',
    ano: 2017,
    temaId: 'enem-2017',
    tema: 'Desafios para a formação educacional de surdos no Brasil',
    comando: '“Desafios para” pede obstáculos concretos — e a proposta deve removê-los, um por um.',
    nota: 1000,
    resumo: 'Separa dois obstáculos (formação docente e oferta de intérpretes) e mostra que a inclusão tem sido formal, não real.',
    porQueMil: [
      'A tese distingue inclusão formal de inclusão real — leitura sofisticada do tema.',
      'Cada desenvolvimento nomeia um obstáculo específico e verificável.',
      'Usa Vygotsky para explicar por que a língua é questão cognitiva, não apenas de acessibilidade.',
      'Proposta com dois órgãos e duas medidas simétricas aos desafios apresentados.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Contrapõe reconhecimento legal e realidade escolar.',
        texto: 'A Lei 10.436, de 2002, reconheceu a Língua Brasileira de Sinais como meio legal de comunicação, e o Decreto 5.626 tornou obrigatória sua presença na educação. Passadas duas décadas, porém, estudantes surdos ainda enfrentam salas sem intérpretes e professores sem formação em Libras. A inclusão, portanto, tem sido mais formal que real: o direito está escrito, mas a escola não foi reorganizada para receber quem aprende por outra língua.',
        destaques: [
          { trecho: 'A Lei 10.436, de 2002, reconheceu a Língua Brasileira de Sinais', tipo: 'repertorio', nota: 'Dois dispositivos legais precisos (lei e decreto) na mesma frase: densidade de repertório sem excesso de linhas.' },
          { trecho: 'estudantes surdos ainda enfrentam salas sem intérpretes e professores sem formação em Libras', tipo: 'problema', nota: 'Os dois desafios que serão desenvolvidos já anunciados na introdução — projeto de texto visível.' },
          { trecho: 'A inclusão tem sido mais formal que real', tipo: 'tese', nota: 'Tese em contraste, fácil de sustentar e de retomar na conclusão.' }
        ],
        analise: 'Repare que a introdução já entrega o roteiro: obstáculo 1 (professores) e obstáculo 2 (intérpretes). O leitor sabe exatamente o que vem depois.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Obstáculo 1 — formação de professores.',
        texto: 'Em primeiro lugar, a formação docente não acompanha a lei. A maior parte dos cursos de licenciatura dedica carga horária mínima ou nula ao ensino de Libras, e o professor que recebe um estudante surdo tende a reproduzir estratégias pensadas para ouvintes. Como a linguagem é a base do desenvolvimento cognitivo, conforme demonstrou Vygotsky ao tratar da mediação simbólica, a ausência de uma língua compartilhada não é um detalhe pedagógico: é uma barreira de aprendizagem.',
        destaques: [
          { trecho: 'A maior parte dos cursos de licenciatura dedica carga horária mínima ou nula ao ensino de Libras', tipo: 'argumento', nota: 'Obstáculo nomeado com precisão — não é “falta de preparo” genérica, é a estrutura curricular.' },
          { trecho: 'conforme demonstrou Vygotsky ao tratar da mediação simbólica', tipo: 'repertorio', nota: 'Repertório teórico que muda o patamar do argumento: sem língua comum, há prejuízo cognitivo.' },
          { trecho: 'não é um detalhe pedagógico: é uma barreira de aprendizagem', tipo: 'argumento', nota: 'Reenquadramento: o leitor passa a ver o problema em outra escala.' }
        ],
        analise: 'O parágrafo explica por que o obstáculo existe (currículo das licenciaturas) e qual é o seu efeito (barreira cognitiva). Obstáculo sem explicação seria apenas queixa.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Obstáculo 2 — insuficiência e má distribuição de intérpretes.',
        texto: 'Além disso, a oferta de intérpretes é insuficiente e concentrada. Municípios pequenos frequentemente recorrem a um único profissional para atender várias escolas, o que fragmenta o processo e isola o estudante. A Declaração de Salamanca, referência internacional em educação inclusiva, defende que a escola deve se adaptar ao aluno, e não o contrário. No Brasil, porém, a adaptação costuma recair sobre o próprio surdo, que precisa disputar espaço para ter acesso ao conteúdo.',
        destaques: [
          { trecho: 'um único profissional para atender várias escolas', tipo: 'argumento', nota: 'Dado de realidade que torna o obstáculo visível sem depender de estatística.' },
          { trecho: 'A Declaração de Salamanca, referência internacional em educação inclusiva', tipo: 'repertorio', nota: 'Repertório de matriz internacional, bem pertinente ao tema da inclusão.' },
          { trecho: 'a adaptação costuma recair sobre o próprio surdo', tipo: 'tese', nota: 'Inversão argumentativa: quem deveria ser incluído é quem se adapta. Autoria clara.' }
        ],
        analise: 'O eixo não repete o anterior: fala de oferta e distribuição, não de formação. E o fecho inverte a lógica da inclusão — movimento argumentativo que a banca valoriza.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe medidas simétricas aos dois obstáculos.',
        texto: 'Portanto, cabe ao Ministério da Educação incluir a Libras como componente obrigatório nas licenciaturas e realizar concursos específicos para intérpretes educacionais por meio de editais federais e de apoio técnico aos municípios, a fim de garantir aprendizagem efetiva e não apenas matrícula, visto que presença sem comunicação não é inclusão. Além disso, as escolas devem adotar o modelo bilíngue, com Libras como primeira língua e o português escrito como segunda, pois é a língua que organiza o pensamento e sustenta a autonomia do estudante.',
        destaques: [
          { trecho: 'incluir a Libras como componente obrigatório nas licenciaturas e realizar concursos específicos para intérpretes', tipo: 'proposta', nota: 'Duas ações que respondem, cada uma, a um obstáculo desenvolvido.' },
          { trecho: 'por meio de editais federais e de apoio técnico aos municípios', tipo: 'proposta', nota: 'MEIO institucional: define o instrumento e o ente responsável pela execução.' },
          { trecho: 'presença sem comunicação não é inclusão', tipo: 'proposta', nota: 'DETALHAMENTO conceitual que fecha o raciocínio iniciado na tese (“formal x real”).' }
        ],
        analise: 'A retomada da oposição “formal x real”, agora como “presença x comunicação”, dá ao texto o acabamento que os avaliadores descrevem como “articulado à discussão”.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Escrita formal sem desvios recorrentes.' },
      { id: 'C2', nota: 200, comentario: 'Repertório legal e teórico produtivo, com o recorte mantido do começo ao fim.' },
      { id: 'C3', nota: 200, comentario: 'Dois obstáculos tratados com autoria, sem repetição entre parágrafos.' },
      { id: 'C4', nota: 200, comentario: 'Conectivos diversificados e retomadas bem construídas.' },
      { id: 'C5', nota: 200, comentario: 'Proposta completa e simétrica aos desafios apresentados.' }
    ]
  },
  {
    id: 'enem-2018',
    ano: 2018,
    temaId: 'enem-2018',
    tema: 'Manipulação do comportamento do usuário pelo controle de dados na internet',
    comando: 'A relação de poder é o recorte: quem controla os dados conduz o comportamento. Não é “uso da internet”.',
    nota: 1000,
    resumo: 'Explica o modelo de negócio dos dados e o efeito das bolhas sobre a democracia — dois eixos que se completam.',
    porQueMil: [
      'Recorta corretamente: manipulação pelo controle de dados, não “uso excessivo da internet”.',
      'Abre com fato histórico verificável (Cambridge Analytica), o que dá concretude ao tema abstrato.',
      'Conceito de “infocracia” transforma um tema técnico em argumento político.',
      'A proposta ataca a opacidade (auditoria) e a formação do usuário (educação digital).'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Fato histórico + definição do recorte + tese.',
        texto: 'Em 2018, o escândalo da Cambridge Analytica revelou que dados de milhões de usuários haviam sido usados para direcionar mensagens políticas e influenciar eleições. O episódio não foi uma falha isolada, mas a exposição de um modelo de negócios que transforma comportamento em previsão. Nesse cenário, a manipulação do usuário não decorre do uso da internet em si, mas da assimetria entre quem controla os dados e quem sequer sabe que eles são coletados.',
        destaques: [
          { trecho: 'Em 2018, o escândalo da Cambridge Analytica revelou', tipo: 'repertorio', nota: 'Repertório atual e diretamente ligado ao recorte — fato, não opinião.' },
          { trecho: 'um modelo de negócios que transforma comportamento em previsão', tipo: 'argumento', nota: 'Nomeia o mecanismo econômico: é isso que separa a análise do senso comum.' },
          { trecho: 'não decorre do uso da internet em si, mas da assimetria entre quem controla os dados', tipo: 'tese', nota: 'Tese que delimita o recorte e evita o tangenciamento mais comum do tema.' }
        ],
        analise: 'A introdução faz o que o tema exige: diferencia “internet” de “controle de dados”. Quem não faz essa distinção tangencia — e perde até 160 pontos em três competências.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Explica como o comportamento se converte em mercadoria.',
        texto: 'Em primeiro lugar, o rastro deixado por cada clique é convertido em mercadoria. Plataformas registram preferências, deslocamentos e tempo de leitura e os utilizam para prever reações, oferecendo previsibilidade a anunciantes e a campanhas políticas. O filósofo Byung-Chul Han chama de infocracia esse arranjo em que a informação, mais do que convencer, conduz sem que o indivíduo perceba. É uma forma de poder que dispensa a coerção: basta ajustar o que cada um vê.',
        destaques: [
          { trecho: 'o rastro deixado por cada clique é convertido em mercadoria', tipo: 'argumento', nota: 'Tópico frasal claro e concreto — abstração virou imagem.' },
          { trecho: 'oferecendo previsibilidade a anunciantes e a campanhas políticas', tipo: 'argumento', nota: 'Explica para quem o dado tem valor: sem essa resposta, o argumento não se sustenta.' },
          { trecho: 'É uma forma de poder que dispensa a coerção: basta ajustar o que cada um vê', tipo: 'tese', nota: 'Síntese autoral que transporta o conceito de Han para o caso brasileiro.' }
        ],
        analise: 'O parágrafo mostra o caminho completo: dado → previsão → condução. Cada etapa é explicada, o que caracteriza o repertório produtivo descrito no guia.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Mostra o efeito das bolhas sobre o debate público.',
        texto: 'Além disso, a personalização fragmenta o debate público. Algoritmos que priorizam engajamento tendem a reforçar o que o usuário já acredita, isolando-o em bolhas de confirmação. A consequência é política: a sociedade perde a experiência do dissenso, e informações falsas circulam com aparência de evidência. A Lei Geral de Proteção de Dados, de 2018, reconhece o problema, mas depende de fiscalização efetiva, ainda frágil no país.',
        destaques: [
          { trecho: 'Algoritmos que priorizam engajamento tendem a reforçar o que o usuário já acredita', tipo: 'argumento', nota: 'Explica o funcionamento técnico em linguagem clara — e sem simplificar demais.' },
          { trecho: 'a sociedade perde a experiência do dissenso', tipo: 'argumento', nota: 'Consequência coletiva: o argumento sai do indivíduo e chega à democracia.' },
          { trecho: 'A Lei Geral de Proteção de Dados, de 2018, reconhece o problema, mas depende de fiscalização efetiva', tipo: 'repertorio', nota: 'Repertório legal que já prepara a proposta: o texto mostra onde a lei para.' }
        ],
        analise: 'O eixo 2 muda de plano: do econômico (D1) para o democrático. É essa mudança que garante progressão em vez de repetição.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe transparência e formação do usuário.',
        texto: 'Portanto, cabe à Autoridade Nacional de Proteção de Dados exigir transparência algorítmica das plataformas por meio de auditorias periódicas e de multas proporcionais ao faturamento, a fim de tornar visível o modo como o comportamento é conduzido, visto que só se protege o que se pode enxergar. Ademais, o Ministério da Educação deve inserir a educação digital na base curricular, com projetos de análise de algoritmos, pois o usuário informado é o único capaz de resistir à manipulação.',
        destaques: [
          { trecho: 'exigir transparência algorítmica das plataformas por meio de auditorias periódicas', tipo: 'proposta', nota: 'AÇÃO + MEIO técnicos: atacam a opacidade apontada no desenvolvimento 1.' },
          { trecho: 'multas proporcionais ao faturamento', tipo: 'proposta', nota: 'Detalhe que mostra viabilidade e eficácia — proporcionalidade é critério real de regulação.' },
          { trecho: 'o usuário informado é o único capaz de resistir à manipulação', tipo: 'proposta', nota: 'FINALIDADE + DETALHAMENTO, ligando a proposta ao eixo das bolhas.' }
        ],
        analise: 'Proposta em dois movimentos (regulação e educação) que espelham os dois desenvolvimentos. Estrutura idêntica à das demais notas 1000.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Escrita formal precisa, inclusive no vocabulário técnico.' },
      { id: 'C2', nota: 200, comentario: 'Repertório atual (fato, conceito filosófico, lei) sempre produtivo.' },
      { id: 'C3', nota: 200, comentario: 'Recorte mantido, dois eixos consistentes, autoria evidente.' },
      { id: 'C4', nota: 200, comentario: 'Coesão variada, com transições explícitas entre os eixos.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, viável e articulada à argumentação.' }
    ]
  },
  {
    id: 'enem-2019',
    ano: 2019,
    temaId: 'enem-2019',
    tema: 'Democratização do acesso ao cinema no Brasil',
    comando: '“Democratização do acesso” exige nomear as barreiras — e não elogiar o objeto cultural.',
    nota: 1000,
    resumo: 'Barreira territorial + barreira econômica, com repertório de geografia e de teoria da cultura.',
    porQueMil: [
      'Não cai na armadilha de falar da importância do cinema: fala das barreiras de acesso.',
      'Dois eixos claros: território (onde há sala) e renda/hábito (quem pode ir).',
      'Milton Santos e Antonio Candido são usados com função argumentativa precisa.',
      'Proposta com editais, cineclubes e escola — medidas que reduzem barreiras específicas.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Direito cultural + dado de concentração + tese das duas barreiras.',
        texto: 'O artigo 215 da Constituição define a cultura como direito de todos, e a Ancine mantém programas de fomento à produção nacional. Ainda assim, o acesso ao cinema segue concentrado: a maior parte das salas está em centros comerciais de grandes cidades, e mais de um terço dos municípios não possui exibição regular. A democratização do acesso, portanto, não se resolve apenas com incentivo à produção, mas com políticas que enfrentem duas barreiras concretas: o território e o preço.',
        destaques: [
          { trecho: 'O artigo 215 da Constituição define a cultura como direito de todos', tipo: 'repertorio', nota: 'Repertório constitucional pertinente: fundamenta o direito ao cinema como direito cultural.' },
          { trecho: 'mais de um terço dos municípios não possui exibição regular', tipo: 'argumento', nota: 'Dado que transforma uma impressão em problema mensurável.' },
          { trecho: 'duas barreiras concretas: o território e o preço', tipo: 'tese', nota: 'Tese que já anuncia a divisão dos dois desenvolvimentos — projeto de texto transparente.' }
        ],
        analise: 'A introdução distingue produção de acesso — distinção que evita o lugar-comum de elogiar o cinema nacional sem discutir quem consegue vê-lo.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Barreira territorial, com base geográfica.',
        texto: 'Em primeiro lugar, a oferta é organizada pela lógica do mercado, e não do direito. O geógrafo Milton Santos mostrou que o espaço se distribui conforme o poder econômico, criando circuitos privilegiados e áreas desprovidas de serviços. Periferias e cidades pequenas ficam fora desses circuitos: sem sala, sem cineclube, sem formação de público. O resultado é que o filme brasileiro é debatido em festivais, mas não chega a quem poderia reconhecer ali a própria experiência.',
        destaques: [
          { trecho: 'O geógrafo Milton Santos mostrou que o espaço se distribui conforme o poder econômico', tipo: 'repertorio', nota: 'Repertório de outra área do conhecimento aplicado ao tema cultural — exatamente o que C2 valoriza.' },
          { trecho: 'sem sala, sem cineclube, sem formação de público', tipo: 'argumento', nota: 'Enumeração ritmada que mostra a cadeia de consequências da ausência de oferta.' },
          { trecho: 'não chega a quem poderia reconhecer ali a própria experiência', tipo: 'tese', nota: 'Fecho que dá dimensão simbólica ao argumento territorial.' }
        ],
        analise: 'O parágrafo conjuga geografia e cultura: a exclusão territorial explica a exclusão simbólica. Essa ponte entre áreas é o repertório interdisciplinar que o guia pede.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Barreira econômica e formação de hábito.',
        texto: 'Além disso, o preço e a falta de repertório se reforçam mutuamente. Para uma família de renda baixa, o ingresso somado ao transporte e à alimentação deixa de ser lazer acessível e passa a ser despesa excepcional. Como lembra Antonio Candido, a literatura — e, por extensão, a arte — é um direito, e não um produto de luxo. Sem acesso, não se forma hábito; sem hábito, a demanda não pressiona a oferta, e a exclusão cultural se naturaliza.',
        destaques: [
          { trecho: 'o ingresso somado ao transporte e à alimentação deixa de ser lazer acessível', tipo: 'argumento', nota: 'Cálculo concreto: mostra que o preço não é só o ingresso, e sim o custo total do programa.' },
          { trecho: 'Como lembra Antonio Candido, a literatura — e, por extensão, a arte — é um direito', tipo: 'repertorio', nota: 'Extensão argumentativa legítima: aplica o conceito de Candido à arte sem distorcer o original.' },
          { trecho: 'sem hábito, a demanda não pressiona a oferta, e a exclusão cultural se naturaliza', tipo: 'tese', nota: 'Círculo vicioso explicado em uma frase — leitura analítica, não descritiva.' }
        ],
        analise: 'O eixo 2 não repete o eixo 1: lá era oferta, aqui é renda e hábito. Juntos, explicam por que o acesso não é democrático mesmo quando existe sala.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe medidas que atacam as duas barreiras.',
        texto: 'Portanto, cabe ao Ministério da Cultura, em parceria com prefeituras, financiar cineclubes e salas itinerantes em municípios sem exibição por meio de editais condicionados à formação de público, a fim de levar o audiovisual nacional às periferias e ao interior, visto que a ausência de sala não se resolve apenas com produção. Ademais, as escolas devem manter sessões comentadas com a filmografia brasileira, pois o hábito cultural se constrói pela experiência repetida, e não pelo anúncio.',
        destaques: [
          { trecho: 'financiar cineclubes e salas itinerantes em municípios sem exibição', tipo: 'proposta', nota: 'AÇÃO que responde diretamente à barreira territorial.' },
          { trecho: 'por meio de editais condicionados à formação de público', tipo: 'proposta', nota: 'MEIO com contrapartida: não basta distribuir recurso, exige-se formação de público.' },
          { trecho: 'o hábito cultural se constrói pela experiência repetida, e não pelo anúncio', tipo: 'proposta', nota: 'DETALHAMENTO que dialoga com o círculo vicioso do desenvolvimento 2.' }
        ],
        analise: 'A conclusão fecha o raciocínio do texto: primeiro a oferta (território), depois o hábito (escola). Simetria perfeita com os dois desenvolvimentos.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Domínio pleno, com vocabulário preciso e períodos bem pontuados.' },
      { id: 'C2', nota: 200, comentario: 'Repertório de áreas distintas (geografia, direito, teoria literária), sempre produtivo.' },
      { id: 'C3', nota: 200, comentario: 'Barreiras distintas e autoria na interpretação dos dados.' },
      { id: 'C4', nota: 200, comentario: 'Articulação consistente com transições explícitas.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada e articulada às duas barreiras discutidas.' }
    ]
  }
];
