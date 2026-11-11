"""Auditoria de textos em caixas, navegação e modo leve no celular.
Requer um servidor local e Playwright; o argumento opcional é a URL base.
"""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8005').rstrip('/')
ids = json.loads(subprocess.check_output(['node','--input-type=module','-e',
    "import {AREAS_LEGADO,AREAS} from './js/db/conteudos/estrutura.js'; console.log(JSON.stringify([...new Set([...AREAS_LEGADO,...AREAS].flatMap(a=>a.materias.flatMap(m=>m.conteudos.map(c=>c.id))))]))"], text=True))
rotas = ['#/', '#/competencias', '#/estrutura', '#/comandos', '#/temas', '#/redacoes',
         '#/redacoes/enem-2014', '#/corrigir', '#/conteudos', '#/conteudos/materia/portugues',
         '#/conteudos/materia/biologia', '#/conteudos/materia/mat-basica', '#/conteudos/materia/redacao']
redacoes = json.loads(subprocess.check_output(['node','--input-type=module','-e', "import {REDACOES} from './js/db/redacoes.js'; console.log(JSON.stringify(REDACOES.map(r=>r.id)))"], text=True))
materias = json.loads(subprocess.check_output(['node','--input-type=module','-e', "import {AREAS} from './js/db/conteudos/estrutura.js'; console.log(JSON.stringify(AREAS.flatMap(a=>a.materias.map(m=>m.id))))"], text=True))
rotas += ['#/conteudos/c/' + i for i in ids] + ['#/redacoes/' + i for i in redacoes] + ['#/conteudos/materia/' + i for i in materias]
rotas = list(dict.fromkeys(rotas))
# Só testa texto realmente visível; cabeçalhos de tabelas acessíveis mas
# visualmente ocultos, e regiões horizontalmente roláveis, são excluídos.
verificar_texto = r'''() => {
  const bad=[], walker=document.createTreeWalker(document.querySelector('main'),NodeFilter.SHOW_TEXT);
  while(walker.nextNode()) {
    const node=walker.currentNode, e=node.parentElement;
    if (!node.textContent.trim() || !e || e.closest('details:not([open])')) continue;
    const style=getComputedStyle(e);
    if(style.display==='none' || style.visibility==='hidden' || e.closest('.bloco-tabela thead')) continue;
    const range=document.createRange(); range.selectNodeContents(node);
    for(const box of range.getClientRects()) {
      if(box.width<1 || box.height<1) continue;
      let a=e;
      for(let i=0; a && i<7; i++,a=a.parentElement) {
        const s=getComputedStyle(a), r=a.getBoundingClientRect();
        if(s.display==='inline' || !r.width || s.position==='absolute') continue;
        if((box.right>r.right+2 || box.left<r.left-2) && !['auto','scroll'].includes(s.overflowX)) {
          bad.push({text:node.textContent.trim().slice(0,65), elemento:a.tagName, classe:String(a.className).slice(0,80)}); break;
        }
      }
    }
  }
  return bad.slice(0,8);
}'''
with sync_playwright() as p:
    executable = os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
    browser = p.chromium.launch(headless=True, executable_path=executable if os.path.isfile(executable) else None, args=['--no-sandbox'])
    errors=[]
    for width in [320,390]:
        page=browser.new_page(viewport={'width':width,'height':844},is_mobile=True,has_touch=True)
        page.on('pageerror',lambda e:errors.append(str(e)))
        for route in rotas:
            page.goto(base+'/'+route,wait_until='domcontentloaded')
            if route == '#/corrigir':
                page.locator('[data-exemplo="problemas"]').click()
            page.locator('main details').evaluate_all('(ds)=>ds.forEach(d=>d.open=true)')
            size=page.evaluate('({width:innerWidth, scroll:document.documentElement.scrollWidth})')
            assert size['scroll']<=size['width']+2, (width,route,size)
            bad=page.evaluate(verificar_texto)
            assert not bad, (width,route,bad)
            assert page.locator('.topbar').evaluate("e=>getComputedStyle(e).backdropFilter === 'none'"), 'Blur da barra ativa no celular'
        # Menu móvel, entrada sem animação em cascata e superfície de entrada não branca.
        page.goto(base+'/#/')
        page.locator('#nav-abre').click()
        assert page.locator('#nav-abre').get_attribute('aria-expanded') == 'true'
        page.locator('#nav a[href="#/corrigir"]').click()
        assert page.locator('#nav-abre').get_attribute('aria-expanded') == 'false'
        assert page.locator('.campo textarea').first.evaluate("e=>getComputedStyle(e).backgroundColor !== 'rgb(255, 255, 255)'")
        page.close()
    assert not errors, errors
    browser.close()
print(f'OK: texto dentro das caixas em {len(rotas)} rotas, em 320 e 390 px; menu, formulário e modo leve.')
