# Humaid &amp; Shumaila — Wedding Invitations

Four invitation websites for one wedding, so that each circle of guests receives
exactly the celebrations they are invited to — and nothing they are not.

The Nikah was solemnised on **31 May 2026**. These cards invite guests to the
celebrations that follow, in **Kolkata, 29 December 2026 – 3 January 2027**.

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no npm
dependencies. Open any `index.html` in a browser and it works.

## The four variants

| Folder | Card | Events | Issued by |
| --- | --- | --- | --- |
| [`wedding-invitation/`](wedding-invitation/) | The full invitation | Shukrana · Baraat · Walima | Humaid's parents |
| [`wedding-invitation-baraat/`](wedding-invitation-baraat/) | Baraat only | Baraat | Shumaila's parents |
| [`wedding-invitation-reception/`](wedding-invitation-reception/) | Walima only | Walima | Humaid's parents |
| [`wedding-invitation-baraat-reception/`](wedding-invitation-baraat-reception/) | Baraat & Walima | Baraat · Walima | Humaid's parents |

`wedding-invitation/` came first and the other three are copies of it, but all
four are now maintained together — none of them is a pristine original.

Note that `wedding-invitation-reception/` is the **Walima** card — the folder
name is historical, and the word *Walima* is used everywhere a guest can see.

### Every card reads in the same order

```
cover / envelope   →   bismillah + Qur'an verse   →   the invitation
   →   the nikah photograph   →   the celebrations   →   counting the days
   →   closing
```

The bismillah and the verse share the opening screen — the bismillah alone left
a hole above the scroll cue, and the verse is the natural thing to read under
it.

The invitation itself is one sentence, issued by the parents, that runs *into*
the names rather than sitting above or below them:

> MR. ISMAIL ALI MOLLAH & MRS. LABINA NUDRAT MOLLAH
> *request the honour of your presence at the walima of their son*
> **HUMAID ALI MOLLAH** — & — **SHUMAILA AKHTAR**
> *daughter of Nasim Akhtar & Nargis Parveen*

The hosts' own child carries no lineage line, because their parents are already
named two lines above; the other family keeps theirs. That asymmetry is
deliberate — it tells a guest at a glance whose card they are holding.

### What actually differs between them

1. **Who hosts**, which decides four things at once: the names in the
   `.eyebrow.hosts` line, whether the sentence ends *"of their son"* or *"of
   their daughter"*, which name is set first, and which lineage line is dropped.
   The Akhtars issue the Baraat, so Shumaila is named first there; the Mollahs
   issue the other three.
2. **Which celebration the sentence names** — *"at the walima of"*, *"at the
   baraat of"*, *"at the baraat and walima of"*, *"at the wedding celebrations
   of"*.
3. **The events timeline** — which of the three celebrations appear.
4. **The closing sign-off** — *The Mollah family and relatives*, or *The Akhtar
   family and relatives* on the Baraat card.
5. **The countdown target** — the Walima card counts to 3 January rather than to
   1 January, because the Baraat is not on that card.
6. **The venue map** — the two single-event cards embed Google Maps inline and
   use a `.timeline.single` modifier that drops the timeline's vertical rail
   (with one stop it reads as a stray rule rather than a sequence). The two
   multi-event cards keep the plain *Open in Google Maps* link.

Everything else — the envelope cover, the photograph in its mihrab arch, the
Qur'an verse, the palette, the type scale, the ambient petals — is identical
across all four.

## Full design notes

Kept once, in
[`wedding-invitation/README.md`](wedding-invitation/README.md): the palette and
its one-text-colour rule, the envelope's layer stack, how the arch SVG is built,
how the photograph was cropped, and the reduced-motion behaviour. Read that
before changing any of the shared CSS.

## Shared structure

Each folder is a complete, standalone site:

```
index.html                  cover/envelope, then the card in order:
                            bismillah + Qur'an verse (one opening screen),
                            the invitation itself, the nikah photograph,
                            events timeline, countdown, closing
assets/css/styles.css       the whole design system
assets/js/main.js           envelope reveal, scroll reveals, particles, countdown
assets/img/nikah-arch.jpg   the photograph, cropped and web-sized
vercel.json                 static hosting config (cache headers, clean URLs)
package.json                a local dev server script; no dependencies
```

The three assets are duplicated per folder rather than shared, because each
folder is deployed as its own Vercel project with its own root directory. **A
change to shared CSS or JS has to be copied into all four.** The stylesheets
fall into two pairs that should each stay byte-identical — the single-event
cards carry the `.venue-map` and `.timeline.single` rules, the multi-event ones
do not — so these two checks should both come back silent:

```sh
diff wedding-invitation-baraat/assets/css/styles.css \
     wedding-invitation-reception/assets/css/styles.css
diff wedding-invitation/assets/css/styles.css \
     wedding-invitation-baraat-reception/assets/css/styles.css
```

## Running locally

Each variant serves on its own port so several can run side by side:

```sh
npm run dev:full        # 4173  wedding-invitation
npm run dev:baraat      # 4174  wedding-invitation-baraat
npm run dev:walima      # 4175  wedding-invitation-reception
npm run dev:both        # 4176  wedding-invitation-baraat-reception
```

Or, in any folder: `npm run dev`, or `python3 -m http.server 4173`. You can also
just open `index.html` — there is no bundling or same-origin requirement.

## Deploying

Four separate Vercel projects, all pointing at this one repository, each with its
**Root Directory** set to its own folder:

| Vercel project root directory | Serves |
| --- | --- |
| `wedding-invitation` | the full invitation |
| `wedding-invitation-baraat` | the Baraat card |
| `wedding-invitation-reception` | the Walima card |
| `wedding-invitation-baraat-reception` | the Baraat & Walima card |

There is no build step — Vercel serves the files as-is, and each folder's
`vercel.json` supplies the cache headers and clean URLs. Setting the root
directory is also what keeps a push from redeploying all four when only one
changed, provided *Ignored Build Step* is left at Vercel's default (it skips
projects whose root directory saw no changes).

Or from the command line, per folder:

```sh
cd wedding-invitation-baraat
npx vercel          # preview URL
npx vercel --prod   # production
```

Google Fonts is the only external request on every card, plus the Google Maps
frame on the two single-event cards.
