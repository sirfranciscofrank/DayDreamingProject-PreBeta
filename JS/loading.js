
// ── phrases ──────────────────────────────────────────────
const phrases = [
    "letting the light in…",
    "counting the clouds…",
    "following the horizon…",
    "one breath at a time…",
    "the sky is waking up…",
    "almost there, wanderer…",
];
let phraseIdx = 0;

function cyclePhrase() {
    const el = document.getElementById('phraseInner');
    el.classList.add('leaving');
    setTimeout(() => {
        phraseIdx = (phraseIdx + 1) % phrases.length;
        el.textContent = phrases[phraseIdx];
        el.classList.remove('leaving');
        el.classList.add('entering');
        requestAnimationFrame(() => {
            requestAnimationFrame(() => el.classList.remove('entering'));
        });
    }, 600);
}

setInterval(cyclePhrase, 2800);

// ── progress ─────────────────────────────────────────────
let pct = 0;
const fill = document.getElementById('progressFill');
const dot = document.getElementById('progressDot');
const pctEl = document.getElementById('progressPct');
const bar = document.getElementById('progressBar');

function setProgress(v) {
    pct = Math.min(100, Math.max(0, v));
    fill.style.width = pct + '%';
    dot.style.left = pct + '%';
    pctEl.textContent = Math.round(pct);
    bar.setAttribute('aria-valuenow', Math.round(pct));
}

// Simulate a realistic loading curve (fast → slow → burst to 100)
let current = 0;
const stages = [
    { target: 30, duration: 600 },
    { target: 58, duration: 900 },
    { target: 76, duration: 1100 },
    { target: 88, duration: 800 },
    { target: 94, duration: 1200 },
    { target: 100, duration: 400 },
];

let stageIdx = 0;
let stageStart = null;
let stageFrom = 0;

function animateProgress(ts) {
    if (stageIdx >= stages.length) return;
    if (!stageStart) { stageStart = ts; stageFrom = current; }

    const { target, duration } = stages[stageIdx];
    const elapsed = ts - stageStart;
    const t = Math.min(elapsed / duration, 1);
    const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad

    current = stageFrom + (target - stageFrom) * eased;
    setProgress(current);

    if (t >= 1) {
    if (target >= 100) {
        setProgress(100);
        setTimeout(() => {
            window.location.href = "board.html";
        }, 300);
        return;
    }

    stageIdx++;
    stageStart = null;
}
    if (stageIdx < stages.length) {
        requestAnimationFrame(animateProgress);
    }
}

// Start after entrance animation settles
setTimeout(() => requestAnimationFrame(animateProgress), 800);

// ── expose a hook so transition.js can trigger real progress ──
// Usage: window.loadingProgress.set(42)  or  .complete()
window.loadingProgress = {
    set: (v) => setProgress(v),
    complete: () => {
        stages.length = 0; // stop simulation
        setProgress(100);
    }
};

