import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { principlesData } from '../data/principles';
import { Card3DTilt } from '../components/Card3DTilt';

export const PrinciplesPage: React.FC = () => {
  return (
    <div className="page-viewport" aria-label="Working Principles Page">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">05 / THE PRINCIPLES</div>
          <h1 className="section-title">The discipline that guides every build.</h1>
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
            <Card3DTilt key={principle.number} maxTilt={6} scale={1.02}>
              <div
                className="luxury-glass-card"
                style={{
                  padding: '2.75rem 2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '2rem',
                  height: '100%'
                }}
              >
                <div>
                  {/* Large Index */}
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3.5rem',
                      fontWeight: 800,
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                      marginBottom: '1rem',
                      opacity: 0.9
                    }}
                  >
                    {principle.number}
                  </div>

                  {/* Title */}
                  <h2
                    style={{
                      fontSize: '1.45rem',
                      fontWeight: 800,
                      letterSpacing: '-0.02em',
                      color: '#FFFFFF',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {principle.title}
                  </h2>

                  {/* Summary / Sub-rule */}
                  <p
                    style={{
                      fontSize: '1rem',
                      color: 'var(--color-accent)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500,
                      marginBottom: '1rem',
                      lineHeight: 1.5
                    }}
                  >
                    &ldquo;{principle.summary}&rdquo;
                  </p>

                  {/* Detailed Reasoning */}
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.65
                    }}
                  >
                    {principle.detail}
                  </p>
                </div>

                {/* Bottom Status */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--color-border)'
                  }}
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                    CORE TENET &bull; 0{principle.number}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--color-accent)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                    <Check size={14} />
                    <span>COMMITTED</span>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

        {/* Forward Action */}
        <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
          <Link to="/contact" className="btn btn-accent" style={{ padding: '0.9rem 2rem' }}>
            <span>PROCEED TO 06 / LET&rsquo;S BUILD</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};
