(() => {
  const body = document.body;
  const header = document.querySelector('header');
  const updateHeaderTransparency = () => {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  updateHeaderTransparency();
  window.addEventListener('scroll', updateHeaderTransparency, { passive: true });
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav nav');
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (toggle && nav) {
    let backdrop;
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      body.classList.remove('menu-is-open');
      if (backdrop) {
        backdrop.classList.remove('open');
        backdrop.remove();
        backdrop = null;
      }
    };
    const openMenu = () => {
      if (!backdrop) {
        backdrop = document.createElement('div');
        backdrop.className = 'menu-backdrop';
        backdrop.addEventListener('click', closeMenu);
        body.appendChild(backdrop);
      }
      body.classList.add('menu-is-open');
      requestAnimationFrame(() => backdrop && backdrop.classList.add('open'));
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    };
    toggle.addEventListener('click', () => {
      if (nav.classList.contains('open')) closeMenu();
      else openMenu();
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
  }

  if (isHome && !document.querySelector('.messenger-contact')) {
    const contact = document.createElement('div');
    contact.className = 'messenger-contact';
    contact.setAttribute('aria-label', 'Зв’язатися з адвокатом у месенджері');
    const message = encodeURIComponent('Добрий день! Хочу отримати консультацію адвоката.');
    contact.innerHTML = `
      <a class="messenger-link messenger-whatsapp" href="https://wa.me/380638180427?text=${message}" target="_blank" rel="noopener noreferrer" aria-label="Написати у WhatsApp">WhatsApp</a>
      <a class="messenger-link messenger-viber" href="viber://chat?number=%2B380638180427" aria-label="Написати у Viber">Viber</a>
    `;
    body.appendChild(contact);
  }

  // Mobile/tablet swipe navigation between the site's main pages.
  // Pointer Events cover touch screens more consistently than touchend alone.
  const pageNav = document.querySelector('.nav nav');
  const mainContent = document.querySelector('main');
  if (pageNav && mainContent) {
    const pageLinks = Array.from(pageNav.querySelectorAll('a[href]'))
      .filter(link => !link.classList.contains('menu-consult'))
      .filter(link => !/^(https?:|mailto:|tel:|#|viber:)/i.test(link.getAttribute('href')));
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const currentIndex = pageLinks.findIndex(link => {
      const target = (link.getAttribute('href').split('/').pop() || 'index.html').toLowerCase();
      return target === currentPage;
    });
    let startX = 0;
    let startY = 0;
    let tracking = false;
    const isSwipeControl = target => target && target.closest(
      'a, button, input, textarea, select, label, iframe, video, audio, [contenteditable="true"], .menu-toggle, .map-frame, .office-gallery, .messenger-contact, nav'
    );
    mainContent.addEventListener('pointerdown', event => {
      if (event.pointerType === 'mouse' || event.isPrimary === false ||
          document.body.classList.contains('menu-is-open') || isSwipeControl(event.target)) {
        tracking = false;
        return;
      }
      startX = event.clientX;
      startY = event.clientY;
      tracking = true;
    }, { passive: true });
    mainContent.addEventListener('pointerup', event => {
      if (!tracking) return;
      tracking = false;
      if (document.body.classList.contains('menu-is-open') || currentIndex < 0) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (Math.abs(dx) < 55 || Math.abs(dx) < Math.abs(dy) * 1.25) return;
      const nextIndex = currentIndex + (dx < 0 ? 1 : -1);
      if (nextIndex < 0 || nextIndex >= pageLinks.length) return;
      window.location.assign(pageLinks[nextIndex].href);
    }, { passive: true });
    mainContent.addEventListener('pointercancel', () => { tracking = false; }, { passive: true });
  }

  if (reduceMotion) return;
  if (isHome) body.classList.add('home-page');

  const selectors = [
    'main .page-hero .eyebrow', 'main .page-hero h1', 'main .page-hero p',
    'main .section-head', 'main .practice-card', 'main .about-panel',
    'main .fact', 'main .cta-row', 'main .about-profile-copy',
    'main .about-portrait', 'main .office-gallery figure',
    'main .contact-card', 'main .office-map', 'main .article-item',
    'main .content > h2', 'main .content > p', 'main .content > .note'
  ].join(',');

  const targets = Array.from(document.querySelectorAll(selectors));
  if (!targets.length || !('IntersectionObserver' in window)) {
    targets.forEach(element => element.classList.add('motion-visible'));
    return;
  }

  const groupCounts = new Map();
  targets.forEach(element => {
    const group = element.parentElement;
    const index = groupCounts.get(group) || 0;
    groupCounts.set(group, index + 1);
    element.style.setProperty('--reveal-delay', Math.min(index * 85, 340) + 'ms');
    element.classList.add('motion-reveal');
  });

  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('motion-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });
  targets.forEach(element => observer.observe(element));
})();
