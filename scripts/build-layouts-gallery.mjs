import fs from 'node:fs';
const S='/tmp/claude-0/-home-claude/07ca4d88-6227-5bb6-96fe-05f324eb7c57/scratchpad';
const R=S+'/awda';

// ── 1. the design system's own CSS, re-scoped from <body> to any container ──
let css = fs.readFileSync(R+'/src/core/style.css','utf8') + '\n' + fs.readFileSync(R+'/src/core/layout.css','utf8');
css = css.replace(/@font-face\{[^}]*\}\n?/g,'');            // Google Fonts supplies the faces here
css = css.replace(/html,body\{[^}]*\}\n?/g,'');
css = css.replace(/html\{-webkit-text-size-adjust:100%\}\n?/g,'');
css = css.replace(/\nbody\{\n[\s\S]*?\n\}/, '\n.phone{\n  font-family:Plex,"IBM Plex Sans Arabic",system-ui,sans-serif;\n  font-size:var(--t-base);line-height:var(--lh);color:var(--ink);background:var(--bg);\n  direction:rtl;text-align:start;-webkit-font-smoothing:antialiased;\n}');
css = css.replace(/body\[data-/g,'[data-');
css = css.replace(/#app\{/,'.phone .app{');
css = css.replace(/\.tabs\{position:fixed/,'.tabs{position:absolute');
// Guard, corrected: the first version matched `.body{` and a `body[data-quran]`
// mention INSIDE a comment, and cried wolf on clean output. Strip comments, then
// require the token to actually start a selector.
{
  const bare = css.replace(/\/\*[\s\S]*?\*\//g,'');
  const bad = bare.match(/(^|[\n,{}])\s*body\s*[[{.:]/g);
  if (bad) throw new Error('body selector survived the rescope: '+bad.join(' | '));
}

// ── 2. the real screens, pulled out of the running app ──────────────────────
const SC = JSON.parse(fs.readFileSync(S+'/screens.json','utf8'));
const mod = await import(R+'/src/core/palettes.js');
const LAY = (await import(R+'/src/core/layouts.js')).LAYOUTS;
const DATA = {
  screens:{
    home:{ar:'الرئيسيّة',view:SC.home.view,tabs:SC.home.tabs,ground:''},
    qada:{ar:'القضاء',view:SC.qada.view,tabs:SC.qada.tabs,ground:''},
    ihtidar:{ar:'الاحتضار',view:SC.ihtidar.view,tabs:SC.ihtidar.tabs,ground:'shroud'},
  },
  palettes: mod.PALETTES.map(p=>({key:p.key,ar:p.ar,en:p.en,note:p.note,v:p.v,flat:p.v['head-flat']})),
  grounds: Object.fromEntries(Object.entries(mod.GROUNDS).map(([k,g])=>[k,g.v])),
  // the six that had no CSS at all before today — marked so the review is honest
  built: ['cards','shelves','path','ring','sheets','portal'],
  layouts: LAY.map(l=>({key:l.key,ar:l.ar,en:l.en,family:l.family,best:l.best||'',note:l.note,why:l.why})),
};

const FAM={page:'صفحة',grid:'شبكة',dense:'كثيف',form:'هيئة'};

const html = `<title>عَوْدة — اثنا عشر تخطيطاً</title>
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Noto+Kufi+Arabic:wght@400;600;700&family=IBM+Plex+Sans+Arabic:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=Amiri+Quran&display=swap">
<style id="awda-system">\n/* The product's own stylesheet, verbatim except for the rescope\n   documented in layout.css: body[data-x] becomes [data-x] so twelve layouts can\n   be rendered on one page. Nothing else is altered. */\n${css}\n</style>\n\n<style>\n/* ── THE REVIEW DESK ─────────────────────────────────────────────────────────
   Deliberately single-theme. This is an instrument surround, not a document:
   the twelve layouts are all light designs, and a dark bench is what stops the
   page's own colour from contaminating a judgement about theirs. Every value is
   painted explicitly so it holds on either host ground. The palette is the
   repo's own desk chrome from index.html, not a new invention. */
:root{
  --desk:#0E1114; --panel:#161A1E; --panel-2:#1B2126; --edge:#262D33;
  --txt:#E6EDF2; --mut:#8A959C; --acc:#57D8A2; --warn:#E8B75B;
  --mono:'IBM Plex Mono',ui-monospace,monospace;
  --kufi:'Noto Kufi Arabic','Noto Sans Arabic',sans-serif;
  --sans:'IBM Plex Sans Arabic',system-ui,sans-serif;
}
*,*::before,*::after{box-sizing:border-box}
body{margin:0;background:var(--desk);color:var(--txt);font-family:var(--sans);
  -webkit-font-smoothing:antialiased}
@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}

.gx-bar{background:var(--desk);border-bottom:1px solid var(--edge)}
.gx-stick{position:sticky;top:env(safe-area-inset-top,0px);z-index:50;
  background:rgba(14,17,20,.95);backdrop-filter:blur(14px);border-bottom:1px solid var(--edge)}
.gx-stick .gx-barin{padding-top:9px;padding-bottom:8px}
.gx-barin{max-width:1080px;margin-inline:auto;padding:12px 16px 10px}
.gx-brand{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:10px}
.gx-brand h1{font-family:var(--kufi);font-size:19px;font-weight:700;margin:0;letter-spacing:0}
.gx-brand .gx-sub{font-family:var(--mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--mut)}

.gx-grp{margin-bottom:9px}
.gx-grp:last-child{margin-bottom:0}
.gx-lab{font-family:var(--mono);font-size:9.5px;letter-spacing:.16em;text-transform:uppercase;
  color:var(--mut);display:block;margin-bottom:6px}
.gx-chips{display:flex;gap:6px;overflow-x:auto;padding-bottom:3px;scrollbar-width:none}
.gx-chips::-webkit-scrollbar{display:none}
.gx-chip{flex:0 0 auto;min-height:44px;display:inline-flex;align-items:center;gap:7px;
  padding:0 13px;border-radius:11px;border:1px solid var(--edge);background:var(--panel);
  color:var(--txt);font-family:var(--kufi);font-size:14px;font-weight:600;cursor:pointer;
  transition:border-color .16s,background .16s}
.gx-chip:hover{border-color:#39434B}
.gx-chip:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
.chip[aria-pressed="true"]{background:var(--acc);border-color:var(--acc);color:#07120D}
.gx-chip .gx-en{font-family:var(--mono);font-size:9.5px;letter-spacing:.08em;opacity:.62;text-transform:uppercase}
.gx-chip .gx-new{width:6px;height:6px;border-radius:50%;background:var(--warn);flex:none}
.chip[aria-pressed="true"] .gx-new{background:#07120D}
.gx-sw{width:17px;height:17px;border-radius:5px;flex:none;border:1px solid rgba(255,255,255,.22)}

.gx-stage{max-width:1080px;margin-inline:auto;padding:18px 16px 56px}
.gx-why{border:1px solid var(--edge);background:var(--panel);border-radius:14px;padding:14px 16px;
  margin-bottom:18px}
.gx-why .gx-ttl{display:flex;align-items:baseline;gap:9px;flex-wrap:wrap;margin-bottom:7px}
.gx-why .gx-ttl b{font-family:var(--kufi);font-size:17px;font-weight:700}
.gx-why .gx-ttl .gx-meta{font-family:var(--mono);font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--mut)}
.gx-why p{margin:0 0 5px;font-size:14.5px;line-height:1.75;direction:rtl;text-align:right;max-width:66ch}
.gx-why p.note{color:var(--mut);font-size:13px;margin-bottom:0}
.gx-flag{display:inline-flex;align-items:center;gap:6px;font-family:var(--mono);font-size:9.5px;
  letter-spacing:.1em;text-transform:uppercase;color:var(--warn)}
.gx-flag i{width:6px;height:6px;border-radius:50%;background:var(--warn);display:block}

/* one phone, full-bleed on a phone, framed on a desk — reviewed at 390 either way */
.gx-wrapp{display:flex;justify-content:center}
.phone{--col:100%;width:min(390px,100%);height:748px;position:relative;overflow:hidden;border-radius:26px;
  border:1px solid var(--edge)}
.phone .view-scroll{position:absolute;inset:0;overflow-y:auto;overflow-x:hidden;background:var(--bg)}
.phone .app{padding-bottom:84px}
@media (min-width:760px){ .phone{border-radius:38px;box-shadow:0 0 0 9px #1B2025,0 24px 64px rgba(0,0,0,.55)} }

/* the contact sheet: all twelve at a glance, because a switcher alone never
   answers "which of these is even in the running" */
.gx-sheet{display:grid;grid-template-columns:repeat(auto-fill,minmax(148px,1fr));gap:14px}
.gx-mini{border:1px solid var(--edge);border-radius:13px;overflow:hidden;background:var(--panel);
  cursor:pointer;padding:0;text-align:inherit;font:inherit;color:inherit;display:block}
.gx-mini:focus-visible{outline:2px solid var(--acc);outline-offset:2px}
.mini[aria-pressed="true"]{border-color:var(--acc)}
.gx-mini .gx-win{height:236px;overflow:hidden;position:relative;background:#fff}
.gx-mini .gx-win .phone{--col:100%;transform:scale(.3795);transform-origin:top left;width:390px;height:622px;
  border:0;border-radius:0;position:absolute;top:0;left:0;pointer-events:none}
.gx-mini .gx-cap{display:flex;align-items:center;gap:7px;padding:9px 11px;border-top:1px solid var(--edge);
  min-height:44px}
.gx-mini .gx-cap b{font-family:var(--kufi);font-size:13.5px;font-weight:600}
.gx-mini .gx-cap .gx-en{font-family:var(--mono);font-size:9px;letter-spacing:.07em;text-transform:uppercase;
  color:var(--mut);margin-inline-start:auto}
.gx-foot{max-width:1080px;margin:0 auto;padding:0 16px 40px;color:var(--mut);font-size:12.5px;line-height:1.8}
.gx-foot code{font-family:var(--mono);font-size:11.5px;color:var(--txt)}
</style>

<header class="gx-bar">
  <div class="gx-barin">
    <div class="gx-brand">
      <h1>عَوْدة — اثنا عشر تخطيطاً</h1>
      <span class="gx-sub">build 8 · layouts axis · 390px</span>
    </div>
    <div class="gx-grp"><span class="gx-lab">اللون · palette — hold this constant while you compare</span><div class="gx-chips" id="cp"></div></div>
    <div class="gx-grp"><span class="gx-lab">الشاشة · screen</span><div class="gx-chips" id="cs"></div></div>
  </div>
</header>

<!-- Only this row follows you. The full bar was 308px tall on a 390px phone, which
     is a third of the screen given to controls; palette and screen are set once and
     the layout row is the one you tap over and over. -->
<div class="gx-stick">
  <div class="gx-barin">
    <span class="gx-lab">التخطيط · layout (structure)</span><div class="gx-chips" id="cl"></div>
  </div>
</div>

<main class="gx-stage">
  <section class="gx-why" id="why"></section>
  <div class="gx-wrapp" id="stage"></div>
</main>

<section class="gx-stage" style="padding-top:0">
  <span class="gx-lab" style="margin-bottom:10px">الكلّ · all twelve, same screen, same palette</span>
  <div class="gx-sheet" id="sheet"></div>
</section>

<footer class="gx-foot">
  <p><b>التخطيط ليس النمط.</b> المخطوط والطبقات والمنبر والخط والحادّ أسماء <em>تخطيطات</em> هنا — بنية على لوحة ألوان واحدة. المخطوط والطبقات اسمان لـ<em>أنماط</em> أيضاً في المعرض الآخر، والنمط اتّجاه بصريّ كامل. الاسم مشترك والمعنى مختلف.</p>
  <p style="margin-top:10px">Six layouts carried <code>0</code> CSS rules before today — <code>cards · shelves · path · ring · sheets</code>, plus <code>portal</code>, which had three rules that rounded corners without restructuring anything. They are marked <span class="gx-flag"><i></i>built today</span>. The other six are unchanged from build 8.</p>
</footer>

<script>
const D = ${JSON.stringify(DATA)};
const FAM = ${JSON.stringify(FAM)};
let L='bento', P='zumurrud', SCR='home';

function vars(el, pk, ground){
  const p = D.palettes.find(x=>x.key===pk);
  const v = ground ? D.grounds[ground] : p.v;
  for (const k in v) el.style.setProperty('--'+k, v[k]);
}
function phone(layout, pk, scr){
  const s = D.screens[scr];
  const el = document.createElement('div');
  el.className='phone'; el.dir='rtl';
  el.dataset.layout=layout; el.dataset.surface='glass'; el.dataset.quran='on';
  if (s.ground) el.dataset.ground=s.ground;
  vars(el, pk, s.ground);
  el.innerHTML='<div class="view-scroll"><main class="app"><div class="view">'+s.view+
    '</div></main><nav class="tabs">'+s.tabs+'</nav></div>';
  el.querySelectorAll('a,button,input,select,textarea').forEach(n=>n.tabIndex=-1);
  return el;
}
function chip(on, inner, onClick){
  const b=document.createElement('button');
  b.className='gx-chip'; b.type='button'; b.setAttribute('aria-pressed', on?'true':'false');
  b.innerHTML=inner; b.addEventListener('click', onClick); return b;
}
function render(){
  const cl=document.getElementById('cl'); cl.innerHTML='';
  D.layouts.forEach(l=>cl.appendChild(chip(l.key===L,
    (D.built.includes(l.key)?'<span class="gx-new"></span>':'')+l.ar+'<span class="gx-en">'+l.en+'</span>',
    ()=>{L=l.key;render();})));
  const cp=document.getElementById('cp'); cp.innerHTML='';
  D.palettes.forEach(p=>cp.appendChild(chip(p.key===P,
    '<span class="gx-sw" style="background:'+p.flat+'"></span>'+p.ar, ()=>{P=p.key;render();})));
  const cs=document.getElementById('cs'); cs.innerHTML='';
  Object.entries(D.screens).forEach(([k,s])=>cs.appendChild(chip(k===SCR, s.ar, ()=>{SCR=k;render();})));

  const l=D.layouts.find(x=>x.key===L);
  document.getElementById('why').innerHTML =
    '<div class="gx-ttl"><b>'+l.ar+'</b><span class="gx-meta">'+l.en+' · '+FAM[l.family]+
    (l.best?' · '+l.best:'')+'</span>'+
    (D.built.includes(l.key)?'<span class="gx-flag"><i></i>built today</span>':'')+'</div>'+
    '<p>'+l.why+'</p><p class="gx-note">'+l.note+'</p>';

  const st=document.getElementById('stage'); st.innerHTML=''; st.appendChild(phone(L,P,SCR));

  const sh=document.getElementById('sheet'); sh.innerHTML='';
  D.layouts.forEach(x=>{
    const b=document.createElement('button');
    b.className='gx-mini'; b.type='button'; b.setAttribute('aria-pressed', x.key===L?'true':'false');
    const w=document.createElement('div'); w.className='gx-win'; w.appendChild(phone(x.key,P,SCR));
    const c=document.createElement('div'); c.className='gx-cap';
    c.innerHTML=(D.built.includes(x.key)?'<span class="gx-new" style="width:6px;height:6px;border-radius:50%;background:var(--warn)"></span>':'')+
      '<b>'+x.ar+'</b><span class="gx-en">'+x.en+'</span>';
    b.appendChild(w); b.appendChild(c);
    b.addEventListener('click',()=>{L=x.key;render();window.scrollTo({top:0,behavior:'smooth'});});
    sh.appendChild(b);
  });
}
render();
</script>`;

fs.writeFileSync('/mnt/user-data/outputs/awda-layouts-gallery.html', html);
console.log('written', (html.length/1024).toFixed(1)+'KB');
