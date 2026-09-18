/**
 * ihtidar.js — الاحتضار, on the الكفن ground.
 *
 * ─── THIS IS THE MOST IMPORTANT SCREEN IN THE PRODUCT ───────────────────────
 * Someone opens it at the worst moment of their life, on a phone, with shaking
 * hands, in a hospital corridor, possibly with no signal. Every decision here is
 * made for that person and for nobody else.
 *
 *   WHITE, NOT BLACK. White is the kafan. Black is makrūh in ordinary Shia use,
 *   its mourning exception is narrow, and a black screen here would be both
 *   jurisprudentially wrong and visually hostile. This is the single
 *   highest-leverage decision in the whole design.
 *
 *   ONE INSTRUCTION PER SCREEN. GOV.UK, NHS and the stress literature are
 *   unanimous, and every skin in the system is forbidden from changing it.
 *
 *   20px BODY, 56px TARGETS, PERSISTENT BACK AND NEXT, WORKS OFFLINE.
 *
 *   NO MOTION AT ALL except opacity (motion.js: السكون). Animation here is not
 *   delight; it is an obstacle between a person and an instruction they need
 *   right now.
 *
 *   NO RED ANYWHERE, including on destructive controls. Red is martyrdom and
 *   vengeance, and in taʿziya convention it is the villain's colour. An ordinary
 *   person dying of illness is not a martyr, and framing them as one is a
 *   category error the family will feel.
 *
 *   NO PHOTOGRAPH OF A BODY, EVER. Drawn panels only (NO-GO 7).
 *
 *   ONE GREEN ELEMENT: the jarīda, the fresh green twig placed with the body.
 *   It is the only colour on the ground, and it is the only living thing.
 *
 * The app also does NOT keep a timestamped log of when this screen was opened.
 * A counter, nothing more. The server has no business holding a record of the
 * exact nights someone read the death guidance.
 */
import { head, card, icon, animateIn } from '../core/ui.js';
import { toAr } from '../core/num.js';
import { jarida } from '../core/ornament.js';
import { setGround } from '../core/theme.js';
import { stillness } from '../core/motion.js';

const STEPS = [
  ['وجِّهه إلى القبلة', 'يُستحبّ أن يُوجَّه المحتضر إلى القبلة، مستلقياً على ظهره، وباطنُ قدميه نحوها. إن تعذّر ذلك لحالته، فلا حرج.'],
  ['لقِّنه الشهادتين', 'يُلقَّن برفق، من غير إلحاح ولا رفع صوت: الشهادتان، والإقرار بالأئمّة عليهم السلام. يُقال أمامه، ولا يُطلب منه أن يردّد.'],
  ['اقرأ عنده', 'يُستحبّ قراءة سورة يس والصافّات عنده، لتخفيف سكرات الموت. اقرأ بصوتٍ هادئ.'],
  ['خفِّف عنه', 'لا يُترك وحده. يُحسن إغماضُ عينيه وإطباقُ فمه بعد الوفاة، وشدُّ لحييه، ومدُّ يديه إلى جنبيه.'],
  ['بعد الوفاة', 'يُغطّى بثوب، ويُعجَّل في تجهيزه. لا يُترك عنده مَن لا يملك نفسه من الصياح — والصبرُ عند الصدمة الأولى.'],
  ['من تتّصل به', 'الغاسل، والمسجد أو الحسينيّة، والمقبرة. أرقامك محفوظة هنا وتعمل بلا إنترنت.'],
];

let step = 0;

export function ihtidar(root, go) {
  setGround('shroud');
  root.innerHTML = `
  ${head({ kicker: 'الاحتضار', title: 'ما يُفعل الآن', back: true, rosette: false, kufic: false,
    sub: 'خطوةٌ واحدة في كلّ شاشة. يعمل بلا إنترنت.' })}
  <div class="wrap lift" style="padding-top:26px">
    <div class="row" style="gap:10px;margin-bottom:26px">
      <span style="color:var(--acc);flex:none">${jarida({ size: 40 })}</span>
      <p class="hint" style="font-size:15px">أعانك الله. خُذ نفساً. كلّ ما يلي مستحبّاتٌ وآداب، وما تعذّر منها فلا إثم فيه.</p>
    </div>

    <p class="kicker-ar">الخطوة ${toAr(step + 1)} من ${toAr(STEPS.length)}</p>
    <h2 class="display" style="font-size:34px;margin-top:12px">${STEPS[step][0]}</h2>
    <p style="font-size:20px;line-height:1.85;margin-top:20px">${STEPS[step][1]}</p>

    <div class="steps" style="margin-top:34px">${STEPS.map((_, k) => `<i ${k <= step ? 'data-on' : ''}></i>`).join('')}</div>

    <div class="row" style="gap:12px;margin-top:22px">
      <button class="btn btn-ghost" data-prevstep style="flex:1;min-height:56px" ${step === 0 ? 'disabled' : ''}>السابق</button>
      <button class="btn" data-nextstep style="flex:2;min-height:56px">${step === STEPS.length - 1 ? 'إلى الأرقام' : 'التالي'}</button>
    </div>

    <div style="margin-top:40px">
      <div class="rule" style="opacity:.35"></div>
      <p class="hint" style="margin-top:16px;font-size:15px">هذه الصفحة محفوظة على هاتفك وتُفتح بلا شبكة. لا نحتفظ بسجلٍّ للأوقات التي فتحتَها فيها.</p>
    </div>
    <div style="height:40px"></div>
  </div>`;
  animateIn(root);
  stillness(root);   // السكون — every movement cancelled on this ground
  root.querySelector('[data-nextstep]').onclick = () => { if (step < STEPS.length - 1) { step++; ihtidar(root, go); } };
  root.querySelector('[data-prevstep]').onclick = () => { if (step > 0) { step--; ihtidar(root, go); } };
}
