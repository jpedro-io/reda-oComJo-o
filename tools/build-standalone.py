#!/usr/bin/env python3
"""Gera standalone.html: HTML + CSS + JS + fontes em um único arquivo (offline).

As fontes entram como data URI para o arquivo funcionar sem servidor e sem rede.
O fundo 3D (bg.js) também é embutido — se o WebGL não existir, a aurora em CSS
continua sendo o fallback.
"""
import base64
import pathlib
import re

raiz = pathlib.Path(__file__).resolve().parent.parent

ordem = [
    'js/db/lexico.js', 'js/engine/texto.js',
    'js/db/motivadores-oficiais.js', 'js/db/motivadores-treino.js', 'js/db/motivadores.js',
    'js/db/temas-extra.js', 'js/db/temas.js', 'js/db/acentos.js', 'js/db/exemplos.js',
    'js/db/criterios.js', 'js/db/estrutura.js', 'js/db/comandos.js', 'js/db/cartilhas.js',
    'js/db/niveis.js',
    'js/db/redacoes-2014-2019.js', 'js/db/redacoes-2020-2026.js', 'js/db/redacoes.js',
    'js/engine/estilo.js',
    'js/engine/competencias.js', 'js/engine/explicar.js', 'js/engine/corrigir.js',
    'js/db/conteudos/estrutura.js', 'js/db/conteudos/videos.js',
    'js/db/conteudos/paginas-linguagens.js', 'js/db/conteudos/paginas-humanas.js',
    'js/db/conteudos/paginas-natureza.js', 'js/db/conteudos/paginas-matematica.js',
    'js/db/conteudos/index.js', 'js/ui-conteudos.js',
    'js/motion.js', 'js/ui.js',
]


def sem_modulos(src: str) -> str:
    # re-export (`export { x } from './y.js'`) precisa sair inteiro: sem isso
    # sobra um `export ... from` que o navegador recusa e a página inteira
    # morre com "Unexpected token '}'".
    src = re.sub(r"export\s*\{[^}]*\}\s*from\s*['\"][^'\"]+['\"];?", '', src)
    src = re.sub(r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]+['\"];?", '', src)
    src = re.sub(r"import\s+[\w*,\s]+\s*from\s*['\"][^'\"]+['\"];?", '', src)
    src = re.sub(r"^export\s+", '', src, flags=re.M)
    return src


partes = []
for rel in ordem:
    partes.append(f"/* ===== {rel} ===== */\n{sem_modulos((raiz / rel).read_text(encoding='utf-8')).strip()}\n")

js = "(function(){\n'use strict';\n" + "\n".join(partes) + "})();"
js_bg = "(function(){\n'use strict';\n" + sem_modulos((raiz / 'js/bg.js').read_text(encoding='utf-8')) + "\n})();"

html = (raiz / 'index.html').read_text(encoding='utf-8')


def embutir_fontes(css: str) -> str:
    # o subset latin-ext não é usado em português (Latin-1 cobre á, ç, ã, õ, ê...)
    css = re.sub(r"@font-face\s*\{[^}]*latin-ext[^}]*\}\n?", '', css)
    def troca(m):
        caminho = raiz / 'fonts' / m.group(1)
        dados = base64.b64encode(caminho.read_bytes()).decode('ascii')
        return f"url('data:font/woff2;base64,{dados}') format('woff2')"
    return re.sub(r"url\('\.\./fonts/([^']+)'\)\s*format\('woff2'\)", troca, css)


def embutir_imagens(css: str) -> str:
    # cada foto entra uma única vez, como custom property; o resto do CSS usa var()
    vistos = {}

    def troca(m):
        nome = m.group(1)
        if nome not in vistos:
            dados = base64.b64encode((raiz / 'assets' / nome).read_bytes()).decode('ascii')
            vistos[nome] = 'hero' if nome.startswith('hero') else re.sub(r'[^a-z0-9]+', '-', nome.lower())
        return f"var(--foto-{vistos[nome]})"

    css = re.sub(r"""url\(['"]\.\./assets/([^'"]+)['"]\)""", troca, css)
    if not vistos:
        return css
    raiz_vars = ':root {\n' + ''.join(
        f"  --foto-{apelido}: url('data:image/jpeg;base64,{base64.b64encode((raiz / 'assets' / nome).read_bytes()).decode('ascii')}');\n"
        for nome, apelido in vistos.items()) + '}\n'
    return raiz_vars + css


css_fontes = embutir_fontes((raiz / 'css/fontes.css').read_text(encoding='utf-8'))
css = (raiz / 'css/style.css').read_text(encoding='utf-8')
css_edit = embutir_imagens((raiz / 'css/editorial.css').read_text(encoding='utf-8'))

# o index.html carrega os assets com ?v=... (cache-busting); o build ignora a query
html = re.sub(r'\?v=[\w.-]+', '', html)
html = re.sub(r'<link rel="preload"[^>]*/>\s*', '', html)
html = re.sub(r'<link rel="stylesheet" href="css/fontes\.css" />',
              lambda m: '<style>\n' + css_fontes + '\n</style>', html)
html = re.sub(r'<link rel="stylesheet" href="css/style\.css" />',
              lambda m: '<style>\n' + css + '\n</style>', html)
html = re.sub(r'<link rel="stylesheet" href="css/editorial\.css" />',
              lambda m: '<style>\n' + css_edit + '\n</style>', html)
html = re.sub(r'<script type="module" src="js/ui\.js"></script>',
              lambda m: '<script>\n' + js + '\n</script>', html)
html = re.sub(r'<script type="module" src="js/bg\.js"></script>',
              lambda m: '<script>\n' + js_bg + '\n</script>', html)

saida = raiz / 'standalone.html'
saida.write_text(html, encoding='utf-8')
print(f'{saida} gerado — {len(html.encode("utf-8"))/1024:.1f} KB')
