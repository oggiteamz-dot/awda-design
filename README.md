# عَوْدة · AWDA — design build 8

A complete visual direction, design system and clickable prototype for the Arabic
Shia Islamic app: **missed-prayer recovery (qaḍāʾ), an Islamic will (waṣiyyah), and
guidance at the time of dying (iḥtiḍār).**

**→ [Open the prototype](./)**  ·  **→ [Open the design system & direction](./system/)**

Built overnight, 18 September 2026. Arabic, RTL-first, phone-first at 390px.

---

## What this repository is, and what it is not

**It is** the design layer: the palette system, the typography, the ornament and icon
geometry, the motion system, the layout decision, and a working prototype of every
screen including a new 14-step onboarding.

**It is not** the product. The real app lives in the private `oggi-salah` work with its
Supabase schema, its accounts, and its twelve real testers. Nothing here touches it.
`oggi-salah-app.oggi-teamz.workers.dev` is frozen under SPEC R-12 until ACCEPTANCE.md is
signed, and this repository does not reach it.

All data in the prototype is invented. No real user's will, phone number or prayer log
is in this repository.

---

## The two things that were blocking the project

**1. All six palettes were rejected** — *"this app isn't only about death. It's about
education, about faith."*

The fix is not a lighter palette. It is that **the mood moves out of the palette and into
the module.** A palette is now a bright identity; the two sombre registers are fixed
grounds that every palette wears unchanged:

| Ground | Where | What it is |
|---|---|---|
| **المرصد** Observatory | Home · Prayer · Qaḍāʾ · Knowledge | Saturated colour block on top, white cards below |
| **الوثيقة** Document | The will | Parchment and ink, 10px radius, numbered articles, no gold |
| **الكفن** Shroud | Iḥtiḍār | Near-white, huge whitespace, no motion, one green element |

So the app can be alive on الرئيسية and silent on الاحتضار without one palette trying to
be both. **Eight palettes, 164 text pairs, 4.5:1 floor including headings, zero failures.**

**2. No layout had been chosen from the twelve.** The recommendation is not to choose one —
it is one layout per module, because the atlas itself says each archetype has a best
screen, and forcing one structure across five tabs is exactly why seventeen skins looked
like one app. The global switcher stays so the alternatives can be compared on a phone.

---

## The direction, in one sentence

**This is an instrument, not a shrine.**

The astrolabe, the zīj tables and the science of mīqāt were built by Muslim astronomers
*to do religion precisely* — to find the qibla and fix the hours of prayer. The scientific
register is not borrowed from outside the faith; it is native to it. That is the bridge
between "scientific and technologically advanced" and "connected to God", and no other app
in this category takes it, because they all reach for the mosque silhouette, the crescent
and the lantern.

---

## Run it

```bash
python3 -m http.server 8000     # any static server; there is no build step
```

No framework, no npm, no bundler (D-001). Plain ES modules. Deployed by dragging a folder.

| | |
|---|---|
| `src/core/palettes.js` | **the only file where a colour may exist** — 8 palettes + 2 fixed grounds |
| `src/core/layouts.js` | the structure axis — 12 layouts × 4 surfaces |
| `src/core/ornament.js` | girih rosette, turbah, square Kufic, muqarnas, āyina-kārī, astrolabe arc — all constructed, none traced |
| `src/core/icons.js` | 38 icons on the same geometry. No emoji anywhere |
| `src/core/motion.js` | nine named movements, and السكون which cancels them all on iḥtiḍār |
| `src/core/num.js` | Eastern Arabic numerals, the Hijri calendar, and the qaḍāʾ arithmetic |
| `src/screens/` | onboarding · home · prayer · qaḍāʾ · calendar · knowledge · will · iḥtiḍār · account · studio · admin |
| `scripts/contrast.mjs` | the gate. `node scripts/contrast.mjs` — exits non-zero below 4.5:1 |
| `docs/DIRECTION.md` | the full written direction |

Reviewing on a laptop: **`]`** cycles palettes, **`\`** cycles layouts.

---

## What this design refuses to do

Each of these is a deliberate decision with a reason, not an omission.

- **No streaks, points, badges or leaderboards on a sacred act.** A streak punishes illness,
  menstruation, travel and grief — the exact circumstances Islamic law already excuses —
  and introduces riyāʾ into an act whose validity depends on intention.
- **No red anywhere**, including on destructive buttons. Red is martyrdom and vengeance,
  and in taʿziya convention it is the villain's colour.
- **Black is not the colour of death here. White is.** White is the kafan. Black is makrūh
  in ordinary Shia use and its mourning exception is narrow.
- **No emoji.** Somebody else's drawing, rendered differently on every phone.
- **No crescent-and-star, mosque silhouette, lantern, ʿalam, Dhū al-Fiqār, panja, tulip, or
  figural image of the Imams.** Each is either the category default, politically coded,
  talismanically coded, or prohibited by a named Shia jurist.
- **No Qurʾānic text shaped into any form** — not the rosette, not a loading animation, not
  a logo. The one hard prohibition with an explicit Fiqh Council ruling behind it.
- **No verse as a button label.** `.verse` has `pointer-events:none` so it cannot become one.
- **No ads, no payment path, no paywall, no trial countdown.** Half the onboarding flows
  measured on Mobbin end in a subscription screen. This product has no payment path at all.
- **No "based on millions of data points".** The computation screen computes.

---

## Research this is built on

- `docs/research/SHIA-ICONOGRAPHY.md` (62 KB) and `docs/research/LAYOUT-ATLAS.md` (65 KB),
  from the project repository — every candidate symbol checked against Shia sources.
- A Mobbin census run 18 Sep 2026: **60 screens and 7 full flows across 45 apps** in
  business, health and lifestyle — and deliberately no Islamic apps. Cited screen by screen
  in [the design system page](./system/).

---

Contains no Qurʾānic text in any image, icon or exportable card.

---

## Single-file builds

`dist/awda-prototype.single.html` and `dist/awda-direction.single.html` are self-contained
bundles of the two pages — one file each, fonts from Google Fonts, no server needed. Open
either one directly in a browser, or email it to someone.
