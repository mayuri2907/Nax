import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Vision3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x060a10, 2);
    scene.add(ambient);

    const amberLight = new THREE.DirectionalLight(0xff9e2c, 5);
    amberLight.position.set(5, 3, 4);
    scene.add(amberLight);

    const cyanRim = new THREE.PointLight(0x00e5ff, 12, 14);
    cyanRim.position.set(-4, -3, 3);
    scene.add(cyanRim);

    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 1. Central Metallic Venture Sphere
    const sphereGeo = new THREE.SphereGeometry(1.3, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x101622,
      roughness: 0.25,
      metalness: 0.95
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    globeGroup.add(sphereMesh);

    // Latitude & Longitude Wireframe Lines
    const wireGeo = new THREE.WireframeGeometry(sphereGeo);
    const wireMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.35 });
    const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
    sphereMesh.add(wireMesh);

    // 2. Glowing Equatorial Caliper Rings
    const ring1Geo = new THREE.TorusGeometry(2.2, 0.03, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({ color: 0xff9e2c, roughness: 0.3, metalness: 0.9 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    globeGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, roughness: 0.3, metalness: 0.9 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 5;
    globeGroup.add(ring2);

    // 3. Shimmering Particle Cloud
    const particleCount = 200;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.1 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      particlePos[i * 3] = radius * Math.cos(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.sin(phi);
      particlePos[i * 3 + 2] = radius * Math.cos(phi) * Math.sin(theta);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.04,
      color: 0x00e5ff,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    globeGroup.add(particles);

    // Mouse Tracking Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.0;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.0;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 400;
      height = container.clientHeight || 400;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      if (!reducedMotion) {
        sphereMesh.rotation.y = elapsed * 0.2;
        ring1.rotation.z = elapsed * 0.18;
        ring2.rotation.z = -elapsed * 0.12;
        particles.rotation.y = elapsed * 0.08;
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      globeGroup.rotation.y += currentX * 0.05;
      globeGroup.rotation.x = currentY * 0.8;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      sphereGeo.dispose();
      sphereMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', minHeight: '380px', position: 'relative' }}
      aria-hidden="true"
    />
  );
};
