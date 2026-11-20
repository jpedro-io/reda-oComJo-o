// Arquivo responsável por validar e persistir o progresso local do estudante.

const CHAVE_DE_ARMAZENAMENTO = 'redacao-com-joao.progresso.v1';
const LIMITE_DE_TEXTO = 100000;
const LIMITE_DE_TEMA_LIVRE = 1000;

// Seção: criação e validação da estrutura armazenada no navegador.

function criarProgressoVazio() {
  return { versao: 1, acessados: {}, redacoes: [] };
}

function ehNumeroFinito(valor) {
  return typeof valor === 'number' && Number.isFinite(valor);
}

function ehFaixaValida(faixa) {
  return Boolean(faixa) && ehNumeroFinito(faixa.min) && ehNumeroFinito(faixa.max);
}

function ehListaOpcional(valor) {
  return valor == null || Array.isArray(valor);
}

function ehExplicacaoValida(explicacao) {
  if (!explicacao) return true;
  if (typeof explicacao !== 'object') return false;
  if (!ehListaOpcional(explicacao.zero) || !ehListaOpcional(explicacao.motivos)) return false;
  if (explicacao.motivos && !explicacao.motivos.every(motivo =>
    motivo && typeof motivo === 'object' && ehListaOpcional(motivo.exemplos))) return false;
  if (explicacao.nivel &&
    (typeof explicacao.nivel !== 'object' || !ehNumeroFinito(explicacao.nivel.oficial ?? explicacao.nivel.n))) return false;
  return !explicacao.proximo || typeof explicacao.proximo === 'object';
}

function ehRelatorioValido(relatorio) {
  return Boolean(
    relatorio &&
    relatorio.ok === true &&
    ehNumeroFinito(relatorio.notaTotal) &&
    (!relatorio.notaFaixa || ehFaixaValida(relatorio.notaFaixa)) &&
    relatorio.faixa &&
    typeof relatorio.faixa.nome === 'string' &&
    typeof relatorio.faixa.texto === 'string' &&
    Array.isArray(relatorio.competencias) &&
    relatorio.competencias.length === 5 &&
    relatorio.competencias.every(competencia =>
      competencia &&
      /^C[1-5]$/.test(competencia.id) &&
      ehNumeroFinito(competencia.nota) &&
      ehNumeroFinito(competencia.nivel) &&
      (!competencia.faixaNota || ehFaixaValida(competencia.faixaNota)) &&
      ehExplicacaoValida(competencia.explicacao) &&
      ehListaOpcional(competencia.melhorias) &&
      ehListaOpcional(competencia.fortes)
    ) &&
    ehListaOpcional(relatorio.alertas) &&
    ehListaOpcional(relatorio.motivosZero) &&
    (!relatorio.zerada || Array.isArray(relatorio.motivosZero)) &&
    (!relatorio.metricas || ['paragrafos', 'palavras', 'linhas'].every(chave =>
      relatorio.metricas[chave] == null || ehNumeroFinito(relatorio.metricas[chave])))
  );
}

function ehProgressoValido(progresso) {
  return Boolean(
    progresso &&
    progresso.versao === 1 &&
    progresso.acessados &&
    typeof progresso.acessados === 'object' &&
    !Array.isArray(progresso.acessados) &&
    Object.keys(progresso.acessados).every(id =>
      /^[a-z0-9-]{1,100}$/.test(id) &&
      typeof progresso.acessados[id] === 'string' &&
      !Number.isNaN(Date.parse(progresso.acessados[id]))) &&
    Array.isArray(progresso.redacoes) &&
    progresso.redacoes.every(redacao =>
      redacao &&
      typeof redacao.id === 'string' &&
      /^[a-zA-Z0-9-]{1,100}$/.test(redacao.id) &&
      typeof redacao.data === 'string' &&
      !Number.isNaN(Date.parse(redacao.data)) &&
      typeof redacao.texto === 'string' &&
      redacao.texto.length <= LIMITE_DE_TEXTO &&
      typeof redacao.temaId === 'string' &&
      redacao.temaId.length <= 200 &&
      typeof redacao.temaLivre === 'string' &&
      redacao.temaLivre.length <= LIMITE_DE_TEMA_LIVRE &&
      ehRelatorioValido(redacao.relatorio)
    )
  );
}

function respostaDeErro(erro) {
  return { ok: false, erro };
}

// Seção: leitura e escrita segura no armazenamento local.

export function lerProgressoLocal() {
  try {
    const conteudoArmazenado = globalThis.localStorage.getItem(CHAVE_DE_ARMAZENAMENTO);
    if (conteudoArmazenado === null) return { ok: true, dados: criarProgressoVazio() };

    const progresso = JSON.parse(conteudoArmazenado);
    if (!ehProgressoValido(progresso)) {
      return respostaDeErro('Os dados locais não puderam ser lidos; não foram substituídos.');
    }
    return { ok: true, dados: progresso };
  } catch {
    return respostaDeErro('O armazenamento do navegador está indisponível ou os dados não puderam ser lidos.');
  }
}

function gravarProgressoLocal(progresso) {
  try {
    globalThis.localStorage.setItem(CHAVE_DE_ARMAZENAMENTO, JSON.stringify(progresso));
    return { ok: true };
  } catch {
    return respostaDeErro('Não foi possível salvar neste navegador. Verifique o espaço disponível e as permissões de armazenamento.');
  }
}

// Seção: operações de progresso e histórico de redações.

export function marcarAcessoLocal(idDoConteudo) {
  if (!/^[a-z0-9-]{1,100}$/.test(idDoConteudo)) {
    return respostaDeErro('Conteúdo inválido.');
  }

  const resultadoDaLeitura = lerProgressoLocal();
  if (!resultadoDaLeitura.ok) return resultadoDaLeitura;
  if (Object.prototype.hasOwnProperty.call(resultadoDaLeitura.dados.acessados, idDoConteudo)) {
    return { ok: true };
  }

  resultadoDaLeitura.dados.acessados[idDoConteudo] = new Date().toISOString();
  return gravarProgressoLocal(resultadoDaLeitura.dados);
}

function criarIdDeRedacao() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

export function salvarRedacaoLocal(texto, temaId, temaLivre, relatorio) {
  const resultadoDaLeitura = lerProgressoLocal();
  if (!resultadoDaLeitura.ok) return resultadoDaLeitura;

  const redacao = {
    id: criarIdDeRedacao(),
    data: new Date().toISOString(),
    texto,
    temaId,
    temaLivre,
    relatorio
  };

  if (!ehProgressoValido({ versao: 1, acessados: {}, redacoes: [redacao] })) {
    return respostaDeErro('Não foi possível salvar esta correção.');
  }

  resultadoDaLeitura.dados.redacoes.unshift(redacao);
  return gravarProgressoLocal(resultadoDaLeitura.dados);
}

export function excluirRedacaoLocal(idDaRedacao) {
  const resultadoDaLeitura = lerProgressoLocal();
  if (!resultadoDaLeitura.ok) return resultadoDaLeitura;

  resultadoDaLeitura.dados.redacoes = resultadoDaLeitura.dados.redacoes
    .filter(redacao => redacao.id !== idDaRedacao);
  return gravarProgressoLocal(resultadoDaLeitura.dados);
}

export function limparAcessosLocal() {
  const resultadoDaLeitura = lerProgressoLocal();
  if (!resultadoDaLeitura.ok) return resultadoDaLeitura;

  resultadoDaLeitura.dados.acessados = {};
  return gravarProgressoLocal(resultadoDaLeitura.dados);
}

export function importarProgressoLocal(conteudoDoArquivo) {
  let progressoImportado;
  try {
    progressoImportado = JSON.parse(conteudoDoArquivo);
  } catch {
    return respostaDeErro('Arquivo de backup inválido.');
  }

  if (!ehProgressoValido(progressoImportado)) {
    return respostaDeErro('Arquivo de backup inválido ou de versão não suportada. Nada foi alterado.');
  }

  const resultadoDaLeitura = lerProgressoLocal();
  if (!resultadoDaLeitura.ok) return resultadoDaLeitura;

  const idsJaSalvos = new Set(resultadoDaLeitura.dados.redacoes.map(redacao => redacao.id));
  for (const redacao of progressoImportado.redacoes) {
    if (!idsJaSalvos.has(redacao.id)) {
      resultadoDaLeitura.dados.redacoes.push(redacao);
      idsJaSalvos.add(redacao.id);
    }
  }

  resultadoDaLeitura.dados.redacoes.sort((primeira, segunda) => segunda.data.localeCompare(primeira.data));
  resultadoDaLeitura.dados.acessados = {
    ...progressoImportado.acessados,
    ...resultadoDaLeitura.dados.acessados
  };
  return gravarProgressoLocal(resultadoDaLeitura.dados);
}
