// Struktur OSIS Angkatan GENERATION X8 (Ikhwan & Akhwat)
// Ganti nama & foto di sini. Foto: img('seed') = placeholder, atau tulis 'foto/nama.jpg'.

const BIDANG_OSIS = [
  // [nama bidang, jumlah sekbid]
  ['Keamanan', 0],
  ['Kebersihan', 1],
  ['Perpustakaan', 2],
  ['Rohis', 1],
  ['Kesehatan', 1],
  ['IT', 2],
  ['Kesenian', 1],
  ['Sains', 1],
  ['Pramuka', 1]
];

function buatOsis(kode, info) {
  const orang = (jabatan, urut) => ({
    nama: `Nama ${jabatan}`,
    jabatan,
    tugas: '',
    foto: img(`osis-${kode}-${urut}`, 400, 500)
  });

  let n = 0;
  return {
    ...info,
    pembina: {
      nama: 'Nama Pembina OSIS',
      jabatan: 'Pembina OSIS',
      tugas: 'Membimbing dan mengarahkan seluruh pengurus OSIS dalam menjalankan program kerja.',
      foto: img(`osis-${kode}-pembina`, 400, 500)
    },
    inti: ['Ketua OSIS', 'Wakil Ketua OSIS', 'Sekretaris OSIS', 'Bendahara OSIS'].map(j => orang(j, n++)),
    bidang: BIDANG_OSIS.map(([nama, jmlSekbid]) => ({
      nama,
      anggota: [
        orang(`Ketua ${nama}`, n++),
        ...Array.from({ length: jmlSekbid }, () => orang(`Sekbid ${nama}`, n++))
      ]
    }))
  };
}

const OSIS = {
  ikhwan: buatOsis('ik', {
    label: 'OSIS Ikhwan',
    judul: 'Struktur OSIS Ikhwan',
    deskripsi: 'Wadah kepemimpinan dan khidmah santri putra Ar-Rasyid dalam menggerakkan kegiatan kedisiplinan, dakwah, dan kreativitas.',
    foto: img('osis-ikhwan-bg', 900, 1100)
  }),
  akhwat: buatOsis('ak', {
    label: 'OSIS Akhwat',
    judul: 'Struktur OSIS Akhwat',
    deskripsi: 'Pilar kepemimpinan santriwati putri yang berfokus pada keteladanan akhlak, budaya literasi, dan kehangatan ukhuwah asrama.',
    foto: img('osis-akhwat-bg', 900, 1100)
  })
};
