import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ArrowRight, SkipForward } from 'lucide-react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroSequenceProps {
  onComplete: () => void;
}

const STORAGE_KEY = 'nax_intro_completed';

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const brandRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const quoteRef = useRef<HTMLQuoteElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);

  const reducedMotion = useReducedMotion();
  const [isDismissing, setIsDismissing] = useState<boolean>(false);

  const handleDismiss = useCallback(() => {
    if (isDismissing) return;
    setIsDismissing(true);

    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable or disabled
    }

    if (reducedMotion || !containerRef.current) {
      onComplete();
      return;
    }

    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.02,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: () => {
        onComplete();
      }
    });
  }, [isDismissing, onComplete, reducedMotion]);

  useEffect(() => {
    // If returning visitor has already seen intro in this session, skip automatically
    try {
      const alreadySeen = sessionStorage.getItem(STORAGE_KEY);
      if (alreadySeen === 'true') {
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    // If user prefers reduced motion, give prompt or fast path
    if (reducedMotion) {
      // Allow them to enter immediately
      return;
    }

    // GSAP Context to ensure StrictMode safety and cleanup
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' }
      });

      // Initial states
      gsap.set([brandRef.current, nameRef.current, titleRef.current, quoteRef.current, ctaRef.current], {
        opacity: 0,
        y: 20
      });
      gsap.set(controlsRef.current, { opacity: 0 });

      // Step 1: Reveal controls immediately so skip is accessible from frame 0
      tl.to(controlsRef.current, { opacity: 1, duration: 0.4 })
        // Step 2: Brand wordmark
        .to(brandRef.current, { opacity: 1, y: 0, duration: 0.7 }, '+=0.1')
        // Step 3: Founder Name
        .to(nameRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        // Step 4: Title / Builder badge
        .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        // Step 5: Philosophy quote
        .to(quoteRef.current, { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
        // Step 6: Primary action
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');
    }, containerRef);

    // Escape key listener for immediate skip
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleDismiss, onComplete, reducedMotion]);

  return (
    <div
      ref={containerRef}
      className="intro-overlay"
      role="region"
      aria-label="Cinematic Introduction"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-intro)' as unknown as number,
        backgroundColor: '#10100F',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        backgroundImage: `
          radial-gradient(circle at 50% 30%, rgba(197, 154, 96, 0.08) 0%, transparent 60%),
          linear-gradient(180deg, rgba(8, 8, 8, 0.7) 0%, rgba(16, 16, 15, 1) 100%)
        `
      }}
    >
      {/* Top Controls: Immediate Skip */}
      <div
        ref={controlsRef}
        style={{
          position: 'absolute',
          top: '1.75rem',
          right: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <button
          onClick={handleDismiss}
          className="btn btn-ghost"
          style={{
            fontSize: '0.75rem',
            padding: '0.45rem 0.9rem',
            border: '1px solid rgba(242, 238, 230, 0.12)',
            borderRadius: 'var(--radius-xs)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: 'var(--color-muted)'
          }}
          aria-label="Skip introduction and proceed to portfolio"
        >
          <span>SKIP INTRO [ESC]</span>
          <SkipForward size={14} />
        </button>
      </div>

      {/* Atmospheric Industrial Grid Background Lines */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(to right, rgba(242, 238, 230, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(242, 238, 230, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          pointerEvents: 'none'
        }}
      />

      {/* Content Container */}
      <div
        style={{
          maxWidth: '680px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.5rem',
          position: 'relative',
          zIndex: 2
        }}
      >
        {/* Step 1: VYROBYTE PRESENTS */}
        <div
          ref={brandRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            letterSpacing: '0.24em',
            textTransform: 'uppercase',
            color: 'var(--color-hunter-amber)'
          }}
        >
          <span style={{ width: '16px', height: '1px', background: 'var(--color-hunter-amber)' }} />
          <span>VYROBYTE PRESENTS</span>
          <span style={{ width: '16px', height: '1px', background: 'var(--color-hunter-amber)' }} />
        </div>

        {/* Step 2: FOUNDER NAME */}
        <h1
          ref={nameRef}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--color-bone-white)',
            lineHeight: 1.05
          }}
        >
          NAVIN &ldquo;NAX&rdquo; CHAUDHARY
        </h1>

        {/* Step 3: FOUNDER. DEVELOPER. BUILDER. */}
        <p
          ref={titleRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.875rem, 1.8vw, 1.0625rem)',
            letterSpacing: '0.18em',
            color: 'var(--color-metal-light)',
            textTransform: 'uppercase',
            fontWeight: 500
          }}
        >
          FOUNDER &bull; DEVELOPER &bull; BUILDER
        </p>

        {/* Step 4: PHILOSOPHY QUOTE */}
        <blockquote
          ref={quoteRef}
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            color: 'var(--color-muted)',
            fontStyle: 'italic',
            lineHeight: 1.6,
            maxWidth: '520px',
            margin: '0.5rem 0 1rem 0',
            borderLeft: '2px solid rgba(197, 154, 96, 0.4)',
            paddingLeft: '1.25rem',
            textAlign: 'left'
          }}
        >
          &ldquo;I believe great technology starts with understanding real problems.&rdquo;
        </blockquote>

        {/* Step 5: ENTER MY WORLD ACTION */}
        <div ref={ctaRef} style={{ marginTop: '0.5rem' }}>
          <button
            onClick={handleDismiss}
            className="btn btn-amber"
            style={{
              padding: '1.05rem 2.5rem',
              fontSize: '0.9375rem',
              letterSpacing: '0.12em',
              borderRadius: 'var(--radius-xs)',
              boxShadow: '0 0 30px rgba(197, 154, 96, 0.3)'
            }}
            aria-label="Enter portfolio experience"
          >
            <span>ENTER MY WORLD</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Subtle bottom coordinate footer */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.75rem',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6875rem',
          color: 'var(--color-metal-light)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase'
        }}
      >
        <span>SYS.STATUS: ONLINE</span>
        <span>ENGINE: THREE.JS // REACT 19</span>
        <span>VYROBYTE ARCHITECTURE</span>
      </div>
    </div>
  );
};
