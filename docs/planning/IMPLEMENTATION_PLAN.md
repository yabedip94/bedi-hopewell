# Milestone M03: Implementation & Execution Plan

**Document:** Ordered Engineering Roadmap & Defect Mitigation Plan  
**Status:** Approved Specification  
**Version:** 1.0.0  
**Date:** November 9, 2026  
**Parent Milestone:** M02 — Technical Planning & Architecture  
**Authoritative References:** [`docs/reports/M02_SOURCE_INSPECTION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_SOURCE_INSPECTION_REPORT.md), [`docs/reports/M02_BROWSER_VERIFICATION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_BROWSER_VERIFICATION_REPORT.md)  

---

## 1. Engineering Roadmap & Phase Breakdown

The transition into **Milestone M03** executes a phased, risk-mitigated implementation sequence designed to establish the project foundation, preserve 100% of the **Hopewell Variant 2** design character, and resolve all defects discovered during verification.

```
┌────────────────────────────────────────────────────────────────────────┐
│                   M03 IMPLEMENTATION PHASES                            │
├───────────────┬────────────────────────┬───────────────────────────────┤
│ PHASE 1       │ Foundation & Bootstrap │ Next.js 15, TypeScript,       │
│               │                        │ Bootstrap 5, Fonts, Tokens    │
├───────────────┼────────────────────────┼───────────────────────────────┤
│ PHASE 2       │ Data Layer & Types     │ Domain types, mock datasets,  │
│               │                        │ localStorage sync adapter     │
├───────────────┼────────────────────────┼───────────────────────────────┤
│ PHASE 3       │ Shared UI Components   │ Navbar, Footer, SafeImage,    │
│               │                        │ Counter, Progress, ScrollTop  │
├───────────────┼────────────────────────┼───────────────────────────────┤
│ PHASE 4       │ Public Website Views   │ Homepage, About, Programs,    │
│               │                        │ Dispatches, Financials, FAQ   │
├───────────────┼────────────────────────┼───────────────────────────────┤
│ PHASE 5       │ Interactive Demos      │ Donation checkout, Member     │
│               │                        │ pass, Volunteer onboarding    │
├───────────────┼────────────────────────┼───────────────────────────────┤
│ PHASE 6       │ Operations Portal      │ KPI Dashboard, Ledgers,       │
│               │                        │ Volunteer triage, PDF export  │
├───────────────┼────────────────────────┼───────────────────────────────┤
│ PHASE 7       │ QA & Verification      │ Playwright cross-device test, │
│               │                        │ zero console error sign-off   │
└───────────────┴────────────────────────┴───────────────────────────────┘
```

---

## 2. Detailed Phase Specifications

### Phase 1: Foundation Bootstrap & Styling Architecture
1. **Initialize Project Infrastructure:**
   - Configure `package.json` with `next@^15`, `react@^19`, `react-dom@^19`, `typescript`, `bootstrap@^5.3.3`, `bootstrap-icons@^1.11.3`.
   - Setup `tsconfig.json` with strict mode, `@/*` path aliases, and modern module resolution.
   - Setup `next.config.ts` with whitelisted image domains (`images.unsplash.com`, `img.magnific.com`) and route redirects.
2. **Typography Configuration:**
   - Configure `next/font/google` in `src/app/layout.tsx` for `Fraunces`, `Inter`, and `Space_Mono` with CSS variable bindings.
3. **Design Tokens Porting:**
   - Create `src/styles/variables.css` porting all verified `:root` variables from `theme2/assets/style.css` (`--hj-ink`, `--hj-canvas`, `--hj-gold`, `--hj-stamp`, `--hj-line`).
   - Create `src/styles/globals.css` with base resets, smooth scrolling, and Bootstrap import.

### Phase 2: Domain Data Layer & Local Persistence
1. **TypeScript Interfaces:**
   - Create `src/types/index.ts` defining `Program`, `Story`, `Donation`, `Member`, `Volunteer`, `FinancialStatementRow`, and `DashboardMetrics`.
2. **Curated Mock Datasets (`src/data/`):**
   - `programs.ts`: 6 verified field initiatives with categories, targets, and progress ratios.
   - `stories.ts`: 4 editorial dispatches with reading times, tags, and author profiles.
   - `financials.ts`: 4-year audited statement ledger rows matching verified template figures.
   - `faqs.ts`: 17 categorized Q&A items across the 5 verified chips.
   - `team.ts`: 4 leadership profiles with social handles.
3. **Storage Adapter:**
   - Create `src/lib/storage.ts` with SSR-safe `getStorageItem` / `setStorageItem` utilities and default seeding logic.

### Phase 3: Shared Core UI Components
1. **`src/components/layout/Navbar.tsx`:**
   - Responsive navbar implementing the custom toggle drawer on mobile (<991px) and inline flex on desktop (1280px).
   - Clean route highlights and high-contrast "Donate Now" CTA.
2. **`src/components/layout/Footer.tsx`:**
   - 4-column editorial footer with institutional disclosures, canonical route links, and Portal entry point.
3. **`src/components/shared/SafeImage.tsx`:**
   - Next.js Image wrapper with fallback to local SVG placeholders on remote load failure.
4. **`src/components/public/LedgerCounter.tsx`:**
   - IntersectionObserver animated counter formatting with commas.
5. **`src/components/public/CauseProgressBar.tsx`:**
   - Container-observed width animation resolving the original template zero-width deadlock.
6. **`src/components/public/ScrollToTop.tsx`:**
   - Window scroll position tracker triggering smooth scroll to top.

### Phase 4: Public Website Implementation
1. **Homepage (`src/app/(public)/page.tsx`):**
   - Assemble Hero with postmark stamp, impact ledger band, cause postcard grid, mission collage, how it works, team grid, testimonials carousel, CTA banner, and contact form.
2. **About Page (`src/app/(public)/about/page.tsx`):**
   - Charter, governance principles, partner NGO verification details.
3. **Programs Directory (`src/app/(public)/programs/`):**
   - Listing view with category filter chips and dynamic slug detail view (`[slug]/page.tsx`).
4. **Dispatches (`src/app/(public)/stories/`):**
   - Editorial listing view and long-form article view (`[slug]/page.tsx`) with sticky TOC scrollspy.
5. **Financial Reports (`src/app/(public)/financial-reports/page.tsx`):**
   - Allocation bars, 4-year side-by-side ledger table, downloadable audit PDF cards.
6. **Searchable FAQ (`src/app/(public)/faq/page.tsx`):**
   - Real-time text search query input and category chips.
7. **Contact (`src/app/(public)/contact/page.tsx`):**
   - Form with client-side validation and simulated confirmation status.
8. **Legal Disclosures (`/privacy-policy` and `/terms`):**
   - Full 13-clause documents with sticky scrollspy TOC.

### Phase 5: Interactive Community Demo Flows
1. **Donation Checkout (`src/app/demo/donation/page.tsx`):**
   - Preset chips, custom input, frequency selector, dedications, simulated payment, LocalStorage sync, printable receipt.
2. **Membership Registration (`src/app/demo/membership/page.tsx`):**
   - Tier comparison cards, billing interval, digital membership pass generation.
3. **Volunteer Enlistment (`src/app/demo/volunteer/page.tsx`):**
   - Multi-step wizard, skill taxonomy checkboxes, emergency deployment toggle, confirmation badge.

### Phase 6: Simulated Administrative Portal
1. **Portal Layout (`src/app/portal/layout.tsx`):**
   - Collapsible administrative sidebar, topbar with user avatar, quick actions.
2. **Dashboard (`src/app/portal/dashboard/page.tsx`):**
   - Real-time aggregated KPI cards, recent transaction stream, reset demo data trigger.
3. **Ledger & Operations Views (`/portal/donations`, `/portal/volunteers`, `/portal/programs`):**
   - High-density data tables, status filters, action modals.

### Phase 7: QA Regression & Playwright Automation
1. **Playwright Cross-Viewport Suite:**
   - Execute automated checks on Desktop (1280px), Tablet (768px), and Mobile (375px).
2. **Zero Console Error Verification:**
   - Verify zero unhandled exceptions across all public, demo, and portal routes.

---

## 3. Explicit Source Defect Mitigation Matrix

| Ref # | Defect Discovered in Source Inspection | Technical Root Cause | M03 Mitigation Strategy | Verified Acceptance Target |
| :--- | :--- | :--- | :--- | :--- |
| **DEF-01** | Fatal `TypeError` on all 6 interior pages in original template. | `theme2/assets/script.js` line 65 attached submit listener to `#hjContactForm` unconditionally. | **Component Encapsulation:** Move form handler into isolated `ContactForm.tsx`. Never execute page-specific query selectors globally. | **0 console errors** on all routes during browser verification. |
| **DEF-02** | Broken `index-2.html` navigation links. | Original template subpages hardcoded logo and Home links to `index-2.html` (404). | **Canonical Link Architecture:** All home links use Next.js `<Link href="/">`. | Logo clicks always resolve to HTTP 200 homepage. |
| **DEF-03** | Broken `terms-of-service.html` footer link. | Footer linked to `terms-of-service.html` but file was `terms-and-conditions.html` (404). | **Route Canonicalization & Redirect:** Canonical route is `/terms`. Add Next.js redirect from `/terms-of-service` and `/terms-and-conditions`. | Footer terms link returns HTTP 200 without broken links. |
| **DEF-04** | Allocation bar animation deadlock in `financial-reports.html`. | `.hj-alloc-fill` initial width was 0, creating a zero-area element that never satisfied `{ threshold: 0.3 }`. | **Container-Level Observer:** Attach IntersectionObserver to parent `.hj-alloc-row` or use `{ threshold: 0 }` to trigger width transition from 0% to target. | Allocation bars smoothly expand to 84%, 10%, and 6% upon viewport entry. |

---

## 4. Technical Risks & Guardrails

1. **Brand Leakage Risk:**  
   *Guardrail:* Global search before build ensuring neither "Bedi" nor "Bedi Hopewell" appears in customer-facing titles, headings, metadata, or UI text.
2. **CSS Specificity Clashes:**  
   *Guardrail:* Ensure Bootstrap imports do not override custom `.hj-*` variables by loading `variables.css` first, followed by Bootstrap, followed by `.hj-*` component styles.
3. **Hydration Mismatches on Storage Reads:**  
   *Guardrail:* Initialize state with default mock seeds during SSR, and update with `localStorage` records inside `useEffect` on client mount.

