/**
 * app.js — the router and the shell.
 *
 * Hash routing, no framework, no build step (D-001). Every screen id here exists
 * as a data-screen in the main repo's SCREENMAP, so the map and the code cannot
 * drift apart without the check noticing.
 */
import { apply, state as theme, set as setTheme } from './core/theme.js';
import { icon } from './core/icons.js';
import * as OB from './screens/onboarding.js';
import * as M from './screens/main.js';
import * as W from './screens/will.js';
import * as I from './screens/ihtidar.js';
import * as A from './screens/account.js';
import * as AR from './screens/areas.js';
import { stylesSheet } from './screens/account.js';

const app = document.getElementById('app');
const view = document.getElementById('view');

/* FOUR tabs, not five. A tab is a place you RETURN to; a card is a place you GO
   to, and home is now a launcher full of cards. الصلاة earns a tab because it is
   opened five times a day; الأقسام earns one because it is what stops home from
   growing forever as areas are added. القضاء is important and is NOT a tab — for
   a large share of users it does not exist at all. docs/HOME-AND-NAVIGATION.md §5. */
const TABS = [
  ['#/home', 'الرئيسيّة', 'home'], ['#/prayers', 'الصلاة', 'prayer'],
  ['#/index', 'الأقسام', 'grid'], ['#/account', 'حسابي', 'account'],
];

const ROUTES = {
  '#/onboarding': (r, go) => OB.mount(r, go),
  '#/home': M.home, '#/prayers': M.prayers, '#/qada': M.qada,
  '#/calendar': M.calendar, '#/knowledge': M.knowledge,
  '#/will': W.will, '#/will/section': W.section, '#/will/recipients': W.recipients,
  '#/messages': W.messages, '#/messages/record': W.record,
  '#/ihtidar': I.ihtidar,
  '#/index': AR.index, '#/history': AR.history, '#/stories': AR.stories, '#/daily': AR.daily,
  '#/account': A.account, '#/studio': A.studio, '#/admin': A.admin, '#/denied': A.denied,
};

const history_ = [];
export const go = (hash) => { location.hash = hash; };

function tabs(active) {
  const bar = document.getElementById('tabs');
  const hide = active === '#/onboarding';
  bar.hidden = hide;
  if (hide) return;
  bar.innerHTML = TABS.map(([h, t, ic]) => `
    <button class="tab" data-tab="${h}" ${h === active ? 'aria-current="page"' : ''}>
      ${icon(ic)}<span>${t}</span><span class="tab-dot"></span></button>`).join('');
  bar.querySelectorAll('[data-tab]').forEach((b) => b.onclick = () => go(b.dataset.tab));
}

function route() {
  const hash = location.hash || '#/onboarding';
  const fn = ROUTES[hash] || M.home;
  if (history_[history_.length - 1] !== hash) history_.push(hash);
  view.scrollTop = 0; window.scrollTo(0, 0);
  fn(view, go);
  tabs(hash);
  // delegated navigation — any element with data-go, and the universal back
  view.querySelectorAll('[data-go]').forEach((el) => el.onclick = (e) => { e.stopPropagation(); go(el.dataset.go); });
  view.querySelectorAll('[data-back]').forEach((el) => el.onclick = () => {
    history_.pop(); const prev = history_.pop() || '#/home'; go(prev);
  });
  view.querySelectorAll('[data-styles]').forEach((el) => el.onclick = () => stylesSheet(view, go));
}

window.addEventListener('hashchange', route);
apply();
route();

// Keyboard shortcuts for reviewing on a laptop: ] and [ cycle palettes,
// \ cycles layouts. Not shipped to users — a review affordance, and the reason
// comparing eight palettes on a real screen takes seconds instead of minutes.
import { PALETTES } from './core/palettes.js';
import { LAYOUTS } from './core/layouts.js';
addEventListener('keydown', (e) => {
  if (e.target.matches('input,textarea')) return;
  const cyc = (arr, key) => { const i = arr.findIndex((x) => x.key === theme[key]); return arr[(i + 1) % arr.length].key; };
  if (e.key === ']') setTheme('palette', cyc(PALETTES, 'palette'));
  if (e.key === '\\') setTheme('layout', cyc(LAYOUTS, 'layout'));
});
