/* ==========================================================================
   GENERATION X8 - GALERI JS (INTERACTIVE & UNSLOPPED)
   ========================================================================== */

let currentFilteredGallery = [...GALERI];

function getGalleryCount(cat) {
  if (cat === 'Semua') return GALERI.length;
  return GALERI.filter(g => g.kategori === cat).length;
}

// 1. Render Chips with Counts
$('#gChips').innerHTML = KATEGORI_GALERI.map((cat, i) => `
  <button class="chip-btn ${i === 0 ? 'on' : ''}" data-cat="${esc(cat)}" role="tab" aria-selected="${i === 0}">
    ${esc(cat)} (${getGalleryCount(cat)})
  </button>
`).join('');

// 2. Render Gallery Grid
function renderGallery(cat = 'Semua') {
  $$('#gChips .chip-btn').forEach(btn => {
    const isCurrent = btn.dataset.cat === cat;
    btn.classList.toggle('on', isCurrent);
    btn.setAttribute('aria-selected', String(isCurrent));
  });

  currentFilteredGallery = GALERI.filter(g => cat === 'Semua' || g.kategori === cat);
  setupLightbox(currentFilteredGallery);

  if (!currentFilteredGallery.length) {
    html($('#gGrid'), `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
        <h4>Belum ada foto dalam kategori ini</h4>
        <p>Silakan pilih kategori dokumentasi lain di atas.</p>
      </div>
    `);
    return;
  }

  html($('#gGrid'), currentFilteredGallery.map((g, idx) => `
    <div class="gallery-item rv" data-idx="${idx}" tabindex="0" role="button" aria-label="Lihat foto: ${esc(g.caption)}">
      <div class="gallery-img-box">
        <img src="${g.src}" alt="${esc(g.caption)}" loading="lazy">
      </div>
      <div class="gallery-overlay">
        <span class="gallery-cat">${esc(g.kategori)}</span>
        <div class="gallery-caption">${esc(g.caption)}</div>
        <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 4px;">
          ${esc(g.lokasi || 'Pesantren')} ${g.tanggal ? '· ' + esc(g.tanggal) : ''}
        </div>
      </div>
    </div>
  `).join(''));
}

$('#gChips').onclick = e => {
  const btn = e.target.closest('.chip-btn');
  if (btn) renderGallery(btn.dataset.cat);
};

$('#gGrid').onclick = e => {
  const item = e.target.closest('.gallery-item');
  if (item) showLightbox(+item.dataset.idx);
};

$('#gGrid').onkeydown = e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const item = e.target.closest('.gallery-item');
    if (item) {
      e.preventDefault();
      showLightbox(+item.dataset.idx);
    }
  }
};

renderGallery('Semua');
