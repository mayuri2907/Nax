import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Compass, Shield, Wrench } from 'lucide-react';
import { profileData } from '../data/profile';
import { Vision3DScene } from '../three/Vision3DScene';
import { Card3DTilt } from '../components/Card3DTilt';

export const VisionPage: React.FC = () => {
  const { vyrobyteVision } = profileData;

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Wrench size={22} color="var(--color-hunter-amber)" />;
      case 1:
        return <Compass size={22} color="var(--color-cyan-glow)" />;
      case 2:
        return <Shield size={22} color="var(--color-hunter-amber)" />;
      default:
        return <Wrench size={22} color="var(--color-cyan-glow)" />;
    }
  };

  return (
    <div className="page-viewport" aria-label="VYROBYTE Vision Page">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">{vyrobyteVision.sectionLabel}</div>
          <h1 className="section-title">{vyrobyteVision.headline}</h1>
          <p
            className="section-subtitle"
            style={{
              fontSize: 'clamp(1.1rem, 1.5vw, 1.3rem)',
              color: 'var(--color-bone-white)',
              lineHeight: 1.7
            }}
          >
            {vyrobyteVision.mission}
          </p>
        </div>

        {/* Two-Column Grid: Pillars & 3D Celestial Globe */}
        <div
          className="vision-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Strategic Pillars */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {vyrobyteVision.focusPoints.map((point, idx) => (
              <Card3DTilt key={point.title} maxTilt={6} scale={1.01}>
                <div
                  className="industrial-card"
                  style={{
                    padding: '1.75rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    border: '1px solid rgba(248, 250, 252, 0.1)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(22, 29, 38, 0.6)',
                        border: '1px solid rgba(0, 229, 255, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {getPillarIcon(idx)}
                    </div>
                    <span className="tech-coordinate">PILLAR.0{idx + 1}</span>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-bone-white)' }}>
                      {point.title}
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--color-muted)', marginTop: '0.35rem', lineHeight: 1.6 }}>
                      {point.desc}
                    </p>
                  </div>
                </div>
              </Card3DTilt>
            ))}
          </div>

          {/* Right Column: 3D Celestial Core */}
          <Card3DTilt maxTilt={6} scale={1.01}>
            <div
              className="industrial-card"
              style={{
                height: '460px',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(0, 229, 255, 0.35)',
                boxShadow: '0 0 35px rgba(0, 229, 255, 0.15)'
              }}
            >
              <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                VENTURE.CORE // 3D GLOBE
              </div>
              <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                PARTICLE RINGS: ACTIVE
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                ROTATION &bull; PARALLAX
              </div>
              <Vision3DScene />
            </div>
          </Card3DTilt>
        </div>

        {/* Collaboration Banner with 3D Tilt */}
        <Card3DTilt maxTilt={4} scale={1.01} style={{ marginTop: '3rem' }}>
          <div
            className="industrial-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              background: 'linear-gradient(135deg, rgba(22, 29, 38, 0.6) 0%, rgba(8, 11, 16, 0.95) 100%)',
              border: '1px solid rgba(255, 158, 44, 0.45)'
            }}
          >
            <div style={{ maxWidth: '580px' }}>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-hunter-amber)',
                  marginBottom: '0.5rem'
                }}
              >
                STARTUP IDENTITY // VENTURE LAB
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-bone-white)', letterSpacing: '-0.02em' }}>
                Building tomorrow&rsquo;s systems with deliberate intent.
              </h2>
              <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', marginTop: '0.4rem', lineHeight: 1.6 }}>
                Whether developing modular software, custom APIs, or interactive digital interfaces,
                VYROBYTE operates on engineering discipline rather than inflated promises.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-amber" style={{ padding: '0.85rem 1.65rem' }}>
                <span>DISCUSS A VENTURE BUILD</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link to="/principles" className="btn btn-cyan" style={{ padding: '0.85rem 1.65rem' }}>
                <span>VIEW PRINCIPLES</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Card3DTilt>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .vision-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </div>
  );
};
