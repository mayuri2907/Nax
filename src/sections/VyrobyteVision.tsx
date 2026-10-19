import React from 'react';
import { ArrowUpRight, Compass, Shield, Wrench } from 'lucide-react';
import { profileData } from '../data/profile';

export const VyrobyteVision: React.FC = () => {
  const { vyrobyteVision } = profileData;

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Wrench size={22} color="var(--color-hunter-amber)" />;
      case 1:
        return <Compass size={22} color="var(--color-hunter-amber)" />;
      case 2:
        return <Shield size={22} color="var(--color-hunter-amber)" />;
      default:
        return <Wrench size={22} color="var(--color-hunter-amber)" />;
    }
  };

  return (
    <section id="vision" className="section-wrapper" aria-label="VYROBYTE Startup Vision">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">{vyrobyteVision.sectionLabel}</div>
          <h2 className="section-title">{vyrobyteVision.headline}</h2>
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

        {/* Brand Lockup & Strategic Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
          }}
        >
          {vyrobyteVision.focusPoints.map((point, idx) => (
            <div
              key={point.title}
              className="industrial-card"
              style={{
                padding: '2.5rem 2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                border: '1px solid rgba(242, 238, 230, 0.1)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(197, 154, 96, 0.1)',
                    border: '1px solid rgba(197, 154, 96, 0.3)',
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
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-bone-white)' }}>
                  {point.title}
                </h3>
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', marginTop: '0.5rem', lineHeight: 1.6 }}>
                  {point.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* VYROBYTE Brand Lockup & Call To Action Banner */}
        <div
          className="industrial-card"
          style={{
            marginTop: '3.5rem',
            padding: '2.75rem 2.25rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2rem',
            background: 'linear-gradient(135deg, rgba(41, 42, 41, 0.4) 0%, rgba(16, 16, 15, 0.95) 100%)',
            border: '1px solid rgba(197, 154, 96, 0.35)'
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
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-bone-white)', letterSpacing: '-0.02em' }}>
              Building tomorrow&rsquo;s systems with deliberate intent.
            </h3>
            <p style={{ fontSize: '0.9375rem', color: 'var(--color-muted)', marginTop: '0.4rem', lineHeight: 1.6 }}>
              Whether developing modular software, custom APIs, or interactive digital interfaces,
              VYROBYTE operates on engineering discipline rather than inflated promises.
            </p>
          </div>

          <div>
            <a
              href="#contact"
              className="btn btn-amber"
              style={{ padding: '0.9rem 1.8rem', fontSize: '0.875rem' }}
            >
              <span>DISCUSS A VENTURE BUILD</span>
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
