# Milestone M03 Phase 1: Visual Design Correction & Homepage Integration Report

**Project:** Portfolio Showcase (`bedi-hopewell`)  
**Client Brand:** Aurelia Foundation (*"Every dollar tracked. Every community verified."*)  
**Design Reference:** Hopewell Variant 2 ("Harbor / Field Journal") — `D:\GitHub\Sources\hopwell\theme2\`  
**Status:** Completed & Visually Verified via Playwright MCP  
**Date:** November 9, 2026  
**Parent Milestone:** M03 Phase 1 — Foundation Bootstrap  

---

## 1. Executive Summary

In direct response to Project Owner feedback, the homepage implementation has been upgraded from a technical foundation placeholder to a **faithful, pixel-perfect translation of Hopewell Variant 2 ("Harbor / Field Journal")** adapted to **Aurelia Foundation**.

All 10 structural content sections from the original source (`theme2/index.html`) have been ported to Next.js App Router syntax (`src/app/page.tsx`), reusing the complete original CSS stylesheet (`src/styles/theme2.css`), design tokens, and image compositions while eliminating legacy DOM defects.

---

## 2. Source Files Adapted & Created

| File | Type | Changes & Adaptation Details |
| :--- | :--- | :--- |
| `src/styles/theme2.css` | Stylesheet | Full port of `D:\GitHub\Sources\hopwell\theme2\assets\style.css` (59,536 bytes) with font bindings adapted to Next.js variable tokens (`var(--font-display)`, `var(--font-body)`, `var(--font-mono)`). |
| `src/styles/globals.css` | Stylesheet | Imports Bootstrap 5.3, Bootstrap Icons 1.11, and `theme2.css`, providing modal layering fixes. |
| `src/app/page.tsx` | Next.js Page | Complete implementation of all 10 Hopewell Variant 2 homepage sections with declarative React state and zero-throw event handling. |
| `src/lib/brand.ts` | Brand Constants | Centralized configuration for **Aurelia Foundation** (address, emergency desk, tracking number formats, social links). |
| `docs/reports/M03_PHASE_1_DESIGN_CORRECTION_REPORT.md` | Deliverable | This comprehensive visual verification report. |

---

## 3. Sections Implemented & Content Mapping

Every original section from `D:\GitHub\Sources\hopwell\theme2\index.html` was implemented with Aurelia Foundation brand messaging:

| Section ID | Original Hopewell Theme 2 Component | Aurelia Foundation Implementation Details |
| :--- | :--- | :--- |
| **`#mainNav`** | Sticky navigation with logo, nav links, and donate CTA | Responsive `.hj-nav` with Aurelia logo mark, interactive mobile hamburger drawer (`#hjNavToggle`), smooth scroll jump handlers, and high-contrast CTA. |
| **`#home`** | Editorial hero grid with route indicator and postmark | Dual-column layout with eyebrow (`Tracking No. AF-2026-04471`), `Every gift ships with proof of delivery` headline, route stop tracker, manifest photo card with stamped `Aurelia Verified` mark, and live counter chips. |
| **`#impact`** | Impact ledger with 4 animated counter items | Clean `.hj-ledger` band with IntersectionObserver counter animation: Meals Delivered (`184,000`), Water Access (`52,300`), Volunteer Hours (`3,800`), Direct Aid Deployed (`$2,400,000`). |
| **`#about`** | Chain of Custody story & collage | Photo collage with `13yrs Trusted Since 2013` badge, mission narrative, and 3-point checkmark list (Full transparency, Verified NGO partners, On-the-ground reach). |
| **`#causes`** | Open Manifests 6-postcard grid | 6 `.hj-postcard` items with category stamps (Nutrition, Clean Water, Education, Healthcare, Emergency Relief, Elder Care), target vs. raised amounts, direct donate buttons, and container-observed progress bars (`78%`, `55%`, `92%`, `41%`, `66%`, `34%`). |
| **`#why`** | The Fine Print 6-card feature grid | 6 feature cards: Transparent Donations, Verified NGOs, Secure Payments, Real-Time Impact, Tax Benefits, 24/7 Donor Support. |
| **`#how`** | The Journey 3-step workflow | Visual workflow steps: 01 Pick a cause, 02 Follow your donation, 03 See verified delivery. |
| **`#volunteers`** | Field ID badge cards with barcodes | 4 personnel ID cards with country badges (Kenya, Somalia, Guatemala, Global), portraits, role descriptions, social triggers, and monospace barcode prints. |
| **`#testimonials`**| Postcards From Donors quote cards | Dark field-ledger container (`--hj-ink`) with 5-star ratings, donor quotes, and verified profile cards. |
| **`#cta`** | Postmark banner callout | Stamped card: `Someone, somewhere, is waiting on the other side of your generosity.` with gold action button. |
| **`#contact`** | Send Us a Line office coordinates & form | Field office coordinates (450 Lexington Ave, NY), phone, email, and interactive form with HTML5 validation and stamped confirmation alert. |
| **`footer`** | Institutional 4-column footer | Brand mission, quick links, causes directory, newsletter signup, copyright, and legal routes (`/privacy-policy`, `/terms`, `/financial-reports`, `/faq`). |
| **`#hj-mobile-bar`**| Mobile sticky donate bar | Fixed bottom bar displaying on mobile screens (<768px). |
| **`#hj-scrolltop`** | Scroll to top button | Elevated button appearing after 420px scroll, triggering smooth window scroll to top. |
| **`#hjStoryModal`** | Video preview modal | Modal dialog loaded on "Watch Story" click. |

---

## 4. Visual Evidence & Screenshots

All screenshots were captured during live Playwright MCP evaluation of the production build:

### 4.1 Hero Section & Live Impact Ledger
*File:* [`docs/reports/screenshots/aurelia-homepage-hero.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/aurelia-homepage-hero.png)  
- **Visuals Verified:** Editorial headline in Fraunces serif, tracking number badge, route stops, manifest image card with stamp, and animated ledger counters (`184,000`, `52,300`, `3,800`, `$2,400,000`).

### 4.2 Open Manifests (Causes Grid) & Progress Bars
*File:* [`docs/reports/screenshots/aurelia-homepage-causes.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/aurelia-homepage-causes.png)  
- **Visuals Verified:** 6 postcard cards with category stamps, raised vs. goal figures, and gold progress tracks animated to exact percentages.

### 4.3 Field Volunteer ID Badges & Testimonials
*File:* [`docs/reports/screenshots/aurelia-homepage-volunteers.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/aurelia-homepage-volunteers.png)  
- **Visuals Verified:** Monospace barcodes, role badges, verified volunteer portraits, and dark testimonial cards.

### 4.4 Mobile Responsive Navigation Drawer (`375 × 667`)
*File:* [`docs/reports/screenshots/aurelia-homepage-mobile.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/aurelia-homepage-mobile.png)  
- **Visuals Verified:** Fixed floating navigation overlay matching original Hopewell Variant 2 mobile behavior.

---

## 5. Live Browser DOM & Behavioral Verification

```json
{
  "pageTitle": "Aurelia Foundation — Every dollar tracked. Every community verified.",
  "sectionsFound": {
    "home": true,
    "impact": true,
    "about": true,
    "causes": true,
    "why": true,
    "how": true,
    "volunteers": true,
    "testimonials": true,
    "cta": true,
    "contact": true
  },
  "counts": {
    "postcards": 6,
    "idCards": 4,
    "whyCards": 6,
    "howSteps": 3,
    "testiCards": 3,
    "totalImages": 15,
    "brokenImages": 0
  },
  "computedStyles": {
    "h1Font": "Fraunces, \"Fraunces Fallback\"",
    "bodyFont": "Inter, \"Inter Fallback\"",
    "bodyBg": "rgb(241, 237, 225)",
    "bodyColor": "rgb(22, 36, 29)"
  },
  "countersAfterScroll": [
    "184,000",
    "52,300",
    "3,800",
    "$2,400,000"
  ],
  "progressFillsAfterScroll": [
    "78%",
    "55%",
    "92%",
    "41%",
    "66%",
    "34%"
  ],
  "contactFormStatus": "Message stamped & sent — our operations desk will reply within 24 hours."
}
```

- **Browser Console Health:** **0 JavaScript runtime errors**, 0 warnings.
- **Production Build (`npm run build`):** Clean exit code 0; static bundle generation verified.

---

## 6. Compliance & Boundary Confirmations

- **Original Hopewell Source:** `D:\GitHub\Sources\hopwell` remains **completely untouched**.
- **Branding:** No Bedi or Bedi Hopewell references exist in the frontend UI.
- **Scope Discipline:** No Phase 2 datasets or subpages were prematurely implemented.
- **Git State:** Local repository remains clean on branch `main` with **zero commits or deployments**.

---

**STOPPING HERE.** Awaiting Project Owner visual review and formal authorization before proceeding to Phase 2.

