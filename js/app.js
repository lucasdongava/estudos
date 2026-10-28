/* Thoth — tema claro/escuro, abas do exemplo de código e entrada suave das seções */
const $ = s => document.querySelector(s);

$('#themeBtn').onclick = () => {
  const cur = document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const nx = cur === 'dark' ? 'light' : 'dark';
  const apply = () => { document.documentElement.dataset.theme = nx; if (window.syncFramesTheme) syncFramesTheme(); };
  try { localStorage.setItem('estudos:tema', nx); } catch (e) {}
  if (document.startViewTransition && !matchMedia('(prefers-reduced-motion: reduce)').matches) document.startViewTransition(apply); else apply();
};

// links das disciplinas: quando os subdomínios estiverem ativos, troque só aqui
const SITES = {
  lab2: 'https://lucasdongava.github.io/lab2/',
  poo: 'https://lucasdongava.github.io/projeto-orientado-objeto/'
};
document.querySelectorAll('[data-site]').forEach(a => { if (SITES[a.dataset.site]) a.href = SITES[a.dataset.site]; });
window.SITES = SITES;

// exemplo interativo: a aula "se resolvendo" em fluxo (ler > rodar > resolver); as pílulas também são clicáveis
(() => {
  const box = $('[data-tabs]'), tabs = box.querySelectorAll('.tab'), panes = box.querySelectorAll('[data-p]');
  const lines = [...box.querySelectorAll('.ln')], op = $('#op'), runBtn = $('#runBtn'), out = $('#out'), outTxt = $('#outTxt'), badge = $('#okBadge'), hint = $('#hint');
  const pills = [...document.querySelectorAll('.pill')];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const HINTS = [
    'Leia a aula: a função soma recebe dois números inteiros e devolve o resultado.',
    'Rode o exemplo: o resultado aparece na hora, aqui mesmo no navegador. Sem instalar nada.',
    'Resolva o exercício: troque o + por * (clique no operador) e rode de novo.'
  ];
  let tok = 0, cur = 0, auto = true, visible = false, started = false;
  const sleep = (ms, t) => new Promise(r => setTimeout(() => r(t === tok), RM ? 0 : ms));
  const setHint = i => { hint.classList.add('fade'); setTimeout(() => { hint.textContent = HINTS[i]; hint.classList.remove('fade'); }, RM ? 0 : 280); };
  const DUR = [3600, 2700, 4200];  // tempo de cada etapa: o contorno da pílula se completa em verde nesse tempo
  const mark = i => pills.forEach((p, k) => { p.classList.remove('on'); p.classList.toggle('done', k < i); p.setAttribute('aria-selected', String(k === i)); if (k === i) { void p.offsetWidth; p.style.setProperty('--dur', DUR[i] + 'ms'); p.classList.add('on'); } });
  const hl = (...ix) => lines.forEach((l, k) => l.classList.toggle('hl', ix.includes(k)));
  // cada linha guarda seus trechos de texto originais, para o código poder ser "digitado" mantendo as cores
  const tnodes = l => { const w = document.createTreeWalker(l, NodeFilter.SHOW_TEXT), a = []; while (w.nextNode()) a.push(w.currentNode); return a; };
  const orig = lines.map(l => tnodes(l).map(n => [n, n.data]));
  const fill = () => orig.forEach(a => a.forEach(([n, d]) => { if (!op.contains(n)) n.data = d; }));  // o operador (+ ou *) mantém o valor atual
  const showLines = async () => { fill(); lines.forEach(l => l.classList.add('in')); return true; };
  async function typeCode(t) {
    orig.forEach(a => a.forEach(([n]) => { n.data = ''; }));
    lines.forEach(l => l.classList.add('in'));
    const caret = document.createElement('i'); caret.className = 'tcaret';
    for (let k = 0; k < lines.length; k++) {
      lines[k].append(caret);
      for (const [n, d] of orig[k]) for (const ch of d) { n.data += ch; if (ch !== ' ' && !(await sleep(16, t))) { caret.remove(); return false; } }
      if (!(await sleep(70, t))) { caret.remove(); return false; }
    }
    caret.remove(); return true;
  }
  const hideOut = () => { out.classList.remove('on'); badge.classList.remove('on'); outTxt.textContent = ''; };
  const setOp = v => { if (op.textContent !== v) { op.textContent = v; op.classList.remove('swap'); void op.offsetWidth; op.classList.add('swap'); } };
  const result = () => op.textContent === '+' ? 12 : 35;
  async function typeOut(str, t) { outTxt.textContent = ''; for (const ch of str) { outTxt.textContent += ch; if (!(await sleep(28, t))) return false; } return true; }
  async function execute(t, withPress) {
    if (withPress) { runBtn.classList.add('press'); if (!(await sleep(160, t))) return false; runBtn.classList.remove('press'); }
    runBtn.classList.add('busy'); badge.classList.remove('on'); out.classList.add('on'); outTxt.textContent = 'Executando…';
    if (!(await sleep(450, t))) return false;
    runBtn.classList.remove('busy'); hl(4, 5);
    if (!(await typeOut('Total: ' + result(), t))) return false;
    if (op.textContent === '*') badge.classList.add('on');
    return true;
  }
  const steps = [
    async t => { hideOut(); setOp('+'); fill(); lines.forEach(l => l.classList.remove('in', 'hl')); if (!(await sleep(200, t))) return false;
      if (!(await typeCode(t))) return false; hl(0, 1, 2); return true; },
    async t => { hideOut(); setOp('+'); await showLines(); hl(); if (!(await sleep(250, t))) return false;
      return execute(t, true); },
    async t => { hideOut(); setOp('+'); await showLines(); hl(1); op.classList.add('flash'); if (!(await sleep(900, t))) return false;
      op.classList.remove('flash'); setOp('*'); if (!(await sleep(500, t))) return false;
      return execute(t, true); }
  ];  async function play(i) {
    const t = ++tok, t0 = Date.now(); cur = i; mark(i); setHint(i); op.classList.remove('flash');
    if (!(await steps[i](t))) return;
    if (!(await sleep(Math.max(0, DUR[i] - (Date.now() - t0)), t))) return;
    if (i < 2) pills[i].classList.add('done');
    if (auto && visible) play((i + 1) % 3);
  }
  // o usuário assume o controle
  const stop = () => { tok++; auto = false; op.classList.remove('flash'); runBtn.classList.remove('busy', 'press'); };
  pills.forEach(p => p.onclick = () => { auto = true; play(+p.dataset.i); });
  op.onclick = () => { stop(); showLines(); out.classList.remove('on'); badge.classList.remove('on'); setOp(op.textContent === '+' ? '*' : '+'); hl(1); };
  runBtn.onclick = async () => { stop(); const t = tok; await showLines(); await execute(t, false); };
  tabs.forEach(tb => tb.onclick = () => {
    tabs.forEach(x => { x.classList.toggle('on', x === tb); x.setAttribute('aria-selected', String(x === tb)); });
    panes.forEach(p => { p.hidden = p.dataset.p !== tb.dataset.t; });
    box.classList.toggle('uml', tb.dataset.t === 'uml');
    $('#copyBtn').textContent = 'Copiar';
  });
  $('#copyBtn').onclick = async e => {
    const txt = box.classList.contains('uml') ? box.querySelector('[data-p="uml"]').innerText : lines.map(l => l.textContent).join('\n');
    try { await navigator.clipboard.writeText(txt); e.target.textContent = 'Copiado ✓'; } catch (err) { e.target.textContent = 'Não foi possível'; }
    setTimeout(() => { e.target.textContent = 'Copiar'; }, 1600);
  };
  // começa quando a seção aparece e pausa quando sai da tela
  hint.textContent = HINTS[0];
  new IntersectionObserver(es => es.forEach(e => {
    visible = e.isIntersecting;
    if (visible && !started) { started = true; if (RM) { auto = false; showLines(); hl(0, 1, 2); } else play(0); }
    else if (visible && auto && started) play(cur);
    else if (!visible) tok++;
  }), { threshold: 0.45 }).observe(box);
})();
// janela com os sites de verdade: abas com crossfade, escala automática e tema sincronizado
(() => {
  const box = $('[data-shots]'), stage = $('#stage'), tabs = [...box.querySelectorAll('.stab')], layers = [...box.querySelectorAll('.layer')];
  const ind = box.querySelector('.ind'), openNew = $('#openNew');
  const themeNow = () => document.documentElement.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const postTheme = f => { try { f.contentWindow.postMessage({ estudosTema: themeNow() }, '*'); } catch (e) {} };
  const frames = layers.map(l => l.querySelector('iframe'));
  const urlOf = l => { const f = l.querySelector('iframe'); return f.dataset.src; };
  const moveInd = () => { const on = tabs.find(x => x.classList.contains('on')); if (on) { ind.style.width = on.offsetWidth + 'px'; ind.style.transform = `translateX(${on.offsetLeft}px)`; } };
  const fit = () => {
    const w = stage.clientWidth, big = w >= 720;
    frames.forEach(f => {
      if (big) { const sc = w / 1280; f.style.width = '1280px'; f.style.height = (stage.clientHeight / sc) + 'px'; f.style.transform = `scale(${sc})`; }
      else { f.style.width = '100%'; f.style.height = '100%'; f.style.transform = 'none'; }
    });
  };
  const load = l => { const f = l.querySelector('iframe'); if (f.src) return; f.addEventListener('load', () => { l.classList.add('ready'); postTheme(f); }, { once: true }); f.src = f.dataset.src; };
  const select = key => {
    tabs.forEach(x => { const on = x.dataset.s === key; x.classList.toggle('on', on); x.setAttribute('aria-selected', String(on)); });
    layers.forEach(l => { const on = l.dataset.sp === key; l.classList.toggle('on', on); if (on) { load(l); openNew.href = urlOf(l); } });
    moveInd();
  };
  tabs.forEach(t => t.onclick = () => select(t.dataset.s));
  addEventListener('resize', () => { fit(); moveInd(); });
  fit(); select('lab2');
  document.fonts && document.fonts.ready.then(moveInd);
  // carrega o site só quando a seção chega perto da tela; o outro carrega em segundo plano depois
  new IntersectionObserver((es, io) => { if (es[0].isIntersecting) { io.disconnect(); load(layers[0]); setTimeout(() => layers.forEach(load), 1500); } }, { rootMargin: '300px' }).observe(box);
  // mantém o tema dos sites igual ao da página
  window.syncFramesTheme = () => frames.forEach(postTheme);
})();
// revela os blocos ao rolar
(() => {
  const els = [...document.querySelectorAll('.strip article, .shotwin, .code, .site, .sites h2, .code-sec h2, .sublead, .steps-pills')];
  if (!('IntersectionObserver' in window)) return;
  els.forEach(el => { el.classList.add('reveal'); const sib = [...el.parentElement.children].filter(x => els.includes ? els.includes(x) : [...els].includes(x)); el.style.transitionDelay = (sib.indexOf(el) * 110) + 'ms'; });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { const el = e.target; el.classList.add('in'); io.unobserve(el); setTimeout(() => { el.classList.remove('reveal', 'in'); el.style.transitionDelay = ''; }, 1300 + parseInt(el.style.transitionDelay || 0)); } }), { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
  els.forEach(el => io.observe(el));
})();
