import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { PAGES_CONFIG } from '../data/pagesConfig';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const lineRef = useRef<HTMLDivElement | null>(null);
  const prevPathRef = useRef<string>(location.pathname);

  useEffect(() => {
    // Only animate if path actually changed
    if (prevPathRef.current === location.pathname) {
      setDisplayedChildren(children);
      return;
    }

    prevPathRef.current = location.pathname;
    setIsTransitioning(true);

    const overlay = overlayRef.current;
    if (!overlay) {
      setDisplayedChildren(children);
      setIsTransitioning(false);
      return;
    }

    // GSAP 2-Second Transition Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    // Reset initial states
    gsap.set(overlay, { display: 'flex', opacity: 1, yPercent: 100 });
    gsap.set(titleRef.current, { opacity: 0, y: 20 });
    gsap.set(lineRef.current, { scaleX: 0 });

    // Step 1: Shutter sweeps UP (0.5s)
    tl.to(overlay, {
      yPercent: 0,
      duration: 0.5,
      ease: 'power3.inOut'
    })
      // Step 2: Swap the actual page content in the background while covered
      .add(() => {
        setDisplayedChildren(children);
        window.scrollTo(0, 0);
      })
      // Step 3: Reveal page title & progress line (0.6s)
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out'
      })
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.6,
          ease: 'power1.inOut'
        },
        '-=0.2'
      )
      // Step 4: Fade out text (0.3s)
      .to(titleRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.3,
        ease: 'power2.in'
      })
      // Step 5: Shutter sweeps away UP to unveil new page (0.6s)
      .to(overlay, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power3.inOut'
      })
      .set(overlay, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, [location.pathname, children]);

  const activePage = PAGES_CONFIG.find((p) => p.path === location.pathname) || PAGES_CONFIG[0];

  return (
    <>
      {/* 2-Second Cinematic Transition Shutter Overlay */}
      <div
        ref={overlayRef}
        aria-hidden={!isTransitioning}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#090A0D',
          zIndex: 'var(--z-transition)' as unknown as number,
          display: 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: isTransitioning ? 'all' : 'none'
        }}
      >
        <div
          ref={titleRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            textAlign: 'center'
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              letterSpacing: '0.2em',
              color: 'var(--color-accent)',
              textTransform: 'uppercase'
            }}
          >
            NAVIN CHAUDHARY // {activePage.code}
          </div>

          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.25rem)',
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '-0.02em'
            }}
          >
            {activePage.fullTitle}
          </h2>

          <div
            ref={lineRef}
            style={{
              width: '160px',
              height: '2px',
              backgroundColor: 'var(--color-accent)',
              boxShadow: '0 0 10px rgba(229, 169, 82, 0.8)',
              transformOrigin: 'left center'
            }}
          />
        </div>
      </div>

      {displayedChildren}
    </>
  );
};
