import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Zap, ArrowRight, UserCheck } from 'lucide-react';
import { profileData } from '../data/profile';
import { Card3DTilt } from '../components/Card3DTilt';

export const AboutPage: React.FC = () => {
  return (
    <div className="page-viewport" aria-label="About the Founder Page">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">{profileData.aboutStory.sectionLabel}</div>
          <h1 className="section-title">{profileData.aboutStory.headline}</h1>
          <p className="section-subtitle">
            Curiosity turned into code, which evolved into deliberate digital craftsmanship.
          </p>
        </div>

        {/* Editorial Two-Column Layout */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Narrative Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {profileData.aboutStory.paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: 'clamp(1.05rem, 1.3vw, 1.18rem)',
                  lineHeight: 1.75,
                  color: idx === 0 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'
                }}
              >
                {p}
              </p>
            ))}

            {/* Founder Values Callouts with 3D Tilts */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
                marginTop: '1rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <Card3DTilt maxTilt={6} scale={1.02}>
                <div className="luxury-glass-card" style={{ padding: '1.5rem', height: '100%' }}>
                  <Cpu size={22} color="var(--color-accent)" style={{ marginBottom: '0.65rem' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Engineering First
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                    Solid architecture that endures real-world workloads and high concurrency.
                  </p>
                </div>
              </Card3DTilt>

              <Card3DTilt maxTilt={6} scale={1.02}>
                <div className="luxury-glass-card" style={{ padding: '1.5rem', height: '100%' }}>
                  <ShieldCheck size={22} color="var(--color-azure)" style={{ marginBottom: '0.65rem' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Tactile Precision
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                    Carefully chosen typography, fluid transitions, and mechanical restraint.
                  </p>
                </div>
              </Card3DTilt>

              <Card3DTilt maxTilt={6} scale={1.02}>
                <div className="luxury-glass-card" style={{ padding: '1.5rem', height: '100%' }}>
                  <Zap size={22} color="var(--color-accent)" style={{ marginBottom: '0.65rem' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#FFFFFF' }}>
                    Practical Purpose
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.35rem', lineHeight: 1.55 }}>
                    Building tools that directly remove friction and solve tangible bottlenecks.
                  </p>
                </div>
              </Card3DTilt>
            </div>

            {/* Forward Link */}
            <div style={{ marginTop: '1rem' }}>
              <Link to="/capabilities" className="btn btn-accent" style={{ padding: '0.85rem 1.65rem' }}>
                <span>PROCEED TO 02 / THE CRAFT</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: Founder Profile Card with 3D Tilt */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card3DTilt maxTilt={6} scale={1.02}>
              <div
                className="luxury-glass-card"
                style={{
                  padding: '2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.75rem'
                }}
              >
                {/* Header Profile Title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '52px',
                      height: '52px',
                      borderRadius: 'var(--radius-sm)',
                      background: 'linear-gradient(135deg, #1a1e26 0%, #090a0d 100%)',
                      border: '1px solid rgba(229, 169, 82, 0.4)',
                      boxShadow: '0 0 20px rgba(229, 169, 82, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 800,
                      color: 'var(--color-accent)'
                    }}
                  >
                    NC
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                      Navin Chaudhary
                    </h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', fontFamily: 'var(--font-mono)' }}>
                      FOUNDER &bull; FULL-STACK ARCHITECT
                    </p>
                  </div>
                </div>

                {/* Brief bio highlight */}
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>
                  Bridging the gap between robust system engineering and modern interactive design.
                  Leading product architecture and venture development at VYROBYTE.
                </p>

                {/* Specification Table */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8125rem',
                    paddingTop: '1rem',
                    borderTop: '1px solid var(--color-border)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>NAME</span>
                    <span style={{ color: '#FFFFFF', fontWeight: 600 }}>Navin Chaudhary</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>STARTUP</span>
                    <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>VYROBYTE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>CORE FOCUS</span>
                    <span style={{ color: 'var(--color-azure)' }}>Distributed Systems &bull; 3D UI</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--color-text-muted)' }}>STATUS</span>
                    <span style={{ color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <UserCheck size={14} color="var(--color-accent)" />
                      Active Building
                    </span>
                  </div>
                </div>
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 1.25fr 0.95fr !important;
          }
        }
      `}</style>
    </div>
  );
};
