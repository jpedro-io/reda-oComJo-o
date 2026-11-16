/**
 * Expansão dos conteúdos de natureza.
 */
export const EXP_NATUREZA = {

  /* --------------------------------------------------------------- ECOLOGIA */
  'bio-ecologia': {
    chave: [
      'Cadeia e teia alimentar: níveis tróficos e fluxo de energia',
      'Relações ecológicas: harmônicas e desarmônicas',
      'Ciclos biogeoquímicos: carbono, nitrogênio e água',
      'Sucessão ecológica e equilíbrio dinâmico',
      'Impactos ambientais: eutrofização, bioacumulação, efeito estufa',
    ],
    secoes: [
      {
        h: 'Energia flui, matéria cicla',
        ps: [
          'Toda cadeia alimentar começa em um produtor, organismo autotrófico que converte energia luminosa em energia química pela fotossíntese ou quimiossíntese. Os consumidores primários comem produtores; secundários comem primários; e assim por diante. Os decompositores fecham o ciclo, devolvendo ao ambiente os nutrientes contidos na matéria orgânica morta.',
          'A energia segue um caminho de mão única: em uma aproximação didática, cerca de 10% é transferida entre níveis, embora a eficiência real varie bastante. Por isso as cadeias têm poucos níveis e as pirâmides de energia são sempre mais largas na base. Já a matéria é reciclada indefinidamente — é a diferença central entre fluxo de energia e ciclo de matéria.',
        ],
      },
      {
        h: 'Relações ecológicas',
        ps: [
          'Relações harmônicas trazem benefício a pelo menos um dos envolvidos: mutualismo (liquens, micorrizas, polinização), protocooperação (paguro e anêmona), comensalismo (tubarão e rêmora) e inquilinismo (orquídea na árvore). Relações desarmônicas trazem prejuízo: predação, parasitismo, competição e amensalismo (fungo que inibe bactérias).',
          'A chave para classificar é perguntar quem ganha e quem perde. Na competição, ambos perdem; no parasitismo, o parasita ganha e o hospedeiro perde, mas não é morto imediatamente — diferença em relação à predação.',
        ],
      },
      {
        h: 'Ciclos biogeoquímicos',
        ps: [
          'No ciclo do carbono, a fotossíntese retira CO₂ da atmosfera e a respiração, a decomposição e a queima de combustíveis fósseis o devolvem. O desequilíbrio por emissões industriais explica o efeito estufa intensificado. No ciclo do nitrogênio, bactérias fixadoras (Rhizobium em nódulos de leguminosas), nitrificantes e desnitrificantes tornam o N₂ atmosférico assimilável e depois o devolvem ao ar.',
          'O ciclo da água envolve evaporação, transpiração vegetal, condensação e precipitação. A retirada da mata ciliar e a impermeabilização do solo alteram esse ciclo e produzem enchentes e ilhas de calor.',
        ],
      },
      {
        h: 'Sucessão, eutrofização e bioacumulação',
        ps: [
          'Sucessão ecológica é a substituição gradual de comunidades: começa com espécies pioneiras em área sem solo (rocha, lava) e caminha até a comunidade clímax, com maior biodiversidade e maior biomassa. Ao longo da sucessão, a produtividade líquida cai e a reciclagem de nutrientes aumenta.',
          'Eutrofização é o enriquecimento da água por nutrientes (nitrogênio e fósforo de esgoto e fertilizantes), que provoca proliferação de algas, consumo do oxigênio dissolvido e morte de peixes. Bioacumulação é o acúmulo de uma substância no organismo ao longo do tempo; a biomagnificação é o aumento da concentração entre níveis tróficos, quando ocorre: quanto mais alto o nível, maior a concentração — por isso o mercúrio é maior em peixes grandes.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Regra dos 10%',
        texto: 'Se os produtores fixam 10.000 kcal, quanta energia chega ao consumidor terciário?',
        comentario: '10.000 → 1.000 → 100 → 10 kcal. Três transferências reduzem a energia a 0,1%.',
      },
      {
        titulo: 'Bioacumulação de mercúrio',
        texto: 'Fitoplâncton 0,01 ppm → peixe pequeno 0,5 ppm → peixe grande 5 ppm.',
        comentario: 'A concentração aumenta a cada nível trófico, porque o contaminante é eliminado lentamente em relação à absorção.',
      },
    ],
    figuras: [
      {
        titulo: 'Cadeia alimentar e perda de energia',
        tipo: 'fluxo',
        itens: ['Produtor (10.000 kcal)', 'Consumidor primário (1.000)', 'Consumidor secundário (100)', 'Consumidor terciário (10)', 'Decompositores'],
        legenda: 'Cada seta representa uma transferência com perda de cerca de 90% em calor.',
      },
    ],
    formulas: [
      { titulo: 'Regra dos 10%', expr: 'E(n+1) ≈ 0,10 × E(n)', uso: 'Energia disponível no nível trófico seguinte.' },
      { titulo: 'Produtividade líquida', expr: 'PL = PB − respiração', uso: 'PB = produtividade bruta.' },
      { titulo: 'Diversidade (índice de Shannon)', expr: 'H = −Σ pᵢ · ln pᵢ', uso: 'pᵢ = proporção de cada espécie.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Em uma cadeia alimentar, os produtores fixam 50.000 kcal de energia.'],
        enunciado: 'A energia disponível para o consumidor secundário é de aproximadamente',
        alternativas: ['5.000 kcal', '500 kcal', '50 kcal', '5 kcal', '0,5 kcal'],
        correta: 'B',
        resolucao: [
          'Aplicando a regra dos 10%: produtor → primário = 5.000 kcal.',
          'Primário → secundário = 10% de 5.000 = 500 kcal.',
          'São duas transferências, então 50.000 × 0,1² = 500 kcal.',
        ],
        porqueErram: [
          'A: faz apenas uma transferência.',
          'C: aplica três transferências (chega ao terciário).',
          'D e E: aplicam a regra quatro ou cinco vezes, sem contar os níveis corretamente.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'O lançamento de esgoto rico em nitrogênio e fósforo em um lago provoca proliferação de algas, aumento da turbidez e mortandade de peixes. Esse processo é chamado de',
        alternativas: ['bioacumulação', 'eutrofização', 'sucessão ecológica', 'magnificação trófica', 'amensalismo'],
        correta: 'B',
        resolucao: [
          'O excesso de nutrientes é o gatilho: há floração de algas e cianobactérias.',
          'A decomposição dessas algas consome o oxigênio dissolvido na água.',
          'A queda do oxigênio provoca a morte de peixes e outros organismos aeróbios. O conjunto é a eutrofização.',
        ],
        porqueErram: [
          'A e D: descrevem acúmulo de substâncias ao longo da cadeia, não o excesso de nutrientes.',
          'C: sucessão é substituição de comunidades ao longo do tempo.',
          'E: amensalismo é relação entre espécies em que uma é prejudicada sem benefício da outra.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Sobre o fluxo de energia e o ciclo da matéria nos ecossistemas, é correto afirmar que',
        alternativas: [
          'a energia e a matéria são recicladas indefinidamente',
          'a energia é reciclada e a matéria é perdida na forma de calor',
          'a energia flui em sentido único, com perdas em calor, e a matéria é reciclada',
          'a energia retorna aos produtores pelos decompositores',
          'a matéria não passa pelos decompositores',
        ],
        correta: 'C',
        resolucao: [
          'A energia entra como luz, é convertida em energia química e dissipa-se como calor na respiração.',
          'A matéria orgânica é decomposta em sais minerais, água e CO₂, reaproveitados pelos produtores.',
          'Logo: energia = fluxo unidirecional; matéria = ciclagem.',
        ],
        porqueErram: [
          'A e B: trocam as propriedades da energia e da matéria.',
          'D: decompositores reciclam nutrientes, não energia.',
          'E: nega o papel central dos decompositores na ciclagem.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- GENÉTICA */
  'bio-genetica': {
    chave: [
      'Leis de Mendel e o quadro de Punnett',
      'Mendelismo: segregação e distribuição independente',
      'Heredograma e padrões de herança',
      'Grupos sanguíneos ABO e Rh',
      'Genética molecular: DNA, RNA e código genético',
    ],
    secoes: [
      {
        h: 'As duas leis de Mendel',
        ps: [
          'A primeira lei (segregação dos fatores) diz que cada característica é determinada por um par de alelos que se separam na formação dos gametas: cada gameta recebe apenas um alelo de cada par. Um indivíduo Aa forma gametas A e a em proporções iguais.',
          'A segunda lei (distribuição independente) vale para genes localizados em cromossomos diferentes: eles se combinam de forma independente na meiose. No cruzamento AaBb × AaBb, a proporção fenotípica clássica é 9:3:3:1 quando há dominância completa.',
        ],
      },
      {
        h: 'Heredogramas e padrões de herança',
        ps: [
          'Herança autossômica recessiva aparece em ambos os sexos, com frequência semelhante, e pode "pular" gerações em famílias com consanguinidade. Autossômica dominante aparece em todas as gerações, e todo afetado tem ao menos um genitor afetado.',
          'Herança ligada ao X recessiva afeta sobretudo homens, que têm apenas um cromossomo X; mulheres são portadoras. Não há transmissão de pai para filho homem, e a mãe transmite a todos os filhos. Daltonismo e hemofilia são os exemplos clássicos.',
        ],
      },
      {
        h: 'Sistema ABO e fator Rh',
        ps: [
          'O sistema ABO tem três alelos: I^A e I^B são codominantes entre si e dominantes sobre i. Genótipos: A = I^AI^A ou I^Ai; B = I^BI^B ou I^Bi; AB = I^AI^B; O = ii. Uma transfusão precisa respeitar a compatibilidade: O é doador universal de hemácias; AB é receptor universal.',
          'No fator Rh, Rh+ é dominante sobre Rh−. A eritroblastose fetal ocorre quando mãe Rh− gera filho Rh+ e é sensibilizada; previne-se com imunoglobulina anti-Rh.',
        ],
      },
      {
        h: 'Do DNA à proteína',
        ps: [
          'O DNA é uma dupla hélice de nucleotídeos (adenina, timina, citosina, guanina) unidos por pontes de hidrogênio: A com T, C com G. Na replicação semiconservativa, cada fita serve de molde.',
          'Na transcrição, o DNA gera RNA mensageiro (com uracila no lugar da timina); na tradução, o ribossomo lê os códons de três bases e monta os aminoácidos. Código genético é degenerado — vários códons codificam o mesmo aminoácido — e universal.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Cruzamento Aa × Aa',
        texto: 'Dois heterozigotos para uma característica de dominância completa.',
        comentario: 'Proporção genotípica 1 AA : 2 Aa : 1 aa; fenotípica 3 : 1.',
      },
      {
        titulo: 'Pais do grupo A com B',
        texto: 'I^Ai × I^Bi.',
        comentario: 'Filhos podem ser AB, A, B ou O — cada um com 25% de chance.',
      },
    ],
    figuras: [
      {
        titulo: 'Quadro de Punnett Aa × Aa',
        tipo: 'lista',
        itens: [
          { txt: 'AA — 25% (homozigoto dominante)' },
          { txt: 'Aa — 50% (heterozigoto)' },
          { txt: 'aa — 25% (homozigoto recessivo)' },
        ],
        legenda: 'Fenótipos: 75% dominante e 25% recessivo.',
      },
    ],
    formulas: [
      { titulo: 'Probabilidade de fenótipos', expr: 'P(A_) = 3/4 em Aa × Aa', uso: 'Dominância completa, um gene.' },
      { titulo: 'Dois genes independentes', expr: 'P = P₁ × P₂', uso: 'Segunda lei de Mendel.' },
      { titulo: 'Base nitrogenada par', expr: 'A–T · C–G (DNA)', uso: 'No RNA: A–U.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Do cruzamento entre dois indivíduos heterozigotos Aa para uma característica de dominância completa, espera-se que a descendência apresente',
        alternativas: ['100% de fenótipo dominante', '75% de fenótipo dominante e 25% recessivo', '50% dominante e 50% recessivo', '25% dominante e 75% recessivo', '100% de heterozigotos'],
        correta: 'B',
        resolucao: [
          'Monte o quadro de Punnett: gametas A e a de cada genitor.',
          'Combinações: AA, Aa, Aa, aa.',
          'AA e Aa (3/4) mostram o fenótipo dominante; aa (1/4) mostra o recessivo: 75% e 25%.',
        ],
        porqueErram: [
          'A: considera que o heterozigoto não transmite o alelo recessivo.',
          'C e D: confundem proporção genotípica com fenotípica.',
          'E: 50% são heterozigotos, não 100%.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Uma mulher Rh− e um homem Rh+ heterozigoto geram um filho.'],
        enunciado: 'A probabilidade de o filho ser Rh+ e, portanto, exigir atenção quanto à eritroblastose fetal é de',
        alternativas: ['25%', '50%', '75%', '100%', '0%'],
        correta: 'B',
        resolucao: [
          'Genótipo da mãe: rr. Do pai heterozigoto: Rr.',
          'Gametas do pai: R e r em 50% cada.',
          'Filho Rh+ apenas se herdar R: 50% de chance (genótipo Rr).',
        ],
        porqueErram: [
          'A: multiplica por dois indevidamente.',
          'C: assume que Rh+ é maioria na prole de heterozigoto.',
          'D: considera o pai homozigoto. E: nega a possibilidade de filho Rh+.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Em relação ao código genético, é correto afirmar que',
        alternativas: [
          'cada aminoácido é codificado por um único códon',
          'um mesmo aminoácido pode ser codificado por códons diferentes',
          'cada códon codifica dois aminoácidos',
          'a tradução ocorre no núcleo e a transcrição no ribossomo',
          'a uracila é encontrada no DNA e a timina no RNA',
        ],
        correta: 'B',
        resolucao: [
          'O código genético é degenerado: 64 códons codificam 20 aminoácidos.',
          'Isso permite que diferentes sequências produzam a mesma proteína e reduz o efeito de mutações.',
          'A tradução acontece no ribossomo (citoplasma) e a transcrição no núcleo; a uracila está no RNA.',
        ],
        porqueErram: [
          'A: isso seria um código não degenerado.',
          'C: cada códon especifica um único aminoácido.',
          'D e E: invertem local e bases nitrogenadas.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- CITOLOGIA */
  'bio-citologia': {
    chave: [
      'Membrana plasmática e transporte',
      'Organelas e suas funções',
      'Respiração celular e fermentação',
      'Fotossíntese: fase clara e escura',
      'Divisão celular: mitose e meiose',
    ],
    secoes: [
      {
        h: 'Membrana e transporte',
        ps: [
          'A membrana é um mosaico fluido: bicamada de fosfolipídios com proteínas inseridas. Sua permeabilidade seletiva permite passar pequenas moléculas apolares por difusão simples; íons e moléculas polares usam proteínas transportadoras.',
          'Difusão facilitada não gasta energia; transporte ativo gasta ATP (bomba de sódio e potássio). Osmose é a passagem de água do meio menos concentrado em soluto para o mais concentrado: em meio hipertônico a célula murcha (plasmólise em vegetais), em hipotônico ela incha (turgência em vegetais, hemólise em hemácias).',
        ],
      },
      {
        h: 'Organelas: função e relação',
        ps: [
          'Mitocôndria faz a respiração celular aeróbia e é abundante em células de alta demanda energética (músculo, neurônio). Cloroplasto faz fotossíntese, presente em vegetais e algas. Retículo endoplasmático rugoso (com ribossomos) sintetiza proteínas; liso, lipídios e desintoxicação. Complexo golgiense empacota e secreta; lisossomo digere intracelularmente.',
          'Ribossomo é o local da síntese proteica; peroxissomo degrada peróxido de hidrogênio; centríolos organizam o fuso mitótico. Célula vegetal tem parede celular de celulose, cloroplastos e vacúolo grande; célula animal não tem parede nem cloroplasto.',
        ],
      },
      {
        h: 'Respiração celular e fotossíntese',
        ps: [
          'A respiração aeróbia acontece em três etapas: glicólise (citoplasma), ciclo de Krebs e cadeia respiratória (cristas mitocondriais). A equação global é C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energia (cerca de 38 ATP em bactérias, 30–32 em eucariontes por eficiência de transporte).',
          'Na falta de oxigênio ocorre fermentação: alcoólica (leveduras, produz etanol e CO₂) ou lática (músculo, produz lactato). Produz muito menos ATP, mas recicla NAD⁺ e mantém a glicólise. A fotossíntese é o processo inverso e ocorre nos cloroplastos: fase clara (fotólise da água, libera O₂ e gera ATP/NADPH) e fase escura ou ciclo de Calvin (fixa CO₂ e forma glicose).',
        ],
      },
      {
        h: 'Mitose e meiose',
        ps: [
          'Mitose gera duas células idênticas com o mesmo número de cromossomos (2n → 2n) e serve ao crescimento e à reparação. Meiose gera quatro células haploides (2n → n) e serve à formação de gametas, com crossing-over na prófase I e separação de homólogos na anáfase I — é o que gera variabilidade.',
          'Mitose tem uma divisão; meiose, duas. Célula humana: 46 cromossomos na mitose e 23 nos gametas. Erros de separação na meiose causam aneuploidias, como a trissomia do 21.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Osmose em hemácia',
        texto: 'Hemácias colocadas em solução 0,9% de NaCl e em água destilada.',
        comentario: 'Na solução isotônica, mantêm o volume; na água destilada (hipotônica), incham e sofrem hemólise.',
      },
      {
        titulo: 'Energia por via',
        texto: 'Uma molécula de glicose na respiração aeróbia e na fermentação lática.',
        comentario: 'Aproximadamente 30 ATP contra 2 ATP: a diferença explica por que a mitocôndria é estratégica.',
      },
    ],
    figuras: [
      {
        titulo: 'Da glicose ao ATP',
        tipo: 'fluxo',
        itens: ['Glicólise (citoplasma): 2 ATP', 'Ciclo de Krebs (matriz mitocondrial)', 'Cadeia respiratória (cristas)', '≈30 ATP no total', 'Fermentação: apenas 2 ATP'],
        legenda: 'A presença de oxigênio determina a eficiência energética da célula.',
      },
    ],
    formulas: [
      { titulo: 'Respiração aeróbia', expr: 'C₆H₁₂O₆ + 6 O₂ → 6 CO₂ + 6 H₂O + energia', uso: 'Equação global.' },
      { titulo: 'Fotossíntese', expr: '6 CO₂ + 6 H₂O + luz → C₆H₁₂O₆ + 6 O₂', uso: 'Inversa da respiração.' },
      { titulo: 'Meiose', expr: '2n → 4 células n', uso: 'Gametas humanos: 46 → 4 × 23.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Células vegetais colocadas em solução hipertônica, comparadas às inicialmente turgidas, sofrerão',
        alternativas: ['aumento do volume, pois a água entra por osmose', 'redução do volume com afastamento da membrana da parede (plasmólise)', 'ruptura da parede celular', 'aumento da taxa de fotossíntese', 'nenhuma alteração, pois a parede celular impede a troca'],
        correta: 'B',
        resolucao: [
          'Solução hipertônica significa maior concentração de soluto fora da célula.',
          'A água sai da célula por osmose, do meio menos concentrado para o mais concentrado.',
          'O vacúolo perde volume e a membrana se afasta da parede: plasmólise.',
        ],
        porqueErram: [
          'A: descreve o que acontece em meio hipotônico.',
          'C: a parede celular, por ser rígida, impede ruptura — ela não se rompe na plasmólise.',
          'D e E: descartam o transporte de água sem fundamento.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A organela responsável pela síntese de ATP a partir da oxidação de moléculas orgânicas é',
        alternativas: ['o ribossomo', 'o complexo golgiense', 'a mitocôndria', 'o lisossomo', 'o peroxissomo'],
        correta: 'C',
        resolucao: [
          'A produção de ATP por oxidação de glicose e ácidos graxos ocorre na respiração celular.',
          'As etapas Krebs e cadeia respiratória acontecem na mitocôndria.',
          'Essa organela é abundante em células de alta demanda energética, como músculo cardíaco.',
        ],
        porqueErram: [
          'A: sintetiza proteínas.', 'B: secreção e empacotamento.',
          'D: digestão intracelular.', 'E: degrada peróxido de hidrogênio.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'O crossing-over e a separação dos cromossomos homólogos, eventos que geram variabilidade genética nos gametas, ocorrem respectivamente em',
        alternativas: ['prófase I e anáfase I da meiose', 'prófase e anáfase da mitose', 'anáfase II e telófase II', 'metáfase I e prófase II', 'interfase e citocinese'],
        correta: 'A',
        resolucao: [
          'O crossing-over ocorre na prófase I, com a permuta de trechos entre cromátides homólogas.',
          'A separação dos homólogos acontece na anáfase I, quando cada polo recebe um cromossomo de cada par.',
          'Esses dois eventos, junto com a distribuição independente, geram a variabilidade dos gametas.',
        ],
        porqueErram: [
          'B: a mitose não tem pareamento de homólogos nem crossing-over.',
          'C: na anáfase II separam-se as cromátides-irmãs, não os homólogos.',
          'D e E: não correspondem a esses eventos.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- FISIOLOGIA HUMANA */
  'bio-fisiologia': {
    chave: [
      'Sistema digestório: enzimas e onde atuam',
      'Circulação: pequena e grande circulação, pressão',
      'Respiração: hematose e controle do pH',
      'Excreção e equilíbrio hídrico (néfron)',
      'Sistemas endócrino e nervoso: hormônios e impulso',
    ],
    secoes: [
      {
        h: 'Digestão e absorção',
        ps: [
          'A digestão começa na boca, com a amilase salivar sobre o amido. No estômago, o suco gástrico (HCl + pepsina) atua em pH ácido sobre proteínas. No duodeno, o suco pancreático e a bile emulsionam gorduras e completam a digestão de proteínas, carboidratos e lipídios.',
          'A absorção de nutrientes acontece sobretudo no intestino delgado, por vilosidades que aumentam a superfície. O intestino grosso absorve água e sais; a microbiota produz vitaminas K e B12. Água, sais e vitaminas não precisam de digestão — são absorvidos diretamente.',
        ],
      },
      {
        h: 'Circulação',
        ps: [
          'O coração tem quatro câmaras: átrios recebem, ventrículos impulsionam. A pequena circulação (pulmonar) vai do ventrículo direito aos pulmões e volta ao átrio esquerdo, oxigenando o sangue; a grande circulação (sistêmica) sai do ventrículo esquerdo para o corpo e retorna ao átrio direito.',
          'Artérias levam sangue do coração para o corpo (nem sempre arterial: a pulmonar é artéria com sangue venoso); veias trazem de volta, com válvulas e pressão baixa. A pressão arterial depende do débito cardíaco e da resistência periférica — vasoconstrição eleva a pressão, vasodilatação reduz.',
        ],
      },
      {
        h: 'Respiração e excreção',
        ps: [
          'A hematose ocorre nos alvéolos por difusão: O₂ entra no sangue e CO₂ sai. O CO₂, ao reagir com água, forma ácido carbônico e diminui o pH; quimiorreceptores detectam essa queda e aumentam a frequência respiratória. É o elo entre respiração e equilíbrio ácido-base.',
          'O néfron é a unidade funcional do rim: filtração no glomérulo, reabsorção nos túbulos e secreção. O ADH aumenta a reabsorção de água (urina concentrada); a aldosterona aumenta a reabsorção de sódio. Pouca água no corpo → mais ADH → urina menor e mais concentrada.',
        ],
      },
      {
        h: 'Endócrino e nervoso',
        ps: [
          'Hormônios são mensageiros químicos que agem em receptores específicos. Insulina reduz a glicemia (absorção de glicose pelas células); glucagon a eleva; adrenalina prepara para o esforço; tiroxina regula o metabolismo; hormônios sexuais comandam caracteres secundários. A hipófise coordena as demais glândulas.',
          'No neurônio, o impulso é elétrico (despolarização por entrada de Na⁺, repolarização por saída de K⁺) e a transmissão entre neurônios é química, com neurotransmissores na sinapse. Por isso drogas e medicamentos que interferem em neurotransmissores alteram comportamento e sensação de dor.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Controle da glicemia',
        texto: 'Após uma refeição e durante o jejum.',
        comentario: 'Após a refeição, insulina baixa a glicose; no jejum, glucagon a eleva pela quebra do glicogênio.',
      },
      {
        titulo: 'Altitude e respiração',
        texto: 'A pressão parcial de O₂ cai com a altitude.',
        comentario: 'O organismo aumenta a frequência respiratória e a produção de hemácias para compensar.',
      },
    ],
    figuras: [
      {
        titulo: 'Percurso do sangue',
        tipo: 'fluxo',
        itens: ['Ventrículo direito', 'Pulmões (hematose)', 'Átrio esquerdo', 'Ventrículo esquerdo', 'Corpo → átrio direito'],
        legenda: 'A inversão de oxigenação entre as circulações é a chave para interpretar o esquema.',
      },
    ],
    formulas: [
      { titulo: 'Débito cardíaco', expr: 'DC = frequência × volume sistólico', uso: '≈ 70 bpm × 70 mL ≈ 5 L/min.' },
      { titulo: 'Filtração glomerular', expr: 'TFG ≈ 125 mL/min', uso: 'Cerca de 180 L filtrados por dia.' },
      { titulo: 'Efeito do CO₂ no pH', expr: 'CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻', uso: 'Mais CO₂ → mais H⁺ → pH menor.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Em uma pessoa com deficiência de produção de insulina, espera-se',
        alternativas: ['hipoglicemia por excesso de absorção de glicose', 'hiperglicemia, com glicose eliminada na urina', 'aumento da reabsorção de água nos rins', 'redução da produção de glucagon', 'aumento imediato da pressão arterial'],
        correta: 'B',
        resolucao: [
          'A insulina promove a entrada de glicose nas células.',
          'Sem ela, a glicose permanece no sangue: hiperglicemia.',
          'Ao ultrapassar o limiar renal, a glicose é excretada na urina, arrastando água por osmose — é o quadro do diabetes melito.',
        ],
        porqueErram: [
          'A: inverte o efeito da insulina.',
          'C: a perda de água piora, pois a glicose na urina puxa água.',
          'D e E: não têm relação direta com a falta de insulina.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Artérias pulmonares conduzem sangue do coração aos pulmões; veias pulmonares conduzem sangue dos pulmões ao coração.'],
        enunciado: 'Sobre esses vasos, é correto afirmar que',
        alternativas: [
          'a artéria pulmonar transporta sangue arterial rico em O₂',
          'a veia pulmonar transporta sangue venoso rico em CO₂',
          'a artéria pulmonar transporta sangue venoso e a veia pulmonar, sangue arterial',
          'ambas transportam sangue arterial',
          'a classificação do vaso depende do tipo de sangue que ele transporta',
        ],
        correta: 'C',
        resolucao: [
          'A classificação artéria/veia depende do sentido do fluxo em relação ao coração, não da oxigenação.',
          'A artéria pulmonar sai do ventrículo direito com sangue venoso (rico em CO₂).',
          'A veia pulmonar retorna ao átrio esquerdo com sangue arterial (rico em O₂).',
        ],
        porqueErram: [
          'A e B: confundem arteria com sangue arterial.',
          'D: ignora a diferença de gases.',
          'E: exatamente o contrário do critério anatômico.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Após uma noite sem beber água, o corpo de uma pessoa saudável tende a',
        alternativas: ['aumentar a produção de urina diluída', 'aumentar a secreção de ADH e concentrar a urina', 'reduzir a secreção de ADH', 'aumentar a filtração glomerular', 'reduzir a reabsorção de água pelos túbulos'],
        correta: 'B',
        resolucao: [
          'A desidratação aumenta a osmolaridade do sangue.',
          'Osmorreceptores do hipotálamo estimulam a liberação de ADH pela neuro-hipófise.',
          'O ADH aumenta a reabsorção de água nos túbulos renais, produzindo urina menor e mais concentrada.',
        ],
        porqueErram: [
          'A: é o efeito oposto.',
          'C: reduzir ADH aumentaria a perda de água, agravando a desidratação.',
          'D e E: contradizem a conservação de água.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- EVOLUÇÃO */
  'bio-evolucao': {
    chave: [
      'Lamarck × Darwin: adaptação não é intenção',
      'Seleção natural e pressão seletiva',
      'Evidências da evolução',
      'Especiação e isolamento reprodutivo',
      'Resistência a antibióticos: evolução em tempo real',
    ],
    secoes: [
      {
        h: 'Lamarck e Darwin: a diferença que a prova cobra',
        ps: [
          'Lamarck propôs uso e desuso e transmissão de caracteres adquiridos: a girafa esticou o pescoço e transmitiu o pescoço longo. Darwin propôs variação preexistente e seleção natural: já existiam girafas com pescoços variados, e as de pescoço maior sobreviveram mais e deixaram mais descendentes.',
          'A diferença essencial: em Lamarck, o ambiente cria a característica; em Darwin, o ambiente seleciona características que já existiam por mutação e recombinação. A genética moderna completa o quadro: a variabilidade é gerada ao acaso e a seleção é o filtro.',
        ],
      },
      {
        h: 'Seleção natural, adaptação e fitness',
        ps: [
          'Seleção natural é a reprodução diferencial de variantes hereditárias: quem deixa mais descendentes viáveis tem maior aptidão (fitness). Adaptação é o resultado acumulado desse processo, sempre relativo a um ambiente — não existe "mais evoluído".',
          'Tipos de seleção: direcional (favorece um extremo), estabilizadora (favorece o intermediário) e disruptiva (favorece os dois extremos). Deriva genética é mudança ao acaso, mais forte em populações pequenas; fluxo gênico é migração de alelos entre populações.',
        ],
      },
      {
        h: 'Evidências',
        ps: [
          'Fósseis mostram formas intermediárias e sequências de transição. Anatomia comparada revela órgãos homólogos (mesma origem embrionária, funções diferentes — braço humano e asa de morcego) e análogos (funções iguais, origens diferentes — asa de inseto e de ave).',
          'Embriologia, bioquímica comparada e genética molecular reforçam o parentesco: o código genético é praticamente universal, e o grau de diferença no DNA acompanha a proximidade evolutiva.',
        ],
      },
      {
        h: 'Especiação e resistência',
        ps: [
          'Espécie é o conjunto de populações que se cruzam e geram descendentes férteis. Especiação alopátrica ocorre com isolamento geográfico, que interrompe o fluxo gênico e permite divergência; simpátrica ocorre sem barreira geográfica, por poliploidia ou isolamento comportamental.',
          'A resistência bacteriana é o exemplo mais didático: o antibiótico não "cria" a bactéria resistente — ele elimina as sensíveis e permite que as já resistentes, por mutação prévia, se multipliquem. Por isso o uso incorreto de antibióticos acelera a seleção de linhagens resistentes.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Mariposas industriais',
        texto: 'Antes da Revolução Industrial, mariposas claras eram maioria; depois, escuras passaram a predominar em áreas poluídas.',
        comentario: 'A fuligem nos troncos alterou o contraste e inverteu a vantagem: seleção natural direcional.',
      },
      {
        titulo: 'Resistência a antibióticos',
        texto: 'Tratamento interrompido no meio do esquema.',
        comentario: 'As bactérias mais resistentes sobrevivem e se multiplicam, tornando o antibiótico ineficaz.',
      },
    ],
    figuras: [
      {
        titulo: 'Como a resistência aparece',
        tipo: 'fluxo',
        itens: ['População com variantes (mutação prévia)', 'Aplicação do antibiótico', 'Sensíveis morrem', 'Resistentes se reproduzem', 'População resistente'],
        legenda: 'A variação existe antes da pressão seletiva — o ponto que separa Darwin de Lamarck.',
      },
    ],
    formulas: [
      { titulo: 'Frequência alélica', expr: 'p + q = 1', uso: 'p e q são as frequências dos dois alelos.' },
      { titulo: 'Equilíbrio de Hardy-Weinberg', expr: 'p² + 2pq + q² = 1', uso: 'População grande, sem seleção, migração ou mutação.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A existência de bactérias resistentes a antibióticos em uma população é explicada, segundo a teoria sintética da evolução, por',
        alternativas: [
          'indução de mutação pelo antibiótico nas bactérias expostas',
          'seleção de variantes resistentes já presentes na população',
          'transmissão de caracteres adquiridos durante o tratamento',
          'uso e desuso da parede celular bacteriana',
          'competição entre bactérias e células humanas',
        ],
        correta: 'B',
        resolucao: [
          'A variabilidade genética surge por mutação, antes e independentemente do antibiótico.',
          'O antibiótico atua como pressão seletiva, eliminando as bactérias sensíveis.',
          'As portadoras de genes de resistência sobrevivem e se multiplicam, aumentando sua frequência na população.',
        ],
        porqueErram: [
          'A: descreve herança lamarckista de mutação dirigida — o ambiente não induz mutação específica.',
          'C e D: são explicações lamarckistas.',
          'E: não explica a resistência.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A asa de uma ave e a asa de um inseto exercem a mesma função, mas têm origens embrionárias diferentes. Esses órgãos são classificados como',
        alternativas: ['homólogos, indicando ancestral comum recente', 'análogos, resultantes de convergência evolutiva', 'vestigiais, sem função atual', 'homólogos, pois ambos permitem voo', 'fósseis de transição'],
        correta: 'B',
        resolucao: [
          'A definição de homologia é origem embrionária comum, não função igual.',
          'Asa de ave e asa de inseto têm a mesma função e origens distintas.',
          'Isso é convergência evolutiva: órgãos análogos, que não indicam parentesco próximo.',
        ],
        porqueErram: [
          'A e D: trocam a definição de homologia pela função.',
          'C: vestigial é órgão reduzido e sem função evidente.',
          'E: fósseis de transição são registros, não órgãos.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Uma população fica isolada geograficamente em duas regiões por milhares de gerações.'],
        enunciado: 'A formação de duas espécies distintas a partir desse isolamento caracteriza',
        alternativas: ['especiação simpátrica', 'especiação alopátrica', 'deriva genética sem especiação', 'seleção estabilizadora', 'homologia'],
        correta: 'B',
        resolucao: [
          'O isolamento geográfico interrompe o fluxo gênico entre as populações.',
          'Cada grupo acumula diferenças genéticas por mutação, deriva e seleção local.',
          'Quando o isolamento reprodutivo se completa, há duas espécies: especiação alopátrica.',
        ],
        porqueErram: [
          'A: simpátrica ocorre sem barreira geográfica.',
          'C: deriva é mecanismo, não o tipo de especiação descrito.',
          'D e E: não se referem à formação de espécies por isolamento.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- REINOS E VÍRUS */
  'bio-reino': {
    chave: [
      'Critérios de classificação e os cinco reinos',
      'Monera, Protista e Fungi',
      'Plantas: briófitas, pteridófitas, gimnospermas e angiospermas',
      'Animais: invertebrados e vertebrados',
      'Vírus: estrutura, replicação e doenças',
    ],
    secoes: [
      {
        h: 'Classificação e os cinco reinos',
        ps: [
          'Os seres vivos são agrupados por critérios como organização celular (procarionte × eucarionte), número de células, nutrição (autótrofa × heterótrofa) e reprodução. O sistema de cinco reinos reúne Monera (procariontes), Protista (eucariontes unicelulares e algas), Fungi, Plantae e Animalia.',
          'A nomenclatura binomial de Lineu usa gênero e espécie, sempre em latim, com o gênero maiúsculo e a espécie minúscula, ambos destacados em itálico: Homo sapiens. A classificação hierárquica vai de reino a espécie, e a espécie é a categoria mais restrita.',
        ],
      },
      {
        h: 'Fungi, Protista e Monera',
        ps: [
          'Fungos são eucariontes heterótrofos por absorção, com parede de quitina e reserva de glicogênio. Podem ser unicelulares (leveduras) ou pluricelulares (cogumelos e bolores) e atuam como decompositores, na fermentação e em associações como liquens e micorrizas.',
          'Protistas incluem protozoários (heterótrofos, como o Plasmodium da malária e o Trypanosoma da doença de Chagas) e algas (autótrofas). Bactérias (Monera) são procariontes, sem núcleo delimitado, com parede de peptidoglicano; algumas fixam nitrogênio, outras causam doenças.',
        ],
      },
      {
        h: 'Plantas',
        ps: [
          'Briófitas não têm vasos condutores, são pequenas e dependentes de água para a fecundação — musgos. Pteridófitas têm vasos, mas não têm semente — samambaias. Gimnospermas têm semente nua, sem fruto — pinheiros e araucárias. Angiospermas têm flor, fruto e semente protegida, e são a maioria das plantas.',
          'A tendência evolutiva é reduzir a dependência de água: a semente e o tubo polínico liberam a reprodução do meio aquático, o que permitiu a conquista do ambiente terrestre.',
        ],
      },
      {
        h: 'Animais e vírus',
        ps: [
          'Invertebrados: poríferos, cnidários, platelmintos, nematelmintos, moluscos, anelídeos, artrópodes e equinodermos. Vertebrados: peixes, anfíbios, répteis, aves e mamíferos. Anfíbios dependem da água para a reprodução e têm pele permeável; répteis têm pele seca e ovo com casca, adaptação à terra firme.',
          'Vírus não são células: são material genético (DNA ou RNA) envolto por capsídeo proteico, parasitas intracelulares obrigatórios. Não têm metabolismo próprio, o que os exclui dos cinco reinos. Reproduzem-se usando a maquinaria da célula hospedeira, e é por isso que antibióticos não funcionam contra viroses.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Musgo × samambaia',
        texto: 'Musgo cresce em parede úmida; samambaia tem vasos e alcança maior porte.',
        comentario: 'Presença de vasos condutores é o critério que separa briófitas de pteridófitas.',
      },
      {
        titulo: 'Por que antibiótico não trata gripe',
        texto: 'Gripe é causada por vírus; antibióticos agem em estruturas bacterianas.',
        comentario: 'Sem parede celular bacteriana ou ribossomo 70S próprio, o vírus não é alvo do antibiótico.',
      },
    ],
    figuras: [
      {
        titulo: 'Conquista do ambiente terrestre pelas plantas',
        tipo: 'fluxo',
        itens: ['Briófitas (sem vasos, dependem de água)', 'Pteridófitas (vasos, sem semente)', 'Gimnospermas (semente nua)', 'Angiospermas (flor e fruto)'],
        legenda: 'Cada grupo reduz a dependência de água na reprodução.',
      },
    ],
    formulas: [
      { titulo: 'Nomenclatura binomial', expr: 'Gênero + espécie (itálico)', uso: 'Ex.: Zea mays, Homo sapiens.' },
      { titulo: 'Hierarquia', expr: 'Reino > Filo > Classe > Ordem > Família > Gênero > Espécie', uso: 'Quanto mais abaixo, mais semelhantes.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A presença de vasos condutores de seiva, sem produção de sementes, é característica de',
        alternativas: ['briófitas', 'pteridófitas', 'gimnospermas', 'angiospermas', 'algas'],
        correta: 'B',
        resolucao: [
          'Briófitas não possuem vasos condutores.',
          'Pteridófitas possuem vasos (xilema e floema), mas se reproduzem por esporos, sem semente.',
          'Gimnospermas e angiospermas já apresentam sementes; algas não têm tecidos vasculares.',
        ],
        porqueErram: [
          'A: faltam os vasos.',
          'C e D: têm sementes.',
          'E: não são plantas vasculares.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Sobre os vírus, é correto afirmar que',
        alternativas: [
          'são procariontes de vida livre',
          'possuem metabolismo próprio e se reproduzem por divisão binária',
          'são parasitas intracelulares obrigatórios, com material genético e capsídeo proteico',
          'são sensíveis a antibióticos por terem parede celular',
          'pertencem ao reino Monera',
        ],
        correta: 'C',
        resolucao: [
          'Vírus têm ácido nucleico (DNA ou RNA) envolto por capsídeo, sem membrana plasmática nem organelas.',
          'Não realizam metabolismo próprio e dependem da maquinaria da célula hospedeira para se replicar.',
          'Por isso são parasitas intracelulares obrigatórios e não são classificados nos cinco reinos.',
        ],
        porqueErram: [
          'A e E: vírus não são células.',
          'B: não têm metabolismo próprio nem divisão binária.',
          'D: antibióticos não têm alvo viral.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Os fungos se diferenciam das plantas principalmente porque',
        alternativas: [
          'possuem clorofila e realizam fotossíntese',
          'são heterótrofos por absorção, com parede de quitina e reserva de glicogênio',
          'são procariontes',
          'reproduzem-se apenas por sementes',
          'não possuem núcleo organizado',
        ],
        correta: 'B',
        resolucao: [
          'Fungos não têm clorofila e não fazem fotossíntese: são heterótrofos por absorção.',
          'A parede celular é de quitina (não celulose) e a reserva energética é glicogênio (não amido).',
          'São eucariontes e se reproduzem por esporos, o que os coloca em reino próprio.',
        ],
        porqueErram: [
          'A: confunde com plantas.',
          'C e E: fungos são eucariontes.',
          'D: reprodução por esporos, não por sementes.',
        ],
      },
    ],
  },

  /* --------------------------------------------------- ELETRODINÂMICA */
  'fis-eletrodinamica': {
    chave: [
      'Corrente, tensão e resistência: a lei de Ohm',
      'Associação de resistores em série e em paralelo',
      'Potência e consumo de energia elétrica (kWh)',
      'Circuitos residenciais e disjuntores',
      'Efeito Joule e segurança elétrica',
    ],
    secoes: [
      {
        h: 'As três grandezas do circuito',
        ps: [
          'Corrente elétrica (i) é o fluxo ordenado de cargas, medida em ampères (A): i = Q/Δt. Tensão ou diferença de potencial (U) é a energia por unidade de carga, em volts (V), e funciona como a "pressão" que empurra as cargas. Resistência (R), em ohms (Ω), mede a oposição à passagem da corrente.',
          'A lei de Ohm relaciona as três: U = R · i, válida para resistores ôhmicos, cuja resistência é constante. Em um gráfico U × i, o resistor ôhmico é uma reta que passa pela origem, e a inclinação é a resistência.',
        ],
      },
      {
        h: 'Série e paralelo',
        ps: [
          'Em série, a corrente é a mesma em todos os elementos e a tensão se divide; a resistência equivalente é a soma: R_eq = R₁ + R₂ + … Em paralelo, a tensão é a mesma e a corrente se divide; o inverso da equivalente é a soma dos inversos: 1/R_eq = 1/R₁ + 1/R₂ + …',
          'Consequência prática: em paralelo a resistência equivalente é menor que a menor das resistências, e é assim que a instalação residencial é feita — cada aparelho recebe 127 V ou 220 V e funciona independentemente. Se fosse em série, desligar uma lâmpada apagaria a casa inteira.',
        ],
      },
      {
        h: 'Potência e consumo',
        ps: [
          'A potência elétrica é P = U · i; combinando com a lei de Ohm, P = U²/R = R · i². A energia consumida é potência × tempo, e as distribuidoras cobram em quilowatt-hora: 1 kWh = 1.000 W durante 1 hora = 3,6 × 10⁶ J.',
          'Para calcular o custo mensal de um aparelho: potência em kW × horas de uso por dia × 30 × tarifa. Chuveiro e ar-condicionado lideram o consumo porque combinam potência alta e uso prolongado — o chuveiro, por exemplo, chega a 5.500 W.',
        ],
      },
      {
        h: 'Efeito Joule, disjuntores e segurança',
        ps: [
          'O efeito Joule é a conversão de energia elétrica em calor pela passagem de corrente em um resistor: é o princípio de chuveiro, ferro de passar e lâmpada incandescente — e também a causa das perdas em linhas de transmissão, minimizadas com tensão alta e corrente baixa.',
          'Disjuntores desarmam quando a corrente excede o limite, protegendo a fiação do superaquecimento. Fio fino com aparelho de alta potência esquenta e pode causar incêndio; o dimensionamento correto considera P = U·i para achar a corrente máxima. O fio terra oferece caminho seguro para a corrente de fuga.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Chuveiro de 5.500 W em 220 V',
        texto: 'Qual a corrente?',
        comentario: 'i = P/U = 5.500/220 = 25 A. O disjuntor precisa ser de ao menos 25 A.',
      },
      {
        titulo: 'Consumo de um ar-condicionado',
        texto: '1.400 W ligado 8 h por dia durante 30 dias.',
        comentario: '1,4 kW × 8 × 30 = 336 kWh por mês.',
      },
    ],
    figuras: [
      {
        titulo: 'Série × paralelo',
        tipo: 'camadas',
        itens: [
          { txt: 'Série', nota: 'mesma corrente, tensões somam, R_eq = R₁ + R₂' },
          { txt: 'Paralelo', nota: 'mesma tensão, correntes somam, 1/R_eq = 1/R₁ + 1/R₂' },
          { txt: 'Instalação residencial', nota: 'paralelo — independência dos aparelhos' },
        ],
        legenda: 'Identificar a associação é o primeiro passo de toda questão de circuito.',
      },
    ],
    formulas: [
      { titulo: 'Lei de Ohm', expr: 'U = R · i', uso: 'Resistores ôhmicos.' },
      { titulo: 'Potência', expr: 'P = U · i = U²/R = R · i²', uso: 'Escolha a forma conforme os dados.' },
      { titulo: 'Energia', expr: 'E = P · Δt', uso: 'Em kWh: potência em kW × horas.' },
      { titulo: 'Paralelo', expr: '1/R_eq = 1/R₁ + 1/R₂ + …', uso: 'R_eq menor que a menor resistência.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um chuveiro elétrico de 5.500 W é ligado a uma rede de 220 V. A corrente que percorre o circuito é de',
        alternativas: ['2,5 A', '11 A', '25 A', '55 A', '121 A'],
        correta: 'C',
        resolucao: [
          'A potência relaciona tensão e corrente: P = U · i.',
          'i = P/U = 5.500/220.',
          'i = 25 A — valor que dimensiona o disjuntor e a bitola do fio.',
        ],
        porqueErram: [
          'A: divide a tensão pela potência.',
          'B e D: erram a ordem de grandeza na divisão.',
          'E: multiplica U × P em vez de dividir.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Dois resistores de 6 Ω e 3 Ω são associados em paralelo. A resistência equivalente da associação é de',
        alternativas: ['1,5 Ω', '2 Ω', '4,5 Ω', '9 Ω', '18 Ω'],
        correta: 'B',
        resolucao: [
          'Em paralelo: 1/R_eq = 1/6 + 1/3 = 1/6 + 2/6 = 3/6.',
          'R_eq = 6/3 = 2 Ω.',
          'Conferindo: o resultado é menor que 3 Ω, como exige qualquer associação em paralelo.',
        ],
        porqueErram: [
          'C e D: somam as resistências (associação em série).',
          'A: faz a média ponderada errada.',
          'E: multiplica as resistências.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Um ar-condicionado de 1.400 W fica ligado 8 horas por dia, todos os dias do mês (30 dias). Considere a tarifa de R$ 0,80 por kWh.'],
        enunciado: 'O consumo mensal e o custo correspondente são, aproximadamente,',
        alternativas: ['33,6 kWh e R$ 26,88', '112 kWh e R$ 89,60', '336 kWh e R$ 268,80', '1.120 kWh e R$ 896,00', '3.360 kWh e R$ 2.688,00'],
        correta: 'C',
        resolucao: [
          'Potência em kW: 1.400 W = 1,4 kW.',
          'Energia diária: 1,4 × 8 = 11,2 kWh; mensal: 11,2 × 30 = 336 kWh.',
          'Custo: 336 × 0,80 = R$ 268,80.',
        ],
        porqueErram: [
          'A e B: esquecem os 30 dias ou usam apenas um dia.',
          'D e E: erram o fator de conversão de W para kW.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- MECÂNICA */
  'fis-mecanica': {
    chave: [
      'Leis de Newton e diagrama de forças',
      'Cinemática: MU e MUV',
      'Atrito e plano inclinado',
      'Quantidade de movimento e impulso',
      'Gravitação e movimentos circulares',
    ],
    secoes: [
      {
        h: 'As três leis de Newton',
        ps: [
          'Primeira lei (inércia): sem força resultante, um corpo mantém seu estado de repouso ou de movimento retilíneo uniforme. Segunda lei: a força resultante é o produto da massa pela aceleração, F = m·a — a mesma força acelera menos um corpo mais massivo. Terceira lei: toda ação gera reação de mesma intensidade e sentido oposto, em corpos diferentes.',
          'O erro clássico é aplicar ação e reação no mesmo corpo. Se você empurra a parede, a parede empurra você: as duas forças existem, mas cada uma age em um corpo diferente, e por isso não se cancelam.',
        ],
      },
      {
        h: 'Cinemática',
        ps: [
          'No movimento uniforme, a velocidade é constante e S = S₀ + v·t. No movimento uniformemente variado, a aceleração é constante: v = v₀ + a·t e S = S₀ + v₀t + at²/2. A equação de Torricelli, v² = v₀² + 2aΔS, resolve os casos em que o tempo não é dado.',
          'Em gráficos: a área sob o gráfico v × t é o deslocamento, e a inclinação é a aceleração. No gráfico S × t, a inclinação é a velocidade. Saber ler área e inclinação resolve a maioria das questões sem conta.',
        ],
      },
      {
        h: 'Forças de contato: atrito e plano inclinado',
        ps: [
          'A força peso é P = m·g, sempre vertical para baixo. A normal é perpendicular à superfície e não é sempre igual ao peso — em plano inclinado, N = m·g·cos θ. O atrito estático máximo é μ_e·N; o cinético é μ_c·N, com μ_c < μ_e.',
          'No plano inclinado sem atrito, a componente que puxa o corpo é m·g·sen θ, e a aceleração é g·sen θ. É o modelo de rampa, telhado, tobogã e plano de carregamento.',
        ],
      },
      {
        h: 'Impulso, quantidade de movimento e gravitação',
        ps: [
          'Quantidade de movimento: Q = m·v. Impulso: I = F·Δt, e o teorema do impulso diz que I = ΔQ. É o que explica airbag e capacete: aumentar o tempo de colisão reduz a força média para a mesma variação de quantidade de movimento.',
          'Gravitação: F = G·M·m/d², com a força inversamente proporcional ao quadrado da distância. Em órbita circular, a força gravitacional faz o papel de resultante centrípeta: a = v²/R, e o período depende do raio orbital.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Freando um carro',
        texto: 'Um carro a 20 m/s freia até parar em 50 m.',
        comentario: 'Torricelli: 0 = 400 + 2a·50 → a = −4 m/s². Tempo: 5 s.',
      },
      {
        titulo: 'Airbag',
        texto: 'Mesma variação de velocidade, tempo de parada maior.',
        comentario: 'Como I = F·Δt é fixo, aumentar Δt diminui F — o airbag reduz a força sobre o ocupante.',
      },
    ],
    figuras: [
      {
        titulo: 'Roteiro de resolução em dinâmica',
        tipo: 'fluxo',
        itens: ['Identifique o corpo de interesse', 'Desenhe as forças que agem nele', 'Escolha eixos (paralelo e perpendicular ao movimento)', 'Aplique F = m·a em cada eixo', 'Confira unidades e sentido'],
        legenda: 'O diagrama de forças resolve mais da metade das questões de mecânica.',
      },
    ],
    formulas: [
      { titulo: 'Segunda lei de Newton', expr: 'F_res = m · a', uso: 'Sempre com a resultante.' },
      { titulo: 'MU e MUV', expr: 'S = S₀ + v·t ;  v = v₀ + a·t', uso: 'MUV: some S = S₀ + v₀t + at²/2.' },
      { titulo: 'Torricelli', expr: 'v² = v₀² + 2aΔS', uso: 'Quando o tempo não é dado.' },
      { titulo: 'Atrito', expr: 'F_at = μ · N', uso: 'N = m·g·cos θ em plano inclinado.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma força resultante de 30 N atua sobre um corpo de 5 kg. A aceleração adquirida é de',
        alternativas: ['2 m/s²', '6 m/s²', '15 m/s²', '25 m/s²', '150 m/s²'],
        correta: 'B',
        resolucao: [
          'Segunda lei de Newton: F = m·a.',
          'a = F/m = 30/5.',
          'a = 6 m/s².',
        ],
        porqueErram: [
          'A: divide a massa pela força.', 'C: subtrai os valores.',
          'D: soma. E: multiplica em vez de dividir.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um carro a 20 m/s freia uniformemente e para após percorrer 50 m. A desaceleração e o tempo de frenagem são, respectivamente,',
        alternativas: ['2 m/s² e 5 s', '4 m/s² e 5 s', '4 m/s² e 10 s', '8 m/s² e 2,5 s', '10 m/s² e 2 s'],
        correta: 'B',
        resolucao: [
          'Sem tempo: use Torricelli, 0² = 20² + 2a·50.',
          '0 = 400 + 100a → a = −4 m/s², desaceleração de 4 m/s².',
          'Com v = v₀ + at: 0 = 20 − 4t → t = 5 s.',
        ],
        porqueErram: [
          'A: erra a aceleração mas acerta o tempo.',
          'C e D: aplicam Torricelli com ΔS errado.',
          'E: usa a média das velocidades como aceleração.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Em uma colisão, o airbag aumenta o tempo de interação entre o ocupante e o veículo. Isso reduz o risco de lesão porque',
        alternativas: [
          'aumenta a variação da quantidade de movimento',
          'reduz a variação da quantidade de movimento',
          'para a mesma variação de quantidade de movimento, a força média diminui',
          'anula o impulso recebido pelo ocupante',
          'aumenta a massa do ocupante',
        ],
        correta: 'C',
        resolucao: [
          'O impulso é I = F·Δt e é igual à variação de quantidade de movimento, que depende apenas das velocidades inicial e final.',
          'Como ΔQ é o mesmo, aumentar Δt reduz proporcionalmente a força média F.',
          'Menor força sobre o corpo significa menor risco de lesão.',
        ],
        porqueErram: [
          'A e B: a variação de quantidade de movimento não muda com o airbag.',
          'D: o impulso não é anulado, apenas redistribuído no tempo.',
          'E: a massa é a mesma.',
        ],
      },
    ],
  },

  /* ------------------------------------------------ TRABALHO E ENERGIA */
  'fis-energia': {
    chave: [
      'Trabalho, potência e rendimento',
      'Energia cinética e potencial',
      'Conservação da energia mecânica',
      'Energia em circuitos, calor e combustíveis',
      'Fontes renováveis e matriz energética',
    ],
    secoes: [
      {
        h: 'Trabalho e potência',
        ps: [
          'Trabalho é força na direção do deslocamento: W = F·d·cos θ. Só a componente paralela realiza trabalho; força perpendicular (como a normal em piso horizontal) não realiza trabalho. O trabalho é medido em joules (J).',
          'Potência é a rapidez de transferência de energia: P = W/Δt, em watts (1 W = 1 J/s). Rendimento é a razão entre energia útil e energia total: η = P_útil/P_total. Um motor de 80% de rendimento transforma 20% da energia em calor e ruído.',
        ],
      },
      {
        h: 'Energia cinética e potencial',
        ps: [
          'Energia cinética: E_c = mv²/2 — depende do quadrado da velocidade, por isso dobrar a velocidade quadruplica a energia de frenagem e a distância de parada. Energia potencial gravitacional: E_p = m·g·h, com referencial escolhido. Energia potencial elástica: E_pe = kx²/2.',
          'A soma E_c + E_p é a energia mecânica. Sem atrito, ela se conserva: a energia potencial no alto se converte em cinética na descida. Com atrito, parte se dissipa como calor e a variação da energia mecânica é igual ao trabalho da força de atrito.',
        ],
      },
      {
        h: 'Energia em outras formas',
        ps: [
          'Eletricidade: E = P·Δt, cobrada em kWh. Termologia: Q = m·c·ΔT para aquecer substâncias, e Q = m·L nas mudanças de fase. Combustíveis: o poder calorífico indica quanta energia se obtém por quilograma ou litro queimado.',
          'Em qualquer transformação, o balanço energético fecha: energia não é criada nem destruída, apenas convertida — é o primeiro princípio da termodinâmica. O que muda é a qualidade da energia: parte vira calor de baixa temperatura, disperso e pouco útil.',
        ],
      },
      {
        h: 'Matriz energética e fontes',
        ps: [
          'Fontes renováveis se repõem em escala humana: solar, eólica, hidráulica, biomassa e geotérmica. Não renováveis são finitas: petróleo, carvão, gás natural e nuclear (cujo combustível é mineral). A matriz brasileira é majoritariamente renovável na eletricidade, por causa das hidrelétricas, enquanto a matriz de transporte ainda depende de derivados de petróleo.',
          'Cada fonte tem impactos: hidrelétrica alaga áreas e altera rios; eólica e solar são intermitentes e exigem armazenamento; biomassa compete com alimentos; nuclear gera rejeitos de longa duração. A escolha envolve comparação entre emissões, custo, disponibilidade e impacto local.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Queda livre',
        texto: 'Uma pedra cai de 5 m de altura (g = 10 m/s²).',
        comentario: 'm·g·h = m·v²/2 → v = √(2·10·5) = 10 m/s, independentemente da massa.',
      },
      {
        titulo: 'Aquecer água',
        texto: '2 kg de água de 20 °C a 100 °C (c = 4.200 J/kg·°C).',
        comentario: 'Q = 2 × 4.200 × 80 = 672.000 J = 672 kJ.',
      },
    ],
    figuras: [
      {
        titulo: 'Transformações em uma usina hidrelétrica',
        tipo: 'fluxo',
        itens: ['Energia potencial da água', 'Energia cinética na turbina', 'Energia mecânica no gerador', 'Energia elétrica', 'Perdas por atrito e calor'],
        legenda: 'Cada etapa tem perdas; o rendimento final é o produto dos rendimentos parciais.',
      },
    ],
    formulas: [
      { titulo: 'Trabalho', expr: 'W = F · d · cos θ', uso: 'Só a componente na direção do deslocamento.' },
      { titulo: 'Potência', expr: 'P = W / Δt', uso: 'Em watts; 1 cv ≈ 735 W.' },
      { titulo: 'Energia cinética', expr: 'E_c = m·v² / 2', uso: 'Dobrar v quadruplica a energia.' },
      { titulo: 'Energia potencial', expr: 'E_p = m · g · h', uso: 'Referencial à escolha.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um corpo de 2 kg é abandonado de uma altura de 5 m. Considerando g = 10 m/s² e desprezando a resistência do ar, a velocidade ao atingir o solo é de',
        alternativas: ['5 m/s', '10 m/s', '20 m/s', '25 m/s', '50 m/s'],
        correta: 'B',
        resolucao: [
          'Conservação da energia mecânica: m·g·h = m·v²/2.',
          'A massa se cancela: v² = 2·g·h = 2 × 10 × 5 = 100.',
          'v = 10 m/s.',
        ],
        porqueErram: [
          'A: esquece a raiz e usa h/2.',
          'C e D: usam v = g·h ou confundem com a energia.',
          'E: calcula 2gh sem extrair a raiz corretamente.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um elevador de 500 kg sobe 20 m em 10 s, com g = 10 m/s². A potência média útil do motor é de',
        alternativas: ['1.000 W', '5.000 W', '10.000 W', '50.000 W', '100.000 W'],
        correta: 'C',
        resolucao: [
          'Trabalho contra a gravidade: W = m·g·h = 500 × 10 × 20 = 100.000 J.',
          'Potência média: P = W/Δt = 100.000/10.',
          'P = 10.000 W = 10 kW.',
        ],
        porqueErram: [
          'A e B: esquecem a altura ou o tempo.',
          'D: entrega o trabalho em joules.',
          'E: usa massa 500 como força e multiplica por 200.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A energia cinética de um automóvel depende do quadrado da velocidade. Se a velocidade dobra, mantendo-se a massa, a distância mínima de frenagem, para a mesma força de frenagem,',
        alternativas: ['permanece a mesma', 'dobra', 'triplica', 'quadruplica', 'reduz à metade'],
        correta: 'D',
        resolucao: [
          'O trabalho da força de frenagem é igual à variação da energia cinética: F·d = mv²/2.',
          'Se v dobra, v² fica quatro vezes maior, logo a energia cinética quadruplica.',
          'Com a mesma força, a distância de frenagem também quadruplica.',
        ],
        porqueErram: [
          'B: aplica a proporção linear da velocidade à energia.',
          'A, C e E: não consideram a dependência quadrática.',
        ],
      },
    ],
  },

  /* --------------------------------------------------------- TERMOLOGIA */
  'fis-termologia': {
    chave: [
      'Temperatura, calor e equilíbrio térmico',
      'Calor sensível e calor latente',
      'Propagação do calor',
      'Gases e as leis da termodinâmica',
      'Máquinas térmicas e rendimento',
    ],
    secoes: [
      {
        h: 'Calor é energia em trânsito',
        ps: [
          'Temperatura mede a energia cinética média das partículas; calor é a energia transferida entre corpos por diferença de temperatura. Dois corpos em contato trocam calor até o equilíbrio térmico, quando as temperaturas se igualam — a soma das quantidades de calor cedidas e recebidas é zero.',
          'Escalas: Celsius, Fahrenheit e Kelvin. A conversão usa θ_C/5 = (θ_F − 32)/9 e T_K = θ_C + 273. O zero absoluto (0 K = −273 °C) é o limite em que a agitação térmica é mínima.',
        ],
      },
      {
        h: 'Calor sensível e latente',
        ps: [
          'Calor sensível muda a temperatura sem mudar o estado: Q = m·c·ΔT, em que c é o calor específico. A água tem c alto (4.200 J/kg·°C), por isso demora a aquecer e a esfriar — é o que estabiliza o clima litorâneo.',
          'Calor latente muda o estado sem mudar a temperatura: Q = m·L. Durante a fusão e a ebulição, a temperatura permanece constante e todo o calor recebido é usado para romper ligações. No gráfico temperatura × tempo, essas mudanças aparecem como patamares horizontais.',
        ],
      },
      {
        h: 'Propagação e gases',
        ps: [
          'Condução ocorre por contato, sem transporte de matéria, e é típica dos sólidos; convecção ocorre em fluidos por correntes de densidade; irradiação ocorre por ondas eletromagnéticas e é a única que atravessa o vácuo. Garrafa térmica combate as três: paredes espelhadas (irradiação), vácuo (condução e convecção) e tampa (convecção).',
          'Nos gases ideais, PV = nRT relaciona pressão, volume e temperatura. Transformações isotérmica (T constante, P₁V₁ = P₂V₂), isobárica (P constante, V/T constante) e isovolumétrica (V constante, P/T constante) cobrem as questões clássicas.',
        ],
      },
      {
        h: 'Termodinâmica e máquinas térmicas',
        ps: [
          'Primeira lei: ΔU = Q − W. Se o gás recebe calor e realiza trabalho, a variação de energia interna é o balanço entre os dois. Na expansão isobárica, W = P·ΔV.',
          'Segunda lei: nenhuma máquina térmica converte todo o calor em trabalho; parte é sempre rejeitada para a fonte fria. O rendimento máximo é o de Carnot: η = 1 − T_fria/T_quente, com temperaturas em kelvin. Nenhuma máquina real supera esse limite — é a razão pela qual motores a combustão têm rendimento de 25% a 40%.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Aquecer água para o café',
        texto: '500 g de água de 20 °C a 100 °C.',
        comentario: 'Q = 0,5 × 4.200 × 80 = 168.000 J = 168 kJ.',
      },
      {
        titulo: 'Rendimento de Carnot',
        texto: 'Máquina entre 500 K e 300 K.',
        comentario: 'η = 1 − 300/500 = 0,40, ou 40% — máximo teórico.',
      },
    ],
    figuras: [
      {
        titulo: 'Curva de aquecimento da água',
        tipo: 'barras',
        itens: [
          { txt: 'Sólido → fusão', valor: 0, unidade: '°C (patamar)' },
          { txt: 'Aquecimento', valor: 100, unidade: '°C' },
          { txt: 'Ebulição', valor: 100, unidade: '°C (patamar)' },
        ],
        legenda: 'Nos patamares, a temperatura é constante e o calor recebido é latente.',
      },
    ],
    formulas: [
      { titulo: 'Calor sensível', expr: 'Q = m · c · ΔT', uso: 'Mudança de temperatura.' },
      { titulo: 'Calor latente', expr: 'Q = m · L', uso: 'Mudança de estado.' },
      { titulo: 'Gás ideal', expr: 'P·V = n·R·T', uso: 'T em kelvin.' },
      { titulo: 'Carnot', expr: 'η = 1 − T_f / T_q', uso: 'Temperaturas absolutas.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A quantidade de calor necessária para aquecer 2 kg de água de 20 °C a 80 °C, sendo c = 4.200 J/(kg·°C), é de',
        alternativas: ['168 kJ', '336 kJ', '504 kJ', '672 kJ', '840 kJ'],
        correta: 'C',
        resolucao: [
          'Q = m·c·ΔT.',
          'ΔT = 80 − 20 = 60 °C.',
          'Q = 2 × 4.200 × 60 = 504.000 J = 504 kJ.',
        ],
        porqueErram: [
          'A: usa massa 1 kg.', 'B: usa ΔT = 40 °C.',
          'D: usa ΔT = 80 °C (esquece a temperatura inicial).',
          'E: multiplica por 100 em vez de 60.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Durante a ebulição da água em pressão atmosférica normal, fornecendo calor continuamente, a temperatura',
        alternativas: ['aumenta proporcionalmente ao calor fornecido', 'permanece constante até que toda a água vaporize', 'diminui', 'oscila entre 90 °C e 110 °C', 'aumenta até 120 °C'],
        correta: 'B',
        resolucao: [
          'Na mudança de fase, o calor recebido é latente: Q = m·L.',
          'Toda a energia é usada para romper as ligações entre moléculas, não para aumentar a agitação.',
          'Por isso a temperatura fica constante em 100 °C até a vaporização completa.',
        ],
        porqueErram: [
          'A: é o comportamento do calor sensível, não do latente.',
          'C, D e E: contrariam a propriedade das mudanças de fase à pressão constante.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Uma máquina térmica opera entre uma fonte quente a 600 K e uma fonte fria a 300 K.'],
        enunciado: 'O rendimento máximo teórico dessa máquina é de',
        alternativas: ['25%', '33%', '50%', '66%', '100%'],
        correta: 'C',
        resolucao: [
          'Carnot: η = 1 − T_fria/T_quente.',
          'η = 1 − 300/600 = 1 − 0,5.',
          'η = 0,5 = 50%. Nenhuma máquina real entre essas temperaturas supera esse valor.',
        ],
        porqueErram: [
          'A: usa a razão invertida.',
          'B: calcula 300/900 indevidamente.',
          'D e E: desrespeitam a segunda lei da termodinâmica.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------ ONDULATÓRIA */
  'fis-ondulatoria': {
    chave: [
      'Ondas: comprimento, frequência e velocidade',
      'Som: intensidade, altura e timbre',
      'Efeito Doppler',
      'Reflexão, refração, difração e interferência',
      'Ressonância e aplicações tecnológicas',
    ],
    secoes: [
      {
        h: 'A equação fundamental da onda',
        ps: [
          'Onda é uma perturbação que se propaga transportando energia, sem transportar matéria. A equação v = λ·f relaciona velocidade (m/s), comprimento de onda (m) e frequência (Hz). Ao mudar de meio, a frequência se mantém e a velocidade e o comprimento de onda mudam proporcionalmente.',
          'Ondas mecânicas (som, onda em corda, onda sísmica) precisam de meio material; ondas eletromagnéticas (luz, rádio, micro-ondas) propagam-se no vácuo. Todas as ondas eletromagnéticas viajam no vácuo a c ≈ 3 × 10⁸ m/s.',
        ],
      },
      {
        h: 'Som',
        ps: [
          'O som é onda mecânica longitudinal. A altura é dada pela frequência: sons graves têm frequência baixa, agudos, alta. A intensidade relaciona-se à amplitude e é medida em decibéis, escala logarítmica: 10 dB a mais significa intensidade 10 vezes maior. O timbre distingue fontes de mesma altura e intensidade.',
          'O aparelho auditivo humano percebe aproximadamente de 20 Hz a 20.000 Hz. Infrassom e ultrassom ficam fora dessa faixa e são usados em morcegos, exames de imagem e sonares.',
        ],
      },
      {
        h: 'Efeito Doppler',
        ps: [
          'Quando fonte e observador se aproximam, a frequência percebida aumenta; quando se afastam, diminui. É o que explica a mudança de tom da sirene ao passar e a expansão do universo medida pelo desvio para o vermelho.',
          'Aplicações: radar de velocidade, sonar, ecografia Doppler (fluxo sanguíneo) e astronomia. Não há mudança de frequência quando a aproximação é perpendicular à linha de visada.',
        ],
      },
      {
        h: 'Fenômenos e ressonância',
        ps: [
          'Reflexão: a onda retorna ao meio de origem (eco, espelho). Refração: muda de meio e desvia (lente, ar quente). Difração: contorna obstáculos — é por isso que se ouve som de uma esquina, e quanto maior o comprimento de onda, mais acentuada a difração. Interferência: superposição que pode reforçar (construtiva) ou anular (destrutiva).',
          'Ressonância ocorre quando a frequência externa coincide com a natural do sistema, ampliando a amplitude — é o princípio de instrumentos musicais, do micro-ondas e do forno de indução, e também o risco de pontes e prédios em terremotos, que exigem projetos com amortecimento.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Frequência de uma nota',
        texto: 'Som com λ = 0,5 m no ar (v = 340 m/s).',
        comentario: 'f = v/λ = 340/0,5 = 680 Hz.',
      },
      {
        titulo: 'Eco',
        texto: 'Som refletido em paredão a 170 m, com retorno em 1 s.',
        comentario: 'O som percorreu 340 m em 1 s: v = 340 m/s, coerente com o ar.',
      },
    ],
    figuras: [
      {
        titulo: 'Comportamentos de uma onda',
        tipo: 'camadas',
        itens: [
          { txt: 'Reflexão', nota: 'retorna ao meio de origem — eco, espelho' },
          { txt: 'Refração', nota: 'muda de meio e altera velocidade e comprimento de onda' },
          { txt: 'Difração', nota: 'contorna obstáculos — mais intensa para λ grande' },
        ],
        legenda: 'Identificar o fenômeno é o primeiro passo para escolher a explicação correta.',
      },
    ],
    formulas: [
      { titulo: 'Equação da onda', expr: 'v = λ · f', uso: 'λ em metros, f em hertz.' },
      { titulo: 'Período', expr: 'T = 1 / f', uso: 'Tempo de um ciclo completo.' },
      { titulo: 'Nível sonoro', expr: 'N = 10 · log(I/I₀)', uso: 'I₀ = 10⁻¹² W/m².' },
      { titulo: 'Doppler (aproximação)', expr: 'f\' = f · (v ± v_o)/(v ∓ v_f)', uso: 'Sinais conforme sentido do movimento.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma onda sonora de frequência 680 Hz propaga-se no ar com velocidade de 340 m/s. Seu comprimento de onda é de',
        alternativas: ['0,25 m', '0,5 m', '1,0 m', '2,0 m', '340 m'],
        correta: 'B',
        resolucao: [
          'v = λ·f → λ = v/f.',
          'λ = 340/680.',
          'λ = 0,5 m.',
        ],
        porqueErram: [
          'A e C: erram a divisão por fator 2.',
          'D: multiplica v × f.',
          'E: usa a velocidade como comprimento de onda.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma ambulância com sirene ligada se aproxima de um pedestre parado. O pedestre percebe o som com',
        alternativas: ['frequência maior que a emitida e mesmo comprimento de onda', 'frequência maior e comprimento de onda menor', 'frequência menor e comprimento de onda maior', 'mesma frequência e maior intensidade', 'frequência menor e velocidade maior'],
        correta: 'B',
        resolucao: [
          'No efeito Doppler, aproximação aumenta a frequência percebida.',
          'Como a velocidade do som no ar permanece a mesma, v = λ·f implica λ menor quando f aumenta.',
          'Portanto: frequência maior, comprimento de onda menor — som mais agudo.',
        ],
        porqueErram: [
          'A e D: esquecem que o comprimento de onda acompanha a frequência.',
          'C: inverte o sentido do efeito.',
          'E: a velocidade do som no ar não muda por causa do movimento da fonte.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'O fenômeno que permite ouvir uma conversa atrás de um muro, mesmo sem visão direta, é a',
        alternativas: ['reflexão', 'refração', 'difração', 'polarização', 'ressonância'],
        correta: 'C',
        resolucao: [
          'Difração é o contorno de obstáculos pela onda.',
          'O som tem comprimento de onda comparável às dimensões do muro e se difrata ao redor dele.',
          'A luz, com comprimento de onda muito menor, difrata pouco, e por isso não vemos a cena.',
        ],
        porqueErram: [
          'A: reflexão depende de superfície que devolve a onda.',
          'B: não há mudança de meio.',
          'D: polarização é própria de ondas transversais e não explica audição.',
          'E: ressonância exige coincidência de frequências.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------------ ÓPTICA */
  'fis-optica': {
    chave: [
      'Refração e o desvio da luz',
      'Lentes: convergência, imagem e aplicações',
      'Espelhos planos e esféricos',
      'Olho humano e defeitos da visão',
      'Cores, dispersão e instrumentos ópticos',
    ],
    secoes: [
      {
        h: 'Refração e índice de refração',
        ps: [
          'Refração é a mudança de velocidade da luz ao passar de um meio para outro. O índice de refração é n = c/v: quanto maior n, mais lenta a luz. Ao entrar em meio mais refringente, a luz aproxima-se da normal; ao sair, afasta-se. A lei de Snell descreve o desvio.',
          'Quando a luz passa de meio mais para menos refringente com ângulo acima do crítico, ocorre reflexão total — princípio das fibras ópticas e do brilho do diamante. O arco-íris é refração com dispersão: cada cor tem índice ligeiramente diferente.',
        ],
      },
      {
        h: 'Lentes e imagens',
        ps: [
          'Lentes convergentes (bordas finas) aproximam os raios e formam imagens reais ou virtuais, dependendo da posição do objeto; lentes divergentes (bordas grossas) sempre formam imagem virtual, direita e menor. A equação de Gauss relaciona distâncias do objeto, da imagem e a distância focal.',
          'Aumento linear A = −p\'/p indica tamanho e orientação da imagem. Óculos de hipermetropia usam lentes convergentes; óculos de miopia, divergentes. A dioptria é o inverso da distância focal em metros.',
        ],
      },
      {
        h: 'Espelhos',
        ps: [
          'Espelho plano forma imagem virtual, direita, do mesmo tamanho e simétrica em relação ao espelho — é a base de periscópios e retrovisores. Espelhos esféricos côncavos podem formar imagens reais e invertidas, com aplicação em faróis e telescópios; convexos formam imagem sempre virtual, direita e menor, com campo visual amplo, por isso são usados em retrovisores e segurança.',
          'Em espelhos vale a mesma equação de Gauss para lentes, com a convenção de sinais adequada: foco real positivo em espelho côncavo.',
        ],
      },
      {
        h: 'Olho humano e cores',
        ps: [
          'No olho, a córnea e o cristalino formam a imagem sobre a retina, que é invertida; o cérebro a interpreta. Miopia: imagem antes da retina, corrigida com lente divergente. Hipermetropia: imagem depois da retina, corrigida com convergente. Presbiopia é o endurecimento do cristalino com a idade; astigmatismo é irregularidade da córnea.',
          'A luz branca é composta por cores — a dispersão em um prisma separa o espectro. Objetos parecem de determinada cor porque refletem aquela faixa e absorvem as demais: um objeto vermelho iluminado por luz verde aparece negro. Filtros e misturas de pigmentos seguem lógica subtrativa, distinta da mistura de luzes.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Grau de um óculos',
        texto: 'Lente convergente de distância focal 0,5 m.',
        comentario: 'V = 1/f = 1/0,5 = +2 dioptrias (2 graus).',
      },
      {
        titulo: 'Miopia',
        texto: 'Imagem formada antes da retina.',
        comentario: 'Correção com lente divergente, que afasta os raios antes de atingirem o olho.',
      },
    ],
    figuras: [
      {
        titulo: 'Quem corrige o quê',
        tipo: 'lista',
        itens: [
          { txt: 'Miopia — imagem antes da retina — lente divergente' },
          { txt: 'Hipermetropia — imagem depois da retina — lente convergente' },
          { txt: 'Presbiopia — perda de acomodação — lente convergente (multifocal)' },
        ],
        legenda: 'O tipo de lente depende de a imagem se formar antes ou depois da retina.',
      },
    ],
    formulas: [
      { titulo: 'Índice de refração', expr: 'n = c / v', uso: 'c ≈ 3 × 10⁸ m/s.' },
      { titulo: 'Lei de Snell', expr: 'n₁ · sen θ₁ = n₂ · sen θ₂', uso: 'Ângulos com a normal.' },
      { titulo: 'Equação de Gauss', expr: '1/f = 1/p + 1/p\'', uso: 'Lentes e espelhos esféricos.' },
      { titulo: 'Vergência', expr: 'V = 1 / f (m)', uso: 'Em dioptrias; f negativo para divergente.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma pessoa míope tem dificuldade para enxergar objetos distantes porque a imagem se forma',
        alternativas: ['depois da retina, e a correção é feita com lente convergente', 'antes da retina, e a correção é feita com lente divergente', 'sobre a retina, e não há correção', 'depois da retina, e a correção é feita com lente divergente', 'antes da retina, e a correção é feita com lente convergente'],
        correta: 'B',
        resolucao: [
          'No olho míope, o sistema óptico converge demais os raios.',
          'A imagem se forma antes da retina, o que borra objetos distantes.',
          'A lente divergente afasta os raios antes de entrarem no olho, deslocando a imagem para a retina.',
        ],
        porqueErram: [
          'A e D: descrevem hipermetropia.',
          'C: nega o defeito.',
          'E: combina o defeito certo com a lente errada.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um objeto é colocado a 30 cm de uma lente convergente de distância focal 20 cm. A posição da imagem é',
        alternativas: ['12 cm, do mesmo lado do objeto', '30 cm, virtual', '60 cm, real e do lado oposto ao objeto', '75 cm, virtual', 'infinito'],
        correta: 'C',
        resolucao: [
          'Gauss: 1/f = 1/p + 1/p\'.',
          '1/20 = 1/30 + 1/p\' → 1/p\' = 1/20 − 1/30 = (3 − 2)/60 = 1/60.',
          'p\' = 60 cm, positiva, portanto real e do lado oposto ao objeto.',
        ],
        porqueErram: [
          'A: troca a soma pela subtração invertida.',
          'B e D: calculam imagem virtual, o que ocorre apenas com objeto dentro do foco.',
          'E: só para objeto no foco.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A fibra óptica transmite informação luminosa por longas distâncias com pouca perda porque a luz',
        alternativas: ['é totalmente absorvida pelo núcleo da fibra', 'sofre reflexão total na interface entre núcleo e casca', 'é refratada sem desvio', 'é polarizada pela casca', 'muda de frequência ao longo da fibra'],
        correta: 'B',
        resolucao: [
          'O núcleo tem índice de refração maior que a casca.',
          'Para ângulos acima do ângulo crítico, a luz não refrata: é totalmente refletida de volta ao núcleo.',
          'Essa reflexão total sucessiva guia a luz pela fibra com perdas mínimas.',
        ],
        porqueErram: [
          'A: absorção impediria a transmissão.',
          'C, D e E: não explicam o confinamento da luz.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- LIGAÇÕES QUÍMICAS */
  'qui-ligacoes': {
    chave: [
      'Estrutura atômica e distribuição eletrônica',
      'Ligação iônica, covalente e metálica',
      'Polaridade e geometria molecular',
      'Forças intermoleculares',
      'Propriedades decorrentes das ligações',
    ],
    secoes: [
      {
        h: 'Do átomo à ligação',
        ps: [
          'A distribuição eletrônica organiza os elétrons em níveis e subníveis. Os elétrons da camada de valência são os responsáveis pelas ligações: os elementos tendem a alcançar a configuração estável de gás nobre (regra do octeto), ganhando, perdendo ou compartilhando elétrons.',
          'Metais têm baixa eletronegatividade e poucos elétrons na valência, tendendo a perdê-los; ametais têm alta eletronegatividade e tendem a ganhar; gases nobres já têm camada completa, por isso são pouco reativos.',
        ],
      },
      {
        h: 'Tipos de ligação',
        ps: [
          'Ligação iônica ocorre entre metal e ametal (ou hidrogênio), com transferência de elétrons e formação de íons: NaCl, MgCl₂. Compostos iônicos têm altos pontos de fusão e ebulição, são sólidos cristalinos e conduzem corrente quando fundidos ou em solução.',
          'Ligação covalente ocorre entre ametais, com compartilhamento de elétrons: H₂O, CO₂, CH₄. Forma moléculas, com pontos de fusão geralmente baixos. Ligação metálica ocorre entre metais, com elétrons livres formando um "mar de elétrons": explica condutividade elétrica e térmica, brilho e maleabilidade.',
        ],
      },
      {
        h: 'Polaridade e geometria',
        ps: [
          'A geometria molecular depende dos pares eletrônicos ao redor do átomo central. Moléculas com ligações polares podem ser apolares se a geometria for simétrica e os vetores se anularem: CO₂ é linear e apolar apesar de ligações C=O polares; H₂O é angular e polar.',
          'A polaridade define solubilidade ("semelhante dissolve semelhante"): substâncias polares dissolvem-se em água, apolares em solventes orgânicos como hexano. Detergentes têm uma parte polar e outra apolar, o que permite emulsificar gordura em água.',
        ],
      },
      {
        h: 'Forças intermoleculares',
        ps: [
          'Dispersão de London (dipolo induzido) existe em todas as moléculas, sendo a única possível nas apolares; cresce com a massa molar. Dipolo-dipolo ocorre entre moléculas polares. Ligações de hidrogênio ocorrem quando H está ligado a F, O ou N, frequentemente intensas — explicam o ponto de ebulição anômalo da água e a estrutura do DNA.',
          'A intensidade das forças intermoleculares determina ponto de fusão, ebulição, tensão superficial e viscosidade. Comparar substâncias exige considerar todas as forças: etanol (ligação de hidrogênio) ferve a cerca de 78 °C; éter dimetílico (dipolo-dipolo) ferve a cerca de −25 °C, embora ambos tenham massa molar de 46 g/mol.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Por que a água ferve a 100 °C',
        texto: 'H₂O tem massa molar 18 g/mol, menor que a do H₂S (34 g/mol), mas ferve muito mais alto.',
        comentario: 'As ligações de hidrogênio entre moléculas de água exigem mais energia para serem rompidas.',
      },
      {
        titulo: 'Sal e açúcar na água',
        texto: 'NaCl conduz corrente em solução; açúcar não.',
        comentario: 'O sal dissocia em íons livres; o açúcar se dispersa em moléculas neutras.',
      },
    ],
    figuras: [
      {
        titulo: 'Três ligações, três propriedades',
        tipo: 'camadas',
        itens: [
          { txt: 'Iônica', nota: 'metal + ametal; alto PF/PE; conduz fundida ou em solução' },
          { txt: 'Covalente', nota: 'ametal + ametal; forma moléculas; PF baixo' },
          { txt: 'Metálica', nota: 'elétrons livres; conduz sólida; maleável' },
        ],
        legenda: 'Identificar o tipo de ligação prevê as propriedades do material.',
      },
    ],
    formulas: [
      { titulo: 'Regra do octeto', expr: 'valência → 8 elétrons', uso: 'Estabilidade da camada de valência.' },
      { titulo: 'Número de oxidação (composto neutro)', expr: 'Σ NOx = 0', uso: 'Em íons, Σ NOx = carga do íon.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'O cloreto de sódio apresenta alto ponto de fusão, é sólido à temperatura ambiente e conduz corrente elétrica quando fundido ou dissolvido em água. Essas propriedades são explicadas por',
        alternativas: ['ligações covalentes apolares', 'ligações iônicas, com íons que se dissociam em solução', 'ligações metálicas', 'ligações de hidrogênio entre as moléculas', 'forças de dispersão de London'],
        correta: 'B',
        resolucao: [
          'NaCl é formado por transferência de elétron do sódio para o cloro, gerando Na⁺ e Cl⁻.',
          'A atração eletrostática entre os íons forma o retículo cristalino, o que exige muita energia para fundir.',
          'Fundido ou em solução, os íons ficam livres para transportar carga — daí a condutividade.',
        ],
        porqueErram: [
          'A: compostos covalentes apolares não conduzem corrente.',
          'C: ligação metálica não envolve NaCl.',
          'D e E: forças intermoleculares são muito mais fracas que a ligação iônica.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A molécula de CO₂, apesar de possuir ligações polares, é apolar porque',
        alternativas: ['o carbono é mais eletronegativo que o oxigênio', 'sua geometria é linear e os vetores de dipolo se anulam', 'possui ligações de hidrogênio', 'é uma molécula iônica', 'apresenta ângulo de 104,5°'],
        correta: 'B',
        resolucao: [
          'Cada ligação C=O é polar, com o oxigênio atraindo os elétrons.',
          'Na geometria linear, os dois vetores têm mesma intensidade e sentidos opostos.',
          'A resultante é nula: a molécula é apolar, o que explica sua baixa solubilidade em água.',
        ],
        porqueErram: [
          'A: o oxigênio é mais eletronegativo.',
          'C: não há hidrogênio ligado a F, O ou N.',
          'D: CO₂ é covalente.', 'E: 104,5° é o ângulo da água, angular e polar.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Comparando o etanol (CH₃CH₂OH) e o éter dimetílico (CH₃OCH₃), de mesma massa molar, o etanol apresenta ponto de ebulição mais alto porque',
        alternativas: ['possui maior massa molecular', 'suas moléculas formam ligações de hidrogênio entre si', 'é uma molécula apolar', 'possui ligações iônicas', 'suas forças intermoleculares são do tipo dipolo induzido'],
        correta: 'B',
        resolucao: [
          'O etanol tem hidrogênio ligado a oxigênio (grupo OH), condição para ligação de hidrogênio.',
          'O éter não tem hidrogênio ligado a O, apenas dipolo-dipolo.',
          'A ligação de hidrogênio é mais forte, exigindo mais energia para a ebulição.',
        ],
        porqueErram: [
          'A: as massas molares são próximas — não explica a diferença.',
          'C: o etanol é polar.', 'D: ambos são covalentes.',
          'E: dipolo induzido é a força mais fraca, coerente com o éter, não com o etanol.',
        ],
      },
    ],
  },

  /* --------------------------------------------------- ESTEQUIOMETRIA */
  'qui-estequiometria': {
    chave: [
      'Mol, massa molar e número de Avogadro',
      'Balanceamento de equações',
      'Cálculo estequiométrico com reagente limitante',
      'Rendimento e pureza',
      'Concentração e diluição',
    ],
    secoes: [
      {
        h: 'O mol como ponte',
        ps: [
          'O mol é a quantidade de matéria que contém 6,02 × 10²³ entidades (número de Avogadro). A massa molar é a massa de um mol, em g/mol, numericamente igual à massa atômica ou molecular. Assim, 18 g de água correspondem a 1 mol, ou 6,02 × 10²³ moléculas.',
          'Essa ponte permite converter massa em quantidade de matéria (n = m/M), quantidade em número de partículas e, no caso de gases nas CNTP, quantidade em volume (22,4 L por mol).',
        ],
      },
      {
        h: 'Balancear antes de calcular',
        ps: [
          'A equação balanceada garante a conservação dos átomos. Os coeficientes indicam a proporção em mols: em 2 H₂ + O₂ → 2 H₂O, duas moléculas de hidrogênio reagem com uma de oxigênio formando duas de água.',
          'Balanceie pelo método das tentativas, começando pelos metais, depois ametais, hidrogênio e oxigênio por último. Em reações de combustão, comece pelo carbono e termine pelo oxigênio.',
        ],
      },
      {
        h: 'Reagente limitante, rendimento e pureza',
        ps: [
          'Quando as quantidades dos reagentes não estão na proporção estequiométrica, um deles é consumido primeiro: o reagente limitante. Ele determina a quantidade máxima de produto. O outro é o excesso.',
          'Rendimento compara o produto obtido com o teórico: η = (real/teórico) × 100. Pureza considera que a amostra não é 100% da substância: primeiro multiplique a massa pela pureza, depois use a estequiometria. Esses dois ajustes costumam ser a diferença entre a alternativa correta e a "quase certa".',
        ],
      },
      {
        h: 'Soluções: concentração e diluição',
        ps: [
          'Concentração comum é C = m/V (g/L); concentração em quantidade de matéria é M = n/V (mol/L). Ao diluir, a quantidade de soluto não muda: C₁V₁ = C₂V₂ e M₁V₁ = M₂V₂. Ao misturar soluções do mesmo soluto, somam-se as quantidades de soluto e os volumes.',
          'Em reações em solução, a quantidade de matéria vem de n = M × V (com V em litros) — é o passo que liga a estequiometria à volumetria.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Água formada',
        texto: 'Quantos gramas de água se formam com 8 g de H₂ em excesso de O₂?',
        comentario: '8 g ÷ 2 g/mol = 4 mol de H₂ → 4 mol de H₂O → 4 × 18 = 72 g.',
      },
      {
        titulo: 'Diluição',
        texto: '100 mL de solução 2 mol/L diluídos para 500 mL.',
        comentario: '2 × 100 = M₂ × 500 → M₂ = 0,4 mol/L.',
      },
    ],
    figuras: [
      {
        titulo: 'Roteiro do cálculo estequiométrico',
        tipo: 'fluxo',
        itens: ['Balanceie a equação', 'Converta os dados em mols', 'Identifique o reagente limitante', 'Use a proporção dos coeficientes', 'Converta o resultado para a unidade pedida'],
        legenda: 'Cinco etapas que resolvem qualquer cálculo estequiométrico do Enem.',
      },
    ],
    formulas: [
      { titulo: 'Quantidade de matéria', expr: 'n = m / M', uso: 'M = massa molar (g/mol).' },
      { titulo: 'Avogadro', expr: '1 mol = 6,02 × 10²³', uso: 'Partículas por mol.' },
      { titulo: 'Gases nas CNTP', expr: '1 mol = 22,4 L', uso: '0 °C e 1 atm.' },
      { titulo: 'Diluição', expr: 'C₁ · V₁ = C₂ · V₂', uso: 'Quantidade de soluto constante.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Na combustão completa do metano (CH₄ + 2 O₂ → CO₂ + 2 H₂O), a massa de água formada a partir de 32 g de metano é de (M: CH₄ = 16 g/mol; H₂O = 18 g/mol)',
        alternativas: ['18 g', '32 g', '36 g', '72 g', '144 g'],
        correta: 'D',
        resolucao: [
          'n(CH₄) = 32/16 = 2 mol.',
          'A proporção é 1 CH₄ : 2 H₂O, logo formam-se 4 mol de água.',
          'm = 4 × 18 = 72 g.',
        ],
        porqueErram: [
          'A: usa 1 mol de água.', 'C: usa proporção 1:1.',
          'B: devolve a massa do metano. E: multiplica por 4 indevidamente.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Misturam-se 4 mol de H₂ com 1 mol de O₂ na reação 2 H₂ + O₂ → 2 H₂O.'],
        enunciado: 'A quantidade máxima de água formada e o reagente em excesso são, respectivamente,',
        alternativas: ['2 mol de água e O₂ em excesso', '2 mol de água e H₂ em excesso', '4 mol de água e O₂ em excesso', '4 mol de água e H₂ em excesso', '1 mol de água e O₂ em excesso'],
        correta: 'B',
        resolucao: [
          'A proporção é 2 H₂ : 1 O₂. Com 4 mol de H₂, seriam necessários 2 mol de O₂.',
          'Como há apenas 1 mol de O₂, o oxigênio é o limitante e o H₂ está em excesso (sobra 2 mol).',
          '1 mol de O₂ gera 2 mol de H₂O pela proporção 1:2.',
        ],
        porqueErram: [
          'A: troca o reagente em excesso.',
          'C e D: usam o H₂ como limitante, desconsiderando a proporção.',
          'E: aplica proporção 1:1.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Uma reação deveria produzir 50 g de produto, mas produziu 40 g.'],
        enunciado: 'O rendimento da reação é de',
        alternativas: ['10%', '25%', '40%', '80%', '125%'],
        correta: 'D',
        resolucao: [
          'Rendimento = (massa real / massa teórica) × 100.',
          'η = (40/50) × 100.',
          'η = 80%.',
        ],
        porqueErram: [
          'A: calcula a diferença absoluta em gramas.',
          'B e C: usam apenas um dos valores.',
          'E: inverte a razão.',
        ],
      },
    ],
  },

  /* ----------------------------------------------------------- SOLUÇÕES */
  'qui-solucoes': {
    chave: [
      'Soluto, solvente e tipos de solução',
      'Concentração comum, molaridade e título',
      'Solubilidade e coeficiente de solubilidade',
      'Diluição e mistura de soluções',
      'Propriedades coligativas e aplicações',
    ],
    secoes: [
      {
        h: 'Composição de uma solução',
        ps: [
          'Solução é uma mistura homogênea de soluto (disperso) e solvente (dispersante), geralmente em maior quantidade. Classificam-se em insaturada, saturada e supersaturada conforme a quantidade de soluto em relação à solubilidade na temperatura.',
          'Concentração comum (g/L) indica massa de soluto por volume de solução; molaridade (mol/L) indica quantidade de matéria por litro; título (ou fração mássica) é a razão entre massas, multiplicada por 100 para virar porcentagem. ppm é usado para concentrações muito pequenas, como poluentes.',
        ],
      },
      {
        h: 'Solubilidade',
        ps: [
          'O coeficiente de solubilidade é a massa máxima de soluto que se dissolve em 100 g de solvente a determinada temperatura. Para a maioria dos sólidos iônicos, a solubilidade aumenta com a temperatura; para gases, diminui — é por isso que refrigerante gaseificado perde gás ao aquecer.',
          'A curva de solubilidade permite prever cristalização por resfriamento: se uma solução saturada a 80 °C é resfriada a 20 °C, o excesso cristaliza. Esse é o princípio da purificação por recristalização.',
        ],
      },
      {
        h: 'Diluição e mistura',
        ps: [
          'Na diluição, adiciona-se solvente: o volume aumenta, a concentração cai, mas a quantidade de soluto é a mesma. Daí C₁V₁ = C₂V₂. Na mistura de soluções do mesmo soluto, C_final = (C₁V₁ + C₂V₂)/(V₁ + V₂).',
          'Ao misturar soluções que reagem, é preciso calcular a quantidade de matéria de cada uma e verificar o excesso — é o mesmo raciocínio do reagente limitante, agora em volume.',
        ],
      },
      {
        h: 'Propriedades coligativas',
        ps: [
          'Dependem apenas da quantidade de partículas dissolvidas: abaixamento da pressão de vapor, elevação do ponto de ebulição, abaixamento do ponto de congelamento e pressão osmótica. Por isso a água com sal ferve acima de 100 °C e congela abaixo de 0 °C — é o princípio do sal nas estradas em países frios.',
          'O efeito depende do número de partículas: 1 mol de NaCl gera 2 mol de íons, produzindo efeito maior que 1 mol de glicose. A pressão osmótica é fundamental em biologia: soro fisiológico é isotônico em relação ao sangue (0,9% de NaCl).',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Molaridade do soro',
        texto: '9 g de NaCl em 1 L (M = 58,5 g/mol).',
        comentario: 'n = 9/58,5 ≈ 0,154 mol → 0,154 mol/L, próximo do fisiológico.',
      },
      {
        titulo: 'Diluir soro',
        texto: '500 mL de solução 0,2 mol/L completados a 1 L.',
        comentario: '0,2 × 0,5 = M₂ × 1 → M₂ = 0,1 mol/L.',
      },
    ],
    figuras: [
      {
        titulo: 'Tipos de solução',
        tipo: 'barras',
        itens: [
          { txt: 'Insaturada', valor: 40, unidade: '% da saturação' },
          { txt: 'Saturada', valor: 100, unidade: '% da saturação' },
          { txt: 'Supersaturada', valor: 120, unidade: '% da saturação' },
        ],
        legenda: 'Acima do coeficiente de solubilidade, o excesso precipita.',
      },
    ],
    formulas: [
      { titulo: 'Concentração comum', expr: 'C = m / V', uso: 'g/L.' },
      { titulo: 'Molaridade', expr: 'M = n / V = m / (M·V)', uso: 'mol/L.' },
      { titulo: 'Título', expr: 'τ = m_soluto / m_solução', uso: 'Multiplique por 100 para %.' },
      { titulo: 'Diluição', expr: 'C₁V₁ = C₂V₂', uso: 'Soluto constante.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Dissolvem-se 20 g de NaOH (M = 40 g/mol) em água até completar 500 mL de solução. A molaridade é de',
        alternativas: ['0,1 mol/L', '0,4 mol/L', '0,5 mol/L', '1,0 mol/L', '2,5 mol/L'],
        correta: 'D',
        resolucao: [
          'n = m/M = 20/40 = 0,5 mol.',
          'Volume em litros: 500 mL = 0,5 L.',
          'M = 0,5/0,5 = 1,0 mol/L.',
        ],
        porqueErram: [
          'B: não converte o volume para litros corretamente em um dos passos.',
          'C: usa n = 0,25 mol.',
          'A e E: erram a divisão por fator 2.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Ao adicionar água a uma solução de NaCl, mantendo-se a quantidade de soluto, ocorre',
        alternativas: ['aumento da concentração e do volume', 'aumento do volume com diminuição da concentração', 'aumento da quantidade de matéria de soluto', 'diminuição do volume e da concentração', 'nenhuma alteração, pois o soluto não se altera'],
        correta: 'B',
        resolucao: [
          'Adicionar solvente aumenta o volume da solução.',
          'A quantidade de matéria do soluto permanece constante.',
          'Como C = n/V, aumentar V reduz C: é a diluição.',
        ],
        porqueErram: [
          'A: a concentração diminui, não aumenta.',
          'C: a quantidade de soluto não muda.',
          'D: o volume aumenta.',
          'E: a concentração muda mesmo sem alterar a massa de soluto.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Em regiões muito frias, joga-se sal nas estradas para evitar a formação de gelo. Isso funciona porque o sal',
        alternativas: ['aumenta o ponto de congelamento da água', 'abaixa o ponto de congelamento da água por efeito coligativo', 'aquece a água por reação exotérmica', 'aumenta a pressão de vapor da água', 'impede a dissolução do oxigênio'],
        correta: 'B',
        resolucao: [
          'A dissolução de sal aumenta o número de partículas no líquido.',
          'Propriedades coligativas: o ponto de congelamento diminui e o de ebulição aumenta.',
          'Assim, a água salgada permanece líquida em temperaturas abaixo de 0 °C, evitando o gelo.',
        ],
        porqueErram: [
          'A: o efeito é de abaixamento.',
          'C: a dissolução do NaCl é endotérmica, e o efeito é coligativo, não térmico.',
          'D: a pressão de vapor diminui.',
          'E: não tem relação com o congelamento.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- TERMOQUÍMICA */
  'qui-termoquimica': {
    chave: [
      'Reações exotérmicas e endotérmicas',
      'Entalpia e variação de entalpia (ΔH)',
      'Lei de Hess',
      'Energia de ligação',
      'Entropia, espontaneidade e poder calorífico',
    ],
    secoes: [
      {
        h: 'Entalpia e calor de reação',
        ps: [
          'A variação de entalpia, ΔH, mede o calor trocado a pressão constante. ΔH negativo indica reação exotérmica, que libera calor — combustão, respiração, neutralização. ΔH positivo indica endotérmica, que absorve calor — fotossíntese, decomposição térmica, dissolução de alguns sais.',
          'Em um gráfico de entalpia, os reagentes e produtos aparecem em níveis de energia: se os produtos estão abaixo, houve liberação de energia (exotérmica); acima, absorção. A diferença entre os patamares é o ΔH, e a "subida" até o complexo ativado é a energia de ativação.',
        ],
      },
      {
        h: 'Lei de Hess',
        ps: [
          'A variação de entalpia depende apenas dos estados inicial e final, não do caminho. Por isso é possível somar equações intermediárias para obter a reação global. Regras: ao inverter uma equação, troca-se o sinal de ΔH; ao multiplicar os coeficientes, multiplica-se ΔH pelo mesmo fator.',
          'É o método usado quando a reação não pode ser medida diretamente — como a formação de CO a partir de C e O₂, obtida pela combinação das combustões do carbono e do monóxido.',
        ],
      },
      {
        h: 'Energia de ligação e poder calorífico',
        ps: [
          'Romper ligações consome energia (endotérmico); formar ligações libera energia (exotérmico). O ΔH da reação pode ser estimado por ΔH = Σ(energias das ligações rompidas) − Σ(energias das ligações formadas).',
          'O poder calorífico indica a energia liberada por unidade de massa ou volume de combustível. É a base da comparação entre etanol, gasolina e diesel em questões de matriz energética: além da energia, entram emissões, área cultivada e custo.',
        ],
      },
      {
        h: 'Entropia e espontaneidade',
        ps: [
          'Entropia (S) mede a desordem do sistema: sólido < líquido < gás. Um processo tende a ser espontâneo quando aumenta a desordem e/ou libera energia. A energia livre de Gibbs combina os dois fatores: ΔG = ΔH − T·ΔS.',
          'ΔG negativo indica processo espontâneo. Reações exotérmicas com aumento de entropia (combustão) são espontâneas em qualquer temperatura; endotérmicas com aumento de entropia, como a fusão do gelo, tornam-se espontâneas acima de certa temperatura.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Combustão do metano',
        texto: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O, ΔH = −890 kJ/mol.',
        comentario: 'ΔH negativo: libera 890 kJ por mol de metano queimado — reação exotérmica.',
      },
      {
        titulo: 'Hess com inversão',
        texto: 'Se A → B tem ΔH = +50 kJ, então B → A tem ΔH = −50 kJ.',
        comentario: 'Inverter a equação inverte o sinal da entalpia.',
      },
    ],
    figuras: [
      {
        titulo: 'Exotérmica × endotérmica no gráfico de entalpia',
        tipo: 'camadas',
        itens: [
          { txt: 'Exotérmica', nota: 'reagentes acima dos produtos; ΔH negativo' },
          { txt: 'Endotérmica', nota: 'produtos acima dos reagentes; ΔH positivo' },
          { txt: 'Energia de ativação', nota: 'barreira entre reagentes e complexo ativado' },
        ],
        legenda: 'A posição relativa dos patamares define o sinal do ΔH.',
      },
    ],
    formulas: [
      { titulo: 'Variação de entalpia', expr: 'ΔH = H_produtos − H_reagentes', uso: 'Negativo: exotérmica.' },
      { titulo: 'Lei de Hess', expr: 'ΔH_total = Σ ΔH_etapas', uso: 'Inverta ou multiplique conforme necessário.' },
      { titulo: 'Energia de ligação', expr: 'ΔH = Σ(rompidas) − Σ(formadas)', uso: 'Valores em kJ/mol.' },
      { titulo: 'Gibbs', expr: 'ΔG = ΔH − T·ΔS', uso: 'ΔG < 0: espontâneo.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A queima de uma amostra de carvão libera calor para o ambiente. Sobre esse processo, é correto afirmar que',
        alternativas: ['é endotérmico, com ΔH positivo', 'é exotérmico, com ΔH negativo', 'não há variação de entalpia', 'a entalpia dos produtos é maior que a dos reagentes', 'a energia de ativação é nula'],
        correta: 'B',
        resolucao: [
          'Liberar calor para o ambiente caracteriza reação exotérmica.',
          'Por convenção, a entalpia dos produtos é menor que a dos reagentes.',
          'Logo ΔH = H_prod − H_reag < 0, ou seja, ΔH negativo.',
        ],
        porqueErram: [
          'A: inverte o conceito.',
          'C: toda reação com queima tem variação.',
          'D: seria endotérmica. E: toda combustão tem energia de ativação.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: [
          'I. C(graf) + O₂(g) → CO₂(g)   ΔH = −394 kJ/mol',
          'II. CO(g) + ½ O₂(g) → CO₂(g)   ΔH = −283 kJ/mol',
        ],
        enunciado: 'Com base na lei de Hess, a entalpia de formação do CO(g) a partir de C(graf) e ½ O₂(g) é de',
        alternativas: ['−677 kJ/mol', '−111 kJ/mol', '+111 kJ/mol', '+677 kJ/mol', '−394 kJ/mol'],
        correta: 'B',
        resolucao: [
          'Queremos: C(graf) + ½ O₂ → CO. Mantenha a equação I e inverta a II.',
          'I: C + O₂ → CO₂, ΔH = −394. II invertida: CO₂ → CO + ½ O₂, ΔH = +283.',
          'Somando: C + ½ O₂ → CO, ΔH = −394 + 283 = −111 kJ/mol.',
        ],
        porqueErram: [
          'A: soma os módulos sem inverter.',
          'C: inverte o sinal final.',
          'D: soma os módulos e troca o sinal.',
          'E: usa apenas a primeira equação.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A dissolução de um sal que provoca abaixamento da temperatura da água é um processo',
        alternativas: ['exotérmico, com liberação de calor', 'endotérmico, com absorção de calor da água', 'que não envolve energia', 'que só ocorre com aquecimento externo', 'que aumenta a entalpia da água sem retirar energia do meio'],
        correta: 'B',
        resolucao: [
          'A temperatura da água cai porque o sistema retira energia do meio.',
          'Retirar calor caracteriza processo endotérmico.',
          'Portanto ΔH > 0: a entalpia dos produtos (solução) é maior que a dos reagentes.',
        ],
        porqueErram: [
          'A: descreveria aumento de temperatura.',
          'C e E: violam a conservação de energia.',
          'D: a dissolução endotérmica ocorre espontaneamente, retirando calor do entorno.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------- ELETROQUÍMICA */
  'qui-eletroquimica': {
    chave: [
      'Número de oxidação e identificação de oxirredução',
      'Pilhas: ânodo, cátodo e diferença de potencial',
      'Eletrólise ígnea e aquosa',
      'Corrosão e proteção de metais',
      'Aplicações: baterias, galvanoplastia e metais',
    ],
    secoes: [
      {
        h: 'Oxirredução',
        ps: [
          'Oxidação é perda de elétrons, com aumento do número de oxidação; redução é ganho de elétrons, com diminuição do NOx. Quem oxida é o agente redutor (ele reduz o outro); quem reduz é o agente oxidante. Não confunda o nome com o que a substância faz: o oxidante sofre redução.',
          'Regras práticas do NOx: substância simples tem NOx zero; oxigênio geralmente −2; hidrogênio +1; a soma dos NOx é zero em compostos neutros e igual à carga em íons.',
        ],
      },
      {
        h: 'Pilhas',
        ps: [
          'Em uma pilha, a oxidação ocorre no ânodo (polo negativo) e a redução no cátodo (polo positivo); os elétrons fluem pelo circuito externo do ânodo para o cátodo. A ponte salina fecha o circuito, permitindo migração de íons e mantendo a neutralidade.',
          'A diferença de potencial é ΔE = E_cátodo − E_ânodo, sempre com potenciais de redução tabelados. ΔE positivo indica processo espontâneo. Quanto maior a diferença entre os potenciais, maior a voltagem da pilha.',
        ],
      },
      {
        h: 'Eletrólise',
        ps: [
          'A eletrólise é o processo inverso da pilha: consome energia elétrica para forçar uma reação não espontânea. Na eletrólise, o ânodo continua sendo o local da oxidação, mas agora é o polo positivo; o cátodo é negativo. É o que permite obter alumínio metálico da bauxita e cloro da salmoura.',
          'Na eletrólise aquosa, é preciso considerar a competição entre íons do soluto e da água. Na eletrólise da salmoura, produzem-se hidrogênio no cátodo e cloro no ânodo, com formação de NaOH em solução.',
        ],
      },
      {
        h: 'Corrosão e proteção',
        ps: [
          'A ferrugem é a oxidação do ferro na presença de oxigênio e água. Metais com menor potencial de redução oxidam-se preferencialmente. É por isso que o zinco protege o ferro na galvanização: o zinco se oxida primeiro (metal de sacrifício) e preserva a estrutura.',
          'A proteção catódica é usada em navios e tubulações, com blocos de zinco ou magnésio fixados ao aço. Pintura e óleo também funcionam, mas apenas enquanto a camada estiver íntegra.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Pilha de Daniell',
        texto: 'Zn/Cu com potenciais de redução E°(Zn²⁺/Zn) = −0,76 V e E°(Cu²⁺/Cu) = +0,34 V.',
        comentario: 'ΔE = 0,34 − (−0,76) = 1,10 V. O zinco oxida (ânodo) e o cobre reduz (cátodo).',
      },
      {
        titulo: 'Metal de sacrifício',
        texto: 'Bloco de zinco preso ao casco de aço de um navio.',
        comentario: 'O zinco oxida no lugar do ferro, protegendo o casco até ser totalmente consumido.',
      },
    ],
    figuras: [
      {
        titulo: 'Pilha × eletrólise',
        tipo: 'camadas',
        itens: [
          { txt: 'Pilha', nota: 'espontânea; ânodo negativo; gera energia' },
          { txt: 'Eletrólise', nota: 'não espontânea; ânodo positivo; consome energia' },
          { txt: 'Em ambas', nota: 'oxidação no ânodo, redução no cátodo' },
        ],
        legenda: 'O que muda entre pilha e eletrólise é o sinal dos polos e a espontaneidade.',
      },
    ],
    formulas: [
      { titulo: 'Diferença de potencial', expr: 'ΔE = E_cátodo − E_ânodo', uso: 'Potenciais de redução.' },
      { titulo: 'Soma dos NOx', expr: 'Σ NOx = 0 (neutro) ou carga do íon', uso: 'Determinar NOx desconhecido.' },
      { titulo: 'Carga elétrica', expr: 'Q = i · t', uso: 'Q em coulombs; 96.500 C = 1 mol de elétrons.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['E°(Zn²⁺/Zn) = −0,76 V e E°(Cu²⁺/Cu) = +0,34 V.'],
        enunciado: 'Em uma pilha formada por esses dois eletrodos, a diferença de potencial e o metal que sofre oxidação são, respectivamente,',
        alternativas: ['1,10 V e cobre', '1,10 V e zinco', '0,42 V e zinco', '0,42 V e cobre', '−1,10 V e zinco'],
        correta: 'B',
        resolucao: [
          'O eletrodo de menor potencial de redução oxida: o zinco (−0,76 V) é o ânodo.',
          'ΔE = E_cátodo − E_ânodo = 0,34 − (−0,76) = 1,10 V.',
          'Portanto: 1,10 V, com oxidação do zinco.',
        ],
        porqueErram: [
          'A: troca o eletrodo que oxida.',
          'C e D: subtraem os valores sem inverter o sinal do zinco.',
          'E: inverte o sinal do potencial.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Na eletrólise, diferentemente da pilha, o ânodo é o polo positivo porque',
        alternativas: ['nele ocorre redução', 'nele ocorre oxidação e os elétrons são retirados pelo gerador', 'nele não há transferência de elétrons', 'a reação é espontânea', 'a ponte salina é dispensável'],
        correta: 'B',
        resolucao: [
          'Em qualquer eletrodo onde há oxidação, há liberação de elétrons — o ânodo.',
          'Na eletrólise, o gerador retira elétrons do ânodo, tornando-o positivo.',
          'Por isso a oxidação permanece no ânodo, mas o sinal do polo se inverte em relação à pilha.',
        ],
        porqueErram: [
          'A: a redução ocorre no cátodo.',
          'C: sempre há transferência de elétrons.',
          'D: a eletrólise é não espontânea.',
          'E: a eletrólise não precisa de ponte salina, mas isso não explica o polo.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A galvanização do ferro com zinco protege contra a corrosão porque o zinco',
        alternativas: ['impede a passagem de elétrons', 'tem menor potencial de redução e se oxida no lugar do ferro', 'reduz o ferro a ferro metálico', 'reage com o oxigênio formando uma camada inerte e permanente', 'aumenta o potencial de redução do ferro'],
        correta: 'B',
        resolucao: [
          'O zinco tem potencial de redução menor que o do ferro.',
          'Isso o torna mais suscetível à oxidação: ele sofre corrosão preferencial.',
          'Mesmo que a camada se rompa, o zinco continua protegendo o ferro — é o metal de sacrifício.',
        ],
        porqueErram: [
          'A: a proteção é eletroquímica, justamente pelo fluxo de elétrons.',
          'C: o ferro não é reduzido.',
          'D: a proteção não é apenas barreira física.',
          'E: o potencial do ferro não muda.',
        ],
      },
    ],
  },

  /* --------------------------------------------------- QUÍMICA ORGÂNICA */
  'qui-organica': {
    chave: [
      'Cadeias carbônicas e classificação',
      'Funções orgânicas oxigenadas e nitrogenadas',
      'Isomeria plana e espacial',
      'Reações orgânicas (substituição, adição, eliminação)',
      'Polímeros e aplicações industriais',
    ],
    secoes: [
      {
        h: 'O carbono e as cadeias',
        ps: [
          'O carbono é tetravalente e forma cadeias estáveis, o que gera milhões de compostos. As cadeias classificam-se em aberta (acíclica) ou fechada (cíclica), saturada (só ligações simples) ou insaturada (duplas ou triplas), homogênea (sem heteroátomo) ou heterogênea, e normal (linear) ou ramificada.',
          'A fórmula geral dos alcanos é CₙH₂ₙ₊₂; alcenos, CₙH₂ₙ; alcinos, CₙH₂ₙ₋₂; cicloalcanos, CₙH₂ₙ. Reconhecer a fórmula ajuda a identificar insaturações e anéis.',
        ],
      },
      {
        h: 'Funções orgânicas',
        ps: [
          'Oxigenadas: álcool (—OH ligado a carbono saturado), fenol (—OH em anel aromático), éter (—O— entre carbonos), aldeído (—CHO), cetona (C=O entre carbonos), ácido carboxílico (—COOH) e éster (—COO—). Nitrogenadas: amina (—NH₂), amida (—CONH₂), aminoácido (amina + ácido carboxílico) e nitrocomposto.',
          'Propriedades acompanham as funções: ácidos carboxílicos têm caráter ácido e cheiro forte (vinagre); ésteres dão aroma a frutas; álcoois e ácidos formam ligações de hidrogênio e têm pontos de ebulição mais altos que éteres e alcanos de massa semelhante.',
        ],
      },
      {
        h: 'Isomeria',
        ps: [
          'Isômeros têm a mesma fórmula molecular e estruturas diferentes. Isomeria plana: de cadeia, de posição, de função e metameria. Isomeria espacial: geométrica (cis-trans, exige dupla ligação com substituintes diferentes em cada carbono ou anel) e óptica (carbono quiral, com quatro ligantes diferentes).',
          'A isomeria óptica interessa à farmacologia: enantiômeros podem ter efeitos distintos — a talidomida é um caso histórico complexo: seus enantiômeros podem interconverter-se no organismo, portanto separá-los não garante segurança.',
        ],
      },
      {
        h: 'Reações e polímeros',
        ps: [
          'Substituição: um átomo ou grupo é trocado (halogenação de alcanos). Adição: átomos entram na insaturação (hidrogenação, hidratação de alceno). Eliminação: saem átomos e forma-se insaturação (desidratação de álcool). Oxidação de álcool primário gera aldeído e depois ácido carboxílico; secundário gera cetona.',
          'Polímeros de adição vêm da polimerização de alcenos: polietileno (sacolas), polipropileno (embalagens), PVC (tubos), poliestireno (isopor). De condensação: poliéster e náilon, com perda de água. A biodegradabilidade depende da cadeia: polímeros de adição com cadeias longas resistem à decomposição e se acumulam no ambiente.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Álcool × ácido',
        texto: 'Etanol (C₂H₅OH) e ácido acético (CH₃COOH).',
        comentario: 'O ácido carboxílico tem caráter ácido e pH menor em solução; o álcool é neutro.',
      },
      {
        titulo: 'Polimerização do etileno',
        texto: 'n CH₂=CH₂ → (—CH₂—CH₂—)ₙ.',
        comentario: 'A dupla abre e forma a cadeia: polietileno.',
      },
    ],
    figuras: [
      {
        titulo: 'Funções e grupos funcionais',
        tipo: 'lista',
        itens: [
          { txt: 'Álcool — OH ligado a carbono saturado' },
          { txt: 'Aldeído — CHO na extremidade da cadeia' },
          { txt: 'Cetona — C=O entre carbonos' },
          { txt: 'Ácido carboxílico — COOH' },
          { txt: 'Éster — COO entre carbonos' },
        ],
        legenda: 'O grupo funcional define as propriedades químicas do composto.',
      },
    ],
    formulas: [
      { titulo: 'Alcanos', expr: 'CₙH₂ₙ₊₂', uso: 'Cadeia saturada aberta.' },
      { titulo: 'Alcenos', expr: 'CₙH₂ₙ', uso: 'Uma dupla ligação.' },
      { titulo: 'Grau de insaturação', expr: 'Ω = (2C + 2 − H)/2', uso: 'Para compostos só de C e H: cada dupla ou anel conta 1; tripla conta 2.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'O composto CH₃—CO—CH₃ pertence à função',
        alternativas: ['álcool', 'aldeído', 'cetona', 'ácido carboxílico', 'éster'],
        correta: 'C',
        resolucao: [
          'O grupo C=O está entre dois carbonos.',
          'Quando a carbonila está no meio da cadeia, a função é cetona (propanona, a acetona).',
          'Se estivesse na extremidade, com H ligado ao carbono da carbonila, seria aldeído.',
        ],
        porqueErram: [
          'A: não há OH.', 'B e D: exigem carbonila na extremidade ou o grupo COOH.',
          'E: exigiria um oxigênio entre dois carbonos além da carbonila.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A isomeria cis-trans é possível em compostos que apresentam',
        alternativas: ['carbono quiral', 'dupla ligação com substituintes diferentes em cada carbono', 'apenas ligações simples', 'anel aromático', 'grupo carboxila'],
        correta: 'B',
        resolucao: [
          'A rotação em torno da dupla ligação é impedida, o que fixa a posição dos grupos.',
          'Isso só gera isômeros se cada carbono da dupla tiver dois substituintes diferentes.',
          'Na forma cis os grupos iguais ficam do mesmo lado; na trans, em lados opostos.',
        ],
        porqueErram: [
          'A: carbono quiral gera isomeria óptica.',
          'C: sem insaturação não há restrição de rotação.',
          'D e E: não são condição para cis-trans.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'O polietileno, usado em sacolas e embalagens, é obtido pela',
        alternativas: ['condensação de ácidos carboxílicos com álcoois', 'polimerização por adição de moléculas de etileno', 'hidrólise de ésteres', 'fermentação de açúcares', 'oxidação de álcoois'],
        correta: 'B',
        resolucao: [
          'O etileno (CH₂=CH₂) tem dupla ligação.',
          'A polimerização por adição rompe a dupla e liga as unidades em cadeia.',
          'O produto é o polietileno, cuja baixa biodegradabilidade causa acúmulo ambiental.',
        ],
        porqueErram: [
          'A: descreveria poliéster (condensação).',
          'C, D e E: são outras reações, sem formação de polímero de cadeia de etileno.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------ QUÍMICA AMBIENTAL */
  'qui-ambiental': {
    chave: [
      'Poluição do ar: gases e material particulado',
      'Chuva ácida e efeito estufa',
      'Poluição da água: eutrofização, metais e plásticos',
      'Química verde e tratamento de resíduos',
      'Combustíveis, emissões e matriz energética',
    ],
    secoes: [
      {
        h: 'Poluição atmosférica',
        ps: [
          'Os principais poluentes do ar são monóxido de carbono (combustão incompleta, tóxico por ligar-se à hemoglobina), óxidos de nitrogênio (NOₓ, formados em altas temperaturas de motores), dióxido de enxofre (queima de combustíveis com enxofre), material particulado (fuligem) e compostos orgânicos voláteis.',
          'O NOₓ e os voláteis, sob luz solar, formam ozônio troposférico — o smog fotoquímico das grandes cidades. Na estratosfera, o ozônio é protetor contra radiação ultravioleta; na troposfera, é poluente irritante. Contexto é tudo.',
        ],
      },
      {
        h: 'Chuva ácida e efeito estufa',
        ps: [
          'A chuva ácida resulta da reação de SO₂ e NOₓ com água na atmosfera, formando ácido sulfúrico e nítrico, com pH abaixo de 5,6. Corrói monumentos, acidifica lagos e lixivia nutrientes do solo. A mitigação envolve dessulfurização de combustíveis e catalisadores automotivos.',
          'O efeito estufa é natural e necessário; o problema é sua intensificação por CO₂, CH₄, N₂O e CFCs. O metano tem potencial de aquecimento muito maior que o CO₂ por molécula, embora permaneça menos tempo na atmosfera. A mitigação inclui eficiência energética, renováveis e preservação de florestas.',
        ],
      },
      {
        h: 'Água e resíduos',
        ps: [
          'A eutrofização por esgoto e fertilizantes leva ao excesso de nutrientes, proliferação de algas e queda do oxigênio dissolvido. Metais pesados (chumbo, mercúrio, cádmio) não são biodegradáveis, acumulam-se em sedimentos e na cadeia alimentar e causam intoxicações — o caso de Minamata com mercúrio é o exemplo histórico.',
          'Microplásticos são um problema crescente: fragmentam-se sem desaparecer e entram na cadeia alimentar. A DBO (demanda bioquímica de oxigênio) mede a matéria orgânica degradável e é indicador de poluição: quanto maior, pior a qualidade da água.',
        ],
      },
      {
        h: 'Química verde e tratamento',
        ps: [
          'Os princípios da química verde incluem prevenção de resíduos, economia de átomos, uso de matérias-primas renováveis, solventes menos tóxicos, eficiência energética e catálise. A avaliação de ciclo de vida considera impactos da extração ao descarte.',
          'Tratamento de água usa coagulação, floculação, decantação, filtração e desinfecção (cloro, ozônio, UV). Tratamento de esgoto usa etapas anaeróbias e aeróbias para reduzir carga orgânica. Aterros sanitários captam metano, e a compostagem desvia resíduo orgânico do aterro.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Catalisador automotivo',
        texto: 'Converte CO, hidrocarbonetos e NOₓ em CO₂, H₂O e N₂.',
        comentario: 'Reduz poluentes sem alterar o rendimento teórico do motor.',
      },
      {
        titulo: 'DBO como indicador',
        texto: 'Rio com esgoto tem DBO alto; rio preservado tem DBO baixa.',
        comentario: 'DBO mede o oxigênio consumido por microrganismos para degradar matéria orgânica.',
      },
    ],
    figuras: [
      {
        titulo: 'Da emissão ao impacto',
        tipo: 'fluxo',
        itens: ['Queima de combustível', 'SO₂ e NOₓ na atmosfera', 'Reação com vapor de água', 'Ácidos sulfúrico e nítrico', 'Chuva ácida e acidificação do solo'],
        legenda: 'Cada etapa da cadeia é um ponto possível de intervenção tecnológica.',
      },
    ],
    formulas: [
      { titulo: 'pH', expr: 'pH = −log[H⁺]', uso: 'Chuva normal: pH ≈ 5,6.' },
      { titulo: 'Combustão completa do metano', expr: 'CH₄ + 2 O₂ → CO₂ + 2 H₂O', uso: 'Incompleta gera CO e fuligem.' },
      { titulo: 'Formação de ácido sulfúrico', expr: 'SO₃ + H₂O → H₂SO₄', uso: 'Etapa final da chuva ácida por SO₂.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A substituição de combustíveis com alto teor de enxofre por combustíveis com baixo teor reduz principalmente',
        alternativas: ['a emissão de CO₂ e o efeito estufa', 'a emissão de SO₂ e a formação de chuva ácida', 'a emissão de ozônio estratosférico', 'o consumo de oxigênio na combustão', 'a produção de material particulado apenas'],
        correta: 'B',
        resolucao: [
          'O enxofre presente no combustível gera SO₂ na queima.',
          'O SO₂ se oxida a SO₃ e reage com água formando H₂SO₄ — ácido que caracteriza a chuva ácida.',
          'Reduzir o teor de enxofre corta a fonte desse poluente na origem.',
        ],
        porqueErram: [
          'A: o CO₂ depende do carbono, não do enxofre.',
          'C: ozônio estratosférico é destruído por CFCs.',
          'D e E: não é o efeito principal do enxofre.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Um lago recebe continuamente esgoto doméstico rico em matéria orgânica e nutrientes.'],
        enunciado: 'A consequência esperada é',
        alternativas: ['aumento do oxigênio dissolvido e da biodiversidade', 'eutrofização, com proliferação de algas e queda do oxigênio dissolvido', 'redução da DBO e melhora da qualidade da água', 'precipitação de metais pesados', 'aumento do pH para valores acima de 9'],
        correta: 'B',
        resolucao: [
          'Os nutrientes (N e P) fertilizam o lago, provocando floração de algas.',
          'A decomposição dessas algas consome oxigênio dissolvido.',
          'O resultado é a queda do O₂, mortandade de peixes e perda de biodiversidade — a eutrofização.',
        ],
        porqueErram: [
          'A: o efeito é o oposto.',
          'C: a DBO aumenta com a carga orgânica.',
          'D e E: não são consequências diretas do esgoto doméstico.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Sobre o ozônio (O₃), é correto afirmar que',
        alternativas: [
          'na estratosfera protege da radiação UV e na troposfera é poluente',
          'é benéfico em qualquer altitude',
          'é o principal gás do efeito estufa',
          'é emitido diretamente pelos automóveis',
          'sua destruição na estratosfera causa chuva ácida',
        ],
        correta: 'A',
        resolucao: [
          'Na estratosfera, o ozônio absorve radiação ultravioleta, protegendo os seres vivos.',
          'Na troposfera, é produto de reações entre NOₓ e compostos orgânicos sob luz solar, sendo irritante respiratório.',
          'Portanto o mesmo gás tem papéis opostos conforme a altitude.',
        ],
        porqueErram: [
          'B: depende da altitude.', 'C: o principal é o CO₂.',
          'D: o ozônio troposférico é formado na atmosfera, não emitido diretamente.',
          'E: a destruição do ozônio aumenta a radiação UV, não a acidez da chuva.',
        ],
      },
    ],
  },
};
