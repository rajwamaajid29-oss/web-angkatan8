const KATEGORI_GALERI = ['Kegiatan', 'Kebersamaan', 'Acara Sekolah', 'Dokumentasi Putra', 'Dokumentasi Putri', 'Kenangan Angkatan'];
const _s = [[800, 1000], [800, 600], [800, 800], [800, 1100], [800, 560]];
const GALERI = Array.from({ length: 18 }, (_, i) => { const [w, h] = _s[i % 5];
  return { kategori: KATEGORI_GALERI[i % 6], caption: `[Caption foto ${i + 1}]`, src: img('galeri' + i, w, h), w, h }; });
