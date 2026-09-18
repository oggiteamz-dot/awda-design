# عَوْدة — Home as a launcher, and what the tabs are for

**Date:** 18 September 2026 · **Status:** plan, nothing built · Supersedes the five-tab
assumption in `FLOWS-AND-MOTION.md` §4 and in `layouts.js`.

---

## 0. What changed, in one line

The app is no longer five peer sections. It is **one hub and many areas**: prayer, qaḍāʾ,
the will, iḥtiḍār, general religious education, history, stories, day-to-day practice, and a
gamified/simplified learning track — with more to come. A five-tab bar cannot carry that, and
stretching it would mean either a tab bar that grows to nine, or a "More" tab, which is where
features go to be forgotten.

---

## 1. The problem this creates, said plainly before designing around it

**A tab bar and a grid of cards are two answers to the same question: "where do I go?"**
If a destination appears in both, people learn neither — they hunt on home for something
that was one tap away in the bar, or they tab around looking for something that only exists
as a card. This is the most common failure in hub-and-spoke apps and it is worth one rule to
prevent:

> **A tab is a place you RETURN to. A card is a place you GO to.**
> Nothing that has a tab appears as a card on home. The only exception is the continue card,
> which is not a destination but a resumption.

Second rule, and it matters more as the area count grows:

> **The home grid never reorders itself.** No usage-ranking, no algorithmic "for you". A
> religious app that rearranges its own front door each morning is disorienting, and it reads
> as optimising for engagement — which is precisely the charge this product cannot afford.
> Order is editorial and fixed; personalisation is **explicit** (see H-12).

---

## 2. The census — what top-rated apps do with "a lot of different stuff"

Small targeted pass, top-rated apps only, flows (free). **Deep searches spent: 0.**

| Finding | Where | What we take |
|---|---|---|
| **Two tiers: a few categories on home + `Categories →` into a full index** | [Afterpay](https://mobbin.com/flows/108cce95-9ea6-4eb9-8b44-b4a625642d84) · [Binance](https://mobbin.com/flows/8240918d-3615-4368-b11f-38d667a3b8c4) | The whole answer to "we'll have a lot". Home shows the few; an index holds the many |
| **A favourites row the user builds themselves** — *"create your favourite shortcut list by adding the ★ icon"* | [Binance](https://mobbin.com/flows/8240918d-3615-4368-b11f-38d667a3b8c4) | Explicit personalisation instead of algorithmic reordering |
| **Continue Watching as its own named rail, top of home, with `VIEW ALL`, a progress bar on the tile, and "RESUME EPISODE"** | [Hulu](https://mobbin.com/flows/58269bef-cbcd-4b14-8c35-86cf6f386e2b) | The continue card, including the fact that it **vanishes entirely when empty** |
| **"Up next: …" hint sitting just above the tab bar** | [Quizlet](https://mobbin.com/flows/4a5c5d5d-0032-4273-8441-910c82813037) | A second, quieter resumption slot for when the top rail is already spoken for |
| **A card grid of large, illustrated tiles, two across** | [Wabi](https://mobbin.com/flows/c18f0149-b204-49d9-965b-1afcf8af15d5) | Two-across is the right density for a launcher at 390px; one-across wastes the screen, three-across kills the labels in Arabic |

Rejected: Binance's home also carries promo banners and "Special for you" deals. Not here.

---

## 3. Home, top to bottom

| # | Element | Rule | Motion |
|---|---|---|---|
| H-1 | **Greeting + date** — Hijri, tabular, Eastern numerals | already built | none |
| H-2 | **The continue card** — the last area used, with its own state in it | **Conditional. If there is nothing to resume, it is not rendered and nothing takes its place** (Hulu). Never a placeholder, never "start your journey" | `rise` 260ms, once |
| H-3 | **The prayer strip** | Shown **only if the user prays through the app.** Not everyone will | `rise` |
| H-4 | **The qaḍāʾ line** — one line, remaining + `تاريخ الفراغ` | **Shown only if المعايرة has been completed.** Hadi's own point: not all of them will be on prayer recovery. For everyone else this line does not exist | `countTo` on first paint only |
| H-5 | **The card grid** — the areas, two across | Fixed editorial order. 6–8 cards maximum on home | `riseAll`, 42ms stagger, **first 4 only**; the rest appear without motion |
| H-6 | **`كلّ الأقسام →`** — the full index | Afterpay/Binance. This is what makes "a lot of different stuff" survivable | — |

### H-2, the continue card, in detail

It carries **the state, not just the name**: *"القضاء · بقي ١١٬٢٧٠"*, *"الوصيّة · ٤ من ٩
أقسام"*, *"تاريخ الإسلام · الدرس ٣"*. Hulu puts a progress bar on the tile for exactly this
reason — a resume affordance that doesn't say how far along you are makes you open it to find
out, which is the opposite of resuming.

**First run:** no continue card at all. The grid is the whole home, which is the correct first
impression for a launcher.

---

## 4. The areas — the card taxonomy

From Hadi's own list, grouped. **This is a proposal, not a decision** — the grouping is the
part most worth arguing about, because it decides how many cards home carries.

| Area | Holds | Gamification |
|---|---|---|
| **الصلاة** | today's prayers, times | ⛔ barred |
| **القضاء** | the ledger, backfill, `تاريخ الفراغ` | ⛔ barred |
| **المعرفة** | general religious education | ✅ allowed |
| **التاريخ** | Islamic history | ✅ allowed |
| **القصص** | stories | ✅ allowed |
| **العمل اليوميّ** | day-to-day practice: duʿāʾ, adhkār, sunan | ⚠️ **barred** — these are acts, not lessons |
| **الوصيّة** | the will | ⛔ barred |
| **الاحتضار** | the time of dying | ⛔ barred, `stillness` |

**The gamification line, restated because this change makes it easier to blur:** points,
levels, streaks and celebration belong to **lessons about religion** (المعرفة · التاريخ ·
القصص). They are barred on **acts of religion** (الصلاة · القضاء · العمل اليوميّ · الوصيّة ·
الاحتضار). The test is not which tab it lives in — it is whether the thing being counted is
something a person did *for God* or something they *learned*. Scoring the first turns a
missed day into moral failure, which is the harm the evidence is specifically about.

⚠️ **العمل اليوميّ is the trap.** It looks like a habit tracker and every habit tracker on
the market is gamified. It is a list of worship acts. It gets the dot grid and no streak.

---

## 5. The tabs — four, and what each is for

Hadi: home, my account, and two to three more, decided later. A proposal with reasoning, so
"later" has somewhere to start:

| Tab | Why it earns a permanent slot |
|---|---|
| **الرئيسيّة** | The hub. Required |
| **الصلاة** | Opened five times a day — by a wide margin the highest-frequency thing in the product. Anything opened that often must not be two taps away |
| **الأقسام** | The index from H-6. As areas multiply this is what stops home from growing forever, and it is the tab that makes the app feel finite |
| **حسابي** | Hadi's, and it is where settings, the Qurʾān-suppression switch and المعايرة live |

**Four, not five.** A fifth can be added when a candidate genuinely earns it by frequency —
but the bar is "returned to constantly", not "important". القضاء is important and is *not* a
tab: it is entered from home or from الصلاة, and for a large share of users it does not exist
at all.

**⚠️ The rule from §1 applies here:** الصلاة and الأقسام have tabs, so **they do not also
appear as cards in the home grid.** That already removes two of the eight cards.

---

## 6. Motion for the launcher

Everything below is expressed in the nine movements `motion.js` already ships. No new
primitive.

| # | Moment | Movement | Note |
|---|---|---|---|
| H-20 | Home first paint | `riseAll` 42ms × **first 4 cards only** | Staggering eight cards takes 340ms before the screen settles — too slow for a front door |
| H-21 | Card tapped | `glint` 700ms once + the existing `.card-tap` scale | Says "this one", before the screen changes |
| H-22 | Card → area | `rise` 12px / 260ms, standard "going deeper" | From `FLOWS-AND-MOTION.md` §9 |
| H-23 | Area → home (back) | reverse `rise`, 220ms | Retreat is faster |
| H-24 | Tab → tab | cross-fade 180ms, no lateral slide | Siblings have no order |
| H-25 | Continue card appears | `rise`, once per session | Never re-animates on every home visit |
| H-26 | Index → area | `rise` | Same as H-22: the index is a list of doors, not a place |

---

## 7. What this invalidates, honestly

1. **`FLOWS-AND-MOTION.md` §4** assumed الصلاة is one of five peer tabs. The flow inside it is
   unchanged and still correct; only its position moves.
2. **`layouts.js` `why` lines** argue for a *dashboard* home ("bento: one card leads because
   the day has one first task"). For a *launcher* home that argument is weaker and the
   grid-family layouts (`cards` · `bento` · `shelves`) become the real contenders, while
   `manuscript` · `khat` · `editorial` are reading layouts and poor launchers.
3. **The layouts gallery renders the old home.** See §8.
4. **`app.js` `TABS`** — five entries, becomes four. Small change, but it is the change that
   makes the rest real.

---

## 8. ⛔ The scholar is about to judge the wrong screen

The gallery shows twelve layouts rendering a dashboard home. Home is now a launcher. A layout
chosen against the old screen may be the wrong choice for the new one — and three of the
twelve would be actively poor launchers.

**Recommendation:** rebuild the gallery's الرئيسيّة as a launcher (continue card + card grid)
before it goes to the scholar, and leave القضاء and الاحتضار exactly as they are. That keeps
the comparison honest without restarting anything — the layout CSS is unchanged, only the
markup that sits inside it.

---

## 9. Open questions for Hadi

1. **The grouping in §4** — eight areas or fewer? Do التاريخ and القصص belong inside المعرفة
   rather than beside it? This decides whether home carries six cards or three.
2. **The fifth tab** — leave at four until something earns it?
3. **Pinned favourites (H-12, Binance pattern)** — worth building, or premature until there
   are enough areas to be worth pinning?
4. **What a card looks like** — illustrated tiles (Wabi) or icon + label (Afterpay/Binance).
   The first is warmer and slower to produce; the second scales to twenty areas without new
   artwork. My recommendation is icon + label, using the girih ornament system already in
   `ornament.js` for the icons, so new areas cost nothing to add.
