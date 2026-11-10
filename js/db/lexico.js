/**
 * LÉXICO DO MOTOR DE CORREÇÃO
 * ------------------------------------------------------------
 * Todos os padrões de busca são escritos SEM acentuação e são
 * aplicados sobre o texto normalizado (minúsculo, sem acentos).
 * Exceção: ERROS_ACENTUACAO, aplicado sobre o texto original.
 */

export const STOPWORDS = new Set((
  'a o as os um uma uns umas de do da dos das em no na nos nas por pelo pela pelos pelas ' +
  'para pra com sem sob sobre entre ate apos antes que se e ou mas porem contudo todavia ' +
  'como quando onde qual quais cujo cuja isso isto aquilo esse essa este esta aquele aquela ' +
  'ele ela eles elas eu nos vos lhe lhes me te se ja nao sim mais menos muito pouco ' +
  'ser sao foi era sera sido sendo tem ha havia hao ter sua seu suas seus meu minha ' +
  'ao aos à as das num numa dum duma porque pois logo entao assim tambem ainda apenas ' +
  'todo toda todos todas cada outro outra outros outras mesmo mesma'
).split(/\s+/));

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA I — desvios de norma padrão                             */
/* ------------------------------------------------------------------ */

/** Palavras frequentes escritas sem acento (busca no texto ORIGINAL). */
export const ERROS_ACENTUACAO = [
  ['nao', 'não'], ['tambem', 'também'], ['voce', 'você'], ['agua', 'água'],
  ['historia', 'história'], ['consciencia', 'consciência'],
  ['educacao', 'educação'], ['saude', 'saúde'], ['so', 'só'], ['tres', 'três'],
  ['atraves', 'através'], ['possivel', 'possível'], ['necessario', 'necessário'],
  ['politica', 'política'], ['politicas', 'políticas'], ['publico', 'público'],
  ['violencia', 'violência'], ['informacao', 'informação'],
  ['populacao', 'população'], ['sociedade', 'sociedade'], ['servico', 'serviço'],
  ['servicos', 'serviços'], ['acesso', 'acesso'], ['problema', 'problema'],
  ['desigualdade', 'desigualdade'], ['basico', 'básico'],
  ['basica', 'básica'], ['direito', 'direito'], ['etica', 'ética'],
  ['importancia', 'importância'], ['experiencia', 'experiência'],
  ['consequencia', 'consequência'], ['referencia', 'referência'],
  ['transferencia', 'transferência'], ['conveniencia', 'conveniência'],
  ['cidadania', 'cidadania'], ['juventude', 'juventude'], ['nivel', 'nível'],
  ['util', 'útil'], ['difícil', 'difícil'], ['facil', 'fácil'],
  ['alem', 'além'], ['apos', 'após'], ['ate', 'até'], ['aquela', 'aquela'],
  ['atraves', 'através'], ['familia', 'família'], ['familiares', 'familiares'],
  ['metodo', 'método'], ['mudanca', 'mudança'],
  ['crianca', 'criança'], ['criancas', 'crianças'], ['espaco', 'espaço'],
  ['processo', 'processo'], ['proprio', 'próprio'], ['propria', 'própria'],
  ['sera', 'será'], ['terao', 'terão'], ['poderao', 'poderão'],
  ['governo', 'governo'], ['emprego', 'emprego'], ['relatorio', 'relatório'],
  ['obrigatorio', 'obrigatório'], ['previlegio', 'privilégio'],
  ['ambito', 'âmbito'], ['area', 'área'], ['areas', 'áreas'], ['audiencia', 'audiência'], ['ausencia', 'ausência'], ['beneficio', 'benefício'], ['beneficios', 'benefícios'], ['carater', 'caráter'], ['codigo', 'código'], ['comercio', 'comércio'], ['condicao', 'condição'], ['condicoes', 'condições'], ['conteudo', 'conteúdo'], ['contribuicao', 'contribuição'], ['decada', 'década'], ['decadas', 'décadas'], ['deficiencia', 'deficiência'], ['dificil', 'difícil'], ['distancia', 'distância'], ['economico', 'econômico'], ['economica', 'econômica'], ['emergencia', 'emergência'], ['epoca', 'época'], ['estatistico', 'estatístico'], ['exclusao', 'exclusão'], ['fenomeno', 'fenômeno'], ['fisico', 'físico'], ['fisica', 'física'], ['formacao', 'formação'], ['frequencia', 'frequência'], ['genero', 'gênero'], ['geografico', 'geográfico'], ['hipotese', 'hipótese'], ['impossivel', 'impossível'], ['indice', 'índice'], ['industria', 'indústria'], ['infancia', 'infância'], ['influencia', 'influência'], ['inicio', 'início'], ['insercao', 'inserção'], ['instituicao', 'instituição'], ['instituicoes', 'instituições'], ['legislacao', 'legislação'], ['lingua', 'língua'], ['logica', 'lógica'], ['medico', 'médico'], ['medicos', 'médicos'], ['mencao', 'menção'], ['municipio', 'município'], ['municipios', 'municípios'], ['negocio', 'negócio'], ['obrigacao', 'obrigação'], ['opiniao', 'opinião'], ['opinioes', 'opiniões'], ['organizacao', 'organização'], ['participacao', 'participação'], ['periodo', 'período'], ['precario', 'precário'], ['prevencao', 'prevenção'], ['principio', 'princípio'], ['principios', 'princípios'], ['producao', 'produção'], ['profissao', 'profissão'], ['proibicao', 'proibição'], ['protecao', 'proteção'], ['publica', 'pública'], ['publicas', 'públicas'], ['publicos', 'públicos'], ['questao', 'questão'], ['questoes', 'questões'], ['reducao', 'redução'], ['regiao', 'região'], ['regioes', 'regiões'], ['relacao', 'relação'], ['relacoes', 'relações'], ['religiao', 'religião'], ['representacao', 'representação'], ['restricao', 'restrição'], ['resolucao', 'resolução'], ['revolucao', 'revolução'], ['seguranca', 'segurança'], ['serie', 'série'], ['situacao', 'situação'], ['sobrevivencia', 'sobrevivência'], ['solucao', 'solução'], ['solucoes', 'soluções'], ['tendencia', 'tendência'], ['teorico', 'teórico'], ['tradicao', 'tradição'], ['transicao', 'transição'], ['visao', 'visão'], ['vivencia', 'vivência'], ['vulneravel', 'vulnerável'], ['indigena', 'indígena'], ['indigenas', 'indígenas'], ['adocao', 'adoção'], ['agressao', 'agressão'], ['anciao', 'ancião'], ['cidadão', 'cidadão'], ['comunhao', 'comunhão'], ['consorcio', 'consórcio'], ['escolaridade', 'escolaridade'],
];

/** Trocas e construções típicas de desvio (texto normalizado). */
export const DESVIOS_CONSTRUCAO = [
  { padrao: 'a cerca de', sugestao: 'acerca de', tipo: 'locução' },
  { padrao: 'ao inves de', sugestao: 'em vez de', tipo: 'locução' },
  { padrao: 'a nivel de', sugestao: 'em nível de / no âmbito de', tipo: 'barbarismo' },
  { padrao: 'atras de', sugestao: 'atrás de', tipo: 'acentuação' },
  { padrao: 'atráves', sugestao: 'através', tipo: 'ortografia', bruto: true },
  { padrao: 'derrepente', sugestao: 'de repente', tipo: 'ortografia' },
  { padrao: 'concerteza', sugestao: 'com certeza', tipo: 'ortografia' },
  { padrao: 'ha anos atras', sugestao: 'há anos', tipo: 'ortografia' },
  { padrao: 'fazem anos', sugestao: 'faz anos', tipo: 'concordância' },
  { padrao: 'houveram', sugestao: 'houve (haver = impessoal)', tipo: 'concordância' },
  { padrao: 'haverão', sugestao: 'haverá (haver = impessoal)', tipo: 'concordância', bruto: true },
  { padrao: 'menas', sugestao: 'menos', tipo: 'flexão' },
  { padrao: 'seje', sugestao: 'seja', tipo: 'flexão' },
  { padrao: 'ponhei', sugestao: 'pus', tipo: 'flexão' },
  { padrao: 'interviu', sugestao: 'interveio', tipo: 'flexão' },
  { padrao: 'em vez que', sugestao: 'em vez de', tipo: 'locução' },
  { padrao: 'devido o', sugestao: 'devido ao', tipo: 'regência' },
  { padrao: 'assistir o', sugestao: 'assistir ao', tipo: 'regência' },
  { padrao: 'implicar em', sugestao: 'implicar (sem preposição)', tipo: 'regência' },
  { padrao: 'chegar em', sugestao: 'chegar a', tipo: 'regência' },
  { padrao: 'ir em', sugestao: 'ir a', tipo: 'regência' },
  { padrao: 'obedecer as', sugestao: 'obedecer às', tipo: 'regência' },
  { padrao: 'fazer com que', sugestao: '(aceitável, mas prefira "levar a")', tipo: 'estilo', peso: 0.3 },
  { padrao: 'as vezes', sugestao: 'às vezes', tipo: 'crase', bruto: true },
  { padrao: 'a medida que', sugestao: 'à medida que', tipo: 'crase', bruto: true },
  { padrao: 'a vista de', sugestao: 'à vista de', tipo: 'crase', bruto: true },
  { padrao: 'as custas de', sugestao: 'às custas de', tipo: 'crase', bruto: true },
  { padrao: 'por causa que', sugestao: 'porque / por causa de', tipo: 'locução' },
  { padrao: 'se trata de', sugestao: 'trata-se de', tipo: 'colocação' },
  { padrao: 'enquanto que', sugestao: 'enquanto', tipo: 'redundância' },
  { padrao: 'mas contudo', sugestao: 'contudo', tipo: 'redundância' },
  { padrao: 'mas porém', sugestao: 'porém', tipo: 'redundância' },
  { padrao: 'existe muitas', sugestao: 'existem muitas', tipo: 'concordância' },
  { padrao: 'existe vários', sugestao: 'existem vários', tipo: 'concordância' },
  { padrao: 'onde que', sugestao: 'onde', tipo: 'redundância' },
  { padrao: 'como por exemplo', sugestao: 'por exemplo', tipo: 'redundância', peso: 0.5 },
  { padrao: 'por conta de', sugestao: 'por causa de', tipo: 'estilo', peso: 0.4 },
  { padrao: 'de certa forma', sugestao: '(evite o vazio argumentativo)', tipo: 'estilo', peso: 0.3 },
  { padrao: 'vem crescendo', sugestao: '(aceitável; comprove com dado)', tipo: 'estilo', peso: 0.3 }
];

/** Registro informal — prejudica C1 e, às vezes, C3. */
export const INFORMALIDADES = [
  'coisa', 'coisas', 'super', 'tipo assim', 'ne', 'pra', 'pro', 'ta',
  'aí', 'gente', 'muito bom', 'muito ruim', 'meio que', 'da pra',
  'um monte de', 'putz', 'beleza', 'sacanagem', 'bagulho', 'troço', 'né'
];

/** Marcas de 1ª pessoa — risco para C3 (impessoalidade). */
export const PRIMEIRA_PESSOA = ['eu ', 'eu,', 'meu ', 'minha ', 'acho', 'acredito', 'penso',
  'na minha opiniao', 'particularmente', 'para mim', 'considero'];

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA IV — coesão                                             */
/* ------------------------------------------------------------------ */

export const CONECTIVOS = {
  'adição': ['alem disso', 'ademais', 'outrossim', 'ainda', 'tambem', 'e', 'do mesmo modo',
    'somado a isso', 'paralelamente', 'nao so', 'bem como', 'igualmente'],
  'oposição': ['porem', 'contudo', 'todavia', 'entretanto', 'no entanto', 'mas', 'embora',
    'apesar de', 'por outro lado', 'em contrapartida', 'nao obstante', 'se por um lado'],
  'causa': ['porque', 'pois', 'visto que', 'uma vez que', 'ja que', 'devido a',
    'em virtude de', 'por conta de', 'dado que', 'haja vista', 'posto que'],
  'conclusão': ['portanto', 'assim', 'logo', 'dessa forma', 'desse modo', 'em suma',
    'por conseguinte', 'consequentemente', 'diante disso', 'destarte', 'por fim'],
  'explicação': ['isto e', 'ou seja', 'vale destacar', 'com efeito', 'de fato', 'isso significa'],
  'finalidade': ['a fim de', 'para que', 'com o objetivo de', 'de modo a', 'visando', 'para'],
  'temporal': ['atualmente', 'historicamente', 'desde', 'ao longo de', 'nesse contexto',
    'no seculo', 'contemporaneamente', 'no cenario atual'],
  'comparação': ['assim como', 'tal qual', 'do mesmo modo que', 'enquanto', 'ao passo que',
    'diferentemente de', 'à semelhança de']
};

/** Conectivos "de enfeite": aparecem muito e não articulam ideias. */
export const CONECTIVOS_FRACOS = ['alem disso', 'dessa forma', 'desse modo', 'por isso', 'assim'];

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA II / III — repertório e argumentação                    */
/* ------------------------------------------------------------------ */

export const REPERTORIO = {
  instituicoes: ['onu', 'unesco', 'oms', 'unicef', 'ibge', 'ipea', 'iphan', 'mec', 'stf',
    'sus', 'oab', 'inep', 'datafolha', 'pnad', 'constituicao', 'constituicao federal',
    'clt', 'eca', 'estatuto', 'lei maria da penha', 'lei de diretrizes', 'marco civil',
    'lgpd', 'ministerio publico', 'defensoria publica', 'organizacao mundial',
    'banco mundial', 'fundo monetario', 'relatorio', 'pesquisa nacional', 'censo'],
  autores: ['bauman', 'zygmunt', 'foucault', 'hannah arendt', 'arendt', 'durkheim', 'weber',
    'bourdieu', 'paulo freire', 'milton santos', 'gilberto freyre', 'darcy ribeiro',
    'florestan fernandes', 'chimamanda', 'bell hooks', 'djamila ribeiro', 'ailton krenak',
    'kant', 'descartes', 'aristoteles', 'platao', 'socrates', 'maquiavel', 'hobbes',
    'locke', 'rousseau', 'sartre', 'simone de beauvoir', 'gramsci', 'adorno', 'horkheimer',
    'walter benjamin', 'nietzsche', 'freud', 'lacan', 'boaventura', 'edgar morin',
    'muniz sodre', 'sueli carneiro', 'lelia gonzalez', 'conceicao evaristo',
    'carolina maria de jesus', 'machado de assis', 'graciliano ramos', 'aluisio azevedo',
    'rachel de queiroz', 'guimaraes rosa', 'clarice lispector', 'cecilia meireles',
    'drummond', 'manuel bandeira', 'jorge amado', 'lima barreto', 'castro alves',
    'jose de alencar', 'oswald de andrade', 'mario de andrade', 'augusto dos anjos',
    'monteiro lobato', 'chico buarque', 'emicida', 'raimundo correia', 'joao cabral',
    'eliane brum', 'eduardo galeano', 'noam chomsky', 'byung-chul', 'judith butler',
    'achille mbembe', 'grada kilomba', 'angela davis', 'malcolm x', 'martin luther king',
    'nelson mandela', 'florestan', 'anibal quijano', 'maria lugones', 'rita segato'],
  obras: ['vidas secas', 'quarto de despejo', 'cidade de deus', 'bacurau', 'black mirror',
    'o conto da aia', '1984', 'admoravel mundo novo', 'torto arado', 'o cortico',
    'dom casmurro', 'memorias postumas', 'central do brasil', 'que horas ela volta',
    'divertida mente', 'a culpa e das estrelas', 'olhos que condenam', 'get out',
    'pantera negra', 'o auto da compadecida', 'capitaes da areia', 'a hora da estrela',
    'sao bernardo', 'angustia', 'morte e vida severina', 'os sertoes', 'casa-grande',
    'raizes do brasil', 'o povo brasileiro', 'pedagogia do oprimido', 'o que e o sus'],
  dados: ['%', 'por cento', 'segundo', 'de acordo com', 'dados do', 'pesquisa',
    'estudo', 'levantamento', 'censo', 'relatorio', 'indice']
};

/** Frases-clichê: não zeram nada, mas enfraquecem a autoria (C3). */
export const CLICHES = ['desde os primordios', 'desde os tempos remotos',
  'desde o inicio dos tempos', 'nos dias de hoje', 'nos dias atuais',
  'na sociedade atual', 'com o avanco da tecnologia', 'e sabido que',
  'todos sabem que', 'e de conhecimento geral', 'o mundo em que vivemos',
  'desde ja', 'como todos sabem', 'infelizmente', 'a todo momento',
  'cabe ressaltar', 'e notorio que', 'vem crescendo cada vez mais'];

/** Marcadores de tese / posicionamento (C3). */
export const MARCADORES_TESE = ['e necessario', 'e fundamental', 'e imprescindivel',
  'e essencial', 'e urgente', 'deve ser', 'devem ser', 'deveria', 'precisa ser',
  'precisam ser', 'defendo', 'defende-se', 'argumenta-se', 'e preciso', 'constata-se',
  'e evidente', 'configura-se', 'trata-se de um', 'o problema', 'o desafio',
  'a problematica', 'isso ocorre porque', 'essa realidade'];

/** Marcadores de sustentação de argumento. */
export const MARCADORES_SUSTENTACAO = ['porque', 'pois', 'visto que', 'uma vez que',
  'ja que', 'isso ocorre', 'isso se deve', 'em razao de', 'devido a', 'por conta de',
  'o que revela', 'o que demonstra', 'o que evidencia', 'como mostra', 'segundo',
  'de acordo com', 'por exemplo', 'tais como', 'como'];

/* ------------------------------------------------------------------ */
/* COMPETÊNCIA V — proposta de intervenção                             */
/* ------------------------------------------------------------------ */

export const INTERVENCAO = {
  agentes: ['ministerio', 'governo', 'estado', 'poder publico', 'poder executivo',
    'poder legislativo', 'poder judiciario', 'congresso', 'camara', 'senado', 'prefeitura',
    'secretaria', 'escola', 'escolas', 'universidade', 'universidades', 'midia',
    'imprensa', 'ong', 'ongs', 'organizacoes nao governamentais', 'familia', 'familias',
    'sociedade civil', 'empresa', 'empresas', 'setor privado', 'mec', 'inep', 'sus',
    'policia', 'professores', 'profissionais', 'conselho', 'comite', 'associacao',
    'sociedade', 'cidadania', 'juventude', 'municipio', 'estados', 'uniao', 'anvisa',
    'defensoria', 'ministerio publico', 'oab', 'sistema de ensino', 'rede publica'],
  acoes: ['criar', 'crie', 'criem', 'criacao', 'exigir', 'exija', 'obrigar', 'obrigue',
    'determinar', 'determine', 'instituir', 'institua', 'normatizar', 'financiar',
    'financie', 'subsidiar', 'realizar', 'realize', 'efetivar', 'efetive', 'inserir',
    'insira', 'disponibilizar', 'monitorar', 'avaliar', 'qualificar', 'treinar',
    'contratar', 'contrate', 'concluir', 'conclua', 'garantir', 'levar', 'promover campanhas', 'implementar', 'implemente', 'promover',
    'promova', 'promocao', 'investir', 'invista', 'ampliar', 'amplie', 'desenvolver',
    'desenvolva', 'fiscalizar', 'fiscalize', 'garantir', 'garanta', 'oferecer', 'ofereca',
    'construir', 'construa', 'estabelecer', 'estabeleca', 'capacitar', 'capacite',
    'distribuir', 'distribua', 'reformular', 'reformule', 'incentivar', 'incentive',
    'regulamentar', 'regulamente', 'destinar', 'destine', 'aplicar', 'aplique',
    'fortalecer', 'fortaleca', 'expandir', 'expanda', 'reduzir', 'reduza', 'combater',
    'combata', 'conscientizar', 'conscientize', 'divulgar', 'divulgue', 'incluir',
    'inclua', 'assegurar', 'assegure', 'criar campanhas', 'promover campanhas',
    'aumentar', 'aumente', 'criar programas', 'executar', 'execute', 'elaborar',
    'elabore', 'fomentar', 'fomente', 'mapear', 'mapeie', 'acompanhar', 'acompanhe'],
  meios: ['por meio de', 'por meio da', 'por meio do', 'atraves de', 'atraves da',
    'atraves do', 'mediante', 'com o auxilio', 'com o apoio', 'com o uso', 'utilizando',
    'por intermedio', 'a partir de', 'em parceria com', 'junto a', 'com recursos',
    'via', 'por via', 'com verbas', 'por campanhas', 'por palestras', 'por aulas',
    'por projetos', 'por programas', 'por aplicativos', 'por plataformas'],
  finalidades: ['a fim de', 'para que', 'com o objetivo de', 'com a finalidade de',
    'de modo a', 'de forma a', 'visando', 'no intuito de', 'com o proposito de',
    'para garantir', 'para reduzir', 'para promover', 'para combater', 'para ampliar',
    'para assegurar', 'para conscientizar', 'de maneira a'],
  detalhamento: ['tais como', 'como por exemplo', 'por exemplo', 'visto que',
    'uma vez que', 'isto e', 'ou seja', 'especialmente', 'sobretudo', 'dado que',
    'principalmente', 'como', 'sob a forma de', 'em especial', 'sobretudo nas']
};

/** Sinais de proposta que desrespeita direitos humanos (aviso na C5). */
export const VIOLACAO_DH = ['tortura', 'mutilacao', 'mutilar', 'execucao sumaria',
  'pena de morte', 'justica com as proprias maos', 'linchamento', 'castracao',
  'castrar', 'exterminio', 'discurso de odio', 'trabalho infantil forcado',
  'violencia fisica contra', 'internacao forcada', 'esterilizacao forcada'];

/* ------------------------------------------------------------------ */
/* Núcleos semânticos para checagem de tema (fallback genérico)        */
/* ------------------------------------------------------------------ */

export const VERBOS_ACAO_PROVA = ['deve', 'devem', 'deveria', 'deveriam', 'e necessario',
  'e preciso', 'e fundamental', 'urge', 'cabe ao', 'cabe a', 'e imprescindivel'];

export const PALAVRAS_MONOSSILABICAS_OK = new Set(['a', 'e', 'o', 'as', 'os', 'em', 'de', 'da', 'do', 'se', 'que', 'com', 'por', 'ja', 'ha', 'mais', 'mas', 'nao', 'si', 'ou', 'ao', 'aos', 'so', 'ja']);

/* ------------------------------------------------------------------ */
/* REGRAS DE CONTEXTO — gramática que lista de palavras não alcança    */
/* ------------------------------------------------------------------ */
/*
 * DESVIOS_CONSTRUCAO casa forma fixa ("as vezes"). Só que a maior parte dos
 * desvios de norma não é forma fixa: é RELAÇÃO entre duas palavras — um "à"
 * que não devia existir, um sujeito plural com verbo no singular. Isso exige
 * contexto, e contexto aqui é expressão regular sobre o texto original em
 * minúsculas (com acento: sem o acento não há como enxergar crase).
 *
 * Cada regra é conservadora de propósito. Uma regra que só acerta em 60% dos
 * casos desconta nota de redação boa — pior do que não ter a regra. As que
 * ficaram de fora estão anotadas no fim do arquivo.
 *
 * Campos:
 *   re       — regex global sobre o texto em minúsculas
 *   tipo     — 'crase' | 'concordância verbal' | 'concordância nominal' | 'pontuação' | 'regência'
 *   sugestao — o que escrever no lugar
 *   peso     — multiplicador do desconto (padrão 1)
 */

const INFINITIVOS = 'ser|estar|ter|haver|fazer|dizer|dar|ver|ir|vir|poder|dever|combater|garantir|buscar|evitar|promover|reduzir|ampliar|construir|manter|permitir|possibilitar|contribuir|fiscalizar|investir|criar|ofertar|assegurar|respeitar|valorizar|enfrentar|superar|incluir|proteger|acessar|cuidar|pensar|agir|mudar|transformar|reverter|mitigar|conter|frear|punir|educar|conscientizar|debater|discutir';

/*
 * Fronteira de palavra para o português: `\b` do JavaScript só conhece
 * [A-Za-z0-9_] — e para ele "à", "é" e "política" NÃO são letras. Por isso
 * `\bà\b` nunca casa, e regra de crase escrita com `\b` passa em branco no
 * texto inteiro. Usamos lookarounds Unicode em vez de `\b`.
 */
const L = '[\\p{L}\\p{N}]';
const iniW = `(?<!${L})`;
const fimW = `(?!${L})`;
const regra = (id, tipo, corpo, sugestao, peso) => ({
  id, tipo, sugestao,
  ...(peso ? { peso } : {}),
  re: new RegExp(`${iniW}(?:${corpo})${fimW}`, 'gu'),
});

export const REGRAS_CONTEXTO = [
  /* ---------------- crase ---------------- */
  regra('crase-locucao-masculina', 'crase',
    'à\\s+(?:partir|fim|respeito|menos|princ[íi]pio|dist[âa]ncia|exemplo|rigor|contento|salvo|caminho|olho\\s+nu|tempo)\\b',
    'sem crase: “a partir de”, “a fim de”, “a respeito de”, “a menos que”, “a princípio”'),

  regra('crase-antes-de-verbo', 'crase',
    `à\\s+(?:se\\s+)?(?:${INFINITIVOS})`,
    'antes de verbo não há crase: “a ser”, “a fazer”, “a combater”'),

  regra('crase-antes-de-masculino', 'crase',
    'à\\s+(?:o|os|um|uns|uma|umas|ao|aos|dois|três|quatro|todos|todo|alguns|algum|muitos|muitas|algumas|v[áa]rios|v[áa]rias|cada|nenhum)',
    'crase só antes de palavra feminina: “a todos”, “a um”, “a muitos”'),

  regra('crase-aquela', 'crase',
    'a\\s+(?:aquela|aquele|aquilo|aquelas|aqueles)',
    '“àquela”, “àquele”, “àquilo” (crase antes de aquele/aquela)'),

  regra('crase-faltando-regencia', 'crase',
    '(?:devido|graças|em\\s+relação|quanto|referente|frente|obedecendo|contrário|paralelo|semelhante)\\s+a\\s+(?:falta|educação|saúde|sociedade|população|violência|desigualdade|família|escola|mulher|mulheres|necessidade|possibilidade|lei|constituição|mídia|internet|tecnologia|realidade|situação|questão|prática)',
    'falta crase: “devido à falta”, “em relação à educação”, “graças à lei”'),

  regra('crase-nivel', 'crase',
    '(?:à|a)\\s+n[íi]vel\\s+de',
    '“em nível de”; “à nível” acumula dois erros', 0.8),

  regra('crase-antes-de-que', 'crase',
    '(?:devido|graças|em\\s+relação|quanto)\\s+à\\s+que',
    '“devido a que” / “em relação ao que”'),

  /* ---------------- concordância verbal ---------------- */
  regra('cv-sujeito-plural-verbo-singular', 'concordância verbal',
    '(?:os|as)\\s+[\\p{L}]+(?:s|es|is)\\s+(?:que\\s+)?(?:não\\s+)?(?:é|era|foi|tem|há|faz|deve|pode|precisa|existe|falta|consiste|visa|busca|necessita|contribui|provoca|causa|atinge|afeta|enfrenta|apresenta|representa|constitui|sofre|recebe|merece|ocorre|cresce|aumenta|diminui|permanece|deixa)',
    'sujeito no plural pede verbo no plural: “os jovens precisam”, “as pessoas têm”'),

  regra('cv-haver-existencial', 'concordância verbal',
    '(?:houveram|haviam|haveriam|houveriam)\\s+(?:muitos|muitas|vários|várias|pessoas|casos|problemas|formas|maneiras|fatores|desafios|dados|estudos|indivíduos|jovens|crianças|alunos|brasileiros|cidadãos|razões|motivos|projetos|leis|políticas|medidas|ações|iniciativas|registros|relatos|exemplos)',
    '“haver” no sentido de existir é impessoal: “houve muitos casos”, “havia pessoas”'),

  regra('cv-fazer-tempo', 'concordância verbal',
    'fazem\\s+(?:\\p{L}+\\s+)?(?:anos|décadas|séculos|meses|dias)',
    '“fazer” indicando tempo é impessoal: “faz dez anos”, “faz décadas”'),

  regra('cv-existe-plural', 'concordância verbal',
    'existe\\s+(?:pessoas|jovens|crianças|casos|problemas|formas|maneiras|fatores|desafios|indivíduos|homens|mulheres|alunos|estudantes|brasileiros|cidadãos|dados|estudos|razões|motivos|projetos|leis|políticas|medidas|ações|iniciativas|recursos|investimentos|profissionais|oportunidades|informações|relações)',
    '“existem pessoas”, “existem casos” (o verbo concorda com o que vem depois)'),

  regra('cv-falta-plural', 'concordância verbal',
    'falta\\s+(?:recursos|investimentos|políticas|medidas|ações|dados|estudos|incentivos|profissionais|leis|projetos|oportunidades|informações|verbas|equipamentos|médicos|professores|empregos|moradias)',
    '“faltam recursos”, “faltam políticas”'),

  regra('cv-se-tratam-de', 'concordância verbal',
    'se\\s+tratam\\s+de',
    '“trata-se de” (a partícula se indetermina o sujeito; verbo no singular)'),

  regra('cv-coletivo-singular', 'concordância verbal',
    '(?:a\\s+maioria|a\\s+maior\\s+parte|o\\s+conjunto|a\\s+população|o\\s+público)\\s+(?:dos|das|de)?\\s*\\p{L}*\\s*(?:precisam|têm|fazem|podem|devem|sofrem|enfrentam|buscam|querem)',
    'com coletivo no singular + “de”, a norma prefere o singular: “a maioria dos jovens precisa”', 0.5),

  /* ---------------- concordância nominal ---------------- */
  regra('cn-artigo-plural-adjetivo-singular', 'concordância nominal',
    '(?:os|as)\\s+(?:mesmo|próprio|primeiro|último|único|público|pública|social|humano|humana|cultural|político|política|econômico|econômica|ambiental|educacional|básico|básica|fundamental|digital|urbano|urbana|rural|racial|étnico|étnica|mental|físico|física|brasileiro|brasileira|profissional|mundial|nacional|coletivo|coletiva|individual)',
    'artigo no plural pede adjetivo no plural: “os mesmos direitos”, “as políticas públicas”'),

  regra('cn-substantivo-plural-adjetivo-singular', 'concordância nominal',
    '(?:os|as|muitos|muitas|vários|várias|diversos|diversas)\\s+[\\p{L}]+(?:ões|ães|ais|eis|os|as|es)\\s+(?:público|pública|social|humano|humana|cultural|político|política|econômico|econômica|ambiental|educacional|digital|urbano|urbana|rural|racial|étnico|étnica|mental|físico|física)',
    'o adjetivo acompanha o substantivo: “direitos sociais”, “políticas públicas”'),

  regra('cn-numeral-substantivo-singular', 'concordância nominal',
    '(?:dois|duas|três|quatro|cinco|seis|sete|oito|nove|dez|vinte|cem)\\s+(?:vez|ano|década|mês|dia|pessoa|caso|projeto|lei|política|medida|ação|forma|maneira|exemplo|motivo|grupo)',
    'depois de numeral maior que um, o substantivo vai ao plural: “três vezes”, “cinco anos”'),

  regra('cn-meio-invariavel', 'concordância nominal',
    'meia\\s+(?:cansad[oa]|preocupad[oa]|exaust[oa]|perdid[oa]|atrasad[oa]|desmotivad[oa]|sozinh[oa])',
    '“meio” como advérbio não flexiona: “meio cansada”'),

  regra('cn-menos-invariavel', 'concordância nominal',
    'menas',
    '“menos” é invariável', 0.4),

  /* ---------------- pontuação ---------------- */
  regra('pont-virgula-sujeito-verbo', 'pontuação',
    '(?:^|[.;:!?]\\s+|\\n)\\s*(?:o|a|os|as)\\s+[\\p{L}]+\\s*,\\s*(?:é|são|foi|foram|era|eram|tem|têm|há|deve|devem|pode|podem|está|estão|representa|representam|constitui|constituem|consiste|consistem|significa|significam|exige|exigem)',
    'não se separa o sujeito do verbo por vírgula'),

];

/*
 * Regras deliberadamente NÃO implementadas (e por quê):
 *  - crase antes de nome de lugar ("vou à escola"): depende de saber se o
 *    lugar aceita artigo — heurística cara e errada com frequência.
 *  - vírgula antes de "e" / "mas": depende da estrutura da oração.
 *  - vírgula antes de "que": não há como distinguir oração restritiva de
 *    explicativa sem análise sintática — "A educação, que é um direito, falha"
 *    é correta e seria acusada de erro.
 *  - "a maioria ... são": as duas formas são aceitas pela norma culta.
 *  - regência de "assistir/visar/implicar" fora das formas fixas: exige
 *    distinguir sentido (assistir o doente ≠ assistir ao filme).
 */
