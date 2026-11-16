export const GRUPOS_MATEMATICA = [
{pagina:'mat-porcentagem', materia:'mat-basica', titulo:'Matemática Básica', relacionados:['mat-razao-proporcao','mat-regra-tres','mat-escalas','mat-financeira','mat-graficos'], topicos:[
['Razão, proporção, escala e regra de três','Razão compara grandezas por quociente; uma proporção iguala razões. Em escala 1:n, 1 unidade no desenho representa n unidades reais na mesma unidade; áreas variam com o quadrado da escala. Na regra de três, identifique grandezas direta ou inversamente proporcionais antes de montar a igualdade; na composta, analise cada relação.'],
['Porcentagem e juros','p% equivale a p/100. Aumento de p% multiplica por 1 + p/100; desconto, por 1 − p/100. Variações sucessivas são multiplicadas, não simplesmente somadas. Em juros simples, M = C(1 + it); em compostos, M = C(1 + i)ᵗ, com taxa e prazo na mesma unidade.'],
['Gráficos, tabelas e infográficos','Leia título, eixos, unidade, fonte e período antes de comparar valores. Observe se o eixo começa em zero e se os dados são absolutos ou percentuais; uma variação em pontos percentuais não é a mesma coisa que uma variação percentual relativa.'],
['Frações, decimais e conjuntos numéricos','Para somar frações, use denominador comum; para multiplicar, multiplique numeradores e denominadores. Números racionais admitem representação por fração de inteiros com denominador não nulo; inteiros incluem negativos e zero, e reais incluem racionais e irracionais. Compare decimais alinhando casas e respeite prioridades das operações.']
]},
{pagina:'mat-geo-plana', materia:'mat-geometria', titulo:'Geometria Plana', relacionados:['mat-escalas'], topicos:[
['Áreas e perímetros','Perímetro é a soma dos lados. Áreas: retângulo b·h, triângulo b·h/2, paralelogramo b·h, trapézio (B+b)h/2 e círculo πr²; comprimento da circunferência é 2πr. Use unidades de comprimento para perímetro e quadradas para área.'],
['Pitágoras e trigonometria','Em triângulo retângulo, a² = b² + c², com a hipotenusa. Para ângulo agudo θ, seno = cateto oposto/hipotenusa, cosseno = adjacente/hipotenusa e tangente = oposto/adjacente. Escolha a razão conforme o lado conhecido e o procurado.'],
['Semelhança de triângulos e polígonos','Figuras semelhantes têm ângulos correspondentes iguais e lados proporcionais. Se a razão entre comprimentos é k, a razão entre áreas é k². Em triângulos, igualdade de dois ângulos correspondentes é critério suficiente de semelhança.']
]},
{pagina:'mat-geo-espacial', materia:'mat-geometria', titulo:'Geometria Espacial', relacionados:[], topicos:[
['Prismas, cilindros, pirâmides, cones e esferas','Volume de prisma ou cilindro é área da base × altura; de pirâmide ou cone, um terço desse produto. Esfera: V = 4πr³/3 e área superficial A = 4πr². Calcule área total somando faces e bases necessárias; um cilindro fechado tem A = 2πr² + 2πrh.'],
['Projeção ortogonal e visão espacial','Projeção ortogonal representa pontos por retas perpendiculares ao plano de projeção. Vistas frontal, lateral e superior podem ocultar profundidade ou elementos; identifique direção de observação, faces visíveis e medidas correspondentes antes de comparar objetos e planificações.']
]},
{pagina:'mat-medidas', materia:'mat-estatistica', titulo:'Estatística e Probabilidade', relacionados:['mat-probabilidade'], topicos:[
['Média, moda e mediana','Média simples é soma dos valores dividida pelo número de observações; média ponderada divide a soma de valores × pesos pela soma dos pesos. Moda é o valor mais frequente. A mediana é o valor central após ordenar os dados, ou a média dos dois centrais quando a quantidade é par.'],
['Variância e desvio padrão','Variância mede a dispersão por média dos quadrados dos desvios em relação à média; desvio padrão é a raiz quadrada da variância e mantém a unidade dos dados. Para amostras, usa-se com frequência divisor n−1, enquanto na variância populacional usa-se n: siga a definição solicitada.'],
['Probabilidade simples, condicional e independência','Em espaço amostral equiprovável, P(A) = casos favoráveis/casos possíveis. A probabilidade condicional é P(A|B) = P(A∩B)/P(B), para P(B)>0. Eventos independentes satisfazem P(A∩B) = P(A)P(B); mutuamente exclusivos não são independentes quando ambos têm probabilidade positiva.']
]},
{pagina:'mat-funcao-1', materia:'mat-funcoes', titulo:'Funções e Álgebra', relacionados:['mat-funcao-2','mat-exponencial','mat-graficos-funcao'], topicos:[
['Função afim','Em f(x) = ax + b, a é a taxa de variação e b o valor em x = 0. Quando a > 0, a função é crescente; quando a < 0, decrescente. A raiz, se a ≠ 0, é x = −b/a; interprete os coeficientes nas unidades do problema.'],
['Função quadrática','Em f(x) = ax² + bx + c, com a ≠ 0, as raízes podem ser obtidas por Δ = b² − 4ac e x = (−b ± √Δ)/(2a), quando Δ ≥ 0. O vértice tem xᵥ = −b/(2a); se a > 0 fornece mínimo e, se a < 0, máximo.'],
['Exponenciais e logaritmos','Na função exponencial f(x)=aᵡ, com a > 0 e a ≠ 1, a > 1 indica crescimento e 0 < a < 1, decrescimento. Logaritmo inverte a potência: logₐ b = c equivale a aᶜ = b, com a > 0, a ≠ 1 e b > 0. Modelos financeiros e populacionais exigem explicitar a taxa e o período.'],
['Sequências, PA e PG','Uma progressão aritmética soma razão r a cada termo: aₙ = a₁ + (n−1)r. Uma progressão geométrica multiplica por q: aₙ = a₁qⁿ⁻¹. Para soma de n termos, Sₙ da PA = n(a₁+aₙ)/2 e da PG = a₁(qⁿ−1)/(q−1), quando q ≠ 1.']
]},
{pagina:'mat-combinatoria', materia:'mat-probabilidade', titulo:'Análise Combinatória', relacionados:[], topicos:[
['Princípio Fundamental da Contagem','Se uma escolha tem m possibilidades e, para cada uma, outra tem n possibilidades, o total é m·n. Quando há restrições, conte as escolhas válidas em cada etapa ou subtraia casos proibidos, evitando contagem duplicada.'],
['Arranjos, permutações e combinações','Permutação simples ordena n elementos distintos: n!. Arranjo de n elementos tomados p a p considera ordem: n!/(n−p)!. Combinação não considera ordem: n!/[p!(n−p)!]. Pergunte se trocar posições produz resultado diferente antes de escolher a fórmula.']
]}
];
