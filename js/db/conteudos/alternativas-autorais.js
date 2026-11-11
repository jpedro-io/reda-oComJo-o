/** Alterna posições mantendo a alternativa correta e os comentários vinculados ao mesmo texto. */
export function distribuirAlternativas(questao) {
  const letras = 'ABCDE';
  // Determinístico por enunciado: não muda a ordem entre acessos.
  let hash = 0;
  for (const ch of questao.textoApoio.join(' ')) hash = (hash * 31 + ch.codePointAt(0)) >>> 0;
  const deslocamento = hash % 5;
  const novaLetra = antiga => letras[(letras.indexOf(antiga) - deslocamento + 5) % 5];
  const correta = novaLetra(questao.correta);
  const atualizarSolucao = frase => frase
    .replace(/(alternativa(?: correta)?(?: é)?\s+)([A-E])(?=[\s.,;:])/gi, (m, prefixo, letra) => prefixo + (letra.toUpperCase() === questao.correta ? correta : letra))
    .replace(/^(?:Logo,\s+)?([A-E])(?=\s+é correta|\.)/, (m, letra) => m.replace(letra, letra === questao.correta ? correta : letra));
  return {...questao,
    alternativas:[...questao.alternativas.slice(deslocamento), ...questao.alternativas.slice(0, deslocamento)],
    correta,
    resolucao:questao.resolucao.map(atualizarSolucao),
    porqueErram:questao.porqueErram.map(s => s.replace(/^[A-E](?=:)/, letra => novaLetra(letra)))
      .sort((a,b)=>letras.indexOf(a[0])-letras.indexOf(b[0]))
  };
}
