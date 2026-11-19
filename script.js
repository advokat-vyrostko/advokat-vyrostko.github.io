(() => {
  'use strict';
  const body = document.body;
  const header = document.querySelector('.portfolio-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.portfolio-header nav');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const soundtrack = document.getElementById('site-soundtrack');
  const soundButton = document.querySelector('.soundtrack-toggle');
  if (soundtrack && soundButton) {
    soundtrack.volume = 0.2;
    const setSoundState = (playing) => {
      soundButton.setAttribute('aria-pressed', String(playing));
      soundButton.setAttribute('aria-label', playing ? 'Вимкнути звук' : 'Увімкнути звук');
      soundButton.querySelector('.soundtrack-label').textContent = playing ? 'Вимкнути звук' : 'Увімкнути звук';
      soundButton.classList.toggle('is-playing', playing);
    };
    const startSound = () => {
      soundtrack.play().then(() => setSoundState(true)).catch(() => setSoundState(false));
    };
    startSound();
    const unlockSound = () => {
      if (soundtrack.paused) startSound();
    };
    window.addEventListener('pointerdown', unlockSound, { once: true, passive: true });
    window.addEventListener('keydown', unlockSound, { once: true });
    soundButton.addEventListener('click', () => {
      if (soundtrack.paused) startSound();
      else { soundtrack.pause(); setSoundState(false); }
    });
    soundtrack.addEventListener('play', () => setSoundState(true));
    soundtrack.addEventListener('pause', () => setSoundState(false));
  }


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

  const buildingPhoto = document.querySelector('.office-gallery figure:nth-child(2)');
  if (buildingPhoto) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      buildingPhoto.classList.add('building-photo-ready');
    } else {
      const buildingObserver = new IntersectionObserver((entries, currentObserver) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('building-photo-ready');
          currentObserver.unobserve(entry.target);
        });
      }, { threshold: 0.01, rootMargin: '0px 0px 0px 0px' });
      buildingObserver.observe(buildingPhoto);
    }
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