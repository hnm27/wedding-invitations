# Baraat — Humaid &amp; Shumaila

**Friday, 1 January 2027 · 8 pm onwards · Ganpati Banquet, Ballygunge, Kolkata.**

The Baraat-only invitation, sent by the Akhtar family. One of four variants in
this repository — see [`../README.md`](../README.md) for the full set, and
[`../wedding-invitation/README.md`](../wedding-invitation/README.md) for the
design notes that apply to all of them.

## How this variant differs from `wedding-invitation`

| | |
| --- | --- |
| The hero | Issued by the bride's parents, as one sentence running *into* the names: **"MR. NASIM AKHTAR & MRS. NARGIS PARVEEN / request the honour of your presence at the baraat of their daughter / SHUMAILA AKHTAR — & — HUMAID ALI MOLLAH"**. This is the one card where **Shumaila is named first**, and the one where her lineage line is dropped — her parents are the hosts, named two lines above — while Humaid keeps his |
| Events | Baraat only — Shukrana and Walima removed |
| Map | Google Maps embedded inline (`.venue-map`), with the app link kept below it |
| Closing | *"With love from the Akhtar family"* |
| Countdown | Unchanged — 1 January 2027, 8 pm IST |

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
npm run dev          # http://localhost:4174
```

## Deploying

Its own Vercel project, with **Root Directory** set to
`wedding-invitation-baraat`. No build step; `vercel.json` handles cache headers
and clean URLs.
