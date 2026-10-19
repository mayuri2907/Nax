import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Server, Database, Box, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { capabilitiesData } from '../data/capabilities';
import { Card3DTilt } from '../components/Card3DTilt';

export const CapabilitiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(capabilitiesData[0].id);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Code2 size={22} color="var(--color-accent)" />;
      case 'backend':
        return <Server size={22} color="var(--color-azure)" />;
      case 'data-architecture':
        return <Database size={22} color="var(--color-accent)" />;
      case 'interactive-3d':
        return <Box size={22} color="var(--color-azure)" />;
      case 'product-building':
        return <Compass size={22} color="var(--color-accent)" />;
      default:
        return <Code2 size={22} color="var(--color-accent)" />;
    }
  };

  const activeCategory = capabilitiesData.find((c) => c.id === selectedCategory) || capabilitiesData[0];

  return (
    <div className="page-viewport" aria-label="Capabilities and Craft Page">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">02 / THE CRAFT</div>
          <h1 className="section-title">From idea to implementation.</h1>
          <p className="section-subtitle">
            Substantiated technical competencies across modern web architecture, distributed backends,
            and hardware-accelerated 3D interfaces. Zero fabricated score percentages.
          </p>
        </div>

        {/* Category Selector Tabs */}
        <div
          role="tablist"
          aria-label="Capabilities Categories"
          style={{
            display: 'flex',
            gap: '0.75rem',
            overflowX: 'auto',
            paddingBottom: '1rem',
            marginBottom: '2rem'
          }}
        >
          {capabilitiesData.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isSelected}
                aria-controls={`capability-panel-${cat.id}`}
                id={`capability-tab-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`btn ${isSelected ? 'btn-accent' : 'btn-glass'}`}
                style={{
                  padding: '0.75rem 1.35rem',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  flexShrink: 0
                }}
              >
                {getCategoryIcon(cat.id)}
                <span>
                  0{idx + 1} {cat.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Capability Showcase Card with 3D Tilt */}
        <Card3DTilt maxTilt={5} scale={1.01}>
          <div
            className="luxury-glass-card"
            style={{
              padding: 'clamp(2rem, 4vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem'
            }}
          >
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: 'var(--radius-sm)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(229, 169, 82, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {getCategoryIcon(activeCategory.id)}
                </div>
                <div>
                  <h2 style={{ fontSize: '1.65rem', fontWeight: 800, color: '#FFFFFF', letterSpacing: '-0.02em' }}>
                    {activeCategory.title}
                  </h2>
                  <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', marginTop: '0.2rem' }}>
                    {activeCategory.tagline}
                  </p>
                </div>
              </div>

              <div className="badge badge-accent">
                <span className="badge-dot" />
                <span>ACTIVE DOMAIN</span>
              </div>
            </div>

            {/* Two Sub-Columns: Core Practices & Verified Stack */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--color-border)'
              }}
            >
              {/* Practices */}
              <div>
                <h3 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--color-accent)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  CORE PRACTICES &bull; ARCHITECTURAL STANDARDS
                </h3>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {activeCategory.focusAreas.map((area, fIdx) => (
                    <li
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.75rem',
                        fontSize: '0.9375rem',
                        color: 'var(--color-text-primary)',
                        lineHeight: 1.55
                      }}
                    >
                      <CheckCircle2
                        size={17}
                        color="var(--color-accent)"
                        style={{ flexShrink: 0, marginTop: '0.2rem' }}
                      />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Technologies */}
              <div>
                <h3 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.12em', color: 'var(--color-azure)', textTransform: 'uppercase', marginBottom: '1rem' }}>
                  VERIFIED TECHNOLOGY STACK
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {activeCategory.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="badge"
                      style={{
                        fontSize: '0.8125rem',
                        padding: '0.5rem 1rem',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: '#FFFFFF',
                        border: '1px solid rgba(255, 255, 255, 0.12)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem' }}>
              <Link to="/projects" className="btn btn-accent">
                <span>VIEW SELECTED BUILDS</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Card3DTilt>
      </div>
    </div>
  );
};
