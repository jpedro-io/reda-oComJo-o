/**
 * Conteúdo das páginas de Matemática.
 *
 * Cada entrada: resumo (parágrafos), chave (o que mais cai), formulas e
 * questoes. `questoes` vazio é estado legítimo — a página avisa que as
 * resoluções estão em preparação, em vez de inventar questão.
 */
export const PAGINAS_MATEMATICA = {
  'mat-porcentagem': {
    resumo: [
      'Porcentagem é fração com denominador 100: 23% é 23/100, ou 0,23. Todo problema de porcentagem do Enem se resolve traduzindo a frase para uma multiplicação, "de" vira ×, "aumentou 15%" vira × 1,15, "caiu 15%" vira × 0,85.',
      'O erro clássico é somar porcentagens que se aplicam a bases diferentes. Aumentar 20% e depois descontar 20% não volta ao valor inicial: 100 → 120 → 96. O encadeamento é multiplicativo, nunca aditivo. Se a questão fala em dois aumentos seguidos, multiplique os fatores (1,2 × 1,3 = 1,56, ou seja, +56%).',
      'Variação percentual é sempre (valor final − valor inicial) / valor inicial. Repare que o denominador é o valor de partida: cair de 80 para 60 é uma queda de 25%, e voltar de 60 para 80 é um aumento de 33,3%. Mesma distância absoluta, porcentagens diferentes.',
    ],
    chave: [
      'Desconto sobre desconto e aumento sobre desconto (fatores multiplicativos)',
      'Porcentagem de porcentagem e pontos percentuais (a diferença entre 5% e 7% é 2 pontos, não 2%)',
      'Lucro e prejuízo sobre o preço de custo, não sobre o de venda',
      'Gráficos de barras e pizza com valores em % e em números absolutos na mesma questão',
    ],
    formulas: [
      { titulo: 'Fator de variação', expr: 'V = V₀ · (1 ± i), com i em decimal' },
      { titulo: 'Variações encadeadas', expr: 'V = V₀ · (1 + i₁)(1 + i₂)…' },
      { titulo: 'Variação percentual', expr: 'Δ% = (V − V₀) / V₀ × 100' },
    ],
    questoes: [
      {
        ano: 2022,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 140',
        textoApoio: [
          'Em uma loja, o preço promocional de uma geladeira é de R$ 1 000,00 para pagamento somente em dinheiro. Seu preço normal, fora da promoção, é 10% maior. Para pagamento feito com cartão de crédito da loja, é dado um desconto de 2% sobre o preço normal.',
          'Uma cliente decidiu comprar essa geladeira, optando pelo pagamento com o cartão de crédito da loja. Ela calculou que o valor a ser pago seria o preço promocional acrescido de 8%. Ao ser informada pela loja do valor a pagar, segundo sua opção, percebeu uma diferença entre seu cálculo e o valor que lhe foi apresentado.',
        ],
        enunciado: 'O valor apresentado pela loja, comparado ao valor calculado pela cliente, foi',
        alternativas: ['R$ 2,00 menor.', 'R$ 100,00 menor.', 'R$ 200,00 menor.', 'R$ 42,00 maior.', 'R$ 80,00 maior.'],
        correta: 'A',
        gabaritoOficial: 'A',
        resolucao: [
          'Preço normal: 1 000 × 1,10 = R$ 1 100,00.',
          'Preço no cartão: 1 100 × 0,98 = R$ 1 078,00, é o valor que a loja apresenta.',
          'Cálculo da cliente: 1 000 × 1,08 = R$ 1 080,00.',
          'Diferença: 1 078 − 1 080 = −R$ 2,00. O valor da loja é R$ 2,00 menor que o cálculo dela. Alternativa A.',
          'O erro que a questão arma: a cliente somou um acréscimo de 8% sobre a promoção, mas o desconto de 2% incide sobre o preço NORMAL, base diferente, resultado diferente. É o mesmo raciocínio do "aumento e desconto não se anulam".',
        ],
      },
      {
        ano: 2022,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 149',
        textoApoio: [
          'Em janeiro de 2013, foram declaradas 1 794 272 admissões e 1 765 372 desligamentos no Brasil, ou seja, foram criadas 28 900 vagas de emprego, segundo dados do Cadastro Geral de Empregados e Desempregados (Caged), divulgados pelo Ministério do Trabalho e Emprego (MTE). Segundo o Caged, o número de vagas criadas em janeiro de 2013 sofreu uma queda de 75%, quando comparado com o mesmo período de 2012.',
        ],
        enunciado: 'De acordo com as informações dadas, o número de vagas criadas em janeiro de 2012 foi',
        alternativas: ['16 514.', '86 700.', '115 600.', '441 343.', '448 568.'],
        correta: 'C',
        gabaritoOficial: 'C',
        resolucao: [
          'Queda de 75% significa que o valor de 2013 corresponde a 25% do valor de 2012.',
          '28 900 = 0,25 × V ⟹ V = 28 900 / 0,25 = 115 600.',
          'Alternativa C. As alternativas A e B vêm de aplicar a porcentagem ao contrário (28 900 × 0,75 e 28 900 × 3).',
          'Sempre que a questão fala em queda ou aumento percentual, escreva o fator multiplicativo antes de calcular: assim o denominador nunca é o valor errado.',
        ],
      },
    ],
  },

  'mat-razao-proporcao': {
    resumo: [
      'Razão compara duas grandezas da mesma espécie por divisão; proporção é a igualdade entre duas razões. A regra de ouro: só se compara o que está na mesma unidade, antes de montar a proporção, converta tudo.',
      'Grandezas diretamente proporcionais crescem juntas (mais litros, mais quilômetros rodados); inversamente proporcionais uma sobe quando a outra desce (mais operários, menos dias). Reconhecer qual é o caso é o que decide a montagem da conta.',
      'Escala, densidade demográfica, velocidade média e consumo por quilômetro são todos proporção. O Enem raramente cobra a definição: cobra a leitura de uma situação em que a razão aparece escondida dentro de um texto.',
    ],
    chave: [
      'Regra de três com grandezas inversas (inverter uma das colunas antes de multiplicar)',
      'Escala de mapa e de maquete (1:x nas duas dimensões; área varia com o quadrado)',
      'Velocidade média como razão entre distância e tempo, com troca de unidades',
      'Divisão proporcional: repartir um valor em partes proporcionais a números dados',
    ],
    formulas: [
      { titulo: 'Proporção', expr: 'a/b = c/d ⟺ a·d = b·c' },
      { titulo: 'Escala', expr: 'E = medida no desenho / medida real' },
      { titulo: 'Velocidade média', expr: 'v = Δs / Δt' },
    ],
    questoes: [],
  },

  'mat-regra-tres': {
    resumo: [
      'Regra de três é a ferramenta de três valores conhecidos e um desconhecido. Monte sempre com as grandezas na mesma ordem nas duas linhas e pergunte: se uma aumenta, a outra aumenta (direta) ou diminui (inversa)?',
      'Na regra de três composta, com três ou mais grandezas, o caminho seguro é comparar cada grandeza com aquela que tem a incógnita, uma de cada vez, e multiplicar os fatores. Tentar "decorar a ordem das setas" é o que faz a conta errar.',
      'A maior parte das questões do Enem com regra de três vem embalada em contexto: rendimento de máquinas, ração de animais, tinta por parede, funcionários por prazo. Extraia as grandezas em tabela antes de calcular.',
    ],
    chave: [
      'Composta com uma grandeza inversa (trabalhadores × dias)',
      'Rendimento e vazão (litros por minuto, peças por hora)',
      'Conversão de unidades antes de montar a proporção',
      'Problemas com "mantendo o mesmo ritmo" e "nas mesmas condições"',
    ],
    formulas: [
      { titulo: 'Simples direta', expr: 'a/b = c/x ⟹ x = b·c/a' },
      { titulo: 'Simples inversa', expr: 'a·b = c·x ⟹ x = a·b/c' },
      { titulo: 'Composta', expr: 'x = k · (produto das diretas) / (produto das inversas)' },
    ],
    questoes: [],
  },

  'mat-escalas': {
    resumo: [
      'Escala é razão entre desenho e realidade. Em 1:50 000, cada centímetro do mapa equivale a 50 000 cm reais, 500 metros. O cuidado com unidade é aqui que decide a questão: quase sempre a resposta é pedida em km.',
      'A armadilha do Enem é a área. Se o comprimento foi multiplicado por k, a área foi multiplicada por k². Um terreno que no mapa tem o dobro do lado de outro tem quatro vezes a área.',
      'Semelhança de figuras segue a mesma lógica: lados proporcionais, ângulos iguais, áreas na razão do quadrado e volumes na razão do cubo.',
    ],
    chave: [
      'Converter escala para km e comparar distâncias',
      'Razão entre áreas de figuras semelhantes (k²)',
      'Maquete e planta baixa com medidas em metros e centímetros',
      'Volume de sólidos semelhantes (k³)',
    ],
    formulas: [
      { titulo: 'Escala', expr: 'd/D = 1/n ⟹ D = d · n' },
      { titulo: 'Áreas semelhantes', expr: 'A₁/A₂ = k²' },
      { titulo: 'Volumes semelhantes', expr: 'V₁/V₂ = k³' },
    ],
    questoes: [],
  },

  'mat-financeira': {
    resumo: [
      'No Enem, matemática financeira é porcentagem aplicada: juros simples e compostos, descontos, parcelamento e comparação de ofertas. A diferença entre simples e composto está na base de cálculo, no simples, sempre o capital inicial; no composto, o montante do período anterior.',
      'Juros compostos são uma função exponencial: M = C(1 + i)^t. Todo crescimento (ou queda) com taxa constante por período é exponencial, e é por isso que a curva do gráfico "acelera".',
      'Comparar ofertas exige trazer tudo para a mesma data: à vista com desconto, parcelado sem juros e parcelado com juros não se comparam somando parcelas, é preciso trazer cada parcela para valor presente, ou comparar o total pago com o preço à vista.',
    ],
    chave: [
      'Juros simples × compostos no mesmo período (a diferença aparece no gráfico)',
      'Desconto sobre o preço à vista versus parcelamento',
      'Taxa mensal com prazo em anos, converter o tempo, não a taxa',
      'Inflação e perda do poder de compra',
    ],
    formulas: [
      { titulo: 'Juros simples', expr: 'J = C · i · t   e   M = C(1 + i·t)' },
      { titulo: 'Juros compostos', expr: 'M = C(1 + i)^t' },
      { titulo: 'Desconto', expr: 'V = V₀(1 − i)' },
    ],
    questoes: [],
  },

  'mat-graficos': {
    resumo: [
      'A questão de gráfico no Enem testa leitura, não cálculo. Antes de olhar números, identifique os eixos, a unidade, o título e a legenda. Errar a unidade do eixo é a causa mais comum de resposta errada em questão que o aluno "sabia fazer".',
      'Gráficos de linha mostram evolução no tempo, barras comparam categorias, pizza mostra composição de um todo. Quando a questão pede "qual gráfico representa", o critério é o comportamento (crescente, com máximo, com patamar) e não o valor exato.',
      'Desconfie de gráfico com eixo truncado: começar o eixo vertical em valor diferente de zero exagera visualmente diferenças pequenas. Boa parte das questões de análise crítica cobra exatamente isso.',
    ],
    chave: [
      'Comparar dois gráficos com escalas diferentes',
      'Gráfico de linhas com máximo/mínimo e intervalo de crescimento',
      'Tabela com categorias e porcentagens que não somam 100% (outros/ignorados)',
      'Detectar distorção visual por eixo truncado',
    ],
    formulas: [],
    questoes: [],
  },

  'mat-medidas': {
    resumo: [
      'Média aritmética soma e divide pelo número de valores; média ponderada multiplica cada valor pelo seu peso antes de dividir pela soma dos pesos. No Enem, a ponderada aparece como média de notas com pesos diferentes ou média de velocidades por trecho.',
      'Mediana é o valor central da lista ordenada. Com número par de dados, é a média dos dois centrais. É a medida que resiste a valores extremos, por isso salário mediano aparece em questão de desigualdade.',
      'Moda é o valor mais frequente, e pode não existir (todos diferentes) ou haver mais de uma. Em questão de "qual medida usar", o critério é a presença de valor atípico: com um outlier, a mediana representa melhor o conjunto.',
    ],
    chave: [
      'Média ponderada com pesos em porcentagem',
      'Efeito de um valor extremo sobre média e mediana',
      'Descobrir o valor que falta a partir da média (soma total = média × n)',
      'Comparar média, mediana e moda de um mesmo conjunto de dados',
    ],
    formulas: [
      { titulo: 'Média simples', expr: 'x̄ = (x₁ + x₂ + … + xₙ) / n' },
      { titulo: 'Média ponderada', expr: 'x̄ = Σ(xᵢ · pᵢ) / Σpᵢ' },
      { titulo: 'Posição da mediana', expr: 'n ímpar: (n+1)/2 · n par: média de n/2 e n/2+1' },
    ],
    questoes: [
      {
        ano: 2022,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 136',
        textoApoio: [
          'Em uma universidade, atuam professores que estão enquadrados funcionalmente pela sua maior titulação: mestre ou doutor. Nela há, atualmente, 60 mestres e 40 doutores. Os salários mensais dos professores mestres e dos doutores são, respectivamente, R$ 8 000,00 e R$ 12 000,00.',
          'A diretoria da instituição pretende proporcionar um aumento salarial diferenciado para o ano seguinte, de tal forma que o salário médio mensal dos professores dessa instituição não ultrapasse R$ 12 240,00. A universidade já estabeleceu que o aumento salarial será de 25% para os mestres e precisa ainda definir o percentual de reajuste para os doutores.',
        ],
        enunciado: 'Mantido o número atual de professores com suas atuais titulações, o aumento salarial, em porcentagem, a ser concedido aos doutores deverá ser de, no máximo,',
        alternativas: ['14,4.', '20,7.', '22,0.', '30,0.', '37,5.'],
        correta: 'D',
        gabaritoOficial: 'D',
        resolucao: [
          'Novo salário dos mestres: 8 000 × 1,25 = R$ 10 000,00.',
          'Chame de k o fator de reajuste dos doutores. O novo salário deles é 12 000k.',
          'A média é ponderada pelo número de professores: (60 × 10 000 + 40 × 12 000k) / 100 ≤ 12 240.',
          '600 000 + 480 000k ≤ 1 224 000 ⟹ 480 000k ≤ 624 000 ⟹ k ≤ 1,30.',
          'k = 1,30 é um aumento de 30%. Alternativa D.',
          'Note que a média NÃO é (10 000 + 12 000k)/2: os grupos têm tamanhos diferentes. Ignorar o peso leva a 22%, que está na alternativa C, o distrator perfeito.',
        ],
      },
    ],
  },

  'mat-geo-plana': {
    resumo: [
      'Geometria plana no Enem é, quase sempre, área de figura composta: um retângulo com um semicírculo, um quadrado com um triângulo recortado. O método é decompor em figuras conhecidas, calcular cada parte e somar ou subtrair.',
      'Triângulo é metade da base pela altura, e a altura nem sempre é um lado. Em triângulo equilátero de lado a, a altura vale a√3/2. Em triângulo retângulo, Pitágoras relaciona os três lados; e as relações métricas (h² = m·n) resolvem a altura relativa à hipotenusa.',
      'Semelhança e Teorema de Tales aparecem juntos: feixes de retas paralelas cortadas por transversais e figuras que são a mesma em escalas diferentes. A proporção se escreve entre lados correspondentes, os que estão "na mesma posição".',
    ],
    chave: [
      'Área de figura composta e área sombreada por subtração',
      'Pitágoras em situação concreta (rampa, escada, diagonal de tela)',
      'Semelhança de triângulos e Teorema de Tales',
      'Comprimento de circunferência e área do círculo com ângulo central',
    ],
    formulas: [
      { titulo: 'Triângulo', expr: 'A = b·h/2' },
      { titulo: 'Círculo', expr: 'A = πr²   ·   C = 2πr' },
      { titulo: 'Trapézio', expr: 'A = (B + b)·h/2' },
      { titulo: 'Pitágoras', expr: 'a² = b² + c²' },
      { titulo: 'Setor circular', expr: 'A = (θ/360) · πr²' },
    ],
    questoes: [],
  },

  'mat-geo-espacial': {
    resumo: [
      'O Enem cobra volume de três sólidos quase sempre: prisma (e cilindro, que é prisma de base circular), pirâmide (e cone) e esfera. Volume de prisma é área da base vezes altura; de pirâmide e cone é um terço disso; de esfera é 4πr³/3.',
      'Área total é a soma das faces e é onde o aluno perde ponto: no cilindro são duas bases mais a lateral (2πrh); no cone, a geratriz entra na lateral (πrg). Em questão de "quantos metros de lona", o que se pede é área, não volume.',
      'Relação de Euler (V − A + F = 2) resolve questão de poliedro; e a razão entre volumes de sólidos semelhantes é o cubo da razão entre lados, dobrar o raio dobra a área e multiplica o volume por oito.',
    ],
    chave: [
      'Volume de cilindro e de cone em situação de embalagem e reservatório',
      'Área lateral × área total (o que a questão realmente pede)',
      'Comparar volumes de sólidos semelhantes (k³)',
      'Vazão e tempo de enchimento usando volume',
    ],
    formulas: [
      { titulo: 'Prisma / cilindro', expr: 'V = A_base · h' },
      { titulo: 'Pirâmide / cone', expr: 'V = A_base · h / 3' },
      { titulo: 'Esfera', expr: 'V = 4πr³/3   ·   A = 4πr²' },
      { titulo: 'Cilindro (área)', expr: 'A = 2πr² + 2πrh' },
    ],
    questoes: [],
  },

  'mat-funcao-1': {
    resumo: [
      'Função do 1º grau é f(x) = ax + b, cujo gráfico é reta. O coeficiente a é a taxa de variação (inclinação): a > 0 cresce, a < 0 decresce. O b é onde a reta corta o eixo y, ou seja, o valor inicial quando x = 0.',
      'O Enem adora o contexto de tarifa: valor fixo mais valor por unidade. Uma corrida de aplicativo com bandeirada de R$ 5 e R$ 2,50 por km é y = 5 + 2,5x. Saber ler a lei de formação a partir do texto é metade da questão.',
      'Raiz da função (onde f(x) = 0) é o ponto em que o gráfico cruza o eixo x. Comparar duas funções do 1º grau é achar a interseção, resolvendo ax + b = cx + d, situação típica de "a partir de quantas unidades o plano B é mais barato".',
    ],
    chave: [
      'Montar a lei de formação a partir de tarifa fixa + variável',
      'Interseção de duas retas (plano A x plano B)',
      'Interpretar a e b no gráfico, sem calcular',
      'Função crescente/decrescente e sinal de a',
    ],
    formulas: [
      { titulo: 'Lei de formação', expr: 'f(x) = ax + b' },
      { titulo: 'Taxa de variação', expr: 'a = (f(x₂) − f(x₁)) / (x₂ − x₁)' },
      { titulo: 'Raiz', expr: 'x = −b/a' },
    ],
    questoes: [],
  },

  'mat-funcao-2': {
    resumo: [
      'A parábola f(x) = ax² + bx + c tem concavidade para cima se a > 0 e para baixo se a < 0. O vértice é o máximo ou o mínimo, e é o que a questão de lucro, altura de projétil ou área máxima sempre pede.',
      'As raízes vêm de Bhaskara ou da soma e produto (x₁ + x₂ = −b/a, x₁·x₂ = c/a). Quando a questão traz o gráfico, ler o sinal de a, o vértice e as raízes direto da figura é mais rápido do que aplicar fórmula.',
      'O Enem cobra sobretudo otimização: maximizar área de um cercado com perímetro fixo, maximizar lucro, encontrar a altura máxima. Em todos, o valor de x no vértice é −b/2a e o valor máximo é f desse x.',
    ],
    chave: [
      'Vértice: x = −b/2a e valor máximo/mínimo',
      'Raízes, soma e produto, e leitura das raízes no gráfico',
      'Máximo de área com perímetro fixo (problema clássico)',
      'Deslocamento vertical da parábola (c) e concavidade (a)',
    ],
    formulas: [
      { titulo: 'Bhaskara', expr: 'x = (−b ± √(b² − 4ac)) / 2a' },
      { titulo: 'Vértice', expr: 'x_v = −b/2a   ·   y_v = −Δ/4a' },
      { titulo: 'Soma e produto', expr: 'x₁ + x₂ = −b/a   ·   x₁x₂ = c/a' },
    ],
    questoes: [],
  },

  'mat-exponencial': {
    resumo: [
      'Crescimento exponencial é aquele em que a taxa incide sobre o valor já crescido, a quantidade é multiplicada pelo mesmo fator a cada período. É o modelo de população, de contágio, de juros compostos e de decaimento radioativo.',
      'Logaritmo é a pergunta "a que expoente elevo a base para obter esse número". Ele serve para resolver equação em que a incógnita está no expoente: 2^x = 32 ⟹ x = 5. O Enem cobra mais a interpretação (escala logarítmica, pH, Richter) do que a manipulação algébrica pesada.',
      'Meia-vida e decaimento seguem o mesmo padrão com fator menor que 1: a cada meia-vida, resta metade. Reconhecer se o fator é maior ou menor que 1 é o que distingue crescimento de decaimento.',
    ],
    chave: [
      'Crescimento populacional e contágio com taxa por período',
      'Decaimento e meia-vida',
      'Escala logarítmica (pH, decibéis, Richter) e o que significa "aumentar uma unidade"',
      'Juros compostos como função exponencial',
    ],
    formulas: [
      { titulo: 'Crescimento', expr: 'y = y₀ · (1 + i)^t' },
      { titulo: 'Decaimento', expr: 'y = y₀ · (1 − i)^t' },
      { titulo: 'Meia-vida', expr: 'y = y₀ · (1/2)^(t/P)' },
      { titulo: 'Logaritmo', expr: 'log_b a = x ⟺ b^x = a' },
    ],
    questoes: [],
  },

  'mat-graficos-funcao': {
    resumo: [
      'Ler gráfico de função é identificar comportamento sem calcular: onde cresce, onde decresce, onde cruza o eixo, qual o máximo. O Enem pede isso em questão que mostra quatro gráficos e pergunta qual representa a situação descrita.',
      'Uma estratégia que resolve a maioria: marque no texto os fatos ("começa em 10", "sobe até 30", "fica constante por 2 horas", "cai a zero") e elimine os gráficos que contradizem cada fato, um por um.',
      'Atenção ao domínio: em contexto real, x ≥ 0 e o gráfico não continua à esquerda do zero. Gráfico que "volta no tempo" ou que assume valor negativo de uma grandeza que não pode ser negativa está errado por definição.',
    ],
    chave: [
      'Escolher o gráfico que representa uma situação narrada',
      'Identificar crescimento, patamar constante e queda',
      'Interpretar domínio e imagem em contexto real',
      'Relacionar taxa de variação à inclinação',
    ],
    formulas: [],
    questoes: [],
  },

  'mat-probabilidade': {
    resumo: [
      'Probabilidade é casos favoráveis sobre casos possíveis, quando todos os resultados são igualmente prováveis. A parte difícil é contar os casos: é aí que probabilidade e análise combinatória se encontram.',
      'Eventos independentes multiplicam probabilidades (dois dados: 1/6 × 1/6); eventos mutuamente exclusivos somam (sair 1 ou 6: 1/6 + 1/6). "Pelo menos um" quase sempre se resolve pelo complementar: 1 − P(nenhum).',
      'O Enem cobra probabilidade em contexto de sorteio, vacinação, genética, trânsito e jogo. Em questão com retirada sem reposição, o denominador diminui a cada retirada, é o erro mais comum.',
    ],
    chave: [
      'Probabilidade da união e do complementar ("pelo menos um")',
      'Retiradas com e sem reposição',
      'Probabilidade condicional em tabela de dupla entrada',
      'Probabilidade com contagem por combinatória',
    ],
    formulas: [
      { titulo: 'Definição', expr: 'P(A) = n(A) / n(Ω)' },
      { titulo: 'Complementar', expr: 'P(Aᶜ) = 1 − P(A)' },
      { titulo: 'Independência', expr: 'P(A∩B) = P(A) · P(B)' },
    ],
    questoes: [],
  },

  'mat-combinatoria': {
    resumo: [
      'Antes de calcular, classifique o problema em três perguntas: a ordem importa? todos os elementos são usados? pode repetir? Ordem importando e sem usar todos, é arranjo; ordem não importando, é combinação; usando todos, é permutação.',
      'Combinação é arranjo dividido pelas permutações dos escolhidos, porque a ordem não distingue os grupos. C(n,p) = n!/(p!(n−p)!). Permutação com repetição divide o fatorial total pelo fatorial das repetições, caso clássico de anagramas.',
      'O Enem gosta de contagem com restrição: senha que começa com vogal, comissão com pelo menos uma mulher, fila em que duas pessoas ficam juntas (resolve-se "colando" as duas e multiplicando por 2).',
    ],
    chave: [
      'Princípio multiplicativo em senhas, placas e cardápios',
      'Combinação em comissões e sorteios',
      'Permutação com repetição (anagramas)',
      'Restrições: "pelo menos um", "juntos", "não podem ficar juntos"',
    ],
    formulas: [
      { titulo: 'Permutação', expr: 'Pₙ = n!' },
      { titulo: 'Arranjo', expr: 'A(n,p) = n!/(n−p)!' },
      { titulo: 'Combinação', expr: 'C(n,p) = n! / (p!(n−p)!)' },
      { titulo: 'Com repetição', expr: 'P = n! / (a! · b! · …)' },
    ],
    questoes: [],
  },
};
