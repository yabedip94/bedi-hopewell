# Technology Stack Specification: `bedi-hopewell`

**Document:** Technology Stack & Technical Justifications  
**Status:** Approved Specification  
**Version:** 1.0.0  
**Date:** November 9, 2026  
**Parent Milestone:** M02 — Technical Planning & Architecture  

---

## 1. Core Stack Architecture

The technology stack is purposefully selected to deliver a fast, resilient, and visually faithful implementation of the **Hopewell Variant 2 ("Harbor / Field Journal")** design foundation, while migrating from legacy imperative DOM scripts to modern declarative React patterns.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        BEDI HOPEWELL TECH STACK                        │
├────────────────────────────────────────────────────────────────────────┤
│ Application Framework: Next.js 15+ (App Router)                        │
│ UI Library:            React 19 (Server & Client Component Architecture)│
│ Type Safety:           TypeScript 5.x (Strict Typing Mode)             │
│ CSS Framework:         Bootstrap 5.3.x (Grid, Utilities, Layout)       │
│ Design Tokens:         Custom CSS Variables (:root .hj-* namespace)    │
│ Iconography:           Bootstrap Icons 1.11.x (Font & Inline SVG)      │
│ Font Management:       next/font/google (Fraunces, Inter, Space Mono)  │
│ State & Persistence:   React useState / useReducer + LocalStorage      │
│ Automation & QA:       Playwright MCP & Headless Browser Automation    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Evaluations & Justifications

### 2.1 Framework: Next.js 15+ (App Router)
* **Decision:** Approved.
* **Justification:**
  - **Server-Side Rendering (SSR) & Static Optimization:** Public pages (About, Programs, Dispatches, Financial Reports) benefit from instantaneous first-contentful paint (FCP) and optimal SEO metadata generation.
  - **Route Group Isolation:** Route groups `(public)`, `demo`, and `portal` allow separate layout hierarchies, distinct navbars, and isolated styling contexts without impacting URL structures.
  - **Built-In Font & Image Optimization:** Integrates seamlessly with `next/font/google` for self-hosted zero-layout-shift fonts and `<Image />` for optimized remote asset delivery.

### 2.2 UI Library & Language: React 19 + TypeScript 5
* **Decision:** Approved.
* **Justification:**
  - **Eliminating Original Source Vulnerabilities:** As verified in [`M02_BROWSER_VERIFICATION_REPORT.md`](file:///D:/GitHub/bedi-hopewell/docs/reports/M02_BROWSER_VERIFICATION_REPORT.md), the original template crashed on every interior page due to unhandled `TypeError` exceptions from hardcoded `document.getElementById()` listeners. React replaces all imperative DOM mutation with isolated component state hooks (`useState`, `useEffect`).
  - **Strict Domain Modeling:** TypeScript interfaces enforce contract consistency across mock datasets, form schemas, and portal ledger calculations.

### 2.3 CSS Architecture: Bootstrap 5.3 + Custom Tokens (`.hj-*`)
* **Decision:** Approved.
* **Justification:**
  - **Grid & Utility Synergy:** The original template extensively uses Bootstrap's responsive 12-column grid (`.row`, `.col-md-6`, `.col-lg-4`, `.g-4`), flexbox helpers, and spacing utilities.
  - **Preserving Hopewell Variant 2 Aesthetics:** The bespoke editorial look is driven by CSS custom properties in the `.hj-*` namespace:
    ```css
    :root {
      --hj-ink: #16241D;          /* Deep field-ledger green-black */
      --hj-ink-soft: #33473C;     /* Soft secondary text */
      --hj-canvas: #F1EDE1;       /* Cool paper canvas */
      --hj-canvas-raised: #FFFFFF;/* Elevated card surface */
      --hj-gold: #C4922B;         /* Manifest primary gold accent */
      --hj-gold-deep: #9C6F1B;    /* Focused border/hover gold */
      --hj-stamp: #B8472E;        /* Postal clay stamp red */
      --hj-line: #D8D0BC;         /* Editorial ledger border line */
      --hj-muted: #5B6960;        /* Muted editorial caption */
      --hj-radius-card: 14px;
      --hj-radius-pill: 100px;
      --hj-shadow: 0 18px 44px -20px rgba(22, 36, 29, 0.28);
    }
    ```
  - **No Heavy CSS Framework Replacements:** Replacing Bootstrap with Tailwind or Emotion would require rewriting hundreds of verified card styles, losing the original character. Porting CSS tokens and component styles into `src/styles/` preserves 100% visual fidelity.

### 2.4 Typography: `next/font/google`
* **Decision:** Approved.
* **Fonts Configured:**
  1. **Display Headings:** `Fraunces` (Serif, optical sizing 9–144, weights 500, 600, 700).
  2. **Body & Interface:** `Inter` (Sans-serif, weights 400, 500, 600, 700, 800).
  3. **Ledgers, Stats & Badges:** `Space Mono` (Monospace, weights 400, 700).
* **Justification:** Eliminates external CDN HTTP requests to `fonts.googleapis.com` at runtime, self-hosting fonts automatically at build time with CSS variable bindings (`--font-display`, `--font-body`, `--font-mono`).

### 2.5 Iconography: Bootstrap Icons (`bootstrap-icons`)
* **Decision:** Approved.
* **Justification:** The original source utilizes over 25 distinct Bootstrap Icon glyphs (e.g., `bi-mailbox2`, `bi-heart-fill`, `bi-file-earmark-pdf-fill`, `bi-check-circle-fill`). Loading `bootstrap-icons` via npm package guarantees identical glyph geometry and zero external CDN dependency.

### 2.6 State Management & Data Persistence: React State + LocalStorage
* **Decision:** Approved.
* **Justification:**
  - Lightweight and zero-dependency: React's built-in `useState`, `useContext`, and `useReducer` handle form flows, filters, and modal toggles.
  - Submissions from the interactive donation flow, volunteer registration, and membership enrollment synchronize to `localStorage` under namespaced keys (`vrf_donations`, `vrf_volunteers`, `vrf_members`), immediately updating portal KPIs in real time.

### 2.7 Verification & QA Harness: Playwright MCP
* **Decision:** Approved.
* **Justification:** As proven during Milestone M02.1.2, Playwright automated testing across desktop, tablet, and mobile viewports validates DOM rendering, responsive behavior, accessibility labels, and zero-console-error compliance.

---

## 3. Dependency Summary Table

| Category | Package | Version Constraint | Purpose |
| :--- | :--- | :--- | :--- |
| **Framework** | `next` | `^15.0.0` or latest | Core App Router SSR & routing |
| **Core Runtime** | `react`, `react-dom` | `^19.0.0` or matching | Component runtime & hydration |
| **Language** | `typescript` | `^5.6.0` | Strict type checking & interfaces |
| **Styling** | `bootstrap` | `^5.3.3` | Responsive grid & utilities |
| **Icons** | `bootstrap-icons` | `^1.11.3` | Icon glyphs matching template |
| **Type Definitions** | `@types/react`, `@types/node` | Latest | Type definitions for React and Node.js |
| **Testing** | `@playwright/test` | Dev dependency | End-to-end regression verification |

---

## 4. Architectural Rules on Third-Party Libraries

> [!CAUTION]
> **Strict Minimal Dependency Rule:**  
> Do not introduce additional UI component libraries (e.g., MUI, Chakra, Ant Design, Mantine), heavy state libraries (Redux, MobX), or database ORMs. Any proposed package addition must be formally evaluated against bundle size, hydration performance, and necessity.

