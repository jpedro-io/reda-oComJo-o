/**
 * Views do guia de conteúdos: sumário → matéria → página do conteúdo.
 *
 * Três níveis, como o site pede na navegação:
 *   #/conteudos              quatro áreas, cada uma com suas matérias
 *   #/conteudos/materia/:id  lista de botões, um por conteúdo
 *   #/conteudos/c/:id        resumo, fórmulas, questões e vídeo
 *
 * Este arquivo não importa ui.js (que importa este) para não criar ciclo:
 * as duas utilidades que usa — escapar texto e desenhar ícone — estão aqui.
 */
import {
  AREAS, TOTAL_CONTEUDOS, areaPorId, materiaPorId, conteudoPorId,
  paginaDe, temTexto,
} from './db/conteudos/index.js';

const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const IC = {
  seta: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  voltar: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
  livro: '<path d="M4 5.5h6.5A2 2 0 0 1 13 7.5V20a2 2 0 0 0-2-2H4z"/><path d="M20 5.5h-6.5A2 2 0 0 0 11 7.5V20a2 2 0 0 1 2-2h7z"/>',
  quimica: '<path d="M9 3.5h6M10 3.5v5L5.5 17A2.5 2.5 0 0 0 7.7 20.5h8.6A2.5 2.5 0 0 0 18.5 17L14 8.5v-5"/><path d="M7.5 14h9"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10.5 21 8v8l-5-2.5z"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  alvo: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  formula: '<path d="M6 5h6M6 12h4M6 19h5"/><path d="M14 5l5 14M19 5l-5 14"/>',
};
const ic = (nome, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" aria-hidden="true">${IC[nome] || ''}</svg>`;

const contagemDaMateria = m => m.conteudos.length;
const contagemDaArea = a => a.materias.reduce((t, m) => t + m.conteudos.length, 0);

/* ------------------------------------------------------------------ 1. SUMÁRIO */

export function viewConteudos() {
  const blocos = AREAS.map(area => `
    <section class="hub-area" data-entrada>
      <header class="hub-area-topo">
        <span class="hub-sigla">${esc(area.sigla)}</span>
        <div>
          <h2>${esc(area.nome)}</h2>
          <p>${esc(area.resumo)}</p>
        </div>
        <span class="hub-conta">${contagemDaArea(area)} conteúdos</span>
      </header>
      <div class="hub-materias">
        ${area.materias.map(m => `
          <a class="hub-materia" href="#/conteudos/materia/${m.id}">
            <span class="hm-nome">${esc(m.nome)}</span>
            <span class="hm-conta">${contagemDaMateria(m)} ${contagemDaMateria(m) === 1 ? 'conteúdo' : 'conteúdos'}</span>
            ${ic('seta', 'hm-seta')}
          </a>`).join('')}
      </div>
    </section>`).join('');

  return `
  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>Conteúdos</span>
      <h1 data-entrada>O que cai no Enem,<br>por área e por matéria.</h1>
    </div>
    <p class="sub" data-entrada>
      ${TOTAL_CONTEUDOS} conteúdos das quatro áreas da prova. Cada página traz o resumo do assunto,
      as fórmulas quando existem, uma aula em vídeo e questões de edições passadas resolvidas passo a passo.
    </p>
  </div>

  <div class="hub">${blocos}</div>

  <p class="hub-nota" data-entrada>
    Comece pela área em que você erra mais na prova, não pela que você gosta mais.
    O guia de redação continua nas outras abas — aqui é o conteúdo das questões objetivas.
  </p>`;
}

/* ------------------------------------------------------------------ 2. MATÉRIA */

export function viewMateria(id) {
  const materia = materiaPorId(id);
  if (!materia) return naoEncontrado('Matéria não encontrada.');

  const botoes = materia.conteudos.map((c, i) => `
    <a class="conteudo-btn" href="#/conteudos/c/${c.id}" data-entrada>
      <span class="cb-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="cb-nome">${esc(c.titulo)}</span>
      <span class="cb-acoes">
        ${temTexto(c.id) ? '<span class="cb-tag">resumo</span>' : ''}
        ${ic('seta', 'cb-seta')}
      </span>
    </a>`).join('');

  const canais = (materia.canais || []).length
    ? `<p class="mat-canais"><b>Canais indicados:</b> ${materia.canais.map(esc).join(' · ')}</p>` : '';

  return `
  <nav class="migalha" aria-label="Caminho">
    <a href="#/conteudos">Conteúdos</a> <span aria-hidden="true">/</span>
    <span>${esc(materia.area.nome.split(' e suas')[0])}</span> <span aria-hidden="true">/</span>
    <b>${esc(materia.nome)}</b>
  </nav>

  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>${esc(materia.area.sigla)} · ${esc(materia.area.nome.split(' e suas')[0])}</span>
      <h1 data-entrada>${esc(materia.nome)}</h1>
    </div>
    <p class="sub" data-entrada>${materia.conteudos.length} conteúdos nesta matéria. Clique em um para abrir o resumo, as fórmulas, o vídeo e as questões resolvidas.</p>
  </div>

  <div class="conteudo-lista">${botoes}</div>
  ${canais}`;
}

/* ------------------------------------------------------------------ 3. CONTEÚDO */

export function viewConteudo(id) {
  const base = conteudoPorId(id);
  if (!base) return naoEncontrado('Conteúdo não encontrado.');
  const p = paginaDe(id, base);

  const resumo = p.resumo.length
    ? p.resumo.map(par => `<p>${esc(par)}</p>`).join('')
    : '<p class="vazio-txt">O resumo deste conteúdo ainda está sendo escrito.</p>';

  const chave = p.chave.length ? `
    <section class="cp-bloco">
      <h2 class="cp-rot">${ic('alvo')} o que mais cai</h2>
      <ul class="chave-lista">${p.chave.map(c => `<li>${esc(c)}</li>`).join('')}</ul>
    </section>` : '';

  const formulas = p.formulas.length ? `
    <section class="cp-bloco">
      <h2 class="cp-rot">${ic('formula')} fórmulas e relações</h2>
      <div class="formula-grade">
        ${p.formulas.map(f => `
          <div class="formula-card">
            <span class="fc-rot">${esc(f.titulo)}</span>
            <code class="fc-expr">${esc(f.expr)}</code>
          </div>`).join('')}
      </div>
    </section>` : '';

  const questoes = p.questoes.length ? `
    <section class="cp-bloco" id="questoes">
      <h2 class="cp-rot">${ic('check')} ${p.questoes.length} ${p.questoes.length === 1 ? 'questão resolvida' : 'questões resolvidas'}</h2>
      ${p.questoes.map((q, i) => questaoHTML(q, i)).join('')}
    </section>` : `
    <section class="cp-bloco" id="questoes">
      <h2 class="cp-rot">${ic('check')} questões de edições passadas</h2>
      <p class="cp-aviso">As questões deste conteúdo estão sendo transcritas e resolvidas — cada uma passa por conferência do enunciado e do gabarito oficial antes de entrar no site. O resumo acima já cobre o que a prova cobra.</p>
    </section>`;

  const video = p.video ? `
    <section class="cp-bloco" id="video">
      <h2 class="cp-rot">${ic('video')} aula em vídeo</h2>
      <div class="video-caixa">
        <div class="video-moldura">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${esc(p.video.id)}?rel=0&modestbranding=1"
            title="${esc(p.video.titulo || 'Aula em vídeo')}"
            loading="lazy" allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <p class="video-legenda">
          <b>${esc(p.video.titulo || 'Aula em vídeo')}</b>
          ${p.video.canal ? `<span class="video-canal">${esc(p.video.canal)}</span>` : ''}
          <a class="video-link" href="https://www.youtube.com/watch?v=${esc(p.video.id)}" target="_blank" rel="noopener">abrir no YouTube</a>
        </p>
      </div>
    </section>` : '';

  // navegação dentro da matéria
  const irmaos = base.materia.conteudos;
  const pos = irmaos.findIndex(c => c.id === id);
  const ant = pos > 0 ? irmaos[pos - 1] : null;
  const prox = pos >= 0 && pos < irmaos.length - 1 ? irmaos[pos + 1] : null;

  return `
  <nav class="migalha" aria-label="Caminho">
    <a href="#/conteudos">Conteúdos</a> <span aria-hidden="true">/</span>
    <a href="#/conteudos/materia/${base.materia.id}">${esc(base.materia.nome)}</a> <span aria-hidden="true">/</span>
    <b>${esc(base.titulo)}</b>
  </nav>

  <article class="conteudo-pag">
    <header class="cp-topo" data-entrada>
      <span class="eyebrow">${esc(base.area.sigla)} · ${esc(base.materia.nome)}</span>
      <h1>${esc(base.titulo)}</h1>
    </header>

    <section class="cp-bloco cp-resumo" data-entrada>
      <h2 class="cp-rot">${ic('livro')} resumo</h2>
      ${resumo}
    </section>

    ${chave}
    ${formulas}
    ${questoes}
    ${video}

    <nav class="cp-nav" aria-label="Outros conteúdos da matéria">
      ${ant ? `<a class="cp-nav-btn" href="#/conteudos/c/${ant.id}">${ic('voltar')}<span><small>anterior</small>${esc(ant.titulo)}</span></a>` : '<span></span>'}
      ${prox ? `<a class="cp-nav-btn prox" href="#/conteudos/c/${prox.id}"><span><small>próximo</small>${esc(prox.titulo)}</span>${ic('seta')}</a>` : '<span></span>'}
    </nav>
  </article>`;
}

function questaoHTML(q, i) {
  const fonte = [q.ano ? `Enem ${q.ano}` : null, q.fonte || null, q.adaptada ? 'adaptada' : null]
    .filter(Boolean).join(' · ');
  const letras = ['A', 'B', 'C', 'D', 'E'];
  const alternativas = (q.alternativas || []).map((alt, k) => `
    <li class="${letras[k] === q.correta ? 'correta' : ''}">
      <span class="alt-letra">${letras[k]}</span>
      <span class="alt-txt">${esc(alt)}</span>
    </li>`).join('');

  return `
  <details class="questao">
    <summary class="q-topo">
      <span class="q-num">${i + 1}</span>
      <span class="q-fonte">${esc(fonte || 'Enem')}</span>
      <span class="q-abre">ver resolução</span>
    </summary>
    <div class="q-corpo">
      ${(q.textoApoio || []).map(t => `<p class="q-apoio">${esc(t)}</p>`).join('')}
      <p class="q-enunciado">${esc(q.enunciado || '')}</p>
      <ol class="q-alts">${alternativas}</ol>
      <div class="q-resolucao">
        <span class="q-rot">Resolução</span>
        ${(q.resolucao || []).map(r => `<p>${esc(r)}</p>`).join('')}
        ${q.gabaritoOficial ? `<p class="q-gab"><b>Gabarito oficial:</b> ${esc(q.gabaritoOficial)}</p>` : ''}
      </div>
    </div>
  </details>`;
}

function naoEncontrado(msg) {
  return `<div class="vazio" style="padding:var(--s9) 0">
    ${ic('alerta')}
    <p>${esc(msg)}</p>
    <a class="btn btn-pequeno" href="#/conteudos">Ver todos os conteúdos</a>
  </div>`;
}

/* ------------------------------------------------------------------ título da aba */

export function tituloDeConteudos(partes = []) {
  if (partes[0] !== 'conteudos') return null;
  if (partes[1] === 'materia' && partes[2]) {
    const m = materiaPorId(decodeURIComponent(partes[2]));
    return m ? `${m.nome} — Conteúdos do Enem` : 'Conteúdos do Enem';
  }
  if (partes[1] === 'c' && partes[2]) {
    const c = conteudoPorId(decodeURIComponent(partes[2]));
    return c ? `${c.titulo} — ${c.materia.nome}` : 'Conteúdos do Enem';
  }
  return 'Conteúdos do Enem — o que cai em cada matéria';
}
