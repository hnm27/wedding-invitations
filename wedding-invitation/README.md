# Humaid &amp; Shumaila — Wedding Invitation

A hand-built, dependency-free invitation website.
**Kolkata · 29 December 2026 – 3 January 2027 · Baraat on Friday, 1 January 2027.**

The Nikah was solemnised on 31 May 2026; this site invites guests to the
celebrations that follow.

Plain HTML, CSS and vanilla JavaScript — no framework, no build step, no npm
dependencies. Open `index.html` in a browser and it works.

## Structure

```
index.html                  cover/envelope, then the card in order:
                            bismillah + Qur'an verse (one opening screen),
                            the invitation itself, the nikah photograph,
                            events timeline, countdown, closing
assets/css/styles.css       the whole design system
assets/js/main.js           envelope reveal, scroll reveals, particles, countdown
assets/img/nikah-900.jpg    the photograph, cropped and web-sized
vercel.json                 static hosting config (cache headers, clean URLs)
package.json                a local dev server script; no dependencies
reference/                  the original studio photo — GITIGNORED, not deployed
```

## How it behaves

- **Cover** — opens with the Bismillah above a wax-sealed envelope bearing an
  `H & S` monogram. Tapping it plays seal-pop → flap → letter-rise, then a
  flash of light hands over to the invitation.
- **Scroll reveals** — sections fade up via `IntersectionObserver`.
- **The photograph** — set in a mihrab arch. The arch, its double gold rule,
  the finial and the rosettes are all drawn in the *same* SVG as the image, so
  every line scales with the picture instead of being stretched by CSS. The
  image is clipped to the arch with `clipPath` and settles from `scale(1.05)`
  as the section arrives.
- **Countdown** — counts to the Baraat, with a live Kolkata clock beside it.
- **Ambient motion** — petals falling over the page, warm motes over the photo.
- **Reduced motion** — `prefers-reduced-motion: reduce` disables petals, motes
  and the settle, and shows every section immediately.

## Design rules worth keeping

- **One text colour.** Every word uses `--ink` (`#55402E`, a warm brown). Gold
  is reserved for rules, frames, the seal and ornament — never for text.
  Hierarchy comes from size and letter-spacing, not colour.
- **Two typefaces.** Marcellus for display and small-caps labels, Cormorant
  Garamond for body and italics, plus Amiri for Arabic. There is deliberately
  no script/handwriting face.
- **Restraint.** The cover carries only what it needs: Bismillah, envelope,
  seal, and the date in numerals.

## Editing the details

| What | Where |
| --- | --- |
| Names, venues, addresses, map links | `index.html` |
| Qur'an verse and translation | `index.html`, `section.verse` |
| Countdown target | `TARGET` at the top of `assets/js/main.js` |
| Colours, type scale, spacing | `:root` block in `assets/css/styles.css` |
| Arch shape | the `archClip` path in `index.html` (mirrored by `.wr`/`.wr-out`/`.hair`) |

The countdown target is `2027-01-01T00:00:00+05:30` — midnight IST on the day
of the Baraat, since no start time is published. If a time is announced, change
that one constant.

Each Google Maps link is a plain `google.com/maps/search/?api=1&query=…` search
URL, so it opens correctly in the Maps app on both iOS and Android without
needing coordinates.

### Regenerating the photograph

The deployed image is cropped from the studio original in `reference/`, which is
gitignored (it is a 7 MB watermarked file). The crop is centred on the midpoint
of the couple so both sides lose the same amount, and it excludes the
photographer's watermark in the bottom-left corner:

```sh
# 2956x3695 (4:5) from the 5543x3695 original, offset x=1486
sips -c 3695 2956 --cropOffset 0 1486 reference/nikah-2026-05-31.jpg --out /tmp/crop.jpg
sips -s format jpeg -s formatOptions 84 -Z 1125 /tmp/crop.jpg --out assets/img/nikah-900.jpg
```

The arch window expects a 4:5 portrait. Note that SVG `<image>` cannot use
`srcset`, so there is a single image file rather than a responsive set.

## Running locally

```sh
npm run dev          # http://localhost:4173
python3 -m http.server 4173   # or, without Node
```

You can also just open `index.html` — there is no bundling or same-origin
requirement.

## Deploying

Fully static, so any host works. On Vercel there is no build step: it serves the
files as-is.

```sh
npx vercel          # preview URL
npx vercel --prod   # production
```

Google Fonts is the only external request. If guests will open this on patchy
mobile data, consider self-hosting the three families into `assets/fonts/` —
the CSS already falls back to Georgia and system serifs.

## Notes for future edits

- The blush floral background is two SVG data-URI tiles (`--tile-l` light,
  `--tile-d` dark) offset 1px from each other to fake an embossed edge.
- The envelope is five stacked layers (`.env-body`, `.letter`, `.mouth`,
  `.env-front`, `.env-flap`) plus the `.seal`. The flap swaps `z-index`
  mid-keyframe so it passes behind the letter as it opens. Anything placed on
  the envelope must clear both `.env-front`'s `clip-path` and the flap
  triangle — that is why earlier decorations were removed rather than moved.
- `.timeline` is centred as a block (`width:fit-content`) while its text stays
  left-aligned, because the vertical rail and the addresses both read badly
  centred.
