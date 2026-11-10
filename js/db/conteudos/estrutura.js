/**
 * Mapa dos conteúdos: 4 áreas → matérias → conteúdos.
 *
 * Esta é a espinha do guia. O sumário (#/conteudos) lê daqui, a lista de uma
 * matéria (#/conteudos/materia/:id) lê daqui, e a página de um conteúdo
 * (#/conteudos/c/:id) procura o texto em paginas-<area>.js pelo mesmo `id`.
 *
 * Regra: o `id` é global e estável. Se um conteúdo for renomeado, o id fica —
 * link salvo no celular de um aluno não pode virar 404 porque o título mudou.
 *
 * `canais` são os canais indicados para a matéria; o vídeo de cada página é
 * busca no YouTube com o título do conteúdo + o nome do canal (ver
 * tools/buscar-videos.mjs). Matéria sem canal indicado busca pelo título só.
 */

export const AREAS = [
  {
    id: 'linguagens',
    nome: 'Linguagens, Códigos e suas Tecnologias',
    sigla: 'LC',
    resumo: 'Interpretação, literatura, artes, educação física e língua estrangeira. O dia 1 da prova.',
    materias: [
      {
        id: 'portugues',
        nome: 'Língua Portuguesa e Interpretação',
        canais: ['Professor Noslen', 'Gramática em Vídeo (Prof. Fabio Alves)'],
        conteudos: [
          { id: 'lin-interpretacao', titulo: 'Interpretação de texto' },
          { id: 'lin-variacao', titulo: 'Variação linguística' },
          { id: 'lin-funcoes', titulo: 'Funções da linguagem' },
          { id: 'lin-generos', titulo: 'Gêneros e tipos textuais' },
          { id: 'lin-coesao', titulo: 'Coesão e coerência' },
          { id: 'lin-figuras', titulo: 'Figuras de linguagem' },
        ],
      },
      {
        id: 'literatura',
        nome: 'Literatura',
        canais: ['Prof. Beto Brito', 'Professor Noslen'],
        conteudos: [
          { id: 'lit-modernismo', titulo: 'Modernismo (1ª e 2ª fases)' },
          { id: 'lit-romantismo', titulo: 'Romantismo' },
          { id: 'lit-realismo', titulo: 'Realismo e Naturalismo' },
          { id: 'lit-contemporanea', titulo: 'Literatura contemporânea' },
          { id: 'lit-intertexto', titulo: 'Intertextualidade e artes visuais' },
        ],
      },
      {
        id: 'artes',
        nome: 'Artes e Educação Física',
        canais: [],
        conteudos: [
          { id: 'art-vanguardas', titulo: 'Vanguardas europeias' },
          { id: 'art-contemporanea', titulo: 'Arte contemporânea' },
          { id: 'art-plasticas', titulo: 'Elementos das artes visuais' },
          { id: 'art-patrimonio', titulo: 'Patrimônio cultural' },
          { id: 'edf-corporal', titulo: 'Práticas corporais, saúde e sociedade' },
        ],
      },
      {
        id: 'estrangeira',
        nome: 'Língua Estrangeira (Inglês / Espanhol)',
        canais: [],
        conteudos: [
          { id: 'ing-interpretacao', titulo: 'Inglês: interpretação de texto' },
          { id: 'esp-interpretacao', titulo: 'Espanhol: interpretação de texto' },
        ],
      },
    ],
  },
  {
    id: 'humanas',
    nome: 'Ciências Humanas e suas Tecnologias',
    sigla: 'CH',
    resumo: 'História, geografia, filosofia e sociologia — a prova mais interpretativa do Enem.',
    materias: [
      {
        id: 'historia',
        nome: 'História',
        canais: ['Se Liga Nessa História', 'História Online (Prof. Rodolfo Neves)'],
        conteudos: [
          { id: 'his-colonia', titulo: 'Brasil Colônia' },
          { id: 'his-imperio', titulo: 'Brasil Império' },
          { id: 'his-republica-velha', titulo: 'República Velha' },
          { id: 'his-vargas', titulo: 'Era Vargas' },
          { id: 'his-ditadura', titulo: 'Ditadura Militar' },
          { id: 'his-redemocratizacao', titulo: 'Redemocratização' },
          { id: 'his-revolucao-industrial', titulo: 'Revolução Industrial' },
          { id: 'his-guerra-fria', titulo: 'Guerra Fria' },
          { id: 'his-guerras-mundiais', titulo: 'Primeira e Segunda Guerra Mundial' },
          { id: 'his-antiguidade', titulo: 'Antiguidade Clássica' },
          { id: 'his-indigenas', titulo: 'Povos indígenas e escravidão' },
        ],
      },
      {
        id: 'geografia',
        nome: 'Geografia',
        canais: ['Terra Negra', 'Geografia Irada (Prof. Marcelo)'],
        conteudos: [
          { id: 'geo-biomas', titulo: 'Biomas brasileiros' },
          { id: 'geo-clima', titulo: 'Desmatamento e mudanças climáticas' },
          { id: 'geo-climatologia', titulo: 'Climatologia' },
          { id: 'geo-agraria', titulo: 'Geografia agrária' },
          { id: 'geo-urbanizacao', titulo: 'Urbanização' },
          { id: 'geo-demografia', titulo: 'Demografia' },
          { id: 'geo-geopolitica', titulo: 'Geopolítica global' },
          { id: 'geo-globalizacao', titulo: 'Globalização e blocos econômicos' },
        ],
      },
      {
        id: 'filosofia',
        nome: 'Filosofia',
        canais: ['A Filosofia Explica (Prof. Filicio Mulinari)'],
        conteudos: [
          { id: 'fil-antiga', titulo: 'Filosofia antiga: Sócrates, Platão e Aristóteles' },
          { id: 'fil-etica', titulo: 'Ética' },
          { id: 'fil-politica', titulo: 'Filosofia política' },
          { id: 'fil-iluminismo', titulo: 'Iluminismo' },
          { id: 'fil-racionalismo-empirismo', titulo: 'Racionalismo e empirismo' },
        ],
      },
      {
        id: 'sociologia',
        nome: 'Sociologia',
        canais: ['A Filosofia Explica (Prof. Filicio Mulinari)'],
        conteudos: [
          { id: 'soc-trabalho', titulo: 'Mundo do trabalho' },
          { id: 'soc-movimentos', titulo: 'Movimentos sociais e cidadania' },
          { id: 'soc-cultura', titulo: 'Cultura e indústria cultural' },
          { id: 'soc-classicos', titulo: 'Marx, Durkheim e Weber' },
        ],
      },
    ],
  },
  {
    id: 'natureza',
    nome: 'Ciências da Natureza e suas Tecnologias',
    sigla: 'CN',
    resumo: 'Biologia, física e química: a prova com mais cálculo e mais gráfico.',
    materias: [
      {
        id: 'biologia',
        nome: 'Biologia',
        canais: ['Biologia Total com Prof. Jubilut', 'Biologia com Prof. Guilherme Goulart'],
        conteudos: [
          { id: 'bio-ecologia', titulo: 'Ecologia: ciclos, cadeias e impactos' },
          { id: 'bio-genetica', titulo: 'Genética e biotecnologia' },
          { id: 'bio-citologia', titulo: 'Citologia' },
          { id: 'bio-fisiologia', titulo: 'Fisiologia humana' },
          { id: 'bio-evolucao', titulo: 'Evolução' },
          { id: 'bio-reino', titulo: 'Classificação e reinos' },
        ],
      },
      {
        id: 'fisica',
        nome: 'Física',
        canais: ['Física com Prof. Boaro', 'Física Total (Prof. Ivys Urquiza)'],
        conteudos: [
          { id: 'fis-eletrodinamica', titulo: 'Eletrodinâmica' },
          { id: 'fis-mecanica', titulo: 'Mecânica: cinemática e leis de Newton' },
          { id: 'fis-energia', titulo: 'Trabalho, energia e potência' },
          { id: 'fis-termologia', titulo: 'Termologia e calorimetria' },
          { id: 'fis-ondulatoria', titulo: 'Ondulatória' },
          { id: 'fis-optica', titulo: 'Óptica' },
        ],
      },
      {
        id: 'quimica',
        nome: 'Química',
        canais: ['Química em Ação (Prof. Paulo Valim)', 'Química Simples'],
        conteudos: [
          { id: 'qui-ligacoes', titulo: 'Ligações químicas' },
          { id: 'qui-estequiometria', titulo: 'Estequiometria' },
          { id: 'qui-solucoes', titulo: 'Soluções' },
          { id: 'qui-termoquimica', titulo: 'Termoquímica' },
          { id: 'qui-eletroquimica', titulo: 'Eletroquímica' },
          { id: 'qui-organica', titulo: 'Química orgânica' },
          { id: 'qui-ambiental', titulo: 'Química ambiental' },
        ],
      },
    ],
  },
  {
    id: 'matematica',
    nome: 'Matemática e suas Tecnologias',
    sigla: 'MT',
    resumo: 'A área em que acertar mais questões muda a nota final de forma mais direta.',
    materias: [
      {
        id: 'mat-basica',
        nome: 'Matemática Básica',
        canais: ['Professor Ferretto', 'Matemática Rio com Rafael Procopio'],
        conteudos: [
          { id: 'mat-porcentagem', titulo: 'Porcentagem' },
          { id: 'mat-razao-proporcao', titulo: 'Razão e proporção' },
          { id: 'mat-regra-tres', titulo: 'Regra de três' },
          { id: 'mat-escalas', titulo: 'Escalas e semelhança' },
          { id: 'mat-financeira', titulo: 'Matemática financeira' },
        ],
      },
      {
        id: 'mat-estatistica',
        nome: 'Estatística',
        canais: ['Equaciona com Paulo Pereira', 'Professor Ferretto'],
        conteudos: [
          { id: 'mat-graficos', titulo: 'Leitura de gráficos e tabelas' },
          { id: 'mat-medidas', titulo: 'Média, moda e mediana' },
        ],
      },
      {
        id: 'mat-geometria',
        nome: 'Geometria',
        canais: ['Professor Ferretto', 'Matemática Rio com Rafael Procopio'],
        conteudos: [
          { id: 'mat-geo-plana', titulo: 'Geometria plana' },
          { id: 'mat-geo-espacial', titulo: 'Geometria espacial' },
        ],
      },
      {
        id: 'mat-funcoes',
        nome: 'Funções',
        canais: ['Equaciona com Paulo Pereira', 'Professor Ferretto'],
        conteudos: [
          { id: 'mat-funcao-1', titulo: 'Função do 1º grau' },
          { id: 'mat-funcao-2', titulo: 'Função do 2º grau' },
          { id: 'mat-exponencial', titulo: 'Função exponencial e logaritmo' },
          { id: 'mat-graficos-funcao', titulo: 'Leitura de gráficos de funções' },
        ],
      },
      {
        id: 'mat-probabilidade',
        nome: 'Probabilidade e Análise Combinatória',
        canais: ['Equaciona com Paulo Pereira', 'Matemática Rio com Rafael Procopio'],
        conteudos: [
          { id: 'mat-probabilidade', titulo: 'Probabilidade' },
          { id: 'mat-combinatoria', titulo: 'Análise combinatória' },
        ],
      },
    ],
  },
];

export const TOTAL_CONTEUDOS = AREAS.reduce(
  (t, a) => t + a.materias.reduce((m, x) => m + x.conteudos.length, 0), 0);

export function areaPorId(id) { return AREAS.find(a => a.id === id) || null; }

export function materiaPorId(id) {
  for (const a of AREAS) {
    const m = a.materias.find(x => x.id === id);
    if (m) return { ...m, area: a };
  }
  return null;
}

export function conteudoPorId(id) {
  for (const a of AREAS) {
    for (const m of a.materias) {
      const c = m.conteudos.find(x => x.id === id);
      if (c) return { ...c, materia: m, area: a };
    }
  }
  return null;
}
