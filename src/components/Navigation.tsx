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

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 'var(--z-header)' as unknown as number,
        transition: 'all var(--transition-normal)',
        backgroundColor: isScrolled ? 'rgba(8, 11, 16, 0.94)' : 'rgba(8, 11, 16, 0.65)',
        backdropFilter: 'blur(20px)',
        borderBottom: isScrolled
          ? '1px solid rgba(0, 229, 255, 0.2)'
          : '1px solid rgba(248, 250, 252, 0.08)'
      }}
    >
      <div
        className="container"
        style={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
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
            gap: '0.875rem'
          }}
        >
          {/* Cyber monogram emblem */}
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: 'var(--radius-xs)',
              background: 'linear-gradient(135deg, #161d26 0%, #080b10 100%)',
              border: '1px solid rgba(0, 229, 255, 0.4)',
              boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.875rem',
              color: 'var(--color-bone-white)',
              letterSpacing: '0.05em'
            }}
          >
            <span style={{ color: 'var(--color-cyan-glow)' }}>N</span>
            <span style={{ color: 'var(--color-hunter-amber)' }}>X</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1.05rem',
                letterSpacing: '0.04em',
                color: 'var(--color-bone-white)'
              }}
            >
              NAX
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.625rem',
                color: 'var(--color-hunter-amber)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase'
              }}
            >
              VYROBYTE FOUNDER
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          aria-label="Main Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
          {PAGES_CONFIG.map((p) => {
            const isActive = location.pathname === p.path;
            return (
              <NavLink
                key={p.path}
                to={p.path}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.06em',
                  color: isActive ? 'var(--color-cyan-glow)' : 'var(--color-muted)',
                  transition: 'color var(--transition-fast)',
                  position: 'relative',
                  padding: '0.45rem 0'
                }}
              >
                <span>{p.label}</span>
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--gradient-cyber)',
                      boxShadow: '0 0 10px rgba(0, 229, 255, 0.9)'
                    }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="desktop-cta" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/contact"
            className="btn btn-cyan"
            style={{ padding: '0.6rem 1.25rem', fontSize: '0.8125rem' }}
          >
            <span>LET&rsquo;S BUILD</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close navigation drawer' : 'Open navigation drawer'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-xs)',
            background: 'rgba(22, 29, 38, 0.6)',
            border: '1px solid rgba(0, 229, 255, 0.3)',
            color: 'var(--color-bone-white)'
          }}
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
            backgroundColor: 'rgba(8, 11, 16, 0.98)',
            backdropFilter: 'blur(25px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem 1.5rem',
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
                    fontWeight: 600,
                    color: isActive ? 'var(--color-cyan-glow)' : 'var(--color-bone-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(248, 250, 252, 0.08)'
                  }}
                >
                  <span>{p.fullTitle}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-cyan-glow)',
                        boxShadow: '0 0 10px rgba(0, 229, 255, 0.9)'
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
              className="btn btn-amber"
              style={{ width: '100%', padding: '0.875rem' }}
            >
              <span>DISCUSS A BUILD WITH NAX</span>
              <ArrowUpRight size={16} />
            </Link>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-metal-light)',
                textAlign: 'center'
              }}
            >
              NAX // VYROBYTE &bull; FOUNDER SUITE
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav {
            display: flex !important;
          }
          .desktop-cta {
            display: flex !important;
          }
          .mobile-menu-toggle {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
