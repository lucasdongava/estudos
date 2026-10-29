/* Thoth — idiomas (pt-BR e en). Elementos marcados com data-i18n / data-i18n-html / data-i18n-attr */
const I18N = {
  pt: {
    meta: 'Thoth: as matérias mais difíceis da faculdade explicadas de forma simples e rápida, com aulas curtas, exercícios, resumos e progresso.',
    ann: 'Novas disciplinas entram aqui conforme ficam prontas', annLink: 'Ver disciplinas',
    logoAria: 'Thoth: início da página', navAria: 'Seções', navProj: 'O projeto', navPlat: 'Plataforma', navDisc: 'Disciplinas',
    themeAria: 'Alternar tema', langAria: 'Idioma', ctaStart: 'Começar a estudar', ctaMore: 'Conhecer o projeto',
    h1: 'As matérias mais difíceis, explicadas de um jeito simples.',
    lead: 'Aulas diretas, exemplos que você pode rodar e exercícios para fixar. Feito para entender de verdade, sem enrolação e sem perder tempo.',
    stripAria: 'Pilares do projeto',
    p1t: 'Direto ao ponto', p1d: 'Cada matéria é dividida em aulas curtas, do básico ao desafio, com um resumo para a véspera da prova.',
    p2t: 'Aprenda praticando', p2d: 'Exercícios e testes rápidos em cada aula. No LabII você escreve e executa código Java direto no navegador.',
    p3t: 'Progresso de verdade', p3d: 'Um painel mostra o que você já domina e onde ainda erra. Tudo fica salvo no seu navegador, sem conta e sem rastreio.',
    tabsAria: 'Disciplinas', openNew: 'Abrir em nova aba',
    navHint: 'É o site de verdade: clique nas aulas do menu, role a página e teste à vontade.',
    codeH: 'Estude com a mão na massa.',
    codeSub: 'Leia a teoria, rode o exemplo e confira o resultado. Cada aula traz código e diagramas prontos para você mexer.',
    stepsAria: 'Etapas de uma aula', s1: 'Leia a aula', s2: 'Rode o exemplo', s3: 'Resolva o exercício',
    run: 'Executar', runAria: 'Executar o código', copy: 'Copiar', copyAria: 'Copiar código', copied: 'Copiado ✓', copyFail: 'Não foi possível',
    opTitle: 'Clique para trocar o operador', opAria: 'Operador, clique para trocar',
    outH: 'Saída', solved: '✓ Resolvido', empty: 'Clique em Executar para ver o resultado.', running: 'Executando…',
    h0: 'Leia a aula: a função soma recebe dois números inteiros e devolve o resultado.',
    h1h: 'Rode o exemplo: o resultado aparece na hora, aqui mesmo no navegador. Sem instalar nada.',
    h2h: 'Resolva o exercício: troque o + por * (clique no operador) e rode de novo.',
    uml: '<span class="k">Aluno</span>  ──────▶  <span class="k">Matrícula</span>  ──────▶  <span class="k">Disciplina</span>\n nome            data                  nome\n email           situação              créditos\n matricular()    trancar()             vagas()\n\n<span class="c">// associação 1 .. * entre Aluno e Matrícula</span>',
    sitesH: 'Escolha por onde começar.',
    sitesSub: 'Cada card abre um site independente. Novas disciplinas entram aqui conforme forem ficando prontas.',
    live: 'No ar',
    labD: 'Laboratório de Programação II: fundamentos de Java, estruturas de controle, vetores, métodos e exceções, com editor para escrever e executar código ali mesmo.',
    lab1: 'Aulas e projetos guiados', lab2: 'Editor com execução no navegador', lab3: 'Resumo e painel de progresso', labBtn: 'Abrir o LabII',
    pooD: 'Modelagem e análise de sistemas: diagramas UML, diagramas de sequência, modelagem de dados e testes, explicados passo a passo com exemplos.',
    poo1: 'Aulas por unidade, de 0 a 3', poo2: 'Testes rápidos e exercícios', poo3: 'Resumo para a prova e painel de domínio', pooBtn: 'Abrir o Projeto OO',
    nameLab: 'LabII - Java', namePoo: 'Projeto Orientado a Objetos',
    foot: 'Material de estudo independente, feito por Lucas Gava.'
  },
  en: {
    meta: 'Thoth: the hardest college courses explained in a simple, fast way, with short lessons, exercises, summaries and progress tracking.',
    ann: 'New courses show up here as they get ready', annLink: 'See courses',
    logoAria: 'Thoth: top of the page', navAria: 'Sections', navProj: 'The project', navPlat: 'Platform', navDisc: 'Courses',
    themeAria: 'Toggle theme', langAria: 'Language', ctaStart: 'Start studying', ctaMore: 'About the project',
    h1: 'The hardest courses, explained in a simple way.',
    lead: 'Straight-to-the-point lessons, examples you can run and exercises to lock it in. Built to help you truly understand, with no fluff and no wasted time.',
    stripAria: 'Project pillars',
    p1t: 'Straight to the point', p1d: 'Each course is split into short lessons, from the basics to the challenge, with a summary for the night before the exam.',
    p2t: 'Learn by doing', p2d: 'Exercises and quick quizzes in every lesson. In Lab II you write and run Java code right in the browser.',
    p3t: 'Real progress', p3d: 'A dashboard shows what you have mastered and where you still slip. Everything is saved in your own browser, with no account and no tracking.',
    tabsAria: 'Courses', openNew: 'Open in new tab',
    navHint: 'This is the real site: click the lessons in the menu, scroll and try it out. The courses themselves are in Portuguese.',
    codeH: 'Learn hands-on.',
    codeSub: 'Read the theory, run the example and check the result. Every lesson comes with code and diagrams ready for you to play with.',
    stepsAria: 'Lesson steps', s1: 'Read the lesson', s2: 'Run the example', s3: 'Solve the exercise',
    run: 'Run', runAria: 'Run the code', copy: 'Copy', copyAria: 'Copy code', copied: 'Copied ✓', copyFail: 'Could not copy',
    opTitle: 'Click to swap the operator', opAria: 'Operator, click to swap',
    outH: 'Output', solved: '✓ Solved', empty: 'Click Run to see the result.', running: 'Running…',
    h0: 'Read the lesson: the soma function takes two integers and returns their sum.',
    h1h: 'Run the example: the result shows up instantly, right here in the browser. Nothing to install.',
    h2h: 'Solve the exercise: swap + for * (click the operator) and run again.',
    uml: '<span class="k">Student</span>  ──────▶  <span class="k">Enrollment</span>  ──────▶  <span class="k">Course</span>\n name            date                  name\n email           status                credits\n enroll()        withdraw()            seats()\n\n<span class="c">// 1 .. * association between Student and Enrollment</span>',
    sitesH: 'Pick where to start.',
    sitesSub: 'Each card opens an independent site. New courses are added here as they get ready. The courses are currently in Portuguese.',
    live: 'Live',
    labD: 'Programming Lab II: Java fundamentals, control structures, arrays, methods and exceptions, with an editor to write and run code right there.',
    lab1: 'Guided lessons and projects', lab2: 'In-browser code editor', lab3: 'Summary and progress dashboard', labBtn: 'Open Lab II',
    pooD: 'Systems modeling and analysis: UML diagrams, sequence diagrams, data modeling and testing, explained step by step with examples.',
    poo1: 'Lessons by unit, 0 to 3', poo2: 'Quick quizzes and exercises', poo3: 'Exam summary and mastery dashboard', pooBtn: 'Open the OO Project',
    nameLab: 'Programming Lab II - Java', namePoo: 'Object-Oriented Project',
    foot: 'Independent study material, made by Lucas Gava.'
  }
};

let LANG = 'pt';
try { const s = localStorage.getItem('thoth:lang'); LANG = s === 'en' || s === 'pt' ? s : (/^pt/i.test(navigator.language || '') ? 'pt' : 'en'); } catch (e) {}
const T = k => (I18N[LANG] && I18N[LANG][k]) || I18N.pt[k] || k;

function applyLang(l, persist) {
  LANG = l;
  document.documentElement.lang = l === 'en' ? 'en' : 'pt-BR';
  document.querySelectorAll('[data-i18n]').forEach(el => { el.textContent = T(el.dataset.i18n); });
  document.querySelectorAll('[data-i18n-html]').forEach(el => { el.querySelector('code').innerHTML = T(el.dataset.i18nHtml); });
  document.querySelectorAll('[data-i18n-attr]').forEach(el => el.dataset.i18nAttr.split(',').forEach(pair => { const [a, k] = pair.split(':'); el.setAttribute(a, T(k)); }));
  const meta = document.querySelector('meta[name="description"]'); if (meta) meta.content = T('meta');
  document.querySelectorAll('#langMenu [data-l]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.l === l)));
  if (persist) { try { localStorage.setItem('thoth:lang', l); } catch (e) {} }
  document.dispatchEvent(new CustomEvent('langchange', { detail: l }));
}
