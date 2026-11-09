import { FinancialStatementRow, AuditReportDocument, AllocationBreakdown } from '@/types';

export const ALLOCATION_BREAKDOWN: AllocationBreakdown = {
  programServicesPct: 84, // 84% Penyaluran Program Garis Depan
  administrationPct: 10,  // 10% Operasional Posko & Logistik
  fundraisingPct: 6,      // 6% Tata Kelola, Audit & Verifikasi
};

export const INITIAL_FINANCIAL_STATEMENTS: FinancialStatementRow[] = [
  {
    year: 2025,
    totalRevenue: 24800000000,   // Rp 24,8 Miliar
    programSpend: 20832000000,   // Rp 20,8 Miliar
    adminSpend: 2480000000,      // Rp 2,4 Miliar
    fundraisingSpend: 1488000000, // Rp 1,4 Miliar
    efficiencyRatio: 84,
    growthRatePct: 20.9,
  },
  {
    year: 2024,
    totalRevenue: 20500000000,   // Rp 20,5 Miliar
    programSpend: 17220000000,   // Rp 17,2 Miliar
    adminSpend: 2050000000,      // Rp 2,0 Miliar
    fundraisingSpend: 1230000000, // Rp 1,2 Miliar
    efficiencyRatio: 84,
    growthRatePct: 22.0,
  },
  {
    year: 2023,
    totalRevenue: 16800000000,   // Rp 16,8 Miliar
    programSpend: 13944000000,   // Rp 13,9 Miliar
    adminSpend: 1848000000,      // Rp 1,8 Miliar
    fundraisingSpend: 1008000000, // Rp 1,0 Miliar
    efficiencyRatio: 83,
    growthRatePct: 34.4,
  },
  {
    year: 2022,
    totalRevenue: 12500000000,   // Rp 12,5 Miliar
    programSpend: 10250000000,   // Rp 10,2 Miliar
    adminSpend: 1500000000,      // Rp 1,5 Miliar
    fundraisingSpend: 750000000,  // Rp 0,7 Miliar
    efficiencyRatio: 82,
    growthRatePct: 40.2,
  },
];

export const INITIAL_AUDIT_DOCUMENTS: AuditReportDocument[] = [
  {
    id: 'doc-01',
    fiscalYear: 'FY2025',
    title: 'Laporan Keuangan Teraudit Lengkap & Buku Induk Dampak FY2025',
    documentType: 'Laporan Tahunan',
    fileFormat: 'PDF',
    fileSizeBytes: 2516582,
    fileSizeLabel: '2.4 MB',
    downloadUrl: '#',
  },
  {
    id: 'doc-02',
    fiscalYear: 'FY2025',
    title: 'Keterbukaan Informasi Publik: Pendapatan, Alokasi & Tata Kelola FY2025',
    documentType: 'Formulir Audit Publik',
    fileFormat: 'PDF',
    fileSizeBytes: 1153433,
    fileSizeLabel: '1.1 MB',
    downloadUrl: '#',
  },
  {
    id: 'doc-03',
    fiscalYear: 'FY2025',
    title: 'Opini Audit Wajar Tanpa Pengecualian (WTP) & Uji Pengendalian Internal',
    documentType: 'Surat Kepatuhan Akuntan',
    fileFormat: 'PDF',
    fileSizeBytes: 655360,
    fileSizeLabel: '640 KB',
    downloadUrl: '#',
  },
  {
    id: 'doc-04',
    fiscalYear: 'FY2022–24',
    title: 'Arsip Historis Multi-Tahun Laporan Pertanggungjawaban FY2022–2024',
    documentType: 'Arsip Historis',
    fileFormat: 'ZIP',
    fileSizeBytes: 7130316,
    fileSizeLabel: '6.8 MB',
    downloadUrl: '#',
  },
];
