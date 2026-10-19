import type { Principle } from '../types';

export const principlesData: Principle[] = [
  {
    number: '01',
    title: 'UNDERSTAND THE PROBLEM',
    summary: 'Start with the real need, not the trend.',
    detail: 'Before writing a single line of architecture, isolate the exact friction point. Code is an expensive liability unless it directly removes human friction or solves a genuine operational bottleneck.'
  },
  {
    number: '02',
    title: 'BUILD WITH INTENTION',
    summary: 'Make deliberate technical and design decisions.',
    detail: 'Every dependency, abstraction, pixel, and micro-interaction must earn its place. Reject superficial complexity in favor of crisp engineering, mechanical clarity, and tactile digital craftsmanship.'
  },
  {
    number: '03',
    title: 'IMPROVE THROUGH ITERATION',
    summary: 'Test, learn, refine, and make the result more useful.',
    detail: 'Products are not finished in a single heroic stroke; they mature through disciplined feedback, performance profiling, and continuous refinement under real-world conditions.'
  }
];
