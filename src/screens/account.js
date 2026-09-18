/**
 * account.js — حسابي, plus the two role surfaces: الاستوديو (scholar) and
 * لوحة الإدارة (owner).
 *
 * THE THREE DOORS. One sign-in, three landings, decided by my_permissions() in
 * the database — never by a hardcoded role check in a screen file and never by
 * which URL you happened to type. A person who types #/admin does not get a
 * broken empty console; they get a screen that says what happened and offers the
 * way out.
 *
 * A scholar is ALSO a person, with their own prayers and their own will, so the
 * studio is an addition to the personal app rather than a replacement for it.
 *
 * And the publish rule, which is the reason the studio exists at all: a scholar
 * may write and correct any religious line and SUBMIT it. Only the owner
 * publishes. Not an admin, not a QC role — the owner. Every religious line in
 * this product is approved by one named human before a user ever sees it.
 */
import { head, card, secHead, regRow, icon, animateIn, sheet } from '../core/ui.js';
import { toAr } from '../core/num.js';
import { PALETTES, GROUNDS, state as theme, set as setTheme, setGround } from '../core/theme.js';
import { LAYOUTS, SURFACES } from '../core/layouts.js';
import { demo } from './main.js';

export function account(root, go) {
  setGround(null);
  root.innerHTML = `
  ${head({ kicker: 'حسابي', title: demo.name, back: true, sub: '+٩٦١ ٣ ••• ••٤' })}
  <div class="wrap lift stack">
    ${card(`<div class="reg">
      ${regRow({ label: 'الأنماط والألوان', sub: 'ثماني لوحات · اثنا عشر تخطيطاً', ic: 'palette', go: true })}
      ${regRow({ label: 'اللغة', fig: 'العربيّة', ic: 'language', go: true })}
      ${regRow({ label: 'التذكير', fig: 'صلاتان', ic: 'bell', go: true })}
      ${regRow({ label: 'إظهار النصّ القرآنيّ', fig: theme.quran === 'on' ? 'مُفعَّل' : 'مُوقَف', ic: 'doc', go: true })}
    </div>`, 'card-flush')}
    ${card(`<span class="kicker-ar">إظهار النصّ القرآنيّ</span>
      <p class="hint" style="margin-top:6px">حين يكون مُوقَفاً، لا يُعرض أيّ نصّ قرآنيّ في التطبيق ويُستبدَل بإشارة. الحكم يتعلّق بالبكسل المعروض لا بالملفّ المخزَّن، ولهذا يوجد هذا المفتاح أصلاً — لمن هي حائض أو لمن ليس على وضوء.</p>
      <div class="row" style="gap:8px;margin-top:12px">
        <button class="btn btn-sm ${theme.quran === 'on' ? '' : 'btn-quiet'}" data-q="on">إظهار</button>
        <button class="btn btn-sm ${theme.quran === 'off' ? '' : 'btn-quiet'}" data-q="off">إيقاف</button>
      </div>`)}
    <div class="sec">
      ${secHead('الأدوار')}
      ${card(`<div class="reg">
        ${regRow({ label: 'استوديو العلماء', sub: 'يكتب ويصحّح — ولا ينشر', ic: 'edit', go: true })}
        ${regRow({ label: 'لوحة الإدارة', sub: 'النشر، والأخطاء، والصلاحيّات', ic: 'gear', go: true })}
        ${regRow({ label: 'دليل التصميم', sub: 'اللوحات والحركة والخطوط', ic: 'grid', go: true })}
      </div>`, 'card-flush')}
    </div>
    ${card(`<div class="reg">
      ${regRow({ label: 'نسخة البناء', fig: 'design-8', sub: 'وما عدد المفاتيح النصّيّة المحمّلة', stat: true })}
      ${regRow({ label: 'حالة المزامنة', fig: 'متّصل', ic: 'sync', stat: true })}
    </div>`, 'card-flush')}
    <button class="btn btn-danger btn-block">تسجيل الخروج</button>
    <div style="height:20px"></div>
  </div>`;
  animateIn(root);
  const rows = root.querySelectorAll('.reg-row');
  rows[0].onclick = () => stylesSheet(root, go);
  rows[7]?.addEventListener('click', () => studio(root, go));
  rows[8]?.addEventListener('click', () => admin(root, go));
  rows[9]?.addEventListener('click', () => { location.href = 'system/'; });
  root.querySelectorAll('[data-q]').forEach((b) => b.onclick = () => { setTheme('quran', b.dataset.q); account(root, go); });
}

/** The styles sheet — the comparison surface. Palette, layout and surface are
 *  three independent choices, which is the whole difference between seventeen
 *  bundled skins and a skin SYSTEM: changing one does not disturb the other two. */
export function stylesSheet(root, go) {
  const close = sheet('الأنماط', `
    <div class="stack-lg">
      <div>
        <span class="kicker-ar">اللوحة — الكتلة الملوّنة، والبطاقات بيضاء تحتها</span>
        <div class="swatches" style="margin-top:12px">
          ${PALETTES.map((p) => `<button class="sw" data-pal="${p.key}" aria-pressed="${theme.palette === p.key}">
            <span class="sw-chip" style="background:${p.v.head}"><i style="background:${p.v.card}"></i></span>
            <span class="grow"><span class="sw-name">${p.ar}</span><span class="sw-meta">${p.en}</span></span></button>`).join('')}
        </div>
        <p class="hint" style="margin-top:10px">كلّ لوحة مقيسة: ٤٫٥:١ على كلّ زوج نصّ، وللعناوين أيضاً — لأنّ الحرف العربيّ يُميَّز بنقاطٍ بحجم ٨٪ من السطر، فلا يصحّ استثناء الخطّ الكبير.</p>
      </div>
      <div>
        <span class="kicker-ar">التخطيط — البنية، لا اللون</span>
        <div class="stack" style="margin-top:12px">
          ${['page', 'grid', 'dense', 'form'].map((fam) => `
            <div><span class="kicker-ar" style="margin-bottom:6px">${({ page: 'الصفحة', grid: 'الشبكة', dense: 'الكثيف', form: 'النموذج' })[fam]}</span>
            <div class="row" style="gap:8px;flex-wrap:wrap">
              ${LAYOUTS.filter((l) => l.family === fam).map((l) => `
                <button class="btn btn-sm ${theme.layout === l.key ? '' : 'btn-quiet'}" data-lay="${l.key}">${l.ar}</button>`).join('')}
            </div></div>`).join('')}
        </div>
      </div>
      <div>
        <span class="kicker-ar">السطح — كيف تُعلن البطاقة عن نفسها</span>
        <div class="row" style="gap:8px;margin-top:12px;flex-wrap:wrap">
          ${SURFACES.map((s) => `<button class="btn btn-sm ${theme.surface === s.key ? '' : 'btn-quiet'}" data-surf="${s.key}">${s.ar}</button>`).join('')}
        </div>
      </div>
      ${card(`<p class="hint">الوصيّة والاحتضار لا تتبعان اللوحة المختارة. لهما أرضيّتان ثابتتان — الوثيقة والكفن — لأنّ المزاج يحمله الموضع لا نظام الألوان. وهذا بالضبط ما يسمح لبقيّة التطبيق أن يكون مضيئاً.</p>`)}
    </div>`);
  const d = root.ownerDocument;
  d.querySelectorAll('[data-pal]').forEach((b) => b.onclick = () => { setTheme('palette', b.dataset.pal); close(); stylesSheet(root, go); });
  d.querySelectorAll('[data-lay]').forEach((b) => b.onclick = () => { setTheme('layout', b.dataset.lay); close(); stylesSheet(root, go); });
  d.querySelectorAll('[data-surf]').forEach((b) => b.onclick = () => { setTheme('surface', b.dataset.surf); close(); stylesSheet(root, go); });
}

export function studio(root, go) {
  setGround(null);
  root.innerHTML = `
  ${head({ kicker: 'استوديو العلماء', title: 'مكتب المراجعة', back: true, sub: 'تكتب وتصحّح وترسل. النشر لهادي وحده.' })}
  <div class="wrap lift stack">
    ${card(`<div class="bento">
      <div class="card cell"><span class="kicker-ar">بانتظارك</span><div class="n-lg">٤</div></div>
      <div class="card cell"><span class="kicker-ar">بانتظار الإذن</span><div class="n-lg">٢</div></div>
    </div>`, 'card-flush')}
    <div class="sec">
      ${secHead('المُسنَد إليك')}
      ${card(`<div class="reg">
        ${regRow({ label: 'القضاء والفوائت — ٩ صفحات', sub: 'مسوّدة · آخر تعديل أمس', ic: 'edit', go: true })}
        ${regRow({ label: 'تلقين المحتضر', sub: 'مُرسَلة · بانتظار الإذن', ic: 'doc', go: true })}
        ${regRow({ label: 'الخمس — تعريف', sub: 'مُرسَلة · بانتظار الإذن', ic: 'doc', go: true })}
      </div>`, 'card-flush')}
    </div>
    <div class="sec">
      ${secHead('تحرير سطر')}
      ${card(`<span class="kicker-ar">will.debts.hint</span>
        <div class="field" style="margin-top:10px">
          <textarea class="input" rows="4" style="line-height:1.8">إن لم تكن للدَّين بيّنة، فإخبارُك به واجب — وهذا أحد المواضع التي تصير فيها الوصيّة واجبة لا مستحبّة.</textarea>
        </div>
        <div class="row" style="gap:8px;margin-top:12px">
          <button class="btn btn-ghost btn-sm" style="flex:1">حفظ مسوّدة</button>
          <button class="btn btn-sm" style="flex:1">إرسال للإذن</button></div>
        <p class="hint" style="margin-top:12px">لن يتحرّك هذا السطر في التطبيق الحيّ قبل أن يوافق عليه هادي. لا يوجد استثناء، ولا حتّى لمدير.</p>`)}
    </div>
    <div style="height:20px"></div>
  </div>`;
  animateIn(root);
}

export function admin(root, go) {
  setGround(null);
  root.innerHTML = `
  ${head({ kicker: 'لوحة الإدارة', title: 'المكتب', back: true, sub: 'كلّ نشرٍ وكلّ إصدار مسجَّل باسمك.' })}
  <div class="wrap lift stack">
    <div class="bento">
      <div class="card cell"><span class="kicker-ar">بانتظار الإذن</span><div class="n-lg">٢</div>
        <span class="tag tag-acc">من عالمَين</span></div>
      <div class="card cell"><span class="kicker-ar">أخطاء اليوم</span><div class="n-lg">٠</div>
        <span class="tag">يجب أن يكون صفراً</span></div>
      <div class="card cell b-wide"><div class="between">
        <div><span class="kicker-ar">صندوق الإرسال</span><p class="h3" style="margin-top:4px">٠ عالقة</p></div>
        <span style="color:var(--acc)">${icon('sync', 'ic-lg')}</span></div></div>
    </div>
    <div class="sec">
      ${secHead('المحتوى')}
      ${card(`<div class="reg">
        ${regRow({ label: 'تلقين المحتضر', sub: 'سامر · منذ ٣ ساعات', fig: 'راجِع', go: true })}
        ${regRow({ label: 'الخمس — تعريف', sub: 'سامر · أمس', fig: 'راجِع', go: true })}
      </div>`, 'card-flush')}
    </div>
    <div class="sec">
      ${secHead('الصلاحيّات', '<span class="kicker-ar">تُقرأ من قاعدة البيانات</span>')}
      ${card(`<div class="reg">
        ${regRow({ label: 'شخص', sub: 'صلاته ووصيّته ورسائله — ولا شيء لأحد غيره', stat: true })}
        ${regRow({ label: 'عالم', sub: 'يكتب في الدينيّ والتقويم · لا يرى وصيّة أحد', stat: true })}
        ${regRow({ label: 'مالك', sub: 'ينشر — وحده', stat: true })}
      </div>
      <p class="hint" style="margin-top:14px">تُعرَض هذه الشبكة كما هي في قاعدة البيانات، لا كما نفترضها. لو اختلف الادّعاء عن الواقع لظهر الاختلاف هنا.</p>`, 'card-flush')}
    </div>
    <div style="height:20px"></div>
  </div>`;
  animateIn(root);
}

/** The refusal screen. A wrong role must never look like a broken app. */
export function denied(root, go) {
  setGround(null);
  root.innerHTML = `
  ${head({ kicker: 'لا صلاحيّة', title: 'هذه الصفحة ليست لك', back: true })}
  <div class="wrap lift stack">
    ${card(`<div class="empty">${icon('lock', 'ic-lg')}
      <p class="body">حسابك حسابُ شخص، وهذه الصفحة للمالك. لم يحدث خطأ، ولم يُكسَر شيء.</p>
      <button class="btn" data-go="#/home" style="margin-top:18px">إلى الرئيسيّة</button></div>`)}
  </div>`;
  animateIn(root);
}
