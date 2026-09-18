# عَوْدة — Flows & Motion Plan

**Date:** 18 September 2026 · **Status:** plan, nothing built · **Job 2** of the 18 Sep brief.

This plan is written **after** a fresh Mobbin census and **before** any code, per the standing
order. Every flow and every animation below names the reference it came from. Where a
reference is cited, it was actually returned by a search in this session — none is recalled
from memory.

---

## 0. The census — method, and what it corrected

**Method, per `[C] Mobbin MCP — Deep Research & Usage Playbook (Sep 17 2026)`:** flows are the
unit of study, not screens (`search_flows` returns ordered step sequences; `search_screens`
returns stills). Flows are free; deep screen search costs 5 credits each. **Zero deep
searches were spent on this pass** — six flow searches, all free.

**Constraint applied:** top-rated and widely-used apps only. Three apps returned in the first
sweep — Life Reset, Liven and a generic "Calm Sleep" — were **discarded as references**. They
are funnel-quiz apps, and copying them is how an Islamic app ends up feeling like a
supplement ad.

**The apps kept:** Duolingo, Airbnb, YNAB, Revolut, Monarch, Rocket Money, Apple Wallet,
Noom, Atoms, Calm.

**The correction the census forced on me:** I had assumed the qaḍāʾ screen's problem was
*visual* — how to show 11,270 without it being crushing. It is not. It is a **projection**
problem, and finance solved it years ago. See §3.

---

## 1. The motion system already exists — extend it, never restart

`src/core/motion.js` ships nine movements. Everything below is expressed in these terms, and
**no new primitive is proposed unless an existing one genuinely cannot do the job.**

| | movement | what it does |
|---|---|---|
| 1 | `rise` | 12px up + fade, 260ms |
| 2 | `riseAll` | the same, staggered 42ms per item |
| 3 | `drawArc` | a stroke draws itself, 900ms |
| 4 | `countTo` | a number counts, 640ms |
| 5 | `extend` | a bar or rule extends from its origin, 420ms |
| 6 | `fold` | collapse / expand, 340ms |
| 7 | `glint` | one light pass across a surface, 700ms, on tap only |
| 8 | `rotate` | 120s ambient rotation |
| 9 | **`stillness`** | **cancels every animation under a root** |

`prefers-reduced-motion` is already honoured globally in `style.css`. **Every timing below is
a maximum, not a target.**

---

## 2. المعايرة — the onboarding (14 steps: improve, do not restart)

### What the census says

- **Calm Sleep and Monarch both number the steps** — `6/6`, `Step 4 of 6`. Airbnb does not
  number; it shows a **thin segmented bar** at the bottom. For 14 steps, numbering is the
  honest choice: a bar at step 3 of 14 reads as "this is long", and it *is* long.
  Ref: [Monarch onboarding](https://mobbin.com/flows/337e1f92-cc63-4c7f-8516-4b462dbb891c).
- **One question per screen, with a plain "be honest" framing.** Ref:
  [Calm Sleep quiz](https://mobbin.com/flows/6057bb13-1765-48cc-8cfa-09b0ef8e7107).
- **Airbnb puts `Save & exit` in the top-left of EVERY step** and `Questions?` top-right.
  Ref: [Airbnb creating a listing](https://mobbin.com/flows/ac0a721e-274d-4b18-97eb-403b4c59b394).

### The plan

| # | Feature | Motion | Why |
|---|---|---|---|
| F-1 | Step counter `٣ من ١٤`, Eastern numerals, tabular | none | 14 steps stated honestly at step 1 rather than discovered at step 9 |
| F-2 | **`حفظ وخروج`** top-start on every step, from step 1 | none | Airbnb. A 14-step interview a person cannot leave is a trap |
| F-3 | Resume card on return: *"تابع المعايرة — بقي ٦ أسئلة"* | `rise` | Airbnb's "Confirm a few key details — Required to publish" |
| F-4 | Question enters, previous leaves | `rise` 260ms, **forward = new content enters from the START edge (right)**; back reverses it | RTL: forward is leftward travel, so the incoming card comes from the right |
| F-5 | Answer chosen → tick | existing `.choice` tick, 160ms | already built |
| F-6 | **Step 10, the qaḍāʾ reveal** | see below | the one moment that carries the product |
| F-7 | No account gate before the number | none | Calm Sleep gates *after* the plan; Monarch gates before. Gate after — the number is the reason to stay |

### F-6 — the reveal, in detail

Noom's "cross-checking millions of data points" is a **fake computation**: a spinner that
performs work it is not doing. Ours must not be that, and the brief already settled why —
the arithmetic is real.

The sequence, once:

1. The inputs land as rows — `riseAll`, 42ms stagger. **Every row shows its own input**
   (date of obligation · date of return · days · menses subtracted · already made up).
2. The rule draws under them — `extend`, 420ms.
3. The total counts up — `countTo`, 640ms, Eastern numerals, tabular.
4. One line, not a headline: *"هذا تقديرٌ مبنيّ على إجاباتك، ويمكنك تعديله."*
5. A visible **`عدّل`** control next to the number.

**Total ≤ 1.9s, and it never replays.** The number is arguable, not announced. Life Reset's
"WE SEE YOU — based on your answers" is the right *register* and the wrong *epistemics*: it
asserts an interpretation. We assert only arithmetic.
Ref: [Life Reset setting up profile](https://mobbin.com/flows/e91bc9a4-db92-449a-8de2-2d5e81381f6b).

---

## 3. القضاء — the ledger. The most important finding in this census.

### The finding

**YNAB's loan screen is the answer, and it is not a visual answer.** It splits into
**Overview** and **Activity**, and the Overview carries a *projection*:

> "You'll pay off your loan in 1 month if you pay the minimum every month" · **Debt Free
> Date: Oct 2025**

Ref: [YNAB account detail (loan)](https://mobbin.com/flows/bd3a59e0-fd5d-491b-b5a4-edcd1445e405).

A **date you finish**, computed from the rate you are actually going at, is a motivator that
is pure arithmetic. It has no streak, no points, no praise, and it cannot shame you — if you
slow down, the date moves, and the date moving *is* the feedback. This is the substitute for
gamification that the brief asked for, found in the wild rather than invented.

Cleo adds the second half: a balance graph with a **trend line** through it.
Ref: [Cleo balance graph](https://mobbin.com/flows/51d73683-2f65-45f9-8a97-91d66fa7bacf).

### The plan

| # | Feature | Motion | Why |
|---|---|---|---|
| F-10 | **`تاريخ الفراغ`** — the projected completion date, from the last 30 days' actual rate | `countTo` on the number, date fades in after | YNAB. Arithmetic, not praise |
| F-11 | The sentence under it: *"على وتيرتك الحاليّة، ٣ في اليوم"* | none | YNAB states the assumption in words |
| F-12 | Remaining / made-up / total as one line each | `extend` on the bar | already built |
| F-13 | **Overview / سجل split** — the ledger of what was made up, by date | `fold` | YNAB's Activity tab. The breakdown is what a debt is paid down by |
| F-14 | **`سجّل قضاءً` backfill** — log prayers made up away from the phone | `rise` sheet | **Calm's "Add Session — manually add a session you completed outside the app."** Without this the ledger is wrong, and a wrong ledger gets abandoned. Ref: [Calm adding a session](https://mobbin.com/flows/adcd11ae-e731-40e9-95c1-d016a02cf35e) |
| F-15 | The dot grid | `riseAll`, 42ms, **top row only**; rows below appear without motion | 11,270 dots cannot all animate |
| F-16 | Trend, 90 days | `drawArc` 900ms, once per session | Cleo |

### ⛔ What happens on a day you do nothing — the brief's question, answered

**Nothing happens.** No notification, no broken chain, no colour change, no "you missed a
day". The screen on a zero day is identical to the screen on any other day except that
`تاريخ الفراغ` has moved **one day later**, stated plainly and without comment.

This is the single most important rule in this document. Calm ships **"Share My Streaks"**
and a streak history — it is a well-made app and that feature is exactly what is barred
here. A streak on قضاء converts a missed day into evidence of moral failure, which is the
harm the evidence is specifically about. **A streak is not a motivator on a sacred act; it
is a punishment schedule.**

---

## 4. الصلاة — the daily loop, opened five times a day

### The finding

**Duolingo's path is the reference, stripped of everything Duolingo hangs on it.** The
structure: nodes down a vertical spine, **everything ahead in grey**, one node lit in the
accent colour, and a **`CONTINUE` bubble floating above the current node** so the answer to
"what now" is never more than a glance.
Ref: [Duolingo completing a lesson](https://mobbin.com/flows/c199f9a9-7a91-4795-8ba5-5a3c24847009).

What we take: the spine, the grey-ahead, the one lit node, the bubble.
What we reject: gems, chests, quests, XP, the streak flame, "17 IN A ROW", and the
character. All of it is reward machinery on an act that is not ours to reward.

This is also the argument for the **المسار** layout on الصلاة, and the `why` line already
shipped in `layouts.js` says exactly that.

### The plan

| # | Feature | Motion | Why |
|---|---|---|---|
| F-20 | Five nodes, today. Past = filled, now = lit, ahead = grey | `rise` on mount only | Duolingo path |
| F-21 | **The `الآن` marker** — which prayer is current, by time | `pulse` ×2 max, 1400ms, then still | It must be findable in one glance at arm's length |
| F-22 | Mark prayed: **one tap on the node**, no confirmation dialog | tick 160ms + `glint` 700ms on the node, once | Noom's "Did it today!" is one button. Atoms uses press-and-hold — rejected: a prayer is not a destructive action |
| F-23 | Undo, 5s, inline — never a dialog | `fold` | An accidental tap must not require a settings trip |
| F-24 | Time to next prayer | `countTo` on load only, never ticking | A live-ticking countdown to a prayer is pressure, not information |

---

## 5. الوصيّة — the long, serious form people abandon

### The finding

Airbnb's 29-screen listing flow is the closest analogue in the census, and three of its
devices transfer whole: **`Save & exit` on every screen**, a **segmented progress bar**, and
a **resume entry that names what is missing** ("Confirm a few key details — Required to
publish"). Its sections are also **short and titled** — "Let's start with the basics" — so
each screen is one decision.
Ref: [Airbnb creating a listing](https://mobbin.com/flows/ac0a721e-274d-4b18-97eb-403b4c59b394).

### The plan

| # | Feature | Motion | Why |
|---|---|---|---|
| F-30 | **Autosave on every field blur.** No save button anywhere | a `.`-quiet `محفوظ` label, fades 200ms | The only acceptable behaviour for a document someone may die before finishing |
| F-31 | `حفظ وخروج` on every step | none | Airbnb |
| F-32 | Resume card naming the remaining sections | `rise` | Airbnb's "Required to publish" |
| F-33 | Section list with per-section state: فارغ · ناقص · تمّ | `fold` to open | The will is nine decisions, not one form |
| F-34 | **Ending it**: a review screen listing every answer, then one deliberate confirm | `riseAll` on review | A will's last action must feel weightier than a Next button |
| F-35 | Export / share the finished document | none | Out of scope for the plan; named so it is not forgotten |

**The ground stays الوثيقة.** No ornament, no gradient, document radii — already built.

---

## 6. الاحتضار — the worst day of someone's life

**السكون is not a setting here. It is the screen's nature.** `stillness(root)` runs on mount
and cancels every animation beneath it — including `rise` on entry. The screen does not
appear; it is simply there.

| # | Feature | Motion | Why |
|---|---|---|---|
| F-40 | `stillness` on mount, unconditional | — | already built, now mandatory on this route |
| F-41 | No transition INTO this route — instant, no slide, no fade | — | A transition is a flourish, and there is no flourish available today |
| F-42 | Steps are a plain ordered list, one action per line, largest type in the product | — | `--t-base:20px`, `--tap:56px` already set by the الكفن ground |
| F-43 | Nothing tappable that is not an action someone needs **right now** | — | No settings, no share, no account, no "learn more" |
| F-44 | No count, no timer, no progress | — | There is no progress here |
| F-45 | Leaving requires one deliberate tap, no gesture | — | A back-swipe out of this screen by accident is cruel |

**The counter-reference is Calm's own player** — like, heart, share, shuffle, repeat, scrubber
(ref: [Calm playing a playlist](https://mobbin.com/flows/c9f8b8b3-846d-4f35-92b4-1390ac10a84a)).
Calm is a well-designed app and that screen is the exact opposite of what belongs here.

---

## 7. المعرفة — where gamification IS allowed

The brief is explicit: barred on worship, fine on learning. So the Duolingo machinery we
stripped out of الصلاة has a legitimate home here — progress through a unit, a completion
state, a next-lesson affordance. **Still no streak**, because a streak spans the whole app
and a person who stops learning for a week has not sinned either.

| # | Feature | Motion |
|---|---|---|
| F-50 | Unit progress, lesson nodes | `rise` |
| F-51 | Lesson complete → next lesson offered | `glint` once |
| F-52 | Wrong answer → the correct answer shown plainly, then continue | `rise` on the banner |

F-52's reference is Duolingo's red banner: it states the correct answer and offers `GOT IT`.
It corrects without scoring the person.

---

## 8. The states nobody designs until they bite

| # | State | Design | Reference |
|---|---|---|---|
| F-60 | **Empty — قضاء not yet calibrated** | The screen explains what المعايرة will do and offers it. Never a zero | Calm: *"Your history will show here after your first session"* |
| F-61 | **Empty — الوصيّة untouched** | The nine sections listed, all فارغ, with the first one offered | Airbnb's listings empty state |
| F-62 | **Error — a write failed** | Says what failed and that the data is still on the device. Never "something went wrong" | — |
| F-63 | **Offline** | A quiet inline line, not a blocking banner. The app is local-first; offline is normal, not an error | — |
| F-64 | **First run vs returning** | First run → المعايرة. Returning → الرئيسيّة with the resume card if anything is unfinished | Airbnb |
| F-65 | **Returning after a long absence** | Identical screen. `تاريخ الفراغ` has moved. **No "welcome back", no "you've been away 34 days"** | the §3 rule |

---

## 9. Transitions — what moves, how far, how long, what it means

| From → to | Movement | Distance | Duration | Meaning |
|---|---|---|---|---|
| Tab → tab | cross-fade only | 0px | 180ms | Siblings. Lateral movement would imply an order the tabs do not have |
| Screen → child | `rise` | 12px | 260ms | Going deeper |
| Child → back | reverse `rise` | 12px | 220ms | Slightly faster: retreat should not be laboured |
| Step → next (wizards) | slide, new content from the **start (right)** edge | 24px | 260ms | RTL: forward travels leftward |
| Anything → الاحتضار | **none** | — | 0ms | §6 |
| Sheet open | `rise` from the bottom | full sheet | 300ms | It came from somewhere |
| Sheet close | reverse | full sheet | 240ms | |
| Number changes | `countTo` | — | 640ms | Only on first paint of that value, never on every re-render |
| Ambient ornament | `rotate` | — | 120s | Below perception. If it can be seen moving it is too fast |

**One rule over all of them:** a movement in this app either says *where you came from* or
*where you are*. Anything that only says *look at this* is deleted.

---

## 10. What this plan deliberately does NOT do

- **No mascot.** Shelved on 17 Sep and nothing here reopens it.
- **No streaks, points, badges, confetti or celebration on القضاء, الصلاة, الوصيّة or
  الاحتضار.** Duolingo's and Calm's are cited as counter-references, not models.
- **No live-ticking countdown to a prayer time.**
- **No notification design.** It is the next question after this one, it is where the
  shame risk actually lives, and it deserves its own pass rather than three lines here.
- **No new motion primitives.** Nine exist; all fourteen flows above are expressible in them.

---

## 11. Open, and blocking

1. ⛔ **The layout choice.** Hadi is taking the twelve to the scholar. المسار on الصلاة and
   السجل on القضاء are load-bearing assumptions in §3 and §4 — if the scholar picks
   differently, those two sections need a revision pass, not a rewrite.
2. **Notifications** — the next research job, and the highest-risk surface in the product.
3. **The style choice** — الطبقات / كوبرتينو / الحرم, still three.

## Sources

Every flow cited above was returned by `search_flows` in this session:
[Duolingo](https://mobbin.com/flows/c199f9a9-7a91-4795-8ba5-5a3c24847009) ·
[Airbnb](https://mobbin.com/flows/ac0a721e-274d-4b18-97eb-403b4c59b394) ·
[YNAB](https://mobbin.com/flows/bd3a59e0-fd5d-491b-b5a4-edcd1445e405) ·
[Cleo](https://mobbin.com/flows/51d73683-2f65-45f9-8a97-91d66fa7bacf) ·
[Calm — add session](https://mobbin.com/flows/adcd11ae-e731-40e9-95c1-d016a02cf35e) ·
[Calm — player](https://mobbin.com/flows/c9f8b8b3-846d-4f35-92b4-1390ac10a84a) ·
[Monarch](https://mobbin.com/flows/337e1f92-cc63-4c7f-8516-4b462dbb891c) ·
[Calm Sleep quiz](https://mobbin.com/flows/6057bb13-1765-48cc-8cfa-09b0ef8e7107) ·
[Noom](https://mobbin.com/flows/3acecdd5-da08-4e17-9877-038c6d1819c1) ·
[Atoms](https://mobbin.com/flows/0e35e9a0-7cdc-41f8-9dd3-6c094013699e) ·
[Life Reset](https://mobbin.com/flows/e91bc9a4-db92-449a-8de2-2d5e81381f6b) (register only —
rejected as a design reference).

Deep screen searches spent: **0**.
