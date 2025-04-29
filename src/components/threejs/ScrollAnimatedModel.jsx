import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
import { Font } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

export default function ScrollAnimatedModel() {
  useEffect(() => {
    let renderer;
    let animationFrameId;
    let mobileView = false;
    let updateMobileCameraRotation = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    // --- Animation state ---
    let showSecondScene = false;

    if (windowHalfX < windowHalfY) {
      mobileView = true;
    }

    let scene, camera;
    let composer;
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, 0)
    );
    const lerpAmount = 0.01;
    const camera1ScrollYEnd = 2200;
    const scene1ScrollYEnd = camera1ScrollYEnd + window.innerHeight + 700;
    const rotationSpeed = 0.00002;

    let glitchPass = new GlitchPass();
    glitchPass.enabled = false;

    // Scene 2: Interactive dots grid (Perspective)
    let scene2, camera2;
    // Mouse and raycaster for scene2 interaction
    let mouse = new THREE.Vector2(0, 0);
    const raycaster = new THREE.Raycaster();
    // Dots array
    const dots = [];

    // Renderer
    const canvas = document.querySelector("#retrocomputer-canvas");
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Setup function encapsulating all initialization
    function setupRoomScene() {
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
      // scene.add(new THREE.AmbientLight(0x51646f, 5));

      const directionalLight = new THREE.DirectionalLight(0x909090, 1);
      directionalLight.position.set(-0.55, 1, 0.8);
      directionalLight.target.position.set(-0.55, -1, 0.8);
      scene.add(directionalLight);
      scene.add(directionalLight.target);

      const pointLightPositions = [
        [-0.1, 0.1, 0],
        [-1.1, 0.25, 0],
        [-0.55, 0, 0],
      ];

      pointLightPositions.forEach((pos) => {
        const pointLight = new THREE.PointLight(0x51646f, 7.2, 1.5);
        pointLight.position.set(...pos);
        scene.add(pointLight);
      });

      // Helper sleep function for delays
      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
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
        // making desktop move to 2nd place while rendering
        if (meshes.length > 2) {
          const lastElement = meshes.pop(); // Remove the last element
          meshes.splice(1, 0, lastElement); // Insert the last element at the second position
        }
        await sleep(800);

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
        }
      }

      // Usage example:
      loadAndShowModelSequentially("/models/sci-fi_computer_room.glb", scene)
        .then(() => {
          console.log("All meshes loaded and revealed!");
        })
        .catch(console.error);

      // const canvasText = document.createElement('canvas');
      // canvasText.width = window.innerWidth;
      // canvasText.height = window.innerHeight;

      // const ctx = canvasText.getContext('2d');
      // ctx.font = 'Bold 60px Fira Code Variable';
      // ctx.fillStyle = 'white';
      // //ctx.textAlign = 'center';
      // // ctx.textBaseline = 'middle';

      // ctx.fillText('Welcome to my Digital setup!', 1, 100);

      // const texture = new THREE.CanvasTexture(canvasText);
      // const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
      // const geometry = new THREE.PlaneGeometry(1, 0.5);
      // const mesh = new THREE.Mesh(geometry, material);
      // mesh.position.set(-0.43, -1, 1)
      // scene.add(mesh);
      const video = document.getElementById("video");
      const videoTexture = new THREE.VideoTexture(video);
      videoTexture.minFilter = THREE.LinearFilter;
      videoTexture.magFilter = THREE.LinearFilter;
      const geometry = new THREE.PlaneGeometry(5.1 / 9, 4.5 / 16); // Match video aspect ratio
      const material = new THREE.MeshBasicMaterial({ map: videoTexture });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-0.45, 0.12, 0.085);
      scene.add(mesh);

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
      composer.addPass(glitchPass);
    }

    // === Setup Scene 2 (Interactive Dots) ===
    const setupInteractiveDotsScene = () => {
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
            color: 0x909090,
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
      if (windowHalfX < windowHalfY) {
        mobileView = true;
      } else {
        mobileView = false;
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);

      // Update camera2 (perspective)
      camera2.aspect = window.innerWidth / window.innerHeight;
      camera2.updateProjectionMatrix();

      // Rebuild fading squares grid
      setupRoomScene();
      // Rebuild dots grid
      setupInteractiveDotsScene();
    }

    // === Hover interaction for dots ===
    const handleDotsOnMouseMove = () => {
      // Project mouse to world coordinates on z=0 plane
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.setFromCamera(mouse, camera2);
      raycaster.ray.intersectPlane(planeZ, mouse); // const mouse = new THREE.Vector3();
      // const intersects = raycaster.intersectObjects(dots);

      dots.forEach((dot) => {
        const dx = dot.position.x - mouse.x;
        const dy = dot.position.y - mouse.y;
        const distsq = dx * dx + dy * dy;

        if (distsq < 16) {
          // distance is 4, we skipped sq root cal.
          // Move dot aside smoothly
          dot.position.x += 0.5;
          dot.position.y += 0.5;
        } else {
          // Return dot to original position smoothly
          dot.position.lerp(dot.userData.originalPosition, 0.1);
        }
      });
    };

    // Mouse move handler
    function onMouseMove(event) {
      // for scene 1
      if (window.scrollY < camera1ScrollYEnd) {
        const deltaMove = {
          x: event.clientX - windowHalfX,
          y: event.clientY - windowHalfY,
        };

        camera.rotation.y += -deltaMove.x * rotationSpeed;
        camera.rotation.x += -deltaMove.y * rotationSpeed;
      } else if (window.scrollY < scene1ScrollYEnd) {
        // do nothing
      } else {
        // for scene 2
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        handleDotsOnMouseMove();
        // const intersects = raycaster.intersectObjects(dots, true);
        // if (intersects.length > 0) {
        //   console.log(intersects[0]);
        //   // Do something with nearest.object or nearest.point
        // }

      }
    }
    //renderer.domElement.addEventListener('mouseleave', () => console.log(camera.position));
    // const geometry = new THREE.PlaneGeometry(3, 3);
    // const material = new THREE.MeshBasicMaterial({ color: 0x18181a });
    // const overlay = new THREE.Mesh(geometry, material);
    // // Make sure the overlay is rendered in front of everything
    // overlay.position.z = 0.18;
    function scene1OnScrollSettings() {
      if (!mobileView) {
        // for desktop
        camera.position.set(
          Math.min(-0.46, -0.55 + 0.00005 * window.scrollY), //1800 window.scrollY, use 00004285714 for 2100
          Math.min(0.09, 0 + 0.00005 * window.scrollY), //1800
          Math.max(0.1, 2.3 - 0.001 * window.scrollY)
        ); //2200, use 0.20 for 2100
        // if (window.scrollY >= 2100){
        //   scene.add(overlay);
        // } else {
        //   scene.remove(overlay);
        // }
      } else {
        // for mobiles
        updateMobileCameraRotation = Math.min(
          0.193154851,
          0.00012 * window.scrollY
        );
        camera.position.set(
          Math.max(-0.975, -0.55 - 0.0002 * window.scrollY), //2125
          Math.min(0.09, 0 + 0.00005 * window.scrollY),
          Math.max(0.1, 2.3 - 0.001 * window.scrollY)
        ); //2200, use 0.20 for 2100
      }
    }

    function onScroll() {
      if (window.scrollY < camera1ScrollYEnd) {
        scene1OnScrollSettings();
        glitchPass.enabled = false;
        //composer.render();

      } else if(window.scrollY < camera1ScrollYEnd+windowHalfY) {

      glitchPass.enabled = true;
      glitchPass.goWild = true;

      } else if(window.scrollY < scene1ScrollYEnd) {
        glitchPass.enabled = false;
        showSecondScene = false;
        document.body.style.backgroundColor = "#18181a";
        document.body.style.color = "#ffffff";

      } else {
        showSecondScene = true;
        document.body.style.backgroundColor = "#f7f5e8";
        document.body.style.color = "#000000";
        // Optionally remove event listener if no longer needed
        // window.removeEventListener('scroll', onScroll);
      }
    }

    // Event listeners
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (!showSecondScene) {
        camera.quaternion.slerp(targetQuaternion, lerpAmount);

        // for mobile view scrolling into vertical desktop
        if (mobileView) {
          camera.rotation.y = updateMobileCameraRotation; //0.193154851 //or -6.1
        }

        composer.render();
      } else {
        // Only render scene 2
        // handleDotsOnMouseMove(); // update dot positions if needed
        renderer.clear();
        renderer.render(scene2, camera2);
      }
    }

    // Initialize scene and start animation
    setupRoomScene();
    setupInteractiveDotsScene();

    animate();

    

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      scene.clear();
      scene2.clear();
    };
  }, []);

  return (
    <>
      <canvas
        className="w-full h-screen fixed top-0"
        id="retrocomputer-canvas"
      ></canvas>
      <div className="w-full h-[2200px]"></div>
      <div className="w-full h-screen"></div>
      <div className="relative flex w-full w-full h-[500px] z-112 items-center justify-center">
        {" "}
        <p>check,</p>
      </div>
      <div className="relative flex w-full w-full h-[500px] z-112 items-center justify-center">
        {" "}
        <p>Hello,</p>
      </div>
    </>
  );
}
