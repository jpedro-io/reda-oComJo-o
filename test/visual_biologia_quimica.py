"""Verifica os dez novos subtemas no site e standalone; servidor local na porta 8005."""
from playwright.sync_api import sync_playwright
checks={'bio-genetica':['bio-genetica-mendel-sexo','bio-biotecnologia-aprofundada'],'bio-evolucao':['bio-evolucao-aprofundada'],'bio-fisiologia':['bio-fisiologia-imunologia','bio-parasitologia-saude'],'qui-ligacoes':['qui-ligacoes-interacoes','qui-funcoes-inorganicas','qui-separacao-misturas','qui-estequiometria-aprofundada'],'qui-solucoes':['qui-solucoes-concentracoes']}
with sync_playwright() as p:
 b=p.chromium.launch(headless=True,executable_path='/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome',args=['--no-sandbox']);pg=b.new_page(viewport={'width':390,'height':844});errors=[];pg.on('pageerror',lambda e:errors.append(str(e)))
 for prefix in ['','standalone.html']:
  for group,ids in checks.items():
   pg.goto('http://127.0.0.1:8005/'+prefix+'#/conteudos/c/'+group,wait_until='domcontentloaded')
   for id in ids:
    el=pg.locator('#'+id);assert el.count()==1,(prefix,group,id);assert el.locator('iframe').count()==1,(prefix,id)
    assert el.locator('.questao').count()==2,(prefix,id,el.locator('.questao').count())
   assert pg.evaluate('document.documentElement.scrollWidth <= innerWidth+2'),(prefix,group)
 assert not errors,errors
 b.close()
print('OK: dez subtemas, vídeos e questões, site modular e standalone, 390 px.')
