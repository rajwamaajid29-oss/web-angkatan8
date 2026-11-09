// Data OSIS. Ganti nama, jabatan, dan foto. Tambah/hapus orang cukup dengan menambah/menghapus baris _p(...).
const _p = (seed, jabatan) => ({ jabatan, nama: `[Nama ${jabatan}]`, foto: img(seed, 400, 500) });
const OSIS = {
  ikhwan: {
    label: 'Ikhwan', judul: 'OSIS Ikhwan', deskripsi: 'Susunan pengurus OSIS santri putra.', foto: img('osis-ikhwan', 900, 1100),
    pembina: [_p('ik-pembina', 'Pembina OSIS')],
    ketua: [_p('ik-ketua', 'Ketua OSIS')],
    inti: [_p('ik-wakil', 'Wakil Ketua'), _p('ik-sekretaris', 'Sekretaris'), _p('ik-bendahara', 'Bendahara')],
    divisi: [_p('ik-d1', 'Divisi Keamanan'), _p('ik-d2', 'Divisi Kebersihan'), _p('ik-d3', 'Divisi Ibadah'), _p('ik-d4', 'Divisi Bahasa')]
  },
  akhwat: {
    label: 'Akhwat', judul: 'OSIS Akhwat', deskripsi: 'Susunan pengurus OSIS santriwati putri.', foto: img('osis-akhwat', 900, 1100),
    pembina: [_p('ak-pembina', 'Pembina OSIS')],
    ketua: [_p('ak-ketua', 'Ketua OSIS')],
    inti: [_p('ak-wakil', 'Wakil Ketua'), _p('ak-sekretaris', 'Sekretaris'), _p('ak-bendahara', 'Bendahara')],
    divisi: [_p('ak-d1', 'Divisi Keamanan'), _p('ak-d2', 'Divisi Kebersihan'), _p('ak-d3', 'Divisi Ibadah'), _p('ak-d4', 'Divisi Bahasa')]
  }
};
