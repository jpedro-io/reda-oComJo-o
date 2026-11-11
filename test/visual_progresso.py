"""Histórico, visitas e backup nas versões modular e standalone."""
import json, os, sys
from playwright.sync_api import sync_playwright
base=(sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:8011').rstrip('/')
with sync_playwright() as p:
    exe=os.environ.get('PLAYWRIGHT_CHROMIUM_PATH','/home/user/.cache/ms-playwright/chromium-1148/chrome-linux/chrome')
    b=p.chromium.launch(headless=True,executable_path=exe if os.path.isfile(exe) else None,args=['--no-sandbox'])
    page=b.new_page(viewport={'width':390,'height':844},accept_downloads=True)
    errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(base+'/#/corrigir');page.evaluate('localStorage.clear()');page.reload()
    page.locator('#tema').select_option('livre');page.locator('#tema-livre').fill('Desafios da leitura no Brasil')
    texto=('A leitura é um direito fundamental e fortalece a participação cidadã. É importante ampliar o acesso aos livros em todo o Brasil. ' * 7)
    page.locator('#texto').fill(texto);page.locator('#bt-corrigir').click()
    assert 'salva' in page.locator('#salvamento-status').inner_text().lower()
    assert page.locator('.historico-item').count()==1
    nota=page.locator('.nf-num').inner_text()
    page.goto(base+'/#/conteudos/c/his-colonia');page.goto(base+'/#/conteudos/materia/historia')
    page.locator('a[href="#/conteudos/c/his-colonia"] .cb-visitado').wait_for()
    page.reload();page.locator('a[href="#/conteudos/c/his-colonia"] .cb-visitado').wait_for()
    page.goto(base+'/#/corrigir');page.reload();page.locator('.historico-item').wait_for();assert page.locator('.historico-item').count()==1
    page.locator('[data-abrir-redacao]').click();assert page.locator('#texto').input_value()==texto
    assert page.locator('#tema').input_value()=='livre';assert page.locator('#tema-livre').input_value()=='Desafios da leitura no Brasil';assert page.locator('.nf-num').inner_text()==nota
    with page.expect_download() as info:page.locator('#exportar-progresso').click()
    backup=info.value.path();d=json.load(open(backup));assert len(d['redacoes'])==1 and 'his-colonia' in d['acessados']
    page.on('dialog', lambda dialog: dialog.accept())
    page.locator('[data-excluir-redacao]').click();assert page.locator('.historico-item').count()==0
    page.locator('#arquivo-progresso').set_input_files(backup);assert page.locator('.historico-item').count()==1
    page.locator('#arquivo-progresso').set_input_files(backup);assert page.locator('.historico-item').count()==1
    page.locator('#limpar-acessos').click();assert page.locator('.historico-item').count()==1
    page.goto(base+'/#/conteudos/materia/historia');assert page.locator('.cb-visitado').count()==0
    # Standalone e site modular, no mesmo domínio, compartilham os dados locais.
    page.goto(base+'/standalone.html#/corrigir');page.locator('.historico-item').wait_for();assert page.locator('.historico-item').count()==1
    page.locator('[data-abrir-redacao]').click();assert page.locator('#texto').input_value()==texto
    assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+2')
    assert not errors,errors
    page.close()
    # Quota esgotada: a correção funciona, mas não anuncia salvamento falso.
    falha=b.new_page(viewport={'width':390,'height':844})
    falha.add_init_script("Storage.prototype.setItem = function(){throw new DOMException('quota','QuotaExceededError')}")
    falha.goto(base+'/#/corrigir');falha.locator('#texto').fill(texto);falha.locator('#bt-corrigir').click()
    assert 'não foi possível salvar' in falha.locator('#salvamento-status').inner_text().lower()
    assert falha.locator('.historico-item').count()==0
    falha.close();b.close()
print('OK: histórico, restauração fiel, tema livre, visitas, backup, exclusão e standalone em 390 px.')
