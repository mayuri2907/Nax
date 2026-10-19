import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Projects3DScene: React.FC = () => {
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
    const ambient = new THREE.AmbientLight(0x0c131d, 2.5);
    scene.add(ambient);

    const keyCyan = new THREE.PointLight(0x00e5ff, 15, 12);
    keyCyan.position.set(3, 4, 3);
    scene.add(keyCyan);

    const rimAmber = new THREE.PointLight(0xff9e2c, 10, 10);
    rimAmber.position.set(-3, -2, -2);
    scene.add(rimAmber);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // 1. Holographic Blueprint Outer Cage
    const cageGeo = new THREE.BoxGeometry(2.4, 2.4, 2.4);
    const cageEdges = new THREE.EdgesGeometry(cageGeo);
    const cageMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.65 });
    const cage = new THREE.LineSegments(cageEdges, cageMat);
    rootGroup.add(cage);

    // 2. Inner Rotating Octahedral Core
    const octaGeo = new THREE.OctahedronGeometry(1.2, 0);
    const octaMat = new THREE.MeshStandardMaterial({
      color: 0x161e2c,
      roughness: 0.2,
      metalness: 0.95,
      flatShading: true
    });
    const octaMesh = new THREE.Mesh(octaGeo, octaMat);
    const octaEdges = new THREE.EdgesGeometry(octaGeo);
    const octaEdgeMat = new THREE.LineBasicMaterial({ color: 0xff9e2c, transparent: true, opacity: 0.8 });
    octaMesh.add(new THREE.LineSegments(octaEdges, octaEdgeMat));
    rootGroup.add(octaMesh);

    // 3. Orbital Laser Track Ring
    const orbitGeo = new THREE.RingGeometry(1.8, 1.85, 64);
    const orbitMat = new THREE.MeshBasicMaterial({ color: 0x00e5ff, side: THREE.DoubleSide, transparent: true, opacity: 0.4 });
    const orbitMesh = new THREE.Mesh(orbitGeo, orbitMat);
    orbitMesh.rotation.x = Math.PI / 2.5;
    rootGroup.add(orbitMesh);

    // 4. Floating Data Nodes
    const nodesGroup = new THREE.Group();
    rootGroup.add(nodesGroup);
    const nodeGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0xff9e2c });

    for (let i = 0; i < 4; i++) {
      const angle = (i / 4) * Math.PI * 2;
      const node = new THREE.Mesh(nodeGeo, nodeMat);
      node.position.set(Math.cos(angle) * 1.82, Math.sin(angle) * 1.82, 0);
      nodesGroup.add(node);
    }
    nodesGroup.rotation.x = Math.PI / 2.5;

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
        cage.rotation.y = elapsed * 0.15;
        cage.rotation.z = Math.sin(elapsed * 0.2) * 0.1;
        octaMesh.rotation.y = -elapsed * 0.3;
        octaMesh.rotation.x = elapsed * 0.2;
        nodesGroup.rotation.z = elapsed * 0.4;
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      rootGroup.rotation.y = currentX + (reducedMotion ? 0 : elapsed * 0.05);
      rootGroup.rotation.x = currentY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      cageGeo.dispose();
      cageEdges.dispose();
      cageMat.dispose();
      octaGeo.dispose();
      octaMat.dispose();
      octaEdges.dispose();
      octaEdgeMat.dispose();
      orbitGeo.dispose();
      orbitMat.dispose();
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
