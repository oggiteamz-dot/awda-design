# عَوْدة — Mobbin Pattern Census

**Purpose: so no future session has to run Mobbin again for this product.** Every reference
the design argues from is recorded here in words, and the screenshot is saved beside it in
`refs/`. Mobbin's `image_url`s expire after 30 days — the files in `refs/` do not.

**Last run:** 18 September 2026 · **Deep screen searches spent: 0** (flows are free) ·
**Apps discarded as references: 3** (see §4).

Method follows `[C] Mobbin MCP — Deep Research & Usage Playbook (Sep 17 2026)`: flows are the
unit of study, small limits, extract to text immediately, cite `mobbin_url`, download
`image_url`.

---

## 1. The ledger

Format: **what it does · why it works · what we take · what we reject.**

### القضاء — the ledger and its motivation

**YNAB — loan payoff overview** · `refs/ynab-loan-payoff-overview.webp` ·
[flow](https://mobbin.com/flows/bd3a59e0-fd5d-491b-b5a4-edcd1445e405)
An Overview/Activity split. The Overview states *"You'll pay off your loan in 1 month if you
pay the minimum every month"* and a **Debt Free Date: Oct 2025**, above a % paid ring.
**Why it works:** a completion date computed from your actual rate is a motivator made
entirely of arithmetic. It cannot praise you and it cannot shame you; if you slow down the
date moves, and the date moving *is* the feedback.
**Take:** `تاريخ الفراغ` + the assumption stated in words underneath.
**Reject:** the % ring as the hero — a percentage of 11,270 hides the number that matters.

**YNAB — loan activity** · `refs/ynab-loan-activity-ledger.webp`
Dated rows of payments with running balance. **Take:** the سجل tab. A debt is paid down by
entries, and the entries are the evidence.

**Cleo — balance graph** · `refs/cleo-balance-trend-graph.webp` ·
[flow](https://mobbin.com/flows/51d73683-2f65-45f9-8a97-91d66fa7bacf)
Balance line with a dotted **trend** line through it. **Take:** trend over 90 days.
⚠️ Cleo is a mid-tier app; kept for this one device only.

**Calm — add a session** · `refs/calm-add-session-outside-app.webp` ·
[flow](https://mobbin.com/flows/adcd11ae-e731-40e9-95c1-d016a02cf35e)
*"Here you can manually add a meditation session that you completed outside the Calm app."*
**Why it matters:** without backfill the ledger is simply wrong, and a wrong ledger gets
abandoned. **Take:** `سجّل قضاءً` for prayers made up away from the phone.

**Calm — streak history** · `refs/calm-streak-COUNTEREXAMPLE.webp` ·
[flow](https://mobbin.com/flows/c9f8b8b3-846d-4f35-92b4-1390ac10a84a)
⛔ **Filed as a counter-example, not a model.** "Share My Streaks", a streak calendar, a
3-day streak history. Calm is well made and this is exactly what is barred on قضاء: it
converts a missed day into evidence of moral failure.

### الصلاة — the daily loop

**Duolingo — the path** · `refs/duolingo-path-grey-ahead.webp` ·
[flow](https://mobbin.com/flows/c199f9a9-7a91-4795-8ba5-5a3c24847009)
Nodes down a vertical spine, **everything ahead in grey**, one node lit, a floating
`CONTINUE` bubble above the current node.
**Take:** the spine, the grey-ahead, the single lit node, the bubble. This is the argument
for the `المسار` layout on الصلاة.
**Reject:** gems, chests, quests, XP, "17 IN A ROW", the character — all reward machinery on
an act that is not ours to reward.

**Duolingo — wrong answer** · `refs/duolingo-wrong-answer-banner.webp`
A red banner that **states the correct answer** and offers `GOT IT`. Corrects without scoring
the person. **Take:** for المعرفة only.

**Noom — "Did it today!"** · `refs/noom-did-it-today.webp` ·
[flow](https://mobbin.com/flows/3acecdd5-da08-4e17-9877-038c6d1819c1)
One button, one tap, no confirmation. **Take:** marking a prayer is one tap on the node.
**Reject:** Atoms' press-and-hold — a prayer is not a destructive action.

### المعايرة — onboarding

**Monarch — `Step 4 of 6`** · `refs/monarch-step-4-of-6.webp` ·
[flow](https://mobbin.com/flows/337e1f92-cc63-4c7f-8516-4b462dbb891c)
Numbered steps, not a bar. **Take:** for 14 steps, numbering is the honest choice — a bar at
step 3 of 14 reads as "this is long", and it is.

**Calm Sleep — one question per screen** · `refs/calmsleep-one-question-per-screen.webp` ·
[flow](https://mobbin.com/flows/6057bb13-1765-48cc-8cfa-09b0ef8e7107)
`6/6`, one question, options as full-width rows, Next disabled until answered.
**Take:** the shape. **Reject:** the app itself as a visual reference (§4).

### الوصيّة — the long serious form

**Airbnb — a listing step** · `refs/airbnb-save-and-exit-step.webp` ·
[flow](https://mobbin.com/flows/ac0a721e-274d-4b18-97eb-403b4c59b394)
`Save & exit` top-left on **every one of 29 steps**, `Questions?` top-right, a thin segmented
bar at the bottom, Back/Next. **Take:** all of it. A long form a person cannot leave is a trap.

**Airbnb — listings with an unfinished one** · `refs/airbnb-listings-resume-required.webp`
*"Confirm a few key details — Required to publish."* **Take:** the resume entry **names what
is missing** rather than saying "continue".

### الاحتضار

**Calm — the player** · (same flow as the streak reference)
⛔ **Counter-example.** Like, heart, share, shuffle, repeat, scrubber, playlist. The exact
opposite of what belongs on the worst day of someone's life.

### Home as a launcher

**Afterpay — home category row + index** · `refs/afterpay-home-category-row.webp` ·
`refs/afterpay-categories-index.webp` ·
[flow](https://mobbin.com/flows/108cce95-9ea6-4eb9-8b44-b4a625642d84)
A short `Categories` block on home with a `›` into a **full index screen** of icon+label rows,
two across. **Take:** the two-tier answer to "we'll have a lot of different stuff" — home
shows the few, an index holds the many.

**Binance — all categories + favourites** · `refs/binance-all-categories.webp` ·
`refs/binance-favourites-shortcuts.webp` ·
[flow](https://mobbin.com/flows/8240918d-3615-4368-b11f-38d667a3b8c4)
Same two-tier shape, plus *"Create your favourite shortcut list by adding the ★ icon."*
**Take:** explicit, user-built personalisation instead of algorithmic reordering.
**Reject:** the promo banners and "Special for you" deals.

**Hulu — Continue Watching** · `refs/hulu-continue-watching-rail.webp` ·
[flow](https://mobbin.com/flows/58269bef-cbcd-4b14-8c35-86cf6f386e2b)
Its own named rail at the top of home, `VIEW ALL`, progress bar on the tile, `RESUME EPISODE
S1 E1`. **Take:** the continue card carries **state, not just a name** — and it **vanishes
when there is nothing to resume** rather than showing a placeholder.

**Quizlet — "Up next: Flashcards"** · `refs/quizlet-up-next-hint.webp` ·
[flow](https://mobbin.com/flows/4a5c5d5d-0032-4273-8441-910c82813037)
A quiet resumption hint sitting just above the tab bar. **Take:** a second, lighter
resumption slot when the top of home is already spoken for.

**Wabi — two-across card grid** · `refs/wabi-card-grid-two-across.webp` ·
[flow](https://mobbin.com/flows/c18f0149-b204-49d9-965b-1afcf8af15d5)
Large illustrated tiles, two across, generous radius.
⚠️ **Not a top-rated app.** Kept only as a density illustration — two-across is right at
390px; three-across destroys Arabic labels. Hadi liked the look, so it stays on file with
that caveat attached.

---

## 2. What three or more winners agree on

Per the playbook's convergence rule, these are defaults rather than options:

1. **One question per screen, numbered, in any multi-step interview.** (Monarch, Calm Sleep, Airbnb)
2. **An escape hatch on every step of a long form.** (Airbnb, and its absence is the top complaint elsewhere)
3. **Resumption carries progress, and disappears when empty.** (Hulu, Quizlet, Airbnb)
4. **A few on home, everything in an index.** (Afterpay, Binance)
5. **Completion is stated as a projection, not a score.** (YNAB; Cleo's trend is the weaker form)

---

## 3. What this product rejects that almost everyone ships

- **Streaks** on any act of worship. (Calm, Duolingo, Noom, Atoms all ship them)
- **Points, gems, chests, celebration** on worship. Allowed on lessons only.
- **Algorithmic home reordering** and "for you" rails.
- **Promotional banners** on home.
- **A live-ticking countdown** to a prayer time.

---

## 4. Discarded as references — and why

**Life Reset · Liven · Calm Sleep (as a visual reference).** All three are funnel-quiz apps:
heavy emotional copy, an assertive "we see you" synthesis, a paywall at the end of the
interview. Hadi's standing rule is top-rated and most-popular apps only, and the reason is
sound — building an Islamic app off a supplement-ad funnel is how it ends up feeling like one.
Life Reset's *register* is cited once in `FLOWS-AND-MOTION.md` §2 purely as a contrast to
explain what the qaḍāʾ reveal must **not** do.

**happn** — returned by a search, irrelevant to this product.

---

## 5. Still not studied

- **Notifications and reminders.** The highest-risk surface in the product and the place
  shame actually lives. Deserves its own pass.
- **Arabic / RTL-native apps.** Mobbin's coverage is overwhelmingly Latin-script; nothing in
  this census answers how a launcher grid behaves with Arabic labels at 390px. That has to be
  measured in the browser, not looked up.
- **Accessibility for older users** — larger type, one-handed reach on a tall phone.
