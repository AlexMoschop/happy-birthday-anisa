/* ============================================================
   ✏️  EDIT ME — all your content lives in this top section.
   You never need to touch anything below the "engine" line.
   ============================================================ */

/* --- her name (used in the reveal + footer) --- */
const FRIEND_NAME = "Anisa";

/* --- menu: 7 food vlogs + recipes.
       Replace name/emoji, paste the YouTube video id (the part
       after "watch?v=") into videoId. While a videoId still
       starts with "YOUTUBE_ID", a cute "coming soon" card shows
       instead of a broken embed. --- */
const MENU_ITEMS = [
  {
    name: "item 1", emoji: "🍓", videoId: "YOUTUBE_ID_1",
    recipe: {
      ingredients: ["1 cup of something sweet", "a handful of fresh strawberries", "a pinch of love", "2 tbsp of giggles"],
      steps: ["preheat your heart to 180°c", "mix everything gently — no rushing!!", "taste-test at least three times", "share with your favourite person (me)"],
    },
  },
  {
    name: "item 2", emoji: "🍰", videoId: "YOUTUBE_ID_2",
    recipe: {
      ingredients: ["2 cups fluffy flour", "1 cup softest sugar", "3 very polite eggs", "a splash of vanilla dreams"],
      steps: ["whisk until it looks like a cloud", "fold, don't stir — be gentle", "bake until the kitchen smells like a hug", "decorate messily, it tastes better"],
    },
  },
  {
    name: "item 3", emoji: "🍜", videoId: "YOUTUBE_ID_3",
    recipe: {
      ingredients: ["1 packet of the good noodles", "broth that took its time", "a soft-boiled egg with a jammy middle", "green onions, chopped tiny"],
      steps: ["boil water like you mean it", "let the broth simmer while you sing", "slurp loudly — it's the law", "no leftovers allowed"],
    },
  },
  {
    name: "item 4", emoji: "🍪", videoId: "YOUTUBE_ID_4",
    recipe: {
      ingredients: ["1 stick of butter, room-temp & relaxed", "brown sugar (the cozy kind)", "chocolate chips — double the recipe says", "sea salt sprinkle"],
      steps: ["cream butter + sugar till fluffy", "add chips until it feels illegal", "chill the dough (hardest step)", "eat one raw, bake the rest"],
    },
  },
  {
    name: "item 5", emoji: "🧋", videoId: "YOUTUBE_ID_5",
    recipe: {
      ingredients: ["strong tea, brewed with patience", "milk of your choosing", "brown-sugar pearls, bouncy", "lots of ice"],
      steps: ["cook pearls till they're chewy-perfect", "swirl syrup around the glass — for the aesthetic", "pour milk slowly and watch the clouds", "big straw. mandatory."],
    },
  },
  {
    name: "item 6", emoji: "🥞", videoId: "YOUTUBE_ID_6",
    recipe: {
      ingredients: ["1 cup pancake mix (we don't judge)", "1 very round egg", "butter for the pan and for the soul", "maple syrup, a small lake of it"],
      steps: ["flip only when the bubbles say so", "first pancake belongs to the chef", "stack tall like a tiny tower", "syrup until structurally unsound"],
    },
  },
  {
    name: "item 7", emoji: "🧁", videoId: "YOUTUBE_ID_7",
    recipe: {
      ingredients: ["12 paper cases, the cute ones", "batter made with one hand while dancing", "frosting in a pastel colour", "sprinkles — an irresponsible amount"],
      steps: ["fill cases ⅔, not to the brim!!", "no peeking while they bake", "swirl frosting like a tiny cloud", "sprinkle like nobody's watching"],
    },
  },
];

/* --- freebie zone: 7 videos (purple section 💜) --- */
const FREEBIE_VIDEOS = [
  { title: "freebie 1", videoId: "YOUTUBE_ID_F1" },
  { title: "freebie 2", videoId: "YOUTUBE_ID_F2" },
  { title: "freebie 3", videoId: "YOUTUBE_ID_F3" },
  { title: "freebie 4", videoId: "YOUTUBE_ID_F4" },
  { title: "freebie 5", videoId: "YOUTUBE_ID_F5" },
  { title: "freebie 6", videoId: "YOUTUBE_ID_F6" },
  { title: "freebie 7", videoId: "YOUTUBE_ID_F7" },
];

/* ============================================================
   🛠  engine — no edits needed below this line
   ============================================================ */

const $ = (s) => document.querySelector(s);

const isPlaceholder = (id) => !id || id.startsWith("YOUTUBE_ID");

/* escape config text before it goes through innerHTML — a stray quote in a
   recipe line must not corrupt the markup */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)").matches;

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

function tickConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles = particles.filter((p) => p.life > 0 && p.y < canvas.height + 20);
  for (const p of particles) {
    p.vy += 0.12;
    if (p.vy > 2.4) p.vy = 2.4;         // gentle terminal velocity
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life -= 0.002;
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot);
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.fillStyle = p.color;
    ctx.beginPath();
    // rounded confetto (roundRect is missing on Safari < 16.4)
    if (ctx.roundRect) ctx.roundRect(-p.w / 2, -p.h / 2, p.w, p.h, 2);
    else ctx.rect(-p.w / 2, -p.h / 2, p.w, p.h);
    ctx.fill();
    ctx.restore();
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

const HEART_CHECK = `
<svg class="heart-box" viewBox="0 0 24 24" aria-hidden="true">
  <path d="M12 21 C4 15.5 2 11.6 2 8.4 A5.4 5.4 0 0 1 12 5.6 A5.4 5.4 0 0 1 22 8.4 C22 11.6 20 15.5 12 21 Z"/>
</svg>`;

function videoBlock(videoId, title) {
  if (isPlaceholder(videoId)) {
    return `<div class="video-wrap"><div class="coming-soon">
      ${CAMERA_SVG}<span>vlog coming soon!! 🎬</span>
    </div></div>`;
  }
  return `<div class="video-wrap">
    <iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}"
      title="${esc(title)}" loading="lazy" allowfullscreen
      allow="encrypted-media; picture-in-picture"></iframe>
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
  btn.className = "menu-item";
  btn.innerHTML = `${FOOD_ICON(i)}<span>${esc(item.name)} ${esc(item.emoji)}</span>`;
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

function openDetail(i) {
  const item = MENU_ITEMS[i];
  const ing = item.recipe.ingredients.map((x, j) => `
    <li><label>
      <input type="checkbox" id="ing-${i}-${j}" data-key="ing-${i}-${j}"
             ${localStorage.getItem("bday-ing-" + i + "-" + j) ? "checked" : ""}>
      ${HEART_CHECK}
      <span class="txt">${esc(x)}</span>
    </label></li>`).join("");
  const steps = item.recipe.steps.map((x) => `<li>${esc(x)}</li>`).join("");

  $("#detailBody").innerHTML = `
    <button class="pill detail-back" id="detailBack">← back to menu</button>
    <h3 class="recipe-title">${esc(item.name)} ${esc(item.emoji)}</h3>
    ${videoBlock(item.videoId, item.name)}
    <div class="card recipe-card">
      <h4>ingredients</h4>
      <ul class="check-list">${ing}</ul>
      <h4>steps</h4>
      <ol class="step-list">${steps}</ol>
    </div>`;
  // remember ticked ingredients across visits (cook-along survives navigation)
  $("#detailBody").querySelectorAll(".check-list input").forEach((box) => {
    box.addEventListener("change", () => {
      const key = "bday-" + box.dataset.key;
      try {
        box.checked ? localStorage.setItem(key, "1") : localStorage.removeItem(key);
      } catch (_) { /* private mode — no persistence, no crash */ }
    });
  });
  $("#detailBack").addEventListener("click", () => {
    detail.classList.remove("is-open");
    detail.setAttribute("aria-hidden", "true");
  });
  detail.classList.add("is-open");
  detail.setAttribute("aria-hidden", "false");
  detail.querySelector(".overlay__scroll").scrollTop = 0;
  closeSidebar();
}

/* ---------- freebie zone ---------- */
const freebie = $("#freebie");
const grid = $("#freebieGrid");
let freebieBuilt = false;

/* built on first open, not at page load — 7 YouTube players in a hidden
   overlay would otherwise download on page load once real IDs are set */
function buildFreebieGrid() {
  if (freebieBuilt) return;
  freebieBuilt = true;
  FREEBIE_VIDEOS.forEach((v) => {
    const card = document.createElement("div");
    card.className = "f-card";
    card.innerHTML = `${videoBlock(v.videoId, v.title)}<div class="f-card__title">${esc(v.title)} 💜</div>`;
    grid.appendChild(card);
  });
}

$("#freebieBtn").addEventListener("click", () => {
  buildFreebieGrid();
  freebie.classList.add("is-open");
  freebie.setAttribute("aria-hidden", "false");
});
$("#freebieClose").addEventListener("click", () => {
  freebie.classList.remove("is-open");
  freebie.setAttribute("aria-hidden", "true");
});

/* ---------- esc closes everything ---------- */
addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeSidebar();
  detail.classList.remove("is-open");
  detail.setAttribute("aria-hidden", "true");
  freebie.classList.remove("is-open");
  freebie.setAttribute("aria-hidden", "true");
});
