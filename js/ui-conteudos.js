// Arquivo responsável por renderizar o guia de conteúdos e suas atividades.

import {
  AREAS, TOTAL_CONTEUDOS, areaPorId, materiaPorId, conteudoPorId,
  paginaDe, temTexto, paginaCompleta,
} from './db/conteudos/index.js';
import { lerProgressoLocal } from './progresso-local.js';

// Seção: escape de dados e ícones da interface.

const escaparConteudoHtml = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ICONES_DE_CONTEUDO = {
  seta: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  voltar: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
  livro: '<path d="M4 5.5h6.5A2 2 0 0 1 13 7.5V20a2 2 0 0 0-2-2H4z"/><path d="M20 5.5h-6.5A2 2 0 0 0 11 7.5V20a2 2 0 0 1 2-2h7z"/>',
  quimica: '<path d="M9 3.5h6M10 3.5v5L5.5 17A2.5 2.5 0 0 0 7.7 20.5h8.6A2.5 2.5 0 0 0 18.5 17L14 8.5v-5"/><path d="M7.5 14h9"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10.5 21 8v8l-5-2.5z"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  alvo: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  formula: '<path d="M6 5h6M6 12h4M6 19h5"/><path d="M14 5l5 14M19 5l-5 14"/>',
  exemplo: '<path d="M12 3.5 14.5 9l6 .8-4.3 4.2 1 6-5.2-2.9-5.2 2.9 1-6L3.5 9.8 9.5 9z"/>',
  imagem: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M4 16.5l4.5-4 3.5 3 3-2.5 5 4"/>',
  lapis: '<path d="M4 20l1-4.5L16.5 4a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M14.5 6l3 3"/>',
  alerta: '<path d="M12 4.5 3 20h18L12 4.5Z"/><path d="M12 10v4.5M12 17.4v.2"/>',
};
const renderizarIconeDeConteudo = (nome, cls = '') =>
  `<svg class="ico ${cls}" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">${ICONES_DE_CONTEUDO[nome] || ''}</svg>`;

const contarConteudosDaMateria = m => m.conteudos.length;
const contarConteudosDaArea = a => a.materias.reduce((t, m) => t + m.conteudos.length, 0);

// Seção: sumário, matérias e páginas de conteúdo.

export function viewConteudos() {
  const blocos = AREAS.map(area => `
    <section class="hub-area" data-entrada>
      <header class="hub-area-topo">
        <span class="hub-sigla">${escaparConteudoHtml(area.sigla)}</span>
        <div>
          <h2>${escaparConteudoHtml(area.nome)}</h2>
          <p>${escaparConteudoHtml(area.resumo)}</p>
        </div>
        <span class="hub-conta">${contarConteudosDaArea(area)} conteúdos</span>
      </header>
      <div class="hub-materias">
        ${area.materias.map((m, i) => `
          <a class="hub-materia" href="#/conteudos/materia/${m.id}" data-entrada data-i="${i}">
            <span class="hm-nome">${escaparConteudoHtml(m.nome)}</span>
            <span class="hm-conta">${contarConteudosDaMateria(m)} ${contarConteudosDaMateria(m) === 1 ? 'conteúdo' : 'conteúdos'}</span>
            ${renderizarIconeDeConteudo('seta', 'hm-seta')}
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
      esquemas e questões resolvidas conforme o material já preparado. Novos textos e questões oficiais estão sendo acrescentados por assunto.
    </p>
  </div>

  <div class="hub">${blocos}</div>

  <p class="hub-nota" data-entrada>
    Comece pela área em que você erra mais na prova, não pela que você gosta mais.
    A redação também está organizada no guia; as outras abas oferecem ferramentas adicionais de prática.
  </p>`;
}

export function viewMateria(id) {
  const materia = materiaPorId(id);
  if (!materia) return naoEncontrado('Matéria não encontrada.');

  const progresso = lerProgressoLocal();
  const acessados = progresso.ok ? progresso.dados.acessados : {};
  const botoes = materia.conteudos.map((c, i) => `
    <a class="conteudo-btn" href="#/conteudos/c/${c.id}" data-entrada>
      <span class="cb-num">${String(i + 1).padStart(2, '0')}</span>
      <span class="cb-nome">${escaparConteudoHtml(c.titulo)}</span>
      <span class="cb-acoes">
        ${Object.prototype.hasOwnProperty.call(acessados, c.id) ? '<span class="cb-visitado" aria-label="Conteúdo acessado">✓ <span>Acessado</span></span>' : ''}
        ${paginaCompleta(c.id) ? '<span class="cb-tag completo">resumo ampliado</span>' : (temTexto(c.id) ? '<span class="cb-tag">resumo</span>' : '')}
        ${renderizarIconeDeConteudo('seta', 'cb-seta')}
      </span>
    </a>`).join('');

  const canais = (materia.canais || []).length
    ? `<p class="mat-canais"><b>Canais indicados:</b> ${materia.canais.map(escaparConteudoHtml).join(' · ')}</p>` : '';

  return `
  <nav class="migalha" aria-label="Caminho">
    <a href="#/conteudos">Conteúdos</a> <span aria-hidden="true">/</span>
    <span>${escaparConteudoHtml(materia.area.nome.split(' e suas')[0])}</span> <span aria-hidden="true">/</span>
    <b>${escaparConteudoHtml(materia.nome)}</b>
  </nav>

  <div class="secao-topo">
    <div>
      <span class="eyebrow" data-entrada>${escaparConteudoHtml(materia.area.sigla)} · ${escaparConteudoHtml(materia.area.nome.split(' e suas')[0])}</span>
      <h1 data-entrada>${escaparConteudoHtml(materia.nome)}</h1>
    </div>
    <p class="sub" data-entrada>${materia.conteudos.length} conteúdos nesta matéria. O ✓ indica página acessada neste navegador, não conclusão do estudo.${progresso.ok ? '' : ' Não foi possível ler o progresso local neste navegador.'}</p>
  </div>

  <div class="conteudo-lista">${botoes}</div>
  ${canais}`;
}

export function viewConteudo(id) {
  const base = conteudoPorId(id);
  if (!base) return naoEncontrado('Conteúdo não encontrado.');
  const p = paginaDe(id, base);

  const resumo = p.secoes.length
    ? p.secoes.map((sec, i) => `
        <section class="cp-secao" data-entrada data-i="${i}">
          <h3>${escaparConteudoHtml(sec.h)}</h3>
          ${(sec.ps || []).map(par => `<p>${escaparConteudoHtml(par)}</p>`).join('')}
        </section>`).join('')
    : (p.resumo.length
      ? p.resumo.map(par => `<p>${escaparConteudoHtml(par)}</p>`).join('')
      : '<p class="vazio-txt">O texto completo deste conteúdo ainda está sendo escrito.</p>');

  const exemplos = p.exemplos.length ? `
    <section class="cp-bloco" id="exemplos" data-entrada data-i="0">
      <h2 class="cp-rot" data-entrada data-i="1">${renderizarIconeDeConteudo('exemplo')} exemplos</h2>
      <div class="cp-exemplos">
      ${p.exemplos.map((ex, i) => `
        <article class="cp-exemplo" data-entrada data-i="${i + 2}">
          <span class="cp-ex-num">${i + 1}</span>
          <div>
            <h3>${escaparConteudoHtml(ex.titulo)}</h3>
            <p class="cp-ex-texto">${escaparConteudoHtml(ex.texto)}</p>
            ${ex.comentario ? `<p class="cp-ex-coment"><b>Por que importa:</b> ${escaparConteudoHtml(ex.comentario)}</p>` : ''}
          </div>
        </article>`).join('')}
      </div>
    </section>` : '';

  const figuras = (p.figuras || []).length
    ? `<div class="cp-figuras" data-entrada data-i="0">${(p.figuras || []).map((f, i) => figuraHTML(f, i)).join('')}</div>` : '';
  const formulas = p.formulas.length ? `
    <div class="formula-grade" data-entrada data-i="1">
      ${p.formulas.map((f, i) => `
        <div class="formula-card" data-entrada data-i="${i + 2}">
          <span class="fc-rot">${escaparConteudoHtml(f.titulo)}</span>
          <code class="fc-expr">${escaparConteudoHtml(f.expr)}</code>
          ${f.uso ? `<span class="fc-uso">${escaparConteudoHtml(f.uso)}</span>` : ''}
        </div>`).join('')}
    </div>` : '';
  const imagens = (figuras || formulas) ? `
    <section class="cp-bloco" id="imagens" data-entrada data-i="2">
      <h2 class="cp-rot" data-entrada data-i="3">${renderizarIconeDeConteudo('imagem')} imagens, esquemas e fórmulas</h2>
      ${figuras}
      ${formulas}
    </section>` : '';

  const chave = p.chave.length ? `
    <section class="cp-bloco" data-entrada data-i="4">
      <h2 class="cp-rot" data-entrada data-i="5">${renderizarIconeDeConteudo('alvo')} o que mais cai</h2>
      <ul class="chave-lista">${p.chave.map(c => `<li>${escaparConteudoHtml(c)}</li>`).join('')}</ul>
    </section>` : '';

  const questoes = p.questoes.length ? `
    <section class="cp-bloco" id="questoes" data-entrada data-i="6">
      <h2 class="cp-rot" data-entrada data-i="7">${renderizarIconeDeConteudo('check')} ${p.questoes.length} ${p.questoes.length === 1 ? 'questão resolvida' : 'questões resolvidas'} por escrito</h2>
      ${p.questoes.map((q, i) => questaoHTML(q, i)).join('')}
    </section>` : `
    <section class="cp-bloco" id="questoes" data-entrada data-i="6">
      <h2 class="cp-rot" data-entrada data-i="7">${renderizarIconeDeConteudo('check')} questões resolvidas</h2>
      <p class="cp-aviso">As questões deste conteúdo ainda estão sendo escritas. Este conteúdo ainda está em preparação.</p>
    </section>`;

  const video = p.video ? `
    <section class="cp-bloco" id="video" data-entrada data-i="8">
      <h2 class="cp-rot" data-entrada data-i="9">${renderizarIconeDeConteudo('video')} aula em vídeo</h2>
      <div class="video-caixa">
        <div class="video-moldura">
          <iframe
            src="https://www.youtube-nocookie.com/embed/${escaparConteudoHtml(p.video.id)}?rel=0&modestbranding=1"
            title="${escaparConteudoHtml(p.video.titulo || 'Aula em vídeo')}"
            loading="lazy" allowfullscreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            referrerpolicy="strict-origin-when-cross-origin"></iframe>
        </div>
        <p>${escaparConteudoHtml(p.video.escopo || 'Esta aula pode não cobrir todos os subtemas do grupo.')}</p>
        ${p.recomendacoes ? `<div class="cp-recomendacoes"><p><b>Busca sugerida no YouTube:</b> <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(p.recomendacoes.busca)}" target="_blank" rel="noopener noreferrer">${escaparConteudoHtml(p.recomendacoes.busca)}</a></p><p><b>Canais recomendados:</b> ${p.recomendacoes.canais.map(escaparConteudoHtml).join(' · ')}.</p><p>Para aprofundar membrana e transportes: ${p.recomendacoes.aulas.map(a => `<a href="${escaparConteudoHtml(a.url)}" target="_blank" rel="noopener noreferrer">${escaparConteudoHtml(a.titulo)}</a>`).join(' · ')}. Confira também uma aula específica sobre parede celular.</p></div>` : ''}
        <p class="video-legenda">
          <b>${escaparConteudoHtml(p.video.titulo || 'Aula em vídeo')}</b>
          ${p.video.canal ? `<span class="video-canal">${escaparConteudoHtml(p.video.canal)}</span>` : ''}
          <a class="video-link" href="https://www.youtube.com/watch?v=${escaparConteudoHtml(p.video.id)}" target="_blank" rel="noopener">abrir no YouTube</a>
        </p>
      </div>
    </section>` : '';

  const irmaos = base.materia.conteudos;
  const pos = irmaos.findIndex(c => c.id === id);
  const ant = pos > 0 ? irmaos[pos - 1] : null;
  const prox = pos >= 0 && pos < irmaos.length - 1 ? irmaos[pos + 1] : null;

  const indicePagina = [
    ['#resumo', 'Resumo'], p.exemplos.length ? ['#exemplos', 'Exemplos'] : null,
    (figuras || formulas) ? ['#imagens', 'Imagens e fórmulas'] : null,
    ['#questoes', 'Questões'], p.video ? ['#video', 'Vídeo'] : null,
  ].filter(Boolean).map(([href, rot]) => `<a href="${escaparConteudoHtml(href)}">${escaparConteudoHtml(rot)}</a>`).join('');
  const subtemas = p.subtemas || [];
  const indiceCompleto = `
    <details class="cp-subtemas-menu">
      <summary>Navegar nesta página <span class="cp-subtemas-seta" aria-hidden="true">▾</span></summary>
      <div class="cp-subtemas-lista">
        <span class="cp-menu-grupo">Seções</span>${indicePagina}
        ${subtemas.length ? `<span class="cp-menu-grupo">Subtópicos</span>${subtemas.map(t => `<a class="cp-menu-subtema" href="#${escaparConteudoHtml(t.id)}">${escaparConteudoHtml(t.titulo)}</a>`).join('')}` : ''}
      </div>
    </details>`;

  return `
  <nav class="migalha" aria-label="Caminho">
    <a href="#/conteudos">Conteúdos</a> <span aria-hidden="true">/</span>
    <a href="#/conteudos/materia/${base.materia.id}">${escaparConteudoHtml(base.materia.nome)}</a> <span aria-hidden="true">/</span>
    <b>${escaparConteudoHtml(base.titulo)}</b>
  </nav>

  <article class="conteudo-pag">
    <header class="cp-topo" data-entrada>
      <span class="eyebrow">${escaparConteudoHtml(base.area.sigla)} · ${escaparConteudoHtml(base.materia.nome)}</span>
      <h1>${escaparConteudoHtml(base.titulo)}</h1>
    </header>
    <nav class="cp-navegacao-flutuante" aria-label="Navegação nesta página">${indiceCompleto}</nav>

    <div class="cp-duas">
      <section class="cp-bloco cp-resumo" id="resumo" data-entrada>
        <h2 class="cp-rot">${renderizarIconeDeConteudo('livro')} ${paginaCompleta(id) ? 'resumo ampliado' : 'resumo'}</h2>
        ${resumo}
      </section>
      ${chave ? `<aside class="cp-lado">${chave}</aside>` : ''}
    </div>

    ${exemplos}
    ${imagens}
    ${questoes}
    ${video}
    ${(p.subtemas || []).map(subtemaHTML).join('')}
    <section class="cp-bloco"><h2 class="cp-rot">Fontes para aprofundar</h2><p>Consulte a <a href="https://download.inep.gov.br/download/enem/matriz_referencia.pdf" target="_blank" rel="noopener noreferrer">matriz de referência do Enem</a> e os <a href="https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos" target="_blank" rel="noopener noreferrer">cadernos e gabaritos do Inep</a>. Para redação, confira também a cartilha oficial da edição vigente.</p></section>
    ${(p.materiaisRelacionados || []).length ? `<section class="cp-bloco"><h2 class="cp-rot">Materiais anteriores e aulas adicionais</h2><p>Os links preservam as páginas anteriores, com suas questões e vídeos específicos.</p><ul class="chave-lista">${p.materiaisRelacionados.map(item => `<li><a href="#/conteudos/c/${escaparConteudoHtml(item.id)}">${escaparConteudoHtml(item.titulo)}</a>${item.video ? ` · <a href="https://www.youtube.com/watch?v=${escaparConteudoHtml(item.video.id)}" target="_blank" rel="noopener noreferrer">aula no YouTube</a>` : ''}</li>`).join('')}</ul></section>` : ''}

    <nav class="cp-nav" aria-label="Outros conteúdos da matéria">
      ${ant ? `<a class="cp-nav-btn" href="#/conteudos/c/${ant.id}">${renderizarIconeDeConteudo('voltar')}<span><small>anterior</small>${escaparConteudoHtml(ant.titulo)}</span></a>` : '<span></span>'}
      ${prox ? `<a class="cp-nav-btn prox" href="#/conteudos/c/${prox.id}"><span><small>próximo</small>${escaparConteudoHtml(prox.titulo)}</span>${renderizarIconeDeConteudo('seta')}</a>` : '<span></span>'}
    </nav>
  </article>`;
}

// Seção: montagem de tópicos, figuras e questões.

function subtemaHTML(t) {
  const linkSeguro = u => /^https:\/\/(?:www\.)?(?:youtube\.com|youtu\.be|mundoeducacao\.uol\.com\.br|professor\.ufrgs\.br|ensina\.rtp\.pt|download\.inep\.gov\.br|openstax\.org|sedu\.es\.gov\.br|bcr\.iphan\.gov\.br|sme\.goiania\.go\.gov\.br|gov\.br|www2\.camara\.leg\.br|unicef\.org|educa\.ibge\.gov\.br|plato\.stanford\.edu|ibge\.gov\.br|censoagro2017\.ibge\.gov\.br|epe\.gov\.br|encyclopedia\.ushmm\.org)\//.test(u);
  const recomendacao = t.video;
  const videoId = new URL(recomendacao.url).searchParams.get('v');
  return `
  <section class="subtema" id="${escaparConteudoHtml(t.id)}" aria-labelledby="${escaparConteudoHtml(t.id)}-titulo">
    <header class="subtema-topo"><span class="eyebrow">${escaparConteudoHtml(t.codigo)} · aprofundamento</span><h2 id="${escaparConteudoHtml(t.id)}-titulo">${escaparConteudoHtml(t.titulo)}</h2></header>
    <div class="cp-duas subtema-duas">
      <section class="cp-bloco cp-resumo"><h3 class="cp-rot">${renderizarIconeDeConteudo('livro')} resumo ampliado</h3>
      ${t.secoes.map(s => `<section class="cp-secao"><h4>${escaparConteudoHtml(s.h)}</h4>${s.ps.map(p => `<p>${escaparConteudoHtml(p)}</p>`).join('')}</section>`).join('')}</section>
      <aside class="cp-lado"><section class="cp-bloco"><h3 class="cp-rot">${renderizarIconeDeConteudo('alvo')} o que mais cai</h3><ul class="chave-lista">${t.chave.map(x=>`<li>${escaparConteudoHtml(x)}</li>`).join('')}</ul></section></aside>
    </div>
    <section class="cp-bloco"><h3 class="cp-rot">${renderizarIconeDeConteudo('exemplo')} exemplos práticos</h3><div class="cp-exemplos">
    ${t.exemplos.map((e,i)=>`<article class="cp-exemplo"><span class="cp-ex-num">${i+1}</span><div><h4>${escaparConteudoHtml(e.titulo)}</h4><p class="cp-ex-texto">${escaparConteudoHtml(e.texto)}</p><p class="cp-ex-coment"><b>Por que importa:</b> ${escaparConteudoHtml(e.comentario)}</p></div></article>`).join('')}</div></section>
    <section class="cp-bloco"><h3 class="cp-rot">${renderizarIconeDeConteudo('imagem')} imagens, esquemas e fórmulas</h3>${figuraHTML({tipo:'fluxo',titulo:'Roteiro de leitura e resolução',itens:t.roteiro})}</section>
    <section class="cp-bloco"><h3 class="cp-rot">${renderizarIconeDeConteudo('check')} ${t.questoes.length} questões inéditas resolvidas</h3>${t.questoes.map((q,i)=>questaoHTML(q,i)).join('')}</section>
    <section class="cp-bloco"><h3 class="cp-rot">${renderizarIconeDeConteudo('video')} aula em vídeo</h3>
    ${videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId) ? `<div class="video-caixa"><div class="video-moldura"><iframe src="https://www.youtube-nocookie.com/embed/${escaparConteudoHtml(videoId)}?rel=0" title="${escaparConteudoHtml(recomendacao.titulo)}" loading="lazy" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe></div></div>` : ''}
    <p><b>Busca sugerida:</b> <a href="https://www.youtube.com/results?search_query=${encodeURIComponent(recomendacao.busca)}" target="_blank" rel="noopener noreferrer">${escaparConteudoHtml(recomendacao.busca)}</a></p>
    <p><b>Canal:</b> ${escaparConteudoHtml(recomendacao.canal)} · ${linkSeguro(recomendacao.url) ? `<a href="${escaparConteudoHtml(recomendacao.url)}" target="_blank" rel="noopener noreferrer">${escaparConteudoHtml(recomendacao.titulo)}</a>` : escaparConteudoHtml(recomendacao.titulo)}</p>
    <p>${escaparConteudoHtml(recomendacao.escopo || 'A aula recomendada pode não esgotar todos os detalhes; confira também as fontes de aprofundamento.')}</p>
    ${(t.aulasComplementares || []).filter(a=>linkSeguro(a.url)).length ? `<p><b>Aula complementar:</b> ${t.aulasComplementares.filter(a=>linkSeguro(a.url)).map(a=>`<a href="${escaparConteudoHtml(a.url)}" target="_blank" rel="noopener noreferrer">${escaparConteudoHtml(a.titulo)}</a>`).join(' · ')}</p>` : ''}
    <p><b>Fonte de apoio:</b> ${(t.fontes||[]).filter(f=>linkSeguro(f.url)).map(f=>`<a href="${escaparConteudoHtml(f.url)}" target="_blank" rel="noopener noreferrer">${escaparConteudoHtml(f.titulo)}</a>`).join(' · ')}</p></section>
  </section>`;
}

function figuraHTML(f, i = 0) {
  const itens = f.itens || [];
  let corpo = '';

  if (f.tipo === 'fluxo') {
    corpo = `<ol class="fig-fluxo">${itens.map(it => `
      <li><span class="ff-txt">${escaparConteudoHtml(typeof it === 'string' ? it : it.txt)}</span>
      ${typeof it === 'object' && it.nota ? `<span class="ff-nota">${escaparConteudoHtml(it.nota)}</span>` : ''}</li>`).join('')}</ol>`;
  } else if (f.tipo === 'camadas') {
    corpo = `<ul class="fig-camadas">${itens.map(it => `
      <li><b>${escaparConteudoHtml(typeof it === 'string' ? it : it.txt)}</b>
      ${typeof it === 'object' && it.nota ? `<span>${escaparConteudoHtml(it.nota)}</span>` : ''}</li>`).join('')}</ul>`;
  } else if (f.tipo === 'barras') {
    const max = Math.max(...itens.map(it => Number(it.valor) || 0), 1);
    corpo = `<ul class="fig-barras">${itens.map(it => `
      <li>
        <span class="fb-rot">${escaparConteudoHtml(it.txt)}</span>
        <span class="fb-trilha"><span class="fb-preenche" style="width:${Math.max(4, (Number(it.valor) || 0) / max * 100).toFixed(1)}%"></span></span>
        <span class="fb-val">${escaparConteudoHtml(it.valor)}${it.unidade ? ` ${escaparConteudoHtml(it.unidade)}` : ''}</span>
      </li>`).join('')}</ul>`;
  } else {
    corpo = `<ul class="fig-lista">${itens.map(it => `<li>${escaparConteudoHtml(typeof it === 'string' ? it : it.txt)}</li>`).join('')}</ul>`;
  }

  return `
  <figure class="cp-figura" data-entrada data-i="${i}">
    <figcaption>${escaparConteudoHtml(f.titulo || 'Esquema')}</figcaption>
    ${corpo}
    ${f.legenda ? `<p class="fig-legenda">${escaparConteudoHtml(f.legenda)}</p>` : ''}
  </figure>`;
}

function questaoHTML(q, i) {
  const fonte = [q.ano ? `Enem ${q.ano}` : null, q.fonte || null, q.adaptada ? 'adaptada' : null]
    .filter(Boolean).join(' · ');
  const letras = ['A', 'B', 'C', 'D', 'E'];
  const alternativas = (q.alternativas || []).map((alt, k) => `
    <li class="${letras[k] === q.correta ? 'correta' : ''}">
      <span class="alt-letra">${letras[k]}</span>
      <span class="alt-txt">${escaparConteudoHtml(alt)}</span>
    </li>`).join('');

  return `
  <details class="questao" open data-entrada data-i="${i}">
    <summary class="q-topo">
      <span class="q-num">${i + 1}</span>
      <span class="q-fonte">${escaparConteudoHtml(fonte || 'Enem')}</span>
      <span class="q-abre">resolução escrita</span>
    </summary>
    <div class="q-corpo">
      ${q.urlProva && /^https:\/\/download\.inep\.gov\.br\//.test(q.urlProva) ? `<p class="q-fontes"><a href="${escaparConteudoHtml(q.urlProva)}" target="_blank" rel="noopener noreferrer">Abrir caderno oficial ↗</a>${q.urlGabarito && /^https:\/\/download\.inep\.gov\.br\//.test(q.urlGabarito) ? ` <a href="${escaparConteudoHtml(q.urlGabarito)}" target="_blank" rel="noopener noreferrer">Ver gabarito oficial ↗</a>` : ''}</p>` : ''}
      ${(q.textoApoio || []).map(t => `<p class="q-apoio">${escaparConteudoHtml(t)}</p>`).join('')}
      <p class="q-enunciado">${escaparConteudoHtml(q.enunciado || '')}</p>
      <ol class="q-alts">${alternativas}</ol>
      <div class="q-resolucao">
        <span class="q-rot">${renderizarIconeDeConteudo('lapis')} resolução passo a passo</span>
        <ol class="q-passos">
          ${(q.resolucao || []).map(r => `<li>${escaparConteudoHtml(r)}</li>`).join('')}
        </ol>
        ${(q.porqueErram || []).length ? `
        <div class="q-erram">
          <span class="q-rot">por que as outras erram</span>
          <ul>${q.porqueErram.map(e => `<li>${escaparConteudoHtml(e)}</li>`).join('')}</ul>
        </div>` : ''}
        ${q.gabaritoOficial ? `<p class="q-gab"><b>Gabarito oficial:</b> ${escaparConteudoHtml(q.gabaritoOficial)}</p>` : ''}
      </div>
    </div>
  </details>`;
}

function naoEncontrado(msg) {
  return `<div class="vazio" style="padding:var(--s9) 0">
    ${renderizarIconeDeConteudo('alerta')}
    <p>${escaparConteudoHtml(msg)}</p>
    <a class="btn btn-pequeno" href="#/conteudos">Ver todos os conteúdos</a>
  </div>`;
}

export function tituloDeConteudos(partes = []) {
  if (partes[0] !== 'conteudos') return null;
  if (partes[1] === 'materia' && partes[2]) {
    const m = materiaPorId(decodeURIComponent(partes[2]));
    return m ? `${m.nome}, Conteúdos do Enem` : 'Conteúdos do Enem';
  }
  if (partes[1] === 'c' && partes[2]) {
    const c = conteudoPorId(decodeURIComponent(partes[2]));
    return c ? `${c.titulo}, ${c.materia.nome}` : 'Conteúdos do Enem';
  }
  return 'Conteúdos do Enem, o que cai em cada matéria';
}
