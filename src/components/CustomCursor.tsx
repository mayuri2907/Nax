import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Only enable custom cursor if fine pointer (mouse) is available
    if (typeof window === 'undefined' || !window.matchMedia('(pointer: fine)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let animationFrameId: number;

    const particles: Particle[] = [];
    const colors = ['#b45309', '#0284c7', '#0f172a', '#64748b'];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Spawn particles on mouse movement for high-tech tracer effect
      if (Math.random() < 0.6) {
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5 - 0.5,
          size: Math.random() * 2.5 + 1,
          alpha: 0.85,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest('a') ||
          target.closest('button') ||
          target.closest('.industrial-card') ||
          target.closest('[role="button"]') ||
          target.closest('[role="tab"]') ||
          target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA')
      ) {
        isHovering = true;
      } else {
        isHovering = false;
      }
    };

    const handleMouseDown = () => {
      isClicking = true;
      // Burst of particles on click
      for (let i = 0; i < 12; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4 + 1;
        particles.push({
          x: mouseX,
          y: mouseY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 3 + 1.5,
          alpha: 1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const handleMouseUp = () => {
      isClicking = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    // Animation Loop for Ring Lerp and Particle Tracer Rendering
    const render = () => {
      // Lerp ring towards mouse
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      const scale = isClicking ? 0.8 : isHovering ? 1.6 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scale})`;
      ring.style.borderColor = isHovering ? 'var(--color-cyan-glow)' : 'var(--color-hunter-amber)';
      ring.style.backgroundColor = isHovering ? 'rgba(0, 229, 255, 0.08)' : 'transparent';

      // Clear Canvas
      ctx.clearRect(0, 0, width, height);

      // Render & update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;
        p.size *= 0.96;

        if (p.alpha <= 0 || p.size <= 0.3) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* Canvas for particle tracer trail */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="custom-cursor-element"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          zIndex: 8999
        }}
      />

      {/* Main Core Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="custom-cursor-element"
        style={{
          position: 'fixed',
          top: -4,
          left: -4,
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent)',
          boxShadow: '0 0 8px rgba(180, 83, 9, 0.7)',
          pointerEvents: 'none',
          zIndex: 9000,
          willChange: 'transform'
        }}
      />

      {/* Outer Magnetic Tracer Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="custom-cursor-element"
        style={{
          position: 'fixed',
          top: -18,
          left: -18,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: '1.5px solid rgba(15, 23, 42, 0.45)',
          boxShadow: '0 0 10px rgba(15, 23, 42, 0.08)',
          pointerEvents: 'none',
          zIndex: 8999,
          willChange: 'transform',
          transition: 'border-color 0.15s ease, background-color 0.15s ease'
        }}
      />
    </>
  );
};
