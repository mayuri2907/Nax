import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Contact3DScene: React.FC = () => {
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
    const ambient = new THREE.AmbientLight(0x060c14, 2);
    scene.add(ambient);

    const cyanSpot = new THREE.SpotLight(0x00e5ff, 15, 15, Math.PI / 4, 0.5);
    cyanSpot.position.set(3, 4, 3);
    scene.add(cyanSpot);

    const amberFill = new THREE.PointLight(0xff9e2c, 10, 10);
    amberFill.position.set(-3, -2, 2);
    scene.add(amberFill);

    const beaconGroup = new THREE.Group();
    scene.add(beaconGroup);

    // 1. Central Quantum Beacon Spire
    const spireGeo = new THREE.CylinderGeometry(0.2, 0.6, 2.5, 6);
    const spireEdges = new THREE.EdgesGeometry(spireGeo);
    const spireMat = new THREE.MeshStandardMaterial({
      color: 0x141d2a,
      roughness: 0.2,
      metalness: 0.95,
      flatShading: true
    });
    const spire = new THREE.Mesh(spireGeo, spireMat);
    const spireEdgeMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.8 });
    spire.add(new THREE.LineSegments(spireEdges, spireEdgeMat));
    beaconGroup.add(spire);

    // 2. Beacon Radiant Emitter Tip
    const tipGeo = new THREE.OctahedronGeometry(0.35, 0);
    const tipMat = new THREE.MeshStandardMaterial({
      color: 0xff9e2c,
      emissive: 0xff9e2c,
      emissiveIntensity: 1.5
    });
    const tip = new THREE.Mesh(tipGeo, tipMat);
    tip.position.y = 1.4;
    beaconGroup.add(tip);

    // 3. Concentric Signal Pulse Rings
    const ringCount = 3;
    const pulseRings: THREE.Mesh[] = [];
    const ringGeo = new THREE.RingGeometry(0.8, 0.85, 48);

    for (let i = 0; i < ringCount; i++) {
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x00e5ff : 0xff9e2c,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2;
      ringMesh.position.y = 1.4;
      beaconGroup.add(ringMesh);
      pulseRings.push(ringMesh);
    }

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
        spire.rotation.y = elapsed * 0.25;
        tip.rotation.y = -elapsed * 0.6;
        tip.rotation.z = elapsed * 0.3;

        // Animate expanding signal pulse waves
        pulseRings.forEach((ring, idx) => {
          const cycle = (elapsed * 0.8 + idx * 0.33) % 1;
          const scale = 0.5 + cycle * 2.8;
          ring.scale.set(scale, scale, scale);
          const mat = ring.material as THREE.MeshBasicMaterial;
          mat.opacity = (1 - cycle) * 0.75;
        });
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      beaconGroup.rotation.y += currentX * 0.05;
      beaconGroup.rotation.x = currentY * 0.6;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      spireGeo.dispose();
      spireEdges.dispose();
      spireMat.dispose();
      spireEdgeMat.dispose();
      tipGeo.dispose();
      tipMat.dispose();
      ringGeo.dispose();
      pulseRings.forEach((r) => (r.material as THREE.Material).dispose());
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
