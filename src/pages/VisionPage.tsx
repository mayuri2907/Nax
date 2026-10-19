import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowRight, Compass, Shield, Wrench, Sparkles } from 'lucide-react';
import { profileData } from '../data/profile';
import { Card3DTilt } from '../components/Card3DTilt';

export const VisionPage: React.FC = () => {
  const { vyrobyteVision } = profileData;

  const getPillarIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Shield size={22} color="var(--color-accent)" />;
      case 1:
        return <Wrench size={22} color="var(--color-azure)" />;
      case 2:
        return <Compass size={22} color="var(--color-accent)" />;
      default:
        return <Shield size={22} color="var(--color-accent)" />;
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
              fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.7
            }}
          >
            {vyrobyteVision.mission}
          </p>
        </div>

        {/* Strategic Pillars Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}
        >
          {vyrobyteVision.focusPoints.map((point, idx) => (
            <Card3DTilt key={point.title} maxTilt={6} scale={1.02}>
              <div
                className="luxury-glass-card"
                style={{
                  padding: '2.5rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem',
                  height: '100%'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(229, 169, 82, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getPillarIcon(idx)}
                  </div>
                  <span className="badge badge-accent">PILLAR 0{idx + 1}</span>
                </div>

                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                    {point.title}
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', lineHeight: 1.65 }}>
                    {point.desc}
                  </p>
                </div>
              </div>
            </Card3DTilt>
          ))}
        </div>

        {/* Venture Collaboration Card with 3D Tilt */}
        <Card3DTilt maxTilt={4} scale={1.01} style={{ marginTop: '3.5rem' }}>
          <div
            className="luxury-glass-card"
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '2rem',
              border: '1px solid rgba(229, 169, 82, 0.35)',
              boxShadow: '0 15px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(229, 169, 82, 0.1)'
            }}
          >
            <div style={{ maxWidth: '620px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.14em',
                  color: 'var(--color-accent)',
                  marginBottom: '0.65rem'
                }}
              >
                <Sparkles size={14} />
                <span>STARTUP VENTURE &bull; VYROBYTE</span>
              </div>
              <h2 style={{ fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>
                Building tomorrow&rsquo;s systems with deliberate intent.
              </h2>
              <p style={{ fontSize: '0.95rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem', lineHeight: 1.65 }}>
                Whether developing modular software, custom APIs, or interactive digital interfaces,
                VYROBYTE operates on engineering discipline rather than inflated promises.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link to="/contact" className="btn btn-accent" style={{ padding: '0.85rem 1.8rem' }}>
                <span>DISCUSS A VENTURE BUILD</span>
                <ArrowUpRight size={16} />
              </Link>
              <Link to="/principles" className="btn btn-glass" style={{ padding: '0.85rem 1.8rem' }}>
                <span>VIEW PRINCIPLES</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Card3DTilt>
      </div>
    </div>
  );
};
