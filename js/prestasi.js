function renderPrestasi(c = 'Semua') {
  if (!PRESTASI.length) { $('#pChips').innerHTML = ''; return html($('#pGrid'), '<div class="empty"><h3>Prestasi akan segera hadir</h3><p>Tambahkan data di js/data/prestasi.js</p></div>'); }
  html($('#pGrid'), PRESTASI.filter(p => c === 'Semua' || p.kategori === c).map(p => `<article class="card pc rv"><div class="ph"><img src="${p.foto}" alt="${esc(p.nama)}"><span class="cat">${esc(p.kategori)}</span></div>
    <div class="in"><div class="yr">${p.tahun}</div><h3>${esc(p.nama)}</h3><small>${esc(p.penerima)}</small><p>${esc(p.deskripsi)}</p></div></article>`).join('')); }
if (PRESTASI.length) chips($('#pChips'), ['Semua', ...new Set(PRESTASI.map(p => p.kategori))], renderPrestasi);
renderPrestasi();
