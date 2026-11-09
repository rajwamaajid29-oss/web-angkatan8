const $ = s => document.querySelector(s), A = ANGKATAN;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const html = (el, h) => { el.innerHTML = h; observe(); };
function observe() { document.querySelectorAll('.rv:not(.in)').forEach(e => io.observe(e)); }
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '-60px' });

/* ---- Teks umum ---- */
document.title = A.nama; $('#brand').innerHTML = `${esc(A.singkat)} <span style="opacity:.6">· ${A.tahunLulus}</span>`;
$('#hMeta').textContent = `${A.pesantren} · ${A.tahunMasuk} – ${A.tahunLulus}`; $('#hNama').textContent = A.nama; $('#hTag').textContent = A.tagline;
$('#fNama').textContent = A.nama; $('#fTag').textContent = A.tagline;
$('#copy').textContent = `Angkatan ${A.tahunMasuk} – ${A.tahunLulus} · © ${new Date().getFullYear()} ${A.nama}. Dibuat dengan cinta.`;

/* ---- Navbar ---- */
const nav = $('#nav'); $('#burger').onclick = () => nav.classList.toggle('open');
document.querySelectorAll('#menu a, .brand').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
const secMap = { home: 'home', tentang: 'home', wali: 'home', struktur: 'struktur', anggota: 'struktur', prestasi: 'prestasi', galeri: 'galeri' };
function onScroll() {
  nav.classList.toggle('solid', scrollY > 40); let cur = 'home';
  Object.keys(secMap).forEach(id => { if (document.getElementById(id).getBoundingClientRect().top <= 120) cur = id; });
  document.querySelectorAll('#menu a').forEach(a => a.classList.toggle('on', a.dataset.m === secMap[cur]));
}
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* ---- Hero slideshow ---- */
let si = 0, timer; const n = A.slides.length;
$('#slides').innerHTML = A.slides.map((s, i) => `<img src="${s.src}" alt="${esc(s.alt)}" class="${i ? '' : 'on'}">`).join('');
$('#dots').innerHTML = A.slides.map((_, i) => `<button aria-label="Slide ${i + 1}" data-i="${i}" class="${i ? '' : 'on'}"></button>`).join('');
function show(i) { si = (i + n) % n;
  document.querySelectorAll('#slides img').forEach((e, k) => e.classList.toggle('on', k === si));
  document.querySelectorAll('#dots button').forEach((e, k) => e.classList.toggle('on', k === si));
  clearInterval(timer); timer = setInterval(() => show(si + 1), 4500); }
$('#prev').onclick = () => show(si - 1); $('#next').onclick = () => show(si + 1);
$('#dots').onclick = e => { if (e.target.dataset.i) show(+e.target.dataset.i); }; show(0);

/* ---- Tentang ---- */
$('#ft1').src = A.fotoTentang[0]; $('#ft2').src = A.fotoTentang[1];
$('#cerita').innerHTML = A.cerita.map(c => `<p class="rv">${esc(c)}</p>`).join('');
$('#arti').textContent = A.arti; $('#tahun').textContent = `Masuk ${A.tahunMasuk} · Lulus ${A.tahunLulus}`;
$('#timeline').innerHTML = A.perjalanan.map(p => `<div class="rv"><b>${p.tahun}</b><h4>${esc(p.judul)}</h4><p>${esc(p.teks)}</p></div>`).join('');
$('#stats').innerHTML = [['Santri', SANTRI.length], ['Santriwati', SANTRIWATI.length], ['Total Anggota', SANTRI.length + SANTRIWATI.length]]
  .map(([l, v]) => `<div><b data-to="${v}">0</b><span>${l}</span></div>`).join('');
const co = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; co.unobserve(e.target);
  const to = +e.target.dataset.to, t0 = performance.now();
  (function f(t) { const p = Math.min((t - t0) / 2000, 1); e.target.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
}));
document.querySelectorAll('[data-to]').forEach(e => co.observe(e));

/* ---- Wali kelas ---- */
$('#waliGrid').innerHTML = WALI.map(w => `<article class="card rv"><div class="ph"><img src="${w.foto}" alt="${esc(w.nama)}"></div>
  <div class="txt"><h3>${esc(w.nama)}</h3><small>${esc(w.jabatan)}</small><p>${esc(w.deskripsi)}</p></div></article>`).join('');

/* ---- Struktur ---- */
const node = (p, big) => `<div class="n ${big ? 'big' : ''}"><img src="${p.foto}" alt="${esc(p.nama)}"><h4>${esc(p.nama)}</h4><small>${esc(p.jabatan)}</small></div>`;
const row = (l, big) => `<div class="row">${l.map(p => node(p, big)).join('')}</div>`, ln = '<div class="line"></div>';
$('#org').innerHTML = `<div class="rv">${row(PENGURUS.pembina, 1)}${ln}${row(PENGURUS.ketua, 1)}${ln}${row(PENGURUS.inti)}${ln}
  <div class="div"><p class="eyebrow">Divisi</p>${row(PENGURUS.divisi)}</div></div>`;

/* ---- Anggota ---- */
let tab = 'putra'; const data = () => tab === 'putra' ? SANTRI : SANTRIWATI;
function renderMembers() {
  const q = $('#q').value.toLowerCase(), k = $('#kelas').value;
  const list = data().filter(m => m.nama.toLowerCase().includes(q) && (k === 'Semua' || m.kelas === k));
  $('#count').textContent = `${list.length} anggota`;
  html($('#members'), list.length ? list.map((m, i) => `<div class="card mem rv" style="transition-delay:${(i % 6) * 50}ms"><div class="ph"><img src="${m.foto}" alt="${esc(m.nama)}" loading="lazy"></div>
    <div class="txt"><h3>${esc(m.nama)}</h3><small>Kelas ${esc(m.kelas)}</small></div></div>`).join('') : '<p class="empty">Tidak ada nama yang cocok.</p>');
}
function renderKelas() { $('#kelas').innerHTML = ['Semua', ...new Set(data().map(m => m.kelas))].map(k => `<option value="${k}">${k === 'Semua' ? 'Semua Kelas' : 'Kelas ' + k}</option>`).join(''); }
document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => { tab = b.dataset.t;
  document.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('on', x === b)); renderKelas(); renderMembers(); });
$('#q').oninput = renderMembers; $('#kelas').onchange = renderMembers; renderKelas(); renderMembers();

/* ---- Chips helper ---- */
function chips(el, items, cb) { el.innerHTML = items.map((c, i) => `<button class="${i ? '' : 'on'}">${esc(c)}</button>`).join('');
  el.onclick = e => { if (e.target.tagName !== 'BUTTON') return; el.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === e.target)); cb(e.target.textContent); }; }

/* ---- Prestasi ---- */
function renderPrestasi(c = 'Semua') {
  if (!PRESTASI.length) { $('#pChips').innerHTML = ''; return html($('#pGrid'), '<div class="empty"><h3>Prestasi akan segera hadir</h3><p>Tambahkan data di js/data/prestasi.js</p></div>'); }
  html($('#pGrid'), PRESTASI.filter(p => c === 'Semua' || p.kategori === c).map(p => `<article class="card pc rv"><div class="ph"><img src="${p.foto}" alt="${esc(p.nama)}"><span class="cat">${esc(p.kategori)}</span></div>
    <div class="in"><div class="yr">${p.tahun}</div><h3>${esc(p.nama)}</h3><small>${esc(p.penerima)}</small><p>${esc(p.deskripsi)}</p></div></article>`).join(''));
}
if (PRESTASI.length) chips($('#pChips'), ['Semua', ...new Set(PRESTASI.map(p => p.kategori))], renderPrestasi); renderPrestasi();

/* ---- Galeri + Lightbox ---- */
let gl = GALERI, gi = 0;
function renderGaleri(c = 'Semua') { gl = GALERI.filter(g => c === 'Semua' || g.kategori === c);
  html($('#gGrid'), gl.map((g, i) => `<button class="g rv" data-i="${i}"><img src="${g.src}" alt="${esc(g.caption)}" loading="lazy" style="aspect-ratio:${g.w}/${g.h}">
    <div class="ov"><small>${esc(g.kategori)}</small><span>${esc(g.caption)}</span></div></button>`).join('')); }
chips($('#gChips'), ['Semua', ...KATEGORI_GALERI], renderGaleri); renderGaleri();
function lb(i) { gi = (i + gl.length) % gl.length; const g = gl[gi]; $('#lbImg').src = g.src;
  $('#lbCap').innerHTML = `${esc(g.caption)}<small>${esc(g.kategori)} · ${gi + 1}/${gl.length}</small>`; $('#lb').classList.add('on'); }
$('#gGrid').onclick = e => { const b = e.target.closest('.g'); if (b) lb(+b.dataset.i); };
$('#lbP').onclick = e => { e.stopPropagation(); lb(gi - 1); }; $('#lbN').onclick = e => { e.stopPropagation(); lb(gi + 1); };
$('#lbX').onclick = () => $('#lb').classList.remove('on'); $('#lb').onclick = e => { if (e.target.id === 'lb') $('#lb').classList.remove('on'); };
addEventListener('keydown', e => { if (!$('#lb').classList.contains('on')) return;
  if (e.key === 'Escape') $('#lb').classList.remove('on'); if (e.key === 'ArrowRight') lb(gi + 1); if (e.key === 'ArrowLeft') lb(gi - 1); });
observe();
