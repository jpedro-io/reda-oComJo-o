/**
 * Conteúdo das páginas de Ciências da Natureza.
 */
export const PAGINAS_NATUREZA = {
  'bio-ecologia': {
    resumo: [
      'Ecologia é o assunto que mais aparece em Biologia no Enem, e quase sempre embrulhado em problema ambiental: desmatamento, espécie invasora, poluição de rio, queimada. A pergunta costuma ser a mesma por trás de enunciados diferentes: o que acontece com a energia e com a matéria quando alguma peça desse sistema sai do lugar.',
      'A cadeia alimentar organiza a passagem de energia. Produtores (plantas, algas, cianobactérias) produzem matéria orgânica pela fotossíntese; consumidores a transferem adiante; decompositores fecham o ciclo devolvendo nutrientes ao ambiente. Em cada transferência perde-se cerca de 90% da energia, principalmente como calor. É por isso que cadeias longas sustentam menos biomassa, que o número de predadores de topo é sempre pequeno e que comer mais baixo na cadeia é mais eficiente do ponto de vista energético.',
      'Matéria e energia têm destinos diferentes, e essa distinção resolve várias questões. A energia atravessa o sistema e não volta: chega como luz solar e sai como calor. A matéria circula, e é isso que os ciclos biogeoquímicos descrevem. No ciclo do carbono, a fotossíntese retira CO₂ da atmosfera; respiração, decomposição e queima de combustível fóssil devolvem. No ciclo do nitrogênio, só bactérias fixadoras (e cianobactérias) transformam o N₂ do ar em forma que planta consegue usar, o que explica por que leguminosas enriquecem o solo.',
      'Relações ecológicas aparecem em forma de exemplo, não de definição. Harmônicas, quando os dois ganham ou um ganha sem prejudicar o outro: mutualismo (liquens, micorrizas, polinização), comensalismo (urubu e carcaça), inquilinismo (peixe-palhaço e anêmona). Desarmônicas, quando há prejuízo: competição, predatismo, parasitismo e amensalismo. Duas que o Enem adora: competição intraespecífica, que regula o tamanho da população, e a competição interespecífica, que decide quem fica com o nicho.',
      'Sucessão ecológica é a sequência previsível de comunidades que ocupam uma área. Começa com espécies pioneiras, resistentes e de crescimento rápido, e caminha para um clímax estável, com mais biomassa e mais diversidade. A sucessão primária parte de um ambiente sem solo; a secundária parte de um solo já formado, por exemplo depois de uma queimada. Nos dois casos a produtividade primária bruta cresce e depois se estabiliza, enquanto a respiração da comunidade aumenta até igualá-la no clímax.',
      'Três padrões de impacto que caem quase todo ano. Eutrofização: esgoto rico em nutrientes provoca proliferação de algas, que morrem, são decompostas por bactérias que consomem o oxigênio dissolvido e matam peixes por hipoxia. Biomagnificação: poluente lipossolúvel, como mercúrio, sobe na cadeia e se concentra mais em cada nível, atingindo os predadores de topo e o ser humano. Espécie exótica invasora: sem inimigo natural, ela se multiplica e substitui a vegetação nativa, simplificando o ecossistema inteiro.',
      'Biomas brasileiros entram como cenário, e o aluno precisa reconhecê-los pelas características: Amazônia (latifoliada, úmida, rios de água doce em volume), Cerrado (solo ácido e rico em alumínio, árvores tortuosas, fogo natural), Caatinga (xerófila, caducifólia, exclusivamente brasileira), Mata Atlântica (mata densa e mais desmatada do país), Pantanal (planície alagável sazonal) e Pampa (campo, clima subtropical).',
    ],
    chave: [
      'Fluxo de energia × ciclo de matéria (energia não se recicla)',
      'Eutrofização, biomagnificação e chuva ácida',
      'Sucessão ecológica e espécies pioneiras',
      'Relações ecológicas com exemplos brasileiros',
    ],
    formulas: [],
    questoes: [
      {
        ano: 2022,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 104',
        textoApoio: [
          'A extinção de espécies é uma ameaça real que afeta diversas regiões do país. A introdução de espécies exóticas pode ser considerada um fator maximizador desse processo. A jaqueira (Artocarpus heterophyllus), por exemplo, é uma árvore originária da Índia e de regiões do Sudeste Asiático que foi introduzida ainda na era colonial e se aclimatou muito bem em praticamente todo o território nacional.',
        ],
        enunciado: 'Casos como o dessa árvore podem provocar a redução da biodiversidade, pois elas',
        alternativas: [
          'ocupam áreas de vegetação nativa e substituem parcialmente a flora original.',
          'estimulam a competição por seus frutos entre animais típicos da região e eliminam as espécies perdedoras.',
          'alteram os nichos e aumentam o número de possibilidades de relações entre os seres vivos daquele ambiente.',
          'apresentam alta taxa de reprodução e se mantêm com um número de indivíduos superior à capacidade de suporte do ambiente.',
          'diminuem a relação de competição entre os polinizadores e facilitam a ação de dispersores de sementes de espécies nativas.',
        ],
        correta: 'A',
        resolucao: [
          'Espécie exótica é a que foi levada para fora da sua área de origem. Quando ela se estabelece bem e passa a se reproduzir sozinha, vira espécie exótica invasora, e é aí que o problema começa.',
          'A jaqueira cresce rápido, faz sombra densa e ocupa o espaço que era da vegetação nativa. Como não tem inimigo natural aqui, nada a controla: ela substitui parte da flora original, e cada planta nativa que sai leva junto os animais que dependiam dela.',
          'A alternativa B erra porque a competição em si não elimina espécies típicas de forma automática. A C erra ao falar em aumento de possibilidades: a invasão simplifica o ambiente, não o diversifica. A D descreve um efeito possível de qualquer população grande, mas a questão pergunta pelo mecanismo de perda de biodiversidade, que é a substituição da flora. A E descreve o contrário do que acontece: a invasora costuma atrapalhar polinizadores e dispersores nativos.',
          'Resposta: A.',
        ],
      },
    ],
  },

  'bio-genetica': {
    resumo: [
      'Genética no Enem é quase sempre primeira lei de Mendel e probabilidade aplicada: cruzamento de heterozigotos Aa × Aa gera 3:1 fenotípica e 1:2:1 genotípica. Herança sem dominância produz fenótipos intermediários; codominância mostra os dois caracteres ao mesmo tempo (AB).',
      'Genética humana e biotecnologia entram por problemas de saúde pública e ética: herança ligada ao X (daltonismo, hemofilia) afeta mais homens, porque eles têm um único X. Em heredograma, procure primeiro quem é afetado e quem é portador.',
      'Biotecnologia cobra transgenia, clonagem, terapia gênica, PCR e CRISPR, sempre com uma pergunta sobre implicação ética ou ambiental. A resposta certa costuma distinguir o que a técnica faz do que ela promete fazer.',
    ],
    chave: [
      'Probabilidade em cruzamentos (Aa × Aa, Aa × aa, diibridismo)',
      'Herança ligada ao sexo e heredogramas',
      'Grupos sanguíneos ABO e Rh (sistema múltiplos alelos)',
      'Transgenia, clonagem e terapia gênica com seus limites',
    ],
    formulas: [
      { titulo: '1ª lei (heterozigotos)', expr: 'Aa × Aa → 1 AA : 2 Aa : 1 aa' },
      { titulo: 'Probabilidade', expr: 'P(A e B) = P(A) · P(B), se independentes' },
    ],
    questoes: [],
  },

  'bio-citologia': {
    resumo: [
      'Citologia cobra a célula como fábrica: membrana (transporte), núcleo (DNA), mitocôndria (respiração e ATP), cloroplasto (fotossíntese), ribossomo (síntese de proteína). Saber qual organela faz o quê resolve a maior parte das questões.',
      'Transporte pela membrana é campeão de incidência: difusão (a favor do gradiente, sem gasto), osmose (água), difusão facilitada (com proteína), transporte ativo (contra o gradiente, com ATP) e endocitose/exocitose. Meio hipertônico faz a célula perder água; hipotônico, ganhar.',
      'Divisão celular: mitose mantém o número de cromossomos (crescimento e reparo); meiose reduz à metade e gera variabilidade pelo crossing-over. Em questão de câncer, a chave é a perda de controle do ciclo celular.',
    ],
    chave: [
      'Osmose em célula animal e vegetal (plasmólise, turgescência)',
      'Respiração celular × fermentação (rendimento de ATP)',
      'Mitose × meiose e variabilidade genética',
      'Bioenergética: fotossíntese e respiração como processos complementares',
    ],
    formulas: [
      { titulo: 'Respiração aeróbica', expr: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energia' },
      { titulo: 'Fotossíntese', expr: '6CO₂ + 6H₂O + luz → C₆H₁₂O₆ + 6O₂' },
    ],
    questoes: [],
  },

  'bio-fisiologia': {
    resumo: [
      'Fisiologia humana é o maior bloco de Biologia no Enem, com destaque para os sistemas cardiovascular, digestório, respiratório, urinário e imunitário. O padrão das questões é ligar função a consequência: o que acontece com o corpo quando um desses sistemas falha ou é desafiado.',
      'Circulatório: artérias saem do coração, veias chegam, capilares fazem a troca. O sangue sai do ventrículo direito para o pulmão (pequena circulação) e do esquerdo para o corpo (grande circulação). Pressão alta e aterosclerose são os contextos mais comuns.',
      'Imunidade: a primeira barreira é pele e muco; depois vem a resposta inata (inflamação, fagocitose) e a adaptativa (linfócitos B produzem anticorpos, T destroem células infectadas). Vacina é imunização ativa e artificial; soro é passiva. Confundir as duas é o erro clássico.',
    ],
    chave: [
      'Pequena e grande circulação, com a oxigenação do sangue',
      'Digestão: onde começa cada enzima e onde é absorvido cada nutriente',
      'Vacina × soro (ativa/passiva) e memória imunológica',
      'Sistema urinário e regulação hídrica (ADH, aldosterona)',
    ],
    formulas: [],
    questoes: [],
  },

  'bio-evolucao': {
    resumo: [
      'Evolução no Enem é seleção natural aplicada: variabilidade preexistente + pressão do ambiente = mudança na frequência das características ao longo das gerações. A frase-chave é "a característica já existia; o ambiente só mudou a proporção".',
      'Lamarck × Darwin é cobrado pela diferença de mecanismo: para Lamarck o uso e desuso gera a característica e ela é transmitida; para Darwin a variação é anterior e a seleção escolhe. Resistência a antibióticos é o exemplo mais usado, e o mais mal interpretado: o antibiótico não cria a bactéria resistente, ele seleciona a que já era.',
      'Especiação, isolamento geográfico e reprodutivo, homologia (mesma origem, funções diferentes) e analogia (mesma função, origens diferentes) completam o bloco. Evolução não é progresso nem "melhoria": é adaptação ao ambiente presente.',
    ],
    chave: [
      'Seleção natural com resistência a antibióticos e pesticidas',
      'Homologia × analogia e evidências da evolução',
      'Especiação por isolamento geográfico',
      'Deriva genética em populações pequenas',
    ],
    formulas: [],
    questoes: [],
  },

  'bio-reino': {
    resumo: [
      'Classificação biológica no Enem aparece em questão de saúde pública e de Biodiversidade: qual grupo causa qual doença, qual tem parede celular, qual é procarionte. Bactéria é procarionte (sem núcleo); fungo é eucarionte com parede de quitina; protozoário é eucarionte unicelular.',
      'Os cinco reinos: Monera (bactérias e cianobactérias), Protista (protozoários e algas), Fungi, Plantae e Animalia. Vírus ficam fora dos reinos, porque não têm célula, e é justamente isso que a questão cobra.',
      'Doenças tropicais brasileiras são presença certa: dengue, zika, chikungunya e febre amarela (vírus, Aedes aegypti), malária (protozoário, Anopheles), doença de Chagas (protozoário, barbeiro), esquistossomose (helminto, caramujo), leptospirose (bactéria, urina de rato).',
    ],
    chave: [
      'Vírus × bactéria × fungo: estrutura e reprodução',
      'Vetores e profilaxia das doenças tropicais',
      'Ciclos de vida de parasitas (esquistossoma, malária, Chagas)',
      'Biodiversidade brasileira e grupos taxonômicos',
    ],
    formulas: [],
    questoes: [],
  },

  'fis-eletrodinamica': {
    resumo: [
      'Eletrodinâmica é o assunto de Física mais cobrado no Enem, quase sempre ligado à conta de luz. A cadeia é sempre a mesma: lei de Ohm (U = Ri) para achar corrente ou resistência, potência (P = Ui = U²/R = Ri²) para saber o consumo, e energia (E = P·Δt) para o custo.',
      'Em circuito em série, a corrente é a mesma e as tensões se somam; em paralelo, a tensão é a mesma e as correntes se somam. A resistência equivalente cai quando se acrescenta resistor em paralelo, é o que explica por que a casa toda apaga quando liga o chuveiro.',
      'Consumo em kWh é potência em kW multiplicada pelo tempo em horas. Se a tarifa é R$/kWh, o custo é consumo × tarifa. Questão de "economia ao trocar a lâmpada" se resolve comparando energia mensal das duas.',
    ],
    chave: [
      'Conta de luz: consumo em kWh e custo mensal',
      'Associação de resistores em série e em paralelo',
      'Potência de chuveiro e disjuntor (limite de corrente)',
      'Efeito Joule e eficiência de aparelhos',
    ],
    formulas: [
      { titulo: 'Ohm', expr: 'U = R · i' },
      { titulo: 'Potência', expr: 'P = U · i = U²/R = R · i²' },
      { titulo: 'Energia', expr: 'E = P · Δt   (kWh se P em kW e t em h)' },
      { titulo: 'Paralelo', expr: '1/R_eq = 1/R₁ + 1/R₂ + …' },
    ],
    questoes: [],
  },

  'fis-mecanica': {
    resumo: [
      'Mecânica é o bloco mais previsível da prova de Física. Quase toda questão parte de três perguntas: o movimento muda de quanto em quanto tempo (cinemática), qual força produz essa mudança (dinâmica) e quanta energia passou de um corpo para outro (trabalho e conservação). Identificar qual das três está sendo pedida é metade da solução.',
      'Cinemática não precisa de força, só de tempo, posição e velocidade. Velocidade média é deslocamento dividido por tempo, e é diferente de velocidade instantânea. No movimento uniforme, v é constante e a posição anda em linha reta no gráfico. No movimento uniformemente variado, a aceleração é constante, a velocidade varia linearmente e a posição varia com o quadrado do tempo, o que aparece como parábola.',
      'Os gráficos são a versão visual dessas relações e caem muito. No v × t, a inclinação é a aceleração e a área entre a curva e o eixo é o deslocamento. No s × t, a inclinação é a velocidade. Muita questão dispensa conta: basta comparar áreas ou inclinações para saber quem andou mais ou quem acelerou mais.',
      'Queda livre e lançamento vertical são o caso particular em que a aceleração é g, para baixo, e não depende da massa. No ponto mais alto do lançamento vertical a velocidade é zero, mas a aceleração continua sendo g: é o erro que a prova cobra com frequência. Tempo de subida e de descida são iguais, e a velocidade de retorno tem o mesmo módulo da de partida.',
      'As três leis de Newton explicam por que o movimento muda. Sem força resultante, um corpo continua como está, parado ou em movimento retilíneo uniforme. Força resultante e aceleração apontam para o mesmo lado e são proporcionais (F = m·a). Toda força tem par de mesma intensidade e sentido oposto, mas em corpos diferentes, e por isso o par nunca se anula. Atrito é força de contato que se opõe ao escorregamento e transforma energia cinética em calor.',
      'Trabalho e energia resolvem o que a dinâmica tornaria trabalhoso. Trabalho é força na direção do deslocamento vezes deslocamento, e a unidade é o joule. A energia cinética depende da massa e do quadrado da velocidade, então dobrar a velocidade quadruplica a energia cinética, e é por isso que o limite de velocidade existe. A energia mecânica se conserva quando só o peso realiza trabalho; com atrito, parte vira calor e o balanço tem de incluir essa perda.',
      'Plano inclinado, polias e elevadores são os cenários favoritos. No plano inclinado, o peso se decompõe em uma componente que empurra o corpo ladeira abaixo e outra que pressiona a superfície, e é a segunda que define o atrito. Em elevador, a sensação de peso depende da aceleração: subindo acelerado o corpo parece mais pesado, descendo acelerado parece mais leve, e em queda livre a força normal é zero.',
    ],
    chave: [
      'Frenagem: distância de parada com reação do motorista',
      'Leis de Newton em elevador e em colisão (airbag, cinto)',
      'Atrito e plano inclinado',
      'Queda livre e lançamento horizontal',
    ],
    formulas: [
      { titulo: 'MUV', expr: 'v = v₀ + at   ·   s = s₀ + v₀t + at²/2' },
      { titulo: 'Torricelli', expr: 'v² = v₀² + 2aΔs' },
      { titulo: '2ª lei', expr: 'F = m · a   ·   P = m · g' },
    ],
    questoes: [
      {
        ano: 2023,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 106',
        textoApoio: [
          'Um professor lança uma esfera verticalmente para cima, a qual retorna, depois de alguns segundos, ao ponto de lançamento. Em seguida, lista em um quadro todas as possibilidades para as grandezas cinemáticas (módulo e sentido da velocidade e da aceleração).',
          'Ele solicita aos alunos que analisem as grandezas cinemáticas no instante em que a esfera atinge a altura máxima, escolhendo uma combinação para os módulos e sentidos da velocidade e da aceleração.',
        ],
        enunciado: 'A escolha que corresponde à combinação correta é',
        alternativas: [
          'v = 0 e a ≠ 0 para cima.',
          'v ≠ 0 para cima e a = 0.',
          'v = 0 e a ≠ 0 para baixo.',
          'v ≠ 0 para cima e a ≠ 0 para cima.',
          'v ≠ 0 para baixo e a ≠ 0 para baixo.',
        ],
        correta: 'C',
        resolucao: [
          'No ponto mais alto, a esfera para de subir e ainda não começou a descer. A velocidade, portanto, é nula: v = 0.',
          'A aceleração não depende da velocidade. Durante todo o voo, inclusive no ponto mais alto, a única força que age é o peso, então a aceleração é a da gravidade, de módulo constante e apontando para baixo. Logo a ≠ 0 e o sentido é para baixo.',
          'O erro que a questão cobra é acreditar que, se a velocidade é zero, a aceleração também é. Seriam iguais apenas se a esfera estivesse parada e permanecesse parada: aí, sim, não haveria força resultante.',
          'Resposta: C. Uma frase para guardar: no alto do lançamento vertical, a velocidade zera, mas a aceleração continua a mesma do começo ao fim do movimento.',
        ],
      },
    ],
  },

  'fis-energia': {
    resumo: [
      'Trabalho é força vezes deslocamento na direção da força (τ = F·d·cosθ) e potência é trabalho sobre tempo (P = τ/Δt). O Enem usa muito potência em contexto de máquina, elevador e usina, e a unidade que aparece é o watt e o kW.',
      'Energia mecânica é cinética (mv²/2) mais potencial (mgh gravitacional, kx²/2 elástica). Sem atrito, a energia se conserva: o que se perde de altura vira velocidade na descida. Com atrito, parte vira calor e a diferença é o trabalho da força de atrito.',
      'Rendimento é energia útil sobre energia total, sempre menor que 1. Questão de "quanto se perde" é (1 − η) da energia de entrada, e é assim que a prova conecta física a consumo e a impacto ambiental.',
    ],
    chave: [
      'Conservação de energia em rampa, montanha-russa e queda',
      'Potência de bomba, elevador e usina (com rendimento)',
      'Energia cinética e distância de frenagem',
      'Trabalho da força de atrito como energia dissipada',
    ],
    formulas: [
      { titulo: 'Trabalho', expr: 'τ = F · d · cos θ' },
      { titulo: 'Potência', expr: 'P = τ / Δt = F · v' },
      { titulo: 'Energia cinética', expr: 'E_c = m v² / 2' },
      { titulo: 'Energia potencial', expr: 'E_p = m g h' },
      { titulo: 'Rendimento', expr: 'η = E_útil / E_total' },
    ],
    questoes: [],
  },

  'fis-termologia': {
    resumo: [
      'Termologia no Enem é calorimetria: quantidade de calor sensível (Q = mcΔT) para variar temperatura e calor latente (Q = mL) para mudar de estado. Numa questão de gelo virando água, os dois aparecem em sequência e a soma é o total.',
      'Equilíbrio térmico: em sistema isolado, o calor cedido é igual ao recebido (ΣQ = 0). É o cálculo de "mistura água quente com água fria" e de calorímetro. Capacidade térmica (C = mc) indica quanto calor o corpo precisa para variar 1 °C, a água tem valor alto, e é isso que estabiliza o clima.',
      'Dilatação térmica aparece em trilho de trem, ponte e termômetro: ΔL = L₀·α·ΔT. E a distinção condução/convecção/radiação resolve questão de garrafa térmica, estufa e efeito estufa.',
    ],
    chave: [
      'Curva de aquecimento da água (sensível + latente)',
      'Equilíbrio térmico e misturas',
      'Dilatação linear e aplicações em engenharia',
      'Propagação de calor e efeito estufa',
    ],
    formulas: [
      { titulo: 'Calor sensível', expr: 'Q = m · c · ΔT' },
      { titulo: 'Calor latente', expr: 'Q = m · L' },
      { titulo: 'Equilíbrio', expr: 'ΣQ = 0' },
      { titulo: 'Dilatação linear', expr: 'ΔL = L₀ · α · ΔT' },
    ],
    questoes: [],
  },

  'fis-ondulatoria': {
    resumo: [
      'Ondulatória: v = λ·f é a equação que resolve quase tudo. A frequência é dada pela fonte e não muda ao trocar de meio; o que muda é a velocidade e, por consequência, o comprimento de onda.',
      'Fenômenos: reflexão (eco, espelho), refração (mudança de velocidade ao trocar de meio, com desvio), difração (contornar obstáculos, som dando a volta na esquina), interferência (soma de ondas, cancelamento em fones com cancelamento de ruído) e ressonância (amplitude máxima numa frequência).',
      'Som é onda mecânica longitudinal e precisa de meio; luz é eletromagnética e não precisa. O espectro eletromagnético (rádio, micro-ondas, infravermelho, visível, UV, raios X) é cobrado em questão de aplicação tecnológica.',
    ],
    chave: [
      'Equação fundamental v = λf e mudança de meio',
      'Interferência construtiva/destrutiva e cancelamento de ruído',
      'Efeito Doppler (ambulância, radar, velocidade de galáxias)',
      'Espectro eletromagnético e aplicações (radar, forno, raio X)',
    ],
    formulas: [
      { titulo: 'Equação da onda', expr: 'v = λ · f' },
      { titulo: 'Período', expr: 'f = 1 / T' },
      { titulo: 'Som (velocidade)', expr: 'v ≈ 340 m/s no ar a 20 °C' },
    ],
    questoes: [],
  },

  'fis-optica': {
    resumo: [
      'Óptica no Enem é óptica geométrica aplicada: espelhos, lentes, olho humano e instrumentos. A lei da reflexão (ângulo de incidência = de reflexão) resolve espelho plano; equação de Gauss (1/f = 1/p + 1/p′) resolve imagem em espelho esférico e lente.',
      'Espelho côncavo converge e forma imagem real e invertida quando o objeto está além do foco; convexo diverge e forma imagem virtual, direita e menor, é o espelho de segurança e do retrovisor. Lente convergente funciona como a do olho; divergente, como a usada para miopia.',
      'Miopia corrige-se com lente divergente (a imagem se formava antes da retina); hipermetropia, com convergente. E os defeitos da visão são presença constante em questão sobre saúde ocular e uso de telas.',
    ],
    chave: [
      'Espelho plano: imagem virtual, mesmo tamanho, distância simétrica',
      'Espelho côncavo/convexo e aplicação (farol, segurança)',
      'Miopia × hipermetropia e o tipo de lente',
      'Refração, dispersão da luz e arco-íris',
    ],
    formulas: [
      { titulo: 'Gauss', expr: '1/f = 1/p + 1/p′' },
      { titulo: 'Aumento', expr: 'A = −p′/p = i/o' },
      { titulo: 'Snell-Descartes', expr: 'n₁ sen θ₁ = n₂ sen θ₂' },
    ],
    questoes: [],
  },

  'qui-ligacoes': {
    resumo: [
      'Ligações químicas explicam propriedades: iônica (metal + ametal) forma sólido cristalino de ponto de fusão alto, conduz corrente quando dissolvido ou fundido; covalente (ametal + ametal) forma molécula; metálica explica condutividade e maleabilidade.',
      'Geometria molecular e polaridade decidem solubilidade: "semelhante dissolve semelhante". Água é polar e dissolve iônicos e polares; gasolina é apolar e dissolve apolares. É a explicação de por que óleo e água não se misturam e de por que detergente funciona (anfifílico).',
      'Forças intermoleculares (dipolo-dipolo, ligações de hidrogênio e forças de London) definem ponto de ebulição. A ligação de hidrogênio é a mais forte e é por isso que a água ferve a 100 °C enquanto moléculas parecidas fervem muito abaixo.',
    ],
    chave: [
      'Iônica × covalente × metálica e as propriedades de cada uma',
      'Polaridade e solubilidade (semelhante dissolve semelhante)',
      'Forças intermoleculares e ponto de ebulição',
      'Ligações de hidrogênio em água, DNA e proteínas',
    ],
    formulas: [
      { titulo: 'Ordem de força', expr: 'ligação de H > dipolo-dipolo > London' },
    ],
    questoes: [],
  },

  'qui-estequiometria': {
    resumo: [
      'Estequiometria é a conta proporcional da química: balancear a equação, transformar massa em mol (n = m/M), usar a proporção dos coeficientes e voltar para a unidade pedida. O mol é a ponte entre o mundo da balança e o mundo das moléculas.',
      'Reagente limitante é o que acaba primeiro e define o rendimento máximo. Calcule quantos mols de cada reagente você tem, divida pelo coeficiente e compare: o menor quociente é o limitante. O excesso sobra e não reage.',
      'Rendimento e pureza vêm em sequência: o rendimento é a massa obtida sobre a teórica; a pureza é a massa útil sobre a massa da amostra. Questão do Enem costuma encadear os dois, e é aí que a conta dobra.',
    ],
    chave: [
      'Balanceamento e proporção em mol',
      'Reagente limitante e excesso',
      'Rendimento e pureza em processo industrial',
      'CNTP e volume molar (22,4 L/mol)',
    ],
    formulas: [
      { titulo: 'Mol', expr: 'n = m / M   ·   n = N / 6,02×10²³' },
      { titulo: 'Gases (CNTP)', expr: 'V = n · 22,4 L' },
      { titulo: 'Rendimento', expr: 'η = massa real / massa teórica' },
      { titulo: 'Concentração', expr: 'C = n / V   ou   C = m / V' },
    ],
    questoes: [],
  },

  'qui-solucoes': {
    resumo: [
      'Soluções são misturas homogêneas de soluto em solvente, e o Enem cobra quase sempre a relação entre quantidade de soluto, volume e efeito prático: concentração de poluente, diluição de soro, acidez de chuva, teor de álcool na gasolina. Antes de calcular, identifique quem é soluto e quem é solvente, porque é isso que decide em qual unidade a resposta deve sair.',
      'Concentração comum mede massa de soluto por volume de solução (g/L). Concentração em mol/L, a molaridade, mede quantidade de matéria por volume (mol/L) e é a preferida em cálculo estequiométrico. Título e porcentagem em massa relacionam massas, sem volume. Densidade relaciona massa e volume da solução inteira, não do soluto. Confundir título com densidade é o erro mais comum em questão de leitura de rótulo.',
      'Diluição conserva a quantidade de soluto: acrescentar solvente aumenta o volume e diminui a concentração, e a igualdade C₁·V₁ = C₂·V₂ resolve a maior parte dos casos. Mistura de soluções do mesmo soluto soma as quantidades de matéria; se houver reação, a estequiometria decide quem está em excesso. Misturar ácido e base é neutralização, e o pH final depende de sobrar H⁺, OH⁻ ou nenhum dos dois.',
      'Ácidos e bases aparecem pelo comportamento, não pela fórmula decorada. Segundo Brønsted-Lowry, ácido doa próton e base recebe. Ácido forte ioniza quase por completo em água (HCl, H₂SO₄, HNO₃); base forte também (NaOH, KOH, Ca(OH)₂). Escala de pH é logarítmica: cada unidade é fator 10 na concentração de H⁺, então pH 4 é dez vezes mais ácido que pH 5 e cem vezes mais que pH 6.',
      'As reações que o Enem usa como exemplo têm assinatura própria. Carbonato mais ácido libera CO₂ e faz efervescência: é o mármore com HCl, é o comprimido antiácido, é a casca de ovo no vinagre. Metal mais ácido libera H₂. Ácido mais base dá sal e água. Óxido ácido com água forma ácido, e óxido básico com água forma base, o que explica por que SO₂ e NO₂, liberados na queima de combustível, estão por trás da chuva ácida.',
      'Indicadores e medidas também entram. Fenolftaleína fica rosa em meio básico e incolor em meio ácido; papel de tornassol azul fica vermelho em ácido, e o vermelho fica azul em base. Em titulação, o ponto de virada é o indicador mudando de cor, e o volume gasto na bureta, com a concentração do titulante, dá a quantidade de substância problema. Peagâmetro mede pH direto e é o que aparece em questão de solo agrícola.',
      'Em questão ambiental, cuidado com a escala. Chuva natural já é levemente ácida (pH em torno de 5,6) por causa do CO₂ dissolvido; chuva ácida é a que fica abaixo disso por SO₂ e NOₓ. Oceanos absorvem CO₂ e ficam mais ácidos, o que dissolve carbonato de cálcio de conchas e recifes. É sempre o mesmo raciocínio: um gás na atmosfera, uma reação na água, um efeito sobre quem vive ali.',
    ],
    chave: [
      'Diluição (C₁V₁ = C₂V₂) e mistura de soluções',
      'ppm e concentração em questão de poluição da água',
      'Molaridade × concentração comum e conversão',
      'Propriedades coligativas em contexto real',
    ],
    formulas: [
      { titulo: 'Molaridade', expr: 'M = n / V(L)' },
      { titulo: 'Diluição', expr: 'C₁ · V₁ = C₂ · V₂' },
      { titulo: 'Título', expr: 'τ = m_soluto / m_solução   ·   ppm = mg/L' },
    ],
    questoes: [
      {
        ano: 2022,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 112',
        textoApoio: [
          'Um grupo de alunos realizou um experimento para observar algumas propriedades dos ácidos, adicionando um pedaço de mármore (CaCO3) a uma solução aquosa de ácido clorídrico (HCl), observando a liberação de um gás e o aumento da temperatura.',
        ],
        enunciado: 'O gás obtido no experimento é o',
        alternativas: ['H2', 'O2', 'CO2', 'CO', 'Cl2'],
        correta: 'C',
        resolucao: [
          'Mármore é carbonato de cálcio. Ácido sobre carbonato libera gás carbônico numa reação clássica de efervescência: CaCO3 + 2 HCl → CaCl2 + H2O + CO2.',
          'O gás que borbulha é o CO2. O calor que os alunos sentem é a energia liberada pela reação, que é exotérmica.',
          'Por que as outras não são: H2 sairia de ácido com metal, não com carbonato. O2 e Cl2 não se formam nessas condições. O CO só aparece em combustão incompleta, não aqui.',
          'Resposta: C. Guarde a regra prática: carbonato + ácido dá efervescência de CO2, que turva a água de cal.',
        ],
      },
    ],
  },

  'qui-termoquimica': {
    resumo: [
      'Termoquímica estuda energia nas reações. Entalpia (ΔH) negativa é exotérmica (libera calor, como combustão); positiva é endotérmica (absorve, como fotossíntese). A variação é sempre produtos menos reagentes.',
      'A lei de Hess permite somar reações intermediárias para obter o ΔH de uma reação que não se mede diretamente, invertendo a equação, o sinal do ΔH inverte; multiplicando, o ΔH multiplica.',
      'O Enem usa termoquímica para discutir matriz energética: poder calorífico do etanol × gasolina, eficiência de combustíveis e o balanço de CO₂. Entender que combustão sempre libera energia e que a quantidade depende do combustível é o que a questão pede.',
    ],
    chave: [
      'Exotérmica × endotérmica e o sinal de ΔH',
      'Lei de Hess com reações intermediárias',
      'Poder calorífico e comparação de combustíveis',
      'Energia de ligação e entalpia de formação',
    ],
    formulas: [
      { titulo: 'Entalpia', expr: 'ΔH = H_produtos − H_reagentes' },
      { titulo: 'Calor', expr: 'Q = m · c · ΔT' },
      { titulo: 'Hess', expr: 'ΔH_total = Σ ΔH_etapas' },
    ],
    questoes: [],
  },

  'qui-eletroquimica': {
    resumo: [
      'Eletroquímica divide-se em pilha (reação espontânea gera corrente) e eletrólise (corrente força reação não espontânea). Na pilha, o ânodo oxida (perde elétrons) e é o polo negativo; o cátodo reduz e é o positivo, o contrário do que acontece na eletrólise.',
      'A ddp da pilha é E_maior − E_menor, usando a tabela de potenciais padrão de redução. Quanto maior o potencial, mais o metal "quer" reduzir; por isso o zinco cede elétrons ao cobre na pilha de Daniell.',
      'No cotidiano: bateria de celular, galvanização (cromagem, zinco em portão), corrosão de metais e a ferrugem acelerada por sal e umidade. Eletrólise também explica produção de alumínio e cloro, com consumo alto de energia.',
    ],
    chave: [
      'Pilha: ânodo/cátodo, oxidação/redução e sinal dos polos',
      'Cálculo de ddp com potenciais padrão',
      'Eletrólise × pilha (espontaneidade)',
      'Corrosão e proteção de metais (galvanização, metal de sacrifício)',
    ],
    formulas: [
      { titulo: 'ddp', expr: 'ΔE = E_cátodo − E_ânodo' },
      { titulo: 'Pilha de Daniell', expr: 'Zn | Zn²⁺ ‖ Cu²⁺ | Cu, ΔE ≈ +1,10 V' },
    ],
    questoes: [],
  },

  'qui-organica': {
    resumo: [
      'Química orgânica no Enem é identificação de função e leitura de estrutura, não síntese. Funções: hidrocarboneto, álcool (OH), éter, aldeído (CHO na ponta), cetona (C=O no meio), ácido carboxílico (COOH), éster, amina, amida.',
      'O contexto é combustível, plástico, medicamento, agrotóxico e alimento: etanol (álcool), biodiesel (éster), polímeros (PE, PET, PVC) e os grupos funcionais de remédios. Reconhecer a função é o que permite responder sobre solubilidade e reatividade.',
      'Isomeria aparece como "mesma fórmula molecular, estruturas diferentes": cadeia, posição e função. E o Enem gosta de polímeros: monômero, polimerização e o problema ambiental do plástico, reciclagem, biodegradabilidade e microplástico.',
    ],
    chave: [
      'Reconhecer funções orgânicas em estrutura',
      'Combustíveis: etanol, gasolina, biodiesel',
      'Polímeros: monômero, polimerização e descarte',
      'Isomeria de cadeia, posição e função',
    ],
    formulas: [
      { titulo: 'Alcano', expr: 'CₙH₂ₙ₊₂' },
      { titulo: 'Álcool', expr: 'R–OH   ·   Ácido carboxílico: R–COOH' },
      { titulo: 'Éster', expr: 'R–COO–R′ (biodiesel e gorduras)' },
    ],
    questoes: [],
  },

  'qui-ambiental': {
    resumo: [
      'Química ambiental no Enem conecta reação a problema: chuva ácida (SO₂ e NOₓ formam ácido sulfúrico e nítrico), efeito estufa (CO₂, CH₄), destruição da camada de ozônio (CFCs) e eutrofização (excesso de nitrato e fosfato na água).',
      'Tratamento de água e de esgoto aparece com frequência: coagulação com sulfato de alumínio, decantação, filtração, cloração e fluoretação, cada etapa com uma função diferente. Saber a ordem e o objetivo de cada uma resolve a questão.',
      'A química verde e o ciclo do carbono completam: combustível fóssil devolve carbono que estava guardado; biocombustível devolve carbono recente. Entender essa diferença temporal é o que separa a resposta certa da resposta "mais ou menos".',
    ],
    chave: [
      'Chuva ácida: gases, reações e consequências',
      'Tratamento de água e de esgoto: etapas e função',
      'Ciclo do carbono e matriz energética',
      'Poluição por plástico, metais pesados e agrotóxicos',
    ],
    formulas: [],
    questoes: [],
  },
};
