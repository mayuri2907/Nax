import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Cpu, Sparkles, Terminal } from 'lucide-react';
import { profileData } from '../data/profile';
import { Card3DTilt } from '../components/Card3DTilt';

export const HomePage: React.FC = () => {
  return (
    <div className="page-viewport" aria-label="Founder Overview Page">
      <div className="container">
        <div
          style={{
            maxWidth: '920px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2.5rem'
          }}
        >
          {/* Top Identity Badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flexWrap: 'wrap' }}>
            <div className="badge badge-accent">
              <span className="badge-dot" />
              <span>{profileData.heroSecondary}</span>
            </div>
            <div className="badge">
              <Terminal size={13} color="var(--color-accent)" />
              <span>FOUNDER &bull; FULL-STACK ARCHITECT</span>
            </div>
          </div>

          {/* Main Editorial Headline */}
          <h1
            style={{
              fontSize: 'clamp(2.75rem, 6vw, 5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: 'var(--color-text-primary)'
            }}
          >
            NOT HERE TO FOLLOW.<br />
            <span className="gradient-text-accent">
              HERE TO BUILD.
            </span>
          </h1>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.5vw, 1.35rem)',
              lineHeight: 1.65,
              color: 'var(--color-text-secondary)',
              maxWidth: '720px'
            }}
          >
            {profileData.heroCopy}
          </p>

          {/* Primary Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '0.5rem'
            }}
          >
            <Link to="/projects" className="btn btn-accent" aria-label="Explore selected engineering builds">
              <span>EXPLORE SELECTED BUILDS</span>
              <Layers size={16} />
            </Link>

            <Link to="/about" className="btn btn-glass" aria-label="Read story about Navin Chaudhary">
              <span>ABOUT NAVIN</span>
              <ArrowRight size={15} />
            </Link>

            <Link to="/capabilities" className="btn btn-glass" aria-label="View capabilities and craft">
              <span>CRAFT &amp; CAPABILITIES</span>
              <Cpu size={15} />
            </Link>
          </div>

          {/* 3 Core Highlight Pillars in Luxury Glass Cards with 3D Tilt */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.5rem',
              marginTop: '1.5rem',
              paddingTop: '2rem',
              borderTop: '1px solid var(--color-border)'
            }}
          >
            <Card3DTilt maxTilt={6} scale={1.02}>
              <div className="luxury-glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                  <Cpu size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                  Resilient Architecture
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Decoupled distributed systems, real-time WebSockets, and predictable state synchronization.
                </p>
              </div>
            </Card3DTilt>

            <Card3DTilt maxTilt={6} scale={1.02}>
              <div className="luxury-glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ color: 'var(--color-azure)', marginBottom: '0.75rem' }}>
                  <Sparkles size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                  Kinetic Digital Craft
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Hardware-accelerated 3D motion, fluid typography, and tactile interface engineering.
                </p>
              </div>
            </Card3DTilt>

            <Card3DTilt maxTilt={6} scale={1.02}>
              <div className="luxury-glass-card" style={{ padding: '1.75rem' }}>
                <div style={{ color: 'var(--color-accent)', marginBottom: '0.75rem' }}>
                  <Layers size={24} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
                  Venture Building
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                  Transforming promising software concepts into reliable, production-grade products through VYROBYTE.
                </p>
              </div>
            </Card3DTilt>
          </div>
        </div>
      </div>
    </div>
  );
};
