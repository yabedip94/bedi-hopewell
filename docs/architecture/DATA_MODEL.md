# Data Model & TypeScript Contracts Specification: `bedi-hopewell`

**Document:** Domain Entities, TypeScript Interfaces & Storage Contracts  
**Status:** Approved Specification  
**Version:** 1.0.0  
**Date:** November 9, 2026  
**Parent Milestone:** M02 — Technical Planning & Architecture  

---

## 1. Domain Modeling Philosophy

The application utilizes strict TypeScript types located in `src/types/`. All models are decoupled from external backend engines, allowing the application to operate with zero-latency local execution while maintaining production-ready interface semantics.

```
┌────────────────────────────────────────────────────────┐
│               DOMAIN DATA ENTITIES                     │
├────────────────────┬───────────────────────────────────┤
│ Program            │ Field initiatives, budgets, goals │
│ Story (Dispatch)   │ Editorial field updates, authors  │
│ Member             │ Sustaining monthly donors         │
│ Volunteer          │ Field candidates, skill taxonomy  │
│ Donation           │ Contribution transactions         │
│ FinancialStatement │ 4-year audited financial rows     │
│ DashboardMetrics   │ Aggregated organizational KPIs    │
└────────────────────┴───────────────────────────────────┘
```

---

## 2. Core TypeScript Interfaces

### 2.1 Program (Field Initiative / Cause)
```typescript
export type ProgramCategory = 
  | 'nutrition' 
  | 'clean-water' 
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

export interface Program {
  id: string;
  slug: string;
  title: string;
  category: ProgramCategory;
  categoryLabel: string;
  summary: string;
  description: string;
  targetAmount: number;
  raisedAmount: number;
  donorsCount: number;
  status: ProgramStatus;
  location: {
    city: string;
    country: string;
    coordinates?: [number, number];
  };
  verifiedPartner: {
    name: string;
    ngoRegNumber: string;
    accreditationRating: string;
  };
  imageUrl: string;
  imageAlt: string;
  featured: boolean;
  updates: ProgramUpdate[];
}
```

### 2.2 Story / Field Dispatch
```typescript
export type StoryTag = 'Field Dispatch' | 'Water Well' | 'Clinic' | 'Audit' | 'Relief' | 'Education';

export interface StoryAuthor {
  name: string;
  role: string;
  avatarUrl: string;
}

export interface Story {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string; // Markdown or rich semantic HTML string
  category: string;
  tags: StoryTag[];
  author: StoryAuthor;
  imageUrl: string;
  imageAlt: string;
  publishedAt: string; // ISO 8601
  readTimeMinutes: number;
  featured: boolean;
  relatedProgramSlug?: string;
}
```

### 2.3 Donation Transaction
```typescript
export type DonationFrequency = 'one-time' | 'monthly';
export type PaymentMethodType = 'credit-card' | 'paypal' | 'apple-pay' | 'google-pay' | 'bank-transfer';
export type TransactionStatus = 'settled' | 'pending' | 'receipt-generated';

export interface Donation {
  id: string;
  txHash: string; // e.g. "VRF-TX-84920"
  donorName: string;
  donorEmail: string;
  amount: number;
  currency: 'USD';
  frequency: DonationFrequency;
  programId: string;
  programTitle: string;
  isAnonymous: boolean;
  dedication?: {
    dedicatedTo: string;
    dedicationType: 'in-honor' | 'in-memory';
    notificationEmail?: string;
  };
  paymentMethod: PaymentMethodType;
  status: TransactionStatus;
  createdAt: string; // ISO 8601
}
```

### 2.4 Sustaining Member
```typescript
export type MembershipTier = 'community-friend' | 'field-guardian' | 'trustee-circle';

export interface Member {
  id: string;
  name: string;
  email: string;
  tier: MembershipTier;
  tierLabel: string;
  amountPerInterval: number;
  interval: 'monthly' | 'annually';
  joinedAt: string; // ISO 8601
  status: 'active' | 'paused' | 'cancelled';
  totalContributedToDate: number;
  digitalPassId: string;
}
```

### 2.5 Volunteer Application
```typescript
export type VolunteerSkill = 
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
  availability: 'weekends' | 'part-time' | 'full-time' | 'on-call-emergency';
  emergencyDeployable: boolean;
  appliedAt: string; // ISO 8601
  status: VolunteerStatus;
  notes?: string;
}
```

### 2.6 Financial Statement & Audit Report
```typescript
export interface FinancialStatementRow {
  year: number; // e.g. 2025, 2024, 2023, 2022
  totalRevenue: number;
  programSpend: number;
  adminSpend: number;
  fundraisingSpend: number;
  efficiencyRatio: number; // e.g. 84 (representing 84%)
  growthRatePct: number;
}

export interface AuditReportDocument {
  id: string;
  fiscalYear: string;
  title: string;
  documentType: 'Annual Report' | 'IRS Form 990' | 'Audit Letter' | 'Historical Archive';
  fileFormat: 'PDF' | 'ZIP';
  fileSizeBytes: number;
  fileSizeLabel: string; // e.g. "2.4 MB"
  downloadUrl: string;
}
```

### 2.7 Portal Dashboard Metrics
```typescript
export interface DashboardMetrics {
  totalCapitalDeployed: number;
  activeProgramsCount: number;
  verifiedDonorsCount: number;
  volunteerHoursLogged: number;
  allocationBreakdown: {
    programServicesPct: number; // e.g. 84
    administrationPct: number;    // e.g. 10
    fundraisingPct: number;       // e.g. 6
  };
  recentDonations: Donation[];
  volunteerQueueCount: number;
}
```

---

## 3. Local Storage Schema & Synchronization Rules

All client-side persistence contracts utilize the `vrf_` namespace prefix (short for *Veritas Relief Foundation*) to prevent collision with other applications.

| LocalStorage Key | Data Type | Sync Trigger | Re-calculation Consequence |
| :--- | :--- | :--- | :--- |
| `vrf_donations` | `Donation[]` | On `/demo/donation` form completion | Appended to transaction ledger; increments `totalCapitalDeployed` and `verifiedDonorsCount` in portal dashboard. |
| `vrf_volunteers` | `Volunteer[]` | On `/demo/volunteer` form submission | Appended to volunteer triage queue; increments `volunteerQueueCount` on dashboard. |
| `vrf_members` | `Member[]` | On `/demo/membership` registration | Appended to member roster; increments recurring capital run-rate. |
| `vrf_metrics` | `DashboardMetrics` | Calculated dynamically from baseline + stored records | Real-time portal KPI updates. |

### Hydration & Fallback Rules
1. **SSR Safety:** Access to `localStorage` is guarded by `typeof window !== 'undefined'` checks.
2. **First-Load Seeding:** If `localStorage.getItem('vrf_donations')` returns `null`, the store initializes using the immutable seed data in `src/data/donations.ts`.
3. **Reset Capability:** An administrative action in `/portal/dashboard` ("Reset Demo Data") clears keys back to initial mock seeds.

