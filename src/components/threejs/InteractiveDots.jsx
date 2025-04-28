import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const InteractiveDots = () => {
  
    useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const canvas = document.querySelector('#InteractiveDots-canvas');

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas: canvas  });
    //document.body.appendChild(renderer.domElement);

    let mouse = new THREE.Vector2(-10000, -10000);
    const raycaster = new THREE.Raycaster();
    const dotGeometry = new THREE.CircleGeometry(0.1, 32);
    const dots = [];

    // Generate a grid of dots, each with its own material
    const spacing = 1;
    const gridWidth = Math.floor(window.innerWidth / 18);
    const gridHeight = Math.floor(window.innerHeight / 18);
    console.log(gridWidth,gridHeight )
    for (let i = -gridWidth / 2; i < gridWidth / 2; i++) {
      for (let j = -gridHeight / 2; j < gridHeight / 2; j++) {
        const dotMaterial = new THREE.MeshBasicMaterial({ color: 0x808080, transparent: true, opacity: 0.8 });
        const dot = new THREE.Mesh(dotGeometry, dotMaterial);
        dot.position.set(i * spacing, j * spacing, 0);
        dot.userData.originalPosition = dot.position.clone();
        scene.add(dot);
        dots.push(dot);
      }
    }

    camera.position.z = 25;

    // Track mouse movement
    const onMouseMove = (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    // Handle hover interaction
    const handleHover = () => {
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(dots);
      raycaster.ray.intersectPlane(planeZ, mouse);

      // Reset the last hovered dot if it exists and is not currently hovered

        dots.forEach(dot => {
        
          const dx = dot.position.x - mouse.x;
          const dy = dot.position.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 4) {
            // Move dot aside
            dot.position.x = dot.position.x + 0.5;
            dot.position.y = dot.position.y + 0.5;
          } else {
            // Reset position
         dot.position.lerp(dot.userData.originalPosition, 0.1);
          }
        });
    };

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    let animationId
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      //handleHover();
      renderer.render(scene, camera);
    };

    window.addEventListener('mousemove', onMouseMove); // Enable mousemove
    window.addEventListener('mousemove', handleHover); // Enable mousemove
    window.addEventListener('resize', handleResize);

    handleResize();
    animate();
    handleHover();


      // Cleanup
      return () => {
        window.removeEventListener('mousemove', onMouseMove); // Enable mousemove
        window.removeEventListener('mousemove', handleHover); // Enable mousemove
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationId);
        renderer.dispose();
        scene.clear();
      };
    }, []);
  
    return;
  };
  
  export default InteractiveDots;
  