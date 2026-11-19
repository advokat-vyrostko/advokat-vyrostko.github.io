(() => {
  'use strict';
  const body = document.body;
  const header = document.querySelector('.portfolio-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.portfolio-header nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const updateHeader = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-is-open');
    };
    toggle.addEventListener('click', () => {
      const opening = !nav.classList.contains('open');
      nav.classList.toggle('open', opening);
      toggle.setAttribute('aria-expanded', String(opening));
      body.classList.toggle('menu-is-open', opening);
    });
    nav.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (nav.classList.contains('open') && !event.target.closest('.nav')) closeMenu();
    });
  }

  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll(
    '.profile-photo, .profile-text, .practice-intro, .practice-grid article, ' +
    '.approach-list > div, .office-gallery figure, .contact-intro, .contact-details, .map-frame'
  );
  if (!targets.length) return;
  body.classList.add('js-motion');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  targets.forEach(el => observer.observe(el));
})();