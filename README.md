# NAX // BEYOND THE BUILD
### Founder & Full-Stack Developer Portfolio for Navin (Nax) Chaudhary
### Startup Identity: VYROBYTE

A cinematic, interactive 3D personal founder portfolio built with React 19, TypeScript, Three.js, GSAP, and vanilla CSS variables.

Designed with an engineered, industrial aesthetic: brushed gunmetal surfaces, warm hunter amber lighting (`#C59A60`), precision architectural geometry, and tactile feedback.

---

## Brand Identity & Core Message
- **Founder**: Navin (Nax) Chaudhary
- **Identity**: Nax
- **Title**: Founder & Full-Stack Developer
- **Startup Venture**: VYROBYTE
- **Brand Concept**: Beyond the Build
- **Core Headline**: *Not here to follow. Here to build.*
- **Supporting Message**: *Building meaningful digital experiences and practical technology.*

---

## Technical Architecture

- **Core**: React 19, TypeScript (strict type safety, `verbatimModuleSyntax` compliant), Vite 8
- **3D Graphics**: Three.js WebGL with procedural faceted icosahedron monolith, caliper rings, ambient floating, cursor parallax, and scroll reaction
- **Graceful 3D Degradation**: Art-directed SVG & CSS metallic fallback for low-power or non-WebGL environments
- **Animations**: GSAP timeline for the opening cinematic sequence with StrictMode protection and cleanup
- **Design System**: Vanilla CSS tokens (`tokens.css`, `globals.css`) with zero unnecessary CSS framework bloat
- **Icons**: Lucide Icons + custom high-contrast SVG brand vectors
- **Accessibility**: Semantic HTML5, visible `:focus-visible` amber rings, `prefers-reduced-motion` compliance, full keyboard navigation, and ARIA roles

---

## Quick Start

### Prerequisites
- Node.js (v18.0.0 or higher, tested on v22.18.0)
- npm (v9.0.0 or higher)

### Installation
```bash
# Clone the repository
git clone <repo-url>
cd PortFolio

# Install dependencies
npm install
```

### Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Linting
```bash
npm run lint
```

### Production Build
```bash
npm run build
```
Generates an optimized production bundle in `/dist` with code-split Three.js chunks.

### Production Preview
```bash
npm run preview
```

---

## Sections Overview

1. **Cinematic Opening Sequence**: Obsidian black canvas, brand announcement, founder introduction quote, immediate skip control (`[ESC]`), and session storage memory (`nax_intro_completed`).
2. **Main Sticky Navigation**: Dynamic backdrop blur, active section indicator powered by `IntersectionObserver`, and mobile drawer with focus trap & Esc dismissal.
3. **Founder Hero**: High-impact typography, telemetry indicators, CTAs, and interactive 3D metallic sculpture.
4. **01 / The Story**: Editorial two-column narrative and founder specification panel.
5. **02 / The Craft**: Substantiated technical capabilities across 5 core engineering groups without arbitrary percentage bars.
6. **03 / Selected Builds**: Reusable project cards driven by `projects.ts` (`NexusSync`, `AI SkillPath`, `VyroCore Architecture`) with interactive specification drawers.
7. **04 / The Vision (VYROBYTE)**: Honest venture positioning highlighting Tactile Engineering, Practical Utility, and Architectural Resilience.
8. **05 / The Principles**: Three core tenets (*Understand the Problem*, *Build with Intention*, *Improve through Iteration*).
9. **06 / Let's Build (Contact)**: Direct inbox coordinates, copy-to-clipboard, verified platforms, and an inquiry brief composer with client validation.
10. **Footer**: Brand lockup, section jump anchors, and smooth back-to-top trigger.

---

## Documentation
For deeper documentation, see:
- [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/CONTENT_CHECKLIST.md`](docs/CONTENT_CHECKLIST.md)
- [`docs/IMPLEMENTATION_LOG.md`](docs/IMPLEMENTATION_LOG.md)
