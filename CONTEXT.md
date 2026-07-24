# CONTEXT.md — session handoff

Kawaii birthday website for **Anisa**, built and deployed in this session.
Written for whoever (human or model) picks this up next.

---

## 1. Current state

**Live:** https://alexmoschop.github.io/birthday-site/
**Repo:** https://github.com/AlexMoschop/birthday-site (public, owner `AlexMoschop`)
**Local:** `C:\Users\User1\Downloads\birthday-site`
**Last commit:** `abb7dba` — "council fixes: Anisa, escaping, CSP, lazy embeds, confetti hardening"

Status: fully built, deployed, verified live. **Content is still placeholder** — see §6.

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

**Blocking before sending to Anisa:**
1. `MENU_ITEMS` still has 7 placeholder items named `"item 1"…"item 7"` with joke
   filler recipes.
2. All 14 `videoId`s are `YOUTUBE_ID_*` placeholders → every video shows the
   "vlog coming soon!! 🎬" fallback card. Grep for `YOUTUBE_ID` to confirm.
3. The birthday message in `index.html` (between `<!-- BIRTHDAY_MESSAGE -->` and
   `<!-- /BIRTHDAY_MESSAGE -->`) is **draft text written by Claude**, not the
   user's own words. Should be replaced.
4. **Open the live URL on a real phone** before sending — flagged by three of the
   four council members. Not yet done.

**Known caveat:** the "coming soon" fallback is cute enough that an unfinished
site does not *look* broken. The failure mode is Anisa receiving a template with
no error shown.

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
