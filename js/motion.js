/**
 * MOVIMENTO — implementado com Web Animations API + tokens de CSS.
 *
 * Framer Motion foi descartado por decisão registrada em DESIGN.md: o site é
 * HTML+ESM estático, sem React, e a API nativa cobre micro-interações (150–250 ms),
 * entradas de seção (600–800 ms) e stagger sem adicionar 40–60 KB ao pacote.
 *
 * Só transform/opacity. Com prefers-reduced-motion tudo aparece direto.
 */

const consulta = (q) => {
  if (typeof window.matchMedia !== 'function') return { matches: false, addEventListener() {} };
  return window.matchMedia(q);
};

export const reduzirMovimento = () => consulta('(prefers-reduced-motion: reduce)').matches;

const ENTRADA = 600;
const ATRASO = 70;

let io = null;

/** Observa tudo que tem [data-entrada] e solta o stagger na primeira aparição. */
export function observarEntradas(raiz = document) {
  const alvos = [...raiz.querySelectorAll('[data-entrada]:not(.entrou)')];
  if (!alvos.length) return;

  if (reduzirMovimento() || !('IntersectionObserver' in window)) {
    alvos.forEach(el => el.classList.add('entrou'));
    return;
  }

  if (!io) {
    io = new IntersectionObserver(entradas => {
      entradas.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const i = Number(el.dataset.i || 0);
        el.style.transitionDelay = `${Math.min(i, 8) * ATRASO}ms`;
        el.classList.add('entrou');
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  }

  // numera os irmãos para o efeito escada
  const grupos = new Map();
  alvos.forEach(el => {
    const pai = el.parentElement;
    const n = grupos.get(pai) || 0;
    el.dataset.i = String(n);
    grupos.set(pai, n + 1);
    io.observe(el);
  });
}

/** Números que sobem ao entrar na tela (nota, contagens). */
export function animarNumeros(raiz = document) {
  const alvos = [...raiz.querySelectorAll('[data-conta]:not(.contou)')];
  if (!alvos.length) return;

  alvos.forEach(el => {
    const destino = Number(el.dataset.conta);
    if (!Number.isFinite(destino)) return;
    el.classList.add('contou');

    if (reduzirMovimento()) { el.textContent = String(destino); return; }

    const inicio = performance.now();
    const dur = 800;
    const passo = agora => {
      const p = Math.min((agora - inicio) / dur, 1);
      const suave = 1 - Math.pow(1 - p, 3);
      el.textContent = String(Math.round(destino * suave));
      if (p < 1) requestAnimationFrame(passo);
      else el.textContent = String(destino);
    };
    requestAnimationFrame(passo);
  });
}

/** Aneis de nota: preenche com transição de stroke-dashoffset. */
export function pintarAneis(raiz = document) {
  [...raiz.querySelectorAll('[data-anel]')].forEach(el => {
    const pct = Math.max(0, Math.min(100, Number(el.dataset.anel) || 0));
    requestAnimationFrame(() => el.style.setProperty('--pct', pct));
  });
}

/** Barra de progresso de leitura no topo. */
export function ligarProgresso() {
  const barra = document.getElementById('progresso');
  if (!barra) return;
  let travado = false;
  const pintar = () => {
    const h = document.documentElement;
    const total = h.scrollHeight - h.clientHeight;
    const p = total > 0 ? h.scrollTop / total : 0;
    barra.style.transform = `scaleX(${p})`;
    travado = false;
  };
  window.addEventListener('scroll', () => {
    if (travado) return;
    travado = true;
    requestAnimationFrame(pintar);
  }, { passive: true });
  pintar();
}

/** Chamado depois de cada render de rota. */
export function ativarMovimento(raiz = document) {
  observarEntradas(raiz);
  animarNumeros(raiz);
  pintarAneis(raiz);
}
