import React from 'react';

/**
 * Art-directed SVG & CSS metallic fallback rendered when WebGL is unsupported or disabled.
 * Features an engineered dark brushed metal monolith with warm amber highlights,
 * geometric caliper rings, and architectural coordinate ticks.
 */
export const SceneFallback: React.FC = () => {
  return (
    <div 
      className="scene-fallback-wrapper"
      role="img"
      aria-label="Engineered abstract metallic sculpture with amber illumination"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '440px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background warm amber glow */}
      <div 
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 154, 96, 0.22) 0%, rgba(16, 16, 15, 0) 70%)',
          filter: 'blur(32px)',
          pointerEvents: 'none'
        }}
      />

      <svg 
        viewBox="0 0 500 500" 
        style={{
          width: '100%',
          maxWidth: '440px',
          height: 'auto',
          filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.85))'
        }}
      >
        <defs>
          <linearGradient id="metalGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3c3e3c" />
            <stop offset="40%" stopColor="#222322" />
            <stop offset="70%" stopColor="#151514" />
            <stop offset="100%" stopColor="#2e302e" />
          </linearGradient>

          <linearGradient id="metalGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#77766F" />
            <stop offset="50%" stopColor="#292A29" />
            <stop offset="100%" stopColor="#121211" />
          </linearGradient>

          <linearGradient id="amberAccent" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C59A60" />
            <stop offset="100%" stopColor="#e5bc82" />
          </linearGradient>

          <radialGradient id="coreAmber" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C59A60" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#C59A60" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#10100F" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Caliper Rings */}
        <circle cx="250" cy="250" r="190" fill="none" stroke="rgba(242, 238, 230, 0.08)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="250" cy="250" r="160" fill="none" stroke="rgba(197, 154, 96, 0.25)" strokeWidth="1.5" strokeDasharray="60 15 10 15" />
        <circle cx="250" cy="250" r="130" fill="none" stroke="rgba(119, 118, 111, 0.18)" strokeWidth="1" />

        {/* Core Amber Energy Sphere */}
        <circle cx="250" cy="250" r="90" fill="url(#coreAmber)" />

        {/* Engineered Faceted Monolith Geometry */}
        {/* Rear facet */}
        <polygon points="250,90 350,170 330,330 250,410 170,330 150,170" fill="url(#metalGrad1)" stroke="rgba(242, 238, 230, 0.12)" strokeWidth="1" />
        
        {/* Core faceted planes */}
        <polygon points="250,120 320,180 250,250" fill="#2d2e2d" stroke="rgba(242, 238, 230, 0.15)" strokeWidth="1" />
        <polygon points="250,120 180,180 250,250" fill="#1f201f" stroke="rgba(242, 238, 230, 0.15)" strokeWidth="1" />
        <polygon points="180,180 200,320 250,250" fill="#282928" stroke="rgba(242, 238, 230, 0.12)" strokeWidth="1" />
        <polygon points="320,180 300,320 250,250" fill="url(#metalGrad2)" stroke="rgba(242, 238, 230, 0.12)" strokeWidth="1" />
        <polygon points="200,320 250,380 250,250" fill="#181817" stroke="rgba(197, 154, 96, 0.4)" strokeWidth="1.5" />
        <polygon points="300,320 250,380 250,250" fill="#222322" stroke="rgba(197, 154, 96, 0.4)" strokeWidth="1.5" />

        {/* Amber Precision Inlay Line */}
        <line x1="250" y1="120" x2="250" y2="380" stroke="url(#amberAccent)" strokeWidth="2.5" />
        <line x1="180" y1="250" x2="320" y2="250" stroke="rgba(197, 154, 96, 0.6)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Technical Coordinate Markers */}
        <circle cx="250" cy="120" r="3.5" fill="#F2EEE6" />
        <circle cx="250" cy="250" r="4.5" fill="#C59A60" />
        <circle cx="250" cy="380" r="3.5" fill="#F2EEE6" />
        <circle cx="180" cy="180" r="2.5" fill="#C59A60" />
        <circle cx="320" cy="180" r="2.5" fill="#C59A60" />

        {/* Precision Crosshairs & Caliper Ticks */}
        <line x1="240" y1="70" x2="260" y2="70" stroke="#77766F" strokeWidth="1" />
        <line x1="250" y1="60" x2="250" y2="80" stroke="#77766F" strokeWidth="1" />
        <text x="268" y="74" fill="#A9A49B" fontSize="10" fontFamily="JetBrains Mono" letterSpacing="1">SEC.00 // ARCH.CORE</text>
        
        <line x1="240" y1="430" x2="260" y2="430" stroke="#C59A60" strokeWidth="1" />
        <text x="180" y="445" fill="#C59A60" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="1.5">GEO.ID: 882-VX // VYROBYTE</text>
      </svg>
    </div>
  );
};
