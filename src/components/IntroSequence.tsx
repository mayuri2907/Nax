import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface IntroSequenceProps {
  onComplete: () => void;
}

const STORAGE_KEY = 'navin_portfolio_intro_seen';

interface PhraseSegment {
  text: string;
  startPct: number;
  typeEndPct: number;
  endPct: number;
}

const PHRASE_SEGMENTS: PhraseSegment[] = [
  { text: 'NAVIN CHAUDHARY', startPct: 0, typeEndPct: 22, endPct: 25 },
  { text: 'FOUNDER & FULL-STACK DEVELOPER', startPct: 25, typeEndPct: 52, endPct: 56 },
  { text: 'ENGINEERING PRECISION', startPct: 56, typeEndPct: 78, endPct: 82 },
  { text: 'VYROBYTE', startPct: 82, typeEndPct: 96, endPct: 100 }
];

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);

  const [counterValue, setCounterValue] = useState<number>(0);
  const [displayedText, setDisplayedText] = useState<string>('');
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

    // Walterhydra-style smooth vertical shutter slide-up unveil
    gsap.to(containerRef.current, {
      yPercent: -100,
      duration: 0.85,
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

    // GSAP Timeline running for ~3.8 seconds (3 to 5 second duration)
    const counterObj = { value: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          handleFinish();
        }
      });

      tl.to(counterObj, {
        value: 100,
        duration: 3.8, // 3.8 seconds total duration
        ease: 'none',
        onUpdate: () => {
          const currentVal = Math.min(Math.round(counterObj.value), 100);
          setCounterValue(currentVal);

          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${currentVal}%`;
          }

          // Compute character-by-character text reveal based on current progress percentage
          const activeSegment =
            PHRASE_SEGMENTS.find(
              (seg) => currentVal >= seg.startPct && currentVal <= seg.endPct
            ) || PHRASE_SEGMENTS[PHRASE_SEGMENTS.length - 1];

          if (currentVal >= activeSegment.typeEndPct) {
            // Fully typed out for this segment
            setDisplayedText(activeSegment.text);
          } else {
            // Typing in character by character
            const segmentProgress = Math.max(
              0,
              (currentVal - activeSegment.startPct) /
                (activeSegment.typeEndPct - activeSegment.startPct)
            );
            const charsToShow = Math.max(
              1,
              Math.floor(segmentProgress * activeSegment.text.length)
            );
            setDisplayedText(activeSegment.text.slice(0, charsToShow));
          }
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
        backgroundColor: '#F8FAFC',
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
          fontSize: '0.75rem',
          letterSpacing: '0.14em',
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase'
        }}
      >
        <span>NAVIN CHAUDHARY &bull; PORTFOLIO</span>
        <span>VYROBYTE ARCHITECTURE</span>
      </div>

      {/* Center Dynamic Wordmark Display & Progress Track */}
      <div
        style={{
          width: '100%',
          maxWidth: '780px',
          margin: '0 auto',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2.25rem'
        }}
      >
        {/* Character-by-character typed phrase with smaller, refined modern font */}
        <div style={{ minHeight: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.25rem, 2.8vw, 1.95rem)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: '#0F172A',
              lineHeight: 1.2,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
          >
            <span>{displayedText}</span>
            <span
              style={{
                display: 'inline-block',
                width: '3px',
                height: '1.2em',
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 0 8px rgba(180, 83, 9, 0.6)',
                animation: 'starTwinkle 0.8s infinite'
              }}
            />
          </h1>
        </div>

        {/* Minimalist Progress Track with Flanking Counters */}
        <div style={{ width: '100%', maxWidth: '540px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8125rem',
              color: 'var(--color-accent)',
              marginBottom: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.08em'
            }}
          >
            <span>{formattedCount}</span>
            <span style={{ color: 'var(--color-text-muted)' }}>100</span>
          </div>

          {/* Sleek Progress Track */}
          <div
            style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'rgba(15, 23, 42, 0.08)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative'
            }}
          >
            <div
              ref={progressLineRef}
              style={{
                height: '100%',
                width: '0%',
                backgroundColor: 'var(--color-accent)',
                boxShadow: '0 0 10px rgba(180, 83, 9, 0.7)'
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
          fontSize: '0.7rem',
          letterSpacing: '0.14em',
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
