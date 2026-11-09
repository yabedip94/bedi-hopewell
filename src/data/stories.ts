import { Story } from '@/types';

export const INITIAL_STORIES: Story[] = [
  {
    id: 'sty-01',
    slug: 'kisah-sumur-surya-sumba',
    title: 'Di Balik Pembangunan Sumur Surya: 12 Desa Bebas Kekeringan',
    subtitle: 'Dari Survei Geologis Hingga Air Mengalir: Catatan Lengkap Kampanye Air Sumba',
    summary:
      'Laporan mendalam tentang bagaimana instalasi pompa selam bertenaga surya mengalirkan 8.400 liter air tawar per jam bagi komunitas sabana di Sumba Timur.',
    category: 'Laporan Lapangan',
    tags: ['Laporan Lapangan', 'Air Bersih'],
    author: {
      name: 'Elena Vance',
      role: 'Kepala Rekayasa Lapangan',
      avatarUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop&auto=format',
    },
    imageUrl: 'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?w=1400&h=800&fit=crop&auto=format',
    imageAlt: 'Tim teknis memeriksa instalasi pompa sumur bertenaga surya di padang sabana',
    publishedAt: '2025-10-18T08:00:00Z',
    readTimeMinutes: 7,
    featured: true,
    relatedProgramSlug: 'sumur-surya-kekeringan',
    sections: [
      {
        id: 'survei-geologis',
        title: 'Survei Geologis: Menentukan Titik Pengeboran Terbaik',
        content:
          'Sebelum mata bor menyentuh tanah, pemindaian hidrologis satelit disinkronkan dengan pengetahuan tetua adat desa yang memahami riwayat mata air musiman selama turun-temurun. Di kawasan tandus, air permukaan kerap mengering saat kemarau panjang; cadangan sejati tersimpan dalam rekahan akuifer sedalam 120 hingga 150 meter di bawah lapisan batuan kapur vulkanik.',
      },
      {
        id: 'proses-pengeboran',
        title: 'Dua Belas Hari Menembus Batuan Keras',
        content:
          'Pengeboran perkusi putar melalui batuan basal membutuhkan mata bor intan khusus, lumpur pendingin bentonit, dan kerja giliran 24 jam nonstop. Pada hari kesembilan, di kedalaman 142 meter, tekanan udara melonjak dan semburan air tawar jernih memancar deras. Uji laboratorium langsung mengonfirmasi tingkat padatan terlarut (TDS) berada pada angka 280 ppm — jauh di bawah ambang batas aman air minum.',
      },
      {
        id: 'verifikasi-manifest',
        title: 'Verifikasi Hasil & Pemasangan Sensor Digital',
        content:
          'Prinsip akuntabilitas Aurelia Foundation mewajibkan setiap sumur yang rampung dipasangi sensor telemetri debit air digital dan plakat kuningan bernomor manifest donasi. Laporan pertanggungjawaban hanya dicatat tuntas pada pembukuan terbuka setelah berita acara serah terima ditandatangani perwakilan warga dan hasil uji klinis terverifikasi.',
      },
      {
        id: 'dampak-warga',
        title: 'Akhir dari Perjalanan Jauh Mengambil Air',
        content:
          'Kini, lebih dari 14.000 warga di 12 desa binaan dapat mengakses air tawar layak minum hanya beberapa meter dari rumah mereka. Waktu berjam-jam yang dulu terbuang untuk berjalan kaki kini dialihkan untuk mendampingi anak-anak belajar dan mengelola kebun sayur pekarangan.',
      },
    ],
  },
  {
    id: 'sty-02',
    slug: 'rantai-dingin-medis-pulau',
    title: 'Logistik Medis & Rantai Dingin di Kepulauan Terluar',
    subtitle: 'Menjaga Integritas Vaksin dan Obat Esensial Menembus Cuaca Ekstrem Laut',
    summary:
      'Bagaimana posko medis keliling Aurelia mempertahankan suhu 2°C hingga 8°C untuk vaksin anak saat berlayar mengarungi perairan terpencil Halmahera Selatan.',
    category: 'Logistik Kesehatan',
    tags: ['Klinik Medis', 'Laporan Lapangan'],
    author: {
      name: 'dr. Sofia Morales',
      role: 'Dokter Penanggung Jawab Medis',
      avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&auto=format',
    },
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&h=700&fit=crop&auto=format',
    imageAlt: 'Petugas medis menyiapkan kotak pendingin vaksin berteknologi pemantau suhu',
    publishedAt: '2025-11-04T10:30:00Z',
    readTimeMinutes: 5,
    featured: false,
    relatedProgramSlug: 'klinik-apung-kesehatan',
    sections: [
      {
        id: 'tantangan-termal',
        title: 'Menjaga Kestabilan Suhu Vaksin di Laut',
        content:
          'Vaksin dan serum antibiotik sangat rentan rusak jika terpapar suhu di atas 25°C. Menggunakan pendingin khusus bertenaga surya mini di atas perahu motor medis, tim berhasil menyalurkan lebih dari 3.200 dosis vaksin dasar lengkap tanpa ada satu botol pun yang rusak oleh suhu laut tropis.',
      },
      {
        id: 'pelayanan-langsung',
        title: 'Pemeriksaan Kesehatan Langsung ke Dermaga Desa',
        content:
          'Alih-alih membiarkan ibu hamil berlayar belasan jam ke rumah sakit kota, kapal klinik Aurelia merapat langsung ke dermaga pulau. Pemeriksaan kehamilan berbasis USG portabel dan posko gizi balita diadakan secara rutin, menekan angka risiko persalinan kritis hingga titik nol.',
      },
    ],
  },
  {
    id: 'sty-03',
    slug: 'lumbung-pangan-mandiri',
    title: 'Dari Rentan Menjadi Tangguh: Lumbung Pangan Komunitas',
    subtitle: 'Fasilitas Penyimpanan Kedap Udara yang Menstabilkan Pasokan Pangan Musim Kemarau',
    summary:
      'Memberdayakan kelompok tani lokal dengan silo penyimpanan kedap udara untuk mencegah gagal simpan pangan dan spekulasi harga bahan pokok.',
    category: 'Ketahanan Pangan',
    tags: ['Laporan Lapangan', 'Tanggap Bencana'],
    author: {
      name: 'Marcus Boyd',
      role: 'Kepala Logistik Rantai Pasok',
      avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&auto=format',
    },
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=700&fit=crop&auto=format',
    imageAlt: 'Petani memeriksa hasil panen gabah di lumbung komunitas modern',
    publishedAt: '2025-12-01T09:15:00Z',
    readTimeMinutes: 6,
    featured: false,
    relatedProgramSlug: 'paket-pangan-bergizi',
    sections: [
      {
        id: 'silo-hermetis',
        title: 'Teknologi Sederhana Berdaya Tahan Tinggi',
        content:
          'Kehilangan pascapanen akibat jamur dan kutu beras sering merugikan petani hingga 30% dari hasil jerih payahnya. Lumbung komunitas berbahan polimer kedap udara menjaga kadar air dan oksigen tetap rendah, memungkinkan biji-bijian bertahan segar lebih dari 18 bulan tanpa bahan pengawet kimia.',
      },
      {
        id: 'stabilitas-ekonomi',
        title: 'Ketahanan Pangan Saat Paceklik Tiba',
        content:
          'Saat masa kemarau panjang datang, cadangan pangan di lumbung ini didistribusikan secara transparan kepada keluarga yang paling membutuhkan, memastikan anak-anak tetap mendapatkan asupan gizi cukup tanpa tertekan lonjakan harga pasar.',
      },
    ],
  },
  {
    id: 'sty-04',
    slug: 'transparansi-audit-terbuka',
    title: 'Membuka Buku Kas: Standar Audit & Akuntabilitas Modern',
    subtitle: 'Bagaimana Setiap Rupiah Donasi Dapat Dilacak Dari Rekening Pengirim Hingga Tanda Terima Warga',
    summary:
      'Ulasan komprehensif mengenai metodologi pembukuan terverifikasi, penomoran manifest logistik, dan laporan audit publik Aurelia Foundation.',
    category: 'Tata Kelola',
    tags: ['Audit Tahunan', 'Laporan Lapangan'],
    author: {
      name: 'David Sterling, CA',
      role: 'Kepala Auditor Keuangan Independen',
      avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&auto=format',
    },
    imageUrl: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=1200&h=700&fit=crop&auto=format',
    imageAlt: 'Auditor memeriksa lembar verifikasi keuangan dan manifest pengiriman bantuan',
    publishedAt: '2026-01-10T11:00:00Z',
    readTimeMinutes: 8,
    featured: true,
    sections: [
      {
        id: 'manifest-transparansi',
        title: 'Filosofi Nomor Manifest Unik',
        content:
          'Setiap donasi yang masuk ke Aurelia Foundation diperlakukan layaknya dokumen ekspedisi bernilai tinggi. Sistem otomatis kami menerbitkan nomor manifest unik yang menyertai pergerakan dana, nota pembelanjaan barang, hingga foto penyerahan fisik di lapangan.',
      },
      {
        id: 'audit-independen',
        title: 'Pemisahan Rekening Operasional & Program',
        content:
          'Biaya operasional sekretariat dan administrasi yayasan didanai secara mandiri oleh mitra donor institusional khusus. Hasilnya, 100% dari setiap donasi program yang Anda titipkan tersalurkan murni untuk kebutuhan penerima manfaat di garis depan tanpa potongan tersembunyi.',
      },
    ],
  },
];
