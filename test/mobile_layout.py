"""Smoke test: servidor local já iniciado; aceita URL como argumento.
Requer Playwright Python e Chromium (PLAYWRIGHT_CHROMIUM_PATH opcional).
"""
import json, os, subprocess, sys
from playwright.sync_api import sync_playwright
base = (sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8003').rstrip('/')
ids = json.loads(subprocess.check_output(['node', '--input-type=module', '-e', "import {AREAS} from './js/db/conteudos/index.js'; console.log(JSON.stringify(AREAS.flatMap(a=>a.materias.flatMap(m=>m.conteudos.map(c=>c.id)))))"], text=True))
routes = ['#/', '#/competencias', '#/estrutura', '#/comandos', '#/temas', '#/redacoes', '#/corrigir', '#/conteudos']
with sync_playwright() as p:
    chromium = os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
    browser = p.chromium.launch(headless=True, executable_path=chromium if os.path.isfile(chromium) else None, args=['--no-sandbox'])
    errors=[]
    for width in [320,360,390,414,768,1440]:
        page=browser.new_page(viewport={'width':width,'height':844},reduced_motion='reduce')
        page.on('pageerror',lambda e:errors.append(str(e)))
        for route in routes + (['#/conteudos/c/'+i for i in ids] if width==320 else ['#/conteudos/c/his-guerra-fria','#/conteudos/c/mat-porcentagem']):
            page.goto(base+'/'+route,wait_until='domcontentloaded')
            page.wait_for_timeout(50)
            size=page.evaluate('''() => ({w:innerWidth, scroll:document.documentElement.scrollWidth,
                bad:[...document.querySelectorAll('main *')].filter(e=>{let r=e.getBoundingClientRect(), s=getComputedStyle(e);return r.width>0 && r.right>innerWidth+2 && s.position!=='absolute' && s.position!=='fixed'}).slice(0,4).map(e=>e.className)})''')
            assert size['scroll']<=size['w']+2 and not size['bad'], (width,route,size)
        page.goto(base+'/#/corrigir',wait_until='domcontentloaded')
        page.locator('[data-exemplo="problemas"]').click()
        page.locator('details.comp-card').evaluate_all('(ds)=>ds.forEach(d=>d.open=true)')
        items=page.locator('.cc-body .rev-lista li, .cc-body .fortes-lista li')
        assert items.count()>0, 'Relatório não foi gerado'
        for i in range(items.count()):
            geometry=items.nth(i).evaluate('''e=>{const r=e.getBoundingClientRect(), t=document.createRange();
                t.selectNodeContents(e); const text=t.getBoundingClientRect(), icon=getComputedStyle(e,'::before');
                return {gap:text.left-(r.left+parseFloat(icon.left)+parseFloat(icon.width)), transform:icon.transform}}''')
            assert geometry['gap']>=4 and geometry['transform']=='none', (width,geometry)
        page.wait_for_timeout(2700)
        page.close()
    page=browser.new_page(viewport={'width':360,'height':844},reduced_motion='reduce')
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(base+'/standalone.html#/corrigir',wait_until='domcontentloaded')
    page.locator('[data-exemplo="problemas"]').click()
    assert page.locator('details.comp-card').count()==5
    # Contradição observada: reconhecer variedade mas pedir que varie as classes.
    texto = ('A população precisa de saúde, mas a população enfrenta desigualdades. Embora haja leis, a população sofre porque faltam recursos.\n\n'
             'A população enfrenta filas e, além disso, falta atendimento. Assim, a população necessita de serviços públicos de qualidade.\n\n'
             'A população rural vive longe dos centros, enquanto a população urbana tem acesso diferente. Por isso, a população precisa de ações.\n\n'
             'O Ministério da Saúde deve ampliar os serviços por meio de investimentos, a fim de beneficiar a população vulnerável.')
    page.locator('#texto').fill(texto)
    page.locator('#bt-corrigir').click()
    c4 = page.locator('details.comp-card').nth(3)
    c4.evaluate('(e)=>e.open=true')
    diagnostico = c4.inner_text()
    assert 'Articulação variada:' in diagnostico
    assert 'Varie as classes de conectivos e elimine as repetições' not in diagnostico
    assert not errors, errors
    page.close();browser.close()
print('OK: 80 conteúdos em 320 px; rotas principais, marcadores da correção em seis larguras e versão standalone.')
