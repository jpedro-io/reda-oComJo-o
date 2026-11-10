/**
 * BASE DE DADOS DE TEMAS
 * ------------------------------------------------------------
 * nucleo   -> termos que precisam aparecer para o texto não ser
 *             considerado fuga/tangenciamento do recorte.
 * apoio    -> vocabulário esperado (amplia a nota de C2).
 * repertorios -> sugestões pertinentes, com sugestão de uso.
 */

export const TEMAS = [
  {
    id: 'enem-2026',
    tipo: 'enem',
    eixo: 'Saúde',
    ano: 2026,
    titulo: 'A valorização do Sistema Único de Saúde (SUS) como direito universal',
    recorte: 'Reconhecimento do SUS como direito de todos, com financiamento, valorização dos profissionais e combate à desigualdade de acesso.',
    nucleo: ['sus', 'saude publica', 'saude', 'direito universal', 'universal', 'gratuito'],
    apoio: ['financiamento', 'subfinanciamento', 'profissionais de saude', 'atencao basica',
      'desigualdade', 'acesso', 'constituicao de 1988', 'politica publica', 'hospital',
      'sistema publico', 'privatizacao', 'agente comunitario', 'vacina', 'pandemia',
      'setor privado', 'saude suplementar', 'gestao', 'municipalizacao', 'prevencao'],
    repertorios: [
      { nome: 'Constituição Federal de 1988, art. 196', uso: 'Fundamenta a saúde como direito de todos e dever do Estado.' },
      { nome: 'OMS, determinantes sociais da saúde', uso: 'Mostra que o acesso depende também de renda, moradia e saneamento.' },
      { nome: 'Pandemia de covid-19', uso: 'Evidencia a centralidade do SUS em crises sanitárias.' },
      { nome: 'Movimento da Reforma Sanitária', uso: 'Explica a origem do SUS e a disputa entre público e privado.' }
    ]
  },
  {
    id: 'enem-2025',
    tipo: 'enem',
    eixo: 'Direitos e cidadania',
    ano: 2025,
    titulo: 'Perspectivas acerca do envelhecimento na sociedade brasileira',
    recorte: 'Envelhecimento populacional, etarismo, previdência, cuidado e inclusão da pessoa idosa.',
    nucleo: ['envelhecimento', 'idosos', 'idoso', 'velhice', 'pessoa idosa'],
    apoio: ['etarismo', 'previdencia', 'aposentadoria', 'cuidado', 'saude', 'inclusao',
      'longevidade', 'familia', 'abandono', 'autonomia', 'gerontologia', 'demografia',
      'transicao demografica', 'acolhimento', 'asilo', 'direitos da pessoa idosa',
      'estatuto da pessoa idosa', 'produtividade', 'mercado de trabalho', 'solidariedade'],
    repertorios: [
      { nome: 'Estatuto da Pessoa Idosa (Lei 10.741/2003)', uso: 'Base legal para discutir direitos e proteção.' },
      { nome: 'IBGE, transição demográfica brasileira', uso: 'Dados sobre o envelhecimento acelerado da população.' },
      { nome: 'Simone de Beauvoir, "A Velhice"', uso: 'Crítica ao modo como a sociedade trata a velhice.' },
      { nome: 'Malmquist / Barreiras arquitetônicas', uso: 'Acessibilidade urbana como condição de autonomia.' }
    ]
  },
  {
    id: 'enem-2024',
    tipo: 'enem',
    eixo: 'Cultura',
    ano: 2024,
    titulo: 'Desafios para a valorização da herança africana no Brasil',
    recorte: 'Reconhecimento da contribuição afro-brasileira, racismo estrutural e preservação cultural.',
    nucleo: ['heranca africana', 'africana', 'afro-brasileira', 'afro-brasileiro', 'africanos'],
    apoio: ['racismo', 'racismo estrutural', 'cultura', 'religiao', 'candomble', 'umbanda',
      'capoeira', 'quilombo', 'cotas', 'religiosidade', 'ancestralidade', 'negritude',
      'discriminacao', 'intolerancia religiosa', 'literatura', 'escola', 'curriculo',
      'lei 10.639', 'diversidade cultural', 'escravidao', 'memoria'],
    repertorios: [
      { nome: 'Djamila Ribeiro, "Pequeno Manual Antirracista"', uso: 'Explica o racismo estrutural no cotidiano.' },
      { nome: 'Lei 10.639/2003', uso: 'Obrigatoriedade do ensino de história afro-brasileira.' },
      { nome: 'Ailton Krenak / Conceição Evaristo', uso: 'Vozes que valorizam ancestralidade e oralidade.' },
      { nome: 'Lélia Gonzalez', uso: 'Categoria de "amefricanidade" para pensar identidade.' }
    ]
  },
  {
    id: 'enem-2023',
    tipo: 'enem',
    eixo: 'Trabalho e gênero',
    ano: 2023,
    titulo: 'Desafios para o enfrentamento da invisibilidade do trabalho de cuidado realizado pela mulher no Brasil',
    recorte: 'Trabalho doméstico e de cuidado não remunerado, desigualdade de gênero e divisão sexual do trabalho.',
    nucleo: ['trabalho de cuidado', 'cuidado', 'cuidadora', 'mulher', 'mulheres'],
    apoio: ['trabalho domestico', 'divisao sexual', 'genero', 'jornada dupla', 'familia',
      'remuneracao', 'precarizacao', 'maternidade', 'creche', 'politica publica',
      'invisibilidade', 'reconhecimento', 'economia do cuidado', 'empregada domestica'],
    repertorios: [
      { nome: 'IBGE, pesquisa de gênero e trabalho doméstico', uso: 'Dados de horas semanais dedicadas ao cuidado.' },
      { nome: 'Silvia Federici', uso: 'Teoria sobre o trabalho reprodutivo não pago.' },
      { nome: 'Simone de Beauvoir, "O Segundo Sexo"', uso: 'Crítica à atribuição do cuidado às mulheres.' },
      { nome: 'Constituição de 1988 / Lei do Trabalho Doméstico', uso: 'Base legal do reconhecimento do trabalho.' }
    ]
  },
  {
    id: 'enem-2022',
    tipo: 'enem',
    eixo: 'Território e meio ambiente',
    ano: 2022,
    titulo: 'Desafios para a valorização de comunidades e povos tradicionais no Brasil',
    recorte: 'Povos indígenas, quilombolas, ribeirinhos, extrativistas e o direito ao território.',
    nucleo: ['povos tradicionais', 'comunidades tradicionais', 'indigena', 'indigenas', 'quilombola'],
    apoio: ['territorio', 'demarcacao', 'cultura', 'saberes', 'ancestralidade', 'extrativismo',
      'ribeirinho', 'seringueiro', 'garimpo', 'desmatamento', 'ambiental', 'sustentabilidade',
      'invisibilidade', 'politica publica', 'direitos', 'Funai', 'convencao 169'],
    repertorios: [
      { nome: 'Ailton Krenak, "Ideias para Adiar o Fim do Mundo"', uso: 'Crítica ao modo de vida urbano-industrial.' },
      { nome: 'Darcy Ribeiro, "O Povo Brasileiro"', uso: 'Formação da diversidade cultural brasileira.' },
      { nome: 'Convenção 169 da OIT', uso: 'Consulta prévia aos povos tradicionais.' },
      { nome: 'Constantino / Milton Santos', uso: 'Território e cidadania.' }
    ]
  },
  {
    id: 'enem-2021',
    tipo: 'enem',
    eixo: 'Direitos e cidadania',
    ano: 2021,
    titulo: 'Invisibilidade e registro civil: garantia de acesso à cidadania no Brasil',
    recorte: 'Sub-registro civil, pessoas sem documentos e exclusão do acesso a direitos.',
    nucleo: ['registro civil', 'registro de nascimento', 'documento', 'documentacao', 'certidao'],
    apoio: ['cidadania', 'invisibilidade', 'exclusao', 'direitos', 'identidade', 'ibge',
      'subregistro', 'nascente', 'cartorio', 'politica publica', 'vulnerabilidade',
      'moradia', 'indigena', 'quilombola', 'populacao rural', 'acesso', 'burocracia'],
    repertorios: [
      { nome: 'Hannah Arendt, "Origens do Totalitarismo"', uso: 'Direito a ter direitos e a importância da documentação.' },
      { nome: 'Carolina Maria de Jesus, "Quarto de Despejo"', uso: 'Retrato da exclusão social e da invisibilidade.' },
      { nome: 'Constituição de 1988', uso: 'Cidadania plena como fundamento da República.' },
      { nome: 'IBGE, estatísticas do registro civil', uso: 'Dados de sub-registro no país.' }
    ]
  },
  {
    id: 'enem-2020',
    tipo: 'enem',
    eixo: 'Saúde',
    ano: 2020,
    titulo: 'O estigma associado às doenças mentais na sociedade brasileira',
    recorte: 'Preconceito com transtornos mentais, silenciamento e acesso à saúde psíquica.',
    nucleo: ['doencas mentais', 'saude mental', 'transtorno mental', 'estigma', 'estigmatizacao'],
    apoio: ['depressao', 'ansiedade', 'suicidio', 'preconceito', 'caps', 'sus', 'acolhimento',
      'tratamento', 'psicologia', 'psiquiatria', 'exclusao', 'familia', 'trabalho',
      'lei 10.216', 'reforma psiquiatrica', 'sofrimento', 'discriminacao', 'tabu'],
    repertorios: [
      { nome: 'Lei 10.216/2001 (Reforma Psiquiátrica)', uso: 'Modelo de atenção psicossocial e fim do isolamento.' },
      { nome: 'OMS, depressão como doença incapacitante', uso: 'Cifras sobre prevalência e afastamentos.' },
      { nome: 'Foucault, "História da Loucura"', uso: 'História do aprisionamento e estigmatização da loucura.' },
      { nome: 'Black Mirror / "O Conto da Aia"', uso: 'Metáforas de controle e silenciamento (usar com mediação).' }
    ]
  },
  {
    id: 'enem-2019',
    tipo: 'enem',
    eixo: 'Cultura',
    ano: 2019,
    titulo: 'Democratização do acesso ao cinema no Brasil',
    recorte: 'Acesso à produção audiovisual, distribuição, preço, cidades sem sala e lei do cinema.',
    nucleo: ['cinema', 'cinematografica', 'audiovisual', 'filme', 'acesso ao cinema'],
    apoio: ['cultura', 'democratizacao', 'distribuicao', 'consumo cultural', 'periferia',
      'preco do ingresso', 'sala de cinema', 'internet', 'streaming', 'financiamento',
      'ancine', 'lei do cinema', 'politica cultural', 'municipalizacao', 'mobilidade'],
    repertorios: [
      { nome: 'Ancine, dados de mercado audiovisual', uso: 'Mapeamento de salas e concentração de renda no setor.' },
      { nome: 'Antonio Candido, "O Direito à Literatura"', uso: 'Cultura como direito e não mercadoria.' },
      { nome: "Milton Santos, 'O Espaço Dividido'", uso: 'Desigualdade de acesso e território.' },
      { nome: 'Constituição art. 215', uso: 'Direito à cultura para todos.' }
    ]
  },
  {
    id: 'enem-2018',
    tipo: 'enem',
    eixo: 'Tecnologia',
    ano: 2018,
    titulo: 'Manipulação do comportamento do usuário pelo controle de dados na internet',
    recorte: 'Algoritmos, bolhas digitais, privacidade e uso comercial dos dados pessoais.',
    nucleo: ['manipulacao', 'dados', 'algoritmo', 'controle', 'privacidade'],
    apoio: ['internet', 'redes sociais', 'fake news', 'bolha', 'vigilancia', 'algoritmico',
      'publicidade', 'consumo', 'democracia', 'tecnologia', 'lgpd', 'liberdade',
      'desinformacao', 'plataforma', 'usuario'],
    repertorios: [
      { nome: 'Byung-Chul Han, "Sociedade da Transparência"', uso: 'Crítica à exposição e ao controle na era digital.' },
      { nome: 'Escândalo Cambridge Analytica', uso: 'Exemplo concreto de manipulação por dados.' },
      { nome: 'LGPD (Lei 13.709/2018)', uso: 'Proteção jurídica de dados pessoais.' },
      { nome: '1984, de George Orwell', uso: 'Metáfora do controle da informação.' }
    ]
  },
  {
    id: 'enem-2017',
    tipo: 'enem',
    eixo: 'Educação',
    ano: 2017,
    titulo: 'Desafios para a formação educacional de surdos no Brasil',
    recorte: 'Inclusão linguística, bilinguismo, falta de intérpretes e formação de professores.',
    nucleo: ['surdo', 'surdez', 'libras', 'surdos'],
    apoio: ['inclusao', 'bilinguismo', 'interpretes', 'acessibilidade', 'escola', 'ensino',
      'professor', 'educacao', 'deficiencia', 'auditiva', 'lei 10.436', 'decreto 5.626',
      'comunicacao', 'identidade surda', 'cultura surda', 'acolhimento'],
    repertorios: [
      { nome: 'Lei 10.436/2002 e Decreto 5.626/2005', uso: 'Reconhecimento da Libras e obrigações de ensino.' },
      { nome: 'Declaração de Salamanca', uso: 'Princípio de educação inclusiva.' },
      { nome: 'Vygotsky', uso: 'Linguagem e desenvolvimento cognitivo.' },
      { nome: 'Convenção sobre os Direitos da Pessoa com Deficiência', uso: 'Marco internacional de acessibilidade.' }
    ]
  },
  {
    id: 'enem-2016',
    tipo: 'enem',
    eixo: 'Direitos e cidadania',
    ano: 2016,
    titulo: 'Caminhos para combater a intolerância religiosa no Brasil',
    recorte: 'Liberdade religiosa, ataques a religiões de matriz africana e laicidade do Estado.',
    nucleo: ['intolerancia religiosa', 'religiao', 'religioes', 'liberdade religiosa'],
    apoio: ['descriminacao', 'candomble', 'umbanda', 'laicidade', 'estado laico',
      'matriz africana', 'preconceito', 'direitos humanos', 'constituicao', 'diálogo',
      'cultura', 'racismo', 'templo', 'respeito', 'pluralidade'],
    repertorios: [
      { nome: 'Constituição art. 5, VI', uso: 'Liberdade de crença como direito fundamental.' },
      { nome: 'Lei 7.716/1989', uso: 'Criminalização do racismo e da discriminação religiosa.' },
      { nome: 'Milton Santos / Boaventura', uso: 'Diversidade e diálogo intercultural.' },
      { nome: 'Djamila Ribeiro, "Lugar de Fala"', uso: 'Quem pode falar e ser ouvido.' }
    ]
  },
  {
    id: 'enem-2015',
    tipo: 'enem',
    eixo: 'Segurança',
    ano: 2015,
    titulo: 'A persistência da violência contra a mulher na sociedade brasileira',
    recorte: 'Violência física, psicológica e simbólica; lei Maria da Penha e rede de proteção.',
    nucleo: ['violencia contra a mulher', 'mulher', 'mulheres', 'violencia de genero'],
    apoio: ['machismo', 'feminicidio', 'lei maria da penha', 'denuncia', 'psicologica',
      'patriarcado', 'casa de abrigo', 'delegacia', 'cultura do estupro', 'genero',
      'rede de protecao', 'educacao', 'campanha', 'assedio'],
    repertorios: [
      { nome: 'Lei Maria da Penha (11.340/2006)', uso: 'Marco legal de enfrentamento à violência doméstica.' },
      { nome: 'Simone de Beauvoir, "O Segundo Sexo"', uso: 'Construção social do gênero.' },
      { nome: 'Dados do Fórum Brasileiro de Segurança Pública', uso: 'Estatísticas de feminicídio.' },
      { nome: 'Conceição Evaristo', uso: 'Literatura como denúncia da condição feminina negra.' }
    ]
  },
  {
    id: 'enem-2014',
    tipo: 'enem',
    eixo: 'Infância e consumo',
    ano: 2014,
    titulo: 'Publicidade infantil em questão no Brasil',
    recorte: 'Regulação da publicidade dirigida à criança, consumismo e proteção da infância.',
    nucleo: ['publicidade infantil', 'publicidade', 'propaganda', 'crianca', 'consumo'],
    apoio: ['consumismo', 'regulamentacao', 'conar', 'marketing', 'infancia', 'familia',
      'escola', 'anvisa', 'protecao integral', 'eca', 'merchandising', 'mídia'],
    repertorios: [
      { nome: 'ECA (Lei 8.069/1990)', uso: 'Proteção integral e prioridade absoluta.' },
      { nome: 'Bauman, "Vida para Consumo"', uso: 'Sociedade de consumo e identidade.' },
      { nome: 'Código de Defesa do Consumidor', uso: 'Prática abusiva na publicidade infantil.' },
      { nome: 'Resolução CONANDA nº 163', uso: 'Diretrizes sobre abusividade da propaganda infantil.' }
    ]
  },
  {
    id: 'treino-1',
    tipo: 'treino',
    eixo: 'Educação',
    ano: null,
    titulo: 'Caminhos para ampliar a permanência de jovens no ensino médio no Brasil',
    recorte: 'Evasão escolar, trabalho precoce, currículo e políticas de permanência.',
    nucleo: ['evasao', 'permanencia', 'ensino medio', 'jovens', 'escola', 'abandono escolar'],
    apoio: ['trabalho precoce', 'renda', 'bolsa', 'curriculo', 'transporte', 'merenda',
      'aprendizagem', 'desigualdade', 'juventude', 'ensino tecnico', 'internet'],
    repertorios: [
      { nome: 'PNAD Contínua, educação', uso: 'Dados de evasão por faixa etária.' },
      { nome: 'Paulo Freire', uso: 'Educação como prática de liberdade.' },
      { nome: 'Constituição art. 205 e LDB', uso: 'Direito à educação.' },
      { nome: 'Documentário "Nunca Me Sonharam"', uso: 'Retratos do jovem e do sentido da escola.' }
    ]
  },
  {
    id: 'treino-2',
    tipo: 'treino',
    eixo: 'Tecnologia',
    ano: null,
    titulo: 'Desafios para o combate à desinformação na internet no Brasil',
    recorte: 'Fake news, letramento digital, regulação de plataformas e liberdade de expressão.',
    nucleo: ['desinformacao', 'fake news', 'noticias falsas', 'informacao'],
    apoio: ['internet', 'redes sociais', 'plataforma', 'algoritmo', 'liberdade de expressao',
      'checagem', 'educacao midiatica', 'regulacao', 'democracia', 'boato', 'viral'],
    repertorios: [
      { nome: 'Byung-Chul Han, "Infocracia"', uso: 'Circulação da informação e perda de verdade.' },
      { nome: 'Relatório da Comissão Europeia sobre desinformacão', uso: 'Modelos de regulação.' },
      { nome: 'Paulo Freire / letramento midiático', uso: 'Educação como antídoto.' },
      { nome: 'Constituição art. 5, IV e IX', uso: 'Liberdade de expressão e seus limites.' }
    ]
  }
];

/* ------------------------------------------------------------------ */
/* Temas de treino adicionais — atualizados para 2026                  */
/* ------------------------------------------------------------------ */

TEMAS.push(
  {
    id: 'treino-3', tipo: 'treino', eixo: 'Infância e consumo', ano: null,
    titulo: 'Desafios para o combate ao trabalho infantil no Brasil',
    recorte: 'Exploração do trabalho de crianças e adolescentes, fiscalização e pobreza como causa estrutural.',
    nucleo: ['trabalho infantil', 'criancas', 'adolescentes', 'exploracao'],
    apoio: ['eca', 'fiscalizacao', 'pobreza', 'renda', 'escola', 'bolsa', 'trabalho domestico',
      'mendicancia', 'resgate', 'ministerio publico', 'consciencia', 'zona rural', 'carvoaria'],
    repertorios: [
      { nome: 'ECA, art. 60 a 69', uso: 'Proibição do trabalho a menores de 16 anos, salvo aprendiz.' },
      { nome: 'OIT, Convenção 138', uso: 'Idade mínima para admissão ao emprego.' },
      { nome: 'IBGE/PNAD, trabalho infantil', uso: 'Dados de crianças em atividade laboral.' },
      { nome: 'Josué de Castro, "Geografia da Fome"', uso: 'Pobreza como raiz da exploração.' }
    ]
  },
  {
    id: 'treino-4', tipo: 'treino', eixo: 'Território e meio ambiente', ano: null,
    titulo: 'Caminhos para o enfrentamento da insegurança hídrica no Brasil',
    recorte: 'Escassez de água, saneamento, conflitos pelo uso e desigualdade de acesso.',
    nucleo: ['agua', 'inseguranca hidrica', 'escassez', 'saneamento'],
    apoio: ['esgoto', 'tratamento', 'seca', 'semiárido', 'cisterna', 'bacia hidrografica',
      'desperdicio', 'perda na distribuicao', 'agronegocio', 'mudanca climatica', 'ons', 'ana'],
    repertorios: [
      { nome: 'ANA, Agência Nacional de Águas', uso: 'Dados de disponibilidade e perdas na distribuição.' },
      { nome: 'Lei 14.026/2020 (Marco do Saneamento)', uso: 'Metas de universalização do saneamento.' },
      { nome: 'ODS 6 da ONU', uso: 'Água potável e saneamento como direito.' },
      { nome: 'Ailton Krenak', uso: 'Relação entre rios, território e modos de vida.' }
    ]
  },
  {
    id: 'treino-5', tipo: 'treino', eixo: 'Saúde', ano: null,
    titulo: 'Desafios para o cuidado da saúde mental de jovens no ambiente escolar',
    recorte: 'Sofrimento psíquico na escola, bullying, formação de professores e acesso a atendimento.',
    nucleo: ['saude mental', 'jovens', 'escola', 'estudantes'],
    apoio: ['ansiedade', 'depressao', 'bullying', 'acolhimento', 'psicologo', 'caps', 'sus',
      'formacao de professores', 'redes sociais', 'autolesao', 'escuta', 'preconceito'],
    repertorios: [
      { nome: 'Lei 13.935/2019', uso: 'Presença de psicólogos e assistentes sociais na rede pública.' },
      { nome: 'OMS, saúde mental na adolescência', uso: 'Prevalência de transtornos entre jovens.' },
      { nome: 'Foucault, "Vigiar e Punir"', uso: 'Crítica ao disciplinamento escolar (usar com cuidado).' },
      { nome: '"O Conto da Aia" / "Black Mirror"', uso: 'Metáforas sobre silenciamento (com mediação).' }
    ]
  },
  {
    id: 'treino-6', tipo: 'treino', eixo: 'Cultura', ano: null,
    titulo: 'Caminhos para a valorização da leitura entre jovens brasileiros',
    recorte: 'Formação de leitores, bibliotecas, incentivo escolar e leitura digital.',
    nucleo: ['leitura', 'leitores', 'livro', 'biblioteca'],
    apoio: ['letramento', 'literatura', 'escola', 'habito', 'clube de leitura', 'acesso',
      'preco do livro', 'plano nacional do livro', 'leitura digital', 'formacao de professores'],
    repertorios: [
      { nome: 'Antonio Candido, "O Direito à Literatura"', uso: 'Literatura como direito humano.' },
      { nome: 'Plano Nacional do Livro e Leitura (PNLL)', uso: 'Política pública de formação de leitores.' },
      { nome: 'PISA/OCDE, leitura', uso: 'Desempenho brasileiro em leitura.' },
      { nome: 'Lei 12.244/2010', uso: 'Universalização de bibliotecas escolares.' }
    ]
  },
  {
    id: 'treino-7', tipo: 'treino', eixo: 'Território e meio ambiente', ano: null,
    titulo: 'Desafios da mobilidade urbana nas periferias das grandes cidades',
    recorte: 'Tempo de deslocamento, tarifa, transporte público precário e segregação urbana.',
    nucleo: ['mobilidade urbana', 'transporte publico', 'periferia', 'deslocamento'],
    apoio: ['tarifa', 'onibus', 'metrô', 'segregacao', 'tempo no transito', 'ciclofaixa',
      'acessibilidade', 'planejamento urbano', 'milton santos', 'direito a cidade'],
    repertorios: [
      { nome: 'Milton Santos, "O Espaço Dividido"', uso: 'Desigualdade de acesso e território.' },
      { nome: 'Estatuto da Cidade (Lei 10.257/2001)', uso: 'Direito à cidade.' },
      { nome: 'IBGE, tempo médio de deslocamento', uso: 'Dados de mobilidade casa-trabalho.' },
      { nome: 'Marco Legal do Transporte (2012)', uso: 'Dever municipal de garantir o serviço.' }
    ]
  },
  {
    id: 'treino-8', tipo: 'treino', eixo: 'Território e meio ambiente', ano: null,
    titulo: 'Caminhos para a redução do desperdício de alimentos no Brasil',
    recorte: 'Perdas na cadeia produtiva, descarte doméstico, fome e logística.',
    nucleo: ['desperdicio', 'alimentos', 'perda', 'descarte'],
    apoio: ['fome', 'seguranca alimentar', 'logistica', 'hortifruti', 'compostagem',
      'supermercado', 'doacao', 'lei do alimento', 'consumo consciente', 'sustentabilidade'],
    repertorios: [
      { nome: 'FAO/ONU, perdas e desperdício', uso: 'Percentuais de alimentos perdidos no mundo.' },
      { nome: 'Josué de Castro, "Geografia da Fome"', uso: 'Fome como fenômeno político.' },
      { nome: 'Lei 14.016/2020', uso: 'Doação de alimentos excedentes.' },
      { nome: 'ODS 12.3', uso: 'Meta de reduzir o desperdício pela metade até 2030.' }
    ]
  },
  {
    id: 'treino-9', tipo: 'treino', eixo: 'Trabalho e gênero', ano: null,
    titulo: 'Desafios para a inserção de migrantes e refugiados no mercado de trabalho brasileiro',
    recorte: 'Reconhecimento de diplomas, língua, xenofobia e empregos precarizados.',
    nucleo: ['refugiados', 'migrantes', 'imigracao', 'mercado de trabalho'],
    apoio: ['xenofobia', 'diploma', 'revalidacao', 'lingua', 'precarizacao', 'acolhimento',
      'agencias da onu', 'acnur', 'carteira de trabalho', 'interiorizacao', 'vulnerabilidade'],
    repertorios: [
      { nome: 'ACNUR/ONU, dados de refúgio', uso: 'Números de deslocamentos forçados.' },
      { nome: 'Lei 9.474/1997 (Estatuto do Refugiado)', uso: 'Marco legal do refúgio no Brasil.' },
      { nome: 'Hannah Arendt, "Origens do Totalitarismo"', uso: 'Direito a ter direitos e apatridia.' },
      { nome: 'Conceição Evaristo / Zygmunt Bauman', uso: 'Exclusão e alteridade.' }
    ]
  }
);

export function buscarTema(id) {
  return TEMAS.find(t => t.id === id) || null;
}

/** Gera palavras-chave a partir de um tema digitado manualmente. */
export function keywordsDeTemaLivre(tema) {
  const stop = new Set(['a', 'o', 'as', 'os', 'de', 'da', 'do', 'das', 'dos', 'para',
    'e', 'em', 'no', 'na', 'nos', 'nas', 'como', 'sobre', 'ao', 'aos', 'pelo', 'pela',
    'um', 'uma', 'que', 'com', 'por', 'se', 'desafios', 'perspectivas', 'questao',
    'questão', 'acerca', 'importancia', 'importância', 'valorizacao', 'valorização']);
  const norm = tema.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  return norm
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/\s+/)
    .filter(p => p.length > 3 && !stop.has(p));
}

/* ------------------------------------------------------------------ */
/* Segundo bloco de propostas (js/db/temas-extra.js)                   */
/* ------------------------------------------------------------------ */

import { TEMAS_EXTRA } from './temas-extra.js';

TEMAS.push(...TEMAS_EXTRA);
