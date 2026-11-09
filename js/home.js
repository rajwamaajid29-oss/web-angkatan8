/* Hero */
const ICON = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.3 2.2 1.7 3.9 3.9 4.2v3a7.3 7.3 0 0 1-3.8-1.2v6.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.1a2.7 2.7 0 1 0 1.8 2.5V3h2.9z"/></svg>'
};
$('#hMeta').textContent = `Alumni ${A.pesantren}`; const nm = $('#hNama'); nm.setAttribute('aria-label', A.nama);
nm.innerHTML = [...A.nama].map((ch, i) => `<span class="ch" aria-hidden="true" style="--i:${i}">${ch === ' ' ? '&nbsp;' : esc(ch)}</span>`).join('');
$('#hTag').textContent = A.tagline; $('#hSub').textContent = `Angkatan ${A.angkatanKe} \u00b7 ${A.tahunMasuk} \u2013 ${A.tahunLulus}`;
$('#hSocial').innerHTML = Object.keys(A.sosmed).map(k => `<a href="${A.sosmed[k]}" target="_blank" rel="noopener" aria-label="${k}">${ICON[k]}</a>`).join('');
$('#hStats').innerHTML = [[SANTRI.length + SANTRIWATI.length, 'Anggota', 1], [A.angkatanKe, 'Angkatan', 1], [A.tahunLulus, 'Lulus', 0]].map(([v, l, c]) => `<div><b ${c ? `data-to="${v}"` : ''}>${c ? 0 : v}</b><span>${l}</span></div>`).join('');
let si = 0, timer; const n = A.slides.length;
$('#slides').innerHTML = A.slides.map((s, i) => `<img src="${s.src}" alt="${esc(s.alt)}" class="${i ? '' : 'on'}">`).join('');
$('#dots').innerHTML = A.slides.map((_, i) => `<button aria-label="Slide ${i + 1}" data-i="${i}" class="${i ? '' : 'on'}"></button>`).join('');
function show(i) { si = (i + n) % n;
  document.querySelectorAll('#slides img').forEach((e, k) => e.classList.toggle('on', k === si));
  document.querySelectorAll('#dots button').forEach((e, k) => e.classList.toggle('on', k === si));
  clearInterval(timer); timer = setInterval(() => show(si + 1), 5000); }
$('#dots').onclick = e => { if (e.target.dataset.i) show(+e.target.dataset.i); }; show(0);

/* Tentang */
$('#ft1').src = A.fotoTentang[0]; $('#ft2').src = A.fotoTentang[1];
$('#cerita').innerHTML = A.cerita.map(c => `<p class="rv">${esc(c)}</p>`).join('');
$('#timeline').innerHTML = A.perjalanan.map(p => `<div class="rv"><b>${p.tahun}</b><h4>${esc(p.judul)}</h4><p>${esc(p.teks)}</p></div>`).join('');

/* Wali kelas */
$('#waliGrid').innerHTML = WALI.map(w => `<article class="card rv"><div class="ph"><img src="${w.foto}" alt="${esc(w.nama)}"></div>
  <div class="txt"><h3>${esc(w.nama)}</h3><small>${esc(w.jabatan)}</small><p>${esc(w.deskripsi)}</p></div></article>`).join('');

/* Anggota */
let tab = 'putra'; const data = () => tab === 'putra' ? SANTRI : SANTRIWATI;
function renderMembers() {
  const q = $('#q').value.toLowerCase(), k = $('#kelas').value;
  const list = data().filter(m => m.nama.toLowerCase().includes(q) && (k === 'Semua' || m.kelas === k));
  $('#count').textContent = `${list.length} anggota`;
  html($('#members'), list.length ? list.map((m, i) => `<div class="card mem rv" style="transition-delay:${(i % 6) * 50}ms"><div class="ph"><img src="${m.foto}" alt="${esc(m.nama)}" loading="lazy"></div>
    <div class="txt"><h3>${esc(m.nama)}</h3><small>Kelas ${esc(m.kelas)}</small></div></div>`).join('') : '<p class="empty">Tidak ada nama yang cocok.</p>'); }
function renderKelas() { $('#kelas').innerHTML = ['Semua', ...new Set(data().map(m => m.kelas))].map(k => `<option value="${k}">${k === 'Semua' ? 'Semua Kelas' : 'Kelas ' + k}</option>`).join(''); }
document.querySelectorAll('.tabs button').forEach(b => b.onclick = () => { tab = b.dataset.t;
  document.querySelectorAll('.tabs button').forEach(x => x.classList.toggle('on', x === b)); renderKelas(); renderMembers(); });
$('#q').oninput = renderMembers; $('#kelas').onchange = renderMembers; renderKelas(); renderMembers();

/* Cuplikan galeri: hanya 6 foto (1 per kategori). Ubah angka 6 untuk menambah/mengurangi. */
galleryGrid($('#gGrid'), GALERI.slice(0, 6));
observe();


/* ---- Gerak khusus beranda ---- */
const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* Pita berjalan */
(() => { const items = [A.nama, `Angkatan ${A.angkatanKe}`, A.pesantren, A.tagline];
  const half = [...items, ...items].map(t => `<span>${esc(t)}</span>`).join('');
  $('#marquee').innerHTML = `<div class="track">${half}${half}</div>`; })();

/* Angka hero menghitung naik */
if (!REDUCE) setTimeout(() => document.querySelectorAll('#hStats [data-to]').forEach(el => {
  const to = +el.dataset.to, t0 = performance.now();
  (function f(t) { const p = Math.min((t - t0) / 1600, 1); el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0);
}), 900); else document.querySelectorAll('#hStats [data-to]').forEach(el => el.textContent = el.dataset.to);

/* Debu emas melayang di hero */
(() => { const cv = $('#dust'); if (!cv || REDUCE) return;
  const ctx = cv.getContext('2d'); let W, H, run = true, raf = 0, ps = [];
  const mk = init => ({ x: Math.random() * W, y: init ? Math.random() * H : H + 10, r: Math.random() * 1.8 + .5,
    vy: -(Math.random() * .28 + .08), vx: (Math.random() - .5) * .12, a: Math.random() * 6.28, s: Math.random() * .02 + .006 });
  const size = () => { const d = Math.min(devicePixelRatio || 1, 2); W = cv.clientWidth; H = cv.clientHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  size(); ps = Array.from({ length: Math.round(Math.min(70, W / 18)) }, () => mk(true)); addEventListener('resize', size);
  const tick = () => { raf = 0; if (!run) return; ctx.clearRect(0, 0, W, H);
    for (const p of ps) { p.x += p.vx + Math.sin(p.a) * .15; p.y += p.vy; p.a += p.s; if (p.y < -10) Object.assign(p, mk(false));
      ctx.beginPath(); ctx.fillStyle = `rgba(232,198,98,${.2 + .6 * Math.abs(Math.sin(p.a * 3))})`; ctx.shadowColor = 'rgba(217,181,74,.9)'; ctx.shadowBlur = 8; ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill(); }
    raf = requestAnimationFrame(tick); };
  new IntersectionObserver(e => { run = e[0].isIntersecting; if (run && !raf) raf = requestAnimationFrame(tick); }).observe(cv); })();

/* Parallax: teks hero memudar saat scroll, foto kedua di Tentang bergeser pelan */
if (!REDUCE) { const ht = $('.hero-txt'), im = $('.about-img img:last-child'); let tk = 0;
  const upd = () => { tk = 0; const y = scrollY, vh = innerHeight;
    if (y < vh) { ht.style.transform = `translateY(${y * .2}px)`; ht.style.opacity = Math.max(0, 1 - y / (vh * .75)); }
    const r = im.getBoundingClientRect(); if (r.bottom > 0 && r.top < vh) im.style.translate = `0 ${(r.top + r.height / 2 - vh / 2) * -.1}px`; };
  addEventListener('scroll', () => { if (!tk) tk = requestAnimationFrame(upd); }, { passive: true }); upd(); }
