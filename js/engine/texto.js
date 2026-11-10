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
 * NOTA CHEIA e MEIA-FAIXA.
 *
 * A grade oficial pontua de 40 em 40 (0, 40, 80, 120, 160, 200). Existe um caso,
 * porém, em que a redação não cabe em nenhum dos dois níveis vizinhos: cumpre
 * INTEGRALMENTE o descritor de baixo e já mostra parte do descritor de cima.
 * Aí a nota fica na metade do caminho — 20 pontos acima do nível inferior.
 *
 *   oficializar(160)                       → 160   (nível cheio)
 *   oficializar(180, { intermediario:false }) → 160   (fica no inferior, regra da cartilha)
 *   oficializar(180, { intermediario:true })  → 180   (meia-faixa: entre 160 e 200)
 *   oficializar(20)                        → 20    (abaixo do nível 1 existe meia-faixa, não zero)
 *
 * Quem decide `intermediario` é a competência: só vale quando o texto não tem
 * defeito objetivo nenhum e o único motivo de não subir é a falta de prova do
 * descritor seguinte. Defeito encontrado, teto aplicado → fica no inferior.
 */
export function oficializar(pontos, opts = {}) {
  const p = Math.max(0, Math.min(200, Math.round((Number(pontos) || 0) / 20) * 20));
  const intermediario = opts.intermediario === true;
  const meio = p % 40 === 20;

  let nota;
  if (p === 0) nota = 0;
  else if (!meio) nota = p;                 // nível cheio da grade
  else if (p === 20) nota = 20;             // meia-faixa abaixo do nível 1
  else nota = intermediario ? p : p - 20;   // meia-faixa só com autorização da competência

  const entre = meio
    ? { de: Math.max(0, p - 20), para: Math.min(200, p + 20), degrau: p, aplicado: nota === p }
    : null;
  return { nota, pontos: p, entre, intermediario: nota === p && meio };
}

/** Nível oficial correspondente (0-5), para citar a cartilha.
    Nota de meia-faixa (180) fica no nível de baixo: 4. */
export function nivelOficial(nota) {
  return Math.max(0, Math.min(5, Math.floor((Number(nota) || 0) / 40)));
}
