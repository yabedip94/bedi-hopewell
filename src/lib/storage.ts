/**
 * Local Storage Persistence Adapter for Aurelia Foundation
 * SSR-safe storage layer supporting interactive donation, membership, volunteer flows,
 * and the simulated administrative portal.
 */

import { Donation, Member, Volunteer, Program } from '@/types';
import { INITIAL_PROGRAMS } from '@/data/programs';

const STORAGE_KEYS = {
  DONATIONS: 'aurelia_donations',
  MEMBERS: 'aurelia_members',
  VOLUNTEERS: 'aurelia_volunteers',
  PROGRAMS: 'aurelia_programs',
} as const;

// Initial Mock Seed Data
export const SEED_DONATIONS: Donation[] = [
  {
    id: 'don-01',
    txHash: 'AF-TX-84920',
    donorName: 'Budi Pratama',
    donorEmail: 'budi.pratama@example.com',
    amount: 1500000,
    currency: 'IDR',
    frequency: 'one-time',
    programId: 'prg-01',
    programTitle: 'Paket Pangan Bergizi untuk 500 Siswa Terluar',
    isAnonymous: false,
    paymentMethod: 'qris',
    status: 'settled',
    createdAt: '2026-02-05T09:30:00Z',
  },
  {
    id: 'don-02',
    txHash: 'AF-TX-84921',
    donorName: 'Rachel Kuntoro',
    donorEmail: 'rachel.kuntoro@example.com',
    amount: 3000000,
    currency: 'IDR',
    frequency: 'monthly',
    programId: 'prg-02',
    programTitle: 'Sumur Bor Tenaga Surya untuk 12 Desa Kekeringan',
    isAnonymous: false,
    paymentMethod: 'bank-transfer',
    status: 'settled',
    createdAt: '2026-02-06T14:15:00Z',
  },
  {
    id: 'don-03',
    txHash: 'AF-TX-84922',
    donorName: 'Hendra Wijaya',
    donorEmail: 'hendra.w@example.com',
    amount: 500000,
    currency: 'IDR',
    frequency: 'one-time',
    programId: 'prg-03',
    programTitle: 'Buku Cerita & Perlengkapan Belajar 800 Siswa Pesisir',
    isAnonymous: false,
    paymentMethod: 'qris',
    status: 'settled',
    createdAt: '2026-02-07T11:20:00Z',
  },
  {
    id: 'don-04',
    txHash: 'AF-TX-84923',
    donorName: 'PT Nusantara Peduli',
    donorEmail: 'csr@nusantarapeduli.co.id',
    amount: 5000000,
    currency: 'IDR',
    frequency: 'one-time',
    programId: 'prg-05',
    programTitle: 'Dapur Darurat & Bantuan Logistik Pengungsi Erupsi',
    isAnonymous: false,
    paymentMethod: 'bank-transfer',
    status: 'settled',
    createdAt: '2026-02-08T08:45:00Z',
  },
  {
    id: 'don-05',
    txHash: 'AF-TX-84924',
    donorName: 'Hamba Allah',
    donorEmail: 'anonim@example.com',
    amount: 250000,
    currency: 'IDR',
    frequency: 'one-time',
    programId: 'prg-04',
    programTitle: 'Klinik Bergerak & Layanan Kesehatan Ibu Hamil Kepulauan',
    isAnonymous: true,
    paymentMethod: 'e-wallet',
    status: 'settled',
    createdAt: '2026-02-08T16:10:00Z',
  },
];

export const SEED_MEMBERS: Member[] = [
  {
    id: 'mem-01',
    name: 'Budi Pratama',
    email: 'budi.pratama@example.com',
    tier: 'sahabat-komunitas',
    tierLabel: 'Sahabat Komunitas',
    amountPerInterval: 150000,
    interval: 'monthly',
    joinedAt: '2025-11-01T00:00:00Z',
    status: 'active',
    totalContributedToDate: 600000,
    digitalPassId: 'AF-PASS-0914',
  },
  {
    id: 'mem-02',
    name: 'Rachel Kuntoro',
    email: 'rachel.kuntoro@example.com',
    tier: 'penjaga-lapangan',
    tierLabel: 'Penjaga Lapangan',
    amountPerInterval: 500000,
    interval: 'monthly',
    joinedAt: '2025-08-15T00:00:00Z',
    status: 'active',
    totalContributedToDate: 3500000,
    digitalPassId: 'AF-PASS-0422',
  },
  {
    id: 'mem-03',
    name: 'Dr. Hendrawan Soedirdjo',
    email: 'hendrawan.s@example.com',
    tier: 'lingkar-wali',
    tierLabel: 'Lingkar Wali Amanat',
    amountPerInterval: 2500000,
    interval: 'monthly',
    joinedAt: '2025-01-10T00:00:00Z',
    status: 'active',
    totalContributedToDate: 32500000,
    digitalPassId: 'AF-PASS-0105',
  },
];

export const SEED_VOLUNTEERS: Volunteer[] = [
  {
    id: 'vol-01',
    fullName: 'Nurul Hasanah, S.Pd.',
    email: 'nurul.hasanah@gmail.com',
    phone: '+62 812-3456-7890',
    location: 'Makassar, Sulawesi Selatan',
    skills: ['pendidikan', 'logistik'],
    availability: 'akhir-pekan',
    emergencyDeployable: false,
    appliedAt: '2026-01-15T10:00:00Z',
    status: 'verified',
    notes: 'Pengalaman 4 tahun mengajar di sekolah pesisir Selayar.',
  },
  {
    id: 'vol-02',
    fullName: 'dr. Aditya Pratama',
    email: 'aditya.med@gmail.com',
    phone: '+62 813-9876-5432',
    location: 'Kupang, Nusa Tenggara Timur',
    skills: ['medis'],
    availability: 'siaga-darurat',
    emergencyDeployable: true,
    appliedAt: '2026-01-20T14:30:00Z',
    status: 'deployed',
    notes: 'Dokter umum bersertifikasi ATLS & ACLS, siap penugasan tanggap bencana.',
  },
  {
    id: 'vol-03',
    fullName: 'Rian Ramadhan, S.T.',
    email: 'rian.civil@gmail.com',
    phone: '+62 856-7890-1234',
    location: 'Denpasar, Bali',
    skills: ['teknik-sipil', 'logistik'],
    availability: 'paruh-waktu',
    emergencyDeployable: true,
    appliedAt: '2026-02-01T09:15:00Z',
    status: 'verified',
    notes: 'Spesialis pemipaan dan instalasi penampungan air gravitasi.',
  },
];

// Helper: Check if client-side window is accessible
const isClient = (): boolean => typeof window !== 'undefined';

// Generic SSR-Safe LocalStorage Reader
export function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isClient()) return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error reading key "${key}" from localStorage:`, error);
    return defaultValue;
  }
}

// Generic SSR-Safe LocalStorage Writer
export function setStorageItem<T>(key: string, value: T): void {
  if (!isClient()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing key "${key}" to localStorage:`, error);
  }
}

// Ensure default seeds are present in localStorage
export function initializeStorageSeeds(): void {
  if (!isClient()) return;

  if (!window.localStorage.getItem(STORAGE_KEYS.DONATIONS)) {
    setStorageItem(STORAGE_KEYS.DONATIONS, SEED_DONATIONS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.MEMBERS)) {
    setStorageItem(STORAGE_KEYS.MEMBERS, SEED_MEMBERS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.VOLUNTEERS)) {
    setStorageItem(STORAGE_KEYS.VOLUNTEERS, SEED_VOLUNTEERS);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.PROGRAMS)) {
    setStorageItem(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
  }
}

/* --------------------------------------------------------------------------
   Donations Storage Operations
   -------------------------------------------------------------------------- */
export function getDonations(): Donation[] {
  return getStorageItem<Donation[]>(STORAGE_KEYS.DONATIONS, SEED_DONATIONS);
}

export function addDonation(data: {
  donorName: string;
  donorEmail: string;
  amount: number;
  frequency: Donation['frequency'];
  programId: string;
  programTitle: string;
  isAnonymous: boolean;
  paymentMethod: Donation['paymentMethod'];
  dedication?: Donation['dedication'];
}): Donation {
  const existing = getDonations();
  const txNumber = Math.floor(10000 + Math.random() * 90000);
  const newDonation: Donation = {
    id: `don-${Date.now()}`,
    txHash: `AF-TX-${txNumber}`,
    donorName: data.isAnonymous ? 'Hamba Allah' : data.donorName,
    donorEmail: data.donorEmail,
    amount: data.amount,
    currency: 'IDR',
    frequency: data.frequency,
    programId: data.programId,
    programTitle: data.programTitle,
    isAnonymous: data.isAnonymous,
    paymentMethod: data.paymentMethod,
    dedication: data.dedication,
    status: 'settled',
    createdAt: new Date().toISOString(),
  };

  const updated = [newDonation, ...existing];
  setStorageItem(STORAGE_KEYS.DONATIONS, updated);

  // Update program raised amount
  updateProgramRaised(data.programId, data.amount);

  return newDonation;
}

/* --------------------------------------------------------------------------
   Members Storage Operations
   -------------------------------------------------------------------------- */
export function getMembers(): Member[] {
  return getStorageItem<Member[]>(STORAGE_KEYS.MEMBERS, SEED_MEMBERS);
}

export function addMember(data: {
  name: string;
  email: string;
  tier: Member['tier'];
  tierLabel: string;
  amountPerInterval: number;
  interval: Member['interval'];
}): Member {
  const existing = getMembers();
  const passNumber = Math.floor(1000 + Math.random() * 9000);
  const newMember: Member = {
    id: `mem-${Date.now()}`,
    name: data.name,
    email: data.email,
    tier: data.tier,
    tierLabel: data.tierLabel,
    amountPerInterval: data.amountPerInterval,
    interval: data.interval,
    joinedAt: new Date().toISOString(),
    status: 'active',
    totalContributedToDate: data.amountPerInterval,
    digitalPassId: `AF-PASS-${passNumber}`,
  };

  const updated = [newMember, ...existing];
  setStorageItem(STORAGE_KEYS.MEMBERS, updated);
  return newMember;
}

/* --------------------------------------------------------------------------
   Volunteers Storage Operations
   -------------------------------------------------------------------------- */
export function getVolunteers(): Volunteer[] {
  return getStorageItem<Volunteer[]>(STORAGE_KEYS.VOLUNTEERS, SEED_VOLUNTEERS);
}

export function addVolunteer(data: {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  skills: Volunteer['skills'];
  availability: Volunteer['availability'];
  emergencyDeployable: boolean;
  notes?: string;
}): Volunteer {
  const existing = getVolunteers();
  const newVolunteer: Volunteer = {
    id: `vol-${Date.now()}`,
    fullName: data.fullName,
    email: data.email,
    phone: data.phone,
    location: data.location,
    skills: data.skills,
    availability: data.availability,
    emergencyDeployable: data.emergencyDeployable,
    appliedAt: new Date().toISOString(),
    status: 'pending',
    notes: data.notes,
  };

  const updated = [newVolunteer, ...existing];
  setStorageItem(STORAGE_KEYS.VOLUNTEERS, updated);
  return newVolunteer;
}

/* --------------------------------------------------------------------------
   Programs Storage Operations
   -------------------------------------------------------------------------- */
export function getPrograms(): Program[] {
  return getStorageItem<Program[]>(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
}

export function getProgramBySlug(slug: string): Program | undefined {
  const programs = getPrograms();
  return programs.find((p) => p.slug === slug);
}

function updateProgramRaised(programId: string, amount: number): void {
  const programs = getPrograms();
  const target = programs.find((p) => p.id === programId);
  if (target) {
    target.raisedAmount += amount;
    target.donorsCount += 1;
    target.progressPercentage = Math.min(
      100,
      Math.round((target.raisedAmount / target.targetAmount) * 100)
    );
    setStorageItem(STORAGE_KEYS.PROGRAMS, programs);
  }
}

/* --------------------------------------------------------------------------
   Demo Reset Handler
   -------------------------------------------------------------------------- */
export function resetDemoStorage(): void {
  if (!isClient()) return;
  setStorageItem(STORAGE_KEYS.DONATIONS, SEED_DONATIONS);
  setStorageItem(STORAGE_KEYS.MEMBERS, SEED_MEMBERS);
  setStorageItem(STORAGE_KEYS.VOLUNTEERS, SEED_VOLUNTEERS);
  setStorageItem(STORAGE_KEYS.PROGRAMS, INITIAL_PROGRAMS);
}

