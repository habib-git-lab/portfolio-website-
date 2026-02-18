/* ============================================================
   CRYOWOLF — FUTURISTIC AI SYSTEM INTERFACE V2
   MD HABIBULLAH HAMMAD | script.js
   ============================================================ */

'use strict';

// ── CONSTANTS ──────────────────────────────────────────────
const SUBTITLES = [
    'IT AND WEB EXECUTIVE',
    'SYSTEM DEVELOPER',
    'DIGITAL ARCHITECT',
    'BCA STUDENT',
    'CYBERSECURITY ANALYST',
    'BUILDING INTELLIGENT DIGITAL SYSTEMS',
    'FULL-STACK WEB DEVELOPER',
];

const BOOT_LINES = [
    'LOADING KERNEL MODULES',
    'INITIALIZING NEURAL INTERFACE',
    'MOUNTING SYSTEM DRIVES',
    'ESTABLISHING SECURE CONNECTION',
    'LOADING IDENTITY MATRIX',
    'VERIFYING CRYOWOLF SIGNATURE',
    'SYSTEM READY',
];

// ── UTILITY ────────────────────────────────────────────────
function getDayOfYear(date) {
    // Reliable: diff from Jan 1 midnight of same year (no DST issues)
    const jan1 = new Date(date.getFullYear(), 0, 1);
    const diff = date - jan1;
    return Math.floor(diff / 86400000) + 1; // +1 so Jan 1 = day 1
}

function isLeapYear(y) { return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0; }
function getTotalDays(y) { return isLeapYear(y) ? 366 : 365; }
function pad2(n) { return String(n).padStart(2, '0'); }

// ── BOOT SEQUENCE ──────────────────────────────────────────
function runBootSequence() {
    const overlay = document.getElementById('boot-overlay');
    const linesEl = document.getElementById('boot-lines');
    const barEl = document.getElementById('boot-bar');
    const statusEl = document.getElementById('boot-status');
    if (!overlay) return;

    let i = 0;
    const total = BOOT_LINES.length;

    function addLine() {
        if (i >= total) {
            statusEl.textContent = 'BOOT COMPLETE — WELCOME, CRYOWOLF';
            setTimeout(() => {
                overlay.classList.add('hidden');
                setTimeout(triggerInitialReveals, 300);
            }, 600);
            return;
        }
        const el = document.createElement('div');
        el.className = 'boot-line-item' + (i === total - 1 ? ' ok' : '');
        el.textContent = '> ' + BOOT_LINES[i] + '...';
        linesEl.appendChild(el);
        linesEl.scrollTop = linesEl.scrollHeight;
        barEl.style.width = Math.round(((i + 1) / total) * 100) + '%';
        statusEl.textContent = BOOT_LINES[i] + '...';
        i++;
        setTimeout(addLine, 280);
    }

    setTimeout(addLine, 400);
}

// ── MATRIX YEAR COUNTDOWN ──────────────────────────────────
function buildMatrixGrid() {
    const grid = document.getElementById('matrix-grid');
    const remainingEl = document.getElementById('days-remaining');
    const elapsedEl = document.getElementById('days-elapsed');
    const yearEl = document.getElementById('current-year');
    const totalEl = document.getElementById('total-days');
    if (!grid) return;

    const now = new Date();
    const year = now.getFullYear();
    const dayOfYear = getDayOfYear(now);
    const totalDays = getTotalDays(year);
    const remaining = totalDays - dayOfYear;

    if (yearEl) yearEl.textContent = year;
    if (remainingEl) remainingEl.textContent = remaining;
    if (elapsedEl) elapsedEl.textContent = dayOfYear;
    if (totalEl) totalEl.textContent = totalDays;

    grid.innerHTML = '';
    const frag = document.createDocumentFragment();

    for (let d = 1; d <= totalDays; d++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (d < dayOfYear) {
            dot.classList.add('passed');
            dot.title = `Day ${d} — elapsed`;
        } else if (d === dayOfYear) {
            dot.classList.add('today');
            dot.title = `Day ${d} — TODAY`;
        } else {
            dot.classList.add('dim');
            dot.title = `Day ${d} — remaining`;
        }
        frag.appendChild(dot);
    }
    grid.appendChild(frag);
}

// ── SUBTITLE TYPEWRITER ────────────────────────────────────
function startSubtitleCycler() {
    const el = document.getElementById('subtitle-text');
    if (!el) return;

    let idx = 0, charIdx = 0, deleting = false;

    function type() {
        const target = SUBTITLES[idx];
        if (!deleting) {
            charIdx++;
            el.textContent = target.slice(0, charIdx);
            if (charIdx >= target.length) {
                deleting = true;
                setTimeout(type, 1800);
                return;
            }
        } else {
            charIdx--;
            el.textContent = target.slice(0, charIdx);
            if (charIdx <= 0) {
                charIdx = 0;
                deleting = false;
                idx = (idx + 1) % SUBTITLES.length;
                setTimeout(type, 350);
                return;
            }
        }
        setTimeout(type, deleting ? 38 : 65);
    }
    type();
}

// ── STAT COUNTERS ──────────────────────────────────────────
function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target, 10);
        let cur = 0;
        const step = Math.ceil(target / 30);
        const t = setInterval(() => {
            cur = Math.min(cur + step, target);
            el.textContent = cur;
            if (cur >= target) clearInterval(t);
        }, 50);
    });
}

// ── SKILL BARS ─────────────────────────────────────────────
let skillBarsAnimated = false;
function animateSkillBars() {
    if (skillBarsAnimated) return; // Only animate once
    skillBarsAnimated = true;
    document.querySelectorAll('.skill-bar-fill').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 100);
    });
}

// ── SCROLL REVEAL ──────────────────────────────────────────
function setupScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const siblings = entry.target.parentElement.querySelectorAll('.reveal');
            let delay = 0;
            siblings.forEach((sib, idx) => { if (sib === entry.target) delay = idx * 80; });
            setTimeout(() => {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('skill-category')) animateSkillBars();
            }, delay);
            observer.unobserve(entry.target);
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ── LIVE CLOCK ─────────────────────────────────────────────
function startClock() {
    const logTimeEl = document.getElementById('log-time');
    const footerDate = document.getElementById('footer-date');
    const footerYear = document.getElementById('footer-year');

    function update() {
        const now = new Date();
        if (logTimeEl) logTimeEl.textContent = `${pad2(now.getHours())}:${pad2(now.getMinutes())}:${pad2(now.getSeconds())}`;
        if (footerDate) footerDate.textContent = `${pad2(now.getDate())}.${pad2(now.getMonth() + 1)}.${now.getFullYear()}`;
        if (footerYear) footerYear.textContent = now.getFullYear();
    }
    update();
    setInterval(update, 1000);
}

// ── MOBILE NAV TOGGLE ──────────────────────────────────────
function setupMobileNav() {
    const toggle = document.getElementById('nav-toggle');
    const center = document.getElementById('nav-center');
    if (!toggle || !center) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('open');
        center.classList.toggle('open');
    });

    // Close on link click
    center.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('open');
            center.classList.remove('open');
        });
    });

    // Close on outside click
    document.addEventListener('click', e => {
        if (!toggle.contains(e.target) && !center.contains(e.target)) {
            toggle.classList.remove('open');
            center.classList.remove('open');
        }
    });
}

// ── NAV ACTIVE STATE ───────────────────────────────────────
function setupNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(l => l.classList.remove('active'));
                const a = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                if (a) a.classList.add('active');
            }
        });
    }, { threshold: 0.4 });

    sections.forEach(s => observer.observe(s));
}

// ── SMOOTH SCROLL ──────────────────────────────────────────
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        });
    });
}

// ── DOT TOOLTIP ────────────────────────────────────────────
function setupDotTooltips() {
    const grid = document.getElementById('matrix-grid');
    if (!grid) return;

    const tip = document.createElement('div');
    tip.style.cssText = 'position:fixed;background:rgba(5,10,14,0.95);border:1px solid #0e2535;color:#c8e6f0;font-family:"JetBrains Mono",monospace;font-size:9px;padding:4px 8px;border-radius:2px;pointer-events:none;z-index:9000;letter-spacing:0.1em;opacity:0;transition:opacity 0.15s ease;white-space:nowrap;';
    document.body.appendChild(tip);

    grid.addEventListener('mouseover', e => { if (e.target.classList.contains('dot')) { tip.textContent = e.target.title; tip.style.opacity = '1'; } });
    grid.addEventListener('mousemove', e => { tip.style.left = (e.clientX + 12) + 'px'; tip.style.top = (e.clientY - 24) + 'px'; });
    grid.addEventListener('mouseout', e => { if (e.target.classList.contains('dot')) tip.style.opacity = '0'; });
}

// ── INITIAL REVEALS ────────────────────────────────────────
function triggerInitialReveals() {
    animateCounters();
    document.querySelectorAll('.reveal').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight) {
            el.classList.add('visible');
            // Animate skill bars if skills section is already in view
            if (el.classList.contains('skill-category')) animateSkillBars();
        }
    });
}

// ── TOUCH: prevent double-tap zoom on dots ─────────────────
function setupTouchOptimizations() {
    const grid = document.getElementById('matrix-grid');
    if (!grid) return;
    grid.addEventListener('touchstart', e => { if (e.target.classList.contains('dot')) e.preventDefault(); }, { passive: false });
}

// ── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    runBootSequence();
    buildMatrixGrid();
    startSubtitleCycler();
    setupScrollReveal();
    startClock();
    setupMobileNav();
    setupNavHighlight();
    setupSmoothScroll();
    setupDotTooltips();
    setupTouchOptimizations();
});
