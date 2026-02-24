// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile menu after selection
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// Hamburger toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Reveal on scroll using IntersectionObserver
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      io.unobserve(entry.target); // reveal once
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => io.observe(el));

// Scrollspy: highlight active nav link
const sections = [...document.querySelectorAll('section[id]')];
const navMap = new Map(
  [...document.querySelectorAll('.nav-link')].map(a => [a.getAttribute('href'), a])
);

const spy = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const id = `#${entry.target.id}`;
    const link = navMap.get(id);
    if (!link) return;
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-link.active').forEach(el => el.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

sections.forEach(sec => spy.observe(sec));

// Tilt effect for contact
const tiltCard = document.getElementById('tilt-card');
tiltCard.addEventListener('mousemove', (e) => {
  const rect = tiltCard.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * 10;
  tiltCard.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
});
tiltCard.addEventListener('mouseleave', () => {
  tiltCard.style.transform = 'rotateX(0) rotateY(0)';
});

// Send button animation
document.querySelector('.contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = document.querySelector('.send-btn');
  btn.textContent = '✔ Sent!';
  btn.style.background = '#4caf50';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = 'linear-gradient(45deg, #2196f3, #00bcd4)';
  }, 3000);
});


// Back to top button
const backToTop = document.querySelector('.back-to-top');
const toggleBackToTop = () => {
  if (window.scrollY > 400) {
    backToTop.classList.add('show');
  } else {
    backToTop.classList.remove('show');
  }
};
window.addEventListener('scroll', toggleBackToTop);
toggleBackToTop();

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});