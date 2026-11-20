#!/usr/bin/env python
# Arquivo responsável por gerar a versão autônoma da aplicação V2.

"""Empacota HTML, CSS, JavaScript, fontes e imagens em standalone.html."""

import base64
import pathlib
import re

RAIZ_DO_PROJETO = pathlib.Path(__file__).resolve().parent.parent
ARQUIVO_DE_SAIDA = RAIZ_DO_PROJETO / 'standalone.html'

# Seção: ordem dos módulos ES que compõem a aplicação no arquivo único.
MODULOS_DA_APLICACAO = [
    'js/db/lexico.js',
    'js/engine/texto.js',
    'js/db/motivadores-oficiais.js',
    'js/db/motivadores-treino.js',
    'js/db/motivadores.js',
    'js/db/temas-extra.js',
    'js/db/temas.js',
    'js/db/acentos.js',
    'js/db/exemplos.js',
    'js/db/criterios.js',
    'js/db/estrutura.js',
    'js/db/comandos.js',
    'js/db/cartilhas.js',
    'js/db/niveis.js',
    'js/db/redacoes-2014-2019.js',
    'js/db/redacoes-2020-2026.js',
    'js/db/redacoes.js',
    'js/engine/estilo.js',
    'js/engine/competencias.js',
    'js/engine/explicar.js',
    'js/engine/corrigir.js',
    'js/db/conteudos/grupos-natureza.js',
    'js/db/conteudos/grupos-matematica.js',
    'js/db/conteudos/grupos-humanas.js',
    'js/db/conteudos/grupos-linguagens.js',
    'js/db/conteudos/material-redacao.js',
    'js/db/conteudos/apoio-grupos.js',
    'js/db/conteudos/material-membrana.js',
    'js/db/conteudos/subtemas-citologia.js',
    'js/db/conteudos/subtema-bioenergetica.js',
    'js/db/conteudos/subtemas-portugues.js',
    'js/db/conteudos/subtema-matematica-financeira.js',
    'js/db/conteudos/subtema-brasil-colonia.js',
    'js/db/conteudos/subtemas-ecologia.js',
    'js/db/conteudos/subtemas-matematica.js',
    'js/db/conteudos/subtemas-geometria-funcoes.js',
    'js/db/conteudos/subtemas-portugues-aplicado.js',
    'js/db/conteudos/alternativas-autorais.js',
    'js/db/conteudos/subtemas-literatura.js',
    'js/db/conteudos/subtemas-artes-corpo.js',
    'js/db/conteudos/subtemas-linguas.js',
    'js/db/conteudos/subtemas-biologia-vida.js',
    'js/db/conteudos/subtemas-quimica-inicial.js',
    'js/db/conteudos/subtemas-quimica-final.js',
    'js/db/conteudos/subtemas-fisica-mecanica.js',
    'js/db/conteudos/subtemas-fisica-termica-ondas.js',
    'js/db/conteudos/subtemas-fisica-eletrica-optica.js',
    'js/db/conteudos/subtemas-sociologia.js',
    'js/db/conteudos/subtemas-filosofia.js',
    'js/db/conteudos/subtemas-geografia.js',
    'js/db/conteudos/subtemas-historia.js',
    'js/db/conteudos/estrutura.js',
    'js/db/conteudos/videos.js',
    'js/db/conteudos/paginas-linguagens.js',
    'js/db/conteudos/paginas-humanas.js',
    'js/db/conteudos/paginas-natureza.js',
    'js/db/conteudos/paginas-matematica.js',
    'js/db/conteudos/expansao-linguagens.js',
    'js/db/conteudos/expansao-humanas.js',
    'js/db/conteudos/expansao-natureza.js',
    'js/db/conteudos/expansao-matematica.js',
    'js/db/conteudos/expansoes.js',
    'js/db/conteudos/questoes-enem.js',
    'js/db/conteudos/questoes-inep-dia1.js',
    'js/db/conteudos/questoes-inep-reaplicacao.js',
    'js/db/conteudos/questoes-autorais-complementares.js',
    'js/db/conteudos/questoes-autorais-reforco.js',
    'js/db/conteudos/index.js',
    'js/progresso-local.js',
    'js/ui-conteudos.js',
    'js/motion.js',
    'js/ui.js',
]

# Seção: transformação de módulos e inclusão de recursos locais.

def remover_sintaxe_de_modulo(codigo: str) -> str:
    codigo = re.sub(r"export\s*\{[^}]*\}\s*from\s*['\"][^'\"]+['\"];?", '', codigo)
    codigo = re.sub(r"import\s*\{[^}]*\}\s*from\s*['\"][^'\"]+['\"];?", '', codigo)
    codigo = re.sub(r"import\s+[\w*,\s]+\s*from\s*['\"][^'\"]+['\"];?", '', codigo)
    return re.sub(r"^export\s+", '', codigo, flags=re.MULTILINE)


def ler_modulos_da_aplicacao() -> str:
    partes = []
    for caminho_relativo in MODULOS_DA_APLICACAO:
        codigo = (RAIZ_DO_PROJETO / caminho_relativo).read_text(encoding='utf-8')
        partes.append(remover_sintaxe_de_modulo(codigo).strip())
    return "(function () {\n'use strict';\n\n" + '\n\n'.join(partes) + "\n})();"


def incorporar_fontes(css: str) -> str:
    # Remove @font-face com latin-ext (mantemos apenas latin)
    css = re.sub(r"@font-face\s*\{[^}]*latin-ext[^}]*\}\n?", '', css)

    def substituir_url(resultado: re.Match) -> str:
        nome_da_fonte = resultado.group(1)
        caminho_fonte = RAIZ_DO_PROJETO / 'fonts' / nome_da_fonte
        if caminho_fonte.exists():
            dados = base64.b64encode(caminho_fonte.read_bytes()).decode('ascii')
            return f"url('data:font/woff2;base64,{dados}') format('woff2')"
        return resultado.group(0)  # Mantém original se não encontrar

    # Substitui urls de fontes relativas
    return re.sub(r"url\('\.\./fonts/([^']+)'\)\s*format\('woff2'\)", substituir_url, css)


def incorporar_imagens(css: str) -> str:
    imagens = {}

    def substituir_url(resultado: re.Match) -> str:
        nome_da_imagem = resultado.group(1)
        apelido = imagens.setdefault(
            nome_da_imagem,
            'hero' if nome_da_imagem.startswith('hero') else re.sub(r'[^a-z0-9]+', '-', nome_da_imagem.lower())
        )
        return f'var(--foto-{apelido})'

    css = re.sub(r"""url\(['"]\.\./assets/([^'"]+)['"]\)""", substituir_url, css)
    if not imagens:
        return css

    variaveis = []
    for nome_da_imagem, apelido in imagens.items():
        caminho_img = RAIZ_DO_PROJETO / 'assets' / nome_da_imagem
        if caminho_img.exists():
            dados = base64.b64encode(caminho_img.read_bytes()).decode('ascii')
            variaveis.append(f"  --foto-{apelido}: url('data:image/jpeg;base64,{dados}');")
    return ':root {\n' + '\n'.join(variaveis) + '\n}\n' + css


def substituir_recurso(html: str, marcador: str, conteudo: str) -> str:
    if marcador not in html:
        raise ValueError(f'Marcador não encontrado no HTML: {marcador}')
    return html.replace(marcador, conteudo, 1)


# Seção: montagem do documento final.

html = (RAIZ_DO_PROJETO / 'index.html').read_text(encoding='utf-8')

# Lê e processa CSS
css_tokens = (RAIZ_DO_PROJETO / 'css/tokens.css').read_text(encoding='utf-8')
css_components = (RAIZ_DO_PROJETO / 'css/components.css').read_text(encoding='utf-8')
css_layout = (RAIZ_DO_PROJETO / 'css/layout.css').read_text(encoding='utf-8')

# Combina todos os CSS
css_completo = css_tokens + '\n' + css_components + '\n' + css_layout
css_completo = incorporar_fontes(css_completo)
css_completo = incorporar_imagens(css_completo)

# Remove preloads de fontes
html = re.sub(r'<link rel="preload"[^>]*/>\s*', '', html)

# Substitui link do CSS por style inline
html = substituir_recurso(html, '<link rel="stylesheet" href="css/layout.css" />', f'<style>\n{css_completo}\n</style>')

# Substitui scripts
html = substituir_recurso(
    html,
    '<script src="js/navegacao.js" defer></script>',
    f'<script>\n{remover_sintaxe_de_modulo((RAIZ_DO_PROJETO / "js/navegacao.js").read_text(encoding="utf-8"))}\n</script>'
)
html = substituir_recurso(html, '<script type="module" src="js/ui.js"></script>', f'<script>\n{ler_modulos_da_aplicacao()}\n</script>')

ARQUIVO_DE_SAIDA.write_text(html, encoding='utf-8')
print(f'{ARQUIVO_DE_SAIDA.name} gerado: {len(html.encode("utf-8")) / 1024:.1f} KB')