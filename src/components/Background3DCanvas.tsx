import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Background3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 5, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // -------------------------------------------------------------
    // Interactive 3D Particle Wave Mesh
    // -------------------------------------------------------------
    const gridX = 45;
    const gridY = 35;
    const numParticles = gridX * gridY;

    const positions = new Float32Array(numParticles * 3);
    const scales = new Float32Array(numParticles);

    let idx = 0;
    for (let ix = 0; ix < gridX; ix++) {
      for (let iy = 0; iy < gridY; iy++) {
        positions[idx * 3] = (ix - gridX / 2) * 1.5;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = (iy - gridY / 2) * 1.5;
        scales[idx] = 1.0;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom shader material for luminous particles
    const material = new THREE.PointsMaterial({
      color: 0xe5a952,
      size: 0.12,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(geometry, material);
    particles.rotation.x = 0.35;
    particles.position.y = -4;
    scene.add(particles);

    // Ambient floating 3D geometric polyhedral rings in far background
    const ringGeo = new THREE.TorusGeometry(8, 0.04, 16, 120);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.15 });
    const bgRing = new THREE.Mesh(ringGeo, ringMat);
    bgRing.position.set(10, 2, -15);
    bgRing.rotation.x = Math.PI / 3;
    scene.add(bgRing);

    // Mouse Tracking Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 4;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let count = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!reducedMotion) {
        count += 0.035;

        const posAttr = geometry.attributes.position;
        const array = posAttr.array as Float32Array;

        let pIdx = 0;
        for (let ix = 0; ix < gridX; ix++) {
          for (let iy = 0; iy < gridY; iy++) {
            array[pIdx * 3 + 1] =
              Math.sin((ix + count) * 0.3) * 1.2 +
              Math.sin((iy + count) * 0.4) * 1.0;
            pIdx++;
          }
        }
        posAttr.needsUpdate = true;

        bgRing.rotation.z += 0.002;
        bgRing.rotation.y += 0.001;
      }

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX;
      camera.position.y = 5 - mouseY;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 'var(--z-bg-canvas)' as unknown as number,
        opacity: 0.85
      }}
    />
  );
};
