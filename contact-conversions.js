(() => {
  'use strict';
  const destination = 'AW-17553998056/ia86CPOa6cAdEOiBs7JB';
  document.addEventListener('click', (event) => {
    if (!event.isTrusted || !(event.target instanceof Element)) return;
    const link = event.target.closest('a[href]');
    if (!link) return;
    const href = link.getAttribute('href').trim();
    if (!/^(?:tel:|viber:|whatsapp:|https:\/\/(?:www\.)?(?:wa\.me|api\.whatsapp\.com|web\.whatsapp\.com|viber\.me)(?:\/|$))/i.test(href)) return;
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', {send_to: destination, transport_type: 'beacon'});
  }, true);
})();
