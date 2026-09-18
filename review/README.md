# review/ — the surfaces Hadi actually looks at

## layouts-gallery.html

All twelve layouts on the same three screens (الرئيسيّة / القضاء / الاحتضار),
with a permanent tappable chip switcher. **No keyboard shortcuts anywhere in the
review path** — the build-8 prototype switched layouts with `]` and `\`, which is
meaningless on a phone, and that is the entire reason eleven of the twelve had
never been seen.

It is self-contained: it inlines `src/core/style.css` and `src/core/layout.css`
and embeds the *real* screen markup pulled out of the running app, so it cannot
drift into showing a hand-drawn approximation of a screen.

### The one rewrite it applies to the product's CSS

`body[data-x]` becomes `[data-x]`, so the attribute can sit on any container and
twelve layouts can render on one page. Nothing else is altered. `phone` and `app`
are shared class names on purpose — the rescope moves the product's `body` and
`#app` rules onto them.

### Rebuild it

```
node scripts/build-layouts-gallery.mjs     # writes review/layouts-gallery.html
node scripts/layouts-audit.mjs review/layouts-gallery.html
```

The audit must print `distinct layouts: 12 of 12`, `chrome/product class
collisions: 0`, `console errors: 0`, `failures: 0`.

## What the six markers mean

`cards · shelves · path · ring · sheets` carried **zero** CSS rules before
18 Sep 2026, and `portal` carried three that rounded corners without
restructuring anything. The gallery marks all six **built today** so a comparison
is honest about what was finished when.
