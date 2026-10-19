import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Sparkles, Layers, Cpu } from 'lucide-react';
import { profileData } from '../data/profile';
import { SceneCanvas } from '../three/SceneCanvas';
import { Card3DTilt } from '../components/Card3DTilt';

export const HomePage: React.FC = () => {
  return (
    <div className="page-viewport" aria-label="Founder Overview Page">
      <div className="container">
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Typography & Narrative */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              maxWidth: '620px'
            }}
          >
            {/* Status Badges */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div className="badge badge-amber">
                <span className="badge-dot" />
                <span>{profileData.heroSecondary}</span>
              </div>
              <div className="badge badge-cyan">
                <span className="badge-dot-cyan" />
                <span>CYBER-TITANIUM SUITE</span>
              </div>
              <div className="badge">
                <Terminal size={12} color="var(--color-cyan-glow)" />
                <span>FOUNDER &bull; FULL-STACK DEVELOPER</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)',
                fontWeight: 700,
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: 'var(--color-bone-white)',
                textTransform: 'uppercase'
              }}
            >
              NOT HERE TO FOLLOW.<br />
              <span className="gradient-text-cyber">
                HERE TO BUILD.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
                lineHeight: 1.65,
                color: 'var(--color-muted)'
              }}
            >
              {profileData.heroCopy}
            </p>

            {/* Action Row Linking to Separate Pages */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem'
              }}
            >
              <Link to="/projects" className="btn btn-amber" aria-label="Explore selected engineering builds">
                <span>EXPLORE BUILDS</span>
                <Layers size={16} />
              </Link>

              <Link to="/about" className="btn btn-secondary" aria-label="Read founder story about Nax">
                <span>ABOUT NAX</span>
                <ArrowRight size={15} />
              </Link>

              <Link to="/capabilities" className="btn btn-cyan" aria-label="View capabilities">
                <span>CRAFT &amp; CAPABILITIES</span>
                <Cpu size={15} />
              </Link>
            </div>

            {/* 3D Telemetry Strip with Card3DTilt */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(248, 250, 252, 0.1)',
                marginTop: '1rem'
              }}
            >
              <Card3DTilt>
                <div className="industrial-card" style={{ padding: '0.85rem' }}>
                  <div className="tech-coordinate">DISCIPLINE</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-bone-white)', marginTop: '0.2rem' }}>
                    Full-Stack / Systems
                  </div>
                </div>
              </Card3DTilt>

              <Card3DTilt>
                <div className="industrial-card" style={{ padding: '0.85rem' }}>
                  <div className="tech-coordinate">ARCHITECTURE</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-cyan-glow)', marginTop: '0.2rem' }}>
                    React 19 &bull; Three.js
                  </div>
                </div>
              </Card3DTilt>

              <Card3DTilt>
                <div className="industrial-card" style={{ padding: '0.85rem' }}>
                  <div className="tech-coordinate">VENTURE</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', color: 'var(--color-hunter-amber)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Sparkles size={12} />
                    <span>VYROBYTE</span>
                  </div>
                </div>
              </Card3DTilt>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece Sculpture */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Card3DTilt maxTilt={6} scale={1.01} style={{ width: '100%', maxWidth: '540px' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '480px',
                  background: 'linear-gradient(160deg, rgba(22, 29, 38, 0.4) 0%, rgba(8, 11, 16, 0.8) 100%)',
                  border: '1px solid rgba(0, 229, 255, 0.25)',
                  boxShadow: '0 0 30px rgba(0, 229, 255, 0.1)',
                  borderRadius: 'var(--radius-md)',
                  overflow: 'hidden'
                }}
              >
                {/* HUD markings */}
                <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                  HYPER-MONOLITH // 3D.CORE
                </div>
                <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                  MOUSE PARALLAX: ACTIVE
                </div>
                <div style={{ position: 'absolute', bottom: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                  INTERACTION: MOVE / HOVER
                </div>
                <div style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                  CYAN &amp; AMBER
                </div>

                <SceneCanvas />
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 992px) {
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
          }
        }
      `}</style>
    </div>
  );
};
