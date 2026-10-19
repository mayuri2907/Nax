import { useState, useEffect } from 'react';

/**
 * Shared scroll-progress hook.
 * Calculates document scroll percentage (0 to 1) with requestAnimationFrame
 * to prevent forced layouts and excessive re-renders.
 */
export function useScrollProgress(): number {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      if (docHeight <= 0) {
        setProgress(0);
        ticking = false;
        return;
      }

      const rawProgress = scrollY / docHeight;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setProgress(clamped);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progress;
}
