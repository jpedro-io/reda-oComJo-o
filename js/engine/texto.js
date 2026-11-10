/**
 * Utilitários de análise textual.
 */

/** Remove acentos e coloca em minúsculas (para busca semântica). */
export function normalizar(texto) {
  return (texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

/** Mantém acentos, só minúsculas (para checagem ortográfica). */
export function minusculo(texto) {
  return (texto || '').toLowerCase();
}

/** Divide em parágrafos (linha em branco ou quebra simples). */
export function paragrafos(texto) {
  return (texto || '')
    .split(/\n+/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 0);
}

/** Divide em frases. */
export function frases(texto) {
  return (texto || '')
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(f => f.trim())
    .filter(f => f.length > 0);
}

/** Lista de palavras (com acento, minúsculas). */
export function palavras(texto) {
  return minusculo(texto).match(/[a-zà-ÿ0-9']+/g) || [];
}

/** Conta ocorrências de uma string simples (sem regex) no texto já normalizado. */
export function contarTermo(norm, termo) {
  const alvo = normalizar(termo);
  if (!alvo) return 0;
  let count = 0;
  let idx = 0;
  while (true) {
    const pos = norm.indexOf(alvo, idx);
    if (pos === -1) break;
    // garante limite de palavra nas duas pontas
    const antes = pos === 0 ? ' ' : norm[pos - 1];
    const depois = pos + alvo.length >= norm.length ? ' ' : norm[pos + alvo.length];
    const bordaAntes = /[^a-z0-9]/.test(antes) || alvo.startsWith('%');
    const bordaDepois = /[^a-z0-9]/.test(depois) || alvo.endsWith('%');
    if (bordaAntes && bordaDepois) count++;
    idx = pos + alvo.length;
  }
  return count;
}

/** Soma as ocorrências de uma lista de termos. */
export function contarLista(norm, lista) {
  return lista.reduce((acc, termo) => acc + contarTermo(norm, termo), 0);
}

/** Retorna os termos de uma lista que aparecem no texto. */
export function termosEncontrados(norm, lista) {
  return lista.filter(termo => contarTermo(norm, termo) > 0);
}

/** Métricas gerais do texto. */
export function medir(texto, temaKeywords = []) {
  const ps = paragrafos(texto);
  const fs = frases(texto);
  const ws = palavras(texto);
  const caracteres = (texto || '').length;
  // estimativa de linhas da folha oficial (~62 caracteres úteis por linha)
  const linhasTexto = (texto || '').split('\n').length;
  const estimativaLinhas = Math.max(
    linhasTexto,
    Math.ceil(caracteres / 66)
  );
  const semStop = ws.filter(p => p.length > 3);
  const unicas = new Set(semStop);
  return {
    caracteres,
    linhas: estimativaLinhas,
    linhasDigitadas: linhasTexto,
    palavras: ws.length,
    palavrasConteudo: semStop.length,
    unicas: unicas.size,
    paragrafos: ps.length,
    frases: fs.length,
    mediaPalavrasFrase: fs.length ? Math.round(ws.length / fs.length) : 0,
    paragrafosLongos: ps.filter(p => palavras(p).length > 110).length,
    paragrafosCurtos: ps.filter(p => palavras(p).length < 20).length,
    diversidade: semStop.length ? +(unicas.size / semStop.length).toFixed(2) : 0,
    temaKeywords
  };
}

/** Trecho de destaque (com reticências) em volta de uma ocorrência. */
export function trecho(texto, termo, janela = 45) {
  const norm = normalizar(texto);
  const pos = norm.indexOf(normalizar(termo));
  if (pos === -1) return null;
  const ini = Math.max(0, pos - janela);
  const fim = Math.min(texto.length, pos + termo.length + janela);
  return (ini > 0 ? '…' : '') + texto.slice(ini, fim).replace(/\s+/g, ' ').trim() + (fim < texto.length ? '…' : '');
}

/** Limita nota ao intervalo e arredonda para múltiplo de 5. */
export function limitar(nota, min = 0, max = 200) {
  return Math.max(min, Math.min(max, Math.round(nota / 5) * 5));
}

/**
 * Arredonda para os degraus de 20 pontos (0, 20, 40, … 200).
 * A escala tem 11 degraus: os seis pontos oficiais da cartilha (0, 40, 80,
 * 120, 160, 200) e um degrau intermediário entre cada par deles.
 */
export function degrau(nota, min = 0, max = 200) {
  const v = Math.round(nota / 20) * 20;
  return Math.max(min, Math.min(max, v));
}

/** Converte nota (0-200) no degrau (0-10). */
export function nivel(nota) {
  const v = Math.max(0, Math.min(200, Number(nota) || 0));
  return Math.round(v / 20);
}

/**
 * NOTA OFICIAL (40 em 40) e FAIXA (o intervalo em que dois avaliadores cairiam).
 *
 * A cartilha é explícita: cada avaliador atribui de 0 a 200 por competência e a
 * nota final é a MÉDIA das duas notas totais. Como os dois avaliadores divergem,
 * a nota de uma competência pode perfeitamente ser 160, 180 ou 200 — por isso o
 * corretor nunca publica um número exato, e sim uma FAIXA.
 *
 * Aqui:
 *   - `nota` é sempre a nota oficial da grade: 0, 40, 80, 120, 160 ou 200;
 *   - `abertura` é quanto o texto ainda comporta de divergência para cima:
 *       20 pontos quando o texto está firme no nível alcançado;
 *       40 pontos quando a leitura interna mostra que ele já traz parte do
 *       descritor seguinte (o segundo avaliador poderia subir um nível);
 *   - `faixa` é [nota, nota + abertura], limitada a 200.
 */
export function oficializar(pontos) {
  const p = Math.max(0, Math.min(200, Math.round((Number(pontos) || 0) / 20) * 20));
  const nota = Math.max(0, Math.min(200, Math.floor(p / 40) * 40));
  const abertura = nota >= 200 ? 0 : (p % 40 === 20 ? 40 : 20);
  return {
    nota,
    pontos: p,
    abertura,
    faixa: { min: nota, max: Math.min(200, nota + abertura) }
  };
}

/**
 * Nível oficial correspondente (0–5), para citar a cartilha.
 *
 * A conta é sempre `floor(nota / 40)`: a leitura interna de 180 não é uma nota
 * publicada — ela é o diagnóstico de um texto que cumpre o nível 4 e já mostra
 * parte do 5. O nível citado ao estudante é o de baixo, como manda a grade.
 */
export function nivelOficial(nota) {
  return Math.max(0, Math.min(5, Math.floor((Number(nota) || 0) / 40)));
}
