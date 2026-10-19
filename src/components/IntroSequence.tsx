import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroSequenceProps {
  onComplete: () => void;
}

const STORAGE_KEY = 'navin_portfolio_intro_seen';

const PHRASES = [
  'NAVIN CHAUDHARY',
  'FOUNDER & FULL-STACK DEVELOPER',
  'ENGINEERING PRECISION',
  'VYROBYTE'
];

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLHeadingElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLSpanElement | null>(null);

  const [counterValue, setCounterValue] = useState<number>(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  const reducedMotion = useReducedMotion();

  const handleFinish = useCallback(() => {
    if (isDismissed) return;
    setIsDismissed(true);

    try {
      sessionStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // Storage unavailable
    }

    if (reducedMotion || !containerRef.current) {
      onComplete();
      return;
    }

    // Walterhydra-style smooth vertical shutter slide-up reveal
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.95,
      ease: 'power3.inOut',
      onComplete: () => {
        onComplete();
      }
    });
  }, [isDismissed, onComplete, reducedMotion]);

  useEffect(() => {
    // Check if seen previously in this session
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === 'true') {
        onComplete();
        return;
      }
    } catch {
      // ignore
    }

    if (reducedMotion) {
      onComplete();
      return;
    }

    // GSAP Timeline simulating counter from 0 to 100 and phrase cycle
    const counterObj = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          handleFinish();
        }
      });

      // Animate progress line & counter from 0 to 100 over ~2.4 seconds
      tl.to(counterObj, {
        value: 100,
        duration: 2.3,
        ease: 'power1.inOut',
        onUpdate: () => {
          const rounded = Math.round(counterObj.value);
          setCounterValue(rounded);
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${rounded}%`;
          }

          // Cycle phrase based on progress
          const phraseIdx = Math.min(
            Math.floor((rounded / 100) * PHRASES.length),
            PHRASES.length - 1
          );
          setCurrentPhraseIndex(phraseIdx);
        }
      });
    }, containerRef);

    // Escape or Click to speed up / skip immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      ctx.revert();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleFinish, onComplete, reducedMotion]);

  // Format counter to 3 digits (e.g. "000", "042", "100")
  const formattedCount = counterValue.toString().padStart(3, '0');

  return (
    <div
      ref={containerRef}
      onClick={handleFinish}
      role="region"
      aria-label="Cinematic Starting Sequence"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 'var(--z-intro)' as unknown as number,
        backgroundColor: '#090A0D',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'clamp(2rem, 5vw, 4rem)',
        cursor: 'pointer',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Top Header Tag */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8125rem',
          letterSpacing: '0.14em',
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase'
        }}
      >
        <span>NAVIN CHAUDHARY &bull; PORTFOLIO</span>
        <span>VYROBYTE ARCHITECTURE</span>
      </div>

      {/* Center Dynamic Wordmark Display & Progress Bar */}
      <div
        style={{
          width: '100%',
          maxWidth: '850px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1.75rem'
        }}
      >
        {/* Animated Phrase */}
        <h1
          ref={textRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.25rem, 5.5vw, 4.5rem)',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--color-text-primary)',
            lineHeight: 1.1,
            minHeight: '1.2em',
            transition: 'opacity 0.2s ease'
          }}
        >
          {PHRASES[currentPhraseIndex]}
        </h1>

        {/* Minimalist Progress Track with Flanking Counters */}
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              color: 'var(--color-accent)',
              marginBottom: '0.65rem',
              fontWeight: 600
            }}
          >
            <span ref={counterRef}>{formattedCount}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>100</span>
          </div>

          {/* Progress Bar Line */}
          <div
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              ref={progressLineRef}
              style={{
                height: '100%',
                width: '0%',
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 0 14px rgba(229, 169, 82, 0.9)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Bottom Prompt Control */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.12em',
          color: 'var(--color-text-muted)',
          textTransform: 'uppercase'
        }}
      >
        <span>[ CLICK ANYWHERE TO ENTER ]</span>
        <span>[ ESC TO SKIP ]</span>
      </div>
    </div>
  );
};
