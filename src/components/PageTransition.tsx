import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { PAGES_CONFIG } from '../data/pagesConfig';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);
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

    const starElements = starsRef.current?.querySelectorAll('.transition-star-unit') || [];

    // Reset initial states
    gsap.set(overlay, { display: 'flex', opacity: 1, yPercent: 100 });
    gsap.set(contentRef.current, { opacity: 0, y: 20 });
    gsap.set(starElements, { scale: 0, opacity: 0 });

    // Step 1: Shutter sweeps UP (0.45s)
    tl.to(overlay, {
      yPercent: 0,
      duration: 0.45,
      ease: 'power3.inOut'
    })
      // Step 2: Swap the actual page content in the background while covered
      .add(() => {
        setDisplayedChildren(children);
        window.scrollTo(0, 0);
      })
      // Step 3: Reveal page title & small stars (0.6s)
      .to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out'
      })
      .to(
        starElements,
        {
          scale: 1,
          opacity: 1,
          duration: 0.35,
          stagger: 0.08,
          ease: 'back.out(2)'
        },
        '-=0.15'
      )
      // Subtle pause for smooth cinematic feel (0.35s)
      .to({}, { duration: 0.35 })
      // Step 4: Fade out text & stars (0.25s)
      .to(contentRef.current, {
        opacity: 0,
        y: -12,
        duration: 0.25,
        ease: 'power2.in'
      })
      // Step 5: Shutter sweeps away UP to unveil new page (0.55s)
      .to(overlay, {
        yPercent: -100,
        duration: 0.55,
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
          ref={contentRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.15rem',
            textAlign: 'center',
            padding: '1.5rem'
          }}
        >
          {/* Section Code Label */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              color: 'var(--color-accent)',
              textTransform: 'uppercase'
            }}
          >
            NAVIN CHAUDHARY // {activePage.code}
          </div>

          {/* Section Full Title with Outfit font */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            {activePage.fullTitle}
          </h2>

          {/* Small Stars / Dots Indicator replacing the line */}
          <div
            ref={starsRef}
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              marginTop: '0.35rem'
            }}
          >
            {[0, 1, 2, 3, 4].map((idx) => (
              <span
                key={idx}
                className="transition-star-unit"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-accent)',
                  fontSize: idx === 2 ? '0.95rem' : '0.75rem',
                  textShadow: '0 0 10px rgba(229, 169, 82, 0.9)'
                }}
              >
                ✦
              </span>
            ))}
          </div>
        </div>
      </div>

      {displayedChildren}
    </>
  );
};
