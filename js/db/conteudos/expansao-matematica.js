/**
 * Expansão dos conteúdos de matemática.
 * Texto completo por subtema, exemplos, esquemas, fórmulas e três questões
 * resolvidas por escrito em cada página.
 */
export const EXP_MATEMATICA = {

  /* ------------------------------------------------------------ PORCENTAGEM */
  'mat-porcentagem': {
    chave: [
      'Fator multiplicador em vez de regra de três',
      'Aumentos e descontos sucessivos: atenção às bases diferentes',
      'Porcentagem de porcentagem',
      'Pontos percentuais × variação relativa',
      'Base de cálculo: porcentagem de quê?',
    ],
    secoes: [
      {
        h: 'Porcentagem é uma fração com denominador 100',
        ps: [
          'Porcentagem é só outra escrita de uma fração de denominador 100: 32% é 32/100 = 0,32. Toda questão de porcentagem do Enem pode ser resolvida transformando a taxa em número decimal e multiplicando. O ganho de tempo é grande, porque a conta fica em uma linha e não exige montar a proporção a cada item.',
          'Dizer que uma grandeza é "porcentagem de outra" sempre pressupõe uma base. 20% de 300 não é 20% de 250. Antes de calcular, identifique a frase "de quê": é esse valor que vai embaixo na conta. Muitos erros de prova nascem daí, e não da aritmética.',
        ],
      },
      {
        h: 'O fator multiplicador: aumentos e descontos',
        ps: [
          'Aumento de 17% multiplica por 1,17; desconto de 17% multiplica por 0,83. Aumento de 100% dobra (fator 2), desconto de 100% zera (fator 0). Escrever o fator é o método mais seguro quando a questão encadeia operações.',
          'Descontos e aumentos sucessivos, em geral, não podem ser somados diretamente, pois incidem sobre bases diferentes. Aumentar 20% e depois descontar 20% não devolve o valor original: 1,20 × 0,80 = 0,96, ou seja, o preço final fica 4% abaixo do inicial. Quanto maior a taxa, maior a perda, porque o segundo percentual incide sobre um valor já alterado.',
        ],
      },
      {
        h: 'Pontos percentuais, variação relativa e porcentagem de porcentagem',
        ps: [
          'Quando a prova fala de taxas que já são porcentagens (desemprego, taxa de juros, índice de aprovação), a diferença é medida em pontos percentuais. Sair de 40% para 46% é subir 6 pontos percentuais, mas é um crescimento relativo de 15%, porque 6/40 = 0,15. As duas leituras aparecem em gráficos e em manchetes, e a questão cobra a distinção.',
          'Porcentagem de porcentagem também é multiplicação de fatores: 30% de 60% é 0,30 × 0,60 = 0,18, isto é, 18%. O mesmo raciocínio resolve desconto sobre desconto, comissão sobre valor já descontado e tributo cobrado em cascata.',
        ],
      },
      {
        h: 'Aumento, desconto e o caminho de volta',
        ps: [
          'Se um preço subiu 25%, o desconto necessário para voltar ao valor original não é 25%, e sim 20%: 1,25 × 0,80 = 1,00. O desconto de retorno é sempre calculado sobre o valor já aumentado, e por isso é menor que o aumento.',
          'Para descobrir a variação percentual entre dois valores, use (final − inicial) / inicial × 100. Se o resultado é negativo, houve queda. Essa fórmula resolve gráfico de inflação, comparação de salários e variação de população em uma única linha.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Loja com desconto duplo',
        texto: 'Uma bicicleta de R$ 250,00 entra em promoção com 20% de desconto e, no caixa, o cliente ganha mais 10% sobre o valor já reduzido.',
        comentario: '250 × 0,80 × 0,90 = 180. O desconto total foi de 28%, não de 30% — somar as taxas é o erro clássico.',
      },
      {
        titulo: 'Taxa que volta ao ponto de partida',
        texto: 'O aluguel passou de R$ 1.200 para R$ 1.500 (aumento de 25%). Qual desconto o locador precisaria dar para retornar aos R$ 1.200?',
        comentario: '1.200 / 1.500 = 0,80 → desconto de 20%. Aumento e desconto de mesma taxa não se anulam.',
      },
      {
        titulo: 'Manchete com pontos percentuais',
        texto: 'A taxa de aprovação foi de 40% em 2024 e 46% em 2025.',
        comentario: 'Alta de 6 pontos percentuais e de 15% em termos relativos. A questão sempre avisa qual das duas leituras quer.',
      },
    ],
    figuras: [
      {
        titulo: 'Como resolver uma questão de porcentagem',
        tipo: 'fluxo',
        itens: ['Identifique a base: porcentagem de quê?', 'Transforme a taxa em decimal', 'Monte o fator: 1 + i ou 1 − i', 'Multiplique (e encadeie os fatores se houver etapas)', 'Confira se o pedido é valor final, variação ou ponto percentual'],
        legenda: 'Esse roteiro resolve tanto o item simples quanto o de aumentos e descontos sucessivos.',
      },
    ],
    formulas: [
      { titulo: 'Fator de aumento ou desconto', expr: 'P = V × (1 ± i)', uso: 'i em decimal; + para aumento, − para desconto.' },
      { titulo: 'Operações sucessivas', expr: 'Vf = Vi × (1 + i₁) × (1 + i₂) × …', uso: 'Nunca some as taxas: multiplique os fatores.' },
      { titulo: 'Variação percentual', expr: 'Δ% = (Vf − Vi) / Vi × 100', uso: 'Resultado negativo indica queda.' },
      { titulo: 'Desconto de retorno', expr: 'd = 1 − 1/(1 + a)', uso: 'a = aumento aplicado; d = desconto que volta ao valor original.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um tênis custava R$ 250,00. Na primeira semana de promoção, recebeu 20% de desconto; na semana seguinte, o preço já reduzido recebeu mais 10% de desconto. O valor final pago foi de',
        alternativas: ['R$ 175,00', 'R$ 180,00', 'R$ 185,00', 'R$ 200,00', 'R$ 225,00'],
        correta: 'B',
        resolucao: [
          'O primeiro desconto é sobre 250: 250 × 0,80 = 200.',
          'O segundo desconto é sobre 200, não sobre 250: 200 × 0,90 = 180.',
          'Em fatores, 250 × 0,80 × 0,90 = 180. O desconto efetivo foi de 28%.',
        ],
        porqueErram: [
          'A: soma 30% de uma vez (250 × 0,70), ignorando que a segunda taxa incide sobre o valor já reduzido.',
          'C e D: aplicam o segundo desconto na base errada ou arredondam antes do fim.',
          'E: consideram apenas o primeiro desconto.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Para que um produto que sofreu aumento de 25% volte a custar exatamente o preço anterior, é necessário aplicar um desconto de',
        alternativas: ['25%', '20%', '22,5%', '30%', '12,5%'],
        correta: 'B',
        resolucao: [
          'Depois do aumento, o preço é 1,25 vez o original.',
          'O desconto d precisa satisfazer 1,25 × (1 − d) = 1.',
          'Então 1 − d = 1/1,25 = 0,80, ou seja, d = 20%.',
        ],
        porqueErram: [
          'A: repete a taxa do aumento, o erro mais comum — o desconto é calculado sobre a base maior.',
          'C e D: fazem média ou somam as taxas.',
          'E: inverte a proporção e divide 25 por 2.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Um instituto divulgou que a taxa de desemprego de uma região passou de 40% da população economicamente ativa para 46% no ano seguinte.'],
        enunciado: 'Em relação ao ano anterior, o crescimento relativo da taxa de desemprego foi de aproximadamente',
        alternativas: ['6%', '8,6%', '15%', '46%', '60%'],
        correta: 'C',
        resolucao: [
          'A taxa subiu de 40% para 46%, o que equivale a 6 pontos percentuais.',
          'O crescimento relativo compara a variação com o valor inicial: 6/40 = 0,15.',
          'Portanto houve alta de 6 pontos percentuais, que corresponde a 15% de crescimento relativo.',
        ],
        porqueErram: [
          'A: confunde ponto percentual com porcentagem — 6 é a diferença em pontos, não a variação relativa.',
          'B: divide pela taxa final (6/46 ≈ 13%) e arredonda mal; a base é sempre a inicial.',
          'D e E: leem a taxa final como se fosse a variação.',
        ],
      },
    ],
  },

  /* ----------------------------------------------------- RAZÃO E PROPORÇÃO */
  'mat-razao-proporcao': {
    chave: [
      'Razão como quociente entre grandezas',
      'Proporção e produto dos meios pelos extremos',
      'Divisão proporcional a partes',
      'Razão entre grandezas de espécies diferentes (velocidade, densidade)',
      'Constante de proporcionalidade',
    ],
    secoes: [
      {
        h: 'Razão é comparação por divisão',
        ps: [
          'Razão entre dois números é o quociente a/b, com b diferente de zero. Ela responde "quantas vezes" ou "quanto por um". Se a razão entre meninas e meninos é 3:5, há 3 meninas para cada 5 meninos — e não 3 meninas em 8 alunos, que é a razão com o total.',
          'Razão entre grandezas diferentes cria unidades novas e aparece o tempo todo no Enem: km/h (distância por tempo), R$/kg (preço por massa), habitantes/km² (densidade demográfica), g/L (concentração). Nesses casos, dizer apenas "a razão é 80" é incompleto: a unidade faz parte da resposta.',
        ],
      },
      {
        h: 'Proporção, regra de ouro e constante',
        ps: [
          'Proporção é igualdade entre duas razões: a/b = c/d. O produto dos meios é igual ao produto dos extremos (ad = bc), e é isso que permite achar o termo que falta. Quando duas grandezas são diretamente proporcionais, a razão entre elas é constante — essa constante é o que se chama de constante de proporcionalidade.',
          'Escalas, plantas, maquetes e mapas são proporções disfarçadas, e o mesmo raciocínio resolve receita de bolo, mistura de tinta e diluição de suco: o que se mantém é a razão, não a diferença.',
        ],
      },
      {
        h: 'Divisão proporcional',
        ps: [
          'Dividir um valor em partes proporcionais a 2, 3 e 5 significa repartir em 10 partes iguais e dar 2, 3 e 5 delas. O caminho é sempre: somar os pesos, achar o valor de uma parte e multiplicar por cada peso.',
          'A divisão proporcional aparece em rateio de lucro entre sócios, em herança, em mistura de tintas e em repartição de vagas por população. Quando o enunciado diz "inversamente proporcional", os pesos viram 1/a, 1/b, 1/c antes de somar.',
        ],
      },
      {
        h: 'Proporção não é diferença',
        ps: [
          'Ao somar a mesma quantidade a dois termos de uma razão, a razão muda. Se 2:3 vira 4:5 ao acrescentar 2 a cada termo, a proporção foi quebrada. Isso explica por que "aumentar todo mundo no mesmo tanto" não mantém a proporcionalidade e é a origem de muitas alternativas erradas.',
          'Já ao multiplicar ou dividir os dois termos pelo mesmo número, a razão se conserva. Reconhecer o que preserva a razão é o que separa a conta certa da armadilha.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Rateio de lucro',
        texto: 'Dois sócios investiram R$ 6.000 e R$ 9.000. O lucro de R$ 7.500 será dividido na mesma proporção do capital.',
        comentario: 'Razão 2:3 → 5 partes de R$ 1.500 → R$ 3.000 e R$ 4.500. A soma das partes tem de devolver o total.',
      },
      {
        titulo: 'Diluição de suco',
        texto: 'A instrução da embalagem pede 1 parte de concentrado para 4 de água. Para 30 L de refresco, quantos litros de concentrado?',
        comentario: 'São 5 partes totais: 30/5 = 6 L de concentrado e 24 L de água. Erro comum: usar 4 partes em vez de 5.',
      },
    ],
    figuras: [
      {
        titulo: 'Razão 2:3 vista como partes',
        tipo: 'camadas',
        itens: [
          { txt: '2 partes', nota: 'cada parte vale o total dividido por 5' },
          { txt: '3 partes', nota: 'a soma das duas quantidades fecha o total' },
        ],
        legenda: 'Pensar em "partes" evita montar proporção a cada questão.',
      },
    ],
    formulas: [
      { titulo: 'Razão', expr: 'r = a / b   (b ≠ 0)', uso: 'Sempre indique a unidade quando as grandezas diferem.' },
      { titulo: 'Proporção', expr: 'a/b = c/d  ⇔  a·d = b·c', uso: 'Produto dos meios igual ao produto dos extremos.' },
      { titulo: 'Divisão em partes proporcionais', expr: 'p = V / (a + b + c);  Vᵃ = p·a', uso: 'p é o valor de uma parte.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma quantia de R$ 840,00 será dividida entre três irmãos em partes diretamente proporcionais às suas idades: 2, 3 e 5 anos. A maior parte recebida será de',
        alternativas: ['R$ 168,00', 'R$ 252,00', 'R$ 336,00', 'R$ 420,00', 'R$ 480,00'],
        correta: 'D',
        resolucao: [
          'Soma dos pesos: 2 + 3 + 5 = 10 partes.',
          'Valor de uma parte: 840 / 10 = 84.',
          'Maior parte (peso 5): 5 × 84 = 420.',
        ],
        porqueErram: [
          'A é a parte do irmão mais novo (2 × 84) e B a do irmão do meio.',
          'C: divide por 2,5 ou usa média simples das idades.',
          'E: calcula metade do total por aproximação, sem respeitar os pesos.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A razão entre o número de acertos de dois candidatos é 3:5. Sabendo que o segundo acertou 42 questões a mais que o primeiro, o total de acertos dos dois juntos é',
        alternativas: ['84', '126', '147', '168', '210'],
        correta: 'D',
        resolucao: [
          'Se as partes são 3x e 5x, a diferença é 2x = 42, logo x = 21.',
          'Os acertos são 3 × 21 = 63 e 5 × 21 = 105.',
          'Total: 63 + 105 = 168.',
        ],
        porqueErram: [
          'A: confunde o valor de 2x com o total.',
          'B: soma apenas um dos candidatos (63 × 2) e ignora a razão.',
          'C e E: usam o total como se a diferença fosse 42 partes.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma mistura para refresco é feita com 1 parte de concentrado para 4 partes de água. Para preparar 30 litros de refresco, a quantidade de concentrado necessária é de',
        alternativas: ['4 litros', '6 litros', '7,5 litros', '24 litros', '30 litros'],
        correta: 'B',
        resolucao: [
          'A mistura tem 1 + 4 = 5 partes no total.',
          'Cada parte vale 30 / 5 = 6 litros.',
          'O concentrado é 1 parte: 6 litros.',
        ],
        porqueErram: [
          'A: divide 30 por 7,5 ou usa a razão 1:4 diretamente sobre o total.',
          'C: considera 1 parte em 4 (30/4 = 7,5), esquecendo que a água soma com o concentrado.',
          'D: resposta da água, não do concentrado. E: o total.',
        ],
      },
    ],
  },

  /* ----------------------------------------------------------- REGRA DE TRÊS */
  'mat-regra-tres': {
    chave: [
      'Grandezas diretas × inversas',
      'Regra de três composta (três ou mais grandezas)',
      'Montagem em colunas com a incógnita isolada',
      'Análise de proporcionalidade antes da conta',
      'Problemas de torneira, máquina, trabalhador e velocidade',
    ],
    secoes: [
      {
        h: 'O que é e quando usar',
        ps: [
          'Regra de três é a ferramenta para problemas com duas grandezas proporcionais em que três valores são conhecidos e o quarto é o pedido. Ela só funciona quando a proporcionalidade é direta ou inversa — por isso a primeira etapa é sempre perguntar: se uma grandeza aumenta, a outra aumenta (direta) ou diminui (inversa)?',
          'Errar essa análise é o erro que estraga a conta inteira. Se 1 operário faz uma obra em 12 dias, 2 operários fazem em 6: mais operários, menos dias, portanto grandeza inversa. Já mais máquinas produzem mais peças: direta.',
        ],
      },
      {
        h: 'Montagem e conta',
        ps: [
          'Na regra de três simples direta, multiplica-se em cruz: a/b = c/x, logo x = b·c/a. Na inversa, multiplica-se em linha: a·b = c·x, logo x = a·b/c. Uma forma de nunca errar é escrever as grandezas em colunas, colocar a incógnita isolada e inverter apenas as colunas inversas antes de multiplicar em cruz.',
          'Unidades precisam combinar antes de montar: horas com horas, litros com litros, centímetros com centímetros. Converter no início evita o resultado absurdo no fim.',
        ],
      },
      {
        h: 'Regra de três composta',
        ps: [
          'Com três ou mais grandezas, compare cada uma separadamente com a grandeza da incógnita, mantendo as outras fixas. Inverta as que são inversamente proporcionais e multiplique. O Enem cobra muito esse formato em problemas de produção: operários × dias × horas × metros quadrados.',
          'Um atalho que funciona em problemas de produção é a taxa unitária: descubra quanto um recurso produz em uma unidade de tempo (peças por máquina-hora, metros por pedreiro-dia) e multiplique pelo novo cenário. Dá a mesma resposta e resiste melhor à pressa.',
        ],
      },
      {
        h: 'Torneiras, velocidades e vazões',
        ps: [
          'Problemas de torneira usam vazão como grandeza inversa do tempo: duas torneiras iguais enchem o tanque na metade do tempo. Se as vazões forem diferentes, some as vazões e não os tempos — somar tempos é o erro clássico, porque 1/2 + 1/3 não é 2/5.',
          'Em viagens, tempo e velocidade média são inversamente proporcionais a distância constante. Em trechos com velocidades diferentes, o tempo total é a soma dos tempos de cada trecho, nunca a média das velocidades sem ponderar pelas distâncias.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Máquinas e dias (inversa)',
        texto: '8 máquinas levam 12 dias para produzir um lote. Quantos dias levam 6 máquinas iguais?',
        comentario: 'Inversa: 8 × 12 = 96 máquina-dia; 96 / 6 = 16 dias. Menos máquinas, mais dias.',
      },
      {
        titulo: 'Produção em três grandezas',
        texto: '4 pedreiros levantam 120 m² de muro em 6 dias. Quantos dias 6 pedreiros levam para 180 m²?',
        comentario: '120 / (4 × 6) = 5 m² por pedreiro-dia. Então 180 / (6 × 5) = 6 dias.',
      },
    ],
    figuras: [
      {
        titulo: 'Direta ou inversa?',
        tipo: 'camadas',
        itens: [
          { txt: 'Direta', nota: 'aumenta um, aumenta o outro: multiplica em cruz' },
          { txt: 'Inversa', nota: 'aumenta um, diminui o outro: multiplica em linha' },
        ],
        legenda: 'A pergunta é sempre "se eu aumentar esta grandeza, a outra aumenta ou diminui?".',
      },
    ],
    formulas: [
      { titulo: 'Direta', expr: 'a/b = c/x  →  x = b·c/a', uso: 'Grandezas que crescem juntas.' },
      { titulo: 'Inversa', expr: 'a·b = c·x  →  x = a·b/c', uso: 'Grandezas que caminham em sentidos opostos.' },
      { titulo: 'Taxa unitária (composta)', expr: 'k = produção / (recurso × tempo)', uso: 'Depois multiplique pelo novo cenário.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma equipe com 8 máquinas iguais produz um lote de peças em 12 dias, trabalhando 6 horas por dia. Se a empresa usar 6 dessas máquinas, mantendo a mesma jornada, o lote ficará pronto em',
        alternativas: ['9 dias', '10 dias', '14 dias', '16 dias', '18 dias'],
        correta: 'D',
        resolucao: [
          'Máquinas e dias são inversamente proporcionais: menos máquinas, mais dias.',
          'Capacidade total: 8 × 12 = 96 máquina-dia.',
          'Com 6 máquinas: 96 / 6 = 16 dias.',
        ],
        porqueErram: [
          'A e B: tratam como proporção direta (8/6 = 12/x) e reduzem os dias.',
          'C e E: arredondam ou aplicam a diferença de 2 máquinas linearmente sobre os dias.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Quatro pedreiros constroem 120 m² de muro em 6 dias. Mantendo o mesmo ritmo de trabalho, seis pedreiros construirão 180 m² de muro em',
        alternativas: ['4 dias', '5 dias', '6 dias', '8 dias', '9 dias'],
        correta: 'C',
        resolucao: [
          'Ritmo unitário: 120 / (4 × 6) = 5 m² por pedreiro por dia.',
          'Com 6 pedreiros, a produção diária é 30 m².',
          '180 / 30 = 6 dias.',
        ],
        porqueErram: [
          'A: inverte a relação e conclui que mais pedreiros sempre reduzem o tempo, mesmo com mais área.',
          'B e D: comparam apenas a área ou apenas o número de pedreiros.',
          'E: soma os dias dos dois cenários.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma gráfica tem 5 impressoras que imprimem 3.000 páginas em 4 horas. Se forem acrescentadas 3 impressoras idênticas, trabalhando por 8 horas, o total de páginas impressas será de',
        alternativas: ['4.800', '6.000', '9.600', '12.000', '15.000'],
        correta: 'C',
        resolucao: [
          'Produtividade unitária: 3.000 / (5 × 4) = 150 páginas por impressora-hora.',
          'Novo cenário: 8 impressoras × 8 horas = 64 impressora-hora.',
          '64 × 150 = 9.600 páginas.',
        ],
        porqueErram: [
          'A: dobra só as horas e mantém 5 impressoras.',
          'B: dobra as páginas por dobrar as horas.',
          'D e E: multiplicam página por impressora sem dividir pela produtividade unitária.',
        ],
      },
    ],
  },

  /* --------------------------------------------------- ESCALAS E SEMELHANÇA */
  'mat-escalas': {
    chave: [
      'Escala como razão de semelhança',
      'Conversão de unidades no mapa (cm → km)',
      'Área e volume variando ao quadrado e ao cubo do fator',
      'Semelhança de triângulos e Teorema de Tales',
      'Maquete, planta e ampliação de imagem',
    ],
    secoes: [
      {
        h: 'Escala é uma razão de comprimentos',
        ps: [
          'Escala 1:50.000 significa que 1 unidade no desenho corresponde a 50.000 unidades iguais no real. Vale para centímetro com centímetro, metro com metro. Como quase todo mapa vem em centímetros, o resultado sai em centímetros e precisa ser convertido: 100 cm = 1 m, 100.000 cm = 1 km.',
          'A leitura correta é sempre "1 cm no mapa equivale a tantos km no terreno". Fazer isso antes da conta elimina a etapa de conversão de última hora, que é onde a maioria erra por fator de 10 ou de 100.',
        ],
      },
      {
        h: 'Semelhança e o fator de ampliação',
        ps: [
          'Duas figuras são semelhantes quando os ângulos são iguais e os lados correspondentes guardam a mesma razão k. Em triângulos, basta reconhecer dois ângulos iguais para garantir a semelhança e montar a proporção entre os lados.',
          'O fator k vale para comprimentos, mas não para áreas nem volumes. Área cresce com k², volume com k³. Dobrar o lado de um quadrado quadruplica a área; dobrar o lado de um cubo multiplica o volume por 8. Essa é a pegadinha preferida do Enem em questões de maquete, mapa e ampliação de fotografia.',
        ],
      },
      {
        h: 'Tales, sombra e medidas inacessíveis',
        ps: [
          'O Teorema de Tales garante que retas paralelas cortadas por transversais geram segmentos proporcionais. Na prática, é o que permite medir altura de prédio pela sombra, largura de rio por triangulação e profundidade de poço com régua.',
          'O procedimento é montar a proporção entre os lados correspondentes e resolver a regra de três. A unidade do resultado é a mesma da medida conhecida, desde que as duas medidas homólogas estejam na mesma unidade.',
        ],
      },
      {
        h: 'Escala em mapas, plantas e maquetes',
        ps: [
          'Em planta de imóvel, escala 1:100 quer dizer que 1 cm equivale a 1 m. Em maquete de arquitetura, 1:200 é comum: um cômodo de 10 m vira 5 cm. Em mapas rodoviários, 1:1.000.000 aparece com frequência, e aí 1 cm representa 10 km.',
          'Quando a questão pede a área real, calcule a área no desenho, multiplique por k² e só então converta. Fazer a conversão linear primeiro e depois elevar ao quadrado é o caminho que gera erro de ordem de grandeza.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Distância no mapa',
        texto: 'Duas cidades estão a 8 cm em um mapa de escala 1:50.000.',
        comentario: '8 × 50.000 = 400.000 cm = 4.000 m = 4 km.',
      },
      {
        titulo: 'Ampliação e área',
        texto: 'Uma foto 10 × 15 cm foi ampliada mantendo a proporção, com o lado menor indo para 30 cm.',
        comentario: 'O fator é 3, então a área cresce 9 vezes: de 150 cm² para 1.350 cm².',
      },
    ],
    figuras: [
      {
        titulo: 'Como a escala age em cada grandeza',
        tipo: 'barras',
        itens: [
          { txt: 'Comprimento', valor: 1, unidade: '× k' },
          { txt: 'Área', valor: 9, unidade: '× k²' },
          { txt: 'Volume', valor: 27, unidade: '× k³' },
        ],
        legenda: 'Valores para k = 3: o comprimento triplica, a área multiplica por 9, o volume por 27.',
      },
    ],
    formulas: [
      { titulo: 'Escala', expr: 'E = d / D', uso: 'd = medida no desenho; D = medida real, na mesma unidade.' },
      { titulo: 'Área e volume com fator k', expr: 'A₂ = k²·A₁ ;  V₂ = k³·V₁', uso: 'Só o comprimento é linear.' },
      { titulo: 'Tales', expr: 'AB / A′B′ = BC / B′C′', uso: 'Retas paralelas cortadas por transversais.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Em um mapa de escala 1:50.000, a distância em linha reta entre duas cidades é de 8 cm. A distância real entre elas é de',
        alternativas: ['400 m', '4 km', '40 km', '400 km', '50 km'],
        correta: 'B',
        resolucao: [
          'Cada centímetro no mapa equivale a 50.000 cm no terreno.',
          '8 × 50.000 = 400.000 cm.',
          '400.000 cm ÷ 100.000 = 4 km.',
        ],
        porqueErram: [
          'A: erra a conversão e divide por 1.000 em vez de 100.000.',
          'C: multiplica por 5 (km) sem considerar os cinco zeros da escala.',
          'D e E: tratam a escala como razão entre áreas ou somam zeros.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um terreno retangular de 30 m × 40 m será representado em uma maquete na escala 1:200. A área do retângulo na maquete, em centímetros quadrados, será de',
        alternativas: ['30', '60', '120', '300', '1.200'],
        correta: 'D',
        resolucao: [
          'Escala 1:200 divide cada comprimento por 200. Em centímetros: 3.000 cm e 4.000 cm reais.',
          'Na maquete: 3.000/200 = 15 cm e 4.000/200 = 20 cm.',
          'Área na maquete: 15 × 20 = 300 cm². Conferindo pelo fator de área, 1.200 m² × (1/200)² = 0,03 m² = 300 cm².',
        ],
        porqueErram: [
          'A e B: aplicam o fator linear 1/200 só uma vez sobre a área, sem elevar ao quadrado.',
          'C: usa a média dos lados em vez do produto.',
          'E: devolve a área real em metros quadrados, sem escalar.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma torre projeta sombra de 12 m no mesmo instante em que uma estaca vertical de 1,5 m projeta sombra de 2 m. A altura da torre é de',
        alternativas: ['6 m', '8 m', '9 m', '12 m', '16 m'],
        correta: 'C',
        resolucao: [
          'Os triângulos formados são semelhantes: altura e sombra guardam a mesma razão.',
          'h / 12 = 1,5 / 2.',
          'h = 12 × 0,75 = 9 m.',
        ],
        porqueErram: [
          'A: inverte a proporção (12 × 2 / 1,5 ≈ 16, que é a alternativa E).',
          'B e D: usam a diferença entre sombra e altura da estaca.',
          'E: aplica a proporção invertida.',
        ],
      },
    ],
  },

  /* -------------------------------------------------- MATEMÁTICA FINANCEIRA */
  'mat-financeira': {
    chave: [
      'Juros simples × juros compostos',
      'Montante, capital e taxa na mesma unidade de tempo',
      'Taxa mensal × taxa anual (proporcional e equivalente)',
      'Desconto simples e valor presente',
      'Comparação de investimentos e custo efetivo',
    ],
    secoes: [
      {
        h: 'Juros simples: sempre sobre o capital inicial',
        ps: [
          'No regime simples, o juro de cada período é calculado sobre o capital inicial, sem incorporar os juros anteriores. Por isso o crescimento é linear: J = C · i · t, e o montante é M = C + J. Dobrar o tempo dobra o juro, e a taxa precisa estar na mesma unidade de tempo do período.',
          'É o regime usado em desconto de boleto, cheque pré-datado e em algumas dívidas de cartão. No Enem, aparece muito em questões de comparação com o regime composto.',
        ],
      },
      {
        h: 'Juros compostos: juro sobre juro',
        ps: [
          'No regime composto, os juros de cada período são incorporados ao capital e passam a render no período seguinte. O montante é M = C(1 + i)^t, um crescimento exponencial. É o regime de financiamentos, empréstimos, aplicações e cartão de crédito.',
          'Comparar os dois regimes na mesma taxa e no mesmo prazo é questão frequente: o composto sempre supera o simples a partir do segundo período. A diferença cresce rápido — a 10% ao mês, em 12 meses o composto rende mais que o dobro do simples no mesmo período proporcional.',
        ],
      },
      {
        h: 'Taxas, prazos e unidades',
        ps: [
          'A regra de ouro é colocar taxa e tempo na mesma unidade. Em juros simples, 2% ao mês por 1 ano equivale a 24% ao ano (taxa proporcional). Em juros compostos, 2% ao mês não equivale a 24% ao ano: (1,02)^12 ≈ 1,268, ou seja, 26,8% ao ano (taxa equivalente).',
          'Cuidado também com o INCC, IGP-M e outros índices usados como correção: eles são aplicados em cascata, então a inflação acumulada do ano é o produto dos fatores mensais, não a soma das taxas.',
        ],
      },
      {
        h: 'Desconto, valor presente e decisão',
        ps: [
          'Desconto simples comercial é calculado sobre o valor nominal: A = N(1 − i·t). Desconto racional é calculado sobre o valor atual. Em prova, o enunciado quase sempre diz "desconto sobre o valor da fatura", indicando o comercial.',
          'Na comparação de investimentos, o critério é o montante final ou a taxa efetiva no período. Duas aplicações com a mesma taxa nominal podem ter rendimento diferente se os juros forem capitalizados com frequência diferente — quanto mais capitalizações, maior o rendimento.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Simples: R$ 2.000 a 2% ao mês',
        texto: 'Capital de R$ 2.000,00, taxa de 2% ao mês, prazo de 5 meses, juros simples.',
        comentario: 'J = 2000 × 0,02 × 5 = R$ 200,00 → montante de R$ 2.200,00.',
      },
      {
        titulo: 'Composto: R$ 1.000 a 10% ao ano',
        texto: 'Mesmo capital por 2 anos, agora com juros compostos de 10% ao ano.',
        comentario: 'M = 1.000 × 1,10² = R$ 1.210,00. No simples, seriam R$ 1.200,00: R$ 10 de diferença já no segundo ano.',
      },
      {
        titulo: 'Cartão de crédito',
        texto: 'Uma fatura de R$ 1.000 não paga e rotativa a 12% ao mês por 3 meses.',
        comentario: 'M = 1.000 × 1,12³ ≈ R$ 1.404,93. É por isso que a dívida de cartão cresce tão rápido.',
      },
    ],
    figuras: [
      {
        titulo: 'Simples × composto em 5 períodos (10% ao período)',
        tipo: 'barras',
        itens: [
          { txt: 'Juros simples', valor: 50 },
          { txt: 'Juros compostos', valor: 61 },
        ],
        legenda: 'Rendimento em % do capital, para uma taxa de 10% em 5 períodos.',
      },
    ],
    formulas: [
      { titulo: 'Juros simples', expr: 'J = C · i · t ;  M = C(1 + i·t)', uso: 'i e t na mesma unidade de tempo.' },
      { titulo: 'Juros compostos', expr: 'M = C(1 + i)^t', uso: 'Crescimento exponencial, juro sobre juro.' },
      { titulo: 'Taxa equivalente', expr: '(1 + i_m)^12 = 1 + i_a', uso: 'Vale só no regime composto.' },
      { titulo: 'Desconto comercial simples', expr: 'A = N(1 − i·t)', uso: 'N = valor nominal; A = valor atual.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um capital de R$ 2.000,00 foi aplicado a juros simples de 2% ao mês durante 5 meses. O montante ao final do período será de',
        alternativas: ['R$ 2.020,00', 'R$ 2.100,00', 'R$ 2.200,00', 'R$ 2.208,16', 'R$ 2.400,00'],
        correta: 'C',
        resolucao: [
          'Juros por mês: 2.000 × 0,02 = R$ 40,00.',
          'Em 5 meses: 5 × 40 = R$ 200,00.',
          'Montante: 2.000 + 200 = R$ 2.200,00.',
        ],
        porqueErram: [
          'A: aplica 1% ou divide a taxa por 5.',
          'B: usa 5% por 5 meses em vez de 2%.',
          'D: usa juros compostos (2.000 × 1,02⁵ ≈ 2.208,16) — o enunciado diz simples.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um investimento de R$ 1.000,00 rende juros compostos de 10% ao ano. Ao final de dois anos, o montante será de',
        alternativas: ['R$ 1.100,00', 'R$ 1.200,00', 'R$ 1.210,00', 'R$ 1.220,00', 'R$ 1.331,00'],
        correta: 'C',
        resolucao: [
          'Primeiro ano: 1.000 × 1,10 = 1.100.',
          'Segundo ano incide sobre 1.100: 1.100 × 1,10 = 1.210.',
          'Ou direto: M = 1.000 × 1,10² = 1.210.',
        ],
        porqueErram: [
          'B: usa juros simples (20% em dois anos) e ignora o juro sobre juro.',
          'A: considera apenas um ano.',
          'D: arredonda a taxa para 11% ao ano. E: aplica três anos.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma loja oferece duas opções para o mesmo produto de R$ 1.000,00: pagar à vista com 5% de desconto ou pagar em 30 dias sem desconto, aplicando o dinheiro a 3% no mês. Em relação ao pagamento à vista, quem escolhe pagar em 30 dias',
        alternativas: ['ganha R$ 20,00', 'perde R$ 20,00', 'ganha R$ 50,00', 'perde R$ 50,00', 'empata'],
        correta: 'B',
        resolucao: [
          'À vista: 1.000 × 0,95 = R$ 950,00.',
          'Pagando depois: aplica R$ 950 por um mês a 3% → 950 × 1,03 = R$ 978,50, e paga R$ 1.000.',
          'Resultado: R$ 978,50 − R$ 1.000,00 = −R$ 21,50, ou seja, perde cerca de R$ 20,00.',
        ],
        porqueErram: [
          'A: compara 3% de rendimento com nada, esquecendo o desconto à vista.',
          'C e D: comparam os 5% de desconto com os 3% de rendimento sem trazer os dois para o mesmo instante.',
          'E: arredonda as duas taxas como equivalentes.',
        ],
      },
    ],
  },

  /* ------------------------------------------------- GRÁFICOS E TABELAS */
  'mat-graficos': {
    chave: [
      'Ler título, eixos, unidade e legenda antes de olhar o desenho',
      'Escalas: eixo truncado e gráfico que engana',
      'Barras, linhas, pizza e dispersão: o que cada um mostra',
      'Taxa de variação entre dois pontos',
      'Total × média × porcentagem (o que o gráfico mostra e o que não mostra)',
    ],
    secoes: [
      {
        h: 'Ler um gráfico é ler um texto com regras',
        ps: [
          'Todo gráfico tem cinco partes que precisam ser lidas antes da pergunta: título, eixo horizontal, eixo vertical, unidade e legenda. Sem esse reconhecimento, a alternativa "bonita" ganha da alternativa correta. No Enem, boa parte dos erros em gráfico não é de matemática, é de leitura.',
          'A pergunta que a prova faz quase sempre é uma de quatro: qual é o valor em um ponto, qual foi a maior variação, quanto variou em porcentagem, ou qual afirmação é sustentada pelos dados. Identifique qual das quatro está sendo pedida antes de fazer conta.',
        ],
      },
      {
        h: 'Escalas, eixo truncado e área que engana',
        ps: [
          'Quando o eixo vertical não começa no zero, o gráfico de barras exagera diferenças: uma barra de 10 e outra de 12 parecem muito diferentes se o eixo começa em 9. Gráficos de linha com eixo quebrado são comuns em notícia e aparecem em questão que cobra justamente a leitura crítica.',
          'Gráfico de área também engana: dobrar o raio de um círculo dobra o desenho, mas quadruplica a área representada. Em pictogramas, o número de ícones deve ser lido, não o tamanho de cada ícone.',
        ],
      },
      {
        h: 'Barras, linhas, pizza e dispersão',
        ps: [
          'Barras comparam categorias; linhas mostram evolução no tempo; pizza mostra composição de um total (e a soma dos setores precisa dar 100%); dispersão mostra relação entre duas variáveis. Misturar os papéis é erro de leitura: "maior barra" não significa "maior crescimento".',
          'Em séries temporais, o crescimento absoluto é a diferença entre dois pontos; o crescimento relativo é essa diferença dividida pelo valor inicial. A questão frequentemente pede o período de maior crescimento percentual, e não o de maior valor.',
        ],
      },
      {
        h: 'Total, média e proporção',
        ps: [
          'Um gráfico pode mostrar a média e não o total: se a população de cada região é diferente, a maior média não implica o maior número absoluto. Confundir média com total é a pegadinha mais recorrente em questões de demografia e economia.',
          'Do mesmo modo, quando a legenda está em porcentagem, some as partes para saber o total real. Duas categorias com 30% e 20% somam 50% do total — não 50 unidades.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Crescimento absoluto × relativo',
        texto: 'Uma cidade passa de 20 mil para 25 mil habitantes; outra, de 200 mil para 210 mil.',
        comentario: 'A primeira cresceu 25% (5 mil); a segunda, 5% (10 mil). O maior crescimento absoluto não é o maior relativo.',
      },
      {
        titulo: 'Pizza com armadilha',
        texto: 'Um gráfico de setores mostra 45% para transporte, 25% para alimentação e 20% para moradia.',
        comentario: 'O setor que falta vale 10%. O ângulo de 45% é 0,45 × 360° = 162°.',
      },
    ],
    figuras: [
      {
        titulo: 'Roteiro de leitura',
        tipo: 'fluxo',
        itens: ['Título e fonte', 'Eixos e unidade', 'Legenda e categorias', 'Ponto pedido ou período pedido', 'Tipo de variação: absoluta ou relativa'],
        legenda: 'Cinco etapas que resolvem a maior parte das questões de gráfico do Enem.',
      },
    ],
    formulas: [
      { titulo: 'Variação absoluta', expr: 'Δ = Vf − Vi', uso: 'Diferença entre dois pontos da série.' },
      { titulo: 'Variação relativa', expr: 'Δ% = (Vf − Vi) / Vi × 100', uso: 'Compara crescimentos de bases diferentes.' },
      { titulo: 'Ângulo do setor', expr: 'α = p × 360°', uso: 'p = fração do total (45% → 0,45).' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Uma rede de lojas registrou as vendas anuais: 2019 — R$ 400 mil; 2020 — R$ 320 mil; 2021 — R$ 480 mil; 2022 — R$ 520 mil.'],
        enunciado: 'O maior crescimento percentual de um ano para o outro ocorreu entre',
        alternativas: ['2019 e 2020', '2020 e 2021', '2021 e 2022', '2020 e 2022', 'não houve crescimento'],
        correta: 'B',
        resolucao: [
          'Calcule a variação relativa de cada ano: 2019→2020 = (320−400)/400 = −20%.',
          '2020→2021 = (480−320)/320 = +50%.',
          '2021→2022 = (520−480)/480 ≈ +8,3%. O maior crescimento relativo é o de 2020 para 2021, a despeito de 2021→2022 ter o maior valor absoluto.',
        ],
        porqueErram: [
          'A: tem a maior queda, não o maior crescimento.',
          'C: confunde maior valor com maior crescimento.',
          'D: compara período de dois anos com períodos de um ano. E: nega a alta de 2021.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Um gráfico de setores apresenta o orçamento familiar mensal de R$ 4.000,00: moradia 35%, alimentação 25%, transporte 20%, educação 12% e demais despesas o restante.'],
        enunciado: 'O valor destinado às demais despesas e o ângulo do setor correspondente são, respectivamente,',
        alternativas: ['R$ 320,00 e 28,8°', 'R$ 480,00 e 43,2°', 'R$ 800,00 e 72°', 'R$ 320,00 e 32°', 'R$ 400,00 e 36°'],
        correta: 'A',
        resolucao: [
          'Some as porcentagens conhecidas: 35 + 25 + 20 + 12 = 92%.',
          'O restante é 8%, que em reais vale 0,08 × 4.000 = R$ 320,00.',
          'O ângulo é 0,08 × 360° = 28,8°.',
        ],
        porqueErram: [
          'B: calcula 12% em reais e 12% de 360°.',
          'C: usa 20% (transporte). D: acerta o valor e erra o ângulo. E: usa 10%.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Um gráfico de barras compara a nota média de duas escolas: A = 620 e B = 640. O eixo vertical começa em 600.'],
        enunciado: 'Sobre a leitura desse gráfico, é correto afirmar que',
        alternativas: [
          'a diferença real entre as médias é de 20 pontos, mas a barra de B parece muito maior por causa da escala',
          'a escola B tem média 20 vezes maior que a escola A',
          'as duas escolas têm a mesma média, pois o eixo começa em 600',
          'o eixo truncado não altera a percepção visual do gráfico',
          'a barra de B é o dobro da barra de A',
        ],
        correta: 'A',
        resolucao: [
          'A diferença verdadeira é 640 − 620 = 20 pontos, cerca de 3% de variação.',
          'Com o eixo começando em 600, as alturas desenhadas são proporcionais a 20 e 40, ou seja, a barra de B parece o dobro.',
          'Conclusão: a escala amplia a percepção da diferença, sem mudar os valores.',
        ],
        porqueErram: [
          'B: confunde razão das alturas com razão das médias.',
          'C: ignora que os valores estão escritos.',
          'D: nega o efeito que a questão quer discutir. E: o desenho é que tem dobro de altura, não o valor.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------ MÉDIA, MODA E MEDIANA */
  'mat-medidas': {
    chave: [
      'Média simples e média ponderada',
      'Mediana: posição no conjunto ordenado',
      'Moda e conjuntos multimodais',
      'Efeito de valores extremos (outliers)',
      'Média de médias: quando não se pode tirar a média direto',
    ],
    secoes: [
      {
        h: 'Média aritmética e média ponderada',
        ps: [
          'A média aritmética simples soma todos os valores e divide pela quantidade. A ponderada multiplica cada valor pelo seu peso, soma e divide pela soma dos pesos — é o que a escola faz com notas de pesos diferentes e o que o Enem faz com médias de áreas de conhecimento.',
          'Média é sensível a valores extremos: um único salário muito alto puxa a média para cima sem representar o grupo. Por isso o IBGE publica mediana de renda, e por isso a prova pede para comparar as duas medidas.',
        ],
      },
      {
        h: 'Mediana: o valor do meio',
        ps: [
          'Para achar a mediana, ordene os dados. Com quantidade ímpar, a mediana é o valor central; com quantidade par, é a média dos dois centrais. A mediana não é afetada por valores extremos, o que a torna a medida adequada para distribuições assimétricas.',
          'Em listas grandes, a posição da mediana é (n + 1)/2 quando n é ímpar. Se n = 9, a mediana é o 5º valor. Se n = 10, a mediana é a média do 5º com o 6º.',
        ],
      },
      {
        h: 'Moda',
        ps: [
          'Moda é o valor (ou valores) mais frequente. Um conjunto pode ser amodal (todos os valores aparecem o mesmo número de vezes), bimodal ou multimodal. A moda é a única medida que funciona para dados qualitativos: cor preferida, marca mais vendida, time mais citado.',
          'Em gráfico e tabela, a moda é a maior frequência — não o maior valor. Essa confusão aparece sempre que a tabela tem valores negativos ou escalas invertidas.',
        ],
      },
      {
        h: 'Qual medida usar',
        ps: [
          'Média representa bem conjuntos simétricos e permite cálculo algébrico. Mediana descreve melhor o "cidadão típico" quando há concentração de renda ou valores discrepantes. Moda descreve o mais comum, inclusive em variáveis categóricas.',
          'Média de médias só é permitida quando os grupos têm o mesmo tamanho. Se um grupo tem 10 pessoas e outro 100, é preciso ponderar pelos tamanhos — caso contrário, a média geral sai errada.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Média ponderada de notas',
        texto: 'Notas 6 (peso 1), 8 (peso 2) e 9 (peso 3).',
        comentario: '(6×1 + 8×2 + 9×3) / 6 = (6 + 16 + 27)/6 = 49/6 ≈ 8,17.',
      },
      {
        titulo: 'Média contra mediana',
        texto: 'Salários: 1.000, 1.000, 1.200, 1.500 e 20.000.',
        comentario: 'Média = 4.940; mediana = 1.200. A mediana representa o grupo; a média é distorcida pelo valor extremo.',
      },
    ],
    figuras: [
      {
        titulo: 'Efeito de um valor extremo',
        tipo: 'barras',
        itens: [
          { txt: 'Média', valor: 4940 },
          { txt: 'Mediana', valor: 1200 },
        ],
        legenda: 'Mesmo conjunto de cinco salários: a média salta com um único valor alto.',
      },
    ],
    formulas: [
      { titulo: 'Média simples', expr: 'x̄ = (x₁ + x₂ + … + xₙ) / n', uso: 'Todos os valores com o mesmo peso.' },
      { titulo: 'Média ponderada', expr: 'x̄ = Σ(xᵢ·pᵢ) / Σpᵢ', uso: 'Notas com pesos diferentes.' },
      { titulo: 'Posição da mediana', expr: 'p = (n + 1) / 2', uso: 'Depois de ordenar os dados.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um aluno obteve notas 6, 8 e 9 em três avaliações com pesos 1, 2 e 3, respectivamente. A média ponderada é de aproximadamente',
        alternativas: ['7,7', '8,0', '8,2', '8,5', '9,0'],
        correta: 'C',
        resolucao: [
          'Multiplique cada nota pelo peso: 6×1 = 6; 8×2 = 16; 9×3 = 27.',
          'Some os produtos: 6 + 16 + 27 = 49, e os pesos: 1 + 2 + 3 = 6.',
          'Divida: 49/6 ≈ 8,17, que arredonda para 8,2.',
        ],
        porqueErram: [
          'A e B: fazem média simples (23/3 ≈ 7,67) ou arredondam para 8,0.',
          'D e E: usam apenas a maior nota ou trocam os pesos.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'As idades dos participantes de uma oficina são 19, 21, 22, 24, 25, 27 e 31 anos. A mediana e a média dessas idades são, respectivamente,',
        alternativas: ['24 e 24', '24 e 24,14', '25 e 24,14', '24,5 e 24,14', '25 e 25'],
        correta: 'B',
        resolucao: [
          'São 7 valores já em ordem; a mediana é o 4º: 24.',
          'Soma: 19 + 21 + 22 + 24 + 25 + 27 + 31 = 169.',
          'Média: 169/7 ≈ 24,14. Como o conjunto é quase simétrico, as duas medidas ficam próximas.',
        ],
        porqueErram: [
          'A: arredonda a média para 24 e iguala as medidas.',
          'C e D: calculam a mediana como média dos centrais em conjunto de quantidade ímpar.',
          'E: usa a moda (não há) ou o valor central da lista não ordenada.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Em uma empresa com cinco funcionários, os salários são R$ 1.000,00, R$ 1.000,00, R$ 1.200,00, R$ 1.500,00 e R$ 20.000,00.'],
        enunciado: 'A medida que melhor representa o salário típico dos funcionários é',
        alternativas: ['a média, R$ 4.940,00', 'a mediana, R$ 1.200,00', 'a moda, R$ 1.000,00', 'a média, R$ 1.500,00', 'a mediana, R$ 1.500,00'],
        correta: 'B',
        resolucao: [
          'A média é puxada pelo valor extremo de R$ 20.000,00: 24.700/5 = R$ 4.940,00.',
          'A mediana, com cinco valores ordenados, é o terceiro: R$ 1.200,00.',
          'Como a distribuição é muito assimétrica, a mediana representa melhor o grupo. A moda existe (R$ 1.000,00), mas descreve só o valor mais repetido, não o centro.',
        ],
        porqueErram: [
          'A e D: usam média em distribuição assimétrica ou erram a conta.',
          'C: a moda é válida como "mais comum", porém não representa o centro da distribuição.',
          'E: erra a posição da mediana.',
        ],
      },
    ],
  },

  /* --------------------------------------------------------- GEOMETRIA PLANA */
  'mat-geo-plana': {
    chave: [
      'Áreas das figuras planas e suas decomposições',
      'Perímetro × área',
      'Teorema de Pitágoras e triângulo retângulo',
      'Círculo, circunferência e setor circular',
      'Semelhança e polígonos regulares',
    ],
    secoes: [
      {
        h: 'Área é superfície; perímetro é contorno',
        ps: [
          'Perímetro é a soma dos lados, medido em unidades de comprimento; área é a superfície ocupada, em unidades ao quadrado. Figuras diferentes podem ter o mesmo perímetro e áreas muito diferentes — entre todos os retângulos de perímetro fixo, o quadrado tem a maior área.',
          'As áreas do Enem quase nunca aparecem como figura pura: aparecem como terreno com canto recortado, piscina com borda, sala em L. O caminho é decompor em retângulos, triângulos e setores, calcular cada parte e somar (ou subtrair).',
        ],
      },
      {
        h: 'Triângulos e Pitágoras',
        ps: [
          'A área do triângulo é base × altura / 2, com a altura sempre perpendicular à base escolhida. Em triângulo retângulo, os catetos servem de base e altura um do outro, o que simplifica a conta.',
          'O Teorema de Pitágoras, a² = b² + c², vale apenas em triângulo retângulo e é a ferramenta para diagonais, escadas, rampas e distâncias. Os ternos pitagóricos mais usados são 3-4-5, 5-12-13, 8-15-17 e 7-24-25, e seus múltiplos.',
        ],
      },
      {
        h: 'Círculo e setor',
        ps: [
          'A área do círculo é πr² e o comprimento da circunferência é 2πr. O setor circular é uma fração do círculo: área = (α/360°)·πr². A coroa circular é a diferença entre dois círculos concêntricos, caminho clássico de questão sobre pista de atletismo e borda de piscina.',
          'Em prova, π costuma vir como 3, 3,14 ou como opção em termos de π. Deixar a resposta em função de π evita erro de arredondamento e costuma ser o que as alternativas esperam.',
        ],
      },
      {
        h: 'Polígonos regulares e semelhança',
        ps: [
          'A soma dos ângulos internos de um polígono de n lados é (n − 2)·180°, e em polígono regular cada ângulo interno vale essa soma dividida por n. O hexágono regular se decompõe em seis triângulos equiláteros, o que resolve área sem fórmula decorada.',
          'Figuras semelhantes mantêm ângulos e proporção entre lados. Se a razão entre lados é k, a razão entre áreas é k². Nunca aplique a razão linear diretamente sobre área.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Sala em L',
        texto: 'Um cômodo tem 5 m × 4 m com um recorte de 2 m × 1,5 m.',
        comentario: 'Área = 20 − 3 = 17 m². Decompor e subtrair é mais rápido que tentar uma fórmula única.',
      },
      {
        titulo: 'Escada e parede',
        texto: 'Uma escada de 5 m está apoiada a 3 m da parede. A que altura ela toca a parede?',
        comentario: '5² = 3² + h² → h = 4 m. Terno 3-4-5.',
      },
    ],
    figuras: [
      {
        titulo: 'Áreas para decorar (e de onde vêm)',
        tipo: 'camadas',
        itens: [
          { txt: 'Triângulo', nota: 'b·h/2 — metade do retângulo de mesma base e altura' },
          { txt: 'Trapézio', nota: '(B + b)·h/2 — média das bases vezes a altura' },
          { txt: 'Círculo', nota: 'πr²; setor = (α/360°)·πr²' },
        ],
        legenda: 'Saber a origem da fórmula evita esquecer qual lado entra na conta.',
      },
    ],
    formulas: [
      { titulo: 'Triângulo', expr: 'A = b · h / 2', uso: 'Altura perpendicular à base.' },
      { titulo: 'Trapézio', expr: 'A = (B + b) · h / 2', uso: 'B e b são as bases paralelas.' },
      { titulo: 'Círculo e setor', expr: 'A = πr² ;  A_setor = (α/360°)·πr²', uso: 'α em graus.' },
      { titulo: 'Pitágoras', expr: 'a² = b² + c²', uso: 'Somente em triângulo retângulo; a é a hipotenusa.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um terreno tem a forma de trapézio com bases de 18 m e 12 m e altura de 10 m. A área do terreno é de',
        alternativas: ['120 m²', '150 m²', '180 m²', '240 m²', '300 m²'],
        correta: 'B',
        resolucao: [
          'Fórmula do trapézio: A = (B + b)·h/2.',
          'Substitua: (18 + 12) × 10 / 2 = 30 × 10 / 2.',
          'A = 150 m².',
        ],
        porqueErram: [
          'A: usa só a base menor vezes a altura.',
          'C: multiplica as bases e divide por 2 sem somar.',
          'D: faz B × h sem dividir. E: soma os lados como se fosse retângulo.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma escada de 5 metros está apoiada em uma parede vertical, com a base a 3 metros da parede. A altura que a escada alcança na parede é de',
        alternativas: ['2 m', '3 m', '4 m', '4,5 m', '5,8 m'],
        correta: 'C',
        resolucao: [
          'A escada é a hipotenusa: 5² = 3² + h².',
          '25 = 9 + h² → h² = 16.',
          'h = 4 m (terno pitagórico 3-4-5).',
        ],
        porqueErram: [
          'A: subtrai 5 − 3.',
          'B: repete a distância da parede.',
          'D e E: somam ou aplicam a hipotenusa como cateto (√34 ≈ 5,8).',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma praça circular de raio 10 m terá um setor de 90° pavimentado. A área pavimentada, em m², é de aproximadamente',
        alternativas: ['15,7', '31,4', '78,5', '157', '314'],
        correta: 'C',
        resolucao: [
          'Área do círculo: πr² = 3,14 × 100 = 314 m².',
          'O setor de 90° é 90/360 = 1/4 do círculo.',
          '314 / 4 = 78,5 m².',
        ],
        porqueErram: [
          'A: calcula o comprimento do arco (2πr/4 ≈ 15,7).',
          'B: usa metade do círculo.',
          'D e E: devolvem metade ou o círculo inteiro.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------ GEOMETRIA ESPACIAL */
  'mat-geo-espacial': {
    chave: [
      'Volume de prismas, cilindros, pirâmides e cones',
      'Área total e área lateral (planificação)',
      'Relação entre dm³, litro e cm³',
      'Relação de Euler e contagem de faces',
      'Ampliação: volume cresce ao cubo',
    ],
    secoes: [
      {
        h: 'Volume: a regra do "área da base × altura"',
        ps: [
          'Prismas e cilindros têm volume V = área da base × altura. Pirâmides e cones têm exatamente um terço disso: V = A_base × h / 3. Guardar a lógica — "prisma cheio" contra "pirâmide que cabe três vezes" — resolve toda a família de sólidos sem decorar quatro fórmulas separadas.',
          'A esfera foge do padrão: V = 4πr³/3. Em prova, aparece combinada com cilindro (bola dentro de copo) ou com meia esfera (tigela, cúpula).',
        ],
      },
      {
        h: 'Capacidade e unidades',
        ps: [
          'A ponte entre geometria e vida real é a capacidade: 1 dm³ = 1 L e 1 m³ = 1.000 L. Como 1 dm = 10 cm, 1 dm³ = 1.000 cm³. Portanto, 1 L = 1.000 cm³ e 1 mL = 1 cm³.',
          'Toda questão de caixa d\'água, piscina, garrafa e reservatório passa por essa conversão. Errar o fator de 1.000 transforma 24 L em 24.000 L e derruba a questão.',
        ],
      },
      {
        h: 'Área total: planificar antes de calcular',
        ps: [
          'Área total é a soma das áreas de todas as faces. O caminho seguro é imaginar o sólido aberto e plano: o cilindro vira dois círculos mais um retângulo de base 2πr e altura h. O cone vira um círculo mais um setor de raio igual à geratriz.',
          'Cuidado com o pedido: "área lateral" exclui as bases, "área da superfície" inclui, e "quantos metros de lona" pode excluir a face apoiada no chão. Ler o que se quer cobrir é metade da questão.',
        ],
      },
      {
        h: 'Euler, faces e ampliação',
        ps: [
          'Em poliedros convexos vale V − A + F = 2, relação de Euler, usada quando a questão dá faces e arestas e pede vértices. Para contar faces sem errar, conte por tipo (base, laterais, topo).',
          'Ampliação de sólido: se todos os comprimentos são multiplicados por k, a área multiplica por k² e o volume por k³. Dobrar as dimensões de uma caixa multiplica o volume por 8 — é o que explica por que uma garrafa "só um pouco maior" cabe muito mais líquido.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Caixa em litros',
        texto: 'Caixa de 20 cm × 30 cm × 40 cm.',
        comentario: 'V = 24.000 cm³ = 24 dm³ = 24 L.',
      },
      {
        titulo: 'Cilindro com raio 10 cm e altura 20 cm',
        texto: 'Quantos litros cabem?',
        comentario: 'V = π·100·20 ≈ 6.280 cm³ ≈ 6,28 L.',
      },
    ],
    figuras: [
      {
        titulo: 'Família dos volumes',
        tipo: 'camadas',
        itens: [
          { txt: 'Prisma e cilindro', nota: 'V = A_base × h' },
          { txt: 'Pirâmide e cone', nota: 'V = A_base × h / 3' },
          { txt: 'Esfera', nota: 'V = 4πr³/3' },
        ],
        legenda: 'As três fórmulas cobrem todo sólido que aparece no Enem.',
      },
    ],
    formulas: [
      { titulo: 'Prisma e cilindro', expr: 'V = A_b · h', uso: 'Cilindro: A_b = πr².' },
      { titulo: 'Pirâmide e cone', expr: 'V = A_b · h / 3', uso: 'Cone: A_b = πr²; geratriz g² = r² + h².' },
      { titulo: 'Esfera', expr: 'V = 4πr³/3 ;  A = 4πr²', uso: 'Volume e superfície.' },
      { titulo: 'Euler', expr: 'V − A + F = 2', uso: 'Poliedros convexos.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma caixa-d\'água em forma de paralelepípedo tem 20 cm de comprimento, 30 cm de largura e 40 cm de altura. Sua capacidade, em litros, é de',
        alternativas: ['2,4', '6', '12', '24', '240'],
        correta: 'D',
        resolucao: [
          'Volume: 20 × 30 × 40 = 24.000 cm³.',
          'Como 1 dm³ = 1.000 cm³, então 24.000 cm³ = 24 dm³.',
          'E 1 dm³ = 1 L, logo a capacidade é 24 L.',
        ],
        porqueErram: [
          'A: erra a conversão em um fator de 10.',
          'B e C: usam apenas duas dimensões ou trocam o fator de conversão.',
          'E: multiplica por 10 em vez de dividir por 1.000.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um reservatório cilíndrico tem raio de 10 cm e altura de 20 cm. Usando π ≈ 3,14, sua capacidade aproximada, em litros, é de',
        alternativas: ['0,628', '3,14', '6,28', '62,8', '628'],
        correta: 'C',
        resolucao: [
          'Área da base: πr² = 3,14 × 100 = 314 cm².',
          'Volume: 314 × 20 = 6.280 cm³.',
          '6.280 cm³ = 6,28 L.',
        ],
        porqueErram: [
          'A: divide por 10.000 em vez de 1.000.',
          'B: usa a área da base como volume.',
          'D e E: multiplicam por 10 e por 100 na conversão.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma embalagem cúbica teve todas as suas dimensões dobradas. Em relação à original, a nova embalagem tem volume',
        alternativas: ['2 vezes maior', '4 vezes maior', '6 vezes maior', '8 vezes maior', '9 vezes maior'],
        correta: 'D',
        resolucao: [
          'Volume do cubo: a³.',
          'Com o lado dobrado: (2a)³ = 8a³.',
          'Portanto o volume fica 8 vezes maior, e a área 4 vezes maior (fator ao quadrado).',
        ],
        porqueErram: [
          'A: aplica o fator linear ao volume.',
          'B: confunde com a área.',
          'C e E: somam faces ou aplicam o fator na superfície total.',
        ],
      },
    ],
  },

  /* --------------------------------------------------------- FUNÇÃO DO 1º GRAU */
  'mat-funcao-1': {
    chave: [
      'Lei de formação y = ax + b e significado de a e b',
      'Taxa de variação constante',
      'Raiz da função e ponto de encontro',
      'Função crescente e decrescente',
      'Modelagem: tarifa, custo, salário e corrida de aplicativo',
    ],
    secoes: [
      {
        h: 'O que a função do 1º grau descreve',
        ps: [
          'A função afim y = ax + b modela tudo que cresce (ou decresce) a uma taxa constante. O coeficiente a é a taxa de variação — quanto y muda quando x aumenta 1. O coeficiente b é o valor inicial, o que se paga mesmo com x = 0.',
          'No Enem, a leitura é sempre no contexto: em uma corrida de aplicativo, b é a taxa de chamada e a é o preço por quilômetro; em um plano de celular, b é a mensalidade e a é o custo por gigabyte excedente.',
        ],
      },
      {
        h: 'Gráfico, raiz e sinal',
        ps: [
          'O gráfico é uma reta. Se a > 0, a reta sobe; se a < 0, desce; se a = 0, é horizontal (função constante). O coeficiente b indica onde a reta corta o eixo y. A raiz é o x que zera a função: ax + b = 0 → x = −b/a.',
          'Entre duas funções, o ponto de encontro resolve o clássico "a partir de quantas unidades o plano B fica mais barato": iguale as duas leis e resolva a equação de 1º grau.',
        ],
      },
      {
        h: 'Encontrar a lei a partir de dois pontos',
        ps: [
          'Com dois pontos (x₁, y₁) e (x₂, y₂), a taxa de variação é a = (y₂ − y₁)/(x₂ − x₁). Depois, substitua um dos pontos para achar b. Esse é o caminho mais cobrado quando a questão dá uma tabela com duas linhas completas.',
          'Se a questão diz que o valor em x = 0 é 30, já está dado b = 30. Se diz que cada unidade acrescenta 5, já está dado a = 5. Traduzir o enunciado para os coeficientes economiza metade do tempo.',
        ],
      },
      {
        h: 'Inequações e comparação de planos',
        ps: [
          'Perguntas do tipo "a partir de quantos minutos o plano A sai mais caro" são inequações: a₁x + b₁ > a₂x + b₂. Resolver é isolar x, com atenção ao sinal quando se divide por número negativo.',
          'Em contexto de custo, o domínio costuma ter restrições: x não pode ser negativo, e muitas vezes é inteiro (número de pessoas, de horas). Conferir se a resposta faz sentido no contexto é parte da correção.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Corrida de aplicativo',
        texto: 'Bandeirada de R$ 5,00 mais R$ 2,50 por km.',
        comentario: 'y = 2,50x + 5. Em 12 km: 2,50 × 12 + 5 = R$ 35,00.',
      },
      {
        titulo: 'Comparar planos',
        texto: 'Plano A: 40 + 0,50x. Plano B: 60 + 0,30x. Quando B fica mais barato?',
        comentario: '60 + 0,30x < 40 + 0,50x → 20 < 0,20x → x > 100. A partir de 101 unidades.',
      },
    ],
    figuras: [
      {
        titulo: 'Anatomia de y = ax + b',
        tipo: 'camadas',
        itens: [
          { txt: 'a — taxa de variação', nota: 'quanto y muda por unidade de x; sinal define subida ou descida' },
          { txt: 'b — valor inicial', nota: 'onde a reta cruza o eixo y (x = 0)' },
          { txt: '−b/a — raiz', nota: 'ponto em que y se anula' },
        ],
        legenda: 'Ler o contexto e identificar a e b resolve a maior parte das questões.',
      },
    ],
    formulas: [
      { titulo: 'Lei da função afim', expr: 'y = a x + b', uso: 'a = taxa de variação; b = valor inicial.' },
      { titulo: 'Taxa por dois pontos', expr: 'a = (y₂ − y₁) / (x₂ − x₁)', uso: 'Depois substitua um ponto para achar b.' },
      { titulo: 'Raiz', expr: 'x = − b / a', uso: 'Ponto em que o gráfico corta o eixo x.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma corrida de aplicativo cobra R$ 5,00 de bandeirada mais R$ 2,50 por quilômetro rodado. Uma corrida de 12 km custará',
        alternativas: ['R$ 25,00', 'R$ 30,00', 'R$ 35,00', 'R$ 42,00', 'R$ 47,50'],
        correta: 'C',
        resolucao: [
          'A lei é y = 2,50x + 5, com x em quilômetros.',
          'Para x = 12: 2,50 × 12 = 30.',
          'Somando a bandeirada: 30 + 5 = R$ 35,00.',
        ],
        porqueErram: [
          'A: esquece a bandeirada.',
          'B: calcula só o valor variável com 12 km por engano de fator.',
          'D e E: somam a bandeirada duas vezes ou usam 3,50 por km.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma função do 1º grau passa pelos pontos (2, 11) e (5, 23). A lei dessa função é',
        alternativas: ['y = 3x + 5', 'y = 4x + 3', 'y = 5x + 1', 'y = 6x − 1', 'y = 12x − 13'],
        correta: 'B',
        resolucao: [
          'Taxa de variação: a = (23 − 11)/(5 − 2) = 12/3 = 4.',
          'Substituindo (2, 11): 11 = 4·2 + b → b = 3.',
          'Logo y = 4x + 3. Conferindo com (5, 23): 4·5 + 3 = 23. ✓',
        ],
        porqueErram: [
          'A: usa a diferença entre y e x como coeficiente.',
          'C, D e E: ajustam a reta a apenas um dos pontos.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['O plano A custa R$ 40,00 fixos mais R$ 0,50 por unidade consumida. O plano B custa R$ 60,00 fixos mais R$ 0,30 por unidade.'],
        enunciado: 'O plano B passa a ser mais vantajoso que o plano A a partir de quantas unidades consumidas?',
        alternativas: ['50', '80', '100', '101', '120'],
        correta: 'D',
        resolucao: [
          'Iguale os custos: 60 + 0,30x = 40 + 0,50x.',
          'Isolando: 20 = 0,20x → x = 100.',
          'Em x = 100 os planos empatam; a partir de 101 unidades o B fica mais barato.',
        ],
        porqueErram: [
          'C: para no empate e não percebe que a pergunta é "a partir de".',
          'A e B: invertem a proporção das taxas.',
          'E: arredonda para cima sem calcular.',
        ],
      },
    ],
  },

  /* ------------------------------------------------------ FUNÇÃO DO 2º GRAU */
  'mat-funcao-2': {
    chave: [
      'Parábola: concavidade, vértice e raízes',
      'Máximo e mínimo em problemas de lucro e área',
      'Discriminante e número de raízes',
      'Leitura do gráfico sem conta',
      'Modelagem: altura de projétil, lucro, área cercada',
    ],
    secoes: [
      {
        h: 'A parábola e seus três pontos notáveis',
        ps: [
          'A função quadrática y = ax² + bx + c desenha uma parábola. O sinal de a decide a concavidade: a > 0 abre para cima (tem mínimo), a < 0 abre para baixo (tem máximo). O ponto de virada é o vértice, e é ele que o Enem cobra em quase toda questão de otimização.',
          'As raízes são os pontos em que a parábola cruza o eixo x. O discriminante Δ = b² − 4ac informa quantas são: duas quando Δ > 0, uma quando Δ = 0 (parábola tangente ao eixo) e nenhuma real quando Δ < 0.',
        ],
      },
      {
        h: 'Vértice: o máximo e o mínimo',
        ps: [
          'As coordenadas do vértice são x_v = −b/(2a) e y_v = −Δ/(4a). O x do vértice é sempre o ponto médio entre as raízes — atalho útil quando elas são fáceis de achar.',
          'Em contexto, o x do vértice é a quantidade que maximiza o lucro, o tempo em que o projétil atinge a altura máxima ou o lado do cercado que dá a maior área. O y do vértice é o valor máximo (ou mínimo) propriamente dito. Distinguir os dois é obrigatório: a pergunta diz se quer "quantas unidades" ou "qual o lucro".',
        ],
      },
      {
        h: 'Formas da equação e leitura rápida',
        ps: [
          'Além da forma geral, existem a forma fatorada y = a(x − r₁)(x − r₂), útil quando as raízes são conhecidas, e a forma canônica y = a(x − x_v)² + y_v, que dá o vértice direto. Reconhecer qual forma está disponível economiza Bhaskara.',
          'O coeficiente c é o ponto em que a parábola cruza o eixo y, porque y(0) = c. Em problemas de lançamento, c é a altura inicial do objeto.',
        ],
      },
      {
        h: 'Inequações quadráticas',
        ps: [
          'Resolver ax² + bx + c > 0 é perguntar em que trecho a parábola está acima do eixo. Com a > 0, a resposta é "fora das raízes"; com a < 0, "entre as raízes". Fazer o esboço rápido evita decorar regra.',
          'No Enem, isso aparece em lucro positivo, altura mínima de segurança e intervalo de tempo em que o objeto está acima de certa altura.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Lucro máximo',
        texto: 'Lucro L(x) = −x² + 40x − 300, com x em reais de desconto.',
        comentario: 'x_v = 20 reais de desconto; L(20) = −400 + 800 − 300 = R$ 100,00 de lucro máximo.',
      },
      {
        titulo: 'Altura de projétil',
        texto: 'h(t) = −5t² + 20t, com h em metros e t em segundos.',
        comentario: 'Vértice em t = 2 s; altura máxima h = 20 m; volta ao solo em t = 4 s.',
      },
    ],
    figuras: [
      {
        titulo: 'Parábola com a > 0',
        tipo: 'camadas',
        itens: [
          { txt: 'Raízes', nota: 'onde y = 0' },
          { txt: 'Vértice', nota: 'x_v = −b/2a — ponto de mínimo' },
          { txt: 'c', nota: 'altura em que o gráfico corta o eixo y' },
        ],
        legenda: 'Com três pontos notáveis você desenha qualquer parábola de prova.',
      },
    ],
    formulas: [
      { titulo: 'Bhaskara', expr: 'x = (−b ± √Δ) / 2a ;  Δ = b² − 4ac', uso: 'Raízes da equação.' },
      { titulo: 'Vértice', expr: 'x_v = −b / 2a ;  y_v = −Δ / 4a', uso: 'Máximo (a < 0) ou mínimo (a > 0).' },
      { titulo: 'Forma canônica', expr: 'y = a(x − x_v)² + y_v', uso: 'Quando o vértice já é conhecido.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'O lucro diário de uma loja é dado por L(x) = −x² + 40x − 300, em que x é o desconto, em reais, aplicado ao produto. O lucro máximo e o desconto que o gera são, respectivamente,',
        alternativas: ['R$ 100,00 e R$ 20,00', 'R$ 300,00 e R$ 20,00', 'R$ 100,00 e R$ 40,00', 'R$ 400,00 e R$ 10,00', 'R$ 40,00 e R$ 100,00'],
        correta: 'A',
        resolucao: [
          'a = −1, b = 40, c = −300. Como a < 0, há máximo no vértice.',
          'x_v = −b/2a = −40/(−2) = 20 reais de desconto.',
          'y_v = −Δ/4a, com Δ = 1.600 − 1.200 = 400 → y_v = −400/(−4) = R$ 100,00.',
        ],
        porqueErram: [
          'B: usa a constante c como lucro máximo.',
          'C: troca o x do vértice pelo valor das raízes (x = 10 e 30).',
          'D e E: invertem as coordenadas ou usam a soma das raízes.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A altura de um objeto lançado é dada por h(t) = −5t² + 20t, em metros, com t em segundos. A altura máxima atingida e o instante em que ela ocorre são',
        alternativas: ['10 m em 2 s', '20 m em 2 s', '20 m em 4 s', '40 m em 2 s', '80 m em 4 s'],
        correta: 'B',
        resolucao: [
          'A parábola abre para baixo (a = −5), logo existe máximo.',
          't_v = −b/2a = −20/(−10) = 2 s.',
          'h(2) = −5·4 + 20·2 = −20 + 40 = 20 m.',
        ],
        porqueErram: [
          'A: calcula a altura na metade da altura máxima.',
          'C: usa o instante de retorno ao solo (t = 4 s).',
          'D e E: usam c = 0 ou confundem alcance com altura.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'A equação x² − 6x + 9 = 0 tem',
        alternativas: ['duas raízes reais distintas', 'uma única raiz real (raiz dupla)', 'nenhuma raiz real', 'duas raízes complexas não reais e distintas', 'infinitas soluções'],
        correta: 'B',
        resolucao: [
          'Δ = b² − 4ac = 36 − 36 = 0.',
          'Δ = 0 indica uma única raiz real, de multiplicidade 2: x = −b/2a = 3.',
          'Isso equivale a (x − 3)² = 0. A parábola é tangente ao eixo x no ponto (3, 0).',
        ],
        porqueErram: [
          'A e D: confundem Δ = 0 com duas raízes.',
          'C: concluiriam isso se Δ fosse negativo.',
          'E: só ocorre em equação identicamente nula.',
        ],
      },
    ],
  },

  /* --------------------------------------------- FUNÇÃO EXPONENCIAL E LOGARITMO */
  'mat-exponencial': {
    chave: [
      'Crescimento e decaimento exponencial',
      'Juros compostos e população',
      'Logaritmo como expoente',
      'Meia-vida e tempo de duplicação',
      'Gráfico exponencial × gráfico linear',
    ],
    secoes: [
      {
        h: 'Exponencial: quando o crescimento se multiplica',
        ps: [
          'A função exponencial é f(x) = a·bˣ, com b > 0 e b ≠ 1. Quando b > 1 há crescimento: cada passo multiplica por b. Quando 0 < b < 1 há decaimento, como a meia-vida de um medicamento ou a desvalorização de um bem. A diferença em relação à função do 1º grau é a natureza do crescimento: a linear soma, a exponencial multiplica.',
          'O Enem cobra muito a comparação: no início a linear parece maior, depois a exponencial ultrapassa. Em gráfico, a exponencial curva para cima (ou para baixo, no decaimento) e nunca toca o eixo x.',
        ],
      },
      {
        h: 'Logaritmo é o expoente',
        ps: [
          'Logaritmo responde "a que expoente devo elevar a base para obter este número": log_b N = x significa bˣ = N. Toda questão de exponencial em que a incógnita está no expoente se resolve com logaritmo — ou com raciocínio de tentativa e erro quando os números são redondos.',
          'As propriedades mais usadas: log(A·B) = log A + log B; log(A/B) = log A − log B; log Aⁿ = n·log A. Logaritmo de base 10 é o que aparece nas escalas de pH, decibel e Richter, todas exponenciais.',
        ],
      },
      {
        h: 'Meia-vida, duplicação e regra dos 72',
        ps: [
          'Meia-vida é o tempo para a quantidade cair à metade: Q(t) = Q₀·(1/2)^(t/h). Duplicação é o inverso: para saber em quanto tempo um capital dobra a juros compostos de i, a regra dos 72 dá 72/i (em %) como estimativa do número de períodos.',
          'Esses dois conceitos resolvem datação por carbono, decaimento de fármaco no sangue, crescimento bacteriano e inflação acumulada.',
        ],
      },
      {
        h: 'Modelagem com exponencial',
        ps: [
          'Sempre que a variação for percentual e incidir sobre o valor já atualizado, o modelo é exponencial. População que cresce 2% ao ano é P(t) = P₀·1,02^t; carro que desvaloriza 10% ao ano é V(t) = V₀·0,90^t.',
          'Identificar a taxa na base é o passo-chave: 1 + i para crescimento, 1 − i para queda. Confundir a taxa com a base (usar 2 em vez de 1,02) é o erro mais comum.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Bactérias dobrando',
        texto: 'Uma cultura dobra a cada 3 horas, começando com 500 bactérias.',
        comentario: 'N(t) = 500·2^(t/3). Em 9 h: 500 × 8 = 4.000.',
      },
      {
        titulo: 'Meia-vida de medicamento',
        texto: 'Um remédio tem meia-vida de 6 horas e a dose inicial é 200 mg.',
        comentario: 'Após 18 h (três meias-vidas): 200 → 100 → 50 → 25 mg.',
      },
    ],
    figuras: [
      {
        titulo: 'Decaimento por meia-vida',
        tipo: 'barras',
        itens: [
          { txt: '0 h', valor: 200, unidade: 'mg' },
          { txt: '6 h', valor: 100, unidade: 'mg' },
          { txt: '12 h', valor: 50, unidade: 'mg' },
          { txt: '18 h', valor: 25, unidade: 'mg' },
        ],
        legenda: 'Cada meia-vida reduz a quantidade à metade — decaimento exponencial.',
      },
    ],
    formulas: [
      { titulo: 'Função exponencial', expr: 'f(x) = a · bˣ', uso: 'b > 1 cresce, 0 < b < 1 decresce.' },
      { titulo: 'Meia-vida', expr: 'Q(t) = Q₀ · (1/2)^(t/h)', uso: 'h = tempo de meia-vida.' },
      { titulo: 'Definição de logaritmo', expr: 'log_b N = x ⇔ bˣ = N', uso: 'Resolve equação com incógnita no expoente.' },
      { titulo: 'Regra dos 72', expr: 't ≈ 72 / i(%)', uso: 'Tempo aproximado para dobrar o capital.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma cultura de bactérias dobra de tamanho a cada 3 horas. Começando com 500 bactérias, quantas haverá após 9 horas?',
        alternativas: ['1.500', '2.000', '3.000', '4.000', '8.000'],
        correta: 'D',
        resolucao: [
          'Em 9 horas ocorrem 9 / 3 = 3 ciclos de duplicação.',
          'Cada ciclo multiplica por 2: 2³ = 8.',
          '500 × 8 = 4.000 bactérias.',
        ],
        porqueErram: [
          'A: soma 3 × 500 em vez de multiplicar.',
          'B e C: usam dois ciclos ou crescimento linear.',
          'E: usam quatro ciclos.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um medicamento tem meia-vida de 6 horas. Se uma dose de 200 mg foi administrada, a quantidade presente no organismo após 18 horas será de',
        alternativas: ['12,5 mg', '25 mg', '33,3 mg', '50 mg', '100 mg'],
        correta: 'B',
        resolucao: [
          '18 horas divididas por 6 horas de meia-vida dão 3 meias-vidas.',
          'A cada meia-vida a quantidade cai pela metade: 200 → 100 → 50 → 25.',
          'Portanto restam 25 mg.',
        ],
        porqueErram: [
          'A: usa quatro meias-vidas.',
          'C: divide linearmente (200/6).',
          'D e E: param na segunda e na primeira meia-vida.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Uma população cresce 2% ao ano segundo o modelo P(t) = P₀ · 1,02^t. Use log 1,02 ≈ 0,0086 e log 2 ≈ 0,301.'],
        enunciado: 'Nas condições do modelo, a população dobrará em aproximadamente',
        alternativas: ['25 anos', '35 anos', '50 anos', '72 anos', '100 anos'],
        correta: 'B',
        resolucao: [
          'Queremos 1,02^t = 2. Aplicando logaritmo: t · log 1,02 = log 2.',
          't = 0,301 / 0,0086 ≈ 35.',
          'Logo a duplicação ocorre em torno de 35 anos. A regra dos 72 confirma: 72/2 = 36.',
        ],
        porqueErram: [
          'A: usa a regra dos 72 com a taxa 3%.',
          'C e D: aplicam o logaritmo sobre a taxa em vez de sobre o fator.',
          'E: confunde com o prazo de centuplicar.',
        ],
      },
    ],
  },

  /* --------------------------------------------- GRÁFICOS DE FUNÇÕES */
  'mat-graficos-funcao': {
    chave: [
      'Reconhecer a família da função pelo desenho',
      'Coeficientes no gráfico (a, b, c)',
      'Interseções com os eixos',
      'Crescimento linear × exponencial × quadrático',
      'Translações e reflexões',
    ],
    secoes: [
      {
        h: 'Do desenho para a função',
        ps: [
          'Reta indica função do 1º grau; parábola, do 2º grau; curva que multiplica, exponencial; curva que cresce cada vez mais devagar, logarítmica. Reconhecer a família pelo formato é o primeiro passo e frequentemente resolve a questão sem qualquer conta.',
          'A interseção com o eixo y mostra o valor inicial: o b da reta, o c da parábola, o a da exponencial. A interseção com o eixo x mostra as raízes.',
        ],
      },
      {
        h: 'Ler coeficientes no gráfico',
        ps: [
          'Na reta y = ax + b: se sobe, a > 0; se desce, a < 0; quanto mais inclinada, maior |a|. Na parábola: concavidade para cima indica a > 0; o vértice indica o máximo ou mínimo.',
          'Duas retas paralelas têm o mesmo a e b diferentes; a mais inclinada tem maior taxa de variação. Isso permite comparar planos e velocidades só pelo desenho.',
        ],
      },
      {
        h: 'Leitura de intervalos',
        ps: [
          'O gráfico informa em que intervalos a função é positiva, negativa, crescente ou decrescente. "Positiva" significa y > 0, isto é, acima do eixo x — não confunda com "crescente", que é subida da curva.',
          'Em problemas aplicados, o intervalo de validade importa: um tanque não pode ter volume negativo, e um projétil só existe entre o lançamento e a queda. O domínio do contexto recorta o gráfico.',
        ],
      },
      {
        h: 'Transformações',
        ps: [
          'Somar uma constante fora da função desloca o gráfico para cima (f(x) + k); somar dentro desloca para a esquerda (f(x + k)). Multiplicar por −1 reflete no eixo x; multiplicar por constante maior que 1 alonga verticalmente.',
          'Essas regras aparecem em questões que mostram dois gráficos parecidos e pedem a relação entre eles.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Dois planos no mesmo gráfico',
        texto: 'Plano A: reta mais inclinada, começa abaixo. Plano B: reta quase horizontal, começa acima.',
        comentario: 'A interseção é o ponto de indiferença; antes dela vence o plano com menor valor inicial.',
      },
      {
        titulo: 'Crescimento comparado',
        texto: 'Uma reta e uma exponencial que partem do mesmo ponto.',
        comentario: 'No começo a reta está acima; depois a exponencial ultrapassa — é a leitura clássica de "a partir de quando".',
      },
    ],
    figuras: [
      {
        titulo: 'Família pelo formato',
        tipo: 'camadas',
        itens: [
          { txt: 'Reta', nota: 'taxa constante — função do 1º grau' },
          { txt: 'Parábola', nota: 'um ponto de virada — função do 2º grau' },
          { txt: 'Curva exponencial', nota: 'cada passo multiplica por uma constante' },
        ],
        legenda: 'Basta olhar o formato para eliminar alternativas erradas.',
      },
    ],
    formulas: [
      { titulo: 'Reta', expr: 'y = ax + b', uso: 'a = inclinação; b = corte no eixo y.' },
      { titulo: 'Parábola', expr: 'y = ax² + bx + c', uso: 'a define a concavidade; c o corte no eixo y.' },
      { titulo: 'Exponencial', expr: 'y = a·bˣ', uso: 'b > 1 cresce; 0 < b < 1 decresce.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Um gráfico mostra duas funções partindo do mesmo ponto: uma reta crescente e uma curva exponencial crescentes no mesmo eixo.'],
        enunciado: 'Sobre o comportamento dessas duas funções, é correto afirmar que',
        alternativas: [
          'a reta sempre fica acima da curva',
          'a curva começa abaixo da reta e, a partir de certo ponto, a ultrapassa',
          'as duas crescem à mesma taxa',
          'a curva nunca ultrapassa a reta',
          'a reta representa crescimento percentual',
        ],
        correta: 'B',
        resolucao: [
          'A exponencial cresce multiplicativamente; a reta, aditivamente.',
          'Como partem do mesmo ponto, no início a reta tende a ficar acima ou empatada.',
          'Em algum momento a multiplicação supera a soma e a curva cruza a reta, permanecendo acima daí em diante.',
        ],
        porqueErram: [
          'A e D: ignoram que o crescimento exponencial supera o linear.',
          'C: confunde taxa constante (reta) com taxa crescente (exponencial).',
          'E: crescimento percentual é justamente o da curva.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['O gráfico de uma função do 1º grau passa por (0, 30) e (10, 80).'],
        enunciado: 'A taxa de variação e o valor da função em x = 4 são, respectivamente,',
        alternativas: ['5 e 50', '5 e 45', '50 e 50', '3 e 42', '8 e 62'],
        correta: 'A',
        resolucao: [
          'Taxa de variação: (80 − 30)/(10 − 0) = 50/10 = 5.',
          'A lei é y = 5x + 30, pois em x = 0 o valor é 30.',
          'Em x = 4: 5·4 + 30 = 50.',
        ],
        porqueErram: [
          'B: soma 30 + 4·5 e erra a aritmética.',
          'C: confunde a diferença total com a taxa.',
          'D e E: usam a inclinação como (80/10) sem descontar o valor inicial.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma parábola tem concavidade voltada para baixo e corta o eixo x em dois pontos. Nesse caso, é correto afirmar que',
        alternativas: [
          'a > 0 e a função tem mínimo',
          'a < 0 e a função tem máximo',
          'a = 0 e a função é constante',
          'a < 0 e a função não tem raízes reais',
          'a > 0 e Δ < 0',
        ],
        correta: 'B',
        resolucao: [
          'Concavidade para baixo equivale a a < 0.',
          'Parábola com a < 0 tem vértice como ponto de máximo.',
          'Cortar o eixo x em dois pontos significa Δ > 0 e duas raízes reais distintas.',
        ],
        porqueErram: [
          'A: inverte a relação entre concavidade e sinal de a.',
          'C: a = 0 não gera parábola.',
          'D: contradiz os dois pontos de corte. E: Δ > 0, não Δ < 0.',
        ],
      },
    ],
  },

  /* -------------------------------------------------------- PROBABILIDADE */
  'mat-probabilidade': {
    chave: [
      'Probabilidade como razão entre casos favoráveis e possíveis',
      'Evento complementar',
      'Probabilidade da união e do "ou"',
      'Probabilidade condicional e tabela de dupla entrada',
      'Probabilidade com reposição × sem reposição',
    ],
    secoes: [
      {
        h: 'A definição clássica',
        ps: [
          'Em espaço amostral equiprovável, a probabilidade de um evento é o número de casos favoráveis dividido pelo número de casos possíveis: P(A) = n(A)/n(Ω). O resultado é sempre um número entre 0 e 1, e a soma das probabilidades de todos os eventos elementares é 1.',
          'A tradução para porcentagem é imediata: 0,35 = 35%. Em prova, vale conferir se a resposta pedida é fração, decimal ou porcentagem, porque as alternativas costumam trazer as três formas.',
        ],
      },
      {
        h: 'Complementar: o caminho mais curto',
        ps: [
          'P(não A) = 1 − P(A). Quando o evento pedido é "pelo menos um", quase sempre é mais rápido calcular o complementar: "pelo menos um acerto" é o oposto de "nenhum acerto".',
          'Esse atalho resolve questões de sorteio repetido, de pelo menos uma peça defeituosa em um lote e de pelo menos uma cara em vários lançamentos.',
        ],
      },
      {
        h: 'União, interseção e independência',
        ps: [
          'Para eventos independentes, P(A e B) = P(A)·P(B). Para o "ou", P(A ou B) = P(A) + P(B) − P(A e B); a subtração evita contar duas vezes a interseção. Quando os eventos são mutuamente exclusivos, a interseção é vazia e basta somar.',
          'Sem reposição, os eventos deixam de ser independentes: a segunda retirada depende da primeira, e o denominador diminui. Reconhecer "com reposição" no enunciado é decisivo.',
        ],
      },
      {
        h: 'Tabelas de dupla entrada e condicional',
        ps: [
          'Probabilidade condicional é P(A|B) = P(A e B)/P(B): a probabilidade de A sabendo que B ocorreu. Em tabela de dupla entrada, o denominador passa a ser apenas a linha ou a coluna do evento dado — o total geral deixa de ser a base.',
          'Esse é o formato mais cobrado em questões de saúde pública, testes diagnósticos e pesquisas de opinião segmentadas por sexo, faixa de renda ou região.',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Urna sem reposição',
        texto: 'Urna com 3 bolas vermelhas e 5 azuis. Duas retiradas sem reposição; probabilidade de duas vermelhas.',
        comentario: 'P = 3/8 × 2/7 = 6/56 ≈ 10,7%.',
      },
      {
        titulo: 'Pelo menos um',
        texto: 'Um dado é lançado três vezes. Probabilidade de sair pelo menos um 6.',
        comentario: 'P = 1 − (5/6)³ = 1 − 125/216 ≈ 42,1%.',
      },
    ],
    figuras: [
      {
        titulo: 'Com ou sem reposição',
        tipo: 'fluxo',
        itens: ['Defina o espaço amostral total', 'Conte os casos favoráveis', 'Pergunte: repõe o item?', 'Se não repõe, o denominador cai', 'Confira se o pedido é "e", "ou" ou "pelo menos um"'],
        legenda: 'O roteiro evita o erro de usar a mesma base para eventos dependentes.',
      },
    ],
    formulas: [
      { titulo: 'Probabilidade simples', expr: 'P(A) = n(A) / n(Ω)', uso: 'Casos favoráveis sobre casos possíveis.' },
      { titulo: 'Complementar', expr: 'P(não A) = 1 − P(A)', uso: 'Atalho para "pelo menos um".' },
      { titulo: 'União', expr: 'P(A ∪ B) = P(A) + P(B) − P(A ∩ B)', uso: 'Evita contar a interseção duas vezes.' },
      { titulo: 'Condicional', expr: 'P(A|B) = P(A ∩ B) / P(B)', uso: 'Quando já se sabe que B ocorreu.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma urna contém 3 bolas vermelhas e 5 azuis. Retirando-se duas bolas sem reposição, a probabilidade de que ambas sejam vermelhas é de aproximadamente',
        alternativas: ['7,5%', '10,7%', '14,1%', '37,5%', '50%'],
        correta: 'B',
        resolucao: [
          'Primeira retirada vermelha: 3/8.',
          'Sem reposição, restam 2 vermelhas em 7 bolas: 2/7.',
          'P = 3/8 × 2/7 = 6/56 ≈ 0,107 = 10,7%.',
        ],
        porqueErram: [
          'C: usa com reposição (3/8 × 3/8 ≈ 14,1%).',
          'D: calcula 3/8 apenas, esquecendo a segunda retirada.',
          'A e E: usam proporções da urna como se fossem porcentagens do total.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Um dado honesto é lançado três vezes. A probabilidade de sair pelo menos um 6 é de aproximadamente',
        alternativas: ['16,7%', '33,3%', '42,1%', '50%', '57,9%'],
        correta: 'C',
        resolucao: [
          'É mais rápido usar o complementar: "pelo menos um 6" é o oposto de "nenhum 6".',
          'P(nenhum 6) = (5/6)³ = 125/216 ≈ 57,9%.',
          'P(pelo menos um) = 1 − 0,579 ≈ 42,1%.',
        ],
        porqueErram: [
          'A: calcula 1/6, como se fosse um único lançamento.',
          'B: soma 3 × 1/6, ignorando as sobreposições.',
          'D e E: devolvem o complementar (57,9%) ou metade.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        textoApoio: ['Em uma turma de 40 alunos, 24 são meninas. Entre as meninas, 6 praticam vôlei; entre os meninos, 4 praticam vôlei.'],
        enunciado: 'Escolhendo-se ao acaso um aluno que pratica vôlei, a probabilidade de ser menina é de',
        alternativas: ['15%', '25%', '40%', '60%', '62,5%'],
        correta: 'D',
        resolucao: [
          'Total de praticantes de vôlei: 6 + 4 = 10.',
          'Como já sabemos que o aluno pratica vôlei, o espaço amostral passa a ser 10.',
          'Meninas entre os praticantes: 6. P = 6/10 = 60%.',
        ],
        porqueErram: [
          'A: calcula 6/40 (probabilidade de ser menina e praticar vôlei).',
          'B: usa 10/40.',
          'C e E: usam 24/40 ou 6/10 com base trocada.',
        ],
      },
    ],
  },

  /* -------------------------------------------------- ANÁLISE COMBINATÓRIA */
  'mat-combinatoria': {
    chave: [
      'Princípio multiplicativo',
      'Permutação, arranjo e combinação',
      'A ordem importa? — a pergunta que define o método',
      'Contagem com repetição e com restrição',
      'Contagem como base para a probabilidade',
    ],
    secoes: [
      {
        h: 'Princípio multiplicativo',
        ps: [
          'Se uma decisão pode ser tomada de m formas e, para cada uma, outra pode ser tomada de n formas, o total de possibilidades é m × n. O "e" multiplica, o "ou" soma — é a base de toda a análise combinatória.',
          'Praticamente toda questão de contagem do Enem começa assim: identificar as etapas da decisão (número de dígitos, tipo de sanduíche, cor da camisa) e multiplicar as possibilidades de cada etapa.',
        ],
      },
      {
        h: 'Arranjo × combinação',
        ps: [
          'A pergunta decisiva é: a ordem muda o resultado? Escolher 3 pessoas para uma comissão é combinação (ordem não importa). Escolher 3 pessoas para presidente, tesoureiro e secretário é arranjo (ordem importa). Pódio é arranjo; aperto de mão é combinação.',
          'Permutação é o caso em que se usa todos os elementos, com ordem. Anagrams de palavra, fila de pessoas e ordem de apresentação são permutações: n!.',
        ],
      },
      {
        h: 'Fórmulas e quando evitar fórmula',
        ps: [
          'Arranjo: A(n, p) = n!/(n − p)!. Combinação: C(n, p) = n!/[p!(n − p)!]. Permutação com repetição: n!/(a!·b!·…). Em muitos casos, é mais rápido multiplicar as escolhas etapa por etapa do que aplicar a fórmula.',
          'Quando a questão é de probabilidade, a contagem entra no numerador e no denominador: casos favoráveis sobre casos possíveis.',
        ],
      },
      {
        h: 'Restrições e armadilhas',
        ps: [
          'Restrições do tipo "não podem ficar juntos", "devem ficar juntos" ou "o primeiro dígito não pode ser zero" pedem tratamento especial: blocos para quem fica junto, exclusão depois do total, e cuidado com o zero em senhas e números.',
          'Em senhas, distinguir letras maiúsculas de minúsculas e permitir repetição muda completamente o resultado. Ler essas condições antes de calcular evita a alternativa "quase certa".',
        ],
      },
    ],
    exemplos: [
      {
        titulo: 'Senha de 4 dígitos',
        texto: 'Dígitos de 0 a 9, com repetição permitida.',
        comentario: '10 × 10 × 10 × 10 = 10.000 possibilidades.',
      },
      {
        titulo: 'Comissão de 2 entre 6',
        texto: 'Escolher 2 alunos de uma turma de 6 para uma comissão.',
        comentario: 'C(6,2) = 15. A ordem não importa: Ana e Bia é a mesma comissão de Bia e Ana.',
      },
    ],
    figuras: [
      {
        titulo: 'Qual método usar?',
        tipo: 'fluxo',
        itens: ['Quantas etapas tem a decisão?', 'A ordem muda o resultado?', 'Usa todos os elementos?', 'Há repetição permitida?', 'Então: permutação, arranjo ou combinação'],
        legenda: 'Responder essas perguntas antes de calcular elimina a troca entre arranjo e combinação.',
      },
    ],
    formulas: [
      { titulo: 'Princípio multiplicativo', expr: 'total = m₁ × m₂ × … × mₖ', uso: 'Etapas independentes de decisão.' },
      { titulo: 'Permutação', expr: 'Pₙ = n!', uso: 'Todos os elementos, ordem importa.' },
      { titulo: 'Arranjo', expr: 'A(n,p) = n! / (n − p)!', uso: 'Ordem importa, parte dos elementos.' },
      { titulo: 'Combinação', expr: 'C(n,p) = n! / [p!(n − p)!]', uso: 'Ordem não importa.' },
    ],
    questoes: [
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Uma senha é formada por 4 dígitos, de 0 a 9, podendo haver repetição. O número de senhas diferentes possíveis é',
        alternativas: ['210', '1.000', '5.040', '10.000', '40.000'],
        correta: 'D',
        resolucao: [
          'Cada uma das quatro posições admite 10 dígitos.',
          'Com repetição permitida, multiplica-se: 10 × 10 × 10 × 10.',
          'Total: 10⁴ = 10.000 senhas.',
        ],
        porqueErram: [
          'A: usa combinação (C(10,4) = 210), como se a ordem não importasse.',
          'B: considera só três dígitos.',
          'C: usa arranjo sem repetição (10 × 9 × 8 × 7 = 5.040).',
          'E: multiplica por 4 indevidamente.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'De um grupo de 6 alunos, dois serão escolhidos para representar a turma em uma reunião, sem cargos definidos. O número de duplas diferentes é',
        alternativas: ['6', '12', '15', '30', '36'],
        correta: 'C',
        resolucao: [
          'A ordem não importa: escolher Ana e Bia é o mesmo que Bia e Ana.',
          'Trata-se de combinação: C(6,2) = 6!/(2!·4!) = (6 × 5)/2.',
          'Resultado: 15 duplas.',
        ],
        porqueErram: [
          'D: usa arranjo (6 × 5 = 30), como se houvesse cargos.',
          'A e B: fazem contas parciais. E: eleva 6 ao quadrado.',
        ],
      },
      {
        ano: null,
        fonte: 'questão autoral no padrão Enem',
        enunciado: 'Quantos anagramas tem a palavra LIVRO?',
        alternativas: ['24', '60', '100', '120', '720'],
        correta: 'D',
        resolucao: [
          'Cinco letras, todas diferentes.',
          'Permutação simples: 5! = 5 × 4 × 3 × 2 × 1.',
          'Resultado: 120 anagramas.',
        ],
        porqueErram: [
          'A: usa 4!.', 'B e C: fazem combinações, ignorando a ordem.',
          'E: usa 6! por engano na contagem de letras.',
        ],
      },
    ],
  },

};
