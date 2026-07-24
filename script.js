/* ============================================================
   ✏️  EDIT ME — all your content lives in this top section.
   You never need to touch anything below the "engine" line.
   ============================================================ */

/* --- her name (used in the reveal + footer) --- */
const FRIEND_NAME = "Anisa";

/* --- the menu: food vlogs, played from ./assets/menu/ ---
       Rename `name` and `emoji` freely — they're just labels.
       `video` / `poster` point at the compressed files on disk.

       The LAST entry is special: type "note" shows a handwritten
       message card instead of a video. --- */
const MENU_ITEMS = [
  { name: "jarred",    emoji: "🍜", video: "assets/menu/jarred.mp4",    poster: "assets/menu/jarred.jpg" },
  { name: "nandini",   emoji: "🍰", video: "assets/menu/nandini.mp4",   poster: "assets/menu/nandini.jpg" },
  { name: "prithvish", emoji: "🍪", video: "assets/menu/prithvish.mp4", poster: "assets/menu/prithvish.jpg" },
  { name: "nosa",      emoji: "🍓", video: "assets/menu/nosa.mp4",      poster: "assets/menu/nosa.jpg" },
  { name: "mirna",     emoji: "🍡", video: "assets/menu/mirna.mp4",     poster: "assets/menu/mirna.jpg" },
  { name: "kevin",     emoji: "🍔", video: "assets/menu/kevin.mp4",     poster: "assets/menu/kevin.jpg" },
  { name: "daniel",    emoji: "🧁", video: "assets/menu/daniel.mp4",    poster: "assets/menu/daniel.jpg" },
  {
    type: "note",
    name: "om", emoji: "✉️",
    text: "Happy birthday Anisa! I hope you have a great birthday and enjoy your birthday weekend. Thank you for your contributions to the society as ambassador you've been a great help. Good luck with your next year at uni!",
  },
];

/* --- freebie gallery: everything in ./assets/freebie/ ---
       kind "photo" or "video"; videos also need a poster. --- */
const GALLERY = [
  { kind: "photo", src: "assets/freebie/img-20260724-wa0002.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0003.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0004.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0005.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0006.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0007.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0008.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0009.jpg" },
  { kind: "video", src: "assets/freebie/vid-20260724-wa0024.mp4", poster: "assets/freebie/vid-20260724-wa0024.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0010.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0011.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0012.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0013.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0014.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0015.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0016.jpg" },
  { kind: "video", src: "assets/freebie/vid-20260724-wa0025.mp4", poster: "assets/freebie/vid-20260724-wa0025.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0017.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0018.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0019.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0020.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0021.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0022.jpg" },
  { kind: "photo", src: "assets/freebie/img-20260724-wa0023.jpg" },
];

/* --- the sticky note pinned at the end of the gallery --- */
const GALLERY_NOTE = "*expert opinion: we REALLY need to do more stuff together and get more pictures!!";

/* --- the hidden letter (freebie-inside-the-freebie) --- */
const LETTER_BUTTON = "wait… another freebie?? 💜";
const LETTER_TEXT = "Hi anisa! This is alex, just want to say happy birthday and i hope you enjoy my site! Even though I don't know you all that well, you always bring the best vibe and even better cakes. Continue doing what you're doing; and if you ever need any help don't hesitate to ask. Bye byeee";
const LETTER_SIGNOFF = "— alex";

/* ============================================================
   🛠  engine — no edits needed below this line
   ============================================================ */

const $ = (s) => document.querySelector(s);

/* a video slot that was too big to ship keeps this marker (see README) */
const isMissingVideo = (src) => !src || src.startsWith("TOO_LARGE");

/* escape config text before it goes through innerHTML — a stray quote in a
   recipe line must not corrupt the markup */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* small random tilt, stable once assigned */
const tilt = (deg) => ((Math.random() * 2 - 1) * deg).toFixed(2);

/* ---------- fill in the name ---------- */
$("#hbdText").textContent = `happy birthday ${FRIEND_NAME}!! 🎂`;
const footer = $("#footer");
footer.textContent = `made with ♡ for ${FRIEND_NAME}`;
footer.hidden = false;

/* ---------- doodle fields ---------- */
const PASTELS = ["#F5B8C9", "#BFDFC4", "#A9CBE8", "#F0C48A", "#C9B8E8"];

function scatterDoodles(field) {
  const kind = field.dataset.doodles;
  const count = 15 + Math.floor(Math.random() * 8);
  for (let i = 0; i < count; i++) {
    const d = document.createElement("span");
    d.className = "doodle";
    d.style.left = Math.random() * 96 + "%";
    d.style.top = Math.random() * 94 + "%";
    d.style.setProperty("--r", (Math.random() * 50 - 25).toFixed(0) + "deg");
    d.style.animationDelay = (Math.random() * 4).toFixed(2) + "s";
    d.style.animationDuration = (3 + Math.random() * 3).toFixed(2) + "s";
    const size = 14 + Math.random() * 16;
    d.style.width = d.style.height = size + "px";

    let use = "d-star";
    let color = PASTELS[i % PASTELS.length];
    if (kind === "cherries") {
      use = Math.random() < 0.75 ? "d-cherry" : "d-heart";
      color = Math.random() < 0.7 ? "#E86A6A" : "#F5B8C9";
    } else if (kind === "party") {
      use = Math.random() < 0.6 ? "d-star" : "d-heart";
    } else if (kind === "purple") {
      const r = Math.random();
      use = r < 0.45 ? "d-heart" : r < 0.85 ? "d-star" : "d-note";
      color = r < 0.45 ? "#9B7FD4" : PASTELS[i % PASTELS.length];
    }

    const fillMode = use === "d-cherry" || use === "d-note"
      ? `fill:${color};stroke:${color};stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round`
      : `fill:${color}`;
    d.innerHTML =
      `<svg viewBox="0 0 24 24" style="${fillMode}"><use href="#${use}"/></svg>`;
    field.appendChild(d);
  }
}
document.querySelectorAll(".doodle-field").forEach(scatterDoodles);

/* ---------- scene switching ---------- */
function showScene(id) {
  document.querySelectorAll(".scene").forEach((s) => {
    s.classList.toggle("is-active", s.id === id);
  });
}

/* ---------- scene 1: dodgy "no thanks." button ---------- */
const btnNo = $("#btnNo");
function dodge() {
  let dx = (Math.random() * 160 - 80) | 0;
  let dy = (Math.random() * 120 - 60) | 0;
  // keep the runaway button fully on-screen (phones are narrow)
  const r = btnNo.getBoundingClientRect();
  const pad = 8;
  const base = { left: r.left - curDx, top: r.top - curDy };
  dx = Math.min(Math.max(dx, pad - base.left), innerWidth - r.width - pad - base.left);
  dy = Math.min(Math.max(dy, pad - base.top), innerHeight - r.height - pad - base.top);
  curDx = dx; curDy = dy;
  btnNo.style.transform = `translate(${dx}px, ${dy}px)`;
}
let curDx = 0, curDy = 0;
btnNo.addEventListener("mouseenter", dodge);
btnNo.addEventListener("touchstart", (e) => { e.preventDefault(); dodge(); }, { passive: false });
btnNo.addEventListener("click", dodge); // just in case she catches it

$("#btnYes").addEventListener("click", () => showScene("scene2"));

/* ---------- scene 2 → 3: the cake ---------- */
let revealed = false;
$("#cakeBtn").addEventListener("click", () => {
  if (revealed) return;
  revealed = true;
  const cake = document.querySelector(".cake");
  cake.classList.add("is-lit");
  playChime();
  setTimeout(() => {
    showScene("scene3");
    startConfetti();
    $("#menuBtn").hidden = false;
    $("#freebieBtn").hidden = false;
  }, 900);
});

/* ---------- confetti ---------- */
const canvas = $("#confetti");
const ctx = canvas.getContext("2d");
let particles = [];
let confettiRunning = false;

function resizeCanvas() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}
addEventListener("resize", resizeCanvas);
resizeCanvas();

function spawnBurst(n) {
  for (let i = 0; i < n; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height * 0.35,
      vx: (Math.random() - 0.5) * 9,
      vy: -Math.random() * 9 - 2,
      w: 6 + Math.random() * 6,
      h: 8 + Math.random() * 6,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      color: PASTELS[(Math.random() * PASTELS.length) | 0],
      life: 1,
    });
  }
}

function spawnDrifter() {
  particles.push({
    x: Math.random() * canvas.width,
    y: -12,
    vx: (Math.random() - 0.5) * 0.7,
    vy: 0.6 + Math.random() * 0.9,
    w: 5 + Math.random() * 4,
    h: 6 + Math.random() * 4,
    rot: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.1,
    color: PASTELS[(Math.random() * PASTELS.length) | 0],
    life: 1,
  });
}

const CONFETTI_DRIFT_MS = 45000;   // stop feeding new drifters after 45s
let confettiStartedAt = 0;

/* rounded confetto — roundRect is missing on Safari < 16.4 */
function confettoPath(c, p) {
  c.beginPath();
  if (c.roundRect) c.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
  else c.rect(-p.w / 2, -p.h / 2, p.w, p.h);
  c.fill();
}

function tickConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.life > 0 && p.y < canvas.height + 20);
  for (const p of particles) {
    p.vy += 0.12;
    if (p.vy > 2.4) p.vy = 2.4;         // gentle terminal velocity
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.fillStyle = p.color;
    confettoPath(ctx, p);
    ctx.restore();
    p.life -= 0.002;
  }
  const drifting = Date.now() - confettiStartedAt < CONFETTI_DRIFT_MS;
  if (drifting && Math.random() < 0.06) spawnDrifter();
  if (!drifting && particles.length === 0) { confettiRunning = false; return; }
  if (confettiRunning) requestAnimationFrame(tickConfetti);
}

function startConfetti() {
  if (confettiRunning || REDUCED_MOTION) return;
  confettiRunning = true;
  confettiStartedAt = Date.now();
  spawnBurst(140);
  setTimeout(() => spawnBurst(80), 350);
  requestAnimationFrame(tickConfetti);
}

/* pause the loop while the tab is hidden; resume where it left off */
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    confettiRunning = false;
  } else if (revealed && particles.length > 0 && !confettiRunning && !REDUCED_MOTION) {
    confettiRunning = true;
    requestAnimationFrame(tickConfetti);
  }
});

/* a short one-shot pop on its own canvas — used by the letter, which sits
   above the scene confetti and needs its own layer */
function popConfettiOn(cv) {
  if (REDUCED_MOTION || !cv) return;
  const c = cv.getContext("2d");
  cv.width = cv.clientWidth;
  cv.height = cv.clientHeight;
  let bits = [];
  for (let i = 0; i < 70; i++) {
    bits.push({
      x: cv.width / 2 + (Math.random() - 0.5) * 80,
      y: cv.height * 0.55,
      vx: (Math.random() - 0.5) * 8,
      vy: -Math.random() * 8 - 2,
      w: 5 + Math.random() * 5,
      h: 7 + Math.random() * 5,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.25,
      color: PASTELS[(Math.random() * PASTELS.length) | 0],
      life: 1,
    });
  }
  (function tick() {
    c.clearRect(0, 0, cv.width, cv.height);
    bits = bits.filter((p) => p.life > 0 && p.y < cv.height + 20);
    for (const p of bits) {
      p.vy += 0.14; p.x += p.vx; p.y += p.vy; p.rot += p.vr;
      c.save();
      c.translate(p.x, p.y);
      c.rotate(p.rot);
      c.globalAlpha = Math.max(p.life, 0);
      c.fillStyle = p.color;
      confettoPath(c, p);
      c.restore();
      p.life -= 0.006;
    }
    if (bits.length) requestAnimationFrame(tick);
    else c.clearRect(0, 0, cv.width, cv.height);
  })();
}

/* ---------- chime (WebAudio, no files needed) ---------- */
let audioCtx = null;

function playChime() {
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C — a happy little arpeggio
    notes.forEach((f, i) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      const t = audioCtx.currentTime + i * 0.12;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.9);
      o.connect(g).connect(audioCtx.destination);
      o.start(t);
      o.stop(t + 1);
    });
  } catch (_) { /* no audio? no problem */ }
}

/* ---------- svg helpers ---------- */
const CAMERA_SVG = `
<svg viewBox="0 0 80 60" aria-hidden="true">
  <rect x="6" y="14" width="52" height="38" rx="10" fill="var(--soft-yellow)"
        stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <path d="M58 28l16-9v22l-16-9z" fill="var(--soft-pink)"
        stroke="var(--ink)" stroke-width="3" stroke-linejoin="round"/>
  <circle cx="30" cy="33" r="9" fill="var(--card-white)" stroke="var(--ink)" stroke-width="3"/>
  <circle cx="27" cy="30" r="2.4" fill="var(--ink)"/>
</svg>`;

const FOOD_ICON = (i) => {
  const palette = ["var(--soft-pink)", "var(--soft-yellow)", "var(--soft-green)",
                   "var(--soft-purple)", "var(--gingham-pink)", "var(--gingham-blue)", "var(--soft-pink)"];
  return `
  <svg class="ico" viewBox="0 0 30 30" aria-hidden="true">
    <path d="M5 17h20v4a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6z" fill="${palette[i % palette.length]}"
          stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M6 17q4-8 9-8t9 8" fill="var(--card-white)"
          stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <circle cx="15" cy="6" r="2.4" fill="var(--soft-pink)" stroke="var(--ink)" stroke-width="2"/>
  </svg>`;
};

/* envelope icon for the note slot in the sidebar */
const NOTE_ICON = `
  <svg class="ico" viewBox="0 0 30 30" aria-hidden="true">
    <rect x="3" y="7" width="24" height="17" rx="3" fill="var(--soft-pink)"
          stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round"/>
    <path d="M3.5 8.5 15 17l11.5-8.5" fill="none"
          stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;

const TAPE = (cls) => `<svg class="tape ${cls}" viewBox="0 0 42 20" aria-hidden="true"><use href="#d-tape"/></svg>`;

/* local video player — preload="none" + poster keeps the page light */
function videoBlock(src, poster, title) {
  if (isMissingVideo(src)) {
    return `<div class="video-wrap video-wrap--empty"><div class="coming-soon">
      ${CAMERA_SVG}<span>vlog coming soon!! 🎬</span>
    </div></div>`;
  }
  const posterAttr = poster ? ` poster="${esc(poster)}"` : "";
  return `<div class="video-wrap">
    <video controls preload="none"${posterAttr} playsinline
           title="${esc(title)}" src="${esc(src)}"></video>
  </div>`;
}

/* ---------- sidebar / menu ---------- */
const sidebar = $("#sidebar");
const scrim = $("#scrim");
const detail = $("#detail");

const menuList = $("#menuList");
MENU_ITEMS.forEach((item, i) => {
  const li = document.createElement("li");
  const btn = document.createElement("button");
  btn.className = "menu-item" + (item.type === "note" ? " menu-item--note" : "");
  btn.innerHTML = `${item.type === "note" ? NOTE_ICON : FOOD_ICON(i)}<span>${esc(item.name)} ${esc(item.emoji)}</span>`;
  btn.addEventListener("click", () => openDetail(i));
  li.appendChild(btn);
  menuList.appendChild(li);
});

function openSidebar() {
  sidebar.classList.add("is-open");
  sidebar.setAttribute("aria-hidden", "false");
  scrim.hidden = false;
  requestAnimationFrame(() => scrim.classList.add("is-on"));
}
function closeSidebar() {
  sidebar.classList.remove("is-open");
  sidebar.setAttribute("aria-hidden", "true");
  scrim.classList.remove("is-on");
  setTimeout(() => { scrim.hidden = true; }, 300);
}
$("#menuBtn").addEventListener("click", openSidebar);
$("#menuClose").addEventListener("click", closeSidebar);
scrim.addEventListener("click", closeSidebar);

function closeDetail() {
  // stop playback so audio doesn't keep going behind the overlay
  detail.querySelectorAll("video").forEach((v) => v.pause());
  detail.classList.remove("is-open");
  detail.setAttribute("aria-hidden", "true");
}

function openDetail(i) {
  const item = MENU_ITEMS[i];

  if (item.type === "note") {
    $("#detailBody").innerHTML = `
      <button class="pill detail-back" id="detailBack">← back to menu</button>
      <div class="note-card">
        ${TAPE("tape--tl")}${TAPE("tape--tr")}
        <p class="note-card__text">${esc(item.text)}</p>
        <svg class="note-card__cake" viewBox="0 0 40 40" aria-hidden="true"><use href="#d-cake-sm"/></svg>
      </div>`;
  } else {
    $("#detailBody").innerHTML = `
      <button class="pill detail-back" id="detailBack">← back to menu</button>
      <h3 class="recipe-title">${esc(item.name)} ${esc(item.emoji)}</h3>
      ${videoBlock(item.video, item.poster, item.name)}`;
  }

  $("#detailBack").addEventListener("click", closeDetail);
  detail.classList.add("is-open");
  detail.setAttribute("aria-hidden", "false");
  detail.querySelector(".overlay__scroll").scrollTop = 0;
  closeSidebar();
}

/* ---------- freebie zone: the polaroid gallery ---------- */
const freebie = $("#freebie");
const grid = $("#freebieGrid");
let freebieBuilt = false;

/* built on first open, not at page load */
function buildFreebieGrid() {
  if (freebieBuilt) return;
  freebieBuilt = true;

  GALLERY.forEach((it, i) => {
    const card = document.createElement("button");
    card.className = "polaroid";
    card.style.setProperty("--tilt", tilt(3) + "deg");
    card.setAttribute("aria-label",
      it.kind === "video" ? "play video" : "open photo");
    card.addEventListener("click", () => openLightbox(i));

    const media = it.kind === "video"
      ? `<img src="${esc(it.poster)}" alt="" loading="lazy" decoding="async">
         <svg class="polaroid__play" viewBox="0 0 48 48" aria-hidden="true"><use href="#d-play"/></svg>`
      : `<img src="${esc(it.src)}" alt="" loading="lazy" decoding="async">`;

    // a heart or star taped to a corner, alternating sides
    const doodle = i % 2 === 0 ? "d-heart" : "d-star";
    const color = i % 2 === 0 ? "#9B7FD4" : "#F0C48A";

    card.innerHTML = `
      <span class="polaroid__frame">${media}</span>
      ${TAPE(i % 2 === 0 ? "tape--tl" : "tape--tr")}
      <svg class="polaroid__doodle" viewBox="0 0 24 24" aria-hidden="true"
           style="fill:${color}"><use href="#${doodle}"/></svg>`;
    grid.appendChild(card);
  });

  // the sticky note pinned at the end of the grid
  const note = document.createElement("div");
  note.className = "sticky-note";
  note.style.setProperty("--tilt", tilt(4) + "deg");
  note.innerHTML = `<p>${esc(GALLERY_NOTE)}</p>`;
  grid.appendChild(note);
}

$("#freebieBtn").addEventListener("click", () => {
  buildFreebieGrid();
  freebie.classList.add("is-open");
  freebie.setAttribute("aria-hidden", "false");
});
$("#freebieClose").addEventListener("click", closeFreebie);

function closeFreebie() {
  freebie.classList.remove("is-open");
  freebie.setAttribute("aria-hidden", "true");
}

/* ---------- lightbox ---------- */
const lightbox = $("#lightbox");
const lightboxStage = $("#lightboxStage");
let lightboxIndex = -1;

function renderLightbox() {
  const it = GALLERY[lightboxIndex];
  if (!it) return;
  lightboxStage.innerHTML = it.kind === "video"
    ? `<video class="lb-media" controls autoplay playsinline
              poster="${esc(it.poster)}" src="${esc(it.src)}"></video>`
    : `<img class="lb-media" src="${esc(it.src)}" alt="">`;
  $("#lightboxCount").textContent = `${lightboxIndex + 1} / ${GALLERY.length}`;
}

function openLightbox(i) {
  lightboxIndex = i;
  renderLightbox();
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}
function closeLightbox() {
  lightboxStage.querySelectorAll("video").forEach((v) => v.pause());
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxStage.innerHTML = "";
  lightboxIndex = -1;
}
function stepLightbox(dir) {
  if (lightboxIndex < 0) return;
  lightboxStage.querySelectorAll("video").forEach((v) => v.pause());
  lightboxIndex = (lightboxIndex + dir + GALLERY.length) % GALLERY.length;
  renderLightbox();
}

$("#lightboxClose").addEventListener("click", closeLightbox);
$("#lightboxPrev").addEventListener("click", () => stepLightbox(-1));
$("#lightboxNext").addEventListener("click", () => stepLightbox(1));
// tapping the backdrop closes, but not taps on the media itself
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox || e.target === lightboxStage) closeLightbox();
});

/* touch swipe — horizontal only, so vertical scroll/pinch still works */
let touchX = 0, touchY = 0;
lightboxStage.addEventListener("touchstart", (e) => {
  touchX = e.changedTouches[0].clientX;
  touchY = e.changedTouches[0].clientY;
}, { passive: true });
lightboxStage.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  const dy = e.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) stepLightbox(dx < 0 ? 1 : -1);
}, { passive: true });

/* ---------- the hidden letter ---------- */
const letter = $("#letter");
const letterText = $("#letterText");
let typingTimer = null;

function openLetter() {
  letter.classList.add("is-open");
  letter.setAttribute("aria-hidden", "false");
  // let the envelope flap open before the letter slides up
  requestAnimationFrame(() => letter.classList.add("is-unsealed"));

  clearTimeout(typingTimer);
  letterText.textContent = "";
  $("#letterSign").classList.remove("is-on");

  const startDelay = REDUCED_MOTION ? 0 : 900;
  if (REDUCED_MOTION) {
    letterText.textContent = LETTER_TEXT;
    finishLetter();
    return;
  }
  typingTimer = setTimeout(() => typeOut(LETTER_TEXT, 0), startDelay);
}

function typeOut(str, i) {
  letterText.textContent = str.slice(0, i);
  if (i >= str.length) { finishLetter(); return; }
  // slight pause after sentence endings reads more like handwriting
  const ch = str[i];
  const delay = ".!?".includes(ch) ? 160 : 18;
  typingTimer = setTimeout(() => typeOut(str, i + 1), delay);
}

function finishLetter() {
  $("#letterSign").classList.add("is-on");
  popConfettiOn($("#letterConfetti"));
}

function closeLetter() {
  clearTimeout(typingTimer);
  letter.classList.remove("is-open", "is-unsealed");
  letter.setAttribute("aria-hidden", "true");
}

$("#letterBtn").addEventListener("click", openLetter);
$("#letterClose").addEventListener("click", closeLetter);

/* fill in the editable letter chrome */
$("#letterBtn").textContent = LETTER_BUTTON;
$("#letterSign").textContent = LETTER_SIGNOFF;

/* ---------- esc closes the topmost thing ---------- */
addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && lightboxIndex >= 0) { stepLightbox(-1); return; }
  if (e.key === "ArrowRight" && lightboxIndex >= 0) { stepLightbox(1); return; }
  if (e.key !== "Escape") return;

  if (lightboxIndex >= 0) { closeLightbox(); return; }
  if (letter.classList.contains("is-open")) { closeLetter(); return; }
  closeSidebar();
  closeDetail();
  closeFreebie();
});
