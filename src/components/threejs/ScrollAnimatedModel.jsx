import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';


export default function ScrollAnimatedModel() {

  useEffect(() => {
    let renderer;
    let scene, camera, model;
    let animationFrameId;
    let composer;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    const targetQuaternion = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
    const lerpAmount = 0.01;


    // Scene 2: Interactive dots grid (Perspective)
    let scene2, camera2;

    // Mouse and raycaster for scene2 interaction
    let mouse = new THREE.Vector2(-10000, -10000);
    const raycaster = new THREE.Raycaster();

    // Dots array
    const dots = [];


    // Renderer
    const canvas = document.querySelector('#retrocomputer-canvas');
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    

    // Setup function encapsulating all initialization
    function setupScene() {
      // Scene
      scene = new THREE.Scene();
      // Camera
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.001,
        1000
      );
      camera.position.set(-0.55, 0, 2.3);

      // Lights
      scene.add(new THREE.AmbientLight(0x51646f, 5));

      const directionalLight = new THREE.DirectionalLight(0x909090, 1);
      directionalLight.position.set(-0.55, 0, 0.2);
      directionalLight.target.position.set(-0.46, 0, 0.2);
      scene.add(directionalLight);
      scene.add(directionalLight.target);

      const pointLightPositions = [
        [0, 0.1, 0],
        [-1, 0.3, 0],
        [-0.55, 0, 0],
      ];

      pointLightPositions.forEach(pos => {
        const pointLight = new THREE.PointLight(0x51646f, 2.2, 0);
        pointLight.position.set(...pos);
        scene.add(pointLight);
      });


// Helper sleep function for delays
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadAndShowModelSequentially(url, scene) {
  const loader = new GLTFLoader();
  const gltf = await new Promise((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });


  const model = gltf.scene;

  // Remove model from scene if it was added (usually not yet)
  scene.remove(model);

  scene.add(model);

  // Collect all meshes
  const meshes = [];
  model.traverse((node) => {
    if (node.isMesh) {
      meshes.push(node);
      node.visible = false; // hide initially

    }
  });

  // Reveal meshes one by one with wireframe first, then full material
  for (const mesh of meshes) {


    const originalMaterial = mesh.material;
    const wireframeMaterial = originalMaterial.clone();
    wireframeMaterial.wireframe = true;

    // Show mesh with wireframe
    mesh.material = wireframeMaterial;
    mesh.visible = true;

    await sleep(150); // show wireframe for 50 m second

    // Switch to original material (full render)
    mesh.material = originalMaterial;

    await sleep(30); // small delay before next mesh
    mesh.updateWorldMatrix(true, false); // Ensure the world matrix is up to date

    // const worldPos = new THREE.Vector3();
    // mesh.getWorldPosition(worldPos);
    // console.log(mesh.name, 'world position:', worldPos);
//     const box = new THREE.Box3().setFromObject(mesh);
// const center = new THREE.Vector3();
// box.getCenter(center);
// console.log(center, mesh); // This is the mesh's center in world coordinates

  }
}


// Usage example:
loadAndShowModelSequentially('/models/sci-fi_computer_room.glb', scene)
  .then(() => {
    console.log('All meshes loaded and revealed!');
  })
  .catch(console.error);




      // Postprocessing composer
      composer = new EffectComposer(renderer);

      const renderPass = new RenderPass(scene, camera);
      composer.addPass(renderPass);

      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.4, // strength
        0.1, // radius
        1 // threshold
      );
      composer.addPass(bloomPass);

      // Event listeners
      window.addEventListener('resize', onWindowResize);
      window.addEventListener('mousemove', onMouseMove);
    }

        // === Setup Scene 2 (Interactive Dots) ===
    const setupScene2 = () => {
      scene2 = new THREE.Scene();
      camera2 = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera2.position.z = 25;

      const spacing = 1.2;
      const gridWidth = Math.floor(window.innerWidth / 23);
      const gridHeight = Math.floor(window.innerHeight / 23);
      const dotGeometry = new THREE.CircleGeometry(0.1, 32);

      dots.length = 0; // Clear dots array

      for (let i = -gridWidth / 2; i < gridWidth / 2; i++) {
        for (let j = -gridHeight / 2; j < gridHeight / 2; j++) {
          const dotMaterial = new THREE.MeshBasicMaterial({
            color: 0x808080,
            transparent: true,
            opacity: 0.8,
          });
          const dot = new THREE.Mesh(dotGeometry, dotMaterial);
          dot.position.set(i * spacing, j * spacing, 0);
          dot.userData.originalPosition = dot.position.clone();
          scene2.add(dot);
          dots.push(dot);
        }
      }
    };


    // Window resize handler
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);

      // Update camera2 (perspective)
      camera2.aspect = window.innerWidth / window.innerHeight;
      camera2.updateProjectionMatrix();

      // Rebuild fading squares grid
      setupScene();
      // Rebuild dots grid
      setupScene2();
    }



    // Mouse move handler
    function onMouseMove(event) {
      // for scene 2
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      // for scene 1
      const deltaMove = {
        x: event.clientX - windowHalfX,
        y: event.clientY - windowHalfY,
      };

      const rotationSpeed = 0.00002;
      camera.rotation.y += -deltaMove.x * rotationSpeed;
      camera.rotation.x += -deltaMove.y * rotationSpeed;
    }



    // === Hover interaction for dots ===
    const handleHover = () => {

      // Project mouse to world coordinates on z=0 plane
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.setFromCamera(mouse, camera2);
      raycaster.ray.intersectPlane(planeZ, mouse); // const mouse = new THREE.Vector3();
      // const intersects = raycaster.intersectObjects(dots);

      dots.forEach((dot) => {
        const dx = dot.position.x - mouse.x;
        const dy = dot.position.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 4) {
          // Move dot aside smoothly
          dot.position.x += 0.5;
          dot.position.y += 0.5;
        } else {
          // Return dot to original position smoothly
          dot.position.lerp(dot.userData.originalPosition, 0.1);
        }
      });
    };
    window.addEventListener('mousemove', handleHover);

    //renderer.domElement.addEventListener('mouseleave', () => console.log(camera.position));

    function onScroll() {
      // for desktop
      camera.position.z = Math.max(0.20, 2.3 - 0.001 * window.scrollY);
      camera.position.y = Math.min(0.09, 0 + 0.00005 * window.scrollY);
      camera.position.x = Math.min(-0.46, -0.55 + 0.00005 * window.scrollY);

      // for mobiles
      // camera.position.z = Math.max(0.20, 2.3 - 0.001 * window.scrollY);
      // camera.position.y = Math.min(0.09, 0 + 0.00005 * window.scrollY);
      // camera.position.x = Math.max(-.975, -0.55 - 0.0002 * window.scrollY);


      const epsilon = 0.0001;
      if (
        Math.abs(camera.position.z - 0.20) < epsilon &&
        Math.abs(camera.position.y - 0.09) < epsilon &&
        Math.abs(camera.position.x + 0.46) < epsilon
      ) {
        showSecondScene = true;
        // Optionally remove event listener if no longer needed
        // window.removeEventListener('scroll', onScroll);
      } else {
        showSecondScene = false;
      }
    }
  
    window.addEventListener('scroll', onScroll);
  
 
    // --- Animation state ---
    let showSecondScene = false;
    
    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (!showSecondScene) {
        camera.quaternion.slerp(targetQuaternion, lerpAmount);
        // for mobile view scrolling into vertical desktop
        //camera.rotation.y = -6.1
        composer.render();
      } else {
        // Only render scene 2
        // handleHover(); // update dot positions if needed
        renderer.clear();
        renderer.render(scene2, camera2);
      }

    }

    // Initialize scene and start animation
    setupScene();
    setupScene2();

    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onWindowResize);
      renderer.domElement.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
      scene.clear();
      scene2.clear();
    };
  }, []);

  return (
    <></>
  );
}



//       const center = new THREE.Vector3(x, y, z); // Center of your search
// const radius = 10; // Your radius
// const objectsInRadius = [];

// scene.traverse((object) => {
//   if (object.isMesh) {
//     const distance = object.position.distanceTo(center);
//     if (distance <= radius) {
//       objectsInRadius.push(object);
//     }
//   }
// });