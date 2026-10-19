import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { About3DScene } from '../three/About3DScene';
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
            gap: '3.5rem',
            alignItems: 'center'
          }}
        >
          {/* Narrative Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {profileData.aboutStory.paragraphs.map((p, idx) => (
              <p
                key={idx}
                style={{
                  fontSize: 'clamp(1.05rem, 1.3vw, 1.15rem)',
                  lineHeight: 1.75,
                  color: idx === 0 ? 'var(--color-bone-white)' : 'var(--color-muted)'
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
              <Card3DTilt>
                <div className="industrial-card" style={{ padding: '1.25rem', height: '100%' }}>
                  <Cpu size={22} color="var(--color-cyan-glow)" style={{ marginBottom: '0.5rem' }} />
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                    Engineering First
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    Solid architecture that endures real-world workloads.
                  </p>
                </div>
              </Card3DTilt>

              <Card3DTilt>
                <div className="industrial-card" style={{ padding: '1.25rem', height: '100%' }}>
                  <ShieldCheck size={22} color="var(--color-hunter-amber)" style={{ marginBottom: '0.5rem' }} />
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                    Tactile Precision
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    Considered typography, fluid transitions, and mechanical restraint.
                  </p>
                </div>
              </Card3DTilt>

              <Card3DTilt>
                <div className="industrial-card" style={{ padding: '1.25rem', height: '100%' }}>
                  <Zap size={22} color="var(--color-cyan-glow)" style={{ marginBottom: '0.5rem' }} />
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                    Practical Purpose
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    Building tools that directly remove friction and solve problems.
                  </p>
                </div>
              </Card3DTilt>
            </div>

            {/* Quick forward CTA */}
            <div style={{ marginTop: '1rem' }}>
              <Link to="/capabilities" className="btn btn-amber" style={{ padding: '0.75rem 1.5rem' }}>
                <span>PROCEED TO 02 / THE CRAFT</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right Column: 3D Neural Scene & Specification Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <Card3DTilt maxTilt={6} scale={1.01}>
              <div
                className="industrial-card"
                style={{
                  height: '380px',
                  width: '100%',
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid rgba(0, 229, 255, 0.3)',
                  boxShadow: '0 0 25px rgba(0, 229, 255, 0.1)'
                }}
              >
                <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                  NEURAL.CORE // 3D HOLOGRAPH
                </div>
                <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                  KINETIC DODECAHEDRON
                </div>
                <About3DScene />
              </div>
            </Card3DTilt>

            {/* Technical Specification Table */}
            <Card3DTilt maxTilt={4} scale={1.01}>
              <div
                className="industrial-card"
                style={{
                  padding: '1.5rem 1.75rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(248, 250, 252, 0.08)' }}>
                  <span style={{ color: 'var(--color-muted)' }}>PRIMARY ALIAS</span>
                  <span style={{ color: 'var(--color-bone-white)', fontWeight: 600 }}>Nax</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(248, 250, 252, 0.08)' }}>
                  <span style={{ color: 'var(--color-muted)' }}>VENTURE LAB</span>
                  <span style={{ color: 'var(--color-hunter-amber)', fontWeight: 600 }}>VYROBYTE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem', borderBottom: '1px solid rgba(248, 250, 252, 0.08)' }}>
                  <span style={{ color: 'var(--color-muted)' }}>SPECIALIZATION</span>
                  <span style={{ color: 'var(--color-cyan-glow)' }}>Full-Stack / Distributed</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--color-muted)' }}>CORE PRINCIPLE</span>
                  <span style={{ color: 'var(--color-bone-white)' }}>Beyond the Build</span>
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
