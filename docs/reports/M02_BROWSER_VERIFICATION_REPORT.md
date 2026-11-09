# Task M02.1.2 — Hopewell Variant 2 Browser Verification Report

**Project:** Portfolio Showcase (`bedi-hopewell`)  
**Role:** Senior QA Automation Engineer  
**Target:** Original Hopewell Variant 2 (`D:\GitHub\Sources\hopwell\theme2`)  
**Execution Harness:** Playwright Headless Browser via Playwright MCP & Local HTTP Server (`http://localhost:4173/theme2/`)  
**Date:** November 9, 2026  
**Status:** Verification Complete — All Findings Backed by Actual Browser Execution  

---

## 1. Test Execution Architecture & Server Setup

### 1.1 Local Server Lifecycle
- **Server:** Python HTTP Server (`http.server`) bound to port `4173` serving `D:\GitHub\Sources\hopwell`.
- **Runtime:** Started via background task with network unblocked for local loopback; cleanly terminated post-inspection (`Task cancelled. Zero remaining background processes`).
- **Base URL:** `http://localhost:4173/theme2/`

### 1.2 Automation Stack
- **Browser Automation:** Playwright MCP (`browser_navigate`, `browser_evaluate`, `browser_resize`, `browser_take_screenshot`, `browser_console_messages`, `browser_network_requests`).
- **Inspection Viewports Tested:**
  - **Desktop:** `1280 × 800` px
  - **Tablet:** `768 × 1024` px
  - **Mobile:** `375 × 667` px

---

## 2. Test Execution Summary

| Test Area | Scope | Verification Status | Key Finding |
| :--- | :--- | :--- | :--- |
| **A. Homepage** | Render, Hero, Fonts, Images, Footer | **VERIFIED PASS** | Typography (`Fraunces` + `Inter`), 18 images loaded (0 broken), counters animated. |
| **B. Interior Pages** | 6 interior pages inspected | **VERIFIED WITH DEFECTS** | Unhandled `TypeError` on all 6 interior pages; broken links to non-existent `index-2.html`. |
| **C. Interactive Behaviors** | Navigation toggle, FAQ accordion, filters, contact form | **VERIFIED PASS** | FAQ search/filter functional; mobile drawer toggles; contact form validates and stamps. |
| **D. Responsive Behaviors** | Desktop, Tablet, Mobile breakpoints | **VERIFIED PASS** | Clean CSS grid collapse, sticky mobile bar active on `<768px`, desktop flex nav. |
| **E. Console & Network** | JS exceptions, 404s, failed network assets | **VERIFIED DEFECTS FOUND** | 2 distinct 404 broken routes (`index-2.html`, `terms-of-service.html`); 1 recurring fatal `TypeError`. |

---

## 3. Detailed Browser Test Evidence

### A. Homepage (`index.html`)

```
URL: http://localhost:4173/theme2/index.html
Page Title: "Hopewell — Track Every Gift, Home"
```

1. **Initial Rendering & Preloader:**
   - Preloader `#hj-preloader` begins visible, then receives `.hj-hide` class within 400ms after window load.
   - Verified state via DOM evaluation: `preloaderHidden: true`.
2. **Typography Verification:**
   - Body font computed: `Inter, sans-serif`
   - Heading (H1) font computed: `Fraunces, serif`
   - Canvas background color computed: `rgb(241, 237, 225)` (`#F1EDE1` paper canvas)
3. **Image Asset Integrity:**
   - Total images detected: `18`
   - Complete & natural width > 0: `18`
   - Broken images (`naturalWidth === 0`): `0` (100% remote Unsplash images loaded successfully)
4. **Animated Counters (`.hj-counter`):**
   - Verified before scroll: initial rendered text is `"0"`.
   - Scrolled into view at `#impact`: IntersectionObserver fired; counters animated smoothly over 1600ms to:
     - Goal: `184,000` (target 184000)
     - Goal: `52,300` (target 52300)
     - Goal: `3,800` (target 3800)
     - Goal: `2,400,000` (target 2400000)
5. **Cause Progress Tracks (`.hj-route-fill` inside `.hj-postcard`):**
   - Verified: Cards in Variant 2 are `.hj-postcard`. When scrolled into view, IntersectionObserver animates track fills to `78%`, `55%`, `92%`.

---

### B. Interior Pages Audit

Every interior page was loaded in Playwright, evaluated for DOM structure, link targets, and console health:

| Page URL | Title | HTTP Status | Console Errors | Fatal JS Exception |
| :--- | :--- | :--- | :--- | :--- |
| `theme2/blog.html` | Field Dispatches — Hopewell Blog | `200 OK` | `1 Error` | `TypeError: Cannot read properties of null (reading 'addEventListener')` at line 65 |
| `theme2/blog-post.html` | Inside a Water Well Build: 12 Villages, One Summer — Hopewell | `200 OK` | `1 Error` | `TypeError: Cannot read properties of null (reading 'addEventListener')` at line 65 |
| `theme2/faq.html` | FAQs — Hopewell | `200 OK` | `1 Error` | `TypeError: Cannot read properties of null (reading 'addEventListener')` at line 65 |
| `theme2/financial-reports.html` | Financial Reports — Hopewell | `200 OK` | `1 Error` | `TypeError: Cannot read properties of null (reading 'addEventListener')` at line 65 |
| `theme2/privacy-policy.html` | Privacy Policy — Hopewell | `200 OK` | `1 Error` | `TypeError: Cannot read properties of null (reading 'addEventListener')` at line 65 |
| `theme2/terms-and-conditions.html` | Terms & Conditions — Hopewell | `200 OK` | `1 Error` | `TypeError: Cannot read properties of null (reading 'addEventListener')` at line 65 |

---

### C. Interactive Behavior Verification

1. **Navigation Drawer Toggle (Mobile & Tablet):**
   - At viewport `375 × 667`, `.hj-nav-toggle` is visible (`display: block`).
   - Initial state: `.hj-nav-links` does not have `.hj-open` (`initialOpen: false`).
   - Click `#hjNavToggle`: `.hj-open` added (`openAfterClick: true`).
   - Click link inside menu: `.hj-open` immediately removed (`openAfterLinkClick: false`).
2. **FAQ Accordion & Full-Text Search (`faq.html`):**
   - **Accordion Toggle:** Clicking question button `.hj-faq-q` toggles `aria-expanded` from `"true"` to `"false"` and hides the answer div (`display: none`). Clicking again toggles it open.
   - **Category Chips:** Clicking chip `data-filter="volunteering"` hides groups `donations`, `tax`, `account`, and `causes`, leaving only `volunteering` visible.
   - **Search Filter:** Typing `"receipt"` into `#hjFaqSearch` dynamically evaluates all 17 items; 14 non-matching items receive `.hj-hidden`, leaving exactly 3 visible items.
3. **Contact Form Validation & Submission (`index.html`):**
   - **Empty Submission:** Clicking submit triggers HTML5 `checkValidity()` failure; browser halts submission and no status message is rendered.
   - **Valid Submission:** Providing valid inputs stamps the confirmation message:  
     `"Message stamped & sent — we'll reply within 24 hours."`  
     into `#hjFormStatus` and resets form input fields to empty.

---

### D. Critical Defects & Browser-Confirmed Bugs

#### Defect 1: Fatal JavaScript Runtime Crash on All Interior Pages
- **Severity:** High / Architectural Bug
- **Browser Console Output:**
  ```
  TypeError: Cannot read properties of null (reading 'addEventListener')
      at HTMLDocument.<anonymous> (http://localhost:4173/theme2/assets/script.js:65:8)
  ```
- **Evidence:** Line 65 of `theme2/assets/script.js` attempts:
  ```javascript
  var form = document.getElementById('hjContactForm');
  form.addEventListener('submit', function (e) { ... });
  ```
  `#hjContactForm` **only exists on `index.html`**. On every interior page (`blog.html`, `blog-post.html`, `faq.html`, `financial-reports.html`, `privacy-policy.html`, `terms-and-conditions.html`), `form` is `null`. The unhandled exception halts all subsequent scripts inside the `DOMContentLoaded` block.

#### Defect 2: Broken Navigation to Non-Existent `index-2.html`
- **Severity:** High / Broken Navigation
- **Network Log:** `[GET] http://localhost:4173/theme2/index-2.html => [404] File not found`
- **Evidence:** In `blog.html`, `blog-post.html`, `faq.html`, `financial-reports.html`, `privacy-policy.html`, and `terms-and-conditions.html`, the navbar logo (`.hj-logo`) and "Home" links contain `href="index-2.html"`. Clicking them returns HTTP 404.

#### Defect 3: Broken Footer Link to `terms-of-service.html`
- **Severity:** Medium / Dead Link
- **Network Log:** `[GET] http://localhost:4173/theme2/terms-of-service.html => [404] File not found`
- **Evidence:** In `theme2/index.html` (line 610), the footer link points to `terms-of-service.html`, but the file is named `terms-and-conditions.html`.

#### Defect 4: Financial Reports Allocation Bar Zero-Width Observer Deadlock
- **Severity:** Medium / Visual Defect
- **Behavior:** In `financial-reports.html`, `.hj-alloc-fill` bars remain at `width: ""` despite scrolling into center viewport.
- **Root Cause Verified in Browser:** Initial CSS sets `width: 0`. An element with width 0 has a bounding box area of 0, yielding an intersection ratio of `0`. The script attaches an `IntersectionObserver` with `{ threshold: 0.3 }`. Because the element has 0 area, its intersection ratio can never reach `0.3`, meaning the animation trigger **never fires**.

---

## 4. Visual Evidence & Artifacts

The following browser screenshots were captured during test execution and are preserved in `docs/reports/screenshots/`:

1. **Desktop Homepage (`1280 × 800`):**  
   [`docs/reports/screenshots/theme2-homepage-desktop.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/theme2-homepage-desktop.png)  
   *Verified: Editorial hero layout, Fraunces serif headings, live impact stats.*
2. **Mobile Navigation Overlay (`375 × 667`):**  
   [`docs/reports/screenshots/theme2-homepage-mobile.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/theme2-homepage-mobile.png)  
   *Verified: Hamburger button triggers full-width floating menu drawer.*
3. **FAQ Search Filter in Action (`1280 × 800`):**  
   [`docs/reports/screenshots/theme2-faq-search.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/theme2-faq-search.png)  
   *Verified: Dynamic client-side filtering displaying matching questions for query "receipt".*
4. **404 Broken Link Error Page:**  
   [`docs/reports/screenshots/theme2-broken-404.png`](file:///D:/GitHub/bedi-hopewell/docs/reports/screenshots/theme2-broken-404.png)  
   *Verified: Actual browser rendering of 404 when following template's internal `terms-of-service.html` link.*

---

## 5. Limitations & Items Not Verified

- **Video Playback in Modal:** The video iframe in `#hjStoryModal` was not verified for media streaming playback because the template uses a demo placeholder. Marked **NOT VERIFIED**.
- **Netlify/Formspree Live Submission:** Contact form was verified for client-side HTML5 validation, DOM event cancellation, and status DOM injection; external mail relay endpoints are unconfigured in the raw template and were not tested.

---

## 6. Architecture & Implementation Takeaways

1. **Do Not Port Raw Imperative Scripts:** The recurring `TypeError` on all 6 interior pages proves that raw vanilla JS scripts with brittle element queries must be entirely eliminated. Next.js components must use isolated React hooks (`useState`, `useEffect`) scoped to individual components.
2. **Route Normalization:** Standardize route paths:
   - Homepage: `/`
   - Terms: `/terms` (mapping to `terms-and-conditions.html` content)
   - Dispatches: `/stories` and `/stories/[slug]` (mapping to `blog.html` and `blog-post.html`)
3. **Fix IntersectionObserver Logic:** For progress and allocation bars, use threshold `0` or trigger animations based on container visibility rather than 0-width child elements.
4. **Remote Image Strategy:** Configure `remotePatterns` for `images.unsplash.com` in `next.config.ts` while implementing local SVG fallbacks.

---

*Report certified by Senior QA Automation Engineer. Browser verification completed, temporary server terminated, and workspace clean.*

