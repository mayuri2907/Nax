import { useState, useEffect } from 'react';

/**
 * Tracks the currently active section based on scroll position and IntersectionObserver.
 */
export function useActiveSection(sectionIds: string[], defaultSection: string = 'hero'): string {
  const [activeSection, setActiveSection] = useState<string>(defaultSection);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers: IntersectionObserver[] = [];
    const elements: HTMLElement[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        elements.push(el);
      }
    });

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible entries
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio or proximity to top
          visibleEntries.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0px -50% 0px',
        threshold: [0.1, 0.3, 0.6]
      }
    );

    elements.forEach((el) => observer.observe(el));
    observers.push(observer);

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [sectionIds]);

  return activeSection;
}
