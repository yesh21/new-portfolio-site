import React, { useEffect } from "react";
import * as THREE from "three";

const SMOKE_TEXTURE_URL =
  "https://raw.githubusercontent.com/mrdoob/three.js/refs/heads/dev/examples/textures/opengameart/smoke1.png";

export default function SmokeOnInteraction() {
  useEffect(() => {
    // --- Main setup function ---
    function setup(canvas) {
      // Scene setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
      });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);

      const clock = new THREE.Clock();
      scene.add(new THREE.AmbientLight(0xffffff, 1));

      // Smoke texture
      let smokeTexture = null;
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

      // Smoke particles array
      const smokeParticles = [];

      // Event handlers
      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      function spawnSmokeAtScreenCoords(x, y) {
        if (!smokeTexture) return;
        const nx = (x / window.innerWidth) * 2 - 1;
        const ny = -(y / window.innerHeight) * 2 + 1;
        const pos = new THREE.Vector3(nx, ny, 0.5).unproject(camera);
        createSmoke(pos);
      }

      function onPointerDown(event) {
        spawnSmokeAtScreenCoords(event.clientX, event.clientY);
      }

      function onTouchStart(event) {
        // event.preventDefault();
        for (let touch of event.touches) {
          spawnSmokeAtScreenCoords(touch.clientX, touch.clientY);
        }
      }

      window.addEventListener("resize", onWindowResize);
      window.addEventListener("mousemove", onPointerDown);
      window.addEventListener("touchmove", onTouchStart, { passive: false });

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
        sprite.scale.set(0.09, 0.09, 0.09);
        scene.add(sprite);
        smokeParticles.push({ sprite, life: 2 });
      }

      // Animation loop
      let animationId;
      function animate() {
        animationId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
          const p = smokeParticles[i];
          p.life -= delta;
          if (p.life <= 0) {
            scene.remove(p.sprite);
            smokeParticles.splice(i, 1);
          } else {
            p.sprite.material.opacity = p.life / 2;
            p.sprite.scale.multiplyScalar(1 + delta * 0.5);
          }
        }
        renderer.render(scene, camera);
      }
      animate();

      // Cleanup function
      return () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener("resize", onWindowResize);
        window.removeEventListener("mousemove", onPointerDown);
        window.removeEventListener("touchmove", onTouchStart);
        renderer.dispose();
        smokeParticles.length = 0;
      };
    }

    // --- End of setup function ---

    const canvas = document.getElementById("smoke-canvas");
    if (!canvas) return;
    const cleanup = setup(canvas);

    // Cleanup on unmount
    return cleanup;
  }, []);

  return (
    <canvas
      id="smoke-canvas"
      className="fixed"
      style={{
        display: "block",
        width: "100vw",
        height: "100vh",
        margin: 0,
        overflow: "hidden",
      }}
    />
  );
}
