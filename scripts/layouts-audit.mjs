/**
 * layouts-audit.mjs — the gate behind the twelve-layout review gallery.
 *
 * Run:  node scripts/layouts-audit.mjs review/layouts-gallery.html
 *
 * WHAT IT ASSERTS, and why each one exists rather than being assumed:
 *  · every layout renders DISTINCTLY, and none of them matches a control that
 *    carries [data-layout] but no layout's own rules. That second half is the
 *    point: five layouts shipped with zero CSS and were still "unique" among
 *    twelve, which is exactly how six aliases of the default passed for designs.
 *  · 36 combinations walked at 390px: no console error, no horizontal scroll on
 *    the page or inside the phone, the tab bar pinned to the phone's bottom and
 *    not to the bottom of the scrolled content, no tap target under 44px.
 *  · nothing spills outside the phone UNLESS an ancestor clips it — the head
 *    ornament is bled on purpose and a shelf scrolls its own row sideways.
 *  · no class name is shared between the review chrome and the product's
 *    stylesheet. .bar hit the progress bar and .sheet hit the bottom sheet
 *    (position:fixed, z-index 61) and threw the thumbnails across the page.
 *
 * RED-PROVED: delete the [data-layout="cards"] rules from src/core/layout.css
 * and this reports  UNSTYLED — renders exactly as the default: البطاقات.
 * Remove whole rules when you do that, not lines — stripping lines leaves an
 * orphaned continuation and you end up testing corrupted CSS, not a missing layout.
 */
import http from 'node:http'; import fs from 'node:fs'; import { chromium } from 'playwright';
const TARGET = process.argv[2] || 'review/layouts-gallery.html';
const body = fs.readFileSync(TARGET,'utf8');
// reproduce the publish skeleton the Artifact tool wraps the file in
const page_ = `<!doctype html><html lang="ar"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui;background:#FAFAF9}img{max-width:100%}[hidden]{display:none!important}</style>
</head><body>${body}</body></html>`;
const srv = http.createServer((q,r)=>{r.writeHead(200,{'content-type':'text/html'});r.end(page_);});
await new Promise(r=>srv.listen(4399,r));

const b = await chromium.launch({...(process.env.CHROME ? {executablePath: process.env.CHROME} : {})});
const errs=[], fails=[];
const p = await b.newPage({viewport:{width:390,height:844},deviceScaleFactor:2});
p.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
p.on('pageerror',e=>errs.push('PAGEERROR '+e.message));
p.on('requestfailed',r=>{ if(!/fonts\.(googleapis|gstatic)/.test(r.url())) errs.push('REQFAIL '+r.url()); });
await p.goto('http://localhost:4399/',{waitUntil:'networkidle'});
await p.waitForTimeout(600);

const LAYOUTS = await p.$$eval('#cl .gx-chip', ns=>ns.map(n=>n.textContent.trim()));
const SCREENS = await p.$$eval('#cs .gx-chip', ns=>ns.map(n=>n.textContent.trim()));
if (LAYOUTS.length!==12) fails.push('layout chips = '+LAYOUTS.length+', expected 12');
if (SCREENS.length!==3)  fails.push('screen chips = '+SCREENS.length+', expected 3');

for (let li=0; li<12; li++){
  for (let si=0; si<3; si++){
    await p.$$eval('#cs .gx-chip',(ns,i)=>ns[i].click(),si);
    await p.$$eval('#cl .gx-chip',(ns,i)=>ns[i].click(),li);
    await p.waitForTimeout(160);
    const tag = LAYOUTS[li]+' / '+SCREENS[si];
    const r = await p.evaluate(()=>{
      const out={};
      out.hscroll = document.documentElement.scrollWidth - document.documentElement.clientWidth;
      const ph = document.querySelector('#stage .phone');
      out.phoneW = ph.getBoundingClientRect().width;
      const vs = ph.querySelector('.view-scroll');
      out.phoneHScroll = vs.scrollWidth - vs.clientWidth;
      // the tab bar must sit at the bottom of the PHONE, not at the bottom of the scrolled content
      const tabs = ph.querySelector('.tabs'), pr = ph.getBoundingClientRect(), tr = tabs.getBoundingClientRect();
      out.tabGap = Math.round(pr.bottom - tr.bottom);
      out.tabPos = getComputedStyle(tabs).position;
      // every interactive target in the phone AND in the desk chrome
      const small=[];
      document.querySelectorAll('#stage .phone button, #stage .phone a, .gx-chip, .gx-mini').forEach(el=>{
        const b=el.getBoundingClientRect();
        if (b.width>0 && b.height>0 && b.height<44) small.push((el.className||el.tagName)+'@'+Math.round(b.height));
      });
      out.small = small.slice(0,6); out.smallN = small.length;
      // Spill, corrected. The first version counted the head ornament (inset -17%,
      // deliberately bled and clipped by .head{overflow:hidden}) and every child of a
      // horizontal shelf, and reported 24 failures on a page with nothing wrong.
      // An element only spills if NOTHING between it and the phone clips it.
      const clipped = el => {
        for (let n = el.parentElement; n && n !== ph.parentElement; n = n.parentElement){
          const o = getComputedStyle(n);
          if (o.overflow !== 'visible' || o.overflowX !== 'visible') return true;
        }
        return false;
      };
      let spill=0, worst='';
      ph.querySelectorAll('*').forEach(el=>{
        const b=el.getBoundingClientRect();
        if (b.width>0 && (b.right > pr.right+1.5 || b.left < pr.left-1.5) && !clipped(el)){
          spill++; if(!worst) worst = (el.className||el.tagName)+'';
        }});
      out.spill = spill; out.worst = worst;
      return out;
    });
    if (r.hscroll > 0) fails.push(tag+': page scrolls horizontally by '+r.hscroll+'px');
    if (r.phoneHScroll > 0) fails.push(tag+': phone scrolls horizontally by '+r.phoneHScroll+'px');
    if (r.tabPos !== 'absolute') fails.push(tag+': tab bar position is '+r.tabPos);
    if (Math.abs(r.tabGap) > 2) fails.push(tag+': tab bar is '+r.tabGap+'px off the phone bottom');
    if (r.smallN > 0) fails.push(tag+': '+r.smallN+' target(s) under 44px — '+r.small.join(', '));
    if (r.spill > 0) fails.push(tag+': '+r.spill+' element(s) spill outside the phone, first: '+r.worst);
  }
}
// DISTINCTNESS. A layout with no CSS renders identically to the default and looks
// like a choice. Fingerprint the real geometry of each layout on one screen and
// require twelve different answers.
await p.$$eval('#cs .gx-chip',ns=>ns[0].click());
const prints = {};
for (let li=0; li<12; li++){
  await p.$$eval('#cl .gx-chip',(ns,i)=>ns[i].click(),li);
  await p.waitForTimeout(140);
  prints[LAYOUTS[li]] = await p.evaluate(()=>{
    const ph=document.querySelector('#stage .phone'), pr=ph.getBoundingClientRect();
    const sel=['.head','.wrap.lift','.bento','.bento .b-hero','.card','.stack>.card','.n-hero','.reg-row','.btn'];
    return sel.map(s=>{const e=ph.querySelector(s); if(!e) return s+':-';
      const b=e.getBoundingClientRect(), c=getComputedStyle(e);
      return s+':'+Math.round(b.width)+'x'+Math.round(b.height)+'@'+Math.round(b.top-pr.top)+
        '|'+c.borderRadius+'|'+c.boxShadow.slice(0,28)+'|'+c.backgroundColor+'|'+c.paddingInlineStart;
    }).join(' ');
  });
}
// A CONTROL. Distinctness from each other is not enough: a layout whose CSS was
// never written collapses to the bare default and is still "unique" among twelve.
// That is precisely the bug this gallery exists to end, so measure the default too
// and require every layout to differ FROM IT.
const control = await p.evaluate(()=>{
  const ph=document.querySelector('#stage .phone'); ph.setAttribute('data-layout','__control__'); /* matches [data-layout] so the shared floor applies, but no layout's own rules */
  const pr=ph.getBoundingClientRect();
  const sel=['.head','.wrap.lift','.bento','.bento .b-hero','.card','.stack>.card','.n-hero','.reg-row','.btn'];
  const fp = sel.map(s=>{const e=ph.querySelector(s); if(!e) return s+':-';
    const b=e.getBoundingClientRect(), c=getComputedStyle(e);
    return s+':'+Math.round(b.width)+'x'+Math.round(b.height)+'@'+Math.round(b.top-pr.top)+
      '|'+c.borderRadius+'|'+c.boxShadow.slice(0,28)+'|'+c.backgroundColor+'|'+c.paddingInlineStart;
  }).join(' ');
  return fp;
});
for (const [name,fp] of Object.entries(prints)){
  if (fp === control) fails.push('UNSTYLED — renders exactly as the default: '+name);
}
const seen={};
for (const [name,fp] of Object.entries(prints)){ (seen[fp]=seen[fp]||[]).push(name); }
const dupes = Object.values(seen).filter(g=>g.length>1);
console.log('distinct layouts:', Object.keys(seen).length, 'of 12');
dupes.forEach(g=>fails.push('IDENTICAL RENDER: '+g.join(' = ')));

// COLLISION GATE. The review chrome and the product's stylesheet live on one page,
// so a shared class name silently restyles one of them — .bar hit the progress bar
// and .sheet hit the bottom-sheet component (position:fixed, z-index 61).
const collisions = await p.evaluate(()=>{
  const product = new Set(), chrome = new Set();
  for (const sheet of document.styleSheets){
    let rules; try { rules = sheet.cssRules } catch { continue }
    const isProduct = sheet.ownerNode && sheet.ownerNode.id === 'awda-system';
    for (const r of rules){
      if (!r.selectorText) continue;
      for (const m of r.selectorText.matchAll(/\.([a-zA-Z][\w-]*)/g)) (isProduct?product:chrome).add(m[1]);
    }
  }
  // `phone` and `app` are shared ON PURPOSE: the rescope moved the product's body and
  // #app rules onto them so a screen can render inside a container.
  const intended = new Set(['phone','app']);
  return [...chrome].filter(c=>product.has(c) && !intended.has(c));
});
if (collisions.length) fails.push('CLASS COLLISION with the product stylesheet: '+collisions.join(', '));
console.log('chrome/product class collisions:', collisions.length);

console.log('combinations walked: 36');
console.log('console errors:', errs.length); errs.slice(0,6).forEach(e=>console.log('   !',e));
console.log('failures:', fails.length); fails.slice(0,25).forEach(f=>console.log('   ✗',f));
await b.close(); srv.close();
