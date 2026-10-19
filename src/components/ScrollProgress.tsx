import React from 'react';
import { useScrollProgress } from '../hooks/useScrollProgress';

export const ScrollProgress: React.FC = () => {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress-container"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll reading progress"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '2px',
        zIndex: 1000,
        pointerEvents: 'none',
        backgroundColor: 'rgba(41, 42, 41, 0.4)'
      }}
    >
      <div
        className="scroll-progress-bar"
        style={{
          height: '100%',
          width: `${progress * 100}%`,
          backgroundColor: 'var(--color-hunter-amber)',
          boxShadow: '0 0 10px rgba(197, 154, 96, 0.65), 0 0 4px rgba(197, 154, 96, 0.9)',
          transition: 'width 60ms linear'
        }}
      />
    </div>
  );
};
