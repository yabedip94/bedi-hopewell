import { FaqItem } from '@/types';

export const INITIAL_FAQS: FaqItem[] = [
  /* Donasi & Pembayaran */
  {
    id: 'faq-01',
    category: 'donasi',
    categoryLabel: 'Donasi & Pembayaran',
    question: 'Bagaimana cara memastikan donasi saya benar-benar sampai ke penerima?',
    answer:
      'Setiap inisiatif di Aurelia Foundation dijalankan melalui mitra terakreditasi yang wajib mengunggah bukti tanda terima dan nota pembelanjaan mingguan. Anda akan menerima Nomor Pelacakan (Tracking ID) unik setelah berdonasi untuk memantau tahapan pengadaan hingga serah terima di lapangan.',
  },
  {
    id: 'faq-02',
    category: 'donasi',
    categoryLabel: 'Donasi & Pembayaran',
    question: 'Apakah saya bisa menjadi donatur rutin bulanan?',
    answer:
      'Tentu saja. Pada saat penyaluran donasi, pilih opsi "Donasi Rutin Bulanan". Donasi Anda akan diproses secara otomatis setiap bulan dengan tanggal yang sama, dan Anda dapat mengubah nominal atau menghentikan komitmen kapan saja melalui portal donatur.',
  },
  {
    id: 'faq-03',
    category: 'donasi',
    categoryLabel: 'Donasi & Pembayaran',
    question: 'Metode pembayaran apa saja yang didukung?',
    answer:
      'Kami menerima pembayaran melalui QRIS (GoPay, OVO, Dana, ShopeePay), Transfer Bank Virtual Account (BCA, Mandiri, BNI, BRI), Kartu Kredit/Debit Visa & Mastercard, serta transfer langsung antarbank. Seluruh transaksi dienkripsi dengan standar keamanan perbankan TLS 1.3.',
  },
  {
    id: 'faq-04',
    category: 'donasi',
    categoryLabel: 'Donasi & Pembayaran',
    question: 'Berapa batas minimum donasi yang bisa disalurkan?',
    answer:
      'Tidak ada kebaikan yang terlalu kecil. Setiap rupiah bernilai untuk pengadaan bahan pangan, buku anak, atau filter air bersih. Sistem kami menerima donasi mulai dari Rp 10.000, dan Anda bebas memasukkan nominal donasi berapa pun tanpa batas atas.',
  },

  /* Bukti Potong Pajak & Kuitansi */
  {
    id: 'faq-05',
    category: 'pajak',
    categoryLabel: 'Bukti Potong Pajak',
    question: 'Apakah donasi ke Aurelia Foundation dapat dikurangkan dari pajak penghasilan?',
    answer:
      'Ya. Aurelia Foundation terdaftar secara resmi sebagai lembaga sosial berbadan hukum yang memenuhi syarat pengurangan penghasilan bruto sesuai ketentuan perpajakan yang berlaku di Indonesia (simulasi portofolio DEMO). Kuitansi resmi dapat dilampirkan pada laporan SPT tahunan.',
  },
  {
    id: 'faq-06',
    category: 'pajak',
    categoryLabel: 'Bukti Potong Pajak',
    question: 'Kapan dan bagaimana saya menerima bukti kuitansi donasi resmi?',
    answer:
      'Kuitansi digital berstempel resmi dan QR code verifikasi dikirimkan otomatis ke alamat email Anda dalam hitungan detik setelah pembayaran terkonfirmasi. Anda juga dapat mengunduh rekapitulasi donasi tahunan langsung dari portal donatur.',
  },
  {
    id: 'faq-07',
    category: 'pajak',
    categoryLabel: 'Bukti Potong Pajak',
    question: 'Bagaimana cara mendaftarkan program pencocokan donasi perusahaan (corporate matching)?',
    answer:
      'Jika perusahaan Anda memiliki program tanggung jawab sosial (CSR) atau gift-matching, tim kemitraan kami dapat menerbitkan formulir verifikasi institusional dan surat tanda terima resmi guna memproses pencairan dana padanan perusahaan.',
  },

  /* Pelacakan & Verifikasi */
  {
    id: 'faq-08',
    category: 'verifikasi',
    categoryLabel: 'Pelacakan & Verifikasi',
    question: 'Apa arti Nomor Pelacakan (Tracking ID) pada manifest donasi?',
    answer:
      'Nomor Pelacakan adalah kode identifikasi alfanumerik unik (contoh: AF-2026-04471) yang menghubungkan donasi Anda dengan rute pengadaan fisik di lapangan. Anda dapat memasukkan kode ini ke portal pelacakan untuk melihat foto GPS, kuitansi pembelian, dan status serah terima.',
  },
  {
    id: 'faq-09',
    category: 'verifikasi',
    categoryLabel: 'Pelacakan & Verifikasi',
    question: 'Seberapa sering data penyaluran di lapangan diperbarui?',
    answer:
      'Koordinator posko lapangan kami memperbarui status manifest sekurang-kurangnya sekali setiap 7 hari kerja. Pada program tanggap bencana darurat, pembaharuan logistik dilakukan setiap 24 jam.',
  },
  {
    id: 'faq-10',
    category: 'verifikasi',
    categoryLabel: 'Pelacakan & Verifikasi',
    question: 'Apakah saya bisa berdonasi tanpa mencantumkan nama saya (Anonim)?',
    answer:
      'Tentu. Anda dapat mencentang opsi "Sembunyikan nama saya dari publik (Anonim)" pada formulir donasi. Nama Anda tidak akan muncul pada daftar donatur terbuka, namun Anda tetap menerima kuitansi dan nomor pelacakan ke email pribadi.',
  },

  /* Program & Inisiatif */
  {
    id: 'faq-11',
    category: 'inisiatif',
    categoryLabel: 'Inisiatif & Program',
    question: 'Bagaimana Aurelia Foundation menyeleksi mitra komunitas di daerah?',
    answer:
      'Setiap calon mitra wajib melewati 5 lapis audit: legalitas akta notaris Kemenkumham, rekam jejak keuangan 3 tahun, uji integritas bebas benturan kepentingan, survei fisik lokasi oleh relawan kami, dan persetujuan komite audit independen.',
  },
  {
    id: 'faq-12',
    category: 'inisiatif',
    categoryLabel: 'Inisiatif & Program',
    question: 'Apa yang terjadi jika target donasi suatu inisiatif telah terpenuhi?',
    answer:
      'Inisiatif akan ditandai sebagai "Terdanai Penuh". Dana surplus yang masuk setelah batas kuota tercapai akan dialihkan ke posko tanggap darurat bencana atau program serupa dengan pemberitahuan tertulis kepada para donatur.',
  },
  {
    id: 'faq-13',
    category: 'inisiatif',
    categoryLabel: 'Inisiatif & Program',
    question: 'Berapa persen potongan biaya administrasi dari donasi saya?',
    answer:
      '0% dari donasi program publik dipotong untuk biaya administrasi. Seluruh biaya operasional kantor dan sistem didanai secara mandiri melalui dana abadi donor institusional dan pendiri yayasan.',
  },

  /* Relawan & Kemitraan */
  {
    id: 'faq-14',
    category: 'relawan',
    categoryLabel: 'Relawan & Kemitraan',
    question: 'Bagaimana cara bergabung sebagai relawan lapangan Aurelia?',
    answer:
      'Kunjungi menu Relawan, pilih keahlian Anda (medis, logistik, pengajar, teknik sipil, dsb.), dan isi formulir pendaftaran. Tim kami akan melakukan wawancara daring dan verifikasi latar belakang sebelum menugaskan Anda ke posko terdekat.',
  },
  {
    id: 'faq-15',
    category: 'relawan',
    categoryLabel: 'Relawan & Kemitraan',
    question: 'Apakah relawan mendapatkan asuransi dan perlengkapan penugasan?',
    answer:
      'Ya. Seluruh relawan yang ditugaskan ke wilayah operasi lapangan dibekali asuransi keselamatan kerja, rompi operasional resmi ber-ID badge, dan akomodasi selama masa pengabdian.',
  },
  {
    id: 'faq-16',
    category: 'relawan',
    categoryLabel: 'Relawan & Kemitraan',
    question: 'Apakah lembaga atau komunitas lokal bisa mengajukan inisiatif baru?',
    answer:
      'Bisa. Komunitas masyarakat dapat mengirimkan proposal inisiatif melalui portal kemitraan kami. Tim survei geologis dan sosial akan meninjau kelayakan lapangan dalam waktu 14 hari kerja.',
  },
  {
    id: 'faq-17',
    category: 'relawan',
    categoryLabel: 'Relawan & Kemitraan',
    question: 'Bagaimana jika saya hanya memiliki waktu luang di akhir pekan?',
    answer:
      'Kami menyediakan program relawan paruh waktu akhir pekan untuk kegiatan posko logistik perkotaan, pengemasan paket buku dan nutrisi, serta pendampingan kelas belajar daring anak pesisir.',
  },
];
