import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code2, Server, Database, Box, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { capabilitiesData } from '../data/capabilities';
import { Capabilities3DScene } from '../three/Capabilities3DScene';
import { Card3DTilt } from '../components/Card3DTilt';

export const CapabilitiesPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(capabilitiesData[0].id);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Code2 size={20} color="var(--color-cyan-glow)" />;
      case 'backend':
        return <Server size={20} color="var(--color-hunter-amber)" />;
      case 'data-architecture':
        return <Database size={20} color="var(--color-cyan-glow)" />;
      case 'interactive-3d':
        return <Box size={20} color="var(--color-hunter-amber)" />;
      case 'product-building':
        return <Compass size={20} color="var(--color-cyan-glow)" />;
      default:
        return <Code2 size={20} color="var(--color-cyan-glow)" />;
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
            marginBottom: '1.5rem'
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
                className={`btn ${isSelected ? 'btn-cyan' : 'btn-secondary'}`}
                style={{
                  padding: '0.75rem 1.25rem',
                  fontSize: '0.8125rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
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

        {/* Two-Column Grid: Active Capability Details & 3D Matrix Scene */}
        <div
          className="capabilities-view-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem',
            alignItems: 'center'
          }}
        >
          {/* Active Detail Card with 3D Tilt */}
          <Card3DTilt maxTilt={6} scale={1.01}>
            <div
              className="industrial-card"
              style={{
                padding: '2.5rem',
                border: '1px solid rgba(0, 229, 255, 0.4)',
                boxShadow: '0 0 30px rgba(0, 229, 255, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.75rem'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: 'var(--radius-xs)',
                      background: 'rgba(0, 229, 255, 0.1)',
                      border: '1px solid rgba(0, 229, 255, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {getCategoryIcon(activeCategory.id)}
                  </div>
                  <div>
                    <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: 'var(--color-bone-white)' }}>
                      {activeCategory.title}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                      {activeCategory.tagline}
                    </p>
                  </div>
                </div>
                <span className="badge badge-cyan">ACTIVE SPEC</span>
              </div>

              {/* Focus Areas */}
              <div>
                <div className="tech-coordinate" style={{ marginBottom: '0.75rem' }}>
                  CORE PRACTICES &bull; FOCUS AREAS
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                  {activeCategory.focusAreas.map((area, fIdx) => (
                    <li
                      key={fIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        fontSize: '0.9rem',
                        color: 'var(--color-bone-white)',
                        lineHeight: 1.5
                      }}
                    >
                      <CheckCircle2
                        size={16}
                        color="var(--color-cyan-glow)"
                        style={{ flexShrink: 0, marginTop: '0.25rem' }}
                      />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Verified Tech Stack Chips */}
              <div>
                <div className="tech-coordinate" style={{ marginBottom: '0.75rem' }}>
                  VERIFIED STACK TECHNOLOGIES
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {activeCategory.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="badge"
                      style={{
                        fontSize: '0.75rem',
                        background: 'rgba(22, 29, 38, 0.8)',
                        color: 'var(--color-bone-white)',
                        borderColor: 'rgba(0, 229, 255, 0.2)'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Next page link */}
              <div style={{ marginTop: '0.5rem' }}>
                <Link to="/projects" className="btn btn-amber" style={{ padding: '0.75rem 1.4rem' }}>
                  <span>EXPLORE SELECTED BUILDS</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </Card3DTilt>

          {/* Right Column: 3D Kinetic Data Matrix */}
          <Card3DTilt maxTilt={6} scale={1.01}>
            <div
              className="industrial-card"
              style={{
                height: '460px',
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255, 158, 44, 0.35)',
                boxShadow: '0 0 30px rgba(255, 158, 44, 0.1)'
              }}
            >
              <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                KINETIC MATRIX // 3D CUBES
              </div>
              <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
                DISPERSION: REALTIME
              </div>
              <div style={{ position: 'absolute', bottom: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
                HOVER TO ROTATE
              </div>
              <Capabilities3DScene />
            </div>
          </Card3DTilt>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .capabilities-view-grid {
            grid-template-columns: 1.2fr 0.9fr !important;
          }
        }
      `}</style>
    </div>
  );
};
