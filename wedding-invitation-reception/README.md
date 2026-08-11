# Walima — Humaid &amp; Shumaila

**Sunday, 3 January 2027 · 8 pm onwards · Ojas Banquet, Topsia, Kolkata.**

The Walima-only invitation, sent by the Mollah family. One of four variants in
this repository — see [`../README.md`](../README.md) for the full set, and
[`../wedding-invitation/README.md`](../wedding-invitation/README.md) for the
design notes that apply to all of them.

The folder is named `-reception` because that is the folder that existed; the
card itself says *Walima* throughout.

## How this variant differs from `wedding-invitation`

| | |
| --- | --- |
| The hero | Issued by the groom's parents, as one sentence running *into* the names: **"MR. ISMAIL ALI MOLLAH & MRS. LABINA NUDRAT MOLLAH / request the honour of your presence at the walima of their son / HUMAID ALI MOLLAH — & — SHUMAILA AKHTAR"**. Humaid's lineage line is dropped — his parents are the hosts, named two lines above — while Shumaila keeps hers |
| Events | Walima only — Shukrana and Baraat removed |
| Map | Google Maps embedded inline (`.venue-map`), with the app link kept below it |
| Closing | *"With love from the Mollah family"* |
| Countdown | Retargeted to **3 January 2027, 8 pm IST**, labelled *Until the Walima* |

The countdown moved because the Baraat is not on this card: counting to an
event a guest has not been invited to would read as a mistake. The target is
the single `TARGET` constant at the top of `assets/js/main.js`.

`.timeline.single` drops the vertical rail and its dot, which read as a stray
rule when there is only one stop, and centres the block instead.

## The embedded map

The frame is Google's keyless `maps?q=…&output=embed` endpoint, so there is no
API key to manage on a static site. It is `loading="lazy"`, so it costs nothing
until a guest scrolls the venue into view, and it is desaturated in CSS
(`filter:saturate(.82)`) because the map's greens and blues are otherwise the
only saturated colour on the page.

The *Directions in Google Maps* link below the frame is kept deliberately: the
frame shows *where*, the link hands over to the Maps app for *how*.

## Running locally

```sh
npm run dev          # http://localhost:4175
```

## Deploying

Its own Vercel project, with **Root Directory** set to
`wedding-invitation-reception`. No build step; `vercel.json` handles cache
headers and clean URLs.
