# Baraat &amp; Walima — Humaid &amp; Shumaila

**Baraat: Friday, 1 January 2027 · Walima: Sunday, 3 January 2027 · Kolkata.**

For guests invited to both the Baraat and the Walima, but not to the Shukrana.
One of four variants in this repository — see [`../README.md`](../README.md) for
the full set, and
[`../wedding-invitation/README.md`](../wedding-invitation/README.md) for the
design notes that apply to all of them.

## How this variant differs from `wedding-invitation`

| | |
| --- | --- |
| Events | Shukrana removed; Baraat and Walima unchanged |
| Everything else | Identical — same request line, same closing, same countdown to the Baraat |

The only other edits are the `<title>` and the two meta descriptions, which no
longer claim the 29 December date.

Both venues keep the plain *Open in Google Maps* link rather than an embedded
frame: two map iframes on one page is weight a guest on mobile data does not
need, and the single-event cards are where an inline map earns its place. If you
want the frames here too, lift `.venue-map` and the `<div class="venue-map">`
markup from `wedding-invitation-baraat`.

## Running locally

```sh
npm run dev          # http://localhost:4176
```

## Deploying

Its own Vercel project, with **Root Directory** set to
`wedding-invitation-baraat-reception`. No build step; `vercel.json` handles
cache headers and clean URLs.
