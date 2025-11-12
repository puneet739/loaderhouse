// Loaderhouse Coming Soon - Main JS

// Utilities
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

// Countdown Timer
function initCountdown() {
  const el = document.getElementById('countdown');
  if (!el) return;
  const launch = el.getAttribute('data-launch');
  const launchDate = launch ? new Date(launch) : null;
  if (!launchDate || isNaN(launchDate)) {
    el.innerHTML = '<small class="text-muted">Launch date to be announced</small>';
    return;
  }

  function render(diffMs) {
    const totalSeconds = Math.max(0, Math.floor(diffMs / 1000));
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    el.innerHTML = `
      <div class="unit"><span class="value">${days}</span><span class="label">Days</span></div>
      <div class="unit"><span class="value">${hours.toString().padStart(2, '0')}</span><span class="label">Hours</span></div>
      <div class="unit"><span class="value">${minutes.toString().padStart(2, '0')}</span><span class="label">Minutes</span></div>
      <div class="unit"><span class="value">${seconds.toString().padStart(2, '0')}</span><span class="label">Seconds</span></div>
    `;
  }

  function tick() {
    const now = new Date();
    const diff = launchDate.getTime() - now.getTime();
    render(diff);
    if (diff <= 0) clearInterval(timer);
  }

  render(launchDate.getTime() - Date.now());
  const timer = setInterval(tick, 1000);
}

// Footer year
function setYear() {
  const y = document.getElementById('year');
  if (y) y.textContent = String(new Date().getFullYear());
}

// Contact form handling (client-side validation)
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const alertBox = document.getElementById('formAlert');
  const submitBtn = form.querySelector('button[type="submit"]');
  const defaultSpan = submitBtn?.querySelector('.default');
  const loadingSpan = submitBtn?.querySelector('.loading');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Bootstrap validation
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    // Simulate sending or plug your endpoint below
    // Example: const endpoint = 'https://formspree.io/f/yourFormId';
    // await fetch(endpoint, { method: 'POST', body: new FormData(form) });

    try {
      if (defaultSpan && loadingSpan) {
        defaultSpan.classList.add('d-none');
        loadingSpan.classList.remove('d-none');
      }

      // Simulated network delay
      await new Promise((res) => setTimeout(res, 1000));

      alertBox.className = 'alert alert-success mt-3';
      alertBox.textContent = 'Thanks! You\'re on the waitlist. We\'ll be in touch soon.';
      alertBox.classList.remove('d-none');
      form.reset();
      form.classList.remove('was-validated');
    } catch (err) {
      alertBox.className = 'alert alert-danger mt-3';
      alertBox.textContent = 'Something went wrong. Please try again later.';
      alertBox.classList.remove('d-none');
    } finally {
      if (defaultSpan && loadingSpan) {
        defaultSpan.classList.remove('d-none');
        loadingSpan.classList.add('d-none');
      }
    }
  });
}

// Smooth scroll for nav links (optional refinement)
function initSmoothScroll() {
  $$('a.nav-link[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      const target = id ? $(id) : null;
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Init
window.addEventListener('DOMContentLoaded', () => {
  setYear();
  initCountdown();
  initContactForm();
  initSmoothScroll();
});
