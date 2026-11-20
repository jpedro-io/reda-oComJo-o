// V2 Navigation - Mobile menu toggle
(function () {
  'use strict';

  function initNav() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('aberto');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.addEventListener('click', (e) => {
      if (!e.target.closest('a')) return;
      nav.classList.remove('aberto');
      toggle.setAttribute('aria-expanded', 'false');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNav);
  } else {
    initNav();
  }
})();