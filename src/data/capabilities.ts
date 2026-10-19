import type { CapabilityCategory } from '../types';

export const capabilitiesData: CapabilityCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend Engineering',
    tagline: 'High-precision, responsive, accessible web interfaces',
    technologies: ['React 19 / 18', 'TypeScript', 'Vite', 'Modern Vanilla CSS', 'Tailwind CSS', 'HTML5 Semantic'],
    focusAreas: [
      'Component-driven architecture and state hygiene',
      'Fluid typographic systems and responsive viewport scaling',
      'WCAG AA accessible interactions and keyboard navigation',
      'Zero-layout-shift performance optimization'
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Services',
    tagline: 'Robust APIs, secure data pipelines, and clear abstractions',
    technologies: ['Node.js', 'Express', 'RESTful API Architecture', 'JWT & Auth Patterns', 'Zod / Validation'],
    focusAreas: [
      'Decoupled service layers and clean routing',
      'Defensive input validation and structured error handling',
      'Asynchronous task processing and lifecycle hooks',
      'API documentation and contract testing'
    ]
  },
  {
    id: 'data-architecture',
    title: 'Data & Architecture',
    tagline: 'Scalable data models, persistence, and system cohesion',
    technologies: ['MongoDB', 'Mongoose', 'Schema Design', 'State Hydration', 'Redis Caching'],
    focusAreas: [
      'Relational and document schema modeling',
      'Indexing strategies and query efficiency',
      'Optimistic state updates and local reconciliation',
      'Maintainable folder architectures for growing teams'
    ]
  },
  {
    id: 'interactive-3d',
    title: 'Interactive 3D & Motion',
    tagline: 'Tactile digital experiences with hardware acceleration',
    technologies: ['Three.js', 'WebGL', 'GSAP / ScrollTrigger', 'Custom Shaders', 'Canvas 2D'],
    focusAreas: [
      'Custom procedural 3D sculptures and metallic PBR materials',
      'Scroll-synchronized camera and lighting transitions',
      'Graceful WebGL degradation and art-directed fallbacks',
      'prefers-reduced-motion compliance and frame-budget discipline'
    ]
  },
  {
    id: 'product-building',
    title: 'Product & Systems',
    tagline: 'Transforming complex problem spaces into reliable tools',
    technologies: ['Problem Framing', 'Rapid Prototyping', 'Iterative Delivery', 'Git Workflows', 'CI/CD Basics'],
    focusAreas: [
      'Direct translation of user friction into actionable specs',
      'Eliminating unnecessary dependencies and bloat',
      'Feedback loops, telemetry, and automated linting',
      'Sustainable codebases built to adapt and scale'
    ]
  }
];
