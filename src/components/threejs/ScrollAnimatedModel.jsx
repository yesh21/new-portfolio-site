import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
// import { TTFLoader } from "three/examples/jsm/loaders/TTFLoader.js";
// import { Font } from "three/examples/jsm/loaders/FontLoader.js";
// import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader.js";
//import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader.js';
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/examples/jsm/renderers/CSS2DRenderer.js";
//import video1 from "../../assets/852292-hd_1728_1080_25fps.mp4"
import video1 from "../../assets/220494_tiny.mp4";
import video2 from "../../assets/5473981-hd_720_1366_25fps.mp4";
import roomModelGLB from "../../assets/models/sci-fi_computer_room.glb?url";

const SMOKE_TEXTURE_URL =
  "https://raw.githubusercontent.com/mrdoob/three.js/refs/heads/dev/examples/textures/opengameart/smoke1.png";

export default function ScrollAnimatedModel() {
  useEffect(() => {
    let renderer;
    let animationFrameId;
    let mobileView = false;
    let updateMobileCameraRotation = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;
    
    if (windowHalfX < windowHalfY) {
      mobileView = true;
    }

    let scene, camera;
    let composer;
    const targetQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(0, 0, 0)
    );
    const lerpAmount = 0.01;
    const camera1ScrollYEnd = 2100;
    const scene1ScrollYEnd =
      camera1ScrollYEnd + window.innerHeight + windowHalfY;
    const rotationSpeed = 0.00002;

    let glitchPass = new GlitchPass();
    glitchPass.enabled = false;
    glitchPass.goWild = true;

    const hBlur = new ShaderPass(HorizontalBlurShader);
    const blurAmount = 0.004; // Adjust multiplier for strength
    hBlur.uniforms.h.value = blurAmount;

    // Scene 2: Interactive dots grid (Perspective)
    let scene2, camera2;

    const clock = new THREE.Clock();
    // Smoke particles array
    let smokeTexture = null;
    const smokeParticles = [];

    // Renderer
    const canvas = document.querySelector("#room-setup-canvas");
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      canvas,
    });

    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

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
        //await sleep(800);

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

        renderer.setSize(window.innerWidth, window.innerHeight);

        const desktopMonitorCanvas = document.createElement("canvas");
        const desktopMonitorCtx = desktopMonitorCanvas.getContext("2d");
        desktopMonitorCtx.fillStyle = "white";
        desktopMonitorCtx.font = "1.2rem Fira Code Variable";

        var desktopMonitorText = desktopMonitorCtx.measureText(
          "<>Yaswanth Pulavarthi</>"
        );
        var x = (desktopMonitorCanvas.width - desktopMonitorText.width) * 0.5;
        desktopMonitorCtx.fillText("<>Yaswanth Pulavarthi</>", x, 70);
        var desktopMonitorText =
          desktopMonitorCtx.measureText("Welcome to my site");
        desktopMonitorCtx.fillStyle = "gray";
        var x = (desktopMonitorCanvas.width - desktopMonitorText.width) * 0.5;
        desktopMonitorCtx.fillText(
          "Welcome to my site",
          x,
          70 +
            desktopMonitorText.actualBoundingBoxAscent +
            desktopMonitorText.actualBoundingBoxDescent +
            3
        );

        //ctx.clearRect(0, 0, canvas.width, canvas.height);
        desktopMonitorCtx.textAlign = "center";
        desktopMonitorCtx.textBaseline = "middle";

        const desktopMonitorTexture = new THREE.CanvasTexture(
          desktopMonitorCanvas
        );

        const video = document.getElementById("video");
        video.play(); // Ensure the video is playing

        const videoTexture = new THREE.VideoTexture(video);

        const desktopMonitorMeshGeometry = new THREE.PlaneGeometry(
          5.1 / 9,
          4.5 / 16
        ); // Match video aspect ratio
        const desktopMonitorMeshMaterial = new THREE.MeshBasicMaterial({
          //color: 0x18181a,
          map: videoTexture, //desktopMonitorTexture,
        });
        const desktopMonitorMesh = new THREE.Mesh(
          desktopMonitorMeshGeometry,
          desktopMonitorMeshMaterial
        );
        desktopMonitorMesh.position.set(-0.45, 0.115, 0.085);
        scene.add(desktopMonitorMesh);

        const width = 4.25 / 16;
        const height = 3.8 / 9;
        const cornerRadius = 0.02; // Adjust corner cut size

        const shape = new THREE.Shape()
          .moveTo(-width / 2 + cornerRadius, -height / 2)
          .lineTo(width / 2 - cornerRadius, -height / 2)
          .lineTo(width / 2, -height / 2 + cornerRadius) // Top-right cut
          .lineTo(width / 2, height / 2 - cornerRadius)
          .lineTo(width / 2 - cornerRadius, height / 2) // Bottom-right cut
          .lineTo(-width / 2 + cornerRadius, height / 2)
          .lineTo(-width / 2, height / 2 - cornerRadius) // Bottom-left cut
          .lineTo(-width / 2, -height / 2 + cornerRadius)
          .lineTo(-width / 2 + cornerRadius, -height / 2); // Top-left cut

        const video2 = document.getElementById("video2");
        video2.play(); // Ensure the video is playing

        const videoTexture2 = new THREE.VideoTexture(video2);
        // 2. Convert to geometry
        //const geometry1 = new THREE.ShapeGeometry(shape);
        const geometry1 = new THREE.PlaneGeometry(4.2 / 16, 3.8 / 9); // Match video aspect ratio

        const material1 = new THREE.MeshBasicMaterial({
          map: videoTexture2,
        });
        const mobileMonitorMesh = new THREE.Mesh(geometry1, material1);
        mobileMonitorMesh.position.set(-0.99, 0.1092, 0.1);
        mobileMonitorMesh.rotation.y = 0.203154851;
        scene.add(mobileMonitorMesh);
      }

      // Usage example:
      loadAndShowModelSequentially(roomModelGLB, scene)
        .then(() => {
          console.log("All meshes loaded and revealed!");
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
      composer.addPass(glitchPass);

      //hBlur.uniforms.h.value = 0.0;
      composer.addPass(hBlur);
    }

    // === Setup Scene 2 (Interactive Dots) ===
    const setupInteractiveSmokeScene = () => {
      scene2 = new THREE.Scene();
      camera2 = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera2.position.z = 5;

      scene2.add(new THREE.AmbientLight(0xffffff, 1));
      const loader = new THREE.TextureLoader();
      loader.load(
        SMOKE_TEXTURE_URL,
        (texture) => {
          smokeTexture = texture;
        },
        undefined,
        (err) => {
          console.error("Failed to load smoke texture.", err);
        }
      );

      // Smoke creation
      function createSmoke(position) {
        const material = new THREE.SpriteMaterial({
          map: smokeTexture,
          transparent: true,
          opacity: 0.5,
          color: new THREE.Color().setHSL(Math.random(), 0.5, 0.7),
          depthWrite: false,
        });
        const sprite = new THREE.Sprite(material);
        sprite.position.copy(position);
        sprite.scale.set(0.07, 0.07, 0.07);
        scene2.add(sprite);
        smokeParticles.push({ sprite, life: 2 });
      }

      function spawnSmokeAtScreenCoords(x, y) {
        if (!smokeTexture) return;
        const nx = (x / window.innerWidth) * 2 - 1;
        const ny = -(y / window.innerHeight) * 2 + 1;
        const pos = new THREE.Vector3(nx, ny, 0.5).unproject(camera2);
        createSmoke(pos);
      }

      function onPointerDown(event) {
        spawnSmokeAtScreenCoords(event.clientX, event.clientY);
      }

      function onTouchStart(event) {
        event.preventDefault();
        for (let touch of event.touches) {
          spawnSmokeAtScreenCoords(touch.clientX, touch.clientY);
        }
      }

      window.addEventListener("mousemove", onPointerDown);
      window.addEventListener("touchmove", onTouchStart);
    };

    // Window resize handler
    function onWindowResize() {
      windowHalfX = window.innerWidth / 2;
      windowHalfY = window.innerHeight / 2;
      if (windowHalfX < windowHalfY) {
        mobileView = true;
      } else {
        mobileView = false;
      }
      if (!mobileView || canvas.clientWidth != window.innerWidth) {
        camera.aspect = windowHalfX / windowHalfY;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        composer.setSize(window.innerWidth, window.innerHeight);

        // Update camera2 (perspective)
        camera2.aspect = window.innerWidth / window.innerHeight;
        camera2.updateProjectionMatrix();

        // Rebuild fading squares grid
        setupRoomScene();
        // Rebuild dots grid
        setupInteractiveSmokeScene();
      }
    }

    // Mouse move handler
    function onMouseMove(event) {
      // for scene 1
      if (window.scrollY < camera1ScrollYEnd) {
        window.scrollBy({
          top: 3,
          behavior: "auto", // Required for manual control of smoothness
        });

        const deltaMove = {
          x: event.clientX - windowHalfX,
          y: event.clientY - windowHalfY,
        };

        camera.rotation.y += -deltaMove.x * rotationSpeed;
        camera.rotation.x += -deltaMove.y * rotationSpeed;
      } else if (window.scrollY < scene1ScrollYEnd) {
        // do nothing
      } else {
      }
    }

    function scene1OnScrollSettings() {
      if (!mobileView) {
        // for desktop
        camera.position.set(
          Math.min(-0.45, -0.55 + 0.00005 * window.scrollY), //2000 window.scrollY, use 00004285714 for 2100
          Math.min(0.09, 0 + 0.00005 * window.scrollY), //1800
          Math.max(0.2, 2.3 - 0.001 * window.scrollY)
        ); //2200, use 0.20 for 2100
      } else {
        // for mobiles
        updateMobileCameraRotation = Math.min(
          0.193154851,
          0.00012 * window.scrollY
        );
        camera.position.set(
          Math.max(-0.975, -0.55 - 0.0002 * window.scrollY), //2125
          Math.min(0.09, 0 + 0.00005 * window.scrollY),
          Math.max(0.27, 2.3 - 0.00097 * window.scrollY)
        ); //2000, use 0.20 for 2100
      }
    }

    function onScroll() {
      if (window.scrollY < camera1ScrollYEnd) {
        scene1OnScrollSettings();
        glitchPass.enabled = false;
        //composer.render();
        hBlur.enabled = true;
      } else if (window.scrollY < camera1ScrollYEnd + windowHalfY) {
        scene1OnScrollSettings();
        glitchPass.enabled = true;
        // // Update blur based on scroll position
      } else if (window.scrollY < scene1ScrollYEnd) {
        glitchPass.enabled = false;
      } else {
      }
    }

    // Event listeners
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      if (window.scrollY < camera1ScrollYEnd - windowHalfY - windowHalfY) {
        camera.quaternion.slerp(targetQuaternion, lerpAmount);

        // for mobile view scrolling into vertical desktop
        if (mobileView) {
          camera.rotation.y = updateMobileCameraRotation; //0.193154851 //or -6.1
        }

        composer.render();
        hBlur.enabled = false;
      } else if (
        window.scrollY <
        camera1ScrollYEnd + windowHalfY + windowHalfY
      ) {
        window.scrollBy({
          top: 1,
          behavior: "auto", // Required for manual control of smoothness
        });
        camera.quaternion.slerp(targetQuaternion, lerpAmount * 2);

        // for mobile view scrolling into vertical desktop
        if (mobileView) {
          camera.rotation.y = updateMobileCameraRotation; //upto 0.193154851 //or -6.1
        }

        hBlur.enabled = false; //hblur before render helps in stopping the blur effect
        composer.render();
      } else if (window.scrollY < scene1ScrollYEnd) {
        //composer.render();
        renderer.clear();
      } else {
        // Only render scene 2
        const delta = clock.getDelta();
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
          const p = smokeParticles[i];
          p.life -= delta;
          if (p.life <= 0) {
            scene2.remove(p.sprite);
            smokeParticles.splice(i, 1);
          } else {
            p.sprite.material.opacity = p.life / 2;
            p.sprite.scale.multiplyScalar(1 + delta * 0.5);
          }
        }
        //renderer.clear();
        renderer.render(scene2, camera2);
      }
    }

    // Initialize scene and start animation
    setupRoomScene();
    setupInteractiveSmokeScene();

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
        className="w-full h-lvh min-h-screen fixed top-0"
        id="room-setup-canvas"
      ></canvas>
      <div className="w-full h-[2100px]">
        <video
          id="video"
          src={video1}
          loop
          autoPlay
          muted
          playsInline
          style={{ opacity: 0, position: "absolute" }}
        ></video>
        <video
          id="video2"
          src={video2}
          loop
          autoPlay
          muted
          playsInline
          style={{ opacity: 0, position: "absolute" }}
        ></video>
      </div>
      <div className="w-full h-screen"></div>
    </>
  );
}
