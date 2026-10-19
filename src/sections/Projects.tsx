import React, { useState } from 'react';
import { ExternalLink, Terminal, X, ShieldAlert, Cpu } from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../types';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // SVG Abstract Visual Blueprints for Projects
  const renderProjectVisual = (projectId: string) => {
    if (projectId === 'nexussync') {
      return (
        <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', display: 'block' }}>
          <defs>
            <linearGradient id="syncGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#292A29" />
              <stop offset="100%" stopColor="#121211" />
            </linearGradient>
          </defs>
          <rect width="400" height="240" fill="url(#syncGrad)" />
          {/* Peer-to-peer network nodes */}
          <line x1="80" y1="120" x2="200" y2="60" stroke="rgba(197, 154, 96, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="200" y1="60" x2="320" y2="120" stroke="rgba(197, 154, 96, 0.4)" strokeWidth="1.5" strokeDasharray="4 4" />
          <line x1="80" y1="120" x2="200" y2="180" stroke="rgba(119, 118, 111, 0.4)" strokeWidth="1.5" />
          <line x1="200" y1="180" x2="320" y2="120" stroke="rgba(119, 118, 111, 0.4)" strokeWidth="1.5" />
          <line x1="200" y1="60" x2="200" y2="180" stroke="rgba(197, 154, 96, 0.6)" strokeWidth="2" />
          {/* Central Hub */}
          <circle cx="200" cy="120" r="32" fill="#1b1c1b" stroke="#C59A60" strokeWidth="2" />
          <text x="200" y="124" fill="#F2EEE6" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">
            STATE BUS
          </text>
          {/* Peer Nodes */}
          <circle cx="80" cy="120" r="22" fill="#222322" stroke="rgba(242, 238, 230, 0.2)" strokeWidth="1" />
          <text x="80" y="123" fill="#A9A49B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">NODE.A</text>
          <circle cx="320" cy="120" r="22" fill="#222322" stroke="rgba(242, 238, 230, 0.2)" strokeWidth="1" />
          <text x="320" y="123" fill="#A9A49B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">NODE.B</text>
          <circle cx="200" cy="60" r="16" fill="#181817" stroke="#C59A60" strokeWidth="1" />
          <circle cx="200" cy="180" r="16" fill="#181817" stroke="#C59A60" strokeWidth="1" />
        </svg>
      );
    }

    if (projectId === 'ai-skillpath') {
      return (
        <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', display: 'block' }}>
          <rect width="400" height="240" fill="#121211" />
          {/* Graph paths */}
          <path d="M50 180 Q 120 70 200 120 T 350 70" fill="none" stroke="rgba(197, 154, 96, 0.6)" strokeWidth="2" />
          <path d="M50 180 Q 160 210 260 160 T 350 70" fill="none" stroke="rgba(119, 118, 111, 0.3)" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Skill Checkpoints */}
          <circle cx="50" cy="180" r="12" fill="#292A29" stroke="#C59A60" strokeWidth="1.5" />
          <text x="50" y="206" fill="#A9A49B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">FOUNDATION</text>
          <circle cx="140" cy="100" r="14" fill="#292A29" stroke="#C59A60" strokeWidth="1.5" />
          <text x="140" y="80" fill="#A9A49B" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">DATA.STRUCT</text>
          <circle cx="200" cy="120" r="16" fill="#1c1d1c" stroke="#F2EEE6" strokeWidth="2" />
          <text x="200" y="146" fill="#C59A60" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">MILESTONE</text>
          <circle cx="270" cy="150" r="12" fill="#292A29" stroke="rgba(242, 238, 230, 0.2)" strokeWidth="1" />
          <circle cx="350" cy="70" r="18" fill="#292A29" stroke="#C59A60" strokeWidth="2" />
          <text x="350" y="46" fill="#F2EEE6" fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">TARGET.MASTERY</text>
        </svg>
      );
    }

    // Default: VyroCore Architecture
    return (
      <svg viewBox="0 0 400 240" style={{ width: '100%', height: '100%', display: 'block' }}>
        <rect width="400" height="240" fill="#131413" />
        <circle cx="200" cy="120" r="80" fill="none" stroke="rgba(242, 238, 230, 0.08)" strokeWidth="1" strokeDasharray="6 6" />
        <circle cx="200" cy="120" r="50" fill="none" stroke="#C59A60" strokeWidth="1.5" />
        <rect x="160" y="80" width="80" height="80" rx="6" fill="#1f201f" stroke="rgba(242, 238, 230, 0.2)" strokeWidth="1" />
        <text x="200" y="124" fill="#C59A60" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">3D SHADER CORE</text>
        <line x1="80" y1="120" x2="160" y2="120" stroke="rgba(197, 154, 96, 0.5)" strokeWidth="1.5" />
        <line x1="240" y1="120" x2="320" y2="120" stroke="rgba(197, 154, 96, 0.5)" strokeWidth="1.5" />
        <text x="90" y="108" fill="#A9A49B" fontSize="9" fontFamily="JetBrains Mono">INPUT: R3F</text>
        <text x="260" y="108" fill="#A9A49B" fontSize="9" fontFamily="JetBrains Mono">OUTPUT: 60FPS</text>
      </svg>
    );
  };

  return (
    <section id="projects" className="section-wrapper" aria-label="Selected Engineering Builds">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">03 / SELECTED BUILDS</div>
          <h2 className="section-title">Things I&rsquo;ve worked to bring to life.</h2>
          <p className="section-subtitle">
            A curated selection of technical architectures, distributed protocols, and experimental interfaces.
            Every project accurately reflects real implementation status without fabricated deployment links.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {projectsData.map((project) => (
            <article
              key={project.id}
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
                  height: '210px',
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
                {/* Category & Title */}
                <div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--color-hunter-amber)',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase'
                    }}
                  >
                    {project.category}
                  </span>
                  <h3
                    style={{
                      fontSize: '1.65rem',
                      fontWeight: 700,
                      color: 'var(--color-bone-white)',
                      marginTop: '0.35rem',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {project.title}
                  </h3>
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

                {/* Problem & Solution Extract */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-bone-white)', lineHeight: 1.55 }}>
                    <strong style={{ color: 'var(--color-hunter-amber)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>
                      THE CHALLENGE:
                    </strong>
                    {project.problem}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-muted)', lineHeight: 1.55 }}>
                    <strong style={{ color: 'var(--color-bone-white)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>
                      THE ARCHITECTURE:
                    </strong>
                    {project.solution}
                  </div>
                </div>

                {/* Technology Badges */}
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
                    borderTop: '1px solid rgba(242, 238, 230, 0.08)',
                    marginTop: '0.5rem'
                  }}
                >
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="btn btn-secondary"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.75rem' }}
                    aria-label={`View full technical specifications for ${project.title}`}
                  >
                    <Terminal size={14} />
                    <span>INSPECT SPECS</span>
                  </button>

                  {/* Verification Status Badge */}
                  {project.isVerifiedLive && project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                      style={{ padding: '0.55rem 1rem', fontSize: '0.75rem' }}
                    >
                      <span>LIVE SYSTEM</span>
                      <ExternalLink size={13} />
                    </a>
                  ) : (
                    <span
                      className="tech-coordinate"
                      style={{
                        padding: '0.45rem 0.75rem',
                        background: 'rgba(41, 42, 41, 0.35)',
                        border: '1px solid rgba(242, 238, 230, 0.08)',
                        borderRadius: 'var(--radius-xs)',
                        color: 'var(--color-metal-light)'
                      }}
                    >
                      LAB SPEC // INTERNAL
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
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
              backgroundColor: 'rgba(8, 8, 8, 0.85)',
              backdropFilter: 'blur(12px)',
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
                border: '1px solid var(--color-hunter-amber)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(197, 154, 96, 0.2)'
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

              {/* Technical Architecture Breakdown */}
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
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-hunter-amber)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
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
                      backgroundColor: 'rgba(41, 42, 41, 0.4)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid rgba(242, 238, 230, 0.08)'
                    }}
                  >
                    <Cpu size={18} color="var(--color-hunter-amber)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <p style={{ color: 'var(--color-bone-white)', fontSize: '0.875rem', lineHeight: 1.5 }}>
                      {activeModalProject.founderRole}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-hunter-amber)', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
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

                {/* Honest Verification Notice */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.875rem',
                    borderRadius: 'var(--radius-xs)',
                    background: 'rgba(197, 154, 96, 0.08)',
                    border: '1px solid rgba(197, 154, 96, 0.25)'
                  }}
                >
                  <ShieldAlert size={18} color="var(--color-hunter-amber)" style={{ flexShrink: 0 }} />
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
    </section>
  );
};
