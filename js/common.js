document.documentElement.classList.add('js');
const $ = s => document.querySelector(s), A = ANGKATAN, PAGE = document.body.dataset.page;
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '-60px' });
const observe = () => document.querySelectorAll('.rv:not(.in)').forEach(e => io.observe(e));
const html = (el, h) => { el.innerHTML = h; observe(); };
document.title = `${A.nama} - ${PAGE === 'home' ? 'Beranda' : PAGE.charAt(0).toUpperCase() + PAGE.slice(1)}`;

/* Navbar, footer, lightbox disisipkan otomatis ke semua halaman */
const MENU = [['index.html', 'Home', 'home'], ['organisasi.html', 'Organisasi', 'organisasi'], ['prestasi.html', 'Prestasi', 'prestasi'], ['galeri.html', 'Galeri', 'galeri']];
document.body.insertAdjacentHTML('afterbegin', `<header id="nav"><div class="wrap bar"><a href="index.html" class="brand">${esc(A.singkat)}</a>
  <nav id="menu">${MENU.map(m => `<a href="${m[0]}" class="${m[2] === PAGE ? 'on' : ''}">${m[1]}</a>`).join('')}</nav><button id="burger" aria-label="Menu">&#9776;</button></div></header>`);
document.body.insertAdjacentHTML('beforeend', `<footer><h3>${esc(A.nama)}</h3><p class="serif tag2">${esc(A.tagline)}</p>
  <p class="close">Kita boleh berpisah jalan, tapi semua cerita di pondok ini tetap milik kita bersama.</p>
  <div class="copy">© ${new Date().getFullYear()} ${esc(A.nama)}. Dibuat oleh angkatan, untuk angkatan.</div></footer>
  <div id="lb" class="lb"><button id="lbX" aria-label="Tutup">✕</button><button id="lbP" class="arrow l" aria-label="Sebelumnya">‹</button>
  <figure><img id="lbImg" alt=""><figcaption id="lbCap"></figcaption></figure><button id="lbN" class="arrow r" aria-label="Berikutnya">›</button></div>`);
const nav = $('#nav'); $('#burger').onclick = () => nav.classList.toggle('open');
const onScroll = () => nav.classList.toggle('solid', PAGE !== 'home' || scrollY > 40);
addEventListener('scroll', onScroll, { passive: true }); onScroll();

/* Chip filter */
function chips(el, items, cb) { el.innerHTML = items.map((c, i) => `<button class="${i ? '' : 'on'}">${esc(c)}</button>`).join('');
  el.onclick = e => { if (e.target.tagName !== 'BUTTON') return; el.querySelectorAll('button').forEach(b => b.classList.toggle('on', b === e.target)); cb(e.target.textContent); }; }

/* Grid galeri + lightbox (dipakai di Home dan halaman Galeri) */
let _gl = [], _gi = 0;
function galleryGrid(el, list) { _gl = list;
  html(el, list.map((g, i) => `<button class="g rv" data-i="${i}"><span class="gi"><img src="${g.src}" alt="${esc(g.caption)}" loading="lazy" style="aspect-ratio:${g.w}/${g.h}"></span>
    <div class="ov"><small>${esc(g.kategori)}</small><span>${esc(g.caption)}</span></div></button>`).join(''));
  el.onclick = e => { const b = e.target.closest('.g'); if (b) lb(+b.dataset.i); }; }
function lb(i) { _gi = (i + _gl.length) % _gl.length; const g = _gl[_gi]; $('#lbImg').src = g.src;
  $('#lbCap').innerHTML = `${esc(g.caption)}<small>${esc(g.kategori)} · ${_gi + 1}/${_gl.length}</small>`; $('#lb').classList.add('on'); }
$('#lbP').onclick = e => { e.stopPropagation(); lb(_gi - 1); }; $('#lbN').onclick = e => { e.stopPropagation(); lb(_gi + 1); };
$('#lbX').onclick = () => $('#lb').classList.remove('on'); $('#lb').onclick = e => { if (e.target.id === 'lb') $('#lb').classList.remove('on'); };
addEventListener('keydown', e => { if (!$('#lb').classList.contains('on')) return;
  if (e.key === 'Escape') $('#lb').classList.remove('on'); if (e.key === 'ArrowRight') lb(_gi + 1); if (e.key === 'ArrowLeft') lb(_gi - 1); });

/* ---- Gerak ---- */
document.body.insertAdjacentHTML('afterbegin', '<div id="progress"></div>');
const bar = $('#progress');
const prog = () => { const m = document.documentElement.scrollHeight - innerHeight; bar.style.transform = `scaleX(${m > 0 ? Math.min(scrollY / m, 1) : 0})`; };
addEventListener('scroll', prog, { passive: true }); prog();
document.querySelectorAll('h2, .about-img, .phead .wrap > *').forEach(e => e.classList.add('rv'));
observe();
