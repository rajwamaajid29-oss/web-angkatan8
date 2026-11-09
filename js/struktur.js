const node = (p, big) => `<div class="n ${big ? 'big' : ''}"><img src="${p.foto}" alt="${esc(p.nama)}"><h4>${esc(p.nama)}</h4><small>${esc(p.jabatan)}</small></div>`;
const row = (l, big) => `<div class="row">${l.map(p => node(p, big)).join('')}</div>`, ln = '<div class="line"></div>';
html($('#org'), `<div class="rv">${row(PENGURUS.pembina, 1)}${ln}${row(PENGURUS.ketua, 1)}${ln}${row(PENGURUS.inti)}${ln}
  <div class="div"><p class="eyebrow">Divisi</p>${row(PENGURUS.divisi)}</div></div>`);
