import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { principlesData } from '../data/principles';
import { Principles3DScene } from '../three/Principles3DScene';
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

        {/* Two-Column Grid: Principles List & 3D Prism Shards */}
        <div
          className="principles-view-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* 3 Principles Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {principlesData.map((principle) => (
              <Card3DTilt key={principle.number} maxTilt={5} scale={1.01}>
                <div
                  className="industrial-card"
                  style={{
                    padding: '1.75rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    border: '1px solid rgba(248, 250, 252, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '1.75rem',
                        fontWeight: 800,
                        color: 'var(--color-cyan-glow)',
                        lineHeight: 1
                      }}
                    >
                      {principle.number}
                    </span>
                    <span className="tech-coordinate">PRIN.{principle.number} // COMMITTED</span>
                  </div>

                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      letterSpacing: '-0.02em',
                      color: 'var(--color-bone-white)'
                    }}
                  >
                    {principle.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.9375rem',
                      color: 'var(--color-hunter-amber)',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 500
                    }}
                  >
                    &ldquo;{principle.summary}&rdquo;
                  </p>

                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--color-muted)',
                      lineHeight: 1.6
                    }}
                  >
                    {principle.detail}
                  </p>
                </div>
              </Card3DTilt>
            ))}

            <div style={{ marginTop: '0.5rem' }}>
              <Link to="/contact" className="btn btn-amber" style={{ padding: '0.85rem 1.65rem' }}>
                <span>PROCEED TO 06 / LET&rsquo;S BUILD</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Crystalline Prism Array */}
          <Card3DTilt maxTilt={6} scale={1.01}>
            <div
              className="industrial-card"
              style={{
                height: '480px',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                boxShadow: '0 0 35px rgba(0, 229, 255, 0.15)'
              }}
            >
              <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                PRISM ARRAY // 3D CRYSTALS
              </div>
              <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                3 SHARDS // TRI-AXIS
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                ROTATION &bull; PARALLAX
              </div>
              <Principles3DScene />
            </div>
          </Card3DTilt>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .principles-view-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </div>
  );
};
