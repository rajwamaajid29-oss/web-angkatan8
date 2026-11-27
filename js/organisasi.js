/* ==========================================================================
   GENERATION X8 - ORGANISASI JS (INTERACTIVE & UNSLOPPED)
   ========================================================================== */

let activeWing = 'ikhwan';

const personAttrs = p => `data-nama="${esc(p.nama)}" data-jabatan="${esc(p.jabatan)}" data-tugas="${esc(p.tugas || '')}" data-foto="${esc(p.foto)}" tabindex="0" role="button" aria-label="Lihat amanah ${esc(p.nama)} - ${esc(p.jabatan)}"`;

/* Satu node di bagan: foto bulat, nama, jabatan */
function renderNode(p, size = '', label = p.jabatan) {
  return `
    <div class="ot-node ${size}" ${personAttrs(p)}>
      <img src="${p.foto}" alt="${esc(p.nama)}" loading="lazy">
      <div class="ot-text">
        <strong>${esc(p.nama)}</strong>
        <span>${esc(label)}</span>
      </div>
    </div>`;
}

const WING_META = {
  ikhwan: { badge: 'Santri Ikhwan', cta: 'Lihat struktur' },
  akhwat: { badge: 'Santriwati Akhwat', cta: 'Lihat struktur' }
};

/* 1. Dua card pilihan */
function renderPicker() {
  html($('#orgCards'), Object.keys(WING_META).map(key => {
    const o = OSIS[key];
    const total = o.inti.length + o.bidang.reduce((n, b) => n + b.anggota.length, 0);
    return `
      <button class="org-card rv" type="button" data-key="${key}" aria-label="Buka struktur ${esc(o.label)}">
        <img src="${o.foto}" alt="" loading="lazy">
        <div class="org-card-shade"></div>
        <div class="org-card-body">
          <span class="org-card-tag">${WING_META[key].badge}</span>
          <h3>${esc(o.label)}</h3>
          <p>${esc(o.deskripsi)}</p>
          <span class="org-card-cta">${WING_META[key].cta} · ${total} pengurus
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </div>
      </button>`;
  }).join(''));
}

/* 2. Struktur satu sayap */
function renderOrg(wingKey) {
  activeWing = wingKey;
  const o = OSIS[wingKey];
  if (!o) return;

  $('#orgJudul').textContent = o.judul;
  $('#orgDesc').textContent = o.deskripsi;

  const [ketua, wakil, sekretaris, bendahara] = o.inti;
  html($('#orgTree'), `
    <div class="ot-top">${renderNode(o.pembina, 'xl')}</div>
    <div class="ot-stem ot-stem-pb"></div>
    <div class="ot-top">${renderNode(ketua, 'xl')}</div>
    <div class="ot-stem"></div>
    <div class="ot-mid">
      <div class="ot-branch">${renderNode(sekretaris, 'lg')}</div>
      <div class="ot-branch">${renderNode(wakil, 'lg')}</div>
      <div class="ot-branch">${renderNode(bendahara, 'lg')}</div>
    </div>
    <div class="ot-stem"></div>
    <div class="ot-bidang-title"><span>Bidang &amp; Divisi</span></div>
    <div class="ot-bidang">
      ${o.bidang.map(b => `
        <div class="ot-col">
          <div class="ot-chip">${esc(b.nama)}</div>
          <div class="ot-people">${b.anggota.map(p => renderNode(p, '', p.jabatan.replace(` ${b.nama}`, ''))).join('')}</div>
        </div>`).join('')}
    </div>
  `);
}

/* 3. Pindah tampilan lewat hash (#ikhwan / #akhwat) supaya tombol Back browser jalan */
function route() {
  const key = location.hash.replace('#', '');
  const detail = $('#orgDetail');
  const picker = $('#orgPicker');
  if (OSIS[key]) {
    renderOrg(key);
    picker.hidden = true;
    detail.hidden = false;
    $('.phead').hidden = true;
  } else {
    detail.hidden = true;
    picker.hidden = false;
    $('.phead').hidden = false;
  }
  window.scrollTo({ top: 0 });
}

/* Modal Detail Amanah OSIS */
function showOrgDetail(data) {
  const modalHtml = `
    <div class="modal-header-hero">
      <img src="${data.foto}" alt="">
      <div class="modal-header-shade"></div>
      <div class="modal-avatar-box">
        <img src="${data.foto}" alt="${esc(data.nama)}">
      </div>
    </div>
    <div class="modal-content">
      <h3>${esc(data.nama)}</h3>
      <div class="modal-badge-row">
        <span class="modal-pill">${STAR_SVG} ${esc(data.jabatan)}</span>
        <span class="modal-pill">${activeWing === 'ikhwan' ? 'OSIS Ikhwan' : 'OSIS Akhwat'}</span>
        <span class="modal-pill">Periode 2024–2025</span>
      </div>
      <div class="modal-info-grid" style="grid-template-columns: 1fr;">
        <div class="modal-info-item">
          <small>Amanah &amp; Tanggung Jawab Utama</small>
          <span>${esc(data.tugas || 'Mengawal tata tertib dan jalannya program kegiatan santri di pesantren.')}</span>
        </div>
      </div>
      <div class="modal-quote">
        "Kepemimpinan di pondok bukan tentang kehormatan, melainkan tentang pengorbanan dan keteladanan akhlak."
      </div>
    </div>
  `;
  openModal(modalHtml);
}

// Click / Keydown on tree nodes
$('#orgTree').onclick = e => {
  const node = e.target.closest('.ot-node');
  if (node) {
    showOrgDetail({
      nama: node.dataset.nama,
      jabatan: node.dataset.jabatan,
      tugas: node.dataset.tugas,
      foto: node.dataset.foto
    });
  }
};

$('#orgTree').onkeydown = e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const node = e.target.closest('.ot-node');
    if (node) {
      e.preventDefault();
      showOrgDetail({
        nama: node.dataset.nama,
        jabatan: node.dataset.jabatan,
        tugas: node.dataset.tugas,
        foto: node.dataset.foto
      });
    }
  }
};

$('#orgCards').onclick = e => {
  const card = e.target.closest('.org-card');
  if (card) location.hash = card.dataset.key;
};
$('#orgBack').onclick = () => { location.hash = ''; history.replaceState(null, '', location.pathname); route(); };

window.addEventListener('hashchange', route);
renderPicker();
route();
