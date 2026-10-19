# NAX // APPLICATION ARCHITECTURE
## Technical Design & Component Hierarchy

---

## 1. Directory Structure

```
n:/PortFolio/
├── index.html                  # SEO head, fonts, theme color, SVG favicon
├── package.json                # Dependencies: React 19, Three.js, GSAP, Lucide
├── tsconfig.json               # Modular TypeScript compiler configurations
├── vite.config.ts              # Vite 8 build pipeline
├── public/
│   └── favicon.svg             # Custom industrial geometric monogram
├── src/
│   ├── main.tsx                # StrictMode entry
│   ├── App.tsx                 # Root application composition & intro state
│   ├── index.css               # Global CSS import
│   ├── styles/
│   │   ├── tokens.css          # Design system CSS variables
│   │   └── globals.css         # Reset, typography, buttons, utilities
│   ├── types/
│   │   └── index.ts            # Type contracts (Projects, Capabilities, NavItem)
│   ├── data/
│   │   ├── profile.ts          # Central founder identity, copy, and mission
│   │   ├── projects.ts         # Central project definitions & status flags
│   │   ├── capabilities.ts     # Verified technical groupings & focus areas
│   │   ├── principles.ts       # 3 core non-negotiable principles
│   │   └── socialLinks.ts      # Navigation items & validated contact configs
│   ├── hooks/
│   │   ├── useScrollProgress.ts# rAF-throttled scroll progress calculation
│   │   ├── useReducedMotion.ts # useSyncExternalStore media query listener
│   │   └── useActiveSection.ts # IntersectionObserver active-section tracker
│   ├── three/
│   │   ├── AbstractSculptureScene.tsx # Three.js WebGL procedural sculpture
│   │   ├── SceneFallback.tsx          # High-fidelity SVG & CSS metallic fallback
│   │   └── SceneCanvas.tsx            # Error boundary & lazy-loading wrapper
│   ├── components/
│   │   ├── IntroSequence.tsx   # Cinematic opening overlay with GSAP timeline
│   │   ├── Navigation.tsx      # Sticky navbar with mobile drawer
│   │   ├── ScrollProgress.tsx  # Document reading progress bar
│   │   └── Footer.tsx          # Brand closure, anchor links, back-to-top
│   └── sections/
│       ├── Hero.tsx            # Hero presentation with 3D sculpture
│       ├── About.tsx           # Section 01: The Story
│       ├── Capabilities.tsx    # Section 02: The Craft
│       ├── Projects.tsx        # Section 03: Selected Builds + Specs modal
│       ├── VyrobyteVision.tsx  # Section 04: The Vision (VYROBYTE)
│       ├── Principles.tsx      # Section 05: The Principles
│       └── Contact.tsx         # Section 06: Let's Build + Inquiry Composer
└── docs/                       # Project documentation
```

---

## 2. 3D WebGL Pipeline & Fallback Architecture

### `AbstractSculptureScene.tsx`
- **Render Engine**: Three.js WebGLRenderer with `ACESFilmicToneMapping` and `exposure = 1.25`.
- **Procedural Geometry**:
  - `monolithMesh`: Faceted `IcosahedronGeometry` with brushed gunmetal PBR material (`roughness: 0.28`, `metalness: 0.88`).
  - `monolithWireframe`: `EdgesGeometry` chamfer overlay with hunter amber material (`#C59A60`, `opacity: 0.65`).
  - `coreMesh`: Internal `OctahedronGeometry` with amber emissive radiance.
  - Orbital caliper rings (`TorusGeometry`) counter-rotating along multiple axes.
  - Floating precision coordinate markers (`BoxGeometry`).
- **Interaction Model**:
  - Pointer moves calculate normalized coordinates damped by lerp (`currentMouse += (targetMouse - currentMouse) * 0.05`).
  - Document scroll drives rotation along the Y axis and tilt.
  - Touch devices disable pointer tracking and rely on smooth ambient floating.
  - Pixel ratio is clamped to `Math.min(devicePixelRatio, 2)` to prevent mobile thermal throttling.
- **Resource Lifecycle**:
  - Every geometry and material is explicitly `.dispose()`d on unmount.
  - The DOM element is removed and `cancelAnimationFrame` invoked.

### `SceneFallback.tsx`
- When WebGL is unavailable or fails context creation, `SceneCanvas.tsx` catches the failure via React `ErrorBoundary` and seamlessly mounts `SceneFallback`.
- Rendered with an art-directed SVG radial gradient composition featuring identical faceted geometry, caliper rings, and coordinates.

---

## 3. Animation & Timing Ownership

- **Opening Cinematic**: Driven by `GSAP` timeline wrapped in `gsap.context()` for clean StrictMode cleanup. Bypassed immediately on Esc key or if `sessionStorage.getItem('nax_intro_completed')` is set.
- **Scroll Tracking**: Driven by native browser `IntersectionObserver` in `useActiveSection` with `rootMargin: '-20% 0px -50% 0px'`.
- **Top Reading Bar**: Calculated using `useScrollProgress` throttled with `window.requestAnimationFrame`.
