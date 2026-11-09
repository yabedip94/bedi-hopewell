# Project Brief: Organizational Web Showcase (`bedi-hopewell`)

**Document:** Project Brief & Product Blueprint  
**Status:** Approved Specification  
**Version:** 1.0.0  
**Date:** November 9, 2026  
**Repository:** `bedi-hopewell` (GitHub Workspace)  
**Parent Milestone:** M02 — Technical Planning & Architecture  

---

## 1. Executive Summary & Purpose

The **bedi-hopewell** project is an enterprise-grade web development showcase engineered to demonstrate advanced full-stack capabilities in building institutional websites, non-profit portals, and social accountability platforms.

The primary showcase deliverable is a production-quality web application featuring:
1. **Public-Facing Editorial Experience:** A transparent, field-journal non-profit website based on **Hopewell Variant 2 ("Harbor / Field Journal")** design tokens, typography, and layout.
2. **Interactive Community Demo Flows:** High-fidelity simulated workflows for online donations, recurring memberships, and volunteer enlistment.
3. **Internal Operational Portal Preview:** A simulated administrative dashboard displaying key performance indicators (KPIs), fund allocation ledgers, program monitoring, and volunteer/donor rosters.

> [!IMPORTANT]
> **Repository Name vs. Client Identity:**  
> `bedi-hopewell` is strictly the GitHub repository and internal project code name. It **must never** appear in customer-facing titles, headings, navigation, or brand assets. The application is built with a decoupled brand architecture that currently utilizes the placeholder organizational identity **Veritas Relief Foundation** (*"Every dollar tracked. Every community verified."*) pending final project-owner sign-off.

---

## 2. Product Scope & Functional Pillars

```
┌────────────────────────────────────────────────────────────────────────┐
│               ORGANIZATIONAL SHOWCASE PLATFORM                         │
├──────────────────────────┬─────────────────────────┬───────────────────┤
│    1. PUBLIC WEBSITE     │     2. DEMO FLOWS       │  3. ADMIN PORTAL  │
│       (Public SSR)       │      (Client CSR)       │   (Simulated App) │
├──────────────────────────┼─────────────────────────┼───────────────────┤
│ • Field Journal Homepage │ • Interactive Donation  │ • KPI Dashboard   │
│ • About & Governance     │ • Membership Enrollment │ • Program Control │
│ • Programs & Detail View │ • Volunteer Application │ • Member Roster   │
│ • Dispatches (Blog/Post) │ • Real-time Calculation │ • Volunteer Queue │
│ • 4-Year Ledger Reports  │ • Form Validation       │ • Audit Ledger    │
│ • Filterable FAQ & Search│ • LocalStorage Sync     │ • Report Export   │
│ • Contact & Verification │ • Instant Confirmation  │ • Metric Recalc   │
└──────────────────────────┴─────────────────────────┴───────────────────┘
```

### Pillar 1: Public Website Experience
- Presents the mission, field achievements, audited accountability records, and public dispatches of the organization.
- Adopts the exact visual character of **Hopewell Variant 2**, utilizing `Fraunces` serif display headlines, `Inter` body text, and `Space Mono` ledger metadata.
- Implements accessible, responsive navigation, categorized live-search FAQ, and comprehensive disclosures.

### Pillar 2: Interactive Demo Experience
- High-fidelity simulated donor and volunteer interactions allowing prospective partners or clients to test real-world user flows:
  - **Donation Flow:** Custom amount presets, allocation tags, frequency (one-time vs. monthly), anonymous toggle, dedications, and simulated checkout.
  - **Membership Flow:** Tiered donor circles (Friend, Guardian, Trustee), recurring billing interval, and member benefits preview.
  - **Volunteer Enlistment Flow:** Skill selection, availability schedule, emergency deployment consent, and immediate application confirmation.

### Pillar 3: Administrative Portal Experience
- A clean, cohesive administrative interface allowing evaluators to preview how an institution tracks its funds and operations:
  - **Dashboard:** Real-time KPI summaries (Total Capital Deployed, Active Field Programs, Verified Donors, Volunteer Hours).
  - **Ledger & Audit Views:** Transaction logs, allocation ratio gauges, and audit report generation.
  - **Program Management:** Status tracking, budget consumption vs. target, and community impact counts.

---

## 3. User Roles & Personas

| Role | Context | Access Scope | Key Objectives |
| :--- | :--- | :--- | :--- |
| **Public Visitor / Prospective Donor** | Evaluates non-profit credibility, impact metrics, and governance. | All public routes (`/`, `/about`, `/programs`, `/stories`, `/financial-reports`, `/faq`, `/contact`). | Inspect program transparency, verify audited allocation ratios, browse dispatches. |
| **Active Donor / Supporter** | Tests interactive contribution flows. | Demo interactive routes (`/demo/donation`, `/demo/membership`). | Simulate making a contribution, dedicating a gift, or enrolling in monthly membership. |
| **Volunteer Candidate** | Seeks field or operational involvement. | Demo volunteer route (`/demo/volunteer`). | Register credentials, select program categories, submit availability. |
| **Operations Administrator (Simulated)** | Institutional staff reviewing backend controls. | Portal routes (`/portal/*`). | Monitor real-time KPIs, review volunteer submissions, inspect ledger transactions. |

---

## 4. Functional Boundaries & Simulated Operations

To ensure clarity for evaluators and engineers, all operations are cleanly divided into verifiable presentation logic vs. mock simulation:

### What Is Real & Functional
- **Complete Next.js App Router Architecture:** Server-rendered public pages, SEO metadata, dynamic routing for programs and stories.
- **Client-Side State Management:** Local React state and `LocalStorage` persistence for submitted donations, volunteer applications, and portal metrics.
- **Form Validation & User Feedback:** Field-level validation, accessible ARIA alerts, and dynamic visual progress tracking.
- **Responsive Layout & Visuals:** Pixel-perfect adaptation of Hopewell Variant 2 tokens across desktop (1280px), tablet (768px), and mobile (375px).

### What Is Simulated (Mock Boundaries)
- **Financial Transactions:** No live payment gateway (Stripe/PayPal/Razorpay) is integrated. All checkout submissions simulate a successful transaction with mock transaction IDs (e.g., `VRF-TX-84920`).
- **Authentication:** Portal routes are simulated for frictionless evaluator inspection without requiring real OAuth/credentials. A demo session is maintained in local state.
- **Data Persistence:** Submissions persist in browser `LocalStorage` and sync with in-memory demo datasets; no external cloud SQL/NoSQL database is required for the MVP showcase.
- **Email Relays:** Contact and application forms simulate message dispatch and log entries to local session stores rather than triggering real SMTP transport.

---

## 5. Non-Goals

1. **No External Payment Gateway Processing:** Real credit card charging, banking APIs, and PCI-DSS compliance are intentionally out of scope.
2. **No Multi-Tenant Database Infrastructure:** No external Supabase, Firebase, or PostgreSQL instances are configured for initial milestone phases.
3. **No Heavy CMS Headless Backends:** Content for dispatches and programs is served directly from typed, structured local TypeScript datasets (`src/data/`) to guarantee instantaneous local execution and zero external API failure risks.
4. **No Arbitrary Redesign:** The visual language must strictly conform to Hopewell Variant 2 (`.hj-*` class semantics, Fraunces serif, Inter, Space Mono, paper canvas palette).

---

## 6. Project References

- **Inspection Report:** [`docs/reports/M02_SOURCE_INSPECTION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_SOURCE_INSPECTION_REPORT.md)
- **Browser Verification Report:** [`docs/reports/M02_BROWSER_VERIFICATION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_BROWSER_VERIFICATION_REPORT.md)
- **Technical Architecture:** [`docs/architecture/ARCHITECTURE.md`](file:///D:/GitHub/bedi-hopewell/docs/architecture/ARCHITECTURE.md)
- **Route Specification:** [`docs/architecture/ROUTE_MAP.md`](file:///D:/GitHub/bedi-hopewell/docs/architecture/ROUTE_MAP.md)
- **Data Models:** [`docs/architecture/DATA_MODEL.md`](file:///D:/GitHub/bedi-hopewell/docs/architecture/DATA_MODEL.md)

