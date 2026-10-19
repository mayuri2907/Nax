import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PAGES_CONFIG } from '../data/pagesConfig';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile menu is open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`site-navigation ${isScrolled ? 'site-navigation-scrolled' : ''}`}
      style={{
        backgroundColor: isScrolled ? 'rgba(9, 10, 13, 0.94)' : 'rgba(9, 10, 13, 0.72)',
        borderBottom: isScrolled
          ? '1px solid rgba(229, 169, 82, 0.25)'
          : '1px solid rgba(255, 255, 255, 0.07)'
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1.5rem'
        }}
      >
        {/* Brand Mark Left */}
        <Link
          to="/"
          className="brand-logo"
          aria-label="Navin Chaudhary Portfolio Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem'
          }}
        >
          {/* Monogram emblem */}
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%)',
              border: '1px solid rgba(180, 83, 9, 0.35)',
              boxShadow: '0 2px 10px rgba(180, 83, 9, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '0.95rem',
              letterSpacing: '0.04em'
            }}
          >
            <span style={{ color: 'var(--color-accent)' }}>N</span>
            <span style={{ color: 'var(--color-text-primary)' }}>C</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.05rem',
                letterSpacing: '-0.01em',
                color: 'var(--color-text-primary)'
              }}
            >
              NAVIN CHAUDHARY
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'var(--color-accent)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase'
              }}
            >
              FOUNDER &bull; VYROBYTE
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Capsule */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {PAGES_CONFIG.map((p) => {
            const isActive = location.pathname === p.path;
            return (
              <NavLink
                key={p.path}
                to={p.path}
                className={`desktop-nav-link ${isActive ? 'active' : ''}`}
              >
                {isActive && (
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      boxShadow: '0 0 6px rgba(229, 169, 82, 0.9)'
                    }}
                  />
                )}
                <span>{p.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="desktop-cta">
          <Link
            to="/contact"
            className="btn btn-accent"
            style={{ padding: '0.6rem 1.35rem', fontSize: '0.825rem' }}
          >
            <span>LET&rsquo;S TALK</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
          style={{
            position: 'fixed',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            bottom: 0,
            height: 'calc(100vh - var(--header-height))',
            backgroundColor: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem 1.75rem',
            zIndex: 99
          }}
        >
          <nav
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            {PAGES_CONFIG.map((p) => {
              const isActive = location.pathname === p.path;
              return (
                <Link
                  key={p.path}
                  to={p.path}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: isActive ? 'var(--color-accent)' : 'var(--color-text-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.65rem 0',
                    borderBottom: '1px solid rgba(15, 23, 42, 0.08)'
                  }}
                >
                  <span>{p.fullTitle}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                        boxShadow: '0 0 10px rgba(229, 169, 82, 0.9)'
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-accent"
              style={{ width: '100%', padding: '0.95rem' }}
            >
              <span>CONNECT WITH NAVIN</span>
              <ArrowUpRight size={16} />
            </Link>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-text-muted)',
                textAlign: 'center'
              }}
            >
              NAVIN CHAUDHARY // FOUNDER &bull; VYROBYTE
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
