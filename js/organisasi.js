const node = (p, big) => `<div class="n rv ${big ? 'big' : ''}"><img src="${p.foto}" alt="${esc(p.nama)}"><h4>${esc(p.nama)}</h4><small>${esc(p.jabatan)}</small></div>`;
const row = (l, big) => `<div class="row">${l.map(p => node(p, big)).join('')}</div>`, ln = '<div class="line"></div>';
$('#pick').innerHTML = Object.keys(OSIS).map(k => `<button class="pk rv" data-k="${k}"><img src="${OSIS[k].foto}" alt="${esc(OSIS[k].judul)}">
  <div class="pk-ov"><h3>${esc(OSIS[k].label)}</h3><span>Lihat susunan</span></div></button>`).join('');
observe();
function open(k) { const o = OSIS[k];
  $('#dTitle').textContent = o.judul; $('#dDesc').textContent = o.deskripsi;
  $('#org').innerHTML = `${row(o.pembina, 1)}${ln}${row(o.ketua, 1)}${ln}${row(o.inti)}${ln}<div class="div"><p class="eyebrow">Divisi</p>${row(o.divisi)}</div>`;
  observe(); $('#pick').hidden = true; $('#detail').hidden = false; $('#intro').textContent = o.judul; scrollTo({ top: 0, behavior: 'smooth' }); }
function close() { $('#detail').hidden = true; $('#pick').hidden = false; $('#intro').textContent = 'Pilih salah satu untuk melihat susunan OSIS.'; }
$('#pick').onclick = e => { const b = e.target.closest('.pk'); if (b) open(b.dataset.k); };
$('#back').onclick = close;
