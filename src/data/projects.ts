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
    status: 'Active Development',
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
    solution: 'Designed an intelligent curriculum graph that maps skill dependencies, assesses progression through milestone checkpoints, and generates targeted dynamic remedial pathways.',
    technologies: ['React', 'TypeScript', 'Node.js', 'Express', 'MongoDB', 'Graph Traversal'],
    founderRole: 'Product conception, UX architecture, graph traversal logic, and full-stack API integration.',
    status: 'Architecture Concept',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: true
  },
  {
    id: 'vyrocore-cloud',
    title: 'VyroCore Cloud',
    tagline: 'High-Throughput Modular Microservices Architecture',
    category: 'Cloud Services & API Infrastructure',
    problem: 'Monolithic services struggle to isolate failures and maintain zero-latency responsiveness as traffic spikes across diverse microservice boundaries.',
    solution: 'Architected an asynchronous, decoupled microservices gateway featuring structured event queues, automatic rate limiting, and lightweight JSON validation pipelines.',
    technologies: ['Node.js', 'Docker', 'RESTful APIs', 'JWT Auth', 'Redis Queue', 'TypeScript'],
    founderRole: 'Lead backend engineer — designed the gateway routing rules, auth middleware, and containerized deployment specs.',
    status: 'Active Development',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: true
  },
  {
    id: 'spectra-3d',
    title: 'Spectra 3D',
    tagline: 'Kinetic WebGL Interaction Framework & Motion Shader Engine',
    category: 'Interactive 3D & Graphics',
    problem: 'Integrating rich 3D graphics into commercial web applications often causes heavy frame-rate drops, battery drain, and poor mobile accessibility.',
    solution: 'Built a lightweight Three.js shader framework optimized for 60FPS across desktop and mobile, with automatic device pixel ratio scaling, spring parallax, and fallback hooks.',
    technologies: ['Three.js', 'GLSL Shaders', 'GSAP', 'WebGL', 'TypeScript', 'Modern CSS'],
    founderRole: 'Creative technologist — coded custom GLSL vertex shaders, particle wave meshes, and responsive camera rigs.',
    status: 'Active Development',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: false
  },
  {
    id: 'omniflow',
    title: 'OmniFlow Engine',
    tagline: 'Asynchronous Workflow Orchestration & Data Pipeline',
    category: 'Data Engineering & Pipeline Automation',
    problem: 'Complex recurring business jobs often fail silently or lack dependency-aware retry mechanisms, creating state corruptions.',
    solution: 'Created an observable job execution engine that manages DAG dependency trees, handles exponential backoff retries, and delivers real-time execution logs.',
    technologies: ['TypeScript', 'Node.js', 'MongoDB', 'Redis', 'Event-Driven Architecture'],
    founderRole: 'Engineered the DAG scheduler, task worker threads, and live telemetry webhooks.',
    status: 'Internal Alpha',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: false
  },
  {
    id: 'devpulse',
    title: 'DevPulse Telemetry',
    tagline: 'Real-Time Developer Metrics & Performance Instrumentation',
    category: 'Developer Tooling & Observability',
    problem: 'Developers lack lightweight, zero-overhead telemetry tools to monitor bundle sizes, API latency, and memory footprints in local environments.',
    solution: 'Engineered a local CLI and accompanying web dashboard that hooks into Vite and Node processes to stream instant diagnostic profiling data.',
    technologies: ['React 19', 'TypeScript', 'Node.js CLI', 'Chart Engine', 'Vite Plugin'],
    founderRole: 'Architected the CLI hooks, live telemetry streamer, and analytical visual dashboard.',
    status: 'Prototype',
    isVerifiedLive: false,
    isVerifiedRepo: false,
    featured: false
  }
];
