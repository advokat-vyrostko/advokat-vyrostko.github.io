(() => {
  const body = document.body;
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav nav');
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (toggle && nav) {
    const closeMenu = () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
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
