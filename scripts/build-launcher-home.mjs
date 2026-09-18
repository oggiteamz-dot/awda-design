/**
 * build-launcher-home.mjs — builds the LAUNCHER home used by the review gallery.
 *
 * Home is a launcher, not a dashboard. Order, decided by Hadi on 18 Sep:
 *   1. الوصيّة  — leads. The will is the product's first job.
 *   2. القضاء   — one level down: same card anatomy, no glint, no lead position.
 *   3. the five prayers — five separate small cards with a line of text above them,
 *      NOT five things inside one card. They are five acts, not one object.
 *   4. the areas, then the index.
 *
 * Built from .head / .wrap.lift.stack / .card / .bento / .sec — the primitives every
 * one of the twelve layouts transforms — so switching layout RESTRUCTURES this screen
 * rather than merely recolouring it. See docs/HOME-AND-NAVIGATION.md.
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
/* g() groups with U+066C — for COUNTS. yr() never groups: a Hijri year with a thousands
   mark (١٬٤٤٨) is simply wrong, and it shipped in the first render of this screen. */
const g  = v => n(v.toLocaleString('en-US'));
const yr = v => n(v);
/* Every numeral sits in its own bidi isolate. Without it an Arabic-Indic run adjacent to
   Arabic text reorders — the day number rendered as ٢٦٠ in the first pass. */
const iso = t => `<span class="n">${t}</span>`;

/* THE AREAS. الصلاة and الأقسام are TABS, so by the rule in HOME-AND-NAVIGATION.md §1
   they deliberately do NOT appear as cards here. */
const AREAS = [
  { k:'knowledge', ar:'المعرفة',      sub:'الفقه والعقيدة',      ic:'knowledge', game:true  },
  { k:'history',   ar:'التاريخ',       sub:'السيرة وأهل البيت',   ic:'doc',       game:true  },
  { k:'stories',   ar:'القصص',        sub:'قصص تُروى',           ic:'people',    game:true  },
  { k:'daily',     ar:'العمل اليوميّ', sub:'الأدعية والأذكار',    ic:'moon',      game:false },
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
      <span class="kicker-ar">الجمعة · ${iso(n(26))} ربيع الآخر ${iso(yr(1448))}</span>
      <h1 class="h1">مساء الخير، هادي</h1>
    </div>
    <button class="icon-btn">${icon('gear','ic')}</button>
  </div>
</header>

<div class="wrap lift stack">

  <!-- THE WILL IS FIRST. Hadi, 18 Sep: الوصيّة leads, القضاء drops a level.
       It gets the same anatomy the qaḍāʾ card has — kicker · name · a figure · a bar ·
       one line of plain state — because that anatomy is what makes a card resumable
       rather than decorative (Hulu: a resume affordance must carry its progress).
       What differs is the FIGURE: a will has no rate, so it cannot have a projected
       date. Its honest equivalent is naming what is still missing (Airbnb). -->
  <button class="card card-tap card-glint" data-go="will">
    <span class="kicker-ar">تابع</span>
    <div class="between">
      <span class="h2">الوصيّة</span>
      <span class="n n-md">${n('٤')} من ${n('٩')} أقسام</span>
    </div>
    <div class="bar"><i style="width:44%"></i></div>
    <span class="hint">بقي · الأوصياء · الثلث · الدفن</span>
  </button>

  <!-- القضاء, one level down: same anatomy, quieter — no glint, no lead position. -->
  <button class="card card-tap" data-go="qada">
    <div class="between">
      <span class="h3">القضاء</span>
      <span class="n n-md">بقي ${iso(g(11270))}</span>
    </div>
    <div class="bar"><i style="width:11%"></i></div>
    <span class="hint">تاريخ الفراغ · رجب ${iso(yr(1458))} · على وتيرتك الحاليّة</span>
  </button>

  <!-- THE PRAYER STRIP. Hadi, 18 Sep: no card wrapping the five. Each prayer is its own
       small card; the only thing above them is a line of text. Cleaner, and it stops the
       five prayers reading as one object when they are five separate acts. -->
  <div class="sec">
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
      <span class="hint">${n('٥')} من ${n('٨')}</span>
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
