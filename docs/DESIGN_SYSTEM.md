# NAX // DESIGN SYSTEM
## Project Codename: NAX / BEYOND THE BUILD
## Startup Identity: VYROBYTE

---

## 1. Brand Identity & Visual Principles

The visual language is informed by high-precision industrial engineering: tactile, restrained, confident, and architectural.

### Critical Restriction
Motorcycle aesthetics serve strictly as abstract atmospheric inspiration (machined metal, raw textures, controlled warm lighting). No motorcycles, parts, logos, or biker clichés appear anywhere in the design.

### Aesthetic Pillars
- **Obsidian & Gunmetal Foundations**: Deep, matte black and brushed dark steel backgrounds.
- **Hunter Amber Accents**: Controlled, high-value highlights (`#C59A60`) used intentionally for focal points, indicators, and edge lighting.
- **Machined Geometric Forms**: Sharp 1px borders, subtle chamfers, and monospace technical metadata tags (`SEC.01`, `PRIN.01`, `SPEC.ID`).
- **Tactile Transitions**: Smooth cursor damping, subtle card lifts, and physics-inspired interaction feedback.

---

## 2. Color Palette & CSS Variables

| CSS Token | Hex / Value | Semantic Role |
| :--- | :--- | :--- |
| `--color-obsidian` | `#10100F` | Primary deep background |
| `--color-black` | `#080808` | Canvas & contrast floor |
| `--color-gunmetal` | `#292A29` | Structural borders, card gradients |
| `--color-metal-light` | `#77766F` | Secondary technical text & calipers |
| `--color-hunter-amber`| `#C59A60` | Primary accent, rim lights, active states |
| `--color-bone-white` | `#F2EEE6` | Primary headlines, active typography |
| `--color-muted` | `#A9A49B` | Paragraph text, secondary labels |
| `--color-border` | `rgba(242, 238, 230, 0.14)` | Dividers, card boundaries |
| `--color-border-active`| `rgba(197, 154, 96, 0.45)` | Hover borders, active cards |

---

## 3. Typography Hierarchy

- **Display Headings**: `Space Grotesk` (Weights 600, 700)
  - Clamp-based fluid font scaling (`clamp(2rem, 5.5vw, 4.25rem)`)
  - Letter spacing: `-0.02em` to `-0.035em`
- **Body Text**: `Inter` (Weights 400, 500)
  - Line height: `1.65` to `1.75` for relaxed editorial readability
- **Technical Telemetry**: `JetBrains Mono` (Weights 400, 500, 600)
  - Letter spacing: `0.06em` to `0.2em` uppercase

---

## 4. Layout & Spacing Rules

- Container Max Width: `1240px` (standard), `1400px` (wide)
- Section Vertical Padding: `clamp(4.5rem, 8vw, 7.5rem)`
- Header Offset: `76px` standard sticky header height
- Border Radii: `3px` (industrial micro-radius), `6px` (cards), `10px` (dialogs)
- Accessibility: Focus visible rings using `outline: 2px solid var(--color-hunter-amber)` with `3px` offset

---

## 5. Motion & Interaction Standards

- **Damping**: Pointer parallax uses inertia lerp (`damping factor: 0.05`)
- **Scroll Sync**: Header background blur and document reading indicator update via `requestAnimationFrame`
- **Reduced Motion**: Disables continuous 3D idle rotation, pauses timeline animations, and provides instant transition states
