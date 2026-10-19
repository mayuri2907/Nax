import React from 'react';
import { principlesData } from '../data/principles';

export const Principles: React.FC = () => {
  return (
    <section id="principles" className="section-wrapper" aria-label="Working Philosophy and Principles">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">05 / THE PRINCIPLES</div>
          <h2 className="section-title">The discipline that guides every build.</h2>
          <p className="section-subtitle">
            Core tenets developed through direct engineering practice. No borrowed clichés,
            just deliberate technical and operational standards.
          </p>
        </div>

        {/* 3 Principles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {principlesData.map((principle) => (
            <div
              key={principle.number}
              className="industrial-card"
              style={{
                padding: '3rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '2rem',
                border: '1px solid var(--color-border)'
              }}
            >
              <div>
                {/* Large Monospace Index */}
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: 'rgba(197, 154, 96, 0.4)',
                    lineHeight: 1,
                    marginBottom: '1.25rem'
                  }}
                >
                  {principle.number}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--color-bone-white)',
                    marginBottom: '0.75rem'
                  }}
                >
                  {principle.title}
                </h3>

                {/* Summary / Sub-rule */}
                <p
                  style={{
                    fontSize: '1rem',
                    color: 'var(--color-hunter-amber)',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 500,
                    marginBottom: '1rem'
                  }}
                >
                  &ldquo;{principle.summary}&rdquo;
                </p>

                {/* Detailed Reasoning */}
                <p
                  style={{
                    fontSize: '0.9375rem',
                    color: 'var(--color-muted)',
                    lineHeight: 1.65
                  }}
                >
                  {principle.detail}
                </p>
              </div>

              {/* Bottom engineering indicator */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(242, 238, 230, 0.08)'
                }}
              >
                <span className="tech-coordinate">PRIN.{principle.number} // COMMITTED</span>
                <span
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-hunter-amber)'
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
