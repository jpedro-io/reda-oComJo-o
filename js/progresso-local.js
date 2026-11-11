/** Dados privados ao navegador: nenhuma redação é enviada a servidor. */
const CHAVE_PROGRESSO_LOCAL = 'redacao-com-joao.progresso.v1';
const VAZIO_PROGRESSO_LOCAL = () => ({ versao: 1, acessados: {}, redacoes: [] });

function validarRelatorioLocal(r) {
  const numero = x => typeof x === 'number' && Number.isFinite(x);
  const faixa = x => x && numero(x.min) && numero(x.max);
  const lista = x => x == null || Array.isArray(x);
  const explicacaoValida = e => !e || (typeof e === 'object' && lista(e.zero) && lista(e.motivos) && (!e.motivos || e.motivos.every(m => m && typeof m === 'object' && lista(m.exemplos))) && (!e.nivel || (typeof e.nivel === 'object' && numero(e.nivel.oficial ?? e.nivel.n))) && (!e.proximo || typeof e.proximo === 'object'));
  return !!(r && r.ok === true && numero(r.notaTotal) && (!r.notaFaixa || faixa(r.notaFaixa)) && r.faixa && typeof r.faixa.nome === 'string' && typeof r.faixa.texto === 'string' && Array.isArray(r.competencias) && r.competencias.length === 5 && r.competencias.every(c => c && /^C[1-5]$/.test(c.id) && numero(c.nota) && numero(c.nivel) && (!c.faixaNota || faixa(c.faixaNota)) && explicacaoValida(c.explicacao) && lista(c.melhorias) && lista(c.fortes)) && lista(r.alertas) && lista(r.motivosZero) && (!r.zerada || Array.isArray(r.motivosZero)) && (!r.metricas || ['paragrafos','palavras','linhas'].every(k => r.metricas[k] == null || numero(r.metricas[k]))));
}
function validarProgressoLocal(d) {
  return d && d.versao === 1 && d.acessados && typeof d.acessados === 'object' && !Array.isArray(d.acessados) && Object.keys(d.acessados).every(k => /^[a-z0-9-]{1,100}$/.test(k) && typeof d.acessados[k] === 'string' && !Number.isNaN(Date.parse(d.acessados[k]))) && Array.isArray(d.redacoes) && d.redacoes.every(e => e && typeof e.id === 'string' && /^[a-zA-Z0-9-]{1,100}$/.test(e.id) && typeof e.data === 'string' && !Number.isNaN(Date.parse(e.data)) && typeof e.texto === 'string' && e.texto.length <= 100000 && typeof e.temaId === 'string' && e.temaId.length <= 200 && typeof e.temaLivre === 'string' && e.temaLivre.length <= 1000 && validarRelatorioLocal(e.relatorio));
}
export function lerProgressoLocal() {
  try {
    const bruto = globalThis.localStorage.getItem(CHAVE_PROGRESSO_LOCAL);
    if (bruto === null) return { ok:true, dados:VAZIO_PROGRESSO_LOCAL() };
    const dados = JSON.parse(bruto);
    if (!validarProgressoLocal(dados)) return { ok:false, erro:'Os dados locais não puderam ser lidos; não foram substituídos.' };
    return { ok:true, dados };
  } catch { return { ok:false, erro:'O armazenamento do navegador está indisponível ou os dados não puderam ser lidos.' }; }
}
function gravarProgressoLocal(dados) {
  try { globalThis.localStorage.setItem(CHAVE_PROGRESSO_LOCAL, JSON.stringify(dados)); return {ok:true}; }
  catch { return {ok:false, erro:'Não foi possível salvar neste navegador. Verifique o espaço disponível e as permissões de armazenamento.'}; }
}
export function marcarAcessoLocal(id) {
  if (!/^[a-z0-9-]{1,100}$/.test(id)) return {ok:false, erro:'Conteúdo inválido.'};
  const l = lerProgressoLocal(); if (!l.ok) return l;
  if (Object.prototype.hasOwnProperty.call(l.dados.acessados,id)) return {ok:true};
  l.dados.acessados[id] = new Date().toISOString(); return gravarProgressoLocal(l.dados);
}
export function salvarRedacaoLocal(texto, temaId, temaLivre, relatorio) {
  const l = lerProgressoLocal(); if (!l.ok) return l;
  const id = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const item = {id, data:new Date().toISOString(), texto, temaId, temaLivre, relatorio};
  if (!validarProgressoLocal({versao:1, acessados:{}, redacoes:[item]})) return {ok:false,erro:'Não foi possível salvar esta correção.'};
  l.dados.redacoes.unshift(item);
  return gravarProgressoLocal(l.dados);
}
export function excluirRedacaoLocal(id) {
  const l = lerProgressoLocal(); if (!l.ok) return l;
  l.dados.redacoes = l.dados.redacoes.filter(e => e.id !== id); return gravarProgressoLocal(l.dados);
}
export function limparAcessosLocal() {
  const l = lerProgressoLocal(); if (!l.ok) return l;
  l.dados.acessados = {}; return gravarProgressoLocal(l.dados);
}
/** Importação mescla e não substitui redações existentes com mesmo ID. */
export function importarProgressoLocal(bruto) {
  let importado; try { importado = JSON.parse(bruto); } catch { return {ok:false,erro:'Arquivo de backup inválido.'}; }
  if (!validarProgressoLocal(importado)) return {ok:false,erro:'Arquivo de backup inválido ou de versão não suportada. Nada foi alterado.'};
  const l = lerProgressoLocal(); if (!l.ok) return l;
  const ids = new Set(l.dados.redacoes.map(e=>e.id));
  for (const item of importado.redacoes) { if (!ids.has(item.id)) { l.dados.redacoes.push(item); ids.add(item.id); } }
  l.dados.redacoes.sort((a,b)=>b.data.localeCompare(a.data));
  l.dados.acessados = {...importado.acessados,...l.dados.acessados};
  return gravarProgressoLocal(l.dados);
}
