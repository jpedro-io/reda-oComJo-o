/** Questões verificadas no caderno e gabarito do Inep. Textos reescritos para estudo. */
const prova2022 = 'https://download.inep.gov.br/enem/provas_e_gabaritos/2022_PV_impresso_D2_CD5.pdf';
const gabarito2022 = 'https://download.inep.gov.br/enem/provas_e_gabaritos/2022_GB_impresso_D2_CD5.pdf';
export const QUESTOES_ENEM = {
  'mat-porcentagem': [
    {
      ano: 2022, fonte: '2º dia · caderno 5 amarelo · questão 136', adaptada: true,
      urlProva: prova2022, urlGabarito: gabarito2022,
      textoApoio: ['Uma universidade tem 60 mestres que recebem R$ 8.000 e 40 doutores que recebem R$ 12.000. Os mestres terão reajuste de 25%. A média dos salários de todos os 100 professores não pode ultrapassar R$ 12.240.'],
      enunciado: 'Qual é o maior reajuste percentual possível para os doutores, mantendo a quantidade de professores?',
      alternativas: ['14,4%', '20,7%', '22,0%', '30,0%', '37,5%'], correta: 'D', gabaritoOficial: 'D',
      resolucao: ['O novo salário de cada mestre é 8.000 × 1,25 = R$ 10.000. Os 60 mestres somam R$ 600.000.', 'O teto da folha é 100 × 12.240 = R$ 1.224.000. Sobram 1.224.000 − 600.000 = R$ 624.000 para os 40 doutores.', 'Cada doutor pode receber até 624.000 ÷ 40 = R$ 15.600. O aumento é 3.600 ÷ 12.000 = 0,30, ou 30%.'],
      porqueErram: ['A, B e C dão reajustes inferiores ao máximo permitido.', 'E ultrapassa o teto da média salarial.']
    },
    {
      ano: 2022, fonte: '2º dia · caderno 5 amarelo · questão 140', adaptada: true,
      urlProva: prova2022, urlGabarito: gabarito2022,
      textoApoio: ['Uma geladeira custa R$ 1.000 na promoção à vista. O preço normal é 10% maior. No cartão da loja, aplica-se um desconto de 2% sobre o preço normal. Uma cliente calculou R$ 1.000 acrescidos de 8%.'],
      enunciado: 'Comparado ao cálculo da cliente, o valor cobrado pela loja é',
      alternativas: ['R$ 2 menor.', 'R$ 100 menor.', 'R$ 200 menor.', 'R$ 42 maior.', 'R$ 80 maior.'], correta: 'A', gabaritoOficial: 'A',
      resolucao: ['O preço normal é 1.000 × 1,10 = R$ 1.100.', 'No cartão, a loja cobra 1.100 × 0,98 = R$ 1.078.', 'A cliente estimou 1.000 × 1,08 = R$ 1.080. O valor da loja é R$ 2 menor.'],
      porqueErram: ['B, C, D e E não respeitam as bases diferentes do aumento e do desconto.']
    },
    {
      ano: 2022, fonte: '2º dia · caderno 5 amarelo · questão 149', adaptada: true,
      urlProva: prova2022, urlGabarito: gabarito2022,
      textoApoio: ['Em janeiro de 2013, houve saldo de 28.900 vagas de emprego criadas. O número representou queda de 75% em relação a janeiro de 2012.'],
      enunciado: 'Quantas vagas haviam sido criadas em janeiro de 2012?',
      alternativas: ['16.514', '86.700', '115.600', '441.343', '448.568'], correta: 'C', gabaritoOficial: 'C',
      resolucao: ['Depois da queda de 75%, o saldo de 2013 corresponde a 25% do saldo de 2012.', 'Se V é o saldo anterior, então 0,25 × V = 28.900.', 'Assim, V = 28.900 ÷ 0,25 = 115.600 vagas.'],
      porqueErram: ['A e B não desfazem corretamente a redução percentual.', 'D e E não satisfazem a relação de 25% com o valor de 2013.']
    }
  ],

  'mat-razao-proporcao': [{
    ano:2022, fonte:'2º dia · caderno 5 amarelo · questão 147', adaptada:true, urlProva:prova2022, urlGabarito:gabarito2022,
    textoApoio:['Uma receita rende 50 docinhos esféricos de 2 cm de diâmetro. Uma encomenda pede 150 docinhos esféricos de 4 cm de diâmetro, feitos com a mesma massa.'],
    enunciado:'Quantas porções da receita são necessárias?', alternativas:['2','3','6','12','24'], correta:'E', gabaritoOficial:'E',
    resolucao:['A esfera maior tem diâmetro duas vezes maior, portanto cada unidade tem 2³ = 8 vezes o volume.','A encomenda usa massa equivalente a 150 × 8 = 1.200 docinhos pequenos.','Cada porção rende 50 pequenos: 1.200 ÷ 50 = 24 porções.'],
    porqueErram:['A, B, C e D desconsideram total ou parcialmente o crescimento cúbico do volume.']
  }],
  'bio-fisiologia': [{
    ano:2022, fonte:'2º dia · caderno 5 amarelo · questão 91', adaptada:true, urlProva:prova2022, urlGabarito:gabarito2022,
    textoApoio:['O uso de eritropoietina como doping sanguíneo pode estimular a eritropoiese, isto é, a produção de hemácias.'],
    enunciado:'O efeito relacionado diretamente a esse uso é o aumento da', alternativas:['frequência cardíaca','capacidade pulmonar','massa muscular','atividade anaeróbica','taxa de transporte de oxigênio pelo sangue'], correta:'E', gabaritoOficial:'E',
    resolucao:['A eritropoietina estimula a produção de hemácias.','As hemácias possuem hemoglobina, que participa do transporte de oxigênio.','O aumento dessas células pode elevar a capacidade de transporte de oxigênio no sangue.'],
    porqueErram:['A, B, C e D não correspondem ao efeito direto pedido.']
  }],
  'fis-optica': [{
    ano:2022, fonte:'2º dia · caderno 5 amarelo · questão 96', adaptada:true, urlProva:prova2022, urlGabarito:gabarito2022,
    textoApoio:['Uma garrafa PET com água é instalada em uma abertura do telhado e ajuda a espalhar luz solar dentro de uma casa.'],
    enunciado:'Qual fenômeno óptico explica o funcionamento principal desse dispositivo?', alternativas:['difração','absorção','polarização','reflexão','refração'], correta:'E', gabaritoOficial:'E',
    resolucao:['A luz passa por meios de índices de refração diferentes, como ar, plástico e água.','Ao atravessar as interfaces obliquamente, sua direção muda.','O desvio por mudança de meio caracteriza refração.'],
    porqueErram:['A: difração não é o mecanismo principal dado o tamanho da abertura.','B e C: absorção e polarização não explicam o desvio central.','D: há reflexão em interfaces, mas o fenômeno pedido é refração.']
  }],
  'bio-evolucao': [{
    ano:2022, fonte:'2º dia · caderno 5 amarelo · questão 131', adaptada:true, urlProva:prova2022, urlGabarito:gabarito2022,
    textoApoio:['Espécies de anfíbios apresentam estratégias distintas: algumas produzem muitos gametas sem cuidado parental; outras produzem menos e protegem os embriões de formas diferentes.'],
    enunciado:'Os padrões descritos evidenciam que', alternativas:['as fêmeas necessariamente determinam o comportamento dos machos','o cuidado parental é indispensável em todas as espécies','há uma escala linear de evolução que determina o comportamento','diferentes estratégias podem favorecer o sucesso reprodutivo','o ambiente provoca diretamente a modificação hereditária dos gametas'], correta:'D', gabaritoOficial:'D',
    resolucao:['O enunciado apresenta padrões reprodutivos variados em ambientes e espécies diferentes.','Cada estratégia pode favorecer sobrevivência e reprodução conforme o contexto.','Não existe uma escala linear de superioridade evolutiva entre elas: alternativa D.'],
    porqueErram:['A e B generalizam além dos dados.','C supõe evolução como escala de progresso.','E atribui mudança hereditária dirigida diretamente pelo ambiente.']
  }],
  'bio-citologia': [{
    ano:2022, fonte:'2º dia · caderno 5 amarelo · questão 134', adaptada:true, urlProva:prova2022, urlGabarito:gabarito2022,
    textoApoio:['Em ensaios independentes com a enzima catalase, a taxa de decomposição de peróxido de hidrogênio varia com a temperatura; após certo ponto, cai.'],
    enunciado:'Qual fator ajuda a explicar essa redução em temperaturas mais altas?', alternativas:['variação do pH do meio','aumento obrigatório da energia de ativação','consumo permanente da enzima','diminuição da concentração inicial de substrato','modificação da estrutura tridimensional da enzima'], correta:'E', gabaritoOficial:'E',
    resolucao:['A atividade da enzima depende de sua estrutura e do sítio ativo.','Temperaturas elevadas podem alterar sua conformação, reduzindo a atividade catalítica.','Os ensaios variaram apenas a temperatura; a explicação é a modificação estrutural.'],
    porqueErram:['A e D contrariam a condição de variar apenas a temperatura.','B não é a explicação apresentada; C é incorreta porque catalisadores não são consumidos globalmente.']
  }],
};
