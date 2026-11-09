const ANGKATAN = {
  nama: 'Lazuardi', singkat: 'Lazuardi', pesantren: 'Pesantren Tahfidz Ar-Rasyid',
  angkatanKe: 8,
  tagline: 'Beda sisi, satu angkatan.',
  tahunMasuk: 2021, tahunLulus: 2024,
  /* Ganti '#' dengan link akun asli */
  sosmed: { instagram: '#', tiktok: '#' },
  arti: 'Lazuardi berarti biru langit. Santri putra dan santriwati putri belajar di sisi yang berbeda, tetapi langit di atas kami sama, begitu juga cita-cita yang kami bawa pulang dari Ar-Rasyid.',
  cerita: [
    'Tuliskan cerita singkat angkatan di sini. Santri putra dan santriwati putri menjalani hari di sisi yang berbeda, namun tumbuh dengan doa yang sama.',
    'Paragraf kedua: suka duka, kenangan khas pondok, dan hal yang membuat angkatan ini istimewa.'
  ],
  perjalanan: [
    { tahun: 2021, judul: 'Awal langkah', teks: 'Pertama kali masuk dan saling mengenal.' },
    { tahun: 2022, judul: 'Tumbuh bersama', teks: 'Belajar, menghafal, dan berkegiatan.' },
    { tahun: 2023, judul: 'Menguatkan ikatan', teks: 'Menghadapi ujian dan tantangan bersama.' },
    { tahun: 2024, judul: 'Kelulusan', teks: 'Berpisah jalan, tetap satu keluarga.' }
  ],
  /* Foto hero & tentang: ganti img(...) dengan 'foto/namafile.jpg' */
  slides: [
    { src: img('angkatan4', 1920, 1080), alt: 'Foto bersama angkatan' }, { src: img('pondok1', 1920, 1080), alt: 'Lingkungan pondok' },
    { src: img('kegiatan3', 1920, 1080), alt: 'Kegiatan angkatan' }
  ],
  fotoTentang: [img('tentang1', 800, 1000), img('tentang2', 800, 600)]
};
