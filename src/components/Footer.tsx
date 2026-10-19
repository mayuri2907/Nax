import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      style={{
        backgroundColor: 'var(--color-black)',
        borderTop: '1px solid var(--color-border)',
        padding: '3.5rem 0 2.5rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid var(--color-border)'
          }}
        >
          {/* Brand & Closing Identity */}
          <div style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-xs)',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
                  border: '1px solid rgba(180, 83, 9, 0.35)',
                  boxShadow: '0 2px 8px rgba(180, 83, 9, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  color: 'var(--color-accent)'
                }}
              >
                NC
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '1.15rem',
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.01em'
                }}
              >
                NAVIN CHAUDHARY
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.6 }}>
              Beyond the Build. Creating meaningful digital experiences, practical products,
              and engineered technology that solves real problems.
            </p>
          </div>

          {/* Quick Anchor Links */}
          <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap' }}>
            <div>
              <div className="tech-coordinate" style={{ marginBottom: '0.75rem' }}>
                SECTIONS
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                <li><Link to="/about" style={{ color: 'var(--color-muted)' }}>01 Story</Link></li>
                <li><Link to="/capabilities" style={{ color: 'var(--color-muted)' }}>02 Craft</Link></li>
                <li><Link to="/projects" style={{ color: 'var(--color-muted)' }}>03 Builds</Link></li>
                <li><Link to="/vision" style={{ color: 'var(--color-muted)' }}>04 Vision</Link></li>
              </ul>
            </div>

            <div>
              <div className="tech-coordinate" style={{ marginBottom: '0.75rem' }}>
                DIRECT
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8125rem', fontFamily: 'var(--font-mono)' }}>
                <li><Link to="/principles" style={{ color: 'var(--color-muted)' }}>05 Principles</Link></li>
                <li><Link to="/contact" style={{ color: 'var(--color-muted)' }}>06 Contact</Link></li>
                <li><a href="https://github.com/NavinChaudhary" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-muted)' }}>GitHub</a></li>
              </ul>
            </div>

            {/* Back to Top Control */}
            <div>
              <button
                onClick={scrollToTop}
                className="btn btn-glass"
                style={{ padding: '0.65rem 1rem', fontSize: '0.75rem' }}
                aria-label="Scroll back to top of page"
              >
                <span>TOP</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Attribution Bar */}
        <div
          style={{
            paddingTop: '2rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            &copy; {CURRENT_YEAR} NAVIN CHAUDHARY. ALL RIGHTS RESERVED.
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)' }}>
            DIGITAL EXPERIENCES &bull; VYROBYTE
          </div>
        </div>
      </div>
    </footer>
  );
};
