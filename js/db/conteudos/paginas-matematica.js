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
      'Razão é comparação entre duas grandezas por meio de uma divisão, e proporção é a igualdade entre duas razões. É o assunto que sustenta quase todo o resto da prova de Matemática: escala, velocidade média, densidade, concentração, receita de cozinha, planta de casa, mapa. Quem entende proporção resolve questão de porcentagem, de regra de três e de geometria sem perceber que está usando a mesma ideia.',
      'A regra de ouro é comparar grandezas da mesma espécie, na mesma unidade. Razão entre 2 m e 50 cm só faz sentido depois de transformar tudo em centímetro, e é aí que a maioria dos erros começa. Antes de montar qualquer conta, escreva as unidades lado a lado e veja se elas conversam.',
      'Grandezas diretamente proporcionais crescem juntas: o dobro de uma implica o dobro da outra. Inversamente proporcionais andam em sentidos opostos: o dobro de uma implica a metade da outra. Velocidade e tempo, numa viagem de distância fixa, são inversos; número de trabalhadores e tempo para terminar uma obra também. Já quantidade e preço são diretos.',
      'Duas armadilhas aparecem sempre. A primeira é proporção composta, com três ou mais grandezas, em que é preciso decidir, uma por uma, se cada relação é direta ou inversa antes de multiplicar. A segunda é a falsa proporcionalidade: área e volume não acompanham o comprimento. Dobrar o lado de um quadrado quadruplica a área e multiplica o volume por oito, e é exatamente isso que a questão dos docinhos esféricos cobra.',
      'Em geometria, proporção aparece como semelhança. Figuras semelhantes têm lados proporcionais e a mesma razão entre perímetros, mas a razão entre áreas é o quadrado da razão entre lados, e entre volumes é o cubo. Escala de mapa é razão entre medida no desenho e medida real, sempre na mesma unidade: escala 1:100 significa que 1 cm no papel equivale a 100 cm reais.',
      'Na cozinha, na fábrica e no laboratório, a proporção é receita: manter a razão entre ingredientes quando se muda a quantidade produzida. Se uma porção rende 50 unidades, o número de porções necessárias é a quantidade pedida dividida pelo rendimento, e quando o tamanho da unidade muda entra o fator de volume junto.',
      'Uma rotina que funciona na prova: escreva as grandezas com unidade, descubra se são diretas ou inversas, monte a igualdade de razões e só então substitua os números. Quem pula direto para a conta costuma inverter uma relação sem notar, e a alternativa com o valor invertido está sempre lá esperando.',
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
    questoes: [
      {
        ano: 2022,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 147',
        textoApoio: [
          'Uma cozinheira produz docinhos especiais por encomenda. Usando uma receita-base de massa, ela prepara uma porção, com a qual produz 50 docinhos maciços de formato esférico, com 2 cm de diâmetro. Um cliente encomenda 150 desses docinhos, mas pede que cada um tenha formato esférico com 4 cm de diâmetro. A cozinheira pretende preparar o número exato de porções da receita-base de massa necessário para produzir os docinhos dessa encomenda.',
        ],
        enunciado: 'Quantas porções da receita-base de massa ela deve preparar para atender esse cliente?',
        alternativas: ['2', '3', '6', '12', '24'],
        correta: 'E',
        resolucao: [
          'A massa gasta é proporcional ao volume de cada docinho, e o volume da esfera depende do cubo do diâmetro: V = (4/3)·π·r³.',
          'O diâmetro dobrou de 2 cm para 4 cm. Como o volume cresce com o cubo, cada docinho novo gasta 2³ = 8 vezes mais massa que o antigo.',
          'A encomenda tem 150 docinhos, o equivalente a 150 × 8 = 1 200 docinhos do tamanho original.',
          'Cada porção rende 50 unidades, então o número de porções é 1 200 ÷ 50 = 24.',
          'Resposta: E. O erro clássico é dobrar a quantidade de massa (o que daria 6 porções) e esquecer que o volume cresce ao cubo.',
        ],
      },
    ],
  },

  'mat-regra-tres': {
    resumo: [
      'Regra de três é o método para descobrir um valor desconhecido quando três outros formam uma proporção. Ela não é uma fórmula nova: é a proporção escrita em forma de conta. Por isso o que decide o acerto não é a conta, é a leitura de quais grandezas são diretas e quais são inversas.',
      'O roteiro é sempre o mesmo. Monte uma tabela com as grandezas, cada coluna na sua unidade. Pergunte, para cada par, o que acontece com a segunda quando a primeira dobra. Se a segunda também dobra, é direta e as razões se igualam na mesma ordem. Se a segunda cai pela metade, é inversa e uma das razões precisa ser invertida.',
      'Na regra de três composta, com três ou mais grandezas, a decisão é feita aos pares, sempre comparando a grandeza da incógnita com cada uma das outras, uma de cada vez. Esse cuidado evita o erro mais comum: tratar como inversa uma relação que, na verdade, é direta.',
      'Alguns pares aparecem o tempo todo. Número de trabalhadores e tempo de obra: inversos. Velocidade e tempo, com distância fixa: inversos. Vazão e tempo para encher um tanque: inversos. Consumo por pessoa e número de pessoas, com estoque fixo: inversos. Litros por dia e dias de duração: inversos. Já quantidade e custo, distância e combustível gasto, produção e tempo com ritmo constante: diretos.',
      'Em problema de torneira, de reservatório e de racionamento, a conta costuma ter duas partes. Primeiro descubra a capacidade disponível, com volume de cilindro ou de paralelepípedo quando for o caso. Depois compare o que existe com o que será consumido no período, e a diferença é o que precisa ser economizado. Dividir essa diferença pelo número de pessoas e de dias dá a resposta.',
      'Cuidado com a unidade. Metro cúbico para litro é fator 1 000, e é a conversão mais esquecida na prova. Hora para minuto é 60, dia para hora é 24, e quilômetro para metro é 1 000. Quando a resposta é pedida por dia e a conta saiu por hora, ainda falta dividir.',
      'Por fim, desconfie de resultado absurdo. Se a conta mandou contratar 0,3 trabalhador ou economizar 2 000 litros por pessoa em um vilarejo, volte e verifique se alguma relação foi invertida. A regra de três não perdoa erro de sinal: ela devolve um número bonito e errado.',
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
    questoes: [
      {
        ano: 2023,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 150',
        textoApoio: [
          'A água utilizada pelos 75 moradores de um vilarejo provém de um reservatório de formato cilíndrico circular reto cujo raio da base mede 5 metros, sempre abastecido no primeiro dia de cada mês por caminhões-pipa. Cada morador desse vilarejo consome, em média, 200 litros de água por dia.',
          'No mês de junho de um determinado ano, o vilarejo festejou o dia do seu padroeiro e houve um gasto extra de água nos primeiros 20 dias. Passado esse período, as pessoas verificaram a quantidade de água presente no reservatório e constataram que o nível da coluna de água estava em 1,5 metro. Decidiram, então, fazer um racionamento de água durante os 10 dias seguintes. Considere 3 como aproximação para π.',
        ],
        enunciado: 'Qual é a quantidade mínima de água, em litro, que cada morador, em média, deverá economizar por dia, de modo que o reservatório não fique sem água nos próximos 10 dias?',
        alternativas: ['50', '60', '80', '140', '150'],
        correta: 'A',
        resolucao: [
          'Primeiro, quanta água ainda existe. O volume do cilindro é π·r²·h, com π = 3, r = 5 m e h = 1,5 m: V = 3 × 25 × 1,5 = 112,5 m³.',
          'Como 1 m³ tem 1 000 litros, o reservatório guarda 112 500 litros.',
          'Agora, o consumo normal nos 10 dias: 75 moradores × 200 litros × 10 dias = 150 000 litros.',
          'Falta água: 150 000 − 112 500 = 37 500 litros. É essa diferença que a economia precisa cobrir.',
          'A economia é dividida entre todos: 37 500 ÷ 75 moradores = 500 litros por morador ao longo dos 10 dias, ou seja, 50 litros por dia.',
          'Resposta: A. O erro que a questão espera é dividir por 75 e esquecer dos 10 dias, o que daria 500.',
        ],
      },
    ],
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
      'Matemática financeira no Enem não pede fórmula complicada: pede que você entenda o que é custo, o que é receita e o que é lucro, e que saiba comparar duas propostas. A maior parte das questões se resolve com porcentagem, função de primeiro grau e uma tabela bem montada.',
      'A estrutura de qualquer problema é a mesma: lucro é receita menos custo. A receita é o preço unitário vezes a quantidade vendida. O custo se divide em fixo, que existe mesmo sem produção, e variável, que cresce com a quantidade. Entender essa separação explica por que produzir mais barateia cada unidade: o custo fixo se espalha por mais peças.',
      'Porcentagem é a ferramenta central, e a regra é multiplicar por fatores. Aumento de 20% é multiplicar por 1,20; desconto de 15%, por 0,85. Aumentos e descontos sucessivos se multiplicam, nunca se somam: aumentar 10% e depois descontar 10% deixa o preço em 0,99 do original, e não igual. Juros simples rendem sempre sobre o capital inicial; compostos rendem sobre o capital já atualizado.',
      'Juros simples: J = C·i·t, com i em decimal e t na mesma unidade de tempo da taxa. Montante é capital mais juros. Juros compostos: M = C·(1 + i)ᵗ, e é o regime do cartão de crédito, do financiamento e do investimento. A diferença entre os dois cresce com o tempo, e é isso que questão com prazo longo costuma cobrar.',
      'Parcelamento é comparação de valor presente. Não se compara o valor da parcela com o preço à vista; compara-se o total pago com o preço à vista, e depois se traduz a diferença em taxa. Se a loja cobra 10% ao mês e o cliente parcela em três vezes sem entrada, o preço efetivo é maior que o anunciado, mesmo que a soma das parcelas pareça o preço de etiqueta.',
      'Função de primeiro grau resolve o resto. Receita é uma reta que sai da origem (R = p·q); custo é uma reta que começa no custo fixo (C = cf + cv·q). O ponto em que as duas se cruzam é o ponto de equilíbrio: abaixo dele há prejuízo, acima há lucro. É só isso que a questão do pescador pede, com o detalhe extra de uma comissão percentual.',
      'Antes de fechar a conta, verifique se a pergunta é sobre lucro, sobre margem ou sobre preço. Margem é lucro dividido pela receita, e é sempre menor que o markup, que é o lucro dividido pelo custo. Confundir os dois muda a resposta, e as duas alternativas costumam estar na prova.',
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
    questoes: [
      {
        ano: 2023,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 155',
        textoApoio: [
          'Um pescador tem um custo fixo diário de R$ 900,00 com combustível, iscas, manutenção de seu barco e outras pequenas despesas. Ele vende cada quilograma de peixe por R$ 5,00. Sua meta é obter um lucro mínimo de R$ 800,00 por dia. Sozinho, ele consegue, ao final de um dia de trabalho, pescar 180 kg de peixe, o que é suficiente apenas para cobrir o custo fixo diário.',
          'Portanto, precisa contratar ajudantes, pagando para cada um R$ 250,00 por dia de trabalho. Além desse valor, 4% da receita obtida pela venda de peixe é repartida igualmente entre os ajudantes. Considerando o tamanho de seu barco, ele pode contratar até 5 ajudantes. Ele sabe que com um ajudante a pesca diária é de 300 kg e que, a partir do segundo ajudante contratado, aumenta-se em 100 kg a quantidade de peixe pescada por ajudante em um dia de trabalho.',
        ],
        enunciado: 'A quantidade mínima de ajudantes que esse pescador precisa contratar para conseguir o lucro diário pretendido é',
        alternativas: ['1.', '2.', '3.', '4.', '5.'],
        correta: 'D',
        resolucao: [
          'Com 1 ajudante a pesca é de 300 kg; com 2, 400 kg; com 3, 500 kg; com 4, 600 kg. A receita é sempre 5 reais por quilo.',
          'O lucro é a receita menos tudo o que sai: custo fixo de 900, salário de 250 por ajudante e 4% da receita que vai para a divisão entre eles.',
          'Assim, lucro = 5·kg − 900 − 250·n − 0,04·(5·kg).',
          'Com 3 ajudantes: receita 2 500, lucro = 2 500 − 900 − 750 − 100 = 750. Falta pouco, mas não chega aos 800.',
          'Com 4 ajudantes: receita 3 000, lucro = 3 000 − 900 − 1 000 − 120 = 980. A meta é batida.',
          'Resposta: D. Quem esquece os 4% encontra 3 ajudantes, e é exatamente a alternativa que a banca colocou ali.',
        ],
      },
    ],
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
      'Geometria espacial no Enem é, quase sempre, uma comparação: escolher o recipiente que gasta menos material, o que comporta mais líquido, o que custa menos por litro. Não se pede a demonstração, pede-se o volume ou a área de um sólido que você reconheceu no enunciado.',
      'Os três sólidos que aparecem são o prisma (e o cilindro, seu parente), a pirâmide (e o cone) e a esfera. Volume do prisma e do cilindro é área da base vezes altura. Pirâmide e cone têm um terço disso. Esfera é quatro terços de π vezes o raio ao cubo. Guardadas essas três, o resto é identificar altura, raio e base.',
      'Área total é a soma de todas as faces. No paralelepípedo, são duas faces de cada tipo: 2(ab + ac + bc). No cilindro, são as duas bases mais a lateral, que desenrolada é um retângulo de base igual ao comprimento da circunferência: 2πr² + 2πrh. Em piscina ou caixa d’água, a tampa não existe, e esquecer de descontar a superfície de cima é o erro mais comum.',
      'Unidade é onde a questão derruba. Volume de sólido sai em metro cúbico, e capacidade é pedida em litro: 1 m³ = 1 000 L, 1 dm³ = 1 L, 1 cm³ = 1 mL. Antes de comparar propostas, coloque todas as dimensões na mesma unidade. Uma piscina de 90 000 litros tem 90 m³, e não 90 000 m³.',
      'Há um padrão econômico que a prova gosta de explorar: entre sólidos de mesmo volume, o que mais se aproxima do cubo tem a menor área superficial. Por isso a piscina mais funda e mais curta gasta menos revestimento que a rasa e comprida, e por isso a embalagem cúbica economiza papelão. Se a questão pedir menor gasto, procure a forma mais compacta.',
      'Planificação é o sólido aberto em papel. Saber planificar cubo, paralelepípedo e cilindro resolve questão de dobradura e de embalagem. No cubo há onze planificações diferentes, e o Enem já cobrou o reconhecimento de uma delas.',
      'Inscrição e circunscrição aparecem como desafio: esfera dentro do cubo, cilindro dentro da esfera, cone dentro do cilindro. A chave é sempre a mesma: o diâmetro da esfera inscrita é igual à aresta do cubo; o raio do cilindro circunscrito é a metade da aresta; a razão entre volumes se calcula depois, sem precisar de valor numérico.',
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
    questoes: [
      {
        ano: 2022,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 167',
        textoApoio: [
          'Um casal planeja construir em sua chácara uma piscina com o formato de um paralelepípedo reto retângulo com capacidade para 90 000 L de água. O casal contratou uma empresa de construções que apresentou cinco projetos com diferentes combinações nas dimensões internas de profundidade, largura e comprimento. A piscina a ser construída terá revestimento interno em suas paredes e fundo com uma mesma cerâmica, e o casal irá escolher o projeto que exija a menor área de revestimento.',
          'As dimensões internas de profundidade, largura e comprimento, respectivamente, são: projeto I: 1,8 m, 2,0 m e 25,0 m; projeto II: 2,0 m, 5,0 m e 9,0 m; projeto III: 1,0 m, 6,0 m e 15,0 m; projeto IV: 1,5 m, 15,0 m e 4,0 m; projeto V: 2,5 m, 3,0 m e 12,0 m.',
        ],
        enunciado: 'O projeto que o casal deverá escolher será o',
        alternativas: ['I.', 'II.', 'III.', 'IV.', 'V.'],
        correta: 'B',
        resolucao: [
          'Todos os projetos têm o mesmo volume: 1,8 × 2 × 25 = 90 m³, e o mesmo acontece com os outros. Como 1 m³ = 1 000 L, o volume é 90 000 L em todos. O que muda é a forma, e é a forma que decide o gasto de cerâmica.',
          'A área a revestir é o fundo mais as quatro paredes, sem a tampa. Com comprimento c, largura l e profundidade p, a conta é: A = c·l + 2·c·p + 2·l·p.',
          'Projeto I: 25×2 + 2×25×1,8 + 2×2×1,8 = 50 + 90 + 7,2 = 147,2 m².',
          'Projeto II: 9×5 + 2×9×2 + 2×5×2 = 45 + 36 + 20 = 101 m².',
          'Projeto III: 15×6 + 2×15×1 + 2×6×1 = 90 + 30 + 12 = 132 m².',
          'Projeto IV: 4×15 + 2×4×1,5 + 2×15×1,5 = 60 + 12 + 45 = 117 m².',
          'Projeto V: 12×3 + 2×12×2,5 + 2×3×2,5 = 37,5 + 60 + 15 = 112,5 m².',
          'O menor valor é o do projeto II, com 101 m². Resposta: B. Confirma a regra: entre sólidos de mesmo volume, quanto mais compacta a forma, menor a superfície.',
        ],
      },
    ],
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
      'Probabilidade é a razão entre os casos favoráveis e os casos possíveis, quando todos têm a mesma chance. A frase parece simples e resolve a maior parte da prova, desde que você conte os dois conjuntos com cuidado. O trabalho real da questão está em enumerar, não em dividir.',
      'Espaço amostral é o conjunto de todos os resultados possíveis; evento é o subconjunto que interessa. No lançamento de um dado, o espaço tem 6 elementos e o evento "sair número par" tem 3, logo a probabilidade é 3/6 = 1/2. A probabilidade é sempre um número entre 0 e 1, e a soma das probabilidades de todos os resultados possíveis é 1.',
      'A probabilidade do complementar é o que falta para 1: se a chance de chover é 30%, a de não chover é 70%. Muitas questões ficam fáceis quando se calcula o contrário do que foi pedido, especialmente quando o enunciado diz "pelo menos um". Pelo menos um é sempre 1 menos a probabilidade de nenhum.',
      'Em etapas independentes, multiplica-se. A chance de tirar cara duas vezes seguidas é 1/2 × 1/2 = 1/4. Em etapas alternativas, soma-se: a chance de tirar 1 ou 6 é 1/6 + 1/6 = 2/6. Independente é quando o resultado de uma etapa não altera o da outra; é o que autoriza a multiplicação.',
      'Quando há retirada sem reposição, o segundo sorteio depende do primeiro, e o denominador muda. De uma urna com 3 bolas vermelhas e 2 azuis, tirar duas vermelhas seguidas sem repor é 3/5 × 2/4 = 6/20 = 3/10. Com reposição, seria 3/5 × 3/5.',
      'Sorteio em etapas com urna adaptada, como o do exame de admissão, pede atenção ao espaço amostral de cada etapa. Se a segunda urna só contém as bolas que formam números válidos, o número de bolas dela depende do primeiro algarismo sorteado, e é essa contagem que separa uma resposta da outra.',
      'Probabilidade com contagem usa análise combinatória. O número de casos possíveis é a quantidade de agrupamentos totais; os favoráveis, a quantidade que atende à condição. Saber se a ordem importa decide entre arranjo e combinação, e é o erro mais caro do assunto.',
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
    questoes: [
      {
        ano: 2023,
        fonte: 'Dia 2 · caderno 5 (amarelo) · questão 158',
        textoApoio: [
          'Em um colégio público, a admissão no primeiro ano se dá por sorteio. Neste ano há 55 candidatos, cujas inscrições são numeradas de 01 a 55. O sorteio de cada número de inscrição será realizado em etapas, utilizando-se duas urnas. Da primeira urna será sorteada uma bola, dentre bolas numeradas de 0 a 9, que representará o algarismo das unidades do número de inscrição a ser sorteado e, em seguida, da segunda urna, será sorteada uma bola para representar o algarismo das dezenas desse número.',
          'Depois do primeiro sorteio, e antes de se sortear o algarismo das dezenas, as bolas que estarão presentes na segunda urna serão apenas aquelas cujos números formam, com o algarismo já sorteado, um número de 01 a 55.',
        ],
        enunciado: 'As probabilidades de os candidatos de inscrição número 50 e 02 serem sorteados são, respectivamente,',
        alternativas: [
          '1/50 e 1/60',
          '1/50 e 1/50',
          '1/50 e 1/10',
          '1/55 e 1/54',
          '1/100 e 1/100',
        ],
        correta: 'A',
        resolucao: [
          'Primeiro sorteio, o das unidades. Para o número 50, a unidade é 0, então a chance é 1/10. Para o 02, a unidade é 2, também 1/10.',
          'Segundo sorteio, o das dezenas, que depende do primeiro resultado. Com unidade 0, os números válidos entre 01 e 55 são 10, 20, 30, 40 e 50: cinco bolas. A chance de sair 5 é 1/5.',
          'Juntando: 1/10 × 1/5 = 1/50 para o candidato 50.',
          'Com unidade 2, os números válidos são 02, 12, 22, 32, 42 e 52: seis bolas. A chance de sair 0 é 1/6, e o total fica 1/10 × 1/6 = 1/60 para o candidato 02.',
          'Resposta: A. Note que as duas probabilidades são diferentes mesmo com o primeiro sorteio tendo a mesma chance: o espaço amostral da segunda urna muda conforme o algarismo das unidades.',
        ],
      },
    ],
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
