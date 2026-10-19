import React from 'react';
import { ArrowDown, Terminal, Sparkles, Layers } from 'lucide-react';
import { profileData } from '../data/profile';
import { SceneCanvas } from '../three/SceneCanvas';

export const Hero: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 76;
    const elementPosition = el.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Founder Introduction and Hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        paddingTop: 'calc(var(--header-height) + 2.5rem)',
        paddingBottom: '4rem',
        overflow: 'hidden'
      }}
    >
      {/* Background ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 154, 96, 0.1) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Founder Persona & Typography */}
          <div
            className="hero-content"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.75rem',
              maxWidth: '620px'
            }}
          >
            {/* Startup Status Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div className="badge badge-amber">
                <span className="badge-dot" />
                <span>{profileData.heroSecondary}</span>
              </div>
              <div className="badge">
                <Terminal size={12} color="var(--color-hunter-amber)" />
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
              <span
                style={{
                  background: 'linear-gradient(90deg, #F2EEE6 0%, #C59A60 80%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}
              >
                HERE TO BUILD.
              </span>
            </h1>

            {/* Supporting Founder Copy */}
            <p
              style={{
                fontSize: 'clamp(1.05rem, 1.4vw, 1.2rem)',
                lineHeight: 1.65,
                color: 'var(--color-muted)'
              }}
            >
              {profileData.heroCopy}
            </p>

            {/* CTA Group */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem'
              }}
            >
              <button
                onClick={() => scrollTo('projects')}
                className="btn btn-primary"
                aria-label="Explore selected engineering builds"
              >
                <span>EXPLORE MY WORK</span>
                <Layers size={16} />
              </button>

              <button
                onClick={() => scrollTo('about')}
                className="btn btn-secondary"
                aria-label="Read founder story about Nax"
              >
                <span>ABOUT NAX</span>
                <ArrowDown size={15} />
              </button>
            </div>

            {/* Technical telemetry strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid rgba(242, 238, 230, 0.1)',
                marginTop: '1rem'
              }}
            >
              <div>
                <div className="tech-coordinate">DISCIPLINE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-bone-white)', marginTop: '0.2rem' }}>
                  Full-Stack / Systems
                </div>
              </div>
              <div>
                <div className="tech-coordinate">FRAMEWORK</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-bone-white)', marginTop: '0.2rem' }}>
                  React 19 &bull; Three.js
                </div>
              </div>
              <div>
                <div className="tech-coordinate">VENTURE</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.875rem', color: 'var(--color-hunter-amber)', marginTop: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <Sparkles size={12} />
                  <span>VYROBYTE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Centerpiece Sculpture */}
          <div
            className="hero-visual"
            style={{
              position: 'relative',
              width: '100%',
              minHeight: '440px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Visual Frame & Corner Calipers */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: '520px',
                height: '480px',
                background: 'linear-gradient(160deg, rgba(41, 42, 41, 0.25) 0%, rgba(16, 16, 15, 0.6) 100%)',
                border: '1px solid rgba(242, 238, 230, 0.1)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden'
              }}
            >
              {/* Corner accents */}
              <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                MONOLITH // 3D.CORE
              </div>
              <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                PARALLAX: ACTIVE
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                INTERACTION: DRAG / ROTATE
              </div>
              <div style={{ position: 'absolute', bottom: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                #C59A60 AMBER
              </div>

              {/* 3D Canvas with WebGL detection & fallback */}
              <SceneCanvas />
            </div>
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
    </section>
  );
};
