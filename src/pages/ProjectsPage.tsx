import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, X, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../types';
import { Projects3DScene } from '../three/Projects3DScene';
import { Card3DTilt } from '../components/Card3DTilt';

export const ProjectsPage: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // SVG Abstract Visual Blueprints for Projects
  const renderProjectVisual = (projectId: string) => {
    if (projectId === 'nexussync') {
      return (
        <svg viewBox="0 0 400 220" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect width="400" height="220" fill="#0c111a" />
          <line x1="80" y1="110" x2="200" y2="50" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="200" y1="50" x2="320" y2="110" stroke="rgba(0, 229, 255, 0.5)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="80" y1="110" x2="200" y2="170" stroke="rgba(255, 158, 44, 0.4)" strokeWidth="1.5" />
          <line x1="200" y1="170" x2="320" y2="110" stroke="rgba(255, 158, 44, 0.4)" strokeWidth="1.5" />
          <line x1="200" y1="50" x2="200" y2="170" stroke="rgba(0, 229, 255, 0.7)" strokeWidth="2" />
          <circle cx="200" cy="110" r="30" fill="#141c28" stroke="#00e5ff" strokeWidth="2" />
          <text x="200" y="114" fill="#f8fafc" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            STATE BUS
          </text>
          <circle cx="80" cy="110" r="20" fill="#182232" stroke="rgba(248, 250, 252, 0.3)" strokeWidth="1" />
          <text x="80" y="113" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">NODE.A</text>
          <circle cx="320" cy="110" r="20" fill="#182232" stroke="rgba(248, 250, 252, 0.3)" strokeWidth="1" />
          <text x="320" y="113" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">NODE.B</text>
        </svg>
      );
    }

    if (projectId === 'ai-skillpath') {
      return (
        <svg viewBox="0 0 400 220" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect width="400" height="220" fill="#0c111a" />
          <path d="M50 160 Q 120 60 200 110 T 350 60" fill="none" stroke="rgba(255, 158, 44, 0.7)" strokeWidth="2" />
          <path d="M50 160 Q 160 190 260 140 T 350 60" fill="none" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="50" cy="160" r="12" fill="#1c2536" stroke="#ff9e2c" strokeWidth="1.5" />
          <text x="50" y="184" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">FOUNDATION</text>
          <circle cx="140" cy="90" r="14" fill="#1c2536" stroke="#ff9e2c" strokeWidth="1.5" />
          <text x="140" y="70" fill="#94a3b8" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">DATA.STRUCT</text>
          <circle cx="200" cy="110" r="16" fill="#141c28" stroke="#f8fafc" strokeWidth="2" />
          <text x="200" y="136" fill="#ff9e2c" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">MILESTONE</text>
          <circle cx="350" cy="60" r="18" fill="#1c2536" stroke="#00e5ff" strokeWidth="2" />
          <text x="350" y="38" fill="#00e5ff" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">TARGET.MASTERY</text>
        </svg>
      );
    }

    return (
      <svg viewBox="0 0 400 220" style={{ width: '100%', height: '100%', display: 'block' }}>
        <rect width="400" height="220" fill="#0c111a" />
        <circle cx="200" cy="110" r="70" fill="none" stroke="rgba(0, 229, 255, 0.2)" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="200" cy="110" r="45" fill="none" stroke="#ff9e2c" strokeWidth="1.5" />
        <rect x="165" y="75" width="70" height="70" rx="6" fill="#161f2c" stroke="rgba(0, 229, 255, 0.4)" strokeWidth="1" />
        <text x="200" y="114" fill="#ff9e2c" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">3D SHADER CORE</text>
      </svg>
    );
  };

  return (
    <div className="page-viewport" aria-label="Selected Builds Page">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">03 / SELECTED BUILDS</div>
          <h1 className="section-title">Things I&rsquo;ve worked to bring to life.</h1>
          <p className="section-subtitle">
            A curated selection of technical architectures, distributed protocols, and experimental interfaces.
            Every project accurately reflects real implementation status without fabricated deployment links.
          </p>
        </div>

        {/* Top 3D Blueprint Banner */}
        <Card3DTilt maxTilt={4} scale={1.01} style={{ marginBottom: '2.5rem' }}>
          <div
            className="industrial-card"
            style={{
              height: '320px',
              width: '100%',
              overflow: 'hidden',
              position: 'relative',
              border: '1px solid rgba(0, 229, 255, 0.35)',
              boxShadow: '0 0 35px rgba(0, 229, 255, 0.12)'
            }}
          >
            <div style={{ position: 'absolute', top: 12, left: 14, zIndex: 10 }} className="tech-coordinate">
              BLUEPRINT CORE // 3D CAGE
            </div>
            <div style={{ position: 'absolute', top: 12, right: 14, zIndex: 10 }} className="tech-coordinate">
              SYS.ARCH: DISTRIBUTED
            </div>
            <Projects3DScene />
          </div>
        </Card3DTilt>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {projectsData.map((project) => (
            <Card3DTilt key={project.id} maxTilt={6} scale={1.01}>
              <article
                className="industrial-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                {/* Visual Blueprint Header */}
                <div
                  style={{
                    height: '190px',
                    width: '100%',
                    borderBottom: '1px solid var(--color-border)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {renderProjectVisual(project.id)}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      display: 'flex',
                      gap: '0.5rem'
                    }}
                  >
                    <span className="badge badge-amber">{project.status}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div
                  style={{
                    padding: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    gap: '1.25rem'
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--color-cyan-glow)',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {project.category}
                    </span>
                    <h2
                      style={{
                        fontSize: '1.65rem',
                        fontWeight: 700,
                        color: 'var(--color-bone-white)',
                        marginTop: '0.35rem',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {project.title}
                    </h2>
                    <p
                      style={{
                        fontSize: '0.9375rem',
                        color: 'var(--color-muted)',
                        fontStyle: 'italic',
                        marginTop: '0.25rem'
                      }}
                    >
                      {project.tagline}
                    </p>
                  </div>

                  {/* Problem & Solution */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1 }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-bone-white)', lineHeight: 1.55 }}>
                      <strong style={{ color: 'var(--color-hunter-amber)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>
                        THE CHALLENGE:
                      </strong>
                      {project.problem}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>
                      <strong style={{ color: 'var(--color-cyan-glow)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>
                        THE ARCHITECTURE:
                      </strong>
                      {project.solution}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.5rem' }}>
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="badge" style={{ fontSize: '0.7rem' }}>
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="badge" style={{ fontSize: '0.7rem' }}>
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Row */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid rgba(248, 250, 252, 0.08)',
                      marginTop: '0.5rem'
                    }}
                  >
                    <button
                      onClick={() => setActiveModalProject(project)}
                      className="btn btn-cyan"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.75rem' }}
                      aria-label={`View full technical specifications for ${project.title}`}
                    >
                      <Terminal size={14} />
                      <span>INSPECT SPECS</span>
                    </button>

                    <span
                      className="tech-coordinate"
                      style={{
                        padding: '0.45rem 0.75rem',
                        background: 'rgba(22, 29, 38, 0.5)',
                        border: '1px solid rgba(248, 250, 252, 0.08)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--color-metal-light)'
                      }}
                    >
                      LAB SPEC // INTERNAL
                    </span>
                  </div>
                </div>
              </article>
            </Card3DTilt>
          ))}
        </div>

        {/* Forward navigation button */}
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <Link to="/vision" className="btn btn-amber" style={{ padding: '0.85rem 1.8rem' }}>
            <span>PROCEED TO 04 / VYROBYTE VISION</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Modal Specification Drawer */}
        {activeModalProject && (
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-project-title"
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(4, 6, 8, 0.88)',
              backdropFilter: 'blur(16px)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div
              className="industrial-card"
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                border: '1px solid var(--color-cyan-glow)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.95), 0 0 35px rgba(0, 229, 255, 0.25)'
              }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                  <span className="badge badge-amber">{activeModalProject.status}</span>
                  <h3
                    id="modal-project-title"
                    style={{
                      fontSize: '2rem',
                      fontWeight: 700,
                      color: 'var(--color-bone-white)',
                      marginTop: '0.5rem'
                    }}
                  >
                    {activeModalProject.title}
                  </h3>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9375rem', marginTop: '0.2rem' }}>
                    {activeModalProject.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="btn btn-ghost"
                  style={{ padding: '0.5rem', color: 'var(--color-bone-white)' }}
                  aria-label="Close project specifications modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Technical Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-hunter-amber)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    PROBLEM STATEMENT
                  </h4>
                  <p style={{ color: 'var(--color-bone-white)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    {activeModalProject.problem}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-cyan-glow)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    ENGINEERING SOLUTION
                  </h4>
                  <p style={{ color: 'var(--color-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                    {activeModalProject.solution}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-hunter-amber)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    FOUNDER CONTRIBUTION &bull; ROLE
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '1rem',
                      backgroundColor: 'rgba(22, 29, 38, 0.5)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid rgba(248, 250, 252, 0.08)'
                    }}
                  >
                    <Cpu size={18} color="var(--color-cyan-glow)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <p style={{ color: 'var(--color-bone-white)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      {activeModalProject.founderRole}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-cyan-glow)', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                    FULL TECH STACK SPECIFICATION
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {activeModalProject.technologies.map((t) => (
                      <span key={t} className="badge" style={{ color: 'var(--color-bone-white)' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(0, 229, 255, 0.08)',
                    border: '1px solid rgba(0, 229, 255, 0.3)'
                  }}
                >
                  <ShieldAlert size={18} color="var(--color-cyan-glow)" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-muted)', margin: 0 }}>
                    Notice: Architecture and repository links are maintained on internal lab servers.
                    External deployment URLs will be activated upon public release.
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="btn btn-secondary"
                    style={{ padding: '0.65rem 1.5rem' }}
                  >
                    <span>CLOSE SPECIFICATIONS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
