/* ==========================================================================
   GENERATION X8 - COMMON JS (INTERACTIVE & UNSLOPPED)
   ========================================================================== */

document.documentElement.classList.add('js');

const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);
const A = ANGKATAN;
const PAGE = document.body.dataset.page;

const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

/* Signature SVG: Rub el Hizb (Bintang 8 Islami) */
const STAR_SVG = `<svg class="star-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l2.6 3.6 4.4-.8.8 4.4 3.6 2.6-3.6 2.6-.8 4.4-4.4-.8-2.6 3.6-2.6-3.6-4.4.8-.8-4.4-3.6-2.6 3.6-2.6.8-4.4 4.4.8z"/></svg>`;

/* Title dinamis */
const PAGE_TITLES = {
  home: 'Beranda',
  organisasi: 'Struktur Organisasi OSIS',
  prestasi: 'Jejak Prestasi',
  galeri: 'Dokumentasi Galeri'
};
document.title = `${A.nama} · ${PAGE_TITLES[PAGE] || 'Angkatan Ke-8'}`;

/* Injeksi Navigasi, Footer, Progress, Modal, dan Lightbox */
const MENU = [
  ['index.html', 'Home', 'home'],
  ['organisasi.html', 'Organisasi', 'organisasi'],
  ['prestasi.html', 'Prestasi', 'prestasi'],
  ['galeri.html', 'Galeri', 'galeri']
];

/* Header */
document.body.insertAdjacentHTML('afterbegin', `
  <header id="nav">
    <div class="wrap bar">
      <a href="index.html" class="brand" aria-label="Beranda ${esc(A.nama)}">
        <span>${esc(A.singkat)}</span>
      </a>
      <nav id="menu" aria-label="Menu Utama">
        ${MENU.map(m => `<a href="${m[0]}" class="${m[2] === PAGE ? 'on' : ''}">${m[1]}</a>`).join('')}
      </nav>
      <button id="burger" aria-label="Buka Menu" aria-expanded="false">
        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="2" fill="none"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
      </button>
    </div>
  </header>
`);

/* Footer */
document.body.insertAdjacentHTML('beforeend', `
  <footer>
    <div class="wrap footer-inner">
      <div class="footer-brand">${esc(A.nama)}</div>
      <p class="footer-tag">${esc(A.tagline)}</p>
      <p class="footer-close">Kita boleh berpisah jalan menapaki takdir masing-masing, namun kenangan dan hafalan di Ar-Rasyid akan senantiasa menyatukan doa kita.</p>
      <div class="footer-social">
        <a href="${A.sosmed.instagram}" target="_blank" rel="noopener" class="btn-icon" aria-label="Instagram">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>
        </a>
        <a href="${A.sosmed.tiktok}" target="_blank" rel="noopener" class="btn-icon" aria-label="TikTok">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M16.6 3c.3 2.2 1.7 3.9 3.9 4.2v3a7.3 7.3 0 0 1-3.8-1.2v6.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.1a2.7 2.7 0 1 0 1.8 2.5V3h2.9z"/></svg>
        </a>
      </div>
      <div class="footer-copy">
        © ${new Date().getFullYear()} ${esc(A.nama)} · Pesantren Tahfidz Ar-Rasyid. Seluruh hak cipta dilindungi.
      </div>
    </div>
  </footer>
`);

/* Modal Global & Lightbox Container */
document.body.insertAdjacentHTML('beforeend', `
  <!-- Modal Detail -->
  <div id="detailModal" class="modal-backdrop" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="modal-card">
      <button class="modal-close-btn" id="modalClose" aria-label="Tutup Detail">✕</button>
      <div id="modalBody"></div>
    </div>
  </div>

  <!-- Lightbox Sinematik -->
  <div id="lb" class="lb" role="dialog" aria-modal="true" aria-hidden="true">
    <div class="lb-header">
      <span class="lb-counter" id="lbCounter">1 / 1</span>
      <div class="lb-actions">
        <button id="lbX" class="btn-icon" aria-label="Tutup Lightbox">✕</button>
      </div>
    </div>
    <div class="lb-stage">
      <button id="lbP" class="lb-arrow prev" aria-label="Foto Sebelumnya">‹</button>
      <figure>
        <img id="lbImg" alt="" src="">
        <figcaption>
          <div class="lb-title" id="lbTitle"></div>
          <div class="lb-meta" id="lbMeta"></div>
        </figcaption>
      </figure>
      <button id="lbN" class="lb-arrow next" aria-label="Foto Berikutnya">›</button>
    </div>
    <div class="lb-thumbs" id="lbThumbs" aria-label="Pratinjau Thumbnail Foto"></div>
  </div>
`);

/* Nav solid saat scroll */
const nav = $('#nav');
const burger = $('#burger');
burger.onclick = () => {
  const isOpen = nav.classList.toggle('open');
  burger.setAttribute('aria-expanded', String(isOpen));
};

const handleScroll = () => {
  const y = window.scrollY;
  nav.classList.toggle('solid', PAGE !== 'home' || y > 40);
};
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

/* ==========================================================================
   Intersection Observer (Reveal)
   ========================================================================== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

const observe = () => {
  $$('.rv:not(.in)').forEach(el => io.observe(el));
};
const html = (el, content) => {
  el.innerHTML = content;
  observe();
};

/* ==========================================================================
   Modal Global Logic
   ========================================================================== */
const modal = $('#detailModal');
const modalClose = $('#modalClose');

function openModal(contentHtml) {
  $('#modalBody').innerHTML = contentHtml;
  modal.classList.add('on');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('on');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

modalClose.onclick = closeModal;
modal.onclick = e => {
  if (e.target === modal) closeModal();
};

/* ==========================================================================
   Lightbox Global Logic (Interactive with Thumbnails Strip)
   ========================================================================== */
let _lbList = [];
let _lbIndex = 0;

function setupLightbox(items) {
  _lbList = items;
  const thumbsContainer = $('#lbThumbs');
  thumbsContainer.innerHTML = items.map((item, idx) => `
    <button class="lb-thumb ${idx === _lbIndex ? 'on' : ''}" data-idx="${idx}" aria-label="Lihat foto ${idx + 1}">
      <img src="${item.src}" alt="${esc(item.caption)}" loading="lazy">
    </button>
  `).join('');

  thumbsContainer.onclick = e => {
    const btn = e.target.closest('.lb-thumb');
    if (btn) showLightbox(+btn.dataset.idx);
  };
}

function showLightbox(idx) {
  if (!_lbList.length) return;
  _lbIndex = (idx + _lbList.length) % _lbList.length;
  const item = _lbList[_lbIndex];

  $('#lbImg').src = item.src;
  $('#lbImg').alt = item.caption || 'Foto Angkatan';
  $('#lbTitle').textContent = item.caption;
  $('#lbMeta').textContent = `${item.kategori || ''} · ${item.lokasi || ''} ${item.tanggal ? '· ' + item.tanggal : ''}`;
  $('#lbCounter').textContent = `Foto ${_lbIndex + 1} dari ${_lbList.length}`;

  // Update active thumbnail
  $$('.lb-thumb').forEach((thumb, i) => {
    thumb.classList.toggle('on', i === _lbIndex);
    if (i === _lbIndex) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  });

  $('#lb').classList.add('on');
  $('#lb').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  $('#lb').classList.remove('on');
  $('#lb').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

$('#lbX').onclick = closeLightbox;
$('#lbP').onclick = e => { e.stopPropagation(); showLightbox(_lbIndex - 1); };
$('#lbN').onclick = e => { e.stopPropagation(); showLightbox(_lbIndex + 1); };
$('#lb').onclick = e => {
  if (e.target.id === 'lb' || e.target.classList.contains('lb-stage')) closeLightbox();
};

/* Keyboard Navigation */
window.addEventListener('keydown', e => {
  if ($('#lb').classList.contains('on')) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showLightbox(_lbIndex + 1);
    if (e.key === 'ArrowLeft') showLightbox(_lbIndex - 1);
  }
  if (modal.classList.contains('on')) {
    if (e.key === 'Escape') closeModal();
  }
});

/* Chip Filters Helper */
function renderChips(container, categories, callback) {
  container.innerHTML = categories.map((cat, i) => `
    <button class="chip-btn ${i === 0 ? 'on' : ''}" data-cat="${esc(cat)}">${esc(cat)}</button>
  `).join('');

  container.onclick = e => {
    const btn = e.target.closest('.chip-btn');
    if (!btn) return;
    container.querySelectorAll('.chip-btn').forEach(b => b.classList.toggle('on', b === btn));
    callback(btn.dataset.cat);
  };
}

/* Initial reveal observation */
document.querySelectorAll('h1, h2, .sec-desc, .about-frame, .phead .wrap > *').forEach(el => el.classList.add('rv'));
observe();
