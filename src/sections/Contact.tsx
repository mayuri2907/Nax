import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Globe, MapPin, Clock } from 'lucide-react';
import { contactConfig } from '../data/socialLinks';

const GithubIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; color?: string }> = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState<boolean>(false);
  const [formName, setFormName] = useState<string>('');
  const [formEmail, setFormEmail] = useState<string>('');
  const [formMessage, setFormMessage] = useState<string>('');
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [composerStatus, setComposerStatus] = useState<string | null>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(contactConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const validateForm = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formName.trim()) {
      errors.name = 'Please provide your name or organization.';
    }
    if (!formEmail.trim() || !formEmail.includes('@')) {
      errors.email = 'Please provide a valid contact email.';
    }
    if (!formMessage.trim() || formMessage.length < 10) {
      errors.message = 'Please provide a brief description of the problem or build (min 10 characters).';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLaunchEmailClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const subject = encodeURIComponent(`Project Inquiry from ${formName} — Navin (Nax) Chaudhary`);
    const body = encodeURIComponent(
      `Hello Navin,\n\nName / Organization: ${formName}\nEmail: ${formEmail}\n\nProject / Problem Description:\n${formMessage}\n\nSent via Founder Portfolio Contact System.`
    );

    window.location.href = `mailto:${contactConfig.email}?subject=${subject}&body=${body}`;
    setComposerStatus('Email client opened with your formatted project brief.');
  };

  const handleCopyFormattedBrief = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const textPayload = `To: ${contactConfig.email}\nSubject: Project Inquiry from ${formName}\nFrom: ${formName} (${formEmail})\n\nMessage:\n${formMessage}`;
    navigator.clipboard.writeText(textPayload);
    setComposerStatus('Project brief copied to clipboard. You can now paste it into your preferred client.');
  };

  return (
    <section id="contact" className="section-wrapper" aria-label="Contact and Collaboration">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">06 / LET&rsquo;S BUILD</div>
          <h2 className="section-title">Have a problem worth solving?</h2>
          <p className="section-subtitle">
            Let&rsquo;s discuss ideas, products, and opportunities to build something useful.
          </p>
        </div>

        {/* Contact Grid */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3.5rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Coordinates & Status */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Primary Email Card */}
            <div
              className="industrial-card"
              style={{
                padding: '2.25rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.25rem',
                border: '1px solid rgba(197, 154, 96, 0.35)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="tech-coordinate">DIRECT INBOX</span>
                <span className="badge badge-amber">AVAILABLE</span>
              </div>

              <div>
                <span style={{ fontSize: '0.8125rem', color: 'var(--color-muted)' }}>PRIMARY COMMUNICATIONS:</span>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
                    fontWeight: 600,
                    color: 'var(--color-bone-white)',
                    marginTop: '0.25rem'
                  }}
                >
                  {contactConfig.email}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${contactConfig.email}`}
                  className="btn btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.8125rem' }}
                >
                  <Mail size={15} />
                  <span>OPEN EMAIL</span>
                </a>

                <button
                  onClick={copyEmail}
                  className="btn btn-secondary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.8125rem' }}
                  aria-label="Copy email address to clipboard"
                >
                  {copied ? <Check size={15} color="var(--color-hunter-amber)" /> : <Copy size={15} />}
                  <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
                </button>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <span className="tech-coordinate">VERIFIED PLATFORMS</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {contactConfig.socials.map((social) => {
                  const isExternal = social.url.startsWith('http');
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target={isExternal ? '_blank' : undefined}
                      rel={isExternal ? 'noopener noreferrer' : undefined}
                      className="industrial-card"
                      style={{
                        padding: '1rem 1.25rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        textDecoration: 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {social.platform === 'GitHub' && <GithubIcon size={18} color="var(--color-hunter-amber)" />}
                        {social.platform === 'LinkedIn' && <LinkedinIcon size={18} color="var(--color-hunter-amber)" />}
                        {social.platform === 'Startup' && <Globe size={18} color="var(--color-hunter-amber)" />}
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-bone-white)' }}>
                          {social.label}
                        </span>
                      </div>
                      <span className="tech-coordinate">{social.displayValue}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Telemetry metadata */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-xs)',
                backgroundColor: 'rgba(41, 42, 41, 0.25)',
                border: '1px solid rgba(242, 238, 230, 0.08)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={16} color="var(--color-metal-light)" />
                <div>
                  <div className="tech-coordinate">LOCATION</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-bone-white)' }}>{contactConfig.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--color-metal-light)" />
                <div>
                  <div className="tech-coordinate">TIMEZONE</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--color-bone-white)' }}>{contactConfig.timezone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Honest Project Brief Composer */}
          <div
            className="industrial-card"
            style={{
              padding: '2.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
              border: '1px solid rgba(242, 238, 230, 0.12)'
            }}
          >
            <div>
              <div className="tech-coordinate">INQUIRY COMPOSER // DIRECT TRANSMISSION</div>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: 'var(--color-bone-white)', marginTop: '0.35rem' }}>
                Draft a Problem Specification
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginTop: '0.25rem' }}>
                Fill in your project requirements. You can instantly trigger your native mail app or copy the structured brief.
              </p>
            </div>

            <form onSubmit={handleLaunchEmailClient} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Name Field */}
              <div>
                <label
                  htmlFor="contact-name"
                  style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-bone-white)', marginBottom: '0.4rem' }}
                >
                  YOUR NAME / ORGANIZATION *
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Alex Vance / Tech Lead"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(16, 16, 15, 0.8)',
                    border: formErrors.name ? '1px solid #e55353' : '1px solid rgba(242, 238, 230, 0.15)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-bone-white)',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem'
                  }}
                />
                {formErrors.name && (
                  <span style={{ fontSize: '0.75rem', color: '#e55353', marginTop: '0.25rem', display: 'block' }}>
                    {formErrors.name}
                  </span>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="contact-email"
                  style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-bone-white)', marginBottom: '0.4rem' }}
                >
                  YOUR EMAIL ADDRESS *
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="alex@domain.com"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(16, 16, 15, 0.8)',
                    border: formErrors.email ? '1px solid #e55353' : '1px solid rgba(242, 238, 230, 0.15)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-bone-white)',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem'
                  }}
                />
                {formErrors.email && (
                  <span style={{ fontSize: '0.75rem', color: '#e55353', marginTop: '0.25rem', display: 'block' }}>
                    {formErrors.email}
                  </span>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="contact-message"
                  style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-bone-white)', marginBottom: '0.4rem' }}
                >
                  PROJECT OR PROBLEM DETAILS *
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formMessage}
                  onChange={(e) => setFormMessage(e.target.value)}
                  placeholder="Describe the product, system bottleneck, or opportunity you want to build..."
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: 'rgba(16, 16, 15, 0.8)',
                    border: formErrors.message ? '1px solid #e55353' : '1px solid rgba(242, 238, 230, 0.15)',
                    borderRadius: 'var(--radius-xs)',
                    color: 'var(--color-bone-white)',
                    fontFamily: 'inherit',
                    fontSize: '0.875rem',
                    resize: 'vertical'
                  }}
                />
                {formErrors.message && (
                  <span style={{ fontSize: '0.75rem', color: '#e55353', marginTop: '0.25rem', display: 'block' }}>
                    {formErrors.message}
                  </span>
                )}
              </div>

              {/* Submit / Format Action Buttons */}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn btn-amber"
                  style={{ flexGrow: 1, padding: '0.85rem 1.25rem' }}
                >
                  <Send size={15} />
                  <span>TRANSMIT VIA MAIL CLIENT</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyFormattedBrief}
                  className="btn btn-secondary"
                  style={{ padding: '0.85rem 1.25rem' }}
                >
                  <Copy size={15} />
                  <span>COPY BRIEF</span>
                </button>
              </div>

              {/* Status feedback */}
              {composerStatus && (
                <div
                  style={{
                    padding: '0.75rem 1rem',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'rgba(197, 154, 96, 0.12)',
                    border: '1px solid rgba(197, 154, 96, 0.35)',
                    fontSize: '0.8125rem',
                    color: 'var(--color-hunter-amber)'
                  }}
                >
                  {composerStatus}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </section>
  );
};
