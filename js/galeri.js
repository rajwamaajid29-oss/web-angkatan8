const show = c => galleryGrid($('#gGrid'), GALERI.filter(g => c === 'Semua' || g.kategori === c));
chips($('#gChips'), ['Semua', ...KATEGORI_GALERI], show); show('Semua');
