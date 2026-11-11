"""Verifica recuo real do texto em caixas visíveis em todas as rotas.
Uso: python3 test/visual_caixas.py [http://localhost:8012[/standalone.html]]
"""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright

base = (sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8012').rstrip('/')
def node(script):
    return json.loads(subprocess.check_output(['node', '--input-type=module', '-e', script], text=True))
ids = node("import {AREAS_LEGADO,AREAS} from './js/db/conteudos/estrutura.js';console.log(JSON.stringify([...new Set([...AREAS_LEGADO,...AREAS].flatMap(a=>a.materias.flatMap(m=>m.conteudos.map(c=>c.id))))]))")
materias = node("import {AREAS} from './js/db/conteudos/estrutura.js';console.log(JSON.stringify(AREAS.flatMap(a=>a.materias.map(m=>m.id))))")
redacoes = node("import {REDACOES} from './js/db/redacoes.js';console.log(JSON.stringify(REDACOES.map(r=>r.id)))")
rotas = ['#/', '#/competencias', '#/estrutura', '#/comandos', '#/temas', '#/redacoes', '#/corrigir', '#/conteudos']
rotas += ['#/conteudos/c/'+i for i in ids]+['#/redacoes/'+i for i in redacoes]+['#/conteudos/materia/'+i for i in materias]
rotas = list(dict.fromkeys(rotas))
verificar = r'''() => {
 const erros=[];
 for(const e of document.querySelectorAll('main .ac-bloco, main .rel-topo, main .metricas, main .painel-solido, main .indice-item, main .video-caixa')) {
   const rect=e.getBoundingClientRect(), w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT); let n;
   while(n=w.nextNode()) {
     if(!n.textContent.trim() || n.parentElement.closest('details:not([open])')) continue;
     let s=getComputedStyle(n.parentElement); if(s.display==='none'||s.visibility==='hidden') continue;
     const r=document.createRange(); r.selectNodeContents(n);
     for(const x of r.getClientRects()) {
       if(x.width<1||x.height<1)continue;
       const gap=Math.min(x.left-rect.left,rect.right-x.right,x.top-rect.top,rect.bottom-x.bottom);
       if(gap<6) erros.push({caixa:e.className, texto:n.textContent.trim().slice(0,70), recuo:Math.round(gap)});
     }
   }
 }
 return erros.slice(0,10);
}'''
with sync_playwright() as p:
    exe=os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
    browser=p.chromium.launch(headless=True,executable_path=exe if os.path.isfile(exe) else None,args=['--no-sandbox'])
    errors=[]
    for width in [320,390,768,1440]:
        page=browser.new_page(viewport={'width':width,'height':900},is_mobile=width<768,has_touch=width<768)
        page.on('pageerror',lambda e: errors.append(str(e)))
        for route in rotas:
            page.goto(base+'/' + route if not base.endswith('.html') else base+route,wait_until='domcontentloaded')
            page.wait_for_selector('main > *')
            page.add_style_tag(content='*,*::before,*::after { animation:none !important; transition:none !important; }')
            page.locator('[data-entrada]').evaluate_all('(es)=>es.forEach(e=>e.classList.add("entrou"))')
            if route=='#/corrigir': page.locator('[data-exemplo="problemas"]').click()
            page.locator('main details').evaluate_all('(ds)=>ds.forEach(d=>d.open=true)')
            bad=page.evaluate(verificar)
            assert not bad,(width,route,bad)
            size=page.evaluate('({width:innerWidth, scroll:document.documentElement.scrollWidth})')
            assert size['scroll']<=size['width']+2,(width,route,size)
            if route=='#/comandos':
                assert page.locator('.ac-bloco').count() >= 3
                for box in page.locator('.ac-bloco').all():
                    assert box.evaluate("e=>parseFloat(getComputedStyle(e).paddingLeft)>=16 && parseFloat(getComputedStyle(e).paddingTop)>=16")
                assert page.locator('.ac-palavra').first.evaluate("e=>getComputedStyle(e).color === 'rgb(232, 244, 236)'")
        page.close()
    browser.close()
    assert not errors,errors
print(f'OK: recuo e overflow em {len(rotas)} rotas, larguras 320, 390, 768 e 1440 px: {base}')
