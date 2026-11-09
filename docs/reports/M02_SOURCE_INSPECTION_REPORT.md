# Task M02.1 — Original Template Source Inspection & Architecture Analysis Report

**Project:** Portfolio Showcase (`bedi-hopewell`)  
**Role:** Senior Frontend Engineer & Technical Architect  
**Inspection Target:** External Source Reference at `D:\GitHub\Sources\hopwell`  
**Workspace:** `D:\GitHub\bedi-hopewell`  
**Status:** Completed — Read-Only Inspection  
**Date:** November 9, 2026  

---

## Executive Summary

A comprehensive read-only technical inspection of the external Hopewell template (`D:\GitHub\Sources\hopwell`) was conducted to evaluate its architecture, dependencies, asset structure, interactive components, responsive mechanics, and potential risks before initiating Next.js implementation.

All source files are strictly retained outside the repository. No source files were copied, modified, or deleted. No application code, dependencies, or commits were created.

---

## 1. External Source Verification & Accessibility

### Verification Checklist
- **Path Verified:** `D:\GitHub\Sources\hopwell` — **EXISTS & ACCESSIBLE**
- **Documentation Access:** `D:\GitHub\Sources\hopwell\README.md` — **ACCESSIBLE**
- **Variant 2 Access:** `D:\GitHub\Sources\hopwell\theme2/` — **ACCESSIBLE**
- **Assets Access:** `D:\GitHub\Sources\hopwell\assets/` and `theme2/assets/` — **ACCESSIBLE**
- **Template Documentation Access:** `D:\GitHub\Sources\hopwell\document/index.html` — **ACCESSIBLE**
- **Archive Status:** Root contains `hopewell-v1.0.0.zip` (8,199,059 bytes) intact.

### Actual Directory Structure (`D:\GitHub\Sources\hopwell`)

```
D:\GitHub\Sources\hopwell\
├── assets/
│   ├── .DS_Store
│   ├── bootstrap.bundle.min.js      (80,496 bytes)
│   ├── bootstrap.min.css            (232,111 bytes)
│   ├── hand-heart.png               (1,517 bytes)
│   ├── script.js                    (10,918 bytes)
│   └── style.css                    (46,808 bytes)
├── document/
│   ├── .DS_Store
│   └── index.html                   (39,204 bytes)
├── theme2/
│   ├── assets/
│   │   ├── bootstrap.bundle.min.js  (80,496 bytes)
│   │   ├── bootstrap.min.css        (232,111 bytes)
│   │   ├── script.js                (7,582 bytes)
│   │   └── style.css                (59,479 bytes)
│   ├── .DS_Store
│   ├── blog-post.html               (20,153 bytes)
│   ├── blog.html                    (18,905 bytes)
│   ├── faq.html                     (19,947 bytes)
│   ├── financial-reports.html       (19,510 bytes)
│   ├── index.html                   (36,218 bytes)
│   ├── privacy-policy.html          (17,949 bytes)
│   └── terms-and-conditions.html    (17,544 bytes)
├── banner.png                       (1,571,612 bytes)
├── blog.html                        (19,735 bytes)
├── faq.html                         (26,341 bytes)
├── financial-reports.html           (18,480 bytes)
├── hopewell-charity-landing.html    (28,037 bytes)
├── hopewell-v1.0.0.zip              (8,199,059 bytes)
├── index.html                       (39,626 bytes)
├── post.html                        (20,881 bytes)
├── privacy-policy.html              (17,043 bytes)
├── README.md                        (674 bytes)
├── style1.png                       (3,826,563 bytes)
├── style2.png                       (2,618,011 bytes)
└── terms-of-service.html            (19,183 bytes)
```

---

## 2. Browser Inspection & Playwright MCP Findings

### Browser Execution Summary
1. **Local File Protocol (`file://`):**
   - Playwright MCP invocation attempted navigation to `file:///D:/GitHub/Sources/hopwell/theme2/index.html`.
   - Result: Playwright security policy explicitly blocks access to the `file:` protocol (`Error: Access to "file:" protocol is blocked`).
2. **Official Hosted Demo URL (`https://themewagon.github.io/hopewell/`):**
   - Navigated using Playwright MCP to `https://themewagon.github.io/hopewell/` and `https://themewagon.github.io/hopewell/theme2/`.
   - Result: Returned **HTTP 404 (Site not found · GitHub Pages)**.
3. **Environment Security Constraint:**
   - Under standard sandbox isolation on Windows, processes outside the sandbox cannot attach to ad-hoc local servers bound inside the sandbox. In strict accordance with project rules (*"If the browser cannot open the local HTML files, report the limitation. Do not modify the original template to make it work"*), the template files were not modified, nor were unauthorized network workarounds forced.
4. **Deep Static DOM & Behavioral Analysis:**
   - A full static DOM evaluation was conducted across all 15 HTML files, 4 CSS stylesheets, and 2 JavaScript engines, tracing exact selector hierarchies, event handlers, layout styles, and responsive CSS rules.

---

## 3. Comparison of Variants (Variant 1 vs. Variant 2)

| Dimension | Variant 1 (Root / "Sunrise") | Variant 2 (`theme2/` / "Harbor / Field Journal") |
| :--- | :--- | :--- |
| **Design Concept** | Contemporary clean non-profit charity | Editorial field ledger / dispatch manifest aesthetic |
| **Headings Font** | `Poppins` (Geometric Sans, weights 400–800) | `Fraunces` (Editorial Serif, weights 500–700) |
| **Body Font** | `Nunito Sans` (Rounded clean sans, weights 400–700) | `Inter` (Humanist neutral sans, weights 400–800) |
| **Accent / Monospace** | None | `Space Mono` (Data ledgers, timestamps, IDs) |
| **Color Palette** | `--clr-primary: #16a34a` (green)<br>`--clr-secondary: #f59e0b` (amber)<br>`--clr-accent: #ef4444` (red)<br>`--clr-bg: #f8fafc` | `--hj-ink: #16241D` (ledger green-black)<br>`--hj-canvas: #F1EDE1` (paper canvas)<br>`--hj-gold: #C4922B` (manifest gold)<br>`--hj-stamp: #B8472E` (clay postmark) |
| **CSS Naming Scheme** | Custom BEM-like with `.hw-` prefix (e.g., `.btn-hw-primary`, `.navbar-hw`, `.cause-card`) | Consistent `.hj-` namespace prefix (e.g., `.hj-btn`, `.hj-nav`, `.hj-card`, `.hj-ledger`) |
| **Navigation System** | Standard Bootstrap 5 collapse component | Custom vanilla JavaScript toggle with fixed floating mobile overlay (`.hj-nav-links.hj-open`) |
| **Hero Style** | Soft curved hero with mouse-follow dynamic radial glow | Newspaper-style editorial hero grid with stamp badge (`.hj-postmark`) |
| **Impact Section** | 4-column counter cards with pill background | Ledger stats grid (`.hj-ledger`) with monospace metrics |
| **Causes Section** | Standard 3-column card grid with percentage progress bar | Route cards (`.hj-route-card`) with progress line and manifest styling |
| **Financial Reports** | Donut circular allocation chart (`.allocation-ring`) | Side-by-side comparative ledger table (`.hj-ledger-table`) & category allocation bars |
| **FAQ System** | Bootstrap accordion wrapped in category containers | Custom accordion logic with category chips and live full-text search |
| **Subpage Naming** | `post.html`, `terms-of-service.html` | `blog-post.html`, `terms-and-conditions.html` |

---

## 4. Technical Findings & Code Audit

### 4.1 Complete HTML Inventory
- **Variant 1 (Root):**
  1. `index.html` (Homepage: Hero, Impact, About, Causes, Why, How, Volunteers, Testimonials, CTA, Contact, Footer)
  2. `hopewell-charity-landing.html` (Template showcase landing page comparing both variants)
  3. `blog.html` (Blog listing with featured post and standard cards)
  4. `post.html` (Single blog article with share buttons, author bio, in-page TOC, comments demo)
  5. `faq.html` (Categorized FAQ accordion with search input)
  6. `financial-reports.html` (Donut allocation visual, audited report download rows)
  7. `privacy-policy.html` (Sticky TOC sidebar, legal text sections)
  8. `terms-of-service.html` (Sticky TOC sidebar, terms clauses)
  9. `document/index.html` (Template technical documentation)
- **Variant 2 (`theme2/`):**
  1. `theme2/index.html` (Homepage: Harbor editorial dispatch layout)
  2. `theme2/blog.html` (Editorial blog listing with grid layout)
  3. `theme2/blog-post.html` (Editorial long-form dispatch with mini TOC and sticky quote)
  4. `theme2/faq.html` (Searchable FAQ ledger with category chips)
  5. `theme2/financial-reports.html` (Ledger table, allocation bars, annual PDF cards)
  6. `theme2/privacy-policy.html` (Legal dispatch layout with sticky clause scrollspy)
  7. `theme2/terms-and-conditions.html` (Terms clauses with scrollspy navigation)

### 4.2 Critical Defects Discovered in Original Source

> [!WARNING]
> The original external template contains notable broken links and unhandled JavaScript runtime exceptions that must be resolved during React/Next.js migration.

1. **Broken Internal Links in Variant 2 (`theme2`):**
   - **`index-2.html` Reference:** In `theme2/blog-post.html`, `theme2/blog.html`, `theme2/faq.html`, `theme2/financial-reports.html`, `theme2/privacy-policy.html`, and `theme2/terms-and-conditions.html`, the brand logo and Home navigation links point to `index-2.html`. **`index-2.html` does not exist**; the actual homepage is `index.html`.
   - **Mismatched Terms Link:** In `theme2/index.html` (line 610), the footer links to `terms-of-service.html`, but the file is named `terms-and-conditions.html`.
2. **Unhandled JavaScript Runtime Exception on Interior Pages:**
   - In **Variant 1** (`assets/script.js`, lines 147–157):
     ```javascript
     var form = document.getElementById('contactForm');
     form.addEventListener('submit', function (e) { ... });
     ```
     `#contactForm` exists **only on `index.html`**. On all other pages (`blog.html`, `faq.html`, `financial-reports.html`, `post.html`, etc.), `form` is `null`, throwing an unhandled `TypeError: Cannot read properties of null (reading 'addEventListener')` which crashes subsequent scripts.
   - In **Variant 2** (`theme2/assets/script.js`, lines 53–62):
     ```javascript
     var form = document.getElementById('hjContactForm');
     form.addEventListener('submit', function (e) { ... });
     ```
     `#hjContactForm` exists **only on `theme2/index.html`**. On every interior page, this throws `TypeError`, prematurely halting script execution.
3. **External Asset Vulnerability (Hotlinked Images):**
   - Zero local content images exist in `theme2/assets/`.
   - 100% of hero photos, cause thumbnails, author avatars, and partner images are hardcoded hotlinks to `https://images.unsplash.com/` and `https://img.magnific.com/`. If offline or if CDN rate limits are reached, all visuals fail.
4. **Bootstrap Version Discrepancies:**
   - Local fallback file reports Bootstrap `v5.3.8`.
   - CDN links in HTML files point variously to `v5.3.3` (`theme2`) and `v5.3.8` (`landing`).

---

## 5. Dependency Inventory

| Package / Resource | Original Source Method | License | Next.js Architecture Adaptation |
| :--- | :--- | :--- | :--- |
| **Bootstrap 5** | Minified local CSS/JS (`5.3.8`) & CDN (`5.3.3`) | MIT | Install npm package `bootstrap@^5.3.3`; import SCSS/CSS modularly in Next.js layout. Replace raw DOM scripts with React state. |
| **Bootstrap Icons** | CDN link (`v1.11.3`) | MIT | Install npm package `bootstrap-icons@^1.11.3` or load SVG icons / font in root layout. |
| **AOS (Animate on Scroll)** | CDN (`unpkg.com/aos@2.3.1`) | MIT | Replace or wrap with client component `useEffect` hook (`aos` npm) or lightweight native IntersectionObserver / Framer Motion. |
| **Google Fonts** | CDN (`fonts.googleapis.com`) | OFL | Migrate to `next/font/google` (`Fraunces`, `Inter`, `Space Mono`, `Poppins`, `Nunito Sans`) for zero-layout-shift and self-hosting. |
| **Images** | Remote Unsplash / Magnific hotlinks | Unsplash / Free | Configure Next.js `images.remotePatterns` in `next.config.ts`, and provide robust local fallback SVGs / demo assets. |

---

## 6. M02 Architecture Recommendations & Next.js Blueprint

Based on this inspection, the following architectural guidelines are recommended for subsequent milestones:

### 6.1 Theme Selection Recommendation
- The fictional organization brand has not yet been finalized.
- However, **Variant 2 (`theme2/`)** provides a distinct, highly sophisticated, institutional, and authentic non-profit presentation ("Field Journal / Transparent Ledger") with bespoke typography (`Fraunces` + `Inter` + `Space Mono`) and cleanly namespaced CSS (`.hj-*`).
- **Recommendation:** Implement **Variant 2** as the primary design system, with modular tokenization allowing color swaps or variant toggling if needed.

### 6.2 CSS Migration Strategy
- **Do not import raw global stylesheets directly without isolation.**
- Extract design tokens (`:root` variables from `theme2/assets/style.css`) into a dedicated `src/styles/variables.css` or `globals.css`.
- Standardize `.hj-*` class rules into modular component stylesheets or a clean global SCSS/CSS bundle.
- Ensure Bootstrap grid and utilities work harmoniously without specificity clashes.

### 6.3 JavaScript Adaptation to React (Zero Unhandled Errors)
- Completely retire DOM-imperative script files (`script.js`).
- **Interactive features converted to idiomatic React components:**
  1. **Navbar Toggle:** Controlled React state (`const [isNavOpen, setIsNavOpen] = useState(false)`).
  2. **Animated Counters:** Custom React hook (`useCounterAnimation`) leveraging `IntersectionObserver`.
  3. **Progress Bars:** Animated React state on scroll into view.
  4. **FAQ Accordion & Search Filter:** Controlled React state managing active category chip and real-time query string filter.
  5. **TOC Scrollspy:** Custom hook `useScrollspy` observing section headings.
  6. **Contact / Donate Forms:** React Hook Form or standard controlled state with client validation and accessible aria alerts.
  7. **Scroll-To-Top Button:** Hook `useScrollPosition` controlling visibility and smooth window scrolling.

### 6.4 Proposed Next.js App Router Route Mapping

```
src/app/
├── (public)/
│   ├── page.tsx                    -> Homepage (Hero, Ledger Stats, Causes, About, How, Volunteers, Testimonials, Contact)
│   ├── about/page.tsx              -> Organization mission, governance, history
│   ├── programs/page.tsx           -> Program directory (Nutrition, Water, Education, Healthcare, Relief)
│   ├── stories/                    -> Blog listing and dispatch posts
│   │   ├── page.tsx                -> Dispatches listing
│   │   └── [slug]/page.tsx         -> Single dispatch detail
│   ├── financial-reports/page.tsx  -> 4-year comparative ledger, allocation charts, audit PDFs
│   ├── faq/page.tsx                -> Categorized questions with live search
│   ├── contact/page.tsx            -> Interactive contact form & office details
│   ├── privacy-policy/page.tsx     -> Legal privacy disclosure with sticky TOC
│   └── terms/page.tsx              -> Terms and conditions with sticky TOC
├── demo/
│   ├── donation/page.tsx           -> Interactive donation flow (one-time, recurring, dedications)
│   ├── membership/page.tsx         -> Membership signup flow
│   └── volunteer/page.tsx          -> Volunteer application form
└── portal/
    ├── layout.tsx                  -> Portal authenticated layout
    ├── dashboard/page.tsx          -> Admin / Donor dashboard
    ├── programs/page.tsx           -> Program management
    ├── members/page.tsx            -> Member roster
    ├── volunteers/page.tsx         -> Volunteer queue
    ├── donations/page.tsx          -> Transaction ledger
    └── reports/page.tsx            -> Financial & impact report generator
```

### 6.5 Local Demo Data Architecture (`src/data/`)
Create typed mock data stores:
- `causes.ts`: Program list, targets, raised amounts, categories, and impact milestones.
- `stats.ts`: Institutional impact numbers and ledger figures.
- `stories.ts`: Dispatch articles, tags, publish dates, reading times, author profiles.
- `faqs.ts`: Questions, answers, categories (`donations`, `volunteering`, `general`, `account`).
- `financials.ts`: Multi-year statement figures, allocation percentages, audit download items.
- `team.ts`: Volunteer and leadership profiles with social handles.

---

## 7. Verification & Compliance Sign-Off

1. **Source Integrity:** External source directory `D:\GitHub\Sources\hopwell` remained completely untouched.
2. **Repository Boundary:** Zero external template files were copied into `D:\GitHub\bedi-hopewell`.
3. **Application Code:** Zero application code, package configurations, or dependencies were created.
4. **Git State:** Local Git repository remains uncommitted on branch `main` with only `.gitkeep` placeholders and this report.

---

*Report authored by Senior Frontend Engineer & Technical Architect. Awaiting project-owner review and formal approval before implementation.*

