"""Testa a abertura, o esqueleto e os títulos da tabela de competências."""
import os, sys
from playwright.sync_api import sync_playwright
base=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8012').rstrip('/')
with sync_playwright() as p:
 exe=os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
 b=p.chromium.launch(executable_path=exe if os.path.isfile(exe) else None,args=['--no-sandbox'])
 for path in ['/', '/standalone.html']:
  for width in [320,390,768,769,860,900,901,1024,1440]:
   page=b.new_page(viewport={'width':width,'height':900})
   page.goto(base+path+'#/');page.wait_for_selector('.novo-hero h1')
   assert page.locator('.novo-kicker').count()==0
   assert page.locator('.novo-acoes a').count()==2
   page.goto(base+path+'#/estrutura');page.wait_for_selector('.esk-linha')
   assert page.locator('.esk-linha').count()==4
   for row in page.locator('.esk-linha').all():
    assert row.evaluate("e=>getComputedStyle(e).borderLeftWidth==='0px'")
    assert row.locator('.bloco').evaluate('e=>{let r=document.createRange();r.selectNodeContents(e);return r.getClientRects().length===1}')
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+2'),width
   page.goto(base+path+'#/competencias');page.wait_for_selector('.tabela-niveis th')
   for th in page.locator('.tabela-niveis thead th:first-child').all():
    assert th.text_content().strip()=='Nível'
    assert th.evaluate('e=>{let r=document.createRange();r.selectNodeContents(e);return r.getClientRects().length===1}')
   assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+2'),width
   if width>768:
    assert page.locator('.nav-pills a').last.evaluate('e=>e.getBoundingClientRect().right<=innerWidth')
   page.close()
 b.close()
print('OK abertura, esqueleto, tabela e navegação em nove larguras nas duas versões')
