import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const FadingPixels = () => {
    const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const canvas = document.querySelector('#loader-canvas');

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas  });

    let camera, pixelSize, cols, rows, fadingSquares = [];

    const setupScene = () => {
      const width = canvasRef.current.clientWidth;
      const height = canvasRef.current.clientHeight;

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

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const gray = 0.03 + Math.random() * 0.1;
          const color = new THREE.Color(gray, gray, gray);
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
<div className='w-full h-screen absolute z-10' >
    <canvas className='w-full h-screen' ref={canvasRef} />
  </div>
  );
};

export default FadingPixels;





// import React, { useEffect } from 'react';
// import * as THREE from 'three';

// const InteractiveDots = () => {
//   useEffect(() => {
//     // === Setup ===
//     const canvas = document.querySelector('#InteractiveDots-canvas');
//     const renderer = new THREE.WebGLRenderer({
//       antialias: true,
//       alpha: true,
//       canvas: canvas,
//     });

//     // Scene 1: Fading squares grid (Orthographic)
//     const scene = new THREE.Scene();
//     let camera, pixelSize, cols, rows, fadingSquares = [];

//     // Scene 2: Interactive dots grid (Perspective)
//     const scene2 = new THREE.Scene();
//     let camera2 = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera2.position.z = 25;

//     // Mouse and raycaster for scene2 interaction
//     const mouse = new THREE.Vector2(-10000, -10000);
//     const raycaster = new THREE.Raycaster();

//     // Dots array
//     const dots = [];

//     // === Setup Scene 1 (Fading Squares) ===
//     const setupScene = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       renderer.setSize(width, height);
//       scene.clear();

//       // Orthographic camera setup
//       camera = new THREE.OrthographicCamera(
//         -width / 2,
//         width / 2,
//         height / 2,
//         -height / 2,
//         0.1,
//         1000
//       );
//       camera.position.z = 10;

//       // Responsive pixel size
//       let basePixels = 20;
//       if (width * 1.7 < height) {
//         basePixels = 12;
//       }
//       pixelSize = Math.min(width, height) / basePixels;

//       cols = Math.floor(width / pixelSize) + 1;
//       rows = Math.floor(height / pixelSize) + 1;

//       const geometry = new THREE.PlaneGeometry(pixelSize, pixelSize);
//       fadingSquares = [];

//       for (let y = 0; y < rows; y++) {
//         for (let x = 0; x < cols; x++) {
//           const gray = 0.03 + Math.random() * 0.1;
//           const color = new THREE.Color(gray, gray, gray);
//           const material = new THREE.MeshBasicMaterial({
//             color,
//             transparent: true,
//             opacity: 1,
//           });

//           const square = new THREE.Mesh(geometry, material);
//           square.position.set(
//             x * pixelSize - width / 2 + pixelSize / 2,
//             -(y * pixelSize - height / 2 + pixelSize / 2),
//             0
//           );

//           scene.add(square);

//           const fadeDuration = Math.random() * 1.5;
//           const startTime = performance.now() + 300;

//           fadingSquares.push({ mesh: square, startTime, fadeDuration });
//         }
//       }
//     };

//     // === Setup Scene 2 (Interactive Dots) ===
//     const setupScene2 = () => {
//       scene2.clear();

//       const spacing = 1;
//       const gridWidth = Math.floor(window.innerWidth / 18);
//       const gridHeight = Math.floor(window.innerHeight / 18);
//       const dotGeometry = new THREE.CircleGeometry(0.1, 32);

//       dots.length = 0; // Clear dots array

//       for (let i = -gridWidth / 2; i < gridWidth / 2; i++) {
//         for (let j = -gridHeight / 2; j < gridHeight / 2; j++) {
//           const dotMaterial = new THREE.MeshBasicMaterial({
//             color: 0x808080,
//             transparent: true,
//             opacity: 0.8,
//           });
//           const dot = new THREE.Mesh(dotGeometry, dotMaterial);
//           dot.position.set(i * spacing, j * spacing, 0);
//           dot.userData.originalPosition = dot.position.clone();
//           scene2.add(dot);
//           dots.push(dot);
//         }
//       }
//     };

//     // === Mouse move handler ===
//     const onMouseMove = (event) => {
//       mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//       mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
//     window.addEventListener('mousemove', onMouseMove);

//     // === Hover interaction for dots ===
//     const handleHover = () => {
//       // Project mouse to world coordinates on z=0 plane
//       const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
//       raycaster.setFromCamera(mouse, camera2);
//       const intersectPoint = new THREE.Vector3();
//       raycaster.ray.intersectPlane(planeZ, intersectPoint);

//       dots.forEach((dot) => {
//         const dx = dot.position.x - intersectPoint.x;
//         const dy = dot.position.y - intersectPoint.y;
//         const dist = Math.sqrt(dx * dx + dy * dy);

//         if (dist < 4) {
//           // Move dot aside smoothly
//           dot.position.x += 0.5;
//           dot.position.y += 0.5;
//         } else {
//           // Return dot to original position smoothly
//           dot.position.lerp(dot.userData.originalPosition, 0.1);
//         }
//       });
//     };

//     // === Resize handler ===
//     const handleResize = () => {
//       // Resize renderer
//       renderer.setSize(window.innerWidth, window.innerHeight);

//       // Update camera1 (orthographic)
//       camera.left = -window.innerWidth / 2;
//       camera.right = window.innerWidth / 2;
//       camera.top = window.innerHeight / 2;
//       camera.bottom = -window.innerHeight / 2;
//       camera.updateProjectionMatrix();

//       // Update camera2 (perspective)
//       camera2.aspect = window.innerWidth / window.innerHeight;
//       camera2.updateProjectionMatrix();

//       // Rebuild fading squares grid
//       setupScene();

//       // Rebuild dots grid
//       setupScene2();
//     };
//     window.addEventListener('resize', handleResize);

//     // --- Animation state ---
//     let showSecondScene = false;
//     let animationId;

//     // --- Animation loop ---
//     const animate = (time) => {
//       animationId = requestAnimationFrame(animate);

//       if (!showSecondScene) {
//         // Only render scene 1
//         fadingSquares.forEach(({ mesh, startTime, fadeDuration }) => {
//           const elapsed = (time - startTime) / 1000;
//           if (elapsed >= 0) {
//             const t = Math.min(elapsed / fadeDuration, 1);
//             mesh.material.opacity = 1 - t;
//           }
//         });
//         renderer.clear();
//         renderer.render(scene, camera);
//       } else {
//         // Only render scene 2
//         // handleHover(); // update dot positions if needed
//         renderer.clear();
//         renderer.render(scene2, camera2);
//       }
//     };

//     // === Initial setup and start animation ===
//     setupScene();
//     setupScene2();
//     animate();

//         // --- Switch to scene 2 after 2 seconds ---
//         const timer = setTimeout(() => {
//           showSecondScene = true;
//           window.addEventListener('mousemove', onMouseMove);
//           window.addEventListener('mousemove', handleHover);

//         }, 1800);

//     // === Cleanup on unmount ===
//     return () => {
//       clearTimeout(timer);
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('mousemove', onMouseMove);
//       cancelAnimationFrame(animationId);
//       renderer.dispose();
//       scene.clear();
//       scene2.clear();
//     };
//   }, []);

//   return (
//     <canvas
//       id="InteractiveDots-canvas"
//       style={{ display: 'block', width: '100vw', height: '100vh' }}
//     />
//   );
// };

// export default InteractiveDots;
