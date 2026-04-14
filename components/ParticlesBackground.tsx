'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.warn('WebGL not supported, using fallback background');
      return;
    }

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = 150;
    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

      velocities.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x00f2ff,
      size: 0.3,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Second layer - violet particles
    const positions2 = new Float32Array(particleCount * 3);
    const velocities2: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      positions2[i * 3] = (Math.random() - 0.5) * 60;
      positions2[i * 3 + 1] = (Math.random() - 0.5) * 60;
      positions2[i * 3 + 2] = (Math.random() - 0.5) * 40;

      velocities2.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.015,
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    const geometry2 = new THREE.BufferGeometry();
    geometry2.setAttribute('position', new THREE.BufferAttribute(positions2, 3));

    const material2 = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.25,
      transparent: true,
      opacity: 0.5,
      sizeAttenuation: true,
    });

    const particles2 = new THREE.Points(geometry2, material2);
    scene.add(particles2);

    // Animation
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / width) * 2 - 1;
      mouseY = -(event.clientY / height) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const positionsArray = particles.geometry.attributes.position.array as Float32Array;
      const positionsArray2 = particles2.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        positionsArray[i * 3] += velocities[i].x + mouseX * 0.01;
        positionsArray[i * 3 + 1] += velocities[i].y + mouseY * 0.01;
        positionsArray[i * 3 + 2] += velocities[i].z;

        // Boundary check
        if (Math.abs(positionsArray[i * 3]) > 30) velocities[i].x *= -1;
        if (Math.abs(positionsArray[i * 3 + 1]) > 30) velocities[i].y *= -1;
        if (Math.abs(positionsArray[i * 3 + 2]) > 20) velocities[i].z *= -1;

        positionsArray2[i * 3] += velocities2[i].x + mouseX * 0.008;
        positionsArray2[i * 3 + 1] += velocities2[i].y + mouseY * 0.008;
        positionsArray2[i * 3 + 2] += velocities2[i].z;

        if (Math.abs(positionsArray2[i * 3]) > 30) velocities2[i].x *= -1;
        if (Math.abs(positionsArray2[i * 3 + 1]) > 30) velocities2[i].y *= -1;
        if (Math.abs(positionsArray2[i * 3 + 2]) > 20) velocities2[i].z *= -1;
      }

      particles.geometry.attributes.position.needsUpdate = true;
      particles2.geometry.attributes.position.needsUpdate = true;

      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      geometry2.dispose();
      material2.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a0a 100%)' }}
    />
  );
}