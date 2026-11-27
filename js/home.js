/* ==========================================================================
   GENERATION X8 - HOME JS (ORIGINAL CINEMATIC HERO + INTERACTIVE)
   ========================================================================== */

const REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* 1. Hero Sinematik Asli */
const ICON = {
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".9" fill="currentColor" stroke="none"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 3c.3 2.2 1.7 3.9 3.9 4.2v3a7.3 7.3 0 0 1-3.8-1.2v6.2a5.7 5.7 0 1 1-5.7-5.7c.3 0 .6 0 .9.1v3.1a2.7 2.7 0 1 0 1.8 2.5V3h2.9z"/></svg>'
};

$('#hMeta').textContent = `Alumni ${A.pesantren}`;

const nm = $('#hNama');
nm.setAttribute('aria-label', A.nama);
nm.innerHTML = A.nama.split(' ').map((w, wi, arr) => {
  const base = arr.slice(0, wi).join(' ').length + (wi ? wi : 0);
  const letters = [...w].map((ch, i) => `<span class="ch" aria-hidden="true" style="--i:${base + i}">${esc(ch)}</span>`).join('');
  return `<span class="hw${wi > 0 ? ' acc' : ''}">${letters}</span>`;
}).join(' ');

$('#hTag').textContent = A.tagline;
$('#hSub').textContent = `${A.tahunMasuk} – ${A.tahunLulus}`;

$('#hSocial').innerHTML = Object.keys(A.sosmed).map(k => `
  <a href="${A.sosmed[k]}" target="_blank" rel="noopener" aria-label="${k}">${ICON[k] || ''}</a>
`).join('');

const totalMembers = SANTRI.length + SANTRIWATI.length;
const statsData = [
  [totalMembers, 'Anggota', 1],
  [PRESTASI.length, 'Prestasi', 1],
  [A.tahunLulus, 'Lulus', 0]
];

$('#hStats').innerHTML = statsData.map(([v, l, c]) => `
  <div>
    <b ${c ? `data-to="${v}"` : ''}>${c ? 0 : v}</b>
    <span>${l}</span>
  </div>
`).join('');

/* Slideshow */
let si = 0;
let timer = null;
const n = A.slides.length;

$('#slides').innerHTML = A.slides.map((s, i) => `
  <div class="sbg ${i === 0 ? 'on' : ''}" style="background-image:url('${s.src}')"></div>
`).join('') + A.slides.map((s, i) => `
  <img src="${s.src}" alt="${esc(s.alt)}" class="${i === 0 ? 'on' : ''}"${s.pos ? ` style="object-position:${s.pos}"` : ''}>
`).join('');

$('#dots').innerHTML = A.slides.map((_, i) => `
  <button aria-label="Slide ${i + 1}" data-i="${i}" class="${i === 0 ? 'on' : ''}"></button>
`).join('');

function showSlide(i) {
  si = (i + n) % n;
  $$('#slides img').forEach((e, k) => e.classList.toggle('on', k === si));
  $$('#slides .sbg').forEach((e, k) => e.classList.toggle('on', k === si));
  $$('#dots button').forEach((e, k) => e.classList.toggle('on', k === si));
  clearInterval(timer);
  timer = setInterval(() => showSlide(si + 1), 3000);
}

$('#dots').onclick = e => {
  if (e.target.dataset.i) showSlide(+e.target.dataset.i);
};
showSlide(0);

/* Angka Hero Menghitung Naik */
if (!REDUCE) {
  setTimeout(() => {
    $$('#hStats [data-to]').forEach(el => {
      const to = +el.dataset.to;
      const t0 = performance.now();
      function f(t) {
        const p = Math.min((t - t0) / 1400, 1);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(f);
      }
      f(t0);
    });
  }, 400);
} else {
  $$('#hStats [data-to]').forEach(el => el.textContent = el.dataset.to);
}

/* Debu Emas Melayang di Hero (#dust Canvas) */
(() => {
  const cv = $('#dust');
  if (!cv || REDUCE) return;
  const ctx = cv.getContext('2d');
  let W, H, run = true, raf = 0, ps = [];

  const mk = init => ({
    x: Math.random() * W,
    y: init ? Math.random() * H : H + 10,
    r: Math.random() * 1.8 + 0.5,
    vy: -(Math.random() * 0.28 + 0.08),
    vx: (Math.random() - 0.5) * 0.12,
    a: Math.random() * 6.28,
    s: Math.random() * 0.02 + 0.006
  });

  const size = () => {
    const d = Math.min(devicePixelRatio || 1, 2);
    W = cv.clientWidth;
    H = cv.clientHeight;
    cv.width = W * d;
    cv.height = H * d;
    ctx.setTransform(d, 0, 0, d, 0, 0);
  };

  size();
  ps = Array.from({ length: Math.round(Math.min(70, W / 18)) }, () => mk(true));
  window.addEventListener('resize', size);

  const tick = () => {
    raf = 0;
    if (!run) return;
    ctx.clearRect(0, 0, W, H);
    for (const p of ps) {
      p.x += p.vx + Math.sin(p.a) * 0.15;
      p.y += p.vy;
      p.a += p.s;
      if (p.y < -10) Object.assign(p, mk(false));

      ctx.beginPath();
      ctx.fillStyle = `rgba(232, 198, 98, ${0.25 + 0.55 * Math.abs(Math.sin(p.a * 3))})`;
      ctx.shadowColor = 'rgba(217, 181, 74, 0.85)';
      ctx.shadowBlur = 6;
      ctx.arc(p.x, p.y, p.r, 0, 6.283);
      ctx.fill();
    }
    raf = requestAnimationFrame(tick);
  };

  new IntersectionObserver(e => {
    run = e[0].isIntersecting;
    if (run && !raf) raf = requestAnimationFrame(tick);
  }).observe(cv);
})();

/* Parallax Hero Scroll */
if (!REDUCE) {
  const ht = $('.hero-txt');
  const dotsEl = $('#dots');
  let tk = 0;
  const upd = () => {
    tk = 0;
    const y = window.scrollY;
    const vh = window.innerHeight;
    if (y < vh && ht) {
      ht.style.transform = `translateY(${y * 0.18}px)`;
      ht.style.opacity = Math.max(0, 1 - y / (vh * 0.85));
    }
    if (dotsEl) dotsEl.style.opacity = Math.max(0, 1 - y / (vh * 0.35));
  };
  window.addEventListener('scroll', () => {
    if (!tk) tk = requestAnimationFrame(upd);
  }, { passive: true });
  upd();
}

/* 2. Tentang */
$('#ft1').src = A.fotoTentang[0];
$('#ft2').src = A.fotoTentang[1];
$('#cerita').innerHTML = A.cerita.map(c => `<p>${esc(c)}</p>`).join('');

/* 3. Perjalanan (Timeline Interaktif) */
let activeTimelineYear = 0;

function renderTimelineNav() {
  $('#timelineNav').innerHTML = A.perjalanan.map((item, idx) => `
    <button class="timeline-tab ${idx === activeTimelineYear ? 'on' : ''}" data-idx="${idx}" role="tab" aria-selected="${idx === activeTimelineYear}">
      <div class="timeline-tab-yr">${item.tahun}</div>
      <div class="timeline-tab-title">${esc(item.judul)}</div>
    </button>
  `).join('');
}

function showTimelineItem(idx) {
  activeTimelineYear = idx;
  renderTimelineNav();
  const p = A.perjalanan[idx];
  $('#timelineDisplay').innerHTML = `
    <div class="timeline-photos">
      ${p.fotos.map((f, i) => `<img src="${f}" alt="${esc(p.judul)} - foto ${i + 1}" loading="lazy">`).join('')}
    </div>
    <div class="timeline-panel-info">
      <span class="timeline-badge">${esc(p.highlight)}</span>
      <h3>${p.tahun} · ${esc(p.judul)}</h3>
      <p>${esc(p.teks)}</p>
      <div class="timeline-detail-box">
        <strong>Fokus Tahun Ini:</strong> ${esc(p.detail)}
      </div>
    </div>
  `;
}

$('#timelineNav').onclick = e => {
  const tab = e.target.closest('.timeline-tab');
  if (tab) showTimelineItem(+tab.dataset.idx);
};
showTimelineItem(0);

/* 4. Wali Kelas */
$('#waliGrid').innerHTML = WALI.map(w => `
  <article class="wali-card rv">
    <div class="wali-photo">
      <img src="${w.foto}" alt="${esc(w.nama)}" loading="lazy">
    </div>
    <div class="wali-body">
      <h3>${esc(w.nama)}</h3>
      <span class="wali-role">${esc(w.jabatan)}</span>
      <p class="wali-desc">${esc(w.deskripsi)}</p>
      <div class="wali-pesan">"${esc(w.pesan)}"</div>
    </div>
  </article>
`).join('');

/* 5. Keluarga Angkatan (Interactive Member Filter & Modal) */
let currentGender = 'putra';
const getMembersData = () => currentGender === 'putra' ? SANTRI : SANTRIWATI;

function populateClassFilter() {
  const classes = ['Semua', ...new Set(getMembersData().map(m => m.kelas))];
  $('#kelas').innerHTML = classes.map(c => `
    <option value="${c}">${c === 'Semua' ? 'Semua Kelas' : 'Kelas ' + c}</option>
  `).join('');
}

function renderMembers() {
  const q = $('#q').value.trim().toLowerCase();
  const k = $('#kelas').value;
  $('#clearQ').hidden = !q;

  const filtered = getMembersData().filter(m => {
    const matchName = m.nama.toLowerCase().includes(q) || ((m.alamat || m.asal || '').toLowerCase().includes(q));
    const matchClass = (k === 'Semua' || m.kelas === k);
    return matchName && matchClass;
  });

  $('#count').textContent = `Menampilkan ${filtered.length} dari ${getMembersData().length} ${currentGender === 'putra' ? 'santri putra' : 'santriwati putri'}`;

  if (!filtered.length) {
    html($('#members'), `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="m14 8-6 6M8 8l6 6"/></svg>
        <h4>Tidak ditemukan santri yang cocok</h4>
        <p>Coba gunakan kata kunci nama atau filter kelas yang berbeda.</p>
      </div>
    `);
    return;
  }

  html($('#members'), filtered.map((m, i) => `
    <div class="member-card rv" data-name="${esc(m.nama)}" tabindex="0" role="button" aria-label="Lihat profil ${esc(m.nama)}">
      <div class="member-photo">
        <img src="${m.foto}" alt="${esc(m.nama)}" loading="lazy">
      </div>
      <div class="member-info">
        <h4>${esc(m.nama)}</h4>
        <span class="member-sub">Kelas ${esc(m.kelas)}${(m.alamat || m.asal) ? ' · ' + esc(m.alamat || m.asal) : ''}</span>
      </div>
    </div>
  `).join(''));
}

/* Modal Santri */
function showMemberDetail(name) {
  const member = getMembersData().find(m => m.nama === name);
  if (!member) return;

  const val = v => (v && String(v).trim()) ? esc(v) : '<em class="modal-empty">Belum diisi</em>';
  const lokasi = member.alamat || member.asal;
  const item = (icon, label, value, full) => `
    <div class="modal-info-item${full ? ' full' : ''}">
      <span class="mi-ico">${icon}</span>
      <div class="mi-txt"><small>${label}</small><strong>${value}</strong></div>
    </div>`;

  const modalHtml = `
    <div class="modal-header-hero">
      <img src="${member.foto}" alt="">
      <div class="modal-header-shade"></div>
      <div class="modal-avatar-box">
        <img src="${member.foto}" alt="Foto ${esc(member.nama)}" style="--zoom:${member.zoom || 1};--ty:${member.zoomY || 0}px">
      </div>
    </div>
    <div class="modal-content">
      <h3>${esc(member.nama)}</h3>
      <div class="modal-badge-row">
        <span class="modal-pill">Kelas ${esc(member.kelas)}</span>
        <span class="modal-pill">${currentGender === 'putra' ? 'Santri Ikhwan' : 'Santriwati Akhwat'}</span>
        <span class="modal-pill">Angkatan ${A.angkatanKe}</span>
      </div>
      <div class="modal-info-grid">
        ${item(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`, 'Alamat / Asal Daerah', val(lokasi), true)}
        ${item(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 12 6a5.5 5.5 0 0 0-10 2.5C2 14 12 21 12 21s4-2.7 7-7Z"/></svg>`, 'Hobi', val(member.hobi))}
        ${item(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/></svg>`, 'Lanjut Sekolah ke', val(member.lanjut))}
        ${item(`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9Z"/></svg>`, 'Cita-Cita', val(member.citaCita), true)}
      </div>
      <div class="modal-quote-wrap">
        <div class="modal-quote-label">Motivasi / Kata-Kata</div>
        <blockquote class="modal-quote">${esc(member.quote || 'Semoga Allah senantiasa meridhoi setiap langkah persaudaraan kita.')}</blockquote>
      </div>
    </div>
  `;

  openModal(modalHtml);
}

$('#members').onclick = e => {
  const card = e.target.closest('.member-card');
  if (card) showMemberDetail(card.dataset.name);
};

$('#members').onkeydown = e => {
  if (e.key === 'Enter' || e.key === ' ') {
    const card = e.target.closest('.member-card');
    if (card) {
      e.preventDefault();
      showMemberDetail(card.dataset.name);
    }
  }
};

/* Gender Tabs */
$$('.tabs button').forEach(btn => {
  btn.onclick = () => {
    currentGender = btn.dataset.t;
    $$('.tabs button').forEach(b => {
      const active = b === btn;
      b.classList.toggle('on', active);
      b.setAttribute('aria-selected', String(active));
    });
    populateClassFilter();
    renderMembers();
  };
});

$('#q').oninput = renderMembers;
$('#clearQ').onclick = () => {
  $('#q').value = '';
  renderMembers();
  $('#q').focus();
};
$('#kelas').onchange = renderMembers;

populateClassFilter();
renderMembers();

/* 6. Sekilas Galeri Preview */
const previewList = GALERI.slice(0, 6);
setupLightbox(GALERI);

html($('#gGrid'), previewList.map((g, i) => `
  <div class="gallery-item rv" data-idx="${i}" tabindex="0" role="button" aria-label="Perbesar foto: ${esc(g.caption)}">
    <div class="gallery-img-box">
      <img src="${g.src}" alt="${esc(g.caption)}" loading="lazy">
    </div>
    <div class="gallery-overlay">
      <span class="gallery-cat">${esc(g.kategori)}</span>
      <div class="gallery-caption">${esc(g.caption)}</div>
    </div>
  </div>
`).join(''));

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

observe();
