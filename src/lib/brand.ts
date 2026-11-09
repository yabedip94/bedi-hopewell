/**
 * Centralized Brand Configuration for Aurelia Foundation.
 * All customer-facing titles, labels, footers, and metadata must reference this file.
 * Internal or repository names (such as "bedi-hopewell") must NEVER be exposed.
 */

export const BRAND_CONFIG = {
  name: 'Aurelia Foundation',
  shortName: 'Aurelia',
  tagline: 'Setiap kebaikan punya dampak. Setiap dampak punya bukti.',
  taglineEnglish: 'Every dollar tracked. Every community verified.',
  legalName: 'Yayasan Akuntabilitas Kemanusiaan Aurelia',
  foundedYear: 2022,
  licenseNumber: 'SK KEMENKUMHAM AHU-0019482.AH.01.04.TAHUN 2022 (SIMULASI/DEMO)',
  contact: {
    email: 'halo@aureliafoundation.org',
    phone: '+62 (21) 5088-9240',
    emergencyDesk: 'darurat@aureliafoundation.org',
    address: 'Menara Kompas Gramedia Lt. 14, Jl. Palmerah Selatan No. 22, Jakarta Pusat 10270',
    fieldPost: 'Posko Lapangan Mandiri 04: Jl. Teuku Umar No. 18, Banda Aceh & Palu',
  },
  social: {
    twitter: 'https://twitter.com/aureliafdn',
    linkedin: 'https://linkedin.com/company/aurelia-foundation',
    instagram: 'https://instagram.com/aureliafoundation',
    facebook: 'https://facebook.com/aureliafoundation',
    youtube: 'https://youtube.com/@aureliafoundation',
  },
  colors: {
    // Approved Palette A: Ocean Blue & Coral
    oceanNavy: '#173B4D',
    coral: '#F07859',
    warmIvory: '#F5F1E8',
    mistBlue: '#D7E6E7',
    warmGold: '#E7B85B',
    white: '#FFFFFF',
    line: '#CCD9DE',
    muted: '#567280',
  },
  fonts: {
    display: 'Fraunces, serif',
    body: 'Inter, sans-serif',
    mono: 'Space Mono, monospace',
  },
  categories: [
    'Pendidikan',
    'Kesehatan',
    'Bantuan Pangan',
    'Lingkungan',
    'Tanggap Bencana',
  ],
  meta: {
    defaultTitle: 'Aurelia Foundation — Setiap Kebaikan Punya Dampak. Setiap Dampak Punya Bukti.',
    titleTemplate: '%s | Aurelia Foundation',
    description:
      'Aurelia Foundation adalah yayasan inisiatif sosial independen dengan transparansi radikal. Setiap donasi tercatat dengan nomor manifest, alur penyaluran terverifikasi, dan laporan audit terbuka.',
    disclaimer:
      'Situs ini adalah showcase portofolio web development profesional. Seluruh data inisiatif, donasi, nomor pelacakan, dan laporan keuangan merupakan data simulasi (DEMO).',
  },
} as const;

export type BrandConfig = typeof BRAND_CONFIG;
