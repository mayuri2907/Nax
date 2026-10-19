import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { PAGES_CONFIG } from '../data/pagesConfig';

export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const childrenRef = useRef(children);
  childrenRef.current = children;

  const [displayedChildren, setDisplayedChildren] = useState(children);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const starsRef = useRef<HTMLDivElement | null>(null);

  const prevPathRef = useRef<string | null>(null);

  const activePage = PAGES_CONFIG.find((p) => p.path === location.pathname) || PAGES_CONFIG[0];
  const sectionCode = `NAVIN CHAUDHARY // ${activePage.code}`;

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) {
      setDisplayedChildren(childrenRef.current);
      return;
    }

    const starElements = starsRef.current?.querySelectorAll('.transition-star-unit') || [];
    const charElements = contentRef.current?.querySelectorAll('.transition-char-title') || [];
    const codeElements = contentRef.current?.querySelectorAll('.transition-char-code') || [];

    const isInitial = prevPathRef.current === null;
    prevPathRef.current = location.pathname;

    setIsTransitioning(true);

    // Initial setup: If on initial refresh, curtain starts at center (yPercent: 0); if route change, start at yPercent: 100
    gsap.set(overlay, { display: 'flex', opacity: 1, yPercent: isInitial ? 0 : 100 });
    gsap.set(starElements, { scale: 0, opacity: 0 });
    gsap.set(charElements, { scale: 0, opacity: 0, y: 16 });
    gsap.set(codeElements, { opacity: 0, y: 8 });

    const tl = gsap.timeline({
      onComplete: () => {
        setIsTransitioning(false);
      }
    });

    if (!isInitial) {
      // Step 1: Shutter sweeps UP (0.4s)
      tl.to(overlay, {
        yPercent: 0,
        duration: 0.4,
        ease: 'power3.inOut'
      }).add(() => {
        setDisplayedChildren(childrenRef.current);
        window.scrollTo(0, 0);
      });
    } else {
      setDisplayedChildren(childrenRef.current);
    }

    // Step 2: Code chars pop in
    tl.to(codeElements, {
      opacity: 1,
      y: 0,
      duration: 0.22,
      stagger: 0.012,
      ease: 'power2.out'
    }, isInitial ? '+=0.08' : '-=0.05')
      // Step 3: Title characters pop and scale in like stars!
      .to(
        charElements,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 0.35,
          stagger: 0.02,
          ease: 'back.out(2)'
        },
        '-=0.15'
      )
      // Step 4: Small stars pop and twinkle in
      .to(
        starElements,
        {
          scale: 1,
          opacity: 1,
          duration: 0.3,
          stagger: 0.07,
          ease: 'back.out(2.5)'
        },
        '-=0.2'
      )
      // Hold for user to appreciate the starry reveal
      .to({}, { duration: 0.3 })
      // Step 5: Fade out text & stars
      .to([charElements, codeElements, starElements], {
        opacity: 0,
        scale: 0.85,
        duration: 0.22,
        ease: 'power2.in'
      })
      // Step 6: Shutter sweeps away UP to unveil the page (0.5s)
      .to(overlay, {
        yPercent: -100,
        duration: 0.5,
        ease: 'power3.inOut'
      })
      .set(overlay, { display: 'none' });

    return () => {
      tl.kill();
    };
  }, [location.pathname]);

  return (
    <>
      {/* 2-Second Cinematic Transition Shutter Overlay (Light Theme Porcelain) */}
      <div
        ref={overlayRef}
        aria-hidden={!isTransitioning}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#F8FAFC',
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
            gap: '1.25rem',
            textAlign: 'center',
            padding: '1.5rem',
            userSelect: 'none'
          }}
        >
          {/* Section Code Label - Animated Character by Character */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.22em',
              color: 'var(--color-accent)',
              textTransform: 'uppercase',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {sectionCode.split('').map((char, i) => (
              <span
                key={i}
                className="transition-char-code"
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>

          {/* Section Full Title - Animated Character by Character like Stars */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 3.5vw, 2.65rem)',
              fontWeight: 800,
              color: '#0F172A',
              letterSpacing: '-0.02em',
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center'
            }}
          >
            {activePage.fullTitle.split('').map((char, i) => (
              <span
                key={i}
                className="transition-char-title"
                style={{
                  display: 'inline-block',
                  transformOrigin: 'center center'
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h2>

          {/* Small Stars / Dots Indicator */}
          <div
            ref={starsRef}
            aria-hidden="true"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.85rem',
              marginTop: '0.45rem'
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
                  fontSize: idx === 2 ? '1rem' : '0.8rem',
                  filter: 'drop-shadow(0 0 6px rgba(180, 83, 9, 0.45))',
                  transformOrigin: 'center center'
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
