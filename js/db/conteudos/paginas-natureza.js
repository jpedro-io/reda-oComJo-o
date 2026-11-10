/**
 * Conteúdo das páginas de Ciências da Natureza.
 */
export const PAGINAS_NATUREZA = {
  'bio-ecologia': {
    resumo: [
      'Ecologia é o assunto mais cobrado de Biologia no Enem, e quase sempre em contexto de impacto ambiental. Cadeia alimentar organiza a transferência de energia: produtores (fotossintetizantes) → consumidores → decompositores. Cada nível perde cerca de 90% da energia, e é por isso que cadeias longas sustentam menos biomassa.',
      'Os ciclos biogeoquímicos conectam tudo: no ciclo do carbono, fotossíntese retira CO₂ e respiração, decomposição e queima de combustível fóssil devolvem. No ciclo do nitrogênio, bactérias fixadoras são as únicas que transformam N₂ atmosférico em forma assimilável.',
      'Relações ecológicas podem ser harmônicas (mutualismo, comensalismo, inquilinismo) ou desarmônicas (competição, predatismo, parasitismo). Em questão de impacto, identifique o nível afetado: desmatamento atinge produtores, o que desce pela cadeia e pode provocar biomagnificação de poluentes nos predadores de topo.',
    ],
    chave: [
      'Fluxo de energia × ciclo de matéria (energia não se recicla)',
      'Eutrofização, biomagnificação e chuva ácida',
      'Sucessão ecológica e espécies pioneiras',
      'Relações ecológicas com exemplos brasileiros',
    ],
    formulas: [],
    questoes: [],
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
      'Lamarck × Darwin é cobrado pela diferença de mecanismo: para Lamarck o uso e desuso gera a característica e ela é transmitida; para Darwin a variação é anterior e a seleção escolhe. Resistência a antibióticos é o exemplo mais usado — e o mais mal interpretado: o antibiótico não cria a bactéria resistente, ele seleciona a que já era.',
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
      'Os cinco reinos: Monera (bactérias e cianobactérias), Protista (protozoários e algas), Fungi, Plantae e Animalia. Vírus ficam fora dos reinos, porque não têm célula — e é justamente isso que a questão cobra.',
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
      'Em circuito em série, a corrente é a mesma e as tensões se somam; em paralelo, a tensão é a mesma e as correntes se somam. A resistência equivalente cai quando se acrescenta resistor em paralelo — é o que explica por que a casa toda apaga quando liga o chuveiro.',
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
      'Mecânica é cinemática mais leis de Newton, e o Enem cobra em contexto de trânsito: velocidade média, distância de frenagem, tempo de reação. A distinção entre velocidade média (Δs/Δt) e instantânea resolve várias questões que parecem de cinemática complicada.',
      'No movimento uniformemente variado, use v = v₀ + at, s = s₀ + v₀t + at²/2 e Torricelli (v² = v₀² + 2aΔs) — a última dispensa o tempo e por isso é a mais útil em frenagem. Queda livre é o caso particular com a = g ≈ 10 m/s².',
      'Leis de Newton: sem força resultante, o corpo mantém o movimento (1ª); F = ma (2ª); toda ação tem reação de mesmo módulo e sentido oposto, em corpos diferentes (3ª). Em questão de elevador, a sensação de peso é a normal, não o peso — e é isso que a prova cobra.',
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
    questoes: [],
  },

  'fis-energia': {
    resumo: [
      'Trabalho é força vezes deslocamento na direção da força (τ = F·d·cosθ) e potência é trabalho sobre tempo (P = τ/Δt). O Enem usa muito potência em contexto de máquina, elevador e usina, e a unidade que aparece é o watt e o kW.',
      'Energia mecânica é cinética (mv²/2) mais potencial (mgh gravitacional, kx²/2 elástica). Sem atrito, a energia se conserva: o que se perde de altura vira velocidade na descida. Com atrito, parte vira calor e a diferença é o trabalho da força de atrito.',
      'Rendimento é energia útil sobre energia total, sempre menor que 1. Questão de "quanto se perde" é (1 − η) da energia de entrada — e é assim que a prova conecta física a consumo e a impacto ambiental.',
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
      'Equilíbrio térmico: em sistema isolado, o calor cedido é igual ao recebido (ΣQ = 0). É o cálculo de "mistura água quente com água fria" e de calorímetro. Capacidade térmica (C = mc) indica quanto calor o corpo precisa para variar 1 °C — a água tem valor alto, e é isso que estabiliza o clima.',
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
      'Espelho côncavo converge e forma imagem real e invertida quando o objeto está além do foco; convexo diverge e forma imagem virtual, direita e menor — é o espelho de segurança e do retrovisor. Lente convergente funciona como a do olho; divergente, como a usada para miopia.',
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
      'Forças intermoleculares — dipolo-dipolo, ligações de hidrogênio e forças de London — definem ponto de ebulição. A ligação de hidrogênio é a mais forte e é por isso que a água ferve a 100 °C enquanto moléculas parecidas fervem muito abaixo.',
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
      'Rendimento e pureza vêm em sequência: o rendimento é a massa obtida sobre a teórica; a pureza é a massa útil sobre a massa da amostra. Questão do Enem costuma encadear os dois — e é aí que a conta dobra.',
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
      'Soluções: concentração comum (g/L), molaridade (mol/L), título e porcentagem em massa, e ppm. O Enem cobra sobretudo conversão entre elas e diluição — misturar com solvente não muda a quantidade de soluto, só o volume.',
      'Diluição segue C₁V₁ = C₂V₂. Mistura de soluções do mesmo soluto soma os "mols" e soma os volumes. É o cálculo de soro, de suco em pó e de água sanitária.',
      'Propriedades coligativas — efeito do soluto sobre ponto de ebulição, congelamento e pressão de vapor — aparecem em contexto de sal na estrada no inverno, aditivo no radiador e pressão osmótica em célula. Quanto mais partículas dissolvidas, maior o efeito.',
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
    questoes: [],
  },

  'qui-termoquimica': {
    resumo: [
      'Termoquímica estuda energia nas reações. Entalpia (ΔH) negativa é exotérmica (libera calor, como combustão); positiva é endotérmica (absorve, como fotossíntese). A variação é sempre produtos menos reagentes.',
      'A lei de Hess permite somar reações intermediárias para obter o ΔH de uma reação que não se mede diretamente — invertendo a equação, o sinal do ΔH inverte; multiplicando, o ΔH multiplica.',
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
      'Eletroquímica divide-se em pilha (reação espontânea gera corrente) e eletrólise (corrente força reação não espontânea). Na pilha, o ânodo oxida (perde elétrons) e é o polo negativo; o cátodo reduz e é o positivo — o contrário do que acontece na eletrólise.',
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
      'Isomeria aparece como "mesma fórmula molecular, estruturas diferentes": cadeia, posição e função. E o Enem gosta de polímeros: monômero, polimerização e o problema ambiental do plástico — reciclagem, biodegradabilidade e microplástico.',
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
