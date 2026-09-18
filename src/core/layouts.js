/**
 * layouts.js — the STRUCTURE axis, independent of colour.
 *
 * Twelve layouts in four families, and four surfaces. They compose: 12 × 4 × 8
 * palettes is 384 distinct looks out of 24 rows of data. The previous version
 * bundled one of eight home arrangements INTO each of seventeen palettes, which
 * is exactly why all seventeen looked like the same app — the only structural
 * thing a skin controlled was the home screen, and every other tab was identical
 * in all of them.
 *
 * `recommended` marks the per-module defaults this design actually argues for.
 * The atlas is explicit that each archetype has a best screen, and forcing one
 * structure across five tabs wastes that. So: bento on الرئيسية, register on
 * القضاء, editorial on المعرفة, manuscript on الوصيّة, calligraphy on الاحتضار.
 * The global switcher stays so the alternatives can be compared on a real phone
 * rather than argued about in the abstract.
 */
export const DEFAULT_LAYOUT = 'bento';
export const DEFAULT_SURFACE = 'glass';

export const LAYOUTS = [
  { key: 'manuscript', ar: 'المخطوط', en: 'Manuscript', family: 'page', best: 'الوصيّة',
    note: 'عمود المتن وهامش ثابت، كصفحة مخطوط.' },
  { key: 'editorial', ar: 'المجلة', en: 'Editorial', family: 'page', best: 'المعرفة',
    note: 'مساحات واسعة وعناوين كبيرة. الأهدأ، والأطول تمريراً.' },
  { key: 'khat', ar: 'الخط', en: 'Calligraphy', family: 'page', best: 'الاحتضار',
    note: 'بلا بطاقات. الخطّ وحده يحمل الترتيب.' },

  { key: 'cards', ar: 'البطاقات', en: 'Cards', family: 'grid',
    note: 'المرجع الذي تُقاس عليه البقيّة.' },
  { key: 'bento', ar: 'الشبكة', en: 'Bento', family: 'grid', best: 'الرئيسيّة', recommended: true,
    note: 'عمودان، وبطاقة واحدة كبيرة تتصدّر.' },
  { key: 'shelves', ar: 'الرفوف', en: 'Shelves', family: 'grid',
    note: 'صفّ لكلّ مجموعة، يُمرَّر أفقيّاً.' },

  { key: 'register', ar: 'السجل', en: 'Register', family: 'dense', best: 'القضاء',
    note: 'أسطر متتابعة وأرقام على الطرف.' },
  { key: 'path', ar: 'المسار', en: 'Path', family: 'dense', best: 'الصلاة',
    note: 'خطّ رأسيّ وعُقَد مرقّمة. اليوم كمسار، وعليه علامة الآن.' },
  { key: 'ring', ar: 'الحلقة', en: 'Ring', family: 'dense',
    note: 'رقم واحد كبير في الأعلى، والبقيّة أبواب تحته.' },

  { key: 'portal', ar: 'المنبر', en: 'Portal', family: 'form',
    note: 'أقواس بدل الزوايا المستديرة. لا يشبه أيّ تطبيق آخر.' },
  { key: 'sheets', ar: 'الطبقات', en: 'Sheets', family: 'form',
    note: 'خلفيّة ثابتة ومحتوى يعلوها كطبقة.' },
  { key: 'brut', ar: 'الحاد', en: 'Hard Edge', family: 'form',
    note: 'حدود سميكة وظلال حادّة. الأوضح لمن يصعب عليه النظر.' },
];

export const SURFACES = [
  { key: 'glass', ar: 'زجاج', en: 'Glass' },
  { key: 'flat', ar: 'مسطّح', en: 'Flat' },
  { key: 'hard', ar: 'ظلّ حادّ', en: 'Hard shadow' },
  { key: 'none', ar: 'بلا حدود', en: 'Borderless' },
];
