"""Recuo dos temas e orientação de transcrição no corretor (site e standalone)."""
import os, sys
from playwright.sync_api import sync_playwright
base=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8012').rstrip('/')
with sync_playwright() as p:
    exe=os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
    browser=p.chromium.launch(executable_path=exe if os.path.isfile(exe) else None,args=['--no-sandbox'])
    for path in ['/', '/standalone.html']:
        for width in [320,390,768,769,1440]:
            page=browser.new_page(viewport={'width':width,'height':900})
            page.goto(base+path+'#/temas');page.wait_for_selector('.tema-linha')
            page.locator('[data-entrada]').evaluate_all('(es)=>es.forEach(e=>e.classList.add("entrou"))')
            assert page.locator('.tema-linha').first.evaluate("e=>parseFloat(getComputedStyle(e).paddingLeft)>=18")
            page.locator('#busca-tema').fill('envelhecimento')
            assert page.locator('.tema-linha').count()>=1
            page.locator('.tema-linha .tl-acoes a[href^="#/corrigir"]').first.click()
            page.wait_for_selector('#texto')
            assert page.locator('#aviso-transcricao').is_visible()
            assert page.locator('#texto').get_attribute('aria-describedby') == 'aviso-transcricao'
            assert page.locator('.ws-proposta').evaluate("e=>getComputedStyle(e).backgroundColor === 'rgb(22, 61, 40)'")
            text='A população presisa de atensão.\n\nPortanto o governo deve agir.'
            page.locator('#texto').fill(text);page.locator('#bt-corrigir').click()
            assert page.locator('#texto').input_value()==text
            assert page.locator('.rel-topo').count()==1
            assert page.evaluate('document.documentElement.scrollWidth<=innerWidth+2')
            page.close()
    browser.close()
print('OK: recuo dos temas, busca, navegação, orientação acessível, cores e transcrição fiel em cinco larguras e ambas as versões.')
