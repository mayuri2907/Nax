import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Principles3DScene: React.FC = () => {
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
    const ambient = new THREE.AmbientLight(0x060c14, 2.5);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x00e5ff, 14, 15);
    cyanLight.position.set(4, 4, 3);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xff9e2c, 12, 15);
    amberLight.position.set(-4, -3, 3);
    scene.add(amberLight);

    const group = new THREE.Group();
    scene.add(group);

    // 3 Crystalline Prisms representing the 3 Principles
    const prismGeo = new THREE.ConeGeometry(0.85, 2.2, 5);
    const prismEdges = new THREE.EdgesGeometry(prismGeo);

    const prismMat = new THREE.MeshStandardMaterial({
      color: 0x141b26,
      roughness: 0.15,
      metalness: 0.95,
      flatShading: true
    });

    const cyanEdgeMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.85 });
    const amberEdgeMat = new THREE.LineBasicMaterial({ color: 0xff9e2c, transparent: true, opacity: 0.85 });

    const prisms: THREE.Mesh[] = [];
    const angles = [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3];

    angles.forEach((angle, idx) => {
      const prism = new THREE.Mesh(prismGeo, prismMat);
      const radius = 1.6;
      prism.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.5, 0);
      prism.rotation.z = angle + Math.PI / 2;

      const edge = new THREE.LineSegments(prismEdges, idx % 2 === 0 ? cyanEdgeMat : amberEdgeMat);
      prism.add(edge);

      group.add(prism);
      prisms.push(prism);
    });

    // Center Quantum Keystone
    const keystoneGeo = new THREE.OctahedronGeometry(0.5, 0);
    const keystoneMat = new THREE.MeshStandardMaterial({
      color: 0xff9e2c,
      emissive: 0xff9e2c,
      emissiveIntensity: 1.1,
      roughness: 0.2
    });
    const keystone = new THREE.Mesh(keystoneGeo, keystoneMat);
    group.add(keystone);

    // Mouse Tracking Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.1;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.1;
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
        group.rotation.y = elapsed * 0.18;
        keystone.rotation.y = -elapsed * 0.4;
        keystone.rotation.x = elapsed * 0.3;

        prisms.forEach((p, idx) => {
          p.rotation.y = elapsed * 0.3 + idx;
          p.position.y += Math.sin(elapsed * 2 + idx) * 0.002;
        });
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      group.rotation.y += currentX * 0.04;
      group.rotation.x = currentY * 0.7;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      prismGeo.dispose();
      prismEdges.dispose();
      prismMat.dispose();
      cyanEdgeMat.dispose();
      amberEdgeMat.dispose();
      keystoneGeo.dispose();
      keystoneMat.dispose();
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
