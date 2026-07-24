# happy birthday anisa 🎂

A little kawaii/stationery birthday site — cream + gingham backgrounds, hand-drawn
SVG doodles, handwritten fonts, pastel pill buttons.

**Live:** https://alexmoschop.github.io/happy-birthday-anisa/

No build step, no dependencies. It's three static files plus an `assets/` folder —
drop it on any web host and it works.

---

## How to edit

Everything you'd want to change lives in the clearly-marked block at the **top of
`script.js`**, above the `🛠 engine` line. You never need to touch anything below it.

| Thing | Where |
|---|---|
| Her name | `FRIEND_NAME` |
| Menu labels + vlogs | `MENU_ITEMS` |
| The note card text | last entry of `MENU_ITEMS` (`type: "note"`) |
| Gallery photos/videos | `GALLERY` |
| The sticky-note line in the gallery | `GALLERY_NOTE` |
| The hidden letter | `LETTER_BUTTON`, `LETTER_TEXT`, `LETTER_SIGNOFF` |

The birthday message on the reveal screen is in `index.html`, between the
`<!-- BIRTHDAY_MESSAGE -->` comments.

### Renaming menu items

`MENU_ITEMS` maps 1:1 onto the sidebar. Each video entry looks like:

```js
{ name: "jarred", emoji: "🍜", video: "assets/menu/jarred.mp4", poster: "assets/menu/jarred.jpg" }
```

`name` and `emoji` are just labels — rename them to whatever you like without
touching `video`/`poster`. The **last** entry is the handwritten note card
(`type: "note"`); it has no video, just the message.

> ⚠️ **Content is code.** One missing comma in these arrays throws a `SyntaxError`
> that kills the whole script — including the `yes!!` button, which leaves the
> first screen stuck. **Reload the site after every content edit.**

---

## Media

Originals live in `./media/` and are **git-ignored** (~1.3 GB). Only the compressed
files in `./assets/` are committed.

Everything was re-encoded with ffmpeg to H.264 / AAC, `+faststart`, and a generated
poster frame per video:

| File | Source | Shipped | Notes |
|---|---|---|---|
| `jarred.mp4` | 96 MB `.mov` | 4.1 MB | 720p, CRF 28 |
| `prithvish.mp4` | 189 MB `.mov` | 6.6 MB | 720p, CRF 28 |
| `nosa.mp4` | 97 MB `.mp4` | 16.9 MB | 720p, CRF 28 |
| `nandini.mp4` | 953 MB `.MOV` | 37 MB | **480p, CRF 30** — it's 10½ minutes long, so 720p came out at 87 MB. Dropped to 480p to keep it a reasonable phone download. |
| `kevin.mp4` | 270 MB `.mov` | 9.2 MB | 720p, CRF 28, capped at 30fps (source was 60) |
| `daniel.mp4` | 377 MB `.MOV` | 11.2 MB | 720p, CRF 28 — 4K source, rotation metadata applied on encode |
| `mirna.mp4` | 768 MB `.mp4` | 20.8 MB | 720p, **CRF 30**, 30fps — 6½ minutes long |
| gallery (22 photos) | — | 5 MB | copied as-is; already small |
| gallery (2 clips) | 11 MB | 7.4 MB | 720p, CRF 28 |

**Nothing was dropped.** Every file from both Drive folders is on the site, and no
committed file is anywhere near GitHub's 100 MB limit.

### To re-encode something

```bash
ffmpeg -i input.mov -vf "scale=w=1280:h=720:force_original_aspect_ratio=decrease:force_divisible_by=2" -c:v libx264 -crf 28 -preset medium -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 128k output.mp4
```

If a video ever comes out too big to commit, set its `video:` to
`"TOO_LARGE_SEE_README"` — the site then shows a cute "vlog coming soon!! 🎬" card
instead of a broken player, and you can host that one on Drive/YouTube instead.

---

## Running it locally

```bash
python -m http.server 8123 --directory birthday-site
```

Then open `http://localhost:8123`. Opening `index.html` as a `file://` URL will
**not** work properly — the videos and the CSP need a real server.

---

## Deploying

GitHub Pages serves `main` / root. Push and it rebuilds automatically (~1 minute).

```bash
git add -A && git commit -m "your message" && git push
```

### A cleaner URL

The current URL is `alexmoschop.github.io/happy-birthday-anisa`. If you ever want
something like `anisa.birthday`, buy a domain, add a `CNAME` file containing that
domain to the repo root, and point the domain's DNS at GitHub Pages. Not set up now.

---

## Notes

- The repo is **public** (GitHub Pages requires it on the free tier), so the photos
  and messages are readable by anyone who has the URL. There's a `noindex` meta tag
  so search engines skip it, but it is not private — treat the link as the only lock.
- Link previews (iMessage/WhatsApp) deliberately say "a surprise for you 🎂" rather
  than spoiling it.
- Everything respects `prefers-reduced-motion` — animations, confetti, and the
  letter's typewriter all degrade to instant.
