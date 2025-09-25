// Sahni Logistics - Interactions
(function () {
  const d = document;

  // Mobile nav toggle
  const navToggle = d.querySelector('.nav-toggle');
  const menu = d.getElementById('site-menu');
  if (navToggle && menu) {
    navToggle.addEventListener('click', () => {
      const open = menu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
      // Animate burger icon
      if (open) {
        navToggle.querySelectorAll('.bar')[0].style.transform = 'translateY(8px) rotate(45deg)';
        navToggle.querySelectorAll('.bar')[1].style.opacity = '0';
        navToggle.querySelectorAll('.bar')[2].style.transform = 'translateY(-8px) rotate(-45deg)';
      } else {
        navToggle.querySelectorAll('.bar')[0].style.transform = '';
        navToggle.querySelectorAll('.bar')[1].style.opacity = '';
        navToggle.querySelectorAll('.bar')[2].style.transform = '';
      }
    });
  }

  // Close menu on nav link click (mobile)
  menu?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      if (menu.classList.contains('open')) {
        menu.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
        navToggle?.querySelectorAll('.bar')[0]?.style && (navToggle.querySelectorAll('.bar')[0].style.transform = '');
        navToggle?.querySelectorAll('.bar')[1]?.style && (navToggle.querySelectorAll('.bar')[1].style.opacity = '');
        navToggle?.querySelectorAll('.bar')[2]?.style && (navToggle.querySelectorAll('.bar')[2].style.transform = '');
      }
    });
  });

  // Intersection-based reveal animations (respect reduced motion)
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

    d.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
  } else {
    // Fallback: show all immediately
    d.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
  }

  // Smooth scroll for internal links
  d.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#') return;
      const target = d.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  // Dynamic year in footer
  const yearEl = d.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
