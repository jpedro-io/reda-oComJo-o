"""Verifica os seis tópicos de Sociologia nas versões modular e standalone."""
import os,sys
from playwright.sync_api import sync_playwright
base=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8005').rstrip('/')
checks={'soc-classicos':['soc-classicos-aprofundado','soc-marx-aprofundado'],'soc-trabalho':['soc-mundo-trabalho','soc-industria-cultural','soc-cidadania-movimentos','soc-desigualdade-instituicoes']}
with sync_playwright() as p:
 exe=os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
 b=p.chromium.launch(headless=True,executable_path=exe if os.path.isfile(exe) else None,args=['--no-sandbox']);page=b.new_page(viewport={'width':390,'height':844});errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 for prefix in ('','standalone.html'):
  for group,ids in checks.items():
   page.goto(base+'/'+prefix+'#/conteudos/c/'+group,wait_until='domcontentloaded')
   for id in ids:
    el=page.locator('#'+id);assert el.count()==1,(prefix,id);assert el.locator('iframe').count()==1,(prefix,id);assert el.locator('.questao').count()==2,(prefix,id)
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+2'),(prefix,group)
 assert not errors,errors
 b.close()
print('OK: seis tópicos de Sociologia, site e standalone, 390 px.')
