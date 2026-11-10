/* Estilo: o que um professor marca com o lápis na margem.
   Três famílias de achado, todas tiradas das grades das cartilhas:
   - repetição de palavra (a cartilha pede retomada por sinônimo ou pronome);
   - repetição de expressão/frase (falta de progressão: o texto anda em círculo);
   - pontuação insuficiente (período que não respira, parágrafo que não fecha).

   Nada aqui interpreta sentido: são medidas de superfície, com limiar
   explícito, para que a nota não dependa de "achismo". */

import { normalizar, paragrafos, frases, palavras } from './texto.js';
import { STOPWORDS } from '../db/lexico.js';

const STOP = STOPWORDS instanceof Set ? STOPWORDS : new Set(STOPWORDS || []);

/* palavras que a redação pode repetir à vontade: são o próprio assunto ou
   fazem parte de qualquer texto argumentativo */
const TOLERADAS = new Set([
  'brasil', 'brasileira', 'brasileiro', 'brasileiros', 'brasileiras', 'pais',
  'sociedade', 'social', 'sociais', 'governo', 'estado', 'publica', 'publico',
  'publicas', 'publicos', 'nacional', 'tema', 'redacao', 'texto', 'enem'
]);

/* Palavras de recheio: quando voltam, é enchimento — não é vocabulário do
   tema. É nesta lista que a repetição aparece na leitura de um professor. */
export const GENERICAS = new Set([
  'problema', 'problemas', 'pessoa', 'pessoas', 'questao', 'questoes', 'coisa',
  'coisas', 'muito', 'muita', 'muitos', 'muitas', 'grande', 'grandes',
  'importante', 'importantes', 'grave', 'graves', 'serio', 'seria', 'varios',
  'varias', 'diversos', 'diversas', 'sempre', 'tambem', 'ainda', 'apenas',
  'somente', 'realmente', 'basicamente', 'simplesmente', 'totalmente',
  'completamente', 'principalmente', 'infelizmente', 'felizmente', 'fazer',
  'fazem', 'fazendo', 'feito', 'dizer', 'dizem', 'falar', 'falam', 'ficar',
  'ficam', 'colocar', 'colocam', 'ajudar', 'ajuda', 'precisar', 'precisa',
  'precisam', 'deveria', 'deveriam', 'conseguir', 'conseguem', 'existir',
  'existe', 'existem', 'acontece', 'acontecem', 'forma', 'formas', 'modo',
  'maneira', 'parte', 'partes', 'caso', 'casos', 'falta', 'faltam', 'poderia',
  'poderiam', 'atraves', 'devido', 'relacao', 'relacao', 'momento', 'situacao'
]);

const limpo = w => w.replace(/[^a-zà-ÿ]/g, '');

/** Palavras deconteúdo repetidas no texto inteiro e no mesmo parágrafo. */
export function repeticaoLexical(texto, termosDoTema = []) {
  const ws = palavras(texto).map(limpo).filter(Boolean);
  const tema = new Set(termosDoTema.map(t => normalizar(t)));
  const contagem = new Map();
  ws.forEach(w => {
    if (w.length < 4 || STOP.has(w) || TOLERADAS.has(w)) return;
    if ([...tema].some(t => t === w || (t.length > 5 && w.startsWith(t.slice(0, 5))))) return;
    contagem.set(w, (contagem.get(w) || 0) + 1);
  });

  // repetição dentro do mesmo parágrafo pesa mais na leitura
  const porParagrafo = new Map();
  paragrafos(texto).forEach((p, i) => {
    const vistos = new Map();
    palavras(p).map(limpo).filter(w => w.length >= 4 && !STOP.has(w) && !TOLERADAS.has(w))
      .forEach(w => vistos.set(w, (vistos.get(w) || 0) + 1));
    vistos.forEach((n, w) => {
      if (n >= 2) {
        if (!porParagrafo.has(w)) porParagrafo.set(w, []);
        porParagrafo.get(w).push({ paragrafo: i + 1, n });
      }
    });
  });

  /* Duas réguas, para não punir vocabulário do tema:
     - palavra de recheio (GENERICAS) volta 4× → já é repetição;
     - palavra de conteúdo que não é do tema: só a partir de 8×, porque 5 ou 6
       ocorrências de um termo técnico citado pelo texto é normal. */
  const achados = [...contagem.entries()]
    .map(([termo, n]) => ({
      termo,
      n,
      generica: GENERICAS.has(termo),
      densidade: +((n / Math.max(1, ws.length)) * 100).toFixed(2),
      noMesmoParagrafo: (porParagrafo.get(termo) || []).filter(p => GENERICAS.has(termo) || p.n >= 3)
    }))
    .filter(a => (a.generica && a.n >= 4) || a.n >= 8)
    .sort((a, b) => (b.n - a.n) || (a.generica ? -1 : 1));

  return achados;
}

/* abreviações que não terminam período */
const ABREV = new Set(['cf', 'dr', 'dra', 'sr', 'sra', 'prof', 'profa', 'p', 'pp', 'etc', 'ex', 'obs', 'art', 'n', 'no', 'vol']);

/** Frases, com o texto bruto de cada uma (para citar no relatório). */
export function frasesBrutas(texto) {
  const saida = [];
  for (const par of paragrafos(texto)) {
    const partes = par.split(/(?<=[.!?…])\s+/);
    partes.forEach(p => {
      const bruto = p.trim();
      if (!bruto) return;
      const ultima = limpo(bruto.split(/\s+/).pop() || '');
      const ehAbrev = /^[a-z]{1,4}$/.test(ultima) && ABREV.has(ultima);
      if (ehAbrev && bruto !== partes[partes.length - 1].trim()) return;
      saida.push(bruto);
    });
  }
  return saida;
}

const chaveDeFrase = f => normalizar(f).replace(/[^a-z0-9à-ÿ ]/g, ' ').replace(/\s+/g, ' ').trim();

/** Frases idênticas ou quase idênticas (Jaccard de palavras ≥ 0,78). */
export function frasesRepetidas(texto) {
  const fs = frasesBrutas(texto).filter(f => palavras(f).length >= 5);
  const chaves = fs.map(chaveDeFrase);
  const conjuntos = chaves.map(c => new Set(c.split(' ').filter(Boolean)));
  const pares = [];
  const usadas = new Set();

  for (let i = 0; i < fs.length; i++) {
    if (usadas.has(i)) continue;
    const iguais = [{ frase: fs[i], indice: i }];
    for (let j = i + 1; j < fs.length; j++) {
      if (usadas.has(j)) continue;
      const a = conjuntos[i], b = conjuntos[j];
      if (!a.size || !b.size) continue;
      let inter = 0;
      a.forEach(w => { if (b.has(w)) inter++; });
      const jac = inter / (a.size + b.size - inter);
      if (jac >= 0.78) { iguais.push({ frase: fs[j], indice: j }); usadas.add(j); }
    }
    if (iguais.length > 1) {
      usadas.add(i);
      pares.push({ frase: fs[i], n: iguais.length, ocorrencias: iguais });
    }
  }
  return pares;
}

/** Expressões de 3 palavras de conteúdo repetidas 2+ vezes. */
export function expressoesRepetidas(texto, termosDoTema = []) {
  const tema = new Set(termosDoTema.map(t => normalizar(t)));
  const ws = palavras(texto).map(limpo).filter(Boolean);
  const conta = new Map();
  for (let i = 0; i + 2 < ws.length; i++) {
    const tri = [ws[i], ws[i + 1], ws[i + 2]];
    const conteudo = tri.filter(w => w.length > 3 && !STOP.has(w) && !TOLERADAS.has(w) && !tema.has(w));
    if (conteudo.length < 2) continue;
    const k = tri.join(' ');
    conta.set(k, (conta.get(k) || 0) + 1);
  }
  return [...conta.entries()]
    .filter(([, n]) => n >= 2)
    .map(([expressao, n]) => ({ expressao, n }))
    .sort((a, b) => b.n - a.n)
    .slice(0, 6);
}

/** Abertura repetida de períodos (mesmas duas primeiras palavras). */
export function aberturasRepetidas(texto) {
  const fs = frasesBrutas(texto);
  const conta = new Map();
  fs.forEach(f => {
    const ini = palavras(f).slice(0, 2).map(limpo).join(' ');
    if (ini.split(' ').filter(w => w.length > 2).length < 2) return;
    conta.set(ini, (conta.get(ini) || 0) + 1);
  });
  return [...conta.entries()].filter(([, n]) => n >= 3).map(([abertura, n]) => ({ abertura, n }));
}

/** Tudo o que a cartilha cobra de pontuação, medido. */
export function pontuacao(texto) {
  const bruto = texto || '';
  const fs = frasesBrutas(bruto);
  const ps = paragrafos(bruto);
  const ws = palavras(bruto);

  const conta = re => (bruto.match(re) || []).length;
  const pontos = conta(/[.!?]/g);
  const virgulas = conta(/,/g);
  const doisPontos = conta(/:/g);
  const pontoVirgula = conta(/;/g);

  // período longo sem NENHUMA pausa interna: sintoma clássico de texto corrido
  const semPausa = fs
    .filter(f => palavras(f).length >= 32 && !/[,;:—–()]/.test(f))
    .map(f => f.trim().slice(0, 150));

  // período muito longo mesmo com vírgula: leitura travada
  const longos = fs
    .filter(f => palavras(f).length > 40)
    .map(f => f.trim().slice(0, 150));

  const semPontoFinal = bruto.trim().length > 0 && !/[.!?…]["')\]]?$/.test(bruto.trim());
  const paragrafosSemPonto = ps
    .map((p, i) => ({ i: i + 1, p: p.trim() }))
    .filter(({ p }) => p && !/[.!?…]["')\]]?$/.test(p))
    .map(({ i }) => i);

  const mediaFrase = fs.length ? ws.length / fs.length : 0;
  const virgulasPorFrase = fs.length ? virgulas / fs.length : 0;

  /* Escassez: frases longas e quase nenhuma vírgula. Um texto de 25 palavras
     por período com 0,4 vírgula por período está sendo lido sem pausa. */
  const escassa = mediaFrase >= 22 && virgulasPorFrase < 0.6 && fs.length >= 3;

  // encadeamento por "e": coordenação em série no lugar de subordinação
  const eEncadeado = (bruto.match(/\s+e\s+/gi) || []).length;
  const porFrase = fs.length ? eEncadeado / fs.length : 0;

  // vírgula entre orações independentes (comma splice)
  const emenda = fs.filter(f => {
    const n = palavras(f).length;
    return n >= 26 && (f.match(/,/g) || []).length >= 3 && !/;|:/.test(f);
  }).map(f => f.trim().slice(0, 150));

  return {
    pontos,
    virgulas,
    doisPontos,
    pontoVirgula,
    frases: fs.length,
    palavras: ws.length,
    mediaPalavrasFrase: Math.round(mediaFrase),
    virgulasPorFrase: +virgulasPorFrase.toFixed(2),
    periodosSemPausa: semPausa,
    periodosLongos: longos,
    semPontoFinal,
    paragrafosSemPonto,
    pontuacaoEscassa: escassa,
    ePorFrase: +porFrase.toFixed(2),
    encadeamentoComE: porFrase >= 2.2,
    emendasComVirgula: emenda,
    riqueza: +(((virgulas + doisPontos * 2 + pontoVirgula * 2) / Math.max(1, fs.length))).toFixed(2)
  };
}

/** Pacote completo de estilo, para as competências I e IV. */
export function analisarEstilo(texto, termosDoTema = []) {
  const pont = pontuacao(texto);
  const repeticao = repeticaoLexical(texto, termosDoTema);
  const expressoes = expressoesRepetidas(texto, termosDoTema);
  const frasesIguais = frasesRepetidas(texto);
  const aberturas = aberturasRepetidas(texto);

  /* Gravidade da repetição: uma palavra 4x é deslize; 8x ou três palavras
     marteladas é padrão de escrita — e padrão, na cartilha, é o que separa
     "domínio mediano" de "bom domínio". */
  const grave = repeticao.filter(a => a.n >= 8).length;
  const media = repeticao.filter(a => a.n >= 5 && a.n < 8).length;
  const mesmaFrase = repeticao.filter(a => a.noMesmoParagrafo.some(p => p.n >= 3)).length;
  const pesoRep = grave * 3 + media * 2 + Math.min(2, mesmaFrase);
  const pesoExp = expressoes.filter(o => o.n >= 2).length;
  const pesoFrase = frasesIguais.reduce((a, f) => a + f.n - 1, 0);

  return {
    pontuacao: pont,
    repeticao,
    expressoes,
    frasesRepetidas: frasesIguais,
    aberturasRepetidas: aberturas,
    pesoRepeticao: pesoRep,
    pesoExpressao: pesoExp,
    pesoFrase: pesoFrase
  };
}
