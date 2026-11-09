# Technical Architecture Specification: `bedi-hopewell`

**Document:** System Architecture & Component Blueprint  
**Status:** Approved Specification  
**Version:** 1.0.0  
**Date:** November 9, 2026  
**Parent Milestone:** M02 — Technical Planning & Architecture  
**Authoritative References:** [`docs/reports/M02_SOURCE_INSPECTION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_SOURCE_INSPECTION_REPORT.md), [`docs/reports/M02_BROWSER_VERIFICATION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_BROWSER_VERIFICATION_REPORT.md)  

---

## 1. System Topology & Architecture Overview

The application utilizes the **Next.js App Router** paradigm, structured into three isolated route groups:
1. `(public)`: Public-facing institutional pages rendered primarily as **React Server Components (RSC)** with selective client hydration for interactive features.
2. `demo`: Interactive workflow simulations (Donations, Memberships, Volunteers) executed as **Client Components (`"use client"`)** with local storage synchronization.
3. `portal`: Internal operational dashboard and management views executing client-side state aggregation from mock datasets and user-generated local actions.

```
                                  BROWSER CLIENT
                                        │
                    ┌───────────────────┴───────────────────┐
                    ▼                                       ▼
           Server-Rendered HTML                     Interactive Workflows
          (RSC / SSR Data Flow)                     (Client State / CSR)
                    │                                       │
                    ├───────────────┐                       ├───────────────┐
                    ▼               ▼                       ▼               ▼
             (public) Routes   Portal Layout           Demo Flows     Portal Views
             • Homepage        • Sidebar Nav          • Donation      • KPIs
             • About           • Metric Stats         • Membership    • Ledger
             • Programs        • Action Triggers      • Volunteer     • Roster
             • Dispatches                                   │
             • Financials                                   ▼
                    │                              LocalStorage Sync
                    │                             (vrf_donations, etc.)
                    │                                       │
                    └───────────────────┬───────────────────┘
                                        ▼
                               STATIC DATA LAYER
                            (src/data/ TypeScript)
```

---

## 2. Route Groups & Layout Hierarchy

```
src/app/
├── layout.tsx                     -> Root application shell (HTML, Fonts, Metadata)
│
├── (public)/                      -> Route Group 1: Public Institutional Pages
│   ├── layout.tsx                 -> Public Header (Navbar with Brand & NavCTA) + Footer
│   ├── page.tsx                   -> Homepage (Hero, Ledger Stats, Postcards, About, How, Team, CTA, Contact)
│   ├── about/page.tsx             -> Organization story, charter, executive trustees
│   ├── programs/
│   │   ├── page.tsx               -> Programs directory (Nutrition, Water, Education, Healthcare, Relief)
│   │   └── [slug]/page.tsx        -> Dynamic program detail & direct donation callout
│   ├── stories/
│   │   ├── page.tsx               -> Field Dispatches listing & featured dispatch
│   │   └── [slug]/page.tsx        -> Single dispatch article with author bio & share triggers
│   ├── financial-reports/page.tsx -> 4-year comparative ledger, allocation bars, audit downloads
│   ├── faq/page.tsx               -> Searchable accordion with category chips
│   ├── contact/page.tsx           -> Contact form, field office directory, media desk
│   ├── privacy-policy/page.tsx    -> Legal privacy disclosures with sticky clause scrollspy
│   └── terms/page.tsx             -> Terms & conditions with sticky clause scrollspy
│
├── demo/                          -> Route Group 2: Interactive Community Demo Flows
│   ├── layout.tsx                 -> Minimal Demo Header (Back to Public, Step Indicators) + Support Banner
│   ├── donation/page.tsx          -> Multi-step simulated contribution checkout
│   ├── membership/page.tsx        -> Tiered donor circle membership enrollment
│   └── volunteer/page.tsx         -> Field volunteer application & skill onboarding
│
└── portal/                        -> Route Group 3: Simulated Institutional Admin Portal
    ├── layout.tsx                 -> Portal Layout (Collapsible Sidebar, Topbar with User, KPI alerts)
    ├── dashboard/page.tsx         -> Executive summary KPIs, recent gift ledger, activity chart
    ├── programs/page.tsx          -> Program deployment status, spend tracking, target metrics
    ├── members/page.tsx           -> Active supporters roster, contribution tier, status
    ├── volunteers/page.tsx        -> Pending applications queue & assignment modal
    ├── donations/page.tsx         -> Comprehensive transaction ledger with receipt print modal
    └── reports/page.tsx           -> Impact & financial statement generator with export options
```

---

## 3. Server vs. Client Component Boundaries

Next.js App Router promotes rendering on the server by default. Client components (`"use client"`) are strictly isolated to leaves of the component tree that require browser DOM access, event listeners, or local state.

### Server Components (RSC)
- `src/app/layout.tsx` (Root HTML, Google Fonts injection, SEO OpenGraph metadata).
- `src/app/(public)/layout.tsx` (Public header/footer shell).
- `src/app/(public)/page.tsx` (Static layout blocks, hero layout, mission narrative).
- `src/app/(public)/about/page.tsx` (Static charter, governance principles).
- `src/app/(public)/programs/page.tsx` and `programs/[slug]/page.tsx` (Program static content).
- `src/app/(public)/stories/page.tsx` and `stories/[slug]/page.tsx` (Article editorial copy).
- `src/app/(public)/financial-reports/page.tsx` (Static ledger tables and audit disclosure cards).

### Client Components (`"use client"`)
- `src/components/layout/Navbar.tsx` (Mobile drawer state toggle, active link detection, scroll elevation).
- `src/components/public/LedgerCounter.tsx` (Animated counter triggered by `IntersectionObserver`).
- `src/components/public/CauseProgressBar.tsx` (Dynamic track width expansion).
- `src/components/public/FaqAccordion.tsx` (Real-time category chip selection and full-text input filter).
- `src/components/public/ContactForm.tsx` (Form state, client-side validation, simulated dispatch).
- `src/components/public/ScrollToTop.tsx` (Scroll progress detection and window scroll execution).
- `src/components/public/ScrollspyToc.tsx` (Sticky table-of-contents observing heading intersections).
- `src/components/forms/DonationFlow.tsx` (Custom amount selection, dedication toggle, simulated payment).
- `src/components/forms/VolunteerForm.tsx` (Multi-step form, skill checkbox matrix, LocalStorage sync).
- `src/components/forms/MembershipForm.tsx` (Tier card selection, payment interval radio).
- `src/app/portal/*` (Dynamic data filtering, modal dialogs, status toggles, report downloads).

---

## 4. Styling Architecture & Bootstrap Integration

```
src/styles/
├── variables.css      -> :root CSS Custom Properties (--hj-ink, --hj-canvas, --hj-gold, typography)
├── bootstrap-custom.scss (or bootstrap.min.css) -> Core Bootstrap 5.3 grid & utility layer
├── globals.css        -> Base element styles, typography resets, smooth scroll
└── components/        -> Component-specific styling rules
    ├── navbar.css     -> .hj-nav, .hj-nav-links, .hj-nav-toggle
    ├── hero.css       -> .hj-hero, .hj-hero-grid, .hj-postmark
    ├── cards.css      -> .hj-postcard, .hj-ledger, .hj-route-card
    ├── ledger.css     -> .hj-ledger-table, .hj-alloc-panel, .hj-alloc-track
    └── portal.css     -> .portal-sidebar, .portal-card, .portal-table
```

### Style Integration Strategy
1. **CSS Variables First:** Global design tokens from Hopewell Variant 2 are defined at `:root` in `src/styles/variables.css`.
2. **Bootstrap Modular Utilities:** Bootstrap 5 is imported to provide the 12-column grid (`container`, `row`, `col-*`, `g-*`), flexbox utilities (`d-flex`, `align-items-center`, `justify-content-between`), and spacing helpers (`mb-*`, `p-*`, `py-*`).
3. **Namespaced Components:** All custom components maintain the original `.hj-*` prefix (e.g., `.hj-btn`, `.hj-card`, `.hj-badge`, `.hj-ledger-table`) to guarantee visual continuity.
4. **Zero Conflicting CSS Overrides:** No intrusive utility reset will override Bootstrap's flexbox or grid sizing.

---

## 5. Asset & Font Architecture

### Typography via `next/font/google`
Fonts are instantiated in `src/app/layout.tsx` using `next/font/google` with CSS variables:
```typescript
import { Fraunces, Inter, Space_Mono } from 'next/font/google';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

### Remote Image Configuration
Remote images utilized by the original Hopewell template reside on Unsplash and Magnific. In `next.config.ts`, remote patterns are strictly whitelisted:
```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img.magnific.com',
      },
    ],
  },
};

export default nextConfig;
```
For offline resilience, placeholder SVG illustrations are stored in `public/images/placeholders/` to serve as instant fallbacks if remote CDN requests encounter network delays.

---

## 6. State Management & Data Persistence

```
┌────────────────────────────────────────────────────────┐
│                   BROWSER CLIENT                      │
│                                                        │
│  [Donation Checkout]   [Volunteer Form]   [Membership] │
│          │                    │                │       │
│          ▼                    ▼                ▼       │
│   useState Handlers    useState Handlers   useState    │
│          │                    │                │       │
│          └────────────────────┼────────────────┘       │
│                               ▼                        │
│                     localStorage Adapter               │
│                   (src/lib/storage.ts)                 │
│                               │                        │
│          ┌────────────────────┴───────────────────┐    │
│          ▼                                        ▼    │
│  Key: vrf_donations                       Key: vrf_volunteers
│  Key: vrf_members                         Key: vrf_metrics
│          │                                        │    │
│          └────────────────────┬───────────────────┘    │
│                               ▼                        │
│                       Portal Dashboard                 │
│                      (Dynamic Re-calc)                 │
└────────────────────────────────────────────────────────┘
```

- **Persistence Helper (`src/lib/storage.ts`):** Safe window-checked helper functions (`getStorageItem<T>`, `setStorageItem<T>`) that gracefully handle SSR and fallback to default mock data during server pre-rendering.
- **Initial Seed Fallback:** If local storage is empty, the application reads the static baseline datasets from `src/data/`. When a user submits a donation or volunteer form, the item prepends to local storage, instantly reflecting in the portal ledger and dashboard metrics.

---

## 7. Defect Mitigation Architecture (Resolving Original Source Bugs)

As documented in [`M02_BROWSER_VERIFICATION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_BROWSER_VERIFICATION_REPORT.md), four severe defects existed in the original template. Next.js App Router resolves each through architectural design:

| Template Defect | Original Root Cause | Next.js Architectural Mitigation |
| :--- | :--- | :--- |
| **1. Unhandled Null `addEventListener`** | Monolithic `script.js` queried `#hjContactForm` on pages where it did not exist, crashing the script. | **Component Encapsulation:** Form logic is encapsulated in `ContactForm.tsx`. It only mounts on routes where the component is rendered. |
| **2. Broken `index-2.html` Navigation** | Logo & Home links in `theme2/` hardcoded to non-existent `index-2.html`. | **Canonical Next.js Links:** All navigation uses Next.js `<Link href="/">` or typed routes, ensuring 100% valid URL resolution. |
| **3. Dead `terms-of-service.html` Link** | Footer pointed to `terms-of-service.html` while the file was `terms-and-conditions.html`. | **Normalized Route:** Canonical `/terms` route mapped to clean page content with an automated redirect from `/terms-of-service`. |
| **4. Allocation Bar Observer Deadlock** | `.hj-alloc-fill` initial width was `0`, resulting in a `0` area that never satisfied `{ threshold: 0.3 }`. | **Container-Level Observer:** React hook `useIntersectionObserver` attaches to the parent card container with `{ threshold: 0.1 }` and triggers width state from `0%` to target percentage. |

---

## 8. Form Validation & User Feedback

1. **Client-Side Validation:**
   - HTML5 constraints (`required`, `type="email"`, `min`, `max`, `pattern`).
   - React state-managed field error messages displaying clear, accessible visual indicators (`.is-invalid` with `.invalid-feedback`).
2. **Accessible ARIA Feedback:**
   - Status messages render into container elements configured with `role="status"` and `aria-live="polite"`.
   - Submit buttons present disabled states with spinning loading indicators during simulated API delays.

---

## 9. Error Handling & Resilience Strategy

- **`not-found.tsx`:** Custom 404 error page adopting the editorial field-journal style, providing links back to active manifests and dispatches.
- **`error.tsx`:** Graceful error boundary component with a "Reset View" trigger to catch unexpected client-side runtime errors without breaking the entire page.
- **Image Error Fallback:** Custom Next.js Image wrapper (`SafeImage.tsx`) that automatically replaces broken remote image URLs with local SVG placeholder assets.

