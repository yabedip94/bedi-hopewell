# Route Map & Navigation Specification: `bedi-hopewell`

**Document:** Canonical Route Map & Navigation Architecture  
**Status:** Approved Specification  
**Version:** 1.0.0  
**Date:** November 9, 2026  
**Parent Milestone:** M02 — Technical Planning & Architecture  

---

## 1. Route Map Overview & Structural Evaluation

To provide a cohesive, modern navigation structure while preserving 100% of the content from the original Hopewell Variant 2, the application is divided into three distinct functional route groups:
1. **Public Website (`(public)`):** Full institutional experience covering organization vision, programs, field dispatches, audited financials, and inquiries.
2. **Interactive Community Demos (`demo`):** Streamlined, distraction-free workflow shells allowing evaluators to test multi-step contribution and registration flows.
3. **Internal Operations Portal (`portal`):** Dedicated administrative console with a persistent sidebar, audit transaction tables, and volunteer queues.

---

## 2. Complete Route Directory

### 2.1 Public Website Routes (`src/app/(public)`)

| Path | Component File | Page Title | Rendering Strategy | Key Content & Interactive Elements |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `src/app/(public)/page.tsx` | Field Dispatches & Open Manifests | **RSC + Client Islands** | Hero with stamp mark, impact stats ledger, cause cards with progress tracks, mission collage, how it works, volunteer team, testimonials carousel, CTA banner, contact form. |
| `/about` | `src/app/(public)/about/page.tsx` | Our Mission & Charter | **RSC** | Founding story, four operational pillars (Nutrition, Water, Education, Healthcare), governance principles, executive leadership profiles, partner NGO map. |
| `/programs` | `src/app/(public)/programs/page.tsx` | Active Field Manifests | **RSC + Client Filter** | Program directory with category filter chips, search input, progress track cards, and direct donation triggers. |
| `/programs/[slug]` | `src/app/(public)/programs/[slug]/page.tsx` | Program Details & Allocation | **Dynamic RSC** | Detailed impact case, allocation ledger for this specific campaign, field updates timeline, gallery, related causes, and quick pledge widget. |
| `/stories` | `src/app/(public)/stories/page.tsx` | Field Dispatches & Stories | **RSC** | Editorial blog listing with featured hero dispatch, tag pills (Field, Water, Emergency), reading time badges, author avatars, and newsletter signup. |
| `/stories/[slug]` | `src/app/(public)/stories/[slug]/page.tsx` | Dispatch Article Detail | **Dynamic RSC + Client TOC** | Long-form dispatch with reading progress bar, in-page sticky table-of-contents (`#hjPostToc`), blockquotes, author biography, and social share triggers. |
| `/financial-reports` | `src/app/(public)/financial-reports/page.tsx` | Audited Financials & Ledger | **RSC + Client Bars** | Where every dollar travels allocation tracks, 4-year side-by-side comparative financial statement, category breakdown, downloadable audit PDF cards. |
| `/faq` | `src/app/(public)/faq/page.tsx` | Frequently Asked Questions | **Client Component** | Search input with live text filter, category filter chips (Donations, Tax, Account, Causes, Volunteering), accordion items, and direct support callout. |
| `/contact` | `src/app/(public)/contact/page.tsx` | Contact & Inquiries | **Client Component** | Field office contact coordinates, emergency hotline, press media desk, interactive contact form with instant validation feedback. |
| `/privacy-policy` | `src/app/(public)/privacy-policy/page.tsx` | Privacy Policy | **RSC + Client Scrollspy** | Full 13-clause institutional privacy disclosure with sticky sidebar TOC (`#hjToc`) observing clause scroll intersections. |
| `/terms` | `src/app/(public)/terms/page.tsx` | Terms & Conditions | **RSC + Client Scrollspy** | Full institutional terms of service with sticky sidebar TOC (`#hjToc`), dispute resolution, and donor rights charter. |

---

### 2.2 Interactive Demo Routes (`src/app/demo`)

These routes simulate core organizational community transactions with immediate feedback:

| Path | Component File | Page Title | Rendering Strategy | Workflow Highlights |
| :--- | :--- | :--- | :--- | :--- |
| `/demo/donation` | `src/app/demo/donation/page.tsx` | Make a Contribution | **Client Component** | Preset amount chips (\$25, \$50, \$100, \$250, custom), frequency toggle (One-time vs. Monthly), cause selector, dedication gift toggle, simulated checkout, and printable receipt. |
| `/demo/membership` | `src/app/demo/membership/page.tsx` | Become a Sustaining Member | **Client Component** | Tiered membership cards (Community Friend, Field Guardian, Trustee Circle), member benefits breakdown, billing cycle options, and membership pass generation. |
| `/demo/volunteer` | `src/app/demo/volunteer/page.tsx` | Volunteer Enlistment | **Client Component** | Multi-step application: personal details, skill taxonomy (Medical, Logistics, Translation, Teaching, Admin), availability matrix, emergency readiness toggle, and instant confirmation badge. |

---

### 2.3 Simulated Internal Portal Routes (`src/app/portal`)

The administrative portal allows evaluators to inspect how an organization oversees operations:

| Path | Component File | Page Title | Rendering Strategy | Core Capabilities |
| :--- | :--- | :--- | :--- | :--- |
| `/portal/dashboard` | `src/app/portal/dashboard/page.tsx` | Executive Dashboard | **Client Component** | Real-time KPI summary (Capital Deployed, Active Causes, Verified Donors, Volunteer Hours), quick action buttons, live ledger activity table. |
| `/portal/programs` | `src/app/portal/programs/page.tsx` | Program Management | **Client Component** | Program status ledger (Active, Fully Funded, In Review), budget consumption progress bars, edit budget modal, add manifest trigger. |
| `/portal/members` | `src/app/portal/members/page.tsx` | Member Roster | **Client Component** | Active recurring donor list, membership tier badges, renewal status, contact action, export CSV trigger. |
| `/portal/volunteers` | `src/app/portal/volunteers/page.tsx` | Volunteer Operations | **Client Component** | Applicant triage table, status tags (Pending, Verified, Deployed), skill filter, application detail modal, approval workflow. |
| `/portal/donations` | `src/app/portal/donations/page.tsx` | Transaction Audit Ledger | **Client Component** | Filterable transaction table (Date, Donor, Amount, Frequency, Program, Payment Method, TX Hash), receipt viewer modal, refund simulation. |
| `/portal/reports` | `src/app/portal/reports/page.tsx` | Financial & Impact Reports | **Client Component** | Annual audit report generator, allocation percentage recalculator, statement preview, simulated PDF/CSV export. |

---

## 3. Structural Route Evaluation & Design Decisions

### Evaluation 1: Consolidated Single-Page Sections vs. Multi-Page Architecture
- **Original Source Behavior:** The original template combined several sections onto `index.html` via hash anchors (`#about`, `#causes`, `#volunteers`, `#contact`), but also provided separate HTML pages for `blog.html`, `faq.html`, `financial-reports.html`, `privacy-policy.html`, and `terms-and-conditions.html`.
- **Architectural Decision:** **Hybrid Architecture.**
  - The Homepage retains the rich, seamless storytelling narrative with smooth scroll jump anchors (`/#causes`, `/#about`, `/#how`).
  - Standalone dedicated pages (`/about`, `/programs`, `/programs/[slug]`, `/stories`, `/financial-reports`, `/faq`, `/contact`) are established to provide canonical URLs, shareable links, and deep SEO indexing.

### Evaluation 2: Blog & Post Route Normalization
- **Original Source Inconsistency:** Variant 1 used `blog.html` and `post.html`, while Variant 2 used `blog.html` and `blog-post.html`.
- **Architectural Decision:** Standardized under `/stories` and `/stories/[slug]`. This aligns with the "Field Dispatches" branding of Variant 2.

### Evaluation 3: Legal Terms Route Canonicalization
- **Original Source Inconsistency:** Variant 1 named the file `terms-of-service.html`, while Variant 2 named it `terms-and-conditions.html`, causing broken footer links in the original.
- **Architectural Decision:** Standardized under `/terms`. In `next.config.ts`, a permanent redirect is added from `/terms-of-service` and `/terms-and-conditions` to `/terms`, ensuring no broken links can ever occur.

---

## 4. Navigation Menu & Footer Link Mapping

### Primary Public Navigation (`Navbar.tsx`)
```
[Brand Logo] -> Link to "/"
├── Home            -> Link to "/"
├── About           -> Link to "/about"
├── Programs        -> Link to "/programs"
├── Dispatches      -> Link to "/stories"
├── Financials      -> Link to "/financial-reports"
├── FAQ             -> Link to "/faq"
├── Contact         -> Link to "/contact"
└── [Donate Now CTA] -> Link to "/demo/donation" (High-contrast button)
```

### Public Footer Navigation (`Footer.tsx`)
- **Column 1 (Brand):** Institutional mission, audit trust badge, social media links.
- **Column 2 (Quick Links):** About Us, Active Manifests, How It Works, Verified Testimonials, Inquiries.
- **Column 3 (Programs by Cause):** Nutrition, Clean Water, Education, Healthcare, Emergency Relief, Elder Care (linking to `/programs`).
- **Column 4 (Disclosures & Portal):** Financial Reports (`/financial-reports`), FAQs (`/faq`), Privacy Policy (`/privacy-policy`), Terms of Service (`/terms`), **Admin Portal Preview (`/portal/dashboard`)**.

