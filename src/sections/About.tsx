import React from 'react';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';
import { profileData } from '../data/profile';

export const About: React.FC = () => {
  return (
    <section id="about" className="section-wrapper" aria-label="About the Founder">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">{profileData.aboutStory.sectionLabel}</div>
          <h2 className="section-title">{profileData.aboutStory.headline}</h2>
        </div>

        {/* Editorial Two-Column Layout */}
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
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

            {/* Founder Values Callouts */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1.25rem',
                marginTop: '1.5rem',
                paddingTop: '2rem',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', gap: '0.875rem' }}>
                <Cpu size={20} color="var(--color-hunter-amber)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                    Engineering First
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    Solid architecture that endures real workloads.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.875rem' }}>
                <ShieldCheck size={20} color="var(--color-hunter-amber)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                    Tactile Precision
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    Every transition, font size, and border is considered.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.875rem' }}>
                <Zap size={20} color="var(--color-hunter-amber)" style={{ flexShrink: 0, marginTop: '0.2rem' }} />
                <div>
                  <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                    Practical Purpose
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                    Building tools that solve tangible user problems.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Industrial Identity Emblem & Technical Spec Card */}
          <div
            className="about-emblem-card industrial-card"
            style={{
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              border: '1px solid rgba(242, 238, 230, 0.12)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="tech-coordinate">SPEC.ID // FOUNDER.PROFILE</span>
              <span className="badge badge-amber">EST. ACTIVE</span>
            </div>

            {/* Stylized Industrial Monogram Display */}
            <div
              style={{
                width: '100%',
                height: '180px',
                borderRadius: 'var(--radius-xs)',
                background: 'linear-gradient(135deg, #1b1c1b 0%, #121211 100%)',
                border: '1px solid rgba(197, 154, 96, 0.25)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Geometric Gridlines */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `
                    linear-gradient(to right, rgba(242, 238, 230, 0.03) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(242, 238, 230, 0.03) 1px, transparent 1px)
                  `,
                  backgroundSize: '24px 24px',
                  pointerEvents: 'none'
                }}
              />

              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '4.5rem',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'var(--color-bone-white)',
                  textShadow: '0 0 30px rgba(197, 154, 96, 0.3)',
                  zIndex: 2
                }}
              >
                NA<span style={{ color: 'var(--color-hunter-amber)' }}>X</span>
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6875rem',
                  letterSpacing: '0.2em',
                  color: 'var(--color-metal-light)',
                  textTransform: 'uppercase',
                  zIndex: 2,
                  marginTop: '-0.5rem'
                }}
              >
                NAVIN CHAUDHARY &bull; FOUNDER
              </span>
            </div>

            {/* Technical Specification Table */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8125rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(242, 238, 230, 0.06)' }}>
                <span style={{ color: 'var(--color-muted)' }}>PRIMARY ALIAS</span>
                <span style={{ color: 'var(--color-bone-white)', fontWeight: 600 }}>Nax</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(242, 238, 230, 0.06)' }}>
                <span style={{ color: 'var(--color-muted)' }}>VENTURE</span>
                <span style={{ color: 'var(--color-hunter-amber)', fontWeight: 600 }}>VYROBYTE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(242, 238, 230, 0.06)' }}>
                <span style={{ color: 'var(--color-muted)' }}>CORE FOCUS</span>
                <span style={{ color: 'var(--color-bone-white)' }}>Full-Stack / Distributed</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.6rem', borderBottom: '1px solid rgba(242, 238, 230, 0.06)' }}>
                <span style={{ color: 'var(--color-muted)' }}>PHILOSOPHY</span>
                <span style={{ color: 'var(--color-bone-white)' }}>Beyond the Build</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .about-grid {
            grid-template-columns: 1.3fr 0.9fr !important;
          }
        }
      `}</style>
    </section>
  );
};
