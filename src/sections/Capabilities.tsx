import React, { useState } from 'react';
import { Code2, Server, Database, Box, Compass, CheckCircle2 } from 'lucide-react';
import { capabilitiesData } from '../data/capabilities';

export const Capabilities: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(capabilitiesData[0].id);

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'frontend':
        return <Code2 size={20} color="var(--color-hunter-amber)" />;
      case 'backend':
        return <Server size={20} color="var(--color-hunter-amber)" />;
      case 'data-architecture':
        return <Database size={20} color="var(--color-hunter-amber)" />;
      case 'interactive-3d':
        return <Box size={20} color="var(--color-hunter-amber)" />;
      case 'product-building':
        return <Compass size={20} color="var(--color-hunter-amber)" />;
      default:
        return <Code2 size={20} color="var(--color-hunter-amber)" />;
    }
  };

  return (
    <section id="capabilities" className="section-wrapper" aria-label="Technical Capabilities">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">02 / THE CRAFT</div>
          <h2 className="section-title">From idea to implementation.</h2>
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
                className={`btn ${isSelected ? 'btn-amber' : 'btn-secondary'}`}
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

        {/* Selected Category Detail Grid */}
        <div className="capabilities-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {capabilitiesData.map((cat, idx) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <div
                key={cat.id}
                id={`capability-panel-${cat.id}`}
                role="tabpanel"
                aria-labelledby={`capability-tab-${cat.id}`}
                className="industrial-card"
                style={{
                  padding: '2.25rem',
                  border: isSelected ? '1px solid var(--color-hunter-amber)' : '1px solid var(--color-border)',
                  boxShadow: isSelected ? '0 0 25px rgba(197, 154, 96, 0.12)' : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.75rem',
                  transition: 'all var(--transition-normal)'
                }}
              >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: 'var(--radius-xs)',
                        background: 'rgba(197, 154, 96, 0.1)',
                        border: '1px solid rgba(197, 154, 96, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {getCategoryIcon(cat.id)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-bone-white)' }}>
                        {cat.title}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginTop: '0.2rem' }}>
                        {cat.tagline}
                      </p>
                    </div>
                  </div>
                  <span className="tech-coordinate">SEC.0{idx + 1}</span>
                </div>

                {/* Focus Areas */}
                <div>
                  <div className="tech-coordinate" style={{ marginBottom: '0.75rem' }}>
                    ENGINEERING PRACTICES &bull; FOCUS AREAS
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                    {cat.focusAreas.map((area, fIdx) => (
                      <li
                        key={fIdx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.65rem',
                          fontSize: '0.875rem',
                          color: 'var(--color-bone-white)',
                          lineHeight: 1.5
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          color="var(--color-hunter-amber)"
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
                    VERIFIED TECHNOLOGIES
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {cat.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="badge"
                        style={{
                          fontSize: '0.75rem',
                          background: 'rgba(41, 42, 41, 0.55)',
                          color: 'var(--color-bone-white)',
                          borderColor: 'rgba(242, 238, 230, 0.1)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
