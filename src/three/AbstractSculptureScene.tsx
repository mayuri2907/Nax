import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface AbstractSculptureSceneProps {
  reducedMotion?: boolean;
}

export const AbstractSculptureScene: React.FC<AbstractSculptureSceneProps> = ({
  reducedMotion = false
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect WebGL capability
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      throw new Error('WebGL not supported');
    }

    let animationFrameId: number;
    let width = container.clientWidth || 500;
    let height = container.clientHeight || 500;

    // Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10100f, 0.04);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lighting setup - Engineered Amber & Gunmetal
    const ambientLight = new THREE.AmbientLight(0x181816, 2.0);
    scene.add(ambientLight);

    // Warm Hunter Amber Key Light
    const amberSpot = new THREE.SpotLight(0xc59a60, 18, 20, Math.PI / 4, 0.5, 1);
    amberSpot.position.set(4, 5, 5);
    scene.add(amberSpot);

    // Cool Gunmetal Rim Light for industrial silhouette definition
    const rimLight = new THREE.DirectionalLight(0x77766f, 3.5);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Soft warm fill light from below
    const bottomFill = new THREE.PointLight(0xc59a60, 4, 10);
    bottomFill.position.set(0, -4, 2);
    scene.add(bottomFill);

    // -----------------------------------------------------------------
    // Geometries & Materials: Monolith & Orbital Rings
    // -----------------------------------------------------------------
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // Materials
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1c1d1c,
      roughness: 0.28,
      metalness: 0.88,
      flatShading: true
    });

    const brushedGunmetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a2b2a,
      roughness: 0.45,
      metalness: 0.82
    });

    const amberCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0xc59a60,
      emissive: 0xc59a60,
      emissiveIntensity: 0.85,
      roughness: 0.2,
      metalness: 0.5
    });

    const amberEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0xc59a60,
      linewidth: 1.5,
      transparent: true,
      opacity: 0.65
    });

    const subtleEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x77766f,
      transparent: true,
      opacity: 0.25
    });

    // 1. Central Faceted Monolith
    const monolithGeo = new THREE.IcosahedronGeometry(1.6, 0);
    const monolithMesh = new THREE.Mesh(monolithGeo, darkMetalMaterial);
    rootGroup.add(monolithMesh);

    // Precision chamfer wireframe overlay
    const monolithEdges = new THREE.EdgesGeometry(monolithGeo);
    const monolithWireframe = new THREE.LineSegments(monolithEdges, amberEdgeMaterial);
    monolithMesh.add(monolithWireframe);

    // 2. Glowing Amber Core (visible through faceted gaps or inner glow)
    const coreGeo = new THREE.OctahedronGeometry(0.7, 1);
    const coreMesh = new THREE.Mesh(coreGeo, amberCoreMaterial);
    rootGroup.add(coreMesh);

    // 3. Primary Machined Caliper Ring
    const ring1Geo = new THREE.TorusGeometry(2.5, 0.035, 16, 100);
    const ring1Mesh = new THREE.Mesh(ring1Geo, brushedGunmetalMaterial);
    ring1Mesh.rotation.x = Math.PI / 3;
    ring1Mesh.rotation.y = Math.PI / 6;
    rootGroup.add(ring1Mesh);

    // 4. Secondary Counter-Orbital Caliper Ring
    const ring2Geo = new THREE.TorusGeometry(2.9, 0.025, 16, 100);
    const ring2Mesh = new THREE.Mesh(ring2Geo, brushedGunmetalMaterial);
    ring2Mesh.rotation.x = -Math.PI / 4;
    ring2Mesh.rotation.z = Math.PI / 5;
    rootGroup.add(ring2Mesh);

    // 5. Floating Precision Crosshairs & Markers
    const markerGroup = new THREE.Group();
    rootGroup.add(markerGroup);

    const markerPositions = [
      [2.2, 1.4, 0.8],
      [-2.0, -1.2, 1.1],
      [1.1, -2.4, -0.6],
      [-1.5, 2.0, -1.0],
      [0.0, 2.8, 0.4]
    ];

    const markerGeo = new THREE.BoxGeometry(0.08, 0.08, 0.08);
    const markerEdges = new THREE.EdgesGeometry(markerGeo);

    markerPositions.forEach(([x, y, z]) => {
      const markerMesh = new THREE.Mesh(markerGeo, darkMetalMaterial);
      markerMesh.position.set(x, y, z);
      const wire = new THREE.LineSegments(markerEdges, subtleEdgeMaterial);
      markerMesh.add(wire);
      markerGroup.add(markerMesh);
    });

    // -----------------------------------------------------------------
    // Interactivity: Smooth Mouse Parallax & Scroll Reaction
    // -----------------------------------------------------------------
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;
    let targetScrollRotation = 0;
    let currentScrollRotation = 0;

    const hasPointer = window.matchMedia('(pointer: fine)').matches;

    const handlePointerMove = (e: MouseEvent) => {
      if (!hasPointer) return;
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      targetMouseX = x * 0.8;
      targetMouseY = y * 0.8;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      targetScrollRotation = scrollY * 0.0018;
    };

    if (hasPointer) {
      window.addEventListener('mousemove', handlePointerMove, { passive: true });
    }
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Responsive Resize Handler
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 500;
      height = container.clientHeight || 500;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // -----------------------------------------------------------------
    // Animation Loop with Lerp Smoothing
    // -----------------------------------------------------------------
    const startTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = (performance.now() - startTime) * 0.001;

      if (!reducedMotion) {
        // Idle Ambient Floating
        monolithMesh.rotation.y = elapsedTime * 0.18 + currentScrollRotation;
        monolithMesh.rotation.x = Math.sin(elapsedTime * 0.25) * 0.12;

        coreMesh.rotation.y = -elapsedTime * 0.32;
        coreMesh.rotation.z = Math.cos(elapsedTime * 0.28) * 0.2;

        ring1Mesh.rotation.z = elapsedTime * 0.12;
        ring2Mesh.rotation.y = -elapsedTime * 0.09;

        markerGroup.rotation.y = elapsedTime * 0.06;
      }

      // Parallax damping
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;
      currentScrollRotation += (targetScrollRotation - currentScrollRotation) * 0.08;

      rootGroup.rotation.y = currentMouseX + (reducedMotion ? 0 : currentScrollRotation);
      rootGroup.rotation.x = currentMouseY;

      // Slight camera oscillation
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // -----------------------------------------------------------------
    // Cleanup on unmount
    // -----------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      if (hasPointer) {
        window.removeEventListener('mousemove', handlePointerMove);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      // Dispose Three.js objects
      monolithGeo.dispose();
      monolithEdges.dispose();
      coreGeo.dispose();
      ring1Geo.dispose();
      ring2Geo.dispose();
      markerGeo.dispose();
      markerEdges.dispose();

      darkMetalMaterial.dispose();
      brushedGunmetalMaterial.dispose();
      amberCoreMaterial.dispose();
      amberEdgeMaterial.dispose();
      subtleEdgeMaterial.dispose();

      renderer.dispose();
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className="scene-canvas-container"
      style={{
        width: '100%',
        height: '100%',
        minHeight: '440px',
        position: 'relative',
        cursor: 'grab'
      }}
      aria-hidden="true"
    />
  );
};
