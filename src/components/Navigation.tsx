import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { PAGES_CONFIG } from '../data/pagesConfig';

// 5 clean primary single-word navigation links
const NAV_PRIMARY_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/capabilities', label: 'Craft' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' }
];

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
        zIndex: mobileMenuOpen ? 350 : undefined,
        backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.94)' : 'rgba(248, 250, 252, 0.88)',
        borderBottom: isScrolled
          ? '1px solid rgba(15, 23, 42, 0.09)'
          : '1px solid rgba(15, 23, 42, 0.06)',
        boxShadow: isScrolled ? '0 4px 20px rgba(15, 23, 42, 0.05)' : 'none',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
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
            gap: '0.85rem',
            textDecoration: 'none',
            flexShrink: 0
          }}
        >
          {/* Monogram emblem */}
          <div
            style={{
              width: 'clamp(34px, 4vw, 40px)',
              height: 'clamp(34px, 4vw, 40px)',
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
              letterSpacing: '0.04em',
              flexShrink: 0
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
                fontSize: 'clamp(0.875rem, 3.5vw, 1.05rem)',
                letterSpacing: '-0.01em',
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
                whiteSpace: 'nowrap'
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

        {/* Desktop Navigation Capsule: Exactly 5 clean, single-word, non-wrapping links */}
        <nav
          className="desktop-nav"
          aria-label="Main Navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            background: 'rgba(255, 255, 255, 0.85)',
            border: '1px solid rgba(15, 23, 42, 0.08)',
            borderRadius: 'var(--radius-full)',
            padding: '0.35rem 0.5rem',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.03)'
          }}
        >
          {NAV_PRIMARY_LINKS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive: isLinkActive }) =>
                  `desktop-nav-link ${isLinkActive ? 'active' : ''}`
                }
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.45rem 1rem',
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 500,
                  whiteSpace: 'nowrap',
                  color: isActive ? 'var(--color-accent)' : '#475569',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)'
                }}
              >
                {isActive && (
                  <span
                    style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--color-accent)',
                      boxShadow: '0 0 6px rgba(180, 83, 9, 0.7)'
                    }}
                  />
                )}
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="desktop-cta" style={{ flexShrink: 0 }}>
          <Link
            to="/contact"
            className="btn btn-accent"
            style={{
              padding: '0.6rem 1.35rem',
              fontSize: '0.825rem',
              fontWeight: 600,
              boxShadow: '0 4px 14px rgba(180, 83, 9, 0.25)',
              whiteSpace: 'nowrap'
            }}
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
            padding: '2rem 1.75rem 3rem 1.75rem',
            zIndex: 350,
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
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
                    borderBottom: '1px solid rgba(15, 23, 42, 0.08)',
                    textDecoration: 'none'
                  }}
                >
                  <span>{p.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-accent)',
                        boxShadow: '0 0 10px rgba(180, 83, 9, 0.8)'
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
