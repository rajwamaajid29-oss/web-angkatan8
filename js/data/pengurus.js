const _p = (id, jabatan) => ({ jabatan, nama: `[Nama ${jabatan}]`, foto: img('pengurus' + id, 400, 500) });
const PENGURUS = {
  pembina: [_p(1, 'Pembina / Wali Kelas')], ketua: [_p(2, 'Ketua Angkatan')],
  inti: [_p(3, 'Wakil Ketua'), _p(4, 'Sekretaris'), _p(5, 'Bendahara')],
  divisi: [_p(6, 'Divisi Acara'), _p(7, 'Divisi Dokumentasi'), _p(8, 'Divisi Humas')]
};
