import type { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'nexussync',
    title: 'NexusSync',
    tagline: 'Conflict-Aware Distributed Collaboration Engine',
    category: 'Distributed Systems & WebSockets',
    problem: 'Real-time collaborative applications frequently suffer from state drift, high conflict resolution latency, and loss of synchronization across unstable peer connections.',
    solution: 'Engineered a conflict-aware state synchronization protocol utilizing operational transformation concepts, local optimistic caching, and WebSocket transport with automated reconnect reconciliation.',
    technologies: ['TypeScript', 'Node.js', 'WebSocket', 'React', 'Redis State Bus', 'Vite'],
    founderRole: 'System architect & full-stack implementation — developed the synchronization core, message ordering logic, and developer demo harness.',
    status: 'Internal Alpha',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: true
  },
  {
    id: 'ai-skillpath',
    title: 'AI SkillPath',
    tagline: 'Adaptive Skill Intelligence & Milestone Roadmap Platform',
    category: 'EdTech & Knowledge Graphs',
    problem: 'Students and self-taught developers face overwhelming, non-linear learning curves with fragmented tutorials and lack structured pathways toward career readiness.',
    solution: 'Designed an intelligent curriculum graph that maps skill dependencies, assesses user progression through milestone checkpoints, and generates targeted remedial pathways.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS / Vanilla CSS', 'Node.js', 'Express', 'MongoDB'],
    founderRole: 'Product conception, UX architecture, graph traversal logic, and full-stack API integration.',
    status: 'Architecture Concept',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: true
  },
  {
    id: 'vyrobyte-core',
    title: 'VyroCore Architecture',
    tagline: 'High-Performance Modular Web & 3D Interaction Toolkit',
    category: 'Core Tooling & Digital Systems',
    problem: 'Modern web applications often compromise on either visual distinction or raw performance, resulting in bloated bundles and sluggish mobile frame rates.',
    solution: 'Crafted a zero-overhead design system combining custom Three.js WebGL shaders, responsive layout primitives, and hardware-accelerated animations with strict accessibility standards.',
    technologies: ['TypeScript', 'Three.js', 'WebGL', 'GSAP', 'Vite', 'Modern CSS'],
    founderRole: 'Creator & lead developer — designed the 3D rendering pipeline, custom shaders, and responsive UI components.',
    status: 'Active Development',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: false
  }
];
