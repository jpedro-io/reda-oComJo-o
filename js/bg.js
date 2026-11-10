/**
 * CAMPO DE PROFUNDIDADE — fundo 3D em WebGL puro (~4 KB, sem dependências).
 *
 * Por que não Three.js: o r180 distribui 2,1 MB (three.module.js + three.core.js)
 * para desenhar um fundo decorativo. Aqui só precisamos de partículas com
 * paralaxe de profundidade e uma luz na cor da marca — 60 linhas de shader bastam.
 *
 * Regras de carregamento:
 *  - só em telas >= 900px, com WebGL, sem prefers-reduced-motion
 *  - só depois do primeiro paint (requestIdleCallback / load)
 *  - pausa quando a aba fica oculta e quando o usuário pede menos movimento
 *  - qualquer falha mantém a aurora em CSS (fallback silencioso)
 */

const VERT = `
attribute vec3 a_pos;      // x,y em [-1,1]; z em [0,1] = profundidade
attribute float a_scale;
attribute float a_ton;
uniform float u_time;
uniform vec2  u_res;
uniform vec2  u_ptr;
uniform vec3  u_base;
uniform vec3  u_ouro;
varying float v_prof;
varying float v_ton;

void main() {
  float z = a_pos.z;
  float prof = 0.35 + z * 0.9;
  vec2 p = a_pos.xy;

  // deriva lenta, independente por profundidade (paralaxe)
  p.x += sin(u_time * 0.045 + z * 9.0) * 0.035 * prof;
  p.y += cos(u_time * 0.037 + z * 7.0) * 0.045 * prof + u_time * 0.004 * prof;

  // envolvimento pelos cantos
  p = mod(p + 1.25, 2.5) - 1.25;

  // o ponteiro desloca as camadas de forma diferente: leitura de profundidade
  p += u_ptr * (0.010 + z * 0.028);

  // corrige a proporção da tela
  float aspecto = u_res.x / max(u_res.y, 1.0);
  vec2 clip = vec2(p.x / max(aspecto / 1.6, 1.0), p.y);

  gl_Position = vec4(clip, 0.0, 1.0);
  gl_PointSize = a_scale * (0.8 + z * 2.6) * (u_res.y / 900.0);
  v_prof = z;
  v_ton = a_ton;
}
`;

const FRAG = `
precision mediump float;
varying float v_prof;
varying float v_ton;

void main() {
  vec2 d = gl_PointCoord - vec2(0.5);
  float r = length(d);
  if (r > 0.5) discard;
  float alfa = smoothstep(0.5, 0.0, r);
  alfa *= alfa;

  vec3 base = u_base;
  vec3 ouro = u_ouro;
  vec3 cor = mix(base, ouro, smoothstep(0.55, 1.0, v_prof) * v_ton);

  gl_FragColor = vec4(cor, alfa * (0.05 + 0.28 * v_prof));
}
`;

function compilar(gl, tipo, fonte) {
  const sh = gl.createShader(tipo);
  gl.shaderSource(sh, fonte);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

const consulta = (q) => (typeof window.matchMedia === 'function'
  ? window.matchMedia(q)
  : { matches: false, addEventListener() {} });

function podeRodar() {
  if (consulta('(prefers-reduced-motion: reduce)').matches) return false;
  if (consulta('(max-width: 899px)').matches) return false;
  const nav = navigator;
  // economia de dados / bateria fraca: fica com o fallback estático
  if (nav.connection && nav.connection.saveData) return false;
  return true;
}

function iniciar() {
  const canvas = document.getElementById('ceu-gl');
  if (!canvas || !podeRodar()) return;

  const gl = canvas.getContext('webgl', {
    alpha: true, antialias: false, depth: false,
    powerPreference: 'low-power', premultipliedAlpha: false
  });
  if (!gl) return;

  const vs = compilar(gl, gl.VERTEX_SHADER, VERT);
  const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAG);
  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  const TOTAL = 170;
  const pos = new Float32Array(TOTAL * 3);
  const esc = new Float32Array(TOTAL);
  const ton = new Float32Array(TOTAL);

  for (let i = 0; i < TOTAL; i++) {
    pos[i * 3] = Math.random() * 2.5 - 1.25;
    pos[i * 3 + 1] = Math.random() * 2.5 - 1.25;
    pos[i * 3 + 2] = Math.random();
    esc[i] = 1.4 + Math.random() * 3.4;
    ton[i] = Math.random();
  }

  const buf = (dados, nome, size) => {
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, dados, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, nome);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
    return b;
  };
  buf(pos, 'a_pos', 3);
  buf(esc, 'a_scale', 1);
  buf(ton, 'a_ton', 1);

  /* Paleta da marca: azul royal (#026842) e um azul de realce (#5CCDA7).
     Sobre o fundo branco, as partículas são tênues — o campo 3D aqui é um
     brilho de profundidade, não um céu noturno. */
  const uBase = gl.getUniformLocation(prog, 'u_base');
  const uOuro = gl.getUniformLocation(prog, 'u_ouro');
  gl.uniform3f(uBase, 0.10, 0.24, 0.78);   // azul royal
  gl.uniform3f(uOuro, 0.30, 0.42, 0.97);   // azul de realce

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uPtr = gl.getUniformLocation(prog, 'u_ptr');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);      // aditivo: brilho, não borrão
  gl.clearColor(0, 0, 0, 0);

  let dpr = 1;
  const medir = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(uRes, canvas.width, canvas.height);
  };
  medir();
  window.addEventListener('resize', medir, { passive: true });

  // ponteiro suavizado
  const alvo = { x: 0, y: 0 };
  const atual = { x: 0, y: 0 };
  window.addEventListener('pointermove', e => {
    alvo.x = (e.clientX / window.innerWidth) * 2 - 1;
    alvo.y = (e.clientY / window.innerHeight) * 2 - 1;
  }, { passive: true });

  let vivo = true;
  let reduzir = false;
  let ultimo = 0;
  const t0 = performance.now();

  const mq = consulta('(prefers-reduced-motion: reduce)');
  const aoMudar = () => { reduzir = mq.matches; };
  if (mq.addEventListener) mq.addEventListener('change', aoMudar);
  reduzir = mq.matches;

  const parar = () => { vivo = false; window.removeEventListener('resize', medir); };
  canvas.addEventListener('webglcontextlost', e => { e.preventDefault(); parar(); });

  function quadro(agora) {
    if (!vivo) return;
    if (document.hidden || reduzir) { requestAnimationFrame(quadro); return; }

    // teto de ~40 fps: fundo lento não precisa de 60
    if (agora - ultimo < 25) { requestAnimationFrame(quadro); return; }
    ultimo = agora;

    atual.x += (alvo.x - atual.x) * 0.04;
    atual.y += (alvo.y - atual.y) * 0.04;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, (agora - t0) / 1000);
    gl.uniform2f(uPtr, atual.x, -atual.y);
    gl.drawArrays(gl.POINTS, 0, TOTAL);
    requestAnimationFrame(quadro);
  }

  document.body.classList.add('tem-3d');
  requestAnimationFrame(quadro);

  // pausa de verdade quando a aba sai de foco
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { /* o laço já respeita document.hidden */ }
  });
}

const quandoOcioso = () => {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(iniciar, { timeout: 2200 });
  } else {
    setTimeout(iniciar, 900);
  }
};

if (document.readyState === 'complete') quandoOcioso();
else window.addEventListener('load', quandoOcioso, { once: true });
