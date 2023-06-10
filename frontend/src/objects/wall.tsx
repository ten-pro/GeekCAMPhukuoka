import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Engine, Render, World, Bodies, Composite, Mouse, Body } from 'matter-js';


export default function Wall() {
    useEffect(() => {
        const engine = Engine.create();
    
        const canvasElement = document.getElementById('matter-js-canvas') as HTMLElement | null;
        const render = Render.create({
          element: canvasElement!,
          engine: engine,
          options: {
            width: 1000,
            height: 800,
            wireframes: false,
            background: 'gray' 
          }
        });
        // const wall = Bodies.rectangle(leftMargin, topPadding, width, height, {


    const wallTop = Bodies.rectangle(500, -30, 1000, 100, {
      isStatic: true,
      restitution: 0
    });
    const wallLeft = Bodies.rectangle(-30, 405, 780, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });
    const wallRight = Bodies.rectangle(1030, 400, 765, 100, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });
    const wallBottom = Bodies.rectangle(500, 830, 1100, 100, {
      isStatic: true,
      restitution: 0
    });
    const ball = Bodies.circle(960, 520, 20, { restitution: 1.2}); 

    const patation = Bodies.rectangle(910, 470, 630, 20, {
      isStatic: true,
      angle: Math.PI / 2,
      restitution: 0
    });
    const launcher = Bodies.rectangle(950, 750, 70, 70, {
      isStatic: true,
      restitution: 2
    });
    const diagonal = Bodies.rectangle(950, 70, 150, 20, {
      isStatic: true,
      angle: 4,
      restitution: 2
    });
    Composite.add(engine.world, [wallTop, ball, wallLeft,wallRight, wallBottom,patation, diagonal, launcher]);

    World.add(engine.world, [wallTop, ball, wallLeft,wallRight, wallBottom, patation, diagonal, launcher]);

    Engine.run(engine);
    Render.run(render);
    // ...

// Mouse handling
//...

// Mouse handling
// ...

// Mouse handling
// Mouse handling
const mouse = Mouse.create(render.canvas);

// Attach mouse down event
render.canvas.addEventListener("mousedown", event => {
  const { x, y } = mouse.position;
  if (
    x >= launcher.position.x - 35 &&
    x <= launcher.position.x + 35 &&
    y >= launcher.position.y - 35 &&
    y <= launcher.position.y + 35
  ) {
    // Animate launcher position
    let startTime = Date.now();
    const duration = 2000; // 2 seconds
    const initialY = launcher.position.y;
    const targetY = 150;

    const animationFrame = () => {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const newY = initialY + (targetY - initialY) * progress;

      // Use Body.setPosition to set the position of launcher
      Body.setPosition(launcher, { x: launcher.position.x, y: newY });

      if (progress === 1) {
        // Start the reverse animation
        reverseAnimation();
      } else {
        requestAnimationFrame(animationFrame);
      }
    };

    const reverseAnimation = () => {
      startTime = Date.now();

      const reverseAnimationFrame = () => {
        const currentTime = Date.now();
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);

        const newY = targetY + (initialY - targetY) * progress;

        // Use Body.setPosition to set the position of launcher
        Body.setPosition(launcher, { x: launcher.position.x, y: newY });

        if (progress < 1) {
          requestAnimationFrame(reverseAnimationFrame);
        }
      };

      requestAnimationFrame(reverseAnimationFrame);
    };

    requestAnimationFrame(animationFrame);
  }
});


// ...

// ...


// ...

    return () => {
        Engine.clear(engine);
  
        if (render.canvas && render.canvas.parentNode) {
          render.canvas.parentNode.removeChild(render.canvas);
        }
      };
    }, []);
  
    return<div id="matter-js-canvas" />;
  }