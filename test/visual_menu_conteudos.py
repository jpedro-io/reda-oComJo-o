"""Contraste, títulos, menu e navegação em todas as URLs de conteúdo."""
import json,os,subprocess,sys
from playwright.sync_api import sync_playwright
base=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8012').rstrip('/')
ids=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {AREAS_LEGADO,AREAS} from './js/db/conteudos/estrutura.js';console.log(JSON.stringify([...new Set([...AREAS_LEGADO,...AREAS].flatMap(a=>a.materias.flatMap(m=>m.conteudos.map(c=>c.id))))]))"],text=True))
materias=json.loads(subprocess.check_output(['node','--input-type=module','-e',"import {AREAS} from './js/db/conteudos/estrutura.js';console.log(JSON.stringify(AREAS.flatMap(a=>a.materias.map(m=>m.id))))"],text=True))
with sync_playwright() as p:
 exe=os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
 b=p.chromium.launch(executable_path=exe if os.path.isfile(exe) else None,args=['--no-sandbox']);errors=[];menu_total=0
 for path in ['/', '/standalone.html']:
  for width in [320,390,1440]:
   pg=b.new_page(viewport={'width':width,'height':900},reduced_motion='reduce');pg.on('pageerror',lambda e:errors.append(str(e)))
   for mat in materias:
    pg.goto(base+path+'#/conteudos/materia/'+mat,wait_until='domcontentloaded');pg.wait_for_selector('.conteudo-btn')
    for tag in pg.locator('.cb-tag').all():
     assert tag.evaluate("e=>getComputedStyle(e).color==='rgb(232, 244, 236)'")
   for id in ids:
    pg.goto(base+path+'#/conteudos/c/'+id,wait_until='domcontentloaded');pg.wait_for_selector('.conteudo-pag')
    pg.add_style_tag(content='[data-entrada]{opacity:1!important;transform:none!important} *,*::before,*::after{animation:none!important;transition:none!important}')
    for h in pg.locator('.conteudo-pag .cp-bloco > .cp-rot').all():
     assert h.evaluate('e=>e.getBoundingClientRect().top-e.parentElement.getBoundingClientRect().top>=14'),(path,width,id,h.text_content())
    count=pg.locator('.subtema[id]').count();menu=pg.locator('.cp-subtemas-menu');assert menu.count()==(1 if count else 0),(id,count)
    if count:
     menu_total+=1;assert menu.locator('.cp-subtemas-lista a').count()==count
     for link in menu.locator('.cp-subtemas-lista a').all():
      href=link.get_attribute('href'); assert pg.locator('[id="'+href[1:]+'"].subtema').count()==1,(id,href)
     summary=menu.locator('summary');summary.focus();pg.keyboard.press('Enter');assert menu.get_attribute('open') is not None
     first=menu.locator('a').first;href=first.get_attribute('href');old=pg.url;first.click();assert menu.get_attribute('open') is None;assert pg.url==old
     top=pg.locator('[id="'+href[1:]+'"]').evaluate('e=>e.getBoundingClientRect().top');assert -2<=top<=180,(id,width,top)
    assert pg.evaluate('document.documentElement.scrollWidth<=innerWidth+2'),(id,width)
   pg.close()
 assert not errors,errors
 b.close()
print(f'OK: {len(ids)} URLs de conteúdo, {len(materias)} matérias, 3 larguras, 2 versões; {menu_total} menus testados')
