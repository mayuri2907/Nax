import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { PAGES_CONFIG } from '../data/pagesConfig';

export const PagePagination: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = PAGES_CONFIG.findIndex((p) => p.path === location.pathname);
  const activeIndex = currentIndex === -1 ? 0 : currentIndex;

  const prevPage = activeIndex > 0 ? PAGES_CONFIG[activeIndex - 1] : null;
  const nextPage = activeIndex < PAGES_CONFIG.length - 1 ? PAGES_CONFIG[activeIndex + 1] : null;

  // Keyboard navigation: ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if (e.key === 'ArrowRight' && nextPage) {
        navigate(nextPage.path);
      } else if (e.key === 'ArrowLeft' && prevPage) {
        navigate(prevPage.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate, prevPage, nextPage]);

  return (
    <nav
      className="page-pagination-dock"
      aria-label="Multi-page navigation dock"
      style={{
        position: 'fixed',
        bottom: '1.25rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 'var(--z-pagination)' as unknown as number,
        display: 'flex',
        alignItems: 'center',
        gap: '0.65rem',
        padding: '0.5rem 0.85rem',
        backgroundColor: 'rgba(10, 14, 20, 0.85)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(248, 250, 252, 0.12)',
        borderRadius: 'var(--radius-full)',
        boxShadow: '0 12px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 229, 255, 0.1)',
        maxWidth: '92vw',
        overflowX: 'auto'
      }}
    >
      {/* Prev button */}
      {prevPage ? (
        <Link
          to={prevPage.path}
          className="btn btn-secondary"
          style={{
            padding: '0.45rem 0.85rem',
            fontSize: '0.75rem',
            borderRadius: 'var(--radius-full)',
            gap: '0.35rem'
          }}
          aria-label={`Go to previous page: ${prevPage.label}`}
        >
          <ArrowLeft size={13} />
          <span className="pagination-text-desktop">PREV</span>
        </Link>
      ) : (
        <span
          style={{
            padding: '0.45rem 0.85rem',
            fontSize: '0.75rem',
            opacity: 0.3,
            color: 'var(--color-metal-light)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <ArrowLeft size={13} />
          <span className="pagination-text-desktop">PREV</span>
        </span>
      )}

      {/* Numerical page jumps */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0 0.35rem' }}>
        {PAGES_CONFIG.map((p, idx) => {
          const isActive = idx === activeIndex;
          return (
            <Link
              key={p.path}
              to={p.path}
              style={{
                width: isActive ? '32px' : '26px',
                height: '26px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--color-black)' : 'var(--color-text-secondary)',
                backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.05)',
                boxShadow: isActive ? '0 0 14px rgba(229, 169, 82, 0.8)' : 'none',
                transition: 'all var(--transition-fast)'
              }}
              title={p.label}
              aria-label={`Go to page ${p.code}: ${p.label}`}
            >
              {p.code}
            </Link>
          );
        })}
      </div>

      {/* Next button */}
      {nextPage ? (
        <Link
          to={nextPage.path}
          className="btn btn-accent"
          style={{
            padding: '0.45rem 0.85rem',
            fontSize: '0.75rem',
            borderRadius: 'var(--radius-full)',
            gap: '0.35rem'
          }}
          aria-label={`Go to next page: ${nextPage.label}`}
        >
          <span className="pagination-text-desktop">NEXT</span>
          <ArrowRight size={13} />
        </Link>
      ) : (
        <span
          style={{
            padding: '0.45rem 0.85rem',
            fontSize: '0.75rem',
            opacity: 0.3,
            color: 'var(--color-metal-light)',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem'
          }}
        >
          <span className="pagination-text-desktop">NEXT</span>
          <ArrowRight size={13} />
        </span>
      )}

      <style>{`
        @media (max-width: 600px) {
          .pagination-text-desktop {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};
