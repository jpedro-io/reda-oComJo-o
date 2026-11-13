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
import { viewConteudos, viewMateria, viewConteudo, tituloDeConteudos } from './ui-conteudos.js?v=2026-11-conteudos3';
import { conteudoPorId } from './db/conteudos/index.js';
import { lerProgressoLocal, marcarAcessoLocal, salvarRedacaoLocal, excluirRedacaoLocal, limparAcessosLocal, importarProgressoLocal } from './progresso-local.js';

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
    ['#/competencias', 'Competências', 'As 5 competências, os 6 níveis de cada uma e por que o mesmo erro repetido pesa mais.', 'regua'],
    ['#/estrutura', 'Estrutura', 'Anatomia parte por parte, os 5 elementos da proposta e o esqueleto de 30 linhas.', 'camada'],
    ['#/comandos', 'Ler o tema', 'O substantivo que abre a proposta é um pedido. 11 comandos, com armadilha e roteiro.', 'mira'],
    ['#/temas', 'Temas', `${TEMAS.length} temas com recorte, núcleo, vocabulário de apoio e repertórios.`, 'tema'],
    ['#/redacoes', 'Redações analisadas', `${TOTAL_NOTA_MIL} modelos didáticos, de 2014 a 2026, com cada parágrafo comentado.`, 'doc'],
    ['#/conteudos', 'Estudar conteúdos', 'Encontre os assuntos das quatro áreas e pratique com resoluções escritas.', 'regua'],
    ['#/corrigir', 'Corrigir', 'Cole seu texto: nota por competência, o que segura a nota e o que fazer primeiro.', 'analise']
  ];

  /* amostra da folha corrigida: trecho real de uma das redações do site */
  const folha = `
    <figure class="folha">
      <figcaption class="folha-topo">Trecho de redação nota 1000</figcaption>
      <div class="folha-corpo">
        <blockquote class="folha-texto">
          <p><mark>A Lei 10.216, de 2001, redirecionou o cuidado em saúde mental no Brasil</mark> ao substituir o isolamento manicomial por serviços de base comunitária. Duas décadas depois, o estigma segue funcionando como barreira: <mark>falar de sofrimento psíquico ainda é tratado como sinal de fraqueza</mark>. Esse silêncio não é apenas cultural, pois <span class="folha-erro">adia o diagnóstico, esvazia a busca por tratamento e reproduz o preconceito</span> dentro do próprio sistema de saúde.</p>
        </blockquote>
        <p class="folha-nota">Três efeitos no mesmo período. Um ponto antes de “pois” resolve.</p>
      </div>
      <p class="folha-legenda">Marca-texto: acerto. Vermelho: ponto de melhoria.</p>
    </figure>`;

  const comps = CRITERIOS.map(c => `
    <div class="hp-linha">
      <span class="id">${c.id}</span>
      <span class="nome">${esc(c.nome)}</span>
      <span class="val">0–200</span>
    </div>`).join('');

  return `
  <section class="novo-hero" aria-labelledby="inicio-titulo">
    <div class="novo-hero-copy" data-entrada>
      <h1 id="inicio-titulo">Seu caminho para o Enem começa <em>aqui.</em></h1>
      <p>Explore os conteúdos da prova, pratique com questões resolvidas e desenvolva sua redação no seu ritmo.</p>
      <div class="novo-acoes">
        <a class="novo-btn principal" href="#/conteudos">Explorar conteúdos <span aria-hidden="true">↗</span></a>
        <a class="novo-btn secundario" href="#/corrigir">Corrigir redação <span aria-hidden="true">→</span></a>
      </div>
      <div class="novo-etapas"><span>Aprenda</span><span aria-hidden="true">·</span><span>Pratique</span><span aria-hidden="true">·</span><span>Evolua</span></div>
    </div>
  </section>

  <section class="novo-painel" data-entrada aria-label="Seu caminho de estudos">
      <div class="novo-painel-top"><span>SEU CAMINHO</span><span aria-hidden="true">✳</span></div>
      <p class="novo-painel-titulo">Um passo de cada vez.</p>
      <p class="novo-painel-sub">Escolha por onde começar.</p>
      <a href="#/conteudos" class="novo-passo"><span class="novo-icon roxo">✦</span><span><strong>Conteúdos</strong><small>As quatro áreas do Enem</small></span><b aria-hidden="true">↗</b></a>
      <a href="#/redacoes" class="novo-passo"><span class="novo-icon menta">▤</span><span><strong>Redação</strong><small>Modelos e competências</small></span><b aria-hidden="true">↗</b></a>
      <a href="#/corrigir" class="novo-passo"><span class="novo-icon coral">✓</span><span><strong>Correção</strong><small>Diagnóstico para melhorar</small></span><b aria-hidden="true">↗</b></a>
      <div class="novo-painel-rodape"><span>ESTUDE COM PROPÓSITO</span><span>↗</span></div>
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
    <p class="comp-lead">Cada competência vale <b>0, 40, 80, 120, 160 ou 200</b>, como na grade oficial. Como a nota do Enem é a <b>média de dois avaliadores</b>, que podem atribuir notas diferentes, o relatório apresenta uma faixa estimada (entre X e Y), e não uma nota oficial.</p>
    <div class="faixa-comp" data-entrada>
      ${CRITERIOS.map(c => `
        <a class="rc-item" href="#/competencias">
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
      <header class="comp-topo">
        <h2 class="comp-nome"><span class="comp-id">${c.id}</span> ${esc(c.nome)}</h2>
        <span class="comp-nota">vale até ${c.valor}</span>
      </header>
      <p class="comp-resumo">${esc(c.resumo)}</p>

      <p class="comp-regra">${esc(GRADES[c.id].regra)}</p>

      <table class="tabela-niveis">
        <thead>
          <tr><th scope="col">Nível</th><th scope="col">Descritor</th><th scope="col" class="num">Nota</th></tr>
        </thead>
        <tbody>
          ${c.niveis.slice().sort((a, b) => b.n - a.n).map(nv => {
            const fino = escada.niveis.find(x => x.pontos === nv.n * 40);
            return `
            <tr>
              <td class="niv">${nv.n}</td>
              <td>
                ${esc(nv.texto)}
                ${fino ? `<span class="niv-fino"><b>O que o avaliador procura.</b> ${esc(fino.texto)}</span>` : ''}
              </td>
              <td class="num">${nv.n * 40}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>

      <div class="comp-colunas">
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
      </div>

      <div class="side-bloco">
        <h3>Mesma ideia, dois níveis</h3>
        <div class="exemplo-par">
          <div class="ex fraco"><span class="rot">Tende ao nível 2.</span> ${esc(c.exemplo.fraco)}</div>
          <div class="ex forte"><span class="rot">Tende ao nível 4 ou 5.</span> ${esc(c.exemplo.forte)}</div>
        </div>
      </div>

      <details class="oficial-det">
        <summary>Descritor oficial de cada nível, de 40 em 40 pontos</summary>
        <ul class="oficial-lista">${oficialTxt}</ul>
        <p class="oficial-fonte">Fonte: ${esc(GRADES[c.id].fonte)}</p>
      </details>
    </article>`;
  }).join('');

  return `
  <div class="secao-topo">
    <h1 data-entrada>As cinco competências</h1>
    <p class="sub" data-entrada>Cada competência tem seis notas oficiais possíveis: 0, 40, 80, 120, 160 ou 200. Quem reúne características de dois níveis fica no inferior, e essa é a regra da grade. O relatório mostra a faixa em que a nota cai (de 160 a 200, por exemplo), porque a nota final do Enem é a média de dois avaliadores e os dois divergem.</p>
  </div>

  <div class="regua">${regua}</div>

  <div class="aviso" data-entrada>
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
        ${ZEROS.map(z => `<li><b>${esc(z.titulo)}</b>, ${esc(z.texto)}</li>`).join('')}
      </ul>
    </div>
    <div class="painel-solido" data-entrada>
      <h3>Como a nota é calculada</h3>
      <ul class="lista-num">
        ${CALCULO_NOTA.map(z => `<li><b>${esc(z.titulo)}</b>, ${esc(z.texto)}</li>`).join('')}
      </ul>
    </div>
  </div>`;
}

/* ------------------------------------------------------------------ 3. ESTRUTURA */
/* molde: linha do tempo das partes + trilha dos 5 elementos + esqueleto */

function viewEstrutura() {
  const linha = PARTES.map((p, i) => `
    <section class="parte" data-entrada>
      <h2 class="parte-tit">${i + 1}. ${esc(p.nome)}</h2>
      <p class="parte-meta">${esc(p.linhas)} · ${esc(p.funcao)}</p>
      <p class="parte-formula"><b>Fórmula.</b> ${esc(p.formula)}</p>
      <ol class="passos">${p.passos.map(s => `<li>${esc(s)}</li>`).join('')}</ol>
      <p class="parte-erro"><b>Erro comum.</b> ${esc(p.erroComum)}</p>
      <p class="parte-dica"><b>Dica.</b> ${esc(p.dica)}</p>
    </section>`).join('');

  const trilha = ELEMENTOS_PROPOSTA.map(e => `
    <div class="trilha-item">
      <h3>${esc(e.nome)}</h3>
      <p class="pergunta">${esc(e.pergunta)}</p>
      <p class="exemplos">${esc(e.exemplos)}</p>
    </div>`).join('');

  return `
  <div class="secao-topo">
    <h1 data-entrada>Estrutura da redação</h1>
    <p class="sub" data-entrada>São quatro partes, cada uma com a sua função. Cada parte do texto precisa cumprir a sua.</p>
  </div>

  <div class="bloco-tabela" data-entrada>
    <h2 class="h-tabela">Distribuição sugerida</h2>
    <table class="tabela">
      <thead><tr><th>Parte</th><th>Linhas</th><th>Função</th></tr></thead>
      <tbody>
        ${DISTRIBUICAO_LINHAS.map(d => `<tr><td><b>${esc(d.parte)}</b></td><td>${esc(d.linhas)}</td><td>${esc(d.funcao)}</td></tr>`).join('')}
      </tbody>
    </table>
  </div>

  <div class="partes">${linha}</div>

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
    <h1 data-entrada>Como ler o tema</h1>
    <p class="sub" data-entrada>Valorização pede que você aponte o que desvaloriza. Antes de escrever, identifique o comando: é ele que define o recorte.</p>
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
let buscaAtual = '';

function linhasTemas() {
  const termo = buscaAtual.trim().toLowerCase();
  const lista = TEMAS
    .filter(t => filtroAtual === 'todos' || t.eixo === filtroAtual)
    .filter(t => {
      if (!termo) return true;
      const palheiro = [t.titulo, t.recorte, t.eixo, ...(t.nucleo || []), ...(t.apoio || [])]
        .join(' ').toLowerCase();
      return palheiro.includes(termo);
    })
    .sort((a, b) => (b.ano || 0) - (a.ano || 0) || a.titulo.localeCompare(b.titulo, 'pt-BR'));

  if (!lista.length) {
    return `<p class="vazio">Nenhum tema corresponde a essa busca. Tente outra palavra ou volte para todos os eixos.</p>`;
  }

  return lista.map(t => {
    const cmd = comandoDoTema(t.titulo);
    const red = REDACOES.find(r => r.temaId === t.id);
    const palavras = [
      ...(t.nucleo || []).slice(0, 4).map(k => esc(termoBonito(k))),
      ...(motivadoresDe(t.id).length ? [`${motivadoresDe(t.id).length} textos motivadores`] : []),
      ...(t.apoio || []).slice(0, 4).map(k => esc(termoBonito(k))),
    ];
    return `
    <article class="tema-linha" data-entrada>
      <div class="tl-ano ${t.tipo === 'enem' ? '' : 'treino'}">${t.ano || 'treino'}</div>
      <div class="tl-corpo">
        <h3 class="tl-tit">${esc(t.titulo)}</h3>
        <p class="tl-comando">${cmd ? `Comando: <b>${esc(cmd.palavra.split('/')[0].trim())}</b>. ` : ''}${esc(t.recorte)}</p>
        <p class="tl-chips">${palavras.slice(0, 5).join(' · ')}</p>
        ${motivadoresHTML(t.id)}
        <details class="tl-det">
          <summary>Repertórios e vocabulário de apoio</summary>
          <ul class="rep-lista">
            ${(t.repertorios || []).map(r => `<li><b>${esc(r.nome)}</b>: ${esc(r.uso)}</li>`).join('') || '<li>Use repertório histórico, legal ou de dados, desde que explicado.</li>'}
          </ul>
          <p class="tl-comando">Vocabulário de apoio: ${esc((t.apoio || []).join(', ') || 'não indicado')}</p>
        </details>
      </div>
      <div class="tl-acoes">
        ${red ? `<a href="#/redacoes/${red.id}">Ver redação ${red.nota}</a>` : ''}
        <a href="#/corrigir?tema=${encodeURIComponent(t.id)}">Treinar neste tema</a>
      </div>
    </article>`;
  }).join('');
}

function viewConteudosTemas() {
  return `
  <div class="secao-topo">
    <h1 data-entrada>Temas de 2014 a 2026</h1>
    <p class="sub" data-entrada>Temas oficiais e temas de treino. O recorte é o que a banca pede, e as palavras-chave são o vocabulário que sustenta esse recorte sem fugir dele.</p>
  </div>

  <div class="filtro-temas">
    <label class="campo-busca">
      <span>Buscar tema</span>
      <input type="search" id="busca-tema" placeholder="envelhecimento, saúde, tecnologia" value="${esc(buscaAtual)}" />
    </label>
    <label class="campo-eixo">
      <span>Categoria</span>
      <select id="filtro-eixo">
        <option value="todos"${filtroAtual === 'todos' ? ' selected' : ''}>Todos os eixos</option>
        ${EIXOS.map(e => `<option value="${esc(e)}"${filtroAtual === e ? ' selected' : ''}>${esc(e)}</option>`).join('')}
      </select>
    </label>
  </div>

  <div class="lista-temas" id="lista-temas">${linhasTemas()}</div>`;
}

const viewTemas = viewConteudosTemas;

function ligarFiltros() {
  const busca = document.getElementById('busca-tema');
  const eixo = document.getElementById('filtro-eixo');
  const lista = document.getElementById('lista-temas');
  if (!lista) return;

  const redesenhar = () => {
    lista.innerHTML = linhasTemas();
    ativarMovimento(lista);
  };

  if (busca) {
    busca.addEventListener('input', () => { buscaAtual = busca.value; redesenhar(); });
  }
  if (eixo) {
    eixo.addEventListener('change', () => { filtroAtual = eixo.value; redesenhar(); });
  }
}

/* ------------------------------------------------------------------ 6. REDAÇÕES */
/* molde: crônica com espinha de ano */

function viewRedacoes() {
  const todas = REDACOES
    .slice()
    .sort((a, b) => (b.ano || 0) - (a.ano || 0) || String(a.tema).localeCompare(String(b.tema), 'pt-BR'));

  const linhas = todas.map(r => `
    <tr>
      <td class="ano">${r.ano || 'sem ano'}</td>
      <td class="tema">
        <a href="#/redacoes/${r.id}">${esc(r.tema)}</a>
        <span class="meta">${esc(r.tipo)} · ${r.paragrafos.length} parágrafos</span>
      </td>
      <td class="nota${r.nota === 0 ? ' zero' : ''}">${r.nota === 0 ? 'anulada' : r.nota}</td>
    </tr>`).join('');

  return `
  <div class="secao-topo">
    <h1 data-entrada>Redações nota 1000 analisadas</h1>
    <p class="sub" data-entrada>Cada redação traz por que tirou 1000, o que cada parágrafo faz, os trechos que o avaliador reconhece e um ponto de melhoria.</p>
  </div>

  <table class="tabela-redacoes">
    <thead>
      <tr><th scope="col">Ano</th><th scope="col">Tema</th><th scope="col" class="nota">Nota</th></tr>
    </thead>
    <tbody>${linhas}</tbody>
  </table>`;
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
      Modelo didático construído para reproduzir o padrão nota 1000, não é transcrição de texto oficial de participante.
    </p>
  </article>`;
}

/* ------------------------------------------------------------------ 7. CORRIGIR */
/* molde: workspace em duas colunas; painel de resultado é o vidro nº 3 */

let estado = { temaId: 'enem-2026', temaLivre: '', texto: '' };
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
    .map(t => `<option value="${esc(t.id)}" ${t.id === estado.temaId ? 'selected' : ''}>${t.ano ? t.ano + ', ' : ''}${esc(t.titulo)}</option>`)
    .join('');

  return `
  <div class="secao-topo">
    <h1 data-entrada>Corrigir redação</h1>
    <p class="sub" data-entrada>O corretor aplica as grades oficiais das cinco competências e explica, uma por uma, por que a nota não chegou a 200, com o trecho do seu texto que motivou cada observação. É um diagnóstico automático e não substitui a correção humana.</p>
  </div>

  <div class="workspace">
    <div class="ws-entrada">
      <div class="ws-proposta">
      <div class="campo">
        <label class="label" for="tema">Tema da proposta</label>
        <select class="select" id="tema">
          ${opcoes}
          <option value="livre" ${estado.temaId === 'livre' ? 'selected' : ''}>Tema livre (digite abaixo)</option>
        </select>
      </div>

      <div class="campo" id="campo-livre" style="display:none">
        <label class="label" for="tema-livre">Qual é o tema?</label>
        <input class="input" id="tema-livre" value="${esc(estado.temaLivre)}" placeholder="Ex.: os desafios da inclusão digital de idosos no Brasil" />
      </div>

      <div id="proposta-tema"></div>
      </div>

      <div class="campo">
        <label class="label" for="texto">Sua redação</label>
        <p class="historico-privacidade">Ao clicar em Corrigir, o texto e o resultado serão salvos neste navegador, sem conta. Em dispositivos compartilhados, outras pessoas poderão acessá-los.</p>
        <textarea class="textarea" id="texto" aria-describedby="aviso-transcricao" placeholder="Cole aqui a sua redação (ou carregue um exemplo abaixo).">${esc(estado.texto)}</textarea>
        <div class="contador">
          <span id="conta-linhas">0 linhas</span>
          <span id="conta-palavras">0 palavras</span>
        </div>
      </div>

      <p id="aviso-transcricao" class="aviso-transcricao">Para uma correção mais fiel, digite a redação exatamente como está no papel, mantendo os erros de escrita, a pontuação e os parágrafos.</p>
      <div class="btn-linha">
        <button class="btn btn-primario" id="bt-corrigir">${ico('analise')} Corrigir</button>
        <button class="btn" id="bt-limpar">Limpar</button>
        <button class="btn btn-fantasma btn-pequeno" data-exemplo="boa">Exemplo: alto desempenho</button>
        <button class="btn btn-fantasma btn-pequeno" data-exemplo="problemas">Exemplo: problemas típicos</button>
      </div>
      <p id="salvamento-status" class="historico-status" role="status" aria-live="polite"></p>
    </div>

    <aside class="ws-saida" aria-live="polite" id="saida">
      <div class="vazio">
        <p>Cole o texto e clique em <b>Corrigir</b>.<br />O relatório aparece aqui, competência por competência.</p>
      </div>
    </aside>
  </div>
  <section class="historico-local" aria-labelledby="historico-titulo">
    <div class="historico-cabecalho"><div><h2 id="historico-titulo">Suas redações neste navegador</h2>
    <p>As correções são salvas somente neste navegador, sem conta. Em um dispositivo compartilhado, outras pessoas com acesso ao navegador podem lê-las. Ao limpar os dados do navegador, elas podem ser apagadas.</p></div></div>
    <div id="lista-historico"></div>
    <div class="historico-acoes"><button class="btn btn-pequeno" id="exportar-progresso" type="button">Exportar backup</button>
    <button class="btn btn-pequeno" id="importar-progresso" type="button">Importar backup</button>
    <input type="file" id="arquivo-progresso" accept="application/json,.json" hidden>
    <button class="btn btn-pequeno" id="limpar-acessos" type="button">Apagar marcações de acesso</button></div>
    <p class="historico-aviso">O backup contém suas redações e os conteúdos acessados. Guarde-o em local privado. Importar combina os dados sem apagar o histórico atual.</p>
  </section>`;
}

function motivoHTML(m, i, zerado) {
  const etiqueta = zerado ? 'observação'
    : m.gravidade === 'alta' ? 'impede o 200'
    : m.gravidade === 'media' ? 'segura a nota' : 'observação';
  return `
    <li class="motivo g-${['alta','media','baixa'].includes(m.gravidade) ? m.gravidade : 'baixa'}">
      <span class="m-tag"><i>${i + 1}</i>${etiqueta}</span>
      <h5 class="m-titulo">${esc(m.titulo)}</h5>
      <p class="m-porque">${esc(m.porque)}</p>
      ${m.evidencia ? `<blockquote>${esc(m.evidencia)}</blockquote>` : ''}
      ${m.exemplos && m.exemplos.length
        ? `<ul class="m-ex">${m.exemplos.map(e => `<li>${esc(e)}</li>`).join('')}</ul>` : ''}
      ${m.comoResolver ? `<p class="m-como"><b>Como resolver.</b> ${esc(m.comoResolver)}</p>` : ''}
    </li>`;
}

/* faixa publicada de uma competência: {min,max} — com os 40 oficiais nas pontas */
export function faixaDaComp(c) {
  const f = c.faixaNota || { min: c.nota, max: c.nota };
  return { min: f.min, max: f.max, exata: f.min === f.max };
}

/* bloco de leitura do relatório: um rótulo curto e o texto. Sem caixa alta aos
   berros, sem chip dentro de chip, o olho desce uma coluna só. */
function bloco(rotulo, corpo, classe = '') {
  return `
    <section class="cc-bloco ${classe}">
      <h5 class="cc-rot">${rotulo}</h5>
      ${corpo}
    </section>`;
}

function compCard(c, aberto) {
  const ex = c.explicacao || {};
  const nivel = ex.nivel || { n: c.nivel, pontos: c.nota, exige: '' };
  const classeNota = c.nota < 120 ? 'baixa' : c.nota < 200 ? 'media' : '';
  const f = faixaDaComp(c);
  const rotuloFaixa = f.exata ? `${f.min}` : `${f.min}<i>–</i>${f.max}`;
  const oficial = nivel.oficial ?? nivel.n ?? c.nivel;
  const descritor = nivel.exigeOficial || nivel.exige || '';
  // A orientação genérica da cartilha pode pedir variedade que já existe no
  // texto. Na C4, dê prioridade ao diagnóstico observado nesta redação.
  const faltouProximo = c.id === 'C4' ? (c.melhorias?.[0] || '') : ex.proximo?.faltou;

  const porque = f.exata
    ? (oficial >= 5
        ? `O texto cumpre integralmente o descritor do nível máximo, e não existe nível acima dele: os dois avaliadores tendem a fechar em ${f.min}.`
        : `O texto cumpre o descritor do nível ${oficial} e não mostra o do nível seguinte: os dois avaliadores tendem a fechar em ${f.min}.`)
    : `A nota oficial desta competência é ${f.min}, nível ${oficial}. ${f.max - f.min >= 40
        ? `Como o texto já mostra parte do descritor de ${f.max}, o segundo avaliador pode subir um nível inteiro, por isso a faixa vai até ${f.max}.`
        : `O texto está firme no nível ${oficial}; os 20 pontos de margem são a divergência previsível entre os dois avaliadores.`}`;

  const motivos = ex.motivos && ex.motivos.length
    ? `<ol class="motivos">${ex.motivos.map((m, i) => motivoHTML(m, i, !!ex.zero)).join('')}</ol>`
    : '<p class="cc-txt">Nenhum impedimento identificado nesta amostra para o nível máximo.</p>';

  return `
  <details class="comp-card" ${aberto ? 'open' : ''}>
    <summary class="cc-sum">
      <span class="cc-id">${c.id}</span>
      <span class="cc-nome">${esc(c.nome)}</span>
      <span class="cc-bar"><i style="--v:${(f.max || 0) / 200}"></i></span>
      <span class="cc-nota ${classeNota}" title="Faixa de nota desta competência">${rotuloFaixa}<small>/200</small></span>
    </summary>
    <div class="cc-body">
      <p class="cc-dx">${esc(ex.sintese || '')}</p>
      ${ex.zero
        ? bloco('nota 0 · texto zerado',
            `<ul class="zero-lista">${ex.zero.map(z => `<li><b>${esc(z.titulo)}.</b> ${esc(z.detalhe)}</li>`).join('')}</ul>`)
        : bloco(`nota ${f.exata ? f.min : `${f.min}–${f.max}`} · nível ${oficial} de 5`,
            `<p class="cc-txt">${porque}</p>`)}
      ${ex.zero ? '' : bloco(`o que o nível ${oficial} exige`,
        `<p class="cc-txt">${esc(descritor)}</p>
         ${ex.fonte ? `<p class="cc-fonte">Grade: ${esc(ex.fonte)}</p>` : ''}`)}
      ${bloco(ex.zero ? 'o que a escrita mostra' : 'o que segurou a nota', motivos)}
      ${ex.proximo && !ex.zero ? bloco(`para subir até ${Math.min(200, (oficial + 1) * 40)}`,
        `<p class="cc-txt"><b>Exige.</b> ${esc(ex.nivelTextoProximo || ex.proximo.exige)}</p>
         ${faltouProximo ? `<p class="cc-txt"><b>Para revisar.</b> ${esc(faltouProximo)}</p>` : ''}`) : ''}
      ${c.melhorias && c.melhorias.length ? bloco('o que revisar na próxima versão',
        `<ul class="rev-lista">${c.melhorias.slice(0, 6).map(x => `<li>${esc(x)}</li>`).join('')}</ul>`) : ''}
      ${c.fortes && c.fortes.length ? bloco('o que já está certo',
        `<ul class="fortes-lista">${c.fortes.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`) : ''}
    </div>
  </details>`;
}

function relatorio(r) {
  if (!r.ok) {
    return `<div class="vazio">${ico('alerta', 'ico-g')}<p>${esc(r.erro)}</p></div>`;
  }

  /* a nota publicada é uma FAIXA: o anel mostra do mínimo ao máximo */
  const fTotal = r.notaFaixa || { min: r.notaTotal, max: r.notaTotal };
  const entre = fTotal.max > fTotal.min;

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
      <p class="nota-final" role="text" aria-label="${entre ? `nota final entre ${fTotal.min} e ${fTotal.max} de 1000` : `nota final ${fTotal.min} de 1000`}">
        <span class="nf-num${entre ? ' nf-faixa' : ''}">${entre ? `${fTotal.min}<i>a</i>${fTotal.max}` : fTotal.min}</span>
        <span class="nf-de">de 1000</span>
      </p>
      <p class="nota-nivel">${esc(r.faixa.nome)}</p>
      <p class="nota-texto">${esc(r.faixa.texto)}</p>
      <p class="nota-texto nota-faixa">${entre
        ? `Faixa de <b>${fTotal.min}</b> a <b>${fTotal.max}</b>. O mínimo soma as notas oficiais das cinco competências; o máximo soma o que cada uma ainda comporta. Dois avaliadores corrigem a mesma redação e não fecham o mesmo número.`
        : `Nota <b>${fTotal.min}</b>. Nesta amostra o texto fecha no teto em todas as competências, e não há margem para o segundo avaliador subir.`}</p>
    </div>

    ${zeros}

    <div class="rel-principio">
      <div>O nível não é uma média: cada competência só sobe se cumprir <b>integralmente</b> o descritor do nível, e, quando o texto reúne características de dois níveis, o avaliador fica com o <b>inferior</b>. Abra cada competência para ver a regra aplicada e o trecho que a motivou.</div>
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

  const livre = document.getElementById('tema-livre');
  livre?.addEventListener('input', () => { estado.temaLivre = livre.value; });
  const statusLocal = document.getElementById('salvamento-status');
  const informarLocal = (mensagem) => { if (statusLocal) statusLocal.textContent = mensagem; };
  const atualizarHistorico = () => {
    const lista = document.getElementById('lista-historico');
    const l = lerProgressoLocal();
    if (!l.ok) { lista.innerHTML = ''; informarLocal(l.erro); return; }
    if (!l.dados.redacoes.length) { lista.innerHTML = '<p class="historico-vazio">Nenhuma redação salva ainda. Corrija seu texto para guardá-lo aqui.</p>'; return; }
    lista.innerHTML = `<ul class="historico-lista">${l.dados.redacoes.map(e => {
      const data = new Date(e.data).toLocaleString('pt-BR', {dateStyle:'short',timeStyle:'short'});
      const tema = e.relatorio.tema?.titulo || e.temaLivre || 'Tema não identificado';
      const f = e.relatorio.notaFaixa || {min:e.relatorio.notaTotal,max:e.relatorio.notaTotal};
      const nota = f.min === f.max ? `${f.min}` : `${f.min}–${f.max}`;
      return `<li class="historico-item"><div><b>${esc(tema)}</b><p>${esc(data)} · nota ${esc(nota)} / 1000</p><p class="historico-trecho">${esc(e.texto.slice(0,130))}${e.texto.length>130?'…':''}</p></div><div class="historico-botoes"><button type="button" class="btn btn-pequeno" data-abrir-redacao="${esc(e.id)}">Abrir</button><button type="button" class="btn btn-pequeno" data-excluir-redacao="${esc(e.id)}">Excluir</button></div></li>`;
    }).join('')}</ul>`;
  };
  atualizarHistorico();
  document.getElementById('lista-historico')?.addEventListener('click', event => {
    const abrir = event.target.closest('[data-abrir-redacao]');
    const excluir = event.target.closest('[data-excluir-redacao]');
    const l = lerProgressoLocal(); if (!l.ok) { informarLocal(l.erro); return; }
    if (abrir) {
      const e = l.dados.redacoes.find(item => item.id === abrir.dataset.abrirRedacao); if (!e) return;
      estado.texto = e.texto; estado.temaId = e.temaId; estado.temaLivre = e.temaLivre;
      textarea.value = e.texto; if (sel) sel.value = e.temaId; if (livre) livre.value = e.temaLivre;
      if (campoLivre) campoLivre.style.display = e.temaId === 'livre' ? 'grid' : 'none';
      pintarProposta(e.temaId); contar(); ultimoRelatorio = e.relatorio;
      try { saida.innerHTML = relatorio(e.relatorio); } catch { informarLocal('Não foi possível exibir esta correção salva.'); return; }
      ativarMovimento(saida); informarLocal('Correção original aberta. Para gerar uma nova avaliação, clique em Corrigir.');
      saida.scrollIntoView({behavior:'auto',block:'start'});
    } else if (excluir && window.confirm('Excluir esta redação e sua correção deste navegador?')) {
      const resultado = excluirRedacaoLocal(excluir.dataset.excluirRedacao);
      informarLocal(resultado.ok ? 'Redação excluída deste navegador.' : resultado.erro); atualizarHistorico();
    }
  });
  document.getElementById('exportar-progresso')?.addEventListener('click', () => {
    const l = lerProgressoLocal(); if (!l.ok) { informarLocal(l.erro); return; }
    const arquivo = new Blob([JSON.stringify(l.dados, null, 2)], {type:'application/json'});
    const url = URL.createObjectURL(arquivo); const a = document.createElement('a'); a.href=url; a.download='redacao-com-joao-backup.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(url), 1000);
    informarLocal('Backup criado. Guarde o arquivo em local privado.');
  });
  const arquivoProgresso = document.getElementById('arquivo-progresso');
  document.getElementById('importar-progresso')?.addEventListener('click',()=>arquivoProgresso?.click());
  arquivoProgresso?.addEventListener('change', async () => {
    const arquivo=arquivoProgresso.files?.[0]; if (!arquivo) return;
    try {
      if (arquivo.size > 10 * 1024 * 1024) { informarLocal('Arquivo muito grande; nada foi importado.'); return; }
      const r=importarProgressoLocal(await arquivo.text()); informarLocal(r.ok?'Backup importado e combinado com os dados locais.':r.erro); atualizarHistorico();
    } catch { informarLocal('Não foi possível ler o arquivo; nada foi importado.'); }
    finally { arquivoProgresso.value=''; }
  });
  document.getElementById('limpar-acessos')?.addEventListener('click',()=>{
    if (!window.confirm('Apagar as marcações de conteúdos acessados neste navegador? As redações serão mantidas.')) return;
    const r=limparAcessosLocal(); informarLocal(r.ok?'Marcações de acesso apagadas.':r.erro);
  });

  const rodar = (salvar = false) => {
    const temaLivre = livre?.value || '';
    estado.temaLivre = temaLivre;
    const r = corrigir(textarea.value, { temaId: estado.temaId, temaLivre });
    ultimoRelatorio = r;
    saida.innerHTML = relatorio(r);
    ativarMovimento(saida);
    if (!r.ok) { toast(r.erro); return; }
    if (salvar) {
      const salvo = salvarRedacaoLocal(textarea.value, estado.temaId, temaLivre, r);
      informarLocal(salvo.ok ? 'Correção salva neste navegador.' : salvo.erro);
      atualizarHistorico();
      if (!salvo.ok) toast(salvo.erro);
    }

    // no celular a coluna do relatório fica abaixo: levamos o leitor até ela
    if (window.innerWidth < 1080) {
      const reduzir = typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (typeof saida.scrollIntoView === 'function') {
        saida.scrollIntoView({ behavior: reduzir ? 'auto' : 'smooth', block: 'start' });
      }
    }
  };

  document.getElementById('bt-corrigir')?.addEventListener('click', () => rodar(true));

  document.getElementById('bt-limpar')?.addEventListener('click', () => {
    textarea.value = '';
    estado.texto = '';
    contar();
    saida.innerHTML = `<div class="vazio"><p>Cole o texto e clique em <b>Corrigir</b>. O relatório aparece aqui.</p></div>`;
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
  else if (partes[0] === 'competencias') html = viewCriterios();
  else if (partes[0] === 'criterios') { location.replace('#/competencias'); return; }
  else if (partes[0] === 'estrutura') html = viewEstrutura();
  else if (partes[0] === 'comandos') html = viewComandos();
  else if (partes[0] === 'temas') html = viewTemas();
  else if (partes[0] === 'redacoes') {
    html = partes[1] ? viewRedacao(decodeURIComponent(partes[1])) : viewRedacoes();
  }
  else if (partes[0] === 'conteudos') {
    /* sumário → matéria → conteúdo */
    if (partes[1] === 'materia') html = viewMateria(decodeURIComponent(partes[2] || ''));
    else if (partes[1] === 'c') {
      const id = decodeURIComponent(partes[2] || '');
      if (conteudoPorId(id)) {
        const marcado = marcarAcessoLocal(id);
        if (!marcado.ok) toast('Não foi possível salvar o acesso neste navegador.');
      }
      html = viewConteudo(id);
    }
    else html = viewConteudos();
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
    '': 'Redação com João, competências, estrutura, temas e redações analisadas',
    competencias: 'Competências da redação do Enem, Redação com João',
    estrutura: 'Estrutura da redação, Redação com João',
    comandos: 'Ler o comando do tema, Redação com João',
    temas: 'Temas do ENEM e de treino, Redação com João',
    redacoes: 'Redações nota 1000 analisadas, Redação com João',
    corrigir: 'Corrigir redação, Redação com João'
  };
  const doGuia = tituloDeConteudos(partes);
  if (doGuia) return doGuia;
  return mapa[partes[0] || ''] || 'Redação com João';
}

// Os links internos não podem trocar o hash usado pelo roteador da aplicação.
document.addEventListener('click', event => {
  const link = event.target.closest('.cp-indice a[href^="#"]');
  if (!link) return;
  const alvo = document.getElementById(link.getAttribute('href').slice(1));
  if (!alvo) return;
  event.preventDefault();
  const menu = link.closest('.cp-subtemas-menu');
  if (menu) menu.open = false;
  alvo.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)').matches ? 'auto' : 'smooth', block: 'start' });
});

window.addEventListener('hashchange', render);

render();
