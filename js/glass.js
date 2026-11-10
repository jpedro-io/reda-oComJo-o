/* ==========================================================================
   VIDA NO VIDRO: o brilho que segue o ponteiro e a inclinação de 3 graus
   nas superfícies que respondem ao toque. Sem biblioteca, sem requisição.
   ========================================================================== */

(function () {
  'use strict';

  var semMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var comBrilho = [
    '.folha', '.card', '.cartao', '.painel', '.painel-solido', '.aviso',
    '.indice-item', '.rc-item', '.comp-bloco', '.lista-redacoes', '.tabela-redacoes',
    '.hub-materia', '.tema-linha', '.red-card', '.conteudo-btn', '.side-bloco',
    '.ac-bloco', '.proposta', '.metricas', '.rel-topo', '.trilha', '.btn'
  ].join(',');

  /* a inclinação fica só nos blocos grandes: em linha de tabela ela briga
     com a leitura */
  var comInclinacao = [
    '.folha', '.rc-item', '.comp-bloco', '.hub-materia', '.red-card',
    '.conteudo-btn', '.tema-linha', '.proposta'
  ].join(',');

  var GRAU = 3.2;

  function medir(el, ev) {
    var r = el.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return {
      x: Math.min(1, Math.max(0, (ev.clientX - r.left) / r.width)),
      y: Math.min(1, Math.max(0, (ev.clientY - r.top) / r.height))
    };
  }

  function ligar(raiz) {
    var alvos = (raiz || document).querySelectorAll(comBrilho);
    for (var i = 0; i < alvos.length; i++) {
      var el = alvos[i];
      if (el.dataset.vidro === '1') continue;
      el.dataset.vidro = '1';
      el.classList.add('brilho');
      if (el.matches(comInclinacao)) el.classList.add('inclina');
      el.addEventListener('pointermove', aoMover);
      el.addEventListener('pointerleave', aoSair);
      el.addEventListener('pointercancel', aoSair);
    }
  }

  function aoMover(ev) {
    var el = ev.currentTarget;
    var p = medir(el, ev);
    if (!p) return;
    el.style.setProperty('--mx', (p.x * 100).toFixed(1) + '%');
    el.style.setProperty('--my', (p.y * 100).toFixed(1) + '%');
    if (semMovimento || !el.classList.contains('inclina')) return;
    var rx = ((0.5 - p.y) * GRAU).toFixed(2);
    var ry = ((p.x - 0.5) * GRAU * 1.3).toFixed(2);
    el.style.transform =
      'perspective(1000px) rotateX(' + rx + 'deg) rotateY(' + ry + 'deg) translateY(-2px)';
  }

  function aoSair(ev) {
    var el = ev.currentTarget;
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
    el.style.transform = '';
  }

  ligar(document);

  /* a navegação troca o conteúdo sem recarregar a página; o observador
     reaplica o vidro nos blocos novos */
  var pendente = null;
  var observador = new MutationObserver(function () {
    if (pendente) clearTimeout(pendente);
    pendente = setTimeout(function () { ligar(document); }, 60);
  });

  var app = document.getElementById('app');
  if (app) observador.observe(app, { childList: true, subtree: true });
})();
