/**
 * INTERFACE — 6 páginas, um molde por conteúdo (ver DESIGN.md §5).
 *
 *   #/                        hero assimétrico · índice · faixa das competências
 *   #/criterios               régua vertical de níveis
 *   #/estrutura               linha do tempo · trilha da proposta · esqueleto
 *   #/comandos                acordeão tipográfico dos comandos do tema
 *   #/temas                   lista densa com filtros
 *   #/redacoes                crônica com espinha de ano
 *   #/redacoes/:id            documento comentado
 *   #/corrigir?tema=&texto=   workspace de correção
 */

import { CRITERIOS, ZEROS, AVISO_TANGENCIAMENTO, CALCULO_NOTA } from './db/criterios.js';
import { PARTES, ELEMENTOS_PROPOSTA, ESQUELETO, DISTRIBUICAO_LINHAS } from './db/estrutura.js';
import { REGRA_GERAL, COMANDOS, comandoDoTema } from './db/comandos.js';
import { GRADES } from './db/cartilhas.js';
import { motivadoresDe } from './db/motivadores.js';
import { termoBonito } from './db/acentos.js';
import { NIVEIS, ehOficial } from './db/niveis.js';
import { TEMAS } from './db/temas.js';
import { REDACOES, TIPOS_DESTAQUE, buscarRedacao, redacoesPorAno, TOTAL_NOTA_MIL } from './db/redacoes.js';
import { EXEMPLOS } from './db/exemplos.js';
import { corrigir } from './engine/corrigir.js';
import { ativarMovimento } from './motion.js';

const app = document.getElementById('app');
const toastEl = document.getElementById('toast');

/* ------------------------------------------------------------------ utilidades */

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const semAcento = (s = '') => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

let timerToast = null;
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('visivel');
  clearTimeout(timerToast);
  timerToast = setTimeout(() => toastEl.classList.remove('visivel'), 2600);
}

/* ícones: família própria, traço 1.75, grade 24 — nenhuma biblioteca */
const ICONE = {
  seta: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  voltar: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  alerta: '<path d="M12 4.5 3 20h18L12 4.5Z"/><path d="M12 10v4.5M12 17.4v.2"/>',
  doc: '<path d="M6 3.5h8l4.5 4.5v12.5H6z"/><path d="M14 3.5V8h4.5M9 12h6M9 16h4"/>',
  regua: '<path d="M3.5 9.5h17v5h-17z"/><path d="M8 9.5v2.2M12 9.5v3.2M16 9.5v2.2"/>',
  camada: '<path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z"/><path d="M3.5 16 12 20.5 20.5 16"/>',
  tema: '<path d="M4.5 5.5h15v10h-8l-4.5 4v-4H4.5z"/>',
  analise: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
  mira: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>'
};
const ico = (nome, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONE[nome] || ''}</svg>`;

/* ------------------------------------------------------------------ 1. HOME */

function viewHome() {
  const indice = [
    ['#/criterios', 'Critérios', 'As 5 competências, os 6 níveis de cada uma e por que o mesmo erro repetido pesa mais.', 'regua'],
    ['#/estrutura', 'Estrutura', 'Anatomia parte por parte, os 5 elementos da proposta e o esqueleto de 30 linhas.', 'camada'],
    ['#/comandos', 'Ler o tema', 'O substantivo que abre a proposta é um pedido. 11 comandos, com armadilha e roteiro.', 'mira'],
    ['#/temas', 'Temas', `${TEMAS.length} temas com recorte, núcleo, vocabulário de apoio e repertórios.`, 'tema'],
    ['#/redacoes', 'Redações analisadas', `${TOTAL_NOTA_MIL} redações nota 1000, de 2014 a 2026, com cada parágrafo comentado.`, 'doc'],
    ['#/corrigir', 'Corrigir', 'Cole seu texto: nota por competência, o que segura a nota e o que fazer primeiro.', 'analise']
  ];

  const comps = CRITERIOS.map(c => `
    <div class="hp-linha">
      <span class="id">${c.id}</span>
      <span class="nome">${esc(c.nome)}</span>
      <span class="val">0–200</span>
    </div>`).join('');

  return `
  <section class="hero">
    <div class="hero-copy">
      <span class="eyebrow" data-entrada>Guia da redação do ENEM</span>
      <h1 data-entrada>Do tema à <em>nota 1000</em>, sem decoreba.</h1>
      <p class="hero-sub" data-entrada>Critérios oficiais explicados linha por linha, ${TOTAL_NOTA_MIL} redações nota 1000 abertas parágrafo por parágrafo e um corretor que mostra onde a nota escapa.</p>
      <div class="hero-cta" data-entrada>
        <a class="btn btn-primario" href="#/corrigir">${ico('analise')} Corrigir minha redação</a>
        <a class="btn" href="#/redacoes">Ver as redações analisadas</a>
      </div>
      <dl class="hero-stats" data-entrada>
        <div><dd><span>${TOTAL_NOTA_MIL}</span></dd><dt>redações nota 1000</dt></div>
        <div><dd>${TEMAS.length}</dd><dt>temas mapeados</dt></div>
        <div><dd>${COMANDOS.length}</dd><dt>comandos do tema</dt></div>
      </dl>
    </div>

    <aside class="hero-painel" data-entrada aria-label="Como a nota é formada">
      <div class="hp-topo">
        <strong>Como a nota se forma</strong>
        <span class="hp-selo">${ico('check')} 1000 pontos</span>
      </div>
      <div class="hp-lista">${comps}</div>
      <p class="hp-pe">Cada competência vale <b>0, 40, 80, 120, 160 ou 200</b>, como na grade oficial — e, quando o texto cumpre um nível inteiro e já mostra parte do seguinte, a <b>meia-faixa</b>: 20, 60, 100, 140, 180.</p>
    </aside>
  </section>

  <section aria-labelledby="h-indice">
    <div class="bloco-titulo">
      <h2 id="h-indice">Por onde começar</h2>
      <span>índice</span>
    </div>
    <ol class="indice-lista">
      ${indice.map(([href, tit, desc, ic], i) => `
        <li class="indice-item" data-entrada>
          <a class="indice-link" href="${href}">
            <span class="idx-num">${String(i + 1).padStart(2, '0')}</span>
            <span class="idx-tit">${tit}</span>
            <span class="idx-desc">${esc(desc)}</span>
            <span class="idx-go">${ico('seta')}</span>
          </a>
        </li>`).join('')}
    </ol>
  </section>

  <section aria-labelledby="h-comp" style="margin-top:var(--s8)">
    <div class="bloco-titulo">
      <h2 id="h-comp">As cinco competências</h2>
      <span>0 a 200 cada</span>
    </div>
    <div class="faixa-comp" data-entrada>
      ${CRITERIOS.map(c => `
        <a class="rc-item" href="#/criterios">
          <span class="rc-num">${c.id}</span>
          <span class="rc-nome">${esc(c.nome)}</span>
          <span class="rc-nota">6 níveis</span>
        </a>`).join('')}
    </div>
  </section>`;
}

/* ------------------------------------------------------------------ 2. CRITÉRIOS */
/* molde: régua vertical — os seis níveis oficiais da cartilha, descritor ao lado do risco */

function viewCriterios() {
  const regua = CRITERIOS.map(c => {
    const escada = NIVEIS[c.id];
    const oficialTxt = c.niveis
      .slice()
      .sort((a, b) => b.n - a.n)
      .map(nv => `<li><b>Nível ${nv.n} · ${nv.n * 40}</b> ${esc(nv.texto)}</li>`).join('');
    return `
    <article class="comp-bloco" id="crit-${c.id}" data-entrada>
      <header class="cb-head">
        <span class="cb-id">${c.id}</span>
        <div>
          <h2 class="cb-nome">${esc(c.nome)}</h2>
          <p class="cb-resumo">${esc(c.resumo)}</p>
        </div>
        <span class="cb-val">vale até <b>${c.valor}</b></span>
      </header>
      <div class="grade-regra">
        <span class="gr-rot">Como o avaliador decide — ${esc(GRADES[c.id].eixo)}</span>
        <p>${esc(GRADES[c.id].regra)}</p>
        <p class="gr-escada">${esc(escada.avalia)}</p>
      </div>
      <div class="cb-grid">
        <div class="cb-rail" role="list" aria-label="Níveis da competência ${c.id}">
          ${c.niveis.slice().sort((a, b) => b.n - a.n).map(nv => {
            const fino = escada.niveis.find(x => x.pontos === nv.n * 40);
            return `
            <div class="tick" data-n="${nv.n}" data-oficial="sim" role="listitem">
              <span class="tick-n">${nv.n}</span>
              <span class="tick-txt">${esc(nv.texto)}${fino ? `<span class="tick-of">o que o avaliador procura</span><span class="tick-fino">${esc(fino.texto)}</span>` : ''}</span>
              <span class="tick-pts">${nv.n * 40}</span>
            </div>`; }).join('')}
        </div>
        <div class="cb-side">
          <div class="side-bloco">
            <h3>O que é avaliado</h3>
            <ul class="lista-check">${c.oQueAvalia.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>
          <div class="side-bloco">
            <h3>O que derruba a nota</h3>
            <ul class="lista-check perigo">${c.derrubam.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>
          <div class="side-bloco">
            <h3>O que levanta</h3>
            <ul class="lista-check">${c.sobem.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>
          <div class="side-bloco">
            <h3>Mesma ideia, dois níveis</h3>
            <div class="exemplo-par">
              <div class="ex fraco"><span class="rot">Tende ao nível 2</span>${esc(c.exemplo.fraco)}</div>
              <div class="ex forte"><span class="rot">Tende ao nível 4–5</span>${esc(c.exemplo.forte)}</div>
            </div>
          </div>
          <details class="oficial-det">
            <summary>Descritor oficial de cada nível (0 a 200, de 40 em 40)</summary>
            <ul class="oficial-lista">${oficialTxt}</ul>
            <p class="oficial-fonte">Fonte: ${esc(GRADES[c.id].fonte)}</p>
          </details>
        </div>
      </div>
    </article>`;
  }).join('');

  return `
  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>Critérios</span>
      <h1 data-entrada>Cinco competências, seis níveis cada.</h1>
    </div>
    <p class="sub" data-entrada>A nota é a da grade oficial: <b>0, 40, 80, 120, 160 ou 200</b> por competência. Quem reúne características de dois níveis fica no inferior — mas há um caso em que o texto <b>cumpre o nível inteiro e já mostra parte do seguinte</b>, sem nenhum defeito objetivo: aí a nota é a <b>meia-faixa</b> (20, 60, 100, 140, 180). Cada nível traz o descritor da cartilha e, abaixo dele, o que o avaliador procura no texto. À esquerda, a régua; à direita, o que isso significa na prática.</p>
  </div>

  <div class="regua">${regua}</div>

  <div class="aviso" data-entrada>
    ${ico('alerta', 'ico-g')}
    <div>
      <h3>${esc(AVISO_TANGENCIAMENTO.titulo)}</h3>
      <p>${esc(AVISO_TANGENCIAMENTO.texto)}</p>
    </div>
  </div>

  <div class="bloco-titulo"><h2>Nota zero e cálculo final</h2><span>as regras duras</span></div>
  <div class="duas-col">
    <div class="painel-solido" data-entrada>
      <h3>O que zera a redação</h3>
      <ul class="lista-num">
        ${ZEROS.map(z => `<li><b>${esc(z.titulo)}</b> — ${esc(z.texto)}</li>`).join('')}
      </ul>
    </div>
    <div class="painel-solido" data-entrada>
      <h3>Como a nota é calculada</h3>
      <ul class="lista-num">
        ${CALCULO_NOTA.map(z => `<li><b>${esc(z.titulo)}</b> — ${esc(z.texto)}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ 3. ESTRUTURA */
/* molde: linha do tempo das partes + trilha dos 5 elementos + esqueleto */

function viewEstrutura() {
  const linha = PARTES.map((p, i) => `
    <li class="lt-item" data-entrada>
      <span class="lt-marker">${String(i + 1).padStart(2, '0')}</span>
      <div class="lt-body">
        <div class="lt-cabeca">
          <h3>${esc(p.nome)}</h3>
          <span class="apelido">${esc(p.apelido)}</span>
        </div>
        <div class="lt-meta">
          <span>${esc(p.linhas)}</span>
          <span>${esc(p.funcao)}</span>
        </div>
        <p class="formula"><b>Fórmula:</b> ${esc(p.formula)}</p>
        <ol class="passos">${p.passos.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
        <div class="nota-lateral erro"><span class="rot">Erro comum</span>${esc(p.erroComum)}</div>
        <div class="nota-lateral dica" style="margin-top:var(--s3)"><span class="rot">Dica</span>${esc(p.dica)}</div>
      </div>
    </li>`).join('');

  const trilha = ELEMENTOS_PROPOSTA.map(e => `
    <div class="trilha-item">
      <h4>${esc(e.nome)}</h4>
      <span class="pergunta">${esc(e.pergunta)}</span>
      <span class="exemplos">${esc(e.exemplos)}</span>
    </div>`).join('');

  return `
  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>Estrutura</span>
      <h1 data-entrada>A anatomia de 30 linhas.</h1>
    </div>
    <p class="sub" data-entrada>Quatro partes, funções diferentes. O que decide a nota não é o tamanho do parágrafo, é <b>cada parte cumprir o seu papel</b>.</p>
  </div>

  <div class="painel-solido" data-entrada style="margin-bottom:var(--s7)">
    <h3>Distribuição sugerida</h3>
    <table class="tabela">
      <thead><tr><th>Parte</th><th>Linhas</th><th>Função</th></tr></thead>
      <tbody>
        ${DISTRIBUICAO_LINHAS.map(d => `<tr><td><b>${esc(d.parte)}</b></td><td>${esc(d.linhas)}</td><td>${esc(d.funcao)}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>

  <ol class="lt">${linha}</ol>

  <div class="bloco-titulo"><h2>Os cinco elementos da proposta</h2><span>competência V</span></div>
  <div class="trilha" data-entrada>${trilha}</div>

  <div class="bloco-titulo"><h2>${esc(ESQUELETO.titulo)}</h2><span>modelo de esqueleto</span></div>
  <div class="esqueleto" data-entrada>
    ${ESQUELETO.linhas.map(l => `
      <div class="esk-linha">
        <span class="bloco">${esc(l.bloco)}</span>
        <span class="texto">${esc(l.texto)}</span>
        <span class="n">${esc(l.n)} linhas</span>
      </div>`).join('')}
  </div>`;
}

/* ------------------------------------------------------------------ 4. LER O TEMA */
/* molde: acordeão tipográfico (details nativo = acessível, sem JS) */

const rotuloComando = (palavra = '') => palavra
  .split('/')[0]
  .replace(/\s*\.{2,}.*$/, '')
  .replace(/\s+para$/i, '')
  .trim();

function viewComandos() {
  const itens = COMANDOS.map(c => `
    <details class="ac-item" data-entrada>
      <summary class="ac-sum">
        <span class="ac-palavra">${esc(rotuloComando(c.palavra))}</span>
        <span class="ac-temas">${esc(c.temas.join(' · '))}</span>
        <span class="ac-mais" aria-hidden="true">+</span>
      </summary>
      <div class="ac-body">
        <div class="ac-bloco">
          <h4>O que o comando pede</h4>
          <p>${esc(c.oQuePede)}</p>
        </div>
        <div class="ac-bloco perigo">
          <h4>A armadilha</h4>
          <p>${esc(c.armadilha)}</p>
        </div>
        <div class="ac-bloco" style="grid-column:1/-1">
          <h4>Como responder</h4>
          <ul class="ac-lista">${c.comoFazer.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
      </div>
    </details>`).join('');

  return `
  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>Ler o tema</span>
      <h1 data-entrada>O primeiro substantivo é o pedido.</h1>
    </div>
    <p class="sub" data-entrada>“Valorização” não pede elogio, pede o mecanismo que desvaloriza. Antes de escrever, identifique o comando — é ele que define o recorte.</p>
  </div>

  <div class="regra-geral" data-entrada>
    ${REGRA_GERAL.map(r => `<p>${esc(r)}</p>`).join('')}
  </div>

  <div class="acordeao">${itens}</div>`;
}

/* ------------------------------------------------------------------ 5. TEMAS */

/** Bloco de textos motivadores (usado na lista de temas e na proposta). */
function motivadoresHTML(temaId, { aberto = false } = {}) {
  const lista = motivadoresDe(temaId);
  if (!lista.length) return '';
  return `
  <details class="motivadores" ${aberto ? 'open' : ''}>
    <summary>
      <span class="mot-rot">Textos motivadores</span>
      <span class="mot-cont">${lista.length} textos</span>
      <span class="mot-mais" aria-hidden="true">+</span>
    </summary>
    <div class="mot-lista">
      ${lista.map(m => `
        <article class="mot-item">
          <span class="mot-titulo">${esc(m.titulo)}</span>
          <p class="mot-texto">${esc(m.texto)}</p>
          <span class="mot-fonte">${esc(m.fonte)}</span>
        </article>`).join('')}
    </div>
  </details>`;
}
/* molde: lista densa com filtros em pílula */

const EIXOS = [...new Set(TEMAS.map(t => t.eixo))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
let filtroAtual = 'todos';

function linhasTemas() {
  const lista = TEMAS
    .filter(t => filtroAtual === 'todos' || t.eixo === filtroAtual)
    .sort((a, b) => (b.ano || 0) - (a.ano || 0) || a.titulo.localeCompare(b.titulo, 'pt-BR'));

  return lista.map(t => {
    const cmd = comandoDoTema(t.titulo);
    const red = REDACOES.find(r => r.temaId === t.id);
    return `
    <article class="tema-linha" data-entrada>
      <div class="tl-ano ${t.tipo === 'enem' ? '' : 'treino'}">${t.ano || 'treino'}</div>
      <div>
        <h3 class="tl-tit">${esc(t.titulo)}</h3>
        <p class="tl-comando">${cmd ? `Comando: <b>${esc(cmd.palavra.split('/')[0].trim())}</b> · ` : ''}${esc(t.recorte)}</p>
        <div class="chips">
          ${(t.nucleo || []).slice(0, 4).map(k => `<span class="chip vocab">${esc(termoBonito(k))}</span>`).join('')}
          ${motivadoresDe(t.id).length ? `<span class="chip dourado">${motivadoresDe(t.id).length} textos motivadores</span>` : ''}
          ${(t.apoio || []).slice(0, 4).map(k => `<span class="chip">${esc(termoBonito(k))}</span>`).join('')}
        </div>
        ${motivadoresHTML(t.id)}
        <details class="tl-det">
          <summary>Repertórios e vocabulário de apoio</summary>
          <ul class="rep-lista">
            ${(t.repertorios || []).map(r => `<li><b>${esc(r.nome)}</b> — ${esc(r.uso)}</li>`).join('') || '<li>Use repertório histórico, legal ou de dados — desde que explicado.</li>'}
          </ul>
          <p class="tl-comando" style="margin-top:var(--s3)">Vocabulário de apoio: ${esc((t.apoio || []).join(', ') || '—')}</p>
        </details>
      </div>
      <div class="tl-acoes">
        <span class="tl-eixo">${esc(t.eixo)}</span>
        ${red ? `<a class="btn btn-pequeno" href="#/redacoes/${red.id}">Ver redação ${red.nota}</a>` : ''}
        <a class="btn btn-pequeno btn-fantasma" href="#/corrigir?tema=${encodeURIComponent(t.id)}">Treinar neste tema</a>
      </div>
    </article>`;
  }).join('');
}

function viewTemas() {
  return `
  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>Temas</span>
      <h1 data-entrada>${TEMAS.length} propostas, com recorte e repertório.</h1>
    </div>
    <p class="sub" data-entrada>Temas oficiais de 2014 a 2026 e temas de treino. O <b>recorte</b> é o que a banca pede; os chips são o vocabulário que sustenta o recorte sem fugir dele.</p>
  </div>

  <div class="filtros" id="filtros" role="group" aria-label="Filtrar por eixo">
    <button class="filtro" data-eixo="todos" aria-pressed="${filtroAtual === 'todos'}">Todos</button>
    ${EIXOS.map(e => `<button class="filtro" data-eixo="${esc(e)}" aria-pressed="${filtroAtual === e}">${esc(e)}</button>`).join('')}
  </div>

  <div class="lista-temas" id="lista-temas">${linhasTemas()}</div>`;
}

function ligarFiltros() {
  const caixa = document.getElementById('filtros');
  const lista = document.getElementById('lista-temas');
  if (!caixa || !lista) return;
  caixa.addEventListener('click', e => {
    const b = e.target.closest('.filtro');
    if (!b) return;
    filtroAtual = b.dataset.eixo;
    [...caixa.querySelectorAll('.filtro')].forEach(x =>
      x.setAttribute('aria-pressed', String(x === b)));
    lista.innerHTML = linhasTemas();
    ativarMovimento(lista);
  });
}

/* ------------------------------------------------------------------ 6. REDAÇÕES */
/* molde: crônica com espinha de ano */

function viewRedacoes() {
  const porAno = redacoesPorAno() // [{ ano, itens: [...] }]
    .map(b => ({ ano: b.ano, itens: b.itens.filter(r => r.nota !== 0) }))
    .filter(b => b.itens.length);

  const blocos = porAno.map(bloco => `
    <section class="cron-ano">
      <div class="cron-num" aria-hidden="true">${bloco.ano}</div>
      <div class="cron-lista">
        <h2 class="sr-only" style="position:absolute;left:-9999px">Redações de ${bloco.ano}</h2>
        ${bloco.itens.map(r => `
          <a class="red-linha" href="#/redacoes/${r.id}" data-entrada>
            <div>
              <h3 class="rl-tema">${esc(r.tema)}</h3>
              <div class="rl-meta">
                <span>${esc(r.tipo)}</span>
                <span>${r.paragrafos.length} parágrafos</span>
                <span>${r.competencias.length} competências</span>
              </div>
            </div>
            <div class="rl-nota ${r.nota === 0 ? 'zero' : ''}">${r.nota}<small>${r.nota === 0 ? 'anulada' : 'pontos'}</small></div>
          </a>`).join('')}
      </div>
    </section>`).join('');

  const fuga = REDACOES.filter(r => r.nota === 0);

  return `
  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>Redações analisadas</span>
      <h1 data-entrada>${TOTAL_NOTA_MIL} textos, do primeiro ao último parágrafo.</h1>
    </div>
    <p class="sub" data-entrada>Cada redação traz <b>por que tirou 1000</b>, o que cada parágrafo faz, os trechos que o avaliador reconhece e um ponto de melhoria.</p>
  </div>

  <div class="cronica">
    ${blocos}
    ${fuga.length ? `
      <section class="cron-ano">
        <div class="cron-num" aria-hidden="true" style="-webkit-text-stroke-color:rgba(255,142,158,.4)">0</div>
        <div class="cron-lista">
          ${fuga.map(r => `
            <a class="red-linha" href="#/redacoes/${r.id}" data-entrada>
              <div>
                <h3 class="rl-tema">${esc(r.tema)}</h3>
                <div class="rl-meta"><span>${esc(r.tipo)}</span><span>estudo de caso: fuga ao tema</span></div>
              </div>
              <div class="rl-nota zero">0<small>anulada</small></div>
            </a>`).join('')}
        </div>
      </section>` : ''}
  </div>`;
}

function destacar(texto, destaques = []) {
  if (!destaques.length) return esc(texto);

  const ordenados = [...destaques]
    .map(d => ({ ...d, i: texto.indexOf(d.trecho) }))
    .filter(d => d.i >= 0)
    .sort((a, b) => a.i - b.i);

  let saida = '';
  let cursor = 0;
  ordenados.forEach(d => {
    if (d.i < cursor) return; // sobreposição: mantém o primeiro
    const rot = (TIPOS_DESTAQUE[d.tipo] || {}).rotulo || d.tipo;
    saida += esc(texto.slice(cursor, d.i));
    saida += `<mark class="mk mk-${esc(d.tipo)}" title="${esc(rot)}: ${esc(d.nota || '')}">${esc(d.trecho)}</mark>`;
    cursor = d.i + d.trecho.length;
  });
  saida += esc(texto.slice(cursor));
  return saida;
}

function viewRedacao(id) {
  const r = buscarRedacao(id);
  if (!r) return viewNaoEncontrado('Redação não encontrada.');

  const indice = REDACOES.findIndex(x => x.id === r.id);
  const anterior = REDACOES[indice - 1];
  const proximo = REDACOES[indice + 1];

  const legenda = Object.entries(TIPOS_DESTAQUE)
    .map(([tipo, t]) => `<span><i class="lg-${esc(tipo)}"></i>${esc(t.rotulo)}</span>`).join('');

  const paragrafos = r.paragrafos.map((p, i) => `
    <section data-entrada>
      <div class="num-parag">
        <span class="n">${i + 1}</span>
        <h2>${esc(p.rotulo)}</h2>
        <span class="funcao">${esc(p.funcao)}</span>
      </div>
      <p class="par-texto">${destacar(p.texto, p.destaques)}</p>
      <div class="par-analise">
        <span class="rot">Análise do parágrafo</span>
        <p>${esc(p.analise)}</p>
        ${p.melhoria ? `<div class="melhoria"><b>Para chegar ao topo:</b> ${esc(p.melhoria)}</div>` : ''}
      </div>
    </section>`).join('');

  const comps = r.competencias.map(c => `
    <div class="nota-linha">
      <span class="id">${c.id}</span>
      <span class="nome">${CRITERIOS.find(x => x.id === c.id)?.nome || ''}</span>
      <span class="barra"><i style="--v:${(c.nota || 0) / 200}"></i></span>
      <span class="val">${c.nota}</span>
    </div>`).join('');

  const comentarios = r.competencias.map(c => `
    <p style="font-size:.86rem;color:var(--tinta-2);margin-top:var(--s2)">
      <b>${c.id}</b> ${esc(c.comentario)}
    </p>`).join('');

  return `
  <article class="red-doc">
    <a class="migalha" href="#/redacoes">${ico('voltar', 'ico')} Todas as redações</a>

    <header class="doc-cabeca" data-entrada>
      <span class="eyebrow">${r.ano} · ${esc(r.tipo)}</span>
      <h1>${esc(r.tema)}</h1>
      <p class="doc-resumo">${esc(r.resumo)}</p>
    </header>

    ${r.comando ? `
      <div class="regra-geral" data-entrada>
        <p><b>Comando do tema:</b> ${esc(r.comando)}</p>
      </div>` : ''}

    ${r.nota === 0 ? `
      <div class="motivo-zero" data-entrada>
        <h3>Por que esta redação tira zero</h3>
        <ul>${(r.porQueMil || []).map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>` : `
      <div class="porque" data-entrada>
        <h2>Por que esta redação é nota 1000</h2>
        <ul>${r.porQueMil.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
      </div>`}

    <div class="marcas" data-entrada>${legenda}</div>

    ${paragrafos}

    <div class="bloco-titulo"><h2>Notas por competência</h2><span>${r.nota} / 1000</span></div>
    <div class="comp-notas" data-entrada>${comps}</div>
    ${comentarios}

    <nav class="navega-red" aria-label="Outras redações">
      ${anterior ? `<a class="btn btn-pequeno" href="#/redacoes/${anterior.id}">← ${anterior.ano}</a>` : '<span></span>'}
      ${proximo ? `<a class="btn btn-pequeno" href="#/redacoes/${proximo.id}">${proximo.ano} →</a>` : '<span></span>'}
    </nav>

    <p style="margin-top:var(--s6);font-size:.8rem;color:var(--tinta-3)">
      Modelo didático construído para reproduzir o padrão nota 1000 — não é transcrição de texto oficial de participante.
    </p>
  </article>`;
}

/* ------------------------------------------------------------------ 7. CORRIGIR */
/* molde: workspace em duas colunas; painel de resultado é o vidro nº 3 */

let estado = { temaId: 'enem-2026', texto: '' };
let ultimoRelatorio = null;

function viewCorrigir(params) {
  const pedidoTema = params.get('tema');
  const pedidoTexto = params.get('texto');

  if (pedidoTema) estado.temaId = pedidoTema;

  if (pedidoTexto) {
    const ex = EXEMPLOS.find(e => e.id === pedidoTexto);
    const red = buscarRedacao(pedidoTexto);
    if (ex) { estado.texto = ex.texto; if (ex.temaId) estado.temaId = ex.temaId; }
    else if (red) { estado.texto = red.paragrafos.map(p => p.texto).join('\n'); if (red.temaId) estado.temaId = red.temaId; }
  }

  const opcoes = TEMAS
    .slice()
    .sort((a, b) => (b.ano || 0) - (a.ano || 0))
    .map(t => `<option value="${esc(t.id)}" ${t.id === estado.temaId ? 'selected' : ''}>${t.ano ? t.ano + ' — ' : ''}${esc(t.titulo)}</option>`)
    .join('');

  return `
  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>Corrigir</span>
      <h1 data-entrada>Onde a sua nota está escapando.</h1>
    </div>
    <p class="sub" data-entrada>O motor aplica as <b>grades específicas</b> das cartilhas de capacitação (Competências I a V, FGV/Inep) e explica, competência por competência, <b>por que a nota não chegou a 200</b> — com o trecho do seu texto que motivou cada observação. É um diagnóstico heurístico: não substitui a correção humana.</p>
  </div>

  <div class="workspace">
    <div class="ws-entrada">
      <div class="campo">
        <label class="label" for="tema">Tema da proposta</label>
        <select class="select" id="tema">
          ${opcoes}
          <option value="livre" ${estado.temaId === 'livre' ? 'selected' : ''}>Tema livre (digite abaixo)</option>
        </select>
      </div>

      <div class="campo" id="campo-livre" style="display:none">
        <label class="label" for="tema-livre">Qual é o tema?</label>
        <input class="input" id="tema-livre" placeholder="Ex.: os desafios da inclusão digital de idosos no Brasil" />
      </div>

      <div id="proposta-tema"></div>

      <div class="campo">
        <label class="label" for="texto">Sua redação</label>
        <textarea class="textarea" id="texto" placeholder="Cole aqui a sua redação (ou carregue um exemplo abaixo).">${esc(estado.texto)}</textarea>
        <div class="contador">
          <span id="conta-linhas">0 linhas</span>
          <span id="conta-palavras">0 palavras</span>
        </div>
      </div>

      <div class="btn-linha">
        <button class="btn btn-primario" id="bt-corrigir">${ico('analise')} Corrigir</button>
        <button class="btn" id="bt-limpar">Limpar</button>
        <button class="btn btn-fantasma btn-pequeno" data-exemplo="boa">Exemplo: alto desempenho</button>
        <button class="btn btn-fantasma btn-pequeno" data-exemplo="problemas">Exemplo: problemas típicos</button>
      </div>
    </div>

    <aside class="ws-saida" aria-live="polite" id="saida">
      <div class="vazio">
        ${ico('mira', 'ico-g')}
        <p>Cole o texto e clique em <b>Corrigir</b>.<br />O relatório aparece aqui, competência por competência.</p>
      </div>
    </aside>
  </div>`;
}

function motivoHTML(m) {
  const etiqueta = m.gravidade === 'alta' ? 'impede o 200'
    : m.gravidade === 'media' ? 'pesa na nota' : 'observação';
  return `
    <li class="motivo g-${m.gravidade}">
      <span class="m-tag">${etiqueta}</span>
      <h4>${esc(m.titulo)}</h4>
      <p class="m-porque">${esc(m.porque)}</p>
      ${m.evidencia ? `<blockquote>${esc(m.evidencia)}</blockquote>` : ''}
      ${m.exemplos && m.exemplos.length
        ? `<ul class="m-ex">${m.exemplos.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
      ${m.comoResolver ? `<p class="m-como"><b>Como resolver:</b> ${esc(m.comoResolver)}</p>` : ''}
    </li>`;
}

function compCard(c, aberto) {
  const ex = c.explicacao || {};
  const nivel = ex.nivel || { n: c.nivel, pontos: c.nota, exige: '' };
  const classeNota = c.nota < 120 ? 'baixa' : c.nota < 200 ? 'media' : '';
  const meia = c.nota % 40 === 20;
  return `
  <details class="comp-card" ${aberto ? 'open' : ''}>
    <summary class="cc-sum">
      <span class="cc-id">${c.id}</span>
      <span class="cc-nome">${esc(c.nome)}</span>
      <span class="cc-bar"><i style="--v:${(c.nota || 0) / 200}"></i></span>
      <span class="cc-nota ${classeNota}">${c.nota}<small>/200</small></span>
    </summary>
    <div class="cc-body">
      <p class="cc-sintese">${esc(ex.sintese || '')}</p>
      <div class="cc-niveis">
        <span class="badge">Nível ${meia ? `${nivel.oficial}–${nivel.oficial + 1}` : nivel.oficial} de 5 · ${c.nota} de 200</span>
        ${meia
          ? `<span class="badge meia"><b>Meia-faixa:</b> o texto cumpre o descritor de ${c.nota - 20} e já mostra parte do de ${c.nota + 20} — pela regra, sem defeito objetivo, fica no meio.</span>`
          : ''}

        <span><b>O nível exige:</b> ${esc(nivel.exigeOficial || nivel.exige)}</span>
        ${ex.fonte ? `<span class="fonte">Grade: ${esc(ex.fonte)}</span>` : ''}
      </div>
      ${ex.motivos && ex.motivos.length
        ? `<ol class="motivos">${ex.motivos.map(motivoHTML).join('')}</ol>`
        : '<p class="m-porque">Nenhum impedimento identificado nesta amostra para o nível máximo.</p>'}
      ${ex.proximo ? `
        <div class="proximo-degrau">
          <span class="rot">Para subir · ${Math.min(200, (nivel.oficial + 1) * 40)}</span>
          <span><b>Exige:</b> ${esc(ex.nivelTextoProximo || ex.proximo.exige)}</span>
          ${ex.proximo.faltou ? `<span><b>Falta:</b> ${esc(ex.proximo.faltou)}</span>` : ''}
        </div>` : ''}
      ${c.fortes && c.fortes.length ? `
        <span class="sub-rot">o que já está certo</span>
        <ul class="fortes-lista">${c.fortes.map(f => `<li>${esc(f)}</li>`).join('')}</ul>` : ''}
    </div>
  </details>`;
}

function relatorio(r) {
  if (!r.ok) {
    return `<div class="vazio">${ico('alerta', 'ico-g')}<p>${esc(r.erro)}</p></div>`;
  }

  const pct = r.notaTotal / 10;

  // abrimos as duas competências que mais seguram a nota
  const maisFracas = [...r.competencias].sort((a, b) => a.nota - b.nota).slice(0, 2).map(c => c.id);
  const cards = r.competencias.map(c => compCard(c, maisFracas.includes(c.id))).join('');

  const alertas = (r.alertas || []).map(a => `
    <div class="alerta ${a.tipo === 'perigo' ? 'perigo' : a.tipo === 'info' ? 'info' : ''}">
      ${ico(a.tipo === 'perigo' ? 'alerta' : 'mira')}
      <div><b>${esc(a.titulo)}</b>${esc(a.texto)}</div>
    </div>`).join('');

  const zeros = r.zerada ? `
    <div class="motivo-zero">
      <h3>Nota zero</h3>
      <ul>${r.motivosZero.map(m => `<li><b>${esc(m.titulo)}:</b> ${esc(m.detalhe)}</li>`).join('')}</ul>
    </div>` : '';

  const m = r.metricas || {};
  const rotuloConfianca = { alta: 'confiança alta', media: 'confiança média', baixa: 'confiança baixa' }[r.confianca] || '';

  return `
    <div class="rel-topo">
      <div class="score-ring" data-anel="${pct}" style="--pct:0">
        <div class="score-num"><span data-conta="${r.notaTotal}">0</span><small>de 1000</small></div>
      </div>
      <div class="rel-faixa">
        <strong>${esc(r.faixa.nome)}</strong>
        <p>${esc(r.faixa.texto)}</p>
        <span class="confianca">${ico('check')} ${rotuloConfianca}</span>
      </div>
    </div>

    ${zeros}

    <div class="rel-principio">
      ${ico('regua')}
      <div>O nível não é uma média: cada competência só sobe se cumprir <b>integralmente</b> o descritor do nível — e, quando o texto reúne características de dois níveis, o avaliador fica com o <b>inferior</b>. Abra cada competência para ver a regra aplicada e o trecho que a motivou.</div>
    </div>

    <div class="comp-lista">${cards}</div>
    ${alertas}

    <div class="metricas">
      <span><b>${m.paragrafos || 0}</b> parágrafos</span>
      <span><b>${m.palavras || 0}</b> palavras</span>
      <span><b>${m.linhas || 0}</b> linhas estimadas</span>
      ${r.tema ? `<span>tema: <b>${esc(r.tema.titulo)}</b></span>` : ''}
    </div>`;
}

function ligarCorrigir() {
  const sel = document.getElementById('tema');
  const campoLivre = document.getElementById('campo-livre');
  const textarea = document.getElementById('texto');
  const saida = document.getElementById('saida');
  if (!textarea || !saida) return;

  const pintarProposta = (temaId) => {
    const alvo = document.getElementById('proposta-tema');
    if (!alvo) return;
    const tema = TEMAS.find(t => t.id === temaId);
    if (!tema) { alvo.innerHTML = ''; return; }
    const cmd = comandoDoTema(tema.titulo);
    alvo.innerHTML = `
      <article class="proposta">
        <span class="prop-rot">Proposta de redação</span>
        <h2 class="prop-titulo">${esc(tema.titulo)}</h2>
        <p class="prop-recorte">${esc(tema.recorte)}</p>
        ${cmd ? `<p class="prop-comando"><b>Comando:</b> ${esc(cmd.oQuePede)}</p>` : ''}
        ${motivadoresHTML(tema.id)}
      </article>`;
  };

  const contar = () => {
    const txt = textarea.value;
    const linhas = Math.max(1, Math.ceil(txt.replace(/\s+$/, '').length / 66) || 0);
    const palavras = (txt.trim().match(/[\p{L}\p{N}'-]+/gu) || []).length;
    const l = document.getElementById('conta-linhas');
    const p = document.getElementById('conta-palavras');
    if (l) {
      l.textContent = `≈ ${linhas} linhas`;
      l.className = linhas > 30 ? 'alerta-linhas' : '';
    }
    if (p) p.textContent = `${palavras} palavras`;
  };

  textarea.addEventListener('input', () => { estado.texto = textarea.value; contar(); });
  contar();

  pintarProposta(estado.temaId);

  if (sel) {
    sel.addEventListener('change', () => {
      estado.temaId = sel.value;
      if (campoLivre) campoLivre.style.display = sel.value === 'livre' ? 'grid' : 'none';
      pintarProposta(sel.value);
    });
    if (campoLivre) campoLivre.style.display = sel.value === 'livre' ? 'grid' : 'none';
  }

  const rodar = () => {
    const temaLivre = document.getElementById('tema-livre')?.value || '';
    const r = corrigir(textarea.value, { temaId: estado.temaId, temaLivre });
    ultimoRelatorio = r;
    saida.innerHTML = relatorio(r);
    ativarMovimento(saida);
    if (!r.ok) { toast(r.erro); return; }

    // no celular a coluna do relatório fica abaixo: levamos o leitor até ela
    if (window.innerWidth < 1080) {
      const reduzir = typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (typeof saida.scrollIntoView === 'function') {
        saida.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' });
      }
    }
  };

  document.getElementById('bt-corrigir')?.addEventListener('click', rodar);

  document.getElementById('bt-limpar')?.addEventListener('click', () => {
    textarea.value = '';
    estado.texto = '';
    contar();
    saida.innerHTML = `<div class="vazio">${ico('mira', 'ico-g')}<p>Cole o texto e clique em <b>Corrigir</b>.</p></div>`;
    textarea.focus();
    toast('Texto apagado.');
  });

  document.querySelectorAll('[data-exemplo]').forEach(b => {
    b.addEventListener('click', () => {
      const ex = EXEMPLOS.find(e => e.id === b.dataset.exemplo);
      if (!ex) return;
      textarea.value = ex.texto;
      estado.texto = ex.texto;
      if (sel && ex.temaId) {
        sel.value = ex.temaId; estado.temaId = ex.temaId;
        sel.dispatchEvent(new Event('change'));
        pintarProposta(ex.temaId);
      }
      contar();
      toast(ex.rotulo);
      rodar();
    });
  });

  // se a URL pediu um texto, já mostra o relatório
  if (estado.texto) rodar();
  else if (textarea.value.trim()) rodar();
}

/* ------------------------------------------------------------------ 8. roteador */

function viewNaoEncontrado(msg) {
  return `<div class="vazio" style="padding:var(--s9) 0">
    ${ico('alerta', 'ico-g')}
    <p>${esc(msg)}</p>
    <a class="btn btn-pequeno" href="#/">Voltar ao início</a>
  </div>`;
}

function parseRota() {
  const bruto = location.hash.replace(/^#/, '') || '/';
  const [caminho, busca] = bruto.split('?');
  return { caminho: caminho.replace(/\/+$/, '') || '/', params: new URLSearchParams(busca || '') };
}

function render() {
  const { caminho, params } = parseRota();
  const partes = caminho.split('/').filter(Boolean);
  let html = '';
  let aba = caminho;

  if (partes.length === 0) { html = viewHome(); aba = '/'; }
  else if (partes[0] === 'criterios') html = viewCriterios();
  else if (partes[0] === 'estrutura') html = viewEstrutura();
  else if (partes[0] === 'comandos') html = viewComandos();
  else if (partes[0] === 'temas') html = viewTemas();
  else if (partes[0] === 'redacoes') {
    html = partes[1] ? viewRedacao(decodeURIComponent(partes[1])) : viewRedacoes();
  }
  else if (partes[0] === 'corrigir') html = viewCorrigir(params);
  else html = viewNaoEncontrado('Página não encontrada.');

  app.innerHTML = html;
  document.title = tituloDa(partes);

  [...document.querySelectorAll('.pill')].forEach(p => {
    const alvo = p.getAttribute('href').replace('#', '');
    p.removeAttribute('aria-current');
    if (alvo === aba || (aba.startsWith(alvo) && alvo !== '/')) p.setAttribute('aria-current', 'page');
  });

  ligarFiltros();
  ligarCorrigir();
  ativarMovimento(app);

  if (typeof window.scrollTo === 'function') {
    try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch { window.scrollTo(0, 0); }
  }
}

function tituloDa(partes = []) {
  const mapa = {
    '': 'Redação com João — critérios, estrutura, temas e redações analisadas',
    criterios: 'Critérios das 5 competências — Redação com João',
    estrutura: 'Estrutura da redação — Redação com João',
    comandos: 'Ler o comando do tema — Redação com João',
    temas: 'Temas do ENEM e de treino — Redação com João',
    redacoes: 'Redações nota 1000 analisadas — Redação com João',
    corrigir: 'Corrigir redação — Redação com João'
  };
  return mapa[partes[0] || ''] || 'Redação com João';
}

window.addEventListener('hashchange', render);

window.addEventListener('scroll', () => {
  const barra = document.querySelector('.topbar');
  if (barra) barra.classList.toggle('rolado', window.scrollY > 12);
}, { passive: true });

render();
