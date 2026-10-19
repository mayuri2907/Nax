# NAX // APPLICATION ARCHITECTURE (V2: MULTI-PAGE 3D SUITE)
## Technical Design & Component Hierarchy

---

## 1. Directory Structure

```
n:/PortFolio/
├── src/
│   ├── App.tsx                  # BrowserRouter, Global CustomCursor, Routes, PagePagination
│   ├── main.tsx                 # StrictMode entry
│   ├── styles/
│   │   ├── tokens.css           # Cyber-Titanium, Quantum Cyan, and Amber tokens
│   │   └── globals.css          # Viewport styles, cursor hiding, button styles
│   ├── data/
│   │   ├── pagesConfig.ts       # Central multi-page route definitions (PAGES_CONFIG)
│   │   ├── profile.ts           # Founder bio, headlines, and VYROBYTE mission
│   │   ├── projects.ts          # Central project data (NexusSync, AI SkillPath, VyroCore)
│   │   ├── capabilities.ts      # 5 verified capability groupings
│   │   ├── principles.ts        # 3 core guiding principles
│   │   └── socialLinks.ts       # Contact coordinates & links
│   ├── components/
│   │   ├── CustomCursor.tsx     # Canvas particle tracer sparks & magnetic follower ring
│   │   ├── Card3DTilt.tsx       # Reusable 3D perspective mouse-tilt wrapper
│   │   ├── Navigation.tsx       # Sticky navbar with React Router NavLinks & mobile drawer
│   │   ├── PagePagination.tsx   # Floating bottom dock with prev/next & keyboard arrows
│   │   ├── IntroSequence.tsx    # Cinematic opening overlay with GSAP timeline
│   │   └── Footer.tsx           # Multi-page footer with internal links & back-to-top
│   ├── pages/
│   │   ├── HomePage.tsx         # Route / (Overview with 3D Monolith)
│   │   ├── AboutPage.tsx        # Route /about (01 Story with 3D Neural Node)
│   │   ├── CapabilitiesPage.tsx # Route /capabilities (02 Craft with 3D Micro-Cubes Matrix)
│   │   ├── ProjectsPage.tsx     # Route /projects (03 Builds with 3D Blueprint Cage)
│   │   ├── VisionPage.tsx       # Route /vision (04 Vision with 3D Celestial Globe)
│   │   ├── PrinciplesPage.tsx   # Route /principles (05 Principles with 3D Prisms)
│   │   └── ContactPage.tsx      # Route /contact (06 Contact with 3D Signal Beacon)
│   └── three/
│       ├── AbstractSculptureScene.tsx # 3D Monolith (Hero)
│       ├── About3DScene.tsx           # 3D Neural Node (About)
│       ├── Capabilities3DScene.tsx    # 3D Matrix of Cubes (Capabilities)
│       ├── Projects3DScene.tsx        # 3D Blueprint Cage (Projects)
│       ├── Vision3DScene.tsx          # 3D Celestial Globe (Vision)
│       ├── Principles3DScene.tsx      # 3D Crystalline Prisms (Principles)
│       ├── Contact3DScene.tsx         # 3D Signal Beacon (Contact)
│       ├── SceneCanvas.tsx            # Error boundary & lazy-loading wrapper
│       └── SceneFallback.tsx          # High-fidelity SVG & CSS metallic fallback
```

---

## 2. Multi-Page Routing & Interaction System

- **Multi-Page Routes**: Powered by `react-router-dom` (`BrowserRouter`, `Routes`, `Route`).
  - No single-page scroll layout. Each page is an isolated, elegant viewport (`.page-viewport`).
- **Interactive Particle Tracer & Custom Cursor**:
  - `CustomCursor.tsx` manages a full-viewport canvas emitting glowing particle sparks with physical decay and velocity.
  - A magnetic ring follows with spring physics and expands on hoverable elements.
  - Native cursor hidden on desktop fine-pointer devices.
- **Card 3D Tilt Component**:
  - `Card3DTilt.tsx` computes relative pointer coordinates within the card bounding box and applies hardware-accelerated `perspective(1000px) rotateX(...) rotateY(...) scale3d(...)` transforms with smooth inertia release.
- **Page Pagination Dock**:
  - `PagePagination.tsx` sits fixed at the bottom center.
  - Supports clicking `PREV`, `NEXT`, or direct page numbers (`00` to `06`).
  - Listens to `ArrowLeft` and `ArrowRight` keyboard events for effortless browsing.
