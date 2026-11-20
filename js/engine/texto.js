// Arquivo responsável por normalizar textos e calcular métricas de redação.

// Seção: normalização, segmentação e métricas de texto.

export function normalizar(texto) {
  return (texto || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

export function minusculo(texto) {
  return (texto || '').toLowerCase();
}

export function paragrafos(texto) {
  return (texto || '')
    .split(/\n+/)
    .map(p => p.replace(/\s+/g, ' ').trim())
    .filter(p => p.length > 0);
}

export function frases(texto) {
  return (texto || '')
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map(f => f.trim())
    .filter(f => f.length > 0);
}

export function palavras(texto) {
  return minusculo(texto).match(/[a-zà-ÿ0-9']+/g) || [];
}

export function contarTermo(norm, termo) {
  const alvo = normalizar(termo);
  if (!alvo) return 0;
  let count = 0;
  let idx = 0;
  while (true) {
    const pos = norm.indexOf(alvo, idx);
    if (pos === -1) break;
    const antes = pos === 0 ? ' ' : norm[pos - 1];
    const depois = pos + alvo.length >= norm.length ? ' ' : norm[pos + alvo.length];
    const bordaAntes = /[^a-z0-9]/.test(antes) || alvo.startsWith('%');
    const bordaDepois = /[^a-z0-9]/.test(depois) || alvo.endsWith('%');
    if (bordaAntes && bordaDepois) count++;
    idx = pos + alvo.length;
  }
  return count;
}

export function contarLista(norm, lista) {
  return lista.reduce((acc, termo) => acc + contarTermo(norm, termo), 0);
}

export function termosEncontrados(norm, lista) {
  return lista.filter(termo => contarTermo(norm, termo) > 0);
}

export function medir(texto, temaKeywords = []) {
  const ps = paragrafos(texto);
  const fs = frases(texto);
  const ws = palavras(texto);
  const caracteres = (texto || '').length;
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

export function trecho(texto, termo, janela = 45) {
  const norm = normalizar(texto);
  const pos = norm.indexOf(normalizar(termo));
  if (pos === -1) return null;
  const ini = Math.max(0, pos - janela);
  const fim = Math.min(texto.length, pos + termo.length + janela);
  return (ini > 0 ? '…' : '') + texto.slice(ini, fim).replace(/\s+/g, ' ').trim() + (fim < texto.length ? '…' : '');
}

// Seção: limites e conversões de nota.

export function limitar(nota, min = 0, max = 200) {
  return Math.max(min, Math.min(max, Math.round(nota / 5) * 5));
}

export function degrau(nota, min = 0, max = 200) {
  const v = Math.round(nota / 20) * 20;
  return Math.max(min, Math.min(max, v));
}

export function nivel(nota) {
  const v = Math.max(0, Math.min(200, Number(nota) || 0));
  return Math.round(v / 20);
}

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

export function nivelOficial(nota) {
  return Math.max(0, Math.min(5, Math.floor((Number(nota) || 0) / 40)));
}
