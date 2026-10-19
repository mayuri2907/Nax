import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { navItems } from '../data/socialLinks';
import { useActiveSection } from '../hooks/useActiveSection';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const sectionIds = navItems.map((item) => item.id);
  const activeSection = useActiveSection(sectionIds, 'hero');

  // Track scroll state for background blur
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

  // Smooth scroll handler taking into account sticky header offset
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(id);
    if (!targetEl) return;

    const headerOffset = 76;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    // Update URL hash without jumping
    window.history.pushState(null, '', `#${id}`);
  };

  return (
    <header
      className={`site-navigation ${isScrolled ? 'site-navigation-scrolled' : ''}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        zIndex: 100,
        transition: 'all var(--transition-normal)',
        backgroundColor: isScrolled ? 'rgba(16, 16, 15, 0.92)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(16px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(242, 238, 230, 0.1)' : '1px solid transparent'
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
        <a
          href="#hero"
          onClick={(e) => scrollToSection(e, 'hero')}
          className="brand-logo"
          aria-label="Navin Chaudhary Portfolio Home"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.875rem'
          }}
        >
          {/* Monogram emblem */}
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: 'var(--radius-xs)',
              background: 'linear-gradient(135deg, #2a2b2a 0%, #151514 100%)',
              border: '1px solid rgba(197, 154, 96, 0.35)',
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
            <span style={{ color: 'var(--color-hunter-amber)' }}>N</span>X
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
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
        </a>

        {/* Desktop Navigation Links */}
        <nav
          className="desktop-nav"
          aria-label="Main Navigation"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '1.75rem'
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => scrollToSection(e, item.id)}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8125rem',
                  letterSpacing: '0.06em',
                  color: isActive ? 'var(--color-hunter-amber)' : 'var(--color-muted)',
                  transition: 'color var(--transition-fast)',
                  position: 'relative',
                  padding: '0.4rem 0'
                }}
              >
                {item.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: 'var(--color-hunter-amber)',
                      boxShadow: '0 0 8px rgba(197, 154, 96, 0.8)'
                    }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="desktop-cta" style={{ display: 'none', alignItems: 'center', gap: '1rem' }}>
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, 'contact')}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.8125rem' }}
          >
            <span>LET&rsquo;S BUILD</span>
            <ArrowUpRight size={15} />
          </a>
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
            background: 'rgba(41, 42, 41, 0.4)',
            border: '1px solid var(--color-border)',
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
            backgroundColor: 'rgba(16, 16, 15, 0.98)',
            backdropFilter: 'blur(20px)',
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
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.id)}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.35rem',
                    fontWeight: 600,
                    color: isActive ? 'var(--color-hunter-amber)' : 'var(--color-bone-white)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(242, 238, 230, 0.08)'
                  }}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--color-hunter-amber)',
                        boxShadow: '0 0 8px rgba(197, 154, 96, 0.9)'
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, 'contact')}
              className="btn btn-amber"
              style={{ width: '100%', padding: '0.875rem' }}
            >
              <span>LET&rsquo;S BUILD TOGETHER</span>
              <ArrowUpRight size={16} />
            </a>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--color-metal-light)',
                textAlign: 'center'
              }}
            >
              NAX // VYROBYTE &bull; FOUNDER PORTFOLIO
            </div>
          </div>
        </div>
      )}

      {/* Responsive media query injected inline for desktop nav display */}
      <style>{`
        @media (min-width: 900px) {
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
