/**
 * TEMAS DE TREINO — segundo bloco do banco de propostas.
 * Cada tema traz recorte, núcleo, vocabulário de apoio e repertórios.
 * Os textos motivadores ficam em js/db/motivadores.js (chave = id do tema).
 */

export const TEMAS_EXTRA = [
  {
    id: 'treino-10',
    tipo: 'treino',
    eixo: 'Ciência e ética',
    ano: null,
    titulo: 'Os limites éticos do uso de dados genéticos no Brasil',
    recorte: 'Testes genéticos acessíveis, privacidade biológica, discriminação por predisposição e ausência de regulação específica.',
    nucleo: ['dados geneticos', 'genetica', 'dna', 'teste genetico', 'informacao genetica'],
    apoio: ['privacidade', 'consentimento', 'discriminacao', 'planos de saude', 'seguro',
      'biobanco', 'bioetica', 'autonomia', 'confidencialidade', 'pesquisa cientifica',
      'lgpd', 'hereditariedade', 'diagnostico', 'vazamento', 'consentimento informado',
      'mercantilizacao', 'eugenismo', 'familia'],
    repertorios: [
      { nome: 'Lei Geral de Proteção de Dados (Lei 13.709/2018)', uso: 'Classifica dados genéticos como dados sensíveis — base direta para a discussão.' },
      { nome: 'Declaração Universal sobre o Genoma Humano e os Direitos Humanos (Unesco, 1997)', uso: 'Afirma que o genoma é patrimônio da humanidade e veda discriminação genética.' },
      { nome: 'Caso do Projeto Genográfico e a venda de testes de ancestralidade', uso: 'Mostra o descompasso entre oferta comercial e compreensão do consumidor.' },
      { nome: 'Conceito de “determinismo genético” (crítica de Evelyn Fox Keller)', uso: 'Questiona a leitura de que o DNA define destino, base dos preconceitos.' }
    ]
  },
  {
    id: 'treino-11',
    tipo: 'treino',
    eixo: 'Economia',
    ano: null,
    titulo: 'Caminhos para ampliar a educação financeira entre jovens brasileiros',
    recorte: 'Endividamento precoce, ausência do tema na escola, publicidade de crédito e assimetria de informação.',
    nucleo: ['educacao financeira', 'financeira', 'dinheiro', 'endividamento', 'credito'],
    apoio: ['consumo', 'poupanca', 'juros', 'orcamento familiar', 'banco central',
      'consumismo', 'cartao de credito', 'inadimplencia', 'merchandising', 'publicidade',
      'base nacional comum curricular', 'escola', 'planejamento', 'investimento',
      'desigualdade economica', 'aposta', 'jogo', 'renda'],
    repertorios: [
      { nome: 'Estratégia Nacional de Educação Financeira (Decreto 7.397/2010)', uso: 'Política pública que prevê educação financeira nas escolas.' },
      { nome: 'Pesquisa de Endividamento e Inadimplência do Consumidor (Peic/CNC)', uso: 'Dado recorrente sobre famílias endividadas.' },
      { nome: 'Zygmunt Bauman — “consumo” como identidade na modernidade líquida', uso: 'Explica a pressão simbólica do consumo entre jovens.' },
      { nome: 'Base Nacional Comum Curricular (competência de cultura digital e projeto de vida)', uso: 'Mostra onde a educação financeira pode entrar no currículo.' }
    ]
  },
  {
    id: 'treino-12',
    tipo: 'treino',
    eixo: 'Comunicação e ética',
    ano: null,
    titulo: 'A cultura do cancelamento e os limites da liberdade de expressão no Brasil',
    recorte: 'Julgamento público nas redes, linchamento virtual, direito ao contraditório e efeitos sobre grupos vulneráveis.',
    nucleo: ['cultura do cancelamento', 'cancelamento', 'liberdade de expressao', 'redes sociais', 'julgamento'],
    apoio: ['discurso de odio', 'desinformacao', 'exposicao', 'assedio', 'linchamento virtual',
      'direito ao contraditorio', 'honra', 'plataformas', 'moderacao de conteudo',
      'opiniao publica', 'boato', 'anonimato', 'algoritmo', 'saude mental',
      'constituicao', 'democracia', 'tolerancia'],
    repertorios: [
      { nome: 'Constituição Federal, art. 5º, IV, V e IX', uso: 'Garante liberdade de expressão e, ao mesmo tempo, direito de resposta e indenização por dano.' },
      { nome: 'Lei 14.532/2023 (injúria racial equiparada ao racismo)', uso: 'Mostra o que já é crime e o que não deveria ser resolvido por pressão digital.' },
      { nome: 'John Stuart Mill — “Sobre a liberdade”', uso: 'Sustenta que a liberdade de expressão só se limita pelo dano a terceiros.' },
      { nome: 'Relatorias da ONU sobre liberdade de expressão e moderação de conteúdo', uso: 'Discutem o papel das plataformas no espaço público.' }
    ]
  },
  {
    id: 'treino-13',
    tipo: 'treino',
    eixo: 'Trabalho e tecnologia',
    ano: null,
    titulo: 'Desafios para a proteção social dos trabalhadores por aplicativos no Brasil',
    recorte: 'Vínculo inexistente, jornada exaustiva, ausência de proteção em acidentes e a disputa sobre a natureza do vínculo.',
    nucleo: ['trabalho por aplicativo', 'aplicativos', 'entregador', 'motorista', 'plataforma'],
    apoio: ['uberizacao', 'precarizacao', 'autonomia', 'subordinacao', 'jornada',
      'acidente de trabalho', 'previdencia', 'sindicato', 'algoritmo', 'remuneracao',
      'informalidade', 'clt', 'reforma trabalhista', 'renda', 'gig economy',
      'direitos trabalhistas', 'protecao social'],
    repertorios: [
      { nome: 'Constituição Federal, arts. 6º a 11 (direitos sociais e trabalho)', uso: 'Base para discutir proteção social como direito, não favor.' },
      { nome: 'Conceito de “mais-valia” e trabalho alienado (Karl Marx)', uso: 'Ajuda a explicar a extração de valor sem contrapartida de proteção.' },
      { nome: 'Jurisprudência trabalhista sobre vínculo em plataformas digitais', uso: 'Mostra que a definição jurídica está em disputa.' },
      { nome: 'Relatório da OIT sobre economia de plataforma', uso: 'Dimensiona o fenômeno para além do Brasil.' }
    ]
  },
  {
    id: 'treino-14',
    tipo: 'treino',
    eixo: 'Direitos e cidadania',
    ano: null,
    titulo: 'Desafios para a garantia dos direitos das pessoas com deficiência no Brasil',
    recorte: 'Barreiras arquitetônicas, capacitismo, inclusão escolar e acesso ao mercado de trabalho.',
    nucleo: ['pessoas com deficiencia', 'deficiencia', 'acessibilidade', 'inclusao', 'capacitismo'],
    apoio: ['barreiras arquitetonicas', 'educacao inclusiva', 'mercado de trabalho',
      'lei brasileira de inclusao', 'autismo', 'libras', 'braille', 'preconceito',
      'acessibilidade digital', 'adaptacao', 'cotas', 'reabilitacao', 'saude',
      'autonomia', 'desenho universal', 'segregacao'],
    repertorios: [
      { nome: 'Lei Brasileira de Inclusão (Lei 13.146/2015)', uso: 'Define acessibilidade como direito e estabelece obrigações ao poder público.' },
      { nome: 'Convenção da ONU sobre os Direitos das Pessoas com Deficiência', uso: 'Introduz o modelo social da deficiência, adotado pelo Brasil com status constitucional.' },
      { nome: 'Conceito de capacitismo (movimento internacional de pessoas com deficiência)', uso: 'Nomeia o preconceito estrutural que o texto precisa enfrentar.' },
      { nome: 'Censo escolar do Inep — matrículas de estudantes com deficiência', uso: 'Mostra o avanço do acesso e o gargalo da permanência.' }
    ]
  },
  {
    id: 'treino-15',
    tipo: 'treino',
    eixo: 'Cidades e moradia',
    ano: null,
    titulo: 'Desafios para o direito à moradia nas grandes cidades brasileiras',
    recorte: 'Déficit habitacional, valorização especulativa, remoções e ocupações irregulares em áreas de risco.',
    nucleo: ['moradia', 'habitacao', 'direito a cidade', 'deficit habitacional', 'aluguel'],
    apoio: ['especulacao imobiliaria', 'gentrificacao', 'favela', 'ocupacao', 'remocao',
      'areas de risco', 'saneamento', 'estatuto da cidade', 'minha casa minha vida',
      'urbano', 'periferia', 'insegurança da posse', 'financiamento', 'imovel vazio',
      'desigualdade', 'planejamento urbano'],
    repertorios: [
      { nome: 'Constituição Federal, art. 6º (moradia como direito social)', uso: 'Sustenta a moradia como direito, e não mercadoria.' },
      { nome: 'Estatuto da Cidade (Lei 10.257/2001)', uso: 'Estabelece a função social da propriedade e instrumentos de política urbana.' },
      { nome: 'Anna Tibaijuka / ONU-Habitat e a noção de direito à cidade', uso: 'Conecta moradia à participação na vida urbana.' },
      { nome: 'Fundação João Pinheiro — déficit habitacional no Brasil', uso: 'Dado de referência para dimensionar o problema.' }
    ]
  },
  {
    id: 'treino-16',
    tipo: 'treino',
    eixo: 'Território e meio ambiente',
    ano: null,
    titulo: 'Os desafios da transição energética justa no Brasil',
    recorte: 'Matriz elétrica limpa, expansão de renováveis, dependência de combustíveis fósseis e os impactos sobre quem gera energia.',
    nucleo: ['transicao energetica', 'energia', 'energia renovavel', 'matriz energetica', 'sustentabilidade'],
    apoio: ['solar', 'eolica', 'hidreletrica', 'combustivel fossil', 'petroleo',
      'emissoes', 'aquecimento global', 'geracao distribuida', 'tarifa',
      'impacto ambiental', 'comunidades tradicionais', 'terras indigenas',
      'lixo', 'reciclagem', 'carbono', 'amazonia', 'seguranca energetica'],
    repertorios: [
      { nome: 'Acordo de Paris (2015) e a NDC brasileira', uso: 'Compromisso climático formal que condiciona a política energética.' },
      { nome: 'Relatórios do IPCC sobre aquecimento global', uso: 'Base científica que justifica a urgência.' },
      { nome: 'Conceito de “transição justa” (OIT / movimento sindical)', uso: 'Desloca a discussão de tecnologia para quem paga a conta da mudança.' },
      { nome: 'Empresa de Pesquisa Energética (EPE) — matriz elétrica brasileira', uso: 'Mostra o perfil predominantemente renovável e suas tensões.' }
    ]
  },
  {
    id: 'treino-17',
    tipo: 'treino',
    eixo: 'Saúde',
    ano: null,
    titulo: 'Desafios para o enfrentamento da automedicação no Brasil',
    recorte: 'Cultura do remédio, publicidade farmacêutica, dificuldade de acesso à consulta e riscos do uso sem orientação.',
    nucleo: ['automedicacao', 'medicamento', 'remedio', 'farmacia', 'saude'],
    apoio: ['autoprescricao', 'antibiotico', 'resistencia bacteriana', 'bula',
      'balconista', 'consulta', 'anvisa', 'efeito colateral', 'intoxicacao',
      'industria farmaceutica', 'publicidade', 'acesso', 'informacao',
      'atencao basica', 'uso racional de medicamentos'],
    repertorios: [
      { nome: 'Política Nacional de Medicamentos (Portaria 3.916/1998)', uso: 'Preconiza o uso racional de medicamentos no SUS.' },
      { nome: 'OMS — uso racional de medicamentos', uso: 'Define automedicação como problema de saúde pública global.' },
      { nome: 'Conceito de “medicalização da vida” (Ivan Illich)', uso: 'Critica a tradução de sofrimentos cotidianos em prescrição.' },
      { nome: 'Anvisa — bulário eletrônico e farmácias notificadoras', uso: 'Mostra instrumentos existentes de informação e controle.' }
    ]
  },
  {
    id: 'treino-18',
    tipo: 'treino',
    eixo: 'Gênero e ciência',
    ano: null,
    titulo: 'Caminhos para ampliar a presença de mulheres nas carreiras de ciência e tecnologia',
    recorte: 'Sub-representação em exatas, estereótipos desde a escola, barreiras de carreira e disparidade salarial.',
    nucleo: ['mulheres', 'ciencia', 'tecnologia', 'genero', 'pesquisa'],
    apoio: ['estereotipo', 'stem', 'exatas', 'meninas', 'universidade', 'bolsa',
      'carreira cientifica', 'maternidade', 'disparidade salarial', 'preconceito',
      'merito', 'representatividade', 'computacao', 'engenharia', 'laboratorio',
      'cientifica', 'teto de vidro'],
    repertorios: [
      { nome: 'Marie Curie e a dupla premiação Nobel', uso: 'Referência histórica que, sozinha, não resolve a explicação estrutural.' },
      { nome: 'Estatísticas do CNPq e da Capes sobre bolsas por sexo', uso: 'Mostram a queda de participação conforme a carreira avança.' },
      { nome: 'Conceito de “teto de vidro” (sociologia do trabalho)', uso: 'Nomeia a barreira invisível de progressão.' },
      { nome: 'Lei 14.457/2022 e programas de incentivo à participação feminina em STEM', uso: 'Mostra o que já existe em política pública.' }
    ]
  },
  {
    id: 'treino-19',
    tipo: 'treino',
    eixo: 'Infância e tecnologia',
    ano: null,
    titulo: 'Desafios para a proteção de crianças e adolescentes no ambiente digital',
    recorte: 'Exposição precoce, publicidade dirigida, cyberbullying, aliciamento e o papel da família e das plataformas.',
    nucleo: ['criancas', 'adolescentes', 'ambiente digital', 'internet', 'protecao integral'],
    apoio: ['cyberbullying', 'redes sociais', 'exposicao', 'sharenting', 'aliciamento',
      'publicidade infantil', 'tempo de tela', 'eca', 'lgpd', 'moderacao',
      'jogos', 'aposta online', 'violencia digital', 'escola', 'familia',
      'desenvolvimento', 'vicio'],
    repertorios: [
      { nome: 'Estatuto da Criança e do Adolescente (Lei 8.069/1990)', uso: 'Institui a proteção integral e a prioridade absoluta.' },
      { nome: 'Constituição Federal, art. 227', uso: 'Dever compartilhado entre família, sociedade e Estado.' },
      { nome: 'Resolução do Conanda sobre publicidade infantil', uso: 'Considera abusiva a publicidade dirigida à criança.' },
      { nome: 'Conceito de “sharenting” (exposição de filhos por pais nas redes)', uso: 'Traz a discussão para dentro das famílias.' }
    ]
  }
];
