import React, { useState } from 'react';
import { Mail, Copy, Check, Send, Globe, MapPin, Clock } from 'lucide-react';
import { contactConfig } from '../data/socialLinks';
import { Card3DTilt } from '../components/Card3DTilt';

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

export const ContactPage: React.FC = () => {
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

    const subject = encodeURIComponent(`Project Inquiry from ${formName} — Navin Chaudhary`);
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
    <div className="page-viewport" aria-label="Contact and Collaboration Page">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-label">06 / LET&rsquo;S BUILD</div>
          <h1 className="section-title">Have a problem worth solving?</h1>
          <p className="section-subtitle">
            Let&rsquo;s discuss ideas, products, and opportunities to build something useful together.
          </p>
        </div>

        {/* Contact Grid */}
        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '3rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Direct Coordinates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            <Card3DTilt maxTilt={5} scale={1.01}>
              <div
                className="luxury-glass-card"
                style={{
                  padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  border: '1px solid rgba(229, 169, 82, 0.4)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)', letterSpacing: '0.12em' }}>
                    DIRECT INBOX
                  </span>
                  <span className="badge badge-accent">AVAILABLE</span>
                </div>

                <div>
                  <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>PRIMARY COMMUNICATIONS:</span>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginTop: '0.25rem',
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word'
                    }}
                  >
                    {contactConfig.email}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={`mailto:${contactConfig.email}`}
                    className="btn btn-accent"
                    style={{ padding: '0.75rem 1.4rem', fontSize: '0.875rem' }}
                  >
                    <Mail size={16} />
                    <span>OPEN EMAIL</span>
                  </a>

                  <button
                    onClick={copyEmail}
                    className="btn btn-glass"
                    style={{ padding: '0.75rem 1.4rem', fontSize: '0.875rem' }}
                    aria-label="Copy email address to clipboard"
                  >
                    {copied ? <Check size={16} color="var(--color-accent)" /> : <Copy size={16} />}
                    <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY ADDRESS'}</span>
                  </button>
                </div>
              </div>
            </Card3DTilt>

            {/* Social Network Profiles with 3D Tilt */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)', letterSpacing: '0.12em' }}>
                VERIFIED PLATFORMS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {contactConfig.socials.map((social) => {
                  const isExternal = social.url.startsWith('http');
                  return (
                    <Card3DTilt key={social.platform} maxTilt={4} scale={1.01}>
                      <a
                        href={social.url}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        className="luxury-glass-card"
                        style={{
                          padding: '1.15rem 1.4rem',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          textDecoration: 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          {social.platform === 'GitHub' && <GithubIcon size={20} color="var(--color-azure)" />}
                          {social.platform === 'LinkedIn' && <LinkedinIcon size={20} color="var(--color-azure)" />}
                          {social.platform === 'Startup' && <Globe size={20} color="var(--color-accent)" />}
                          <span style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                            {social.label}
                          </span>
                        </div>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                          {social.displayValue}
                        </span>
                      </a>
                    </Card3DTilt>
                  );
                })}
              </div>
            </div>

            {/* Location & Timezone info */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1rem',
                padding: '1.25rem',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--color-border)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <MapPin size={18} color="var(--color-accent)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>LOCATION</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{contactConfig.location}</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Clock size={18} color="var(--color-azure)" />
                <div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>TIMEZONE</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-primary)', fontWeight: 500 }}>{contactConfig.timezone}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Composer */}
          <Card3DTilt maxTilt={4} scale={1.01}>
            <div
              className="luxury-glass-card"
              style={{
                padding: 'clamp(1.5rem, 3.5vw, 2.5rem)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.12)'
              }}
            >
              <div>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-accent)', letterSpacing: '0.12em' }}>
                  INQUIRY COMPOSER &bull; DIRECT TRANSMISSION
                </span>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--color-text-primary)', marginTop: '0.35rem', letterSpacing: '-0.02em' }}>
                  Draft a Project Specification
                </h2>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                  Share your vision, product goals, or technical bottleneck. You can immediately launch your email client or copy the formatted brief.
                </p>
              </div>

              <form onSubmit={handleLaunchEmailClient} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label
                    htmlFor="contact-name"
                    style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}
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
                      padding: '0.85rem 1rem',
                      backgroundColor: '#ffffff',
                      border: formErrors.name ? '1px solid #ef4444' : '1px solid rgba(15, 23, 42, 0.14)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem'
                    }}
                  />
                  {formErrors.name && (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'block' }}>
                      {formErrors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}
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
                      padding: '0.85rem 1rem',
                      backgroundColor: '#ffffff',
                      border: formErrors.email ? '1px solid #ef4444' : '1px solid rgba(15, 23, 42, 0.14)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem'
                    }}
                  />
                  {formErrors.email && (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'block' }}>
                      {formErrors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.4rem' }}
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
                      padding: '0.85rem 1rem',
                      backgroundColor: '#ffffff',
                      border: formErrors.message ? '1px solid #ef4444' : '1px solid rgba(15, 23, 42, 0.14)',
                      borderRadius: 'var(--radius-xs)',
                      color: 'var(--color-text-primary)',
                      fontFamily: 'inherit',
                      fontSize: '0.9rem',
                      resize: 'vertical'
                    }}
                  />
                  {formErrors.message && (
                    <span style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem', display: 'block' }}>
                      {formErrors.message}
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  <button
                    type="submit"
                    className="btn btn-accent"
                    style={{ flexGrow: 1, padding: '0.85rem 1.4rem' }}
                  >
                    <Send size={15} />
                    <span>TRANSMIT VIA MAIL CLIENT</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyFormattedBrief}
                    className="btn btn-glass"
                    style={{ padding: '0.85rem 1.4rem' }}
                  >
                    <Copy size={15} />
                    <span>COPY BRIEF</span>
                  </button>
                </div>

                {composerStatus && (
                  <div
                    style={{
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-xs)',
                      backgroundColor: 'rgba(229, 169, 82, 0.1)',
                      border: '1px solid rgba(229, 169, 82, 0.35)',
                      fontSize: '0.8125rem',
                      color: 'var(--color-accent)'
                    }}
                  >
                    {composerStatus}
                  </div>
                )}
              </form>
            </div>
          </Card3DTilt>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr 1.15fr !important;
          }
        }
      `}</style>
    </div>
  );
};
