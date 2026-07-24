# CONTEXT.md — session handoff

Kawaii birthday website for **Anisa**, built and deployed in this session.
Written for whoever (human or model) picks this up next.

---

## 1. Current state

**Live:** https://alexmoschop.github.io/happy-birthday-anisa/
**Repo:** https://github.com/AlexMoschop/happy-birthday-anisa (public, owner `AlexMoschop`)
**Local:** `C:\Users\User1\Downloads\birthday-site`
**Last commit:** `4100ed1` — "phase 2: real vlogs, photo gallery, note card and hidden letter"

Status: **phase 2 complete.** Real media is in, deployed, verified live on a
375px viewport. See §10 for what phase 2 changed.

> The old `birthday-site` repo still exists on GitHub with the placeholder
> version, and is still wired up as the git remote `old-birthday-site`.
> Nothing points at it any more — safe to delete when you like.

### Files

| File | Purpose |
|---|---|
| `index.html` | Scene markup, SVG doodle sprite defs, chrome buttons, overlays |
| `style.css` | Design system, gingham gradients, animations, responsive rules |
| `script.js` | Config block at top (`EDIT ME`), engine below the marked line |
| `reference/README.txt` | Placeholder — the two reference screenshots were never actually on disk |
| `CONTEXT.md` | This file |

There is **no build step and no dependencies**. It is three static files; drop the
folder anywhere and it works. Only the Google Fonts link needs network.

---

## 2. What was built (original spec)

Static single-page kawaii/stationery birthday card, plain HTML/CSS/vanilla JS.

- **Scene 1** — cream bg, ~20 scattered pastel doodle stars, "i have a surprise
  for you, wanna see it?", pill buttons `yes!!` / `no thanks.` (the latter dodges
  the cursor), original generic bunny doodle.
- **Scene 2** — pastel blue gingham + cherry doodles, white card, tappable SVG
  cake with unlit candles.
- **Scene 3** — cake tap lights candles → chime (WebAudio, no audio files) →
  transition to pink gingham, bouncing "happy birthday anisa!! 🎂", message card,
  canvas confetti burst + drift.
- **Menu sidebar** (`menu ♡`, top-left) — 7 food items, each opening a detail
  overlay with a YouTube embed + recipe card (heart checkboxes, numbered steps).
- **Freebie zone** (`freebie 💜`, bottom-right, bobbing) — purple gingham overlay,
  7-video grid, purple hearts + music-note doodles among the stars.

All doodles are inline SVG. Gingham is pure CSS `linear-gradient` layers. No
external images anywhere. Palette is strictly the pastel set defined as CSS vars
in `style.css` (`--cream`, `--gingham-blue`, `--soft-pink`, `--soft-purple`, …,
`--ink: #3D3833`, never pure black).

---

## 3. Environment quirks discovered (important — these cost time)

- **`prefers-reduced-motion: reduce` is ON in the preview browser.** This masked
  all entrance animations and rendered the page *blank* until fixed. Any new
  animated-in element must have a reduced-motion fallback or it will be invisible
  in testing.
- **The preview pane caches CSS aggressively.** After editing `style.css` you must
  cache-bust to see changes:
  `document.querySelector('link[rel=stylesheet][href*=style]').href='style.css?v='+Date.now()`
- **`file://` URLs render as a static snapshot** in the Browser pane — scripts do
  not run properly. Use the local server instead (§4).
- **Windows/Git Bash:** `jq` and `gh` were not installed; both were added via
  `winget` during this session. `gh` lives at `/c/Program Files/GitHub CLI` and may
  need adding to `PATH` in new shells:
  `export PATH="$PATH:/c/Program Files/GitHub CLI"`
- **ffmpeg / ffprobe are NOT installed** on this machine (checked, absent from PATH).

---

## 4. How to run locally

A launch config already exists at `C:\Users\User1\Downloads\.claude\launch.json`
(python http.server on port 8123, serving the `birthday-site` directory).

```bash
python -m http.server 8123 --directory birthday-site
```

Then open `http://localhost:8123`. Serve from `C:\Users\User1\Downloads`.

---

## 5. Review history & fixes applied

### QA pass (browser-driven) — 2 real bugs found and fixed
1. **Blank page under reduced-motion** — animations disabled but elements left at
   `opacity: 0`. Fixed with a `.fade-up,.bounce-in{opacity:1!important}` override
   inside the reduced-motion media query.
2. **Confetti canvas broke the layout** — `#confetti` had no positioning CSS and
   sat in the flex flow at full width, pushing the reveal off-centre. Now
   `position:absolute; inset:0; pointer-events:none` behind the content.

### Cross-vendor council — FAILED, do not retry without keys
`/claude-council:council-execution` ran but **both providers failed**: Gemini
returned an unparseable/null response (unconfigured), OpenAI errored with
`OPENAI_API_KEY not set`. Output at `.claude/council-cache/council-1784300525.md`.
To use the real council, configure provider keys first (`/claude-council:status`).

### Local council (4 Claude subagents, blind, parallel) — succeeded
Roles: Devil's Advocate, Simplicity Champion, Security Auditor, Scalability
Architect. Full output saved to:
`C:\Users\User1\Downloads\.claude\council-cache\local-council-1784302732.md`

> Caveat recorded there: all four members are the same model, so agreement is a
> shared prior to stress-test, **not** independent corroboration.

**Fixes applied from its findings (all in commit `abb7dba`):**
- `FRIEND_NAME` set to `"Anisa"` (reveal text + footer).
- **HTML escaping** — added `esc()`; all config-derived text (`item.name`, recipe
  ingredients/steps, video titles) is escaped before `innerHTML`. Prevents a stray
  quote in a recipe line silently corrupting the DOM.
- **`<meta name="robots" content="noindex">`** — the personal message sits on a
  public, crawlable URL backed by a public repo.
- **CSP meta tag** — `script-src 'self'`, `frame-src` limited to
  `youtube-nocookie.com`, fonts allowed. Verified it does not break fonts/embeds.
- **`og:` tags** — link previews in iMessage/WhatsApp now show
  "a surprise for you 🎂" (deliberately spoiler-free) instead of a bare URL.
- **Removed the mute button** — it was dead UI: `playChime()` fires once, *before*
  the 900ms timeout that unhid the button, so it could never mute anything.
  Removed from all three files.
- **Lazy freebie grid** — was building all 7 YouTube iframes at page load inside a
  `visibility:hidden` overlay. Masked today by placeholders; would have bitten the
  moment real IDs went in. Now built on first open via `buildFreebieGrid()`.
- **Confetti hardening** — `ctx.roundRect` fallback (missing on Safari < 16.4,
  where it threw *before* the rAF re-queue → loop died on frame one, zero confetti
  with no visible error); stops drifting after 45s; pauses on `visibilitychange`;
  respects `prefers-reduced-motion`.
- **Dodge button clamped to viewport** — could previously teleport onto `yes!!` or
  off-screen on narrow phones.
- **Recipe checklist persists** via `localStorage` (wrapped in try/catch for
  private mode); previously wiped on every overlay open.
- Trimmed the iframe `allow` list; deleted a dead 9-line gingham CSS block that was
  immediately overridden.

---

## 6. Outstanding / next steps

1. **Menu labels are placeholders.** `MENU_ITEMS[].name` is currently the vlog
   filename (`jarred`, `nandini`, `prithvish`, `the mystery vlog`) with an
   arbitrary food emoji. Alex said he'd rename these himself.
2. **The recipes are still Claude's joke filler.** They sit under each vlog and
   read as generic. Either write real ones or delete the `recipe` key.
3. The reveal message in `index.html` (between `<!-- BIRTHDAY_MESSAGE -->` and
   `<!-- /BIRTHDAY_MESSAGE -->`) is **still draft text written by Claude**, not
   Alex's own words. The note card and the letter *are* his verbatim words.
4. **Open the live URL on a real phone** before sending. Verified at a 375px
   viewport in an automated browser, but never on actual hardware — and the
   in-app Browser pane could not take screenshots this session, so nothing was
   ever confirmed by eye.

**Deliberately NOT done** (all four council members warned against over-engineering
a single-recipient birthday card): focus traps / `inert` on closed overlays,
extracting content to JSON, thumbnail facades for embeds, self-hosting fonts.

---

## 7. Editing guide

All content lives in the clearly-marked block at the **top of `script.js`**, above
the `🛠 engine` line:

```js
const FRIEND_NAME = "Anisa";
const MENU_ITEMS   = [ { name, emoji, videoId, recipe: { ingredients, steps } }, … ];  // 7
const FREEBIE_VIDEOS = [ { title, videoId }, … ];                                      // 7
```

`videoId` = the part after `watch?v=`. Any id still starting with `YOUTUBE_ID`
renders the "coming soon" card instead of an embed.

⚠️ **Content is code.** A single missing comma while editing these arrays throws a
`SyntaxError` that kills the entire script — including the `yes!!` handler, leaving
scene 1 stuck with a dodging `no` and a dead `yes`. **Reload the live URL after
every content edit.**

---

## 8. Deploy / redeploy

Git identity is configured locally in the repo as `AlexMoschop` /
`alexandermoschopoulos@gmail.com`. `gh` is authenticated as **AlexMoschop**
(scopes: `gist`, `read:org`, `repo`).

```bash
cd "C:/Users/User1/Downloads/birthday-site" && git add -A && git commit -m "msg" && git push
```

GitHub Pages is enabled from `main` / root (legacy build type). Pages rebuilds
automatically; the first build of a new site took several minutes, subsequent ones
are ~1 minute. Poll for the update rather than assuming:

```bash
until curl -s https://alexmoschop.github.io/birthday-site/ -o /dev/null -w '%{http_code}' | grep -q 200; do sleep 10; done
```

---

## 9. User preferences observed

- Prefers being asked before irreversible/outward-facing steps (hosting choice was
  offered as options rather than assumed).
- Wanted the council skill used for review rather than a solo review.
- Windows 11, PowerShell + Git Bash both available; Python 3.12.10 present.

---

## 10. Phase 2 (media + messages + redeploy)

### Where the media came from

`./media/` did not exist locally — both folders were pulled from Google Drive:

| Drive folder | → | Contents |
|---|---|---|
| `Anisa` (owned by Alex) | `media/ANISA/` | 22 photos + 2 clips, ~15 MB |
| `anisabetterbeimpressed.` (shared by nandinimehrotra05@) | `media/menu-vlogs/` | 4 vlogs, ~1.3 GB |

The vlogs are named after **people** (`Jarred`, `Nandini`, `Prithvish`, plus one
`VID-…WA0010.mp4`), not dishes. Alex confirmed this is the right folder and asked
that the menu be labelled "food vlogs".

### Getting the files down — the parts that cost time

- **The Drive MCP caps downloads at 10 MB.** Fine for the photos, useless for the
  vlogs. Do not retry it for anything large.
- **Drive MCP results overflow to a file on disk** containing the full base64.
  That is how the 24 gallery files were fetched without ever putting the bytes in
  the model's context: call `download_file_content`, then decode the saved JSON
  with PowerShell. Genuinely useful trick.
- **The vlogs came via Claude-in-Chrome** (Alex's logged-in browser), which he
  explicitly approved. Two gotchas:
  - Files >100 MB hit a "can't scan for viruses" interstitial.
  - Clicking *Download anyway* and then navigating away **cancels the download**.
    Navigating straight to
    `https://drive.usercontent.google.com/download?id=<ID>&export=download&authuser=0&confirm=t`
    is far more reliable. Wait for each one before starting the next.

### Encoding

`ffmpeg` was **not** installed (as §3 warned) — added via
`winget install Gyan.FFmpeg`. A reusable, idempotent encode script lives at
`scratchpad/build-media.ps1` (skips outputs that already exist).

720p / CRF 28 / AAC / `+faststart`, plus a generated poster frame per video.
Results: 96 MB → 4.1, 189 MB → 6.6, 97 MB → 16.9.

**Nandini needed special handling:** it's 10½ minutes long, so 720p/CRF 28 landed
at **87 MB** — legal for GitHub but a brutal phone download. Re-encoded alone at
**480p / CRF 30 → 37 MB**. If you re-run `build-media.ps1`, it will regenerate
that file at 720p and undo this; delete `assets/menu/nandini.mp4` and use the
480p command in `README.md` instead.

Photos are **copied, not re-encoded** — already ~230 KB each, and running them
through ffmpeg risks EXIF-orientation flips for no real gain.

### The bug that would have shipped silently

`index.html` had `media-src 'none'` in its CSP — a leftover from when every video
was a YouTube iframe. That blocks **every local `<video>`**, and it fails quietly:
the poster still renders, so the page looks fine and nothing plays. Now `'self'`,
and `frame-src` is `'none'` since no iframes remain.

Also changed: `.video-wrap` no longer forces `aspect-ratio:16/9`. Three of the
four vlogs are portrait (406×720), and a 16:9 box pillarboxed them into a tiny
strip on a phone. The box now takes the clip's own shape, capped at 68vh. The
"coming soon" fallback keeps 16:9 via `.video-wrap--empty`.

### Verification actually performed

Clicked through end-to-end on the **live URL** at a 375px viewport: menu → each
vlog loads and plays → note card → gallery (24 items, 0 broken) → lightbox
(arrows, wrap-around, touch-swipe) → hidden letter (typewriter ran to 280/280,
sign-off, re-openable). No console errors. All 34 media URLs return 200.

The typewriter had to be driven manually in testing, because
`prefers-reduced-motion` is ON in the preview browser (§3) and short-circuits it.
**Screenshots were unavailable all session** — the Browser pane was never
displayed, so `computer{action:"screenshot"}` timed out every time. Everything
above was verified through the DOM and the network log, *not by eye*.
