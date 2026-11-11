import assert from 'node:assert/strict';
import { AREAS, TOTAL_CONTEUDOS, TOTAL_COMPLETOS, TOTAL_QUESTOES, paginaDe, paginaCompleta } from '../js/db/conteudos/index.js';
import { AREAS_LEGADO, GRUPOS, conteudoPorId } from '../js/db/conteudos/estrutura.js';
import { EXPANSOES } from '../js/db/conteudos/expansoes.js';
import { viewConteudo } from '../js/ui-conteudos.js';
const legados = AREAS_LEGADO.flatMap(a => a.materias.flatMap(m => m.conteudos));
const conteudos = AREAS.flatMap(a => a.materias.flatMap(m => m.conteudos));
assert.equal(conteudos.length, TOTAL_CONTEUDOS);
assert.equal(new Set(conteudos.map(c => c.id)).size, TOTAL_CONTEUDOS);
for (const [id, p] of Object.entries(EXPANSOES)) {
  assert.ok(legados.some(c => c.id === id), `${id}: ID desconhecido`);
  assert.ok(p.secoes.length >= 3, `${id}: seções insuficientes`);
  assert.equal(p.questoes.length, 3, `${id}: requer exatamente três questões`);
  assert.ok(p.exemplos.length >= 2 && p.figuras.length >= 1, `${id}: faltam exemplos ou figura`);
  p.questoes.forEach((q, i) => {
    assert.ok(q.fonte && q.enunciado && /^[A-E]$/.test(q.correta), `${id}: questão ${i+1} incompleta`);
    assert.equal(q.alternativas.length, 5, `${id}: alternativas`);
    assert.ok(q.resolucao.length >= 2, `${id}: resolução insuficiente`);
  });
  const html = viewConteudo(id);
  assert.equal((html.match(/<details class="questao" open>/g) || []).length, 3 + (paginaDe(id).subtemas || []).reduce((n,t)=>n+t.questoes.length,0), `${id}: questões renderizadas`);
  const marcadores = ['id="resumo"','id="exemplos"','id="imagens"','id="questoes"','id="video"'];
  const pos = marcadores.map(m=>html.indexOf(m));
  assert.ok(pos.every(x=>x>=0) && pos.every((x,i)=>i===0 || x>pos[i-1]), `${id}: ordem das seções`);
}
assert.equal(TOTAL_COMPLETOS, conteudos.filter(c => paginaCompleta(c.id)).length);
assert.equal(TOTAL_QUESTOES, conteudos.reduce((n,c)=>{ const p=paginaDe(c.id); return n+p.questoes.length+(p.subtemas||[]).reduce((t,s)=>t+s.questoes.length,0); },0));
console.log(`Conteúdos: ${TOTAL_COMPLETOS}/${TOTAL_CONTEUDOS} ampliados; ${TOTAL_QUESTOES} questões exibidas.`);

const reais = ['mat-porcentagem','mat-razao-proporcao','bio-fisiologia','fis-optica','bio-evolucao','bio-citologia-anterior'];
for (const id of reais) {
  const q = paginaDe(id).questoes.filter(q=>q.urlProva);
  assert.ok(q.length > 0, `${id}: questões oficiais não exibidas`);
  assert.ok(q.every(x=>x.adaptada && x.gabaritoOficial === x.correta && x.urlGabarito), `${id}: fonte e gabarito`);
  assert.equal((viewConteudo(id).match(/Abrir caderno oficial/g)||[]).length,q.length);
}
assert.equal(paginaDe('mat-porcentagem').questoes.filter(q=>q.urlProva).length,3);
const oficiais = conteudos.flatMap(c => paginaDe(c.id).questoes).filter(q => q.gabaritoOficial);
const temasOficiais = conteudos.filter(c => paginaDe(c.id).questoes.some(q => q.gabaritoOficial));
console.log(`Questões com referência e gabarito do Inep: ${oficiais.length} em ${temasOficiais.length} conteúdos.`);
for (const c of conteudos) {
  const html = viewConteudo(c.id);
  const questoes = paginaDe(c.id).questoes;
  assert.equal(questoes.length, 3, `${c.id}: requer três questões`);
  assert.equal((html.match(/<details class="questao" open>/g) || []).length, 3 + (paginaDe(c.id).subtemas || []).reduce((n,t)=>n+t.questoes.length,0), `${c.id}: questões visíveis`);
  for (const q of questoes) {
    assert.ok(q.enunciado && q.fonte && /^[A-E]$/.test(q.correta), `${c.id}: questão incompleta`);
    assert.equal(q.alternativas.length, 5, `${c.id}: alternativas`);
    assert.ok(q.alternativas.every(a => typeof a === 'string' && a.trim()), `${c.id}: alternativas inválidas`);
    assert.ok(Array.isArray(q.resolucao) && q.resolucao.length >= 2, `${c.id}: resolução incompleta`);
    if (q.gabaritoOficial) assert.ok(q.adaptada && q.urlProva && q.urlGabarito && q.correta === q.gabaritoOficial, `${c.id}: fonte oficial incompleta`);
  }
  assert.ok(!html.includes('As questões deste conteúdo ainda estão sendo escritas'), `${c.id}: aviso de espera`);
  assert.ok(html.includes('id="resumo"'), `${c.id}: sem resumo`);
  assert.ok(html.includes('id="questoes"'), `${c.id}: sem seção de questões`);
  assert.ok(html.includes('id="video"'), `${c.id}: sem vídeo vinculado`);
}

assert.equal(GRUPOS.length, conteudos.length);
const agrupados = new Set(GRUPOS.flatMap(g => [g.pagina, ...g.relacionados]));
for (const c of legados) {
  assert.ok(conteudoPorId(c.id), `${c.id}: URL antiga perdida`);
  assert.ok(agrupados.has(c.id), `${c.id}: material antigo não agrupado`);
}
for (const g of GRUPOS) {
  const p = paginaDe(g.pagina);
  assert.ok(g.topicos.length >= 2, `${g.pagina}: subtemas ausentes`);
  for (const [titulo] of g.topicos) assert.ok(p.secoes.some(s=>s.h===titulo), `${g.pagina}: subtema ${titulo} ausente`);
  assert.ok(p.exemplos.length && (p.figuras.length || p.formulas.length), `${g.pagina}: falta exemplo ou esquema`);
  const html = viewConteudo(g.pagina);
  const pos = ['id="resumo"','id="exemplos"','id="imagens"','id="questoes"','id="video"'].map(m=>html.indexOf(m));
  assert.ok(pos.every(x=>x>=0) && pos.every((x,i)=>i===0 || x>pos[i-1]), `${g.pagina}: ordem das seções`);
  for (const x of g.relacionados) assert.ok(legados.some(c=>c.id===x), `${g.pagina}: relacionado inválido ${x}`);
}
console.log(`Agrupamento: ${GRUPOS.length} grupos e ${legados.length} URLs anteriores preservadas.`);

const membrana = paginaDe('bio-citologia');
assert.equal(membrana.video.id, 'wvq6CVOmkm0');
assert.equal(membrana.video.canal, 'Me Gusta Bio');
assert.ok(viewConteudo('bio-citologia').includes('Revisão parcial de Citologia'));
assert.ok(!viewConteudo('bio-citologia').includes('d3yKgcDZPSg'));
assert.equal(paginaDe('bio-citologia-anterior').video.id, 'wvq6CVOmkm0');
assert.equal(membrana.questoes.length, 3);
assert.equal(membrana.chave.length, 6);
assert.ok(membrana.questoes.every(q => q.ano === null && q.porqueErram.length === 4 && q.resolucao.length >= 3));
assert.ok(membrana.exemplos.slice(0,2).every(e=>e.comentario));
assert.equal(membrana.figuras[0].itens.length,6);
assert.ok(membrana.recomendacoes && membrana.materiaisRelacionados.some(m => m.id === 'bio-citologia-anterior'));
assert.equal(paginaDe('bio-citologia-anterior').questoes.length,3);
console.log('Citologia: tópico aprofundado e questões anteriores preservadas.');

const subtemasCitologia = paginaDe('bio-citologia').subtemas;
assert.equal(subtemasCitologia.length, 3);
for (const t of subtemasCitologia) {
  assert.ok(t.id && t.codigo && t.titulo && t.secoes.length>=3 && t.secoes.length<=5);
  assert.ok(t.secoes.every(s=>s.h && s.ps.length>=2));
  assert.ok(t.chave.length>=4 && t.chave.length<=6);
  assert.equal(t.exemplos.length, 2);
  assert.ok(t.exemplos.every(e=>e.titulo && e.texto && e.comentario));
  assert.ok(t.roteiro.length>=4 && t.roteiro.length<=6);
  assert.equal(t.questoes.length,3);
  for (const q of t.questoes) {
    assert.equal(q.ano,null);
    assert.equal(q.alternativas.length,5);
    assert.ok(/^[A-E]$/.test(q.correta));
    assert.ok(q.resolucao.length>=3 && q.porqueErram.length===4);
    const erradas='ABCDE'.split('').filter(x=>x!==q.correta);
    assert.deepEqual(q.porqueErram.map(x=>x.slice(0,1)).sort(),erradas.sort());
  }
  assert.ok(t.video.url && t.video.busca && t.fontes.length);
  const html=viewConteudo('bio-citologia');
  assert.ok(html.includes(`id="${t.id}"`));
}
console.log('Três subtemas adicionais renderizados com três questões inéditas cada.');

for (const id of ['lin-interpretacao','lin-variacao','mat-porcentagem','his-colonia']) {
  const codigoOriginal = {'lin-interpretacao':'Língua Portuguesa 1.1','lin-variacao':'Língua Portuguesa 1.2','mat-porcentagem':'Matemática 1.3','his-colonia':'História 1.1'}[id];
  const sub = paginaDe(id).subtemas.filter(t => t.codigo === codigoOriginal);
  assert.equal(sub.length,1);
  for (const t of sub) {
    assert.ok(t.secoes.length>=3 && t.secoes.length<=5 && t.secoes.every(s=>s.ps.length>=2));
    assert.ok(t.chave.length>=4 && t.chave.length<=6);
    assert.equal(t.exemplos.length,2);
    assert.ok(t.roteiro.length>=4 && t.roteiro.length<=6);
    assert.equal(t.questoes.length,3);
    for (const q of t.questoes) {
      assert.equal(q.alternativas.length,5);
      assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(), 'ABCDE'.split('').filter(x=>x!==q.correta).sort());
      assert.ok(q.resolucao.length>=3 && q.ano===null);
    }
    assert.ok(viewConteudo(id).includes(`id="${t.id}"`));
  }
}
console.log('Interpretação e variação linguística: subtemas com questões inéditas.');

const ecologia = paginaDe('bio-ecologia').subtemas;
assert.equal(ecologia.length, 3);
for (const t of ecologia) {
  assert.ok(t.secoes.length>=3 && t.secoes.length<=5 && t.secoes.every(s=>s.h && s.ps.length>=2));
  assert.ok(t.chave.length>=4 && t.chave.length<=6);
  assert.equal(t.exemplos.length,2);
  assert.ok(t.exemplos.every(e=>e.titulo && e.texto && e.comentario));
  assert.ok(t.roteiro.length>=4 && t.roteiro.length<=6);
  assert.equal(t.questoes.length,3);
  for (const q of t.questoes) {
    assert.equal(q.ano,null);
    assert.equal(q.alternativas.length,5);
    assert.ok(q.resolucao.length>=3 && q.fonte.includes('autoral'));
    assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(), 'ABCDE'.split('').filter(x=>x!==q.correta).sort());
  }
  assert.ok(t.video.busca && t.video.titulo && t.video.canal && t.video.url);
  assert.ok(viewConteudo('bio-ecologia').includes(`id="${t.id}"`));
}
assert.ok(viewConteudo('bio-ecologia').includes('WNtCkBjJ7EI'));
console.log('Ecologia: três subtemas com questões autorais e aulas específicas.');

const esperadosMat = {'mat-porcentagem':['Matemática 1.1','Matemática 1.2','Matemática 1.4'],'mat-medidas':['Matemática 1.9','Matemática 1.10','Matemática 1.11'],'mat-funcao-1':['Matemática 1.15'],'mat-combinatoria':['Matemática 1.16']};
for (const [id,codigos] of Object.entries(esperadosMat)) {
  const subtemas = paginaDe(id).subtemas.filter(t=>codigos.includes(t.codigo));
  assert.equal(subtemas.length,codigos.length);
  for (const t of subtemas) {
    assert.ok(t.secoes.length>=3 && t.secoes.length<=5 && t.secoes.every(s=>s.h && s.ps.length>=2));
    assert.ok(t.chave.length>=4 && t.chave.length<=6);
    assert.equal(t.exemplos.length,2);
    assert.ok(t.exemplos.every(e=>e.titulo && e.texto && e.comentario));
    assert.ok(t.roteiro.length>=4 && t.roteiro.length<=6);
    assert.ok(t.questoes.length>=2 && t.questoes.length<=3);
    for (const q of t.questoes) {
      assert.equal(q.ano,null); assert.ok(q.fonte.includes('autoral'));
      assert.equal(q.alternativas.length,5); assert.ok(q.resolucao.length>=3);
      assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());
    }
    assert.ok(t.video.busca && t.video.titulo && t.video.canal && t.video.url);
    assert.ok(viewConteudo(id).includes(`id="${t.id}"`));
  }
}
console.log('Matemática: oito subtemas aprofundados com questões autorais e aulas específicas.');
const geometriaFuncoes = {'mat-geo-plana':['Matemática 1.5','Matemática 1.6'], 'mat-geo-espacial':['Matemática 1.7','Matemática 1.8'], 'mat-funcao-1':['Matemática 1.12','Matemática 1.13','Matemática 1.14']};
for (const [id,codigos] of Object.entries(geometriaFuncoes)) {
 const temas=paginaDe(id).subtemas.filter(t=>codigos.includes(t.codigo));
 assert.equal(temas.length,codigos.length);
 for(const t of temas) {
  assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));
  assert.ok(t.chave.length>=4&&t.chave.length<=6); assert.equal(t.exemplos.length,2);
  assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));
  assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6); assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
  for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
  assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo(id).includes(`id="${t.id}"`));
 }
}
console.log('Geometria e funções: sete subtemas com questões autorais e aulas.');
const portAplicado = {'lin-interpretacao':['Língua Portuguesa 1.3','Língua Portuguesa 1.4','Língua Portuguesa 1.5','Língua Portuguesa 1.6'],'lin-variacao':['Língua Portuguesa 1.7']};
for(const [id,codigos] of Object.entries(portAplicado)) {
 const temas=paginaDe(id).subtemas.filter(t=>codigos.includes(t.codigo)); assert.equal(temas.length,codigos.length);
 for(const t of temas) {
  assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));
  assert.ok(t.chave.length>=4&&t.chave.length<=6);assert.equal(t.exemplos.length,2);assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));
  assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6);assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
  for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
  assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo(id).includes(`id="${t.id}"`));
 }
}
console.log('Português: cinco subtemas com questões autorais e aulas específicas.');

const literatura = paginaDe('lit-modernismo').subtemas;
assert.equal(literatura.length, 7);
assert.deepEqual(literatura.map(t=>t.codigo),Array.from({length:7},(_,i)=>`Literatura 2.${i+1}`));
for (const t of literatura) {
 assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));
 assert.ok(t.chave.length>=4&&t.chave.length<=6); assert.equal(t.exemplos.length,2);
 assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));
 assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6);assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
 for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
 assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo('lit-modernismo').includes(`id="${t.id}"`));
}
assert.ok(viewConteudo('lit-modernismo').includes('bC_SwIxKd5U'));
console.log('Literatura: sete subtemas com questões autorais e aulas específicas.');

const artesEcorpo = {'art-vanguardas':['Artes e Educação Física 3.1','Artes e Educação Física 3.2','Artes e Educação Física 3.3'],'edf-corporal':['Artes e Educação Física 3.4','Artes e Educação Física 3.5']};
for(const [id,codigos] of Object.entries(artesEcorpo)){
 const temas=paginaDe(id).subtemas.filter(t=>codigos.includes(t.codigo));assert.equal(temas.length,codigos.length);
 for(const t of temas){assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));assert.ok(t.chave.length>=4&&t.chave.length<=6);assert.equal(t.exemplos.length,2);assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6);assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
 for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
 assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo(id).includes(`id="${t.id}"`));}
}
console.log('Artes e Educação Física: cinco tópicos com questões autorais e aulas.');

const linguas=paginaDe('ing-interpretacao').subtemas;
assert.equal(linguas.length,4);
assert.deepEqual(linguas.map(t=>t.codigo),Array.from({length:4},(_,i)=>`Língua Estrangeira 4.${i+1}`));
for(const t of linguas){assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));assert.ok(t.chave.length>=4&&t.chave.length<=6);assert.equal(t.exemplos.length,2);assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6);assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
 for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
 assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo('ing-interpretacao').includes(`id="${t.id}"`));assert.ok(t.aulasComplementares?.length);
}
console.log('Língua estrangeira: quatro subtemas bilíngues com questões e aulas.');

const { distribuirAlternativas } = await import('../js/db/conteudos/alternativas-autorais.js');
const originalAlternativas = {textoApoio:['Exemplo'],alternativas:['A original','B original','C original','D original','E original'],correta:'A',resolucao:['A alternativa A é correta.','A é correta.','Logo, A.'],porqueErram:['B: comentário B','C: comentário C','D: comentário D','E: comentário E']};
const distribuida = distribuirAlternativas(originalAlternativas);
assert.equal(distribuida.alternativas['ABCDE'.indexOf(distribuida.correta)],'A original');
assert.ok(distribuida.resolucao.every(x=>x.includes(distribuida.correta)));
for(const comentario of distribuida.porqueErram){const antigo=originalAlternativas.porqueErram.find(x=>x.slice(2)===comentario.slice(2));assert.equal(distribuida.alternativas['ABCDE'.indexOf(comentario[0])],originalAlternativas.alternativas['ABCDE'.indexOf(antigo[0])]);}
assert.deepEqual(distribuirAlternativas(originalAlternativas),distribuida);
console.log('Distribuição de alternativas preserva resposta, resolução e comentários.');

const bioVida={'bio-genetica':['Biologia 1.8','Biologia 1.9'],'bio-evolucao':['Biologia 1.10'],'bio-fisiologia':['Biologia 1.11','Biologia 1.12']};
for(const [id,codigos] of Object.entries(bioVida)){
 const temas=paginaDe(id).subtemas.filter(t=>codigos.includes(t.codigo));assert.equal(temas.length,codigos.length);
 for(const t of temas){assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));assert.ok(t.chave.length>=4&&t.chave.length<=6);assert.equal(t.exemplos.length,2);assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6);assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
 for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
 assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo(id).includes(`id="${t.id}"`));}
}
console.log('Biologia: cinco subtemas adicionais com questões autorais e recomendações.');

const quiInicial={'qui-ligacoes':['Química 3.1','Química 3.2','Química 3.3','Química 3.4'],'qui-solucoes':['Química 3.5']};
for(const [id,codigos] of Object.entries(quiInicial)){
 const temas=paginaDe(id).subtemas.filter(t=>codigos.includes(t.codigo));assert.equal(temas.length,codigos.length);
 for(const t of temas){assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));assert.ok(t.chave.length>=4&&t.chave.length<=6);assert.equal(t.exemplos.length,2);assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6);assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
 for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
 assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo(id).includes(`id="${t.id}"`));}
}
console.log('Química: cinco subtemas adicionais com questões autorais e recomendações.');

const quiFinal={'qui-solucoes':['Química 3.6','Química 3.7','Química 3.8','Química 3.9'],'qui-organica':['Química 3.10','Química 3.11','Química 3.12'],'qui-ambiental':['Química 3.13']};
for(const [id,codigos] of Object.entries(quiFinal)){
 const temas=paginaDe(id).subtemas.filter(t=>codigos.includes(t.codigo));assert.equal(temas.length,codigos.length);
 for(const t of temas){assert.ok(t.secoes.length>=3&&t.secoes.length<=5&&t.secoes.every(s=>s.h&&s.ps.length>=2));assert.ok(t.chave.length>=4&&t.chave.length<=6);assert.equal(t.exemplos.length,2);assert.ok(t.exemplos.every(e=>e.titulo&&e.texto&&e.comentario));assert.ok(t.roteiro.length>=4&&t.roteiro.length<=6);assert.ok(t.questoes.length>=2&&t.questoes.length<=3);
 for(const q of t.questoes){assert.equal(q.ano,null);assert.ok(q.fonte.includes('autoral'));assert.equal(q.alternativas.length,5);assert.ok(q.resolucao.length>=3);assert.deepEqual(q.porqueErram.map(x=>x[0]).sort(),'ABCDE'.split('').filter(x=>x!==q.correta).sort());}
 assert.ok(t.video.busca&&t.video.titulo&&t.video.canal&&t.video.url);assert.ok(viewConteudo(id).includes(`id="${t.id}"`));}
}
console.log('Química: oito subtemas finais com questões autorais e recomendações.');
