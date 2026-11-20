// V2 Main UI - Rendering and routing
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
import { viewConteudos, viewMateria, viewConteudo, tituloDeConteudos } from './ui-conteudos.js';
import { conteudoPorId } from './db/conteudos/index.js';
import { lerProgressoLocal, marcarAcessoLocal, salvarRedacaoLocal, excluirRedacaoLocal, limparAcessosLocal, importarProgressoLocal } from './progresso-local.js';

// Shared refs
const app = document.getElementById('app');
const toast = document.getElementById('toast');

const escapeHtml = (s = '') => String(s)
  .replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>')
  .replace(/"/g, '"').replace(/'/g, "'");

let toastTimer = null;
function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}

const ICONS = {
  arrow: '<path d="M4 12h15M13 6l6 6-6 6"/>',
  back: '<path d="M20 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M4 12.5l5 5L20 6.5"/>',
  alert: '<path d="M12 4.5 3 20h18L12 4.5Z"/><path d="M12 10v4.5M12 17.4v.2"/>',
  doc: '<path d="M6 3.5h8l4.5 4.5v12.5H6z"/><path d="M14 3.5V8h4.5M9 12h6M9 16h4"/>',
  ruler: '<path d="M3.5 9.5h17v5h-17z"/><path d="M8 9.5v2.2M12 9.5v3.2M16 9.5v2.2"/>',
  layer: '<path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z"/><path d="M3.5 16 12 20.5 20.5 16"/>',
  theme: '<path d="M4.5 5.5h15v10h-8l-4.5 4v-4H4.5z"/>',
  analysis: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/>',
  book: '<path d="M4 5.5h6.5A2 2 0 0 1 13 7.5V20a2 2 0 0 0-2-2H4z"/><path d="M20 5.5h-6.5A2 2 0 0 0 11 7.5V20a2 2 0 0 1 2-2h7z"/>',
  chem: '<path d="M9 3.5h6M10 3.5v5L5.5 17A2.5 2.5 0 0 0 7.7 20.5h8.6A2.5 2.5 0 0 0 18.5 17L14 8.5v-5"/><path d="M7.5 14h9"/>',
  video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10.5 21 8v8l-5-2.5z"/>',
  formula: '<path d="M6 5h6M6 12h4M6 19h5"/><path d="M14 5l5 14M19 5l-5 14"/>',
  example: '<path d="M12 3.5 14.5 9l6 .8-4.3 4.2 1 6-5.2-2.9-5.2 2.9 1-6L3.5 9.8 9.5 9z"/>',
  image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="8.5" cy="9.5" r="1.6"/><path d="M4 16.5l4.5-4 3.5 3 3-2.5 5 4"/>',
  pencil: '<path d="M4 20l1-4.5L16.5 4a2.1 2.1 0 0 1 3 3L8 18.5z"/><path d="M14.5 6l3 3"/>',
};

const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ''}</svg>`;

// ============================================================================
// HOME PAGE
// ============================================================================
function viewHome() {
  const index = [
    ['#/competencias', 'Competências', 'As 5 competências, os 6 níveis de cada uma e por que o mesmo erro repetido pesa mais.'],
    ['#/estrutura', 'Estrutura', 'Anatomia parte por parte, os 5 elementos da proposta e o esqueleto de 30 linhas.'],
    ['#/comandos', 'Ler o tema', 'O substantivo que abre a proposta é um pedido. 11 comandos, com armadilha e roteiro.'],
    ['#/temas', 'Temas', `${TEMAS.length} temas com recorte, núcleo, vocabulário de apoio e repertórios.`],
    ['#/redacoes', 'Redações analisadas', `${TOTAL_NOTA_MIL} modelos didáticos, de 2014 a 2026, com cada parágrafo comentado.`],
    ['#/conteudos', 'Estudar conteúdos', 'Encontre os assuntos das quatro áreas e pratique com resoluções escritas.'],
    ['#/corrigir', 'Corrigir', 'Cole seu texto: nota por competência, o que segura a nota e o que fazer primeiro.']
  ];

  const proofs = [
    [CRITERIOS.length, 'competências oficiais'],
    [6, 'níveis de pontuação'],
    [TEMAS.length, 'temas para praticar'],
    [TOTAL_NOTA_MIL, 'modelos nota 1000']
  ];

  const folha = `
    <figure class="folha">
      <figcaption class="folha-topo">Trecho de redação nota 1000</figcaption>
      <div class="folha-corpo">
        <blockquote class="folha-texto">
          <p><mark>A Lei 10.216, de 2001, redirecionou o cuidado em saúde mental no Brasil</mark> ao substituir o isolamento manicomial por serviços de base comunitária. Duas décadas depois, o estigma segue funcionando como barreira: <mark>falar de sofrimento psíquico ainda é tratado como sinal de fraqueza</mark>. Esse silêncio não é apenas cultural, pois <span class="folha-erro">adia o diagnóstico, esvazia a busca por tratamento e reproduz o preconceito</span> dentro do próprio sistema de saúde.</p>
        </blockquote>
        <p class="folha-nota">Três efeitos no mesmo período. Um ponto antes de "pois" resolve.</p>
      </div>
      <p class="folha-legenda">Marca-texto: acerto. Sublinhado: ponto de melhoria.</p>
    </figure>`;

  return `
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero-orbs" aria-hidden="true">
      <span class="orb o1"></span>
      <span class="orb o2"></span>
      <span class="orb o3"></span>
      <span class="orb o4"></span>
      <span class="orb o5"></span>
      <span class="orb o6"></span>
    </div>
    <div class="hero-bg-elements" aria-hidden="true">
      <span class="hero-bg-item hero-bg-ring" data-entrada data-i="0"></span>
      <span class="hero-bg-item hero-bg-dot" data-entrada data-i="1"></span>
      <span class="hero-bg-item hero-bg-line" data-entrada data-i="2"></span>
      <span class="hero-bg-item hero-bg-dot hero-bg-dot-small" data-entrada data-i="3"></span>
    </div>
    <div class="hero-content">
      <p class="hero-kicker" data-entrada data-i="0"><span aria-hidden="true"></span> GUIA GRATUITO DE REDAÇÃO DO ENEM</p>
      <h1 id="hero-title" class="hero-title">
        <span data-entrada data-i="0">Seu</span>
        <span data-entrada data-i="1">caminho</span>
        <span data-entrada data-i="2">para</span>
        <span data-entrada data-i="3">o</span>
        <span data-entrada data-i="4">Enem</span>
        <span data-entrada data-i="5">começa</span>
        <em data-entrada data-i="6">aqui.</em>
      </h1>
      <p class="hero-description" data-entrada data-i="2">Entenda os critérios, organize suas ideias e pratique com temas e redações comentadas — no seu ritmo.</p>
      <div class="hero-actions" data-entrada data-i="3">
        <a class="btn btn-primary btn-lg" href="#/conteudos">Começar a estudar ${icon('arrow')} </a>
        <a class="btn btn-secondary btn-lg" href="#/corrigir">Corrigir redação ${icon('arrow')} </a>
      </div>
      <p class="hero-note" data-entrada data-i="4">Acesso gratuito <span aria-hidden="true">·</span> Sem cadastro</p>
      <div class="hero-proof" aria-label="O que você encontra na plataforma" data-entrada data-i="5">
        ${proofs.map(([valor, titulo]) => `
          <div class="hero-proof-item" data-entrada>
            <strong class="hero-proof-value" data-conta="${valor}">${valor}</strong><span class="hero-proof-label">${titulo}</span></div>`).join('')}
      </div>
    </div>
  </section>

  <section class="benefits section" aria-labelledby="benefits-title">
    <div class="wrap">
      <div class="section-header" data-entrada data-i="0">
        <p class="section-eyebrow">APRENDA · PRATIQUE · EVOLUA</p>
        <h2 id="benefits-title" class="section-title" data-entrada data-i="1">Um próximo passo de cada vez.</h2>
        <p class="section-description" data-entrada data-i="2">Da leitura da proposta à revisão do texto, encontre apoio para cada etapa da redação.</p>
      </div>
      <div class="benefits-grid">
        <a class="benefit-card" href="#/competencias" data-entrada data-i="3">
          <span class="benefit-icon">${icon('ruler')}</span>
          <span class="benefit-number">01 / ENTENDA</span>
          <h3 class="benefit-title">Conheça os critérios</h3>
          <p class="benefit-text">Veja o que cada competência avalia e como os níveis oficiais se diferenciam.</p>
          <span class="benefit-link">Explorar competências ${icon('arrow')} </span>
        </a>
        <a class="benefit-card" href="#/temas" data-entrada data-i="4">
          <span class="benefit-icon">${icon('theme')}</span>
          <span class="benefit-number">02 / PRATIQUE</span>
          <h3 class="benefit-title">Treine com temas</h3>
          <p class="benefit-text">Investigue recortes, repertórios e caminhos para desenvolver seus argumentos.</p>
          <span class="benefit-link">Ver temas de treino ${icon('arrow')} </span>
        </a>
        <a class="benefit-card" href="#/corrigir" data-entrada data-i="5">
          <span class="benefit-icon">${icon('analysis')}</span>
          <span class="benefit-number">03 / REVISE</span>
          <h3 class="benefit-title">Entenda o próximo passo</h3>
          <p class="benefit-text">Receba um diagnóstico por competência e veja o que pode melhorar primeiro.</p>
          <span class="benefit-link">Corrigir uma redação ${icon('arrow')} </span>
        </a>
      </div>
    </div>
  </section>

  <section class="analysis section" aria-labelledby="analysis-title" data-entrada data-i="0">
    <div class="wrap">
      <div class="analysis-copy">
        <p class="analysis-eyebrow" data-entrada data-i="1">ANÁLISE NA PRÁTICA</p>
        <h2 id="analysis-title" class="analysis-title" data-entrada data-i="2">Mais do que uma nota: entenda o porquê.</h2>
        <p class="analysis-text" data-entrada data-i="3">Leia um trecho comentado e veja como uma escolha de argumento, repertório ou pontuação muda a clareza do texto.</p>
        <a class="analysis-link" href="#/redacoes" data-entrada data-i="4">Ler redações analisadas ${icon('arrow')} </a>
      </div>
      ${folha}
    </div>
  </section>

  <section class="section" aria-labelledby="index-title">
    <div class="wrap">
      <div class="section-header">
        <div>
          <p class="section-eyebrow">EXPLORE A PLATAFORMA</p>
          <h2 id="index-title" class="section-title">Por onde começar</h2>
        </div>
        <p class="section-description">Escolha o assunto que faz sentido para você agora. O próximo caminho está a um clique.</p>
      </div>
      <ol class="index-list">
        ${index.map(([href, tit, desc], i) => `
          <li class="index-item" data-entrada>
            <a class="index-link" href="${href}">
              <span class="index-num">${String(i + 1).padStart(2, '0')}</span>
              <span class="index-tit">${tit}</span>
              <span class="index-desc">${escapeHtml(desc)}</span>
              <span class="index-go">${icon('arrow')}</span>
            </a>
          </li>`).join('')}
      </ol>
    </div>
  </section>

  <section class="section" aria-labelledby="competencies-title">
    <div class="wrap">
      <div class="section-header" data-entrada data-i="0">
        <div>
          <p class="section-eyebrow">RÉGUA OFICIAL DO ENEM</p>
          <h2 id="competencies-title" class="section-title" data-entrada data-i="1">As cinco competências</h2>
        </div>
        <p class="section-description" data-entrada data-i="2">Cada competência vale até 200 pontos e tem seis níveis oficiais de avaliação.</p>
      </div>
      <div class="competencies-grid">
        ${CRITERIOS.map((c, i) => `
          <a class="comp-item" href="#/competencias" data-entrada data-i="${i + 3}">
            <span class="comp-num">${c.id}</span>
            <span class="comp-nome">${escapeHtml(c.nome)}</span>
            <span class="comp-nota">6 níveis</span>
          </a>`).join('')}
      </div>
    </div>
  </section>

  <section class="final-cta section" aria-labelledby="cta-title" data-entrada data-i="0">
    <div class="wrap">
      <div>
        <p class="section-eyebrow" data-entrada data-i="1">SEU PRÓXIMO PASSO COMEÇA AQUI</p>
        <h2 id="cta-title" class="final-cta-title" data-entrada data-i="2">Pronto para colocar suas ideias no papel?</h2>
        <p class="final-cta-text" data-entrada data-i="3">Comece por um tema ou traga um texto para receber um diagnóstico inicial.</p>
      </div>
      <div class="final-cta-actions" data-entrada data-i="4">
        <a class="btn btn-primary btn-lg" href="#/corrigir">Corrigir minha redação ${icon('arrow')} </a>
        <a class="btn btn-secondary btn-lg" href="#/temas">Escolher um tema ${icon('arrow')} </a>
      </div>
    </div>
  </section>`;
}

// ============================================================================
// COMPETENCIES PAGE
// ============================================================================
function viewCriterios() {
  const regua = CRITERIOS.map(c => {
    const escada = NIVEIS[c.id];
    const oficialTxt = c.niveis
      .slice()
      .sort((a, b) => b.n - a.n)
      .map(nv => `<li><b>Nível ${nv.n} · ${nv.n * 40}</b> ${escapeHtml(nv.texto)}</li>`).join('');
    return `
    <article class="competency-block" id="crit-${c.id}" data-entrada>
      <header class="competency-header">
        <span class="competency-id">${c.id}</span>
        <h2 class="competency-name">${escapeHtml(c.nome)}</h2>
        <span class="competency-value">vale até ${c.valor}</span>
      </header>
      <p class="comp-resumo">${escapeHtml(c.resumo)}</p>
      <p class="comp-regra">${escapeHtml(GRADES[c.id].regra)}</p>
      <table class="levels-table">
        <thead><tr><th scope="col">Nível</th><th scope="col">Descritor</th><th scope="col" class="num">Nota</th></tr></thead>
        <tbody>
          ${c.niveis.slice().sort((a, b) => b.n - a.n).map(nv => {
            const fino = escada.niveis.find(x => x.pontos === nv.n * 40);
            return `
            <tr>
              <td class="niv">${nv.n}</td>
              <td>${escapeHtml(nv.texto)}${fino ? `<span class="niv-fino"><b>O que o avaliador procura.</b> ${escapeHtml(fino.texto)}</span>` : ''}</td>
              <td class="num">${nv.n * 40}</td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      <div class="comp-columns">
        <div class="side-block">
          <h3>O que é avaliado</h3>
          <ul class="lista-check">${c.oQueAvalia.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
        </div>
        <div class="side-block">
          <h3>O que derruba a nota</h3>
          <ul class="lista-check perigo">${c.derrubam.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
        </div>
        <div class="side-block">
          <h3>O que levanta</h3>
          <ul class="lista-check">${c.sobem.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="side-block">
        <h3>Mesma ideia, dois níveis</h3>
        <div class="exemplo-par">
          <div class="ex fraco"><span class="rot">Tende ao nível 2.</span> ${escapeHtml(c.exemplo.fraco)}</div>
          <div class="ex forte"><span class="rot">Tende ao nível 4 ou 5.</span> ${escapeHtml(c.exemplo.forte)}</div>
        </div>
      </div>
      <details class="oficial-det">
        <summary>Descritor oficial de cada nível, de 40 em 40 pontos</summary>
        <ul class="oficial-lista">${oficialTxt}</ul>
        <p class="oficial-fonte">Fonte: ${escapeHtml(GRADES[c.id].fonte)}</p>
      </details>
    </article>`;
  }).join('');

  return `
  <div class="wrap">
    <div class="section-header" data-entrada>
      <h1 class="section-title">As cinco competências</h1>
      <p class="section-description">Cada competência tem seis notas oficiais possíveis: 0, 40, 80, 120, 160 ou 200. Quem reúne características de dois níveis fica no inferior, e essa é a regra da grade. O relatório mostra a faixa em que a nota cai (de 160 a 200, por exemplo), porque a nota final do Enem é a média de dois avaliadores e os dois divergem.</p>
    </div>
    <div class="regua">${regua}</div>
    <div class="alert alert-warning" data-entrada>
      <div>
        <h3>${escapeHtml(AVISO_TANGENCIAMENTO.titulo)}</h3>
        <p>${escapeHtml(AVISO_TANGENCIAMENTO.texto)}</p>
      </div>
    </div>
    <div class="section-header" style="margin-top: var(--space-8);">
      <h2 class="section-title">Nota zero e cálculo final</h2>
      <span class="section-description">as regras duras</span>
    </div>
    <div class="grid grid-2">
      <div class="card" data-entrada>
        <h3>O que zera a redação</h3>
        <ul class="lista-check">
          ${ZEROS.map(z => `<li><b>${escapeHtml(z.titulo)}</b>, ${escapeHtml(z.texto)}</li>`).join('')}
        </ul>
      </div>
      <div class="card" data-entrada>
        <h3>Como a nota é calculada</h3>
        <ul class="lista-check">
          ${CALCULO_NOTA.map(z => `<li><b>${escapeHtml(z.titulo)}</b>, ${escapeHtml(z.texto)}</li>`).join('')}
        </ul>
      </div>
    </div>
  </div>`;
}

// ============================================================================
// STRUCTURE PAGE
// ============================================================================
function viewEstrutura() {
  const partes = PARTES.map((p, i) => `
    <section class="parte" data-entrada>
      <h2 class="parte-tit">${i + 1}. ${escapeHtml(p.nome)}</h2>
      <p class="parte-meta">${escapeHtml(p.linhas)} · ${escapeHtml(p.funcao)}</p>
      <p class="parte-formula"><b>Fórmula.</b> ${escapeHtml(p.formula)}</p>
      <ol class="passos">${p.passos.map(s => `<li>${escapeHtml(s)}</li>`).join('')}</ol>
      <p class="parte-erro"><b>Erro comum.</b> ${escapeHtml(p.erroComum)}</p>
      <p class="parte-dica"><b>Dica.</b> ${escapeHtml(p.dica)}</p>
    </section>`).join('');

  const trilha = ELEMENTOS_PROPOSTA.map(e => `
    <div class="trilha-item">
      <h3>${escapeHtml(e.nome)}</h3>
      <p class="pergunta">${escapeHtml(e.pergunta)}</p>
      <p class="exemplos">${escapeHtml(e.exemplos)}</p>
    </div>`).join('');

  return `
  <div class="wrap">
    <div class="section-header" data-entrada>
      <h1 class="section-title">Estrutura da redação</h1>
      <p class="section-description">São quatro partes, cada uma com a sua função. Cada parte do texto precisa cumprir a sua.</p>
    </div>
    <div class="card" data-entrada>
      <h2 class="section-title" style="font-size: var(--text-xl); margin-bottom: var(--space-4);">Distribuição sugerida</h2>
      <div class="table-wrap">
        <table class="table">
          <thead><tr><th>Parte</th><th>Linhas</th><th>Função</th></tr></thead>
          <tbody>
            ${DISTRIBUICAO_LINHAS.map(d => `<tr><td><b>${escapeHtml(d.parte)}</b></td><td>${escapeHtml(d.linhas)}</td><td>${escapeHtml(d.funcao)}</td></tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div class="partes">${partes}</div>
    <div class="section-header" style="margin-top: var(--space-8);">
      <h2 class="section-title">Os cinco elementos da proposta</h2>
      <span class="section-description">competência V</span>
    </div>
    <div class="trilha" data-entrada>${trilha}</div>
    <div class="section-header" style="margin-top: var(--space-8);">
      <h2 class="section-title">${escapeHtml(ESQUELETO.titulo)}</h2>
      <span class="section-description">modelo de esqueleto</span>
    </div>
    <div class="esqueleto" data-entrada>
      ${ESQUELETO.linhas.map(l => `
        <div class="esk-linha">
          <span class="bloco">${escapeHtml(l.bloco)}</span>
          <span class="texto">${escapeHtml(l.texto)}</span>
          <span class="n">${escapeHtml(l.n)} linhas</span>
        </div>`).join('')}
    </div>
  </div>`;
}

// ============================================================================
// COMMANDS PAGE
// ============================================================================
const comandoLabel = (palavra = '') => palavra
  .split('/')[0]
  .replace(/\s*\.{2,}.*$/, '')
  .replace(/\s+para$/i, '')
  .trim();

function viewComandos() {
  const itens = COMANDOS.map(c => `
    <details class="ac-item" data-entrada>
      <summary class="ac-sum">
        <span class="ac-palavra">${escapeHtml(comandoLabel(c.palavra))}</span>
        <span class="ac-temas">${escapeHtml(c.temas.join(' · '))}</span>
        <span class="ac-mais" aria-hidden="true">${icon('arrow')}</span>
      </summary>
      <div class="ac-body">
        <div class="ac-bloco">
          <h4>O que o comando pede</h4>
          <p>${escapeHtml(c.oQuePede)}</p>
        </div>
        <div class="ac-bloco perigo">
          <h4>A armadilha</h4>
          <p>${escapeHtml(c.armadilha)}</p>
        </div>
        <div class="ac-bloco" style="grid-column:1/-1">
          <h4>Como responder</h4>
          <ul class="ac-lista">${c.comoFazer.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
        </div>
      </div>
    </details>`).join('');

  return `
  <div class="wrap">
    <div class="section-header" data-entrada>
      <h1 class="section-title">Como ler o tema</h1>
      <p class="section-description">Valorização pede que você aponte o que desvaloriza. Antes de escrever, identifique o comando: é ele que define o recorte.</p>
    </div>
    <div class="regra-geral" data-entrada>
      ${REGRA_GERAL.map(r => `<p>${escapeHtml(r)}</p>`).join('')}
    </div>
    <div class="acordeao">${itens}</div>
  </div>`;
}

// ============================================================================
// THEMES PAGE
// ============================================================================
function motivadoresHTML(temaId, { open = false } = {}) {
  const lista = motivadoresDe(temaId);
  if (!lista.length) return '';
  return `
  <details class="motivadores" ${open ? 'open' : ''}>
    <summary>
      <span class="mot-rot">Textos motivadores</span>
      <span class="mot-cont">${lista.length} textos</span>
      <span class="mot-mais" aria-hidden="true">${icon('arrow')}</span>
    </summary>
    <div class="mot-lista">
      ${lista.map(m => `
        <article class="mot-item">
          <span class="mot-titulo">${escapeHtml(m.titulo)}</span>
          <p class="mot-texto">${escapeHtml(m.texto)}</p>
          <span class="mot-fonte">${escapeHtml(m.fonte)}</span>
        </article>`).join('')}
    </div>
  </details>`;
}

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
    return `<p class="text-dim" style="padding: var(--space-6); text-align: center;">Nenhum tema corresponde a essa busca. Tente outra palavra ou volte para todos os eixos.</p>`;
  }

  return lista.map(t => {
    const cmd = comandoDoTema(t.titulo);
    const red = REDACOES.find(r => r.temaId === t.id);
    const palavras = [
      ...(t.nucleo || []).slice(0, 4).map(k => escapeHtml(termoBonito(k))),
      ...(motivadoresDe(t.id).length ? [`${motivadoresDe(t.id).length} textos motivadores`] : []),
      ...(t.apoio || []).slice(0, 4).map(k => escapeHtml(termoBonito(k))),
    ];
    return `
    <article class="tema-linha" data-entrada>
      <div class="tl-ano ${t.tipo === 'enem' ? '' : 'treino'}">${t.ano || 'treino'}</div>
      <div class="tl-corpo">
        <h3 class="tl-tit">${escapeHtml(t.titulo)}</h3>
        <p class="tl-comando">${cmd ? `Comando: <b>${escapeHtml(cmd.palavra.split('/')[0].trim())}</b>. ` : ''}${escapeHtml(t.recorte)}</p>
        <p class="tl-chips">${palavras.slice(0, 5).join(' · ')}</p>
        ${motivadoresHTML(t.id)}
        <details class="tl-det">
          <summary>Repertórios e vocabulário de apoio</summary>
          <ul class="rep-lista">
            ${(t.repertorios || []).map(r => `<li><b>${escapeHtml(r.nome)}</b>: ${escapeHtml(r.uso)}</li>`).join('') || '<li>Use repertório histórico, legal ou de dados, desde que explicado.</li>'}
          </ul>
          <p class="tl-comando">Vocabulário de apoio: ${escapeHtml((t.apoio || []).join(', ') || 'não indicado')}</p>
        </details>
      </div>
      <div class="tl-acoes">
        ${red ? `<a href="#/redacoes/${red.id}">Ver redação ${red.nota}</a>` : ''}
        <a href="#/corrigir?tema=${encodeURIComponent(t.id)}">Treinar neste tema</a>
      </div>
    </article>`;
  }).join('');
}

function viewTemas() {
  return `
  <div class="wrap">
    <div class="section-header" data-entrada>
      <h1 class="section-title">Temas de 2014 a 2026</h1>
      <p class="section-description">Temas oficiais e temas de treino. O recorte é o que a banca pede, e as palavras-chave são o vocabulário que sustenta esse recorte sem fugir dele.</p>
    </div>
    <div class="filtro-temas">
      <label class="campo-busca">
        <span>Buscar tema</span>
        <input type="search" id="busca-tema" placeholder="envelhecimento, saúde, tecnologia" value="${escapeHtml(buscaAtual)}" />
      </label>
      <label class="campo-eixo">
        <span>Categoria</span>
        <select id="filtro-eixo">
          <option value="todos"${filtroAtual === 'todos' ? ' selected' : ''}>Todos os eixos</option>
          ${EIXOS.map(e => `<option value="${escapeHtml(e)}"${filtroAtual === e ? ' selected' : ''}>${escapeHtml(e)}</option>`).join('')}
        </select>
      </label>
    </div>
    <div class="lista-temas" id="lista-temas">${linhasTemas()}</div>
  </div>`;
}

// ============================================================================
// PROGRAMS PAGE
// ============================================================================
function viewProgramas() {
  return `
  <div class="wrap">
    <div class="section-header programas-topo" data-entrada>
      <p class="programas-kicker">ACESSO AO ENSINO SUPERIOR</p>
      <h1 class="section-title">Enem: três caminhos para a graduação</h1>
      <p class="section-description">Sisu, Prouni e FIES podem usar a nota do Enem, mas funcionam de formas diferentes. Entenda o que cada programa oferece antes de escolher.</p>
    </div>
    <section class="programas-apresentacao" aria-label="Visão geral">
      <p>Um caminho pode levar a uma vaga em uma instituição pública; outro pode oferecer uma bolsa em uma instituição privada; e há também o financiamento estudantil. Os requisitos, prazos e ofertas dependem do edital de cada edição.</p>
    </section>
    <section class="programas-lista" aria-label="Como funcionam Sisu, Prouni e FIES">
      <article class="programa-card programa-card-sisu" id="programa-sisu" data-entrada>
        <div class="programa-card-topo">
          <span class="programa-numero">01</span>
          <span class="programa-tipo">VAGA EM INSTITUIÇÃO PÚBLICA</span>
        </div>
        <h2>Sisu</h2>
        <p>O Sistema de Seleção Unificada reúne vagas de instituições públicas de ensino superior que participam do processo seletivo. A classificação considera as notas do Enem, as opções de curso, a modalidade de concorrência e a quantidade de vagas.</p>
        <ul>
          <li>Pesos e notas mínimas podem variar entre cursos e instituições.</li>
          <li>Vagas reservadas e ações afirmativas têm critérios próprios.</li>
        </ul>
        <p class="programa-observacao">A nota de corte é uma referência da concorrência; não garante a seleção.</p>
        <div class="programa-acao">
          <a class="btn btn-primary programa-botao" href="https://sisusimulator.com.br" target="_blank" rel="noopener noreferrer">
            <span>Simulador Sisu</span>${icon('arrow')}
          </a>
        </div>
      </article>
      <article class="programa-card programa-card-prouni" id="programa-prouni" data-entrada>
        <div class="programa-card-topo">
          <span class="programa-numero">02</span>
          <span class="programa-tipo">BOLSA EM INSTITUIÇÃO PRIVADA</span>
        </div>
        <h2>Prouni</h2>
        <p>O Programa Universidade para Todos oferece bolsas em cursos de instituições privadas participantes: integrais, que cobrem 100% da mensalidade, ou parciais, que cobrem 50%.</p>
        <ul>
          <li>A seleção usa o Enem e segue critérios de elegibilidade definidos no edital, incluindo requisitos de escolaridade e renda.</li>
          <li>A oferta depende do curso, turno, instituição, local e modalidade.</li>
        </ul>
        <p class="programa-observacao">A pré-seleção pode exigir a comprovação das informações e dos documentos previstos no edital.</p>
        <div class="programa-acao">
          <a class="btn btn-secondary programa-botao" href="https://prounisimulator.com.br/?utm_source=sisusimulator.com.br&utm_medium=link&utm_campaign=sisusimulator" target="_blank" rel="noopener noreferrer">
            <span>Simulador Prouni</span>${icon('arrow')}
          </a>
        </div>
      </article>
      <article class="programa-card programa-card-fies" id="programa-fies" data-entrada>
        <div class="programa-card-topo">
          <span class="programa-numero">03</span>
          <span class="programa-tipo">FINANCIAMENTO ESTUDANTIL</span>
        </div>
        <h2>FIES</h2>
        <p>O Fundo de Financiamento Estudantil financia encargos educacionais de cursos de graduação em instituições privadas participantes. Não é uma bolsa: a contratação gera uma obrigação de pagamento conforme o contrato e as regras vigentes.</p>
        <ul>
          <li>A seleção considera a nota do Enem e os critérios e vagas definidos no edital.</li>
          <li>O Fies Social tem regras próprias; candidatos elegíveis podem solicitar financiamento de até 100% dos encargos educacionais, conforme as condições vigentes.</li>
        </ul>
        <p class="programa-observacao">Antes de contratar, confira as condições, obrigações e etapas de validação da edição.</p>
      </article>
    </section>
    <section class="programas-resumo" aria-labelledby="programas-resumo-titulo">
      <div class="section-header">
        <h2 id="programas-resumo-titulo" class="section-title">A diferença em uma linha</h2>
        <span class="section-description">bolsa, vaga ou financiamento</span>
      </div>
      <ul class="programas-resumo-lista">
        <li><strong>Sisu</strong><span>Seleção para uma vaga em instituição pública participante.</span></li>
        <li><strong>Prouni</strong><span>Bolsa de estudos em instituição privada participante.</span></li>
        <li><strong>FIES</strong><span>Financiamento estudantil em instituição privada participante.</span></li>
      </ul>
    </section>
    <aside class="alert alert-warning programas-aviso" aria-label="Aviso sobre simuladores e editais">
      ${icon('alert', 'alert-icon')}
      <div>
        <strong>Use a simulação como referência.</strong>
        <p>Os dois botões levam a simuladores externos. Resultados estimados e notas de corte não substituem o edital, a inscrição oficial nem a confirmação dos requisitos do programa.</p>
      </div>
    </aside>
  </div>`;
}

// ============================================================================
// ESSAYS LIST PAGE
// ============================================================================
function viewRedacoes() {
  const todas = REDACOES
    .slice()
    .sort((a, b) => (b.ano || 0) - (a.ano || 0) || String(a.tema).localeCompare(String(b.tema), 'pt-BR'));

  const linhas = todas.map(r => `
    <tr>
      <td class="ano">${r.ano || 'sem ano'}</td>
      <td class="tema">
        <a href="#/redacoes/${r.id}">${escapeHtml(r.tema)}</a>
        <span class="meta">${escapeHtml(r.tipo)} · ${r.paragrafos.length} parágrafos</span>
      </td>
      <td class="nota${r.nota === 0 ? ' zero' : ''}">${r.nota === 0 ? 'anulada' : r.nota}</td>
    </tr>`).join('');

  return `
  <div class="wrap">
    <div class="section-header" data-entrada>
      <h1 class="section-title">Redações nota 1000 analisadas</h1>
      <p class="section-description">Cada redação traz por que tirou 1000, o que cada parágrafo faz, os trechos que o avaliador reconhece e um ponto de melhoria.</p>
    </div>
    <div class="table-wrap">
      <table class="table tabela-redacoes">
        <thead><tr><th scope="col">Ano</th><th scope="col">Tema</th><th scope="col" class="nota">Nota</th></tr></thead>
        <tbody>${linhas}</tbody>
      </table>
    </div>
  </div>`;
}

// ============================================================================
// ESSAY DETAIL PAGE
// ============================================================================
function highlight(texto, destaques = []) {
  if (!destaques.length) return escapeHtml(texto);
  const ordenados = [...destaques]
    .map(d => ({ ...d, i: texto.indexOf(d.trecho) }))
    .filter(d => d.i >= 0)
    .sort((a, b) => a.i - b.i);
  let saida = '';
  let cursor = 0;
  ordenados.forEach(d => {
    if (d.i < cursor) return;
    const rot = (TIPOS_DESTAQUE[d.tipo] || {}).rotulo || d.tipo;
    saida += escapeHtml(texto.slice(cursor, d.i));
    saida += `<mark class="mk mk-${escapeHtml(d.tipo)}" title="${escapeHtml(rot)}: ${escapeHtml(d.nota || '')}">${escapeHtml(d.trecho)}</mark>`;
    cursor = d.i + d.trecho.length;
  });
  saida += escapeHtml(texto.slice(cursor));
  return saida;
}

function viewRedacao(id) {
  const r = buscarRedacao(id);
  if (!r) return viewNotFound('Redação não encontrada.');

  const indice = REDACOES.findIndex(x => x.id === r.id);
  const anterior = REDACOES[indice - 1];
  const proximo = REDACOES[indice + 1];

  const legenda = Object.entries(TIPOS_DESTAQUE)
    .map(([tipo, t]) => `<span><i class="lg-${escapeHtml(tipo)}"></i>${escapeHtml(t.rotulo)}</span>`).join('');

  const paragrafos = r.paragrafos.map((p, i) => `
    <section data-entrada>
      <div class="num-parag">
        <span class="n">${i + 1}</span>
        <h2>${escapeHtml(p.rotulo)}</h2>
        <span class="funcao">${escapeHtml(p.funcao)}</span>
      </div>
      <p class="par-texto">${highlight(p.texto, p.destaques)}</p>
      <div class="par-analise">
        <span class="rot">Análise do parágrafo</span>
        <p>${escapeHtml(p.analise)}</p>
        ${p.melhoria ? `<div class="melhoria"><b>Para chegar ao topo:</b> ${escapeHtml(p.melhoria)}</div>` : ''}
      </div>
    </section>`).join('');

  const notasComp = r.competencias.map(c => `
    <div class="nota-linha">
      <span class="id">${c.id}</span>
      <span class="nome">${CRITERIOS.find(x => x.id === c.id)?.nome || ''}</span>
      <span class="barra"><i style="--v:${(c.nota || 0) / 200}"></i></span>
      <span class="val">${c.nota}</span>
    </div>`).join('');

  const comentarios = r.competencias.map(c => `
    <p style="font-size:.86rem;color:var(--color-text-muted);margin-top:var(--space-2)">
      <b>${c.id}</b> ${escapeHtml(c.comentario)}
    </p>`).join('');

  return `
  <article class="red-doc">
    <a class="migalha" href="#/redacoes">${icon('back')} Todas as redações</a>
    <header class="doc-cabeca" data-entrada>
      <span class="eyebrow">${r.ano} · ${escapeHtml(r.tipo)}</span>
      <h1>${escapeHtml(r.tema)}</h1>
      <p class="doc-resumo">${escapeHtml(r.resumo)}</p>
    </header>
    ${r.comando ? `
      <div class="regra-geral" data-entrada>
        <p><b>Comando do tema:</b> ${escapeHtml(r.comando)}</p>
      </div>` : ''}
    ${r.nota === 0 ? `
      <div class="motivo-zero" data-entrada>
        <h3>Por que esta redação tira zero</h3>
        <ul>${(r.porQueMil || []).map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
      </div>` : `
      <div class="porque" data-entrada>
        <h2>Por que esta redação é nota 1000</h2>
        <ul>${r.porQueMil.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>
      </div>`}
    <div class="marcas" data-entrada>${legenda}</div>
    ${paragrafos}
    <div class="section-header" style="margin-top: var(--space-6);">
      <h2 class="section-title">Notas por competência</h2>
      <span class="section-description">${r.nota} / 1000</span>
    </div>
    <div class="comp-notas" data-entrada>${notasComp}</div>
    ${comentarios}
    <nav class="navega-red" aria-label="Outras redações">
      ${anterior ? `<a class="btn btn-sm" href="#/redacoes/${anterior.id}">${icon('back')} ${anterior.ano}</a>` : '<span></span>'}
      ${proximo ? `<a class="btn btn-sm" href="#/redacoes/${proximo.id}">${proximo.ano} ${icon('arrow')}</a>` : '<span></span>'}
    </nav>
    <p style="margin-top:var(--space-6);font-size:var(--text-xs);color:var(--color-text-dim)">
      Modelo didático construído para reproduzir o padrão nota 1000, não é transcrição de texto oficial de participante.
    </p>
  </article>`;
}

// ============================================================================
// CORRECTION PAGE
// ============================================================================
let state = { temaId: 'enem-2026', temaLivre: '', texto: '' };
let ultimoRelatorio = null;

function viewCorrigir(params) {
  const pedidoTema = params.get('tema');
  const pedidoTexto = params.get('texto');

  if (pedidoTema) state.temaId = pedidoTema;
  if (pedidoTexto) {
    const ex = EXEMPLOS.find(e => e.id === pedidoTexto);
    const red = buscarRedacao(pedidoTexto);
    if (ex) { state.texto = ex.texto; if (ex.temaId) state.temaId = ex.temaId; }
    else if (red) { state.texto = red.paragrafos.map(p => p.texto).join('\n'); if (red.temaId) state.temaId = red.temaId; }
  }

  const opcoes = TEMAS
    .slice()
    .sort((a, b) => (b.ano || 0) - (a.ano || 0))
    .map(t => `<option value="${escapeHtml(t.id)}" ${t.id === state.temaId ? 'selected' : ''}>${t.ano ? t.ano + ', ' : ''}${escapeHtml(t.titulo)}</option>`)
    .join('');

  return `
  <div class="wrap">
    <div class="section-header" data-entrada>
      <h1 class="section-title">Corrigir redação</h1>
      <p class="section-description">O corretor aplica as grades oficiais das cinco competências e explica, uma por uma, por que a nota não chegou a 200, com o trecho do seu texto que motivou cada observação. É um diagnóstico automático e não substitui a correção humana.</p>
    </div>
    <div class="workspace">
      <div class="ws-entrada">
        <div class="ws-proposta">
          <div class="campo">
            <label class="label" for="tema">Tema da proposta</label>
            <select class="select" id="tema">
              ${opcoes}
              <option value="livre" ${state.temaId === 'livre' ? 'selected' : ''}>Tema livre (digite abaixo)</option>
            </select>
          </div>
          <div class="campo" id="campo-livre" style="display:none">
            <label class="label" for="tema-livre">Qual é o tema?</label>
            <input class="input" id="tema-livre" value="${escapeHtml(state.temaLivre)}" placeholder="Ex.: os desafios da inclusão digital de idosos no Brasil" />
          </div>
          <div id="proposta-tema"></div>
        </div>
        <div class="campo">
          <label class="label" for="texto">Sua redação</label>
          <p class="historico-privacidade">Ao clicar em Corrigir, o texto e o resultado serão salvos neste navegador, sem conta. Em dispositivos compartilhados, outras pessoas poderão acessá-los.</p>
          <textarea class="textarea" id="texto" aria-describedby="aviso-transcricao" placeholder="Cole aqui a sua redação (ou carregue um exemplo abaixo).">${escapeHtml(state.texto)}</textarea>
          <div class="contador">
            <span id="conta-linhas">0 linhas</span>
            <span id="conta-palavras">0 palavras</span>
          </div>
        </div>
        <p id="aviso-transcricao" class="aviso-transcricao helper-text">Para uma correção mais fiel, digite a redação exatamente como está no papel, mantendo os erros de escrita, a pontuação e os parágrafos.</p>
        <div class="btn-linha">
          <button class="btn btn-primary" id="bt-corrigir">${icon('analysis')} Corrigir</button>
          <button class="btn btn-secondary" id="bt-limpar">Limpar</button>
          <button class="btn btn-ghost btn-sm" data-exemplo="boa">Exemplo: alto desempenho</button>
          <button class="btn btn-ghost btn-sm" data-exemplo="problemas">Exemplo: problemas típicos</button>
        </div>
        <p id="salvamento-status" class="historico-status" role="status" aria-live="polite"></p>
      </div>
      <aside class="ws-saida" aria-live="polite" id="saida">
        <div class="vazio">
          <p>Cole o texto e clique em <b>Corrigir</b>.<br>O relatório aparece aqui, competência por competência.</p>
        </div>
      </aside>
    </div>
    <section class="historico-local" aria-labelledby="historico-titulo">
      <div class="historico-cabecalho">
        <div>
          <h2 id="historico-titulo">Suas redações neste navegador</h2>
          <p>As correções são salvas somente neste navegador, sem conta. Em um dispositivo compartilhado, outras pessoas com acesso ao navegador podem lê-las. Ao limpar os dados do navegador, elas podem ser apagadas.</p>
        </div>
      </div>
      <div id="lista-historico"></div>
      <div class="historico-acoes">
        <button class="btn btn-sm" id="exportar-progresso" type="button">Exportar backup</button>
        <button class="btn btn-sm" id="importar-progresso" type="button">Importar backup</button>
        <input type="file" id="arquivo-progresso" accept="application/json,.json" hidden>
        <button class="btn btn-sm" id="limpar-acessos" type="button">Apagar marcações de acesso</button>
      </div>
      <p class="historico-aviso">O backup contém suas redações e os conteúdos acessados. Guarde-o em local privado. Importar combina os dados sem apagar o histórico atual.</p>
    </section>
  </div>`;
}

function motivoHTML(m, i, zerado) {
  const etiqueta = zerado ? 'observação'
    : m.gravidade === 'alta' ? 'impede o 200'
    : m.gravidade === 'media' ? 'segura a nota' : 'observação';
  return `
    <li class="motivo g-${['alta','media','baixa'].includes(m.gravidade) ? m.gravidade : 'baixa'}">
      <span class="m-tag"><i>${i + 1}</i>${etiqueta}</span>
      <h5 class="m-titulo">${escapeHtml(m.titulo)}</h5>
      <p class="m-porque">${escapeHtml(m.porque)}</p>
      ${m.evidencia ? `<blockquote>${escapeHtml(m.evidencia)}</blockquote>` : ''}
      ${m.exemplos && m.exemplos.length ? `<ul class="m-ex">${m.exemplos.map(e => `<li>${escapeHtml(e)}</li>`).join('')}</ul>` : ''}
      ${m.comoResolver ? `<p class="m-como"><b>Como resolver.</b> ${escapeHtml(m.comoResolver)}</p>` : ''}
    </li>`;
}

export function faixaDaComp(c) {
  const f = c.faixaNota || { min: c.nota, max: c.nota };
  return { min: f.min, max: f.max, exata: f.min === f.max };
}

function bloco(rotulo, corpo, classe = '') {
  return `<section class="cc-bloco ${classe}"><h5 class="cc-rot">${rotulo}</h5>${corpo}</section>`;
}

function compCard(c, aberto) {
  const ex = c.explicacao || {};
  const nivel = ex.nivel || { n: c.nivel, pontos: c.nota, exige: '' };
  const classeNota = c.nota < 120 ? 'baixa' : c.nota < 200 ? 'media' : '';
  const f = faixaDaComp(c);
  const rotuloFaixa = f.exata ? `${f.min}` : `${f.min}<i>–</i>${f.max}`;
  const oficial = nivel.oficial ?? nivel.n ?? c.nivel;
  const descritor = nivel.exigeOficial || nivel.exige || '';
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
      <span class="cc-nome">${escapeHtml(c.nome)}</span>
      <span class="cc-bar"><i style="--v:${(f.max || 0) / 200}"></i></span>
      <span class="cc-nota ${classeNota}" title="Faixa de nota desta competência">${rotuloFaixa}<small>/200</small></span>
    </summary>
    <div class="cc-body">
      <p class="cc-dx">${escapeHtml(ex.sintese || '')}</p>
      ${ex.zero
        ? bloco('nota 0 · texto zerado',
            `<ul class="zero-lista">${ex.zero.map(z => `<li><b>${escapeHtml(z.titulo)}.</b> ${escapeHtml(z.detalhe)}</li>`).join('')}</ul>`)
        : bloco(`nota ${f.exata ? f.min : `${f.min}–${f.max}`} · nível ${oficial} de 5`,
            `<p class="cc-txt">${porque}</p>`)}
      ${ex.zero ? '' : bloco(`o que o nível ${oficial} exige`,
        `<p class="cc-txt">${escapeHtml(descritor)}</p>
         ${ex.fonte ? `<p class="cc-fonte">Grade: ${escapeHtml(ex.fonte)}</p>` : ''}`)}
      ${bloco(ex.zero ? 'o que a escrita mostra' : 'o que segurou a nota', motivos)}
      ${ex.proximo && !ex.zero ? bloco(`para subir até ${Math.min(200, (oficial + 1) * 40)}`,
        `<p class="cc-txt"><b>Exige.</b> ${escapeHtml(ex.nivelTextoProximo || ex.proximo.exige)}</p>
         ${faltouProximo ? `<p class="cc-txt"><b>Para revisar.</b> ${escapeHtml(faltouProximo)}</p>` : ''}`) : ''}
      ${c.melhorias && c.melhorias.length ? bloco('o que revisar na próxima versão',
        `<ul class="rev-lista">${c.melhorias.slice(0, 6).map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`) : ''}
      ${c.fortes && c.fortes.length ? bloco('o que já está certo',
        `<ul class="fortes-lista">${c.fortes.map(x => `<li>${escapeHtml(x)}</li>`).join('')}</ul>`) : ''}
    </div>
  </details>`;
}

function relatorio(r) {
  if (!r.ok) {
    return `<div class="vazio">${icon('alert', 'ico-g')}<p>${escapeHtml(r.erro)}</p></div>`;
  }

  const fTotal = r.notaFaixa || { min: r.notaTotal, max: r.notaTotal };
  const entre = fTotal.max > fTotal.min;
  const maisFracas = [...r.competencias].sort((a, b) => a.nota - b.nota).slice(0, 2).map(c => c.id);
  const cards = r.competencias.map(c => compCard(c, maisFracas.includes(c.id))).join('');

  const alertas = (r.alertas || []).map(a => `
    <div class="alerta ${a.tipo === 'perigo' ? 'perigo' : a.tipo === 'info' ? 'info' : ''}">
      ${icon(a.tipo === 'perigo' ? 'alert' : 'target')}
      <div><b>${escapeHtml(a.titulo)}</b>${escapeHtml(a.texto)}</div>
    </div>`).join('');

  const zeros = r.zerada ? `
    <div class="motivo-zero">
      <h3>Nota zero</h3>
      <ul>${r.motivosZero.map(m => `<li><b>${escapeHtml(m.titulo)}:</b> ${escapeHtml(m.detalhe)}</li>`).join('')}</ul>
    </div>` : '';

  const m = r.metricas || {};
  return `
    <div class="rel-topo">
      <p class="nota-final" role="text" aria-label="${entre ? `nota final entre ${fTotal.min} e ${fTotal.max} de 1000` : `nota final ${fTotal.min} de 1000`}">
        <span class="nf-num${entre ? ' nf-faixa' : ''}">${entre ? `${fTotal.min}<i>a</i>${fTotal.max}` : fTotal.min}</span>
        <span class="nf-de">de 1000</span>
      </p>
      <p class="nota-nivel">${escapeHtml(r.faixa.nome)}</p>
      <p class="nota-texto">${escapeHtml(r.faixa.texto)}</p>
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
      ${r.tema ? `<span>tema: <b>${escapeHtml(r.tema.titulo)}</b></span>` : ''}
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
        <h2 class="prop-titulo">${escapeHtml(tema.titulo)}</h2>
        <p class="prop-recorte">${escapeHtml(tema.recorte)}</p>
        ${cmd ? `<p class="prop-comando"><b>Comando:</b> ${escapeHtml(cmd.oQuePede)}</p>` : ''}
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

  textarea.addEventListener('input', () => { state.texto = textarea.value; contar(); });
  contar();
  pintarProposta(state.temaId);

  if (sel) {
    sel.addEventListener('change', () => {
      state.temaId = sel.value;
      if (campoLivre) campoLivre.style.display = sel.value === 'livre' ? 'grid' : 'none';
      pintarProposta(sel.value);
    });
    if (campoLivre) campoLivre.style.display = sel.value === 'livre' ? 'grid' : 'none';
  }

  const livre = document.getElementById('tema-livre');
  livre?.addEventListener('input', () => { state.temaLivre = livre.value; });
  const statusLocal = document.getElementById('salvamento-status');
  const informarLocal = (msg) => { if (statusLocal) statusLocal.textContent = msg; };
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
      return `<li class="historico-item"><div><b>${escapeHtml(tema)}</b><p>${escapeHtml(data)} · nota ${escapeHtml(nota)} / 1000</p><p class="historico-trecho">${escapeHtml(e.texto.slice(0,130))}${e.texto.length>130?'…':''}</p></div><div class="historico-botoes"><button type="button" class="btn btn-sm" data-abrir-redacao="${escapeHtml(e.id)}">Abrir</button><button type="button" class="btn btn-sm" data-excluir-redacao="${escapeHtml(e.id)}">Excluir</button></div></li>`;
    }).join('')}</ul>`;
  };
  atualizarHistorico();
  document.getElementById('lista-historico')?.addEventListener('click', event => {
    const abrir = event.target.closest('[data-abrir-redacao]');
    const excluir = event.target.closest('[data-excluir-redacao]');
    const l = lerProgressoLocal(); if (!l.ok) { informarLocal(l.erro); return; }
    if (abrir) {
      const e = l.dados.redacoes.find(item => item.id === abrir.dataset.abrirRedacao); if (!e) return;
      state.texto = e.texto; state.temaId = e.temaId; state.temaLivre = e.temaLivre;
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
    state.temaLivre = temaLivre;
    const r = corrigir(textarea.value, { temaId: state.temaId, temaLivre });
    ultimoRelatorio = r;
    saida.innerHTML = relatorio(r);
    ativarMovimento(saida);
    if (!r.ok) { showToast(r.erro); return; }
    if (salvar) {
      const salvo = salvarRedacaoLocal(textarea.value, state.temaId, temaLivre, r);
      informarLocal(salvo.ok ? 'Correção salva neste navegador.' : salvo.erro);
      atualizarHistorico();
      if (!salvo.ok) showToast(salvo.erro);
    }
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
    state.texto = '';
    contar();
    saida.innerHTML = `<div class="vazio"><p>Cole o texto e clique em <b>Corrigir</b>. O relatório aparece aqui.</p></div>`;
    textarea.focus();
    showToast('Texto apagado.');
  });
  document.querySelectorAll('[data-exemplo]').forEach(b => {
    b.addEventListener('click', () => {
      const ex = EXEMPLOS.find(e => e.id === b.dataset.exemplo);
      if (!ex) return;
      textarea.value = ex.texto;
      state.texto = ex.texto;
      if (sel && ex.temaId) {
        sel.value = ex.temaId; state.temaId = ex.temaId;
        sel.dispatchEvent(new Event('change'));
        pintarProposta(ex.temaId);
      }
      contar();
      showToast(ex.rotulo);
      rodar();
    });
  });
  if (state.texto) rodar();
  else if (textarea.value.trim()) rodar();
}

function viewNotFound(msg) {
  return `<div class="vazio" style="padding:var(--space-10) 0">
    ${icon('alert', 'ico-g')}
    <p>${escapeHtml(msg)}</p>
    <a class="btn btn-sm" href="#/">Voltar ao início</a>
  </div>`;
}

// ============================================================================
// ROUTING & RENDER
// ============================================================================
function parseRoute() {
  const raw = location.hash.replace(/^#/, '') || '/';
  const [path, query] = raw.split('?');
  return { path: path.replace(/\/+$/, '') || '/', params: new URLSearchParams(query || '') };
}

function pageEntrance(root) {
  if (root.querySelector('.hero') || matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)').matches) return;
  root.animate(
    [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'translateY(0)' }],
    { duration: 340, easing: 'cubic-bezier(.22,1,.36,1)' }
  );
}

function render() {
  const { path, params } = parseRoute();
  const parts = path.split('/').filter(Boolean);
  let html = '';
  let currentTab = path;

  if (parts.length === 0) { html = viewHome(); currentTab = '/'; }
  else if (parts[0] === 'competencias') html = viewCriterios();
  else if (parts[0] === 'criterios') { location.replace('#/competencias'); return; }
  else if (parts[0] === 'estrutura') html = viewEstrutura();
  else if (parts[0] === 'comandos') html = viewComandos();
  else if (parts[0] === 'temas') html = viewTemas();
  else if (parts[0] === 'programas') html = viewProgramas();
  else if (parts[0] === 'redacoes') {
    html = parts[1] ? viewRedacao(decodeURIComponent(parts[1])) : viewRedacoes();
  }
  else if (parts[0] === 'conteudos') {
    if (parts[1] === 'materia') html = viewMateria(decodeURIComponent(parts[2] || ''));
    else if (parts[1] === 'c') {
      const id = decodeURIComponent(parts[2] || '');
      if (conteudoPorId(id)) {
        const marcado = marcarAcessoLocal(id);
        if (!marcado.ok) showToast('Não foi possível salvar o acesso neste navegador.');
      }
      html = viewConteudo(id);
    }
    else html = viewConteudos();
  }
  else if (parts[0] === 'corrigir') html = viewCorrigir(params);
  else html = viewNotFound('Página não encontrada.');

  app.innerHTML = html;
  document.title = titleFrom(parts);

  pageEntrance(app);

  [...document.querySelectorAll('.pill')].forEach(p => {
    const target = p.getAttribute('href').replace('#', '');
    p.removeAttribute('aria-current');
    if (target === currentTab || (currentTab.startsWith(target) && target !== '/')) p.setAttribute('aria-current', 'page');
  });

  bindFilters();
  ligarCorrigir();
  ativarMovimento(app);

  if (typeof window.scrollTo === 'function') {
    try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch { window.scrollTo(0, 0); }
  }
}

function titleFrom(parts = []) {
  const map = {
    '': 'Redação com João — ENEM, redação, Sisu, Prouni e FIES',
    competencias: 'Competências da redação do Enem — Redação com João',
    estrutura: 'Estrutura da redação — Redação com João',
    comandos: 'Como ler o tema — Redação com João',
    temas: 'Temas do ENEM e de treino — Redação com João',
    programas: 'Sisu, Prouni e FIES — Redação com João',
    redacoes: 'Redações nota 1000 analisadas — Redação com João',
    corrigir: 'Corrigir redação — Redação com João'
  };
  const fromGuide = tituloDeConteudos(parts);
  if (fromGuide) return fromGuide;
  return map[parts[0] || ''] || 'Redação com João';
}

function bindFilters() {
  const busca = document.getElementById('busca-tema');
  const eixo = document.getElementById('filtro-eixo');
  const lista = document.getElementById('lista-temas');
  if (!lista) return;
  const redraw = () => { lista.innerHTML = linhasTemas(); ativarMovimento(lista); };
  if (busca) busca.addEventListener('input', () => { buscaAtual = busca.value; redraw(); });
  if (eixo) eixo.addEventListener('change', () => { filtroAtual = eixo.value; redraw(); });
}

document.addEventListener('click', e => {
  const link = e.target.closest('.cp-indice a[href^="#"], .cp-navegacao-flutuante a[href^="#"]');
  if (!link) return;
  const target = document.getElementById(link.getAttribute('href').slice(1));
  if (!target) return;
  e.preventDefault();
  const menu = link.closest('.cp-subtemas-menu');
  if (menu) { menu.open = false; menu.querySelector('summary')?.focus({ preventScroll: true }); }
  target.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce), (max-width: 767px), (pointer: coarse)').matches ? 'auto' : 'smooth', block: 'start' });
});

window.addEventListener('hashchange', render);
render();