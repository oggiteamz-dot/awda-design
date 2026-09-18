/**
 * main.js — الرئيسية · الصلاة · القضاء · التقويم · المعرفة
 *
 * ─── THE ONE RULE THAT SHAPES EVERY SCREEN IN THIS FILE ─────────────────────
 * NO GAMIFICATION ON A SACRED ACT. No streaks, no points, no badges, no
 * leaderboard, nothing turns red, nothing breaks. (SPEC NO-GO 2 and 3, and there
 * is a gate — no_gamification.mjs — that fails the build on the words.)
 *
 * The reason is not taste. A streak punishes illness, menstruation, travel and
 * grief — the exact circumstances under which Islamic law already excuses a
 * person — and it introduces riyāʾ, performing worship for a number, into an act
 * whose validity depends on intention. An app that shows you a broken chain for
 * a prayer you were legitimately exempt from is not motivating you; it is
 * lying to you about your own religion.
 *
 * So the substitutes, everywhere:
 *   a streak            → a dot grid of the last weeks, with no total and no
 *                         judgement. stoic.'s "one dot = one day" — you can see
 *                         a pattern and nobody scores it.
 *   a score going up    → a DEBT GOING DOWN toward zero.
 *   pass / fail         → a range. Eight Sleep reports "in range (±30m)" rather
 *                         than good/bad, and that is the honest register for a
 *                         person's own practice.
 *   "you broke it!"     → a fact. «بقيت صلاتان على هدف اليوم» is allowed.
 *                         Anything implying you have failed is not.
 *
 * Game mechanics ARE permitted on المعرفة — progress through a section, "not yet
 * read", "new this week". A lesson is not a sacred act. (D-011.)
 */
import { h, head, card, facetCard, secHead, regRow, icon, animateIn, sheet, esc } from '../core/ui.js';
import { toAr, num, fmtHijri, toHijri, HIJRI_MONTHS, WEEKDAYS, hijriMonthLength, hijriToGregorian, projectFinish } from '../core/num.js';
import { astroArc, turbah, muqarnasPath, rosette12 } from '../core/ornament.js';
import { countTo, pulse, rise } from '../core/motion.js';
import { setGround, state as theme } from '../core/theme.js';

/* Demo state. A prototype with empty screens is a prototype nobody can judge,
   so this is plausible data for one plausible person — never a real user's. */
export const demo = {
  name: 'هادي',
  today: [1, 1, 0, 0, 0],                 // الصبح الظهر العصر المغرب العشاء
  owed: 11270, startOwed: 12500, perDay: 3,
  weekMadeUp: 12, offset: 0,
  will: { done: 3, total: 7 },
  weeks: Array.from({ length: 49 }, (_, k) => (k > 44 ? 'x' : (k % 9 === 3 ? 'p' : (k % 7 === 5 ? 0 : 1)))),
};
const PRAYERS = [['fajr', 'الصبح', '04:42'], ['dhuhr', 'الظهر', '12:08'], ['asr', 'العصر', '15:31'], ['maghrib', 'المغرب', '18:24'], ['isha', 'العشاء', '19:46']];
const NOW_IDX = 2;

const hijToday = () => fmtHijri(toHijri(new Date(), demo.offset));
const greet = () => { const hr = new Date().getHours(); return hr < 5 ? 'ليلة مباركة' : hr < 12 ? 'صباح الخير' : hr < 17 ? 'نهارك طيّب' : 'مساء الخير'; };

const pills = () => `<div class="pills">${PRAYERS.map(([k, ar, t], n) => `
  <button class="pill" data-p="${n}" aria-pressed="${demo.today[n] ? 'true' : 'false'}" ${n === NOW_IDX ? 'data-now="1"' : ''}>
    <span class="pill-check">${icon('check', 'ic-sm')}</span>
    <span>${ar}</span><span class="t">${t}</span></button>`).join('')}</div>`;

/* ══ الرئيسية ══════════════════════════════════════════════════════════════
   Never more than four cards. A feed you scroll is a feed you stop reading.
   Card 1 is ALWAYS today's prayers: the most-repeated action in the product
   should not cost a navigation. Cards 2–4 are chosen by what you actually use. */
export function home(root, go) {
  setGround(null);
  const p = projectFinish(demo.owed, demo.perDay, demo.offset);
  const left = demo.today.filter((x) => !x).length;
  root.innerHTML = `
  ${head({
    kicker: hijToday(), title: `${greet()}، ${demo.name}`,
    actions: `<button class="icon-btn" data-go="#/account" aria-label="حسابي">${icon('account')}</button>
              <button class="icon-btn" data-styles aria-label="الأنماط">${icon('palette')}</button>`,
    body: `<div class="row" style="position:relative;margin-top:20px;gap:16px;align-items:center">
        <div style="width:96px;height:96px;flex:none;color:var(--head-ink)">
          ${astroArc({ size: 96, from: -210, to: 30, value: .62, weight: 2.2, ticks: 24 })}</div>
        <div class="grow">
          <span class="kicker-ar">الصلاة التالية</span>
          <div class="n-lg" style="color:var(--head-ink);margin-top:2px">العصر</div>
          <span class="kicker-ar" style="margin-top:4px">بعد ١ س ١٤ د · ١٥:٣١</span>
        </div></div>`,
  })}
  <div class="wrap lift stack">
    ${card(`<div class="between" style="margin-bottom:14px">
        <span class="kicker-ar">صلوات اليوم</span>
        <span class="tag">${left ? `بقيت ${toAr(left)}` : 'اكتملت'}</span></div>
      ${pills()}
      <p class="hint" style="margin-top:12px">اضغط لتسجيل ما صلّيت. لا شيء هنا يتحوّل إلى اللون الأحمر، ولا يُحسب تتابع.</p>`)}

    <div class="bento" style="margin-top:12px">
      ${facetCard(`<div class="cell" style="height:100%">
        <div><span class="kicker-ar">الباقي من القضاء</span>
          <div class="n-hero" id="owed" style="margin-top:8px;color:var(--acc);font-size:52px">٠</div>
          <span class="kicker-ar" style="margin-top:6px">صلاة</span></div>
        <div>
          <div class="bar"><i style="width:${Math.round(100 * (1 - demo.owed / demo.startOwed))}%"></i></div>
          <p class="hint" style="margin-top:8px">قضيتَ ${toAr(demo.weekMadeUp)} صلاة هذا الأسبوع — الرقم ينزل، ولا يصعد.</p>
        </div></div>`, 'b-hero card-tap')}

      <div class="card card-tap cell" data-go="#/will">
        <div style="color:var(--acc)">${icon('will', 'ic-lg')}</div>
        <div><b class="h3">الوصيّة</b>
          <p class="hint">${toAr(demo.will.done)} من ${toAr(demo.will.total)} أقسام</p></div>
        <div class="bar"><i style="width:${(demo.will.done / demo.will.total * 100).toFixed(0)}%"></i></div>
      </div>

      <div class="card card-tap cell" data-go="#/knowledge">
        <div style="color:var(--acc)">${icon('knowledge', 'ic-lg')}</div>
        <div><b class="h3">المعرفة</b><p class="hint">٤ صفحات جديدة</p></div>
        <span class="tag tag-acc">لم تُقرأ</span>
      </div>

      <div class="card b-wide" data-go="#/qada">
        <div class="between"><div>
          <span class="kicker-ar">على وتيرتك الحاليّة</span>
          <p class="h3" style="margin-top:4px">${p ? fmtHijri(p.hijri) : '—'}</p>
          <p class="hint">${toAr(demo.perDay)} صلوات في اليوم · نحو ${toAr(Math.round(p.years * 10) / 10)} سنة</p>
        </div><span style="color:var(--soft)">${icon('next')}</span></div>
      </div>
    </div>

    <div class="sec">
      ${secHead('هذا الأسبوع وما قبله', '<span class="kicker-ar">٤٩ يوماً</span>')}
      ${card(`<div class="dotgrid">${demo.weeks.map((v) => `<i class="dot" data-v="${v}"></i>`).join('')}</div>
        <div class="row" style="margin-top:14px;gap:16px;flex-wrap:wrap">
          <span class="row" style="gap:6px"><i class="dot" data-v="1" style="width:11px"></i><span class="hint">كاملة</span></span>
          <span class="row" style="gap:6px"><i class="dot" data-v="p" style="width:11px"></i><span class="hint">بعضها</span></span>
          <span class="row" style="gap:6px"><i class="dot" data-v="0" style="width:11px"></i><span class="hint">لا شيء</span></span>
          <span class="row" style="gap:6px"><i class="dot" data-v="x" style="width:11px"></i><span class="hint">قادم</span></span>
        </div>
        <p class="hint" style="margin-top:12px">نقطة لكلّ يوم، بلا مجموع وبلا تقييم. النمط يُرى، ولا يُحاسَب عليه أحد.</p>`)}
    </div>

    <div class="sec">
      ${secHead('جديد في المعرفة', '<button class="btn btn-sm btn-quiet" data-go="#/knowledge">الكلّ</button>')}
      <div class="shelf">
        ${[['ما الفرق بين القضاء والأداء؟', 'القضاء والفوائت'], ['كيف تُحسب سنة التكليف؟', 'أساسيات الصلاة'], ['الوصيّة الواجبة والمستحبّة', 'الوصيّة والميراث'], ['تلقين المحتضر', 'الموت وما بعده']]
      .map(([t, s]) => `<div class="card card-tap" data-go="#/knowledge" style="height:170px;display:flex;flex-direction:column;justify-content:space-between">
            <span style="color:var(--acc)">${icon('doc')}</span>
            <div><b style="font-family:Kufi;font-size:15px;line-height:1.4;display:block">${t}</b>
            <span class="hint" style="font-size:12px">${s}</span></div></div>`).join('')}
      </div>
    </div>
    <div style="height:20px"></div>
  </div>`;
  animateIn(root);
  countTo(root.querySelector('#owed'), demo.owed, { ms: 1000, fmt: (n) => num(n) });
  wirePills(root);
  pulse(root.querySelector('.pill[data-now="1"]'));
}

function wirePills(root) {
  root.querySelectorAll('[data-p]').forEach((b) => b.onclick = () => {
    const n = +b.dataset.p;
    demo.today[n] = demo.today[n] ? 0 : 1;
    b.setAttribute('aria-pressed', demo.today[n] ? 'true' : 'false');
    if (navigator.vibrate) navigator.vibrate(8);
  });
}

/* ══ الصلاة ═══════════════════════════════════════════════════════════════
   المسار / the day as a rail with a "now" marker — the best semantic fit in the
   whole layout atlas for this screen. A day IS a sequence, and the rail says so
   without implying you have to finish it.                                     */
export function prayers(root, go) {
  setGround(null);
  root.innerHTML = `
  ${head({ kicker: hijToday(), title: 'الصلاة', sub: 'اليوم، واحدةً واحدة.', back: true })}
  <div class="wrap lift stack">
    ${card(pills() + `<p class="hint" style="margin-top:12px">الوقت المعروض تقريبيّ لبيروت. مواقيت الصلاة المحسوبة بالموقع لها مواصفة منفصلة.</p>`)}
    <div class="sec">
      ${secHead('اليوم على المسار')}
      ${card(`<div style="position:relative;padding-inline-end:30px">
        <div style="position:absolute;inset-block:14px;inset-inline-end:13px;width:2px;background:var(--line)"></div>
        ${PRAYERS.map(([k, ar, t], n) => `
          <div class="row" style="position:relative;padding-block:14px;gap:14px">
            <span style="position:absolute;inset-inline-end:-24px;width:24px;height:24px;border-radius:50%;
              border:2px solid ${n <= NOW_IDX ? 'var(--acc)' : 'var(--line)'};
              background:${demo.today[n] ? 'var(--acc)' : 'var(--card)'};display:grid;place-items:center;
              color:var(--acc-ink)">${demo.today[n] ? icon('check', 'ic-sm') : ''}</span>
            <span class="grow"><b class="h3">${ar}</b>
              ${n === NOW_IDX ? '<span class="tag tag-acc" style="margin-inline-start:8px">الآن</span>' : ''}
              <span class="hint" style="display:block">${demo.today[n] ? 'سُجّلت' : n < NOW_IDX ? 'لم تُسجَّل بعد' : 'لم يدخل وقتها'}</span></span>
            <span class="n" style="font-family:Mono;color:var(--soft)">${t}</span>
          </div>`).join('')}
      </div>`)}
    </div>
    <div class="sec">
      ${secHead('الأسابيع الماضية')}
      ${card(`<div class="dotgrid">${demo.weeks.map((v) => `<i class="dot" data-v="${v}"></i>`).join('')}</div>
        <p class="hint" style="margin-top:12px">لا يوجد «تتابع» في هذا التطبيق. المرض والسفر والحيض والحزن أعذارٌ في الشرع، ولا يصحّ أن يكسر أيٌّ منها رقماً.</p>`)}
    </div>
    <div style="height:20px"></div>
  </div>`;
  animateIn(root); wirePills(root);
}

/* ══ القضاء ═══════════════════════════════════════════════════════════════
   السجل / the register. Rows, hairlines, tabular figures, label right and
   figure left. A debt is a ledger and a ledger is rows — the atlas names this
   the best screen in the catalogue and it is right.
   The hero is the REMAINING count, decreasing. There is no lifetime ring: a ring
   implies a closable goal, and a lifetime ring sitting at 4% is an accusation. */
export function qada(root, go) {
  setGround(null);
  const p = projectFinish(demo.owed, demo.perDay, demo.offset);
  const done = demo.startOwed - demo.owed;
  const perType = [['الصبح', 2254], ['الظهر', 2254], ['العصر', 2254], ['المغرب', 2254], ['العشاء', 2254]];
  root.innerHTML = `
  ${head({
    kicker: 'القضاء', title: '', back: true,
    actions: `<button class="icon-btn" data-edit aria-label="تعديل الحساب">${icon('gear')}</button>`,
    body: `<div style="position:relative;text-align:center;padding-block:14px 4px">
      <span class="kicker-ar">الباقي</span>
      <div class="n-hero" id="q" style="color:var(--head-ink);margin-top:8px">٠</div>
      <span class="kicker-ar" style="margin-top:8px">صلاة · من ${toAr(num(demo.startOwed))}</span>
      <div style="max-width:250px;margin:16px auto 0"><div class="bar" style="background:color-mix(in srgb,var(--head-ink) 22%,transparent)">
        <i style="width:${Math.round(100 * done / demo.startOwed)}%;background:var(--head-ink)"></i></div></div>
      <p class="kicker-ar" style="margin-top:10px">قضيتَ ${toAr(num(done))} حتّى الآن</p>
    </div>`,
  })}
  <div class="wrap lift stack">
    ${card(`<div class="between"><div><span class="kicker-ar">وتيرتك</span>
        <p class="h2" style="margin-top:4px"><span class="n">${toAr(demo.perDay)}</span> في اليوم</p></div>
      <button class="btn btn-sm btn-quiet" data-pace>تعديل</button></div>
      <div class="rule" style="margin-block:14px"></div>
      <div class="between"><span class="hint">تنتهي في</span><span class="n-md">${fmtHijri(p.hijri)}</span></div>
      <div class="between" style="margin-top:8px"><span class="hint">هذا الأسبوع</span>
        <span class="hint n">${toAr(demo.weekMadeUp)} من ${toAr(demo.perDay * 7)} — ضمن المدى</span></div>
      <p class="hint" style="margin-top:12px">«ضمن المدى» لا «ناجح». الوتيرة هدفٌ تقريبيّ لا امتحان، والأسبوع الذي ينزل قليلاً أسبوعٌ عاديّ.</p>`)}

    <div class="sec">
      ${secHead('السجلّ', `<span class="kicker-ar">بحسب الصلاة</span>`)}
      ${card(`<div class="reg">${perType.map(([t, n]) => regRow({ label: t, fig: num(n), sub: 'يوماً', go: true })).join('')}</div>`, 'card-flush')}
    </div>

    <div class="sec">
      ${secHead('الحساب')}
      ${card(`<div class="reg">
        ${regRow({ label: 'سنّ التكليف', fig: '١٥ سنة', sub: 'قمريّة — في الشيفرة، لا في المحتوى', stat: true })}
        ${regRow({ label: 'من تاريخ', fig: '١٢ ربيع الأوّل ١٤٢٩', sub: 'يوم بلوغك التكليف', stat: true })}
        ${regRow({ label: 'الأيّام الباقية', fig: num(2254), stat: true })}
        ${regRow({ label: 'المجموع', fig: num(demo.owed), sub: '٢٬٢٥٤ × ٥', stat: true })}
      </div>
      <p class="hint" style="margin-top:14px">كلّ سطر هنا مبنيّ على شيء أدخلتَه أنت، ويمكنك تغييره فيُعاد الحساب فوراً. هذا تقدير، وليس حُكماً.</p>`, 'card-flush')}
    </div>

    ${card(`<div class="row" style="align-items:flex-start;gap:14px">
      <span style="color:var(--acc);flex:none">${turbah({ size: 46 })}</span>
      <div><b class="label">لماذا التربة علامةُ هذه الشاشة</b>
      <p class="hint" style="margin-top:4px">لأنّها ما تُوضع تحت الجبهة في كلّ سجدة — أكثر شيءٍ تكراراً في العبادة، وأليقُ ما يمثّل دَيناً يُقضى على مهل.</p></div></div>`)}

    <div style="height:20px"></div>
  </div>
  <button class="btn" data-log style="position:fixed;inset-block-end:88px;inset-inline-start:50%;transform:translateX(50%);
    z-index:35;box-shadow:0 6px 24px rgba(0,0,0,.22)">${icon('plus')} سجّل قضاءً</button>`;
  animateIn(root);
  countTo(root.querySelector('#q'), demo.owed, { ms: 1100, fmt: (n) => num(n) });
  root.querySelector('[data-log]').onclick = () => logSheet(root, go);
  root.querySelector('[data-pace]').onclick = () => paceSheet(root, go);
}

function logSheet(root, go) {
  const close = sheet('تسجيل قضاء', `
    <div class="stack">
      ${PRAYERS.map(([k, ar]) => `<div class="between" style="min-height:52px;border-bottom:1px solid var(--line)">
        <span class="label">${ar}</span>
        <div class="row" style="gap:10px">
          <button class="icon-btn btn-sm" data-m="-" data-k="${k}" style="width:40px;height:40px">${icon('down', 'ic-sm')}</button>
          <span class="n-md" data-v="${k}" style="min-width:34px;text-align:center">٠</span>
          <button class="icon-btn btn-sm" data-m="+" data-k="${k}" style="width:40px;height:40px">${icon('plus', 'ic-sm')}</button>
        </div></div>`).join('')}
      <p class="hint">سجّل ما قضيتَه فعلاً. الرقم ينقص من الدَّين مباشرةً، ولا يُضاف إلى أيّ نقاط — لا توجد نقاط.</p>
      <button class="btn btn-block" data-save>حفظ</button>
    </div>`);
  const vals = {};
  root.ownerDocument.querySelectorAll('[data-m]').forEach((b) => b.onclick = () => {
    const k = b.dataset.k; vals[k] = Math.max(0, (vals[k] || 0) + (b.dataset.m === '+' ? 1 : -1));
    root.ownerDocument.querySelector(`[data-v="${k}"]`).textContent = toAr(vals[k]);
  });
  root.ownerDocument.querySelector('[data-save]').onclick = () => {
    const total = Object.values(vals).reduce((a, b) => a + b, 0);
    demo.owed = Math.max(0, demo.owed - total); demo.weekMadeUp += total;
    close(); qada(root, go);
  };
}

function paceSheet(root, go) {
  const close = sheet('وتيرة القضاء', `
    <div class="stack-lg">
      <div style="text-align:center"><div class="n-hero" id="pv2">${toAr(demo.perDay)}</div>
        <span class="kicker-ar" style="margin-top:6px">في اليوم</span></div>
      <input class="slider" type="range" min="1" max="15" value="${demo.perDay}" data-pace2>
      <div class="between"><span class="hint">تنتهي في</span><span class="n-md" id="fin3">—</span></div>
      <p class="hint">اختر رقماً تستطيعه في أسوأ أسابيعك لا في أفضلها.</p>
      <button class="btn btn-block" data-ok>تمّ</button></div>`);
  const d = root.ownerDocument;
  const upd = (v) => {
    d.querySelector('#pv2').textContent = toAr(v);
    d.querySelector('#fin3').textContent = fmtHijri(projectFinish(demo.owed, v, demo.offset).hijri);
  };
  upd(demo.perDay);
  d.querySelector('[data-pace2]').oninput = (e) => { demo.perDay = +e.target.value; upd(demo.perDay); };
  d.querySelector('[data-ok]').onclick = () => { close(); qada(root, go); };
}

/* ══ التقويم ══════════════════════════════════════════════════════════════
   A real Hijri month with your marks on it, and the ±1 sighting offset the spec
   requires. The app STATES that it is using the tabular reckoning rather than
   pretending the arithmetic and the sighting are the same thing — a person
   fixing the date of a fast or an anniversary needs to know which they have.  */
export function calendar(root, go) {
  setGround(null);
  const t = toHijri(new Date(), demo.offset);
  const len = hijriMonthLength(t.y, t.m);
  const first = hijriToGregorian(t.y, t.m, 1, demo.offset).getDay();
  const cells = [...Array(first).fill(null), ...Array.from({ length: len }, (_, k) => k + 1)];
  root.innerHTML = `
  ${head({ kicker: `${HIJRI_MONTHS[t.m - 1]} ${toAr(t.y)}`, title: 'التقويم', back: true,
    actions: `<button class="icon-btn" data-off aria-label="تعديل الرؤية">${icon('moon')}</button>` })}
  <div class="wrap lift stack">
    ${card(`
      <div class="dotgrid" style="grid-template-columns:repeat(7,1fr);gap:4px;margin-bottom:8px">
        ${WEEKDAYS.map((w) => `<span class="kicker-ar" style="text-align:center;font-size:9px">${w.slice(0, 3)}</span>`).join('')}</div>
      <div class="dotgrid" style="grid-template-columns:repeat(7,1fr);gap:4px">
        ${cells.map((d) => d === null ? '<span></span>' : `
          <button style="aspect-ratio:1;min-height:44px;border-radius:10px;border:1px solid ${d === t.d ? 'var(--acc)' : 'transparent'};
            background:${d < t.d ? (d % 8 === 3 ? 'color-mix(in srgb,var(--acc) 40%,var(--card2))' : 'color-mix(in srgb,var(--acc) 85%,var(--card))') : 'var(--card2)'};
            color:${d < t.d ? 'var(--acc-ink)' : 'var(--soft)'};font-family:Kufi;font-size:12px;font-weight:600;cursor:pointer" class="n">${toAr(d)}</button>`).join('')}
      </div>`)}
    ${card(`<div class="between"><div><span class="kicker-ar">اليوم</span>
        <p class="h3" style="margin-top:4px">${fmtHijri(t)}</p>
        <p class="hint">${WEEKDAYS[new Date().getDay()]} · ${new Date().toLocaleDateString('ar-EG')}</p></div>
      <span style="color:var(--acc)">${icon('moon', 'ic-lg')}</span></div>`)}
    ${card(`<div class="row" style="align-items:flex-start;gap:12px">${icon('info')}
      <div><b class="label">تقويم حسابيّ، لا رؤية</b>
      <p class="hint" style="margin-top:4px">هذا التقويم الهجريّ الحسابيّ، وقد يختلف عن الرؤية بيوم. عدّاد الرؤية ±١ يحرّك كلّ التواريخ معاً، والتطبيق يقول أيّهما يستعمل بدل أن يخلط بينهما.</p>
      <div class="row" style="margin-top:12px;gap:8px">
        ${[-1, 0, 1].map((o) => `<button class="btn btn-sm ${demo.offset === o ? '' : 'btn-quiet'}" data-o="${o}">${o > 0 ? '+' : ''}${toAr(o)}</button>`).join('')}
      </div></div></div>`)}
    <div style="height:20px"></div>
  </div>`;
  animateIn(root);
  root.querySelectorAll('[data-o]').forEach((b) => b.onclick = () => { demo.offset = +b.dataset.o; calendar(root, go); });
}

/* ══ المعرفة ══════════════════════════════════════════════════════════════
   المجلة / editorial — the atlas names this the best home for a library, and
   eight sections as "departments" with pages as "articles" is the shape.
   The muqarnas shoulder on each section tile is the one place ornament becomes
   structure rather than background.                                          */
const SECTIONS = [
  ['أساسيّات الصلاة', 'prayer', 14], ['القضاء والفوائت', 'qada', 9], ['الطهارة', 'sun', 11],
  ['الصوم والكفّارات', 'moon', 8], ['الخمس والزكاة', 'scale', 7], ['الوصيّة والميراث', 'will', 12],
  ['الموت وما بعده', 'ihtidar', 10], ['التقويم ومناسباته', 'calendar', 6],
];
export function knowledge(root, go) {
  setGround(null);
  root.innerHTML = `
  ${head({ kicker: 'المعرفة', title: 'ثمانية أبواب', sub: 'كلّ صفحة بقلم عالم، وبإذنٍ قبل النشر.', back: true,
    actions: `<button class="icon-btn" data-search aria-label="بحث">${icon('search')}</button>` })}
  <div class="wrap lift stack">
    ${card(`<div class="between"><div><span class="kicker-ar">تقدّمك في القراءة</span>
        <p class="h3" style="margin-top:4px">٢٣ صفحة من ٧٧</p></div><span class="tag tag-acc">٤ جديدة</span></div>
      <div class="bar" style="margin-top:12px"><i style="width:30%"></i></div>
      <p class="hint" style="margin-top:10px">التقدّم يُحسب هنا على المعرفة وحدها. الدرس ليس عبادة، والعبادة لا تُقاس بنقاط.</p>`)}
    <div class="bento" style="margin-top:4px">
      ${SECTIONS.map(([t, ic, n], k) => `
        <div class="card card-tap cell ${k === 0 ? 'b-wide' : ''}" data-go="#/knowledge" style="padding-top:22px">
          <svg viewBox="0 0 100 26" preserveAspectRatio="none" style="position:absolute;inset-block-start:0;inset-inline:0;height:16px;color:var(--acc);opacity:.16" aria-hidden="true">
            <path d="${muqarnasPath(100, 26, { step: 3, shoulder: .9, inset: .16 })}" fill="currentColor"/></svg>
          <div style="color:var(--acc)">${icon(ic, 'ic-lg')}</div>
          <div><b class="h3">${t}</b><p class="hint">${toAr(n)} صفحات</p></div>
        </div>`).join('')}
    </div>
    <div class="sec">
      ${secHead('صفحة نموذجيّة')}
      ${card(`<span class="kicker-ar">الوصيّة والميراث</span>
        <h3 class="h2" style="margin-top:8px">الوصيّة: واجبة أم مستحبّة؟</h3>
        <div class="rule" style="margin-block:14px"></div>
        <p class="matn" style="font-size:15px">الوصيّة مستحبّة في نفسها، وتصير واجبة إذا كان على الإنسان حقٌّ لا يُعرف إلّا بإخباره — كدَينٍ لا بيّنة عليه، أو أمانةٍ عنده، أو حقوقٍ شرعيّة في ذمّته…</p>
        <div class="verse" style="margin-top:16px">كُتِبَ عَلَيْكُمْ إِذَا حَضَرَ أَحَدَكُمُ ٱلْمَوْتُ إِن تَرَكَ خَيْرًا ٱلْوَصِيَّةُ لِلْوَٰلِدَيْنِ وَٱلْأَقْرَبِينَ بِٱلْمَعْرُوفِ
          <span class="verse-ref">البقرة · ١٨٠</span></div>
        <div class="verse-hidden-note">آية مخفيّة بحسب إعدادك. يمكنك إظهار النصّ القرآنيّ من حسابك.</div>
        <p class="hint" style="margin-top:14px">النصّ القرآنيّ بخطٍّ خاصّ به دائماً، وفي حقلٍ خاصّ به، ولا يكون أبداً عنوان زرّ.</p>`)}
    </div>
    <div style="height:20px"></div>
  </div>`;
  animateIn(root);
}
