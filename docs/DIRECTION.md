# عَوْدة · AWDA — the design direction

**18 September 2026 · design build 8**

Written after reading the project's own research (`SHIA-ICONOGRAPHY.md`, 62 KB;
`LAYOUT-ATLAS.md`, 65 KB), the approved SPEC, the DECISIONS log, the scholar's
corrections, and a fresh Mobbin census of 60 screens and 7 flows across 45 apps.

---

## 0 · The brief, and what it actually asked for

> *"Modern, with religious iconography and animations and typography. It has to be
> Arabic… I don't want it to look like any other Islamic app. I want something that
> looks scientific, technologically advanced, at the same time connected to God."*

Three demands that are usually in tension, plus one constraint that resolves them.

"Scientific" and "connected to God" read as opposites only if you accept the modern
split between the two. **In the material this app is actually about, there is no split.**
The astrolabe was a religious instrument. The zīj tables were computed so that prayer
times could be fixed. ʿIlm al-mīqāt — the science of timekeeping — existed because the
obligation is time-bound, and the qibla is a spherical-trigonometry problem that Muslim
astronomers solved centuries before anyone needed it for anything else.

And this app's own subject matter is arithmetic. A qaḍāʾ debt is a computation on a
life: obligation age in lunar years, days elapsed, days already prayed, the menstruation
subtraction. The Hijri calendar is a lunar observation carrying a ±1 day uncertainty
that the spec already requires a control for.

So the direction is one sentence:

> ## **This is an instrument, not a shrine.**

Not a mosque rendered in CSS. Not a lantern. An engraved brass instrument that happens
to carry the same geometry as the shrine, because historically it did.

That is also, precisely, the differentiation. Every app in this category reaches for the
same three marks — the crescent-and-star, the dome silhouette, the Rub el Hizb ۞ — and
the research is blunt that the last of these is "pan-Islamic, zero Shia specificity,
already the category default." Using any of them is an announcement that the app is like
the others.

---

## 1 · Why the six palettes were rejected, and the actual fix

**17 September:** *"this app isn't only about death. It's about education, about faith."*

Four dark palettes and two muted lights. Every one of them read as a grief app. The
diagnosis is not "too dark" — it is that **all six put the mood in the palette.**

An app that has to be an educational library, a personal ledger, a legal document and a
deathbed guide cannot express all four moods through one colour scheme. Forced to
choose, the previous set chose the most solemn thing the app does, and then wore it on
every screen, including the one where a person taps to record that they prayed ʿaṣr.

**The fix: the mood moves out of the palette and into the module.**

| Ground | Where it applies | What it is | Why |
|---|---|---|---|
| **المرصد** · Observatory | Home, Prayer, Qaḍāʾ, Knowledge | Saturated colour block on top; white/near-white cards below | The app's everyday register. Bright, alive, educational |
| **الوثيقة** · Document | The will | Parchment, ink, 10px radius, justified matn, numbered articles, **no gold** | A will is a legal instrument read by grieving people and possibly a judge |
| **الكفن** · Shroud | Iḥtiḍār | Near-white, huge whitespace, 20px body, 56px targets, **no motion**, one green element | White is the kafan. Restraint *is* the design here |

The two fixed grounds do not change with the palette, deliberately. A person does not
choose to be sombre on الاحتضار; the module is sombre because of what it is. **That is
what frees the palettes to be bright everywhere else.**

Gold disappears on both fixed grounds, and that is a ruling, not a taste: gold-woven
cloth is prohibited in the kafan, so gold stays off anything touching the body or the
burial. Gold belongs to the shrine, not to the grave.

---

## 2 · The structural pattern that lets a palette be bright

Measured on Mobbin across **Monzo, Buddy, Copilot Money, Rocket Money, KOHO and Affirm**:

> The bright apps that stay legible put a **saturated colour block at the top** and
> **white or near-white cards below it.** Body text never sits on the saturated colour —
> only display numerals and one white label do.

That is why brightness costs them nothing in contrast, and it is exactly what the old
light palettes got wrong by putting grey text on a pale ground.

Two implementation details carry it:

1. Every palette row has **two grounds**: `head / head-ink / head-soft` for the saturated
   block, and `bg / card / ink / soft` for the reading surface. All body text lives on
   the second.
2. The first card **overlaps the block's lower edge** by 40px. Without that overlap the
   block reads as a banner stuck on top of an app; with it, the block reads as the app's
   own ground.

---

## 3 · The eight palettes

Each one is sourced from something real, not picked from a colour wheel.

| | Arabic | Source |
|---|---|---|
| 1 | **الزمرّد** Emerald | Shrine-tile green. Ahl al-Bayt and sayyid descent — the safest positive colour in the register. **The identity.** |
| 2 | **الفيروز** Turquoise | The *moʿarraq* faience turquoise of the ʿatabāt — the single most recognisable shrine colour to an Iraqi or Lebanese viewer |
| 3 | **اللازورد** Lapis | Manuscript rubrication: lapis for a heading, madder for a section break. In Islamic manuscript practice colour is **navigation**, not decoration |
| 4 | **النيلي** Indigo | The instrument register, carried on shrine geometry rather than on charts alone |
| 5 | **الياقوت** Plum | The aubergine of Safavid *haft-rang* seven-colour tile. Present in the shrine palette, absent from every app in this category |
| 6 | **الصحراء** Clay | Turbah earth — the prayer-surface colour. Humble and repetitive, which is correct for a long obligation |
| 7 | **البرونز** Bronze | Engraved astrolabe brass. The instrument palette, literally |
| 8 | **الحبر** Ink | Dark mode. **Charcoal, deliberately not pure black** |

**On palette 8 and why it is not black:** black is makrūh in ordinary Shia use, and its
mourning exception is explicit and narrow — permitted for mourning the Imams as
*taʿẓīm al-shaʿāʾir*, endorsed by Khāmeneʾī, Sīstānī and Makārim Shīrāzī. A pure-black
chrome across the whole app is therefore not "minimal" to this audience. It says
*mourning* on every screen. So dark mode is #14181B charcoal, and light mode is default.

### The floor, and the gate

**4.5:1 on every text pair, including headings. No large-text exemption.**

WCAG allows 3:1 for large text. That exemption measures large-area luminance and knows
nothing about the dots and tashkīl that carry meaning in Arabic — a jīm and a ḥāʾ differ
by one dot at 8–10% of the em. A grey that reads as "subtle" in Latin is illegible in
Arabic, and that is exactly how six of the original seventeen palettes shipped below the
floor.

`scripts/contrast.mjs` measures every pair on every build, at both the darkest and
lightest stop of every gradient, and exits non-zero on any failure.

```
  palette                   worst   where
  --------------------------------------------------------------------------
  sahra (الصحراء)           4.70:1  secondary type on the saturated block
  fayruz (الفيروز)          4.71:1  secondary type on the saturated block
  zumurrud (الزمرّد)        4.73:1  secondary type on the saturated block
  bronz (البرونز)           4.75:1  secondary type on the saturated block
  nili (النيلي)             5.23:1  secondary type on the saturated block
  yaqut (الياقوت)           5.40:1  secondary type on the saturated block
  lazuward (اللازورد)       5.51:1  secondary type on the saturated block
  hibr (الحبر)              5.74:1  secondary type on the saturated block
  ground:shroud (الكفن)     6.03:1  accent text/icon on the page ground
  ground:doc (الوثيقة)      6.17:1  secondary type on the saturated block

  164 pairs measured across 10 palettes. 0 failures.
```

The first draft of this set **failed on four palettes** — all of them on exactly the same
pair, secondary type on the saturated block. The gate caught it, the gradients were
darkened and the secondaries lightened, and it now passes. That is the check doing its
job rather than a claim that it was right first time.

---

## 4 · Typography

Three faces and one rule that is never broken.

> **Never set Qurʾān in the UI face, and never set UI in the Qurʾān face.**
> The typographic separation *is* the visual distinction a verse is required to have.
> It must never be possible to mistake a verse for our own copy.

| Face | Role | Why this one |
|---|---|---|
| **Noto Kufi Arabic** | Display, headings, all numerals | Geometric and architectural. Kufi is a display script by function and is never used for body |
| **IBM Plex Sans Arabic** | UI and body | A naskh-based UI face — and chosen over Cairo or Tajawal because **Plex was drawn as a technical face for an engineering company**, so it carries the instrument register into body copy |
| **IBM Plex Mono** | The instrument label | Tiny, letterspaced, uppercase. The WHOOP / Oura move, and what makes a screen read as measured rather than decorated |
| **Amiri Quran** | Qurʾānic text only | Never a heading, never a button, never anything else |

**Arabic has no upper case.** The Arabic form of the instrument label therefore does the
same job with small Kufi at weight 600 and **zero tracking** — because letterspacing
breaks the connection of Arabic letters. This was caught in review: the first build put
Arabic in the tracked mono label and it looked wrong immediately.

**Scale:** the Major Third (1.333) the UAE Design System uses for Arabic. A 1.2 ratio
reads "utility", a 2.5rem clamp reads "editorial", 1.333 reads "document" — which is what
a will and a fiqh page both are. **Line height 1.65 minimum**, because Arabic letters are
distinguished by marks above and below the baseline and tight leading collides tashkīl
with the next line.

**Numerals:** Eastern Arabic digits (٠١٢٣٤٥٦٧٨٩) everywhere, tabular figures always,
thousands grouped with U+066C (٬) and never a Latin comma. And every computed number
carries its basis — a qaḍāʾ estimate that appears without saying what it was computed
from is a number a person cannot argue with, and this one they must be able to argue with.

### The Qurʾānic text rules — not style preferences

| Rule | Why |
|---|---|
| **A verse is never the label of a tappable control** | A button label is UI furniture; tapping "through" a verse to get somewhere is the "adornment, not exhortation" failure. `.verse` has `pointer-events:none` so it cannot become one |
| **Qurʾānic text is never shaped into a figure, animal, logo, loading animation or geometric form** | The one hard prohibition with an explicit Fiqh Council ruling. It also rules out the tempting move of setting a verse *as* the rosette |
| **The basmala renders as verse 1, numbered, in the Qurʾānic face** | The Imāmī position is that it is a verse of every sūra but al-Barāʾa. Most Sunni-default apps make it a decorative header. Invisible to outsiders; Shia users notice |
| **A switch to suppress all Qurʾānic display** | The ruling attaches to the rendered pixels, not the stored file. Genuinely useful for a menstruating user or someone without wuḍūʾ, and no app in this category offers it |
| **﴿ﷺ﴾ is never used — «صلّى الله عليه وآله» is written in full** | U+FDFA encodes *wa sallam* without *wa ālihi*, so it silently renders the Sunni form |
| **No Qurʾānic text on shareable or exportable image cards** | You lose control of where the rendered text ends up — the digital analogue of the rubbish-bin problem |

---

## 5 · Iconography and ornament

Everything is **constructed from real girih at runtime**, not traced. Change one number
and the whole family changes; it stays crisp at any size.

### Used

| Mark | Verdict | Reason |
|---|---|---|
| **12-point girih rosette** | USE | Native to Persian and Iraqi shrine girih — where 14-fold is *not* — and reads as the Twelve Imams. **The brand mark** |
| **Turbah / muhr** | USE | The most Shia-specific everyday devotional object there is; it goes under the forehead in every sajda. The qaḍāʾ module's emblem |
| **Square Kufic (bannāʾī)** | USE | Laid in brick on shrine walls; pixel-native, scales perfectly. Pattern only — it carries no words |
| **Muqarnas cell** | USE | Shrine-coded container shape, no sectarian charge. Used as a section-header silhouette |
| **Āyina-kārī facets** | USE | The strongest "shrine interior, not generic Islamic" cue available |
| **Pointed arch / pishtaq** | USE | Composition grammar, and the prayer tab's icon — not a dome silhouette |
| **Jarīda** (the fresh green twig placed with the body) | USE | The one green element permitted on the الكفن ground |
| **Astrolabe limb** — a graduated arc with ticks | USE | Not a religious symbol at all. It is the instrument built to find the qibla and fix the prayer hours, and it is the whole bridge |

### Deliberately absent

The crescent-and-star, the mosque silhouette, the lantern, prayer beads, and **the
Rub el Hizb ۞ as a brand mark** — the category default with zero Shia specificity. The
ʿalam, Dhū al-Fiqār, the lion, the panja/khamsa, the tulip, «نادِ علياً», the mirrored
«علي» roundel, and any figural depiction of the Imams — each is either militia-coded,
politically coded, talismanically coded, or prohibited outright by a named Shia jurist
(Bashīr al-Najafī on figural images; Sīstānī caveats it doctrinally).

**And no red, anywhere.** Not as an accent, not on a destructive button, not on an
un-ticked prayer. Red is martyrdom and vengeance, and in taʿziya convention it is the
*villain's* colour. An ordinary person dying of illness is not a martyr, and framing them
as one is a category error the family will feel. Destructive actions get a charcoal
outline instead.

**And no emoji, anywhere.** An emoji is somebody else's drawing, rendered differently on
every phone, and it is the fastest way to make a religious app look unserious. The main
repository has a gate that fails the build on one.

---

## 6 · Motion

Nine movements, named in Arabic — because a named movement is one a team can argue about.
"الطلوع is too slow" is a conversation; "the animation is too slow" is not.

| | Name | Job |
|---|---|---|
| 1 | **الطلوع** Rise | A screen arrives: 12px up, fade, 260ms, `cubic-bezier(.22,1,.36,1)` — decelerates hard, does not bounce |
| 2 | **الدوران** Rotation | The rosette behind a header turns once every 120s. You should never catch it moving, only notice later that it moved. *The instrument is running* |
| 3 | **القوس** Arc | Any ring or gauge **draws itself** rather than appearing, 900ms. It reads as an instrument taking a reading |
| 4 | **العدّ** Count | A numeral ticks to its new value, 640ms, always in tabular figures so nothing under it shifts |
| 5 | **المدّ** Extend | A heading's hairline rule grows **from the right** — the kashida gesture, in the direction the script runs. A rule that grows from the left in an RTL interface is a Latin animation in Arabic clothes |
| 6 | **الطيّ** Fold | A bottom sheet rises with one slight overshoot |
| 7 | **الوميض** Glint | A single specular sweep across a faceted panel on tap. Āyina-kārī: a shrine interior catches the light as you move past it. Once, never looping — a loop is decoration, this is a material behaving |
| 8 | **النبض** Pulse | The **only** attention movement in the product, on the "now" marker. Two beats then stop. It never marks a failure |
| 9 | **السكون** Stillness | **Cancels all of the above on الاحتضار** |

`prefers-reduced-motion` disables everything except opacity, globally.

**السكون is the rule that overrides the others.** Someone opens الاحتضار at the worst
moment of their life, on a phone, with shaking hands, possibly with no signal. Motion
there is not delight; it is an obstacle between a person and an instruction they need
now. Every skin in the system may restyle that tab. None may animate it.

---

## 7 · The layout decision

The twelve layouts were researched and never chosen from, and that was blocking
everything downstream. **The recommendation is not to choose one.**

The atlas is explicit that each archetype has a best screen. Forcing one structure across
five tabs wastes that — and it is the same mistake as before, since bundling one of eight
home arrangements into each of seventeen palettes is exactly why all seventeen looked
like one app.

| Module | Layout | Why |
|---|---|---|
| **الرئيسيّة** | **الشبكة** Bento | 2 columns at 173px, one 2×2 hero. Designed *at* two columns — the documented failure of bento on phones is shipping a collapsed desktop grid |
| **الصلاة** | **المسار** Path | The day as a vertical rail with a "now" marker. The best semantic fit in the whole atlas: a day *is* a sequence |
| **القضاء** | **السجل** Register | 52px rows, edge-to-edge hairlines, tabular figures, label right and figure left. A debt is a ledger and a ledger is rows |
| **المعرفة** | **المجلة** Editorial | Eight sections as departments, pages as articles. The strongest home for a library |
| **الوصيّة** | **المخطوط** Manuscript | Justified matn, margin rail, numbered articles. A legal document should look like one |
| **الاحتضار** | **الخط** Calligraphy | No cards, no chrome. Whitespace is the design |

Layout, surface and palette remain **three independent axes**: 12 × 4 × 8 = **384 distinct
looks from 24 rows of data**. The global switcher ships in the prototype so the
alternatives can be compared on a real phone rather than argued about in the abstract.

---

## 8 · The onboarding — المعايرة / Calibration

Fourteen steps. The product is an instrument, and an instrument is calibrated to the thing
it measures before it is trusted. That framing tells the person why they are being asked
fourteen questions.

`الاستقبال · اللغة · الهاتف · الرمز · الاسم والميلاد · الجنس · متى بدأت · الحيض · السفر والمرض ·`
**`الحساب`** `· النتيجة · الوتيرة · التذكير · الخصوصيّة · التمام`

### Step 10 is the screen this whole flow exists for

Noom's onboarding has a famous beat where labelled bars fill in one by one under
*"Cross-checking with User Database… based on millions of data points."* It is theatre.
Nothing is being computed.

**Here the same beat is real.** Six labelled lines land one at a time, 520ms apart — slow
enough to read — and each shows its own input:

```
سنّ التكليف              ١٥ سنة قمريّة      للذكر، بالتقويم القمريّ
الأيّام منذ التكليف        ٥٬٠٧١ يوم          من تاريخ ميلادك الذي أدخلته
الأيّام التي صلّيتَها       − ٢٬٨١٧ يوم         من التاريخ الذي بدأتَ عنده
أيّام الحيض المطروحة      − ١٬٨٠٠ يوم         ٦ أيّام في الشهر القمريّ
الأيّام الباقية            ٢٬٢٥٤ يوم          حاصل ما سبق
الصلوات الواجبة          ١١٬٢٧٠             ٢٬٢٥٤ × ٥ صلوات
```

That is the difference between *looking* scientific and *being* scientific. And it makes
the number **arguable**: a person told "you owe 62,000 prayers" either believes it or
closes the app; a person who can see that the figure rests on a date they typed can
correct the date. Every line is editable afterwards and the result is labelled **تقدير**,
an estimate, not a ruling — «التطبيق يحسب، ولا يفتي».

Two more steps carry real weight:

**الحيض** is framed honestly: *"this number reduces what you owe, it does not increase
it."* Without it the estimate comes out larger than the truth. There is an
«أفضّل عدم التحديد» escape, and the number leaves the phone only as a bare count with no
dates attached.

**الخصوصيّة** is a real screen, not a checkbox. The two worst failures in this category
are a prayer app that sold location data and the ads half of them run. Four specific
lines, including: *iḥtiḍār works offline and we keep no log of the times you opened it.*
The server has no business holding a record of the exact nights someone read the death
guidance.

### What the onboarding deliberately does not do

No paywall. No trial countdown. No "your personalized plan expires in 14:59". No social
proof, no testimonials, no streak promise. Half the flows measured on Mobbin end in a
subscription screen. **This product has no payment path at all**, and the onboarding must
not imply one is coming.

---

## 9 · No gamification on a sacred act

The product's hardest constraint, and the one that shaped every screen.

No streaks, no points, no badges, no leaderboard. Nothing turns red. Nothing "breaks".

The reason is not taste. **A streak punishes illness, menstruation, travel and grief** —
the exact circumstances under which Islamic law already excuses a person — and it
introduces riyāʾ, performing worship for a number, into an act whose validity depends on
intention. An app that shows you a broken chain for a prayer you were legitimately exempt
from is not motivating you; it is lying to you about your own religion.

So, everywhere, the substitutes:

| Instead of | This design uses | From |
|---|---|---|
| A streak | A dot grid of the last 49 days, no total, no judgement | stoic. — "one dot = one day" |
| A score going up | A **debt going down toward zero** | YNAB · Buddy · Rocket Money |
| Pass / fail | **"ضمن المدى"** — within range | Eight Sleep — "in range (±30m)" |
| "You broke your streak!" | A fact: «بقيت صلاتان على هدف اليوم» | — |
| A ring for the lifetime debt | Every ring scoped to a day or a week | A ring implies a closable goal; a lifetime ring at 4% is an accusation |

Game mechanics **are** permitted on المعرفة — progress through a section, "not yet read",
"new this week". A lesson is not a sacred act.

---

## 10 · What the Mobbin census took, and what it refused

60 screens, 7 full flows, 45 apps in business, health and lifestyle — **and deliberately
no Islamic apps**, since the prior research already established that category shares the
same failures. Full screen-by-screen citations are in the [design system page](../system/).

Taken: the saturated-block-over-white-card structure (Monzo, Buddy, Copilot, Rocket
Money); debt-decreasing-to-zero (YNAB, KOHO); the instrument label and huge tabular
numerals (WHOOP, Oura, Ultrahuman); "in range" instead of pass/fail (Eight Sleep); the
dot-per-day grid (stoic.); the labelled computation reveal (Noom); the 1–10 slider with a
huge numeral (Life Reset); LTR OTP inside an RTL page (Lyft, Lugg); one-instruction-per-
screen (Apple Health, Crouton); icon-and-label section tiles (Particle News, Coursera);
the named-swatch styles sheet (Polarsteps, PlayStation).

Refused: the paywall ending, the emoji, and the fake computation.

---

## 11 · Honest limits of this build

- **The prototype is a design artefact, not the product.** There is no database, no auth,
  no sync. Every number in it is invented.
- **Prayer times are placeholders for Beirut.** Location-computed mīqāt has its own spec
  and is out of the approved SPEC (NO-GO 11).
- **The Hijri calendar here is the tabular civil reckoning**, with the ±1 offset the spec
  requires. The app says which it is using rather than pretending arithmetic and sighting
  are the same thing.
- **Twelve layouts exist as data; six are styled to a finished standard** — the six the
  per-module recommendation actually uses. The other six change structure visibly but are
  not polished. That is deliberate: polishing all twelve before one is chosen is the work
  that stalled this before.
- **The religious text in the prototype is illustrative and has not been reviewed by
  Samer.** Nothing in this repository should ship as content. Under D-004, no religious
  line publishes without the owner's approval, without exception.
