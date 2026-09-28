const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Quote form: opens a prefilled email ---------- */
const qf = document.getElementById('quoteForm');
if (qf) qf.addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('qf-name').value;
  const contact = document.getElementById('qf-contact').value;
  const type = document.getElementById('qf-type').value;
  const message = document.getElementById('qf-msg').value;
  const subject = encodeURIComponent(I18N.t('js.mail.subject') + type);
  const body = encodeURIComponent(
    I18N.t('js.mail.name') + ': ' + name + '\n' +
    I18N.t('js.mail.contact') + ': ' + contact + '\n' +
    I18N.t('js.mail.type') + ': ' + type + '\n\n' +
    I18N.t('js.mail.details') + ':\n' + message
  );
  window.location.href = 'mailto:belkhamsaayhem09@gmail.com?subject=' + subject + '&body=' + body;
});

/* ---------- HMI typing readout ---------- */
const readout = document.getElementById('readout');
let messages = I18N.t('js.hmi');
let mi = 0;
if (readout) {
  if (reduce) {
    readout.textContent = messages[0];
  } else {
    const typeText = (text, done) => {
      readout.textContent = '';
      let j = 0;
      const iv = setInterval(() => {
        readout.textContent += text[j++];
        if (j >= text.length) { clearInterval(iv); setTimeout(done, 1400); }
      }, 32);
    };
    const cycle = () => typeText(messages[mi], () => { mi = (mi + 1) % messages.length; cycle(); });
    cycle();
  }
}

/* ---------- Rotating role line ---------- */
const rot = document.getElementById('rotator');
let roles = I18N.t('js.roles');
let ri = 0;
if (rot) rot.textContent = roles[0];
if (rot && !reduce) {
  setInterval(() => {
    rot.classList.add('swap');
    setTimeout(() => {
      ri = (ri + 1) % roles.length;
      rot.textContent = roles[ri];
      rot.classList.remove('swap');
    }, 350);
  }, 2600);
}

/* Language switch: restart the readout and role line in the new language.
   (i18n.js has already rewritten the static text, including #readout.) */
document.addEventListener('langchange', () => {
  messages = I18N.t('js.hmi'); mi = 0;
  roles = I18N.t('js.roles'); ri = 0;
  if (rot) rot.textContent = roles[0];
  if (readout && reduce) readout.textContent = messages[0];
});

/* ---------- Scroll reveal (staggered) ---------- */
const revealSel = '.hero .tag-row, .hero h1, .hero .role, .hero .trust-line, .hero .hero-cta, .hmi, .sec-head, .sec-desc, .spec-card, .ticket, .step, .diag-item, .photo-grid figure, .cta-banner-inner, .contact-grid > *';
const revealEls = document.querySelectorAll(revealSel);
if (!reduce && 'IntersectionObserver' in window) {
  const seen = new Map();
  revealEls.forEach(el => {
    const p = el.parentElement;
    const n = seen.get(p) || 0;
    seen.set(p, n + 1);
    el.style.setProperty('--d', Math.min(n * 0.08, 0.4) + 's');
    el.classList.add('reveal');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
}

/* ---------- Scroll progress bar + floating quote button ---------- */
const bar = document.getElementById('progress');
const fab = document.getElementById('fab');
const contact = document.getElementById('contact');
let ticking = false;
function onScroll() {
  const h = document.documentElement.scrollHeight - window.innerHeight;
  if (bar) bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  if (fab && contact) {
    const nearContact = contact.getBoundingClientRect().top < window.innerHeight * 0.6;
    fab.classList.toggle('show', window.scrollY > 500 && !nearContact);
  }
  ticking = false;
}
window.addEventListener('scroll', () => {
  if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
}, { passive: true });
onScroll();

/* ---------- Cursor spotlight (desktop, motion allowed) ---------- */
if (!reduce && window.matchMedia('(pointer: fine)').matches) {
  let sp = false, mx = 0, my = 0;
  window.addEventListener('pointermove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!sp) {
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--mx', mx + 'px');
        document.documentElement.style.setProperty('--my', my + 'px');
        sp = false;
      });
      sp = true;
    }
  }, { passive: true });
}

/* ---------- Photo lightbox ---------- */
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCap = document.getElementById('lbCap');
function openLB(img) {
  lbImg.src = img.src;
  lbImg.alt = img.alt;
  const fc = img.closest('figure') && img.closest('figure').querySelector('figcaption');
  lbCap.textContent = fc ? fc.textContent : '';
  lb.hidden = false;
  document.getElementById('lbClose').focus();
}
function closeLB() { lb.hidden = true; lbImg.src = ''; }
document.querySelectorAll('.photo-grid img, .ticket-media img').forEach(img => {
  img.tabIndex = 0;
  img.setAttribute('role', 'button');
  img.addEventListener('click', () => openLB(img));
  img.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLB(img); } });
});
lb.addEventListener('click', (e) => { if (e.target !== lbImg) closeLB(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !lb.hidden) closeLB(); });
