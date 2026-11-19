(() => {
  'use strict';
  const body = document.body;
  const header = document.querySelector('header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav nav');

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

  if (!document.querySelector('.messenger-contact')) {
    const contact = document.createElement('div');
    contact.className = 'messenger-contact';
    contact.setAttribute('aria-label', 'Зв’язатися з адвокатом у месенджері');
    const message = encodeURIComponent('Добрий день! Хочу отримати консультацію адвоката.');
    contact.innerHTML = '<a class="messenger-link messenger-whatsapp" href="https://wa.me/380638180427?text=' + message + '" target="_blank" rel="noopener noreferrer" aria-label="Написати у WhatsApp">WhatsApp</a><a class="messenger-link messenger-viber" href="viber://chat?number=%2B380638180427" aria-label="Написати у Viber">Viber</a>';
    body.appendChild(contact);
  }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const targets = document.querySelectorAll('.section-head, .practice-card, .fact, .about-portrait, .office-gallery figure, .contact-card, .office-map');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
  targets.forEach(el => {
    el.classList.add('motion-reveal');
    observer.observe(el);
  });
})();