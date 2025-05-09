import React, { useState, useEffect } from "react";
import Matter from "matter-js";
import gsap from "gsap";

const WORDS = [
  "Hello,",
  "My",
  "everyday",
  "browser",
  "history",
  "is",
  "filled",
  "with",
  "googling",
  "100s",
  "of",
  "syntax",
  "errors",
  "and",
  "how..??",
  "and",
  "can..??",
];

export default function MatterWords() {
  const [running, setRunning] = useState(true);
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Update size on resize
  useEffect(() => {
    const onResize = () =>
      setSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Matter.js engine state
  useEffect(() => {
    if (!running) return;

    let engine, runner, render;
    const wallThickness = 4;
    const { width, height } = size;

    // Give the browser a tick to render spans before measuring
    // setTimeout(() => {
    // Get span positions
    const spanEls = Array.from(document.querySelectorAll(".splitwords"));
    const canvas = document.getElementById("matter-canvas");
    if (!canvas || spanEls.length !== WORDS.length) return;

    // Set canvas size
    canvas.width = width;
    canvas.height = height;

    // World setup
    engine = Matter.Engine.create();
    const world = engine.world;
    engine.gravity.y = 0.25;
    // Walls
    const walls = [
      Matter.Bodies.rectangle(
        width / 2,
        -wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        width / 2,
        height + wallThickness / 2,
        width,
        wallThickness,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        -wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true }
      ),
      Matter.Bodies.rectangle(
        width + wallThickness / 2,
        height / 2,
        wallThickness,
        height,
        { isStatic: true }
      ),
    ];
    Matter.Composite.add(world, walls);

    // Measure spans and create bodies
    const canvasRect = canvas.getBoundingClientRect();
    const wordBodies = WORDS.map((word, i) => {
      const rect = spanEls[i].getBoundingClientRect();
      const x = rect.left - canvasRect.left + rect.width / 2;
      const y = rect.top - canvasRect.top + rect.height / 2;
      const w = rect.width;
      const h = rect.height;
      return Matter.Bodies.rectangle(x, y, w, h, {
        label: word,
        restitution: 0.4,
        render: {
          fillStyle: "#fff",
          strokeStyle: "#333",
          lineWidth: 2,
        },
      });
    });

    Matter.Composite.add(world, wordBodies);

    // Mouse control
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });
    Matter.Composite.add(world, mouseConstraint);

    mouseConstraint.mouse.element.removeEventListener(
      "wheel",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "DOMMouseScroll",
      mouseConstraint.mouse.mousewheel
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchmove",
      mouseConstraint.mouse.mousemove
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchstart",
      mouseConstraint.mouse.mousedown
    );
    mouseConstraint.mouse.element.removeEventListener(
      "touchend",
      mouseConstraint.mouse.mouseup
    );

    let isDragging = false;

    Matter.Events.on(mouseConstraint, "startdrag", function () {
      isDragging = true;
    });

    Matter.Events.on(mouseConstraint, "enddrag", function () {
      isDragging = false;
    });

    canvas.addEventListener(
      "wheel",
      function (event) {
        if (isDragging) {
          event.preventDefault();
        }
      },
      { passive: false }
    );
    // Render
    render = Matter.Render.create({
      engine,
      canvas,
      options: {
        width,
        height,
        wireframes: false,
        background: "transparent",
      },
    });

    // Draw labels
    Matter.Events.on(render, "afterRender", function () {
      const ctx = render.context;
      ctx.font = "bold 2.5rem Fira Code Variable";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      wordBodies.forEach((body) => {
        ctx.save();
        ctx.translate(body.position.x, body.position.y);
        ctx.rotate(body.angle);
        // const text = body.label;
        // const metrics = ctx.measureText(text);
        // const textWidth = metrics.width;
        // const textHeight = 40; // Approximate height for 2.5rem font size
        // const padding = 16;

        // // Draw background rectangle
        // ctx.fillStyle = "#fff";
        // ctx.fillRect(
        //   -textWidth / 2 - padding / 2, // x
        //   -textHeight / 2 - padding / 2, // y
        //   textWidth + padding,           // width
        //   textHeight + padding           // height
        // );

        //   ctx.background = "transparent";
        ctx.fillStyle = "#222";
        ctx.fillText(body.label, 0, 2);
        ctx.restore();
      });
    });

    const animation = gsap.to("#matter-canvas", {
      scrollTrigger: {
        trigger: "#matter-canvas",
        start: "35% top",
        end: "bottom top",
        //markers: true,
        onEnter: () => {
          /* your enter code */
          //setRunning(true);
          document.getElementById("words-container").style.visibility = "hidden";

          wordBodies.forEach(body => {
            Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 20, y: (Math.random() - 0.5) * 20 });
          });        
          Matter.Render.run(render);
          runner = Matter.Runner.create();
          Matter.Runner.run(runner, engine);
        },
        onLeave: () => { /* your leave code */
          //setRunning(false);
         },
        // onEnterBack: () => { /* your enter back code */ },
        onLeaveBack: () => {
          /* your leave back code */
          //setRunning(true);

          document.getElementById("words-container").style.visibility =
            "visible";

          Matter.Runner.stop(runner);
          //runner = null;
          Matter.Render.stop(render);
          if (render && render.canvas && render.context) {
            render.context.clearRect(
              0,
              0,
              render.canvas.width,
              render.canvas.height
            );
            //render = null;
          }
          //Matter.World.clear(engine.world);
          //Matter.Engine.clear(engine);
          //engine = null;
        },
      },
    });

    return () => {
      if (animation.scrollTrigger) {
        animation.scrollTrigger.kill();
      }
      if (runner) {
        Matter.Runner.stop(runner);
      }
      if (render) {
        Matter.Render.stop(render);
      }
      if (render && render.canvas && render.context) {
        render.context.clearRect(
          0,
          0,
          render.canvas.width,
          render.canvas.height
        );
      }
      if (engine) {
        Matter.World.clear(engine.world);
        Matter.Engine.clear(engine);
      }
    };
  }, [running, size]);

  return (
    <div className="relative flex w-full h-[100vh] z-11 items-center justify-center mix-blend-exclusion bg-[#87bfd5]">
      <canvas
        id="matter-canvas"
        className="w-full h-full bg-transparent block z-0 mix-blend-difference"
      />
      <h1
        id="words-container"
        className="absolute top-16 text-[2.5rem] leading-[1.1] font-bold max-w-[400px] z-11 p-6 italic mix-blend-difference pointer-events-none"
      >
        {WORDS.map((word, i) => (
          <span key={i} className="splitwords px-3 py-1">
            {word + " "}
          </span>
        ))}
      </h1>
    </div>
  );
}
