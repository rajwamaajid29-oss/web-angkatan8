const SANTRI = Array.from({ length: 12 }, (_, i) => ({ nama: `[Nama Santri ${i + 1}]`, kelas: ['A', 'B', 'C'][i % 3], foto: img('putra' + i, 400, 500) }));
