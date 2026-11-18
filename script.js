const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
if(toggle&&nav){toggle.addEventListener('click',()=>{nav.classList.toggle('open');toggle.setAttribute('aria-expanded',nav.classList.contains('open')?'true':'false')})}
document.querySelectorAll('nav a').forEach(a=>a.addEventListener('click',()=>nav?.classList.remove('open')));

// Direct contact buttons shown on every page.
const isHomePage = window.location.pathname === '/' || window.location.pathname.endsWith('/index.html');
if (isHomePage && !document.querySelector('.messenger-contact')) {
  const contact = document.createElement('div');
  contact.className = 'messenger-contact';
  contact.setAttribute('aria-label', 'Зв’язатися з адвокатом у месенджері');
  const message = encodeURIComponent('Добрий день! Хочу отримати консультацію адвоката.');
  contact.innerHTML = `
    <a class="messenger-link messenger-whatsapp" href="https://wa.me/380638180427?text=${message}" target="_blank" rel="noopener noreferrer" aria-label="Написати у WhatsApp">WhatsApp</a>
    <a class="messenger-link messenger-viber" href="viber://chat?number=%2B380638180427" aria-label="Написати у Viber">Viber</a>
  `;
  document.body.appendChild(contact);
}


// Smoothly reveal About-page photographs as they enter the viewport.
const revealPhotos = document.querySelectorAll('.about-portrait, .office-gallery figure');
if (revealPhotos.length) {
  if ('IntersectionObserver' in window) {
    const photoObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -35px 0px' });
    revealPhotos.forEach(photo => photoObserver.observe(photo));
  } else {
    revealPhotos.forEach(photo => photo.classList.add('is-visible'));
  }
}
