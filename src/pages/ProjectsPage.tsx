import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Terminal, X, ShieldAlert, Cpu, ArrowRight } from 'lucide-react';
import { projectsData } from '../data/projects';
import type { Project } from '../types';
import { Card3DTilt } from '../components/Card3DTilt';

export const ProjectsPage: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  return (
    <div className="page-viewport" aria-label="Selected Builds Page">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">03 / SELECTED BUILDS</div>
          <h1 className="section-title">Things I&rsquo;ve worked to bring to life.</h1>
          <p className="section-subtitle">
            A curated portfolio of distributed architectures, knowledge graphs, and real-time interaction engines.
            Every project accurately reflects real implementation status without fabricated deployment links.
          </p>
        </div>

        {/* 6 Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2rem'
          }}
        >
          {projectsData.map((project, idx) => (
            <Card3DTilt key={project.id} maxTilt={5} scale={1.01}>
              <article
                className="luxury-glass-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  padding: '2.25rem',
                  gap: '1.5rem'
                }}
              >
                {/* Header row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: idx % 2 === 0 ? 'var(--color-accent)' : 'var(--color-azure)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase'
                      }}
                    >
                      {project.category}
                    </span>
                    <h2
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        color: '#FFFFFF',
                        marginTop: '0.35rem',
                        letterSpacing: '-0.02em'
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>
                  <span className="badge badge-accent" style={{ fontSize: '0.7rem' }}>
                    {project.status}
                  </span>
                </div>

                {/* Tagline */}
                <p style={{ fontSize: '0.9375rem', color: 'var(--color-text-secondary)', fontStyle: 'italic' }}>
                  {project.tagline}
                </p>

                {/* Problem & Solution Breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flexGrow: 1 }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', lineHeight: 1.55 }}>
                    <strong style={{ color: 'var(--color-accent)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>
                      THE CHALLENGE:
                    </strong>
                    {project.problem}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.55 }}>
                    <strong style={{ color: 'var(--color-azure)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'block', marginBottom: '0.2rem' }}>
                      THE ARCHITECTURE:
                    </strong>
                    {project.solution}
                  </div>
                </div>

                {/* Tech Badges */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="badge" style={{ fontSize: '0.7rem', padding: '0.3rem 0.65rem' }}>
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="badge" style={{ fontSize: '0.7rem', padding: '0.3rem 0.65rem' }}>
                      +{project.technologies.length - 4} more
                    </span>
                  )}
                </div>

                {/* Bottom Action Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '1.25rem',
                    borderTop: '1px solid var(--color-border)',
                    marginTop: 'auto'
                  }}
                >
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="btn btn-glass"
                    style={{ padding: '0.55rem 1.1rem', fontSize: '0.8125rem' }}
                    aria-label={`Inspect full technical specifications for ${project.title}`}
                  >
                    <Terminal size={14} color="var(--color-accent)" />
                    <span>INSPECT SPECS</span>
                  </button>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6875rem',
                      letterSpacing: '0.1em',
                      color: 'var(--color-text-muted)',
                      textTransform: 'uppercase'
                    }}
                  >
                    LAB SPEC // INTERNAL
                  </span>
                </div>
              </article>
            </Card3DTilt>
          ))}
        </div>

        {/* Forward navigation button */}
        <div style={{ marginTop: '3.5rem', display: 'flex', justifyContent: 'center' }}>
          <Link to="/vision" className="btn btn-accent" style={{ padding: '0.9rem 2rem' }}>
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
              backgroundColor: 'rgba(5, 6, 8, 0.9)',
              backdropFilter: 'blur(20px)',
              zIndex: 300,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem'
            }}
          >
            <div
              className="luxury-glass-card"
              style={{
                width: '100%',
                maxWidth: '680px',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '2.5rem',
                border: '1px solid rgba(229, 169, 82, 0.45)',
                boxShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px rgba(229, 169, 82, 0.2)'
              }}
            >
              {/* Modal Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.75rem' }}>
                <div>
                  <span className="badge badge-accent">{activeModalProject.status}</span>
                  <h3
                    id="modal-project-title"
                    style={{
                      fontSize: '2rem',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      marginTop: '0.5rem'
                    }}
                  >
                    {activeModalProject.title}
                  </h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', marginTop: '0.2rem' }}>
                    {activeModalProject.tagline}
                  </p>
                </div>
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="btn btn-ghost"
                  style={{ padding: '0.5rem', color: '#FFFFFF' }}
                  aria-label="Close project specifications modal"
                >
                  <X size={22} />
                </button>
              </div>

              {/* Technical Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    PROBLEM STATEMENT
                  </h4>
                  <p style={{ color: 'var(--color-text-primary)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                    {activeModalProject.problem}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-azure)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    ENGINEERING ARCHITECTURE
                  </h4>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                    {activeModalProject.solution}
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-accent)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>
                    FOUNDER CONTRIBUTION &bull; ROLE
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.75rem',
                      padding: '1rem',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                      borderRadius: 'var(--radius-xs)',
                      border: '1px solid var(--color-border)'
                    }}
                  >
                    <Cpu size={18} color="var(--color-accent)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                    <p style={{ color: 'var(--color-text-primary)', fontSize: '0.875rem', lineHeight: 1.55 }}>
                      {activeModalProject.founderRole}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: '0.8125rem', fontFamily: 'var(--font-mono)', color: 'var(--color-azure)', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
                    VERIFIED TECHNOLOGY STACK
                  </h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {activeModalProject.technologies.map((t) => (
                      <span key={t} className="badge" style={{ color: '#FFFFFF', padding: '0.45rem 0.85rem' }}>
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
                    background: 'rgba(229, 169, 82, 0.08)',
                    border: '1px solid rgba(229, 169, 82, 0.3)'
                  }}
                >
                  <ShieldAlert size={18} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                    Notice: Codebases and architectures are maintained on internal lab servers.
                    External deployment links will be made public upon release.
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button
                    onClick={() => setActiveModalProject(null)}
                    className="btn btn-accent"
                    style={{ padding: '0.65rem 1.65rem' }}
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
