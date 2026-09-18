/**
 * build-launcher-home.mjs — builds the LAUNCHER home used by the review gallery.
 *
 * Home is a launcher, not a dashboard: a conditional continue card carrying STATE,
 * a prayer status strip, then the areas as cards, then the index. See
 * docs/HOME-AND-NAVIGATION.md for the rules this file implements.
 *
 * The markup is deliberately built from .head / .wrap.lift.stack / .card / .bento /
 * .sec — the primitives every one of the twelve layouts transforms — so switching
 * layout RESTRUCTURES this screen instead of merely recolouring it.
 *
 * Run before scripts/build-layouts-gallery.mjs; it rewrites screens.json's `home`.
 */
import fs from 'node:fs';
const R='/tmp/claude-0/-home-claude/07ca4d88-6227-5bb6-96fe-05f324eb7c57/scratchpad/awda';
const { icon } = await import(R+'/src/core/icons.js');
const { ar } = await import(R+'/src/core/num.js').then(m=>({ar:m.ar||m.toAr||m.arabic||(n=>String(n))})).catch(()=>({ar:n=>String(n)}));

// Eastern Arabic numerals with U+066C as the thousands mark, per the product rule
const E='٠١٢٣٤٥٦٧٨٩';
const n = v => String(v).replace(/\d/g,d=>E[+d]).replace(/,/g,'٬');
const g = v => n(v.toLocaleString('en-US'));

/* THE AREAS. الصلاة and الأقسام are TABS, so by the rule in HOME-AND-NAVIGATION.md §1
   they deliberately do NOT appear as cards here. */
const AREAS = [
  { k:'knowledge', ar:'المعرفة',      sub:'الفقه والعقيدة',      ic:'knowledge', game:true  },
  { k:'history',   ar:'التاريخ',       sub:'السيرة وأهل البيت',   ic:'doc',       game:true  },
  { k:'stories',   ar:'القصص',        sub:'قصص تُروى',           ic:'people',    game:true  },
  { k:'daily',     ar:'العمل اليوميّ', sub:'الأدعية والأذكار',    ic:'moon',      game:false },
  { k:'will',      ar:'الوصيّة',       sub:'وثيقة تُكتب مرّة',     ic:'will',      game:false },
  { k:'ihtidar',   ar:'الاحتضار',      sub:'ما يُقال ويُفعل',      ic:'ihtidar',   game:false },
];

/* A card is icon + name + one line. No illustration: per the census the icon+label form
   scales to twenty areas without commissioning new artwork for each one, and the girih
   icon set already exists. The wrapper span is gone — .cell is the flex column itself. */
const card = (a, cls) => `
      <button class="card card-tap cell ${cls}" data-area="${a.k}">
        ${icon(a.ic,'ic ic-lg')}
        <span class="h3">${a.ar}</span>
        <span class="hint">${a.sub}</span>
      </button>`;

/* THE LAUNCHER.
   Everything below is built from primitives the twelve layouts already transform —
   .head / .wrap.lift.stack / .card / .bento / .sec — so switching layout restructures
   this screen rather than merely recolouring it. That is the whole point of the gallery. */
const view = `
<header class="head">
  <div class="head-orn">${icon('astrolabe','orn orn-astro')}</div>
  <div class="head-row">
    <div class="grow">
      <span class="kicker-ar">الجمعة · ${n('٢٦')} ربيع الآخر ${g(1448)}</span>
      <h1 class="h1">مساء الخير، هادي</h1>
    </div>
    <button class="icon-btn">${icon('gear','ic')}</button>
  </div>
</header>

<div class="wrap lift stack">

  <!-- H-2 · THE CONTINUE CARD. Carries STATE, not just a name (Hulu). It is conditional:
       with nothing to resume it is not rendered and nothing replaces it. -->
  <button class="card card-tap card-glint" data-go="qada">
    <span class="kicker-ar">تابع</span>
    <div class="between">
      <span class="h2">القضاء</span>
      <span class="n n-md">بقي ${g(11270)}</span>
    </div>
    <div class="bar"><i style="width:11%"></i></div>
    <span class="hint">تاريخ الفراغ · رجب ${g(1458)} · على وتيرتك الحاليّة</span>
  </button>

  <!-- H-3 · the prayer strip. الصلاة is a TAB, so this is a status line, never a card. -->
  <div class="card card-flush">
    <div class="between">
      <span class="kicker-ar">صلوات اليوم</span>
      <span class="hint">العصر · بعد ${n('٣٤')} دقيقة</span>
    </div>
    <div class="pills">
      <button class="pill" aria-pressed="true"><span>الفجر</span><span class="t">04:42</span>${icon('check','ic ic-sm pill-check')}</button>
      <button class="pill" aria-pressed="true"><span>الظهر</span><span class="t">12:06</span>${icon('check','ic ic-sm pill-check')}</button>
      <button class="pill" data-now="1"><span>العصر</span><span class="t">15:31</span>${icon('check','ic ic-sm pill-check')}</button>
      <button class="pill"><span>المغرب</span><span class="t">18:24</span>${icon('check','ic ic-sm pill-check')}</button>
      <button class="pill"><span>العشاء</span><span class="t">19:46</span>${icon('check','ic ic-sm pill-check')}</button>
    </div>
  </div>

  <!-- H-5 · THE AREAS. .bento so every layout family restructures it. -->
  <section class="sec">
    <div class="sec-head">
      <h2 class="h2">الأقسام</h2>
      <span class="hint">${n('٦')} من ${n('٨')}</span>
    </div>
    <div class="bento">
      ${card(AREAS[0],'b-wide')}
      ${AREAS.slice(1).map(a=>card(a,'')).join('')}
    </div>
    <div class="rule"></div>
  </section>

  <!-- H-6 · the index. Afterpay / Binance: home shows the few, an index holds the many. -->
  <button class="btn btn-ghost btn-block" data-go="index">
    كلّ الأقسام ${icon('next','ic ic-sm')}
  </button>

</div>`;

/* FOUR TABS, not five. A tab is a place you RETURN to; a card is a place you GO to. */
const TABS = [['home','الرئيسيّة','home'],['prayers','الصلاة','prayer'],
              ['index','الأقسام','grid'],['account','حسابي','account']];
const tabs = TABS.map(([k,t,ic],i)=>`
    <button class="tab" ${i===0?'aria-current="page"':''}>
      ${icon(ic,'ic')}<span>${t}</span><span class="tab-dot"></span></button>`).join('');

const S = JSON.parse(fs.readFileSync('/tmp/claude-0/-home-claude/07ca4d88-6227-5bb6-96fe-05f324eb7c57/scratchpad/screens.json','utf8'));
S.home = { view, tabs, ground:'', hidden:false };
// the other two screens keep the four-tab bar too, so the gallery is internally consistent
S.qada.tabs = tabs.replace('aria-current="page"','');
S.ihtidar.tabs = tabs.replace('aria-current="page"','');
fs.writeFileSync('/tmp/claude-0/-home-claude/07ca4d88-6227-5bb6-96fe-05f324eb7c57/scratchpad/screens.json', JSON.stringify(S,null,1));
console.log('launcher home built:', view.length, 'bytes ·', TABS.length, 'tabs ·', AREAS.length, 'area cards');
