import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas3D({ darkMode, scrollProgress }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer;
    let scene;
    let camera;
    let reqId;

    // Track mouse coordinates
    const mouse = new THREE.Vector2(0, 0);
    const targetMouse = new THREE.Vector2(0, 0);

    const handleMouseMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    try {
      // 1. Scene & Camera Setup
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.set(0, 0, 15);

      // 2. Renderer Setup
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Theme Colors
      const bgColor = darkMode ? 0x060b19 : 0xf0f9ff;
      const particleColor = darkMode ? 0x00f0ff : 0x2563eb;
      const lineColor = darkMode ? 0x3b82f6 : 0x93c5fd;

      scene.background = new THREE.Color(bgColor);
      scene.fog = new THREE.FogExp2(bgColor, 0.012);

      // Ambient Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, darkMode ? 0.7 : 1.2);
      scene.add(ambientLight);

      // Massive Particle Grid (Expanded size to cover background)
      const rows = 24;
      const cols = 24;
      const count = rows * cols;
      const spacing = 4.2; // Wider spacing so it spans across screen

      const particles = [];
      const particlePositions = new Float32Array(count * 3);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = (c - cols / 2) * spacing;
          const y = (r - rows / 2) * spacing;
          const z = 0;

          particles.push({
            x, y, z,
            baseX: x,
            baseY: y,
            baseZ: z,
            vx: 0, vy: 0, vz: 0
          });
        }
      }

      // 3. Points Mesh (Nodes)
      const particleGeometry = new THREE.BufferGeometry();
      const pColor = new THREE.Color(particleColor);
      const sizes = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        sizes[i] = 4.0 + Math.random() * 4.0;
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: pColor,
        size: 0.35,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true
      });

      const particlePoints = new THREE.Points(particleGeometry, particleMaterial);
      scene.add(particlePoints);

      // 4. LineSegments (Constellations / Links)
      const maxLines = count * 4; 
      const linePositions = new Float32Array(maxLines * 2 * 3);
      const lineGeometry = new THREE.BufferGeometry();
      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(lineColor),
        transparent: true,
        opacity: darkMode ? 0.45 : 0.6,
        linewidth: 1.5
      });

      const lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
      scene.add(lineSegments);

      // 5. Floating background stars/nebula bits
      const bgCount = 250;
      const bgGeo = new THREE.BufferGeometry();
      const bgPos = new Float32Array(bgCount * 3);
      for (let i = 0; i < bgCount * 3; i += 3) {
        bgPos[i] = (Math.random() - 0.5) * 120;
        bgPos[i + 1] = (Math.random() - 0.5) * 120;
        bgPos[i + 2] = (Math.random() - 0.5) * 80 - 30;
      }
      bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPos, 3));
      const bgMat = new THREE.PointsMaterial({
        color: darkMode ? 0xa855f7 : 0x38bdf8,
        size: 0.15,
        transparent: true,
        opacity: 0.6
      });
      const bgPoints = new THREE.Points(bgGeo, bgMat);
      scene.add(bgPoints);

      // 6. Raycaster to calculate mouse 3D hover intersection
      const raycaster = new THREE.Raycaster();
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      // Animation Loop
      let time = 0;
      const animate = () => {
        reqId = requestAnimationFrame(animate);
        time += 0.02;

        // Smooth mouse lerping
        mouse.x += (targetMouse.x - mouse.x) * 0.1;
        mouse.y += (targetMouse.y - mouse.y) * 0.1;

        // Get 3D cursor position on the Z=0 plane
        raycaster.setFromCamera(mouse, camera);
        const mouse3D = new THREE.Vector3();
        raycaster.ray.intersectPlane(plane, mouse3D);

        // Update Particle Positions (Sine wave + Interactive Mouse push)
        const posAttr = particlePoints.geometry.attributes.position;
        const linePosAttr = lineSegments.geometry.attributes.position;

        let lineIndex = 0;

        for (let i = 0; i < count; i++) {
          const p = particles[i];

          // Wave equation
          const waveZ = Math.sin(p.baseX * 0.25 + time) * Math.cos(p.baseY * 0.25 + time) * 2.2;

          // Target position
          const targetX = p.baseX;
          const targetY = p.baseY;
          const targetZ = p.baseZ + waveZ;

          // Mouse Interaction (Push force with NaN / division-by-zero protection)
          let forceX = 0;
          let forceY = 0;
          let forceZ = 0;
          const influenceRadius = 10.0;

          if (mouse3D && !isNaN(mouse3D.x) && !isNaN(mouse3D.y) && !isNaN(mouse3D.z)) {
            const dx = p.x - mouse3D.x;
            const dy = p.y - mouse3D.y;
            const dz = p.z - mouse3D.z;
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist > 0.001 && dist < influenceRadius) {
              const strength = (influenceRadius - dist) / influenceRadius;
              // Push outwards
              forceX = (dx / dist) * strength * 3.5;
              forceY = (dy / dist) * strength * 3.5;
              forceZ = (dz / dist) * strength * 2.0;
            }
          }

          // Physics integration
          const springK = 0.08;
          const friction = 0.85;

          const ax = (targetX - p.x) * springK + forceX;
          const ay = (targetY - p.y) * springK + forceY;
          const az = (targetZ - p.z) * springK + forceZ;

          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;
          p.vz = (p.vz + az) * friction;

          p.x += p.vx;
          p.y += p.vy;
          p.z += p.vz;

          // Write back to buffer
          posAttr.setXYZ(i, p.x, p.y, p.z);
        }

        posAttr.needsUpdate = true;

        // Draw connecting lines between neighbors
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const index = r * cols + c;
            const p1 = particles[index];

            // Right connection
            if (c < cols - 1) {
              const p2 = particles[index + 1];
              linePositions[lineIndex++] = p1.x;
              linePositions[lineIndex++] = p1.y;
              linePositions[lineIndex++] = p1.z;
              linePositions[lineIndex++] = p2.x;
              linePositions[lineIndex++] = p2.y;
              linePositions[lineIndex++] = p2.z;
            }

            // Down connection
            if (r < rows - 1) {
              const p2 = particles[index + cols];
              linePositions[lineIndex++] = p1.x;
              linePositions[lineIndex++] = p1.y;
              linePositions[lineIndex++] = p1.z;
              linePositions[lineIndex++] = p2.x;
              linePositions[lineIndex++] = p2.y;
              linePositions[lineIndex++] = p2.z;
            }
          }
        }

        // Fill remaining empty buffer space
        while (lineIndex < linePositions.length) {
          linePositions[lineIndex++] = 0;
        }

        linePosAttr.needsUpdate = true;

        // Balanced camera zoom so background stays large and covering screen
        const targetZ = 12 + scrollProgress * 28; 
        const targetY = scrollProgress * 10;
        const targetRotX = -scrollProgress * 0.25;

        camera.position.z += (targetZ - camera.position.z) * 0.08;
        camera.position.y += (targetY - camera.position.y) * 0.08;
        camera.rotation.x += (targetRotX - camera.rotation.x) * 0.08;

        // Scene rotation
        scene.rotation.y = mouse.x * 0.12;
        scene.rotation.x = mouse.y * 0.08;

        renderer.render(scene, camera);
      };

      animate();

    } catch (e) {
      console.warn(e);
      container.style.backgroundColor = darkMode ? '#060b19' : '#f0f9ff';
    }

    // Resize handler
    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      if (scene) scene.clear();
    };
  }, [darkMode]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0
      }}
    />
  );
}
