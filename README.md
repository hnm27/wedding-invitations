# Humaid &amp; Shumaila — Wedding Invitations

Four invitation websites for one wedding, so that each circle of guests receives
exactly the celebrations they are invited to — and nothing they are not.

The Nikah was solemnised on **31 May 2026**. These cards invite guests to the
celebrations that follow, in **Kolkata, 29 December 2026 – 3 January 2027**.

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no npm
dependencies. Open any `index.html` in a browser and it works.

## The four variants

| Folder | Card | Events | Invited by |
| --- | --- | --- | --- |
| [`wedding-invitation/`](wedding-invitation/) | The full invitation | Shukrana · Baraat · Walima | both families, together |
| [`wedding-invitation-baraat/`](wedding-invitation-baraat/) | Baraat only | Baraat | the Akhtar family |
| [`wedding-invitation-reception/`](wedding-invitation-reception/) | Walima only | Walima | the Mollah family |
| [`wedding-invitation-baraat-reception/`](wedding-invitation-baraat-reception/) | Baraat & Walima | Baraat · Walima | both families, together |

`wedding-invitation/` is the original and is left untouched; the other three are
copies of it with the differences listed in their own READMEs.

Note that `wedding-invitation-reception/` is the **Walima** card — the folder
name is historical, and the word *Walima* is used everywhere a guest can see.

### What actually differs between them

Only four things, in every case:

1. **Who is inviting**, and how the hero sentence is built. The two single-event
   cards are issued by one side of the family, and their hero is one sentence
   that runs *into* the names instead of following them:

   > The Akhtar family
   > *requests the honour of your presence at the baraat of*
   > **HUMAID ALI MOLLAH** … **SHUMAILA AKHTAR**

   So on those two cards the `.request` line moves *above* the `h1` and carries
   a `.lead-in` modifier (a wider measure and a tighter top margin). The names
   are the object of the sentence, which is why they are never repeated in it.
   The two both-families cards keep the original arrangement — *"Together with
   their families"*, the names, then *"request the honour of your presence"*.
2. **The events timeline** — which of the three celebrations appear.
3. **The closing line** — which family the card comes from.
4. **The countdown target** — the Walima card counts to 3 January rather than to
   1 January, because the Baraat is not on that card.

Plus two additions on the single-event cards: an **inline Google Map** for the
venue, and a `.timeline.single` modifier that drops the timeline's vertical rail
(with one stop it reads as a stray rule rather than a sequence).

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
index.html                  cover/envelope, hero, photograph, Qur'an verse,
                            countdown, events timeline, closing
assets/css/styles.css       the whole design system
assets/js/main.js           envelope reveal, scroll reveals, particles, countdown
assets/img/nikah-arch.jpg   the photograph, cropped and web-sized
vercel.json                 static hosting config (cache headers, clean URLs)
package.json                a local dev server script; no dependencies
```

The three assets are duplicated per folder rather than shared, because each
folder is deployed as its own Vercel project with its own root directory. **A
change to shared CSS or JS has to be copied into all four** — `diff -r` between
two folders is the quickest way to confirm they have not drifted apart by
accident:

```sh
diff -r -x README.md -x package.json -x index.html \
  wedding-invitation-baraat wedding-invitation-baraat-reception
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
