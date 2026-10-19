import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useReducedMotion } from '../hooks/useReducedMotion';

export const Capabilities3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 400;
    let height = container.clientHeight || 400;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambient = new THREE.AmbientLight(0x080c14, 2);
    scene.add(ambient);

    const topCyan = new THREE.DirectionalLight(0x00e5ff, 4);
    topCyan.position.set(4, 5, 4);
    scene.add(topCyan);

    const bottomAmber = new THREE.PointLight(0xff9e2c, 8, 12);
    bottomAmber.position.set(-3, -3, 2);
    scene.add(bottomAmber);

    const matrixGroup = new THREE.Group();
    scene.add(matrixGroup);

    // 3D Matrix of Kinetic Micro-Cubes
    const cubeGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cubeEdges = new THREE.EdgesGeometry(cubeGeo);

    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x121924,
      roughness: 0.2,
      metalness: 0.9
    });

    const cyanEdgeMat = new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.75 });
    const amberEdgeMat = new THREE.LineBasicMaterial({ color: 0xff9e2c, transparent: true, opacity: 0.75 });

    const cubes: THREE.Mesh[] = [];
    const cubeOriginalPositions: [number, number, number][] = [];

    // 3x3x3 array of cubes
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          if (x === 0 && y === 0 && z === 0) continue; // Hollow center for glowing core

          const cube = new THREE.Mesh(cubeGeo, metalMat);
          const posX = x * 0.95;
          const posY = y * 0.95;
          const posZ = z * 0.95;
          cube.position.set(posX, posY, posZ);

          const wireMat = (x + y + z) % 2 === 0 ? cyanEdgeMat : amberEdgeMat;
          const wire = new THREE.LineSegments(cubeEdges, wireMat);
          cube.add(wire);

          matrixGroup.add(cube);
          cubes.push(cube);
          cubeOriginalPositions.push([posX, posY, posZ]);
        }
      }
    }

    // Central Glowing Quantum Core
    const coreGeo = new THREE.IcosahedronGeometry(0.5, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xff9e2c,
      emissive: 0xff9e2c,
      emissiveIntensity: 1.2,
      roughness: 0.1
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    matrixGroup.add(coreMesh);

    // Mouse Tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 1.2;
      targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 1.2;
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
        matrixGroup.rotation.y = elapsed * 0.25;
        matrixGroup.rotation.x = Math.sin(elapsed * 0.2) * 0.2;
        coreMesh.rotation.y = -elapsed * 0.5;

        // Animate cubes pulsating outward & rotating slightly
        cubes.forEach((cube, i) => {
          const [ox, oy, oz] = cubeOriginalPositions[i];
          const pulse = 1 + Math.sin(elapsed * 2 + i * 0.3) * 0.08;
          cube.position.set(ox * pulse, oy * pulse, oz * pulse);
          cube.rotation.x = Math.sin(elapsed + i) * 0.1;
          cube.rotation.y = Math.cos(elapsed + i) * 0.1;
        });
      }

      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;

      matrixGroup.rotation.y += currentX * 0.05;
      matrixGroup.rotation.x += currentY * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('resize', handleResize);

      cubeGeo.dispose();
      cubeEdges.dispose();
      metalMat.dispose();
      cyanEdgeMat.dispose();
      amberEdgeMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
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
