import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FadingPixels = () => {

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = document.querySelector('#loader-canvas');

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas  });

    let camera, pixelSize, cols, rows, fadingSquares = [];

    const setupScene = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;

      renderer.setSize(width, height);
      scene.clear();

      // Orthographic camera (flat)
      camera = new THREE.OrthographicCamera(
        -width / 2, width / 2,
        height / 2, -height / 2,
        0.1, 1000
      );
      camera.position.z = 10;

      // Responsive pixel size
      let basePixels = 20;
      if (width * 1.7 < height) {
        basePixels = 12;
      }
      pixelSize = Math.min(width, height) / basePixels;

      cols = Math.floor(width / pixelSize) + 1;
      rows = Math.floor(height / pixelSize) + 1;

      const geometry = new THREE.PlaneGeometry(pixelSize, pixelSize);
      fadingSquares = [];

      const base_color = { r: 18, g: 23, b: 27 };

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {

          // Generate a random shade factor between 0.8 (darker) and 1.2 (lighter)
          const shade = 0.2 + Math.random() * 0.6;
          
          // Calculate new RGB values, clamped to 255
          const r = Math.min(255, base_color.r * shade) / 255;
          const g = Math.min(255, base_color.g * shade) / 255;
          const b = Math.min(255, base_color.b * shade) / 255;
          
          // Create the color
          const color = new THREE.Color(r, g, b);
          const material = new THREE.MeshBasicMaterial({
            color,
            transparent: true,
            opacity: 1
          });

          const square = new THREE.Mesh(geometry, material);
          square.position.set(
            x * pixelSize - width / 2 + pixelSize / 2,
            -(y * pixelSize - height / 2 + pixelSize / 2),
            0
          );

          scene.add(square);

          const fadeDuration = Math.random() * 1.5;
          const startTime = performance.now() + 300;

          fadingSquares.push({ mesh: square, startTime, fadeDuration });
        }
      }
    };

    const animate = (time) => {
      requestAnimationFrame(animate);

      fadingSquares.forEach(({ mesh, startTime, fadeDuration }) => {
        const elapsed = (time - startTime) / 1000;

        if (elapsed >= 0) {
          const t = Math.min(elapsed / fadeDuration, 1);
          mesh.material.opacity = 1 - t;
        }
      });

      renderer.render(scene, camera);
    };
    setupScene();
    animate();
    

    const handleResize = () => {
      // Clear previous pixels
      while (scene.children.length > 0) {
        const obj = scene.children[0];
        obj.geometry?.dispose?.();
        obj.material?.dispose?.();
        scene.remove(obj);
      }
      
      setupScene(); // rebuild grid
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
<>
<canvas className='w-full h-screen fixed z-112 top-0 pointer-events-none' id="loader-canvas"></canvas>

</>
  );
};

export default FadingPixels;