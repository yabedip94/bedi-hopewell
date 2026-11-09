# Functional Feature Specifications: `bedi-hopewell`

**Document:** Comprehensive Functional Requirements & Feature Contracts  
**Status:** Approved Specification  
**Version:** 1.0.0  
**Date:** November 9, 2026  
**Parent Milestone:** M02 — Technical Planning & Architecture  

---

## 1. Feature Catalog Overview

This document details the functional specifications for each component and user workflow across the **Public Institutional Site**, **Interactive Community Demos**, and **Simulated Admin Portal**.

```
┌────────────────────────────────────────────────────────┐
│                   FEATURE CATALOG                      │
├────────────────────────────────────────────────────────┤
│ FS-01: Editorial Field Journal Homepage                │
│ FS-02: Program Directory & Cause Progress Cards        │
│ FS-03: Field Dispatches & Sticky TOC Reader            │
│ FS-04: 4-Year Comparative Ledger & Allocation Bars     │
│ FS-05: Real-Time Searchable FAQ Accordion              │
│ FS-06: Interactive Donation Checkout Simulation        │
│ FS-07: Sustaining Membership Registration Flow         │
│ FS-08: Field Volunteer Enlistment Flow                 │
│ FS-09: Operations Portal & Transaction Ledger          │
└────────────────────────────────────────────────────────┘
```

---

## 2. Feature Specifications

### FS-01: Editorial Field Journal Homepage
* **Purpose:** Introduce the organization’s mandate, historical track record, verified open manifests, and community impact.
* **User Interaction:**
  - Visitor scrolls through editorial layout.
  - `#hjNavToggle` expands navigation drawer on mobile viewports.
  - Hovering over buttons (`.hj-btn`) triggers gold borders and arrow transitions.
  - Clicking "Donate Now" triggers smooth scroll to `#causes` or navigates to `/demo/donation`.
* **Input:** None (informational presentation).
* **Validation:** N/A.
* **State Changes:**
  - Window scroll elevation applies box-shadow to `.hj-nav`.
  - Impact counters animate from `0` to target numbers when `#impact` enters viewport.
* **Expected Output:** Fully responsive, zero-layout-shift visual presentation using Fraunces and Inter fonts with `#F1EDE1` canvas background.
* **Demo Limitations:** Video modal trigger `#hjStoryModal` loads a responsive preview player with local placeholder caption.
* **Acceptance Criteria:** Matches Hopewell Variant 2 visual structure with 0 console errors and clean mobile drawer toggle.

---

### FS-02: Program Directory & Cause Progress Cards
* **Purpose:** Display active field initiatives with real-time disbursement metrics and direct pledge actions.
* **User Interaction:**
  - Filter programs by category chips (All, Clean Water, Nutrition, Healthcare, Education, Emergency Relief).
  - Click on a card to navigate to `/programs/[slug]`.
* **Input:** Category chip click or text query input.
* **Validation:** Filter inputs are sanitized strings.
* **State Changes:**
  - `activeCategory` state updates; filtered program cards re-render.
  - `.hj-route-fill` progress tracks animate from `0%` to `data-progress` when card enters viewport.
* **Expected Output:** Grid of `.hj-postcard` elements displaying category stamp, progress percentage, raised vs. target amounts, and donor counts.
* **Demo Limitations:** Simulated progress based on local datasets.
* **Acceptance Criteria:** Observer reliably triggers progress bar animation without the zero-width deadlock identified in the original template.

---

### FS-03: Field Dispatches & Sticky TOC Reader (`/stories` & `/stories/[slug]`)
* **Purpose:** Provide an immersive long-form reading experience for field updates.
* **User Interaction:**
  - Browse article cards on `/stories`.
  - On `/stories/[slug]`, view author credentials, reading time estimate, and click sticky in-page TOC links (`#hjPostToc a`) to jump between article sections.
* **Input:** Dynamic route slug parameter.
* **Validation:** Slug matched against `stories` dataset; unmapped slug renders Next.js `notFound()`.
* **State Changes:**
  - Client hook `useScrollspy` observes heading visibility (`h2[id]`) and updates the active TOC indicator.
* **Expected Output:** Clean typography hierarchy with Fraunces headlines, reading progress indicator, and author biography.
* **Demo Limitations:** Comments section is simulated with local storage entries.
* **Acceptance Criteria:** TOC links highlight accurately during scroll without throw errors.

---

### FS-04: 4-Year Comparative Ledger & Allocation Bars (`/financial-reports`)
* **Purpose:** Full transparency into institutional revenue, program expenditures, and audit filings.
* **User Interaction:**
  - Inspect allocation percentage rows (Program Delivery 84%, Administration 10%, Fundraising 6%).
  - Review 4-year side-by-side comparative ledger table.
  - Click report download cards to download simulated audit PDFs.
* **Input:** None.
* **Validation:** N/A.
* **State Changes:**
  - Allocation bars animate dynamically on component mount/scroll into view.
* **Expected Output:** Monospace ledger figures formatted with currency separators; PDF cards trigger browser download of mock audit summary documents.
* **Demo Limitations:** Downloaded PDFs are client-generated mock summary reports.
* **Acceptance Criteria:** Allocation tracks expand smoothly from `0%` to target percentages (`84%`, `10%`, `6%`).

---

### FS-05: Real-Time Searchable FAQ Accordion (`/faq`)
* **Purpose:** Answer questions regarding fund security, tax deductions, and volunteering.
* **User Interaction:**
  - Type query into `#hjFaqSearch`.
  - Select category chip (`All`, `Donations`, `Tax Deductions`, `Account`, `Causes`, `Volunteering`).
  - Click accordion headers to expand/collapse answer panels.
* **Input:** Search query text (`string`), category filter selection (`string`).
* **Validation:** Input sanitized to lower-case string comparison.
* **State Changes:**
  - `searchQuery` and `activeCategory` states filter visible items; empty matches show `#hjFaqEmpty` message.
* **Expected Output:** Instantaneous item filtering (<16ms) without full page reload.
* **Demo Limitations:** Purely client-side text filtering.
* **Acceptance Criteria:** Exact replication of verified browser behavior from Milestone M02.1.2.

---

### FS-06: Interactive Donation Checkout Simulation (`/demo/donation`)
* **Purpose:** Showcase an intuitive contribution experience with real-time feedback.
* **User Interaction:**
  - Select preset amount (\$25, \$50, \$100, \$250) or type custom amount.
  - Choose frequency (One-Time or Monthly Sustaining).
  - Select target program allocation from dropdown.
  - Toggle optional dedication gift (In Honor Of / In Memory Of).
  - Submit simulated checkout.
* **Input:** Donor name, email, amount, payment method selection.
* **Validation:**
  - Amount must be a positive integer $\ge \$5$.
  - Donor name and valid email format required.
* **State Changes:**
  - Valid submission generates a unique transaction hash (`VRF-TX-XXXXX`).
  - Appends record to `localStorage` under `vrf_donations`.
  - Shifts UI to "Receipt Confirmed" state with printable summary.
* **Expected Output:** Instant confirmation screen displaying tax-deductible receipt, allocation breakdown, and printable certificate.
* **Demo Limitations:** No real credit card or bank funds are debited.
* **Acceptance Criteria:** Submissions persist locally and reflect immediately in the `/portal/donations` ledger.

---

### FS-07: Sustaining Membership Registration Flow (`/demo/membership`)
* **Purpose:** Enable donors to join recurring support circles.
* **User Interaction:**
  - Compare tiered membership tiers (Community Friend \$15/mo, Field Guardian \$50/mo, Trustee Circle \$150/mo).
  - Select tier, input member details, and generate digital membership pass.
* **Input:** Full name, email, billing interval (Monthly / Annual), tier selection.
* **Validation:** Name and email required; tier must be a valid enum.
* **State Changes:**
  - Record saved to `localStorage` under `vrf_members`.
  - Increments active member count in the portal.
* **Expected Output:** Renders customized digital membership card with ID barcode and tier badge.
* **Demo Limitations:** Simulated membership card.
* **Acceptance Criteria:** Newly created member appears in the `/portal/members` roster.

---

### FS-08: Field Volunteer Enlistment Flow (`/demo/volunteer`)
* **Purpose:** Onboard volunteers and capture skill taxonomy.
* **User Interaction:**
  - Step 1: Personal info & location.
  - Step 2: Skill checklist (Medical, Logistics, Translation, Teaching, Admin).
  - Step 3: Availability & emergency readiness toggle.
  - Step 4: Submission and credential badge.
* **Input:** Name, email, phone, location, skill array, availability option, emergency deployable boolean.
* **Validation:** All steps validated before advancing; at least one skill must be checked.
* **State Changes:**
  - Appends record to `localStorage` under `vrf_volunteers`.
  - Increments volunteer queue in `/portal/volunteers`.
* **Expected Output:** Confirmation screen with volunteer onboarding ID and orientation checklist.
* **Demo Limitations:** No background checks or external identity verification.
* **Acceptance Criteria:** Application appears as "Pending" in `/portal/volunteers`.

---

### FS-09: Operations Portal & Transaction Ledger (`/portal/*`)
* **Purpose:** Administrative oversight over incoming funds, volunteer allocations, and program deployments.
* **User Interaction:**
  - Navigate sidebar links (Dashboard, Programs, Members, Volunteers, Donations, Reports).
  - Filter transactions by date or program.
  - Click on volunteer row to view application modal and click "Approve / Deploy".
  - Click "Reset Demo Data" to restore initial baseline state.
* **Input:** Filter queries, approval action triggers.
* **Validation:** N/A.
* **State Changes:**
  - Volunteer status transitions from "Pending" to "Verified" or "Deployed".
  - Recalculates dashboard KPIs in real time.
* **Expected Output:** High-density, professional tabular view styled with the `.hj-*` aesthetic.
* **Demo Limitations:** Accessible without credentials for showcase review.
* **Acceptance Criteria:** Dynamic reactive updates on all data mutations.

