/* ==========================================================================
   GENERATION X8 - PRESTASI JS (INTERACTIVE & UNSLOPPED)
   ========================================================================== */

/* 1. Summary Stats Bar */
const totalPrestasi = PRESTASI.length;
const totalNasional = PRESTASI.filter(p => (p.tingkat || '').includes('Nasional')).length;
const totalProvinsi = PRESTASI.filter(p => (p.tingkat || '').includes('Provinsi') || (p.tingkat || '').includes('Daerah') || (p.tingkat || '').includes('Kabupaten')).length;

$('#pStatsBar').innerHTML = `
  <div class="prestasi-stat-item">
    <div class="prestasi-stat-num num">${totalPrestasi}</div>
    <div class="prestasi-stat-label">Total Prestasi Terdata</div>
  </div>
  <div class="prestasi-stat-item">
    <div class="prestasi-stat-num num">${totalNasional}</div>
    <div class="prestasi-stat-label">Kejuaraan Tingkat Nasional</div>
  </div>
  <div class="prestasi-stat-item">
    <div class="prestasi-stat-num num">${totalProvinsi}</div>
    <div class="prestasi-stat-label">Tingkat Provinsi &amp; Daerah</div>
  </div>
`;

/* 2. Category Filter Chips with Counts */
const categories = ['Semua', ...new Set(PRESTASI.map(p => p.kategori))];

function getCategoryCount(cat) {
  if (cat === 'Semua') return PRESTASI.length;
  return PRESTASI.filter(p => p.kategori === cat).length;
}

$('#pChips').innerHTML = categories.map((cat, i) => `
  <button class="chip-btn ${i === 0 ? 'on' : ''}" data-cat="${esc(cat)}" role="tab" aria-selected="${i === 0}">
    ${esc(cat)} (${getCategoryCount(cat)})
  </button>
`).join('');

let activeCategory = 'Semua';

function renderPrestasiGrid(category = 'Semua') {
  activeCategory = category;

  $$('#pChips .chip-btn').forEach(btn => {
    const isCurrent = btn.dataset.cat === category;
    btn.classList.toggle('on', isCurrent);
    btn.setAttribute('aria-selected', String(isCurrent));
  });

  const filtered = PRESTASI.filter(p => category === 'Semua' || p.kategori === category);

  if (!filtered.length) {
    html($('#pGrid'), `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
        <h4>Belum ada prestasi di kategori ini</h4>
        <p>Silakan pilih kategori lain untuk melihat daftar kejuaraan.</p>
      </div>
    `);
    return;
  }

  html($('#pGrid'), filtered.map((p, i) => `
    <article class="prestasi-card rv" data-nama="${esc(p.nama)}" tabindex="0" role="button" aria-label="Lihat detail prestasi: ${esc(p.nama)}">
      <div class="prestasi-photo">
        <img src="${p.foto}" alt="${esc(p.nama)}" loading="lazy">
        <span class="prestasi-cat-badge">${esc(p.kategori)}</span>
        <span class="prestasi-year-badge">${p.tahun}</span>
      </div>
      <div class="prestasi-body">
        <span class="prestasi-tingkat">${STAR_SVG} ${esc(p.tingkat || 'Kejuaraan')}</span>
        <h3>${esc(p.nama)}</h3>
        <div class="prestasi-recipient">Peraih: ${esc(p.penerima)}</div>
        <p class="prestasi-desc">${esc(p.deskripsi)}</p>
        <span class="prestasi-link">Lihat Detail Lengkap →</span>
      </div>
    </article>
  `).join(''));
}

/* Modal Detail Prestasi */
function showPrestasiModal(nama) {
  const p = PRESTASI.find(item => item.nama === nama);
  if (!p) return;

  const modalHtml = `
    <div class="modal-header-hero">
      <img src="${p.foto}" alt="">
      <div class="modal-header-shade"></div>
      <div class="modal-avatar-box" style="border-radius: var(--radius-sm); width: 110px; height: 80px; bottom: -30px;">
        <img src="${p.foto}" alt="${esc(p.nama)}">
      </div>
    </div>
    <div class="modal-content" style="padding-top: 48px;">
      <span class="modal-pill" style="margin-bottom: 8px;">${STAR_SVG} ${esc(p.tingkat || 'Kejuaraan Resmi')}</span>
      <h3>${esc(p.nama)}</h3>
      <div class="modal-badge-row">
        <span class="modal-pill">Tahun ${p.tahun}</span>
        <span class="modal-pill">${esc(p.kategori)}</span>
      </div>
      <div class="modal-info-grid" style="grid-template-columns: 1fr;">
        <div class="modal-info-item">
          <small>Peraih / Delegasi Angkatan</small>
          <span style="font-size: 1rem; color: var(--gold);">${esc(p.penerima)}</span>
        </div>
        <div class="modal-info-item">
          <small>Ulasan &amp; Cerita Pencapaian</small>
          <span style="font-weight: 400; line-height: 1.65; color: var(--text-secondary);">${esc(p.deskripsi)}</span>
        </div>
      </div>
      <div class="modal-quote">
        "Kemenangan ini kami dedikasikan untuk kedua orang tua, para asatidz pembimbing, dan seluruh keluarga besar Ar-Rasyid."
      </div>
    </div>
  `;

  openModal(modalHtml);
}

$('#pChips').onclick = e => {
  const btn = e.target.closest('.chip-btn');
  if (btn) {
    renderPrestasiGrid(btn.dataset.cat);
    btn.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
  }
};

$('#pGrid').onclick = e => {
  const card = e.target.closest('.prestasi-card');
  if (card) showPrestasiModal(card.dataset.nama);
};

$('#pGrid').onkeydown = e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.prestasi-card');
    if (card) {
      e.preventDefault();
      showPrestasiModal(card.dataset.nama);
    }
  }
};

renderPrestasiGrid('Semua');
