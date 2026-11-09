/**
 * Domain Type Definitions for Aurelia Foundation
 * Centralized TypeScript contracts for all programs, dispatches, transactions,
 * members, volunteers, and operational metrics.
 */

/* --------------------------------------------------------------------------
   Program / Field Initiative Contracts
   -------------------------------------------------------------------------- */
export type ProgramCategory =
  | 'pendidikan'
  | 'kesehatan'
  | 'bantuan-pangan'
  | 'lingkungan'
  | 'tanggap-bencana'
  | 'clean-water'
  | 'nutrition'
  | 'education'
  | 'healthcare'
  | 'emergency-relief'
  | 'elder-care';

export type ProgramStatus = 'active' | 'fully-funded' | 'in-review' | 'emergency-priority';

export interface ProgramUpdate {
  date: string;
  headline: string;
  body: string;
  verifiedBy: string;
}

export interface ProgramLocation {
  city: string;
  province?: string;
  country: string;
  region: string;
  coordinates?: [number, number];
}

export interface VerifiedPartner {
  name: string;
  ngoRegNumber: string;
  accreditationRating: string;
  verificationDate: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: ProgramCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  targetAmount: number; // In IDR (Rp) or USD
  raisedAmount: number;
  donorsCount: number;
  status: ProgramStatus;
  location: ProgramLocation;
  verifiedPartner: VerifiedPartner;
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  progressPercentage: number;
  updates: ProgramUpdate[];
}

/* --------------------------------------------------------------------------
   Story / Field Dispatch Contracts
   -------------------------------------------------------------------------- */
export type StoryTag =
  | 'Laporan Lapangan'
  | 'Air Bersih'
  | 'Klinik Medis'
  | 'Audit Tahunan'
  | 'Tanggap Bencana'
  | 'Pendidikan'
  | 'Field Dispatch'
  | 'Water Well'
  | 'Medical Clinic'
  | 'Annual Audit'
  | 'Emergency Relief'
  | 'Education';

export interface StoryAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface StorySection {
  id: string;
  title: string;
  content: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: string;
  tags: StoryTag[];
  author: StoryAuthor;
  imageUrl: string;
  imageAlt: string;
  publishedAt: string; // ISO 8601 string
  readTimeMinutes: number;
  featured: boolean;
  relatedProgramSlug?: string;
  sections: StorySection[];
}

/* --------------------------------------------------------------------------
   Donation Transaction Contracts
   -------------------------------------------------------------------------- */
export type DonationFrequency = 'one-time' | 'monthly';
export type PaymentMethodType =
  | 'qris'
  | 'bank-transfer'
  | 'e-wallet'
  | 'credit-card'
  | 'paypal'
  | 'apple-pay'
  | 'google-pay';
export type TransactionStatus = 'settled' | 'pending' | 'receipt-generated';

export interface DedicationInfo {
  dedicatedTo: string;
  dedicationType: 'in-honor' | 'in-memory';
  notificationEmail?: string;
  personalMessage?: string;
}

export interface Donation {
  id: string;
  txHash: string; // e.g., "AF-TX-84920"
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: 'IDR' | 'USD';
  frequency: DonationFrequency;
  programId: string;
  programTitle: string;
  isAnonymous: boolean;
  dedication?: DedicationInfo;
  paymentMethod: PaymentMethodType;
  status: TransactionStatus;
  createdAt: string; // ISO 8601 string
}

/* --------------------------------------------------------------------------
   Sustaining Member Contracts
   -------------------------------------------------------------------------- */
export type MembershipTier = 'sahabat-komunitas' | 'penjaga-lapangan' | 'lingkar-wali' | 'community-friend' | 'field-guardian' | 'trustee-circle';

export interface Member {
  id: string;
  name: string;
  email: string;
  tier: MembershipTier;
  tierLabel: string;
  amountPerInterval: number;
  interval: 'monthly' | 'annually';
  joinedAt: string; // ISO 8601 string
  status: 'active' | 'paused' | 'cancelled';
  totalContributedToDate: number;
  digitalPassId: string;
}

/* --------------------------------------------------------------------------
   Volunteer Application Contracts
   -------------------------------------------------------------------------- */
export type VolunteerSkill =
  | 'medis'
  | 'logistik'
  | 'penerjemah'
  | 'teknik-sipil'
  | 'pendidikan'
  | 'konseling-krisis'
  | 'administrasi'
  | 'medical'
  | 'logistics'
  | 'translation'
  | 'civil-engineering'
  | 'education'
  | 'crisis-counseling'
  | 'administration';

export type VolunteerStatus = 'pending' | 'verified' | 'deployed' | 'alumni';

export interface Volunteer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: VolunteerSkill[];
  availability: 'akhir-pekan' | 'paruh-waktu' | 'penuh-waktu' | 'siaga-darurat' | 'weekends' | 'part-time' | 'full-time' | 'on-call-emergency';
  emergencyDeployable: boolean;
  appliedAt: string; // ISO 8601 string
  status: VolunteerStatus;
  notes?: string;
}

/* --------------------------------------------------------------------------
   Financial Statement & Audit Report Contracts
   -------------------------------------------------------------------------- */
export interface FinancialStatementRow {
  year: number;
  totalRevenue: number;
  programSpend: number;
  adminSpend: number;
  fundraisingSpend: number;
  efficiencyRatio: number; // e.g. 84 for 84%
  growthRatePct: number;
}

export interface AuditReportDocument {
  id: string;
  fiscalYear: string;
  title: string;
  documentType: 'Laporan Tahunan' | 'Formulir Audit Publik' | 'Surat Kepatuhan Akuntan' | 'Arsip Historis' | 'Annual Report' | 'IRS Form 990' | 'Audit Letter' | 'Historical Archive';
  fileFormat: 'PDF' | 'ZIP';
  fileSizeBytes: number;
  fileSizeLabel: string;
  downloadUrl: string;
}

/* --------------------------------------------------------------------------
   FAQ Contracts
   -------------------------------------------------------------------------- */
export type FaqCategory = 'donasi' | 'pajak' | 'verifikasi' | 'inisiatif' | 'relawan' | 'donations' | 'tax' | 'account' | 'causes' | 'volunteering';

export interface FaqItem {
  id: string;
  category: FaqCategory;
  categoryLabel: string;
  question: string;
  answer: string;
}

/* --------------------------------------------------------------------------
   Team / Leadership Contracts
   -------------------------------------------------------------------------- */
export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  social: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

/* --------------------------------------------------------------------------
   Dashboard & Analytics Contracts
   -------------------------------------------------------------------------- */
export interface AllocationBreakdown {
  programServicesPct: number; // e.g. 84%
  administrationPct: number;  // e.g. 10%
  fundraisingPct: number;     // e.g. 6%
}

export interface DashboardMetrics {
  totalCapitalDeployed: number;
  activeProgramsCount: number;
  verifiedDonorsCount: number;
  volunteerHoursLogged: number;
  allocationBreakdown: AllocationBreakdown;
  recentDonations: Donation[];
  volunteerQueueCount: number;
}
