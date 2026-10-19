import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const About3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lighting
    const ambient = new THREE.AmbientLight(0x0a1018, 2.5);
    scene.add(ambient);

    const cyanLight = new THREE.PointLight(0x00e5ff, 12, 15);
    cyanLight.position.set(3, 3, 3);
    scene.add(cyanLight);

    const amberLight = new THREE.PointLight(0xff9e2c, 10, 15);
    amberLight.position.set(-3, -2, 2);
    scene.add(amberLight);

    // Group for 3D Neural / Polyhedral Identity Core
    const group = new THREE.Group();
    scene.add(group);

    // 1. Faceted Dodecahedron Core
    const dodecaGeo = new THREE.DodecahedronGeometry(1.4, 0);
    const dodecaMat = new THREE.MeshStandardMaterial({
      color: 0x161d26,
      roughness: 0.25,
      metalness: 0.9,
      flatShading: true
    });
    const dodecaMesh = new THREE.Mesh(dodecaGeo, dodecaMat);
    group.add(dodecaMesh);

    // Wireframe edges with cyan glow
    const edgesGeo = new THREE.EdgesGeometry(dodecaGeo);
    const edgeMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.7 });
    const wireframe = new THREE.LineSegments(edgesGeo, edgeMat);
    dodecaMesh.add(wireframe);

    // 2. Inner Glowing Amber Nucleus
    const nucleusGeo = new THREE.OctahedronGeometry(0.65, 0);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0xff9e2c,
      emissive: 0xff9e2c,
      emissiveIntensity: 0.9,
      roughness: 0.1
    });
    const nucleusMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
    group.add(nucleusMesh);

    // 3. Orbital Neural Ring with Nodes
    const ringGeo = new THREE.TorusGeometry(2.3, 0.025, 16, 80);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.8 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // Floating node satellites
    const nodeGroup = new THREE.Group();
    group.add(nodeGroup);
    const nodeGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const nodeMat = new THREE.MeshStandardMaterial({ color: 0x00e5ff, emissive: 0x00e5ff, emissiveIntensity: 0.8 });

    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 2.3, Math.sin(angle) * 2.3, 0);
      nodeGroup.add(node);
    }
    nodeGroup.rotation.x = Math.PI / 3;

    // Mouse Tracking Parallax
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 0.9;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 0.9;
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
        dodecaMesh.rotation.y = elapsed * 0.22;
        dodecaMesh.rotation.x = Math.sin(elapsed * 0.3) * 0.15;
        nucleusMesh.rotation.y = -elapsed * 0.4;
        nucleusMesh.rotation.z = Math.cos(elapsed * 0.3) * 0.25;
        ringMesh.rotation.z = elapsed * 0.15;
        nodeGroup.rotation.z = elapsed * 0.15;
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      group.rotation.y = currentX + (reducedMotion ? 0 : elapsed * 0.05);
      group.rotation.x = currentY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      dodecaGeo.dispose();
      dodecaMat.dispose();
      edgesGeo.dispose();
      edgeMat.dispose();
      nucleusGeo.dispose();
      nucleusMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      nodeGeo.dispose();
      nodeMat.dispose();
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
