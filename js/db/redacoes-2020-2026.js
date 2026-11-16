/**
 * REDAÇÕES ANALISADAS — 2020 a 2026 (+ diagnósticos de erro)
 * Modelos didáticos no padrão nota 1000, um por tema oficial.
 */

export const REDACOES_2020_2026 = [
  {
    id: 'enem-2020',
    ano: 2020,
    temaId: 'enem-2020',
    tema: 'O estigma associado às doenças mentais na sociedade brasileira',
    comando: '“Estigma associado a” recorta o julgamento social, não a doença em si.',
    nota: 1000,
    resumo: 'O texto separa o estigma social (silenciamento) do estigma institucional (rede de cuidado insuficiente).',
    porQueMil: [
      'Mantém o recorte: fala do preconceito, não do diagnóstico ou do tratamento.',
      'Reforma psiquiátrica entra como repertório que explica o modelo de cuidado, não como citação decorativa.',
      'Efeito em cadeia explicado: estigma → silêncio → adiamento do tratamento.',
      'Proposta em dois níveis: serviço (CAPS/atenção básica) e cultura (escola).'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Marca legal, virada para a realidade e tese do silenciamento.',
        texto: 'A Lei 10.216, de 2001, redirecionou o cuidado em saúde mental no Brasil ao substituir o isolamento manicomial por serviços de base comunitária. Duas décadas depois, o estigma segue funcionando como barreira: falar de sofrimento psíquico ainda é tratado como sinal de fraqueza. Esse silêncio não é apenas cultural, pois adia o diagnóstico, esvazia a busca por tratamento e reproduz o preconceito dentro do próprio sistema de saúde.',
        destaques: [
          { trecho: 'A Lei 10.216, de 2001, redirecionou o cuidado em saúde mental', tipo: 'repertorio', nota: 'Repertório legal central do tema, e o verbo “redirecionou” mostra que se sabe o que a lei mudou.' },
          { trecho: 'falar de sofrimento psíquico ainda é tratado como sinal de fraqueza', tipo: 'problema', nota: 'O estigma é definido em uma imagem concreta, sem jargão.' },
          { trecho: 'Esse silêncio não é apenas cultural, pois adia o diagnóstico', tipo: 'tese', nota: 'Tese com efeito em cadeia: o silêncio tem consequência sanitária, não só moral.' }
        ],
        analise: 'A introdução recorta o tema com precisão: o problema não é a doença mental, é o estigma que produz silêncio. Essa delimitação é o que evita a fuga ao recorte.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Explica o silenciamento social e seu custo sanitário.',
        texto: 'Em primeiro lugar, o estigma silencia o sofrimento e torna o problema invisível. Quem teme ser chamado de desequilibrado evita relatar sintomas, e o adoecimento se amplia na clandestinidade. A Organização Mundial da Saúde estima que os transtornos mentais respondem por parcela expressiva dos anos vividos com incapacidade, e no Brasil a depressão aparece entre as principais causas de afastamento do trabalho. O filósofo Michel Foucault, ao historiar a exclusão da loucura, mostrou que a sociedade tende a afastar o que não compreende, e o estigma é a versão contemporânea desse afastamento.',
        destaques: [
          { trecho: 'Quem teme ser chamado de desequilibrado evita relatar sintomas', tipo: 'argumento', nota: 'Mecanismo do estigma demonstrado em uma frase: o preconceito produz ocultamento.' },
          { trecho: 'A Organização Mundial da Saúde estima que os transtornos mentais respondem por parcela expressiva dos anos vividos com incapacidade', tipo: 'repertorio', nota: 'Dado internacional que dá escala ao argumento sem desviar do recorte.' },
          { trecho: 'o estigma é a versão contemporânea desse afastamento', tipo: 'tese', nota: 'Apropriação produtiva de Foucault: o conceito histórico é atualizado para o problema do texto.' }
        ],
        analise: 'Aqui está o padrão de excelência em repertório: primeiro o argumento, depois o dado, depois o conceito. Quando o conceito vem por último, ele interpreta; quando vem primeiro, costuma enfeitar.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Mostra que o preconceito alcança o modelo de cuidado.',
        texto: 'Além disso, o preconceito alcança o modelo de cuidado. A Reforma Psiquiátrica criou os Centros de Atenção Psicossocial, mas a rede é insuficiente e desigualmente distribuída. Quando o serviço falta, o sofrimento é lido como caso de polícia ou de família, e não como questão de saúde. O resultado aparece na dificuldade de acesso a psicólogos na atenção básica, sobretudo entre jovens, e no retorno de práticas de internação prolongada que a lei pretendia superar.',
        destaques: [
          { trecho: 'A Reforma Psiquiátrica criou os Centros de Atenção Psicossocial, mas a rede é insuficiente', tipo: 'repertorio', nota: 'O repertório sustenta a crítica: a política existe, a cobertura não.' },
          { trecho: 'o sofrimento é lido como caso de polícia ou de família, e não como questão de saúde', tipo: 'argumento', nota: 'Interpretação do efeito institucional do estigma, não é constatação, é análise.' },
          { trecho: 'no retorno de práticas de internação prolongada que a lei pretendia superar', tipo: 'argumento', nota: 'Contradição entre lei e prática: forte indício de autoria para C3.' }
        ],
        analise: 'O eixo 2 sai do indivíduo e vai para a instituição: a mesma lógica de preconceito opera na política pública. Dois planos, um só problema, estrutura típica de nota 1000.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe serviço e cultura, espelhando os dois eixos.',
        texto: 'Portanto, cabe ao Ministério da Saúde ampliar a rede de Centros de Atenção Psicossocial e a oferta de psicólogos na atenção básica por meio de repasses vinculados a metas de cobertura, a fim de transformar o cuidado em saúde mental em serviço acessível, visto que o estigma se fortalece quando o atendimento não existe. Ademais, o Ministério da Educação deve incluir o letramento em saúde mental no currículo escolar, com rodas de conversa mediadas por profissionais, pois falar do assunto com naturalidade é o primeiro passo para romper o silêncio.',
        destaques: [
          { trecho: 'ampliar a rede de Centros de Atenção Psicossocial e a oferta de psicólogos na atenção básica', tipo: 'proposta', nota: 'AÇÃO precisa, coerente com o que a Reforma Psiquiátrica prevê.' },
          { trecho: 'por meio de repasses vinculados a metas de cobertura', tipo: 'proposta', nota: 'MEIO institucional: define instrumento de financiamento e critério de êxito.' },
          { trecho: 'falar do assunto com naturalidade é o primeiro passo para romper o silêncio', tipo: 'proposta', nota: 'DETALHAMENTO que retoma a tese do silenciamento, proposta articulada à discussão.' }
        ],
        analise: 'Proposta econômica e cultural: uma frase para cada eixo. Fechamento que repete a palavra “silêncio”, amarrando o texto do início ao fim.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Norma padrão e registro formal mantidos em todo o texto.' },
      { id: 'C2', nota: 200, comentario: 'Repertório legal, epidemiológico e filosófico, todos produtivos.' },
      { id: 'C3', nota: 200, comentario: 'Recorte preservado, dois eixos e autoria na interpretação.' },
      { id: 'C4', nota: 200, comentario: 'Recursos coesivos diversificados e transições consistentes.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, viável e articulada aos dois argumentos.' }
    ]
  },
  {
    id: 'enem-2021',
    ano: 2021,
    temaId: 'enem-2021',
    tema: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
    comando: '“Invisibilidade e garantia de acesso” exige mostrar o que a falta do documento impede, e como garantir.',
    nota: 1000,
    resumo: 'Trata a ausência de registro como negação de existência jurídica, com dados, filosofia e literatura.',
    porQueMil: [
      'Transforma um tema aparentemente burocrático em problema de cidadania.',
      'Repertório incomum e bem articulado: Arendt e Carolina Maria de Jesus no mesmo parágrafo.',
      'Explica o elo entre sub-registro e ausência de política pública (estatística).',
      'Proposta com busca ativa, o oposto de esperar a população procurar o cartório.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Dado de sub-registro + ressignificação do documento + tese.',
        texto: 'O Instituto Brasileiro de Geografia e Estatística estima que milhares de crianças não são registradas no prazo legal, e o país carrega uma dívida histórica de pessoas sem certidão de nascimento. O documento não é uma formalidade: é a condição para existir juridicamente e acessar escola, programa social e atendimento de saúde. A invisibilidade, portanto, não é uma metáfora, pois tem nome, tem endereço e não aparece nos registros que orientam as políticas públicas.',
        destaques: [
          { trecho: 'milhares de crianças não são registradas no prazo legal', tipo: 'repertorio', nota: 'Dado institucional que dá base ao problema, e o IBGE é fonte legitimada.' },
          { trecho: 'O documento não é uma formalidade: é a condição para existir juridicamente', tipo: 'tese', nota: 'Ressignificação: tira o tema do terreno administrativo e o coloca no da cidadania.' },
          { trecho: 'A invisibilidade não é uma metáfora, pois tem nome, tem endereço', tipo: 'argumento', nota: 'Formulação de autoria que dá concretude ao substantivo abstrato do tema.' }
        ],
        analise: 'A introdução pega a palavra-chave do tema (“invisibilidade”) e a define de modo próprio. Definir o conceito central é um dos movimentos mais valorizados em C3.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Mostra que quem não é registrado não é contado, e por isso não é atendido.',
        texto: 'Em primeiro lugar, quem não tem registro não é contado, e o que não é contado não entra na política pública. Hannah Arendt lembrou que todo indivíduo tem direito a ter direitos, o que começa pelo reconhecimento legal da própria existência. No caso brasileiro, a ausência de estatística impede o dimensionamento da demanda por creches, vagas escolares e benefícios, de modo que a exclusão documental se converte em omissão do Estado. Carolina Maria de Jesus, em Quarto de Despejo, descreve em primeira pessoa o que significa viver à margem dos cadastros e das políticas.',
        destaques: [
          { trecho: 'quem não tem registro não é contado, e o que não é contado não entra na política pública', tipo: 'argumento', nota: 'Tópico frasal que estabelece a cadeia causal central do texto.' },
          { trecho: 'Hannah Arendt lembrou que todo indivíduo tem direito a ter direitos', tipo: 'repertorio', nota: 'Repertório filosófico clássico aplicado com precisão, a cidadania começa pelo reconhecimento.' },
          { trecho: 'Carolina Maria de Jesus, em Quarto de Despejo', tipo: 'repertorio', nota: 'Repertório literário brasileiro que dá rosto humano ao argumento estatístico.' }
        ],
        analise: 'Dois repertórios de naturezas distintas (filosofia e literatura) sustentam a mesma tese. Isso demonstra “aplicação de conceitos de várias áreas do conhecimento”, expressão literal da matriz.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Expõe as barreiras concretas de acesso ao registro.',
        texto: 'Além disso, as barreiras para quem cresceu sem documento são burocráticas e geográficas. Mutirões de registro alcançam parte da população, mas a gratuidade exige presença física e documentos que muitos não possuem. Em regiões rurais e entre povos tradicionais, a distância até o cartório é o primeiro obstáculo; depois vêm exigências desproporcionais e a falta de informação sobre o próprio direito. A garantia legal existe, mas depende de percorrer labirintos administrativos que a vulnerabilidade torna intransponíveis.',
        destaques: [
          { trecho: 'as barreiras para quem cresceu sem documento são burocráticas e geográficas', tipo: 'argumento', nota: 'Segundo eixo: a dimensão operacional do problema, diferente da estatística do eixo 1.' },
          { trecho: 'a distância até o cartório é o primeiro obstáculo', tipo: 'argumento', nota: 'Concretude territorial: mostra que o direito não chega por razões físicas, não por desinteresse.' },
          { trecho: 'A garantia legal existe, mas depende de percorrer labirintos administrativos', tipo: 'tese', nota: 'Retoma a oposição direito formal × direito efetivo, presente no tema.' }
        ],
        analise: 'O parágrafo evita a explicação simplista (“as pessoas não se registram porque não querem”) e identifica causas estruturais, exatamente o que distingue análise de preconceito.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe busca ativa e articulação intersetorial.',
        texto: 'Portanto, cabe às corregedorias de justiça, em parceria com a assistência social municipal, realizar busca ativa de pessoas sem registro por meio de visitas de agentes comunitários e da gratuidade integral garantida em lei, a fim de que nenhuma criança permaneça invisível, visto que a exclusão documental se rompe com procura ativa, e não com espera. Ademais, as escolas devem solicitar certidão e documento de identificação na matrícula e acionar a rede de proteção quando faltarem, pois onde não há documento, há direito negado.',
        destaques: [
          { trecho: 'realizar busca ativa de pessoas sem registro por meio de visitas de agentes comunitários', tipo: 'proposta', nota: 'AÇÃO que inverte a lógica: o Estado procura quem está fora dos registros.' },
          { trecho: 'da gratuidade integral garantida em lei', tipo: 'proposta', nota: 'MEIO jurídico concreto, coerente com a barreira de custo apontada.' },
          { trecho: 'as escolas devem solicitar certidão e documento de identificação na matrícula', tipo: 'proposta', nota: 'Segundo agente com função de vigilância: a escola como porta de entrada da rede.' }
        ],
        analise: 'A proposta responde às duas barreiras: distância (busca ativa) e invisibilidade estatística (escola como ponto de detecção). Fechamento com frase curta de efeito argumentativo.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Precisão vocabular e sintaxe controlada, sem desvios recorrentes.' },
      { id: 'C2', nota: 200, comentario: 'Repertório variado e produtivo (IBGE, Arendt, literatura brasileira).' },
      { id: 'C3', nota: 200, comentario: 'Conceito central definido pelo autor, dois eixos sem repetição.' },
      { id: 'C4', nota: 200, comentario: 'Boa diversidade de recursos coesivos, inclusive retomadas nominais.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada e articulada às duas barreiras discutidas.' }
    ]
  },
  {
    id: 'enem-2022',
    ano: 2022,
    temaId: 'enem-2022',
    tema: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    comando: '“Valorização” + “desafios”: o texto precisa dizer o que desvaloriza e por quê, e a valorização passa pelo território.',
    nota: 1000,
    resumo: 'Território como base material da cultura e saberes tradicionais tratados como folclore: dois eixos que explicam a desvalorização.',
    porQueMil: [
      'Interpreta “valorização” como reconhecimento material, não como elogio.',
      'Repertório constitucional e antropológico bem aplicado (art. 231, Convenção 169, Darcy Ribeiro).',
      'Evita o exotismo: os povos aparecem como produtores de conhecimento.',
      'Proposta com demarcação, consulta prévia e currículo intercultural.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Marco legal + pendência prática + tese que liga cultura e território.',
        texto: 'A Constituição de 1988 rompeu com a lógica de tutela ao reconhecer aos povos indígenas e às comunidades tradicionais o direito originário sobre suas terras. Mais de três décadas depois, demarcações seguem pendentes e a Convenção 169 da Organização Internacional do Trabalho, que exige consulta prévia, é frequentemente ignorada. Valorizar esses povos, portanto, exige compreender que sua cultura não existe sem território, pois é o chão que sustenta o modo de vida, os saberes e a língua.',
        destaques: [
          { trecho: 'A Constituição de 1988 rompeu com a lógica de tutela', tipo: 'repertorio', nota: 'Repertório com leitura histórica: não só cita a Constituição, explica o que ela rompeu.' },
          { trecho: 'demarcações seguem pendentes e a Convenção 169 da Organização Internacional do Trabalho é frequentemente ignorada', tipo: 'problema', nota: 'Dois dados de realidade que definem o desafio do tema.' },
          { trecho: 'sua cultura não existe sem território, pois é o chão que sustenta o modo de vida', tipo: 'tese', nota: 'Tese que responde ao comando “valorização” com um critério objetivo: sem terra, não há cultura.' }
        ],
        analise: 'A introdução já resolve o principal risco do tema: não tratar valorização como celebração folclórica. A tese transforma cultura em questão territorial.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Mostra a relação entre terra, modo de vida e conhecimento.',
        texto: 'Em primeiro lugar, a terra é condição material de existência desses povos. A demarcação não é uma formalidade fundiária, mas a garantia de que rios, roças e florestas continuem a sustentar um modo de vida específico. O avanço do garimpo e do desmatamento em territórios tradicionais contamina a água, inviabiliza a caça e expulsa comunidades, de modo que a violência ambiental é também violência cultural. Ailton Krenak sintetiza essa relação ao defender que os rios não são recursos, mas sujeitos com os quais se mantém uma relação de cuidado.',
        destaques: [
          { trecho: 'A demarcação não é uma formalidade fundiária, mas a garantia de que rios, roças e florestas continuem a sustentar um modo de vida', tipo: 'argumento', nota: 'Reframe decisivo: o argumento jurídico vira argumento cultural.' },
          { trecho: 'contamina a água, inviabiliza a caça e expulsa comunidades', tipo: 'argumento', nota: 'Cadeia concreta de consequências, o leitor vê o dano, não apenas lê sobre ele.' },
          { trecho: 'Aílton Krenak sintetiza essa relação ao defender que os rios não são recursos, mas sujeitos', tipo: 'repertorio', nota: 'Repertório indígena contemporâneo, pertinente e explicado na própria frase.' }
        ],
        analise: 'O parágrafo trabalha com concreto (água, caça, roça) e com conceito (rio como sujeito). Essa combinação é o que sustenta a tese de que cultura depende de território.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Explica como o saber tradicional é reduzido a folclore.',
        texto: 'Além disso, o conhecimento tradicional é tratado como folclore, e não como ciência. A etnobotânica, por exemplo, reconhece que comunidades ribeirinhas e quilombolas manejam plantas medicinais com rigor empírico acumulado por gerações, mas esse saber raramente entra na escola ou na universidade como conteúdo legítimo. Darcy Ribeiro, ao descrever a formação do povo brasileiro, mostrou como a narrativa oficial apagou a contribuição indígena e africana. O resultado é a desvalorização simbólica: o povo é celebrado no calendário e ignorado no currículo.',
        destaques: [
          { trecho: 'o conhecimento tradicional é tratado como folclore, e não como ciência', tipo: 'argumento', nota: 'Segundo eixo: simbólico-epistemológico, diferente do territorial do parágrafo anterior.' },
          { trecho: 'manejam plantas medicinais com rigor empírico acumulado por gerações', tipo: 'argumento', nota: 'Concretude que sustenta a equiparação entre saber tradicional e conhecimento científico.' },
          { trecho: 'o povo é celebrado no calendário e ignorado no currículo', tipo: 'tese', nota: 'Antítese curta e precisa: resume a crítica central do parágrafo.' }
        ],
        analise: 'A frase final é o tipo de síntese que a banca lê como autoria: dois termos opostos (“calendário” e “currículo”) explicam a diferença entre celebrar e reconhecer.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe demarcação, consulta prévia e currículo intercultural.',
        texto: 'Portanto, cabe à Fundação Nacional dos Povos Indígenas, em articulação com os ministérios do Meio Ambiente e da Educação, concluir as demarcações pendentes e garantir a consulta prévia em obras que afetem territórios tradicionais por meio de protocolos comunitários e de fiscalização ambiental permanente, a fim de que a valorização não se limite ao discurso, visto que sem terra não há modo de vida a preservar. Ademais, as universidades públicas devem incluir saberes tradicionais em seus currículos e formar professores indígenas e quilombolas, pois o reconhecimento do conhecimento é a forma mais duradoura de valorização.',
        destaques: [
          { trecho: 'concluir as demarcações pendentes e garantir a consulta prévia', tipo: 'proposta', nota: 'AÇÕES que respondem ao eixo territorial e ao problema do desconhecimento da Convenção 169.' },
          { trecho: 'por meio de protocolos comunitários e de fiscalização ambiental permanente', tipo: 'proposta', nota: 'MEIO específico, que viabiliza a participação das próprias comunidades.' },
          { trecho: 'formar professores indígenas e quilombolas', tipo: 'proposta', nota: 'Detalhamento que enfrenta a desvalorização simbólica: quem produz o saber também ensina.' }
        ],
        analise: 'A proposta repete o desenho do texto: primeiro o material (terra), depois o simbólico (currículo). E inclui os próprios povos como agentes, não apenas como beneficiários.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Domínio pleno, com vocabulário técnico bem empregado.' },
      { id: 'C2', nota: 200, comentario: 'Repertório constitucional, antropológico e indígena, sempre produtivo.' },
      { id: 'C3', nota: 200, comentario: 'Tese original sobre a relação cultura-território, sustentada em dois eixos.' },
      { id: 'C4', nota: 200, comentario: 'Articulação consistente com retomadas precisas.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, com agentes competentes e articulada aos dois eixos.' }
    ]
  },
  {
    id: 'enem-2023',
    ano: 2023,
    temaId: 'enem-2023',
    tema: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
    comando: '“Invisibilidade do trabalho de cuidado”: o recorte é o trabalho não reconhecido, não a mulher em geral.',
    nota: 1000,
    resumo: 'Explica a naturalização afetiva do cuidado e o efeito econômico da jornada dupla, com dados e teoria feminista.',
    porQueMil: [
      'Define trabalho de cuidado com precisão, evitando o senso comum sobre “machismo”.',
      'Repertório econômico e teórico (IBGE, Federici, Beauvoir) com função argumentativa.',
      'Mostra o duplo efeito: invisibilidade estatística e desvantagem econômica.',
      'Proposta que ataca a raiz: contabilizar, compartilhar e ofertar serviço público.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Define o objeto, apresenta o dado e enuncia a tese da invisibilidade produtiva.',
        texto: 'A economia do cuidado, que abrange alimentar, limpar e cuidar de crianças, doentes e idosos, sustenta toda a vida social, e quase toda ela é executada por mulheres, sem remuneração e sem registro. Segundo o Instituto Brasileiro de Geografia e Estatística, mulheres dedicam cerca do dobro de horas semanais às tarefas domésticas em relação aos homens. A invisibilidade desse trabalho, portanto, não é apenas uma injustiça de gênero, pois é o que permite que o restante da economia funcione sem contabilizar o próprio custo.',
        destaques: [
          { trecho: 'A economia do cuidado, que abrange alimentar, limpar e cuidar de crianças, doentes e idosos', tipo: 'argumento', nota: 'Começa definindo o conceito do tema, sem isso, o texto falaria de “mulher” genericamente.' },
          { trecho: 'mulheres dedicam cerca do dobro de horas semanais às tarefas domésticas', tipo: 'repertorio', nota: 'Dado do IBGE que quantifica o que o senso comum apenas intui.' },
          { trecho: 'é o que permite que o restante da economia funcione sem contabilizar o próprio custo', tipo: 'tese', nota: 'Tese econômica: a invisibilidade é funcional para o sistema, não um acidente.' }
        ],
        analise: 'A introdução é a mais sofisticada do conjunto: em vez de acusar, explica a função social do problema. Esse tipo de tese é o que a matriz chama de “consistente”.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Explica a naturalização do cuidado como obrigação afetiva.',
        texto: 'Em primeiro lugar, o cuidado é lido como obrigação afetiva, e não como trabalho. A filósofa Simone de Beauvoir mostrou que a identidade feminina foi historicamente construída em torno do cuidado e da dedicação ao outro, de modo que a tarefa não remunerada aparece como vocação natural. A consequência é dupla: a mulher que delega o cuidado é vista como negligente, e a que o acumula não pode dedicar-se ao estudo ou à carreira. Silvia Federici acrescenta que esse trabalho sempre produziu a força de trabalho de que a economia depende, embora nunca tenha sido pago por isso.',
        destaques: [
          { trecho: 'o cuidado é lido como obrigação afetiva, e não como trabalho', tipo: 'argumento', nota: 'Tópico frasal que nomeia a raiz cultural da invisibilidade.' },
          { trecho: 'a mulher que delega o cuidado é vista como negligente, e a que o acumula não pode dedicar-se ao estudo', tipo: 'argumento', nota: 'Estrutura em alternativa: mostra que a armadilha existe nas duas saídas.' },
          { trecho: 'Silvia Federici acrescenta que esse trabalho sempre produziu a força de trabalho de que a economia depende', tipo: 'repertorio', nota: 'Repertório teórico denso, mas explicado em uma linha, produtivo, não exibicionista.' }
        ],
        analise: 'Dois repertórios de áreas próximas, mas com funções diferentes: um explica a identidade, o outro explica a economia. Juntos, sustentam o eixo cultural.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Mostra os efeitos econômicos da jornada dupla.',
        texto: 'Além disso, a invisibilidade estatística se converte em desvantagem econômica. O trabalho de cuidado não entra nas contas nacionais: não há linha no cálculo do produto interno bruto para as horas gastas em casa, embora exista para serviços equivalentes quando são remunerados. Esse apagamento produz efeitos concretos na renda das mulheres, que são maioria entre trabalhadoras informais e entre os lares chefiados por uma única responsável. A ausência de creches de tempo integral agrava o quadro, pois transfere ao private o custo de uma política pública que não existe.',
        destaques: [
          { trecho: 'O trabalho de cuidado não entra nas contas nacionais', tipo: 'argumento', nota: 'Achado forte: mostra a invisibilidade no plano estatístico, e não só no social.' },
          { trecho: 'maioria entre trabalhadoras informais e entre os lares chefiados por uma única responsável', tipo: 'argumento', nota: 'Consequências econômicas nomeadas, com sujeito definido.' },
          { trecho: 'A ausência de creches de tempo integral agrava o quadro', tipo: 'argumento', nota: 'Liga o argumento à política pública, e prepara a proposta.' }
        ],
        analise: 'O eixo 2 muda de plano: sai do simbólico e entra no econômico. É essa mudança que dá progressão real ao texto, em vez de repetir a mesma crítica com palavras diferentes.',
        melhoria: 'A palavra “private” no original deveria ser “setor privado”; o deslize não compromete o nível, mas revisar a grafia de expressões estrangeiras é sempre bom.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe contabilizar, compartilhar e ofertar serviço.',
        texto: 'Portanto, cabe ao Instituto Brasileiro de Geografia e Estatística, em parceria com o Ministério das Mulheres, incluir o trabalho de cuidado nas contas satélites da economia por meio de pesquisa nacional periódica, a fim de tornar visível a riqueza que hoje não é medida, visto que o que não é contabilizado não entra na agenda política. Ademais, as prefeituras devem ampliar a oferta de creches e centros-dia para idosos com financiamento tripartite, e as empresas devem adotar licenças parentais equivalentes, pois compartilhar o cuidado é a única forma de interromper a divisão sexual do trabalho.',
        destaques: [
          { trecho: 'incluir o trabalho de cuidado nas contas satélites da economia por meio de pesquisa nacional periódica', tipo: 'proposta', nota: 'AÇÃO de natureza estatística: raríssima entre candidatos e coerente com o argumento do eixo 2.' },
          { trecho: 'o que não é contabilizado não entra na agenda política', tipo: 'proposta', nota: 'DETALHAMENTO que repete e completa a tese da introdução.' },
          { trecho: 'as empresas devem adotar licenças parentais equivalentes', tipo: 'proposta', nota: 'Terceiro agente (setor privado): mostra que o problema não se resolve só no Estado.' }
        ],
        analise: 'A conclusão tem três agentes e três medidas simétricas aos argumentos: contabilizar (invisibilidade estatística), ofertar serviço e compartilhar (naturalização). Densidade alta em poucas linhas.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Norma padrão preservada, com vocabulário conceitual preciso.' },
      { id: 'C2', nota: 200, comentario: 'Repertório econômico e teórico produtivo, sem desvio do recorte.' },
      { id: 'C3', nota: 200, comentario: 'Tese sofisticada sobre a função econômica da invisibilidade, sustentada com autoria.' },
      { id: 'C4', nota: 200, comentario: 'Coesão consistente, com retomadas e transições bem distribuídas.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, com três agentes e medidas articuladas.' }
    ]
  },
  {
    id: 'enem-2024',
    ano: 2024,
    temaId: 'enem-2024',
    tema: 'Desafios para a valorização da herança africana no Brasil',
    comando: '“Valorização da herança”: exige mostrar o que apaga essa herança, celebração sem reparação é ornamento.',
    nota: 1000,
    resumo: 'Currículo e memória: a lei existe, mas o reconhecimento fica restrito a datas; a cultura afro-brasileira é celebrada e desautorizada.',
    porQueMil: [
      'Diferencia reconhecimento simbólico de reconhecimento efetivo.',
      'Usa a Lei 10.639 como problema, e não como solução pronta.',
      'Traz racismos religioso e curricular como faces do mesmo mecanismo.',
      'Proposta com formação docente, materiais e patrimônio, viável e simétrica aos eixos.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Lei como ponto de partida, contradição na prática e tese.',
        texto: 'A Lei 10.639, de 2003, tornou obrigatório o ensino de história e cultura afro-brasileira, e a Constituição reconhece a matriz africana como fundadora da nação. Duas décadas depois, o tema aparece nas escolas quase sempre restrito a novembro e a heróis isolados, enquanto terreiros e quilombos seguem alvo de violência. Valorizar essa herança, portanto, exige mais do que celebração, pois o mesmo país que dança ao som da herança africana é o que a desautoriza quando ela reivindica reconhecimento.',
        destaques: [
          { trecho: 'A Lei 10.639, de 2003, tornou obrigatório o ensino de história e cultura afro-brasileira', tipo: 'repertorio', nota: 'Repertório legal que já embute a crítica: a lei existe desde 2003.' },
          { trecho: 'restrito a novembro e a heróis isolados', tipo: 'problema', nota: 'Diagnóstico preciso e reconhecível: o 20 de novembro como única presença no calendário escolar.' },
          { trecho: 'o mesmo país que dança ao som da herança africana é o que a desautoriza quando ela reivindica reconhecimento', tipo: 'tese', nota: 'Tese em antítese: celebração de um lado, desautorização de outro. Autoria explícita.' }
        ],
        analise: 'A introdução sustenta uma tese sofisticada: a valorização existe no plano estético e falha no plano do reconhecimento. Isso responde ao comando sem cair no elogio genérico.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Mostra a distância entre a lei e o currículo.',
        texto: 'Em primeiro lugar, a obrigatoriedade legal não se converteu em prática curricular. A maioria dos professores não recebeu formação específica para trabalhar a história afro-brasileira, e os materiais didáticos ainda tratam a escravidão como episódio e não como sistema que estruturou a sociedade. Djamila Ribeiro observa que o racismo brasileiro opera pela sutileza: não se declara, mas se pratica na ausência de conteúdos, na piada naturalizada e na desqualificação de quem aponta o problema. Sem formação docente, a lei se transforma em mais uma atribuição solitária.',
        destaques: [
          { trecho: 'a obrigatoriedade legal não se converteu em prática curricular', tipo: 'argumento', nota: 'Tópico frasal que separa lei e prática, a distância é o próprio problema.' },
          { trecho: 'tratam a escravidão como episódio e não como sistema que estruturou a sociedade', tipo: 'argumento', nota: 'Crítica ao material didático: mostra como o currículo produz apagamento.' },
          { trecho: 'Djamila Ribeiro observa que o racismo brasileiro opera pela sutileza', tipo: 'repertorio', nota: 'Repertório pertinente e explicado: a sutileza do racismo justifica a tese do texto.' }
        ],
        analise: 'O parágrafo explica o mecanismo institucional do apagamento: sem formação, a lei não vira conteúdo. Argumento verificável, não indignação.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Aborda a dimensão cultural e religiosa da herança africana.',
        texto: 'Além disso, a herança africana é aceita como festa e recusada como fé. O samba e a capoeira circulam com prestígio, mas as religiões de matriz africana concentram a maior parte das denúncias de intolerância religiosa registradas no país. Quilombos e terreiros, por sua vez, sofrem com a falta de titulação de suas terras e com a pressão do avanço imobiliário. Existe, portanto, uma hierarquia no reconhecimento: a cultura afro-brasileira é bem-vinda quando pode ser consumida e é hostilizada quando demanda direitos.',
        destaques: [
          { trecho: 'a herança africana é aceita como festa e recusada como fé', tipo: 'argumento', nota: 'Formulação que organiza o eixo inteiro em uma frase.' },
          { trecho: 'as religiões de matriz africana concentram a maior parte das denúncias de intolerância religiosa', tipo: 'argumento', nota: 'Dado que sustenta a hierarquia do reconhecimento.' },
          { trecho: 'é bem-vinda quando pode ser consumida e é hostilizada quando demanda direitos', tipo: 'tese', nota: 'Síntese autoral que retoma a antítese da introdução e a aprofunda.' }
        ],
        analise: 'O eixo 2 não repete o currículo: fala de consumo cultural e de direitos territoriais. A frase final é a mais forte do texto, e é o tipo de formulação que explica uma nota 1000.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe formação, materiais e patrimônio.',
        texto: 'Portanto, cabe ao Ministério da Educação, em parceria com universidades públicas, incluir a história afro-brasileira na formação inicial e continuada de professores por meio de materiais didáticos atualizados e de residências pedagógicas, a fim de transformar a obrigação legal em prática cotidiana, visto que a lei sem formação permanece letra morta. Ademais, o Instituto do Patrimônio Histórico e Artístico Nacional deve reconhecer e titular territórios quilombolas e terreiros como patrimônio cultural, pois reconhecimento que não garante permanência material não é reconhecimento.',
        destaques: [
          { trecho: 'incluir a história afro-brasileira na formação inicial e continuada de professores', tipo: 'proposta', nota: 'AÇÃO que ataca exatamente o obstáculo do desenvolvimento 1.' },
          { trecho: 'por meio de materiais didáticos atualizados e de residências pedagógicas', tipo: 'proposta', nota: 'MEIO concreto e viável, coerente com a crítica aos materiais.' },
          { trecho: 'reconhecer e titular territórios quilombolas e terreiros como patrimônio cultural', tipo: 'proposta', nota: 'Segunda medida que responde ao eixo 2 e retoma a tese da reparação.' }
        ],
        analise: 'A conclusão ecoa a estrutura do texto e termina com uma frase que repete a lógica da tese (“reconhecimento que não garante permanência não é reconhecimento”). Coerência do começo ao fim.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Escrita formal consistente; apenas expressões estrangeiras exigiriam atenção.' },
      { id: 'C2', nota: 200, comentario: 'Repertório legal, sociológico e cultural produtivo em todos os parágrafos.' },
      { id: 'C3', nota: 200, comentario: 'Tese original e progressão clara entre currículo, cultura e território.' },
      { id: 'C4', nota: 200, comentario: 'Coesão diversificada, com retomadas que amarram os eixos.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, com dois agentes e medidas articuladas.' }
    ]
  },
  {
    id: 'enem-2025',
    ano: 2025,
    temaId: 'enem-2025',
    tema: 'Perspectivas acerca do envelhecimento na sociedade brasileira',
    comando: '“Perspectivas acerca de” pede mais de um olhar sobre o mesmo fenômeno, social e econômico-cultural.',
    nota: 1000,
    resumo: 'Envelhecimento como fato demográfico e como problema cultural: o país envelhece antes de criar estrutura de cuidado.',
    porQueMil: [
      'Explora a multiplicidade que o comando sugere: duas perspectivas sobre o mesmo fato.',
      'Dado demográfico usado como argumento, não como enfeite de abertura.',
      'Repertório filosófico (Beauvoir) que sustenta a crítica ao etarismo.',
      'Proposta com financiamento tripartite, detalhamento de política pública real.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Dado demográfico + leitura cultural + tese das duas perspectivas.',
        texto: 'O Instituto Brasileiro de Geografia e Estatística projeta que, em poucas décadas, a população acima de sessenta anos superará a de crianças no Brasil. Esse fato demográfico encontra, porém, uma sociedade que associa velhice à improdutividade e um Estado cuja rede de cuidado ainda é incipiente. As perspectivas sobre o envelhecimento, portanto, precisam ser examinadas em duas direções: o que a população idosa exige das políticas públicas e o que a cultura ainda precisa deixar de exigir dela.',
        destaques: [
          { trecho: 'a população acima de sessenta anos superará a de crianças no Brasil', tipo: 'repertorio', nota: 'Dado do IBGE que estabelece a urgência do tema em uma linha.' },
          { trecho: 'uma sociedade que associa velhice à improdutividade', tipo: 'problema', nota: 'O recorte cultural aparece cedo: o problema não é envelhecer, é como a sociedade lê a velhice.' },
          { trecho: 'o que a população idosa exige das políticas públicas e o que a cultura ainda precisa deixar de exigir dela', tipo: 'tese', nota: 'Tese que organiza as duas perspectivas, responde ao comando de forma explícita.' }
        ],
        analise: 'A introdução transforma o comando (“perspectivas”) em estrutura: Estado de um lado, cultura de outro. O leitor já sabe o mapa do texto.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Perspectiva social: cuidado, previdência e abandono.',
        texto: 'Em primeiro lugar, o envelhecimento amplia a demanda por cuidado e por proteção social. A rede pública de atenção à pessoa idosa é desigualmente distribuída, e o cuidado cotidiano recai quase sempre sobre as famílias, sobretudo sobre mulheres que acumulam essa tarefa com o trabalho remunerado. Simone de Beauvoir, em A Velhice, mostra que a sociedade tende a tratar o idoso como um outro incômodo, cuja utilidade teria se esgotado. Quando o Estado não oferece centros-dia, atenção domiciliar e transporte acessível, o abandono deixa de ser exceção e passa a ser a regra.',
        destaques: [
          { trecho: 'o cuidado cotidiano recai quase sempre sobre as famílias, sobretudo sobre mulheres', tipo: 'argumento', nota: 'Liga envelhecimento e desigualdade de gênero: densidade argumentativa sem sair do tema.' },
          { trecho: 'Simone de Beauvoir, em A Velhice, mostra que a sociedade tende a tratar o idoso como um outro incômodo', tipo: 'repertorio', nota: 'Repertório diretamente sobre o tema, não é citação de manual.' },
          { trecho: 'o abandono deixa de ser exceção e passa a ser a regra', tipo: 'tese', nota: 'Consequência formulada com força: o argumento ganha conclusão própria.' }
        ],
        analise: 'A perspectiva social é construída com três elementos: rede insuficiente, família sobrecarregada e cultura que descarta. Isso é o que a banca chama de argumento desenvolvido, e não de constatação.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Perspectiva econômica e cultural: etarismo e autonomia.',
        texto: 'Além disso, o etarismo produz efeitos econômicos e limita a autonomia. No mercado de trabalho, profissionais acima de cinquenta anos enfrentam dificuldade de recolocação mesmo quando têm qualificação, e a aposentadoria é frequentemente tratada como fim da vida produtiva. Nas cidades, calçadas irregulares, transporte sem acessibilidade e serviços digitais obrigatórios restringem a circulação e a independência de quem envelhece. A velhice, assim, é produzida também como exclusão espacial e tecnológica, e não apenas como etapa biológica.',
        destaques: [
          { trecho: 'profissionais acima de cinquenta anos enfrentam dificuldade de recolocação mesmo quando têm qualificação', tipo: 'argumento', nota: 'Etarismo demonstrado no mercado de trabalho, com sujeito e situação concretos.' },
          { trecho: 'calçadas irregulares, transporte sem acessibilidade e serviços digitais obrigatórios', tipo: 'argumento', nota: 'Desloca o problema para o espaço urbano: segunda perspectiva sobre o mesmo fato.' },
          { trecho: 'A velhice, assim, é produzida também como exclusão espacial e tecnológica', tipo: 'tese', nota: 'Síntese que sustenta a tese geral de que a velhice é construção social.' }
        ],
        analise: 'O eixo 2 sai do cuidado e entra no trabalho e na cidade, três dimensões do mesmo fenômeno. É exatamente a pluralidade que “perspectivas” pede.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Propõe cuidado, acessibilidade e convivência.',
        texto: 'Portanto, cabe ao Ministério da Saúde, em regime de financiamento tripartite com estados e municípios, ampliar a oferta de centros-dia e de atenção domiciliar para pessoas idosas por meio de repasses vinculados a metas de cobertura, a fim de reduzir a sobrecarga das famílias, visto que o cuidado não pode permanecer como responsabilidade privada. Ademais, as prefeituras devem exigir acessibilidade em calçadas, transporte e serviços digitais, e as escolas devem promover programas de convivência intergeracional, pois o etarismo só se combate com convívio real, e não com campanhas pontuais.',
        destaques: [
          { trecho: 'em regime de financiamento tripartite com estados e municípios', tipo: 'proposta', nota: 'MEIO institucional preciso: mostra conhecimento de como a política de saúde se financia.' },
          { trecho: 'por meio de repasses vinculados a metas de cobertura', tipo: 'proposta', nota: 'Detalhamento que torna a medida verificável, e não uma intenção.' },
          { trecho: 'o etarismo só se combate com convívio real, e não com campanhas pontuais', tipo: 'proposta', nota: 'FINALIDADE + DETALHAMENTO que retoma a perspectiva cultural discutida no texto.' }
        ],
        analise: 'A proposta cobre as duas perspectivas: cuidado (social) e acessibilidade/convivência (cultural). Fecha com uma crítica às campanhas pontuais, posição autoral mesmo na conclusão.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Norma padrão sem desvios recorrentes; sintaxe controlada nos períodos longos.' },
      { id: 'C2', nota: 200, comentario: 'Repertório demográfico e filosófico produtivo, com o recorte preservado.' },
      { id: 'C3', nota: 200, comentario: 'Duas perspectivas distintas sobre o mesmo fato, sem repetição entre parágrafos.' },
      { id: 'C4', nota: 200, comentario: 'Transições explícitas e retomadas bem construídas.' },
      { id: 'C5', nota: 200, comentario: 'Proposta detalhada, com agente competente e articulação aos dois eixos.' }
    ]
  },
  {
    id: 'enem-2026',
    ano: 2026,
    temaId: 'enem-2026',
    tema: 'A valorização do Sistema Único de Saúde (SUS) como direito universal',
    comando: '“Valorização” + “como direito universal”: o problema é a distância entre o direito previsto e o acesso real.',
    nota: 1000,
    resumo: 'Financiamento e distribuição territorial: os dois obstáculos que impedem a universalidade de sair do papel.',
    porQueMil: [
      'Não gasta linhas provando que o SUS existe: parte do direito e vai direto à falha de efetivação.',
      'Dois eixos complementares (dinheiro e território) que explicam a mesma tese.',
      'Repertório legal, institucional e factual, sempre explicado.',
      'Proposta com agente, ação, meio, finalidade e detalhamento na primeira frase.'
    ],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Base legal, afastamento do ideal e tese da garantia frágil.',
        texto: 'A Constituição Federal de 1988 determina, em seu artigo 196, que a saúde é direito de todos e dever do Estado. Mais de três décadas depois, o Sistema Único de Saúde permanece como a principal via de acesso da população brasileira ao atendimento médico, sobretudo entre os grupos de menor renda. Contudo, o subfinanciamento crônico e a desigualdade regional de oferta transformam esse direito universal em uma garantia frágil para milhões de cidadãos.',
        destaques: [
          { trecho: 'A Constituição Federal de 1988 determina, em seu artigo 196', tipo: 'repertorio', nota: 'Repertório legal pertinente, com o conteúdo do artigo: fundamenta o direito que o tema cobra.' },
          { trecho: 'o subfinanciamento crônico e a desigualdade regional de oferta', tipo: 'problema', nota: 'O recorte não é “a saúde”: é o financiamento e a distribuição, que serão os dois eixos.' },
          { trecho: 'transformam esse direito universal em uma garantia frágil', tipo: 'tese', nota: 'Tese em uma frase, retomando as palavras do tema (“direito universal”).' }
        ],
        analise: 'Introdução econômica: três frases, três funções. Um erro comum no tema é gastar o parágrafo inteiro demonstrando que o SUS é importante, o texto já parte do direito e vai ao problema.'
      },
      {
        rotulo: 'Desenvolvimento 1',
        funcao: 'Eixo do financiamento insuficiente.',
        texto: 'Em primeiro lugar, a insuficiência de recursos compromete a estrutura do sistema. Segundo dados do Conselho Nacional de Saúde, o gasto público per capita com saúde no Brasil é inferior ao de países com renda semelhante, o que se reflete na falta de leitos, na escassez de insumos e na sobrecarga das equipes. Nesse contexto, a valorização do SUS exige financiamento estável, e não apenas respostas emergenciais em períodos de crise sanitária, como ocorreu durante a pandemia de covid-19.',
        destaques: [
          { trecho: 'Segundo dados do Conselho Nacional de Saúde, o gasto público per capita com saúde', tipo: 'repertorio', nota: 'Repertório institucional com marcador de fonte (“segundo dados”): sinaliza informação externa, não opinião.' },
          { trecho: 'o que se reflete na falta de leitos, na escassez de insumos e na sobrecarga das equipes', tipo: 'argumento', nota: 'O dado é desdobrado em consequências observáveis, é isso que o torna produtivo.' },
          { trecho: 'a valorização do SUS exige financiamento estável, e não apenas respostas emergenciais', tipo: 'argumento', nota: 'Conecta o argumento ao comando do tema, que é “valorização”.' }
        ],
        analise: 'Estrutura interna exemplar: afirmação → dado → consequências → arremate retomando a tese. Quatro movimentos em um parágrafo de sete linhas.'
      },
      {
        rotulo: 'Desenvolvimento 2',
        funcao: 'Eixo da distribuição territorial de profissionais.',
        texto: 'Além disso, a distribuição desigual de profissionais agrava o problema. Enquanto grandes centros concentram especialistas, municípios do interior e da periferia dependem de agentes comunitários e de deslocamentos longos para consultas simples. A pandemia evidenciou essa assimetria: comunidades sem atenção básica consolidada tiveram mais dificuldade de conter a transmissão, o que demonstra que universalidade sem capilaridade é apenas formalidade.',
        destaques: [
          { trecho: 'Enquanto grandes centros concentram especialistas, municípios do interior e da periferia dependem de agentes comunitários', tipo: 'argumento', nota: 'Estrutura comparativa que sustenta o argumento sem precisar de número.' },
          { trecho: 'comunidades sem atenção básica consolidada tiveram mais dificuldade de conter a transmissão', tipo: 'argumento', nota: 'Exemplo histórico recente, usado com função argumentativa.' },
          { trecho: 'universalidade sem capilaridade é apenas formalidade', tipo: 'tese', nota: 'Formulação de autoria que sintetiza a crítica: direito que não alcança não é universal.' }
        ],
        analise: 'O eixo 2 não repete o dinheiro: fala de presença do serviço no território. Juntos, os parágrafos explicam por que o direito universal é frágil.'
      },
      {
        rotulo: 'Conclusão',
        funcao: 'Proposta completa, ligada aos dois eixos.',
        texto: 'Portanto, cabe ao Ministério da Saúde, em parceria com estados e municípios, ampliar o financiamento da atenção básica por meio da revisão dos repasses federais e da contratação de equipes de Saúde da Família, a fim de garantir cobertura efetiva nas regiões de maior vulnerabilidade, visto que são justamente essas localidades que dependem exclusivamente do sistema público. Complementarmente, a valorização dos profissionais, com planos de carreira e formação continuada, deve acompanhar esse investimento, pois sem condições de trabalho não há cuidado de qualidade.',
        destaques: [
          { trecho: 'cabe ao Ministério da Saúde, em parceria com estados e municípios', tipo: 'proposta', nota: 'AGENTE nomeado, com arranjo federativo, mostra viabilidade institucional.' },
          { trecho: 'ampliar o financiamento da atenção básica por meio da revisão dos repasses federais', tipo: 'proposta', nota: 'AÇÃO + MEIO alinhados ao primeiro eixo argumentativo.' },
          { trecho: 'a fim de garantir cobertura efetiva nas regiões de maior vulnerabilidade, visto que são justamente essas localidades', tipo: 'proposta', nota: 'FINALIDADE + DETALHAMENTO no mesmo período: é a combinação que garante os 200.' }
        ],
        analise: 'Cinco elementos na primeira frase e uma segunda frase para os profissionais, atendendo ao eixo do território e ao da estrutura. A conclusão dialoga com os dois desenvolvimentos.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 200, comentario: 'Domínio pleno da norma, inclusive em períodos longos.' },
      { id: 'C2', nota: 200, comentario: 'Repertório legal, institucional e factual, todos produtivos e articulados ao recorte.' },
      { id: 'C3', nota: 200, comentario: 'Dois eixos complementares, sem repetição, com autoria nas sínteses.' },
      { id: 'C4', nota: 200, comentario: 'Boa variedade coesiva; apenas a repetição do exemplo da pandemia pediria variação.' },
      { id: 'C5', nota: 200, comentario: 'Proposta completa, viável e articulada aos dois eixos.' }
    ]
  },
  {
    id: 'futebol-fuga',
    ano: 2026,
    temaId: 'enem-2026',
    tema: 'A valorização do Sistema Único de Saúde (SUS) como direito universal',
    tipo: 'Diagnóstico: fuga ao tema',
    nota: 0,
    comando: 'Este texto responde a outro comando, o do esporte. Serve para ver que escrever bem não salva fuga ao tema.',
    resumo: 'Um texto bem escrito sobre futebol, enviado para o tema do SUS. A redação é anulada: nenhuma competência é avaliada.',
    porQueMil: [],
    paragrafos: [
      {
        rotulo: 'Introdução',
        funcao: 'Boa introdução, para outro tema.',
        texto: 'O futebol brasileiro atravessa um momento de transformação. Os clubes investem em categorias de base, e os estádios recebem público recorde.',
        destaques: [
          { trecho: 'O futebol brasileiro', tipo: 'problema', nota: 'A fuga começa na primeira linha: o tema é o SUS e o texto trata de futebol.' }
        ],
        analise: 'A frase é clara, bem pontuada e tem tese embrionária. Nada disso importa: em fuga total ao tema, a redação recebe nota zero e é anulada, sem avaliação das competências.',
        melhoria: 'Antes de escrever, sublinhe o recorte da proposta: aqui, “valorização do SUS” e “direito universal”.'
      },
      {
        rotulo: 'Desenvolvimento',
        funcao: 'Argumenta sobre outro assunto.',
        texto: 'Em primeiro lugar, a formação de atletas exige estrutura. Segundo dados da Confederação Brasileira de Futebol, os centros de treinamento aumentaram nos últimos anos, o que demonstra profissionalização.',
        destaques: [
          { trecho: 'Segundo dados da Confederação Brasileira de Futebol', tipo: 'problema', nota: 'Repertório pertinente ao futebol e impertinente ao tema: repertório bom fora do recorte não gera ponto.' }
        ],
        analise: 'É o exemplo mais didático de que a Competência II é uma porta de entrada: sem aderência ao tema, o restante do texto sequer é lido.',
        melhoria: 'Se o tema fosse “democratização do acesso ao esporte”, este texto seria muito bem avaliado.'
      }
    ],
    competencias: [
      { id: 'C1', nota: 0, comentario: 'Não avaliada: a fuga ao tema anula a redação.' },
      { id: 'C2', nota: 0, comentario: 'Fuga ao tema, nível 0 do guia.' },
      { id: 'C3', nota: 0, comentario: 'Não avaliada.' },
      { id: 'C4', nota: 0, comentario: 'Não avaliada.' },
      { id: 'C5', nota: 0, comentario: 'Proposta não relacionada ao problema da proposta.' }
    ]
  }
];
