/**
 * Busca no YouTube o vídeo de cada conteúdo e grava js/db/conteudos/videos.js.
 *
 * Por que buscar em vez de fixar IDs: vídeo do YouTube some, muda de URL e é
 * bloqueado por região. Um ID chumbado no código vira quadrado preto no site
 * meses depois. Aqui a busca é refeita quando se quiser (`node
 * tools/buscar-videos.mjs`) e o resultado fica num arquivo que dá para revisar.
 *
 * A busca usa o título do conteúdo + o primeiro canal indicado para a matéria.
 * O título do vídeo encontrado é gravado junto: se a busca trouxe coisa errada,
 * aparece embaixo do player e dá para ver na hora.
 *
 *   node tools/buscar-videos.mjs          # todos os que faltam
 *   node tools/buscar-videos.mjs --tudo   # refaz todos
 */
import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { AREAS } from '../js/db/conteudos/estrutura.js';

const TUDO = process.argv.includes('--tudo');
const SAIDA = new URL('../js/db/conteudos/videos.js', import.meta.url);
/* o arquivo é JSON dentro de um `export` — assim este script relê o que já
   buscou sem precisar de parser de JavaScript */
let atual = {};
if (existsSync(SAIDA) && !TUDO) {
  const txt = readFileSync(SAIDA, 'utf8');
  const m = txt.match(/export const VIDEOS = (\{[\s\S]*\});/);
  if (m) { try { atual = JSON.parse(m[1]); } catch { atual = {}; } }
}

const espera = ms => new Promise(r => setTimeout(r, ms));
const limpa = s => s.replace(/\s+/g, ' ').trim();

async function buscarUma(titulo, canal) {
  const q = encodeURIComponent(`${titulo} ${canal || ''} enem`.trim());
  const url = `https://www.youtube.com/results?search_query=${q}&hl=pt-BR`;
  const r = await fetch(url, {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36',
      'accept-language': 'pt-BR,pt;q=0.9',
    },
  });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const html = await r.text();
  const i = html.indexOf('"videoId":"');
  if (i < 0) return null;
  const id = html.slice(i + 11, i + 22);
  if (!/^[\w-]{11}$/.test(id)) return null;
  const janela = html.slice(i, i + 900);
  const t = janela.match(/"title":\{"runs":\[\{"text":"((?:[^"\\]|\\.)*)"/);
  let tituloVideo = t ? JSON.parse('"' + t[1] + '"') : '';
  return { id, titulo: limpa(tituloVideo) };
}

/* O YouTube fecha a porta quando recebe muitas buscas seguidas: três
   tentativas com espera crescente resolvem sem martelar o servidor. */
async function buscar(titulo, canal) {
  let ultimo;
  for (let t = 0; t < 3; t++) {
    try { return await buscarUma(titulo, canal); }
    catch (e) { ultimo = e; await espera(1500 * (t + 1)); }
  }
  throw ultimo;
}

let n = 0, falhas = [];
for (const area of AREAS) {
  for (const materia of area.materias) {
    const canal = materia.canais[0] || '';
    for (const c of materia.conteudos) {
      if (atual[c.id] && !TUDO) continue;
      try {
        const v = await buscar(c.titulo, canal);
        if (v) { atual[c.id] = { ...v, canal, busca: `${c.titulo} ${canal}`.trim() }; n++; }
        else falhas.push(c.id);
      } catch (e) {
        falhas.push(`${c.id} (${e.message})`);
      }
      await espera(1100);
    }
  }
}

const corpo = JSON.stringify(
  Object.fromEntries(Object.keys(atual).sort().map(k => [k, {
    id: atual[k].id, titulo: atual[k].titulo, canal: atual[k].canal || '',
  }])), null, 2);

writeFileSync(SAIDA, `/**
 * Vídeo do YouTube por conteúdo — gerado por tools/buscar-videos.mjs.
 * Para trocar um vídeo, mude o \`id\` aqui (11 caracteres, o que vem depois de
 * watch?v=). Para refazer a busca: node tools/buscar-videos.mjs --tudo
 */
export const VIDEOS = ${corpo};
`);

console.log(`buscados: ${n} · no arquivo: ${Object.keys(atual).length}`);
if (falhas.length) console.log('sem resultado:', falhas.join(', '));
